import React from "react";

import { XAxis } from "../XAxis";

export const Minimap = props => {
  const {
    margin,
    width,
    height,
    data,
    lowerBoundMarker,
    upperBoundMarker,
    topMarker,
    bottomMarker,
    minimapSvgRef,
    xScale,
    yScale,
    linePath,
    handleMarkerMouseDown,
    handleMarkerMouseUp,
    handleMarkerDrag
  } = props;

  const ratio = {
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom
  };
  return (
    <div>
      <svg
        viewBox={`0 0 ${ratio.width} ${ratio.height}`}
        ref={minimapSvgRef}
        onMouseMove={handleMarkerDrag({ xScale, yScale, linePath })}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          <path
            stroke="steelblue"
            strokeWidth="0.1"
            d={linePath(data)}
            fill="none"
          />
          {/* lower bound marker */}
          <line
            {...lowerBoundMarker}
            stroke="black"
            strokeWidth=".5"
            onMouseDown={handleMarkerMouseDown("lower")}
            onMouseUp={handleMarkerMouseUp}
            strokeOpacity={0.5}
          />
          {/* upper bound marker */}
          <line
            {...upperBoundMarker}
            stroke="black"
            strokeWidth=".5"
            onMouseDown={handleMarkerMouseDown("upper")}
            onMouseUp={handleMarkerMouseUp}
            strokeOpacity={0.5}
          />

          <line
            {...topMarker}
            stroke="black"
            strokeWidth=".2"
            strokeOpacity={0.5}
          />
          <line
            {...bottomMarker}
            stroke="black"
            strokeWidth=".2"
            strokeOpacity={0.5}
          />
          <XAxis
            transform={`translate(${0},${height})`}
            scale={xScale}
            data={data}
            accessor={"year"}
          />
        </g>
      </svg>
    </div>
  );
};
