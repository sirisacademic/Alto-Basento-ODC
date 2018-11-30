const Constants = {
    TIPO_APPALTO : 'procurementMethod', //'tipo_appalto',
    TIPO_INTERVENTO : 'tipoIntervento', //'tipo_intervento',
    COMUNE_GARE : 'municipality', //'comune_gara',
    ABSTRACT_PROGETTO : 'description', //'abstract_progetto',
    NOME_IMPRESA : 'organizationReference.legalName', //'nome_impresa'
}

Constants.SEARCHABLE_PROPERTIES = [Constants.NOME_IMPRESA, Constants.ABSTRACT_PROGETTO, Constants.COMUNE_GARE];
Constants.DIMENSIONS = [Constants.TIPO_APPALTO, Constants.TIPO_INTERVENTO, Constants.COMUNE_GARE];

export default Constants;