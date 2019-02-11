import crossfilter from 'crossfilter2';
import _ from 'lodash';
import {
    ADD_FILTER,
    REMOVE_FILTER,
    REMOVE_ALL_FILTERS,
    FETCH_ALL_TENDERS,
    FETCH_ALL_TENDERS_SUCCESS
} from '../actions/index.js';
import { Constants } from '../constants/constants';

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


const tenders = (state = INITIAL_STATE, action) => {
    let newState, 
        index,
        keys;
    
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
            action.payload.forEach((o) => {
                if(_.get(o, Constants.CATEGORY_APPALTO) === undefined)
                    _.set(o, Constants.CATEGORY_APPALTO, 'N/A');
            });
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
            newState.tendersList.dimensions.tipo_appalto_dimension = newState.tendersList.cf.dimension(d => d[Constants.TIPO_APPALTO]);
            newState.tendersList.dimensions.category_appalto_dimension = newState.tendersList.cf.dimension(d => _.get(d, Constants.CATEGORY_APPALTO));
            newState.tendersList.dimensions.tipo_intervento_dimension = newState.tendersList.cf.dimension(d => d[Constants.TIPO_INTERVENTO]);
            newState.tendersList.dimensions.comune_gara_dimension = newState.tendersList.cf.dimension(d => d[Constants.COMUNE_GARE]);
            newState.tendersList.dimensions.anno_dimension = newState.tendersList.cf.dimension(d => new Date(_.get(d, Constants.ANNO)).getFullYear());
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
                return el.category === action.payload.category && el.key === action.payload.key;
            });
            if(index !== -1) {
                newState.tendersList.filters.splice(index, 1);
                newState.tendersList.filters = [...newState.tendersList.filters];
            }
            else
                newState.tendersList.filters = [...newState.tendersList.filters, action.payload];
            
            // update the filter function of the dimension by:
            keys = _(newState.tendersList.filters)
                .filter(['category', action.payload.category])
                .map('key')
                .value();
            if(keys.length === 0)
                newState.tendersList.dimensions[action.payload.category].filterAll();
            else
                newState.tendersList.dimensions[action.payload.category].filter(function(key) {
                    return _.indexOf(keys, key) !== -1;
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
                return el.key === action.payload.key;
            });
            let filter = newState.tendersList.filters.splice(index, 1)[0];
            newState.tendersList.filters = [...newState.tendersList.filters];
            // update the filter function of the dimension by:
            keys = _(newState.tendersList.filters)
                .filter(['category', filter.category])
                .map('key')
                .value();
            if(keys.length === 0)
                newState.tendersList.dimensions[filter.category].filterAll();
            else
                newState.tendersList.dimensions[filter.category].filter(function(key) {
                    return _.indexOf(keys, key) !== -1;
                });
            return newState;

        case REMOVE_ALL_FILTERS:
            newState =  { 
                ...state, 
                tendersList: {
                    ...state.tendersList                    
                }
            };
            // clear filter and reset crossfilter dimensions
            newState.tendersList.filters = [];
            _.forOwn(newState.tendersList.dimensions, (val, key) => {
                newState.tendersList.dimensions[key].filterAll();
            });
            return newState;

        default:
            return state;
    }
}

export default tenders;