import React from "react";
import ButtonContinue from "../../../components/button/ButtonContinue";

const StepProfile = ({ onClick }) => {
  return (
    <div className="step--profile">
      <h3 className="fw-black fs-title">Create your profile</h3>
      <ButtonContinue onClick={onClick} />
    </div>
  );
};

export default StepProfile;
