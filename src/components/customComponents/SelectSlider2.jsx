import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore.js";
import React, { useState } from "react";

const SelectSlider2 = ({
  component,
  handleValueChange,
  stateValue = component.defaultValue,
  className,
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
        setVisited(false);
      }
      setShowComponent(false);
    } else {
      setShowComponent(true);
      setVisited(false);
    }
  };

  function convertToCrore(amount) {
    const croreValue = amount / 10000000;
    const formattedResult = croreValue.toFixed(2);
    return formattedResult;
  }
  return (
    <>
      <div
        className={`select_slider_wrapper ${className}`}
        onMouseLeave={() => {
          if (showComponent && visited) {
            handleSubmit();
          }
        }}
      >
        <Button
          key={component.name}
          className={`slider_btn select_btn ${component.className}`}
          onClick={() => {
            handleSubmit();
          }}
          variant="contained"
        >
          {component.buttonLabel}
          <ExpandMoreIcon className="expand_icon" />
        </Button>
        {showComponent && (
          <div
            className="select_slider_popup_container"
            style={{ zIndex: component.zIndex }}
            onMouseEnter={() => setVisited(true)}
          >
            <div className="select_slider_inputs">
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  setSelections([e.target.value, stateValue[1]]);
                  setModified(true);
                }}
                value={convertToCrore(selections[0])}
              />
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                onChange={(e) => {
                  setSelections([stateValue[0], e.target.value]);
                  setModified(true);
                }}
                value={convertToCrore(selections[1])}
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
              <label>
                Min:{" "}
                <span className="slider_value">
                  {convertToCrore(selections[0])}{" "}
                </span>
                Cr.
              </label>
              <label>
                Max:{" "}
                <span className="slider_value">
                  {convertToCrore(selections[1])}{" "}
                </span>
                Cr.
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectSlider2;
