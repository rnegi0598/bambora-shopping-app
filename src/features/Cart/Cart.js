import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteFromCart, resetCart } from "../Products/productsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Cart = ({setOpen,setIsCheckout}) => {
  const products = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.qty * item.price;
    });
    return total.toFixed(2);
  };

  const checkoutHandler=()=>{
    console.log('checkout handler');
    setIsCheckout(true);
    setOpen(false);
    navigate('/checkout')
  }
  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.description?.substring(0, 100)}</p>
            <div className="price">
              {item.qty} x $ {item.price}
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => {
              dispatch(deleteFromCart(item));
              
            }}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>$ {totalPrice()}</span>
      </div>
      <button onClick={checkoutHandler}>PROCEED TO CHECKOUT</button>
      <span
        className="reset"
        onClick={() => {
          dispatch(resetCart());
          toast.success('Cart Reset successfully',{ autoClose: 2000 ,position: "bottom-right",theme: "dark"});
        }}
      >
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
