const { addUser, removeUser, getUser, getUsersInRoom } = require("../users");

const chatApi = (io, socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `Hola soy tu asistente de seguridad SAP`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} Ha ingresado!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      intent: "",
      user: user.name,
      text: message,
    });

    // const res = await questWatson(message) //Preguntar a Watson con el message
    // callSAP() //Hacer llamado a SAP y obtener respuestas
    // sendMail() //Enviar correos mesa y usuario

    if (message === "crear usuario") {
      socket.emit("message", {
        intent: "crear-usuario",
        user: "admin",
        text: `Proceso de creación de usuario`,
      });
    }

    if (message === "cambiar clave") {
      socket.emit("message", {
        intent: "cambiar-clave",
        user: "admin",
        text: `Proceso de cambio de clave`,
      });
    }

    if (message === "desbloquear usuario") {
      socket.emit("message", {
        intent: "desbloqueos",
        user: "admin",
        text: `Proceso de desbloqueo de contraseña SAP`,
      });
    }

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} Ha dejado el canal.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
};

module.exports = { chatApi };
