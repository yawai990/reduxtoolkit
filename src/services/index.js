import axios from "axios";

const API = axios.create({
     // baseURL: 'https://ecodashboard-backend.onrender.com/api'
     baseURL: 'http://localhost:5000/api'
});
export const Login = (data)=> API.post(`/user/login`,data);
export const Register = (data)=> API.post(`/user/register`,data);

export const getProducts = (pageNum,price, brand, category ) => API.get(`/products/allproducts?pageNum=${pageNum || 1}&brand=${brand || ''}&category=${category || ''}&price=${price || ''}`);

export const bestSellersProducts = () => API.get('/products/bestsellers');

API.interceptors.request.use(req => {
     const token = sessionStorage.getItem('token');
     if(token){
          req.headers.Authorization = `Bearer ${token}`
     };
     return req;
}, err => err);

     export const allCategories = () => API.get(`/category/getallcategory`);
export const allBrands = () => API.get('/products/getbrands');

export const getSinglePro = (id) => API.get(`/products/singleproduct/${id}`)
export const WriteReview = (p_id, data) => API.post(`/user/review/${p_id}`, data);

export const order = (orderData) => API.post(`/orders/neworder`,orderData);

export const updateUserInfo = (id,updateData) => API.put(`/user/update/${id}`, updateData);
