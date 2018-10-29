import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { 
    createStore,
    applyMiddleware
} from 'redux';
import './index.css';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk'

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Root store={store}/>, document.getElementById('root')
);
registerServiceWorker();