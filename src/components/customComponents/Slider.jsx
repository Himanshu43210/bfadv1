import React from "react";
import { Slider, Typography } from "@mui/material";
import { convertToCr } from "../utils/HelperMethods";

export default function SliderComponent({
  component,
  value,
  handleValueChange,
  sliderClass
}) {
  const name = component.text;
  const minVal = component.minValue;
  const maxVal = component.maxValue;
  const defaultValue = component.defaultValue;
  const step = component.step;

  if (!value && defaultValue) handleValueChange(defaultValue);

  const handleChange = (event, newValue) => {
    // (newValue,2141)
    handleValueChange(newValue);
  };
  const getVal = value || defaultValue;
  const minValue = convertToCr(getVal[0]);
  const maxValue = convertToCr(getVal[1]);

  // (value,2141)
  return (
    <div className={`slider_comp ${sliderClass}`}>
      <div className="slider_range">
        <Typography variant="caption" className="slider_min">{minValue + " Cr."}</Typography>
      </div>
      <Slider
        key={name}
        name={name}
        value={value || defaultValue}
        min={parseFloat(minVal)}
        max={parseFloat(maxVal)}
        step={parseFloat(step)}
        onChange={handleChange}
        valueLabelDisplay="off"
        valueLabelFormat={(value) => convertToCr(value.toFixed(1)) + " Cr."}
        className="slider"
      />
      <div className="slider_range">
        <Typography variant="caption" className="slider_max">{maxValue + " Cr."}</Typography>
      </div>
    </div>
  );
}
