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

var puertoServidor = 8081;

app.set('port', puertoServidor)
app.use('/client', express.static(__dirname + '/client'))

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/client/index.html')) // Ruta para lanzar el index
})

// Inicializamos el server
server.listen(puertoServidor, () => {
  console.log('Starting server on port '+ puertoServidor)
})

const players = {}

// Conexión de jugador
io.on('connection', (socket) => {
  
  /*console.log('player [' + socket.id + '] connected')*/

  players[socket.id] = {
    rotation: 0,
    x: 30,
    y: 30,
    playerId: socket.id,
    //color: getRandomColor()
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



// deveulve un color Random
function getRandomColor() {
  return '0x' + Math.floor(Math.random() * 16777215).toString(16)
}



//BASE DE DATOS - CONEXION
conectarDB();
  

  
function conectarDB()
{
 
  // Conectando a mysql
  const conexion    =    mysql.createConnection({
    connectionLimit   :   100,
    host              :   '127.0.0.1',
    user              :   'root',
    password          :   '',
    database          :   'proyecto',
    debug             :   false
  });

  conexion.connect();

  conexion.query('SELECT * FROM usuario', function(err, rows, fields) {
    if (err) throw err;
    console.log('Usuario: ', rows[0] + rows[1] + rows[2] + rows[3] + rows[4] );
  });
  
  conexion.end();

}