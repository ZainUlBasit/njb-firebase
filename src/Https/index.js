import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// export const loginUser = (data) => api.post("/login", data);
// export const logoutUser = () => api.get("/logout");
// export const AutoLogin = () => api.get("/refresh");

// Auth Routes
export const LoginUser = (data) => api.post("/sign-in", data);
export const logoutUser = (data) => api.post("/sign-out", data);
export const AutoLogin = () => api.get("/refresh");

// company request
export const AddNewCompany = (data) => api.post("/add_company", data);
export const GetAllCompanies = () => api.get("/get_companies");
export const UpdateCompany = (id, data) =>
  api.put("/update-company/" + id, data);
export const UpdateCompanyTotal = (data) =>
  api.post("/update-company-total", data);
// update customer Account(+Paid and -Remaining)
export const UpdateCompanyAccounts = (id, data) =>
  api.put("/update-company-accounts/" + id, data);
export const DeleteCompany = (id) => api.delete("./delete-company/" + id);
export const GetItemLegder = (data) => api.post("/company-cash-legder", data);

// item request
export const AddNewItem = (data) => api.post("/add_item", data);
export const GetAllItems = () => api.get("/items");
export const UpdateItem = (id, data) => api.put("/update-item/" + id, data);
export const DeleteItem = (id) => api.delete("./delete-item/" + id);
export const AddItemQty = (id, qty) => api.put("/add-stock/" + id + "/" + qty);

// Stock Request
export const AddItemStock = (data) => api.post("/stock", data);
export const GetAllItemStock = () => api.get("/all_stock_statistics");

// ======================================
// Customer
// ======================================
//register customer
export const RegisterCustomer = (data) => api.post("/add-customer", data);
//get all customer
export const GetAllCustomers = () => api.get("/get-customers");
// delete customer
export const DeleteCustomer = (id) => api.delete("/delete-customer/" + id);
// update customer
export const UpdateCustomer = (id, data) =>
  api.put("/update-customer/" + id, data);
// update customer total and remaining
export const UpdateCustomerTotal = (id, data) =>
  api.put("/update-customer-total/" + id, data);
// update customer Account(+Paid and -Remaining)
export const UpdateCustomerAccounts = (id, data) =>
  api.put("/update-customer-accounts/" + id, data);
export const UpdateCustomerAdvance = (data) =>
  api.patch("/update-customer-advance", data);
// ***********************************
// Transactions (Customer Items)
// ***********************************
export const AddCustomerTransaction = (data) =>
  api.post("/add-customer-transaction", data);
export const GetCustomerTransaction = (data) =>
  api.post("/get-customer-transaction", data);
export const GetAllCustomerTransaction = () =>
  api.post("/get-all-customer-transaction");
// ***********************************
// Customer Item Return Request
// ***********************************
export const AddCustomerReturn = (data) =>
  api.post("/add-customer-return", data);
export const GetCustomerReturn = (data) =>
  api.post("/get-customer-return", data);
export const GetAllCustomerReturn = () => api.post("/get-all-customer-return");

// bill request
export const GetCurrentBill = () => api.get("/get-bill-no");
export const UpdateCurrentBill = () => api.put("/update-bill-no");
// Expense Request
export const AddNewExpense = (data) => api.post("/expenses", data);
export const GetExpenses = (data) => api.post("/get-expenses", data);
// Payment Request
export const AddNewPayment = (data) => api.post("/add-transaction", data);
export const GetAllPayment = (data) => api.post("/get-transaction", data);
// *********************************************
// Bank account requests
// *********************************************
export const AddNewBankAccount = (data) => api.post("/add-bank-account", data);
export const GetBankAccounts = () => api.get("/get-bank-accounts");
export const UpdateBankAmount = (data) =>
  api.patch("/update-bank-amount", data);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// =====================================================
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// =====================================================
// interceptor
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        return api.request(originalRequest);
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    throw error;
  }
);

// export const createUser = (data) => api.post('/api/register', data);

// export const sendOtp = (data) => api.post('/api/send-otp', data);
// export const verifyOtp = (data) => api.post('/api/verify-otp', data);

// export const venueRegistration = (data) => api.post('/api/venue-register', data);
// export const checkVenue = () => api.get('/api/check-venue');
// export const getAllVenues = () => api.get('/api/all-venues');
// export const getVenueById = (data) => api.post('/api/venue-by-serviceId', data);
// export const bookService = (data) => api.post('/api/book/service', data);
// export const getVenueDates = (data) => api.post('/api/venue-dates', data);
// export const getUserOrders = () => api.get('/api/allorders/customer');
// export const getServiceProviderOrder = (data) => api.post('/api/allorders/serviceprovider', data)
// export const getDashbaordData = () => api.get('/api/dashbaord/data/venue')
// export const getOrderDetail = (orderId) => api.post('/api/getOrderDetail', orderId);
