import React from "react";

const SVG = props => {
  const { children, height = 100, width = 100 } = props;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

export default SVG;
