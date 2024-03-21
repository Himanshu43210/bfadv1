import { Box, Slider, Typography, TextField } from '@mui/material';
import React, { useState } from 'react';

function valuetext(value) {
  return `${value}`;
}

const RangePickerWithTextBox = ({
  label,
  min,
  max,
  onChange,
  marks,
  steps,
}) => {
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(event, newValue);
    }
  };

  const handleInputChange = (index) => (event) => {
    const newValue = [...value];
    newValue[index] =
      event.target.value === '' ? '' : Number(event.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <Box sx={{ width: 350 }}>
      <Typography pb={2}>{label}</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TextField
          label={`Min ${label}`}
          type="number"
          value={value[0]}
          onChange={handleInputChange(0)}
          inputProps={{ min, max, step: steps }}
          sx={{
            border: 'none',
            '& fieldset': { border: 'none' },
            backgroundColor: 'white',
            borderRadius: 2,
            marginTop: 0.5,
            width: 150,
          }}
        />
        -
        <TextField
          label={`Max ${label}`}
          type="number"
          value={value[1]}
          onChange={handleInputChange(1)}
          inputProps={{ min, max, step: steps }}
          sx={{
            border: 'none',
            '& fieldset': { border: 'none' },
            backgroundColor: 'white',
            borderRadius: 2,
            marginTop: 0.5,
            width: 150,
          }}
        />
      </Box>
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

export default RangePickerWithTextBox;
