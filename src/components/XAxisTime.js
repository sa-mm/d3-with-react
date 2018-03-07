import React from "react";

import { line } from "d3-shape";

export const XAxisTime = ({
  transform = "",
  scale,
  data,
  ticksWithData,
  accessor,
  width,
  height,
  selectedEvent,
  handleEventClick
}) => {
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
      {ticksWithData.map(({ tick, event }, i) => {
        const xCoordinate = scale(tick);
        return (
          event && (
            <g key={`x-axis-tick-${i}`} fontSize={1}>
              <g transform={`translate(${width / 2},${-height / 4})`}>
                <text
                  textAnchor="middle"
                  style={{ display: selectedEvent === i ? "initial" : "none" }}
                >
                  {event || null}
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
          )
        );
      })}
    </g>
  );
};
