import { connect } from 'react-redux'
import TenderCards from '../components/TenderCards'

const mapStateToProps = (state) => {
    return {
        tenders: (state.tenders.tendersList.cf == null)?    [] : state.tenders.tendersList.cf.allFiltered() 
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TenderCards);