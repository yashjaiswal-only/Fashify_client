import { useEffect, useState } from "react"
import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"
import axios from "axios"
import { CircularProgress } from "@mui/material"

const Container=styled.div`
    padding:20px;
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
  `
const Show=styled.div`
top:0;
  display: flex;  align-items: center; justify-content: space-around;
  width: 100%;
`
const NoProducts=styled.div`
  font-size: 2rem;
  font-weight: bold;
`
const Image=styled.img`
  height: 20rem;
  object-fit:cover;
`
const Products = ({cat,filters,sort,home,all,hasFilter}) => {

  const [products,setProducts]=useState([]);
  const [filteredproducts,setFilteredProducts]=useState([]);
  useEffect(()=>{
    const getProducts = async ()=>{
      try {
          const res =await axios.get(cat?process.env.REACT_APP_BASE_URL+`/products?category=${cat}`:process.env.REACT_APP_BASE_URL+"/products/");
          // console.log(res.data);
          setProducts(res.data);
      } catch (err) { }
    }//function to call the api and get the products of cat category or all products if cat not given (in home page)
    getProducts();  //call the function on changing dependency cat
  },[cat])

  useEffect(()=>{//filter only if products is not called from home
    !home  && setFilteredProducts(
      products.filter(  //filter method takes a function which returns true or false
          item=>Object.entries(filters).every(
            ([key,value])=>item[key].includes(value)
          )//entries gives key value pair for all index of filters , through every key value pair we check our item
      )
    )
  },[products,filters,home])

  useEffect(() => { //takes prev value of filteredProducts and sort it after spreading
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
          { cat &&  filteredproducts.map((item)=>(<Product key={item._id} item={item}   /> ))}
          { home && products.slice(0,8).map((item)=>(<Product key={item._id} item={item}  /> ))}
          { all && filteredproducts.map((item)=>(<Product key={item._id} item={item}  /> ))}
          {hasFilter && !filteredproducts.length && !home   && 
            <Show>
              <Image src='https://media.tenor.com/-A9wmSn8SpQAAAAi/fashion-animation.gif'/>
                <NoProducts>No products according to applied filter <br/> Please remove filters and try again ! </NoProducts>
            </Show>
          }
          {!hasFilter && !products.length && <CircularProgress/> }

    </Container>
  )
}

export default Products;
