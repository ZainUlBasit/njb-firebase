import React from "react";

const TextInput = ({ type, placeholder, id, name, value, setValue, Icon }) => {
  return (
    <>
      <div className="bg-[#032248] w-[90%] py-[6px] rounded-[5px]  mb-[10px]">
        <Icon className="text-white mx-[10px] w-[10%]" />
        <input
          className="p-[8px] w-[83%] rounded-tr-[5px] rounded-br-[5px]"
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </>
  );
};

export default TextInput;
