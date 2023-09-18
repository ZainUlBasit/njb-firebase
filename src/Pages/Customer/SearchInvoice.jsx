import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CustomerNav from "../../Components/Navigations/CustomerNav";
import LedgerButton from "../../Components/Buttons/LedgerButton";
import ShowInvoiceDetail from "./ShowInvoiceDetail";
import Select from "react-select";
import BillNoDataServices from "../../Services/billno.services";
import CustomerTransactionDataServices from "../../Services/customerTransaction.services";
import moment from "moment";

const SearchInvoice = () => {
  const [CurrentInvoice, setCurrentInvoice] = useState("");
  const [Invoices, setInvoices] = useState([]);
  const [Transactions, setTransactions] = useState([]);
  const [ShowDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const BillNo = async () => {
      let response = await CustomerTransactionDataServices.getAllTransactions();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      response = response.map((resp) => {
        return {
          ...resp,
          date: moment(resp.date.seconds * 1000).format("DD/MM/YYYY"),
        };
      });
      setTransactions(response);
      let i = 1;
      response.map((resp) => {
        if (i == 1) setInvoices([{ label: resp.bill, value: resp.bill }]);
        else
          setInvoices((curVal) => [
            ...curVal,
            { label: resp.bill, value: resp.bill },
          ]);
        i += 1;
      });
    };
    BillNo();
  }, []);

  return (
    <>
      <Navbar />
      <CustomerNav />
      <div className="w-[100%] flex justify-center items-center">
        <div className="w-[90%] bg-[#032248] border-[2px] border-[#032248] rounded-t-[10px]">
          <div className="w-full border-b-[2px] border-b-white text-center font-[raleway] font-bold text-white py-[20px] text-[1.7rem]">
            Search Invoice
          </div>
          <div className="bg-white pt-[20px] flex justify-center">
            <Select
              options={Invoices}
              className="w-[90%] mb-[20px] pb-[0px]"
              onChange={(opt) => setCurrentInvoice(opt.value)}
            />
          </div>
          <div className="w-full flex justify-center items-center pt-[20px] pb-[10px]">
            <LedgerButton
              title={ShowDetail ? "Hide Invoice" : "Show Invoice"}
              onClick={() => setShowDetail(!ShowDetail)}
            />
          </div>
        </div>
      </div>
      {ShowDetail ? (
        <ShowInvoiceDetail data={Transactions} invoiceno={CurrentInvoice} />
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchInvoice;
