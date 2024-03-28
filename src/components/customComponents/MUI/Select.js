import MuiSelect from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@mui/material";
import { useEffect } from "react";

function Select({
  options,
  helperText,
  value,
  disabled,
  multiple,
  required,
  ...props
}) {
  const optionArray = Array.isArray(options) ? options : [];
  return (
    <FormControl size={props.size} fullWidth={props.fullWidth}>
      <InputLabel id={`${props.label}InputLabelSelect`} error={props.error}>
        {props.label}
      </InputLabel>
      <FormHelperText
        id={`${props.error}FormHelperTextSelect`}
        error={props.error}
      >
        {props.error}
      </FormHelperText>
      <MuiSelect
        id={`${props.name}MuiSelect`}
        readOnly={options?.length < 1}
        {...props}
        className="dropselect"
        value={value}
        disabled={disabled}
        sx={{
          boxShadow: "5px",
          backgroundColor: "#f5f5f5 !important",
          ".MuiInputBase-input": {
            padding: 1.3,
          },
          borderBottom: "solid 	#999999 1px",
          "& fieldset": { border: "none" },
          backgroundColor: "white",
          marginTop: 0.5,
        }}
        multiple={multiple}
        required={required}
      >
        {optionArray?.map((option) => (
          <MenuItem
            id={`${option?.value ?? option}MuiSelectMenuItem`}
            key={option?.value ?? option}
            value={option?.value ?? option}
            className="inputlabeldrop"
          >
            {option?.title ?? option}
          </MenuItem>
        ))}
      </MuiSelect>
      <FormHelperText error={props.error}>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default Select;
