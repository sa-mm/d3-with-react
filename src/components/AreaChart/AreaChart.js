import React from "react";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";
import { area } from "d3-shape";
import SVG from "../SVG";
import { SaintPetersburgGradient } from "../LineChart";

const numToLetter = n => String.fromCharCode(n + 65);
const randomN = () => Math.random() * 100;
const data = Array.from(Array(26), (e, i) => ({
  letter: numToLetter(i),
  value: randomN()
}));

const AreaChart = props => {
  const { height, width } = props;
  var margin = { top: 5, right: 5, bottom: 5, left: 5 };

  let myWidth = width - margin.right - margin.left;
  let myHeight = height - margin.top - margin.bottom;

  const getValue = d => d.value;
  const valuesExtent = extent(data, getValue);
  const yScale = scaleLinear()
    .domain(valuesExtent)
    .range([myHeight, 0]);

  const xOffset = myWidth / data.length;

  const pathArea = area()
    .x((d, i) => i * xOffset)
    .y1(d => yScale(d.value))
    .y0(yScale(valuesExtent[0]));

  const withLocation = (arr, i) => {
    return arr[i - 1] <= arr[i] ? "-1.5" : "1.7";
  };

  return (
    <SVG
      width={myWidth + margin.right + margin.left}
      height={myHeight + margin.top + margin.bottom}
    >
      <defs>
        <SaintPetersburgGradient />
      </defs>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <path
          fill="url(#SaintPetersburgGradient)"
          stroke="black"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="0.10"
          d={pathArea(data)}
        />
        {data.map((d, i) => {
          return (
            <g
              transform={`translate(${i * xOffset},${yScale(d.value)})`}
              fontSize="1"
              textAnchor="middle"
              key={`area-chart-point-${i}`}
            >
              <circle cx={0} cy={0} r={0.25} fill={"steelblue"} />
              <g transform={`translate(0,${withLocation(data, i)})`}>
                <circle
                  cx={0}
                  cy={0}
                  r={1}
                  fill="none"
                  strokeWidth={"0.05"}
                  stroke={"black"}
                />
                <text dy={0.31}>{Math.round(d.value)}</text>
              </g>
            </g>
          );
        })}
        <g transform={`translate(0,${myHeight})`}>
          {/* <line
            strokeWidth="0.10"
            stroke="black"
            x1={0}
            x2={myWidth - margin.right}
            y1={0}
            y2={0}
          /> */}
          {data.map((d, i) => {
            return (
              <g
                key={`area-chart-${i}`}
                transform={`translate(${xOffset * i},1)`}
                fontSize="1"
                textAnchor="middle"
              >
                <text>{d.letter}</text>
              </g>
            );
          })}
        </g>
      </g>
    </SVG>
  );
};

export default AreaChart;
