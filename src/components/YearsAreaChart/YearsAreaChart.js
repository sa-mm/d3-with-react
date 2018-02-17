import React from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { random } from "lodash";
import { area, line } from "d3-shape";

import SVG from "../SVG";

const last = arr => {
  if (arr.length === 0) return { value: 0 };

  return arr[arr.length - 1];
};

const randomNum = lastInt => {
  const lowest = lastInt - 5 <= 0 ? 5 : lastInt;
  return random(lowest, lowest + 10);
};
const smoothRandomNumbers = ([head, ...tail] = Array(300), i = 0, acc = []) => {
  const r = randomNum(last(acc).value);
  const newAcc = [...acc, { year: 1700 + i, value: r }];
  if (tail.length === 0) return newAcc;

  return smoothRandomNumbers(tail, i + 1, newAcc);
};
// const data = smoothRandomNumbers();

const data = Array.from(Array(300)).reduce((acc, e, i) => {
  const r = randomNum(last(acc).value);
  return [...acc, { year: i + 1700, value: r }];
}, []);

const YearsAreaChart = props => {
  const margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  };

  const width = 100 - margin.right - margin.left;
  const height = 50 - margin.top - margin.bottom;

  const valuesExtent = extent(data, d => d.value);
  const yScale = scaleLinear()
    .domain(valuesExtent)
    .range([height, 0]);

  const yearsExtent = extent(data, d => d.year);
  const xScale = scaleLinear()
    .domain(yearsExtent)
    .range([0, width]);

  const xOffset = width / data.length;
  const pathArea = area()
    .x(d => xScale(d.year))
    .y1(d => yScale(d.value))
    .y0(yScale(valuesExtent[0]));

  const pathLine = line()
    .x((d, i) => xScale(d.year))
    .y(d => 0);

  const yAxisLine = line()
    .x(d => 0)
    .y(d => yScale(d.value));

  return (
    <div>
      YearsLinechart{" "}
      <SVG>
        <defs>
          {/* background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%); */}
          <linearGradient id="LemonGate" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#96fbc4 " />
            <stop offset="100%" stopColor="#f9f586  " />
          </linearGradient>
          <linearGradient
            id="SaintPetersburgGradient"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
          >
            <stop offset="0%" stopColor="#c3cfe2" />
            <stop offset="100%" stopColor="#f5f7fa" />
          </linearGradient>
          <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#05a" />
            <stop offset="100%" stopColor="#0a5" />
          </linearGradient>
          <linearGradient
            id="e"
            x1="40"
            y1="210"
            x2="460"
            y2="210"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="steelblue" offset="0" />
            <stop stopColor="red" offset="1" />
          </linearGradient>
        </defs>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <path
            fill="url(#LemonGate)"
            stroke=""
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="0.1"
            d={pathArea(data)}
          />

          {/* xAxis */}
          <g transform={`translate(0,${height})`}>
            <path
              fill=""
              stroke="steelblue"
              strokeLinejoin="straight"
              strokeLinecap="straight"
              strokeWidth=".1"
              d={pathLine(data)}
            />
            {xScale.ticks().map((tick, i) => {
              const xCoordinate = xScale(tick);
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

          {/* yAxis */}
          <g>
            <path
              fill=""
              stroke="steelblue"
              strokeLinejoin="straight"
              strokeLinecap="straight"
              strokeWidth=".1"
              d={yAxisLine(data)}
            />
            {yScale.ticks().map((tick, i) => {
              const y = yScale(tick);
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
        </g>
      </SVG>
    </div>
  );
};

export default YearsAreaChart;
