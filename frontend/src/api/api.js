import axios from "axios";

const API = axios.create({
  baseURL: "http://3.27.213.247:5000/api",
});

<<<<<<< HEAD
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
=======
// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = "Bearer " + token;
  }

>>>>>>> 8a859d55cba6a5ddcf12c33f9345782b57581e2b
  return req;
});

export default API;