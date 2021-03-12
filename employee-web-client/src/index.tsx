import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';
import { Providers } from './Providers';
import { PublicRoutes } from './shared/Routes';
import { Logger, logHandler } from './utils/logger';

Logger.init(logHandler);

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <PublicRoutes />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
