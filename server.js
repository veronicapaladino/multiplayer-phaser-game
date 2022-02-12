const express = require('express')
const mysql = require("mysql");
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketIO(server, {
  pingTimeout: 60000,
})

// Conectando a mysql
export const conexion    =    mysql.createPool({
  connectionLimit   :   100,
  host              :   'localhost',
  user              :   'root',
  password          :   'root',
  database          :   'battleship',
  debug             :   false
});

app.set('port', 5000)
app.use('/src', express.static(__dirname + '/src'))

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html')) // Ruta para lanzar el index
})

// Inicializamos el server
server.listen(5000, () => {
  console.log('Starting server on port 5000')
})

const players = {}

// Conexión de jugador
io.on('connection', (socket) => {
  console.log('player [' + socket.id + '] connected')

  players[socket.id] = {
    rotation: 0,
    x: 30,
    y: 30,
    playerId: socket.id,
    color: getRandomColor()
  }

  socket.emit('currentPlayers', players)
  socket.broadcast.emit('newPlayer', players[socket.id])
 
  socket.on('disconnect', () => {
    console.log('player [' + socket.id + '] disconnected')
    delete players[socket.id]
    io.emit('playerDisconnected', socket.id)
  })

  socket.on('playerMovement', (movementData) => {
    players[socket.id].x = movementData.x
    players[socket.id].y = movementData.y
    players[socket.id].rotation = movementData.rotation

    socket.broadcast.emit('playerMoved', players[socket.id])
  })
})

// EJEMPLO DE CONEXIÓN A LA BASE DE DATOS --> podemos hace una carpeta server y armar diferentes js en base a acciónes de barco/submarino, etc
/* const addComentario = function (status,callback) {
  conexion.getConnection(function(err,connection){
      if (err) {
        connection.release();
        callback(false);
        return;
      }
  connection.query("INSERT INTO `mensajes` (`mensaje`) VALUES ('"+status+"')", function(err,rows){ //Insertando nuestro comentario
          connection.release();
          if(!err) {
            callback(true);
          }
      });
   connection.on('error', function() {
            callback(false);
            return;
      });
  });
} */

// deveulve un color Random
function getRandomColor() {
  return '0x' + Math.floor(Math.random() * 16777215).toString(16)
}