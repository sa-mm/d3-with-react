import React from "react";
import { XAxisTime } from "../XAxisTime";

import { timeParse } from "d3-time-format";
import { isEqual, findIndex } from "lodash";
import { flow, reduce } from "lodash/fp";

class XAxisTimeContainer extends React.Component {
  constructor(props) {
    super(props);
    const { scale, data } = props;

    // Returns an array with ticks + events.
    const transformTicks = dataFromProps => ticks => {
      const parseTime = timeParse("%Y-%m-%d");

      const ticksReducer = (acc, tick) => {
        const matchedIndex = findIndex(dataFromProps, ({ date }) =>
          isEqual(tick, parseTime(date))
        );

        if (matchedIndex >= 0) {
          const { event } = dataFromProps[matchedIndex];
          return [...acc, { tick, event }];
        }

        return [...acc, { tick }];
      };

      return reduce(ticksReducer, [])(ticks);
    };

    const ticksWithData = flow(scale.ticks, transformTicks(data))(data.length);

    this.state = {
      selectedEvent: 0,
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
    const { selectedEvent, ticksWithData } = this.state;

    // Gets the distance between the current and next events on the timeline.
    // If they're next to each other, the distance is 0.
    const getDistance = (idx, data) =>
      data.slice(idx + 1).findIndex(e => e.event);

    const dist = getDistance(selectedEvent, ticksWithData);

    if (dist < 0) {
      clearInterval(this.eventInterval);
    } else {
      this.setState((prevState, props) => {
        const { selectedEvent, ticksWithData } = prevState;
        const incr = getDistance(selectedEvent, ticksWithData) + 1;
        return { selectedEvent: selectedEvent + incr };
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
