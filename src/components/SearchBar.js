import React from "react";

const SearchBar = ({ debouncer }) => {
  return (
    <section className="search">
      <label htmlFor="search" className="search__label">
        Movie Title
      </label>
      <input
        type="search"
        className="search__input"
        name="search"
        onChange={debouncer()}
        placeholder="Search..."
      />
    </section>
  );
};

export default SearchBar;
