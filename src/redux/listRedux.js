import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:"wishlist",
    initialState:{
        products:[],
        count:0,
    },

    reducers:{
        updateList:(state,action)=>{    //as products is passes as parameter , therefore action.payload is products
            state.products=action.payload;
            state.count=action.payload.length;
        },
        
        createList:(state,action)=>{
            state.products=action.payload.products;
            state.count=action.payload.products.length;
        }, 
        clearList:(state)=>{
            state.products=[];
            state.count=0;
        }
    }

});

export const {updateList ,createList,clearList}=wishlistSlice.actions;
export default wishlistSlice.reducer;
