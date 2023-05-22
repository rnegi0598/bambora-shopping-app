import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss"
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import CheckoutNav from "./CheckoutNav";

const Navbar = () => {
  const [open,setOpen] = useState(false)
  const products = useSelector((state) => state.products.cart);
  const [isCheckout,setIsCheckout]=useState(false);
  return (
    <div className="navbar">
      {!isCheckout?(
        <div className="wrapper">
        <div className="left">
          <div className="item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_India.png/1200px-Flag_of_India.png?20220816100942" alt="indian flag" />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <span>IN</span>
            {/* <span><a href="http://localhost:3000" target="_blank">IN</a></span> */}

            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <Link className ="link" to="/products/women">Women</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/products/men">Men</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/products/children">Children</Link>
          </div>
        </div>
        <div className="center">
          <Link className ="link" to="/">FAKESTORE</Link>
        </div>
        <div className="right">
          <div className="item">
            <Link className ="link" to="/">Homepage</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/">About</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/">Contact</Link>
          </div>
          <div className="item">
            <Link className ="link" to="/">Stores</Link>
          </div>
          <div className="icons">
            <SearchIcon/>
            <PersonOutlineOutlinedIcon/>
            <FavoriteBorderOutlinedIcon/>
            <div className="cartIcon" onClick={()=>setOpen(!open)}>
              <ShoppingCartOutlinedIcon/>
              <span>{products?.length}</span>
            </div>
          </div>
        </div>
      </div>
      ):<CheckoutNav setIsCheckout={setIsCheckout}/>}
      {open && <Cart setOpen={setOpen} setIsCheckout={setIsCheckout}/>}
    </div>
  );
};

export default Navbar;
