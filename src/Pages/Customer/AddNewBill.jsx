import React, { useEffect, useState } from "react";
import SimpleTextInput from "../../Components/Input/SimpleTextInput";
import BillTable from "../../Components/Tables/BillTable";
import AddNewBillItem from "../../Components/Modals/AddNewBillItem";
import Navbar from "../../Components/NavBar/NavBar";
import CustomerNav from "../../Components/Navigations/CustomerNav";
import SimpleSelectComp from "../../Components/Select/SimpleSelectComp";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import {
  AddCustomerTransaction,
  GetCurrentBill,
  UpdateCurrentBill,
  UpdateCustomerTotal,
} from "../../Https";
import { fetchItems } from "../../store/Slices/ItemSlice";

import easyinvoice from "easyinvoice";
import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Testing from "../Testing";
import BillNoDataServices from "../../Services/billno.services";
import CustomerTransactionDataServices from "../../Services/customerTransaction.services";
import CustomerDataServices from "../../Services/customer.services";
import ChargesDataServices from "../../Services/charges.services";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import AddingLoader from "../../Components/Loader/AddingLoader";
import customerServices from "../../Services/customer.services";

const AddNewBill = () => {
  const [CurrentCustomer, setCurrentCustomer] = useState("");
  const [CurDate, setDate] = useState();
  const [Discount, setDiscount] = useState(0);
  const [Total, setTotal] = useState(0);
  const [Open, setOpen] = useState(false);
  const [BillDetail, setBillDetail] = useState([]);
  const [CurrentAdvance, setCurrentAdvance] = useState(0);
  const [CurrentRemaining, setCurrentRemaining] = useState(0);
  const [LoadingCharges, setLoadingCharges] = useState(0);
  const [DeliveryCharges, setDeliveryCharges] = useState(0);
  const [Paid, setPaid] = useState(0);
  const [Advance, setAdvance] = useState(0);
  const [TotalExpense, setTotalExpense] = useState(0);
  const [CurrentBillNo, setCurrentBillNo] = useState("");
  const [CurrentName, setCurrentName] = useState("");
  const [CurrentAddress, setCurrentAddress] = useState("");
  const [CurrentContact, setCurrentContact] = useState("");
  const [ProcessLoading, setProcessLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [DriverName, setDriverName] = useState("");
  const [DriverContact, setDriverContact] = useState("");
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const [BillPrinted, setBillPrinted] = useState(false);

  let Items = useSelector((state) => state.ItemReducer.data);
  const Customers = useSelector((state) => state.CustomerReducer.data);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    setProcessLoading(true);
    e.preventDefault();
    if (CurDate === undefined) {
      alert("Select CurDate Please");
    } else if (BillPrinted === false) {
      alert("Please Print Bill First");
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
          const purchase = curItem[0].purchasee;
          const desc = curItem[0].desc;
          await CustomerTransactionDataServices.addTransaction({
            ...nb,
            purchase: purchase,
            desc: desc,
          });
        });
        // To update account of customer
        const GrandTotal =
          Number(Total) +
          Number(LoadingCharges) +
          Number(DeliveryCharges) +
          Number(TotalExpense);
        const RemainingTotal = GrandTotal - Paid;
        const TotalDiscount = Discount;
        const AdvanceTotal = Number(Advance) * -1;
        const PaidTotal = Paid;
        await CustomerDataServices.updateCustomerTotal(
          CurrentCustomer,
          Number(GrandTotal),
          Number(RemainingTotal),
          Number(TotalDiscount),
          Number(AdvanceTotal),
          Number(PaidTotal)
        );
        await ChargesDataServices.addCharges({
          id: CurrentBillNo,
          cloading: LoadingCharges,
          cdelivery: DeliveryCharges,
          cdiscount: Discount,
          cpaid: Paid,
          cexpense: TotalExpense,
          total: Total,
          advance: Advance,
          drivername: DriverName,
          drivercontact: DriverContact,
          date: timestamp,
        });
        await customerServices.addSaleInfo(
          CurrentName,
          CurrentBillNo,
          GrandTotal,
          Paid,
          timestamp
        );
        if (Number(Advance) !== 0)
          await CustomerDataServices.addAdvanceLedger({
            customerid: CurrentCustomer,
            advance: Advance,
            desc: `Bill Paid ${Advance}`,
          });
        // to update bill number
        await BillNoDataServices.updateBillNo();
        alert("Bill Successfully added...!");
        setBillPrinted(false);
        setBillDetail([]);
        setDiscount(0);
      } catch (err) {
        alert("Error Occured...");
      }
    }
    setProcessLoading(false);
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
    Customers.map((cus) => {
      if (cus._id === CurrentCustomer) {
        setCurrentName(cus.name);
        setCurrentAddress(cus.address);
        setCurrentContact(cus.contact);
      }
    });
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
      let cCustomer = Customers.filter((cust) => cust._id === CurrentCustomer);
      cCustomer = cCustomer[0];
      setCurrentAdvance(cCustomer.advance);
      setCurrentRemaining(cCustomer.remaining);
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
          {/* Bill Detail */}
          {CurrentCustomer !== "" ? (
            <>
              <div className="w-full flex justify-center items-center border-b-[2px] border-b-white">
                <div className="py-[20px] font-[raleway] font-bold text-[1.3rem] select-none">
                  Advance Balance: {CurrentAdvance}
                </div>
              </div>
              <div className="py-[10px]">
                <div className="flex justify-between items-center px-[10px] border-b-[2px] border-b-white pb-[10px] pt-[5px]">
                  <div className="font-bold font-[raleway] text-[1.5rem] select-none">
                    Bill Detail
                  </div>
                  <div>
                    <button
                      className="bg-white text-[#032248] rounded-[999px] h-[40px] w-[40px] font-bold font-[raleway] text-[2.5rem] hover:bg-[#032248] hover:text-white border-[2px] border-white flex justify-center items-center transition-all duration-700 select-none"
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
                      {ProcessLoading ? (
                        <AddingLoader />
                      ) : (
                        <button
                          className="bg-white text-[#032248] px-[20px] mobbtn:px-[14px] py-[10px] font-bold font-[raleway] text-[1.2rem] border-[2px] border-white hover:rounded-[8px] hover:bg-[#032248] hover:text-white transition-all duration-700 select-none my-[5px]"
                          onClick={onSubmit}
                        >
                          Add Bill
                        </button>
                      )}
                      <PDFDownloadLink
                        document={
                          <Testing
                            Data={BillDetail}
                            cTotal={Total.toFixed(2)}
                            cLoading={LoadingCharges}
                            cDelivery={DeliveryCharges}
                            cDiscount={Discount}
                            cAdvance={Advance}
                            DriverName={DriverName}
                            DriverContact={DriverContact}
                            cGrand={(
                              Number(Total) -
                              Number(Discount) +
                              Number(LoadingCharges) +
                              Number(DeliveryCharges)
                            ).toFixed(2)}
                            cExpense={TotalExpense}
                            cArears={CurrentRemaining}
                            cPaid={Paid}
                            bBillNo={CurrentBillNo}
                            bDate={CurDate}
                            cName={CurrentName}
                            cAddress={CurrentAddress}
                            cContact={CurrentContact}
                            showArears={isChecked}
                          />
                        }
                        fileName={`${CurrentBillNo}`}
                      >
                        <button
                          className="bg-white text-[#032248] px-[20px] mobbtn:px-[14px] py-[10px] font-bold font-[raleway] text-[1.2rem] border-[2px] border-white hover:rounded-[8px] hover:bg-[#032248] hover:text-white transition-all duration-700 select-none my-[5px]"
                          onClick={() => setBillPrinted(true)}
                        >
                          Print
                        </button>
                      </PDFDownloadLink>
                    </div>
                    {/* Right */}
                    <div className="flex flex-col p-[10px] pt-[15px]">
                      {/* Driver Name */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none justify-end">
                        <input
                          type="text"
                          name="driver-name"
                          id="driver-name"
                          placeholder="Driver Name"
                          value={DriverName}
                          onChange={(e) => setDriverName(e.target.value)}
                          className="text-[#032248] font-[raleway] font-bold text-[1rem] w-[180px] py-[5px] pl-[5px]"
                        />
                      </div>
                      {/* Driver Contact */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none justify-end">
                        <input
                          type="number"
                          name="driver-contact"
                          id="driver-contact"
                          placeholder="Driver Contact"
                          value={DriverContact}
                          onChange={(e) => setDriverContact(e.target.value)}
                          className="text-[#032248] font-[raleway] font-bold text-[1rem] w-[180px] py-[5px] pl-[5px]"
                        />
                      </div>
                      {/* CurDate */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none justify-end">
                        <input
                          type="date"
                          name="date"
                          id="date"
                          value={CurDate}
                          onChange={(e) => setDate(e.target.value)}
                          className="text-[#032248] font-[raleway] font-bold text-[1.2rem] w-[180px]"
                        />
                      </div>
                      {/* Current Bill Total */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none">
                        <div className="w-[118px] pr-[5px] text-right">
                          Total:
                        </div>
                        <div className="w-[100px] bg-white text-[#032248]">
                          {Total.toFixed(2)}
                        </div>
                      </div>
                      {/* Loading Charges */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none">
                        <div className="w-[118px] pr-[5px] text-right">
                          Loading:
                        </div>
                        <input
                          type="number"
                          name="loadingcharges"
                          id="loadingcharges"
                          value={LoadingCharges}
                          onChange={(e) => {
                            if (e.target.value === "") setLoadingCharges(0);
                            else setLoadingCharges(e.target.value);
                          }}
                          className="text-[#032248] font-[raleway] font-bold text-[1.2rem] w-[100px]"
                        />
                      </div>
                      {/* Delivery Charges */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none">
                        <div className="w-[118px] pr-[5px] text-right">
                          Delivery:
                        </div>
                        <input
                          type="number"
                          name="deliverycharges"
                          id="deliverycharges"
                          value={DeliveryCharges}
                          onChange={(e) => {
                            if (e.target.value === "") setDeliveryCharges(0);
                            else setDeliveryCharges(e.target.value);
                          }}
                          className="text-[#032248] font-[raleway] font-bold text-[1.2rem] w-[100px]"
                        />
                      </div>
                      {/* Expense Charges */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none">
                        <div className="w-[118px] pr-[5px] text-right">
                          Expense:
                        </div>
                        <input
                          type="number"
                          name="expensecharges"
                          id="expensecharges"
                          value={TotalExpense}
                          onChange={(e) => {
                            if (e.target.value === "") setTotalExpense(0);
                            else setTotalExpense(e.target.value);
                          }}
                          className="text-[#032248] font-[raleway] font-bold text-[1.2rem] w-[100px]"
                        />
                      </div>
                      {/* Discount */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none">
                        <div className="w-[118px] pr-[5px] text-right">
                          Discount:
                        </div>
                        <input
                          type="number"
                          name="discount"
                          id="discount"
                          value={Discount}
                          onChange={(e) => {
                            if (e.target.value === "") setDiscount(0);
                            else setDiscount(e.target.value);
                          }}
                          className="text-[#032248] font-[raleway] font-bold text-[1.2rem] w-[100px]"
                        />
                      </div>
                      {/* Grand Total */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none">
                        <div className="w-[118px] pr-[5px] text-right">
                          Grand Total:
                        </div>
                        <div className="w-[100px] bg-white text-[#032248]">
                          {Number(Total) -
                            Number(Discount) +
                            Number(LoadingCharges) +
                            Number(TotalExpense) +
                            Number(DeliveryCharges)}
                        </div>
                      </div>
                      {/* Payment from Advance Amount (Currrent Customer) */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none">
                        <div className="w-[118px] pr-[5px] text-right">
                          Advance:
                        </div>
                        <input
                          type="number"
                          name="advance"
                          id="advance"
                          value={Advance}
                          onChange={(e) => {
                            if (e.target.value === "") setAdvance(0);
                            else setAdvance(e.target.value);
                          }}
                          className="text-[#032248] font-[raleway] font-bold text-[1.2rem] w-[100px]"
                        />
                      </div>
                      {/* Paid Amount (Currrent Bill) */}
                      <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none">
                        <div className="w-[118px] pr-[5px] text-right">
                          Paid:
                        </div>
                        <input
                          type="number"
                          name="paid"
                          id="paid"
                          value={Paid}
                          onChange={(e) => {
                            if (e.target.value === "") setPaid(0);
                            else setPaid(e.target.value);
                          }}
                          className="text-[#032248] font-[raleway] font-bold text-[1.2rem] w-[100px]"
                        />
                      </div>
                      {/* Current Arears/Balance */}
                      {CurrentCustomer === "64c5fdffcaaf8f07968f3fb3" ? (
                        <></>
                      ) : (
                        <div className="flex w-[220px] text-[1.2rem] font-[raleway] font-bold my-[5px] select-none">
                          <div className="w-[118px] pr-[5px] text-right">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                            />
                            Balance:
                          </div>
                          <div className="w-[100px] bg-white text-[#032248]">
                            {(
                              CurrentRemaining +
                              Number(Total) -
                              Number(Discount) +
                              Number(LoadingCharges) +
                              Number(TotalExpense) +
                              Number(DeliveryCharges) -
                              Number(Paid)
                            ).toFixed(2)}
                          </div>
                        </div>
                      )}
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
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default AddNewBill;
