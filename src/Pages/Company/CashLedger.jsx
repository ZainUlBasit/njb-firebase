import React, { useEffect, useState } from "react";
import moment from "moment";
import DataLoader from "../../Components/Loader/DataLoader";
import CashPaymentDataServices from "../../Services/cashpayment.servivces";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useSelector } from "react-redux";
import { CashLedgerColumns } from "../../assets/Columns/CashLedgerColumns";
import TableComp from "../../Components/Tables/TableComponent";

const CashLedger = ({ id, fromdate, todate }) => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  let Companies = useSelector((state) => state.CompanyReducer.data);
  const GetData = async () => {
    setLoading(true);
    let response = await CashPaymentDataServices.getPayments();
    response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    response = response.filter((doc) => doc.user_id === id);
    response = response.filter(
      (resp) =>
        new Date(resp.date.seconds * 1000) >= new Date(fromdate) &&
        new Date(resp.date.seconds * 1000) <= new Date(todate)
    );
    response = response.map((re) => {
      return {
        ...re,
        date: moment(re.date.seconds * 1000).format("DD/MM/YYYY"),
      };
    });
    setData(response);
    setLoading(false);
  };
  useEffect(() => {
    // console.log(id);
    GetData();
  }, [id, fromdate, todate]);
  return (
    <>
      {Loading ? (
        <DataLoader />
      ) : (
        <TableComp
          title="Cash Ledger"
          rows={Data}
          columns={CashLedgerColumns}
        />
      )}
    </>
  );
};

export default CashLedger;
