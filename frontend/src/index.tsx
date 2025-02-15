import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import 'normalize.css';
import 'whatwg-fetch';

import { Root } from './components/Root';
import { getStore } from './utils/getStore';

const { store, history } = getStore();

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
