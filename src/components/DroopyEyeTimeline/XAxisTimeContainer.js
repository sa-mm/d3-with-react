import React from "react";
import { XAxisTime } from "../XAxisTime";

import { timeParse } from "d3-time-format";
import { isEqual, findIndex } from "lodash";

class XAxisTimeContainer extends React.Component {
  constructor(props) {
    super(props);
    const { scale, data } = props;
    var parseTime = timeParse("%Y-%m-%d");

    const ticksWithData = scale.ticks(data.length).reduce((acc, tick) => {
      const matchedIndex = findIndex(data, e =>
        isEqual(tick, parseTime(e.date))
      );
      if (matchedIndex >= 0) {
        const { event } = data[matchedIndex];
        return [...acc, { tick, event }];
      }
      return [...acc, { tick }];
    }, []);

    const dates = data.map(e => parseTime(e.date).toDateString());
    const ticks = scale.ticks(data.length).map(e => e.toDateString());
    const relTicks = ticks.reduce((acc, dateStr, i) => {
      if (dates.some(e => e === dateStr)) {
        return [...acc, { idx: i, str: dateStr }];
      }
      return acc;
    }, []);

    this.state = {
      currentIndex: 0,
      selectedEvent: 0,
      relTicks,
      ticksWithData
    };
  }

  handleEventClick = index => () => {
    if (this.eventInterval) clearInterval(this.eventInterval);
    this.setState(({ selectedEvent }, props) => ({
      selectedEvent: index
    }));
  };

  componentWillMount() {
    this.eventInterval = setInterval(this.incrementEvent, 2000);
  }

  componentWillUnmount() {
    if (this.eventInterval) clearInterval(this.eventInterval);
  }

  incrementEvent = () => {
    const { relTicks, currentIndex } = this.state;
    const atLastTick = relTicks.length - 1 === currentIndex;
    if (atLastTick) {
      clearInterval(this.eventInterval);
    } else {
      this.setState((prevState, props) => {
        const { relTicks, currentIndex } = prevState;
        const nextIndex = currentIndex + 1;
        const nextEvent = relTicks[nextIndex].idx;
        return { selectedEvent: nextEvent, currentIndex: nextIndex };
      });
    }
  };

  render() {
    const { selectedEvent, ticksWithData } = this.state;

    return (
      <XAxisTime
        {...this.props}
        ticksWithData={ticksWithData}
        selectedEvent={selectedEvent}
        handleEventClick={this.handleEventClick}
      />
    );
  }
}

export default XAxisTimeContainer;
