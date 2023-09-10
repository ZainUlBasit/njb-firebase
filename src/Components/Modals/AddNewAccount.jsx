import React, { useState } from "react";
import CustomModal from "./CustomModal";
import SimpleTextInput from "../Input/SimpleTextInput";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import { AddNewBankAccount } from "../../Https";
import { fetchBanks } from "../../store/Slices/BankSlice";
import { useDispatch } from "react-redux";
import BankDataServices from "../../Services/bank.services";

const AddNewAccount = ({ open, setOpen }) => {
  const [Bank, setBank] = useState("");
  const [AccountNo, setAccountNo] = useState("");
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (Bank === "" && AccountNo === "") {
      alert("Fill all fields...");
    } else {
      const BankInfo = {
        bankname: Bank,
        accountno: AccountNo,
        amount: 0,
      };
      try {
        await BankDataServices.addBankAccount(BankInfo);
        alert("Bank Account is added");
        setOpen(false);
        dispatch(fetchBanks());
      } catch (err) {
        console.log(err);
        alert("Unable to Add Bank Account");
      }
    }
  };

  return (
    <CustomModal title={"Add New Account"} open={open} setOpen={setOpen}>
      <form className="flex flex-col justify-center items-center">
        <SimpleTextInput
          label="Enter Bank Name"
          placeholder="Enter Bank Name"
          type="text"
          id="bank"
          name="bank"
          value={Bank}
          setValue={setBank}
        />
        <SimpleTextInput
          label="Enter Account No"
          placeholder="Enter Account No"
          type="text"
          id="accountno"
          name="accountno"
          value={AccountNo}
          setValue={setAccountNo}
        />
        <ModalBottomLine />
      </form>
      <div className="flex justify-center items-center">
        <ModalButton title={"add account"} onClick={onSubmit} />
      </div>
    </CustomModal>
  );
};

export default AddNewAccount;
