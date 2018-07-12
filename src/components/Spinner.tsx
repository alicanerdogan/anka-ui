import * as React from "react";
import styled, { keyframes } from "react-emotion";

const offset = 187;
const duration = 1.4;

const rotator = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
`;

const colors = keyframes`
  0% {
    stroke: #bedbf4;
  }
  25% {
    stroke: #67ace5;
  }
  50% {
    stroke: #227ac4;
  }
  75% {
    stroke: #67ace5;
  }
  100% {
    stroke: #bedbf4;
  }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: ${offset};
  }
  50% {
    stroke-dashoffset: ${offset / 4};
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: ${offset};
    transform: rotate(450deg);
  }
`;

export const SpinnerStyle = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: ${rotator} ${duration}s linear infinite;

    circle {
      stroke-dasharray: ${offset};
      stroke-dashoffset: 0;
      stroke: #3490dc;
      transform-origin: center;
      animation: ${dash} ${duration}s ease-in-out infinite;
    }
  }
`;

export interface ISpinnerProps {
  ready: boolean;
  children: React.ReactNode;
}

interface ISpinnerState {
  blocked: boolean;
}

export class Spinner extends React.Component<ISpinnerProps, ISpinnerState> {
  constructor(props: ISpinnerProps) {
    super(props);

    this.state = { blocked: true };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ blocked: false }), 1200);
  }

  render() {
    const { ready, children } = this.props;

    const { blocked } = this.state;

    if (!blocked && ready) {
      return children;
    }

    return (
      <SpinnerStyle>
        <svg
          width="65px"
          height="65px"
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle fill="none" strokeWidth="6" cx="33" cy="33" r="30" />
        </svg>
      </SpinnerStyle>
    );
  }
}
