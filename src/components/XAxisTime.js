import React from "react";

import { line } from "d3-shape";

export const XAxisTime = ({
  transform = "",
  scale,
  data,
  accessor,
  width,
  height,
  selectedEvent,
  handleEventClick
}) => {
  const pathLine = line()
    .x((d, i) => scale(d[accessor]))
    .y(d => 0);

  const selectedEventStyle = {
    fill: "url(#PhoenixStart)"
  };
  return (
    <g transform={transform}>
      <line
        stroke="url(#SkyGradient)"
        strokeWidth=".5"
        x1="0"
        y1="0"
        x2={width}
        y2="0.001"
      />
      {scale.ticks(data.length).map((tick, i) => {
        const xCoordinate = scale(tick);
        const dates = Object.values(data).map(e =>
          new Date(e.date).toDateString()
        );
        const relIdx = dates.findIndex(
          dateStr => dateStr === tick.toDateString()
        );
        return (
          <g key={`x-axis-tick-${i}`} fontSize={1}>
            <g transform={`translate(${width / 2},${-height / 4})`}>
              <text
                textAnchor="middle"
                style={{ display: selectedEvent === i ? "initial" : "none" }}
              >
                {relIdx > 0 && data[relIdx].event}
              </text>
            </g>
            <g transform={`translate(${xCoordinate},0)`}>
              <circle
                style={selectedEvent === i ? selectedEventStyle : {}}
                cx="0"
                cy="0"
                r="2"
                fill="url(#SnowAgain)"
                onClick={handleEventClick(i)}
              />
              <text dy={3} dx={2.5} transform={`rotate(45)`}>
                {tick.toDateString()}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
};
