import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import { Add, Remove,Delete, CleaningServices } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import {  deleteFromCart, makeOrder } from "../redux/apiCalls"
import { Tooltip } from "@mui/material"
import {PayPalButton} from 'react-paypal-button-v2'
// const dotenv =require('dotenv').config();   //not needed in react

const Cart = () => {
    const cart = useSelector(state=>state.cart)
    const user= useSelector(state=>state.user?state.user.currentUser:state.user)
    const list=useSelector(state=>state.list)
    const orders=useSelector(state=>state.order?state.order.orders:state.order);

    const dispatch=useDispatch();
    const deleteProduct=(deletedId,cost)=>{
        console.log(deletedId)
        const updatedProducts=cart.products.filter(p=>p.stamp!=deletedId)
        // console.log('updated products')
        // console.log(updatedProducts);
        deleteFromCart(dispatch,user._id,updatedProducts,cart.total-cost,user.accessToken);
    }    
    const continueShopping=()=>{
        navigate(-1);
    }
    const handleQuantity=(product,type)=>{
       
    }
   
    const navigate= useNavigate();
    
    //to get to top on rendering
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [sdkReady,setSdkReady]=useState(false);     
    const [pay,setPay]=useState(false);

    // useEffect(()=>{
    //     const addPaypalScript=async()=>{
    //         const {data:clientId}  =await axios.get('http://localhost:5000/api/config/paypal');//alias data imported as clientId
    //         const script=document.createElement('script');
    //         script.type='text/javascript'
    //         script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
    //         script.async=true;
    //         script.onload=()=>{
    //             setSdkReady(true);
    //         }
    //         document.body.appendChild(script);
    //     }
    //     if(pay){if(!window.paypal){
    //         addPaypalScript();
    //     }
    //     else{
    //         setSdkReady(true);
    //     }}
    // },[pay])
    
    const d=Date.now();
    console.log(d)
    const paymentSuccess=(paymentResult)=>{
        console.log(paymentResult);
        // console.log('payled');
        const order={
            userId:user._id,
            products:cart.products,
            amount:cart.total,
            address:paymentResult.payer?paymentResult.payer.address:"",
            placed_at:paymentResult?paymentResult.create_time:"",
            paymentId:paymentResult?paymentResult.id:""
        }
        console.log(order);
        makeOrder(dispatch,user._id,order,user.accessToken);
        setPay(false);
        navigate('/orders');
    }

  return (
    <Container style={pay?{height:'100vh',overflow:'hidden'}:{}}>
        {pay && <Payment>
            <CancelPayment onClick={()=>setPay(false)}>Cancel Payment</CancelPayment>
            <Cash onClick={()=>{paymentSuccess({create_time:Date.now()})}}>Make Payment On Delivery</Cash>
        <PayPalButton amount={cart.total} onSuccess={paymentSuccess}/>
        </Payment>}
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton onClick={continueShopping}>CONTINUE SHOPPING</TopButton>
                <TopTexts>
                    <TopText><Link className="link" to='/orders'>Shopping Bag({orders?orders.length:0})</Link></TopText>
                    <TopText><Link className="link" to='/wishlist'>Your Wishlist ({list?list.count:0})</Link></TopText>
                </TopTexts>
                <TopButton type="filled" onClick={()=>setPay(true)}>CHECKOUT NOW</TopButton>
            </Top>
            <Bottom> 
                <Info>
                    {/* cart hi na ho ya fir cart me product na ho product ki length zero ho */}
                    {(!cart || !cart.products.length)?
                        <Empty><img src='https://media3.giphy.com/media/ZgTR3UQ9XAWDvqy9jv/giphy.gif?cid=ecf05e47qz6j91e2q09taunficy2vuit86oyl1qvja18uzb6&rid=giphy.gif&ct=g' /> 
                        <NoOrders>Your Cart is empty ! </NoOrders></Empty>
                    :null} 
                    {/* use real conditional operator for conditional render , not and or */}
                    {(cart && cart.products.length)?cart.products.map((product)=>(
                        <Product key={product.stamp}>
                        <ProductDetail>
                            <Image src={product.img} />
                            <Details>
                            <ProductName>
                                <b>Product:</b> {product.title}
                            </ProductName>
                            <ProductId>
                                <b>ID:</b> {product.productId}
                            </ProductId>
                            <ProductColor color={product.color} />
                            <ProductSize>
                                <b>Size:</b> {product.size}
                            </ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <Remove onClick={()=>handleQuantity(product,"dec")}/>
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <Add onClick={()=>handleQuantity(product,"inc")}/>
                            </ProductAmountContainer>
                            <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
                        </PriceDetail>
                            <DeleteIcon>
                                <Tooltip title="Remove from cart">
                                    <Delete  onClick={()=>deleteProduct(product.stamp,product.price*product.quantity)} />
                                </Tooltip>
                            </DeleteIcon>
                        </Product>
                        )):null}
                    <Hr />
                    
                </Info>
                
                {(cart && cart.products.length)?
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                        <SummaryItemText>Subtotal</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                            {/* <PayPalButton amount={cart.total} onSuccess={paymentSuccess}/> */}
                        <Button onClick={()=>setPay(true)}>CHECKOUT NOW</Button>
                    </Summary>
                :null}
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

const Empty =styled.div`
  display: flex;
  justify-content: space-around;
`
const NoOrders=styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
`
const Container =styled.div`
`
const Cash =styled.button`
    font-size:1rem;
    padding:0.5rem 2rem;
    margin: 1rem;
    cursor:pointer;
    background-color: black;
    color:white;
`
const CancelPayment =styled.button`
    margin:1rem;
    padding: 1rem;
    border:0.3rem solid black;
    background: none;
    font-weight: 600;
    font-size: 1rem;
    border-radius:1rem;
    curson:pointer;
`
const Payment=styled.div`
    /* top:0; */
    width:100vw;
    height:100vh;
    background-color:rgba(255,255,255, 0.7);
    
    /* background-color: black; */
    z-index: 950;
    display: flex;
    justify-content: center;align-items: center;
    flex-direction: column;
    position: absolute;
`
const Wrapper =styled.div`
    padding: 20px;
`
const Title =styled.h1`
    font-weight: 300;
    text-align: center;

`
const Top =styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton =styled.button`
    padding: 10px;
    font-weight: 600;
    cursor:pointer;
    border:${props=>props.type==="filled" && "none"};
    background-color:${props=>props.type==="filled"?"black":"transparent"};
    color:${props=>props.type==="filled" && "white"};
`
const TopTexts=styled.div`

`
const TopText=styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin:0px 10px;
`
const Bottom=styled.div`
    display: flex;
    justify-content: space-between;
`
const Info=styled.div`
    flex:3;
`
const Product=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ProductDetail=styled.div`
    flex:4;
    display: flex;
`
const Image=styled.img`
    width:200px;
`
const Details=styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName=styled.span``
const ProductId=styled.span``
const ProductColor=styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color: ${props=>props.color};
`
const ProductSize=styled.span``
const PriceDetail=styled.div`
    flex:2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer=styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount=styled.div`
    font-size: 24px;
    margin: 5px;
`
const ProductPrice=styled.div`
    font-size: 30px;
    font-weight: 300;
`
const DeleteIcon=styled.div`
    flex:1;
    cursor:pointer;
`
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor:pointer;
`;


export default Cart
