import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        count:0,
        total:0,
    },

    reducers:{
        addProduct:(state,action)=>{
            state.products=action.payload.products;
            state.count=action.payload.products.length;
            state.total=action.payload.total;
        },
        deleteProduct:(state,action)=>{
            state.products=action.payload.products;
            state.count=action.payload.products.length;
            state.total=action.payload.total;
            
        },
        createCart:(state,action)=>{
            state.products=action.payload.products;
            state.count=action.payload.products.length;
            state.total=action.payload.total|0;
        }, 
        clearCart:(state)=>{
            state.products=[];
            state.count=0;
            state.total=0;
            
        }
    }

});

export const {addProduct,deleteProduct ,createCart,clearCart}=cartSlice.actions;
export default cartSlice.reducer;
