import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../actions/user/types';

export const userSlice = createSlice({
  name: "user",
  initialState: UserState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
  },
});

export default userSlice.reducer;