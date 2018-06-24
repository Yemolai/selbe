import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
const rootEl = document.getElementById('root');
const reduxApp = <Provider store={store}><App /></Provider>;

ReactDOM.render(reduxApp, rootEl);
registerServiceWorker();
