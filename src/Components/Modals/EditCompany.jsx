import { useEffect, useState } from "react";
// Inputs
import TextInput from "../Input/TextInput";
// Icons
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PinDropIcon from "@mui/icons-material/PinDrop";
import DescriptionIcon from "@mui/icons-material/Description";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CustomModal from "./CustomModal";
import TextField from "@mui/material/TextField";
import SimpleTextInput from "../Input/SimpleTextInput";
import ModalButton from "../Buttons/ModalButton";
import ModalBottomLine from "./ModalBottomLine";
import { AddNewCompany, DeleteCompany, UpdateCompany } from "../../Https";
import ModalUpdateButton from "../Buttons/ModalUpdateButton";
import ModalDeleteButton from "../Buttons/ModalDeleteButton";
import { useDispatch } from "react-redux";
import { fetchCompanies } from "../../store/Slices/CompanySlice";
import CompanyDataServices from "../../Services/company.services";
import AddingLoader from "../Loader/AddingLoader";

export default function EditCompany({ open, setOpen, CompanyData }) {
  // States
  const [Id, setId] = useState("");
  const [Username, setUsername] = useState("");
  const [Address, setAddress] = useState("");
  const [Desc, setDesc] = useState("");
  const [Contact, setContact] = useState("");
  const [ProccessLoading, setProccessLoading] = useState(false);
  const dispatch = useDispatch();
  // Functions
  const onUpdate = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    const CompanyInfo = {
      name: Username,
      address: Address,
      desc: Desc,
      contact: Contact,
    };
    try {
      await CompanyDataServices.updateCompany(Id, CompanyInfo);
      alert("Company if Successfully Updated...");
      dispatch(fetchCompanies());
      setProccessLoading(false);
    } catch (err) {
      console.log("Error occured...!");
    }
    setOpen(false);
  };

  const onDelete = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    try {
      await CompanyDataServices.deleteCompany(Id);
      alert("Company successfully deleted...");
      dispatch(fetchCompanies());
      setProccessLoading(false);
    } catch (err) {
      console.log("Error Occured:", err.message);
    }
    setOpen(false);
  };
  // Use Effects
  useEffect(() => {
    const SetData = () => {
      let temp = {};
      if (CompanyData[0] !== undefined) {
        temp = CompanyData[0];
      } else if (CompanyData[1] !== undefined) {
        temp = CompanyData[1];
      } else if (CompanyData[2] !== undefined) {
        temp = CompanyData[2];
      }
      setId(temp._id);
      setUsername(temp.name);
      setAddress(temp.address);
      setDesc(temp.desc);
      setContact(temp.contact);
    };
    SetData();
  }, []);

  return (
    <CustomModal title={"Edit Company"} open={open} setOpen={setOpen}>
      <form className="flex flex-col justify-center items-center">
        <SimpleTextInput
          label="Enter Name"
          placeholder="Enter Name"
          type="text"
          id="username"
          name="username"
          value={Username}
          setValue={setUsername}
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
          label="Enter Description"
          placeholder="Enter Description"
          type="text"
          id="description"
          name="description"
          value={Desc}
          setValue={setDesc}
        />
        <ModalBottomLine />
        {/* <ModalButton title={"add new company"} /> */}
      </form>
      {ProccessLoading ? (
        <div>
          <AddingLoader />
        </div>
      ) : (
        <div className="flex w-full justify-between mt-[20px] px-[20px]">
          <ModalUpdateButton onClick={onUpdate} />
          <ModalDeleteButton onClick={onDelete} />
        </div>
      )}
    </CustomModal>
  );
}
