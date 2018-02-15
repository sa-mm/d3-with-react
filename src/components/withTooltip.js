import React from "react";

function withTooltip(WrappedComponent) {
  return class extends React.Component {
    state = {
      hasHover: null
    };

    mouseEnterHandler = index => () => {
      this.setState({ hasHover: index });
    };
    mouseLeaveHandler = index => () => {
      this.setState({ hasHover: null });
    };

    render() {
      const { hasHover } = this.state;
      return (
        <WrappedComponent
          mouseEnterHandler={this.mouseEnterHandler}
          mouseLeaveHandler={this.mouseLeaveHandler}
          hasHover={hasHover}
          {...this.props}
        />
      );
    }
  };
}

export default withTooltip;
