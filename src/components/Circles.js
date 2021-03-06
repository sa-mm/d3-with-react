import React from "react";
import Circle from "./Circle";
import LinearGradient from "./LinearGradient";

const SVG = props => {
  const cxOrigins = Array.from(Array(5), (x, i) => 10 + i * 20);
  const gradientTransforms = Array.from(Array(5), (x, i) => 65 + i * 5);
  return (
    <div>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {gradientTransforms.map((degree, i) => {
            const id = `CircleGradient${i}`;
            return (
              <LinearGradient
                key={id}
                id={id}
                gradientTransform={`rotate(${degree})`}
              />
            );
          })}
        </defs>
        <g>
          {cxOrigins.map((cx, i) => (
            <Circle
              key={`circle${i}`}
              cx={cx}
              cy="10"
              r="10"
              fill={`url(#CircleGradient${i})`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default SVG;
