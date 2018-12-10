import { connect } from 'react-redux'
import * as dl from 'datalib';
import { Constants } from '../../constants/constants';
import Charts from './Charts'

const mapStateToProps = (state) => {
    var props = {
        tenders: (state.tenders.tendersList.cf == null)?    [] : state.tenders.tendersList.cf.allFiltered(),
        stats : {} 
    };
    console.log("charts container");
    console.log(props.tenders);

    if(props.tenders.length > 0) {
        
        // create data to populate scatterplot average saving / average amount, per categories
        props.stats.savingByCategory = dl.groupby(Constants.TIPO_INTERVENTO)
                            .summarize([
                                { name: 'percentageRibasso', ops: ['average'], as: ['average_ribasso']},
                                { name: 'value.amount', ops:['average', 'sum'], as: ['average_amount', 'sum_amount']}
                            ])
                            .execute(props.tenders);
    };

    return props;
};


const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Charts);