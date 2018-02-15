import React from "react";
import withTooltip from "../withTooltip";

const PlottedArea = props => {
  const {
    xOffset,
    xPadding,
    pathLine,
    data,
    yScale,
    mouseEnterHandler,
    mouseLeaveHandler,
    hasHover
  } = props;
  return (
    <g>
      <path
        fill="none"
        stroke="url(#SaintPetersburgGradient)"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="0.25"
        d={pathLine(data)}
      />
      {data.map((d, i) => {
        const xOrigin = i * xOffset + xPadding;
        return (
          <g
            key={`linechart-dot-${i}`}
            transform={`translate(${xOrigin},${yScale(d.value)})`}
            onMouseEnter={mouseEnterHandler(i)}
            onMouseLeave={mouseLeaveHandler(i)}
          >
            <circle cx={0} cy={0} r={1} fill="url(#HappyFisherGradient)" />
            <text
              fontSize="1"
              textAnchor="middle"
              dy="-1.5em"
              style={{ display: hasHover === i ? "inherit" : "none" }}
            >
              {d.value}
            </text>
          </g>
        );
      })}
    </g>
  );
};

// export class PlottedAreaContainer extends React.Component {
//   state = {
//     hasHover: null
//   };

//   mouseEnterHandler = index => () => {
//     this.setState({ hasHover: index });
//   };
//   mouseLeaveHandler = index => () => {
//     this.setState({ hasHover: null });
//   };
//   render() {
//     const { hasHover } = this.state;

//     return (
//       <PlottedArea
//         {...this.props}
//         mouseEnterHandler={this.mouseEnterHandler}
//         mouseLeaveHandler={this.mouseLeaveHandler}
//         hasHover={hasHover}
//       />
//     );
//   }
// }

export const WrappedPlottedArea = withTooltip(PlottedArea);
