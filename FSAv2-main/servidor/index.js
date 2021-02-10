const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const { chatApi } = require("./api/chatApi");
const router = require("./router");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// Importar rutas
// app.use(router);

// Conectar Socketio chat en tiempo real
io.on("connect", (socket) => {
  chatApi(io, socket);
});

//Static Files
app.use(express.static(__dirname + "/build"));

// Arrancar el servidor
server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
