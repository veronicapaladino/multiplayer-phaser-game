//creo un nuevo jugador , bado es 1 barco, 2 submarino

const { pool } = require(".");

function crearJugador(id_jugador, id_partida, bando) {
  return new Promise((resolve, reject) => {
    console.log("id:",id_jugador);
    console.log("id partida:",id_partida);
    console.log("bando:",bando);
    let sql =
      "insert into jugador (id_partida,bando,id_jugador) values (?,?,?)    ";
    pool.query(sql, [id_partida, bando, id_jugador], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      //hay que ver con que verficar la insesion porque esta retornando undefined auqnque si inserta el user
      if (result.insertID !== 0) {
        resolve(true);
      } else {
        reject(new Error ("error al crear partida"));
      }
    });
  });
}

// obtener id de jugador
function obtengoJugador(id_usuario, id_Partida) {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT id_jugador FROM jugador where id_usuario = ? and id_partida = ?";
    pool.query(sql, [id_usuario, id_Partida], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result[0].id_jugador);
      if (result[0].usuario.id_jugador > 0) {
        resolve(result[0].id_jugador);
      } else {
        reject(false);
      }
    });
  });
}

//crear Submarino
function crearSubmarino(id_jugador) {
  return new Promise((resolve, reject) => {
    let sql =
      "insert into submarino (vida,profundidad,coordenadaX,coordenadaY,id_jugador) values (3,1,0,0,?)    ";
    pool.query(sql, id_jugador, (err, result) => {
      if (err) {
        throw err;
      }
      //hay que ver con que verficar la insesion porque esta retornando undefined auqnque si inserta el user
      if (result.insertID !== 0) {
        resolve(true);
      } else {
        reject(new Error ("error al crear partida"));
      }
    });
  });
}

//crear Destructor
function crearDestructor(id_jugador) {
  return new Promise((resolve, reject) => {
    let sql =
      "insert into destructor (vida,coordenadaX,coordenadaY,id_jugador) values (3,0,0,?)    ";
    pool.query(sql, id_jugador, (err, result) => {
      if (err) {
        throw err;
      }
      //hay que ver con que verficar la insesion porque esta retornando undefined auqnque si inserta el user
      if (result.insertID !== 0) {
        resolve(true);
      } else {
        reject(new Error ("error al crear partida"));
      }
    });
  });
}

//guardar submarino
function guardarSubmarino(
  vida,
  profundidad,
  coordenadaX,
  coordenadaY,
  id_jugador
) {
  return new Promise((resolve, reject) => {
    let sql =
      "update submarino set vida=?,profundidad=?,coordenadaX=?,coordenadaY=? where id_jugador like ?";
    pool.query(
      sql,
      [vida, profundidad, coordenadaX, coordenadaY, id_jugador],
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result.changedRows);
        if (result.changedRows > 0) {
          resolve(true);
        } else {
          reject(false);
        }
      }
    );
  });
}

//guardar destructor
function guardarDestructor(vida, coordenadaX, coordenadaY, id_jugador) {
  return new Promise((resolve, reject) => {
    let sql =
      "update destructor set vida=?,coordenadaX=?,coordenadaY=? where id_jugador like ?";
    pool.query(
      sql,
      [vida, coordenadaX, coordenadaY, id_jugador],
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result.changedRows);
        if (result.changedRows > 0) {
          resolve(true);
        } else {
          reject(false);
        }
      }
    );
  });
}

module.exports = {
  crearJugador,
  obtengoJugador,
  crearSubmarino,
  crearDestructor,
  guardarSubmarino,
  guardarDestructor,
};
