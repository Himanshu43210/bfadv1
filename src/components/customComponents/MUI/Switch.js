import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch from '@mui/material/Checkbox';

export default function Switch({ label, disabled, ...props }) {
  return (
    <FormGroup className="switch_formGroup">
      <FormControlLabel
        id={`${props.name}switch`}
        className="switch_formControlLabel"
        name={props.name}
        control={
          <MuiSwitch
            size="large"
            disabled={disabled}
            sx={{
              color: '#2F2A48 !important',
              borderRadius: 1,
              fontSize: '2',
              overflow: 'hidden',
              width: '22px',
              height: '22px',
              border: 2,
              '&.Mui-checked': { color: '#2F2A48 !important' },
              '&.MuiCheckbox-root': {
                backgroundColor: 'white !important',
              },
            }}
            checked={props.value}
            {...props}
          />
        }
      />
      {label}
    </FormGroup>
  );
}
