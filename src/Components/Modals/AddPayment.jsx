import React, { useState } from "react";
import SimpleSelectComp from "../Select/SimpleSelectComp";
import CustomModal from "./CustomModal";
import SimpleTextInput from "../Input/SimpleTextInput";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import {
  AddNewPayment,
  UpdateCompanyAccounts,
  UpdateCustomerAccounts,
} from "../../Https";
import { useDispatch } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import { fetchCompanies } from "../../store/Slices/CompanySlice";

const AddPayment = ({ open, setOpen, Options, type }) => {
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Amount, setAmount] = useState("");
  const [Depositor, setDepositor] = useState("");
  const [AccNo, setAccNo] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [Loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const PaymentInfo = {
      user_id: Name,
      date: Date,
      depositor: Depositor,
      accountno: AccNo,
      cnicno: CNIC,
      amount: Amount,
    };
    if (
      Name !== "" &&
      Date !== "" &&
      Amount !== "" &&
      Depositor !== "" &&
      AccNo !== "" &&
      CNIC !== ""
    ) {
      // if company or customer accounts updates then the below code will be executed
      if (type === "company") {
        await UpdateCompanyAccounts(Name, { amount: Number(Amount) });
        dispatch(fetchCompanies());
      } else if (type === "customer") {
        await UpdateCustomerAccounts(Name, { amount: Number(Amount) });
        dispatch(fetchCustomers());
      }
      const response = await AddNewPayment(PaymentInfo);
      console.log(response);
      if (response.status === 500) {
        alert("Unable to Add transaction");
      } else if (response.status === 201) {
        alert("Transaction Successfully Added...!");
        setOpen(false);
      }
      console.log(response.data);
    } else {
      console.log("Please fill all fields");
    }
  };
  const dispatch = useDispatch();
  return (
    <CustomModal title={"Add New Payment"} open={open} setOpen={setOpen}>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={onSubmit}
      >
        <SimpleSelectComp
          value={Name}
          setValue={setName}
          label={"Select Company"}
          data={Options}
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
        <SimpleTextInput
          type="date"
          id="date"
          name="date"
          value={Date}
          setValue={setDate}
        />
        <SimpleTextInput
          label="Enter Depositor"
          placeholder="Enter Depositor"
          type="text"
          id="depositor"
          name="depositor"
          value={Depositor}
          setValue={setDepositor}
        />
        <SimpleTextInput
          label="Enter Acc#"
          placeholder="Enter Acc#"
          type="text"
          id="accno"
          name="accno"
          value={AccNo}
          setValue={setAccNo}
        />
        <SimpleTextInput
          label="Enter CNIC#"
          placeholder="Enter CNIC#"
          type="text"
          id="cnic"
          name="cnic"
          value={CNIC}
          setValue={setCNIC}
        />
        <ModalBottomLine />
        <ModalButton title={"Add Payment"} />
      </form>
    </CustomModal>
  );
};

export default AddPayment;
