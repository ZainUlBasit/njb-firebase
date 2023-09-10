import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CompanyNav from "../../Components/Navigations/CompanyNav";
import AddCompany from "../../Components/Modals/AddCompany";
import LedgerComp from "../../Components/Ledger/LegderComp";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../store/Slices/CompanySlice";
import CashLedger from "./CashLedger";
import ItemLedger from "./ItemLedger";
import DataLoader from "../../Components/Loader/DataLoader";

const CompanyLedger = () => {
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
        <LedgerComp
          title="COMPANY LEDGER"
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
          DefOption="Select Company..."
          Options={Companies}
        />
      )}
      {ShowMsg ? (
        <div className="w-[100%] flex justify-center">
          <div className="bg-red-700 text-white w-[80%] p-[10px] pr-[0px] border-[#032248] border-t-white border-[5px] border-t-[3px] font-[raleway] text-[1.3rem] font-bold">
            Please Select Company...!
          </div>
        </div>
      ) : isCash && Select.found ? (
        <CashLedger id={Select.id} fromdate={FromDate} todate={ToDate} />
      ) : isItem && Select.found ? (
        <ItemLedger id={Select.id} fromdate={FromDate} todate={ToDate} />
      ) : (
        <></>
      )}
    </>
  );
};

export default CompanyLedger;
