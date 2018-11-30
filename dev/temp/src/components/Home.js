import React, { Component } from 'react';
import HomeInfoBlocks from './HomeInfoBlocks';
import { 
    Search, 
    Grid,
    Container
} from 'semantic-ui-react';
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



    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState({ isLoading: false, results: [], value: '' })

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            const filteredResults = _.reduce(
                this.props.tenders,
                (memo, data, name) => {
                    const results = _.filter(data.results, isMatch)
                    if (results.length) memo[name] = { name, results } // eslint-disable-line no-param-reassign

                    return memo
                },
                {},
            )
            this.setState({
                isLoading: false,
                results: filteredResults,
            })
        }, 300)
    }



    render() {
        const { isLoading, value, results } = this.state;

        if(this.props.tenders.length == 0)
            return <div>Loading...</div>

        var formattedSpending = new Intl.NumberFormat(
            'de-DE', 
            {
                style : 'currency', 
                currency : 'EUR',
                minimumFractionDigits : 0
            })
            .format(Math.round(this.props.stats.spending));

        return (
            <Container className='home-container'>
                <Container className='home-view-container'>
                    <Grid className='home-view-figures' columns={3} divided>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <h1>{this.props.stats.numberOfTenders}</h1>
                                <p>public tenders</p>
                            </Grid.Column>
                            <Grid.Column textAlign="center">
                                <h1> {formattedSpending}</h1>
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
                        <div>
                            <Search category
                                loading={isLoading}
                                onSearchChange={this.handleSearchChange}
                                results={results}
                                value={value}
                            />
                        </div>
                    </header>
                </Container>                
                <HomeInfoBlocks/>
            </Container>            
        );
    }
}

export default Home;