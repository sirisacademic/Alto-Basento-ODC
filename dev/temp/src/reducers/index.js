import { combineReducers } from 'redux';
import TendersReducer from '../reducers/TendersReducer';
import TenderReducer from '../reducers/TenderReducer';

const rootReducer = combineReducers({
    tenders: TendersReducer,
    // state to handle the routing case when a 
    // single tender is requested via URL
    tender: TenderReducer
});

export default rootReducer;