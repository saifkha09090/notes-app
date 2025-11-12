import axios from "axios";

const API = axios.create({
  baseURL: "https://notes-app-self-ten.vercel.app/",
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
