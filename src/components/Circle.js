import React from "react";

const Circle = props => {
  const { cx, cy, r, fill } = props;
  return <circle cx={cx} cy={cy} r={r} fill={fill} />;
};

export default Circle;
