import { useState } from 'react'
import styled from 'styled-components'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase.js";
import { register, userAvailable } from '../redux/apiCalls.js';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';


const Container=styled.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
      background-size:cover;
        display: flex;
        align-items: center;
        justify-content: center;
`
const Wrapper=styled.div`
    padding: 20px;
    width:50%;
    background-color:white;
`
const Title=styled.h1`
    font-size: 24px;
    font-weight: 300;

`
const Form=styled.form`
    display: flex;
    flex-wrap:wrap;
`
const Input=styled.input`
    flex:1;
    min-width:40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`
const Agreement=styled.span`
    font-size: 12px;
    margin: 10px 0px;
`
const Button=styled.button`
    width:40%;
    border:none;
    padding: 15px 20px;
    background-color:teal;
    color:white;
    cursor:pointer;
`
const Box=styled.div`
  margin: 20px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
const Error=styled.span`
    color:red;
  `
const Bottom=styled.div`
  width: 100%;
  display: flex; 
`
const Register = () => {
    const [inputs,setInputs]=useState({});
    const [file,setFile]=useState(null);
    const [hasUsername,setHasUsername]=useState(false);
    const [Required,setRequired]=useState(false);
    const [checking,setChecking]=useState(false);
    const {isFetching ,error,currentUser} =useSelector(state=>state.user) ;
    //this method is save to protect from 'can't access properties of null 


    const handleChange=e=>{
      setInputs(prev=>{
        return {...prev,[e.target.name]:e.target.value}
      })
    }
    
    
      const handleClick=async e=>{
        e.preventDefault();
        setChecking(true);
        if(!inputs.username || !inputs.password){
          setRequired(true);
          setChecking(false);
          return ;
        }
        else setRequired(false);
        const a=await userAvailable(inputs.username) //for getting response then move ahead
        console.log(a);
        if(a.data) {
          setHasUsername(true);
          setChecking(false);
          return ;
        }
        else setHasUsername(false);

        console.log('hii')
      if(file){
        const fileName=new Date().getTime()+file?file.name:'';  //to make file unique as when any file with same name upload later its gonna overwrite because of same name
        const storage=getStorage(app);
        const storageRef=ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const user = { ...inputs, avatar: downloadURL};
              // console.log(downloadURL)
              console.log(user);
              console.log('registering')
              setChecking(false);
              const res=register(dispatch,user);
              if(res)navigate('/login',{state:{newlyRegister:true}});
            });
          }
        );
      }
      else{
        const user={...inputs};
        console.log(user)
        setChecking(false);
        const res=register(dispatch,user);
        if(res)navigate('/login',{state:{newlyRegister:true}});
      }
    }
    const dispatch=useDispatch();
    const navigate=useNavigate();
    // console.log(file)
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input name="name" onChange={handleChange} type="text" placeholder="Full name"/>
                <Input name="username" onChange={handleChange} type="text" placeholder="username"/>
                <Input name="email" onChange={handleChange} type="email" placeholder="email"/>
                <Input name="password" onChange={handleChange} type="password" placeholder="password"/>
                <Input name="ph" onChange={handleChange} type="number" placeholder="contact number (optional)"/>
                <Input name="address" onChange={handleChange} type="text" placeholder="address (optional) "/>
                <Box>
                  <label htmlFor="avatar" style={{marginRight:"10px",marginBottom:"10px"}}>YOUR IMAGE:</label>
                  <input name="avatar" id='avatar' onChange={e=>setFile(e.target.files[0])} type="file" />
                </Box>
                <Agreement>
                    By creating an account , I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Bottom>
                  <Button onClick={handleClick} disabled={(isFetching || checking)}>CREATE</Button>
                  {(isFetching || checking) && <CircularProgress />}
                </Bottom>
                {error && <Error>Something went wrong....</Error>}
                {hasUsername && <Error>Username already exist</Error>}
                {Required && <Error>Username & password are required</Error>}

            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register
