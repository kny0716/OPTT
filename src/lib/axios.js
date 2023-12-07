import axios from "axios";

const instance = axios.create({
  baseURL: "http://54.180.113.74:8080/",
  // baseURL: "http://localhost:8080/",
});

export default instance;
