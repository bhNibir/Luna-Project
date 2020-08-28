import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 20px;
    font-family: Helvetica, Arial, sans-serif; 

    *:focus {
      outline: none;
    }
  }
`;

export const defaultTheme = {
  // colors
  colorMain: '#E47D31',
  // size stuff
  controlHeight: '40px',
  controlHeightSmall: '32px',
  controlHeightLarge: '60px',
  // font stuff
  textSizeXL: '40px',
  textSizeL: '24px',
  textSizeM: '16px',
  textSizeS: '12px',
};
