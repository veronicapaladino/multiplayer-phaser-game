 # Descripción General
El juego debe representar el combate entre el barco de los aliados que buscará  proteger el convoy de suministros que deben ir de Estados Unidos a Europa, dichas embarcaciones deberán superar la línea del  enemigo (submarino alemán) el cual  intentará estropear la misión de los aliados.

## Requerimientos
  
### El juego deberá contemplar lo siguiente:

 - Debe ser desarrollado para navegador web.
 - Debe tener 2 jugadores como mínimo.
 - La arquitectura del mismo tiene que ser cliente-servidor.
 - Tiempo de desarrollo en 5 semanas.
 - Se deberá persistir la información para poder guardar y recuperar la partida.
 - No deberá tener banderas de países.
 - No permitirá el uso indebido de derechos de autor. 
 - Deberá tener 2 vistas, una  aérea  y otra lateral para las animaciones.
 - El barco tendrá como artillería cañones y cargas de profundidad. 
 - La artillería del submarino deberá ser torpedos.
 - Condición de victoria: 
    - Para los aliados: el convoy deberá llegar con al menos un barco de suministros a  su destino
    - Para los enemigos: deberá hundir toda la flota de suministros aliados
- Rango de visión:  
    - Aliados: barco solo ve superficie
    - Enemigos: el submarino solo ve cuando está en superficie alta, y no sumergido en profundidad baja.

### Requerimientos no funcionales

- Para jugar debe de haber 2 jugadores en la partida en la misma red.
- Arquitectura Cliente-Servidor
- Back-end desarrollador en Node.js
- Front-end desarrollado en Phaser
- Desarrollado en 3 capas
- Administrador de base de datos Mysql 
- Manejo de protocolos de comunicación TCP/IP
- Disponible para navegadores WEB 
