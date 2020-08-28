import styled from 'styled-components';

export const BaseContentButton = styled.button`
  width: 259px;
  height: 56px;
  border-radius: 28px;
  border: none;
  background: #e47d31;
  color: white;
  cursor: pointer;

  :hover {
    background: #cb7035;
  }
`;

export const SmallButton = styled.button`
  padding: 0 15px;
  height: 40px;
  border-radius: 20px;
  border: none;
  background: #e47d31;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  text-transform: uppercase;

  :hover {
    background: #cb7035;
  }
`;

export const SmallButtonGrey = styled(SmallButton)`
  background: rgba(0, 0, 0, 0.1);
  color: black;

  :hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const SplitButtonWrapper = styled.div`
  background-color: rgba(145, 145, 145, 0.6);
  width: auto;
  max-width: 280px;
  height: 35px;
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const SplitButton = styled.button`
  height: 100%;
  border: none;
  outline: none;
  border-right: 1px solid white;
  background: transparent;
  font-size: 16px;
  color: white;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    border: none;
  }
`;
