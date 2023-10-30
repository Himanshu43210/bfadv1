import React from "react";
import ToggleButton from "@mui/material/ToggleButton/ToggleButton.js";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeUserData } from "../../redux/slice/userSlice.js";

export default function CustomRouteButton({
  value,
  component,
  handleValueChange,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);
  return (
    <>
      <ToggleButtonGroup
        className={component.className}
        onClick={() => {
          if (component?.form) {
            dispatch(
              storeUserData({
                ...user,
                formType: component.form,
                formSaveApi: component.onSaveApi,
                formName: component.label,
                autofill: component.autofill,
              })
            );
          }
          if (component?.route) {
            navigate(component.route);
          }
        }}
        value={value && component.name}
      >
        <ToggleButton value={false}>{component.label}</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
