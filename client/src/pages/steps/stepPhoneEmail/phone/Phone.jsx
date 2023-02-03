import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonContinue from "../../../../components/button/ButtonContinue";
import { sendOtp } from "../../../../utils/fetchData";
import { setOtp } from "../../../../redux/authSlice";

import "./Phone.css";

const Phone = ({ onClick }) => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const getOtp = () => {
    sendOtp({ phone: phone }).then((res) => {
      console.log(res.data);
      dispatch(setOtp({ phone: res.data.phone, hash: res.data.hash }));
      onClick();
    });
  };

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
      <ButtonContinue onClick={getOtp} />
    </div>
  );
};

export default Phone;
