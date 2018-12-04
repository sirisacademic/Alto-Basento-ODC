import React, { Component } from 'react';
import TenderDimensionBar from './TenderDimensionBar';
import { 
    Header,
    Icon 
} from 'semantic-ui-react';

class TenderDimensionBars extends Component {
    constructor(props) {
        super(props)
        this.margins = {
            top: 0,
            right: 25,
            bottom: 3,
            left: 0
        };
    }


    render() {
        const data = this.props.data.sort((a, b) => (b.value - a.value));
        return (
            <div>
                <Header as='h3'>
                    <Header.Content>
                        {
                            this.props.category == 'tipo_appalto_dimension' ? 
                                'Contract type ' : 
                            this.props.category == 'tipo_intervento_dimension' ? 
                                'Category ' : 'Municipality '
                        }
                        <Icon name='search' size='small' color='grey'/>
                    </Header.Content>                        
                </Header>
                <div className='TenderDimensionBars'>
                    {
                        data.map(
                            (d, index) => <TenderDimensionBar category={this.props.category} key={index} data={d} height={30} onClickTender={this.props.onClickTender}></TenderDimensionBar>
                        )
                    }
                </div>                
            </div>
        );
    }
}

export default TenderDimensionBars