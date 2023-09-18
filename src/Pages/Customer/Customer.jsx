import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import AddNewBill from "./AddNewBill";
import CustomerNav from "../../Components/Navigations/CustomerNav";
import TableComp from "../../Components/Tables/TableComponent";
import { CustomerInfoColumns } from "../../assets/Columns/CustomerInfoColumns";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import EditCustomer from "../../Components/Modals/EditCustomer";
import DataLoader from "../../Components/Loader/DataLoader";
import SearchInput from "../../Components/Input/SearchInput";

const Customer = () => {
  const Customers = useSelector((state) => state.CustomerReducer.data);
  const Loading = useSelector((state) => state.CustomerReducer.loading);
  const dispatch = useDispatch();
  const [selCust, setSelCust] = useState("");
  const [EditCustomerModal, setEditCustomerModal] = useState(false);
  const [FilterText, setFilterText] = useState("");
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  return (
    <>
      <Navbar />
      <CustomerNav />
      {Loading ? (
        <DataLoader />
      ) : (
        <>
          <SearchInput value={FilterText} setValue={setFilterText} />
          <TableComp
            title="CUSTOMERS INFO"
            rows={Customers.filter((cu) => {
              if (FilterText === "") {
                return cu;
              } else {
                if (cu.name.toLowerCase().includes(FilterText.toLowerCase())) {
                  return cu;
                }
              }
            })}
            columns={CustomerInfoColumns}
            setSelID={setSelCust}
            setEditCustomerModal={setEditCustomerModal}
          />
        </>
      )}
      {EditCustomerModal ? (
        <EditCustomer
          open={EditCustomerModal}
          setOpen={setEditCustomerModal}
          customerdata={Customers.filter((cu) => cu._id === selCust)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Customer;
