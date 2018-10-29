import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
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

        return (
            <div className=''>
                <Search category
                    loading={isLoading}
                    onSearchChange={this.handleSearchChange}
                    results={results}
                    value={value}
                />
            </div>
        );
    }
}

export default Home;