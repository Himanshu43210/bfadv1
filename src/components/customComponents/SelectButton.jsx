import React, { useEffect, useState } from "react";
import Select from "react-select";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SelectButton({
  name,
  options,
  handleValueChange,
  defaultValue,
  label, //from json
  value, //from screen
}) {
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const [curr, setCurr] = useState(defaultValue?.value || name);
  useEffect(() => {
    const onPointerDown = () => {
      if (!hover) {
        setClicked(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  });
  if (defaultValue) handleValueChange(defaultValue);
  return (
    // <Select
    //   key={name}
    //   name={name}
    //   options={options}
    //   onChange={(selectedOption) => {
    //     handleValueChange(selectedOption);
    //   }}
    //   value={
    //     (value &&
    //       (typeof value === "string"
    //         ? { label: value, value: value }
    //         : value)) ||
    //     defaultValue || { label: label, value: "" }
    //   }
    // />
    <div
      className={`custom_select_container`}
    >
      <div
        onClick={() => {
          setClicked(true);
        }}
        className="custom_select_curr"
      >
        {curr}
        <ExpandMoreIcon />
      </div>
      {clicked && (
        <div
          onMouseOver={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          className="custom_select_popup"
        >
          {options.map((item, i) => {
            const val = typeof value === "object" ? value?.value : value;
            const check = val === item.value;
            // (val, check);
            return (
              <div
                key={i}
                onClick={() => {
                  setCurr(item.label);
                  handleValueChange(item);
                  setClicked(false);
                }}
                className={`custom_select_popup_item ${
                  check && "selected_popup_item"
                }`}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
