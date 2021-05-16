import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";
function App() {
   // Manejo de citas en localStorage
  // Se verifica que al cargar la pagina, existan citas en el localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);
  const titulo = citas.length > 0 ? "Administra tus citas" : "No hay citas";
  // Toma las citas actuales y agrega las nuevas
  // Se pasa como props al componente de Formulario 
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // Funcion que elimina una cita por su id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  // Usando el Hokk useEffect
  // Siempre es un arrow function
  // Similar a jquery con el document.ready
  // Se ejecuta cuando el componente esta listo, o cuando hay cambios
  // Se le manda un arreglo vacio para que se ejecute una vez
  // Esta pendiente de lo que se le envie en el segundo parametro (array de dependencias)
  // En este caso, a cualqueir cambio del array citas, useEffect se ejecutara
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    }
    else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita 
                key={cita.id} cita={cita} 
                eliminarCita={eliminarCita} 
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
