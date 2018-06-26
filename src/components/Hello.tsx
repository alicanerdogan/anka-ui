import * as React from "react";
import styled from "react-emotion";

export interface IHelloProps {
  compiler: string;
  framework: string;
}

const Header = styled("h1")`
  font-size: 24px;
`;

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<IHelloProps, {}> {
  render() {
    return (
      <Header>
        Hello from {this.props.compiler} and {this.props.framework}!
      </Header>
    );
  }
}
