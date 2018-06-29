import * as React from "react";
import styled from "react-emotion";
import { RouteComponentProps } from "react-router";

import { parseQueryString } from "../utils/url";

export interface ICallbackProps extends RouteComponentProps<any, any> {
  accessToken?: string;
  getAccessToken: () => any;
}

export class Callback extends React.Component<ICallbackProps, {}> {
  componentDidMount() {
    const { location } = this.props;
    const { oauth_token, oauth_verifier } = parseQueryString(location.search);
    const { accessToken, getAccessToken } = this.props;
    !accessToken && getAccessToken();
  }

  render(): JSX.Element {
    const { accessToken } = this.props;
    return <span>{accessToken}</span>;
  }
}
