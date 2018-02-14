import React from "react";

const LinearGradient = props => {
  const { id, gradientTransform } = props;
  return (
    <linearGradient
      id={id}
      x1="0"
      x2="0"
      y1="0"
      y2="1"
      gradientTransform={gradientTransform}
    >
      <stop offset="0%" stopColor="#f6d365" />
      <stop offset="100%" stopColor="#fda085" />
    </linearGradient>
  );
};

export default LinearGradient;
