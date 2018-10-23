import { combineReducers } from 'redux';
import TendersReducer from '../reducers/TendersReducer';

const rootReducer = combineReducers({
    tenders: TendersReducer
});

export default rootReducer;