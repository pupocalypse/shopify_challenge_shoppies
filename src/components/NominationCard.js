import React from "react";
import Button from "./elements/Button";

const NominationCard = ({ nomination, removeNomination }) => {
  return (
    <div className="nominations__nom" key={nomination.id}>
      <div className="nominations__text-container">
        <p className="nominations__text">
          {nomination.title}{" "}
          <span className="nominations__text--year">({nomination.year})</span>
        </p>
      </div>
      <Button
        className="nominations__button"
        clickHandler={() => removeNomination(nomination)}
      >
        - Remove Movie
      </Button>
    </div>
  );
};

export default NominationCard;
