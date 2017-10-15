//import React from 'react';
import * as deepEqual from "deep-equal";
//import { createLogger } from 'redux-logger'
import {
    createStore,
   // applyMiddleware,
} from 'redux'
//import thunkMiddleware from 'redux-thunk';
import reducer from './reducers'
import * as actions from "./actions";

const configureStore = () => {

    //const loggerMiddleware = createLogger()
    const store = createStore(reducer,
        //applyMiddleware(thunkMiddleware, loggerMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
                store.dispatch(actions.displayMail(mails[0].filename));
            }
        }
    }
    loadMails();

    // auto update
    setInterval(loadMails, 5000);

    return store;

}

export { configureStore };
