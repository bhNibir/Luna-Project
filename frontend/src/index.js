import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { defaultTheme, GlobalStyle } from './style';
import { ThemeProvider } from 'styled-components';

import store from './store';
import MainRoutes from './routes';
import { apiUserVerifyToken, setToken } from './store/user';

// check if there is a token in the browser storage
const localToken = localStorage.getItem('lunaToken');
if (localToken) {
  store.dispatch(apiUserVerifyToken(localToken));
} else {
  console.log('No token found.');
  store.dispatch(setToken(null));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <MainRoutes />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
