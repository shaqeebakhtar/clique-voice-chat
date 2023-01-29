import React, { useState } from "react";
import StepPhoneEmail from "../steps/stepPhoneEmail/StepPhoneEmail";
import StepOtp from "../steps/stepOtp/StepOtp";
import StepProfile from "../steps/stepProfile/StepProfile";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepProfile,
};

const Register = () => {
  const [step, setStep] = useState(1);
  const Step = steps[step];

  const onContinue = () => {
    setStep((prev) => prev + 1);
  };

  return <Step onClick={onContinue} />;
};

export default Register;
