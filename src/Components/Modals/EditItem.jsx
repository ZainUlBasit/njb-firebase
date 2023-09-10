import React, { useEffect } from "react";
import CustomModal from "./CustomModal";
import SimpleTextInput from "../Input/SimpleTextInput";
import { useState } from "react";
import SimpleSelectComp from "../Select/SimpleSelectComp";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import { fetchCompanies } from "../../store/Slices/CompanySlice";
import { useDispatch, useSelector } from "react-redux";
import { AddNewItem, DeleteItem, UpdateItem } from "../../Https";
import { fetchItems } from "../../store/Slices/ItemSlice";
import ModalUpdateButton from "../Buttons/ModalUpdateButton";
import ModalDeleteButton from "../Buttons/ModalDeleteButton";
import ItemDataServices from "../../Services/item.services";
import SimpleSelectCompByName from "../Select/SimpleSelectCompByName";
import AddingLoader from "../Loader/AddingLoader";

const EditItem = ({ open, setOpen, SelItem }) => {
  // Functions
  const setData = () => {
    SelItem.map((item) => {
      setItemID(item.id);
      setItemName(item.name);
      setItemCompany(item.company);
      setItemDesc(item.desc);
      setItemPurchase(item.purchase);
      setItemPurchasee(item.purchasee);
      setItemSale(item.sale);
    });
  };

  // Methods
  const onUpdate = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    const ItemInfo = {
      name: ItemName,
      company: ItemCompany,
      desc: ItemDesc,
      purchase: ItemPurchase,
      purchasee: ItemPurchasee,
      sale: ItemSale,
    };
    try {
      await ItemDataServices.updateItem(ItemID, ItemInfo);
      dispatch(fetchItems());
      alert("Item Successfully Updated...");
      setOpen(false);
    } catch (err) {
      console.log("Error Occured:", err.message);
    }
    setProccessLoading(false);
  };

  const onDelete = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    try {
      await ItemDataServices.deleteItem(ItemID);
      alert("Item successfully deleted...");
      dispatch(fetchItems());
      setOpen(false);
    } catch (err) {
      console.log("Error Occured:", err.message);
      setOpen(false);
    }
    setProccessLoading(false);
  };

  // redux toolkit
  let Companies = useSelector((state) => state.CompanyReducer.data);
  const dispatch = useDispatch();
  // Use Effects
  useEffect(() => {
    dispatch(fetchCompanies());
    setData();
  }, []);
  // States
  const [ItemID, setItemID] = useState("");
  const [ItemName, setItemName] = useState("");
  const [ItemCompany, setItemCompany] = useState("");
  const [ItemDesc, setItemDesc] = useState("");
  const [ItemPurchase, setItemPurchase] = useState("");
  const [ItemPurchasee, setItemPurchasee] = useState("");
  const [ItemSale, setItemSale] = useState("");
  const [ProccessLoading, setProccessLoading] = useState(false);
  return (
    <CustomModal title={"Edit Item"} open={open} setOpen={setOpen}>
      <form className="flex flex-col justify-center items-center pt-[10px]">
        <SimpleTextInput
          label="Enter Item Name"
          placeholder="Enter Item Name"
          type="text"
          id="itemname"
          name="itemname"
          value={ItemName}
          setValue={setItemName}
        />
        <SimpleSelectCompByName
          value={ItemCompany}
          setValue={setItemCompany}
          label={"Select Company"}
          data={Companies}
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
          label="Enter Item Purchase"
          placeholder="Enter Item Purchase"
          type="number"
          id="itempurchase"
          name="itempurchase"
          value={ItemPurchase}
          setValue={setItemPurchase}
        />
        <SimpleTextInput
          label="Enter Item Purchase Exp"
          placeholder="Enter Item Purchase Exp"
          type="number"
          id="itempurchasee"
          name="itempurchasee"
          value={ItemPurchasee}
          setValue={setItemPurchasee}
        />
        <SimpleTextInput
          label="Enter Item Sale"
          placeholder="Enter Item Sale"
          type="number"
          id="itemsale"
          name="itemsale"
          value={ItemSale}
          setValue={setItemSale}
        />
        <ModalBottomLine />
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
};

export default EditItem;
