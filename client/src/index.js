
// support for IE11
import "babel-polyfill";

// registers Roboto font : https://github.com/callemall/material-ui/issues/6256
import 'typeface-roboto';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux'
import { configureStore } from "./configureStore";
import registerServiceWorker from './registerServiceWorker';
import { loadMails } from "./actions";
import { registerNotifications } from "./utilities/notifications";

// setup redux store
const store = configureStore();
store.dispatch(loadMails());

// request permission for notifications
registerNotifications(store);

// render
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// unused for now but who knows :)
registerServiceWorker();

