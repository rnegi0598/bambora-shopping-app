import { configureStore,combineReducers } from '@reduxjs/toolkit';
import productsSlice from '../features/Products/productsSlice';
import bamboraSlice from '../features/checkout/BamboraSlice';

const rootReducer = combineReducers({
  products: productsSlice,
  bambora: bamboraSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
