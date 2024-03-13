import Map from "../components/pages/Map";
import React from "react";
import dynamic from "next/dynamic";

const page = () => {
  return <Map />;
};

const maps = dynamic(() => Promise.resolve(page), { ssr: false });

export default maps;
