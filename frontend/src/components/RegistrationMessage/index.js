import styled from 'styled-components';
import React from 'react';
import PageTitle from '../Shared/PageTitle';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import { PageContent, PageContainer } from '../../style/page-layout';
import { BaseContentButton } from '../../style/buttons';
import { Link } from 'react-router-dom';

//Style component

const RegistrationMessageContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InformationContainer = styled.div`
  width: 497px;
  height: auto;
  text-align: center;
  margin-bottom: 40px;
`;

//React component

const RegistrationMessage = () => {
  return (
    <PageContainer>
      <Header></Header>
      <PageContent>
        <RegistrationMessageContainer>
          <PageTitle pageTitle="REGISTRATION"></PageTitle>
          <InformationContainer>
            Thanks for your registration. Our hard working monkeys are preparing
            a digital message called E-Mail that will be sent to you soon. Since
            monkeys are good in writing the message could end up in your junk
            folder. Our apologies for any inconvienience.
          </InformationContainer>
          <Link to="/verification">
            <BaseContentButton>Verification</BaseContentButton>
          </Link>
        </RegistrationMessageContainer>
      </PageContent>
      <Footer></Footer>
    </PageContainer>
  );
};
export default RegistrationMessage;
