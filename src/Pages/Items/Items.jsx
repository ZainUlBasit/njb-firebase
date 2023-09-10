import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import ItemNav from "../../Components/Navigations/ItemNav";
import TableComp from "../../Components/Tables/TableComponent";
import { ItemInfoColumns } from "../../assets/Columns/ItemInfoColumns";
import AddItem from "../../Components/Modals/AddItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../store/Slices/ItemSlice";
import moment from "moment/moment";
import EditItem from "../../Components/Modals/EditItem";
import DataLoader from "../../Components/Loader/DataLoader";

const Items = () => {
  // Redux Toolkit
  let Items = useSelector((state) => state.ItemReducer.data);
  let Loading = useSelector((state) => state.ItemReducer.loading);
  const dispatch = useDispatch();

  const [selID, setSelID] = useState(-1);
  const [EditItemModal, setEditItemModal] = useState(false);

  useEffect(() => {
    dispatch(fetchItems());
  }, []);
  return (
    <>
      <Navbar />
      <ItemNav />
      {Loading ? (
        <DataLoader />
      ) : (
        <TableComp
          setSelID={setSelID}
          setEditItemModal={setEditItemModal}
          title="ITEM INFO"
          rows={Items.map((it) => {
            return {
              ...it,
              addeddate: moment(it.addeddate).format("DD/MM/YYYY"),
            };
          })}
          columns={ItemInfoColumns}
        />
      )}
      {EditItemModal ? (
        <EditItem
          open={EditItemModal}
          setOpen={setEditItemModal}
          SelItem={Items.filter((val) => selID === val._id).map((v, i) => {
            return {
              id: v._id,
              name: v.name,
              company: v.company,
              desc: v.desc,
              purchase: v.purchase,
              purchasee: v.purchasee,
              sale: v.sale,
            };
          })}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Items;
