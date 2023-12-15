import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.125.244.15:8080/",
  // baseURL: "http://localhost:8080/",
});

export default instance;
