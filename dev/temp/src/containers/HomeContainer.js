import { connect } from 'react-redux';
import Home from '../components/Home';
import _ from 'lodash';
import Constants from '../constants/constants';
import {
    fetchAllTenders,
    fetchAllTendersSuccess
} from '../actions/index'

const mapStateToProps = (state) => {

    if(state.tenders.tendersList.tenders.length == 0)
        return { tenders : [] };

    // adapt the tenders to a format more suitable
    // for the Search Category component
    return {
        'tenders' : _.reduce(
                        Constants.SEARCHABLE_PROPERTIES,
                        (memo, prop) => {
                            if(!memo[prop])
                                memo[prop] = { 'name' : prop, 'results' : [] };
                            
                            memo[prop].results = _(state.tenders.tendersList.tenders)
                                .uniqBy(prop)
                                .map((d) => { return { 'title' : d[prop], 'id' : 1}; })
                                .value();
                            return memo;
                        },
                        {}
                    )
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTenders: () => {
            dispatch(fetchAllTenders()).then((response) => {
                    dispatch(
                        fetchAllTendersSuccess(response)
                    );
                });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);