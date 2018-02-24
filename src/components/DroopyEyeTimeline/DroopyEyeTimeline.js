import React from "react";
import XAxisTime from "./XAxisTimeContainer";
import { SkyGradient, PhoenixStart, SnowAgain } from "../Gradients";

const DroopyEyeTimeline = props => {
  const { vb, margin, width, height, data, xScale } = props;
  return (
    <div>
      <svg viewBox={`0 0 ${vb.width} ${vb.height}`}>
        <defs>
          <SkyGradient />
          <PhoenixStart />
          <SnowAgain />
        </defs>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <XAxisTime
            data={data}
            accessor="date"
            scale={xScale}
            transform={`translate(0,${height / 2})`}
            width={width}
            height={height}
          />
        </g>
      </svg>
    </div>
  );
};

export default DroopyEyeTimeline;
