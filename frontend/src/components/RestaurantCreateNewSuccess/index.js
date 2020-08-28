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
  padding-top: 30px;
`;

const InformationContainer = styled.div`
  width: 400px;
  height: auto;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const BottonAndTopContainer = styled.div`
  width: auto;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

//React component

const SuccessCreatedRestaurant = () => {
  return (
    <PageContainer>
      <Header></Header>
      <PageContent>
        <RegistrationMessageContainer>
          <BottonAndTopContainer>
            <PageTitle pageTitle="CREATION SUCCESSFUL!"></PageTitle>
          </BottonAndTopContainer>
          <InformationContainer>
            You have successfully created a restaurant.
          </InformationContainer>
          <Link to="/search">
            <BaseContentButton>Go to search</BaseContentButton>
          </Link>
        </RegistrationMessageContainer>
      </PageContent>
      <Footer></Footer>
    </PageContainer>
  );
};
export default SuccessCreatedRestaurant;
