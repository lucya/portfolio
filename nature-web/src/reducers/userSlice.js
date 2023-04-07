import { createSlice } from '@reduxjs/toolkit';
import { User } from '../actions/user/types';

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
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token