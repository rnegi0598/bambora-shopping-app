import React, { useState } from "react";
import "./checkout.scss";
import { CustomCheckout } from "../../features/checkout/CustomCheckout";
import { useSelector } from "react-redux";
const Checkout = () => {
    const [check,setCheck]=useState(false);
    const [street,setStreet]=useState('123 Main St');
    const [city,setCity]=useState('New York');
    const [province,setProvince]=useState('NY');
    const [country,setCountry]=useState('US');
    const [postalCode,setPostalCode]=useState('10001');
    const [phoneNumber,setPhoneNumber]=useState('8098098323');

    const products = useSelector((state) => state.products.cart);
    const shipping=50;
    const totalPrice = (() => {
      let total = 0;
      products.forEach((item) => {
        total += item.qty * item.price;
      });
      return total.toFixed(2);
    })();

    const orderTotal=(()=>{
      return Number(totalPrice)+shipping;
    })()



  return (
    <div className="checkout-wrapper">
      <div className="left">
        <div className="address">
        <h3>Billing details</h3>
          <p>
            <label>
              <span>Street Address</span>
              <input type="text" value={street} onChange={(e)=>{setStreet(e.target.value)}} required/>
            </label>
          </p>
          <p>
            <label>
              <span>City</span>
              <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} required />
            </label>
          </p>
          <p>
            <label>
              <span>Province</span>
              <input type="text" value={province} onChange={(e)=>{setProvince(e.target.value)}} required />
            </label>
          </p>
          <p>
            <label>
              <span>Country</span>
              <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}} required />
            </label>
          </p>
          <p>
            <label>
              <span>Postal Code</span>
              <input type="text" value={postalCode} onChange={(e)=>{setPostalCode(e.target.value)}} required />
            </label>
          </p>
          <p>
            <label>
              <span>Phone Number</span>
              <input type="text" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}} required />
            </label>
          </p>
        </div>
        <div className="payment-option">
          <h3>Select a payment options</h3>
          <div>
            <label>
              <input type="radio" checked={check}  onClick={()=>{setCheck(prev=>!prev);window.count=0}}/>
              <span>Bambora</span>
            </label>
          </div>
          {
            check?(<div>
            <CustomCheckout billing={{"address_line1":street,city,province,"postal_code" :postalCode,"phone_number":phoneNumber,country}} orderTotal={orderTotal}/>
          </div>):null
          }
        </div>
        {/* <button className="payment" onClick={paymentHandler}>Make Payment</button> */}
      </div>

      <div className="right">
        <div className="order-summary">
          <h4>Order Summary</h4>
          <p className="items-total">
            <span>Cart Subtotal </span>
            <span><span className="dollar">$ </span>{totalPrice}</span>
          </p>
          <p className="delivery-cost">
            <span>Shipping </span>
            <span><span className="dollar">$ </span>{shipping}</span>
          </p>
          <p className="total-cost">
            <span>Order Total </span>
            <span><span className="dollar">$ </span>{orderTotal}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
