import React from "react";
import getData from "../../data/histogram_data";

const Histogram = props => {
  // const data = getData();
  const sum = (numX, numY) => numX + numY;
  const incr = num => sum(num, 1);
  const consBins = ({ min = 0, max = 100, width = 1, accum = [] }) => {
    const v = sum(min, width);
    if (v > max) return accum;

    return consBins({
      min: incr(v),
      max,
      width,
      accum: accum.concat([Array.from(Array(width + 1), (e, i) => min + i)])
    });
  };
  const out = consBins({ min: 0, max: 100, width: 4 });
  // console.log(out);

  return <div>Histogram</div>;
};

export default Histogram;
