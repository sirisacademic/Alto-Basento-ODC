import { connect } from 'react-redux';
import { 
    removeFilter,
    removeAllFilters
} from '../actions/index';
import FilterTags from '../components/FilterTags';

const mapStateToProps = (state) => {
    return { filters: state.tenders.tendersList.filters };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickTag: (obj) => dispatch(removeFilter(obj)),
        onClearTags: () => dispatch(removeAllFilters())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterTags);