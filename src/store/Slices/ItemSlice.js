import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllItems } from "../../Https";
import ItemDataServices from "../../Services/item.services";

export const fetchItems = createAsyncThunk("fetch-items", async () => {
  let data = await ItemDataServices.getAllItems();
  data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
  return data;
});

const ItemSlice = createSlice({
  name: "item",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ItemSlice.reducer;
