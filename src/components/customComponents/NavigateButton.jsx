import React from "react";
import { useNavigate } from "react-router-dom";

function NavigateButton({ to, label, ...props }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button onClick={handleClick} {...props} className={`navigate_btn ${props.btnClass}`}>
      {label}
    </button>
  );
}

export default NavigateButton;
