import React from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { random } from "lodash";
import { area, line } from "d3-shape";

import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";

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
  const {
    circleOverlay,
    mouseOnChart,
    hLine,
    vLine,
    lockMarker,
    svgRef,
    handleMouseMove,
    handleMouseLeave,
    handleChartClick
  } = props;
  const sharedOverlayStyle = {
    display: mouseOnChart ? "inherit" : "none",
    cursor: lockMarker ? "inherit" : "none"
  };

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

  const pathArea = area()
    .x(d => xScale(d.year))
    .y1(d => yScale(d.value))
    .y0(yScale(valuesExtent[0]));

  return (
    <div>
      <svg viewBox="0 0 100 50" ref={svgRef}>
        <defs>
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
        <g
          transform={`translate(${margin.left},${margin.top})`}
          onMouseMove={handleMouseMove({
            xScale,
            yScale,
            pathArea,
            data,
            margin,
            height,
            width
          })}
          onMouseLeave={handleMouseLeave}
          onClick={handleChartClick}
        >
          <path
            fill="url(#LemonGate)"
            stroke=""
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="0.1"
            d={pathArea(data)}
          />

          <XAxis
            transform={`translate(0,${height})`}
            scale={xScale}
            data={data}
            accessor={"year"}
          />

          <YAxis scale={yScale} data={data} accessor="value" />

          {/* mouse following circle / crosshairs */}
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
            fill="black"
            fillOpacity="0"
            style={{ cursor: lockMarker ? "inherit" : "none" }}
          />
          <circle
            cx={circleOverlay.cx}
            cy={circleOverlay.cy}
            r={circleOverlay.r}
            fill="#e5f5f9"
            fillOpacity="0.5"
            stroke="grey"
            strokeWidth="0.05"
            style={sharedOverlayStyle}
          />
          <line {...hLine} style={sharedOverlayStyle} />
          <line {...vLine} style={sharedOverlayStyle} />
        </g>
      </svg>
    </div>
  );
};

export default YearsAreaChart;
