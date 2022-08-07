import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface userState {
  name: string;
  classes: { name: string; students: string[] }[];
}

const initialState: userState = {
  name: "",
  classes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>): void => {
      state.name = action.payload;
    },
  },
});

export const { login } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
