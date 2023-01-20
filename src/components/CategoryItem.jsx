import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container=styled.div`
    flex:4;
    margin:3px;
    min-width:30%;
    height:70vh;
    position:relative;
`
const Image=styled.img`
    width:100%; 
    height:100%;
    /* 100percent of what space assign to it by flex 1 */
    object-fit:cover;
`
const Info=styled.div`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;

`
const Title=styled.h1`
    color:white;
    margin-bottom:20px;
    
`
const Button=styled.button`
    border:none;
    padding:10px;
    background-color:white;
    color:gray;
    cursor:pointer;
    
`
const Heading=styled.div`
    position: absolute;
    top:2rem;
    width: 100%;
    font-size: 1.5rem;
    color:#ffff6b;
    display: flex;
    align-items: center;
    flex-direction: column;

    font-family: Fasthand, serif;
    font-style:italic;
    text-align: center;
    font-size: 1.5rem;
    color: rgb(208, 232, 23);
    background:none;
    text-shadow: rgb(0, 0, 0) 2px 2px 2px;
`
const CategoryItem = ({item}) => {  //new way of destructuring
    const [hover,setHover]=useState(false);
  return (
    <Container onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)}>
        <Link to={`/products/${item.cat}`}>
        <Image src={item.img} alt="image"/>
        <Heading>{item.head}</Heading>
        <Info>
            <Title cat={item.cat}>{hover==0?item.title:item.cat.toUpperCase()}</Title>
            <Button> SHOP NOW </Button>
        </Info>
        </Link>
    </Container>
  )
}

export default CategoryItem
