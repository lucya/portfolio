import { combineReducers } from "redux";
import userReducer from './userSlice';
import movieReducer from './movieSlice';

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // session storage

const persistConfig = {
  key: "root",
  storage,//localStorage에 저장해 store를 관리
  version: 1,
  // whitelist: ['userReducer', 'movieReducer']
};
const rootReducer = combineReducers({
  userReducer,
  movieReducer,
});

/*const appReducer = combineReducers({
  userReducer,
  movieReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'logout') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
} */

// export default rootReducer;
// export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);