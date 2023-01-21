import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import './App.css'
import Wishlist from "./Pages/Wishlist";

const App = () => {
  // const user=useSelector(state=>state.user.currentUser); 
  //no use of user and on first render of site user is not created and we are using its property currentUser
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/products" element={<ProductList/>}  />
        <Route path="/products/:category" element={<ProductList/>}  />
        <Route path="/product/:id" element={<Product/>}  />
        <Route path="/cart" element={<Cart/>}  />
        <Route path="/wishlist" element={<Wishlist/>}  />
        <Route path="/login" element={<Login />}  />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/orders" element={<Orders/>} />
      </Routes>
    </Router>
  )
};

export default App;