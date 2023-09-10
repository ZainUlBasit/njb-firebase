const DatePickerComp = ({ title, value, onChange }) => {
  return (
    <>
      <div className="w-[100%] flex flex-col px-[20px]">
        <span className="w-[100%] p-[3px] text-white font-bold pl-[10px] select-none">
          {title}
        </span>
        <input
          type="date"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className="w-[100%] bg-white font-bold text-[1.2rem] px-[5px] py-[3px] rounded-[5px]"
        />
      </div>
    </>
  );
};

export default DatePickerComp;
