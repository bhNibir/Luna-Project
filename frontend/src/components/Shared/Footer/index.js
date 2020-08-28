import React from 'react';
import styled from 'styled-components';

//////////
// STYLE
//////////
const FooterContainer = styled.footer`
  width: 100vw;
  background-color: white;
`;

const FooterLinksBar = styled.div`
  height: 64px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #ebebeb;
`;

const FooterLinksContainer = styled.div``;

const FooterLink = styled.a`
  margin-right: 70px;
  color: #646363;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const FooterSocialContainer = styled.div`
  display: flex;
`;

const FooterSocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid black;
  border-radius: 20px;
  margin-left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;

const FooterCopyright = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

const FooterCopyrightText = styled.p`
  font-size: 12px;
  color: #646363;
`;

//////////
// REACT
//////////

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinksBar>
        <FooterLinksContainer>
          <FooterLink href="">About Us</FooterLink>
          <FooterLink href="">Press</FooterLink>
          <FooterLink href="">Blog</FooterLink>
          <FooterLink href="">iOS</FooterLink>
          <FooterLink href="">Android</FooterLink>
        </FooterLinksContainer>
        <FooterSocialContainer>
          <FooterSocialIcon>
            <i className="fab fa-facebook-f"></i>
          </FooterSocialIcon>
          <FooterSocialIcon>
            <i className="fab fa-twitter"></i>
          </FooterSocialIcon>
          <FooterSocialIcon>
            <i className="fab fa-google-plus"></i>
          </FooterSocialIcon>
          <FooterSocialIcon>
            <i className="fab fa-instagram"></i>
          </FooterSocialIcon>
        </FooterSocialContainer>
      </FooterLinksBar>
      <FooterCopyright>
        <FooterCopyrightText>© Copyright Luna 2020</FooterCopyrightText>
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;
