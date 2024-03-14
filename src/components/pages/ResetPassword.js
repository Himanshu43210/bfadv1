import React, { useEffect, useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
