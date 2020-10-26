import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AppLayout from "layouts/App.jsx";
import "assets/scss/material-dashboard-pro-react.scss?v=1.7.0";
import history from "services/History";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./services/redux/reducers";
import ReduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

// const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/app" component={AppLayout} />
        <Redirect from="/" to="/app/todos" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
