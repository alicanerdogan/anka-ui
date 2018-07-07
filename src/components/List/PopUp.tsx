import * as React from "react";
import styled from "react-emotion";
import posed from "react-pose";

export interface IPopUpProps {
  children: JSX.Element;
}

interface IPopUpState {
  hovered: boolean;
}

export const PopUpStyle = styled(
  posed.div({
    default: {
      scaleX: 1,
      scaleY: 1
    },
    hovered: {
      scaleX: 1.1,
      scaleY: 1.1
    }
  })
)``;

export class PopUp extends React.Component<IPopUpProps, IPopUpState> {
  constructor(props: IPopUpProps) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  onMouseEnter = () => this.setState(() => ({ hovered: true }));

  onMouseExit = () => this.setState(() => ({ hovered: false }));

  render() {
    return (
      <PopUpStyle
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseExit}
        pose={this.state.hovered ? "hovered" : "default"}
      >
        {this.props.children}
      </PopUpStyle>
    );
  }
}
