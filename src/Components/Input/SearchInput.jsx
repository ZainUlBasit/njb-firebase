import React from "react";

const SearchInput = ({ value, setValue }) => {
  return (
    <div className="w-[100%] px-[20px]">
      <input
        type="text"
        name="filter"
        id="filter"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Customer"
        className="w-[100%] py-[15px] pl-[15px] bg-[#032248] text-white rounded-[10px] outline-none font-bold"
      />
    </div>
  );
};

export default SearchInput;
