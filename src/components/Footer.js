import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__left-container">
        <p className="footer__text">
          Application by
          <br />
          <span className="footer__text--emph">Jess Hilliam</span>
          <br />
          for Shopify Internship Winter 2021
        </p>
      </div>
      <div className="footer__right-container">
        <p className="footer__text">
          <span className="footer__text--emph">Jess' Nominations:</span>
          <br />
          Ace Ventura: When Nature Calls, A Knight's Tale, Little Miss Sunshine,
          Up, Zoolander
        </p>
      </div>
    </footer>
  );
};

export default Footer;
