import * as React from "react";
import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function Checkbox({ labelPlacement, label, ...props }) {
  return (
    <FormControl id="formControl" component="fieldset">
      <FormControlLabel
        id={label}
        label={label}
        control={<MuiCheckbox value={props.value} {...props} />}
        labelPlacement={labelPlacement ?? "end"}
      />
    </FormControl>
  );
}
