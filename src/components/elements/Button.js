import React from "react";

const Button = ({
  className,
  clickHandler = () => {},
  disabled = false,
  children,
}) => {
  return (
    <button className={className} onClick={clickHandler} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
