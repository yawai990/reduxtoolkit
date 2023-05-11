import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
    isLoading : true,
    total : 0,
    amount : 0
}

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        clearCart :state =>{
            state.cartItems = [];
            state.total = 0;
            state.amount = 0;
        },
        addItem : (state,{ payload })  =>{
            const isExit = state.cartItems.find(i => i._id === payload._id) !== undefined;
            
            if(isExit){
                const item = state.cartItems.find(item => item._id === payload._id);
                item.amount = item.amount + 1;
            }else{
                state.cartItems = [...state.cartItems,{...payload, amount : 1}]
            }
            state.total = state.cartItems.reduce((cur, accu) =>{
                return cur + accu.amount
            },0);
            state.amount = state.cartItems.reduce((cur, accu) =>{
               if(accu.discount){
                const dis = accu.price * accu.discount /100 * accu.amount;
                    return (cur + accu.amount * accu.price) - dis;
                }else{
                    return cur + (accu.amount * accu.price)
                }
            },0);
  
        },
        removeItem : (state, { payload }) =>{
           state.cartItems = state.cartItems.filter(i => i._id !== payload)
           state.total = state.cartItems.reduce((cur, accu) =>{
            return cur + accu.amount
        },0);
        state.amount = state.cartItems.reduce((cur, accu) =>{
            return cur + (accu.amount * accu.price)
        },0);
        },
        increaseQuantity:(state,{ payload}) =>{
            const cartItem = state.cartItems.find((item) => item._id === payload);
           cartItem.amount = cartItem.amount + 1
            state.total = state.cartItems.reduce((cur, accu) =>{
                return cur + accu.amount
            },0);
            state.amount = state.cartItems.reduce((cur, accu) =>{
                const dis =(accu.discount | 0 )/100 * accu.price * accu.amount;

                return (cur + accu.amount * accu.price) - dis;
            },0);
        },
        decreaseQuantity :(state,{payload}) =>{
            const cartItem = state.cartItems.find((item) => item._id === payload);
            cartItem.amount = cartItem.amount - 1;
            if(cartItem.amount <= 0 ){
                state.cartItems = state.cartItems.filter(i => i._id !== payload)
            }
                state.total = state.cartItems.reduce((cur, accu) =>{
                    return cur + accu.amount
                },0);
                state.amount = state.cartItems.reduce((cur, accu) =>{
                    return cur + (accu.amount * accu.price)
                },0);
        },
    }
});

export const { clearCart, addItem, removeItem, increaseQuantity, decreaseQuantity  } = cartSlice.actions;

export default cartSlice.reducer;