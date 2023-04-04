import { combineReducers } from "redux";
import userReducer from '../reducers/userReducer';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // session storage

const persistConfig = {
  key: "react",
  storage,
  whitelist: ['userReducer']
};

const rootReducer = combineReducers({
  userReducer,
});

// export default rootReducer;
export default persistReducer(persistConfig, rootReducer);