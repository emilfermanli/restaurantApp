import { createSlice } from "@reduxjs/toolkit";

export const restaurantData = createSlice({
  name: "restaurantData",
  initialState: {
    tables:[],
    waiters:[],
    foods:[]
  },
  reducers: {
    getTables:(state,action) => {
      state.tables = action.payload
    },
    getWaiters:(state,action) => {
      state.waiters = action.payload
    },
    getFoods: (state,action) => {
      state.foods = action.payload
    }
  },
});

export const { getTables, getWaiters, getFoods } = restaurantData.actions;

export default restaurantData.reducer;
