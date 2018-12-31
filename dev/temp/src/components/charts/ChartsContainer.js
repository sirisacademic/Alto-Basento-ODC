import { connect } from 'react-redux'
import * as dl from 'datalib';
import { Constants } from '../../constants/constants';
import Charts from './Charts'
import _ from 'lodash';
import moment from 'moment';

const mapStateToProps = (state) => {
    var props = {
        tenders: (state.tenders.tendersList.cf == null)?    [] : state.tenders.tendersList.cf.allFiltered(),
        stats : {} 
    };

    if(props.tenders.length > 0) {
        
        // data to populate the Sankey diagram: counts between municipalities
        // and organization
        props.stats.flowOrgMunicipality = dl.groupby([Constants.NOME_IMPRESA, Constants.COMUNE_GARE])
            .summarize([
                {
                    name : 'value.amount',
                    ops : ['sum'],
                    as : ['sum_amount']
                }
            ])
            .execute(props.tenders);

        // data to populate scatterplot average saving / average amount, per categories
        props.stats.savingByCategory = dl.groupby(Constants.TIPO_INTERVENTO)
                            .summarize([
                                {  
                                    name: 'percentageRibasso',
                                    get : tender => _.find(tender.awardCriteriaDetails, ['name', 'Percentuale Ribasso']).value,
                                    ops: ['average'],
                                    as: ['average_ribasso']
                                },
                                {   
                                    name: 'value.amount', 
                                    ops:['average', 'sum'],
                                    as: ['average_amount', 'sum_amount']
                                }
                            ])
                            .execute(
                                _.filter(props.tenders, tender => tender.supplier.legalName !== 'Deserta')
                            );

        // data to rank companies by amount
        props.stats.rankByAmount = dl.groupby(Constants.NOME_IMPRESA)
                            .summarize([
                                {
                                    name: 'value.amount', 
                                    ops: ['sum'], 
                                    as: ['sum_amount']
                                }
                            ])
                            .execute(props.tenders);

        // data to populate the map (tenders by municipality)
        props.stats.orgsByMunicipality = dl.groupby(Constants.COMUNE_IMPRESA)
            .summarize([
                {
                    name : Constants.NOME_IMPRESA,
                    ops : ['distinct'],
                    as : ['distinct_org']
                },
                {
                    name : 'id',
                    ops : ['distinct'],
                    as: ['distinct_id']
                }
            ])
            .execute(props.tenders);

        // data to populate the timeline
        props.stats.tendersTimeline = _(props.tenders)
                            .filter(t => t.supplier.legalName !== 'Deserta')
                            .map(tender => {
                                let contractPeriod = {...tender.contractPeriod, ...tender.value};
                                contractPeriod.startDate = new Date(contractPeriod.startDate).getTime();

                                // there are some tender with durations that are 
                                // nonsense: just show periods no longer than 4
                                // year from now
                                if(contractPeriod.duration > (365*4))
                                    contractPeriod.endDate = moment()
                                        .add(4, 'year')
                                        .toDate().getTime();
                                else
                                    contractPeriod.endDate = moment(contractPeriod.startDate)
                                        .add(contractPeriod.duration, 'day')
                                        .toDate().getTime();
                                        
                                contractPeriod.percentageRibasso = +_.find(tender.awardCriteriaDetails, ['name', 'Percentuale Ribasso']).value;

                                // add the tender id: the bar will be linkable
                                contractPeriod.tenderId = tender.id;

                                // add tender short name for the tooltip
                                contractPeriod.tenderName = _.truncate(tender.description, {length: 20})

                                return contractPeriod;
                            })
                            .value();        
    };

    return props;
};


const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Charts);