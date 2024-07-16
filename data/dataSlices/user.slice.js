import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isVerified: false,
    token: ""
  },
  reducers: {
    setUser: (state, action) => {
        console.log({payload: action.payload});
        return action.payload.user;
    },
    clearUser: (state) => {
        return null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;