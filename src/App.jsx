import React from "react";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Navbar from "./Components/NavBar/NavBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Company from "./Pages/Company/Company";
import Items from "./Pages/Items/Items";
import Customer from "./Pages/Customer/Customer";
import CompanyKata from "./Pages/Company/CompanyKata";
import CompanyLedger from "./Pages/Company/CompanyLedger";
import StockStatistics from "./Pages/Items/StockStatistics";
import AddNewBill from "./Pages/Customer/AddNewBill";
import CustomerKata from "./Pages/Customer/CustomerKata";
import Report from "./Pages/Report/Report";
import ReportHome from "./Pages/Report/ReportHome";
import ReportDaily from "./Pages/Report/ReportDaily";
import CustomerLegder from "./Pages/Customer/CustomerLegder";
import ItemReturn from "./Pages/Customer/ItemReturn";
import Testing from "./Pages/Testing";
import CompanyPayment from "./Pages/CashPayments/CompanyPayment";
import CustomerPayment from "./Pages/CashPayments/CustomerPayment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoute";
import LoadingModal from "./Components/Modals/LoadingModal";
import { AutoLogin } from "./Https";
import { SetAuth, SetAuthNotFound } from "./store/Slices/AuthSlice";
import DataLoader from "./Components/Loader/DataLoader";
import Logout from "./Components/Logout/Logout";
import LoadingScreen from "./Pages/LoadingScreen";
import CustomerAdvance from "./Pages/CashPayments/CustomerAdvance";
import CashSummary from "./Pages/Report/CashSummary";
import Payment from "./Pages/CashPayments/Payment";
import SearchInvoice from "./Pages/Customer/SearchInvoice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import LoginProtectedRoute from "./Components/ProtectedRoutes/LoginProtectedRoute";
import AdvanceLedger from "./Pages/Customer/AdvanceLedger";
import ArearsLedger from "./Pages/Customer/ArearsLedger";
import chargesServices from "./Services/charges.services";
import customerServices from "./Services/customer.services";

const App = () => {
  // Redux Toolkit
  const Auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Methods
  const CallAutoLogin = async () => {
    try {
      onAuthStateChanged(auth, (currentuser) => {
        if (currentuser !== null)
          dispatch(
            SetAuth({
              email: currentuser.email,
            })
          );
        else dispatch(SetAuthNotFound([]));
      });
      navigate("/");
    } catch (error) {
      dispatch(SetAuthNotFound([]));
    }
  };
  // Use Effects
  useEffect(() => {
    CallAutoLogin();
  }, []);

  // Loading

  // If Loading is done
  return Auth.loading ? (
    <LoadingScreen />
  ) : (
    <Routes>
      <Route
        isSignedIn={Auth.auth}
        exact
        path="/"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        isSignedIn={Auth.auth}
        exact
        path="/logout"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <Logout />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route
        isSignedIn={Auth.auth}
        exact
        path="/login"
        element={
          <LoginProtectedRoute>
            <Login />
          </LoginProtectedRoute>
        }
      />
      {/* Company */}
      <Route
        path="/companies_info"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <Company />
          </ProtectedRoute>
        }
      />
      <Route
        path="/companies_kata"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <CompanyKata />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company_ledger"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <CompanyLedger />
          </ProtectedRoute>
        }
      />
      {/* Items */}
      <Route
        path="/items"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <Items />
          </ProtectedRoute>
        }
      />
      <Route
        path="/stock-statistics"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <StockStatistics />
          </ProtectedRoute>
        }
      />
      {/* Customers */}
      <Route
        path="/customer_info"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <Customer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add_new_bill"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <AddNewBill />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer_kata"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <CustomerKata />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer_ledger"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <CustomerLegder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/advance_ledger"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <AdvanceLedger />
          </ProtectedRoute>
        }
      />
      <Route
        path="/arears_ledger"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <ArearsLedger />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer_return"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <ItemReturn />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer_invoice_search"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <SearchInvoice />
          </ProtectedRoute>
        }
      />
      {/* Report */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <Report />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports_home"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <ReportHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports_daily"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <ReportDaily />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cash_summary"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <CashSummary />
          </ProtectedRoute>
        }
      />
      {/* Payment */}
      <Route
        path="/company-payment"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <CompanyPayment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-payment"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <CustomerPayment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-payment"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-advance"
        element={
          <ProtectedRoute isSignedIn={Auth.auth}>
            <CustomerAdvance />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
