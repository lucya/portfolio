import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import rootReducer from "./reducers";
import thunk from 'redux-thunk'
import { persistStore } from "redux-persist";


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(logger).concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});// redux store 정의

export const persistor = persistStore(store); // redux store 생성

export default store;