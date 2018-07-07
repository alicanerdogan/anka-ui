import * as React from "react";
import styled from "react-emotion";
import { Redirect } from "react-router-dom";

export interface IWrapperLinkProps {
  to: string;
}

interface IWrapperLinkState {
  clicked: boolean;
}

export const WrapperLinkStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export class WrapperLink extends React.Component<
  IWrapperLinkProps,
  IWrapperLinkState
> {
  constructor(props: IWrapperLinkProps) {
    super(props);

    this.state = {
      clicked: false
    };
  }

  onClick = () => this.setState(() => ({ clicked: true }));

  render() {
    return (
      <WrapperLinkStyle onClick={this.onClick}>
        {this.state.clicked ? <Redirect to={this.props.to} push /> : null}
      </WrapperLinkStyle>
    );
  }
}
