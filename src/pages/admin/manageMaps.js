import React from "react";
import dynamic from "next/dynamic";
import MapsPage from "@/components/pages/MapsPage";

function page() {
  return <MapsPage />;
}

const manageMaps = dynamic(() => Promise.resolve(page), { ssr: false });

export default manageMaps;
