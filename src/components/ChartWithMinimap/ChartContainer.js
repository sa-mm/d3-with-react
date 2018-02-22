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
    const minimapWidth = 100;
    const minimapHeight = 10;
    this.state = {
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
    // this.chartBounds({
    //   xScale: this.xScale,
    //   yScale: this.yScale,
    //   linePath: this.linePath
    // });
    const { data } = this.props;
    const { lowerBoundMarker, upperBoundMarker } = this.state;
    const path = this.linePathFn()(data);

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
      xVal1 = this.xScaleFn().invert(points1[0].x);
    }

    if (points2.length > 0) {
      xVal2 = this.xScaleFn().invert(points2[0].x);
    }

    if (xVal1 && xVal2) {
      this.setChartData(xVal1, xVal2);
    }
  }

  handleMarkerMouseDown = currentMarker => event => {
    this.setState({ isDragging: true, currentMarker });
  };

  handleMarkerMouseUp = event => {
    this.setState({ isDragging: false, currentMarker: null });
  };

  handleMarkerDrag = ({ xScale, yScale, linePath }) => event => {
    const { isDragging, currentMarker } = this.state;

    if (!isDragging) return null;

    const point = this.minimapSvg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const { x } = point.matrixTransform(
      this.minimapSvg.getScreenCTM().inverse()
    );

    this.setState((prevState, props) => {
      // better way to do this?
      const boundMarker = prevState[currentMarker + "BoundMarker"];
      return {
        [currentMarker + "BoundMarker"]: {
          ...boundMarker,
          x1: x,
          x2: x
        }
      };
    }, this.chartBounds({ xScale, yScale, linePath }));
  };

  chartBounds = ({ xScale, yScale, linePath }) => {
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
      minimapWidth,
      minimapHeight,
      lowerBoundMarker,
      upperBoundMarker,
      chartData,
      chartMargin
    } = this.state;

    const minimapSvgRef = e => (this.minimapSvg = e);
    return (
      <div>
        <Chart data={chartData} margin={chartMargin} />
        <Minimap
          {...{ data, lowerBoundMarker, upperBoundMarker, minimapSvgRef }}
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
