const express = require("express");
const mysql = require("mysql2");

const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const Usuario = require("./server/Clases/Usuario");
const { registroUsuario } = require("./server/Persistencia/usuarios");
const { verificoPass } = require("./server/Persistencia/usuarios");
const { crearPartida } = require("./server/Persistencia/partida");
const app = express();
const server = http.Server(app);

var io = socketIO(server, {
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

var players = {};
var bullets = [];

// Conexión de jugador
io.on("connection", (socket) => {
  /*console.log('player [' + socket.id + '] connected')*/

  if (Object.values(players).length === 0)
    players[socket.id] = {
      rotation: 0,
      x: 30,
      y: 30,
      playerId: socket.id,
      health: 3,
    };
  else {
    players[socket.id] = {
      rotation: 0,
      x: 1200,
      y: 500,
      playerId: socket.id,
      health: 3,
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

  //recibimos el evento de cuando una bala es disparada
  socket.on("shootBullet", function (bulletInfo) {
    if (players[socket.id]) {
      //le asignamos el id del jugador al que pertenecen
      bulletInfo.ownerId = socket.id;
      bullets.push(bulletInfo);
    }
  });

  /**
   * When a user has entered there username and password we create a new user.
   */
  socket.on("registerUser", async (data) => {
    const user = new Usuario();
    user.setUsuario(socket.id, data[0], data[1]);
    let status = 200;
    try {
      registroUsuario(user.nombre, user.pass);
      status = 200;
      socket.emit("registroValido", status);
    } catch (error) {
      console.log(" registerUser error", error);
      status = 500;
      socket.emit("registroValido", status);
    }
  });

  socket.on("loginUser", async (data) => {
    const user = new Usuario();
    user.setUsuario(socket.id, data[0], data[1]);
    let status = 200;
    try {
      // verificoPass(user.nombre, user.pass);
      status = 200;
      socket.emit("LoginValido", status);
    } catch (error) {
      console.log("LoginUser error", error);
      status = 500;
      socket.emit("LoginValido", status);
    }
  });
});

//enviamos las nuevas coordenadas de las balas cada 16 milisegundos
setInterval(function () {
  updateBullets();
  io.emit("bulletsUpdate", bullets);
}, 16);

//actuliza los datos de las balas
function updateBullets() {
  //recorremos cada bala
  bullets.forEach(function (bullet, i) {
    //actulizacion de sus coordenadas (movimiento)
    bullet.x += bullet.speed_x;
    bullet.y += bullet.speed_y;

    //colision de la bala en un enemigo
    for (id in players) {
      //detectamos la colision de la bala en un enemigo
      if (
        bullet.ownerId != id &&
        Math.abs(players[id].x - bullet.x) < 21 &&
        Math.abs(players[id].y - bullet.y) < 21
      ) {
        //eliminamos la bala del arreglo
        bullets.splice(i, 1);

        players[id].health -= 1;

        if (players[id].health < 1) delete players[id];

        //emitimos un evento con el id del jugador afectado por la bala
        io.emit("playerHit", id);
      }
    }

    //si la bala sale de los limites del area del juego se elimina
    if (bullet.x < 0 || bullet.x > 1600 || bullet.y < 0 || bullet.y > 1200) {
      bullets.splice(i, 1);
    }
  });
}
