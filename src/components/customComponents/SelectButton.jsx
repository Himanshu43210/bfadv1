import React, { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore.js';

export default function SelectButton({
  component,
  handleValueChange,
  value, //from screen
}) {
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const [curr, setCurr] = useState(component.defaultValue?.value || component.name);
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
  if (component.defaultValue) {
    handleValueChange(component.defaultValue);
  }
  return (
    <div
      className={`custom_select_container`}
      style={{zIndex: component.zIndex}}
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
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
          className="custom_select_popup"
        >
          {component.options?.map((item, i) => {
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




// import React, { useEffect, useState } from "react";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore.js';
// import { useSelector } from "react-redux";

// export default function SelectButton({
//   component,
//   handleValueChange,
//   value, //from screen
//   setSliceData
// }) {
//   const [clicked, setClicked] = useState(false);
//   const [hover, setHover] = useState(false);
//   const [curr, setCurr] = useState(component.defaultValue?.value || component.name);
//   const sliceData = useSelector((state) => state[component.sliceName]);
//   if (!value) {
//     value = sliceData[component.name];
//   }
//   useEffect(() => {
//     if (setSliceData) {
//       setSliceData(sliceData);
//     }
//   }, [sliceData]);
//   useEffect(() => {
//     const onPointerDown = () => {
//       if (!hover) {
//         setClicked(false);
//       }
//     };
//     document.addEventListener("pointerdown", onPointerDown);
//     return () => {
//       document.removeEventListener("pointerdown", onPointerDown);
//     };
//   });
//   if (component.defaultValue) {
//     handleValueChange(component.defaultValue, component);
//   }
//   return (
//     <div
//       className={`custom_select_container`}
//       style={{ zIndex: component.zIndex }}
//     >
//       <div
//         onClick={() => {
//           setClicked(true);
//         }}
//         className="custom_select_curr"
//       >
//         {curr}
//         <ExpandMoreIcon />
//       </div>
//       {clicked && (
//         <div
//           onMouseEnter={() => {
//             setHover(true);
//           }}
//           onMouseLeave={() => {
//             setHover(false);
//           }}
//           className="custom_select_popup"
//         >
//           {component.options?.map((item, i) => {
//             const val = typeof value === "object" ? value?.value : value;
//             const check = val === item.value;
//             // (val, check);
//             return (
//               <div
//                 key={i}
//                 onClick={() => {
//                   setCurr(item.label);
//                   handleValueChange(item, component);
//                   setClicked(false);
//                 }}
//                 className={`custom_select_popup_item ${check && "selected_popup_item"
//                   }`}
//               >
//                 {item.label}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
