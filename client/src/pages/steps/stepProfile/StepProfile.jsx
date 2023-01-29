import React from "react";
import ButtonContinue from "../../../components/button/ButtonContinue";

const StepProfile = ({ onClick }) => {
  return (
    <section>
      <h3 className="fw-black fs-title">Create your profile</h3>
      <ButtonContinue onClick={onClick} />
    </section>
  );
};

export default StepProfile;
