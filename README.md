# proyecto

The goal of this project is to implement a multiplayer game using [`Socket.IO`](https://socket.io/), [`ExpressJS`](https://expressjs.com/) and [`Phaser 3`](https://phaser.io/phaser3).

## Prerequisites

- [`Node.js`](https://nodejs.org/en/)
- MySQL 8
- Crear base datos copiando el script que esta en `server/proyecto.sql`
- Crear usuario admin
  `````
  CREATE USER 'admin'@'%' IDENTIFIED BY 'admin'
  GRANT ALL PRIVILEGES ON . TO 'admin'@'%';
  ``````

- Editar la configuración de `server/Persistencia/index.js`
  ````
  // Conectando a mysql
  var pool = mysql.createPool({
    connectionLimit: 100,
    host: "127.0.0.1",
    user: "admin",
    password: "admin",
    database: "proyecto",
    debug: false,
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
- Open a browser and access `http://localhost:8081`

![The silent war of the atlantic](https://user-images.githubusercontent.com/69306110/156943409-49c96de6-861e-49bf-8102-f2392fd5d0a9.gif)


## Credits
- [@JoaquinLerena](https://github.com/JoaquinLerena)
- [@DiegoPérez](https://github.com/dxp0610)
- [@Fernando Vila](https://github.com/Fvila41)



