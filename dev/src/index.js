import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import { 
    createStore,
    applyMiddleware
} from 'redux';
import './index.css';
import './styles/semantic.min.css';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import thunkMiddleware from 'redux-thunk'
import * as d3 from 'd3';

// config locale for d3.format
var es_ES = {
    "decimal": ",",
    "thousands": ".",
    "grouping": [3],
    "currency": ["", " €"],
    "dateTime": "%a %b %e %X %Y",
    "date": "%d/%m/%Y",
    "time": "%H:%M:%S",
    "periods": ["AM", "PM"],
    "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    "shortDays": ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
    "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
};
d3.formatDefaultLocale(es_ES);

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Root store={store}/>, document.getElementById('root')
);
registerServiceWorker();
