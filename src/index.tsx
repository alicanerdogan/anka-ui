import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import LoginWithTwitter from "./containers/LoginWithTwitter";
import Callback from "./containers/Callback";
import reducer from "./reducers/reducer";

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(a: R) => R;
  }
}

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
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
