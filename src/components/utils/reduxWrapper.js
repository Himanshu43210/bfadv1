import React, { useState } from "react";
import { storeData, fetchData } from "./reduxUtils";

const ReduxWrapper = ({ sliceName, children }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleStoreData = () => {
    storeData(sliceName, "myKey", inputValue);
    setInputValue("");
  };

  const handleFetchData = () => {
    const data = fetchData(sliceName, "myKey");
    console.log(data);
  };

  return (
    <div>
      {children({
        inputValue,
        handleInputChange,
        handleStoreData,
        handleFetchData,
      })}
    </div>
  );
};

export default ReduxWrapper;
