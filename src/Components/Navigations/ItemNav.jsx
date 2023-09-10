import React, { useState } from "react";
import { NavComp } from "./NavComp";
import AdminNavButton from "./AdminNavButton";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AddItem from "../Modals/AddItem";
import AddStock from "../Modals/AddStock";
const ItemNav = () => {
  const [AddItemModal, setAddItemModal] = useState(false);
  const [AddStockModal, setAddStockModal] = useState(false);
  return (
    <NavComp
      isAct={false}
      className={false ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <div className="NavWrapper">
        <AdminNavButton
          title={"Item Info"}
          type={"link"}
          BIcon={LeaderboardIcon}
          width={"165px"}
          link={"/items"}
        />
        <AdminNavButton
          title={"Add Item"}
          type={"modal"}
          BIcon={NoteAddIcon}
          width={"165px"}
          setOpen={setAddItemModal}
        />
        <AdminNavButton
          title={"Add Stock"}
          type={"modal"}
          BIcon={BookmarkAddIcon}
          width={"165px"}
          setOpen={setAddStockModal}
        />
        <AdminNavButton
          title={"Stock Statistics"}
          type={"link"}
          BIcon={LeaderboardIcon}
          width={"165px"}
          link={"/stock-statistics"}
        />
      </div>

      {/* Modals */}
      {AddItemModal ? (
        <AddItem open={AddItemModal} setOpen={setAddItemModal} />
      ) : AddStockModal ? (
        <AddStock open={AddStockModal} setOpen={setAddStockModal} />
      ) : (
        <></>
      )}
    </NavComp>
  );
};

export default ItemNav;
