import React from 'react'
import { Provider } from 'react-redux';
import { LocalizeProvider } from 'react-localize-redux';
import Main from '../components/Main';

const Root = ({ store }) => (
    // <Provider> make the store available
    // to all container components in the App
    // without passing it explicitly
    
    <Provider store={store}>
        <LocalizeProvider>
            <Main/>
        </LocalizeProvider>
    </Provider>
)

export default Root;