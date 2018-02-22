import React, { Component } from "react";

import Circles from "./components/Circles";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import AreaChart from "./components/AreaChart";
import YearsAreaChart from "./components/YearsAreaChart";
import ChartWithMinimap from "./components/ChartWithMinimap";

import {
  randomIncreasingYearValueData,
  randomYearValueData
} from "./utils/dataGenerators";

import chartList from "./data/chartList";

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
      YearsAreaChart: props => (
        <YearsAreaChart
          data={randomIncreasingYearValueData({
            startYear: 1700,
            duration: 300
          })}
        />
      ),
      ChartWithMinimap: props => (
        <ChartWithMinimap
          data={randomYearValueData({
            startYear: 1000,
            duration: 1000
          })}
        />
      )
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
          {chartList.map(({ name, props, desc }, i) => {
            return (
              <div key={`chart-list-${i}`} className="App-minichart">
                <div onClick={this.clickHandler(name)}>
                  {this.displayViz(name, props)}
                </div>
                <p>{desc}</p>
              </div>
            );
          })}
        </div>
        <hr />
        <div style={{ margin: "10px" }}>
          {this.displayViz(currentComponent)}
        </div>
      </div>
    );
  }
}

export default App;
