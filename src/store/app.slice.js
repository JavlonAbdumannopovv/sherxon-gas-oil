import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    kunlar: [],
    operatorlar: [],
    amaldagi_operator: {},
  },
  reducers: {
    setDays: (state, action) => {
      state.kunlar = action.payload;
    },
    setOperators: (state, action) => {
      state.operatorlar = action.payload;
    },
    setCurrentOperator: (state, action) => {
      state.amaldagi_operator = action.payload;
    },
  },
});

export const { setDays, setOperators, setCurrentOperator } = appSlice.actions;

export default appSlice.reducer;
