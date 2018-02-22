const chartList = [
  {
    name: "Circles",
    desc:
      'So, looking at the code for the above, a "Circle" component is not the right level of abstraction.'
  },
  {
    name: "BarChart",
    desc:
      'Gradients like that look a bit odd with charts. An "Axis" component might be better.'
  },
  {
    name: "LineChart",
    desc:
      "A line chart using different curves. Adding a gradient to the line and points, here, doesn't seem to confuse things.",
    props: { hiddenSelect: true }
  },
  {
    name: "AreaChart",
    desc: "Working on making the position of each text label better."
  },
  {
    name: "YearsAreaChart",
    desc: 'Another area chart with a not yet functional "crosshairs" overlay.'
  },
  {
    name: "ChartWithMinimap",
    desc: "Definitely needs work…"
  }
];

export default chartList;
