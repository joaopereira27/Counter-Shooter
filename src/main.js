// Configuracao do jogo
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

// Constantes do jogo
const PLAYER_SPEED = 220;
const BULLET_SPEED = 420;
const FIRE_RATE = 250;
const ENEMY_SPEED = 90;
const ENEMY_SPAWN_RATE = 1200;
const MAX_ENEMIES = 20;
const ENEMY_SCORE = 10;
const STARTING_LIVES = 3;

const game = new Phaser.Game(config);

// Ciclo principal Phaser
function preload() {
}

function create() {
  createTextures(this);
  setupPlayer(this);
  setupShooting(this);
  setupEnemies(this);
  setupHud(this);
  setupCollisions(this);
}

function update() {
  handlePlayerMovement(this);
  handleShooting(this);
  moveEnemiesTowardsPlayer(this);
  removeOffscreenBullets(this);
}

// Texturas
function createTextures(scene) {
  createPlayerTexture(scene);
  createBulletTexture(scene);
  createEnemyTexture(scene);
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

function createBulletTexture(scene) {
  const graphics = scene.add.graphics();

  graphics.fillStyle(0xf2cc60, 1);
  graphics.fillCircle(6, 6, 6);
  graphics.generateTexture("bullet", 12, 12);
  graphics.destroy();
}

function createEnemyTexture(scene) {
  const graphics = scene.add.graphics();

  graphics.fillStyle(0xd73a49, 1);
  graphics.fillCircle(16, 16, 16);
  graphics.lineStyle(3, 0xffffff, 1);
  graphics.strokeCircle(16, 16, 14);
  graphics.generateTexture("enemy", 32, 32);
  graphics.destroy();
}

// Jogador e movimento
function setupPlayer(scene) {
  scene.player = scene.physics.add.sprite(400, 300, "player");
  scene.player.setCollideWorldBounds(true);

  scene.cursors = scene.input.keyboard.createCursorKeys();
  scene.wasd = scene.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
}

function handlePlayerMovement(scene) {
  const left = scene.cursors.left.isDown || scene.wasd.left.isDown;
  const right = scene.cursors.right.isDown || scene.wasd.right.isDown;
  const up = scene.cursors.up.isDown || scene.wasd.up.isDown;
  const down = scene.cursors.down.isDown || scene.wasd.down.isDown;

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
  scene.player.setVelocity(velocity.x, velocity.y);

  if (velocity.lengthSq() > 0) {
    scene.player.setRotation(velocity.angle() + Math.PI / 2);
  }
}

// Disparos
function setupShooting(scene) {
  scene.bullets = scene.physics.add.group();
  scene.nextShotTime = 0;
  scene.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  scene.input.on("pointerdown", (pointer) => {
    shootBullet(scene, pointer.worldX, pointer.worldY);
  });
}

function handleShooting(scene) {
  if (!scene.spaceKey.isDown) {
    return;
  }

  const angle = scene.player.rotation - Math.PI / 2;
  const targetX = scene.player.x + Math.cos(angle) * 100;
  const targetY = scene.player.y + Math.sin(angle) * 100;

  shootBullet(scene, targetX, targetY);
}

function shootBullet(scene, targetX, targetY) {
  if (scene.time.now < scene.nextShotTime) {
    return;
  }

  const direction = new Phaser.Math.Vector2(
    targetX - scene.player.x,
    targetY - scene.player.y
  );

  if (direction.lengthSq() === 0) {
    return;
  }

  direction.normalize();

  const bullet = scene.bullets.create(scene.player.x, scene.player.y, "bullet");
  bullet.setVelocity(direction.x * BULLET_SPEED, direction.y * BULLET_SPEED);
  bullet.setRotation(direction.angle() + Math.PI / 2);

  scene.nextShotTime = scene.time.now + FIRE_RATE;
}

function removeOffscreenBullets(scene) {
  scene.bullets.children.each((bullet) => {
    if (
      bullet.x < -20 ||
      bullet.x > scene.scale.width + 20 ||
      bullet.y < -20 ||
      bullet.y > scene.scale.height + 20
    ) {
      bullet.destroy();
    }
  });
}

// Inimigos
function setupEnemies(scene) {
  scene.enemies = scene.physics.add.group();

  scene.time.addEvent({
    delay: ENEMY_SPAWN_RATE,
    callback: () => spawnEnemy(scene),
    loop: true
  });
}

function spawnEnemy(scene) {
  if (scene.enemies.countActive(true) >= MAX_ENEMIES) {
    return;
  }

  const spawnPoint = getEnemySpawnPoint(scene);
  const enemy = scene.enemies.create(spawnPoint.x, spawnPoint.y, "enemy");

  enemy.setCircle(14, 2, 2);
  enemy.setCollideWorldBounds(false);
  enemy.setBounce(0);
  enemy.setDrag(0);
  enemy.setMaxVelocity(ENEMY_SPEED);
}

function getEnemySpawnPoint(scene) {
  const margin = 24;
  const side = Phaser.Math.Between(0, 3);
  const width = scene.scale.width;
  const height = scene.scale.height;

  if (side === 0) {
    return {
      x: Phaser.Math.Between(0, width),
      y: -margin
    };
  }

  if (side === 1) {
    return {
      x: width + margin,
      y: Phaser.Math.Between(0, height)
    };
  }

  if (side === 2) {
    return {
      x: Phaser.Math.Between(0, width),
      y: height + margin
    };
  }

  return {
    x: -margin,
    y: Phaser.Math.Between(0, height)
  };
}

function moveEnemiesTowardsPlayer(scene) {
  scene.enemies.children.each((enemy) => {
    const direction = new Phaser.Math.Vector2(
      scene.player.x - enemy.x,
      scene.player.y - enemy.y
    );

    if (direction.lengthSq() < 1) {
      direction.set(Phaser.Math.FloatBetween(-1, 1), Phaser.Math.FloatBetween(-1, 1));
    }

    direction.normalize();
    enemy.setVelocity(direction.x * ENEMY_SPEED, direction.y * ENEMY_SPEED);
    enemy.setRotation(direction.angle() + Math.PI / 2);
  });
}

// Pontuacao, vidas e HUD
function setupHud(scene) {
  scene.score = 0;
  scene.lives = STARTING_LIVES;

  scene.hudText = scene.add.text(16, 16, "", {
    fontSize: "18px",
    color: "#ffffff"
  });

  scene.add.text(16, 44, "Mover: WASD/setas | Disparar: SPACE/clique", {
    fontSize: "16px",
    color: "#c9d1d9"
  });

  updateHud(scene);
}

function updateHud(scene) {
  scene.hudText.setText(`Pontuacao: ${scene.score} | Vidas: ${scene.lives}`);
}

// Colisoes e overlaps
function setupCollisions(scene) {
  scene.physics.add.overlap(scene.bullets, scene.enemies, onBulletHitsEnemy, null, scene);
  scene.physics.add.overlap(scene.player, scene.enemies, onEnemyHitsPlayer, null, scene);
}

function onBulletHitsEnemy(bullet, enemy) {
  bullet.destroy();
  enemy.destroy();

  this.score += ENEMY_SCORE;
  updateHud(this);
}

function onEnemyHitsPlayer(player, enemy) {
  enemy.destroy();

  this.lives -= 1;
  updateHud(this);
}
