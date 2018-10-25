import { connect} from 'react-redux';
import Tenders from '../components/Tenders';
import {
    fetchAllTenders,
    fetchAllTendersSuccess,
    addFilter
} from '../actions/index'
import { DIMENSIONS } from '../constants/constants';
import _ from 'lodash';

const mapStateToProps = (state) => {
    let obj = {
        tendersByDimension : state.tenders.tendersList.loading? false : {
            tipo_appalto    : state.tenders.tendersList.dimensions.tipo_appalto_dimension.group().all(),
            tipo_intervento : state.tenders.tendersList.dimensions.tipo_intervento_dimension.group().all(),
            comune_gara     : state.tenders.tendersList.dimensions.comune_gara_dimension.group().all()
        }
    };

    // add state of 'selected' to each item of the dimension
    if(!state.tenders.tendersList.loading) {
        DIMENSIONS.forEach(dimension => {
            obj.tendersByDimension[dimension].forEach(item => {
                item.selected = _.find(state.tenders.tendersList.filters, ['key', item.key]) != undefined;   
            });
        });
    }

    return obj;
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