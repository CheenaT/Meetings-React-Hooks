import React, { useContext, useReducer} from 'react';
import { render } from 'react-dom';

import { ContextProvider } from './context';

import App from './App';
import "./style.scss";
import * as serviceWorker from './serviceWorker';


render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
