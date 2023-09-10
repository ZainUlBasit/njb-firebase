import React, { useEffect, useMemo, useState } from "react";
import TableComp from "../../Components/Tables/TableComponent";
import { CashLedgerColumns } from "../../assets/Columns/CashLedgerColumns";
import ChargesDataServices from "../../Services/charges.services";
import moment from "moment";

const IngoingDaily = ({ data, fromdate, todate }) => {
  const [IngoingData, setIngoingData] = useState([]);
  const [PaidAmount, setPaidAmount] = useState([]);

  const SetData = async () => {
    let response = await ChargesDataServices.getCharges();
    response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    console.log(response);
    console.log(fromdate);
    response = response.filter(
      (resp) =>
        new Date(resp.date.seconds * 1000) >= new Date(fromdate) &&
        new Date(resp.date.seconds * 1000) <= new Date(todate)
    );
    setPaidAmount(response);
    setIngoingData(
      data.filter((dt) => dt.type === "Customer" || dt.type === "customer")
    );
  };

  const PaidDuringBill = useMemo(() => {
    return PaidAmount.reduce((total, item) => Number(item.cpaid) + total, 0);
  }, [PaidAmount]);

  const IngoingTotal = useMemo(() => {
    return IngoingData.reduce((total, item) => Number(item.amount) + total, 0);
  }, [IngoingData]);

  useEffect(() => {
    SetData();
  }, [data]);
  return (
    <>
      <TableComp
        title={"Ingoing Cash"}
        rows={IngoingData}
        columns={CashLedgerColumns}
      />
      <div className="w-full flex flex-col justify-center items-center my-[20px]">
        <div className="text-[1.5rem] font-[raleway] font-bold text-[#032248]">
          Total Ingoing Cash: {IngoingTotal}
        </div>
        <div className="text-[1.5rem] font-[raleway] font-bold text-[#032248]">
          Total Paid Cash: {PaidDuringBill}
        </div>
      </div>
    </>
  );
};

export default IngoingDaily;
