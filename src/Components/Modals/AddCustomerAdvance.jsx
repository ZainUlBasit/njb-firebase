import React, { useEffect, useState } from "react";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import CustomModal from "./CustomModal";
import SimpleTextInput from "../Input/SimpleTextInput";
import { RegisterCustomer, UpdateCustomerAdvance } from "../../Https";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import { useDispatch, useSelector } from "react-redux";
import SimpleSelectComp from "../Select/SimpleSelectComp";
import CustomerDataServices from "../../Services/customer.services";
import AddingLoader from "../Loader/AddingLoader";
import moment from "moment";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const AddCustomerAdvance = ({ open, setOpen }) => {
  const [ID, setID] = useState("");
  const [Advance, setAdvance] = useState("");
  const [Desc, setDesc] = useState("");
  const [CurDate, setCurDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [ProcessLoading, setProcessLoading] = useState(false);
  const Customers = useSelector((state) => state.CustomerReducer.data);
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    setProcessLoading(true);
    e.preventDefault();
    if (ID !== "" && Advance !== "") {
      try {
        const timestamp = firebase.firestore.Timestamp.fromDate(
          new Date(CurDate)
        );

        await CustomerDataServices.updateCustomerAdvance(ID, Advance);
        await CustomerDataServices.addAdvanceLedger({
          customerid: ID,
          advance: Advance,
          desc: Desc,
          date: timestamp,
        });
        alert("Customer Advance successfully added..!");
        setOpen(false);
        dispatch(fetchCustomers());
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("fill all fields");
    }
    setProcessLoading(false);
  };

  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  return (
    <CustomModal title={"Customer Advance"} open={open} setOpen={setOpen}>
      <form className="flex flex-col justify-center items-center">
        <SimpleSelectComp
          value={ID}
          setValue={setID}
          label={"Select Customer"}
          data={Customers}
        />
        <SimpleTextInput
          label="Enter Advance Amount"
          placeholder="Enter Advance Amount"
          type="number"
          id="advance"
          name="advance"
          value={Advance}
          setValue={setAdvance}
        />
        <SimpleTextInput
          label="Enter Advance Desc"
          placeholder="Enter Advance Desc"
          type="text"
          id="desc"
          name="desc"
          value={Desc}
          setValue={setDesc}
        />
        <SimpleTextInput
          type="date"
          id="date"
          name="date"
          value={CurDate}
          setValue={setCurDate}
        />
        <ModalBottomLine />
      </form>
      {ProcessLoading ? (
        <AddingLoader />
      ) : (
        <div className="flex justify-center items-center">
          <ModalButton title={"add advance"} onClick={onSubmit} />
        </div>
      )}
    </CustomModal>
  );
};

export default AddCustomerAdvance;
