import {combineReducers} from 'redux';
import productosReducer from './productosReducer';
import alertaReducer from './alertaReducer';
//podemos tener multiples reducers
export default combineReducers({
    productos:productosReducer,
    alerta:alertaReducer
})