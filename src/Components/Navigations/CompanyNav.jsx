import React, { useState } from "react";
import { NavComp } from "./NavComp";
import AdminNavButton from "./AdminNavButton";
import InfoIcon from "@mui/icons-material/Info";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import AddCompany from "../Modals/AddCompany";

const CompanyNav = () => {
  const [Open, setOpen] = useState(false);
  return (
    <NavComp
      isAct={false}
      className={false ? "isActiveStyling" : "isNotActiveStyling"}
    >
      <div className="NavWrapper">
        <AdminNavButton
          title={"Add Company"}
          type={"modal"}
          BIcon={DomainAddIcon}
          width={"165px"}
          setOpen={setOpen}
        />
        <AdminNavButton
          title={"Companies Kata"}
          type={"link"}
          link={"/companies_kata"}
          BIcon={MenuBookIcon}
          width={"165px"}
        />
        <AdminNavButton
          title={"Companies Info"}
          type={"link"}
          link={"/companies_info"}
          BIcon={InfoIcon}
          width={"165px"}
        />
        <AdminNavButton
          title={"Ledger"}
          type={"link"}
          link={"/company_ledger"}
          BIcon={RequestQuoteIcon}
          width={"165px"}
        />
      </div>
      {Open ? <AddCompany setOpen={setOpen} open={Open} /> : <></>}
    </NavComp>
  );
};

export default CompanyNav;
