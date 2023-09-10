import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import SimpleTextInput from "../Input/SimpleTextInput";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import {
  AddNewBankAccount,
  GetBankAccounts,
  UpdateBankAmount,
} from "../../Https";
import SimpleSelectComp from "../Select/SimpleSelectComp";
import { fetchBanks } from "../../store/Slices/BankSlice";
import { useDispatch } from "react-redux";
import BankDataServices from "../../Services/bank.services";

const AddBankCash = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (CurrentBank === "" && Amount === "") {
      alert("Fill all fields...");
    } else {
      try {
        await BankDataServices.updateBankAccounts(CurrentBank, Amount);
        alert("Amount is added to Bank Account");
        setOpen(false);
        dispatch(fetchBanks());
      } catch (err) {
        console.log(err);
        alert("Unable to Add Amount...");
      }
    }
  };

  const [BankAccounts, setBankAccounts] = useState([]);
  const [CurrentBank, setCurrentBank] = useState("");
  const [Amount, setAmount] = useState("");
  useEffect(() => {
    const GetData = async () => {
      let response = await BankDataServices.getBankAccounts();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      response = response.map((bk) => {
        return {
          ...bk,
          name: bk.accountno,
        };
      });
      setBankAccounts(response);
    };
    GetData();
  }, []);

  return (
    <CustomModal title={"Add Bank Cash"} open={open} setOpen={setOpen}>
      <form className="flex flex-col justify-center items-center">
        <SimpleSelectComp
          value={CurrentBank}
          setValue={setCurrentBank}
          label={"Select Bank Account"}
          data={BankAccounts}
        />
        <SimpleTextInput
          label="Enter Amount"
          placeholder="Enter Amount"
          type="number"
          id="amount"
          name="amount"
          value={Amount}
          setValue={setAmount}
        />
        <ModalBottomLine />
      </form>
      <div className="flex justify-center items-center">
        <ModalButton title={"add account"} onClick={onSubmit} />
      </div>
    </CustomModal>
  );
};

export default AddBankCash;
