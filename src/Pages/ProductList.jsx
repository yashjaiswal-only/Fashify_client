import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Tooltip } from "@mui/material"
import { RemoveCircleOutline } from "@mui/icons-material"

const Container = styled.div`
   
`
const Title = styled.h1`
    margin: 20px;
    text-align:center;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;

`
const Filter = styled.div`
    margin: 20px;
    display: flex;
    align-items: center;
`
const FilterText=styled.span`
    font-size:20px;
    font-weight: 600;
    margin-right: 20px;
`
const Select=styled.select`
    padding: 10px;
    margin-right: 20px;
`
const Button=styled.button`
    font-size: 20px;
    padding: 8px;
    border-radius:10%;
    background-color: teal;
    color:white;
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
const Option=styled.option``
const ProductList = () => {
    //to get category value from url
    const location = useLocation();
    const cat=(location.pathname.split("/")[2]);
    const navigate=useNavigate();

    const [filters,setFilters]=useState({});
    const [sort,setSort]=useState("newest");
    const [hasFilter,setHasFilter]=useState(false);

    const handleFilters=(e)=>{
        setHasFilter(true);
        const value=e.target.value;
        setFilters({
            ...filters,      //to append filter (size + color)
            [e.target.name]:e.target.name==='color'?value.toLowerCase():value,
        });
    };
    // console.log(cat)
    const removeFilters=e=>{
        const selecteditem=document.getElementsByClassName("filter");
        selecteditem[0].options.selectedIndex=0;
        selecteditem[1].options.selectedIndex=0;
        setFilters({});
        setHasFilter(false);
    }

    //to get to top on rendering
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

  return (
    <>
      <Navbar />
        <Announcement/>
    <Container>
        <BackBtn onClick={()=>navigate('/')}>Back</BackBtn>
        <Title>{cat?cat.charAt(0).toUpperCase()+cat.slice(1):"Products"}</Title>  
        
        <FilterContainer>
            <Filter>
                <FilterText>Filter Products:</FilterText>   
                <Select className="filter" name="color" onChange={handleFilters}>
                    <Option disabled selected defaultValue>
                        Color
                    </Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Blue</Option>
                    <Option>Yellow</Option>
                    <Option>Green</Option>
                </Select>
                <Select className="filter"  name="size" onChange={handleFilters}>
                    <Option selected disabled defaultValue>
                        Size 
                    </Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
                {/* <Button>Remove Filters</Button> */}
                <Tooltip title='Remove Filters'><RemoveCircleOutline onClick={removeFilters}/></Tooltip>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText> 
                <Select onChange={(e)=> setSort(e.target.value)}>
                    <Option value="newest">
                        Newest 
                    </Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>

        {cat?<Products cat={cat} filters={filters} sort={sort} hasFilter={hasFilter}/>:<Products all={true} filters={filters} sort={sort} hasFilter={hasFilter}/>}
    </Container>
        {/* <Newsletter/> */}
        <Footer/>
    </>

  )
}

export default ProductList
