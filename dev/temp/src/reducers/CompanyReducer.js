import {
    FETCH_COMPANY_BY_ID,
    FETCH_COMPANY_BY_ID_SUCCESS,
    FETCH_COMPANY_BY_ID_FAILURE
} from '../actions/index.js';
import * as dl from 'datalib';
import _ from 'lodash';

const company = (state = {}, action) => {
    switch(action.type) {
        case FETCH_COMPANY_BY_ID :
            return {
                loading: true,
                company: undefined
            };
        case FETCH_COMPANY_BY_ID_SUCCESS:
            return {
                loading: false,
                company: {
                    tenders: action.payload,
                    // all these tenders share the same org, so just pick one
                    org: _.first(action.payload).supplier,
                    // do some basic stats
                    stats : dl.groupby()
                        .summarize([
                            { name: 'id', ops: ['count'], as: ['count']},
                            { name: 'percentageRibasso', ops: ['average'], as: ['average']},
                            { name: 'value.amount', ops:['sum'], as: ['sum']}
                        ])
                        .execute(action.payload)[0]

                }
            };
        case FETCH_COMPANY_BY_ID_FAILURE:
            return {
                loading: false,
                company: null
            };
        default:
            return {
                loading: true,
                company: undefined
            };
    }
}

export default company;