import React from 'react'
import styled from "styled-components"
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import GpsFixedOutlinedIcon from '@mui/icons-material/GpsFixedOutlined';
import { useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip } from '@mui/material';
// import { Button } from '@mui/material';

const Order = ({order}) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const getAddress=(obj)=>{
        var arr=Object.values(obj);
        var address="";
        arr.forEach(element=>{address+=element+' '; });
        return address;
    }

  return (
    <>
   
   <Accordion  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
   sx={{
    margin:'1rem'
   }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          
            <Container>

           <TopShow>
                <TopLeft><OrderId>Order ID : {order._id}</OrderId></TopLeft>
                <TopRight>
                    <InvoiceBtn><DescriptionOutlinedIcon/>Invoice</InvoiceBtn>
                    <Tooltip title='Currently unavailable'><OrderTrackBtn><GpsFixedOutlinedIcon/>Track Order</OrderTrackBtn></Tooltip>
                </TopRight>
           </TopShow>

            <BottomShow>
                <OrderDate><span style={{color:'gray'}}>Order date</span> : { new Date(order.createdAt).toString().slice(0,15)}</OrderDate>
                <EstimatedDelivery>
                    <DeliveryDiningOutlinedIcon sx={{color:'#008738'}}/>
                     Estimated Delivery : { new Date(Date.now()).toString().slice(0,15)}
                </EstimatedDelivery>
            </BottomShow>
            </Container>

        </AccordionSummary>

        <AccordionDetails sx={{display:'flex',justifyContent:"space-between"}}>
            <hr/>
            <AccordionDetailsLeft>

          <Products>
            {order.products && order.products.map(product=>
                <Product key={product._id}>
                    <ImageContainer><Image src={product.img}/></ImageContainer>
                    
                    <Info>
                        <Left>
                        <ProductName>{product.title.toUpperCase()}</ProductName>
                        <ProductDetails>{product.color.toUpperCase()} | {product.size}</ProductDetails>
                        </Left>
                        <Right>
                        <ProductPrice>${product.price}</ProductPrice>
                        <ProductQuantity>Qty : {product.quantity}</ProductQuantity>
                        </Right>
                    </Info>
                </Product>
                )}
          </Products>
          <hr/>
          <Total>Total : $ {order.amount}</Total>
          <hr/>
          </AccordionDetailsLeft>

        <AccordionDetailsRight>

          <MoreDetails>
            <Left>
                <BottomTitle>Payment</BottomTitle>
                <PaymentDetails>

                Visa *****6478 <img style={{width:'3rem'}} src='https://img.icons8.com/color/2x/visa.png'/>
                </PaymentDetails>
            </Left>
            <Right>
                <BottomTitle>Delivery</BottomTitle>
                <Address>
                    {/* {getAddress(order.address)}; */}
                    {order.address.address_line_1} ,
                    {order.address.admin_area_1}<br/>
                    {order.address.admin_area_2}<br/>
                    {order.address.country_code} ,
                    {order.address.postal_code}

                </Address>
            </Right>
          </MoreDetails>
        </AccordionDetailsRight>
            
        </AccordionDetails>
      </Accordion>
    
    </>
  )
}

const AccordionDetailsRight=styled.div`
    width:20%;
    
`
const AccordionDetailsLeft=styled.div`
    width:70%;
`
const Container=styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`
const TopShow=styled.div`
    width: 80%;
    flex:2;
    display: flex;
    justify-content: space-between;
`
const TopRight=styled.div`
    display: flex;
    /* justify-content: space-around; */
`
const TopLeft=styled.div`
    font-size: 1.5rem;
    font-weight: 600;

`
const OrderId=styled.div``
const BottomShow=styled.div`
    width: 80%;
    margin: 1rem 0rem;
    display: flex;
    justify-content: space-between;
`
const OrderDate=styled.div`
    font-weight: 600;

`
const EstimatedDelivery=styled.div`
    display: flex;
    align-items: center;
    color:#008738;
    font-size: 1.1rem;
    font-weight: 600;
`
const InvoiceBtn=styled.button`
    background: none;
    font-size: 1rem;
    display: flex;
    align-items: center;
    margin: 1rem;
    padding: 0.3rem;
    border-radius:10%;
    border-width:0.1rem;
    border-color:gray;
    cursor:pointer;
    
    `
const OrderTrackBtn=styled.button`
    cursor:pointer;
    background: blue;
    color:white;
    font-size: 1rem;
    display: flex;
    align-items: center;
    margin: 1rem;
    padding: 0.3rem;
    border-radius:10%;
    border-width:0.1rem;
    border-color:gray;
`

const Address=styled.div`
    display: flex;
    align-items: center;
`
const PaymentDetails=styled.div`
    display: flex;
    align-items: center;
`
const BottomTitle=styled.div`
    font-weight: 600;
    font-size: 1rem;
`
const MoreDetails=styled.div`
    display: flex;
    padding:1rem;
    flex-direction:column;
    justify-content: space-around;
    background-color: #f8ffec;
    border-radius:10%;

`
const Total=styled.div`
    text-align:center;
    font-weight: 900;
    font-size: 1.5rem;
`
const Left=styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    `
const Right=styled.div`
    margin:1rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;

`
const ProductDetails=styled.div``
const ProductQuantity=styled.div``

const Image=styled.img`
    /* flex:1; */
    aspect-ratio:1/1;
    object-fit:cover;
    width: 100%;
    `
const ImageContainer=styled.div`
    width: 12%;
    margin: 0.5rem;
    background-color: gray;
    border-radius:10%;
`
const Info=styled.div`
    /* flex:3; */
    margin: 1rem;
    width:80%;
    aspect-ration:10/1;
    display: flex;
    justify-content: space-between;
`
const ProductName=styled.div`
    font-size: 1.5rem;
    font-weight: 600;
`
const ProductPrice=styled.div`
    font-size: 1.5rem;
    font-weight: 900;
`
const Product=styled.div`
    display: flex;
`
const Products=styled.div``

export default Order
