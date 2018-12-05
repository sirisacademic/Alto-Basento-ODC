import React, { Component } from 'react'
import { 
    Card,
    Container,
    Icon,
    Header,
    Button
} from 'semantic-ui-react'
import * as d3 from 'd3';

class TenderCards extends Component {

    render() {
        return (
            <Container>
                <Header as='h3'>Results:</Header>
                <Card.Group itemsPerRow={4}>
                {
                    this.props.tenders.map(
                        (d, index) =>
                            <Card key={index}>
                                <Card.Content>
                                    <Card.Header>{d.organizationReference.legalName}</Card.Header>
                                    <Card.Meta className='price'>{d3.format("$,")(d.value.amount)}</Card.Meta>
                                    <Card.Description>{d.description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='map marker' />
                                        {d.municipality}
                                    </a>
                                    <Button href={'/tender/' + d.id} content='+ info' floated='right' size='mini'/>
                                </Card.Content>
                            </Card>
                    )
                }                
                </Card.Group>
            </Container>            
        );
    }
}

export default TenderCards;