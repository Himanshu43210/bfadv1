import { Box, Slider, Typography } from '@mui/material';
import React from 'react';

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

const RangeSlider = ({ label, min, max, onChange, steps, marks }) => {
  return (
    <Box sx={{ width: 350 }}>
      <Typography>{label}</Typography>
      <Slider
        aria-label="Default"
        defaultValue={0}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={steps}
        marks={marks}
        min={min}
        max={max}
        onChange={onChange}
      />
    </Box>
  );
};

export default RangeSlider;
