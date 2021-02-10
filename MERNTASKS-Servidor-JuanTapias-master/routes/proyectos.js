const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

// Crear un proyecto
router.post(
  "/",
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  auth,
  proyectoController.crearProyecto
);

// Obtener todos los proyectos
router.get("/", auth, proyectoController.obtenerProyectos);

// Actualizar proyecto por ID
router.put(
  "/:id",
  auth,
  [check("nombre", "El nombre del proyecto es obligatorio").not().isEmpty()],
  proyectoController.actualizarProyecto
);

// Eliminar un proyecto
router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
