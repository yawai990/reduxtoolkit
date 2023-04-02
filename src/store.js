import { configureStore } from "@reduxjs/toolkit";
import Cartitems from "./features/Cartitems";
import Product from "./features/Product";

export const store = configureStore({
    reducer : {
        Cartitems,
        Product
    }
})