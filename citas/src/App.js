import React, { Fragment, useState } from "react";
import Formulario from "./components/Formulario";
function App() {
  // Arreglo de citas
  const [citas, guardarCitas] = useState([]);

  // Toma las citas actuales y agrega las nuevas
  // Se pasa como props al componente de Formulario
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">2</div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
