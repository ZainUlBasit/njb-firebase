import React, { useState } from "react";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import CustomModal from "./CustomModal";
import SimpleTextInput from "../Input/SimpleTextInput";
import { RegisterCustomer } from "../../Https";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import { useDispatch } from "react-redux";
import CustomerDataServices from "../../Services/customer.services";
import SimpleSelectCompByName from "../Select/SimpleSelectCompByName";
import AddingLoader from "../Loader/AddingLoader";

const AddCustomer = ({ open, setOpen }) => {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [Contact, setContact] = useState("");
  const [Cnic, setCnic] = useState("");
  const [Total, setTotal] = useState(0);
  const [Type, setType] = useState("");
  const [ProccessLoading, setProccessLoading] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    if (
      Name !== "" &&
      Address !== "" &&
      Contact !== "" &&
      Cnic !== "" &&
      Type !== ""
    ) {
      try {
        const CustomerInfo = {
          name: Name,
          address: Address,
          contact: Contact,
          cnic: Cnic,
          total: 0,
          remaining: 0,
          paid: 0,
          discount: 0,
          advance: 0,
          type: Type,
        };
        await CustomerDataServices.addCustomer(CustomerInfo);
        alert("Customer successfully added..!");
        setOpen(false);
        dispatch(fetchCustomers());
      } catch (err) {}
    } else {
      alert("fill all fields");
    }
    setProccessLoading(false);
  };
  return (
    <CustomModal title={"Add New Company"} open={open} setOpen={setOpen}>
      <form className="flex flex-col justify-center items-center">
        <SimpleTextInput
          label="Enter Name"
          placeholder="Enter Name"
          type="text"
          id="name"
          name="name"
          value={Name}
          setValue={setName}
        />
        <SimpleTextInput
          label="Enter Address"
          placeholder="Enter Address"
          type="text"
          id="address"
          name="address"
          value={Address}
          setValue={setAddress}
        />
        <SimpleTextInput
          label="Enter Contact"
          placeholder="Enter Contact"
          type="number"
          id="contact"
          name="contact"
          value={Contact}
          setValue={setContact}
        />
        <SimpleTextInput
          label="Enter CNIC"
          placeholder="Enter CNIC"
          type="number"
          id="cnic"
          name="cnic"
          value={Cnic}
          setValue={setCnic}
        />
        <SimpleSelectCompByName
          value={Type}
          setValue={setType}
          label={"Select Type"}
          data={[{ name: "shop" }, { name: "customer" }, { name: "irregular" }]}
        />
        <ModalBottomLine />
      </form>
      {ProccessLoading ? (
        <AddingLoader />
      ) : (
        <div className="flex justify-center items-center">
          <ModalButton title={"add new customer"} onClick={onSubmit} />
        </div>
      )}
    </CustomModal>
  );
};

export default AddCustomer;
