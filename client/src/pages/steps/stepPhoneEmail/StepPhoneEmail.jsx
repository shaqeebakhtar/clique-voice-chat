import React from "react";
import ButtonContinue from "../../../components/button/ButtonContinue";

const StepPhoneEmail = ({ onClick }) => {
  return (
    <section className="step">
      <h3 className="fw-black fs-title">Enter Phone or Email</h3>
      <div className="input">
        <div>
          <img
            src="../../../../public/assets/flag.png"
            alt="indian flag"
            draggable="false"
          />
          <span>+91</span>
        </div>
        <input type="number" name="phone" placeholder="888-888-8888" />
      </div>
      <ButtonContinue onClick={onClick} />
    </section>
  );
};

export default StepPhoneEmail;
