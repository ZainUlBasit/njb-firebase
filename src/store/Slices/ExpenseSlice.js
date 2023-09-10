import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetExpenses } from "../../Https";

export const fetchExpenses = createAsyncThunk("fetchExpenses", async (info) => {
  const { data } = await GetExpenses(info);
  return data;
});

const ExpenseSlice = createSlice({
  name: "expense",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ExpenseSlice.reducer;
