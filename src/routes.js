import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { Home } from 'containers/Home';
import { About } from 'containers/About';
import { List } from 'containers/List';

export default (
  <Route path="/" component={App}>
    <Route path="home" component={Home} />
    <Route path="about" component={About} />
    <Route path="list" component={List} />
  </Route>
);
