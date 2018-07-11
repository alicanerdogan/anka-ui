import "babel-polyfill";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import Title from "./containers/Title";
import { Layout } from "./components/Layout";
import reducer from "./reducers/reducer";
import { injectGlobalStyles } from "./utils/styles";

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
      <React.Fragment>
        <Title />
        <Layout />
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);
