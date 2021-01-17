import React from "react";
import Button from "./elements/Button";

const Results = ({
  searchTerm,
  searchResults,
  addNomination,
  noResults,
  disabled,
}) => {
  const resultsList = searchResults.map((result) => {
    if (!result) {
      return (
        <div className="results__result">
          <p className="results__text">Loading...</p>
        </div>
      );
    } else {
      return (
        <div className="results__result" key={result.id}>
          <div className="results__text-container">
            <p className="results__text">
              {result.title}{" "}
              <span className="results__text--year">({result.year})</span>
            </p>
            <p className="results__text results__text--sub">
              Country: {result.country}
            </p>
            <p className="results__text results__text--sub">
              Genre: {result.genre}
            </p>
          </div>
          {result.nominated ? (
            <Button className="results__button results__button--nominated">
              Nominated!
            </Button>
          ) : (
            <Button
              className="results__button"
              clickHandler={() => addNomination(result)}
              disabled={disabled}
            >
              + Add Movie
            </Button>
          )}
        </div>
      );
    }
  });

  return (
    <section className="results">
      {searchResults.length < 1 ? (
        <>
          <div className="results__header-bar">
            <h3 className="results__heading">Results</h3>
          </div>
          <div className="results__no-matches-container">
            <p className="results__text">
              {noResults ? "No matches" : "Search for a movie"}
            </p>
          </div>
        </>
      ) : (
        <div className="results__header-bar">
          <h3 className="results__heading">
            Results for{" "}
            <span className="results__text results__text--search">
              "{searchTerm}"...
            </span>
          </h3>
        </div>
      )}
      {resultsList}
    </section>
  );
};

export default Results;
