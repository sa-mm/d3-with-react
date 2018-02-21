import React from "react";
import { intersect, shape } from "svg-intersections";
import { area } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";

import YearsAreaChart from "./YearsAreaChart";

class YearsAreaChartContainer extends React.Component {
  constructor(props) {
    super(props);

    const margin = {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    };

    const width = 100 - margin.right - margin.left;
    const height = 50 - margin.top - margin.bottom;

    this.state = {
      margin,
      width,
      height,
      mouseOnChart: false,
      lockMarker: false,
      circleOverlay: { cx: 0, cy: 0, r: 2 },
      hLine: {
        x1: 0,
        y1: 0,
        x2: 0,
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
  }

  handleMouseMove = ({ pathArea, xScale, yScale, data }) => event => {
    const { lockMarker, margin, width, height } = this.state;

    if (lockMarker) return null;

    const point = this.svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const { x, y } = point.matrixTransform(this.svg.getScreenCTM().inverse());

    this.setState((prevState, props) => {
      const { circleOverlay, hLine, vLine } = prevState;
      return {
        circleOverlay: {
          ...circleOverlay,
          cx: x - margin.left,
          cy: y - margin.top
        },
        mouseOnChart: true,
        hLine: {
          ...hLine,
          x1: 0,
          y1: y - margin.top,
          x2: width,
          y2: y - margin.top
        },
        vLine: {
          ...vLine,
          x1: x - margin.left,
          y1: 0,
          x2: x - margin.left,
          y2: height
        }
      };
    });

    const { circleOverlay } = this.state;

    const path = pathArea(data);
    const { points } = intersect(
      shape("path", { d: path }),
      shape("circle", {
        ...circleOverlay
      })
    );

    if (points.length > 0) {
      const convertYear = x => Math.round(xScale.invert(x));
      const year1 = convertYear(points[0].x);
      const year2 = convertYear(points[1].x);

      const convertValue = y => Math.round(yScale.invert(y));
      const v1 = convertValue(points[0].y);
      const v2 = convertValue(points[1].y);

      console.log(year1 + ":", v1);
      console.log(year2 + ":", v2);
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
    const { data } = this.props;
    const {
      margin,
      width,
      height,
      mouseOnChart,
      lockMarker,
      circleOverlay,
      hLine,
      vLine
    } = this.state;

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
      <YearsAreaChart
        {...{
          data,
          margin,
          width,
          height,
          mouseOnChart,
          lockMarker,
          circleOverlay,
          hLine,
          vLine,
          xScale,
          yScale,
          pathArea
        }}
        svgRef={svg => (this.svg = svg)}
        handleMouseMove={this.handleMouseMove}
        handleMouseLeave={this.handleMouseLeave}
        handleChartClick={this.handleChartClick}
      />
    );
  }
}

export default YearsAreaChartContainer;
