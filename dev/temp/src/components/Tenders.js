import React, { Component } from 'react';
import TenderDimensionBars from './TenderDimensionBars';
import { Constants } from '../constants/constants';
import Utils from '../Utils';
import { 
    Container, 
    Grid, 
    Search,
    Statistic, 
    Divider,
    Segment
} from 'semantic-ui-react';
import _ from 'lodash';
import Preloader from '../presentation/preloader/Preloader';
import FilterTagsContainer from '../containers/FilterTagsContainer';
import { 
    withLocalize,
    Translate 
} from 'react-localize-redux';

class Tenders extends Component {

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



    // get all the tenders
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
                        title : r.supplier.legalName,
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

        if(this.props.tendersByDimension === false || this.props.tendersByDimension === undefined)
            return <Preloader/>

        let statisticSize = 'small',
            statisticColor = 'black';
        return (
            <Container className='main-container'>
            <Segment style={{marginTop: '67px', marginBottom: '50px'}}>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Statistic size={statisticSize} color={statisticColor}>
                                <Statistic.Value>{this.props.stats.numberOfTenders}</Statistic.Value>
                                <Statistic.Label>
                                    <Translate id='tenders.stats.tenders'/>
                                </Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Statistic size={statisticSize} color={statisticColor}>
                                <Statistic.Value>{Utils.formatCurrency(Math.round(this.props.stats.spending))}</Statistic.Value>
                                <Statistic.Label>
                                    <Translate id='tenders.stats.spending'/>
                                </Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Statistic size={statisticSize} color={statisticColor}>
                                <Statistic.Value>{this.props.stats.numberOfProviders}</Statistic.Value>
                                <Statistic.Label>
                                    <Translate id='tenders.stats.providers'/>
                                </Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>
                <Grid columns={2}>
                    <Grid.Column width={3}>
                        <p>
                            <Translate id='tenders.search'/>
                        </p>
                        <Divider/>
                        <Search loading={isLoading}
                                minCharacters={3}
                                onSearchChange={this.handleSearchChange}
                                results={results}
                                value={value}
                                size='small'
                                onResultSelect={this.handleSearchResultClick}/>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <p>
                            <Translate id='tenders.searchByFilter'/>
                        </p>
                        <Divider/>
                        <Grid columns={4} style={{marginTop: '1rem'}}>
                            <Grid.Column width={3}>
                                <TenderDimensionBars
                                    category={'tipo_appalto_dimension'}
                                    data={this.props.tendersByDimension[Constants.TIPO_APPALTO]} 
                                    onClickTender={this.props.onClickTender}>
                                </TenderDimensionBars>
                            </Grid.Column>
                            <Grid.Column>
                                <TenderDimensionBars
                                    category={'category_appalto_dimension'}
                                    data={this.props.tendersByDimension[Constants.CATEGORY_APPALTO]} 
                                    onClickTender={this.props.onClickTender}>
                                </TenderDimensionBars>
                            </Grid.Column>                            
                            <Grid.Column>
                                <TenderDimensionBars
                                    category={'tipo_intervento_dimension'}
                                    data={this.props.tendersByDimension[Constants.TIPO_INTERVENTO]} 
                                    onClickTender={this.props.onClickTender}>
                                </TenderDimensionBars>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <TenderDimensionBars
                                    category={'comune_gara_dimension'}
                                    data={this.props.tendersByDimension[Constants.COMUNE_GARE]}
                                    onClickTender={this.props.onClickTender}>
                                </TenderDimensionBars>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <TenderDimensionBars
                                    category={'anno_dimension'}
                                    data={this.props.tendersByDimension[Constants.ANNO]}
                                    onClickTender={this.props.onClickTender}>
                                </TenderDimensionBars>
                            </Grid.Column>
                        </Grid>
                        <FilterTagsContainer></FilterTagsContainer>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default withLocalize(Tenders);