import { connect } from 'react-redux';
import { removeFilter } from '../actions/index';
import FilterTags from '../components/FilterTags';

const mapStateToProps = (state) => {
    return { filters: state.tenders.tendersList.filters };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickTag: (obj) => dispatch(removeFilter(obj))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterTags);