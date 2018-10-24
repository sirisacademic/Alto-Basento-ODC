import React, { Component } from 'react';
import TenderDimensionBars from './TenderDimensionBars';

class Tenders extends Component {

    // get all the tenders
    componentDidMount() {
        this.props.fetchAllTenders();
    }

    render() {
        if(this.props.tendersByDimension == false || this.props.tendersByDimension == undefined)
            return <div>Loading...</div>

        return (
           <div className='TenderDimensionFilter'>
                <TenderDimensionBars
                    category={'tipo_appalto_dimension'}
                    data={this.props.tendersByDimension.tipo_appalto} 
                    onclick={this.props.click}>
                </TenderDimensionBars>
                <TenderDimensionBars
                    category={'tipo_intervento_dimension'}
                    data={this.props.tendersByDimension.tipo_intervento} 
                    onclick={this.props.onclick}>
                </TenderDimensionBars>
                <TenderDimensionBars
                    category={'comune_gara_dimension'}
                    data={this.props.tendersByDimension.comune_gara}
                    onclick={this.props.onclick}>
                </TenderDimensionBars>
            </div>
        );
    }
}

export default Tenders;