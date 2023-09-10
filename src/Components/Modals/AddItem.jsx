import React, { useEffect } from "react";
import CustomModal from "./CustomModal";
import SimpleTextInput from "../Input/SimpleTextInput";
import { useState } from "react";
import SimpleSelectComp from "../Select/SimpleSelectComp";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import { fetchCompanies } from "../../store/Slices/CompanySlice";
import { useDispatch, useSelector } from "react-redux";
import { AddNewItem } from "../../Https";
import { fetchItems } from "../../store/Slices/ItemSlice";
import ItemDataServices from "../../Services/item.services";
import AddingLoader from "../Loader/AddingLoader";

const AddItem = ({ open, setOpen }) => {
  const [ProccessLoading, setProccessLoading] = useState(false);
  // Functions
  const onSubmit = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    let curCompany = "";
    Companies.filter((co) => {
      if (co._id === ItemCompany) {
        curCompany = co.name;
      }
    });
    const ItemInfo = {
      name: ItemName,
      company: curCompany,
      desc: ItemDesc,
      purchase: ItemPurchase,
      purchasee: ItemPurchasee,
      sale: ItemSale,
      qty: 0,
    };
    if (
      (ItemName !== "") &
      (curCompany !== "") &
      (ItemDesc !== "") &
      (ItemPurchase !== "") &
      (ItemSale !== "")
    ) {
      await ItemDataServices.addItem(ItemInfo);
      setOpen(false);
      dispatch(fetchItems());
      alert("Item Successfully Added...");
    } else {
      alert("Please fill all fields");
    }
    setProccessLoading(false);
  };
  // States
  const [ItemName, setItemName] = useState("");
  const [ItemCompany, setItemCompany] = useState("");
  const [ItemDesc, setItemDesc] = useState("");
  const [ItemPurchase, setItemPurchase] = useState("");
  const [ItemPurchasee, setItemPurchasee] = useState("");
  const [ItemSale, setItemSale] = useState("");

  // redux toolkit
  let Companies = useSelector((state) => state.CompanyReducer.data);
  const dispatch = useDispatch();
  // Use Effects
  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);

  return (
    <CustomModal title={"Add New Item"} open={open} setOpen={setOpen}>
      <form
        className="flex flex-col justify-center items-center pt-[10px]"
        onSubmit={onSubmit}
      >
        <SimpleTextInput
          label="Enter Item Name"
          placeholder="Enter Item Name"
          type="text"
          id="itemname"
          name="itemname"
          value={ItemName}
          setValue={setItemName}
        />
        <SimpleSelectComp
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
        {ProccessLoading ? (
          <AddingLoader />
        ) : (
          <ModalButton title={"Add Item"} />
        )}
      </form>
    </CustomModal>
  );
};

export default AddItem;
