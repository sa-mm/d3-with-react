import React from "react";

export const Minimap = props => {
  const {
    width,
    height,
    data,
    lowerBoundMarker,
    upperBoundMarker,
    minimapSvgRef,
    xScale,
    yScale,
    linePath,
    handleMarkerMouseDown,
    handleMarkerMouseUp,
    handleMarkerDrag
  } = props;

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        ref={minimapSvgRef}
        onMouseMove={handleMarkerDrag({ xScale, yScale, linePath })}
      >
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
        />
        <line
          {...upperBoundMarker}
          stroke="black"
          strokeWidth=".5"
          onMouseDown={handleMarkerMouseDown("upper")}
          onMouseUp={handleMarkerMouseUp}
        />
      </svg>
    </div>
  );
};
