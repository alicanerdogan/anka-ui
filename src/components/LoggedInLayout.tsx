import * as React from "react";
import styled from "react-emotion";
import { Route, Switch } from "react-router-dom";
import Likes from "../containers/Likes";
import { LikesStyle } from "./Likes";
import Lists from "../containers/Lists";
import { ListsStyle } from "./List/Lists";
import List from "../containers/List";
import TweetDetails from "../containers/TweetDetails";
import { TweetDetailsStyle } from "./TweetDetails";
import { ListStyle } from "./List/List";
import { Sidebar } from "./Sidebar";
import { Home, Style as HomeStyle } from "./Home";

export interface ILoggedInLayoutProps {}

export const LoggedInLayoutStyle = styled.div`
  display: flex;
  max-width: 996px;
  margin: 0 auto;

  ${HomeStyle}, ${LikesStyle}, ${ListsStyle}, ${ListStyle}, ${TweetDetailsStyle} {
    flex: 1;
  }
`;

export const LoggedInLayout: React.SFC<ILoggedInLayoutProps> = (
  props: ILoggedInLayoutProps
) => {
  return (
    <LoggedInLayoutStyle>
      <Sidebar />
      <Switch>
        <Route exact path="/timeline" component={Home} />
        <Route exact path="/likes" component={Likes} />
        <Route exact path="/lists" component={Lists} />
        <Route exact path="/lists/:listId" component={List} />
        <Route exact path="/tweets/:id" component={TweetDetails} />
        <p>404</p>
      </Switch>
    </LoggedInLayoutStyle>
  );
};
