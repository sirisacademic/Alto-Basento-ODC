import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { 
    createStore,
    applyMiddleware
} from 'redux';
import './index.css';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk'

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware));

ReactDOM.render(
    // Provider make the store available
    // to all container components in the App
    // without passing it explicitly
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();