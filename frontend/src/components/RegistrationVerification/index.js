import styled from 'styled-components';
import React, { useState } from 'react';
import PageTitle from '../Shared/PageTitle';
import { BaseContentButton } from '../../style/buttons';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import { PageContent, PageContainer } from '../../style/page-layout';
import { InputField } from '../../style/input';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Axios from '../../axios';
import { decodeMessage } from '../../lib/helpers';

//Style component

const VerificationContainer = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InformationContainer = styled.div`
  flex: 2;
  width: auto;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 30px;
`;

const BottonAndTopContainer = styled.div`
  flex: 1;
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;

//React component

const Verification = (props) => {
  const [code, setValidationCode] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [first_name, setUserFirstName] = useState('');
  const [last_name, setUserLastName] = useState('');
  const [location, setUserLocation] = useState('');
  const [password, setPassword] = useState('');
  const [password_repeat, setPasswordRepeat] = useState('');
  const { push } = useHistory();

  const completeButtonHandler = (event) => {
    event.preventDefault();
    validateUser({
      code: code,
      email: email,
      username: username,
      location: location,
      first_name: first_name,
      last_name: last_name,
      password: password,
      password_repeat: password_repeat,
    });
  };

  // verify
  const validateUser = (data) => {
    const url = `registration/validation/`;

    Axios.post(url, data)
      .then((response) => {
        console.log('User validation successful');
        push('/login');
      })
      .catch((error) => {
        console.log('Validation error', error.response.data);
        decodeMessage(error.response.data);
      });
  };

  return (
    <PageContainer>
      <Header></Header>
      <PageContent>
        <VerificationContainer onSubmit={completeButtonHandler}>
          <PageTitle pageTitle="VERIFICATION"></PageTitle>
          <InformationContainer>
            <InputField
              placeholder="E-Mail address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></InputField>
            <InputField
              placeholder="Validation Code"
              value={code}
              onChange={(event) => setValidationCode(event.target.value)}
            ></InputField>
            <InputField
              placeholder="Username"
              value={username}
              onChange={(event) => setUserName(event.target.value)}
            ></InputField>
            <InputField
              placeholder="Location"
              value={location}
              onChange={(event) => setUserLocation(event.target.value)}
            ></InputField>
            <InputField
              placeholder="First name"
              value={first_name}
              onChange={(event) => setUserFirstName(event.target.value)}
            ></InputField>
            <InputField
              placeholder="Last name"
              value={last_name}
              onChange={(event) => setUserLastName(event.target.value)}
            ></InputField>
            <InputField
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></InputField>
            <InputField
              placeholder="Password repeat"
              type="password"
              value={password_repeat || ''}
              onChange={(event) => setPasswordRepeat(event.target.value)}
            ></InputField>
          </InformationContainer>
          <BottonAndTopContainer>
            <BaseContentButton type="submit">
              Finish registration
            </BaseContentButton>
          </BottonAndTopContainer>
        </VerificationContainer>
      </PageContent>
      <Footer></Footer>
    </PageContainer>
  );
};
export default connect()(Verification);
