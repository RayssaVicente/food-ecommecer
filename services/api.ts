import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001', // A mesma porta que definimos no script
});