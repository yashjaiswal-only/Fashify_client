import styled from "styled-components"
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteBorderOutlined, FavoriteOutlined, SearchOutlined } from "@mui/icons-material";

import {Link} from "react-router-dom"
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToList, deleteFromList } from "../redux/apiCalls";
// semicolon's are must in css

const Circle=styled.div`
    width:70%;
    height:70%;
    border-radius:50%;
    background-color:white;
    position:absolute;
`
const Image=styled.img`
    width:${props=>props.hover?95:80}%;
    height:${props=>props.hover?95:80}%;
    transition:all 0.8s ease;
    z-index:2;

`
const Info=styled.div`
    opacity:0;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background-color:rgba(0,0,0,0.2);
    z-index:3;
    display:flex;
    align-items: center;
    justify-content: center;
    transition:all 0.5s ease;
    cursor:pointer;
`
const Icon=styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    background-color:white;
    display:flex;
    align-items: center;
    justify-content: center;
    margin:10px;
    &:hover{
        background-color:#e9f5f5;
        transform:scale(1.3);
        transition:all 0.5s ease;
    }
`

const Container=styled.div`
    flex:4;
    margin:5px;
    min-width:15rem;
    max-width:20rem;
    aspect-ratio: 8/9;
    /* height:20rem;  */
    display:flex;
    align-items: center;
    justify-content: center;
    background-color:#fff8f8;
    position:relative;
    -webkit-box-shadow: 0px 0px 10px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    &:hover ${Info}{
        opacity:1;  
    }
    /* changing style of another component on hovering on another  */
`
const Product = ({item}) => {
    
    const [hover,setHover]=useState(false);
    const user=useSelector(state=>state.user?state.user.currentUser:state.user); 
    const productsInCart=useSelector(state=>state.cart?state.cart.products:state.cart);
    const productsInList=useSelector(state=>state.list?state.list.products:state.list);
    const total=useSelector(state=>state.cart?state.cart.total:state.cart);
    const [warning,setWarning]=useState(false);
    const makeWarning=()=>setWarning(user?false:true) ;
    const removeWarning=()=>setWarning(false) ;

    const quantity=1;
    const dispatch=useDispatch();
    const handleClick=(product)=>{
        if(user){
            const choosenProduct={
                stamp:new Date().getSeconds()+new Date().getTime()+product._id,//to differentiate 2 products added seperately
                productId:product._id,
                title:product.title,
                img:product.img,
                color:product.color[0],
                size:product.size[0],
                price:product.price,
                quantity:quantity
            };
            const cost=choosenProduct.price*choosenProduct.quantity;
            const updatedProducts=[...productsInCart,{...choosenProduct}];
            // console.log('at product')
            // console.log(updatedProducts)
            dispatch(addToCart(dispatch,user._id,updatedProducts,total+cost,user.accessToken) ) //color is size is monotonic till there its not including in product to add to cart
                
        }
    }
    const favourite=(product)=>{
        if(user){
            const choosenProduct={
                productId:product._id,
                title:product.title,
                img:product.img,
                color:product.color[0],
                size:product.size[0],
                price:product.price,
            };
            const updatedProducts=[...productsInList,choosenProduct];
            // console.log('at product')
            // console.log(updatedProducts)
            addToList(dispatch,user._id,updatedProducts,user.accessToken)                  
        }
    }
    const favProducts=useSelector(state=>state.list.products);
    const unfavourite=(deletedId)=>{
        console.log(deletedId)
        const updatedProducts=favProducts.filter(p=>p.productId!=deletedId);
        console.log(updatedProducts);
        setFav(false);
        deleteFromList(dispatch,user._id,updatedProducts,user.accessToken);
    } 
    const [fav,setFav]=useState(false);
    useEffect(()=>{
        if(productsInList.find(p=>p.productId===item._id)) setFav(true);        
    },[productsInList,item])
  return (
    <Container onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)}>
        <Circle />
        <Image hover={hover} src={item.img} alt="image is unavailable"/> 
        <Info>
            <Icon>
                <Tooltip title={warning===false?<span style={{fontSize:'15px'}}>Add to Cart</span>:<span style={{fontSize:'15px'}}>Login to add to cart</span>} >
                <ShoppingCartOutlined onClick={()=>handleClick(item)}  onMouseOver={makeWarning} onMouseOut={removeWarning}/>
                </Tooltip>
            </Icon>
            <Icon>
                <Link to={`/product/${item._id}`} className='link'>
                <Tooltip title={<span style={{fontSize:'15px'}}>Look Out</span>}><SearchOutlined /></Tooltip>
                </Link>
            </Icon>
            <Icon>
                <Tooltip title={warning===false?fav?<span style={{fontSize:'15px'}}>Remove from Wishlist</span>:<span style={{fontSize:'15px'}}>Add to Wishlist</span>:<span style={{fontSize:'15px'}}>Login to add to Wishlist</span>}>
                {fav?<FavoriteIcon sx={{ 
                        color: "red", 
                        border:'1rem',
                    }} onClick={()=>unfavourite(item._id)}  onMouseOver={makeWarning} onMouseOut={removeWarning} />
                    :<FavoriteBorderOutlined onClick={()=>favourite(item)}  onMouseOver={makeWarning} onMouseOut={removeWarning} />}
                </Tooltip>
            </Icon>
        </Info>
    </Container>
  )
}

export default Product
