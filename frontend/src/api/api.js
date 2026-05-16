import axios from "axios";

const API = axios.create({
  baseURL: "http://3.106.114.80:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;