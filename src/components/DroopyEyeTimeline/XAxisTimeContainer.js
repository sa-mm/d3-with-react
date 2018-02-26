import React from "react";
import { XAxisTime } from "../XAxisTime";

class XAxisTimeContainer extends React.Component {
  state = {
    selectedEvent: 0
  };

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
    const { selectedEvent } = this.state;
    const { scale, data } = this.props;
    const atLastTick = scale.ticks(data.length).length - 1 === selectedEvent;
    if (atLastTick) {
      clearInterval(this.eventInterval);
    } else {
      this.setState((prevState, props) => {
        const { selectedEvent } = prevState;
        return { selectedEvent: selectedEvent + 1 };
      });
    }
  };

  render() {
    const { selectedEvent } = this.state;

    return (
      <XAxisTime
        {...this.props}
        selectedEvent={selectedEvent}
        handleEventClick={this.handleEventClick}
      />
    );
  }
}

export default XAxisTimeContainer;
