'use strict';

import React from 'react';
import { render } from 'react-dom';

import App from './app.js';

render(<App/>, document.querySelector('#app'))

if (module.hot) {
  module.hot.accept();
}
