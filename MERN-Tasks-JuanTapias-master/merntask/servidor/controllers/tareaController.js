const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
  // Revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};

// Obtener las tareas por proyecto ID
exports.obtenerTareas = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.query;
    console.log(proyecto);

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Obtener las tareas por proyecto
    const tareas = await Tarea.find({ proyecto });
    res.json({ tareas });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};

// Actualizar una tarea
exports.actualizarTarea = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    // Si la tarea existe o no
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: "No existe la tarea" });
    }

    const proyectoId = tarea.proyecto ? tarea.proyecto : proyecto;

    // Extraer proyecto
    const existeProyecto = await Proyecto.findById(proyectoId);

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Obtener las tareas por proyecto
    const nuevaTarea = {};
    nuevaTarea.nombre = nombre;
    nuevaTarea.estado = estado;

    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    res.json({ tarea });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};

// Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
  try {
    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;

    // Si la tarea existe o no
    let tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
      return res.status(404).json({ msg: "No existe la tarea" });
    }

    const proyectoId = tarea.proyecto ? tarea.proyecto : proyecto;

    // Extraer proyecto
    const existeProyecto = await Proyecto.findById(proyectoId);

    // Revisar si el proyecto actual pertenece al usuario autenticado
    if (existeProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    // Eliminar
    await Tarea.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
};
