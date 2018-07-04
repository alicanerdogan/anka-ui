import * as React from "react";
import styled from "react-emotion";
import posed from "react-pose";

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const PopUp = styled(
  posed.div({
    default: {
      scaleX: 1,
      scaleY: 1
    },
    hovered: {
      scaleX: 1.4,
      scaleY: 1.4
    }
  })
)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: white;
  color: #3490dc;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  padding-left: 4px;
`;

export const PlayOverlayStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
`;

interface IPlayOverlayState {
  hovered: boolean;
}

export class PlayOverlay extends React.Component<{}, IPlayOverlayState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  onMouseEnter = () => this.setState(() => ({ hovered: true }));

  onMouseExit = () => this.setState(() => ({ hovered: false }));

  render() {
    return (
      <PlayOverlayStyle
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseExit}
      >
        <PopUp pose={this.state.hovered ? "hovered" : "default"}>
          <PlayIcon />
        </PopUp>
      </PlayOverlayStyle>
    );
  }
}
