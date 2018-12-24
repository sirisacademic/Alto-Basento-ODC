import _ from 'lodash';

export const getStatsFromTenders = (tenders) => {
    // summarize basic stats
    return {
        // total number of tenders
        numberOfTenders : 
            tenders.length,

        // total accumulated spending
        spending: 
            _.reduce(
                tenders, 
                function(result, tender) {
                    return tender.value.amount + result;
                }, 
            0),

        // number of different providers
        numberOfProviders : 
            _.uniqBy(
                tenders, 
                function(tender) { 
                    return tender.organizationReference.legalName;
                }).length
    }
};