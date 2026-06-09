// Constantes do jogo
const PLAYER_SPEED = 220;
const BULLET_SPEED = 420;
const FIRE_RATE = 250;
const ENEMY_SPEED = 90;
const ENEMY_SPAWN_RATE = 1200;
const MAX_ENEMIES = 20;
const ENEMY_SCORE = 10;
const STARTING_LIVES = 3;

// Idioma
const LANGUAGES = {
  pt: {
    play: "Jogar",
    rules: "Como jogar?",
    language: "Idioma",
    menuHelp: "Setas para navegar | Enter para selecionar",
    rulesTitle: "Como jogar?",
    rulesText: [
      "Move o jogador com WASD ou as setas.",
      "Dispara com SPACE ou clique do rato.",
      "Elimina inimigos para ganhar pontos.",
      "Se um inimigo tocar no jogador, perdes uma vida."
    ],
    back: "ESC para voltar ao menu",
    score: "Pontuacao",
    lives: "Vidas",
    controls: "Mover: WASD/setas | Disparar: SPACE/clique",
    gameOver: "Game Over",
    restart: "Pressiona R para reiniciar",
    gameOverMenu: "ESC para voltar ao menu"
  },
  en: {
    play: "Play",
    rules: "How to play?",
    language: "Language",
    menuHelp: "Arrows to navigate | Enter to select",
    rulesTitle: "How to play?",
    rulesText: [
      "Move the player with WASD or arrow keys.",
      "Shoot with SPACE or mouse click.",
      "Destroy enemies to earn points.",
      "If an enemy touches the player, you lose one life."
    ],
    back: "ESC to return to menu",
    score: "Score",
    lives: "Lives",
    controls: "Move: WASD/arrows | Shoot: SPACE/click",
    gameOver: "Game Over",
    restart: "Press R to restart",
    gameOverMenu: "ESC to return to menu"
  }
};

const gameState = {
  language: "pt"
};

function getText(key) {
  return LANGUAGES[gameState.language][key];
}

function toggleLanguage() {
  gameState.language = gameState.language === "pt" ? "en" : "pt";
}

// Cena do menu
class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    setupMenu(this);
  }
}

// Cena de regras
class RulesScene extends Phaser.Scene {
  constructor() {
    super("RulesScene");
  }

  create() {
    setupRules(this);
  }
}

// Cena do jogo
class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
  }

  create() {
    createTextures(this);
    setupGameState(this);
    setupPlayer(this);
    setupShooting(this);
    setupEnemies(this);
    setupHud(this);
    setupCollisions(this);
    setupGameOverInput(this);
  }

  update() {
    if (this.isGameOver) {
      return;
    }

    handlePlayerMovement(this);
    handleShooting(this);
    moveEnemiesTowardsPlayer(this);
    removeOffscreenBullets(this);
  }
}

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
  scene: [MenuScene, RulesScene, GameScene]
};

const game = new Phaser.Game(config);

// Menu e regras
function setupMenu(scene) {
  scene.selectedOption = 0;
  scene.menuTexts = [];

  scene.titleText = scene.add.text(scene.scale.width / 2, 120, "Counter-Shooter", {
    fontSize: "48px",
    color: "#ffffff"
  }).setOrigin(0.5);

  scene.helpText = scene.add.text(scene.scale.width / 2, 500, getText("menuHelp"), {
    fontSize: "18px",
    color: "#c9d1d9"
  }).setOrigin(0.5);

  createMenuOptions(scene);
  setupMenuInput(scene);
  updateMenuSelection(scene);
}

function createMenuOptions(scene) {
  const options = getMenuOptions();

  scene.menuTexts.forEach((text) => text.destroy());
  scene.menuTexts = [];

  options.forEach((option, index) => {
    const menuText = scene.add.text(scene.scale.width / 2, 240 + index * 58, option, {
      fontSize: "28px",
      color: "#ffffff"
    }).setOrigin(0.5);

    scene.menuTexts.push(menuText);
  });
}

function setupMenuInput(scene) {
  scene.input.keyboard.on("keydown-UP", () => {
    scene.selectedOption = Phaser.Math.Wrap(scene.selectedOption - 1, 0, scene.menuTexts.length);
    updateMenuSelection(scene);
  });

  scene.input.keyboard.on("keydown-DOWN", () => {
    scene.selectedOption = Phaser.Math.Wrap(scene.selectedOption + 1, 0, scene.menuTexts.length);
    updateMenuSelection(scene);
  });

  scene.input.keyboard.on("keydown-ENTER", () => {
    selectMenuOption(scene);
  });
}

function getMenuOptions() {
  return [
    getText("play"),
    getText("rules"),
    `${getText("language")}: ${gameState.language.toUpperCase()}`
  ];
}

function updateMenuSelection(scene) {
  scene.menuTexts.forEach((text, index) => {
    const isSelected = index === scene.selectedOption;

    text.setText(`${isSelected ? "> " : "  "}${getMenuOptions()[index]}`);
    text.setColor(isSelected ? "#f2cc60" : "#ffffff");
  });
}

function selectMenuOption(scene) {
  if (scene.selectedOption === 0) {
    scene.scene.start("GameScene");
    return;
  }

  if (scene.selectedOption === 1) {
    scene.scene.start("RulesScene");
    return;
  }

  toggleLanguage();
  scene.helpText.setText(getText("menuHelp"));
  updateMenuSelection(scene);
}

