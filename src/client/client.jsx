/**
 *
 */

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';

require('./resources/scss/main.scss');

const store   = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

renderDom(Root);

if (module.hot) {
  //module.hot.accept('./containers/Root', renderDom);
  module.hot.accept('./containers/Root', () => {
    const App = require('./containers/Root').default;

    renderDom(App);
  });
}

function renderDom (Root) {
  render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  );
}