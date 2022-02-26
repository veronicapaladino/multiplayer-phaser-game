//Escena inicial del juego...
class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoginScene" });
  }
  cambioAMenu() {
    this.scene.start("MenuScene");
  }

  preload() {}

  create() {
    var game = this;
    var registerStatus = 500;
    this.socket = io();
    let user = "";
    let password = "";
    this.fondoMenu = this.add
      .image(0, 0, "background")
      .setOrigin(0)
      .setInteractive();
    this.sonido_fondo = this.sound.add("fondo_menu", {
      loop: true,
      volume: 0.02,
    });
    this.sonido_click = this.sound.add("click", { loop: true });

    this.fondoMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.sonido_fondo.play();
    });

    // Mensaje de error
    var error_msg = this.add.text(500, 500, "", {
      fill: "black",
      fontSize: "26px",
    });
    error_msg.visible = false;

    // Título
    this.add.text(440, 100, "THE SILENT WAR OF THE ATLANTIC", {
      fill: "white",
      fontSize: "32px",
    });

    // label nombre de usuario
    this.add.text(420, 190, "Nombre de usuario:", {
      fill: "white",
    });

    // input nobre de usuario
    var usernameInput = this.add
      .rexBBCodeText(800, 200, "", {
        color: "white",
        fontSize: "24px",
        fixedWidth: 400,
        fixedHeight: 40,
        backgroundColor: "#333333",
        valign: "center",
        halign: "left",
        rtl: true,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          var config = {
            onOpen: function (textObject) {
              error_msg.visible = false;
            },
            onTextChanged: function (textObject, text) {
              textObject.text = text;
              user = text;
            },
            onClose: function (textObject) {},
            selectAll: true,
            // enterClose: false
          };
          this.plugins.get("rextexteditplugin").edit(usernameInput, config);
        },
        this
      );

    // label contraseña
    this.add.text(420, 280, "Contraseña:", {
      fill: "white",
    });

    // input contraseña
    var passInput = this.add
      .rexBBCodeText(800, 290, "", {
        color: "white",
        fontSize: "24px",
        fixedWidth: 400,
        fixedHeight: 40,
        backgroundColor: "#333333",
        valign: "center",
        halign: "left",
        rtl: true,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          var config = {
            onOpen: function (textObject) {
              error_msg.visible = false;
            },
            onTextChanged: function (textObject, text) {
              textObject.text = text;
              password = text;
            },
            onClose: function (textObject) {},
            selectAll: true,
          };
          this.plugins.get("rextexteditplugin").edit(passInput, config);
        },
        this
      );

    this.input.mouse.capture = true;

    // Boton Login
    const login = this.add.text(650, 400, "LOGIN", {
      fill: "white",
      fontSize: "32px",
    });
    login.setInteractive();

    login.on("pointerdown", () => {
      console.log("contraseña ingresada:", password);
      console.log("usuario ingresado:", user);
      if (!!password.length && !!user.length) {
        this.scene.start("MenuScene");
      } else {
        error_msg.text = "Debe ingresar un nombre y contraseá de usuario";
        error_msg.visible = true;
      }
    });

    // Boton registrarse
    const register = this.add.text(800, 400, "REGISTRARSE", {
      fill: "white",
      fontSize: "32px",
    });
    register.setInteractive();

    register.on("pointerdown", () => {
      error_msg.visible = false;
      this.socket.emit("registerUser", [user, password]);
      this.socket.on("registroValido", function (status) {
        registerStatus = status;
        if (registerStatus === 200) game.scene.start("MenuScene");
        if (registerStatus === 500) {
          error_msg.text = "Este usuario ya esta registrado, seleccione Login";
          error_msg.visible = true;
        }
      });
    });
  }
}

export default LoginScene;
