import React from "react";
import "./ButtonContinue.css";

const ButtonContinue = ({ onClick }) => {
  return (
    <button className="btn--continue | fw-bold" onClick={onClick}>
      Continue
    </button>
  );
};

export default ButtonContinue;
