const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const Usuario = require("./server/Clases/Usuario");
const Jugador = require("./server/Clases/Jugador");
const { registroUsuario } = require("./server/Persistencia/usuarios");
const { verificoPass } = require("./server/Persistencia/usuarios");
const { crearPartida } = require("./server/Persistencia/partida");
const {
  crearJugador,
  crearSubmarino,
  crearDestructor,
  guardarDestructor,
  guardarSubmarino,
} = require("./server/Persistencia/jugador");

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
var carguero1 = {
  alive: true,
};
var carguero2 = {
  alive: true,
};
var carguero3 = {
  alive: true,
};
var carguero4 = {
  alive: true,
};
var carguero5 = {
  alive: true,
};
var bullets = [];

// Conexión de jugador
io.on("connection", (socket) => {
  console.log("player [" + socket.id + "] connected");

  if (Object.values(players).length === 0)
    players[socket.id] = {
      rotation: 0,
      x: 100,
      y: 190,
      playerId: socket.id,
      health: 3,
      nivel: 1,
      color: getRandomColor(),
      team: "barco",
    };
  else {
    players[socket.id] = {
      rotation: 0,
      x: 1200,
      y: 500,
      playerId: socket.id,
      health: 3,
      nivel: 1,
      color: getRandomColor(),
      team: "submarino",
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

  socket.on("carguero1Movement", (movementData) => {
    carguero1.x = movementData.x;
    carguero1.y = movementData.y;
    carguero1.rotation = movementData.rotation;

    socket.broadcast.emit("carguero1Moved", carguero1);
  });

  socket.on("carguero1Delete", () => {
    carguero1.alive = false;
     delete carguero1;

    socket.broadcast.emit("carguero1Deleted", carguero1);
  });

  socket.on("carguero2Movement", (movementData) => {
    carguero2.x = movementData.x;
    carguero2.y = movementData.y;
    carguero2.rotation = movementData.rotation;

    socket.broadcast.emit("carguero2Moved", carguero2);
  });

  socket.on("carguero2Delete", () => {
    carguero2.alive = false;
     delete carguero2;

    socket.broadcast.emit("carguero2Deleted", carguero2);
  });

  socket.on("carguero3Movement", (movementData) => {
    carguero3.x = movementData.x;
    carguero3.y = movementData.y;
    carguero3.rotation = movementData.rotation;

    socket.broadcast.emit("carguero3Moved", carguero3);
  });

  socket.on("carguero3Delete", () => {
    carguero3.alive = false;
     delete carguero3;

    socket.broadcast.emit("carguero3Deleted", carguero3);
  });

  socket.on("carguero4Movement", (movementData) => {
    carguero4.x = movementData.x;
    carguero4.y = movementData.y;
    carguero4.rotation = movementData.rotation;

    socket.broadcast.emit("carguero4Moved", carguero4);
  });

  socket.on("carguero4Delete", () => {
    carguero4.alive = false;
     delete carguero4;

    socket.broadcast.emit("carguero4Deleted", carguero4);
  });

  socket.on("carguero5Movement", (movementData) => {
    carguero5.x = movementData.x;
    carguero5.y = movementData.y;
    carguero5.rotation = movementData.rotation;

    socket.broadcast.emit("carguero5Moved", carguero5);
  });

  socket.on("carguero5Delete", () => {
    carguero5.alive = false;
     delete carguero5;

    socket.broadcast.emit("carguero5Deleted", carguero5);
  });

  socket.on("cambioProfundidadSubmarino", (nivel) => {
    players[socket.id].nivel = nivel.x;

    socket.broadcast.emit("submarinoLevel", players[socket.id].nivel);
  });

  //recibimos el evento de cuando una bala es disparada
  socket.on("shootBullet", function (bulletInfo) {
    if (players[socket.id]) {
      //le asignamos el id del jugador al que pertenecen
      bulletInfo.ownerId = socket.id;
      bullets.push(bulletInfo);
    }
  });

  // ------------- PERSISTENCIA ------------------------

  /**
   * When a user has entered there username and password we create a new user.
   */
  socket.on("registerUser", async (data) => {
    const user = new Usuario();
    user.nombre = data[0];
    user.pass = data[1];
    user.setUsuario(socket.id, user.nombre, user.pass);
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
    user.nombre = data[0];
    user.pass = data[1];
    user.setUsuario(socket.id, user.nombre, user.pass);
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

  socket.on("creoPartida", async () => {
    let idPartida = 0;
    try {
      idPartida = await crearPartida();
      socket.emit("partidaCreada", idPartida);
    } catch (error) {
      console.log("Error al crear partida", error);
      idPartida = 0;
      socket.emit("partidaCreada", idPartida);
    }
  });

  socket.on("crearJugador", async (data) => {
    let status = 200;
    const jugador = new Jugador();
    jugador.id_jugador = data[0];
    jugador.id_partida = data[1];
    jugador.bando = data[2];
    jugador.x = data[3];
    jugador.y = data[4];
    try {
      await crearJugador(jugador.id_jugador, jugador.id_partida, jugador.bando);
      if (data[2] === "barco") {
        console.log("Entre al if");
        crearDestructor(jugador.id_jugador);
        //socket.emit("crearDestructor",jugador.id_jugador);
      } else {
        console.log("Entre al else");
        crearSubmarino(jugador.id_jugador);
        //socket.emit("crearSubmarino",jugador.id_jugador);
      }
      socket.emit("jugadorCreado", status);
    } catch (error) {
      console.log("Error al crear jugador", error);
      idPartida = 0;
      socket.emit("jugadorCreado", status);
    }
  });

  socket.on("crearJugador2", async (data) => {
    let status = 200;
    const jugador = new Jugador();
    jugador.id_jugador = data[0];
    jugador.id_partida = data[1];
    jugador.bando = data[2];
    jugador.x = data[3];
    jugador.y = data[4];
    try {
      await crearJugador(jugador.id_jugador, jugador.id_partida, jugador.bando);
      if (data[2] === "barco") {
        console.log("Entre al if");
        crearDestructor(jugador.id_jugador);
        guardarDestructor();
        //socket.emit("crearDestructor",jugador.id_jugador);
      } else {
        console.log("Entre al else");
        crearSubmarino(jugador.id_jugador);
        //socket.emit("crearSubmarino",jugador.id_jugador);
      }
      socket.emit("jugador2Creado", status);
    } catch (error) {
      console.log("Error al crear jugador", error);
      idPartida = 0;
      socket.emit("jugador2Creado", status);
    }
  });

  socket.on("crearDestructor", async (id_jugador) => {
    console.log("entre al crear destuctor");
    let status = 200;
    try {
      crearDestructor(id_jugador);
      socket.emit("destructorCreado", status);
    } catch (error) {
      console.log("Error al crear partida", error);
      idPartida = 500;
      socket.emit("destructorCreado", status);
    }
  });

  socket.on("crearSubmarino", async (id_jugador) => {
    console.log("entre al crear submarino");
    let status = 200;
    try {
      crearSubmarino(id_jugador);
      socket.emit("submarinoCreado", status);
    } catch (error) {
      console.log("Error al crear partida", error);
      idPartida = 500;
      socket.emit("submarinoCreado", status);
    }
  });
});

//  ------------- FUNCIONES AUXILIARES ------------------------

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

        if (players[id].team === "barco") {
          if (players[id].health === 6) delete carguero5;
          if (players[id].health === 5) delete carguero4;
          if (players[id].health === 4) delete carguero3;
          if (players[id].health === 3) delete carguero2;
          if (players[id].health === 2) delete carguero1;
        }
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

function getRandomColor() {
  return "0x" + Math.floor(Math.random() * 16777215).toString(16);
}
