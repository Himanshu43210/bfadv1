import { Slider, TextField } from "@mui/material/index.js";
import MuiButton from "@mui/material/Button/Button.js";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore.js';
import React, { useState } from "react";

export const SelectSlider = ({
  component,
  handleValueChange,
  stateValue = component.defaultValue,
  className
}) => {
  const [modified, setModified] = useState(false);
  const [visited, setVisited] = useState(false);
  const [selections, setSelections] = useState(stateValue);
  const [showComponent, setShowComponent] = useState(false);

  const handleChange = (index, value) => {
    selections[index] = value;
    setModified(true);
  };

  const handleSubmit = () => {
    if (showComponent) {
      if (modified && visited) {
        handleValueChange(selections);
        setModified(false);
        setVisited(false)
      }
      setShowComponent(false);
    } else {
      setShowComponent(true);
      setVisited(false);
    }
  };

  return (
    <>
      <div className={`select_slider_wrapper ${className}`}
        onMouseLeave={() => {
          if (showComponent && visited) {
            handleSubmit();
          }
        }}
      >
        <MuiButton
          key={component.name}
          className={`slider_btn select_btn ${component.className}`}
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
        >
          {component.buttonLabel}
          <ExpandMoreIcon className='expand_icon' />
        </MuiButton>
        {showComponent && (
          <div className="select_slider_popup_container" style={{ zIndex: component.zIndex }} onMouseEnter={() => setVisited(true)}>
            <div className="select_slider_inputs">
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  setSelections([e.target.value, stateValue[1]]);
                  setModified(true);
                }}
                value={selections[0]}
              />
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  setSelections([stateValue[0], e.target.value]);
                  setModified(true);
                }}
                value={selections[1]}
              />
            </div>
            <Slider
              className="select_slider"
              key={component.name}
              name={component.name}
              value={selections}
              min={parseFloat(component.minValue)}
              max={parseFloat(component.maxValue)}
              step={component.step}
              onChange={(action, value) => {
                setSelections(value);
                setModified(true);
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => value.toFixed(1)}
            />
            <div className="select_slider_labels">
              <label>Min: <span className="slider_value">{selections[0]} </span>Sq.Yd.</label>
              <label>Max: <span className="slider_value">{selections[1]} </span>Sq.Yd.</label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
