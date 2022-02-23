class Usuario {
  constructor() {
    this.id = "";
    this.nombre = "";
    this.pass = "";
  }

  /**
   * Metodo setear usuario
   *
   * @param Integer id.
   * @param String nombre.
   * @param pass password.
   *
   * @return void.
   */
  setUsuario(id, nombre, pass) {
    this.id = id;
    this.pass = pass;
    this.nombre = nombre;
  }
}

module.exports = Usuario;
