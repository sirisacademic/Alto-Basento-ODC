import { combineReducers } from 'redux';
import TendersReducer from '../reducers/TendersReducer';
import TenderReducer from '../reducers/TenderReducer';
import CompanyReducer from '../reducers/CompanyReducer';

const rootReducer = combineReducers({
    tenders: TendersReducer,
    // state to handle the routing case when a 
    // single tender is requested via URL
    tender: TenderReducer,
    // state to handle the routing case when a 
    // single company is requested via URL
    company: CompanyReducer
});

export default rootReducer;