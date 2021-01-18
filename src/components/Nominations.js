import React from "react";
import NominationCard from "./NominationCard";

const Nominations = ({ nominations, removeNomination, nomCount }) => {
  const nomsList = nominations.map((nom) => {
    return (
      <NominationCard nomination={nom} removeNomination={removeNomination} />
    );
  });

  return (
    <section className="nominations">
      <div className="nominations__header-bar">
        <h3 className="nominations__heading">Nominations</h3>
        <p className="nominations__countdown">
          <span className="nominations__countdown nominations__countdown--accent">
            {nomCount}
          </span>{" "}
          {nomCount === 1 ? "nomination" : "nominations"} left
        </p>
      </div>
      {nominations.length < 1 ? (
        <div className="nominations__no-noms-container">
          <p className="nominations__text">
            No nominations yet. Search for your favourite movie to get started!
          </p>
        </div>
      ) : (
        nomsList
      )}
    </section>
  );
};

export default Nominations;
