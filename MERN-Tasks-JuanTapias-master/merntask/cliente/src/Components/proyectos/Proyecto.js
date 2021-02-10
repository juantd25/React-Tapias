import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  // Obtener el context/state de proyectos
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  // Obtener el context/state de tareas
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  // Función para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); //Fijar un proyecto actual
    obtenerTareas(id);
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-black"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
