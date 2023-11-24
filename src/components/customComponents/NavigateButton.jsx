import { useRouter } from "next/navigation";
import React from "react";

function NavigateButton({ component, ...props }) {
  const navigate = useRouter();

  const handleClick = () => {
    navigate.push(component.navigate);
  };

  return (
    <button onClick={handleClick} {...props} className={`navigate_btn ${component.btnClass}`}>
      {component.buttonLabel}
    </button>
  );
}

export default NavigateButton;
