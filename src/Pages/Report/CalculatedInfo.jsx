import React from "react";

const CalculatedInfo = ({ sale, purchase, qty }) => {
  return (
    <div className="w-[100%] flex justify-center items-end">
      <div className="mx-[20px] w-[100%] flex flex-col justify-end items-end">
        <div className="text-[#032248] font-bold text-[1.3rem]">
          Total Sale: {sale}/-
        </div>
        <div className="text-[#032248] font-bold text-[1.3rem]">
          Total Purchases: {Number(purchase).toFixed(2)}/-
        </div>
        <div className="text-[#032248] font-bold text-[1.3rem]">
          Total QTY: {Number(qty).toFixed(2)}/-
        </div>
        <div className="text-[#032248] font-bold text-[1.3rem]">
          Total Profit: {Number(sale - purchase).toFixed(2)}/-
        </div>
      </div>
    </div>
  );
};

export default CalculatedInfo;
