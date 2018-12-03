import React, { Component } from 'react';
import { Constants } from '../constants/constants';
import Utils from '../Utils';
import HomeInfoBlocks from './HomeInfoBlocks';
import { 
    Search, 
    Grid,
    Container,
    Button
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // flag to true if the Search is searching through results
            isLoading: false,
            // input value from user
            value: '',
            // result of the filtering
            results: []
        };   

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }


    
    componentDidMount() {
        this.props.fetchAllTenders();
    }

    handleSearchChange = (e, {value}) => {
        this.setState({ isLoading: true, value });
        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState({ isLoading: false, results: [], value: '' })

            // look through the searchable properties to
            // find the search text
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')            
            let filteredResults = _.filter(
                this.props.tenders,
                (tender) => {
                    return _.reduce(
                        Constants.SEARCHABLE_PROPERTIES,
                        function(memo, prop) {
                            return memo || re.test(_.get(tender, prop));
                        },
                        false
                    )
                }
            );
            
            //
            // convert the filtered results to an array of
            // Seach.Result properties
            let resultProps = _.map(
                filteredResults,
                (r) => {
                    return {
                        // unique key is needed by React
                        // https://reactjs.org/docs/lists-and-keys.html#keys
                        key: r.id,
                        title : r.organizationReference.legalName,
                        description : r.description,
                        price : Utils.formatCurrency(r.value.amount),
                        id : r.id
                    }
                }
            );

            this.setState({
                isLoading: false,
                results: resultProps
            });
        }, 300)
    };



    handleSearchResultClick = (event, data) => {
        this.props.history.push('/tender/' + data.result.id);
    }



    render() {
        const { isLoading, value, results } = this.state;

        if(this.props.tenders.length == 0)
            return <div>Loading...</div>

        return (
            <Container className='main-container'>
                <Container className='home-view-container'>
                    <Grid className='figures' columns={3} divided>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <h1>{this.props.stats.numberOfTenders}</h1>
                                <p>public tenders</p>
                            </Grid.Column>
                            <Grid.Column textAlign="center">
                                <h1> {Utils.formatCurrency(Math.round(this.props.stats.spending))}</h1>
                                <p>spend in public contracts</p>
                            </Grid.Column>
                            <Grid.Column textAlign="center">
                                <h1>{this.props.stats.numberOfProviders}</h1>
                                <p>providers</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <header>
                        <p className='claim'>
                        Ricerca ed esplora tutti gli appalti pubblici della centrale unica di committenza attraverso questo portale open
                        </p>
                        <Search
                            loading={isLoading}
                            minCharacters={3}
                            onSearchChange={this.handleSearchChange}
                            results={results}
                            value={value}
                            onResultSelect={this.handleSearchResultClick}
                        />
                        <Button 
                            as={Link}
                            to='/tenders'
                            primary 
                            circular="true"
                            size="large">Explore
                        </Button>
                    </header>
                </Container>                
                <HomeInfoBlocks/>
            </Container>            
        );
    }
}

export default Home;