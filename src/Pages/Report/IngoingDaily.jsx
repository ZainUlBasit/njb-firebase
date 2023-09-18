import React, { useEffect, useMemo, useState } from "react";
import TableComp from "../../Components/Tables/TableComponent";
import { CashLedgerColumns } from "../../assets/Columns/CashLedgerColumns";
import ChargesDataServices from "../../Services/charges.services";
import customerServices from "../../Services/customer.services";
import { IngoingColumns } from "../../assets/Columns/ingoingColumns";

const IngoingDaily = ({ data, fromdate, todate }) => {
  const [IngoingData, setIngoingData] = useState([]);
  const [PaidAmount, setPaidAmount] = useState([]);
  const [AdvanceData, setAdvanceData] = useState([]);

  const SetData = async () => {
    let response = await ChargesDataServices.getCharges();
    response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    response = response.filter(
      (resp) =>
        new Date(resp.date.seconds * 1000) >= new Date(fromdate) &&
        new Date(resp.date.seconds * 1000) <= new Date(todate)
    );

    let fetchAdvanceData = await customerServices.getAdvanceLedger();
    fetchAdvanceData = fetchAdvanceData.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    }));
    console.log("advance", fetchAdvanceData);
    fetchAdvanceData = fetchAdvanceData.filter(
      (resp) =>
        new Date(resp.date.seconds * 1000) >= new Date(fromdate) &&
        new Date(resp.date.seconds * 1000) <= new Date(todate)
    );
    console.log("Response:", response);
    setPaidAmount(response);
    // data comes in props
    const getIngoingData = await data.filter(
      (dt) => dt.type === "Customer" || dt.type === "customer"
    );
    console.log(getIngoingData);
    setIngoingData(getIngoingData);
    setAdvanceData(fetchAdvanceData);
  };

  const PaidDuringBill = useMemo(() => {
    return PaidAmount.reduce((total, item) => Number(item.cpaid) + total, 0);
  }, [PaidAmount]);

  const IngoingTotal = useMemo(() => {
    return IngoingData.reduce((total, item) => Number(item.amount) + total, 0);
  }, [IngoingData]);

  const AdvanceTotal = useMemo(() => {
    return AdvanceData.reduce((total, item) => Number(item.advance) + total, 0);
  }, [AdvanceData]);

  useEffect(() => {
    SetData();
  }, [data]);
  return (
    <>
      <TableComp
        title={"Ingoing Cash"}
        rows={IngoingData}
        columns={IngoingColumns}
      />
      <div className="w-full flex flex-col justify-center items-center my-[20px]">
        <div className="text-[1.5rem] font-[raleway] font-bold text-[#032248]">
          Total Ingoing Cash: {Number(IngoingTotal).toFixed(2)}
        </div>
        <div className="text-[1.5rem] font-[raleway] font-bold text-[#032248]">
          Total Paid Cash: {Number(PaidDuringBill).toFixed(2)}
        </div>
        <div className="text-[1.5rem] font-[raleway] font-bold text-[#032248]">
          Total Advance: {Number(AdvanceTotal).toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default IngoingDaily;
