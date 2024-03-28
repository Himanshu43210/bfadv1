import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";

export default function RadioChecks({ options, helperText, error, ...props }) {
  return (
    <FormControl>
      <FormLabel id={`${label}FormLabel`} error={error}>
        {props.label}
      </FormLabel>
      <RadioGroup id={`${label}RadioGroup`} {...props}>
        {options.map((value) => (
          <FormControlLabel
            id={`${label}FormControlLabel`}
            key={value}
            value={value}
            control={<Radio />}
            label={value}
          />
        ))}
      </RadioGroup>
      <FormHelperText id={`${label}FormHelperText`}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}
