import React from "react";
import { XAxisTime } from "../XAxisTime";

class XAxisTimeContainer extends React.Component {
  state = {
    selectedEvent: 0
  };

  handleEventClick = index => () => {
    this.setState(({ selectedEvent }, props) => ({
      selectedEvent: index
    }));
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
