import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { EMAIL } from "../utils/Const.js";
import Link from "next/link";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://bfservices.trainright.fit/api/users/forgotPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          router.push("/resetPassword");
        } else {
          console.error("Failed to send email. Message: ", data.message);
        }
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <div className="contain">
      <form onSubmit={handleSubmit} className="login_form">
        <div className="form-group">
          <label className="lab-class">Email</label>
          <input
            className="normal_input"
            type={EMAIL}
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "right",
            color: "white",
          }}
        >
          <Link href="/login">Login</Link>
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
