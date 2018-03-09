import React from "react";
import ChordDiagram from "./ChordDiagram";

class ChordDiagramContainer extends React.Component {
  constructor(props) {
    super(props);
    const vb = { width: 700, height: 700 };
    const margin = {
      top: 5,
      right: 5,
      bottom: 5,
      left: 5
    };
    const width = vb.width - margin.left - margin.right;
    const height = vb.height - margin.top - margin.bottom;

    this.state = {
      vb,
      margin,
      width,
      height
    };
  }
  render() {
    const { data } = this.props;
    const { vb, margin, width, height } = this.state;
    return <ChordDiagram {...{ data, vb, margin, width, height }} />;
  }
}

export default ChordDiagramContainer;
