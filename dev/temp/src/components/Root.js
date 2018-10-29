import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';


const Root = ({ store }) => (
    // Provider make the store available
    // to all container components in the App
    // without passing it explicitly
    <Provider store={store}>
        <Router>
            <Route path="/" component={HomeContainer} />
        </Router>
    </Provider>
)

export default Root