

function existeUsuario(nombre) {
    return new Promise((resolve,reject) =>{
      let sql='SELECT usuario FROM usuario where usuario like ?';
      pool.query(sql,nombre,(err,result) =>{
        if(err){
          throw err;
        }
        console.log(result[0].usuario.length);
        if(result[0].usuario.length > 0){
          resolve(true);
        }
        else{
          reject(false);
        }
      }) ;
    })
  };


  
function verificoContraseña(nombre,pass) {
    return new Promise((resolve,reject) =>{
      let sql='SELECT pass FROM usuario where usuario like ?';
      pool.query(sql,nombre,(err,result) =>{
        if(err){
          throw err;
        }
        console.log(result[0].pass);
        if(result[0].pass===pass){
          resolve(true);
        }
        else{
          reject(false);
        }
      }) ;
    })
  };