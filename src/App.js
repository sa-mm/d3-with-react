import React, { Component } from "react";
import Circles from "./components/Circles";
import BarChart from "./components/BarChart";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{ height: 400 }}>
          <Circles />
        </div>
        <p>
          So, looking at the code for the above, a <code>{`<Circle />`}</code>
          component is not the right level of abstraction.
        </p>
        <div style={{ width: "100%" }}>
          <div style={{ margin: "10px" }}>
            <BarChart
              data={[["a", 10], ["b", 15], ["c", 30], ["d", 25]]}
              height={50}
              width={100}
            />
          </div>
        </div>
        <p>
          Gradients like that look a bit odd with charts. An{" "}
          <code>{`<Axis />`}</code> component might be better.
        </p>
      </div>
    );
  }
}

export default App;
