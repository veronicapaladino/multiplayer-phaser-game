//Escena inicial del juego...
class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoginScene" });
  }

  preload() {
    var url;
    url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js";
    this.load.plugin("rexbbcodetextplugin", url, true);

    url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js";
    this.load.plugin("rextexteditplugin", url, true);

    this.load.image("background", "client/assets/images/water.jpg");

    this.load.image(
      "loginButton",
      "client/assets/images/login/loginButton.png"
    );

    this.load.audio("fondo_menu", "client/assets/audio/fondo_menu.wav");
    this.load.audio("click", "client/assets/audio/click.wav");
  }

  create() {
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

    // Título
    this.add.text(240, 100, "THE SILENT WAR OF THE ATLANTIC", {
      fill: "white",
      fontSize: "32px",
    });

    // label nombre de usuario
    this.add.text(220, 190, "Nombre de usuario:", {
      fill: "white",
    });

    // input nobre de usuario
    var usernameInput = this.add
      .rexBBCodeText(600, 200, "", {
        color: "white",
        fontSize: "24px",
        fixedWidth: 400,
        fixedHeight: 40,
        backgroundColor: "#333333",
        rtl: true,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          var config = {
            onOpen: function (textObject) {
              console.log("Open text editor");
            },
            onTextChanged: function (textObject, text) {
              textObject.text = text;
              user = text;
              console.log(`Text: ${text}`);
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
    this.add.text(220, 280, "Contraseña:", {
      fill: "white",
    });

    // input nobre de contraseña
    var passInput = this.add
      .rexBBCodeText(600, 290, "", {
        color: "white",
        fontSize: "24px",
        fixedWidth: 400,
        fixedHeight: 40,
        backgroundColor: "#333333",
        valign: "center",
        rtl: true,
      })
      .setOrigin(0.5)
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          var config = {
            onOpen: function (textObject) {},
            onTextChanged: function (textObject, text) {
              textObject.text = text;
              password = text;
              console.log(`Text: ${text}`);
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
    const login = this.add.text(450, 400, "LOGIN", {
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
        this.scene.launch("PasswordModal");
        this.scene.bringToTop("PasswordModal");
        this.scene.setVisible(true, this.currentScene);
      }
    });

    // Boton registrarse
    const register = this.add.text(600, 400, "REGISTRARSE", {
      fill: "white",
      fontSize: "32px",
    });
    register.setInteractive();

    register.on("pointerdown", () => {
      console.log("cambiar de escena a: MenuScene");
      this.scene.start("MenuScene");
    });
  }
}

export default LoginScene;
