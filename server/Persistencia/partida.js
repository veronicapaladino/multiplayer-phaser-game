const { pool } = require(".");

//existe partida
function existePartida(id_partida) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT id_partida FROM partida where id_partida like ?";
    pool.query(sql, nombre, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result[0].id_partida.length);
      if (result[0].id_partida.length > 0) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}


//obtenerpartida
function obtenerPartida() {
  return new Promise((resolve, reject) => {
    let sql = "SELECT id_partida FROM partida order by id_partida desc limit 1";
    pool.query(sql, nombre, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result[0].id_partida.length);
      if (result[0].id_partida.length > 0) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

//crear partida

function crearPartida() {
  return new Promise((resolve, reject) => {
    let sql =
      "insert into partida (estado,guardada,terminada) values ('Creada',0,0)    ";
    pool.query(sql,  (err, result) => {
      if (err) {
        throw err;
      }
      //hay que ver con que verficar la insesion porque esta retornando undefined auqnque si inserta el user
      let id=result.insertId;
      console.log("id en cosulta",result.insertId)
      if (result.insertId > 0) {
        resolve(result.insertId);
      } else {
        reject(new Error ("error al crear partida"));
      }
    });
  });
}

// partida tiene bando ingresado

function existeBandoPartida(id_partida, bando) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT bando FROM jugador where id_partida like ? and bando =?";
    pool.query(sql, [id_partida, bando], (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result[0].bando.length);

      if (result[0].bando.length > 0) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

//partida tiene dos jugadores

function partidaConMaxJugadores(id_partida) {
  return new Promise((resolve, reject) => {
    let sql =
      "SELECT count(*) as cantidad FROM jugador where id_partida like ? ";
    pool.query(sql, id_partida, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result[0]);

      if (result[0].cantidad === 2) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

//terminar partida
function terminarPartida(id_partida) {
  return new Promise((resolve, reject) => {
    let sql = "update partida set terminada=1 where id_partida like ?";
    pool.query(sql, id_partida, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result.changedRows);
      if (result.changedRows > 0) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

//guardar partida
function guardarPartida(id_partida) {
  return new Promise((resolve, reject) => {
    let sql = "update partida set guardada=1 where id_partida like ?";
    pool.query(sql, id_partida, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result.changedRows);
      if (result.changedRows > 0) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

module.exports = {
  existePartida,
  crearPartida,
  existeBandoPartida,
  partidaConMaxJugadores,
  terminarPartida,
  guardarPartida,
};
