import React from "react";
import Lottie from "lottie-react";
import construction from "./construction.json";

const LoadingConstruction = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Lottie animationData={construction} loop={true} width={50} height={50} />
    </div>
  );
};

export default LoadingConstruction;
