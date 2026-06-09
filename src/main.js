// Constantes do jogo
const PLAYER_SPEED = 220;
const BULLET_SPEED = 420;
const FIRE_RATE = 250;
const ENEMY_SPEED = 90;
const ENEMY_SPAWN_RATE = 1200;
const MAX_ENEMIES = 20;
const ENEMY_SCORE = 10;
const STARTING_LIVES = 3;
const MAX_AMMO = 10;
const RELOAD_TIME = 2500;
const POOL_SPEED_MULTIPLIER = 0.45;
const SLOW_ZONE_MULTIPLIER = 0.65;
const MAPS = {
  poolday: {
    name: "Pool Day",
    imageKey: "poolday",
    imagePath: "assets/maps/poolday.png",
    playerSpawn: { x: 400, y: 470 },
    enemySpawns: [
      { x: 100, y: 92 },
      { x: 700, y: 92 },
      { x: 90, y: 515 },
      { x: 710, y: 515 }
    ],
    waterZones: [
      { x: 316, y: 40, width: 58, height: 62 },
      { x: 330, y: 230, width: 118, height: 202 }
    ],
    normalZones: [
      { x: 389, y: 394, width: 12, height: 58 }
    ],
    slowZones: [
      { x: 396, y: 68, width: 42, height: 112 },
      { x: 398, y: 146, width: 18, height: 30 },
      { x: 480, y: 308, width: 42, height: 18 }
    ],
    obstacles: [
      { x: 64, y: 84, width: 20, height: 504 },
      { x: 716, y: 84, width: 20, height: 504 },
      { x: 84, y: 66, width: 104, height: 12 },
      { x: 84, y: 84, width: 14, height: 26 },
      { x: 267, y: 17, width: 158, height: 18 },
      { x: 267, y: 17, width: 18, height: 109 },
      { x: 407, y: 17, width: 18, height: 51 },
      { x: 425, y: 60, width: 110, height: 14 },
      { x: 535, y: 70, width: 73, height: 16 },
      { x: 608, y: 66, width: 20, height: 64 },
      { x: 628, y: 66, width: 88, height: 12 },
      { x: 188, y: 66, width: 20, height: 64 },
      { x: 84, y: 77, width: 12, height: 32 },
      { x: 700, y: 77, width: 16, height: 32 },
      { x: 68, y: 584, width: 664, height: 14 },
      { x: 140, y: 492, width: 146, height: 18 },
      { x: 514, y: 492, width: 146, height: 18 },
      { x: 264, y: 440, width: 24, height: 98 },
      { x: 512, y: 440, width: 24, height: 98 },
      { x: 360, y: 502, width: 66, height: 38 },
      { x: 286, y: 126, width: 54, height: 20 },
      { x: 438, y: 126, width: 105, height: 20 },
      { x: 160, y: 205, width: 20, height: 188 },
      { x: 256, y: 205, width: 22, height: 187 },
      { x: 160, y: 255, width: 118, height: 80 },
      { x: 522, y: 205, width: 22, height: 187 },
      { x: 622, y: 205, width: 20, height: 188 },
      { x: 522, y: 255, width: 120, height: 80 },
      { x: 142, y: 234, width: 16, height: 126 },
      { x: 706, y: 282, width: 18, height: 90 },
      { x: 638, y: 224, width: 18, height: 16 },
      { x: 638, y: 248, width: 18, height: 16 },
      { x: 638, y: 272, width: 18, height: 16 },
      { x: 98, y: 70, width: 14, height: 18 },
      { x: 126, y: 70, width: 14, height: 18 },
      { x: 154, y: 70, width: 14, height: 18 }
    ]
  },
  map2: {
    name: "Mapa 2",
    playerSpawn: { x: 400, y: 300 },
    enemySpawns: null,
    waterZones: [],
    normalZones: [],
    slowZones: [],
    obstacles: []
  }
};

