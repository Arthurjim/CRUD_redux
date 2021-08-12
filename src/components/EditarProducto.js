import React,{useEffect, useState} from 'react'
import {useHistory}from 'react-router-dom'

import { useSelector,useDispatch } from 'react-redux'
import {editarProductoAction} from '../actions/productoActions'
const EditarProducto = () => {
   const history = useHistory()
 
   //nuevo state de productos
   const [producto,guardarProducto]=useState({nombre:'',precio:''})
   const {nombre, precio}=producto

      //mandando la accion
      const dispatch = useDispatch()
   //obteniendo el prdocuto a editar
   const productoEditar = useSelector(state=>state.productos.productoEditar)
   useEffect(()=>{
      productoEditar ?
       guardarProducto(productoEditar)
      : history.push('/')

   },[productoEditar])
   
   //leer los datos del formulario
   const onChangeFormulario = e =>{
      guardarProducto({
         ...producto,
         [e.target.name]:e.target.value
      })
   }


   const submitEditarProducto=(e)=>{
      e.preventDefault()
      dispatch(editarProductoAction(producto))
      history.push('/')
   }


    return (
        <div className="row justify-content-center">
         <div className="col-md-8">
            <div className="card">
               <div className="card-body">
                  <h2 className="text-center mb-4 font-weight-bold">
                     Editar Producto
                  </h2>
                  <form onSubmit={submitEditarProducto}>
                     <div className="form-group">
                        <label htmlFor="">Nombre Producto</label>
                        <input
                           type="text"
                           name="nombre"
                           className="form-control"
                           placeholder="Nombre Producto"
                           value={nombre}
                           onChange={onChangeFormulario}
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="">Precio Producto</label>
                        <input
                           type="number"
                           name="precio"
                           className="form-control"
                           placeholder="Precio Producto"
                           value={precio}
                           onChange={onChangeFormulario}

                        />
                     </div>
                     <button
                        type="submit"
                        className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                     >
                        Guardar Cambios
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
    )
}

export default EditarProducto
