import React from "react"


import Layout from "../components/layout"
import Seo from "../components/seo"
import Hero from "../components/Hero"
import Trips from "../components/Trips"
import Testimonials from "../components/Testimonials"
import Stats from "../components/Stats"
import Email from "../components/Email"
import Test from "../components/Test"
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'

//v1
// const client = new ApolloClient({
//   link: new HttpLink({ uri: 'https://vdwxn9d6wj.execute-api.eu-west-2.amazonaws.com/demo/graphql' }),
//   cache: new InMemoryCache(),
//   fetchOptions: {
//     mode: 'no-cors',
//   },
// })

//v2
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://mahyf7x6ig.execute-api.eu-west-2.amazonaws.com/graphqlapi' }),
  fetchOptions: {
    mode: 'no-cors',
  },
  cache: new InMemoryCache(),
})
// client
//   .query({
//     query: gql`
//       query GetHello {
//         hello
//       }
//     `,
//   })
//   .then((result) => console.log(result))



const IndexPage = () => (
  <ApolloProvider client={client}>
    <Layout>
      <Seo title="home" />
      <Hero />
      <Test />
      <Trips heading="Our Favorite Destinations" />
      <Testimonials />
      <Stats />
      <Email />
    </Layout>
  </ApolloProvider>
)


export const Head = () => <Seo title="Home" />

export default IndexPage