function setupRules(scene) {
  scene.add.text(scene.scale.width / 2, 90, getText("rulesTitle"), {
    fontSize: "42px",
    color: "#ffffff"
  }).setOrigin(0.5);

  getText("rulesText").forEach((line, index) => {
    scene.add.text(120, 190 + index * 45, line, {
      fontSize: "22px",
      color: "#c9d1d9"
    });
  });

  scene.add.text(scene.scale.width / 2, 520, getText("back"), {
    fontSize: "20px",
    color: "#f2cc60"
  }).setOrigin(0.5);

  scene.input.keyboard.on("keydown-ESC", () => {
    scene.scene.start("MenuScene");
  });
}

// Texturas
function createTextures(scene) {
  createPlayerTexture(scene);
  createBulletTexture(scene);
  createEnemyTexture(scene);
}

function createPlayerTexture(scene) {
  if (scene.textures.exists("player")) {
    return;
  }

  const graphics = scene.add.graphics();

  graphics.fillStyle(0x3fb950, 1);
  graphics.fillTriangle(16, 0, 32, 32, 0, 32);
  graphics.lineStyle(3, 0xffffff, 1);
  graphics.strokeTriangle(16, 0, 32, 32, 0, 32);
  graphics.generateTexture("player", 32, 32);
  graphics.destroy();
}

function createBulletTexture(scene) {
  if (scene.textures.exists("bullet")) {
    return;
  }

  const graphics = scene.add.graphics();

  graphics.fillStyle(0xf2cc60, 1);
  graphics.fillCircle(6, 6, 6);
  graphics.generateTexture("bullet", 12, 12);
  graphics.destroy();
}

function createEnemyTexture(scene) {
  if (scene.textures.exists("enemy")) {
    return;
  }

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
  if (scene.isGameOver || !scene.spaceKey.isDown) {
    return;
  }

  const angle = scene.player.rotation - Math.PI / 2;
  const targetX = scene.player.x + Math.cos(angle) * 100;
  const targetY = scene.player.y + Math.sin(angle) * 100;

  shootBullet(scene, targetX, targetY);
}

function shootBullet(scene, targetX, targetY) {
  if (scene.isGameOver) {
    return;
  }

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

  scene.enemySpawnTimer = scene.time.addEvent({
    delay: ENEMY_SPAWN_RATE,
    callback: () => spawnEnemy(scene),
    loop: true
  });
}

function spawnEnemy(scene) {
  if (scene.isGameOver) {
    return;
  }

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
function setupGameState(scene) {
  scene.score = 0;
  scene.lives = STARTING_LIVES;
  scene.isGameOver = false;
}

function setupHud(scene) {
  scene.hudText = scene.add.text(16, 16, "", {
    fontSize: "18px",
    color: "#ffffff"
  });

  scene.add.text(16, 44, getText("controls"), {
    fontSize: "16px",
    color: "#c9d1d9"
  });

  updateHud(scene);
}

function updateHud(scene) {
  scene.hudText.setText(`${getText("score")}: ${scene.score} | ${getText("lives")}: ${scene.lives}`);
}

// Colisoes e overlaps
function setupCollisions(scene) {
  scene.physics.add.overlap(scene.bullets, scene.enemies, onBulletHitsEnemy, null, scene);
  scene.physics.add.overlap(scene.player, scene.enemies, onEnemyHitsPlayer, null, scene);
}

function onBulletHitsEnemy(bullet, enemy) {
  if (this.isGameOver) {
    return;
  }

  bullet.destroy();
  enemy.destroy();

  this.score += ENEMY_SCORE;
  updateHud(this);
}

function onEnemyHitsPlayer(player, enemy) {
  if (this.isGameOver) {
    return;
  }

  enemy.destroy();

  this.lives -= 1;
  updateHud(this);

  if (this.lives <= 0) {
    showGameOver(this);
  }
}

// Game Over e reinicio
function setupGameOverInput(scene) {
  scene.restartKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  scene.menuKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

  scene.restartKey.on("down", () => {
    if (scene.isGameOver) {
      scene.scene.restart();
    }
  });

  scene.menuKey.on("down", () => {
    if (scene.isGameOver) {
      scene.scene.start("MenuScene");
    }
  });
}

function showGameOver(scene) {
  scene.isGameOver = true;
  scene.lives = 0;
  updateHud(scene);

  scene.player.setVelocity(0, 0);
  destroyGroupObjects(scene.bullets);
  destroyGroupObjects(scene.enemies);
  scene.enemySpawnTimer.paused = true;

  scene.add.text(scene.scale.width / 2, scene.scale.height / 2 - 30, getText("gameOver"), {
    fontSize: "48px",
    color: "#ffffff"
  }).setOrigin(0.5);

  scene.add.text(scene.scale.width / 2, scene.scale.height / 2 + 30, getText("restart"), {
    fontSize: "22px",
    color: "#c9d1d9"
  }).setOrigin(0.5);

  scene.add.text(scene.scale.width / 2, scene.scale.height / 2 + 64, getText("gameOverMenu"), {
    fontSize: "22px",
    color: "#f2cc60"
  }).setOrigin(0.5);
}

function destroyGroupObjects(group) {
  group.getChildren().forEach((gameObject) => {
    gameObject.destroy();
  });
}
