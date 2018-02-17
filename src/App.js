import React, { Component } from "react";
import Circles from "./components/Circles";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Histogram from "./components/Histogram";
import ForceDirectedGraph from "./components/ForceDirectedGraph";
import AreaChart from "./components/AreaChart";
import YearsAreaChart from "./components/YearsAreaChart";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.vizs = {
      Circles: props => <Circles />,
      BarChart: props => (
        <BarChart
          data={[["a", 10], ["b", 15], ["c", 30], ["d", 25], ["e", 50]]}
          height={50}
          width={100}
        />
      ),
      LineChart: ({ hiddenSelect = false }) => (
        <LineChart
          height={50}
          width={100}
          hiddenSelect={hiddenSelect}
          data={[
            { letter: "a", value: 5 },
            { letter: "b", value: 20 },
            { letter: "c", value: 10 },
            { letter: "d", value: 15 },
            { letter: "e", value: 30 }
          ]}
        />
      ),
      AreaChart: props => <AreaChart height={50} width={100} />,
      YearsAreaChart: props => <YearsAreaChart />
    };

    const vizsss = Object.keys(this.vizs);
    const lastViz = vizsss[vizsss.length - 1];

    this.state = {
      currentCurve: "curveMonotoneX",
      currentComponent: lastViz
    };
  }

  displayViz = (Component, props = {}) => {
    if (!Component) return null;
    return this.vizs[Component](props);
  };

  clickHandler = name => () => {
    this.setState(prevState => {
      const { currentComponent } = prevState;
      return {
        currentComponent:
          currentComponent && currentComponent === name ? null : name
      };
    });
  };

  curveClick = curve => () => {
    this.setState({ currentCurve: curve });
  };

  render() {
    const { currentComponent } = this.state;

    return (
      <div className="App">
        <div className="App-charts">
          <div style={{ margin: "10px", width: "15%" }}>
            <div onClick={this.clickHandler("Circles")}>
              {this.displayViz("Circles")}
            </div>
            <p>
              So, looking at the code for the above, a{" "}
              <code>{`<Circle />`}</code> component is not the right level of
              abstraction.
            </p>
          </div>
          <div style={{ margin: "10px", width: "15%" }}>
            <div onClick={this.clickHandler("BarChart")}>
              {this.displayViz("BarChart")}
            </div>
            <p>
              Gradients like that look a bit odd with charts. An{" "}
              <code>{`<Axis />`}</code> component might be better.
            </p>
          </div>
          <div style={{ margin: "10px", width: "15%" }}>
            <div onClick={this.clickHandler("LineChart")}>
              {this.displayViz("LineChart", { hiddenSelect: true })}
            </div>
            <p>
              A line chart using different curves. Adding a gradient to the line
              and points, here, doesn't seem to confuse things.
            </p>
          </div>
          {/* <div>
          <Histogram />
        </div>
        <div>
          <ForceDirectedGraph />
        </div> */}
          <div style={{ margin: "10px", width: "15%" }}>
            <div onClick={this.clickHandler("AreaChart")}>
              {this.displayViz("AreaChart")}
            </div>
            <p>Working on making the position of each text label better.</p>
          </div>
          <div style={{ margin: "10px", width: "15%" }}>
            <div onClick={this.clickHandler("YearsAreaChart")}>
              {this.displayViz("YearsAreaChart")}
            </div>
          </div>
        </div>
        <hr />
        <div>{this.displayViz(currentComponent)}</div>
      </div>
    );
  }
}

export default App;
