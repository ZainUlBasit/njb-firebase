import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import TableComp from "../../Components/Tables/TableComponent";
import { DailyColumns } from "../../assets/Columns/DailyColumns";
import CalculatedInfo from "./CalculatedInfo";

const CementDaily = ({ data }) => {
  const [CementData, setCementData] = useState([]);
  const SetData = () => {
    setCementData(
      data.filter((dt) => dt.desc === "Cement" || dt.desc === "cement")
    );
  };
  useEffect(() => {
    SetData();
  }, [data]);

  const TotalAmount = useMemo(() => {
    return CementData.reduce((total, item) => item.amount + total, 0);
  }, [CementData]);

  const TotalQty = useMemo(() => {
    return CementData.reduce((total, item) => item.qty + total, 0);
  }, [CementData]);

  const TotalPurchase = useMemo(() => {
    return CementData.reduce(
      (total, item) => item.purchase * Number(item.qty) + total,
      0
    );
  }, [CementData]);

  return (
    <>
      <TableComp
        title={"Cement Detail"}
        rows={CementData}
        columns={DailyColumns}
      />
      <CalculatedInfo
        sale={TotalAmount}
        purchase={TotalPurchase}
        qty={TotalQty}
      />
    </>
  );
};

export default CementDaily;
