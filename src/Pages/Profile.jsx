import { Container } from '@mui/system'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useEffect, useState } from "react";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { editUser } from '../redux/apiCalls'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

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
const Profile = () => {

    const user=useSelector(state=>state.user?state.user.currentUser:state.user);
    const [file,setFile]=useState();
    const [inputs,setInputs]=useState({});
    const dispatch=useDispatch(); 
    const navigate=useNavigate();
    const handleChange=e=>{
      setInputs(prev=>{
        return {...prev,[e.target.name]:e.target.value}
      })
    }

    const handleClick=e=>{
      e.preventDefault();
      const fileName=new Date().getTime()+file.name;  //to make file unique as when any file with same name upload later its gonna overwrite because of same name
      console.log(file);
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
            var updatedUser = { ...inputs, avatar: downloadURL};
            // console.log(downloadURL)
            // console.log(updatedUser)
            updatedUser=editUser(dispatch,updatedUser,user._id,user.accessToken);            
          });
        }
      );
    }

      //to get to top on rendering
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

  return (
    <>
      <Navbar/>
      <Announcement/>
      <BackBtn onClick={()=>navigate('/')}>Back</BackBtn>
      {user && <Container>
      
      <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={user.avatar}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
                <span className="userShowUserTitle">{user.destination || "Entertainer"}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{user.dob || "10.12.1999"}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{user.ph || "+1 123 456 67"}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div>
            </div>
          </div>
          
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    name="username" onChange={handleChange}
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input name="name" onChange={handleChange}
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input name="email" onChange={handleChange}
                    type="text"
                    placeholder={user.email}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input name="ph" onChange={handleChange}
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input name="address" onChange={handleChange}
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={user.avatar}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])} />
                </div>
                <button className="userUpdateButton" onClick={handleClick}>Update</button>
              </div>
            </form>
          </div>
        </div>
      </Container>}
      {!user ? 
      <Bottom><img src='https://media3.giphy.com/media/ZgTR3UQ9XAWDvqy9jv/giphy.gif?cid=ecf05e47qz6j91e2q09taunficy2vuit86oyl1qvja18uzb6&rid=giphy.gif&ct=g' /> <NoOrders>Login to see your account details ! </NoOrders></Bottom>
        :null}
      <Footer/>
    </>
  )
}

export default Profile;
