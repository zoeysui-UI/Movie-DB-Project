import axios from "axios";

const API_KEY = `d23c0c2d4e4286250cdab95e4dc48467`;
const BASE_URL = "https://api.themoviedb.org/3";

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  }
});
// console.log("client;", client);
export default client;
