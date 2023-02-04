import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../utils/httpRequests";
import { setAuth } from "../../redux/authSlice";
import "./Header.css";

const Header = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="primary-header | container">
      <div>
        <Link to="/" className="logo | fw-black">
          Clique
        </Link>
      </div>
      <div>
        {!isAuth ? (
          <Link
            to="/"
            className="btn--login | fw-bold bg-neutral-900 text-neutral-100"
          >
            Sign In
          </Link>
        ) : (
          <button className="btn--logout | fw-bold" onClick={logoutUser}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
