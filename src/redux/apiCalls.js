import axios from "axios";
import { publicRequest, userRequest } from "../requestMethod";
import { addProduct, clearCart, createCart, deleteProduct } from "./cartRedux";
import { createList, updateList } from "./listRedux";
import { addOrder,createOrder } from "./orderRedux";
import { loginFailure, loginStart, loginSuccess,updateUser } from "./userRedux"
// const user1=JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser;
// console.log(process.env.REACT_APP_BASE_URL+'/api/user');
const BASE_URL=process.env.REACT_APP_BASE_URL;

export const editUser= async (dispatch,updatedUser,userId,accessToken)=>{//just api calling no redux involve
    try{
        // const res=await userRequest.put('/users/'+id,user)   - waste
        const body=updatedUser;
        const config={
            headers:{
                'token': `Bearer ${accessToken}`
            }
        }
        const url=`http://localhost:5000/api/users/${userId}`;
        await axios.put(url,body,config)
        .then(res=>{
            // console.log(res);
            dispatch(updateUser(res.data));
        })
        .catch(err=>console.log(err))
    }
    catch(err){
        console.log(err)
    }
}

export const login= async (dispatch,user)=>{
    dispatch(loginStart());
    try{
        // console.log(user);
        const res=await publicRequest.post('/auth/login',user)
        // console.log(res);
        
        const config={
            headers:{
                'token': `Bearer ${res.data.accessToken}`
            }
        }

        //CART
        var usercart;
        var url=BASE_URL+`/carts/find/${res.data._id}`;
        await axios.get(url,config)
        .then(res=>{
            usercart=res;
        })
        .catch(err=>console.log(err)) //response thoda baad me aata hai
        if(usercart.data===null){
            console.log('no previous cart')
            const body={
                userId:res.data._id,
                // products:[]  //no product array was created initially 
            }
            const url2=BASE_URL+`/carts/${res.data._id}`;
            await axios.post(url2,body,config)
            .then(res=>{
                usercart=res
                // console.log(res);
                // console.log('card created')
            })
            .catch(err=>{console.log(err);  })
        }
        dispatch(createCart(usercart.data));

        //LIST
        var userlist;
        url=BASE_URL+`/wishlist/find/${res.data._id}`;
        await axios.get(url,config)
        .then(res=>{
            userlist=res;
        })
        .catch(err=>console.log(err))
        if(userlist.data===null){    //create a list at database
            console.log('no previous wishlist');
            const body={
                userId:res.data._id,
                // products:[]
            }
            const url2=BASE_URL+`/wishlist/${res.data._id}`;
            await axios.post(url2,body,config)
            .then(res=>{
                userlist=res
                // console.log(res);
                // console.log('wishlist created')
            })
            .catch(err=>{console.log(err);  })
        }
        dispatch(createList(userlist.data));
        
        //ORDERS
        var orderslist;
        url=BASE_URL+`/orders/find/${res.data._id}`;
        await axios.get(url,config)
        .then(res=>{
            orderslist=res;
        })
        .catch(err=>console.log(err))
        dispatch(createOrder(orderslist.data));
        
        await dispatch(loginSuccess(res.data))

        // console.log('loginSuccess');
        return res;
    }
    catch(err){
        dispatch(loginFailure());
        console.log(err)
    }
}

export const register= async (dispatch,user)=>{//just api calling no redux involve
    dispatch(loginStart());
    try{
        const res=await publicRequest.post('/auth/register',user)
        dispatch(loginSuccess(res.data));
        //we can't have auth token here , so login is required after registering
        return res;
    }
    catch(err){
        dispatch(loginFailure());
        console.log(err)
    }
}

export const userAvailable= async (username)=>{//just api calling no redux involve
    try{
        const res=await publicRequest.post('/auth/find',{username})
        // console.log(res);
        return res;
    }
    catch(err){
        console.log(err)
    }
}

//cart schema is {userId,product[productId,quantity of each product]}
export const addToCart= async (dispatch,userId,products,updatedtotal,accessToken)=>{
    // console.log('add to cart')
    // console.log(products)   //updated products
    try {
        const body={products:products,total:updatedtotal};
        const config={
            headers:{
                'token': `Bearer ${accessToken}`
            }
        }
        const url=BASE_URL+`/carts/${userId}`;
        await axios.put(url,body,config)
        .then(res=>{
            dispatch(addProduct({products:products,total:updatedtotal}));
        })
        .catch(err=>{console.log(err);  })

        // const res=await userRequest.put('/carts/'+userId,);
    } catch (err) {
        console.log(err)        
    }
}

export const deleteFromCart= async (dispatch,userId,products,updatedtotal,accessToken)=>{
    // console.log('delete from cart')
    // console.log(products)
    try {
        // const res=await userRequest.put('/carts/'+userId,{products:products});
        //  token at userrequest doesn't updates on time
        const body={products:products,total:updatedtotal};
        const config={
            headers:{
                'token': `Bearer ${accessToken}`
            }
        }
        const url=BASE_URL+`/carts/${userId}`;
        await axios.put(url,body,config)
        .then(res=>{
            dispatch(deleteProduct({products:products,total:updatedtotal}));
        })
        .catch(err=>{console.log(err);  })

    } catch (err) {
        console.log(err)        
    }
}

export const addToList = async (dispatch , userId,newProducts,accessToken)=>{
    try {
        var userlist;

        const config={
            headers:{
                'token': `Bearer ${accessToken}`
            }
        }
        // console.log('list available')
        // console.log(newProducts);
        const body={
            products:newProducts,
        }
        const url2=BASE_URL+`/wishlist/${userId}`;
        await axios.put(url2,body,config)
        .then(res=>{
            userlist=res ;
        })
        .catch(err=>{console.log(err);  })
        dispatch(updateList(newProducts));
        
    } catch (err) {
        console.log(err)
    }
}

export const deleteFromList= async (dispatch,userId,products,accessToken)=>{
    console.log('delete from cart')
    console.log(products)
    try {
        //  token at userrequest doesn't updates on time
        const body={products:products};
        const config={
            headers:{
                'token': `Bearer ${accessToken}`
            }
        }
        const url=BASE_URL+`/wishlist/${userId}`;
        await axios.put(url,body,config)
        .then(res=>{
            dispatch(updateList(products));
        })
        .catch(err=>{console.log(err);  })

    } catch (err) {
        console.log(err)        
    }
}

export const makeOrder=async (dispatch,userId,order,accessToken)=>{
    const config={
        headers:{
            'token': `Bearer ${accessToken}`
        }
    }
    var body=order;
    var url=BASE_URL+`/orders/${userId}`;
    await axios.post(url,body,config)
    .then(res=>{
    //    console.log(res);
    //    console.log('order placed')
       dispatch(addOrder(res.data));
    }) 
    .catch(err=>{console.log(err);  })

    //delete this user's cart too
    body={
        products:[]  ,
        total:0
    }
    url=BASE_URL+`/carts/${userId}`;
    await axios.put(url,body,config)
    .then(res=>{
        // console.log(res);
        // console.log('cart empied')
        dispatch(clearCart());
    }) 
    .catch(err=>{console.log(err);  })

}