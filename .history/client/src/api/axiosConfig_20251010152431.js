import axios from 'axios';

const api = axios.create({
  baseURL: 'https://3.0.20.232/api', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;