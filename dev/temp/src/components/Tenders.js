import React, { Component } from 'react';
import TenderDimensionBars from './TenderDimensionBars';
import { Constants } from '../constants/constants';

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
                    data={this.props.tendersByDimension[Constants.TIPO_APPALTO]} 
                    onClickTender={this.props.onClickTender}>
                </TenderDimensionBars>
                <TenderDimensionBars
                    category={'tipo_intervento_dimension'}
                    data={this.props.tendersByDimension[Constants.TIPO_INTERVENTO]} 
                    onClickTender={this.props.onClickTender}>
                </TenderDimensionBars>
                <TenderDimensionBars
                    category={'comune_gara_dimension'}
                    data={this.props.tendersByDimension[Constants.COMUNE_GARE]}
                    onClickTender={this.props.onClickTender}>
                </TenderDimensionBars>
            </div>
        );
    }
}

export default Tenders;