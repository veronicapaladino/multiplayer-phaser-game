const { pool } = require(".");

//Verifico si exite el nombre de usuario ingresado
function existeUsuario(nombre) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT usuario FROM usuario where usuario like ?";
    pool.query(sql, nombre, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result[0].usuario.length);
      if (result[0].usuario.length > 0) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

//verfifico si la pass ingresada coicide con la del usuario
function verificoContraseña(nombre, pass) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT pass FROM usuario where usuario like ?";
    pool.query(sql, nombre, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result[0].pass);
      if (result[0].pass === pass) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
}

//obtengo la id del nombre del usuario ingresado
function obtengoIdUsuario(nombre) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT id_usuario FROM usuario where usuario like ?";
    pool.query(sql, nombre, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result[0].id_usuario);
      if (result[0].usuario.id_usuario > 0) {
        resolve(result[0].id_usuario);
      } else {
        reject(false);
      }
    });
  });
}

//cambio el estado del usuario que inicio sesion por conectado
function checkOnlineUsuario(id_usuario) {
  return new Promise((resolve, reject) => {
    let sql = "update usuario set status_online=1 where id_usuario like ?";
    pool.query(sql, nombre, (err, result) => {
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

//cambio el estado del usuario que inicio sesion por desconectado
function checkOfflineUsuario(id_usuario) {
  return new Promise((resolve, reject) => {
    let sql = "update usuario set status_online=0 where id_usuario like ?";
    pool.query(sql, nombre, (err, result) => {
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

// Registro de ususario
function registroUsuario(nombre, pass) {
  return new Promise((resolve, reject) => {
    let sql =
      "insert into usuario (usuario,pass,status_online,partidas_ganadas) values (?,?,1,0)    ";
    pool.query(sql, ["30", nombre, pass], (err, result) => {
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

export {
  existeUsuario,
  verificoContraseña,
  obtengoIdUsuario,
  checkOnlineUsuario,
  checkOfflineUsuario,
  registroUsuario,
};
