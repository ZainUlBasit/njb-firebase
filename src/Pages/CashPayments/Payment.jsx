import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/NavBar";
import CashPaymentNav from "../../Components/Navigations/CashPaymentNav";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../store/Slices/CustomerSlice";
import { fetchCompanies } from "../../store/Slices/CompanySlice";
import SimpleTextInput from "../../Components/Input/SimpleTextInput";
import SimpleSelectCompByName from "../../Components/Select/SimpleSelectCompByName";
import SimpleSelectComp from "../../Components/Select/SimpleSelectComp";
import { fetchBanks } from "../../store/Slices/BankSlice";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import CompanyDataServices from "../../Services/company.services";
import CustomerDataServices from "../../Services/customer.services";
import CashPaymentDataServices from "../../Services/cashpayment.servivces";
import AddingLoader from "../../Components/Loader/AddingLoader";
import Select from "react-select";

const Payment = () => {
  const Customers = useSelector((state) => state.CustomerReducer.data);
  let Companies = useSelector((state) => state.CompanyReducer.data);
  const dispatch = useDispatch();
  const [Amount, setAmount] = useState("");
  const [Depositor, setDepositor] = useState("");
  const [CurDate, setDate] = useState("");
  const [Cnic, setCnic] = useState("");
  const [Contact, setContact] = useState("");
  const [Type, setType] = useState("");
  const [CustomerId, setCustomerId] = useState("");
  const [CompanyId, setCompanyId] = useState("");
  const [CurrentBank, setCurrentBank] = useState("");
  const [AccountNo, setAccountNo] = useState("");
  const [ProcessLoading, setProcessLoading] = useState(false);
  const Banks = useSelector((state) => state.BankReducer);
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchCompanies());
    dispatch(fetchBanks());
  }, []);
  useEffect(() => {
    const setAccNo = () => {
      if (CurrentBank !== "" && Type === "company") {
        let curAcc = Banks.data.filter((bnk) => bnk._id === CurrentBank);
        curAcc = curAcc[0];
        setAccountNo(curAcc.accountno);
      }
    };
    setAccNo();
  }, [CurrentBank]);

  const CustomerBankOptions = [
    { name: "ABL", _id: "1" },
    { name: "UBL", _id: "2" },
    { name: "MEEZAN", _id: "3" },
    { name: "MCB", _id: "4" },
    { name: "Khyber", _id: "5" },
    { name: "Alfalah", _id: "6" },
    { name: "Al Habib", _id: "7" },
    { name: "HBL", _id: "8" },
    { name: "Easypaisa", _id: "9" },
    { name: "Jazzcash", _id: "10" },
    { name: "Cash", _id: "11" },
    { name: "Gala", _id: "12" },
  ];

  const onSubmit = async (e) => {
    setProcessLoading(true);
    e.preventDefault();
    let BankName;

    if (Type === "company") {
      BankName = Banks.data.filter((bnk) => bnk._id === CurrentBank);
      BankName = BankName[0];
      BankName = BankName.bankname;
    } else if (Type === "customer") {
      BankName = CustomerBankOptions.filter((bnk) => bnk._id === CurrentBank);
      BankName = BankName[0];
      BankName = BankName.name;
    }
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date(CurDate));

    let curUser = "";
    if (Type === "company") {
      curUser = Companies.filter((cust) => cust._id === CompanyId);
      curUser = curUser[0];
      curUser = curUser.name;
    } else if (Type === "customer") {
      curUser = Customers.filter((cust) => cust._id === CustomerId);
      curUser = curUser[0];
      curUser = curUser.name;
    }

    let PaymentInfo = {
      type: Type,
      bank: BankName,
      accountno: AccountNo,
      amount: Amount,
      depositor: Depositor,
      date: timestamp,
      cnicno: Cnic,
      contact: Contact,
      user_id: Type === "company" ? CompanyId : CustomerId,
      user_name: curUser,
    };
    if (
      Type !== "" &&
      CurrentBank !== "" &&
      AccountNo !== "" &&
      Amount !== "" &&
      Depositor !== "" &&
      CurDate !== "" &&
      Cnic !== "" &&
      Contact !== "" &&
      (CompanyId !== "" || CustomerId !== "")
    ) {
      if (Type === "company")
        await CompanyDataServices.updateCompanyCash(CompanyId, Number(Amount));
      else if (Type === "customer")
        await CustomerDataServices.updateCustomerCash(
          CustomerId,
          Number(Amount)
        );
      await CashPaymentDataServices.addPayment(PaymentInfo);
      setType("");
      setCustomerId("");
      setCompanyId("");
      setCurrentBank("");
      setAccountNo("");
      setAmount("");
      setDepositor("");
      setDate("");
      setCnic("");
      setContact("");
      alert("Transaction Successfully Added...!");
    } else {
      alert("fill all fields....");
    }
    setProcessLoading(false);
  };

  return (
    <>
      <Navbar />
      <CashPaymentNav />
      <div className="w-[100%] flex justify-center items-center">
        <div className="mb-[20px] paymentBanner:w-[90%] w-[70%] flex justify-center flex-col items-center border-[2px] border-[#032248] rounded-t-[10px] overflow-hidden bg-[aliceblue] pb-[20px]">
          <div className="bg-[#032248] text-white w-full text-center py-[25px] mb-[20px] text-[1.5rem] font-[raleway] font-bold uppercase">
            Cash Payment
          </div>
          <SimpleSelectCompByName
            value={Type}
            setValue={setType}
            label={"Select Type"}
            data={[{ name: "customer" }, { name: "company" }]}
          />
          <Select
            options={
              Type === "company"
                ? Companies.map((comp) => {
                    return {
                      value: comp._id,
                      label: comp.name,
                    };
                  })
                : Type === "customer"
                ? Customers.map((cust) => {
                    return {
                      value: cust._id,
                      label: cust.name,
                    };
                  })
                : [{}]
            }
            onChange={(opt) =>
              Type === "company"
                ? setCompanyId(opt.value)
                : setCustomerId(opt.value)
            }
            className="w-[90%] mb-[20px] pb-[0px] z-[10]"
          />
          <SimpleSelectComp
            value={CurrentBank}
            setValue={setCurrentBank}
            label={"Select Bank"}
            data={
              Type === "company"
                ? Banks.data.map((bnk) => {
                    return {
                      ...bnk,
                      name: bnk.bankname,
                    };
                  })
                : CustomerBankOptions
            }
          />
          {Type === "customer" ? (
            <SimpleTextInput
              label="Enter Acc #"
              placeholder="Enter Acc #"
              type="number"
              id="accountno"
              name="accountno"
              value={AccountNo}
              setValue={setAccountNo}
            />
          ) : (
            <div className="mb-[20px] w-[90%] text-center py-[10px] border-[2px] rounded-[5px] border-[#032248]">
              {AccountNo}
            </div>
          )}
          <SimpleTextInput
            label="Enter Amount"
            placeholder="Enter Amount"
            type="number"
            id="amount"
            name="amount"
            value={Amount}
            setValue={setAmount}
          />
          <SimpleTextInput
            label="Enter Depositor"
            placeholder="Enter Depositor"
            type="text"
            id="depositor"
            name="depositor"
            value={Depositor}
            setValue={setDepositor}
          />
          <SimpleTextInput
            type="date"
            id="date"
            name="date"
            value={CurDate}
            setValue={setDate}
          />
          <SimpleTextInput
            label="Enter CNIC"
            placeholder="Enter CNIC"
            type="number"
            id="cnic"
            name="cnic"
            value={Cnic}
            setValue={setCnic}
          />
          <SimpleTextInput
            label="Enter Contact"
            placeholder="Enter Contact"
            type="number"
            id="contact"
            name="contact"
            value={Contact}
            setValue={setContact}
          />
          {ProcessLoading ? (
            <AddingLoader />
          ) : (
            <div className="mt-[10px] mb-[10px]">
              <button
                className="hover:bg-[#fff] hover:text-[#032248] hover:rounded-[10px]  border-[2px] border-[#032248] bg-[#032248] text-white py-[10px] px-[15px] w-[250px] text-[1rem] font-bold font-[raleway] transition-all duration-700"
                onClick={onSubmit}
              >
                Add Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
