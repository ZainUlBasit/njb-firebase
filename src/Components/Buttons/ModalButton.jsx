import React from "react";

const ModalButton = ({ title, onClick }) => {
  return (
    <button
      className="capitalize bg-[#032248] text-white border-[#032248] border-[2px] py-[10px] px-[25px] mt-[15px] hover:bg-white hover:text-[#032248] hover:rounded-[5px] transition-all duration-500 font-[raleway]  font-bold select-none"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ModalButton;
