import React from "react";
import { line } from "d3-shape";

export const XAxis = ({ transform = "", scale, data, accessor }) => {
  const pathLine = line()
    .x((d, i) => scale(d[accessor]))
    .y(d => 0);

  return (
    <g transform={transform}>
      <path
        fill=""
        stroke="steelblue"
        strokeLinejoin="straight"
        strokeLinecap="straight"
        strokeWidth=".1"
        d={pathLine(data)}
      />
      {scale.ticks().map((tick, i) => {
        const xCoordinate = scale(tick);
        return (
          <g
            key={`years-area-chart-${i}`}
            fontSize={1}
            transform={`translate(${xCoordinate},0)`}
          >
            <line
              x1={0}
              y1={0}
              x2={0}
              y2={1}
              strokeWidth={0.1}
              stroke="steelblue"
            />
            <text dy={1.75} dx={0.75} transform={`rotate(45)`}>
              {tick}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export const XAxisTime = ({
  transform = "",
  scale,
  data,
  accessor,
  width,
  height,
  hasHover,
  mouseEnterHandler,
  mouseLeaveHandler
}) => {
  const pathLine = line()
    .x((d, i) => scale(d[accessor]))
    .y(d => 0);

  return (
    <g transform={transform}>
      <line
        stroke="steelblue"
        strokeWidth=".5"
        x1="0"
        y1="0"
        x2={width}
        y2="0"
      />
      {scale.ticks(data.length).map((tick, i) => {
        const xCoordinate = scale(tick);
        return (
          <g key={`x-axis-tick-${i}`} fontSize={1}>
            <g transform={`translate(${width / 2},${-height / 4})`}>
              <text
                textAnchor="middle"
                style={{ display: hasHover === i ? "initial" : "none" }}
              >
                {data[i].event}
              </text>
            </g>
            <g transform={`translate(${xCoordinate},0)`}>
              <circle
                cx="0"
                cy="0"
                r="1"
                fill="steelblue"
                onMouseEnter={mouseEnterHandler(i)}
                onMouseLeave={mouseLeaveHandler(i)}
              />
              <text dy={1.75} dx={0.75} transform={`rotate(45)`}>
                {tick.toDateString()}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
};
