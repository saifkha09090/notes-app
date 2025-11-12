import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

// attach token before each request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
