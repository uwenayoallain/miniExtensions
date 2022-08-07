import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface userState {
  name: string;
  state: "out" | "in";
  classes: {name:string, students:string[]}[];
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
    login: (
      state,
      action: PayloadAction<{ name: string; classes: {name:string, students:string[]}[] }>
    ): void => {
      state.name = action.payload.name;
      state.classes = action.payload.classes;
      state.state = "in";
    },
  },
});

export const { login } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
