import React from "react";

import { scaleTime } from "d3-scale";
import { extent } from "d3-array";
import { timeParse } from "d3-time-format";

import DroopyEyeTimeline from "./DroopyEyeTimeline";

class DroopyEyeTimelineContainer extends React.Component {
  constructor(props) {
    super(props);
    const vb = { width: 100, height: 50 };
    const margin = {
      top: 5,
      right: 7,
      bottom: 5,
      left: 5
    };

    this.state = {
      vb,
      margin,
      width: vb.width - margin.left - margin.right,
      height: vb.height - margin.top - margin.bottom
    };
  }
  render() {
    const { vb, margin, width, height } = this.state;
    const { data } = this.props;
    var parseTime = timeParse("%Y-%m-%d");
    const xScale = scaleTime()
      .domain(extent(data, d => parseTime(d.date)))
      .range([0, width]);

    return (
      <DroopyEyeTimeline {...{ vb, margin, width, height, data, xScale }} />
    );
  }
}

export default DroopyEyeTimelineContainer;
