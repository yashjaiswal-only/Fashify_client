import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import { Add, Remove } from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { publicRequest } from "../requestMethod"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/apiCalls"

const Product = () => {
    const location = useLocation();
    const id=location.pathname.split("/")[2];
    const productsInCart=useSelector(state=>state.cart?state.cart.products:state.cart);
    const total=useSelector(state=>state.cart?state.cart.total:state.cart);
    const user=useSelector(state=>state.user?state.user.currentUser:state.user); 
    const [quantity,setQuantity]=useState(1);
    const [product,setProduct]=useState({});
    const [color,setColor]=useState();
    const [size,setSize]=useState("");
    const handleQuantity=(type)=>{
        if(type=="dec" && quantity>1) setQuantity(quantity-1);
        if(type=="inc") setQuantity(quantity+1);
    }
    const dispatch=useDispatch();
    const handleClick=()=>{
        //update cart
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
            addToCart(dispatch,user._id,updatedProducts,total+cost,user.accessToken) 
            //color is size is monotonic till there its not including in product to add to cart
                
        }
    }
    

    useEffect(()=>{
        const getProduct = async ()=>{
            try {
                const res =await publicRequest.get(`/products/find/${id}`);
                setProduct(res.data);
                // console.log(product) //update takes time , cant print just after the value is set
            } catch (err) { }
        }   //get product of given id
        getProduct();   //call the function on dependency
    },[id])
      
    //to get to top on rendering
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    const [warning,setWarning]=useState(false);
    const makeWarning=()=>setWarning(user?false:true) ;
    const removeWarning=()=>setWarning(false) ;
    const navigate=useNavigate(-1);
    
  return ( 
    <Container>
        <Navbar />
        <Announcement/>
        <BackBtn onClick={()=>navigate(-1)}>Back</BackBtn>
        <Wrapper>
            <ImgContainer>
                <Image src={product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>
                    {product.desc}
                </Desc>
                <Price>$ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.color && product.color.map((c)=>(
                            <FilterColor color={c} key={c} onClick={()=>setColor(c)} />
                        ))}
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={e=>setSize(e.target.value)} >
                        {product.size && product.size.map(s=>(
                            <FilterSizeOption key={s}>{s}</FilterSizeOption>
                        ))}
                        </FilterSize>
                    </Filter>

                </FilterContainer>

                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=>handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                        <Add onClick={()=>handleQuantity("inc")}  />
                    </AmountContainer>
                    {/* <Tooltip title="login"> */}
                        <Button onClick={handleClick}  onMouseOver={makeWarning} onMouseOut={removeWarning}>ADD TO CART</Button>
                    {/* </Tooltip> */}
                </AddContainer> 
                    {warning && <div style={{color:'red',margin:'5px'}}>Login before adding products to cart</div>}
            </InfoContainer>
        </Wrapper>

        <Newsletter/>
        <Footer/>
    </Container>
  )
}

const Container =styled.div`
    
`
const BackBtn =styled.button`
    position:absolute;
    font-size: 25px;
    margin:20px;
    background:none;
    border-color:teal;
    border-radius:10%;
    &:hover{
        background-color: #f8f4f4;
    }
`

const Wrapper =styled.div`
    padding: 50px;
    display: flex;
`
const ImgContainer =styled.div`
    flex: 1;
`
const Image =styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;

`
const InfoContainer =styled.div`
    flex:1;
    padding: 0px 50px;
`
const Title =styled.h1`
    font-weight: 200;
`
const Desc =styled.p`
    margin: 20px 0px;
`
const Price =styled.span`
    font-weight: 100;
    font-size:40px;
`
const FilterContainer=styled.div`
    width:50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`
const Filter=styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle=styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor=styled.div`
    width: 20px;
    height: 20px;
    border-radius:50%;
    background-color:${props=>props.color};
    margin:0px 5px;
    cursor:pointer;
`
const FilterSize=styled.select`
    margin-left: 10px;
    padding:5px;
`
const FilterSizeOption=styled.option``
const AddContainer=styled.div`
    width:50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const AmountContainer=styled.div`
    display: flex;
    align-items: center;
    font-weight:700;
`
const Amount=styled.span`
    width:30px;
    height:30px;
    border-radius:10px;
    border:1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:0px 5px;
`
const Button=styled.button`
    padding: 15px;
    font-weight: 500;
    border:2px solid teal;
    background-color:white;
    cursor:pointer;

    &:hover{
        background-color:#f8f4f4;
    }
`


export default Product
