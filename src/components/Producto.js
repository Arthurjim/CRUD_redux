import React from "react";
import {useHistory}from 'react-router-dom'
import Swal from 'sweetalert2';

//redux
import { useDispatch } from "react-redux";
import { eliminarProductoAction,obtenerProductoEditar } from "../actions/productoActions";
const Producto = ({ producto }) => {
   const dispatch = useDispatch();
   const history = useHistory()
   const eliminarProducto = (id)=> dispatch(eliminarProductoAction(id))
   const obtenerProducto = (producto)=>dispatch(obtenerProductoEditar(producto))
   const eliminarProd =(id)=>{


      Swal.fire({
         title: '¿Estas seguro de eliminar el productos?',
         text: "¡No podrás revertir esto!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Si, eliminar esto!'
       }).then((result) => {
         if (result.isConfirmed) {
           eliminarProducto(id)

         
         }
       })
      }
      // function que redirige de forma programada
      const redireccionarEdicon =producto=>{
         obtenerProducto(producto)
         history.push(`/productos/editar/${producto.id}`)
      }
   return (
      <tr key={producto.id}>
         <td>{producto.nombre}</td>
         <td>
            <span className="font-weight-bold">$ {producto.precio}</span>
         </td>
         <td className="acciones">
            <button onClick={()=>{redireccionarEdicon(producto)}}className="btn btn-primary mr-2 ">Editar</button>
            <button type="button" className="btn btn-danger" onClick={()=>{eliminarProd(producto.id)}}>Eliminar</button>
         </td>
      </tr>
   );
};

export default Producto;
