import React, { useState } from "react";
import { NavComp } from "./NavComp";
import AdminNavButton from "./AdminNavButton";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import AddCustomerAdvance from "../Modals/AddCustomerAdvance";
import AddArears from "../Modals/AddArears";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PaymentsIcon from '@mui/icons-material/Payments';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const CashPaymentNav = () => {
  const [open, setOpen] = useState(false);
  const [ArearsOpen, setArearsOpen] = useState(false);
  return (
    <NavComp
      isAct={false}
      className={false ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <div className="NavWrapper">
        <AdminNavButton
          title={"Company Payment"}
          type={"link"}
          BIcon={BusinessIcon}
          width={"180px"}
          link={"/company-payment"}
        />
        <AdminNavButton
          title={"Customer Payment"}
          type={"link"}
          BIcon={PersonIcon}
          width={"180px"}
          link={"/customer-payment"}
        />
        <AdminNavButton
          title={"Add Payment"}
          type={"link"}
          BIcon={PointOfSaleIcon}
          width={"180px"}
          link={"/add-payment"}
        />
        <AdminNavButton
          title={"Add Advance"}
          type={"modal"}
          BIcon={PaymentsIcon}
          width={"180px"}
          setOpen={setOpen}
        />
        <AdminNavButton
          title={"Add Arears"}
          type={"modal"}
          BIcon={CompareArrowsIcon}
          width={"180px"}
          setOpen={setArearsOpen}
        />
      </div>
      {open ? (
        <AddCustomerAdvance open={open} setOpen={setOpen} />
      ) : ArearsOpen ? (
        <AddArears open={ArearsOpen} setOpen={setArearsOpen} />
      ) : (
        <></>
      )}
    </NavComp>
  );
};

export default CashPaymentNav;
