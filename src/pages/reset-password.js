import React from "react";
import dynamic from "next/dynamic";
import ResetPassword from "@/components/pages/ResetPassword";

const page = () => {
  return <ResetPassword />;
};

const resetPassword = dynamic(() => Promise.resolve(page), { ssr: false });

export default resetPassword;
