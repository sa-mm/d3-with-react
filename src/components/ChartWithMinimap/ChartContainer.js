import React from "react";
import { intersect, shape } from "svg-intersections";
import { dropWhile, dropRightWhile, flow } from "lodash/fp";

import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";

import { Chart } from "./Chart";
import { Minimap } from "./Minimap";

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
    const minimapMargin = {
      top: 0.5,
      right: 5,
      bottom: 5,
      left: 5
    };
    const minimapWidth = 100 - minimapMargin.right - minimapMargin.left;
    const minimapHeight = 15 - minimapMargin.top - minimapMargin.right;
    this.state = {
      minimapMargin,
      minimapWidth,
      minimapHeight,
      lowerBoundMarker: {
        x1: minimapWidth / 2 - 2.5,
        y1: 0,
        x2: minimapWidth / 2 - 2.5,
        y2: minimapHeight
      },
      upperBoundMarker: {
        x1: minimapWidth / 2 + 2.5,
        y1: 0,
        x2: minimapWidth / 2 + 2.5,
        y2: minimapHeight
      },
      topMarker: {
        x1: minimapWidth / 2 - 2.5,
        y1: 0,
        x2: minimapWidth / 2 + 2.5,
        y2: 0
      },
      bottomMarker: {
        x1: minimapWidth / 2 - 2.5,
        y1: minimapHeight,
        x2: minimapWidth / 2 + 2.5,
        y2: minimapHeight
      },
      isDragging: false,
      currentMarker: null,
      chartData: [],
      chartMargin: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      }
    };
  }

  componentDidMount() {
    const xScale = this.xScaleFn();
    const yScale = this.yScaleFn();
    const linePath = this.linePathFn();
    this.chartBounds({ xScale, yScale, linePath });
  }

  handleMarkerMouseDown = currentMarker => event => {
    this.setState({ isDragging: true, currentMarker });
  };

  handleMarkerMouseUp = event => {
    this.setState({ isDragging: false, currentMarker: null });
  };

  handleMarkerDrag = ({ xScale, yScale, linePath }) => event => {
    const { isDragging, currentMarker, minimapMargin } = this.state;

    if (!isDragging) return null;

    const point = this.minimapSvg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    let { x } = point.matrixTransform(this.minimapSvg.getScreenCTM().inverse());

    // handles the offset from the margin
    x = x - minimapMargin.left;

    this.setState((prevState, props) => {
      const {
        topMarker,
        bottomMarker,
        upperBoundMarker,
        lowerBoundMarker
      } = prevState;

      // better way to do this?
      const boundMarker = prevState[currentMarker + "BoundMarker"];

      let markerWidth;
      if (currentMarker === "lower") {
        markerWidth = upperBoundMarker.x1 - x;
      } else {
        markerWidth = x - lowerBoundMarker.x1;
      }

      if (markerWidth < 1) return null;

      return {
        [currentMarker + "BoundMarker"]: {
          ...boundMarker,
          x1: x,
          x2: x
        },
        topMarker: {
          ...topMarker,
          x1: currentMarker === "lower" ? x : x - markerWidth,
          x2: currentMarker === "lower" ? x + markerWidth : x
        },
        bottomMarker: {
          ...bottomMarker,
          x1: currentMarker === "lower" ? x : x - markerWidth,
          x2: currentMarker === "lower" ? x + markerWidth : x
        }
      };
    }, this.chartBounds({ xScale, yScale, linePath }));
  };

  chartBounds = ({
    xScale = this.xScaleFn(),
    yScale = this.yScaleFn(),
    linePath = this.linePathFn()
  }) => {
    const { data } = this.props;
    const { lowerBoundMarker, upperBoundMarker } = this.state;
    const path = linePath(data);

    let points1, points2;
    points1 = intersect(
      shape("path", { d: path }),
      shape("line", {
        ...lowerBoundMarker
      })
    ).points;

    points2 = intersect(
      shape("path", { d: path }),
      shape("line", {
        ...upperBoundMarker
      })
    ).points;

    let xVal1, xVal2;
    if (points1.length > 0) {
      xVal1 = xScale.invert(points1[0].x);
    }

    if (points2.length > 0) {
      xVal2 = xScale.invert(points2[0].x);
    }

    if (xVal1 && xVal2) {
      this.setChartData(xVal1, xVal2);
    }
  };

  setChartData = (start, end) => {
    this.setState((prevState, props) => {
      const { data } = props;
      const chartData = flow(
        dropWhile(d => d.year < Math.floor(start)),
        dropRightWhile(d => d.year > Math.ceil(end))
      )(data);
      return {
        chartData
      };
    });
  };

  xScaleFn = () => {
    const { data } = this.props;
    const { minimapWidth } = this.state;

    return scaleLinear()
      .domain(extent(data, d => d.year))
      .range([0, minimapWidth]);
  };

  yScaleFn = () => {
    const { data } = this.props;
    const { minimapHeight } = this.state;

    return scaleLinear()
      .domain(extent(data, d => d.value))
      .range([minimapHeight, 0]);
  };

  linePathFn = () =>
    line()
      .x(d => this.xScaleFn()(d.year))
      .y(d => this.yScaleFn()(d.value));

  render() {
    const { data } = this.props;
    const {
      minimapMargin,
      minimapWidth,
      minimapHeight,
      lowerBoundMarker,
      upperBoundMarker,
      chartData,
      chartMargin,
      topMarker,
      bottomMarker
    } = this.state;

    const minimapSvgRef = e => (this.minimapSvg = e);
    return (
      <div>
        <Chart data={chartData} margin={chartMargin} />
        <Minimap
          {...{
            data,
            lowerBoundMarker,
            upperBoundMarker,
            topMarker,
            bottomMarker,
            minimapSvgRef
          }}
          margin={minimapMargin}
          width={minimapWidth}
          height={minimapHeight}
          xScale={this.xScaleFn()}
          yScale={this.yScaleFn()}
          linePath={this.linePathFn()}
          handleMarkerMouseDown={this.handleMarkerMouseDown}
          handleMarkerMouseUp={this.handleMarkerMouseUp}
          handleMarkerDrag={this.handleMarkerDrag}
          chartBounds={this.chartBounds}
        />
      </div>
    );
  }
}

export default ChartContainer;
