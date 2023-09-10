import React, { useState } from "react";
import AddPayment from "../Modals/AddPayment";

const PaymentCard = ({ title, setOpen }) => {
  return (
    <>
      {/* Inenr Wrapper */}
      <div className="w-[90%] bg-[#032248] text-white rounded-t-[10px]">
        {/* title */}
        <div className="text-center py-[15px] font-bold font-[raleway] text-[1.6rem] uppercase border-b-[2px]">
          {`${title} payment`}
        </div>
        {/* middle bar */}
        <div className="flex justify-start items-center px-[10px] py-[10px] border-b-[2px] border-t-[1px] mt-[5px]">
          <div className="font-bold font-[raleway] text-[1.5rem]">{`${title} Detail`}</div>
          
        </div>
      </div>
    </>
  );
};

export default PaymentCard;
