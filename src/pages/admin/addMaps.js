import AddMaps from "@/components/pages/AddMaps";
import React from "react";
import dynamic from "next/dynamic";

function page() {
  return <AddMaps />;
}

const addMaps = dynamic(() => Promise.resolve(page), { ssr: false });

export default addMaps;
