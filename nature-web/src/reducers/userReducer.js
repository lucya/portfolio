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
      state.userState = action.payload.userInfo;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.userState = null;
      state.loggedIn = false;
    },
    signup: (state, action) => {
      state.value = action.payload.data;
      state.loggedIn = true;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;