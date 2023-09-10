import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CompanyNav from "../../Components/Navigations/CompanyNav";
import AddCompany from "../../Components/Modals/AddCompany";
import TableComp from "../../Components/Tables/TableComponent";
import { CompaniesKataColumns } from "../../assets/Columns/CompaniesKataColumns";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../store/Slices/CompanySlice";
import DataLoader from "../../Components/Loader/DataLoader";

const CompanyKata = () => {
  // redux toolkit
  let Loading = useSelector((state) => state.CompanyReducer.loading);
  let Companies = useSelector((state) => state.CompanyReducer.data);
  const dispatch = useDispatch();
  // Use Effects
  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);
  return (
    <>
      <Navbar />
      <CompanyNav />
      {Loading ? (
        <DataLoader />
      ) : (
        <TableComp
          title="COMPANIES KATA"
          rows={Companies}
          columns={CompaniesKataColumns}
        />
      )}
    </>
  );
};

export default CompanyKata;
