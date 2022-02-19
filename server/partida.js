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

  //crear partida

  function crearPartida(id_partida) {
    return new Promise((resolve, reject) => {
      let sql = "insert into partida (id_partida,estado,guardada,terminada) values (?,'Creada',0,0)    ";
      pool.query(sql, id_partida, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result.insertID);
        //hay que ver con que verficar la insesion porque esta retornando undefined auqnque si inserta el user
        if (result.insertID > 0) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  