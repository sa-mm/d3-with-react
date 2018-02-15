import React from "react";
import { max } from "d3-array";
import { scaleLinear } from "d3-scale";
import {
  line,
  curveMonotoneX,
  curveNatural,
  curveLinear,
  curveBasis
} from "d3-shape";
import SVG from "../SVG";
import { HappyFisherGradient, SaintPetersburgGradient } from "./index";

const LineChart = props => {
  const { height, width, data, curve } = props;
  const padding = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  };
  const yScale = scaleLinear()
    .domain([0, max(data, d => d.value)])
    .range([height - padding.top - padding.bottom, 0]);

  const xOffset = width / data.length;
  const xPadding = 5;

  const curveHash = {
    curveMonotoneX,
    curveNatural,
    curveLinear,
    curveBasis
  };

  const pathLine = line()
    .x((d, i) => xPadding + i * xOffset)
    .y(d => yScale(d.value))
    .curve(curveHash[curve]);

  return (
    <SVG {...{ height, width }}>
      <defs>
        {/* Pulling the Gradients out seems to make sense, but then you have to remember to id them correctly. */}
        <HappyFisherGradient />
        <SaintPetersburgGradient />
      </defs>

      <g transform={`translate(${padding.left},${padding.top})`}>
        <path
          fill="none"
          stroke="url(#SaintPetersburgGradient)"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="0.25"
          d={pathLine(data)}
        />
        {data.map((d, i) => {
          const xOrigin = i * xOffset + xPadding;
          return (
            <g
              key={`linechart-dot-${i}`}
              transform={`translate(${xOrigin},${yScale(d.value)})`}
            >
              <circle cx={0} cy={0} r={1} fill="url(#HappyFisherGradient)" />
              <text fontSize="1">
                {d.letter} {d.value}
              </text>
            </g>
          );
        })}

        {/* xAxis */}
        <g transform={`translate(0, ${height - padding.top - padding.bottom})`}>
          <line
            x1={0}
            y1={0}
            x2={width - padding.left - padding.right}
            y2={0}
            strokeWidth="0.1"
            stroke="black"
          />
          <g transform={`translate(${xPadding}, 0)`}>
            {data.map((d, i) => {
              const xOrigin = i * xOffset;
              return (
                <g
                  key={`x-axis-tick-${i}`}
                  transform={`translate(${xOrigin},0)`}
                >
                  <line
                    x1={0}
                    y1={0}
                    x2={0}
                    y2={1}
                    stroke="black"
                    strokeWidth="0.1"
                  />
                  <text fontSize="1" textAnchor="middle" dy="2em">
                    {d.letter}
                  </text>
                </g>
              );
            })}
          </g>
        </g>

        {/* yAxis */}
        <g>
          <line
            x1={0}
            y1="0"
            x2={0}
            y2={height - padding.top - padding.bottom}
            strokeWidth="0.1"
            stroke="black"
          />
          {yScale.ticks().map((tick, i) => {
            return (
              <g
                key={`y-axis-tick-${i}`}
                transform={`translate(0,${yScale(tick)})`}
              >
                <line
                  x1="0"
                  y1={"0"}
                  x2="-1"
                  y2="0"
                  strokeWidth="0.1"
                  stroke="black"
                />
                <text fontSize="1" dx="-2em" dy="0.32em" textAnchor="middle">
                  {tick}
                </text>
              </g>
            );
          })}
        </g>
      </g>
    </SVG>
  );
};

export default LineChart;
