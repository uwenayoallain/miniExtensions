import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface userState {
  name: string;
  state: "out" | "in";
  classes: { name: string; students: string[] }[];
}

const initialState: userState = {
  name: "",
  state: "out",
  classes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>): void => {
      state.name = action.payload;
      state.state = "in";
    },
    addClasses: (
      state,
      action: PayloadAction<{ name: string; students: string[] }[]>
    ): void => {
      state.classes = action.payload;
    },
    logout: (state): void => {
      state.name = "";
      state.state = "out";
      state.classes = [];
    },
  },
});

export const { login,addClasses,logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
