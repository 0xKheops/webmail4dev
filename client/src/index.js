
// support for IE11
import "babel-polyfill";

// registers Roboto font : https://github.com/callemall/material-ui/issues/6256
import 'typeface-roboto';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers'
import * as actions from "./actions";
import thunkMiddleware from 'redux-thunk';
import * as deepEqual from "deep-equal";
import { Router, Route } from "react-router";

const loggerMiddleware = createLogger()
const store = createStore(reducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();

async function loadMails() {

    // retrieve emails from REST api
    const req = await fetch("/api/mails");
    const mails = await req.json();

    let state = store.getState();
    const currentMails = state && state.mails;

    // if mails are different
    if (!deepEqual(currentMails, mails)) {

        // refresh mails list
        store.dispatch(actions.displayMails(mails));

    // define current email if there is none
    state = store.getState();
        if (mails.length > 0 && !state.currentMailFilename) {
        console.log(mails[0]);
    store.dispatch(actions.displayMail(mails[0].filename));
        }
    }
}
loadMails();

setInterval(loadMails, 5000);