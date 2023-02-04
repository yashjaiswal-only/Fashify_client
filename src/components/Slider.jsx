import { ArrowLeft, ArrowRight } from '@mui/icons-material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { sliderItems } from '../data'
import {Link} from 'react-router-dom'
const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    position:relative;
    overflow:hidden;
`
const Arrow = styled.div`
    width:50px;
    height:50px;
    border-radius:50%;
    background-color: black ;
    color:white;
    display:flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    top:0;
    bottom :0;
    margin:auto;
    left:${props=>props.direction==='left' && "10px"};
    right:${props=>props.direction==='right' && "10px"};
    cursor:pointer;
    opacity:0.1;
    z-index:2;
`

const Wrapper=styled.div`
  height:100%;
  display:flex;
  transform:translateX(${(props)=>props.slideIndex*-100}vw);
  transition: all 1s ease;
`
const Slide=styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    align-items: center;
    background-color:#${props=>props.bg};
    
`
const ImgContainer=styled.div`
    /* left:10px; */
    height:100%;
    flex:1;
`
const InfoContainer=styled.div`
    left:10px;
    flex:1;
    padding:50px;
`
const Image=styled.img`
    height:80%;
`
const Title=styled.h1`
    font-size:70px;
`
const Desc=styled.p`
    margin:50px 0px;
    font-size:20px;
    letter-spacing:3px;
`
const Button=styled.button`
    padding:10px;
    font-size:20px;
    background-color:transparent;
    cursor:pointer;
`
const Slider = () => {
  const [slideIndex,setSlideIndex]=useState(0);
  const [buttonClicked,setButtonClicked]=useState(false);
  const handleClick=(direction)=>{
    setButtonClicked(true);
    if(direction==='left'){
      setSlideIndex((slideIndex-1+3)%3)
    } 
    if(direction==='right')  setSlideIndex((slideIndex+1)%3)
  }

  useEffect(()=>{
    if(!buttonClicked){
      setTimeout(() => {
        setSlideIndex((slideIndex+1)%3);
      }, 5000);
      console.log(slideIndex);
    }
    
  },[slideIndex,buttonClicked])

  return (
    <Container>
      <Arrow direction="left" onClick={()=>handleClick('left')}>
        {/* <ArrowLeft /> */}
        <ArrowBackIosNewIcon/>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item)=>(
             <Slide key={item.id} bg={item.bg}>
                <ImgContainer>
                    <Image src={item.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{item.title}</Title>
                    <Desc>{item.desc}</Desc>
                    <Link to="/products">
                    <Button>SHOP NOW</Button>
                    </Link>
                </InfoContainer>
              </Slide>
          ))}
      </Wrapper>
      <Arrow direction="right" onClick={()=>handleClick('right')}>
        {/* <ArrowRight /> */}
        <ArrowForwardIosIcon/>
      </Arrow>
    </Container>
  )
}

export default Slider
