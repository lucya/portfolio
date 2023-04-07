import { combineReducers } from "redux";
import userReducer from './userSlice';
import movieReducer from './movieSlice';

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // session storage

const persistConfig = {
  key: "react",
  storage,
  whitelist: ['userReducer', 'movieReducer']
};

const rootReducer = combineReducers({
  userReducer,
  movieReducer,
});

// export default rootReducer;
export default persistReducer(persistConfig, rootReducer);