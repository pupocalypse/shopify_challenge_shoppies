import React from "react";

const Banner = ({ status }) => {
  const randomMovies = [
    "Tropic Thunder",
    "Clue",
    "A Bug's Life",
    "Little Miss Sunshine",
    "Ordinary People",
    "This Is Spinal Tap",
    "Raging Bull",
    "Shawshank Redemption",
    "Dumb and Dumber",
    "Saturday Night Fever",
    "Monty Python and the Holy Grail",
  ];
  const randomIndex = (arr) => {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
  };

  if (!status) {
    return null;
  } else {
    return (
      <section className="banner">
        <h3 className="banner__heading">Nominations complete!</h3>
        <p className="banner__text">
          Thank you for your selections. You may still make changes before
          finalizing your decision.
        </p>
        <span className="banner__span">
          Are you sure {randomIndex(randomMovies)} isn't one of your favourite
          movies?
        </span>
      </section>
    );
  }
};

export default Banner;
