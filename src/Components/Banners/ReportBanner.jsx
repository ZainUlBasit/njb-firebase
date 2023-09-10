import React, { useEffect, useState } from "react";
import DatePickerComp from "../DatePicker/DatePicker";
import { api } from "../../Https";
import TableComp from "../Tables/TableComponent";
import { ExpenseColumns } from "../../assets/Columns/ExpenseColumns";
import moment from "moment";
import ExpenseDataServices from "../../Services/expense.services";
import DataLoader from "../Loader/DataLoader";

const ReportBanner = ({ title }) => {
  const [OpenTable, setOpenTable] = useState(false);
  const [FromDate, setFromDate] = useState("");
  const [ToDate, setToDate] = useState("");
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);

  const GetData = async () => {
    setLoading(true);
    let data = await ExpenseDataServices.getExpenses();
    data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    data = data.filter(
      (resp) =>
        new Date(resp.date.seconds * 1000) >= new Date(FromDate) &&
        new Date(resp.date.seconds * 1000) <= new Date(ToDate)
    );
    data = data.map((dt) => {
      let curDate = dt.date;
      curDate = curDate.seconds * 1000;
      return {
        ...dt,
        date: new Date(curDate),
      };
    });
    if (title === "Report Home") {
      data = data.filter((dt) => dt.type === "Home");
    } else if (title === "Report Shop") {
      data = data.filter((dt) => dt.type === "Shop");
    }
    data = data.map((d) => {
      return {
        ...d,
        date: moment(d.date).format("DD/MM/YYYY"),
      };
    });
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (FromDate !== "" && ToDate !== "") {
      GetData();
    }
  }, [FromDate, ToDate]);
  return (
    <>
      <div className="w-[100%] flex justify-center">
        <div className="w-[90%] bg-[#032248] rounded-t-[10px]">
          {/* Header */}
          <div className="w-full text-white text-center font-[raleway] font-bold text-[1.8rem] py-[15px] border-b-[3px] border-b-white uppercase">
            {title}
          </div>
          {/* Body */}
          <div className="pr-[10px] pl-[10px] font-[raleway] flex w-[100%] justify-between mt-[20px] pb-[28px] sm:flex-wrap md:flex-nowrap border-b-[2px] border-b-white">
            <DatePickerComp
              title={"From Date"}
              value={FromDate}
              onChange={setFromDate}
            />
            <DatePickerComp
              title={"To Date"}
              value={ToDate}
              onChange={setToDate}
            />
          </div>
          {/* Footer */}
          <div className="w-full flex justify-center py-[20px]">
            <button
              className="border-white border-[2px] px-[15px] py-[10px] text-[#032248] hover:text-white font-[raleway] font-bold uppercase bg-white hover:bg-[#032248] hover:rounded-[5px] transition-all duration-700"
              onClick={() => setOpenTable(!OpenTable)}
            >
              {OpenTable ? "Hide Report" : "Show Report"}
            </button>
          </div>
        </div>
      </div>
      {Loading ? (
        <DataLoader />
      ) : OpenTable ? (
        <TableComp title="Home Report" rows={Data} columns={ExpenseColumns} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ReportBanner;
