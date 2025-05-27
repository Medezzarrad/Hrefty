import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://127.0.0.1:8000/api";

export const lastArtisans = createAsyncThunk(
  "client/lastArtisans",
  async ()=>{
    const response = await axios.get(`${url}/demande`);
    return response.data;
  }

)

export const demandesList = createAsyncThunk(
  "client/demandesList",
  async ()=>{
    const response = await axios.get(`${url}/demande`);
    return response.data;
  }

)

export const addDemande = createAsyncThunk(
  "client/addDemande",
  async (formInputs) => {
    const now = new Date();
    const dateCreation = now.toISOString().slice(0, 19).replace('T', ' ');
    const formData = new FormData();
    formData.append("titre", formInputs.titre);
    formData.append("description", formInputs.description);
    formData.append("adresse", formInputs.adresse);
    formData.append("budget", formInputs.budget);
    formData.append("telephone", formInputs.telephone);
    formData.append("photo", formInputs.photo);
    formData.append("dateExecution", formInputs.dateExecution);
    formData.append("dateCreation", dateCreation);
    formData.append("status", formInputs.status);
    formData.append("idClient", formInputs.idClient);
    const response = await axios.post(`${url}/demande`, formData);
    return response.data;
  }
);
const user = JSON.parse(sessionStorage.getItem("user"));

const initialState = {
  listDemandes: [],
  lastArtisans: [],
  clientInfo: {
    id: user?.client?.id|| null,
  },
  status: "",
  erreur: "",
};

const clientSlider = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addDemande.pending, (state)=>{
        state.status = "pending";
    })
    .addCase(addDemande.fulfilled, (state, action)=>{
        state.status = "fulfilled";
        state.listDemandes = action.payload
    })
    .addCase(addDemande.rejected, (state)=>{
        state.status = "rejected";
    })

    .addCase(lastArtisans.pending, (state)=>{
        state.status = "pending";
    })
    .addCase(lastArtisans.fulfilled, (state, action)=>{
        state.status = "fulfilled";
        state.lastArtisans = []
        action.payload.data.forEach((demande) => {
          if (demande.idClient === state.clientInfo.id) {
            demande.offres.forEach((offre)=>{
              if(offre.statut == 'acceptable'){
                state.lastArtisans.push(offre.artisan);
              }
            })
          }
        });
    })
    .addCase(lastArtisans.rejected, (state)=>{
        state.status = "rejected";
    })

    .addCase(demandesList.pending, (state)=>{
        state.status = "pending";
    })
    .addCase(demandesList.fulfilled, (state, action)=>{
        state.status = "fulfilled";
        state.listDemandes = [];
        action.payload.data.forEach((demande)=>{
          if(demande.idClient === state.clientInfo.id){
            state.listDemandes.push(demande)
          }
        })
    })
    .addCase(demandesList.rejected, (state)=>{
        state.status = "rejected";
    })
  },
});
export default clientSlider.reducer;
