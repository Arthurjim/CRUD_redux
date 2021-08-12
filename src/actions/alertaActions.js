import {OCULTAR_ALERTA,MOSTRAR_ALERTA}from '../types'
//muestra alerta
export function mostrarAlertaAction(alerta){
    console.log('se ejecuta')
    return (dispatch)=>{
        dispatch(crearAlerta(alerta))
    }
}

const crearAlerta =alerta=>({
    type:MOSTRAR_ALERTA,
    payload:alerta
})


//ocultar alerta

export function ocultarAlertaAction(){
    return (dispatch)=>{
        dispatch(ocultarAlerta())
    }
}


const ocultarAlerta =()=>({
    type:OCULTAR_ALERTA
})