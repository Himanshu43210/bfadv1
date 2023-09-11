import { Slider, TextField } from "@mui/material";
import MuiButton from "@mui/material/Button";
import React, { useState } from "react";

export const SelectSlider = ({
  component,
  handleValueChange,
  stateValue = component.defaultValue,
}) => {
  const [showComponent, setShowComponent] = useState(false);
  return (
    <>
      <div>
        <MuiButton
          key={component.name}
          className={component.className}
          onClick={() => {
            setShowComponent(!showComponent);
          }}
          variant="contained"
        >
          {component.buttonLabel}
        </MuiButton>
        {showComponent && (
          <div className="slider-select-popup-container" >
            <div className="slider-select-inputs">
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  handleValueChange([e.target.value, stateValue[1]]);
                }}
                value={stateValue[0]}
              />
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  handleValueChange([stateValue[0], e.target.value]);
                }}
                value={stateValue[1]}
              />
            </div>
            <Slider
              key={component.name}
              name={component.name}
              value={stateValue}
              min={parseFloat(component.minValue)}
              max={parseFloat(component.maxValue)}
              step={component.step}
              onChange={(action, value) => {
                handleValueChange(value);
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => value.toFixed(1)}
            />
            <div className="slider-select-labels">
              <label>Max:{stateValue[0]}Sq.Yd.</label>
              <label>Min:{stateValue[1]}Sq.Yd.</label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
