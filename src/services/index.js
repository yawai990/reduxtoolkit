import axios from "axios";

const API = axios.create({
     // baseURL: 'https://ecodashboard-backend.onrender.com/api'
     baseURL: 'http://localhost:5000/api'
});
export const Login = (data)=> API.post(`/user/login`,data);
export const Register = (data)=> API.post(`/user/register`,data);

export const getProducts = ( brand, category ) => API.get(`/products/allproducts?brand=${brand || ''}&category=${category || ''}`);
export const bestSellersProducts = () => API.get('/products/bestsellers');


export const allCategories = () => API.get(`/category/getallcategory`);

export const WriteReview = (p_id, data) => API.post(`/user/review/${p_id}`, data);
