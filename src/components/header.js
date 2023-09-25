import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { FaBars } from 'react-icons/fa'
import { menuData } from "../data/MenuData"
import { Button } from "./Button"

const Header = () => {
  const [showMenu, setShowMenu] = useState(false) // 跟踪是否显示纵向导航栏

  const toggleMenu = () => {
    setShowMenu(!showMenu) // 切换纵向导航栏的显示状态
  }

  return (
    <Nav>
      <NavLink to="/">EXPLORIX </NavLink>
      <Bars onClick={toggleMenu} />
      <NavMenu showMenu={showMenu}>
        {
          menuData.map((item) => {
            return (
              <NavLink key={item.title} to={item.link} >
                {item.title}
              </NavLink>)

          })}
      </NavMenu>
      <NavBtn>
        <Button primary="true" round="true" to="/trips">Book a Flight</Button>
      </NavBtn>

    </Nav>
  )
}



export default Header


const Nav = styled.nav`
  background : transparent !important;
  height : 80px;
  display : flex;
  justify-content : space-between;
  padding : 0.5rem calc((100vw - 1300px)/2);
  z-index : 100;
  position: relative;
`

const NavLink = styled(Link)`
  color : #fff;
  display : flex;
  align-items : center;
  text-decoration : none;
  padding : 0rem;
  height : 100%;
  cursor : pointer;
  margin-right: 1rem;
`

const Bars = styled(FaBars)`
  display: none;
  color : #fff;

  @media screen and (max-width: 768px){
    display : block;
    position : absolute;
    top: 0 ;
    right : 0;
    transform : translate(-100% , 75%);
    font-size: 1.8 rem;
    cursor : pointer;
  }
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0px;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: ${(props) => (props.showMenu ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 2rem 1rem;
  }
`

const NavBtn = styled.div`
  display:flex;
  align-items: center;
  margin-right:24px;

  @media screen and (max-width: 768px){
    display:none;
  }
`