import React from "react";

export const LeftAxis = props => {
  const { scale, offset = 0, height } = props;

  return (
    <g transform={`translate(${(offset, offset)})`}>
      <line
        x1={0}
        y1={offset}
        x2={0}
        y2={height - offset}
        strokeWidth="0.10"
        stroke="black"
      />
      {scale.ticks().map((tick, idx) => {
        const yPosition = scale(tick);
        return (
          <g
            key={`y-axis-tick-${idx})`}
            fontSize="1"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            <line
              x1="0"
              y1={yPosition}
              x2="-1"
              y2={yPosition}
              strokeWidth="0.10"
              stroke="black"
            />
            <text fill="#000" x="-1.5" y={yPosition} dx="-0.71em" dy="0.34em">
              {tick}
            </text>
          </g>
        );
      })}
    </g>
  );
};
