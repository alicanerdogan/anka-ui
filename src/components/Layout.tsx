import * as React from "react";
import styled from "react-emotion";
import { Route, Switch } from "react-router-dom";
import { LoggedInLayout } from "./LoggedInLayout";
import Callback from "../containers/Callback";
import LoginWithTwitter from "../containers/LoginWithTwitter";
import { Tweet } from "./Tweet";
import { ITweet } from "../models/Tweet";

const tweet = require("../data/tweet.json") as ITweet;

export interface ILayoutProps {}

export const LayoutStyle = styled.div``;

export const Layout: React.SFC<ILayoutProps> = (props: ILayoutProps) => {
  return (
    <LayoutStyle>
      <Switch>
        <Route exact path="/" component={LoginWithTwitter} />
        <Route exact path="/auth_cb" component={Callback} />
        <Route exact path="/tweet" render={() => <Tweet tweet={tweet} />} />
        <LoggedInLayout />
      </Switch>
    </LayoutStyle>
  );
};
