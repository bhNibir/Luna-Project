import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import PageTitle from '../Shared/PageTitle';
import { BaseContentButton } from '../../style/buttons';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import { PageContent, PageContainer } from '../../style/page-layout';
import { InputField } from '../../style/input';
import { apiUserLogin } from '../../store/user';

//Style component
const LoginContainer = styled.form`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InformationContainer = styled.div`
  width: auto;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const BottonAndTopContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;

//React component
const Login = (props) => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const next = props.location.search.substr(
    props.location.search.indexOf('=') + 1
  );
  console.log('next', next);

  const onSubmitForm = (e) => {
    e.preventDefault();
    e.target.reset();
    dispatch(apiUserLogin(email, password));
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPwdChange = (e) => {
      setPassword(e.target.value)
  }

  useEffect(() => {
      if (token) {
      if (next) {
        push(`/${next}`);
      } else {
        push('/profile');
      }
    }
  }, [token, push, dispatch]);

  return (
    <PageContainer>
      <Header></Header>
      <PageContent>
        <LoginContainer onSubmit={onSubmitForm}>
          <PageTitle pageTitle="LOGIN"></PageTitle>
          <InformationContainer>
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              onChange={onEmailChange}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              onChange={onPwdChange}
            />
          </InformationContainer>
          <BottonAndTopContainer>
            <BaseContentButton type="submit">Login</BaseContentButton>
          </BottonAndTopContainer>
        </LoginContainer>
      </PageContent>
      <Footer></Footer>
    </PageContainer>
  );
};
export default Login;
