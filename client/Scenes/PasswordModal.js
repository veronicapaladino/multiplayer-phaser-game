class PasswordModal extends Phaser.Scene {
  constructor() {
    super({ key: "PasswordModal" });
  }

  create() {
    this.mensaje = this.add
      .text(400, 400, "La contraseña ingresada es incorrecta!")
      .setOrigin(0)
      .setScale(3.2)
      .setInteractive();
    this.time.delayedCall(2000, onChangeVisible, [], this);
  }
}

function onChangeVisible() {
  this.scene.setVisible(false, this);
}
export default PasswordModal;
