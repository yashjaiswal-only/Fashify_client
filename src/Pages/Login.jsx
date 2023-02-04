import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import { CircularProgress, Tooltip } from "@mui/material"



const Container=styled.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
      background-size:cover;
        display: flex;
        align-items: center;
        justify-content: center;
`
const Wrapper=styled.div`
    padding: 20px;
    width:25%;
    min-width:15rem;
    background-color:white;
`
const New=styled.span`
  font-size: 1rem;
  color:blue;
`
const Title=styled.h1`
    font-size: 24px;
    font-weight: 300;

`
const Form=styled.form`
    display: flex;
    flex-direction:column;
`
const Input=styled.input`
    flex:1;
    min-width:40%;
    margin: 10px 0px;
    padding: 10px;
`
const Bottom=styled.div`
  width: 100%;
  display: flex; 
`
const Button=styled.button`
    width:40%;
    border:none;
    padding: 15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
    margin-right:2rem;
    &:disabled{
      color:green;
      cursor:not-allowed;
    }
`
const URL=styled.a`
    margin: 10px 0px;
    font-size: 12px;
    text-decoration:underline;
    cursor:pointer;
`

const Error=styled.span`
    color:red;
  `
const Login = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const location=useLocation();
  const {isFetching ,error,currentUser} =useSelector(state=>state.user) ;
  /* get these redux variables from redux named user */
  const handleClick= async e=>{
    e.preventDefault();
     const res=await login(dispatch,{username,password});
      // await console.log(res);
     if(res)  navigate(newlyRegister?-2:-1); //if successfully login then only , otherwise its returning res=undefined
  }
  // console.log(location)  // we have a state in location 
  const newlyRegister=location.state?location.state.newlyRegister:null;
  return ( 
    <Container>
      <Wrapper>
            <Title >SIGN IN</Title>
            {newlyRegister && <New>You are successfully registered . Please Login to continue</New>}
            <Form>
                <Input placeholder="username"  onChange={e=>setUsername(e.target.value)}/>
                <Input placeholder="password" onChange={e=>setPassword(e.target.value)} type='password'/>
                <Bottom>
                  <Button onClick={handleClick} disabled={isFetching} >LOGIN</Button>
                  {isFetching && <CircularProgress />}
                </Bottom>
                {error && <Error>Something went wrong....</Error>}
                <Link to='/register' className='link'><URL>CREATE A NEW ACCOUNT</URL></Link>
                <Tooltip title='Contact Admin'><URL>DO NOT YOU REMEMBER THE PASSWORD?</URL></Tooltip>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login;
