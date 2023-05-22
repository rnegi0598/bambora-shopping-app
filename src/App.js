import "./App.scss";
import React from "react";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Navbar from "./features/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./features/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./features/Products/productsSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkout from "./pages/Checkout/Checkout";

const App = () => {
  const dispatch = useDispatch();
  // const productStatus = useSelector((state) => state.products.status);
  // const error = useSelector((state) => state.products.error);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
 

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
