import crossfilter from 'crossfilter2';
import _ from 'lodash';
import {
    ADD_FILTER,
    REMOVE_FILTER,
    FETCH_ALL_TENDERS,
    FETCH_ALL_TENDERS_SUCCESS
} from '../actions/index.js';

let cf
const INITIAL_STATE = {
    tendersList : {
        // list of tenders
        tenders : [],
        // error fetching tenders
        error: null,
        // flag state for loading tenders
        loading: true,
        // use crossfilter to perform multidimensional filtering
        // and aggregations. Crossfilter is intended to deal with
        // large datasets, which is not the case, but at least will
        // save us from coding the faceting stuff when selecting items
        cf : null,
        // define the dimensions used to filter the tenders list
        dimensions : {},
        // filters selected
        filters: []
    }
};


export default function(state = INITIAL_STATE, action) {
    let newState, 
        index;
    
    switch(action.type) {

        // start fetching all tenders and flag the state
        // as "loading"
        case FETCH_ALL_TENDERS:
            return {
                ...state,
                tendersList: {
                    tenders: [],
                    error: null,
                    loading: true
                }
            };
        case FETCH_ALL_TENDERS_SUCCESS:
            // create the crossfilter object with all
            // the tenders and set the dimensions that
            // will act as filters in the UI
            newState = {
                ...state,
                tendersList: {
                    ...state.tendersList,
                    tenders: action.payload,
                    error: null,
                    loading: false,
                    cf: crossfilter(action.payload)
                }
            };
            newState.tendersList.dimensions.tipo_appalto_dimension = newState.tendersList.cf.dimension(d => d.tipo_appalto);
            newState.tendersList.dimensions.tipo_intervento_dimension = newState.tendersList.cf.dimension(d => d.tipo_intervento);
            newState.tendersList.dimensions.comune_gara_dimension = newState.tendersList.cf.dimension(d => d.comune_gara);
            return newState;
        
        case ADD_FILTER:
            newState =  { 
                ...state, 
                tendersList: {
                    ...state.tendersList                    
                }
            };
            // update the list of filters
            index = state.tendersList.filters.findIndex((el) => {
                return el.category == action.payload.category && el.key == action.payload.key;
            });
            if(index != -1) {
                newState.tendersList.filters.splice(index, 1);
                newState.tendersList.filters = [...newState.tendersList.filters];
            }
            else
                newState.tendersList.filters = [...newState.tendersList.filters, action.payload];
            
            // update the filter function of the dimension by:
            var keys = _(newState.tendersList.filters)
                .filter(['category', action.payload.category])
                .map('key')
                .value();
            if(keys.length == 0)
                newState.tendersList.dimensions[action.payload.category].filterAll();
            else
                newState.tendersList.dimensions[action.payload.category].filter(function(key) {
                    return _.indexOf(keys, key) != -1;
                });
            return newState;

        case REMOVE_FILTER:
            newState =  { 
                ...state, 
                tendersList: {
                    ...state.tendersList                    
                }
            };
            // update the list of filters
            index = state.tendersList.filters.findIndex((el) => {
                return el.key == action.payload.key;
            });
            let filter = newState.tendersList.filters.splice(index, 1)[0];
            newState.tendersList.filters = [...newState.tendersList.filters];
            // update the filter function of the dimension by:
            var keys = _(newState.tendersList.filters)
                .filter(['category', filter.category])
                .map('key')
                .value();
            if(keys.length == 0)
                newState.tendersList.dimensions[filter.category].filterAll();
            else
                newState.tendersList.dimensions[filter.category].filter(function(key) {
                    return _.indexOf(keys, key) != -1;
                });
            return newState;

        default:
            return state;
    }
}