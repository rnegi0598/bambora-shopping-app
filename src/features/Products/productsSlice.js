import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";


// const API_URL  ="http://localhost:4000/products"
const API_URL=process.env.REACT_APP_PRODUCTS_API;

const initialState = {
  products:[],
  cart:JSON.parse(localStorage.getItem('cartItem'))||[],
  status: 'idle',//'idle' | 'loading' | 'succeeded' | 'failed'
  error:null,
};
//fetch products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});


const productsSlice=createSlice({
  name:'products',
  initialState,
  reducers:{
    addToCart:(state,action)=>{
      if(state.cart.find(x=>x.id===Number(action.payload.id))){
        state.cart=state.cart.map(item=>{
          if(item.id===Number(action.payload.id)){
            return {...action.payload,qty:action.payload.qty};
          }else{
            return item;
          }
        })
      }else{
        state.cart.push(action.payload);
      }
      
      localStorage.setItem('cartItem',JSON.stringify(state.cart));
    },
    deleteFromCart:(state,action)=>{
      if(action.payload.qty===1){
        state.cart=state.cart.filter((item)=>{
          return item.id!==action.payload.id;
        })
      }else{
        state.cart=state.cart.map((item)=>{
            if(item.id===action.payload.id){
              return {...item,qty:item.qty-1};
            }else{
              return item;
            }
        })
      }
      localStorage.setItem('cartItem',JSON.stringify(state.cart));

    },
    resetCart:(state)=>{
      state.cart=[];
      localStorage.clear();
    }

  },
  extraReducers(builder){
    builder
      .addCase(fetchProducts.pending,(state,action)=>{
        state.status='loading';
      })
      .addCase(fetchProducts.fulfilled,(state,action)=>{
        state.status='succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected,(state,action)=>{
        state.status='failed';
        state.error = action.error.message;
        
      })
      
  }
})


export const {addToCart,deleteFromCart,resetCart} = productsSlice.actions;
export default productsSlice.reducer;