// Idioma
const LANGUAGES = {
  pt: {
    play: "Jogar",
    rules: "Como jogar?",
    selectMap: "Selecionar mapa",
    map2: "Mapa 2",
    language: "Idioma",
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
    ammo: "Balas",
    reloading: "A recarregar",
    controls: "Mover: WASD/setas | Disparar: SPACE/clique",
    gameOver: "Game Over",
    restart: "Pressiona R para reiniciar",
    gameOverMenu: "ESC para voltar ao menu"
  },
  en: {
    play: "Play",
    rules: "How to play?",
    selectMap: "Select map",
    map2: "Map 2",
    language: "Language",
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
    ammo: "Ammo",
    reloading: "Reloading",
    controls: "Move: WASD/arrows | Shoot: SPACE/click",
    gameOver: "Game Over",
    restart: "Press R to restart",
    gameOverMenu: "ESC to return to menu"
  }
};

const gameState = {
  language: "pt",
  selectedMap: "map2"
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

// Cena de selecao de mapa
class MapSelectScene extends Phaser.Scene {
  constructor() {
    super("MapSelectScene");
  }

  create() {
    setupMapSelect(this);
  }
}

// Cena do jogo
class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    preloadGameAssets(this);
  }

  create() {
    createTextures(this);
    setupGameState(this);
    setupMap(this);
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
  scene: [MenuScene, RulesScene, MapSelectScene, GameScene]
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
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    menuText.on("pointerover", () => {
      scene.selectedOption = index;
      updateMenuSelection(scene);
    });

    menuText.on("pointerdown", () => {
      scene.selectedOption = index;
      selectMenuOption(scene);
    });

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
    scene.scene.start("MapSelectScene");
    return;
  }

  if (scene.selectedOption === 1) {
    scene.scene.start("RulesScene");
    return;
  }

  toggleLanguage();
  updateMenuSelection(scene);
}

