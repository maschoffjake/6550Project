import axios from 'axios';

export default axios.create({
    baseURL: 'http://92.168.1.28:8080',
    responseType: 'text'
  });