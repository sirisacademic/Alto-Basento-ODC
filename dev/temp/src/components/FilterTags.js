import React, { Component } from 'react';
import { 
    Button, 
    Icon,
    Container
} from 'semantic-ui-react';

class FilterTags extends Component {

    render() {
        return (
            <Container>
                {
                    this.props.filters.map(
                        (d, index) =>      
                            <Button icon    
                                key={index}
                                size='mini'
                                labelPosition='left'
                                onClick={()=> this.props.onClickTag(d)}>
                                <Icon name='close'/>
                                {d.key}
                            </Button>
                    )
                }
                {(this.props.filters.length > 0) &&
                    <Button basic 
                        size='mini'
                        onClick={()=> this.props.onClearTags()}>
                        <strong>Clear all</strong>
                    </Button>
                }
            </Container>
        );
    }
}

export default FilterTags;