import React from "react";

const DailyButton = ({ title, onClick }) => {
  return (
    <button
      className="border-[2px] border-[#032248] hover:border-[#0077B6] bg-[#032248] hover:bg-[#0077B6] text-white font-[raleway] font-bold px-[10px] py-[8px] hover:rounded-[5px] transition-all duration-700 mx-[10px]"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default DailyButton;
