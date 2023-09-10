import React, { useEffect, useState } from "react";
import DataLoader from "../../Components/Loader/DataLoader";
import TableComp from "../../Components/Tables/TableComponent";
import { StockColumns } from "../../assets/Columns/ItemStockColumns";
import moment from "moment";
import { GetItemLegder } from "../../Https";
import CompanyTransactionDataServices from "../../Services/companyTransaction.services";

const ItemLedger = ({ id, fromdate, todate }) => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const GetData = async () => {
    setLoading(true);
    let response = await CompanyTransactionDataServices.getAllTransactions();
    response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    response = response.filter((doc) => doc.company_id === id);
    response = response.filter(
      (resp) =>
        new Date(resp.date.seconds * 1000) >= new Date(fromdate) &&
        new Date(resp.date.seconds * 1000) <= new Date(todate)
    );
    response = response.map((re) => ({
      ...re,
      date: moment(re.date.seconds * 1000).format("DD/MM/YYYY"),
    }));
    setData(response);
    setLoading(false);
  };
  useEffect(() => {
    GetData();
  }, [id, fromdate, todate]);
  return (
    <>
      {Loading ? (
        <DataLoader />
      ) : (
        <TableComp title="Item Ledger" rows={Data} columns={StockColumns} />
      )}
    </>
  );
};

export default ItemLedger;
