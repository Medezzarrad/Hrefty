import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export const artisansList = createAsyncThunk(
  "artisans/artisansList",
  async () => {
    const response = await axios.get(`${url}/artisan`);
    return response.data;
  }
);

const initialState = {
  listArtisans: [],
  filtredList: [],
  status: "",
};
const artisansSlider = createSlice({
  name: "artisans",
  initialState,
  reducers: {
    // const filerServices = ()=>{
    //     state.filtredList = state.listServices.filter((service)=>{

    //     })
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(artisansList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(artisansList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listArtisans = action.payload.data;
      })
      .addCase(artisansList.rejected, (state) => {
        state.status = "rejected";
      })
  },
});
export default artisansSlider.reducer;
