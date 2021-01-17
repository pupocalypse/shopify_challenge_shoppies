import React from "react";

const ScrollToTopButton = ({ scrollToTop }) => {
  return (
    <button className="scroll-button" onClick={scrollToTop}>
      <i className="fas fa-angle-up"></i>
    </button>
  );
};

export default ScrollToTopButton;
