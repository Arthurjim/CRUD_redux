import React,{useState} from "react";
import {useDispatch,useSelector} from 'react-redux'
//action de redux  
import {createProductAction} from '../actions/productoActions';
import {mostrarAlertaAction,ocultarAlertaAction} from '../actions/alertaActions'
const NuevoProductos = ({history}) => {

   //state del componenet
   const [nombre, guardarNombre]=useState('')
   const [precio, guardarPrecio]=useState(0)



   // use dispatch devuelve una funcion
   const dispatch =useDispatch();

   // acceder al state del store
   const cargando = useSelector(state=>state.productos.loading)
   const error = useSelector(state =>state.productos.error)
   const alerta = useSelector(state =>state.alerta.alerta)

   //madnar llamar el action de productoAction
   const agregarProducto =producto=>dispatch(createProductAction(producto))


   //cuando el usuario haga submit
   const submitNuevoProducto=(e)=>{
      e.preventDefault();

      //validar formulario
      if(nombre.trim() === '' || precio <= 0){
         const alerta={
            msg:'Ambos campos son obligatorias',
            classes:'alert alert-danger text-center text-uppercase p-3'
         }
         dispatch(mostrarAlertaAction(alerta))
         return;
      }
      //si NO hay errores
      dispatch(ocultarAlertaAction())
      //crear el nuevo producto
      agregarProducto({nombre,precio})

      history.push('/')
   }
   return (
      <div className="row justify-content-center">
         <div className="col-md-8">
            <div className="card">
               <div className="card-body">
                  <h2 className="text-center mb-4 font-weight-bold">
                     Agregar Nuevo Producto
                  </h2>
                  {
                     alerta ? <p className={alerta.classes}>{alerta.msg }</p>:null
                  }
                  <form onSubmit={submitNuevoProducto}>
                     <div className="form-group">
                        <label htmlFor="">Nombre Producto</label>
                        <input
                           type="text"
                           name="nombre"
                           className="form-control"
                           placeholder="Nombre Producto"
                           id="nombre"
                           value={nombre}
                           onChange={e=>guardarNombre(e.target.value)}
                        />
                     </div>
                     <div className="form-group">
                        <label htmlFor="">Precio Producto</label>
                        <input
                           type="number"
                           name="precio"
                           className="form-control"
                           placeholder="Precio Producto"
                           id="precio"
                           value={precio}
                           onChange={e=>guardarPrecio(Number(e.target.value))}
                        />
                     </div>
                     <button
                        type="submit"
                        className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                     >
                        Agregar
                     </button>
                  </form>
                  {cargando ? <p>Cargando...</p> : null}
                  {error ? <p className="alert alert-danger p2 mt-4 text-center">¡Error en el registro!</p> :null}
               </div>
            </div>
         </div>
      </div>
   );
};

export default NuevoProductos;
