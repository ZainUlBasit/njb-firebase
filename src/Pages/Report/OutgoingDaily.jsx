import React, { useEffect, useMemo, useState } from "react";
import TableComp from "../../Components/Tables/TableComponent";
import { CashLedgerColumns } from "../../assets/Columns/CashLedgerColumns";
import { GetChargesByDate } from "../../Https";

const OutgoingDaily = ({ data }) => {
  const [OutgoingData, setOutgoingData] = useState([]);

  const SetData = () => {
    setOutgoingData(
      data.filter((dt) => dt.type === "company" || dt.type === "Company")
    );
  };

  const OutgoingTotal = useMemo(() => {
    return OutgoingData.reduce(
      (total, item) => Number(item.amount) + Number(total),
      0
    );
  }, [OutgoingData]);

  useEffect(() => {
    SetData();
  }, [data]);
  return (
    <>
      <TableComp
        title={"Outgoing Cash"}
        rows={OutgoingData}
        columns={CashLedgerColumns}
      />
      <div className="w-full flex flex-col justify-center items-center my-[20px]">
        <div className="text-[1.5rem] font-[raleway] font-bold text-[#032248]">
          Total Outgoing Cash: {OutgoingTotal}
        </div>
      </div>
    </>
  );
};

export default OutgoingDaily;
