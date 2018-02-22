import React from "react";

import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";

import { XAxis } from "../XAxis";
import { YAxis } from "../YAxis";

export const Chart = props => {
  const { data, margin } = props;

  const width = 100 - margin.left - margin.right;
  const height = 50 - margin.top - margin.bottom;

  const xScale = scaleLinear()
    .domain(extent(data, d => d.year))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.value))
    .range([height, 0]);

  const linePath = line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.value));

  return (
    <div>
      <svg viewBox={`0 0 100 50`}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <path
            stroke="steelblue"
            strokeWidth="0.1"
            d={linePath(data)}
            fill="none"
          />
          <XAxis
            transform={`translate(0,${height})`}
            scale={xScale}
            data={data}
            accessor="year"
          />
          <YAxis scale={yScale} data={data} accessor="value" />
        </g>
      </svg>
    </div>
  );
};
