// import Vue from 'vue';
import axios from "axios";

const service = axios.create({
  baseURL: "/api/v1", //url = base url + request url
  timeout: 60000,
});

const token = JSON.parse(localStorage.getItem("user"));

service.interceptors.request.use((config) => {
  if (token) {
    console.log(token);
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

export default service;
