import styled from 'styled-components';
import React, { useState } from 'react';
import PageTitle from '../Shared/PageTitle';
import { BaseContentButton } from '../../style/buttons';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import { PageContent, PageContainer } from '../../style/page-layout';
import { connect } from 'react-redux';
import { InputField } from '../../style/input';
import { useHistory } from 'react-router-dom';
import Axios from '../../axios';
import { decodeMessage } from '../../lib/helpers';

//Style component

const LoginContainer = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InformationContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const BottonAndTopContainer = styled.div`
  margin-top: 40px;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

//React component

const Registration = (props) => {
  const [email, setEmail] = useState('');
  const { push } = useHistory();

  const registerButtonHandler = (event) => {
    event.preventDefault();
    registerUser({ email: email });
  };

  // register
  const registerUser = (data) => {
    const url = `registration/`;

    Axios.post(url, data)
      .then((response) => {
        console.log('User creation successful');
        push('/registrationmessage');
      })
      .catch((error) => {
        console.log('Creation error', error.response.data);
        decodeMessage(error.response.data);
      });
  };

  return (
    <PageContainer>
      <Header></Header>
      <PageContent>
        <LoginContainer onSubmit={registerButtonHandler}>
          <PageTitle pageTitle="REGISTRATION"></PageTitle>
          <InformationContainer>
            <InputField
              placeholder="E-Mail address"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></InputField>
          </InformationContainer>
          <BottonAndTopContainer>
            <BaseContentButton type="submit">Register</BaseContentButton>
          </BottonAndTopContainer>
        </LoginContainer>
      </PageContent>
      <Footer></Footer>
    </PageContainer>
  );
};
export default connect()(Registration);
