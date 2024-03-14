import Document from "../components/pages/Document";
import React from "react";
import dynamic from "next/dynamic";

const page = () => {
  return <Document />;
};

const documents = dynamic(() => Promise.resolve(page), { ssr: false });

export default documents;
