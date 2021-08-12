//estas son las funciones que modifican el state
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
    PRODUCTO_EDITADO_ERROR,

} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';
//crear nuevos productos
export function createProductAction(producto){
    return async (dispatch)=>{
        dispatch(agregarProducto())
        try {
            //insertar en la api
            await clienteAxios.post('/productos',producto)

            dispatch(agregarProductoExito(producto))

            //muestra la alerta cuando el producto se haya agregado correctamente
            Swal.fire(
                'Correcto',
                'El producto  se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)

            //si hay un error cambiar el state
            dispatch(agregarProductoError(true))
            //alerta de error
            Swal.fire({
                icon:'error',
                title:'Hubo un error',
                text:'Hubo un error, intenta otra vez'
            })
        }
    }
}

const agregarProducto =()=>({
    type:AGREGAR_PRODUCTO,
    payload:true,
})
//si el producto se guarda en la db
const agregarProductoExito = (producto) =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload:producto
})
//si hubo algun error
const agregarProductoError=()=>({
    type:AGREGAR_PRODUCTO_ERROR,
    payload:true
})


// Funcion que descarga los productos de la bd
export function obtenerProductosAction(){
    return async (dispatch)=>{
        dispatch(descargarProductos());
        try {
            const response = await clienteAxios.get('/productos')
            dispatch(obtenerProductosExito(response.data))
        } catch (error) {
            console.log('hay un error')
            dispatch(obtenerProductosError(true))
        }
    }
}

const descargarProductos =()=>({
    type:COMENZAR_OBTENER_PRODUCTOS,
    payload:true
})

const obtenerProductosExito =productos=>({
    type:OBTENER_PRODUCTOS_EXITO,
    payload:productos
})
const obtenerProductosError =()=>({
    type:OBTENER_PRODUCTOS_ERROR,
    payload:true
})

//seleciona y elimina producto
export function eliminarProductoAction(id){
    return async (dispatch)=>{
        console.log('se ejecuta')
        dispatch(eliminarProducto(id))
        try{
           await clienteAxios.delete(`productos/${id}`)
           dispatch(productoEliminado(id))
           Swal.fire(
            'Eliminado!',
            'El producto ha sido eliminado correctamente.',
            'success'
          )
        }catch(error){
            console.error(error)
            dispatch(productoEliminadoError(true))
            
        }
    }
}

const eliminarProducto =(id)=>({
    type:PRODUCTO_ELIMINAR,
    payload:id
})

const productoEliminado=(id)=>({
    type:PRODUCTO_ELIMINDO_EXITO,
    payload:id
})
const productoEliminadoError=()=>({
    type:PRODUCTO_ELIMINDO_ERROR,
    payload:true
})


export function obtenerProductoEditar(producto){
    
    return async (disptch)=>{
      disptch(obtenerProducto(producto))       
     
    }
}

const obtenerProducto =(producto)=>({
    type:PRODUCTO_EDITAR,
    payload:producto
})

//Edita un registro en la api y state
export function editarProductoAction(producto){
    return async(dispatch)=>{
     
        try{
            await clienteAxios.put(`/productos/${producto.id}`,producto)
            dispatch(producotEditarExito(producto))
            Swal.fire(
                'Editado!',
                'El producto ha sido modificado.',
                'success'
              )
        }catch(error){
            console.log(error)
            productoEditarError(true)
        }
    }
}

const producotEditarExito =(producto)=>({
    type:PRODUCTO_EDITADO_EXITO,
    payload:producto
})
const productoEditarError=()=>({
    type:PRODUCTO_EDITADO_ERROR,
    payload:true
})