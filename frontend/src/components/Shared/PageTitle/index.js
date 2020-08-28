import styled from 'styled-components';
import React from 'react';

//Style component

const PageTitleLine = styled.div`
  width: 100px;
  height: 3px;
  background-color: #e47d31;
  margin-top: 20px;
`;

const PageTitleContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const PageTitleText = styled.h1`
  color: #4c4c4c;
`;

//React component

const PageTitle = (props) => {
  return (
    <PageTitleContainer>
      <PageTitleText>{props.pageTitle}</PageTitleText>
      <PageTitleLine />
    </PageTitleContainer>
  );
};
export default PageTitle;
