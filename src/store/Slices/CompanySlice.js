import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { GetAllCompanies } from "../../Https";
import CompanyDataServices from "../../Services/company.services";

export const fetchCompanies = createAsyncThunk("fetchCompanies", async () => {
  let data = await CompanyDataServices.getAllCompanies();
  data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
  return data;
});

const CompanySlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchCompanies.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default CompanySlice.reducer;
