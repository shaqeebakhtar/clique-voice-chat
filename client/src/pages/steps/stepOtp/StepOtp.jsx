import React from "react";
import ButtonContinue from "../../../components/button/ButtonContinue";

const StepOtp = ({ onClick }) => {
  return (
    <section>
      <h3 className="fw-black fs-title">Enter OTP</h3>
      <p>Code sent to +91 9876543210. Enter that code to proceed.</p>
      <div className="otp-input">
        <input type="number" />
        <input type="number" />
        <input type="number" />
        <input type="number" />
      </div>
      <ButtonContinue onClick={onClick} />
    </section>
  );
};

export default StepOtp;
