import { connect} from 'react-redux';
import Tenders from '../components/Tenders';
import {
    fetchAllTenders,
    fetchAllTendersSuccess,
    addFilter
} from '../actions/index'
import { Constants } from '../constants/constants';
import _ from 'lodash';
import { getStatsFromTenders } from '../utils/stats';

const mapStateToProps = (state) => {

    if(state.tenders.tendersList.loading)
        return {
            tendersByDimension : false
        };
    else {
        let obj = {
            tenders: state.tenders.tendersList.cf.allFiltered(),
            tendersByDimension : {}            
        };

        obj.stats = getStatsFromTenders(obj.tenders);

        obj.tendersByDimension[Constants.TIPO_APPALTO] = state.tenders.tendersList.dimensions.tipo_appalto_dimension.group().all();
        obj.tendersByDimension[Constants.CATEGORY_APPALTO] = state.tenders.tendersList.dimensions.category_appalto_dimension.group().all();
        obj.tendersByDimension[Constants.TIPO_INTERVENTO] = state.tenders.tendersList.dimensions.tipo_intervento_dimension.group().all();
        obj.tendersByDimension[Constants.COMUNE_GARE] = state.tenders.tendersList.dimensions.comune_gara_dimension.group().all();
        obj.tendersByDimension[Constants.ANNO] = state.tenders.tendersList.dimensions.anno_dimension.group().all();        

        // add state of 'selected' to each item of the dimension
        Constants.DIMENSIONS.forEach(dimension => {
            obj.tendersByDimension[dimension].forEach(item => {
                item.selected = _.find(state.tenders.tendersList.filters, ['key', item.key]) !== undefined;   
            });
        });
        return obj;
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTenders: () => {
            dispatch(fetchAllTenders()).then((response) => {
                    dispatch(
                        fetchAllTendersSuccess(response)
                    );
                });
        },
        onClickTender: (obj) => dispatch(addFilter(obj))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tenders);