import AddDocuments from "@/components/pages/AddDocuments";
import React from "react";
import dynamic from "next/dynamic";

function page() {
  return <AddDocuments />;
}

const addDocuments = dynamic(() => Promise.resolve(page), { ssr: false });

export default addDocuments;
