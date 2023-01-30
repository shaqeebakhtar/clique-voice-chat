import React, { useState } from "react";
import ButtonContinue from "../../../components/button/ButtonContinue";

import "./StepOtp.css";

const StepOtp = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="step--otp">
      <h3 className="fw-black fs-title">Enter OTP</h3>
      <p className="step--otp__text | fs-title-sm fw-bold">
        Code sent to +91 9876543210. Enter that code to proceed.
      </p>
      <input
        type="number"
        name="otp"
        id="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="btn--verify | fw-bold">Verify</button>
    </div>
  );
};

export default StepOtp;
