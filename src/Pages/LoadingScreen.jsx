import React from "react";
import DataLoader from "../Components/Loader/DataLoader";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  }, []);

  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <DataLoader />
    </div>
  );
};

export default LoadingScreen;
