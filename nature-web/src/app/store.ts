import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import rootReducer from "../reducers";
import thunk from 'redux-thunk'
import {
  persistStore,
  PERSIST,
  PURGE
} from 'redux-persist'
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        serializableCheck: {
          ignoredActions: [PERSIST, PURGE],
        },
      }
    )
      .concat(logger).concat(thunk),
  devTools: process.env.MODE_ENV !== 'production',
});// redux store 정의

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store); // redux store 생성

export default store;