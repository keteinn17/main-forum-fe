// import Vue from 'vue';
import axios from "axios";

const service = axios.create({
  baseURL: "/api/v1", //url = base url + request url
  timeout: 60000,
});

const token = JSON.parse(localStorage.getItem("user"));

service.interceptors.request.use((config) => {
  if (token) {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

service.interceptors.response.use((response) => {
  return response;
});

// service.interceptors.response.use(
//   (resp) => resp,
//   async (error) => {
//     if (error.response.status === 401) {
//       window.location.href = "http://localhost:8081/login";
//     }
//   }
// );

export default service;
