import React, { Fragment, useState } from "react";
import uuid from "uuid/dist/v4";

const Formulario = ({crearCita}) => {
    // Hook state

    // State para el manejo del formulario
    // [state, funcion que modifica el state]
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const [error, actualizarError] = useState(false);
  
    // Se pasa el evento 'e' para obtener los valores
    // Se copia el state y se modifica el atributo especificado mediante object destructuring
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    };
    
    // Extraemos los valores para un manejo a nivel de formulario
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    // Submit function
    const submitCita = e => {
       e.preventDefault(); 
       if (
            mascota.trim() === '' || 
            propietario.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === ''
       ) {
            actualizarError(true);
            return;
       } 
       actualizarError(false);
       // Usamos la libreria uuid para anadier un id aleatorio
       cita.id = uuid();

       // Usamos el props del componente para enviar la cita
       crearCita(cita);

       actualizarCita({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
       });
    };

    return (
    <Fragment>
      <h2>Crear cita</h2>
      {error ? <p className="alerta-error">Todos los campos son obligatorios</p>: null}
      
      <form
        onSubmit={submitCita}
      >
        <label>Nombre Mascota</label>
        <input 
            type="text" 
            name="mascota"
            className="u-full-width"
            placeholder="Nombre Mascota"
            onChange={actualizarState}
            value={mascota}
        />
        <label>Nombre Dueno</label>
         <input 
            type="text" 
            name="propietario"
            className="u-full-width"
            placeholder="Nombre Dueno de la mascota"
            onChange={actualizarState}
            value={propietario}
        />
         <label>Fecha</label>
         <input 
            type="date" 
            name="fecha"
            className="u-full-width"
            onChange={actualizarState}
            value={fecha}
        />
         <label>Hora</label>
         <input 
            type="time" 
            name="hora"
            className="u-full-width"
            onChange={actualizarState}
            value={hora}
        />
        <label>Sintomas</label>
        <textarea
            name="sintomas"
            className="u-full-width"
            onChange={actualizarState}
            value={sintomas}
        ></textarea>
        <button
            type="submit" 
            className="u-full-width button-primary"
        >Agregar Cita</button>
      </form>
    </Fragment>
  );
};

export default Formulario;
