import React from "react";

const CalculationInfo = ({ Total, Paid, Return, Discount, Remaining }) => {
  return (
    <div className="w-[100%] flex justify-center items-end my-[20px]">
      <div className="mx-[20px] w-[100%] flex flex-col justify-end items-end">
        <div className="text-[#032248] font-bold text-[1.3rem] w-[300px] flex flex-row">
          <div className="w-[115px] text-right">Total: </div>
          <div className="pl-[5px] underline">{Total}/-</div>
        </div>
        <div className="text-[#032248] font-bold text-[1.3rem] w-[300px] flex flex-row">
          <div className="w-[115px] text-right">Paid: </div>
          <div className="pl-[5px] underline">{Paid}/-</div>
        </div>
        <div className="text-[#032248] font-bold text-[1.3rem] w-[300px] flex flex-row">
          <div className="w-[115px] text-right">Return: </div>
          <div className="pl-[5px] underline">{Return}/-</div>
        </div>
        <div className="text-[#032248] font-bold text-[1.3rem] w-[300px] flex flex-row">
          <div className="w-[115px] text-right">Discount: </div>
          <div className="pl-[5px] underline">{Discount}/-</div>
        </div>
        <div className="text-[#032248] font-bold text-[1.3rem] w-[300px] flex flex-row">
          <div className="w-[115px] text-right">Remaining: </div>
          <div className="pl-[5px] underline">
            {Number(Remaining) - Number(Return)}/-
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationInfo;
