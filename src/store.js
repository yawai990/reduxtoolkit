import { configureStore } from "@reduxjs/toolkit";
import Cartitems from "./features/Cartitems";
import Product from "./features/Product";
import bestSellerProducts from './features/BestSeller';
import Category from "./features/Category";
import User from "./features/User";

export const store = configureStore({
    reducer : {
        Cartitems,
        Product,
        bestSellerProducts,
        Category,
        User
    }
});