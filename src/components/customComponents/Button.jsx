import MuiButton from "@mui/material/Button/Button.js";

export default function Button({ component, handleOnClick, children }) {
  return (
    <MuiButton
      key={component.name}
      className={component.className}
      onClick={() => {
        handleOnClick(true);
      }}
      variant="contained"
    >
      {component.label}
      {children}
    </MuiButton>
  );
}
