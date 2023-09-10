import { db } from "../config/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const companyCollectionRef = collection(db, "company");
class CompanyDataServices {
  addCompany = (newCompany) => {
    return addDoc(companyCollectionRef, newCompany);
  };

  updateCompany = (id, updatedCompany) => {
    const companyDoc = doc(db, "company", id);
    return updateDoc(companyDoc, updatedCompany);
  };

  updateCompanyTotal = (id, updatedCompanyTotal) => {
    const companyDoc = doc(db, "company", id);
    return updateDoc(companyDoc, {
      total: firebase.firestore.FieldValue.increment(updatedCompanyTotal),
      remaining: firebase.firestore.FieldValue.increment(updatedCompanyTotal),
    });
  };

  updateCompanyCash = (id, cashPayment) => {
    const companyDoc = doc(db, "company", id);
    const Remaining = Number(cashPayment) * -1;
    return updateDoc(companyDoc, {
      remaining: firebase.firestore.FieldValue.increment(Remaining),
      paid: firebase.firestore.FieldValue.increment(cashPayment),
    });
  };

  deleteCompany = (id) => {
    const companyDoc = doc(db, "company", id);
    return deleteDoc(companyDoc);
  };

  getAllCompanies = () => {
    return getDocs(companyCollectionRef);
  };

  getCompany = (id) => {
    const companyDoc = doc(db, "company", id);
    return getDoc(companyDoc);
  };
}

export default new CompanyDataServices();
