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
import AddingLoader from "../../Components/Loader/AddingLoader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReturnReport from "../ReturnReport";
import customerReturnServices from "../../Services/customerReturn.services";
import customerServices from "../../Services/customer.services";

const ItemReturn = () => {
  const [CurrentCustomer, setCurrentCustomer] = useState("");
  const [CurDate, setDate] = useState();
  const [Discount, setDiscount] = useState(0);
  const [Total, setTotal] = useState(0);
  const [Open, setOpen] = useState(false);
  const [BillDetail, setBillDetail] = useState([]);
  const [CurrentBillNo, setCurrentBillNo] = useState("");
  const [DriverName, setDriverName] = useState("");
  const [DriverContact, setDriverContact] = useState("");
  const [Expense, setExpense] = useState("");
  const [CurrentRemaining, setCurrentRemaining] = useState(0);
  const [Paid, setPaid] = useState("");
  const [CurrentName, setCurrentName] = useState("");
  const [CurrentAddress, setCurrentAddress] = useState("");
  const [CurrentContact, setCurrentContact] = useState("");

  let Items = useSelector((state) => state.ItemReducer.data);
  const Customers = useSelector((state) => state.CustomerReducer.data);
  const dispatch = useDispatch();
  const [ProccessLoading, setProccessLoading] = useState(false);

  const onSubmit = async (e) => {
    setProccessLoading(true);
    e.preventDefault();
    if (CurDate === undefined) {
      alert("Select CurDate Please");
    } else {
      // Add Data to bill item
      const timestamp = firebase.firestore.Timestamp.fromDate(
        new Date(CurDate)
      );
      const newBillDetail = BillDetail.map((bd) => {
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
        await customerReturnServices.addReturnLedger({
          date: timestamp,
          customer: CurrentName,
          bill: CurrentBillNo,
          total: Total,
          discount: Discount,
          expense: Expense,
          paid: Paid,
        });
        await customerServices.updateAccountsReturn(
          CurrentCustomer,
          Number(Total) - Number(Expense) - Number(Paid) - Number(Discount)
        );
        await BillNoDataServices.updateBillNo();
        alert("Return Successfully added...!");
        setBillDetail([]);
        setDiscount(0);
      } catch (err) {
        alert("Error Occured...");
      }
    }
    setProccessLoading(false);
  };

  const getTotal = () => {
    setTotal(
      BillDetail.map((item) => Number(item.amount)).reduce(
        (sum, i) => sum + i,
        0
      )
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

  useEffect(() => {
    const SetCurrentAdvance = () => {
      Customers.filter((cust) => {
        if (cust._id === CurrentCustomer) {
          setCurrentRemaining(cust.remaining);
          setCurrentName(cust.name);
          setCurrentAddress(cust.address);
          setCurrentContact(cust.contact);
        }
      });
    };
    if (CurrentCustomer != "") SetCurrentAdvance();
  }, [CurrentCustomer]);
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
                  <div className="flex flex-col justify-center items-center pl-[20px]">
                    {ProccessLoading ? (
                      <AddingLoader />
                    ) : (
                      <button
                        className="bg-white text-[#032248] px-[10px] py-[8px] font-bold font-[raleway] text-[1.2rem] border-[2px] border-white hover:rounded-[8px] hover:bg-[#032248] hover:text-white transition-all duration-700"
                        onClick={onSubmit}
                      >
                        Add Bill
                      </button>
                    )}

                    <PDFDownloadLink
                      document={
                        <ReturnReport
                          Data={BillDetail}
                          cTotal={Total.toFixed(2)}
                          cDiscount={Discount}
                          DriverName={DriverName}
                          DriverContact={DriverContact}
                          cExpense={Expense}
                          cArears={CurrentRemaining}
                          cPaid={Paid}
                          bBillNo={CurrentBillNo}
                          bDate={CurDate}
                          cName={CurrentName}
                          cAddress={CurrentAddress}
                          cContact={CurrentContact}
                        />
                      }
                      fileName={`${CurrentBillNo}`}
                    >
                      <button className="bg-white text-[#032248] px-[20px] mobbtn:px-[14px] py-[10px] font-bold font-[raleway] text-[1.2rem] border-[2px] border-white hover:rounded-[8px] hover:bg-[#032248] hover:text-white transition-all duration-700 select-none my-[5px]">
                        Print
                      </button>
                    </PDFDownloadLink>
                  </div>
                  {/* Right */}
                  <div className="flex flex-col p-[10px] pt-[15px]">
                    {/* CurDate */}
                    <div className="flex w-[230px] text-[1.2rem] font-[raleway] font-bold justify-end py-[2px]">
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={CurDate}
                        onChange={(e) => setDate(e.target.value)}
                        className="text-[#032248] font-[raleway] font-bold text-[1.2rem] pl-[2px] py-[5px] w-[230px]"
                      />
                    </div>
                    {/* Driver Name */}
                    <div className="flex w-[230px] text-[1.2rem] font-[raleway] font-bold justify-end py-[2px]">
                      <input
                        type="text"
                        name="driver-name"
                        id="driver-name"
                        placeholder="Driver Name"
                        value={DriverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        className="text-[#032248] font-[raleway] pl-[2px] py-[5px] text-[1.1rem] w-[230px]"
                      />
                    </div>
                    {/* Driver Contact */}
                    <div className="flex w-[230px] text-[1.2rem] font-[raleway] font-bold justify-end py-[2px]">
                      <input
                        type="number"
                        name="driver-contact"
                        id="driver-contact"
                        placeholder="Driver Contact"
                        value={DriverContact}
                        onChange={(e) => setDriverContact(e.target.value)}
                        className="text-[#032248] font-[raleway] pl-[2px] py-[5px] text-[1.1rem] w-[230px]"
                      />
                    </div>
                    {/* Expense */}
                    <div className="flex w-[230px] text-[1rem] font-[raleway] font-bold justify-end py-[2px]">
                      <input
                        type="number"
                        name="expense"
                        id="expense"
                        placeholder="Expense"
                        value={Expense}
                        onChange={(e) => setExpense(e.target.value)}
                        className="pl-[4px] py-[5px] text-[#032248] font-[raleway] font-bold text-[1.1rem] w-[100%]"
                      />
                    </div>
                    {/* Cash Recieved By Customer */}
                    <div className="flex w-[230px] text-[1.1rem] font-[raleway] font-bold justify-end py-[2px]">
                      <input
                        type="number"
                        name="paid"
                        id="paid"
                        placeholder="Paid"
                        value={Paid}
                        onChange={(e) => setPaid(e.target.value)}
                        className="pl-[4px] py-[5px] text-[#032248] font-[raleway] font-bold text-[1.1rem] w-[100%]"
                      />
                    </div>
                    {/* Discount */}
                    <div className="flex w-[230px] text-[1.2rem] font-[raleway] font-bold pt-[2px]">
                      <div className="w-[118px] pr-[5px] text-right">
                        Discount:
                      </div>
                      <input
                        type="number"
                        name="discount"
                        id="discount"
                        value={Discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="text-[#032248] font-[raleway] font-bold text-[1.2rem] w-[112px]"
                      />
                    </div>
                    {/* Current */}
                    <div className="flex w-[230px] text-[1.2rem] font-[raleway] font-bold">
                      <div className="w-[118px] pr-[5px] text-right">
                        Total:
                      </div>
                      <div className="w-[112px]">{Total}/-</div>
                    </div>
                    {/* Grand Total */}
                    <div className="flex w-[230px] text-[1.2rem] font-[raleway] font-bold">
                      <div className="w-[118px] pr-[5px] text-right">
                        Grand Total:
                      </div>
                      <div className="w-[112px]">
                        {Number(Expense) +
                          Number(CurrentRemaining) -
                          Number(Discount) -
                          Number(Paid) -
                          Number(Total)}
                        /-
                      </div>
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
