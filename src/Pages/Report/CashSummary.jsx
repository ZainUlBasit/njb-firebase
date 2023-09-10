import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import ExpenseNav from "../../Components/Navigations/ExpenseNav";
import DailyButton from "../../Components/Buttons/DailyButton";
import AddNewAccount from "../../Components/Modals/AddNewAccount";
import AddBankCash from "../../Components/Modals/AddBankCash";
import TableComp from "../../Components/Tables/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { BankColumns } from "../../assets/Columns/BankColumns";
import { fetchBanks } from "../../store/Slices/BankSlice";

const CashSummary = () => {
  const [AddAccountModal, setAddAccountModal] = useState(false);
  const [AddAmountModal, setAddAmountModal] = useState(false);
  const Banks = useSelector((state) => state.BankReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBanks());
  }, []);
  return (
    <>
      <Navbar />
      <ExpenseNav />
      <div className="w-full flex justify-center mb-[20px]">
        <DailyButton
          title={"Add New Account"}
          onClick={() => {
            setAddAccountModal(true);
          }}
        />
        <DailyButton
          title={"Add Amount"}
          onClick={() => {
            setAddAmountModal(true);
          }}
        />
      </div>
      <TableComp
        title={"Cash Summary"}
        rows={Banks.data}
        columns={BankColumns}
      />

      {AddAccountModal ? (
        <AddNewAccount open={AddAccountModal} setOpen={setAddAccountModal} />
      ) : AddAmountModal ? (
        <AddBankCash open={AddAmountModal} setOpen={setAddAmountModal} />
      ) : (
        <></>
      )}
    </>
  );
};

export default CashSummary;
