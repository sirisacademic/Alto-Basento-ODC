const Constants = {
    TIPO_APPALTO : 'tipo_appalto',
    TIPO_INTERVENTO : 'tipo_intervento',
    COMUNE_GARE : 'comune_gara',
    ABSTRACT_PROGETTO : 'abstract_progetto',
    NOME_IMPRESA : 'nome_impresa'
}

Constants.SEARCHABLE_PROPERTIES = [Constants.NOME_IMPRESA, Constants.ABSTRACT_PROGETTO, Constants.COMUNE_GARE];
Constants.DIMENSIONS = [Constants.TIPO_APPALTO, Constants.TIPO_INTERVENTO, Constants.COMUNE_GARE];

export default Constants;