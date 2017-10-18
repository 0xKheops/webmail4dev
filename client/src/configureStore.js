//import React from 'react';
import { createStore, applyMiddleware, } from 'redux'
import { createLogger } from 'redux-logger'
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import reducer from './reducers'
import thunk from 'redux-thunk';

const configureStore = () => {

    // TODO voir sans parametre si ca marche
    let socket = io();
    let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

    const logger = createLogger()
    const store = createStore(reducer, applyMiddleware(thunk, logger, socketIoMiddleware));
   

    // ,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    // async function loadMails() {

    //     // retrieve emails from REST api
    //     const req = await fetch("/api/mails");
    //     const mails = await req.json();

    //     let state = store.getState();
    //     const currentMails = state && state.mails;

    //     // if mails are different
    //     if (!deepEqual(currentMails, mails)) {

    //         // refresh mails list
    //         store.dispatch(actions.displayMails(mails));

    //         // define current email if there is none
    //         state = store.getState();
    //         if (mails.length > 0 && !state.currentMailFilename) {
    //             store.dispatch(actions.displayMail(mails[0].filename));
    //         }
    //     }
    // }
    // loadMails();

    // auto update
    //setInterval(loadMails, 5000);

    return store;

}

export { configureStore };
