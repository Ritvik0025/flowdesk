import axios from 'axios';
//the api is call authenticated with the token stored in local storage, if the token is present, it will be added to the headers of the request
const API = axios.create({
  baseURL: 'http://localhost:8081',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;