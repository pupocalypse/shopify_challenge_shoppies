import React from "react";
import Loader from "./elements/Loader";

const SearchBar = ({ debouncer, loading }) => {
  return (
    <section className="search">
      <label htmlFor="search" className="search__label">
        Movie Title
        <input
          type="search"
          className="search__input"
          name="search"
          onChange={debouncer()}
          placeholder="Search..."
        />
        {loading ? (
          <div className="search__loader">
            <Loader />
          </div>
        ) : null}
      </label>
    </section>
  );
};

export default SearchBar;
