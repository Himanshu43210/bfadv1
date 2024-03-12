const ForgotPassword = () => {
  return (
    <div>
      {" "}
      <form className="login_form">
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
      </form>
    </div>
  );
};

export default ForgotPassword;
