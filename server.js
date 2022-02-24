const express = require("express");
const mysql = require("mysql2");

const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const Usuario = require("./server/Clases/Usuario");
const { registroUsuario } = require("./server/Persistencia/usuarios");
const promiseStatics = require("eslint-plugin-promise/rules/lib/promise-statics");
// const usuarios=require("./server/Persistencia/Usuarios");
const app = express();
const server = http.Server(app);

const io = socketIO(server, {
  pingTimeout: 60000,
});

var puertoServidor = 8081;

app.set("port", puertoServidor);
app.use("/client", express.static(__dirname + "/client"));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "/client/index.html")); // Ruta para lanzar el index
});

// Inicializamos el server
server.listen(puertoServidor, () => {
  console.log("Starting server on port " + puertoServidor);
});

const players = {};

// Conexión de jugador
io.on("connection", (socket) => {
  /*console.log('player [' + socket.id + '] connected')*/

  if (Object.values(players).length === 0)
    players[socket.id] = {
      rotation: 0,
      x: 30,
      y: 30,
      playerId: socket.id,
      color: getRandomColor(),
    };
  else {
    players[socket.id] = {
      rotation: 0,
      x: 1200,
      y: 500,
      playerId: socket.id,
      color: getRandomColor(),
    };
  }

  socket.emit("currentPlayers", players);
  socket.broadcast.emit("newPlayer", players[socket.id]);

  socket.on("disconnect", () => {
    console.log("player [" + socket.id + "] disconnected");
    delete players[socket.id];
    io.emit("playerDisconnected", socket.id);
  });

  socket.on("playerMovement", (movementData) => {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].rotation = movementData.rotation;

    socket.broadcast.emit("playerMoved", players[socket.id]);
  });

  /**
   * When a user has entered there username and password we create a new entry within the userMap.
   */
  socket.on("registerUser", (data) => {
    console.log("llegaaaa");
    console.log("data", data);
    const user = new Usuario();
    user.setUsuario(socket.id, data.name, data.pass);
    let status = 200;
    return registroUsuario(data[0], data[1])
      .then((res) => {
        console.log("res", res);
        status = 200;
      socket.emit("registroValido",status);
      })
      .catch((err) => {
        console.log("err", err);
        status = 500;
        
      });
    //  socket.broadcast.emit("registerUser", status);
     
  });
});

// deveulve un color Random
function getRandomColor() {
  return "0x" + Math.floor(Math.random() * 16777215).toString(16);
}
