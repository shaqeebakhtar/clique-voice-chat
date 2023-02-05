import React from "react";
import { Link } from "react-router-dom";
import "./SpaceCard.css";

const SpaceCard = () => {
  const colors = {
    0: "#FFBD56",
    1: "#FFADAD",
    2: "#FFD6A5",
    3: "#FFC6FF",
    4: "#CAFFBF",
    5: "#9BF6FF",
    6: "#BDB2FF",
    7: "#A0C4FF",
  };

  const getRandomInt = () => {
    return Math.floor(Math.random() * (7 - 0 + 1)) + 0;
  };

  return (
    <div
      className="space | gap"
      style={{ backgroundColor: colors[getRandomInt()] }}
    >
      <div className="host">
        <span className="host-label | fs-body-x-sm">Host</span>
        <p
          className="fw-bold fs-body-sm"
          style={{ textTransform: "capitalize" }}
        >
          john doe
        </p>
      </div>
      <h4 className="space-topic | fw-black fs-title-sm">
        Paranormal/Horror Experience Spare (Ask For Mic)
      </h4>
      <div className="space__footer">
        <div className="liteners">
          <img
            className="listener__avatar"
            src="https://source.unsplash.com/random/?avatar"
            alt=""
          />
          <img
            className="listener__avatar"
            src="https://source.unsplash.com/random/?people"
            alt=""
          />
          <img
            className="listener__avatar"
            src="https://source.unsplash.com/random/?person"
            alt=""
          />
          <div className="listeners__count | fw-bold">
            <span>+99</span>
          </div>
        </div>
        <Link to="/" className="btn--join | fw-bold fs-body-sm">
          Join
        </Link>
      </div>
    </div>
  );
};

export default SpaceCard;
