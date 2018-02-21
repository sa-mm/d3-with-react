import React from "react";

import { Chart } from "./Chart";

class ChartContainer extends React.Component {
  render() {
    const { data } = this.props;
    return <Chart {...{ data }} />;
  }
}

export default ChartContainer;
