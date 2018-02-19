import React from "react";
import YearsAreaChart from "./YearsAreaChart";

import { intersect, shape } from "svg-intersections";

class YearsAreaChartContainer extends React.Component {
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

  handleMouseMove = ({
    pathArea,
    xScale,
    yScale,
    data,
    margin,
    height,
    width
  }) => event => {
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
          cx: point.x - margin.left,
          cy: point.y - margin.top
        },
        mouseOnChart: true,
        hLine: {
          ...hLine,
          x1: 0,
          y1: point.y - margin.top,
          x2: width,
          y2: point.y - margin.top
        },
        vLine: {
          ...vLine,
          x1: point.x - margin.left,
          y1: 0,
          x2: point.x - margin.left,
          y2: height
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
      mouseOnChart,
      lockMarker,
      circleOverlay,
      hLine,
      vLine
    } = this.state;
    return (
      <YearsAreaChart
        svgRef={svg => (this.svg = svg)}
        {...this.props}
        {...{ mouseOnChart, lockMarker, circleOverlay, hLine, vLine }}
        handleMouseMove={this.handleMouseMove}
        handleMouseLeave={this.handleMouseLeave}
        handleChartClick={this.handleChartClick}
      />
    );
  }
}

export default YearsAreaChartContainer;
