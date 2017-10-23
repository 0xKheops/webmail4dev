import { createStore, applyMiddleware, } from 'redux'
import { createLogger } from 'redux-logger'
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import reducer from './reducers'
import thunk from 'redux-thunk';

const configureStore = () => {
    
    let socket = io();
    let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

    const middlewares = [thunk, socketIoMiddleware];
    if(process.env.NODE_ENV === "development"){
        middlewares.push(createLogger());
    }

    const store = createStore(reducer, applyMiddleware(...middlewares));

    return store;

}

export { configureStore };
