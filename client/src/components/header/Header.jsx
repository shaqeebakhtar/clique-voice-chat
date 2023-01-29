import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="primary-header | container">
      <div>
        <Link to="/" className="logo | fw-black">
          Clique
        </Link>
      </div>
      <div>
        <Link
          to="/"
          className="btn--login | fw-bold bg-neutral-900 text-neutral-100"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
