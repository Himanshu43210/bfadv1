import React, { useEffect, useRef, useState } from "react";
import { Button, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import SnackBar from "./SnackBar.jsx";
import { auth } from "../../firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  ADD_CUSTOMER,
  ALTER_USER_DATA,
  POST,
  REACH_OUT,
  ROUTE_BUTTON,
} from "../utils/Const.js";
import AccountMenu from "./AccountMenu.jsx";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "../../redux/utils/apiActions.js";
import { API_ENDPOINTS } from "../../redux/utils/api.js";
import {
  storeCustomerData,
  clearCustomerData,
} from "../../redux/slice/customerSlice.js";
import { newAgentConst } from "../fieldConsts/UserFieldConst.js";
import { storeUserData } from "../../redux/slice/userSlice.js";
import { useRouter } from "next/navigation.js";
import dynamic from "next/dynamic";

function comp() {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formStage, setFormStage] = useState(0);
  const [popupStage, setPopupStage] = useState(0);
  const [mode, setMode] = useState();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({});
  const [visited, setVisited] = useState(false);
  const [captchaGenerated, setCaptchaGenerated] = useState(false);
  const initialLoad = useRef(true);
  let isMobile = false;
  const dispatch = useDispatch();
  const navigate = useRouter();

  const customerProfile = useSelector((state) => state.customer);
  const user = useSelector((state) => state.profile);
  // const handleScrollEvent = () => {
  //   if (initialLoad.current && window.scrollY > 1200) {
  //     handleReachOutToMe();
  //   }
  //   if (!initialLoad.current) {
  //     handleRemoveEL();
  //   }
  // };

  // const handleRemoveEL = () => {
  //   window.removeEventListener("scroll", () => {
  //     handleScrollEvent();
  //   });
  // };

  useEffect(() => {
    if (window !== "undefined") {
      isMobile = window.innerWidth < 768;
    }
    if (!customerProfile || Object.keys(customerProfile).length === 0) {
      const customer = localStorage.getItem("customer");
      if (customer !== undefined || customer !== "undefined") {
        const customerData = JSON.parse(customer);
        dispatch(storeCustomerData(customerData));
      }
    }
    // if (window.location.pathname === "/") {
    //   window.addEventListener("scroll", handleScrollEvent);
    //   return handleRemoveEL;
    // }
  }, []);

  const registerAgent = {
    type: ROUTE_BUTTON,
    className: "form-route-btn",
    label: "Sign Up (New Broker)",
    name: "Sign Up (New Broker)",
    form: newAgentConst,
    onSaveApi: ALTER_USER_DATA,
    route: "/agent/form",
  };

  const handleCancelSignin = () => {
    setOpen(false);
    setOpenForm(false);
    setVisited(false);
    setFormData({});
    setFormStage(0);
    setPopupStage(0);
    setCaptchaGenerated(false);
    if (mode === "REACHME") {
      initialLoad.current = false;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("customer");
    setFormStage(0);
    dispatch(clearCustomerData());
    navigate.push("/");
  };

  const handleInput = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const routeEntry = (key) => {
    if (mode === "SIGNIN" || key === "SIGNIN") {
      // show signin form
      setOpenForm(true);
      setOpen(false);
    } else if (key === "CUSTOMER" && mode === "SIGNUP") {
      // show signup form
      setOpenForm(true);
      setOpen(false);
    } else if (key === "AGENT" && mode === "SIGNUP") {
      dispatch(
        storeUserData({
          ...user,
          formType: registerAgent.form,
          formSaveApi: registerAgent.onSaveApi,
          formName: registerAgent.label,
          autofill: registerAgent.autofill,
        })
      );
      navigate.push(registerAgent.route);
    } else if (mode === "REACHME" || key === "REACHME") {
      setOpenForm(true);
      setOpen(false);
    }
  };

  const handleResendOtp = () => {
    setFormData((currFormData) => {
      return { ...currFormData, otp: "" };
    });
    handleDataSubmit();
  };

  const generateRecaptcha = () => {
    if (captchaGenerated) return;
    setCaptchaGenerated(true);
    console.log("=== GENERAE RECAPTCHA ===");
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "sign-in-recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("=== RECAPTCHA VERIFIER ===", response);
          // setSnackbar({ open: true, message: `Captcha failed. Try again.`, status: 1 });
        },
      }
    );
  };

  const handleDataSubmit = () => {
    if (
      (mode === "SIGNIN" && formData.phoneNumber) ||
      (mode === "SIGNUP" && formData.phoneNumber && formData.fullName) ||
      (mode === "REACHME" && formData.phoneNumber)
    ) {
      setLoading(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      console.log("=== appVerifier ===", appVerifier);
      signInWithPhoneNumber(auth, `+91${formData.phoneNumber}`, appVerifier)
        .then((confirmationResult) => {
          setFormStage(1);
          setSnackbar({
            open: true,
            message: `An OTP has been sent to ${formData.phoneNumber}.`,
            status: 1,
          });
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log("=== OTP LOGIN ERROR ===", formData.phoneNumber, error);
          setFormStage(0);
          setSnackbar({
            open: true,
            message: `Sorry! Too many requests. Try later.`,
            status: 1,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSnackbar({
        open: true,
        message: `Error: Required field(s) empty.`,
        status: 1,
      });
    }
  };

  const handleOtpSubmit = () => {
    if (formData.otp?.length === 6) {
      setLoading(true);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(formData.otp)
        .then((result) => {
          console.log("+++++ OTP VERIFICATION SUCCESSFUL +++++", result);
          // send the result to the server to save the user
          const headers = { "Content-Type": "application/json" };
          const data = {
            fullName: formData.fullName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
          };
          const options = {
            url:
              mode === "SIGNUP"
                ? API_ENDPOINTS[ADD_CUSTOMER]
                : mode === "SIGNIN"
                ? API_ENDPOINTS["signInCustomer"]
                : API_ENDPOINTS[REACH_OUT],
            method: POST,
            headers,
            data,
          };
          dispatch(callApi(options))
            .then((res) => {
              console.log(">>>>>>> CUSTOMER REGISTERED <<<<<<<", res);
              if (mode === "SIGNIN") {
                if (res.payload?.user) {
                  dispatch(
                    storeCustomerData({
                      ...res.payload.user,
                      agent: res.payload.agent,
                    })
                  );
                  localStorage.setItem(
                    "customer",
                    JSON.stringify({
                      ...res.payload.user,
                      agent: res.payload.agent,
                    })
                  );
                  setFormData({ fullName: "", phoneNumber: "", otp: "" });
                }
              } else if (mode === "SIGNUP") {
                if (res.payload?.data) {
                  dispatch(storeCustomerData(res.payload.data));
                  localStorage.setItem(
                    "customer",
                    JSON.stringify(res.payload.data)
                  );
                  setFormData({
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    otp: "",
                  });
                }
              } else if (mode === "REACHME") {
                console.log(
                  "+++++++++++++ REACH OUT SUCCESS ++++++++++++++",
                  res.payload
                );
                setSnackbar({
                  open: true,
                  message: `Thank you! We will reach out to you on ${formData.phoneNumber} as soon as possible.`,
                  status: 1,
                  autoHideDuration: 8000,
                });
                if (res.payload) {
                  setFormData({
                    fullName: "",
                    phoneNumber: "",
                    email: "",
                    otp: "",
                  });
                  setOpenForm(false);
                }
              }
            })
            .catch((error) => {
              console.log("----- customer registration error -----", error);
              setSnackbar({ open: true, message: error.message, status: 1 });
            });
        })
        .catch((error) => {
          console.log("-------- otp verification error -------", error);
          setSnackbar({
            open: true,
            message: `Please enter correct OTP.`,
            status: 1,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSnackbar({ open: true, message: `Invalid OTP.`, status: 1 });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("===== otp login submit =====", formData);
    if (formStage === 0) {
      handleDataSubmit();
    } else if (formStage === 1) {
      handleOtpSubmit();
    }
  };

  const snackbarClose = (status) => {
    setSnackbar({
      open: false,
      message: "",
    });
  };

  const handleMenuClose = () => {
    setOpen(false);
    setVisited(false);
  };

  // const handleReachOutToMe = () => {
  //   setMode("REACHME");
  //   routeEntry("REACHME");
  // };

  const renderDetailsForm = () => {
    return (
      <form className="otp_login_form">
        <div className="ol_form_fields_container">
          {mode === "SIGNUP" && (
            <>
              <label className="field_label">Enter Full Name*</label>
              <input
                type="text"
                value={formData.fullName}
                className="ol_input_field name_input"
                name="name"
                id="name"
                required={true}
                onInput={(e) => handleInput("fullName", e.target.value)}
              />
              <label className="field_label">Enter Email</label>
              <input
                type="text"
                value={formData.email}
                className="ol_input_field name_input"
                name="name"
                id="name"
                required={true}
                onInput={(e) => handleInput("email", e.target.value)}
              />
            </>
          )}
          <label className="field_label">Enter Phone Number*</label>
          <input
            type="number"
            value={formData.phoneNumber}
            className="ol_input_field phone_input"
            name="phoneNumber"
            id="phoneNumber"
            required={true}
            onInput={(e) => handleInput("phoneNumber", e.target.value)}
          />
        </div>
        <div className="form_btns_wrapper">
          <Button
            type="submit"
            className="form_btn ol_submit_btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span>Sending...</span> : <span>Send OTP</span>}
          </Button>
          <Button
            type="reset"
            variant="outlined"
            className="form_btn ol_cancel_btn"
            onClick={handleCancelSignin}
          >
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  const renderOtpForm = () => {
    return (
      <form className="otp_login_form">
        <div className="ol_form_fields_container">
          <label className="field_label">Enter OTP*</label>
          <input
            type="number"
            value={formData.otp}
            className="ol_input_field otp_input"
            name="otp"
            id="otp"
            required={true}
            onInput={(e) => handleInput("otp", e.target.value)}
          />
          <div className="resend_otp_wrapper">
            <Button
              type="button"
              className="ol_resend_btn"
              onClick={handleResendOtp}
            >
              Didn't received OTP? Resend.
            </Button>
          </div>
        </div>
        <div className="form_btns_wrapper">
          <Button
            type="submit"
            className="form_btn ol_submit_btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            <span>{loading ? "Sending.." : "Submit"}</span>
          </Button>
          <Button
            type="reset"
            variant="outlined"
            className="form_btn ol_cancel_btn"
            onClick={handleCancelSignin}
          >
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  const renderHeader = () => {
    return (
      <div className="section_header ol_header">
        <div className="header_left">
          <Typography variant="h3" className="detailcardheading header_title">
            {mode === "SIGNIN"
              ? "Sign In (Already Registered)"
              : mode === "SIGNUP"
              ? "Sign Up (New User)"
              : "Reach out to Me"}
          </Typography>
        </div>
        <div className="header_right">
          <Button className="bot_btn" onClick={handleCancelSignin}>
            <CloseOutlinedIcon className="chatbot_close" />
          </Button>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    switch (formStage) {
      case 0:
        return renderDetailsForm();
      case 1:
        return renderOtpForm();
      default:
        return null;
    }
  };

  const renderFormPopup = () => {
    return (
      <>
        <div className="ol_overlay" onClick={handleCancelSignin}></div>
        <div className="ol_popup">
          {renderHeader()}
          {renderForm()}
          <div id="sign-in-recaptcha"></div>
        </div>
      </>
    );
  };

  const renderPopup = () => {
    return (
      <div className="menu_popup" onMouseEnter={() => setVisited(true)}>
        {popupStage === 0 ? (
          <div className="btns_group">
            {/* sign in btn */}
            <button
              className="popup_btn"
              onClick={() => {
                setMode("SIGNIN");
                routeEntry("SIGNIN");
              }}
            >
              Sign In (Already Registered)
            </button>
            {/* sign up btn */}
            <button
              className="popup_btn"
              onClick={() => {
                setPopupStage(1);
                setMode("SIGNUP");
              }}
            >
              Sign Up (New User)
            </button>
            <button
              className="popup_btn"
              onClick={() => {
                handleReachOutToMe();
              }}
            >
              Reach out to Me
            </button>
          </div>
        ) : (
          <div className="btns_group">
            <div className="popup_head">
              <button
                className="popup_icon_btn"
                onClick={() => {
                  setPopupStage(0);
                  setMode();
                }}
              >
                <ArrowBackIcon className="back_icon" />
                Back
              </button>
            </div>
            {/* Customer */}
            <button
              className="popup_btn"
              onClick={() => routeEntry("CUSTOMER")}
            >
              Sign Up As Customer
            </button>
            <button className="popup_btn" onClick={() => routeEntry("AGENT")}>
              Sign Up As Broker
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {customerProfile && Object.keys(customerProfile).length !== 0 ? (
        <AccountMenu userProfile={customerProfile} onSignOut={handleSignOut} />
      ) : (
        <div
          className="otp_login_component"
          onMouseLeave={() => {
            if (visited || isMobile) {
              handleMenuClose();
            }
          }}
        >
          <Button
            className={`ol_open_btn signin_btn h-[40px] w-[100px] mr-3`}
            onClick={() => setOpen(!open)}
          >
            Sign In
          </Button>
          {open && renderPopup()}
          {openForm && renderFormPopup()}
        </div>
      )}
      <SnackBar
        open={snackbar?.open}
        message={snackbar?.message}
        onClose={(status) => snackbarClose(status)}
      />
    </>
  );
}

const OtpLogin = dynamic(() => Promise.resolve(comp), { ssr: false });

export default OtpLogin;
