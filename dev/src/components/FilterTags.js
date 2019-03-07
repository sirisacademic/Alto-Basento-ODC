import React, { Component } from 'react';
import { 
    Button, 
    Icon,
    Container
} from 'semantic-ui-react';

class FilterTags extends Component {

    render() {
        return (
            <Container style={{
                    marginTop: this.props.filters.length > 0 ? '15px' : '0',
                    paddingTop: this.props.filters.length > 0 ? '15px' : '0'
                }}>
                {(this.props.filters.length > 0) &&
                    <span style={{padding:'15px'}}>Applied filters:</span>
                }
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
                {(this.props.filters.length > 1) &&
                    <Button 
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