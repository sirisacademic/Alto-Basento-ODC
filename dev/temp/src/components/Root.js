import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import HeaderMenu from '../presentation/header/HeaderMenu';
import HomeContainer from '../containers/HomeContainer';
import TenderContainer from '../containers/tenders/TenderContainer';
import CompanyContainer from '../containers/companies/CompanyContainer';
import TenderBrowser from '../components/TenderBrowser';
import Footer from '../presentation/footer/Footer';
import DataHome from '../components/data/DataHome';

const Root = ({ store }) => (
    // Provider make the store available
    // to all container components in the App
    // without passing it explicitly
    <Provider store={store}>
        <Router>
            <div>
                <HeaderMenu/>
                <Container>
                    <Route exact path="/" component={HomeContainer} />
                    <Route exact path='/tenders' component={TenderBrowser} />
                    <Route path="/tender/:id" component={TenderContainer} />
                    <Route path="/company/:id" component={CompanyContainer} />
                    <Route exact path="/data" component={DataHome} />
                    <Route exact path="/data/:subsection" component={DataHome} />
                </Container>
                <Footer/>
            </div>
        </Router>
    </Provider>
)

export default Root;