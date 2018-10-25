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
                    onClickTender={this.props.onClickTender}>
                </TenderDimensionBars>
                <TenderDimensionBars
                    category={'tipo_intervento_dimension'}
                    data={this.props.tendersByDimension.tipo_intervento} 
                    onClickTender={this.props.onClickTender}>
                </TenderDimensionBars>
                <TenderDimensionBars
                    category={'comune_gara_dimension'}
                    data={this.props.tendersByDimension.comune_gara}
                    onClickTender={this.props.onClickTender}>
                </TenderDimensionBars>
            </div>
        );
    }
}

export default Tenders;