import React from "react";
import { XAxisTime } from "../XAxis";
import withTooltip from "../withTooltip";

const DroopyEyeTimeline = props => {
  const {
    vb,
    margin,
    width,
    height,
    data,
    xScale,
    hasHover,
    mouseEnterHandler,
    mouseLeaveHandler
  } = props;
  return (
    <div>
      <svg viewBox={`0 0 ${vb.width} ${vb.height}`}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* <rect x="0" y="0" width={width} height={height} fill="grey" /> */}
          <XAxisTime
            data={data}
            accessor="date"
            scale={xScale}
            transform={`translate(0,${height / 2})`}
            width={width}
            height={height}
            hasHover={hasHover}
            mouseEnterHandler={mouseEnterHandler}
            mouseLeaveHandler={mouseLeaveHandler}
          />
        </g>
      </svg>
    </div>
  );
};

export default withTooltip(DroopyEyeTimeline);
