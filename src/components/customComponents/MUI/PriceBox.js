import { useCallback, useEffect, useState } from "react";
import { TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";

function PriceBox({
  value,
  name,
  showInThousand = false,
  label,
  onChange,
  disable,
  maxLength,
}) {
  let formattedNumber = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 4,
  }).format(value);
  //   const { setFieldValue } = useFormikContext();
  const [price, setPrice] = useState(null);
  const [inCrore, setInCrore] = useState(
    value > 0 && !showInThousand
      ? // parseInt(value / 10000000)
        formattedNumber?.split(",")?.[0]
      : ""
  );
  const [inLakh, setInLakh] = useState(
    value > 0
      ? formattedNumber?.split(",")?.[showInThousand ? 0 : 1]
      : // parseInt(
        //     parseInt(
        //       value
        //         ?.toString()
        //         .substring(showInThousand ? 0 : 1, value?.toString()?.length)
        //     ) / 100000
        //   )
        ""
  );

  const [inThousand, setInThousand] = useState(
    value > 0
      ? formattedNumber?.split(",")?.[showInThousand ? 1 : 2]
      : // parseInt(
        //     parseInt(
        //       value
        //         ?.toString()
        //         .substring(showInThousand ? 2 : 3, value?.toString()?.length)
        //     ) / 1000
        //   )
        ""
  );

  useEffect(() => {
    if (parseInt(value) === 0) {
      setInCrore("");
      setInLakh("");
      setInThousand("");
    }
  }, [value]);

  useEffect(
    useCallback(() => {
      let price = 0;
      price = inCrore * 10000000 + inLakh * 100000 + inThousand * 1000;
      setPrice(price);
      //   setFieldValue(name, price);
      if (onChange) {
        onChange({ target: { value: price } });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }),
    [inCrore, inLakh, inThousand]
  );

  const handleCroreChange = (evt) => {
    const input = evt.target.value;
    const newCrore = numericFix(input);
    setInCrore(newCrore);
  };
  const handleLakhChange = (evt) => {
    const input = evt.target.value;
    const newLakh = numericFix(input);
    setInLakh(newLakh);
  };

  return (
    <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      // }}
      className={"price_box_main_container"}
    >
      <Typography className="price_box_label">
        {label || name.charAt(0).toUpperCase() + name.slice(1)}
      </Typography>
      <div
        // style={{
        //   display: "flex",
        //   alignItems: "flex-end",
        //   gap: 4,
        // }}
        className="price_box_input_container"
      >
        {!showInThousand && (
          <>
            <TextField
              // type="number"
              value={inCrore}
              // onChange={(event) => {
              //   setInCrore(parseInt(event.target.value));
              // }}
              onChange={handleCroreChange}
              disabled={disable}
              // variant="standard"
              // style={{
              //   width: 60,
              // }}
              placeholder={"0"}
              className={"price_box_input"}
              // variant="standard"
              // disableUnderline={false}
              sx={{
                boxShadow: "5px",
                backgroundColor: "white",
                borderRadius: "5px",
                height: "auto",
                width: "auto",
                ".MuiOutlinedInput-root": {
                  border: "none",
                },
                ".MuiOutlinedInput-input": {
                  padding: "10px",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "solid #999999 1px",
                },
              }}
              inputProps={{
                min: 0,
                maxLength: maxLength ?? 2,
              }}
            />
            <Typography className="price_box_input_label">Crore</Typography>
          </>
        )}
        <TextField
          value={inLakh}
          placeholder={"0"}
          onChange={handleLakhChange}
          disabled={disable}
          // style={{
          //   width: 60,
          // }}
          className={"price_box_input margin_left5px"}
          sx={{
            boxShadow: "5px",
            backgroundColor: "white",
            borderRadius: "5px",
            height: "auto",
            width: "auto",
            ".MuiOutlinedInput-root": {
              border: "none",
            },
            ".MuiOutlinedInput-input": {
              padding: "10px",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "solid #999999 1px",
            },
          }}
          inputProps={{
            min: 0,
            maxLength: 2,
          }}
        />
        <Typography className="price_box_input_label">Lakh</Typography>
        {showInThousand && (
          <>
            <TextField
              // type="number"
              value={inThousand}
              placeholder={"0"}
              onChange={(event) => {
                setInThousand(numericFix(event.target.value));
              }}
              disabled={disable}
              // style={{
              //   width: 60,
              // }}
              className={"price_box_input margin_left5px"}
              sx={{
                boxShadow: "5px",
                backgroundColor: "white",
                borderRadius: "5px",
                height: "auto",
                width: "auto",
                ".MuiOutlinedInput-root": {
                  border: "none",
                },
                ".MuiOutlinedInput-input": {
                  padding: "10px",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  border: 0,
                },
                outline: "none",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                  borderRadius: "5px",
                },
                "&:focus": {
                  border: 0,
                },
              }}
              inputProps={{
                min: 0,
                maxLength: 2,
              }}
            />
            <Typography className="price_box_input_label">Thousand</Typography>
          </>
        )}
      </div>
    </div>
  );
}

export default PriceBox;