function setupMapSelect(scene) {
  scene.selectedOption = 0;
  scene.mapOptions = ["poolday", "map2"];
  scene.mapTexts = [];

  scene.add.text(scene.scale.width / 2, 100, getText("selectMap"), {
    fontSize: "42px",
    color: "#ffffff"
  }).setOrigin(0.5);

  scene.mapOptions.forEach((mapKey, index) => {
    const mapText = scene.add.text(scene.scale.width / 2, 220 + index * 58, MAPS[mapKey].name, {
      fontSize: "30px",
      color: "#ffffff"
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    mapText.on("pointerover", () => {
      scene.selectedOption = index;
      updateMapSelection(scene);
    });

    mapText.on("pointerdown", () => {
      gameState.selectedMap = scene.mapOptions[index];
      scene.scene.start("GameScene");
    });

    scene.mapTexts.push(mapText);
  });

  scene.add.text(scene.scale.width / 2, 520, getText("back"), {
    fontSize: "20px",
    color: "#f2cc60"
  }).setOrigin(0.5);

  setupMapSelectInput(scene);
  updateMapSelection(scene);
}

function setupMapSelectInput(scene) {
  scene.input.keyboard.on("keydown-UP", () => {
    scene.selectedOption = Phaser.Math.Wrap(scene.selectedOption - 1, 0, scene.mapTexts.length);
    updateMapSelection(scene);
  });

  scene.input.keyboard.on("keydown-DOWN", () => {
    scene.selectedOption = Phaser.Math.Wrap(scene.selectedOption + 1, 0, scene.mapTexts.length);
    updateMapSelection(scene);
  });

  scene.input.keyboard.on("keydown-ENTER", () => {
    gameState.selectedMap = scene.mapOptions[scene.selectedOption];
    scene.scene.start("GameScene");
  });

  scene.input.keyboard.on("keydown-ESC", () => {
    scene.scene.start("MenuScene");
  });
}

function updateMapSelection(scene) {
  scene.mapTexts.forEach((text, index) => {
    const isSelected = index === scene.selectedOption;

    text.setText(`${isSelected ? "> " : "  "}${MAPS[scene.mapOptions[index]].name}`);
    text.setColor(isSelected ? "#f2cc60" : "#ffffff");
  });
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
function preloadGameAssets(scene) {
  Object.values(MAPS).forEach((map) => {
    if (map.imageKey && !scene.textures.exists(map.imageKey)) {
      scene.load.image(map.imageKey, map.imagePath);
    }
  });
}

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

// Mapas
function setupMap(scene) {
  scene.currentMap = MAPS[gameState.selectedMap] || MAPS.map2;
  scene.mapObstacles = scene.physics.add.staticGroup();

  if (scene.currentMap.imageKey) {
    scene.add.image(scene.scale.width / 2, scene.scale.height / 2, scene.currentMap.imageKey)
      .setDisplaySize(scene.scale.width, scene.scale.height)
      .setDepth(-10);
  }

  if (scene.currentMap === MAPS.map2) {
    scene.add.rectangle(0, 0, scene.scale.width, scene.scale.height, 0x222222)
      .setOrigin(0)
      .setDepth(-20);
  }

  scene.currentMap.obstacles.forEach((rect) => {
    const obstacle = scene.add.rectangle(
      rect.x + rect.width / 2,
      rect.y + rect.height / 2,
      rect.width,
      rect.height,
      0x000000,
      0
    );

    scene.physics.add.existing(obstacle, true);
    scene.mapObstacles.add(obstacle);
  });
}

function isInRect(gameObject, rect) {
  return (
    gameObject.x >= rect.x &&
    gameObject.x <= rect.x + rect.width &&
    gameObject.y >= rect.y &&
    gameObject.y <= rect.y + rect.height
  );
}

function isInAnyRect(gameObject, rects) {
  return rects.some((rect) => isInRect(gameObject, rect));
}

function isPointInRect(x, y, rect) {
  return (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  );
}

function isPointInAnyRect(x, y, rects) {
  return rects.some((rect) => isPointInRect(x, y, rect));
}

function lineIntersectsRect(line, rect) {
  const phaserRect = new Phaser.Geom.Rectangle(rect.x, rect.y, rect.width, rect.height);

  return Phaser.Geom.Intersects.LineToRectangle(line, phaserRect);
}

function isPathBlocked(scene, startX, startY, endX, endY) {
  if (!scene.currentMap || !scene.currentMap.obstacles.length) {
    return false;
  }

  const line = new Phaser.Geom.Line(startX, startY, endX, endY);

  return scene.currentMap.obstacles.some((rect) => lineIntersectsRect(line, rect));
}

function getTerrainSpeedMultiplier(scene, gameObject) {
  if (!scene.currentMap || isInAnyRect(gameObject, scene.currentMap.normalZones)) {
    return 1;
  }

  if (isInAnyRect(gameObject, scene.currentMap.slowZones)) {
    return SLOW_ZONE_MULTIPLIER;
  }

  if (isInAnyRect(gameObject, scene.currentMap.waterZones)) {
    return POOL_SPEED_MULTIPLIER;
  }

  return 1;
}

// Jogador e movimento
function setupPlayer(scene) {
  const spawn = scene.currentMap.playerSpawn;
  scene.player = scene.physics.add.sprite(spawn.x, spawn.y, "player");
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

  velocity.normalize().scale(PLAYER_SPEED * getTerrainSpeedMultiplier(scene, scene.player));
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

  if (scene.isReloading || scene.ammo <= 0) {
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

  scene.ammo -= 1;
  scene.nextShotTime = scene.time.now + FIRE_RATE;
  updateHud(scene);

  if (scene.ammo <= 0) {
    startReload(scene);
  }
}

function startReload(scene) {
  if (scene.isGameOver || scene.isReloading) {
    return;
  }

  scene.isReloading = true;
  updateHud(scene);

  scene.reloadTimer = scene.time.delayedCall(RELOAD_TIME, () => {
    if (scene.isGameOver) {
      return;
    }

    scene.ammo = MAX_AMMO;
    scene.isReloading = false;
    scene.reloadTimer = null;
    updateHud(scene);
  });
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
  if (scene.currentMap.enemySpawns) {
    return Phaser.Utils.Array.GetRandom(scene.currentMap.enemySpawns);
  }

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
    const direction = getEnemyMoveDirection(scene, enemy);

    enemy.setVelocity(
      direction.x * ENEMY_SPEED * getTerrainSpeedMultiplier(scene, enemy),
      direction.y * ENEMY_SPEED * getTerrainSpeedMultiplier(scene, enemy)
    );
    enemy.setRotation(direction.angle() + Math.PI / 2);
  });
}

function getEnemyMoveDirection(scene, enemy) {
  const direction = new Phaser.Math.Vector2(
    scene.player.x - enemy.x,
    scene.player.y - enemy.y
  );

  if (direction.lengthSq() < 1) {
    direction.set(Phaser.Math.FloatBetween(-1, 1), Phaser.Math.FloatBetween(-1, 1));
  }

  direction.normalize();

  if (!isPathBlocked(scene, enemy.x, enemy.y, scene.player.x, scene.player.y)) {
    return direction;
  }

  return getAlternativeEnemyDirection(scene, enemy, direction);
}

function getAlternativeEnemyDirection(scene, enemy, direction) {
  const baseAngle = direction.angle();
  const angleOffsets = [
    Math.PI / 4,
    -Math.PI / 4,
    Math.PI / 2,
    -Math.PI / 2,
    (Math.PI * 3) / 4,
    (-Math.PI * 3) / 4,
    Math.PI
  ];
  const lookAhead = 42;
  let bestDirection = direction;
  let bestDistance = Number.MAX_VALUE;

  angleOffsets.forEach((offset) => {
    const candidate = new Phaser.Math.Vector2(
      Math.cos(baseAngle + offset),
      Math.sin(baseAngle + offset)
    );
    const nextX = enemy.x + candidate.x * lookAhead;
    const nextY = enemy.y + candidate.y * lookAhead;

    if (
      isPointInAnyRect(nextX, nextY, scene.currentMap.obstacles) ||
      isPathBlocked(scene, enemy.x, enemy.y, nextX, nextY)
    ) {
      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(nextX, nextY, scene.player.x, scene.player.y);

    if (distanceToPlayer < bestDistance) {
      bestDistance = distanceToPlayer;
      bestDirection = candidate;
    }
  });

  return bestDirection;
}

// Pontuacao, vidas e HUD
function setupGameState(scene) {
  scene.score = 0;
  scene.lives = STARTING_LIVES;
  scene.ammo = MAX_AMMO;
  scene.isReloading = false;
  scene.reloadTimer = null;
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
  const ammoText = scene.isReloading
    ? `${getText("ammo")}: ${scene.ammo}/${MAX_AMMO} (${getText("reloading")})`
    : `${getText("ammo")}: ${scene.ammo}/${MAX_AMMO}`;

  scene.hudText.setText(`${getText("score")}: ${scene.score} | ${getText("lives")}: ${scene.lives} | ${ammoText}`);
}

// Colisoes e overlaps
function setupCollisions(scene) {
  scene.physics.add.collider(scene.player, scene.mapObstacles);
  scene.physics.add.collider(scene.enemies, scene.mapObstacles);
  scene.physics.add.collider(scene.bullets, scene.mapObstacles, onBulletHitsObstacle, null, scene);
  scene.physics.add.overlap(scene.bullets, scene.enemies, onBulletHitsEnemy, null, scene);
  scene.physics.add.overlap(scene.player, scene.enemies, onEnemyHitsPlayer, null, scene);
}

function onBulletHitsObstacle(bullet) {
  bullet.destroy();
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

  if (scene.reloadTimer) {
    scene.reloadTimer.remove(false);
    scene.reloadTimer = null;
  }

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
