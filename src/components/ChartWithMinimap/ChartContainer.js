import React from "react";

import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";

import { Chart } from "./Chart";
import { Minimap } from "./Minimap";
import { chartData, markerBounds } from "./stateChanges";

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
    const leftStart = minimapWidth / 2 - 2.5;
    const rightStart = minimapWidth / 2 + 2.5;
    this.state = {
      minimapMargin,
      minimapWidth,
      minimapHeight,
      lowerBoundMarker: {
        x1: leftStart,
        y1: 0,
        x2: leftStart,
        y2: minimapHeight
      },
      upperBoundMarker: {
        x1: rightStart,
        y1: 0,
        x2: rightStart,
        y2: minimapHeight
      },
      topMarker: {
        x1: leftStart,
        y1: 0,
        x2: rightStart,
        y2: 0
      },
      bottomMarker: {
        x1: leftStart,
        y1: minimapHeight,
        x2: rightStart,
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
    this.setState(chartData({ xScale, yScale, linePath }));
  }

  handleMarkerMouseDown = currentMarker => event => {
    this.setState(() => ({ isDragging: true, currentMarker }));
  };

  handleMarkerMouseUp = event => {
    this.setState(() => ({ isDragging: false, currentMarker: null }));
  };

  handleMarkerDrag = ({ xScale, yScale, linePath }) => event => {
    const { isDragging, minimapMargin } = this.state;

    if (!isDragging) return null;

    const point = this.minimapSvg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    let { x } = point.matrixTransform(this.minimapSvg.getScreenCTM().inverse());

    // handles the offset from the margin
    x = x - minimapMargin.left;

    this.setState(markerBounds(x));
    this.setState(chartData({ xScale, yScale, linePath }));
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
