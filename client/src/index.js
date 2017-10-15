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
import thunkMiddleware from 'redux-thunk'

//registers Roboto font : https://github.com/callemall/material-ui/issues/6256
import 'typeface-roboto';

const loggerMiddleware = createLogger()
const store = createStore(reducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//store.dispatch(actions.fetchMails());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

async function loadMails() {
    const req = await fetch("/api/mails");
    const mails = await req.json();
    console.log("dispatching");
    store.dispatch(actions.displayMails(mails));
}
loadMails();