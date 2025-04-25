
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const loginUser = async (username, password) => {
  const response = await API.post("/auth/login", { username, password });
  return response.data;
};

export const fetchProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};
