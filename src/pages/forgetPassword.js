import React from "react";
import dynamic from "next/dynamic";
import ForgotPassword from "@/components/pages/ForgotPassword";

const page = () => {
  return <ForgotPassword />;
};

const forgetPassword = dynamic(() => Promise.resolve(page), { ssr: false });

export default forgetPassword;
