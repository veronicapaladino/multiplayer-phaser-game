# Prerequisites

- [`Node.js`](https://nodejs.org/en/): se utiliza la versión 14
- MySQL 8 : Se utiliza workbench
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