import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import SimpleSelectComp from "../Select/SimpleSelectComp";
import SimpleTextInput from "../Input/SimpleTextInput";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import SimpleSelectCompByName from "../Select/SimpleSelectCompByName";
import { fetchItems } from "../../store/Slices/ItemSlice";
import { useDispatch, useSelector } from "react-redux";

const AddNewBillItem = ({ open, setOpen, setBillDetail, BillDetail }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const curData = {
      name: ItemName,
      qty: ItemQty,
      price: ItemPrice,
      amount: Amount,
    };
    setBillDetail([...BillDetail, curData]);
    setOpen(false);
  };

  const [ItemName, setItemName] = useState("");
  const [ItemQty, setItemQty] = useState("");
  const [ItemPrice, setItemPrice] = useState("");
  const [Amount, setAmount] = useState(0);
  let Items = useSelector((state) => state.ItemReducer.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const CalculateBill = () => {
    setAmount(Number(ItemPrice) * Number(ItemQty));
  };

  const SetPrice = () => {
    Items.map((it) => {
      if (it.name === ItemName) {
        setItemPrice(it.sale);
      }
    });
  };

  useEffect(() => {
    CalculateBill();
  }, [ItemQty, ItemPrice]);

  useEffect(() => {
    SetPrice();
  }, [ItemName]);

  return (
    <CustomModal title={"Add New Item"} open={open} setOpen={setOpen}>
      <form className="flex flex-col justify-center items-center pt-[10px]">
        <SimpleSelectCompByName
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
          label="Enter Item Price"
          placeholder="Enter Item Price"
          type="number"
          id="itemprice"
          name="itemprice"
          value={ItemPrice}
          setValue={setItemPrice}
        />
        <SimpleTextInput
          label="Total Amount"
          placeholder="Enter Item Total"
          type="number"
          id="amount"
          name="amount"
          value={Amount}
          setValue={setAmount}
        />
        <ModalBottomLine />
      </form>
      <div className="flex justify-center items-center">
        <ModalButton title={"add new item"} onClick={onSubmit} />
      </div>
    </CustomModal>
  );
};

export default AddNewBillItem;
