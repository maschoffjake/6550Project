import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.86.28:8080'
  });