import React from "react";

const Nominations = ({ nominations, removeNomination, nomCount }) => {
  const nomsList = nominations.map((nom) => {
    return (
      <div className="nominations__nom" key={nom.id}>
        <div className="nominations__text-container">
          <p className="nominations__text">
            {nom.title}{" "}
            <span className="nominations__text--year">({nom.year})</span>
          </p>
        </div>
        {nom.nominated ? (
          <button
            className="nominations__button"
            onClick={() => removeNomination(nom)}
          >
            - Remove Movie
          </button>
        ) : null}
      </div>
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
          <div className="nominations__text-container">
            <p className="nominations__text">
              No nominations yet. Search for your favourite movie to get
              started!
            </p>
          </div>
        </div>
      ) : (
        nomsList
      )}
    </section>
  );
};

export default Nominations;
