import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class TenderCards extends Component {

    render() {
        console.log("CARDS");
        console.log(this.props.tenders);
        return (
            <Card.Group>
                {
                    this.props.tenders.map(
                        (d, index) =>
                            <Card key={index}>
                                <Card.Content>
                                    <Card.Header>{d.spesa_categoria}</Card.Header>
                                    <Card.Meta>{d.nome_impresa}</Card.Meta>
                                    <Card.Description>{d.abstract_progetto}</Card.Description>
                                </Card.Content>
                            </Card>
                    )
                }                
            </Card.Group>
        );
    }
}

export default TenderCards;