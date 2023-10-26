import React from "react";
import ToggleButton from '@mui/material/ToggleButton/ToggleButton.js';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup/ToggleButtonGroup.js';

export default function CustomToogleButton({ value, component, handleValueChange }) {
  return (
    <>
      <ToggleButtonGroup value={value && component.name}>
        <ToggleButton value={component.name}
          onClick={() => handleValueChange(!value)}>
          {component.label}
        </ToggleButton>
      </ToggleButtonGroup >
    </>
  );
};
