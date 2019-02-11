import React, { Component } from 'react';
import TenderDimensionBar from './TenderDimensionBar';
import { 
    Header,
    Icon 
} from 'semantic-ui-react';
import { 
    withLocalize,
    Translate 
} from 'react-localize-redux';

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
        const translationId = this.props.category ===               
            'tipo_appalto_dimension' ? 
                'tenders.filters.contractType' : 
            this.props.category === 'category_appalto_dimension' ?   
                'tenders.filters.contractCategory' :
            this.props.category === 'tipo_intervento_dimension' ? 
                'tenders.filters.category' : 
            this.props.category === 'anno_dimension' ? 
                'tenders.filters.year' : 'tenders.filters.municipality';

        return (
            <div>
                <Header as='h5'>
                    <Header.Content>
                        <Translate id={translationId}/>
                        <Icon name='search' size='small' color='grey'/>
                    </Header.Content>                        
                </Header>
                <div className='TenderDimensionBars'>
                    {
                        data.map(
                            (d, index) => <TenderDimensionBar 
                                category={this.props.category} 
                                key={index} 
                                data={d} 
                                height={30} 
                                onClickTender={this.props.onClickTender}>
                            </TenderDimensionBar>
                        )
                    }
                </div>                
            </div>
        );
    }
}

export default withLocalize(TenderDimensionBars)