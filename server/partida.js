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

  function registroUsuario(nombre, pass) {
    return new Promise((resolve, reject) => {
      let sql = "insert into usuario (usuario,pass,status_online,partidas_ganadas) values (?,?,1,0)    ";
      pool.query(sql, [nombre,pass], (err, result) => {
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