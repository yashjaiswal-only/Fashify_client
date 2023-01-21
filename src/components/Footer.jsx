import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const Container=styled.div`
    background-color:#E1C4D8;
    display:flex;
    font-weight: 600;
`
const Left=styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    padding:20px;
    `
const Logo=styled.div`
    font-size: 30px;
    background: #33CF04;
    background: linear-gradient(to bottom right, #33CF04 0%, #000ECF 77%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    `
const Desc=styled.div`
    /* margin:10px 0px; */
`
const SocialContainer=styled.div`
    display:flex;
    `
const SocialIcon=styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    color:white;
    background-color:#${props=>props.color};   
    display:flex;
    align-items: center;
    justify-content: center;
    margin-right:20px;
    cursor: pointer;

`
const Center=styled.div`
    flex:1;
    padding:20px;
    font-size: 20px;
    `
const Title=styled.h3`
    margin-bottom: 30px;
`
const List=styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;
`
const ListItem=styled.li`
    width:50%;
    margin-bottom: 10px;
`
const Right=styled.div`
    flex:1;
    padding:20px;
    font-size: 20px;

`
const ContactItem=styled.div`
    margin-bottom: 20px;
    display:flex;
    align-items: center;

`
const Payment=styled.img`
    width:50%;
`

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Fashify</Logo>
        <Desc>
        Fashify has some awesome values for their fitness and every day line. They focus on being green, providing quality and practical pieces and is run by family and valued by family. They have adorable styles for men, women, and kids.
        </Desc>
        <SocialContainer>
            <SocialIcon color="3B5999">
                <Facebook/>
            </SocialIcon>
            <SocialIcon color="E4405F">
                <Instagram/>
            </SocialIcon>
            <SocialIcon color="55ACEE">
                <Twitter/>
            </SocialIcon>
            <SocialIcon color="E60023">
                <Pinterest/>
            </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem> <Link className='link' to="/">Home</Link> </ListItem>
                <ListItem>Terms</ListItem>
                <ListItem><Link className='link' to='/wishlist'>Wishlist</Link></ListItem>
                <ListItem><Link className='link' to="/cart">Cart</Link></ListItem>
                <ListItem><Link className='link' to={`/products/men`}>Men Fashion</Link></ListItem>
                <ListItem><Link className='link' to={`/products/women`}>Women Fashion</Link></ListItem>
                <ListItem><Link className='link' to='/profile'>My Account</Link></ListItem>
                <ListItem><Link className='link' to='/orders'>Order Tracking</Link></ListItem>
            </List>
      </Center>
      <Right>
            <Title>Contact</Title>
            <ContactItem><Room style={{marginRight:'10px'}}/>
                   655 main road , Lower Parel, Mumbai 110022
            </ContactItem>
            <ContactItem><Phone style={{marginRight:'10px'}}/>+91 8130060493</ContactItem>
            <ContactItem><MailOutline style={{marginRight:'10px'}}/><a className='link' href='mailto:yashjaiswalonly@gmail.com'>yashjaiswalonly@gmail.com</a></ContactItem>
            {/* <Payment src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJIkuSDps4zB6vwB5aL67O15VersKEPb3PA&usqp=CAU" /> */}
            <Payment src="https://www.transparentpng.com/thumb/payment-method/WNusu8-payment-method-kinds-transparent-picture.png" alt="Payment Method Kinds Transparent Picture @transparentpng.com"/>
      </Right>
    </Container>
  )
}

export default Footer
