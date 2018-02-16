import React, { Component } from "react";
import Circles from "./components/Circles";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Histogram from "./components/Histogram";
import ForceDirectedGraph from "./components/ForceDirectedGraph";
import AreaChart from "./components/AreaChart";
import "./App.css";

class App extends Component {
  state = { areachart: true, currentCurve: "curveMonotoneX" };
  clickHandler = name => () => {
    this.setState({
      [name]: !this.state[name]
    });
  };

  curveClick = curve => () => {
    this.setState({ currentCurve: curve });
  };

  render() {
    const {
      circles,
      barchart,
      linechart,
      currentCurve,
      areachart
    } = this.state;
    const curves = [
      "curveMonotoneX",
      "curveNatural",
      "curveLinear",
      "curveBasis"
    ];
    return (
      <div className="App">
        <div
          style={{ margin: "10px", width: circles ? "100%" : "15%" }}
          onClick={this.clickHandler("circles")}
        >
          <Circles />
        </div>
        <p>
          So, looking at the code for the above, a <code>{`<Circle />`}</code>{" "}
          component is not the right level of abstraction.
        </p>
        <div
          style={{ margin: "10px", width: barchart ? "100%" : "15%" }}
          onClick={this.clickHandler("barchart")}
        >
          <BarChart
            data={[["a", 10], ["b", 15], ["c", 30], ["d", 25], ["e", 50]]}
            height={50}
            width={100}
          />
        </div>
        <p>
          Gradients like that look a bit odd with charts. An{" "}
          <code>{`<Axis />`}</code> component might be better.
        </p>
        <div
          style={{ margin: "10px", width: linechart ? "100%" : "15%" }}
          onClick={this.clickHandler("linechart")}
        >
          <LineChart
            height={50}
            width={100}
            data={[
              { letter: "a", value: 5 },
              { letter: "b", value: 20 },
              { letter: "c", value: 10 },
              { letter: "d", value: 15 },
              { letter: "e", value: 30 }
            ]}
            curve={currentCurve}
          />
        </div>
        <p>
          A line chart using different curves{" "}
          {curves.map((curve, i) => {
            return (
              <span key={`curve-desc-${i}`}>
                <span className="link" onClick={this.curveClick(curve)}>
                  {curve}
                </span>
                {i === 0 ? " (the default)" : ""}
                {i === curves.length - 1 ? "." : ", "}
              </span>
            );
          })}{" "}
          Adding a gradient to the line and points, here, doesn't seem to
          confuse things.
        </p>
        <div>
          <Histogram />
        </div>
        <div>
          <ForceDirectedGraph />
        </div>
        <div
          style={{ margin: "10px", width: areachart ? "100%" : "15%" }}
          onClick={this.clickHandler("areachart")}
        >
          <AreaChart
            height={50}
            width={100}
            data={[
              { letter: "a", value: 5 },
              { letter: "b", value: 20 },
              { letter: "c", value: 10 },
              { letter: "d", value: 15 },
              { letter: "e", value: 30 }
            ]}
          />
          <p>Working on making the position of each text label better.</p>
        </div>
      </div>
    );
  }
}

export default App;
