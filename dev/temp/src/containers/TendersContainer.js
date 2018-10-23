import { connect} from 'react-redux';
import Tenders from '../components/Tenders';
import {
    fetchAllTenders,
    fetchAllTendersSuccess,
    addFilter
} from '../actions/index'

const mapStateToProps = (state) => {
    return {
        tendersByDimension : state.tenders.tendersList.loading? false : {
            tipo_appalto    : state.tenders.tendersList.dimensions.tipo_appalto_dimension.group().all(),
            tipo_intervento : state.tenders.tendersList.dimensions.tipo_intervento_dimension.group().all(),
            comune_gara     : state.tenders.tendersList.dimensions.comune_gara_dimension.group().all()
        }
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
        onclick: (obj) => {
            dispatch(addFilter(obj));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tenders);