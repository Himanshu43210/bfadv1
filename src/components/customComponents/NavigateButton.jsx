import React from "react";
import { useNavigate } from "react-router-dom";

function NavigateButton({ component, ...props }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(component.navigate);
  };

  return (
    <button onClick={handleClick} {...props} className={`navigate_btn ${component.btnClass}`}>
      {component.buttonLabel}
    </button>
  );
}

export default NavigateButton;
