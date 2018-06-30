import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import LoginWithTwitter from "./containers/LoginWithTwitter";
import Callback from "./containers/Callback";
import Timeline from "./containers/Timeline";
import { Tweet } from "./components/Tweet";
import reducer from "./reducers/reducer";
import { injectGlobalStyles } from "./utils/styles";
import { ITweet } from "./models/Tweet";

const tweet = require("./data/tweet.json") as ITweet;

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R;
  }
}

injectGlobalStyles();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={LoginWithTwitter} />
        <Route exact path="/auth_cb" component={Callback} />
        <Route exact path="/timeline" component={Timeline} />
        <Route exact path="/tweet" render={props => <Tweet tweet={tweet} />} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
