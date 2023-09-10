import React, { useMemo, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import ExpenseNav from "../../Components/Navigations/ExpenseNav";
import DailyButton from "../../Components/Buttons/DailyButton";
import SteelDaily from "./SteelDaily";
import CementDaily from "./CementDaily";
import { GetAllCustomerTransaction, GetAll_Payment } from "../../Https";
import { useEffect } from "react";
import moment from "moment";
import IngoingDaily from "./IngoingDaily";
import OutgoingDaily from "./OutgoingDaily";
import DatePickerComp from "../../Components/DatePicker/DatePicker";
import LedgerButton from "../../Components/Buttons/LedgerButton";
import CustomerTransactionDataServices from "../../Services/customerTransaction.services";
import DataLoader from "../../Components/Loader/DataLoader";
import CashPaymentDataServices from "../../Services/cashpayment.servivces";

const ReportDaily = () => {
  const [ShowSteel, setShowSteel] = useState(false);
  const [ShowCement, setShowCement] = useState(false);
  const [Ingoing, setIngoing] = useState(false);
  const [Outgoing, setOutgoing] = useState(false);
  const [ShowBody, setShowBody] = useState(false);
  const toggleSteel = () => {
    if (!ShowSteel) {
      setShowSteel(true);
      setShowCement(false);
      setIngoing(false);
      setOutgoing(false);
    }
  };
  const toggleCement = () => {
    if (!ShowCement) {
      setShowSteel(false);
      setShowCement(true);
      setIngoing(false);
      setOutgoing(false);
    }
  };
  const toggleIngoing = () => {
    if (!Ingoing) {
      setShowSteel(false);
      setShowCement(false);
      setIngoing(true);
      setOutgoing(false);
    }
  };
  const toggleOutgoing = () => {
    if (!Outgoing) {
      setShowSteel(false);
      setShowCement(false);
      setIngoing(false);
      setOutgoing(true);
    }
  };

  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [Transactions, setTransactions] = useState([]);

  const GetData = async () => {
    setLoading(true);
    let response = await CustomerTransactionDataServices.getAllTransactions();
    response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    response = response.filter(
      (resp) =>
        new Date(resp.date.seconds * 1000) >= new Date(fromDate) &&
        new Date(resp.date.seconds * 1000) <= new Date(toDate)
    );
    response = response.map((re) => ({
      ...re,
      date: moment(re.date.seconds * 1000).format("DD/MM/YYYY"),
    }));
    setData(response);

    response = await CashPaymentDataServices.getPayments();
    response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    response = response.filter(
      (resp) =>
        new Date(resp.date.seconds * 1000) >= new Date(fromDate) &&
        new Date(resp.date.seconds * 1000) <= new Date(toDate)
    );
    response = response.map((re) => {
      return {
        ...re,
        date: moment(re.date.seconds * 1000).format("DD/MM/YYYY"),
      };
    });
    setTransactions(response);
    setLoading(false);
  };

  useEffect(() => {
    if (ShowBody && fromDate !== "" && toDate !== "") GetData();
  }, [ShowBody, fromDate, toDate]);

  return (
    <>
      <Navbar />
      <ExpenseNav />
      <div className="w-[100%] flex justify-center items-center border-b-white border-b-[2px] mb-[5px]">
        <div className="w-[80%] flex justify-center items-center flex-col bg-[#032248] pb-[20px]">
          <div className="w-full border-b-[2px] border-b-white text-center font-[raleway] font-bold text-white py-[20px] text-[1.7rem]">
            Daily Info
          </div>
          <div className="pr-[10px] pl-[10px] font-[raleway] flex w-[100%] rounded-[10px] justify-between mt-[12px] mb-[28px] sm:flex-wrap md:flex-nowrap">
            <DatePickerComp
              title={"From Date"}
              value={fromDate}
              onChange={setFromDate}
            />
            <DatePickerComp
              title={"To Date"}
              value={toDate}
              onChange={setToDate}
            />
          </div>
          {!ShowBody ? (
            <LedgerButton
              title={"Show Body"}
              onClick={() => {
                if (fromDate !== "" && toDate !== "") setShowBody(true);
                else alert("Select Date first...");
              }}
            />
          ) : (
            <div>
              <LedgerButton title={"Show Steel"} onClick={toggleSteel} />
              <LedgerButton title={"SHOW CEMENT"} onClick={toggleCement} />
              <LedgerButton title={"Ingoing Cash"} onClick={toggleIngoing} />
              <LedgerButton title={"Outgoing Cash"} onClick={toggleOutgoing} />
            </div>
          )}
        </div>
      </div>
      {Loading ? (
        <DataLoader />
      ) : ShowSteel ? (
        <SteelDaily data={Data} />
      ) : ShowCement ? (
        <CementDaily data={Data} />
      ) : Ingoing ? (
        <IngoingDaily data={Transactions} fromdate={fromDate} todate={toDate} />
      ) : Outgoing ? (
        <OutgoingDaily data={Transactions} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ReportDaily;
