import {
    FETCH_TENDER_BY_ID,
    FETCH_TENDER_BY_ID_SUCCESS,
    FETCH_TENDER_BY_ID_FAILURE
} from '../actions/index.js';

const tender = (state = {}, action) => {
    switch(action.type) {
        case FETCH_TENDER_BY_ID :
            return {
                loading: true,
                tender: undefined
            };
        case FETCH_TENDER_BY_ID_SUCCESS:
            return {
                loading: false,
                tender: action.payload
            };
        case FETCH_TENDER_BY_ID_FAILURE:
            return {
                loading: false,
                tender: null
            };
        default:
            return {
                loading: true,
                tender: undefined
            };
    }
}

export default tender;