import MuiButton from "@mui/material/Button";

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

// import { useEffect } from "react";
// import { useSelector } from "react-redux";

// export default function Button({ component, handleOnClick, children, setSliceData }) {
//   const sliceData = useSelector((state) => state[component.sliceName]);
//   useEffect(() => {
//     if (setSliceData) {
//       setSliceData(sliceData);
//     }
//   }, [sliceData]);
//   return (
//     <MuiButton
//       key={component.name}
//       className={component.className}
//       onClick={() => {
//         handleOnClick(true, component);
//       }}
//       variant="contained"
//     >
//       {component.label}
//       {children}
//     </MuiButton>
//   );
// }
