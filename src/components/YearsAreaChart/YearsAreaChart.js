import React from "react";

import { XAxis } from "../XAxis";
import { YAxis } from "../YAxis";

import { LemonGate } from "../Gradients";

const YearsAreaChart = props => {
  const {
    data,
    margin,
    width,
    height,
    xScale,
    yScale,
    pathArea,
    circleOverlay,
    mouseOnChart,
    hLine,
    vLine,
    lockMarker,
    svgRef,
    handleMouseMove,
    handleMouseLeave,
    handleChartClick
  } = props;

  const sharedOverlayStyle = {
    display: mouseOnChart ? "inherit" : "none",
    cursor: lockMarker ? "inherit" : "none"
  };

  return (
    <div>
      <svg viewBox="0 0 100 50" ref={svgRef}>
        <defs>
          <LemonGate />
        </defs>
        <g
          transform={`translate(${margin.left},${margin.top})`}
          onMouseMove={handleMouseMove({
            xScale,
            yScale,
            pathArea
          })}
          onMouseLeave={handleMouseLeave}
          onClick={handleChartClick}
        >
          {/* the graph */}
          <path
            fill="url(#LemonGate)"
            stroke=""
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="0.1"
            d={pathArea(data)}
          />

          <XAxis
            transform={`translate(0,${height})`}
            scale={xScale}
            data={data}
            accessor={"year"}
          />

          <YAxis scale={yScale} data={data} accessor="value" />

          {/* mouse following circle / crosshairs */}
          <rect
            x="0"
            y="0"
            width={width}
            height={height}
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
};

export default YearsAreaChart;
