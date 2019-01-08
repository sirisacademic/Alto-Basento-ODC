import React from 'react';
import { renderToStaticMarkup } from "react-dom/server";
import { withLocalize } from "react-localize-redux";
import translations from '../locale/translations.json';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import HeaderMenu from '../presentation/header/HeaderMenu';
import HomeContainer from '../containers/HomeContainer';
import TenderContainer from '../containers/tenders/TenderContainer';
import CompanyContainer from '../containers/companies/CompanyContainer';
import TenderBrowser from '../components/TenderBrowser';
import Footer from '../presentation/footer/Footer';
import DataHome from '../components/data/DataHome';

class Main extends React.Component {
    constructor(props) {
        super(props);
    
        this.props.initialize({
            languages: [
                { name: "English", code: "en" },
                { name: "Italian", code: "it" }
            ],
            translation: translations,
            options: { 
                renderToStaticMarkup,
                renderInnerHtml : true,
                defaultLanguage : 'en'
            }
        });
    }
    
    componentDidUpdate(prevProps) {
        const prevLangCode = prevProps.activeLanguage && prevProps.activeLanguage.code;
        const curLangCode = this.props.activeLanguage && this.props.activeLanguage.code;
        const hasLanguageChanged = prevLangCode !== curLangCode;
        console.log('test', prevLangCode, curLangCode);
    }

    render() {
        return (
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
        )        
    }
}
export default withLocalize(Main);