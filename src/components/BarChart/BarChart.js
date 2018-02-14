import React from "react";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { max } from "d3-array";
import SVG from "../SVG";

import { BottomAxis, LeftAxis } from "./index";

const RectGradient = () => {
  return (
    <linearGradient id="RectGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stopColor="#ff9a9e" />
      <stop offset="100%" stopColor="#fecfef" />
    </linearGradient>
  );
};

const BarChart = props => {
  const { data, height, width } = props;
  const padding = 5;

  const barWidth = (width - padding) / data.length;
  const xScale = scaleOrdinal()
    .domain(data.map(d => d[0]))
    .range([padding, width - padding]); //not getting used at all…

  const yScale = scaleLinear()
    .domain([0, max(data, d => d[1])])
    .range([height - padding, padding]);

  return (
    <SVG height={height} width={width}>
      <defs>
        <RectGradient />
      </defs>
      <g>
        {data.map((d, i) => {
          return (
            <rect
              key={`rect${i}`}
              x={padding + i * barWidth}
              y={yScale(d[1])}
              width={barWidth - 1}
              height={height - padding - yScale(d[1])}
              fill="url(#RectGradient)"
            />
          );
        })}
      </g>
      <BottomAxis
        data={data}
        height={height}
        width={width - padding - 1}
        barWidth={barWidth}
        offset={padding}
      />
      <LeftAxis {...{ height, data }} offset={padding} scale={yScale} />
    </SVG>
  );
};

export default BarChart;
