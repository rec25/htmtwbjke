import axios from 'axios';
import { appConstants } from '../constants';

const instance = axios.create({
  baseURL: appConstants.SERVER_URL,
  timeout: appConstants.FETCH_TIMEOUT,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

instance.interceptors.response.use(
  response => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
