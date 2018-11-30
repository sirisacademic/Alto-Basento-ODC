import React, { Component } from 'react';
import { Header, Divider, Grid, GridColumn, GridRow, Icon, Label } from 'semantic-ui-react';
import * as d3 from 'd3';

class Tender extends Component {

    // get all the tenders
    componentDidMount() {
        this.props.fetchTenderByID(this.props.tenderID);
    }

    render() {
        if(this.props.tenderID)
            return <div>Loading...</div>

        let tender = this.props.tender,
            tenderDate =  new Date(tender.contractPeriod.startDate);

        return (
            <div>
                <Header as='h1'>
                    {tender.description}
                    </Header>
                <Label as='a' color='grey' image>
                    Identifier
                    <Label.Detail>{tender.id}</Label.Detail>
                </Label>
                <Divider></Divider>
                
                <Grid>
                    <GridColumn width='4'>
                        <p style={{ fontSize: '4em', fontWeight: '300'}}>
                            {d3.format("$,")(tender.value.amount)}
                        </p>
                    </GridColumn>
                    <GridColumn width='12'>
                        <p>
                            {tender.description}
                        </p>
                    </GridColumn>
                </Grid>
                
                <Grid>
                    <GridColumn width='10'>
                        <GridRow>
                            <Header as='h3'>
                                <Icon name='building'/> 
                                <Header.Content>{tender.organizationReference.legalName}
                                    <Header.Subheader>
                                        <Icon name='map marker alternate' />{tender.municipality}
                                    </Header.Subheader>
                                </Header.Content>
                            </Header>
                        </GridRow>
                        <GridRow>
                            <Header as='h3'>
                                    <Icon name='calendar outline'/> 
                                    <Header.Content>{tenderDate.getDate()} / {tenderDate.getMonth() + 1} / {tenderDate.getFullYear()}
                                        <Header.Subheader>Data di assegnazione appalto</Header.Subheader>
                                    </Header.Content>
                            </Header>
                        </GridRow>
                    </GridColumn>
                    <GridColumn width='6'>

                    </GridColumn>
                </Grid>
            </div>           
        );
    }
}

export default Tender;