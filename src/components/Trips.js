import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Button } from './Button'
import { ImLocation } from 'react-icons/im'

const Trips = ({ heading }) => {
  const data = useStaticQuery(graphql`
  query TripsQuery{
    allTripsJson {
      edges {
        node {
          alt
          name
          button
          img {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
  `)
  const getTrips = (data) => {
    const tripsArray = []


    data.allTripsJson.edges.forEach((item, index) => {
      const image = getImage(item.node.img)
      tripsArray.push(
        <ProductCard key={item.node.name}>
          <ProductImg
            image={image}
            alt={item.node.alt}
          />
          <ProductInfo>
            <TextWrap>
              <LogoLocation />
              <ProductTitle>{item.node.name}</ProductTitle>
            </TextWrap>
            <Button to="/trips"
              primary="true"
              round="true"
              css={'position: absolute; top: 420px;font-size:14px'}

            >{item.node.button}</Button>
          </ProductInfo>
        </ProductCard>
      )
    })

    return tripsArray

  }


  return (
    <ProductsContainer>
      <ProductsHeading>
        <ProductsHeading>{heading}</ProductsHeading>
        <ProductWrapper>{getTrips(data)}</ProductWrapper>
      </ProductsHeading>
    </ProductsContainer>
  )
}

export default Trips



const ProductsHeading = styled.div`
  font-size  : clamp(1.2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom:  5rem;
  color : #000;
`
const ProductWrapper = styled.div`
display: grid;
grid-template-columns: repeat(4,1fr);
grid-gap: 10px;
justify-items:center;
padding : 0 2rem;

@media screen and (max-width: 868px){
  grid-template-columns: 1fr;
}

`

const ProductsContainer = styled.div`
  min-height: 100vh;
  padding : 5rem calc((100vw - 1300px)/2);
  color:#fff;
`
const ProductCard = styled.div`
  line-height:2;
  width : 100%;
  height: 500px;
  position : relative;
  border-radius: 10px;
  transition: 0ms.2s ease;
`
const ProductImg = styled(GatsbyImage)`
  height : 100%;
  max-width: 100%;
  position: relative;
  border-radius: 10px;
  filter: brightness(70%);
  transition:0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover{
    filter: brightness(100%);
  }
`

const ProductInfo = styled.div`
display:flex;
flex-direction: column;
align-items:flex-start;
padding:0 2rem;
@media screen and (max-width: 868px) {
  padding: 0 1rem
}
`



const TextWrap = styled.div`
  display:flex;
  align-items:center;
  position:absolute;
  top:375px;
  color:white;
`


const ProductTitle = styled.div`
font-weight: 400;
font-size: 1rem;
margin-left: 0.5rem;
`

const LogoLocation = styled(ImLocation)`
  font-size: 2rem;
`
