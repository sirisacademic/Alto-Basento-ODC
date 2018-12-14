let TIPO_APPALTO = 'procurementMethod', //'tipo_appalto',
    TIPO_INTERVENTO = 'tipoIntervento', //'tipo_intervento',
    COMUNE_GARE = 'municipality', //'comune_gara',
    ABSTRACT_PROGETTO = 'description', //'abstract_progetto',
    NOME_IMPRESA = 'organizationReference.legalName', //'nome_impresa';
    PROVINCE_IMPRESA = 'organizationReference.address.province',    //provincia_impresa,
    COMUNE_IMPRESA =  'organizationReference.address.municipality', //municipality
    ANNO = 'contractPeriod.startDate';

export const Constants = {
    TIPO_APPALTO : TIPO_APPALTO,
    TIPO_INTERVENTO: TIPO_INTERVENTO,
    COMUNE_GARE : COMUNE_GARE,
    ABSTRACT_PROGETTO : ABSTRACT_PROGETTO,
    NOME_IMPRESA : NOME_IMPRESA,
    PROVINCE_IMPRESA : PROVINCE_IMPRESA,
    COMUNE_IMPRESA : COMUNE_IMPRESA,
    ANNO : ANNO,
    SEARCHABLE_PROPERTIES : [
        NOME_IMPRESA,         
        ABSTRACT_PROGETTO,
        COMUNE_GARE],
    DIMENSIONS : [
        TIPO_APPALTO, 
        TIPO_INTERVENTO, 
        COMUNE_GARE,
        ANNO
    ]
};