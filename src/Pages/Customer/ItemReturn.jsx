import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CustomerNav from "../../Components/Navigations/CustomerNav";
import SimpleSelectComp from "../../Components/Select/SimpleSelectComp";
import BillTable from "../../Components/Tables/BillTable";
import AddNewBillItem from "../../Components/Modals/AddNewBillItem";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCustomerReturn,
  AddCustomerTransaction,
  GetCurrentBill,
  UpdateCurrentBill,
  UpdateCustomerTotal,
} from "../../Https";
import { fetchItems } from "../../store/Slices/ItemSlice";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import CustomerReturnDataServices from "../../Services/customerReturn.services";
import BillNoDataServices from "../../Services/billno.services";

const ItemReturn = () => {
  const [CurrentCustomer, setCurrentCustomer] = useState("");
  const [CurDate, setDate] = useState();
  const [Discount, setDiscount] = useState(0);
  const [Total, setTotal] = useState(0);
  const [Open, setOpen] = useState(false);
  const [BillDetail, setBillDetail] = useState([]);
  const [CurrentBillNo, setCurrentBillNo] = useState("");

  let Items = useSelector((state) => state.ItemReducer.data);
  const Customers = useSelector((state) => state.CustomerReducer.data);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (CurDate === undefined) {
      alert("Select CurDate Please");
    } else {
      // Add Data to bill item
      const newBillDetail = BillDetail.map((bd) => {
        const timestamp = firebase.firestore.Timestamp.fromDate(
          new Date(CurDate)
        );
        return {
          ...bd,
          customerid: CurrentCustomer,
          date: timestamp,
          bill: CurrentBillNo,
        };
      });
      try {
        newBillDetail.map(async (nb) => {
          const curItem = Items.filter((it) => it.name === nb.name);
          const purchase = curItem[0].purchase;
          const desc = curItem[0].desc;
          await CustomerReturnDataServices.addReturn({
            ...nb,
            purchase: purchase,
            desc: desc,
          });
        });
        await BillNoDataServices.updateBillNo();
        alert("Return Successfully added...!");
        setBillDetail([]);
        setDiscount(0);
      } catch (err) {
        alert("Error Occured...");
      }
    }
  };

  const getTotal = () => {
    setTotal(
      BillDetail.map((item) => item.amount).reduce((sum, i) => sum + i, 0)
    );
  };

  useEffect(() => {
    getTotal();
  }, [BillDetail]);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchItems());
    const SetBillNoFunc = async () => {
      let data = await BillNoDataServices.getBillNumber();
      data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      data = data[0];
      data = data.billnumber;
      setCurrentBillNo(data);
    };
    SetBillNoFunc();
  }, [BillDetail]);
  return (
    <>
      <Navbar />
      <CustomerNav />
      <div className="w-full flex justify-center mb-[20px]">
        {/* Inner Wrapper */}
        <div className="bg-[#032248] w-[90%] text-white rounded-t-[10px]">
          {/* Customer Detail */}
          <div className="w-full">
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
          {/* Bill Detail */}
          {CurrentCustomer !== "" ? (
            <div className="py-[10px]">
              <div className="flex justify-between items-center px-[10px] border-b-[2px] border-b-white pb-[10px] pt-[5px]">
                <div className="font-bold font-[raleway] text-[1.5rem]">
                  Bill Detail
                </div>
                <div>
                  <button
                    className="bg-white text-[#032248] rounded-[999px] h-[40px] w-[40px] font-bold font-[raleway] text-[2.5rem] hover:bg-[#032248] hover:text-white border-[2px] border-white flex justify-center items-center transition-all duration-700"
                    onClick={() => setOpen(true)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <BillTable rows={BillDetail} />
                {/* Main Block */}
                <div className="flex justify-between items-center">
                  {/* left */}
                  <div className="flex justify-center items-center pl-[20px]">
                    <button
                      className="bg-white text-[#032248] px-[10px] py-[8px] font-bold font-[raleway] text-[1.2rem] border-[2px] border-white hover:rounded-[8px] hover:bg-[#032248] hover:text-white transition-all duration-700"
                      onClick={onSubmit}
                    >
                      Add Bill
                    </button>
                  </div>
                  {/* Right */}
                  <div className="flex flex-col p-[10px] pt-[15px]">
                    {/* CurDate */}
                    <div className="flex w-[200px] text-[1.2rem] font-[raleway] font-bold justify-end">
                      {/* <div className="w-[118px] pr-[5px] text-right">Total:</div> */}
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={CurDate}
                        onChange={(e) => setDate(e.target.value)}
                        className="text-[#032248] font-[raleway] font-bold text-[1.2rem] w-[180px]"
                      />
                    </div>
                    {/* Current */}
                    <div className="flex w-[200px] text-[1.2rem] font-[raleway] font-bold">
                      <div className="w-[118px] pr-[5px] text-right">
                        Total:
                      </div>
                      <div className="w-[80px]">{Total}/-</div>
                    </div>
                    {/* Discount */}
                    <div className="flex w-[200px] text-[1.2rem] font-[raleway] font-bold">
                      <div className="w-[118px] pr-[5px] text-right">
                        Discount:
                      </div>
                      <input
                        type="number"
                        name="discount"
                        id="discount"
                        value={Discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="text-[#032248] font-[raleway] font-bold text-[1.2rem] w-[80px]"
                      />
                    </div>
                    {/* Grand Total */}
                    <div className="flex w-[200px] text-[1.2rem] font-[raleway] font-bold">
                      <div className="w-[118px] pr-[5px] text-right">
                        Grand Total:
                      </div>
                      <div className="w-[80px]">{Total - Discount}/-</div>
                    </div>
                  </div>
                </div>
              </div>
              {Open ? (
                <AddNewBillItem
                  open={Open}
                  setOpen={setOpen}
                  BillDetail={BillDetail}
                  setBillDetail={setBillDetail}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemReturn;
