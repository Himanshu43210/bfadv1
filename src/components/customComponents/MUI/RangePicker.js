import { Box, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';

// const marks = [
//   {
//     value: 0,
//     label: '0',
//   },
//   {
//     value: 10000,
//     label: '10000',
//   },
// ];

function valuetext(value) {
  return `${value}`;
}

const RangePicker = ({ label, min, max, onChange, marks, steps }) => {
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <Box sx={{ width: 350 }}>
      <Typography>{label}</Typography>
      <Slider
        value={value}
        aria-label="Range slider"
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={steps}
        marks={marks}
        min={min}
        max={max}
        onChange={handleChange}
      />
    </Box>
  );
};

export default RangePicker;
