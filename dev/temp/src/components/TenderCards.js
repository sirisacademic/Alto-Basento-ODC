import React, { Component } from 'react'
import { 
    Card,
    Icon
} from 'semantic-ui-react'
import * as d3 from 'd3';

class TenderCards extends Component {

    render() {
        return (
            <Card.Group itemsPerRow={4}>
                {
                    this.props.tenders.map(
                        (d, index) =>
                            <Card key={index}
                                href={'/tender/' + d.id}>
                                <Card.Content>
                                    <Card.Header>{d.organizationReference.legalName}</Card.Header>
                                    <Card.Meta>{d3.format("$,")(d.value.amount)}</Card.Meta>
                                    <Card.Description>{d.description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='map marker' />
                                        {d.municipality}
                                    </a>
                                </Card.Content>
                            </Card>
                    )
                }                
            </Card.Group>
        );
    }
}

export default TenderCards;