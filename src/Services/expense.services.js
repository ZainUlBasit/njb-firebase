import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const expenseCollectionRef = collection(db, "expense");

class ExpenseDataServices {
  addExpense = (newExpense) => {
    return addDoc(expenseCollectionRef, newExpense);
  };
  getExpenses = () => {
    return getDocs(expenseCollectionRef);
  };
}

export default new ExpenseDataServices();
