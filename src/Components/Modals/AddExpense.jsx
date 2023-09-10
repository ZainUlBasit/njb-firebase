import React, { useState } from "react";
import CustomModal from "./CustomModal";
import SimpleSelectComp from "../Select/SimpleSelectComp";
import SimpleTextInput from "../Input/SimpleTextInput";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import { AddNewExpense } from "../../Https";
import SimpleSelectCompByName from "../Select/SimpleSelectCompByName";
import ExpenseDataServices from "../../Services/expense.services";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import AddingLoader from "../Loader/AddingLoader";

const AddExpense = ({ open, setOpen }) => {
  // States
  const [ExpenseType, setExpenseType] = useState("");
  const [CurDate, setCurDate] = useState("");
  const [Desc, setDesc] = useState("");
  const [Expense, setExpense] = useState("");
  const [ProcessLoading, setProcessLoading] = useState(false);
  // Functions
  const onSubmit = async (e) => {
    setProcessLoading(true);
    e.preventDefault();
    if (ExpenseType !== "" && CurDate !== "" && Desc !== "" && Expense !== "") {
      const timestamp = firebase.firestore.Timestamp.fromDate(
        new Date(CurDate)
      );
      const expenseInfo = {
        type: ExpenseType,
        date: timestamp,
        desc: Desc,
        expense: Expense,
      };
      try {
        await ExpenseDataServices.addExpense(expenseInfo);
        alert("Expense Succesfully Added...");
        setOpen(false);
      } catch (error) {}
    } else {
      alert("Fill All Fields....");
    }
    setProcessLoading(false);
  };
  return (
    <CustomModal title={"Add Expense"} open={open} setOpen={setOpen}>
      <form
        className="flex flex-col justify-center items-center pt-[10px]"
        onSubmit={onSubmit}
      >
        <SimpleSelectCompByName
          value={ExpenseType}
          setValue={setExpenseType}
          label={"Select Expense Type"}
          data={[
            { id: "Shop", name: "Shop" },
            { id: "Home", name: "Home" },
          ]}
        />
        <SimpleTextInput
          type="date"
          id="date"
          name="date"
          value={CurDate}
          setValue={setCurDate}
        />
        <SimpleTextInput
          label="Enter Description"
          placeholder="Enter Description"
          type="text"
          id="desc"
          name="desc"
          value={Desc}
          setValue={setDesc}
        />
        <SimpleTextInput
          label="Enter Expense"
          placeholder="Enter Expense"
          type="number"
          id="expense"
          name="expense"
          value={Expense}
          setValue={setExpense}
        />
        <ModalBottomLine />
        {ProcessLoading ? (
          <AddingLoader />
        ) : (
          <ModalButton title={"Add Expense"} />
        )}
      </form>
    </CustomModal>
  );
};

export default AddExpense;
