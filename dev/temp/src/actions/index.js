import * as d3 from 'd3';
import data from '../data/garadata.csv';


export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const FETCH_ALL_TENDERS = 'FETCH_ALL_TENDERS';
export const FETCH_ALL_TENDERS_SUCCESS = 'FETCH_ALL_TENDERS_SUCCESS';
export const FETCH_ALL_TENDERS_FAILURE = 'FETCH_ALL_TENDERS_FAILURE';



// tender fetching actions

export function fetchAllTenders() {
    return function(dispatch) {
        return d3.csv(data)
            .then(
                function(response) {
                    return response;
                },
                function(error) {
                    console.log("error", error);
                }
            );
    }
};

export const fetchAllTendersSuccess = (tenders) => ({
    type: FETCH_ALL_TENDERS_SUCCESS,
    payload: tenders
});

export const fetchAllTendersFailure = (error) => ({
    type: FETCH_ALL_TENDERS_FAILURE,
    payload: error
});




// filter actions

export const addFilter = (filter) => ({
    type: ADD_FILTER,
    payload: filter
});

export const removeFilter = (filter) => ({
    type: REMOVE_FILTER,
    payload: filter
});