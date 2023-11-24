import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { storeUserData } from "../../redux/slice/userSlice.js";
import { useRouter } from "next/navigation.js";

export default function CustomRouteButton({
  value,
  component,
  handleValueChange,
  children
}) {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);
  return (
    <>
      <ToggleButtonGroup
        className={component.className}
        onClick={() => {
          if (component?.form) {
            console.log('***************** ROUTEBUTTON : component?.form **************', component);
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
            if (component?.route !== -1) {
              navigate.push({ pathname: component.route, query: component.params });
            } else {
              navigate.back();
            }
          }
        }}
        value={value && component.name}
      >
        <ToggleButton value={false}>{component.label}{children}</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
