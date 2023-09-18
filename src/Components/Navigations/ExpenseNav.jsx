import React, { useState } from "react";
import { NavComp } from "./NavComp";
import AdminNavButton from "./AdminNavButton";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddExpense from "../Modals/AddExpense";
import HouseIcon from '@mui/icons-material/House';
import StoreIcon from '@mui/icons-material/Store';
import TodayIcon from '@mui/icons-material/Today';

const ExpenseNav = () => {
  const [AddExpenseModal, setAddExpenseModal] = useState(false);
  return (
    <NavComp
      isAct={false}
      className={false ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <div className="NavWrapper">
        <AdminNavButton
          title={"Add Expense"}
          type={"modal"}
          BIcon={NoteAddIcon}
          width={"185px"}
          setOpen={setAddExpenseModal}
        />
        <AdminNavButton
          title={"Expense Info"}
          type={"link"}
          BIcon={StoreIcon}
          width={"185px"}
          link={"/reports"}
        />
        <AdminNavButton
          title={"Home Expense Info"}
          type={"link"}
          BIcon={HouseIcon}
          width={"185px"}
          link={"/reports_home"}
        />
        <AdminNavButton
          title={"Daily Info"}
          type={"link"}
          BIcon={TodayIcon}
          width={"185px"}
          link={"/reports_daily"}
        />
        <AdminNavButton
          title={"Cash Summary"}
          type={"link"}
          BIcon={AccountBalanceWalletIcon}
          width={"185px"}
          link={"/cash_summary"}
        />
        {AddExpenseModal ? (
          <AddExpense open={AddExpenseModal} setOpen={setAddExpenseModal} />
        ) : (
          <></>
        )}
      </div>
    </NavComp>
  );
};

export default ExpenseNav;
