import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import { loginSuccess } from '../redux/userRedux'
import { Tooltip } from "@mui/material"


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
    background-color:white;
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

const Button=styled.button`
    width:40%;
    border:none;
    padding: 15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
    &:disabled{
      color:green;
      cursor:not-allowed;
    }
`
const Link=styled.a`
    margin: 10px 0px;
    font-size: 12px;
    text-decoration:underline;
    cursor:pointer;
    `

const Error=styled.span`
    color:red;
  `
const Login = ({setBack}) => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const {isFetching ,error,currentUser} =useSelector(state=>state.user) ;
  /* get these redux variables from redux named user */
  const handleClick= async e=>{
    e.preventDefault();
     const res=await login(dispatch,{username,password});
      // await console.log(res);
     if(res)  navigate(-1); //if successfully login then only , otherwise its returning res=undefined
  }

  return ( 
    <Container>
      <Wrapper>
            <Title >SIGN IN</Title>
            <Form>
                <Input placeholder="username"  onChange={e=>setUsername(e.target.value)}/>
                <Input placeholder="password" onChange={e=>setPassword(e.target.value)} type='password'/>
                
                <Button onClick={handleClick} disabled={isFetching} >LOGIN</Button>
                {error && <Error>Something went wrong....</Error>}
                <Tooltip tooltip='Contact Admin'><Link>DO NOT YOU REMEMBER THE PASSWORD?</Link></Tooltip>
                <Link to='/register' className='link'>CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login
