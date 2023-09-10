import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import ItemNav from "../../Components/Navigations/ItemNav";
import TableComp from "../../Components/Tables/TableComponent";
import { StockColumns } from "../../assets/Columns/ItemStockColumns";
import { GetAllItemStock } from "../../Https";
import moment from "moment";
import CompanyTransactionDataServices from "../../Services/companyTransaction.services";
import DataLoader from "../../Components/Loader/DataLoader";

const StockStatistics = () => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    const GetData = async () => {
      setLoading(true);
      let response = await CompanyTransactionDataServices.getAllTransactions();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      response = response.map((re) => {
        return {
          ...re,
          date: moment(new Date(re.date.seconds * 1000)).format("DD/MM/YYYY"),
        };
      });
      setData(response);
      setLoading(false);
    };
    GetData();
  }, []);
  return (
    <>
      <Navbar />
      <ItemNav />
      {Loading ? (
        <DataLoader />
      ) : (
        <TableComp
          title="STOCK STATISTICS"
          rows={Data}
          columns={StockColumns}
        />
      )}
    </>
  );
};

export default StockStatistics;
