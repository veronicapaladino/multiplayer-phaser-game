# proyecto

The goal of this project is to implement a multiplayer game using [`Socket.IO`](https://socket.io/), [`ExpressJS`](https://expressjs.com/) and [`Phaser 3`](https://phaser.io/phaser3).

## Prerequisites

- [`Node.js`](https://nodejs.org/en/)
- Editar la configuración de server.js
  ````
  // Conectando a mysql
  const conexion    =    mysql.createConnection({
    connectionLimit   :   100,
    host              :   '127.0.0.1',
    user              :   'admin',
    password          :   'admin',
    database          :   'proyecto',
    debug             :   false
  });

## Start game

- Set node enviorment
  ```
  nvm use
  ```

- Execute the command below if you are running it for the first time
  ```
  npm install
  ```

- Run the following command to start the game server
  ```
  npm run start-dev
  ```

## Play game
- Open a browser and access `http://localhost:3306`


## Otra alternativa:

- abrir terminal en vs code
- pararse en la raiz del proyecto
- ejecutar npm install
- ejecutar node server.js --> para correr el servidor
- conectarse a `http://localhost:3306`



