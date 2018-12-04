import React, { Component } from 'react';
import TenderDimensionBars from './TenderDimensionBars';
import { Constants } from '../constants/constants';
import { Container, Grid, Header } from 'semantic-ui-react';

class Tenders extends Component {

    // get all the tenders
    componentDidMount() {
        this.props.fetchAllTenders();
    }

    render() {
        if(this.props.tendersByDimension == false || this.props.tendersByDimension == undefined)
            return <div>Loading...</div>

        return (
            <Container className='main-container'>
                <Grid columns={2}>
                    <Grid.Column>
                        <Header as='h1'>{this.props.tenders.length}</Header>
                        <span>public tenders</span>
                    </Grid.Column>
                    <Grid.Column>
                        
                    </Grid.Column>
                </Grid>
                <Grid columns={3}>
                    <Grid.Column>
                        <TenderDimensionBars
                            category={'tipo_appalto_dimension'}
                            data={this.props.tendersByDimension[Constants.TIPO_APPALTO]} 
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
                    <Grid.Column>
                        <TenderDimensionBars
                            category={'comune_gara_dimension'}
                            data={this.props.tendersByDimension[Constants.COMUNE_GARE]}
                            onClickTender={this.props.onClickTender}>
                        </TenderDimensionBars>
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default Tenders;