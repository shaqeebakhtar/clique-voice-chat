import React from "react";
import SpaceCard from "../../components/spaceCard/SpaceCard";
import "./Spaces.css";

const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const Spaces = () => {
  return (
    <section className="spaces | container">
      <header className="spaces__header">
        <div className="spaces__header-left">
          <h3 className="fw-black fs-title-sm">Happening Now</h3>
          <p className="fs-body-sm text-neutral-300">
            Spaces live now, join and listen
          </p>
        </div>
        <div className="spaces__header-right">
          <div className="search-bar">
            <label htmlFor="search">
              <img src="../../../public/assets/search.svg" draggable="false" />
            </label>
            <input
              type="text"
              name="search"
              placeholder="Search spaces"
              id="search"
            />
          </div>
          <button className="btn--create-space | fw-bold">
            Create your space
          </button>
        </div>
      </header>
      <div className="spaces-list">
        {data.map((obj) => (
          <SpaceCard key={obj.id} />
        ))}
      </div>
    </section>
  );
};

export default Spaces;
