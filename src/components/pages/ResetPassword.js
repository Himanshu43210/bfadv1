import { useRouter } from "next/router";
import React, { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://bfservices.trainright.fit/api/users/reset_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token, newPassword: password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert("Password changed successfully");
          router.push("/login");
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
      <h2>Sign In (Already Registered)</h2>
      <form onSubmit={handleSubmit} className="login_form">
        <div className="form-group">
          <label>Password</label>
          <input
            className="inpt normal_input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
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
        ></div>
        <button type="submit" className="btn">
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
