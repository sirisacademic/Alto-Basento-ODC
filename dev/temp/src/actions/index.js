import axios from 'axios';
import _ from 'lodash';

export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const REMOVE_ALL_FILTERS = 'REMOVE_ALL_FILTERS';

export const FETCH_ALL_TENDERS = 'FETCH_ALL_TENDERS';
export const FETCH_ALL_TENDERS_SUCCESS = 'FETCH_ALL_TENDERS_SUCCESS';
export const FETCH_ALL_TENDERS_FAILURE = 'FETCH_ALL_TENDERS_FAILURE';

export const FETCH_TENDER_BY_ID = 'FETCH_TENDER_BY_ID';
export const FETCH_TENDER_BY_ID_SUCCESS = 'FETCH_TENDER_BY_ID_SUCCESS';
export const FETCH_TENDER_BY_ID_FAILURE = 'FETCH_TENDER_BY_ID_FAILURE';

export const FETCH_COMPANY_BY_ID = 'FETCH_COMPANY_BY_ID';
export const FETCH_COMPANY_BY_ID_SUCCESS = 'FETCH_COMPANY_BY_ID_SUCCESS';
export const FETCH_COMPANY_BY_ID_FAILURE = 'FETCH_COMPANY_BY_ID_FAILURE';


let fixCandidates = tender => {
    tender.candidates = _.filter(tender.candidates, candidate => candidate.name !== "");
    return tender;
}



// ---------------------------------------------
// tender fetching actions

export const fetchAllTenders = () => {
    return function(dispatch) {
        return axios.get(
            'http://localhost:8080/all'
        )
        .then(
            function(response) {
                response.data.forEach(fixCandidates);
                console.log("// Fetch all tenders: /////////");
                console.log(response.data);
                return response.data;
            },
            function(error) {
                console.log("error", error);
            }
        );
    };
};

export const fetchAllTendersSuccess = (tenders) => ({
    type: FETCH_ALL_TENDERS_SUCCESS,
    payload: tenders
});

export const fetchAllTendersFailure = (error) => ({
    type: FETCH_ALL_TENDERS_FAILURE,
    payload: error
});

export const fetchTenderByID = (id) => {
    return function(dispatch) {
        return axios.get(
            'http://localhost:8080/tender/' + id
        )
        .then(
            function(response) {
                fixCandidates(response.data);
                return response.data;
            },
            function(error) {
                console.log("error", error);
            }
        );
    };
};

export const fetchTenderByIDSuccess = (tender) => ({
    type: FETCH_TENDER_BY_ID_SUCCESS,
    payload: tender
});

export const fetchTenderByIDFailure = (error) => ({
    type: FETCH_TENDER_BY_ID_FAILURE,
    payload: error
});



// ---------------------------------------------
// company fetching actions

export const fetchCompanyByID = (id) => {
    return function(dispatch) {
        return axios.get(
            'http://localhost:8080/company/' + id
        )
        .then(
            function(response) {
                return response.data;
            },
            function(error) {
                console.log("error", error);
            }
        );
    };
};

export const fetchCompanyByIDSuccess = (company) => ({
    type: FETCH_COMPANY_BY_ID_SUCCESS,
    payload: company
});

export const fetchCompanyByIDFailure = (error) => ({
    type: FETCH_COMPANY_BY_ID_FAILURE,
    payload: error
});



// ---------------------------------------------
// filter actions

export const addFilter = (filter) => ({
    type: ADD_FILTER,
    payload: filter
});

export const removeFilter = (filter) => ({
    type: REMOVE_FILTER,
    payload: filter
});

export const removeAllFilters = () => ({
    type: REMOVE_ALL_FILTERS
});