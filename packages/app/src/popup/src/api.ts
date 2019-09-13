import axios from 'axios';

const api = axios.create({
  baseURL: 'https://va2w6b58nh.execute-api.us-east-1.amazonaws.com/dev/places',
});

export default api;
