import Axios from '../../axios';

//////////
// REDUCER
//////////

export const user = (
  state = {
    token: null,
    userData: {},
  },
  action
) => {
  switch (action.type) {
    case 'USER_ADD_TOKEN':
      localStorage.setItem('lunaToken', action.payload);
      return {
        ...state,
        ...{
          token: action.payload,
        },
      };
    case 'USER_ADD_DATA':
      return {
        ...state,
        ...{
          userData: action.payload,
        },
      };
    default:
      return state;
  }
};

//////////
// ACTIONS
//////////

export const setToken = (token) => {
  return { type: 'USER_ADD_TOKEN', payload: token };
};

export const addUserData = (data) => {
  return { type: 'USER_ADD_DATA', payload: data };
};

//////////
// API HANDLING
//////////

export const apiUserVerifyToken = (token) => (dispatch) => {
  const url = 'auth/token/verify/';
  const msgData = {
    token: token,
  };

  Axios.post(url, msgData)
    .then((response) => {
      dispatch(setToken(token));
      dispatch(apiUserGetData(token));
      console.log('Token verification successful.');
    })
    .catch((error) => {
      dispatch(setToken(null));
      console.log('Token invalid. Please log in.');
    });
};

export const apiUserLogin = (email, password) => (dispatch) => {
  const url = 'auth/token/';
  const msgData = {
    email: email,
    password: password,
  };

  console.log('trying login');
  Axios.post(url, msgData)
    .then((response) => {
      const token = response.data.access;
      dispatch(setToken(token));
      dispatch(apiUserGetData(token));
      console.log('Login successful.');
    })
    .catch((error) => {
      dispatch(setToken(''));
      console.log('Login failed', error.response.data);
    });
};

export const apiUserSignUp = (email) => (dispatch) => {
  const url = 'auth/registration/';
  const msgData = {
    email: email,
  };

  Axios.post(url, msgData)
    .then((response) => {
      console.log('Registration successful.');
    })
    .catch((error) => {
      console.log('Registration error', error.response.data);
    });
};

export const apiUserVerify = (
  email,
  userName,
  code,
  password,
  passwordRepeat,
  firstName,
  lastName
) => (dispatch) => {
  const url = 'auth/registration/validation/';
  const msgData = {
    email: email,
    username: userName,
    code: code,
    password: password,
    password_repeat: passwordRepeat,
    first_name: firstName,
    last_name: lastName,
  };

  Axios.patch(url, msgData)
    .then((response) => {
      console.log('Registration successful.');
    })
    .catch((error) => {
      console.log('Registration failed', error.response.data);
    });
};

export const apiUserGetData = (token) => (dispatch) => {
  // check if token is valid
  if (!token) {
    console.log('invalid token');
    return false;
  }

  // prepare data
  const url = 'users/me/';
  const auth = 'Bearer ' + token;
  const headers = { headers: { Authorization: auth } };

  Axios.get(url, headers)
    .then((response) => {
      dispatch(addUserData(response.data));
      console.log('User data retrieved');
    })
    .catch((error) => {
      console.log('apiUserGetData', error.response.data);
    });
};
