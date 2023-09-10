import { configureStore } from "@reduxjs/toolkit";
import SideMenuReducer from "./SideMenuSlice";
import CompanyReducer from "./Slices/CompanySlice";
import ItemReducer from "./Slices/ItemSlice";
import CustomerReducer from "./Slices/CustomerSlice";
import ExpensesReducer from "./Slices/ExpenseSlice";
import AuthReducer from "./Slices/AuthSlice";
import BankReducer from "./Slices/BankSlice";

export const store = configureStore({
  reducer: {
    AuthReducer,
    SideMenuReducer,
    CompanyReducer,
    ItemReducer,
    CustomerReducer,
    ExpensesReducer,
    BankReducer,
  },
});
