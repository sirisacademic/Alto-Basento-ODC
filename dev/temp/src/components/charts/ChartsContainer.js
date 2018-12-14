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
        
        // data to populate scatterplot average saving / average amount, per categories
        props.stats.savingByCategory = dl.groupby(Constants.TIPO_INTERVENTO)
                            .summarize([
                                { name: 'percentageRibasso', ops: ['average'], as: ['average_ribasso']},
                                { name: 'value.amount', ops:['average', 'sum'], as: ['average_amount', 'sum_amount']}
                            ])
                            .execute(props.tenders);

        // data to rank companies by amount
        props.stats.rankByAmount = dl.groupby(Constants.NOME_IMPRESA)
                            .summarize([
                                { name: 'value.amount', ops: ['sum'], as: ['sum_amount']}
                            ])
                            .execute(props.tenders);

        // data to populate the map (tenders by municipality)
        props.stats.orgsByMunicipality = dl.groupby(Constants.COMUNE_IMPRESA)
            .count()
            .execute(props.tenders);

        // data to populate the timeline
        props.stats.tendersTimeline = _(props.tenders)
                            .map((tender) => {
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
                                contractPeriod.percentageRibasso = +tender.percentageRibasso;
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