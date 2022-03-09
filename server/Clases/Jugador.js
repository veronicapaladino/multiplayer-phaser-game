class Jugador {
  constructor() {
    this.id_jugador = "";
    this.id_partida = "";
    this.bando = "";
    this.x="";
    this.y="";
    this.vida="";
    this.nivel="";
    this.rotacion="";
  }

  /**
   * Metodo setear Jugador
   *
   * @param String id_jugador.
   * @param String id_partida.
   * @param String bando.
   *
   * @return void.
   */
  setJugador(id, idPartida, bando) {
    this.id_jugador = id;
    this.id_partida = idPartida;
    this.bando = bando;
  }
}

module.exports = Jugador;
