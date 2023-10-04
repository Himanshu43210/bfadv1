import { Slider, TextField } from "@mui/material";
import MuiButton from "@mui/material/Button";
import React, { useState } from "react";

export const SelectSlider = ({
  component,
  handleValueChange,
  stateValue = component.defaultValue,
  className
}) => {
  const [showComponent, setShowComponent] = useState(false);
  return (
    <>
      <div className={`select_slider_wrapper ${className}`}>
        <MuiButton
          key={component.name}
          className={`slider_btn ${component.className}`}
          onClick={() => {
            setShowComponent(!showComponent);
          }}
          variant="contained"
        >
          {component.buttonLabel}
        </MuiButton>
        {showComponent && (
          <div className="select_slider_popup_container" style={{ zIndex: component.zIndex }}>
            <div className="select_slider_inputs">
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
              className="select_slider"
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
            <div className="select_slider_labels">
              <label>Min:{stateValue[0]}Sq.Yd.</label>
              <label>Max:{stateValue[1]}Sq.Yd.</label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
