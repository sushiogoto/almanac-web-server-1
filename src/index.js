import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/lib/createHashHistory';
import { Provider } from 'react-redux';
import { Router, Redirect } from 'react-router';
import configureStore from './store/configureStore';
import routes from './routes';
import { syncReduxAndRouter } from 'redux-simple-router';

/**
 * "history" is a JavaScript library that lets you easily manage
 * session history in browsers, testing environments, and (soon, via React Native)
 * native devices. history abstracts away the differences in these different
 * platforms and provides a minimal API that lets you manage the history stack,
 * navigate, confirm navigation, and persist state between sessions. "history" is
 * library-agnostic and may easily be included in any JavaScript project.
 */

const store = configureStore();
const history = createHistory();

/**
 * Call "syncReduxAndRouter" with a react-router and a redux store instance to install hooks that
 * always keep both of them in sync. When one changes, so will the other.
 */

syncReduxAndRouter(history, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from="/" to="home" />
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
