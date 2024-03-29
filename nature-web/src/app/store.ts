import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import rootReducer from "../reducers";
import thunk from 'redux-thunk'
import {
  persistStore,
  PERSIST,
  PURGE
} from 'redux-persist'

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
      .concat(thunk).concat(logger),
  devTools: process.env.MODE_ENV !== 'production',
});// redux store 정의


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store); // redux store 생성

export default store;