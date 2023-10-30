import React, { useEffect, useState } from "react";
import { Slider, Typography } from "@mui/material/index.js";
import { convertToCr } from "../utils/HelperMethods.js";
import { useDispatch, useSelector } from "react-redux";
import { storeFilterData } from "../../redux/slice/filterSlice.js";

export default function SliderComponent({
  component,
  // value,
  handleValueChange,
  sliderClass,
  setSliceData
}) {
  const name = component.text;
  const minVal = component.minValue;
  const maxVal = component.maxValue;
  const defaultValue = component.defaultValue;
  const step = component.step;
  const sliceData = useSelector((state) => state[component.sliceName]);
  const [val, setVal] = useState(sliceData[component.name]);

  if (!val && defaultValue) handleValueChange(defaultValue, component);

  // if (!value) {
  //   setVal(sliceData[component.name]);
  // }
  useEffect(() => {
    if (setSliceData) {
      setSliceData(sliceData);
    }
  }, [sliceData]);

  const handleChange = (event, newValue) => {
    // (newValue,2141)
    handleValueChange(newValue, component);
    setVal(newValue);
  };
  const getVal = val || defaultValue;
  const minValue = convertToCr(getVal[0]);
  const maxValue = convertToCr(getVal[1]);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);


  useEffect(() => {
    if ((component.paginatioName || component.name) === "budget" && refresh && window.location.pathname === "/") {
      console.log('############# REFRESH HOME ############');
      setRefresh(false);
      dispatch(
        storeFilterData({
          key: "budget",
          value: component.defaultValue,
        })
      );
    }
  }, []);

  // (value,2141)
  return (
    <div className={`slider_comp ${sliderClass}`}>
      <div className="slider_range">
        <Typography variant="caption" className="slider_min">{minValue + " Cr."}</Typography>
      </div>
      <Slider
        key={name}
        name={name}
        value={val || defaultValue}
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
