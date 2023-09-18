import React, { useState } from "react";
import { NavComp } from "./NavComp";
import AdminNavButton from "./AdminNavButton";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCustomer from "../Modals/AddCustomer";
import InfoIcon from "@mui/icons-material/Info";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ReceiptIcon from "@mui/icons-material/Receipt";

const CustomerNav = () => {
  const [Open, setOpen] = useState(false);
  return (
    <NavComp
      isAct={false}
      className={false ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <div className="NavWrapper">
        {/* <AdminNavButton
          title={"Customer Info"}
          type={"link"}
          BIcon={DomainAddIcon}
          width={"170px"}
          setOpen={setOpen}
        /> */}
        <AdminNavButton
          title={"Add Customer"}
          type={"modal"}
          BIcon={PersonAddIcon}
          width={"165px"}
          setOpen={setOpen}
        />
        <AdminNavButton
          title={"Customer Info"}
          type={"link"}
          link={"/customer_info"}
          BIcon={InfoIcon}
          width={"170px"}
        />
        <AdminNavButton
          title={"Customer Kata"}
          type={"link"}
          link={"/customer_kata"}
          BIcon={MenuBookIcon}
          width={"170px"}
        />
        <AdminNavButton
          title={"Add New Bill"}
          type={"link"}
          link={"/add_new_bill"}
          BIcon={ShoppingCartCheckoutIcon}
          width={"170px"}
        />
        <AdminNavButton
          title={"Item Return"}
          type={"link"}
          link={"/customer_return"}
          BIcon={AssignmentReturnedIcon}
          width={"170px"}
        />
        <AdminNavButton
          title={"Customer Ledger"}
          type={"link"}
          link={"/customer_ledger"}
          BIcon={RequestQuoteIcon}
          width={"170px"}
        />
        <AdminNavButton
          title={"Advance Ledger"}
          type={"link"}
          link={"/advance_ledger"}
          BIcon={AccountBalanceWalletIcon}
          width={"170px"}
        />
        <AdminNavButton
          title={"Arears Ledger"}
          type={"link"}
          link={"/arears_ledger"}
          BIcon={CompareArrowsIcon}
          width={"170px"}
        />
        <AdminNavButton
          title={"Invoice Search"}
          type={"link"}
          link={"/customer_invoice_search"}
          BIcon={ReceiptIcon}
          width={"170px"}
        />
      </div>
      {Open ? <AddCustomer setOpen={setOpen} open={Open} /> : <></>}
    </NavComp>
  );
};

export default CustomerNav;
