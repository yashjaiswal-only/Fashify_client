import React from 'react'
import styled from 'styled-components'
import { Login, Search} from '@mui/icons-material'
// import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import {mobile} from "../responsive.js"
import {useDispatch, useSelector} from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logout} from '@mui/icons-material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Badge ,Box,Avatar,Menu,MenuItem,ListItemIcon,Tooltip,Divider,IconButton,TextField,Autocomplete} from '@mui/material'
import { authStarts, logoutSuccess } from '../redux/userRedux.js';
import { clearCart } from '../redux/cartRedux.js';
import { clearList } from '../redux/listRedux.js';
import { clearOrder } from '../redux/orderRedux.js';

/* this is a styled-component */
const Container = styled.div`   
    height:3.5rem;
    background-color: white;
    display: flex; justify-content: center;
    padding: 0;
    top: 0;
    width: 100vw;
    z-index:900;
    position:fixed; 
    /* sticky navbar */
`
const Wrapper=styled.div`
    padding:0rem 2rem;
    height: 100%;
    width: 95%;
    display:flex;
    justify-content:space-between;
    
    `;
const Left=styled.div`
    flex-shrink:1;
    display:flex;
    align-items:center;
    
`;
const LanguageSelector=styled.div`
    font-size:14;
    cursor:pointer;
    
`
const SearchContainer=styled.div`
    display:flex;
    align-items:center;
    border:none;
    margin-left:2rem;
    height: 40px;
   
`
const SearchInput=styled.input`

`
const Center=styled.div`
    flex-shrink:1;
    text-align:center;
    display: flex;
    align-items: center;
`;
const Logo=styled.h1`
    font-weight:bold;
    background: #33CF04;
background: linear-gradient(to bottom right, #33CF04 0%, #000ECF 77%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

`
const LogoImage=styled.img`
`
const Right=styled.div`
    flex-shrink:2;
    display:flex;
    align-items:center; 
    justify-content:flex-end;
`;
const Item=styled.div`
    font-size:14;
    cursor:pointer;
    margin-left: 25px;
    text-decoration-line:none;
`
const Button1=styled.button`
    font-size: 1.2rem;
    color:#6e6d7a;
    background:none;
    display: flex;
    cursor:pointer;
    padding: 6px 10px;
    border-radius:8px;  
    border:none;
    /* &:hover{
        border-width:1px;
        border-color:gray;
    } */
    `
const Button2=styled.button`
cursor:pointer;
    font-size: 1.1rem;
    color:white;    
    padding: 8px 12px;
    background:#ea4c89;
    border:none;
    border-radius:8px;  
`

const Navbar = () => {
    const cartcount = useSelector(state=>state.cart?state.cart.count:state.cart);//to visible in cart icon
    const user=useSelector(state=>state.user?state.user.currentUser:state.user);
    const listcount=useSelector(state=>state.list?state.list.count:state.list);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    console.log(location)
    const handleClose = () => {
         setAnchorEl(null);
    };
    const handleLogout=()=>{
        dispatch(clearList());
         dispatch(logoutSuccess());
         dispatch(clearCart());
         dispatch(clearOrder());
        if(location.pathname==='/profile')  navigate(-1);   //no profile section without login
    }

    const options=[{label:'products'},{label:'men'},{label:'women'},{label:'shoe'},{label:'dress'},{label:'jeans'},{label:'tshirt'}]
    const onSearch=(e)=>{
        // console.log(e.target.value);
        if(e.target.value==='products') navigate(`/products`);
        else if(e.target.value) navigate(`/products/${e.target.value}`);
    }
  return (
    <Container>
        <Wrapper>
            <Left>
                <LanguageSelector>EN</LanguageSelector>
                <SearchContainer >
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={options}
                        sx={{ width: '10rem', height:'90%' }}
                        
                        renderInput={(params) =>
                             <TextField className='input' sx={{padding:0,margin:0}}  size="small" {...params} onSelect={(e)=>onSearch(e)} label="Search" />
                                // <SearchInput label="Search" className='input' {...params} onSelect={(e)=>onSearch(e)}/>
                            }
                    />
                    <Search style={{color:'gray', fontSize:'1.7rem' }}/>  
                </SearchContainer>
            </Left>

            <Center><Link to='/' className='link'>
                {/* <LogoImage src='https://firebasestorage.googleapis.com/v0/b/shopping-app-5cbfc.appspot.com/o/shopping-cart-3d-render-icon-removebg-preview%20(1).png?alt=media&token=2c07b2b7-4d55-4991-b491-2842125e9538' /> */}
                <Logo>Fashify</Logo></Link>
            </Center>

            <Right>
                {
                    !user && 
                    <>
                    <Link className='link' to='/login' >
                        <Item  onClick={()=>dispatch(authStarts())}>
                            <Button1><img src={require('./login-icon-3048.png')} style={{height:'1.2rem'}}/>Sign in</Button1></Item>
                    </Link>
                    <Link className='link' to="/register">
                        <Item onClick={()=>dispatch(authStarts())}><Button2>Sign up</Button2></Item>
                    </Link> 
                    </>
                }
                
               { user &&
                    <>
                    <Tooltip title='Your Wishlist'> 
                    <Item>
                        <Link to="/wishlist">
                        <Badge badgeContent={listcount} color="primary">
                           <FormatListBulletedIcon/>
                        </Badge> 
                        </Link>
                    </Item>
                    </Tooltip>

                    <Tooltip title='Your Cart'> 
                    <Item>
                        <Link to="/cart">
                        <Badge badgeContent={cartcount} color="primary">
                            <ShoppingCartOutlinedIcon/>
                        </Badge> 
                        </Link>
                    </Item>
                    </Tooltip>

                    <Item>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                >
                                <Avatar sx={{ width: 32, height: 32 }} src={user?user.avatar:""}></Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            // onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                            <MenuItem onClick={()=>navigate('/profile')}>
                            <Avatar src={user?user.avatar:""}/> Profile
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={()=>navigate('/wishlist')}>
                            <ListItemIcon>
                                <FormatListBulletedIcon fontSize="small" />
                            </ListItemIcon>
                            My List
                            </MenuItem>
                            <MenuItem onClick={()=>navigate('/orders')}>
                            <ListItemIcon>
                                <BusinessCenterOutlinedIcon fontSize="small" />
                            </ListItemIcon>
                            My Orders
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                            </MenuItem>
                        </Menu>
                    </Item>
                    </>
                }
            </Right>
        </Wrapper>
    </Container>
    )
}

export default Navbar;
