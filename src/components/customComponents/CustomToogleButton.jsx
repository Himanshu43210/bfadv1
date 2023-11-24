import React, { useEffect } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function CustomToogleButton({ value, component, handleValueChange }) {
  return (
    <>
      <ToggleButtonGroup value={value && component.name}>
        <ToggleButton value={component.name}
          onClick={() => handleValueChange(!value)}>
          {component.label}
        </ToggleButton>
      </ToggleButtonGroup >
    </>
  );
};


// import { useSelector } from "react-redux";

// export default function CustomToogleButton({ value, component, handleValueChange, setSliceData }) {
//   const sliceData = useSelector((state) => state[component.sliceName]);
//   if (!value) {
//     value = sliceData[component.name];
//   }
//   useEffect(() => {
//     if (setSliceData) {
//       setSliceData(sliceData);
//     }
//   }, [sliceData]);
//   return (
//     <>
//       <ToggleButtonGroup value={value && component.name}>
//         <ToggleButton value={component.name}
//           onClick={() => handleValueChange(!value, component)}>
//           {component.label}
//         </ToggleButton>
//       </ToggleButtonGroup >
//     </>
//   );
// };
