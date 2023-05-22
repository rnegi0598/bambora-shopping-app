import React from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CheckoutNav = ({setIsCheckout}) => {
  return (
    <div className="wrapper checkout-nav">
    <div className="left">
          <div className="item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_India.png/1200px-Flag_of_India.png?20220816100942" alt="indian flag" />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <span>IN</span>
            <KeyboardArrowDownIcon />
          </div>
          
        </div>
     
      <div className="checkout">CHECKOUT</div>
      <div className="logo">
        <Link className="link" to="/" onClick={()=>{setIsCheckout(false)}}>
          FAKESTORE
        </Link>
      </div>
    </div>
  );
};

export default CheckoutNav;
