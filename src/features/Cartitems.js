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
            const isExit = state.cartItems.find(i => i.id === payload.id) !== undefined;
            
            if(isExit){
                const item = state.cartItems.find(item => item.id === payload.id)
                item.amount = item.amount + 1;
            }else{
                state.cartItems = [...state.cartItems, payload]
            }
            state.total = state.cartItems.reduce((cur, accu) =>{
                return cur + accu.amount
            },0);
            state.amount = state.cartItems.reduce((cur, accu) =>{
                return cur + (accu.amount * accu.price)
            },0);
  
        },
        removeItem : (state, { payload }) =>{
           state.cartItems = state.cartItems.filter(i => i.id !== payload)
           state.total = state.cartItems.reduce((cur, accu) =>{
            return cur + accu.amount
        },0);
        state.amount = state.cartItems.reduce((cur, accu) =>{
            return cur + (accu.amount * accu.price)
        },0);
        },
        increaseQuantity:(state,{ payload}) =>{
            const cartItem = state.cartItems.find((item) => item.id === payload);
           cartItem.amount = cartItem.amount + 1
            state.total = state.cartItems.reduce((cur, accu) =>{
                return cur + accu.amount
            },0);
            state.amount = state.cartItems.reduce((cur, accu) =>{
                return cur + (accu.amount * accu.price)
            },0);
        },
        decreaseQuantity :(state,{payload}) =>{
            const cartItem = state.cartItems.find((item) => item.id === payload);
            cartItem.amount = cartItem.amount - 1;
            if(cartItem.amount <= 0 ){
                state.cartItems = state.cartItems.filter(i => i.id !== payload)
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