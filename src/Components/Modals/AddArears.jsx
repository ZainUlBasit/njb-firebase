import React, { useEffect, useState } from "react";
import SimpleSelectComp from "../Select/SimpleSelectComp";
import SimpleTextInput from "../Input/SimpleTextInput";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalButton from "../Buttons/ModalButton";
import AddingLoader from "../Loader/AddingLoader";
import CustomModal from "./CustomModal";
import CustomerDataServices from "../../Services/customer.services";

const AddArears = ({ open, setOpen }) => {
  const [ID, setID] = useState("");
  const [Arears, setArears] = useState("");
  const [Desc, setDesc] = useState("");
  const [ProcessLoading, setProcessLoading] = useState(false);
  const Customers = useSelector((state) => state.CustomerReducer.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setProcessLoading(true);
    if (ID !== "" && Arears !== "")
      try {
        await CustomerDataServices.updateCustomerTotal(
          ID,
          Arears,
          Arears,
          0,
          0,
          0
        );
        await CustomerDataServices.addArearsLedger({
          customerid: ID,
          arears: Number(Arears),
          desc: Desc,
        });
        alert("Arears Scuccessfully Added...");
        dispatch(fetchCustomers());
        setOpen(false);
      } catch (error) {}
    else alert("All fields are mandatory");
    setProcessLoading(false);
  };
  return (
    <CustomModal title={"Add Arears"} open={open} setOpen={setOpen}>
      <form className="flex flex-col justify-center items-center">
        <SimpleSelectComp
          value={ID}
          setValue={setID}
          label={"Select Customer"}
          data={Customers}
        />
        <SimpleTextInput
          label="Enter Arears Amount"
          placeholder="Enter Arears Amount"
          type="number"
          id="arears"
          name="arears"
          value={Arears}
          setValue={setArears}
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

export default AddArears;
