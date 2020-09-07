import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__left-container">
        <p className="footer__text">
          Application by <br className="footer__break" />
          <span className="footer__text--emph">Jess Hilliam</span>
          <br />
          for Shopify Internship Winter 2021
        </p>
        <div className="footer__contact-links">
          <a
            href="https://github.com/pupocalypse/shopify_challenge_shoppies"
            className="footer__link"
            target="_blank"
          >
            <p className="footer__text">GitHub</p>
          </a>{" "}
          |{" "}
          <a
            href="https://www.linkedin.com/in/jess-hilliam/"
            className="footer__link"
            target="_blank"
          >
            <p className="footer__text">LinkedIn</p>
          </a>
        </div>
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
