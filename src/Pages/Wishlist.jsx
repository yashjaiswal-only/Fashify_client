import {  ShoppingCartCheckout } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import {deleteFromList} from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
// import Product from '../components/Product'
const Title=styled.div`
    padding: 2rem 0rem 0rem 3rem;
    /* text-align:center; */
    font-size: 2rem;
    font-weight: 500;
`
const Container=styled.div`
    padding: 2rem;
    display: flex;
    flex-wrap:wrap;
`
const Product=styled.div`
    flex:1;
    min-width: 15rem;
    max-width: 20rem;
    aspect-ratio:3/4;
    margin:1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    -webkit-box-shadow: 0px 3px 5px 8px rgba(222,198,222,0.58);
    -moz-box-shadow: 0px 3px 5px 8px rgba(222,198,222,0.58);
    box-shadow: 0px 3px 5px 8px rgba(222,198,222,0.58);

`
const Circle=styled.div`
    top: 0.5rem;
    width:90%;
    height:70%;
    border-radius:50%;
    background-color:white;
    position:absolute;
`
const Image=styled.img`
    width: 90%;
    height: 70%;
    z-index:2;
    flex:4;
`
const Info=styled.div`
    z-index:2;
    width:95%;
    /* height: 20%; */
    margin:1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-weight: 500;
    font-size: 1rem;
    flex:2;
    padding: 0rem 1rem;
    
`
const ProductName=styled.div``
const ProductPrice=styled.div``
const ProductId=styled.div``
const Button=styled.button`
    border:none;
    font-size: 1.5rem;
    margin: 1rem;
    border-radius:2rem;
    padding: 0.5rem 2rem;
    color:white;
    background-color: #7ac3c3;
    flex:1;
    display: flex;
    align-items: center;
    cursor:pointer;
    &:hover{
        background-color: green;
    }
`
const DeleteBtn=styled.div`
    position: absolute;
    right:1rem;
    top:1rem;
    z-index:3;
`
const BackBtn =styled.button`
    position:absolute;
    font-size: 15px;
    margin:10px;
    background:none;
    border-color:teal;
    border-radius:10%;
    cursor:pointer;
    &:hover{
        background-color: #f8f4f4;
    }
`

const Bottom =styled.div`
  display: flex;
  justify-content: space-around;
`
const NoOrders=styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
`

const Wishlist = () => {
    const favProducts=useSelector(state=>state.list.products);
    const user=useSelector(state=>state.user.currentUser);
    // console.log(favProducts)
    const deleteProduct=(deletedId)=>{
        const updatedProducts=favProducts.filter(p=>p.productId!=deletedId);
        deleteFromList(dispatch,user._id,updatedProducts,user.accessToken);
    } 
    const dispatch=useDispatch();
    const navigate=useNavigate();

     //to get to top on rendering
     useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  return (
    <div>
      <Navbar/>
      <Announcement/>
      <BackBtn onClick={()=>navigate(-1)}>Back</BackBtn>
        <Title> My List - Wishlist
        </Title>
      <Container>
        {favProducts.length===0 && <Bottom><img src='https://media3.giphy.com/media/ZgTR3UQ9XAWDvqy9jv/giphy.gif?cid=ecf05e47qz6j91e2q09taunficy2vuit86oyl1qvja18uzb6&rid=giphy.gif&ct=g' /> <NoOrders>Your List is empty ! </NoOrders></Bottom>}
        {favProducts.map((item)=>(<Product key={item._id}>
            <DeleteBtn >
                <Tooltip title="Remove from Wishlist">
                    <FavoriteIcon sx={{ 
                        color: "red", 
                        border:'1rem',
                        fontSize:'2rem'
                    }} onClick={()=>deleteProduct(item.productId)} />
                </Tooltip> 
            </DeleteBtn> 
            <Circle />
            <Image src={item.img}/>
            <Info>
            <ProductName><b>Product:</b>{item.title.charAt(0).toUpperCase()+item.title.slice(1)}</ProductName>
            <ProductId><b>ID:</b> {item.productId}</ProductId>
            <ProductPrice><b>Price:</b>${item.price}</ProductPrice>
            </Info>
            <Link className='link' to={`/product/${item.productId}`}>
                <Button ><ShoppingCartCheckout/>Checkout</Button>
            </Link>
        </Product>))}

      </Container>
      <Footer/>
    </div>
  )
}

export default Wishlist;
