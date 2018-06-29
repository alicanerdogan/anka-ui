import * as React from "react";
import styled from "react-emotion";

export interface IHelloProps {
  requestToken?: string;
  getRequestToken: () => any;
}

const Header = styled("h1")`
  font-size: 24px;
`;

export class LoginWithTwitter extends React.Component<IHelloProps, {}> {
  componentDidMount() {
    const { getRequestToken, requestToken } = this.props;
    !requestToken && getRequestToken();
  }

  render() {
    const { requestToken } = this.props;
    return (
      <Header>
        {requestToken && <a href={requestToken}>{"Login with Twitter"}</a>}
      </Header>
    );
  }
}
