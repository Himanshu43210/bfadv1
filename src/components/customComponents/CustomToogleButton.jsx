import React, { useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton/ToggleButton.js';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup/ToggleButtonGroup.js';
import { useSelector } from "react-redux";

export default function CustomToogleButton({ value, component, handleValueChange, setSliceData }) {
  const sliceData = useSelector((state) => state[component.sliceName]);
  if (!value) {
    value = sliceData[component.name];
  }
  useEffect(() => {
    if (setSliceData) {
      setSliceData(sliceData);
    }
  }, [sliceData]);
  return (
    <>
      <ToggleButtonGroup value={value && component.name}>
        <ToggleButton value={component.name}
          onClick={() => handleValueChange(!value, component)}>
          {component.label}
        </ToggleButton>
      </ToggleButtonGroup >
    </>
  );
};
