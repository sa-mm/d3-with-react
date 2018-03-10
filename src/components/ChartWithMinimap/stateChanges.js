import { flow, dropWhile, dropRightWhile } from "lodash/fp";
import { intersect, shape } from "svg-intersections";

export const markerBounds = x => (prevState, props) => {
  const {
    topMarker,
    bottomMarker,
    upperBoundMarker,
    lowerBoundMarker,
    currentMarker
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
};

export const chartData = ({ xScale, yScale, linePath }) => {
  return (prevState, props) => {
    const { data } = props;
    const { lowerBoundMarker, upperBoundMarker, minimapWidth } = prevState;
    const path = linePath(data);

    const { points: [lowerIntersect = { x: 0 }] } = intersect(
      shape("path", { d: path }),
      shape("line", {
        ...lowerBoundMarker
      })
    );

    const { points: [upperIntersect = { x: minimapWidth }] } = intersect(
      shape("path", { d: path }),
      shape("line", {
        ...upperBoundMarker
      })
    );

    const lowerX = xScale.invert(lowerIntersect.x);
    const upperX = xScale.invert(upperIntersect.x);

    const chartData = flow(
      dropWhile(d => d.year < Math.floor(lowerX)),
      dropRightWhile(d => d.year > Math.ceil(upperX))
    )(data);
    return {
      chartData
    };
  };
};
