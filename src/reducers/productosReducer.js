import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_OBTENER_PRODUCTOS,
    OBTENER_PRODUCTOS_EXITO,
    OBTENER_PRODUCTOS_ERROR,
    PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINDO_EXITO,
    PRODUCTO_ELIMINDO_ERROR,
    PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';
//Cada reducer tiene su propio state
const initialState = {
    productos:[],
    error:null,
    loading:false,
    productoEliminado:null,
    productoSeleccionado:null,
    productoEditar:null
}

//el reducer siempre es una funcion

export default function productosReducer(state = initialState,action){
    switch(action.type){
        case AGREGAR_PRODUCTO:
         case COMENZAR_OBTENER_PRODUCTOS:
            return{
            ...state,
            loading:action.payload,
            
            }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading:false,
                productos:[...state.productos,action.payload]
            }
        case AGREGAR_PRODUCTO_ERROR:
        case OBTENER_PRODUCTOS_ERROR:
        case PRODUCTO_ELIMINDO_ERROR:
        case PRODUCTO_EDITADO_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case OBTENER_PRODUCTOS_EXITO:
            return{
                ...state,
                loading:false,
                error:false,
                productos:action.payload
            }
        case PRODUCTO_ELIMINAR:
            return{
                ...state,
                productoEliminado:action.payload,
                loading:true
            }
        case PRODUCTO_ELIMINDO_EXITO:
            return{
                ...state,
                loading:false,
                productos:state.productos.filter(item=>item.id !== state.productoEliminado),
                productoEliminado:null
            }
        
      
            case PRODUCTO_EDITAR:
                return{
                    ...state,
                    productoEditar:action.payload
                }
         
            case PRODUCTO_EDITADO_EXITO:
                return{
                    ...state,
                    productoEditar:null,
                    productos:state.productos.map(producto=>
                        producto.id === action.payload.id ? producto = action.payload : producto
                    )
                }
            
        default:
            return state; 
    }
}