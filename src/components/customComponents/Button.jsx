import MuiButton from "@mui/material/Button/Button.js";

export default function Button({ name, label, className, handleOnClick, children }) {
  return (
    <MuiButton
      key={name}
      className={className}
      onClick={() => {
        handleOnClick(true);
      }}
      variant="contained"
    >
      {label}
      {children}
    </MuiButton>
  );
}
