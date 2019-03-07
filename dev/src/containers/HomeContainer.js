import { connect } from 'react-redux';
import Home from '../components/Home';
import {
    fetchAllTenders,
    fetchAllTendersSuccess
} from '../actions/index'

import { getStatsFromTenders } from '../utils/stats';

const mapStateToProps = (state) => {
    let tenders = state.tenders.tendersList.tenders;    
    return (tenders.length === 0)?
        { 
            tenders : [] 
        } : 
        {
            // adapt the tenders to a format more suitable
            // for the Search Category component       
            'tenders' : tenders,

            // summarize basic stats
            'stats' : getStatsFromTenders(tenders)
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