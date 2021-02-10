const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// Crear el servidor
const app = express();

// Conectar con DB MongoDB
conectarDB();

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// Puesto de la app
const port = process.env.port || 4000;

// Importar rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

// Definir pagina principal
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// arrancar el servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running port ${PORT}`);
});
