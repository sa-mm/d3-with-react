import React from "react";
import Circle from "./Circle";

const SVG = props => {
  return (
    <svg
      width="auto"
      height="auto"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="Gradient"
          x1="0"
          x2="0"
          y1="0"
          y2="1"
          gradientTransform="rotate(65)"
        >
          <stop offset="0%" stop-color="#f6d365" />
          <stop offset="100%" stop-color="#fda085" />
        </linearGradient>
      </defs>
      <Circle />
    </svg>
  );
};

export default SVG;
