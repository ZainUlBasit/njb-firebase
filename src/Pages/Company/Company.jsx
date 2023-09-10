import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CompanyNav from "../../Components/Navigations/CompanyNav";
import TableComp from "../../Components/Tables/TableComponent";
import { CompaniesInfoColumns } from "../../assets/Columns/CompaniesInfoColumns";
import EditCompany from "../../Components/Modals/EditCompany";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../store/Slices/CompanySlice";
import DataLoader from "../../Components/Loader/DataLoader";
import CompnayDataServices from "../../Services/company.services";

const Company = () => {
  // Redux Toolkit
  let Loading = useSelector((state) => state.CompanyReducer.loading);
  let Companies = useSelector((state) => state.CompanyReducer.data);
  const dispatch = useDispatch();
  // States
  const [selComp, setSelComp] = useState("");
  const [EditCompanyModal, setEditCompanyModal] = useState(false);
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
          title="COMPANIES INFO"
          rows={Companies}
          columns={CompaniesInfoColumns}
          setEditCompanyModal={setEditCompanyModal}
          setSelID={setSelComp}
        />
      )}
      {EditCompanyModal ? (
        <EditCompany
          open={EditCompanyModal}
          setOpen={setEditCompanyModal}
          CompanyData={Companies.filter((comp) => comp._id === selComp)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Company;
