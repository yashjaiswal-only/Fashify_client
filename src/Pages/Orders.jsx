import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import { useSelector } from 'react-redux'
import Order from '../components/Order'
import { Link, useNavigate } from 'react-router-dom'


const Orders = () => {
  const orders=useSelector(state=>state.order?state.order.orders:state.order);
  const list=useSelector(state=>state.list)
  // console.log(orders)

  //to get to top on rendering
  useEffect(() => { 
      window.scrollTo(0, 0)
    }, [])
  const navigate=useNavigate();
  return (
    <>
      <Navbar/>
      <Announcement/>
      <Container>
          <Top>
              <BackBtn onClick={()=>navigate('/')}>Home</BackBtn>
              <Title>Your Orders</Title>
          </Top>
        {orders.length===0 ? <Bottom><img src='https://media3.giphy.com/media/ZgTR3UQ9XAWDvqy9jv/giphy.gif?cid=ecf05e47qz6j91e2q09taunficy2vuit86oyl1qvja18uzb6&rid=giphy.gif&ct=g' /> <NoOrders>No Orders Now ! </NoOrders></Bottom>
        :null}
        {orders ? orders.slice().reverse().map(order=>//orders is read only , first copy then reverse
            <Order key={order._id} order={order}/>
          )
        :null}
      </Container>
      <Footer/>
    </>
  )
}

const Title =styled.div`
  text-align:center;
  font-size: 2rem;
  font-weight: 600;
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
const Top =styled.div`
    /* display: flex; */
    /* align-items: center; */
    width:100%;
    position: relative;
    /* justify-content: center; */
    padding: 20px;
`
const BackBtn =styled.button`
    position:absolute;
    font-size: 25px;
    font-size: 1rem;
    background:none;
    border-color:teal;
    border-radius:10%;
    &:hover{
        background-color: #f8f4f4;
    }

    /* padding: 10px;
    font-weight: 600;
    cursor:pointer;
    border:${props=>props.type==="filled" && "none"};
    background-color:${props=>props.type==="filled"?"black":"transparent"};
    color:${props=>props.type==="filled" && "white"}; */
`

const Container=styled.div`
  margin:1rem;
`

export default Orders
