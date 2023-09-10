import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CashPaymentNav from "../../Components/Navigations/CashPaymentNav";
import PaymentCard from "../../Components/Cards/PaymentCard";
import PaymentTableComponent from "../../Components/Tables/PaymentTableComponent";
import AddPayment from "../../Components/Modals/AddPayment";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../store/Slices/CompanySlice";
import DataLoader from "../../Components/Loader/DataLoader";
import LoadingError from "../../Components/Loader/LoadingError";

const CompanyPayment = () => {
  const [OpenModal, setOpenModal] = useState();
  let Loading = useSelector((state) => state.CompanyReducer.loading);
  let Companies = useSelector((state) => state.CompanyReducer.data);
  let isError = useSelector((state) => state.CompanyReducer.isError);
  const dispatch = useDispatch();
  // Use Effects
  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);
  return (
    <>
      <Navbar />
      <CashPaymentNav />
      {/* Main Wrapper */}
      {Loading ? (
        <DataLoader />
      ) : isError ? (
        <LoadingError />
      ) : (
        <div className="w-[100%] flex flex-col justify-center items-center">
          <PaymentCard title="Company" setOpen={setOpenModal} />
          <PaymentTableComponent rows={Companies} />
        </div>
      )}
      {OpenModal ? (
        <AddPayment
          type="company"
          Options={Companies}
          open={OpenModal}
          setOpen={setOpenModal}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CompanyPayment;
