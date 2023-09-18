import React, { useEffect, useState } from "react";
import { CustomerItemLedgerColumns } from "../../assets/Columns/CustomerItemLedgerColumns";
import TableComp from "../../Components/Tables/TableComponent";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import ModalDeleteButton from "../../Components/Buttons/ModalDeleteButton";
import { DeleteInvoice, GetCharges } from "../../Https";
import { CustomerDetailColumns } from "../../assets/Columns/CustomerDetailColumns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Testing from "../Testing";
import ChargesDataServices from "../../Services/charges.services";
import customerServices from "../../Services/customer.services";
import customerTransactionServices from "../../Services/customerTransaction.services";

const ShowInvoiceDetail = ({ data, invoiceno }) => {
  const [CurrentInvoiceD, setCurrentInvoiceD] = useState([]);
  const [CurrentID, setCurrentID] = useState("");
  const [CurrentName, setCurrentName] = useState("");
  const [CurrentAddress, setCurrentAddress] = useState("");
  const [CurrentContact, setCurrentContact] = useState("");
  const [CurrentAccounts, setCurrentAccounts] = useState([]);
  const [CurTotal, setCurTotal] = useState("");
  const [CurPaid, setCurPaid] = useState("");
  const [CurDiscount, setCurDiscount] = useState("");
  const [CurAdvance, setCurAdvance] = useState("");
  const [CurExpense, setCurExpense] = useState("");
  const [CurLoading, setCurLoading] = useState("");
  const [CurDelivery, setCurDelivery] = useState("");
  const [CurDriverName, setCurDriverName] = useState("");
  const [CurDriverContact, setCurDriverContact] = useState("");

  const getInvoiceData = () => {
    setCurrentInvoiceD([]);
    data.map((dt) => {
      if (dt.bill === invoiceno) {
        setCurrentID(dt.customerid);
        setCurrentInvoiceD((currVal) => [...currVal, dt]);
      }
    });
  };
  const Customers = useSelector((state) => state.CustomerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getInvoiceData();
  }, [invoiceno]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  useEffect(() => {
    const SetData = async () => {
      let response = await ChargesDataServices.getCharges();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      response = response.filter((resp) => {
        if (resp.id === invoiceno)
          return {
            ...resp,
            date: moment(resp.date.seconds * 1000).format("DD/MM/YYYY"),
          };
      });
      setCurrentAccounts(response);

      let curData = response;
      curData = curData[0];
      setCurTotal(curData.total);
      setCurPaid(curData.cpaid);
      setCurDiscount(curData.cdiscount);
      setCurAdvance(curData.advance);
      setCurLoading(curData.cloading);
      setCurDelivery(curData.cdelivery);
      setCurExpense(curData.cexpense);
      setCurDriverName(curData.drivername);
      setCurDriverContact(curData.drivercontact);
      Customers.data.filter((cust) => {
        if (cust._id === CurrentID) {
          setCurrentName(cust.name);
          setCurrentAddress(cust.address);
          setCurrentContact(cust.contact);
          setCurrentContact(cust.contact);
        }
      });
    };
    SetData();
  }, [CurrentID]);

  const onDelete = async () => {
    try {
      const total =
        (Number(CurrentAccounts[0].total) +
          Number(CurrentAccounts[0].cdelivery) +
          Number(CurrentAccounts[0].cloading) +
          Number(CurrentAccounts[0].cexpense)) *
        -1;
      const paid = Number(CurrentAccounts[0].cpaid) * -1;
      const remaining =
        (Number(CurrentAccounts[0].total) +
          Number(CurrentAccounts[0].cdelivery) +
          Number(CurrentAccounts[0].cloading) +
          Number(CurrentAccounts[0].cexpense) -
          Number(CurrentAccounts[0].cpaid) -
          Number(CurrentAccounts[0].cdiscount)) *
        -1;
      const advance = Number(CurrentAccounts[0].advance) * -1;
      const discount = Number(CurrentAccounts[0].cdiscount) * -1;
      await customerServices.updateAccountsDelete(
        CurrentID,
        total,
        paid,
        remaining,
        advance,
        discount
      );
      CurrentInvoiceD.map(async (ci) => {
        await customerTransactionServices.deleteTransaction(ci._id);
      });

      await customerServices.deleteSaleInfo(CurrentInvoiceD[0].bill);
      alert("Item Deleted Successfully...");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col w-[100%] justify-center items-center">
        <div className="my-[15px] w-[100%] text-[1.5rem] font-[raleway] font-bold flex justify-center items-center">
          <TableComp
            title={`Customer: ${CurrentName}`}
            rows={CurrentAccounts}
            columns={CustomerDetailColumns}
          />
        </div>
      </div>
      <TableComp
        title={"Invoice Detail"}
        rows={CurrentInvoiceD}
        columns={CustomerItemLedgerColumns}
      />
      <div className="flex justify-center items-center my-[20px]">
        <PDFDownloadLink
          document={
            <Testing
              Data={CurrentInvoiceD}
              cTotal={CurTotal}
              cAdvance={CurAdvance}
              cLoading={CurLoading}
              cDelivery={CurDelivery}
              cDiscount={CurDiscount}
              cExpense={CurExpense}
              DriverName={CurDriverName}
              DriverContact={CurDriverContact}
              cGrand={
                Number(CurTotal) -
                Number(CurDiscount) +
                Number(CurLoading) +
                Number(CurDelivery)
              }
              cPaid={CurPaid}
              bBillNo={invoiceno}
              bDate={moment(new Date()).format("DD/MM/YYYY")}
              cName={CurrentName}
              cAddress={CurrentAddress}
              cContact={CurrentContact}
            />
          }
          fileName={`${invoiceno}`}
        >
          <button className="bg-[#032248] text-[#fff] px-[20px] mobbtn:px-[14px] py-[10px] font-bold font-[raleway] text-[1.2rem] border-[2px] border-[#032248] hover:rounded-[8px] hover:bg-[#fff] hover:text-[#032248] transition-all duration-700 select-none my-[5px] mx-[5px]">
            Print
          </button>
        </PDFDownloadLink>
        <button
          className="bg-[red] text-[#fff] px-[20px] mobbtn:px-[14px] py-[10px] font-bold font-[raleway] text-[1.2rem] border-[2px] border-[red] hover:rounded-[8px] hover:bg-[#fff] hover:text-[red] transition-all duration-700 select-none my-[5px] mx-[5px]"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ShowInvoiceDetail;
