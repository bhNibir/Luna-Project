import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../../../assets/img/header_logo.png';

//////////
// STYLE
//////////
const HeaderContainer = styled.header`
  width: 100vw;
  height: 70px;
  background: white;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 0 30px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
`;

const HeaderLogo = styled.img`
  height: 30px;
`;

const HeaderNav = styled.nav`
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100%;
`;

const NavItem = styled(NavLink)`
  height: 100%;
  margin-right: 70px;
  display: flex;
  align-items: center;
  border-bottom: 3px solid transparent;
  color: #4a4a4a;
  text-decoration: none;

  :hover {
    border-bottom-color: ${(props) => props.theme.colorMain};
  }

  &.active {
    border-bottom-color: ${(props) => props.theme.colorMain};
    font-weight: bold;
  }
`;

const SignupLoginWrapper = styled.div`
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colorMain};
  overflow: hidden;
`;

const SignupButton = styled(Link)`
  font-size: 16px;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  border-right: 2px solid white;
  cursor: pointer;
  color: white;
  text-decoration: none;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    border: none;
  }
`;

//////////
// REACT
//////////

const Header = () => {
  const { token } = useSelector((state) => state.user);

  const logMeOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <HeaderContainer>
      <HeaderLogo src={logo}></HeaderLogo>
      <HeaderNav>
        <NavItem to="/home">Home</NavItem>
        <NavItem to="/search">Search</NavItem>
        <NavItem to="/profile">Profile</NavItem>
        <SignupLoginWrapper>
          {/* Show login/signup when not logged in, else show logout */}
          {token ? (
            <SignupButton to="/home" onClick={logMeOut}>
              LOGOUT
            </SignupButton>
          ) : (
            <>
              <SignupButton to="/registration">SIGNUP</SignupButton>
              <SignupButton to="/login">LOGIN</SignupButton>
            </>
          )}
        </SignupLoginWrapper>
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
