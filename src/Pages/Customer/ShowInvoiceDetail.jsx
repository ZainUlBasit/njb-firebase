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
  const [CurLoading, setCurLoading] = useState("");
  const [CurDelivery, setCurDelivery] = useState("");

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
      Customers.data.filter((cust) => {
        if (cust._id === CurrentID) {
          setCurrentName(cust.name);
          setCurrentAddress(cust.address);
          setCurrentContact(cust.contact);
        }
      });
    };
    SetData();
  }, [CurrentID]);

  const onDelete = async () => {
    try {
      // const response = await DeleteInvoice(invoiceno);
      // if (response.status === 200) {
      // invoiceno = "";
      // alert("Invoice Successfully Deleted...");
      // } else if (response.status === 400) alert("Unable to delete invoice");
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
              cLoading={CurLoading}
              cDelivery={CurDelivery}
              cDiscount={CurDiscount}
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
