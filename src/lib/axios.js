import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.34.188.21:8080/",
  // baseURL: "http://localhost:8080/",
});

export default instance;
