import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://capricorn.propulsion-learn.ch/backend/api/',
  //baseURL: 'http://localhost:8000/backend/api/',
});
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.patch['Content-Type'] = 'application/json';
Axios.defaults.headers.delete['Content-Type'] = 'application/json';

export default Axios;
