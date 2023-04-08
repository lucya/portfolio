import { createSlice } from '@reduxjs/toolkit';
import { User } from '../actions/user/types';
import { PURGE } from "redux-persist";

const initialState = {
  userState: User,
  loggedIn: false
}
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      //...state와 자동 return
      const { userInfo, accessToken } = action.payload;
      state.user = userInfo;
      state.token = accessToken;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
    },
    signup: (state, action) => {
      const { userInfo, accessToken } = action.payload;
      state.user = userInfo;
      state.token = accessToken;
      state.loggedIn = true;
    },
  },
  //초기화하고 싶은 state가 있는 slice마다 아래를 추가해야한다.
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token