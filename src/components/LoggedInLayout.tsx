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
import User from "../containers/User";
import { UserStyle } from "./User/User";

export const LoggedInLayoutStyle = styled.div`
  display: flex;
  max-width: 996px;
  margin: 0 auto;

  ${HomeStyle}, ${LikesStyle}, ${ListsStyle}, ${ListStyle}, ${TweetDetailsStyle}, ${UserStyle} {
    flex: 1;
  }
`;

export const LoggedInLayout: React.SFC<{}> = (props: {}) => (
  <LoggedInLayoutStyle>
    <Sidebar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/likes" component={Likes} />
      <Route exact path="/lists" component={Lists} />
      <Route exact path="/lists/:listId" component={List} />
      <Route exact path="/tweets/:id" component={TweetDetails} />
      <Route exact path="/users/:screen_name" component={User} />
      <p>404</p>
    </Switch>
  </LoggedInLayoutStyle>
);
