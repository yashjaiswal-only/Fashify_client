import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name:"order",
    initialState:{
        orders:[]
    },

    reducers:{
        addOrder:(state,action)=>{
            state.orders.push(action.payload);
        },
        createOrder:(state,action)=>{
            state.orders=action.payload;
        },
        clearOrder:(state)=>{
            state.orders=[]
        }
    }

});

export const {addOrder,createOrder,clearOrder}=orderSlice.actions;
export default orderSlice.reducer;
