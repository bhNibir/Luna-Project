import styled from 'styled-components';

export const PageContainer = styled.div`
  padding-top: 70px;
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: #f8f8f8;
`;

export const PageContent = styled.div`
  min-height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;
