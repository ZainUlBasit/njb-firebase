import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DataLoader from "../Loader/DataLoader";
import { logoutUser } from "../../Https";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

const Logout = () => {
  const Auth = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();

  const LogoutFunction = async () => {
    try {
      signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      LogoutFunction();
    }, 3000);
  }, []);
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <DataLoader />
    </div>
  );
};

export default Logout;
