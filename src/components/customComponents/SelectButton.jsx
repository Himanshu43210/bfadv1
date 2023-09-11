import React, { useEffect, useState } from "react";
import Select from "react-select";

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
  const [curr, setCurr] = useState(name);
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
      className={`select-container-parent "heighted-clasas-1`}
    >
      <div
        onClick={() => {
          setClicked(true);
        }}
        className="select-labeled-container"
      >
        {curr}
      </div>
      {clicked && (
        <div
          onMouseOver={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          className="select-popup-temp"
        >
          {options.map((item, i) => {
            const val = typeof value === "object" ? value?.value : value;
            const check = val === item.value;
            console.log(val, check);
            return (
              <div
                key={i}
                onClick={() => {
                  setCurr(item.label);
                  handleValueChange(item);
                }}
                className={`${
                  check && "selected-popup-temp-item"
                }  select-popup-temp-item`}
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
