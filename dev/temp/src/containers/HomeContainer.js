import { connect } from 'react-redux';
import Home from '../components/Home';
import _ from 'lodash';
import {
    fetchAllTenders,
    fetchAllTendersSuccess
} from '../actions/index'

const mapStateToProps = (state) => {
    let tenders = state.tenders.tendersList.tenders;
    
    if(tenders.length === 0)
        return { tenders : [] };        


    return {
        // adapt the tenders to a format more suitable
        // for the Search Category component       
        'tenders' : tenders,

        // summarize basic stats
        'stats' : {
            // total number of tenders
            numberOfTenders : 
                tenders.length,

            // total accumulated spending
            spending: 
                _.reduce(
                    tenders, 
                    function(result, tender) {
                        return tender.value.amount + result;
                    }, 
                0),

            // number of different providers
            numberOfProviders : 
                _.uniqBy(
                    tenders, 
                    function(tender) { 
                        return tender.organizationReference.legalName;
                    }).length
        }
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