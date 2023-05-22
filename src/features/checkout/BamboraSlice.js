import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profileStatus: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  paymentStatus: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'

  error: null,
};

//create profile using token (bambora)
/* 
{
name : string
address_line1 : string 
address_line2 : string
city : string 
province : string 
country : string 
postal_code : string 
phone_number : string 
email_address :  string
}
 */
export const createProfile = createAsyncThunk(
  "bambora/profile",
  async ({ token, billing }) => {
    // console.log(token);
    // console.log(billing);
    const headers = {
      "Content-Type": "application/json",
      Authorization:process.env.REACT_APP_PROFILE_PASSCODE,
    };
    const data = {
      billing,
      token: {
        name: "abcd",
        code: `${token}`,
      },
    };

    const response = await axios.post(
      "https://api.na.bambora.com/v1/profiles",
      data,
      { headers }
    );
    console.log(response.data);
    return response.data;
  }
);

//make payment (bambora)
export const makePayment = createAsyncThunk(
  "bambora/payment",
  async ({ token,billing, amount }) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization:process.env.REACT_APP_PAYMENT_PASSCODE,
    };
    const data = {
      amount:123.00,
      payment_method: "token",
      billing,
      token: {
        name: "abcd",
        code: `${token}`,
      },
    };
    console.log(data);

    const response = await axios.post(
      "https://api.na.bambora.com/v1/payments",
      data,
      { headers }
    );
    return response.data;
  }
);

const bamboraSlice = createSlice({
  name: "Bambora",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(makePayment.pending, (state, action) => {
        state.paymentStatus = "loading";
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        console.log(action);
        state.paymentStatus = "succeeded";
      })
      .addCase(makePayment.rejected, (state, action) => {
        console.log(action.error);
        state.paymentStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(createProfile.pending, (state, action) => {
        state.profileStatus = "loading";
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        console.log(action);
        state.profileStatus = "succeeded";
      })
      .addCase(createProfile.rejected, (state, action) => {
        console.log(action.error);
        state.profileStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default bamboraSlice.reducer;
