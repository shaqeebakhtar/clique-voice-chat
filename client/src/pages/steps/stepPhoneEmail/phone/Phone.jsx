import React, { useState } from "react";
import ButtonContinue from "../../../../components/button/ButtonContinue";

import "./Phone.css";

const Phone = ({ onClick }) => {
  const [phone, setPhone] = useState("");

  return (
    <div className="step--phone">
      <label className="input-label | fs-body-sm" htmlFor="phone">
        Enter your phone no.
      </label>
      <div className="input-wrapper">
        <label htmlFor="phone" className="country-code">
          <img
            src="../../../../public/assets/flag.png"
            alt="indian flag"
            draggable="false"
          />
          <span className="fw-medium">+91</span>
        </label>
        <input
          type="number"
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="888-888-8888"
        />
      </div>
      <ButtonContinue onClick={onClick} />
    </div>
  );
};

export default Phone;
