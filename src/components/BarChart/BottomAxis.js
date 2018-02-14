import React from "react";

export const BottomAxis = props => {
  const { offset = 0, barWidth, height = 0, width, data } = props;

  return (
    <g
      fill="none"
      fontSize="1"
      fontFamily="sans-serif"
      textAnchor="middle"
      transform={`translate(${offset},${height - offset})`}
    >
      <line x1="0" y1="0" x2={width} y2="0" strokeWidth="0.10" stroke="black" />
      {data.map((d, idx) => {
        const tickPosition = idx * barWidth;
        return (
          <g
            key={`axis-tick-${idx}`}
            transform={`translate(${(barWidth - 1) / 2},0)`}
          >
            <line
              x1={tickPosition}
              y1="0"
              x2={tickPosition}
              y2="1"
              strokeWidth="0.10"
              stroke="black"
            />
            <text fill="#000" x={tickPosition} y={1.5} dy="0.71em">
              {d[0]}
            </text>
          </g>
        );
      })}
    </g>
  );
};
