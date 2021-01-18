import React from "react";
import Button from "./elements/Button";

const ResultCard = ({ result, addNomination, disabled }) => {
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
};

export default ResultCard;
