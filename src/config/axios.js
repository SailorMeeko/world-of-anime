import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-dev.worldofanime.com/'
});

// const api = axios.create({
//   baseURL: 'http://45.79.220.36:5000/'
// });

// const api = axios.create({
//   baseURL: 'http://localhost:5000/'
// });

export default api;