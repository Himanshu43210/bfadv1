import React from "react";
import dynamic from "next/dynamic";
import DocumentPage from "@/components/pages/DocumentPage";

function page() {
  return <DocumentPage />;
}

const manageDocuments = dynamic(() => Promise.resolve(page), { ssr: false });

export default manageDocuments;
