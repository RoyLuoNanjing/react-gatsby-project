import React from 'react'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'




// const Test = () => {
//   const GET_Hello = gql`
//     query GetHello {
//       hello
//     }
//   `

let dataString = ''
dataString += 'templateID\n'
dataString += 'Address\n'
dataString += 'Headmaster\n'
dataString += 'History\n'

console.log(dataString)
const Test = () => {
  const GET_TemplateIDs = gql`
  query Nodes {
    School {
      Address
      Headmaster
      History
    }
  }
`


  const { loading, error, data } = useQuery(GET_TemplateIDs)
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>



  return (

    <TestContainer>
      <TopLine>Graphql Test</TopLine>
      <Description>What people are saying</Description>
      <ContentWrapper>
        {/* <Button onClick={HelloWorld}>点我</Button> */}
      </ContentWrapper>
    </TestContainer>

  )
}

export default Test

const TestContainer = styled.div`
width: 100%;
background: #fcfcfc;
color:#000;
padding: 5rem calc((100vw - 1300px)/2);
height: 100%;
`

const TopLine = styled.div`
  color:#077bf1;
  font-size:1rem;
  padding-left:2rem;
  margin-bottom: 0%.75rem;
`

const Description = styled.p`
  text-align:start;
  padding-left:2rem;
  margin-bottom: 4rem;
  font-size:clamp(1.5rem, 5vw,2rem);
  font-weight: bold;
`

const ContentWrapper = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;

  @media screen and (max-width:768px){
    grid-template-columns: 1fr;
  }
`



