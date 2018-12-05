import { connect } from 'react-redux';
import Company from '../../components/companies/Company';
import {
    fetchCompanyByID,
    fetchCompanyByIDSuccess
} from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
    // pass tender ID to be loaded or
    // the loaded tender object    
    return (state.company.loading)?
        { companyID : ownProps.match.params.id } : 
        { company : state.company.company };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCompanyByID: (id) => {
            dispatch(fetchCompanyByID(id)).then((response) => {
                    dispatch(
                        fetchCompanyByIDSuccess(response)
                    );
                });
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Company);