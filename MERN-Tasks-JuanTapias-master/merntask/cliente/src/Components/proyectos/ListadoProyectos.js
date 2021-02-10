import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AlertaContext from "../../context/alertas/alertaContext";

const ListadoProyectos = () => {
  // Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

  // Obtener el state de alertas
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Antes de un useEffect no puedo exitir un return
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
    // eslint-disable-next-line
  }, [mensaje]);

  // Revisar si proyectos tiene contenido
  if (proyectos.length === 0)
    return <p>No hay proyectos comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.mensaje}</div>
      ) : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
