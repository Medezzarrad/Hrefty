import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export const demandesList = createAsyncThunk(
  "services/servicesList",
  async () => {
    const response = await axios.get(`${url}/demande`);
    return response.data;
  }
);

export const categoryList = createAsyncThunk(
  "services/categoryList",
  async () => {
    const response = await axios.get(`${url}/specialite`);
    return response.data;
  }
);

const initialState = {
  listServices: [],
  listCategorys: [],
  filtredList: [],
  status: "",
};
const servicesSlider = createSlice({
  name: "services",
  initialState,
  reducers: {
    // const filerServices = ()=>{
    //     state.filtredList = state.listServices.filter((service)=>{

    //     })
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(demandesList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(demandesList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listServices = action.payload.data;
      })
      .addCase(demandesList.rejected, (state) => {
        state.status = "rejected";
      })

      .addCase(categoryList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(categoryList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.listCategorys = action.payload.data;
      })
      .addCase(categoryList.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export default servicesSlider.reducer;
