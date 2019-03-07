import { connect } from 'react-redux';
import Tender from '../../components/tenders/Tender';
import {
    fetchTenderByID,
    fetchTenderByIDSuccess
} from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
    // pass tender ID to be loaded or
    // the loaded tender object    
    return (state.tender.loading)?
        { tenderID : ownProps.match.params.id } : 
        { tender : state.tender.tender };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTenderByID: (id) => {
            dispatch(fetchTenderByID(id)).then((response) => {
                    dispatch(
                        fetchTenderByIDSuccess(response)
                    );
                });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tender);