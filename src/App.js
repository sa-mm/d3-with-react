import React, { Component } from "react";
import Circles from "./components/Circles";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import "./App.css";

class App extends Component {
  state = { linechart: true };
  clickHandler = name => () => {
    this.setState({
      [name]: !this.state[name]
    });
  };

  render() {
    const { circles, barchart, linechart } = this.state;
    return (
      <div className="App">
        <div
          style={{ margin: "10px", width: circles ? "100%" : "15%" }}
          onClick={this.clickHandler("circles")}
        >
          <Circles />
        </div>
        <p>
          So, looking at the code for the above, a <code>{`<Circle />`}</code>
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
          />
        </div>
        <p>Here's a linechart…</p>
      </div>
    );
  }
}

export default App;
