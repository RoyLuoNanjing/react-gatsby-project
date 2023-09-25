import { ApolloServer } from '@apollo/server'
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda'
import { expressMiddleware } from '@apollo/server/express4'
import serverlessExpress from '@vendia/serverless-express'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb"
import { unmarshall } from '@aws-sdk/util-dynamodb'
const client = new DynamoDBClient({ region: 'eu-west-2', apiVersion: '2012-08-10' })

const params = {
  TableName: 'template'
}
const command = new ScanCommand(params)
const response = await client.send(command)
//convert the dynamoDB format to json format
const list = response.Items.map(item => unmarshall(item))

const getKVstring = (obj) => {
  let finalValue = 'String'
  if (obj.FieldType === 'Number') {
    finalValue = 'Int'
  }
  let key = obj.name
  let KVstring = `${key}:${finalValue}\n`
  console.log('KVstring')
  return KVstring
}

const getTypeTemplate = (templateID, finalKVString) => {
  let templateString =
    `type ${templateID}{
      ${finalKVString}
    }\n`
  console.log('templateString')
  return templateString
}

const getTypeQuery = (list) => {
  let KVString = ''
  list.map(item => {
    KVString += `${item.templateID}:[${item.templateID}] \n`
  })
  const query = `type Query {
    ${KVString}
  }`
  console.log('query')
  return query
}

const getTypeDefs = (list) => {
  let templates = ''
  list.map(obj => {
    let finalKVString = ''
    obj.fields.map(field => {
      finalKVString += getKVstring(field)
    })
    const templateID = obj.templateID

    templates += getTypeTemplate(templateID, finalKVString)
  })
  const query = getTypeQuery(list)
  const typeDefs = `#graphql \n  ${query}\n 
      ${templates}
  `
  return typeDefs
}

//get data with specific templateID
const getData = async (templateID) => {
  const params = {
    TableName: 'template-data',
    FilterExpression: '#templateID = :templateID',
    ExpressionAttributeNames: {
      '#templateID': 'templateID'
    },
    ExpressionAttributeValues: {
      //always consider the type of the value!!!!!!!!
      ':templateID': { S: templateID }
    }
  }
  try {
    const command = new ScanCommand(params)
    const response = await client.send(command)
    const items = response.Items.map(item => unmarshall(item))
    return items
  } catch (error) {
    console.log(error)
  }
}

const getResolvers = async (list) => {
  const resolvers = {
    Query: {
    }
  }
  const promises = list.map(item => {
    let templateID = item.templateID
    return getData(templateID)
  })
  try {
    const results = await Promise.all(promises)
    results.map((items, index) => {
      let templateID = list[index].templateID
      // *****Remember, resolvers key must be a function !!!!!*****
      resolvers.Query[templateID] = () => items
    })
  } catch (error) {
    console.log(error)
  }
  return resolvers
}

const resolvers = await getResolvers(list)
const typeDefs = getTypeDefs(list)

console.log(typeDefs)
console.log(resolvers)
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
})


server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests()

const app = express()
app.use(cors(), bodyParser.json(), expressMiddleware(server))
app.options('*', cors({ origin: ['http://localhost:8000'], credentials: true }))

export const graphqlHandler = serverlessExpress({ app })

//v2
// export const graphqlHandler = startServerAndCreateLambdaHandler(
//   server,
//   // We will be using the Proxy V2 handler
//   handlers.createAPIGatewayProxyEventV2RequestHandler(),
// )

//v1
// export const graphqlHandler = startServerAndCreateLambdaHandler(
//   server,
//   // We will be using the Proxy V1 handler
//   handlers.createAPIGatewayProxyEventRequestHandler(),
// )



