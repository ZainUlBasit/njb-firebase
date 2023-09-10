import React from "react";
import Lottie from "lottie-react";
import pageloading from "./pageloading.json";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-[10vh] w-full select-none">
      <Lottie animationData={pageloading} loop={true} />
    </div>
  );
};

export default PageLoader;
