import React from "react";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";
import {
  line,
  curveMonotoneX,
  curveNatural,
  curveLinear,
  curveBasis
} from "d3-shape";
import SVG from "../SVG";
import {
  HappyFisherGradient,
  SaintPetersburgGradient,
  PlottedArea
} from "./index";

const LineChart = props => {
  const { height, width, data, curve, handleCurveSelect, hiddenSelect } = props;
  const padding = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  };

  const [yMin, yMax] = extent(data, d => d.value);
  const yScale = scaleLinear()
    .domain([yMin - 2, yMax + 2])
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
    <div>
      <div style={{ display: hiddenSelect ? "none" : "inherit" }}>
        <select value={curve} onChange={handleCurveSelect}>
          {Object.keys(curveHash).map((curve, i) => {
            return (
              <option key={`select-curve-${i}`} value={curveHash[i]}>
                {curve}
              </option>
            );
          })}
        </select>
      </div>
      <SVG {...{ height, width }}>
        <defs>
          {/* Pulling the Gradients out seems to make sense, but then you have to remember to id them correctly. */}
          <HappyFisherGradient />
          <SaintPetersburgGradient />
        </defs>

        <g transform={`translate(${padding.left},${padding.top})`}>
          <PlottedArea {...{ xOffset, xPadding, pathLine, data, yScale }} />

          {/* xAxis */}
          <g
            transform={`translate(0, ${height - padding.top - padding.bottom})`}
          >
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
    </div>
  );
};

class LineChartContainer extends React.Component {
  state = { curve: "curveMonotoneX" };
  handleCurveSelect = event => {
    this.setState({ curve: event.target.value });
  };
  render() {
    const { curve } = this.state;
    return (
      <LineChart
        curve={curve}
        handleCurveSelect={this.handleCurveSelect}
        {...this.props}
      />
    );
  }
}

export default LineChartContainer;
