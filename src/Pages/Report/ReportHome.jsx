import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import ExpenseNav from "../../Components/Navigations/ExpenseNav";
import ReportBanner from "../../Components/Banners/ReportBanner";
import TableComp from "../../Components/Tables/TableComponent";
import { ExpenseColumns } from "../../assets/Columns/ExpenseColumns";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../store/Slices/ExpenseSlice";
import moment from "moment";

const ReportHome = () => {
  return (
    <>
      <Navbar />
      <ExpenseNav />
      <ReportBanner title={"Report Home"} />
    </>
  );
};

export default ReportHome;
