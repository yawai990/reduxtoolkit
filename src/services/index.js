import axios from "axios";

const API = axios.create({
     baseURL: 'https://ecodashboard-backend.onrender.com/api'
     // baseURL: 'http://localhost:5000/api'
});

export const getProducts = () => API.get(`/products/allproducts`);
