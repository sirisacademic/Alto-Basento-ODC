const Utils = {
    formatCurrency : (value) => {
        return new Intl.NumberFormat(
            'de-DE', 
            {
                style : 'currency', 
                currency : 'EUR',
                minimumFractionDigits : 0
            })
            .format(Math.round(value));
    }
}

export default Utils;