import React, { useEffect, useMemo, useState } from "react";
import TableComp from "../../Components/Tables/TableComponent";
import { saleInfoColumns } from "../../assets/Columns/saleInfoColumns";
import customerServices from "../../Services/customer.services";
import moment from "moment";
import DataLoader from "../../Components/Loader/DataLoader";

const SaleInfoDaily = ({ fromdate, todate }) => {
  const [AllSale, setAllSale] = useState([]);
  const [Loading, setLoading] = useState(false);
  const FetchData = async () => {
    setLoading(true);
    let data = await customerServices.getSaleInfo();
    data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    data = data.filter(
      (resp) =>
        new Date(resp.date.seconds * 1000) >= new Date(fromdate) &&
        new Date(resp.date.seconds * 1000) <= new Date(todate)
    );
    data = data.map((re) => {
      return {
        ...re,
        date: moment(re.date.seconds * 1000).format("DD/MM/YYYY"),
      };
    });
    setAllSale(data);
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  const Total = useMemo(() => {
    return AllSale.reduce((total, item) => Number(item.total) + total, 0);
  }, [AllSale]);

  const Paid = useMemo(() => {
    return AllSale.reduce((total, item) => Number(item.paid) + total, 0);
  }, [AllSale]);
  return (
    <>
      {Loading ? (
        <DataLoader />
      ) : (
        <>
          <TableComp
            title={"Sale Info"}
            rows={AllSale}
            columns={saleInfoColumns}
          />
          <div className="text-[1.3rem] font-bold font-[raleway] flex flex-col items-end pb-[20px] pt-[10px] mr-[20px]">
            <div>Total Sale: {Number(Total).toFixed(2)}/-</div>
            <div>Total Paid: {Number(Paid).toFixed(2)}/-</div>
            <div>Total Remaining: {Number(Total - Paid).toFixed(2)}/-</div>
          </div>
        </>
      )}
    </>
  );
};

export default SaleInfoDaily;
