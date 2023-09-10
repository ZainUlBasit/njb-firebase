import React from "react";

const ModalDeleteButton = ({ onClick }) => {
  return (
    <button
      className="flex bg-red-600 border-red-600 border-[3px] text-white font-[raleway] font-bold m-[5px] px-[15px] py-[10px] hover:rounded-[5px] hover:bg-white hover:text-red-600 transition-all duration-700 select-none"
      onClick={onClick}
    >
      Delete
    </button>
  );
};

export default ModalDeleteButton;
