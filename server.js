const express = require("express");
const mysql = require("mysql2");

const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const Usuario = require("./server/Clases/Usuario");
const { registroUsuario } = require("./server/Persistencia/usuarios");
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
    };
  else {
    players[socket.id] = {
      rotation: 0,
      x: 1200,
      y: 500,
      playerId: socket.id,
    };
  }

  socket.emit("currentPlayers", players);
  //cuando se conecte un usuario creamos un jugador
  socket.on("newPlayer", function (infoPlayer) {
    players[socket.id] = {
      name: infoPlayer.name,
      type: infoPlayer.type,
      rotation: 0,
      x: Math.floor(Math.random() * 800) + 400,
      y: Math.floor(Math.random() * 600) + 300,
      playerId: socket.id,
      health: 3,
    };

    //enviar todos los jugadores al cliente
    socket.emit("currentPlayers", players);

    //enviar a los demas jugadores mis datos de jugador
    socket.broadcast.emit("newPlayer", players[socket.id]);
  });

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
   * When a user has entered there username and password we create a new entry within the userMap.
   */
  socket.on("registerUser", (data) => {
    console.log("llegaaaa");
    console.log("data", data);
    const user = new Usuario();
    user.setUsuario(socket.id, data.name, data.pass);
    let status = 200;
    registroUsuario(data[0], data[1])
      .then((res) => {
        console.log("res", res);
        status = 200;
      })
      .catch((err) => {
        console.log("err", err);
        status = 500;
      });

    io.emit("registerUser", status);
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
