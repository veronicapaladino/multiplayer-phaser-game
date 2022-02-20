
//creo un nuevo jugador , bado es 1 barco, 2 submarino

function crearJugador(id_usuario,id_partida,bando) {
    return new Promise((resolve, reject) => {
      let sql = "insert into jugador (id_partida,bando,id_usuario) values (?,?,?)    ";
      pool.query(sql, [id_partida,bando,id_usuario] , (err, result) => {
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

  