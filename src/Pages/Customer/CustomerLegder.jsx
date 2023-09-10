import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CustomerNav from "../../Components/Navigations/CustomerNav";
import LedgerComp from "../../Components/Ledger/LegderComp";
import CashLedger from "./CashLedger";
import ItemLedger from "./ItemLedger";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import { useDispatch, useSelector } from "react-redux";

const CustomerLegder = () => {
  const Customers = useSelector((state) => state.CustomerReducer.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [isCash, setIsCash] = useState(false);
  const [isItem, setIsItem] = useState(false);
  const [value, setValue] = useState("");
  const [Select, setSelect] = useState({
    id: "",
    found: false,
  });
  const [ShowMsg, setShowMsg] = useState(false);
  //   Functions
  const handleCash = () => {
    if (Select.found) {
      setIsCash(true);
      setIsItem(false);
    } else {
      setShowMsg(true);
      setIsItem(false);
      setIsCash(false);
    }
  };

  const handleItem = () => {
    if (Select.found) {
      setIsItem(true);
      setIsCash(false);
    } else {
      setShowMsg(true);
      setIsItem(false);
      setIsCash(false);
    }
  };

  const onChangeFunc = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log("search", searchTerm);
  };

  return (
    <>
      <Navbar />
      <CustomerNav />
      <LedgerComp
        title="CUSTOMER LEDGER"
        Ledger
        fromDate={FromDate}
        toDate={ToDate}
        value={value}
        onChangeFunc={onChangeFunc}
        onSearch={onSearch}
        onChange={setFromDate}
        onChange1={setToDate}
        handleItem={handleItem}
        handleCash={handleCash}
        setSelectCompany={setSelect}
        SelectCompany={Select}
        DefOption="Select Customer..."
        Options={Customers}
      />
      {isCash ? (
        <CashLedger id={Select.id} fromdate={FromDate} todate={ToDate} />
      ) : isItem ? (
        <ItemLedger id={Select.id} fromdate={FromDate} todate={ToDate} />
      ) : ShowMsg ? (
        <div className="w-[100%] flex justify-center">
          <div className="bg-red-700 text-white w-[80%] p-[10px] pr-[0px] border-[#032248] border-t-white border-[5px] border-t-[3px] font-[raleway] text-[1.3rem] font-bold">
            Please Select Customer...!
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomerLegder;
