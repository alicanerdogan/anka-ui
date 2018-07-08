import * as React from "react";
import styled from "react-emotion";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";

import { parseQueryString } from "../utils/url";

export interface ICallbackProps extends RouteComponentProps<any, any> {
  accessToken?: string;
  getAccessToken: (T: string, U: string) => any;
}

export class Callback extends React.Component<ICallbackProps, {}> {
  componentDidMount() {
    const { location } = this.props;
    const { oauth_token, oauth_verifier } = parseQueryString(location.search);
    const { accessToken, getAccessToken } = this.props;
    !accessToken && getAccessToken(oauth_token, oauth_verifier);
  }

  render(): JSX.Element {
    const { accessToken } = this.props;
    if (!accessToken) {
      return null;
    }
    return <Redirect to={`/timeline`} />;
  }
}
