import React from "react";

const ModalUpdateButton = ({ onClick }) => {
  return (
    <button
      className="flex bg-green-600 border-green-600 border-[3px] text-white font-[raleway] font-bold m-[5px] px-[15px] py-[10px] hover:rounded-[5px] hover:bg-white hover:text-green-600 transition-all duration-700 select-none"
      onClick={onClick}
    >
      Update
    </button>
  );
};

export default ModalUpdateButton;
