import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CashPaymentNav from "../../Components/Navigations/CashPaymentNav";
import PaymentCard from "../../Components/Cards/PaymentCard";
import PaymentTableComponent from "../../Components/Tables/PaymentTableComponent";
import AddPayment from "../../Components/Modals/AddPayment";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import DataLoader from "../../Components/Loader/DataLoader";
import LoadingError from "../../Components/Loader/LoadingError";

const CustomerPayment = () => {
  const [OpenModal, setOpenModal] = useState();
  const Loading = useSelector((state) => state.CustomerReducer.loading);
  const Customers = useSelector((state) => state.CustomerReducer.data);
  const isError = useSelector((state) => state.CustomerReducer.isError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  return (
    <>
      <Navbar />
      <CashPaymentNav />
      {Loading ? (
        <DataLoader />
      ) : isError ? (
        <LoadingError />
      ) : (
        <div className="w-[100%] flex flex-col justify-center items-center">
          <PaymentCard title="Customer" setOpen={setOpenModal} />
          <PaymentTableComponent rows={Customers} />
        </div>
      )}
      {OpenModal ? (
        <AddPayment
          type="customer"
          Options={Customers}
          open={OpenModal}
          setOpen={setOpenModal}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomerPayment;
