
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
import {loadMails} from "./actions";

const store = configureStore();

store.dispatch(loadMails());
//store.dispatch({type:'server/hello', data:'Hello!'});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();

