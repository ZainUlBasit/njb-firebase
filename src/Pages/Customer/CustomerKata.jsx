import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CustomerNav from "../../Components/Navigations/CustomerNav";
import TableComp from "../../Components/Tables/TableComponent";
import { CustomerKataColumns } from "../../assets/Columns/CustomerKataColumns";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import DataLoader from "../../Components/Loader/DataLoader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AccountReport from "../AccountReport";
import DailyButton from "../../Components/Buttons/DailyButton";
import SearchInput from "../../Components/Input/SearchInput";

const CustomerKata = () => {
  const Customers = useSelector((state) => state.CustomerReducer.data);
  const Loading = useSelector((state) => state.CustomerReducer.loading);
  const [ShopType, setShopType] = useState([]);
  const [CustomerType, setCustomerType] = useState([]);
  const dispatch = useDispatch();
  const [FilterText, setFilterText] = useState("");
  useEffect(() => {
    dispatch(fetchCustomers());
    const setData = () => {
      setShopType(Customers.filter((cust) => cust.type === "shop"));
      setCustomerType(Customers.filter((cust) => cust.type === "customer"));
    };
    setData();
  }, []);

  const TotalAdvance = useMemo(() => {
    return Customers.reduce((total, cust) => Number(cust.advance) + total, 0);
  }, [Customers]);
  const TotalArears = useMemo(() => {
    return Customers.reduce((total, cust) => Number(cust.remaining) + total, 0);
  }, [Customers]);
  return (
    <>
      <Navbar />
      <CustomerNav />
      <div className="flex w-[100%] justify-center mb-[20px]">
        <PDFDownloadLink
          document={<AccountReport Data={ShopType} />}
          fileName={`Shop Cash Report`}
        >
          <DailyButton title={"Shop Report"} onClick={() => {}} />
        </PDFDownloadLink>
        <PDFDownloadLink
          document={<AccountReport Data={CustomerType} />}
          fileName={`Customer Cash Report`}
        >
          <DailyButton title={"Customer Report"} onClick={() => {}} />
        </PDFDownloadLink>
        <PDFDownloadLink
          document={
            <AccountReport
              Data={Customers.filter((cust) => Number(cust.advance) !== 0)}
            />
          }
          fileName={`Customer Advance Report`}
        >
          <DailyButton title={"Advance Report"} onClick={() => {}} />
        </PDFDownloadLink>
        <PDFDownloadLink
          document={
            <AccountReport
              Data={Customers.filter((cust) => Number(cust.remaining) !== 0)}
            />
          }
          fileName={`Customer Arears Report`}
        >
          <DailyButton title={"Arears Report"} onClick={() => {}} />
        </PDFDownloadLink>
      </div>
      {Loading ? (
        <DataLoader />
      ) : (
        <>
          <SearchInput value={FilterText} setValue={setFilterText} />
          <TableComp
            title="CUSTOMERS KATA"
            rows={Customers.filter((cu) => {
              if (FilterText === "") {
                return cu;
              } else {
                if (cu.name.toLowerCase().includes(FilterText.toLowerCase())) {
                  return cu;
                }
              }
            })}
            columns={CustomerKataColumns}
          />
          <div className="flex flex-col justify-end items-end text-[1.3rem] font-bold mx-[10px] py-[20px]">
            <div>{`Total Advance: ${TotalAdvance}/-`}</div>
            <div>{`Total Arears: ${TotalArears}/-`}</div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerKata;
