import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import rootReducer from "./reducers";
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: rootReducer ,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(logger).concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

console.log(store.getState());

export default store;