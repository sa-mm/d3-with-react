import React from "react";
import { line } from "d3-shape";

export const YAxis = ({ scale, data, accessor }) => {
  const yAxisLine = line()
    .x(d => 0)
    .y(d => scale(d[accessor]));

  return (
    <g>
      <path
        fill=""
        stroke="steelblue"
        strokeLinejoin="straight"
        strokeLinecap="straight"
        strokeWidth=".1"
        d={yAxisLine(data)}
      />
      {scale.ticks().map((tick, i) => {
        const y = scale(tick);
        return (
          <g
            key={`years-area-chart-y-axis-${i}`}
            transform={`translate(0,${y})`}
            fontSize={1}
            textAnchor="end"
          >
            <line
              x1={0}
              y1={0}
              x2={-1}
              y2={0}
              stroke={"steelblue"}
              strokeWidth={0.1}
            />
            <text dx={-1.5} dy={0.3}>
              {tick}
            </text>
          </g>
        );
      })}
    </g>
  );
};
