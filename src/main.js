const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222222",
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const PLAYER_SPEED = 220;

const game = new Phaser.Game(config);

function preload() {
}

function create() {
  createPlayerTexture(this);

  this.player = this.physics.add.sprite(400, 300, "player");
  this.player.setCollideWorldBounds(true);

  this.cursors = this.input.keyboard.createCursorKeys();
  this.wasd = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });

  this.add.text(16, 16, "Mover: WASD ou setas", {
    fontSize: "18px",
    color: "#ffffff"
  });
}

function update() {
  const left = this.cursors.left.isDown || this.wasd.left.isDown;
  const right = this.cursors.right.isDown || this.wasd.right.isDown;
  const up = this.cursors.up.isDown || this.wasd.up.isDown;
  const down = this.cursors.down.isDown || this.wasd.down.isDown;

  const velocity = new Phaser.Math.Vector2(0, 0);

  if (left) {
    velocity.x = -1;
  } else if (right) {
    velocity.x = 1;
  }

  if (up) {
    velocity.y = -1;
  } else if (down) {
    velocity.y = 1;
  }

  velocity.normalize().scale(PLAYER_SPEED);
  this.player.setVelocity(velocity.x, velocity.y);

  if (velocity.lengthSq() > 0) {
    this.player.setRotation(velocity.angle() + Math.PI / 2);
  }
}

function createPlayerTexture(scene) {
  const graphics = scene.add.graphics();

  graphics.fillStyle(0x3fb950, 1);
  graphics.fillTriangle(16, 0, 32, 32, 0, 32);
  graphics.lineStyle(3, 0xffffff, 1);
  graphics.strokeTriangle(16, 0, 32, 32, 0, 32);
  graphics.generateTexture("player", 32, 32);
  graphics.destroy();
}
