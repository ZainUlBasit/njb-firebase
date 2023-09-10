import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CustomerNav from "../../Components/Navigations/CustomerNav";
import CustomerDataServices from "../../Services/customer.services";
import TableComp from "../../Components/Tables/TableComponent";
import { AdvanceColumns } from "../../assets/Columns/AdvanceColumns";
import SimpleSelectComp from "../../Components/Select/SimpleSelectComp";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";

const ArearsLedger = () => {
  const [ArearsData, setArearsData] = useState([]);
  const [CurrentCustomer, setCurrentCustomer] = useState("");

  const [Open, setOpen] = useState(false);
  const [selID, setSelID] = useState("");
  const Customers = useSelector((state) => state.CustomerReducer.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const FetchData = async () => {
      let response = await CustomerDataServices.getArearsLedger();
      response = response.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      setArearsData(response);
    };
    FetchData();
    dispatch(fetchCustomers());
  }, []);
  return (
    <>
      <Navbar />
      <CustomerNav />
      <div className="w-full flex justify-center mb-[0px]">
        {/* Inner Wrapper */}
        <div className="bg-[#032248] w-[100%] mx-[20px] text-white rounded-t-[10px] rounded-b-[10px] overflow-hidden">
          {/* Customer Detail */}
          <div className="w-full select-none">
            <div className="w-full text-center py-[15px] font-[raleway] font-bold uppercase text-[1.8rem]">
              Customer Detail
            </div>
            <div className="w-full bg-white h-[2px]"></div>
            <div className="w-[100%] flex flex-wrap flex-row justify-center items-center bg-white border-x-[#032248] border-[2px] pt-[20px]">
              <div className="w-[90%] min-w-[300px] flex justify-center">
                <SimpleSelectComp
                  value={CurrentCustomer}
                  setValue={setCurrentCustomer}
                  label={"Select Customer"}
                  data={Customers}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {CurrentCustomer ? (
        <TableComp
          title="Advance Ledger"
          rows={ArearsData.filter((ad) => ad.customerid === CurrentCustomer)}
          columns={AdvanceColumns}
          setEditCompanyModal={setOpen}
          setSelID={setSelID}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ArearsLedger;
