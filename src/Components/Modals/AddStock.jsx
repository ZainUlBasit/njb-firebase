import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import SimpleSelectComp from "../Select/SimpleSelectComp";
import SimpleTextInput from "../Input/SimpleTextInput";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../store/Slices/ItemSlice";
import { AddItemQty, AddItemStock, UpdateCompanyTotal } from "../../Https";
import { fetchCompanies } from "../../store/Slices/CompanySlice";
import ItemDataServices from "../../Services/item.services";
import CompanyTransactionDataServices from "../../Services/companyTransaction.services";
import CompanyDataServices from "../../Services/company.services";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const AddStock = ({ open, setOpen }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    let currentItem = Items.filter((it) => it._id === ItemName);
    const curItemName = currentItem[0].name;
    const purchase = currentItem[0].purchase;
    const id = currentItem[0]._id;
    const f_company = currentItem[0].company;

    let company_id = Companies.filter((co) => f_company === co.name);
    company_id = company_id[0]._id;

    const total = Number(purchase) * Number(ItemQty);

    const timestamp = firebase.firestore.Timestamp.fromDate(new Date(ItemDate));

    const StockInfo = {
      company_id,
      name: curItemName,
      qty: ItemQty,
      desc: ItemDesc,
      purchase: purchase,
      invoice: ItemInvoice,
      truck: ItemTruck,
      date: timestamp,
    };

    try {
      const response = await ItemDataServices.updateItemQty(id, ItemQty);
      await CompanyTransactionDataServices.addTransaction(StockInfo);
      await CompanyDataServices.updateCompanyTotal(company_id, total);
      console.log(response);
      dispatch(fetchItems());
    } catch (err) {
      console.log("Error Occured", err.message);
    }
    setOpen(false);
  };

  const [ItemName, setItemName] = useState("");
  const [ItemQty, setItemQty] = useState("");
  const [ItemDesc, setItemDesc] = useState("");
  const [ItemInvoice, setItemInvoice] = useState("");
  const [ItemTruck, setItemTruck] = useState("");
  const [ItemDate, setItemDate] = useState("");

  let Items = useSelector((state) => state.ItemReducer.data);
  let Companies = useSelector((state) => state.CompanyReducer.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchCompanies());
  }, []);
  return (
    <CustomModal title={"Add Stock"} open={open} setOpen={setOpen}>
      <form className="flex flex-col justify-center items-center pt-[10px]">
        <SimpleSelectComp
          value={ItemName}
          setValue={setItemName}
          label={"Select Item"}
          data={Items}
        />
        <SimpleTextInput
          label="Enter Item Quantity"
          placeholder="Enter Item Quantity"
          type="number"
          id="itemqty"
          name="itemqty"
          value={ItemQty}
          setValue={setItemQty}
        />
        <SimpleTextInput
          label="Enter Item Description"
          placeholder="Enter Item Description"
          type="text"
          id="itemdesc"
          name="itemdesc"
          value={ItemDesc}
          setValue={setItemDesc}
        />
        <SimpleTextInput
          label="Enter Item Invoice No."
          placeholder="Enter Item Invoice No."
          type="text"
          id="iteminvoice"
          name="iteminvoice"
          value={ItemInvoice}
          setValue={setItemInvoice}
        />
        <SimpleTextInput
          label="Enter Item Truck No."
          placeholder="Enter Item Truck No."
          type="text"
          id="itemtruck"
          name="itemtruck"
          value={ItemTruck}
          setValue={setItemTruck}
        />
        <SimpleTextInput
          type="date"
          id="date"
          name="date"
          value={ItemDate}
          setValue={setItemDate}
        />
        <ModalBottomLine />
      </form>
      <div className="flex justify-center items-center">
        <ModalButton title={"Add Stock"} onClick={onSubmit} />
      </div>
    </CustomModal>
  );
};

export default AddStock;
