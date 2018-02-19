import React from "react";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { random } from "lodash";
import { area, line } from "d3-shape";
import { intersect, shape } from "svg-intersections";

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

class YearsAreaChart extends React.Component {
  state = {
    mouseOnChart: false,
    lockMarker: false,
    circleOverlay: { cx: 2, cy: 2, r: 2 },
    hLine: {
      x1: 0,
      y1: 0,
      x2: 4,
      y2: 0,
      stroke: "lightgrey",
      strokeWidth: "0.1"
    },
    vLine: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      stroke: "lightgrey",
      strokeWidth: "0.1"
    }
  };

  margin = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  };

  width = 100 - this.margin.right - this.margin.left;
  height = 50 - this.margin.top - this.margin.bottom;

  handleMouseMove = ({ pathArea, xScale, yScale }) => event => {
    const { lockMarker } = this.state;
    if (lockMarker) return null;

    let point = this.svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    point = point.matrixTransform(this.svg.getScreenCTM().inverse());

    this.setState((prevState, props) => {
      const { circleOverlay, hLine, vLine } = prevState;
      return {
        circleOverlay: {
          ...circleOverlay,
          cx: point.x - this.margin.left,
          cy: point.y - this.margin.top
        },
        mouseOnChart: true,
        hLine: {
          ...hLine,
          x1: 0,
          y1: point.y - this.margin.top,
          x2: this.width,
          y2: point.y - this.margin.top
        },
        vLine: {
          ...vLine,
          x1: point.x - this.margin.left,
          y1: 0,
          x2: point.x - this.margin.left,
          y2: this.height
        }
      };
    });

    const { circleOverlay } = this.state;

    const path = pathArea(data);
    var { points } = intersect(
      shape("path", { d: path }),
      shape("circle", {
        ...circleOverlay
      })
    );

    if (points.length > 0) {
      // console.log(xScale.invert(points[0].x));
    }
  };

  handleChartClick = e => {
    this.setState((prevState, props) => {
      const { lockMarker } = prevState;
      return {
        lockMarker: !lockMarker
      };
    });
  };

  handleMouseLeave = e => {
    this.setState((prevState, props) => {
      const { lockMarker } = prevState;
      return {
        mouseOnChart: lockMarker ? true : false
      };
    });
  };

  render() {
    const {
      circleOverlay,
      mouseOnChart,
      hLine,
      vLine,
      lockMarker
    } = this.state;
    const sharedOverlayStyle = {
      display: mouseOnChart ? "inherit" : "none",
      cursor: lockMarker ? "inherit" : "none"
    };

    const valuesExtent = extent(data, d => d.value);
    const yScale = scaleLinear()
      .domain(valuesExtent)
      .range([this.height, 0]);

    const yearsExtent = extent(data, d => d.year);
    const xScale = scaleLinear()
      .domain(yearsExtent)
      .range([0, this.width]);

    const pathArea = area()
      .x(d => xScale(d.year))
      .y1(d => yScale(d.value))
      .y0(yScale(valuesExtent[0]));

    return (
      <div>
        <svg viewBox="0 0 100 50" ref={svg => (this.svg = svg)}>
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
            transform={`translate(${this.margin.left},${this.margin.top})`}
            onMouseMove={this.handleMouseMove({ xScale, yScale, pathArea })}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleChartClick}
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
              transform={`translate(0,${this.height})`}
              scale={xScale}
              data={data}
              accessor={"year"}
            />

            <YAxis scale={yScale} data={data} accessor="value" />

            {/* mouse following circle / crosshairs */}
            <rect
              x="0"
              y="0"
              width={this.width}
              height={this.height}
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
  }
}

export default YearsAreaChart;
