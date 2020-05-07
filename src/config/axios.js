import axios from "axios";

const api = axios.create({
  baseURL: 'https://api-dev.worldofanime.com/'
});

export default api;