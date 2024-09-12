import React from "react";
import dynamic from "next/dynamic";
import Draft from "@/components/pages/Draft";

const page = () => {
  return <Draft />;
};

const maps = dynamic(() => Promise.resolve(page), { ssr: false });

export default maps;
