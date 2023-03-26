import { configureStore } from "@reduxjs/toolkit";
import Cartitems from "./features/Cartitems";

export const store = configureStore({
    reducer : {
        Cartitems
    }
})