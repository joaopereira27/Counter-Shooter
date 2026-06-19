// Constantes
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
const PLAYER_SIZE = 48;
const ENEMY_SIZE = 48;
const CHARACTER_RADIUS = 12;
const ENEMY_ROUTE_LOOK_AHEAD = 54;
const ENEMY_STUCK_DISTANCE = 0.5;
const ENEMY_STUCK_FRAMES = 18;
const ENEMY_AVOID_TIME = 450;
const PATH_CELL_SIZE = 16;

// Mapas
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
      // Exterior do mapa: bloqueia a zona fora do contorno sem tapar o chao colorido.
      { x: 0, y: 0, width: 64, height: 600 },
      { x: 736, y: 0, width: 64, height: 600 },
      { x: 0, y: 0, width: 800, height: 17 },
      { x: 0, y: 596, width: 800, height: 4 },
      { x: 64, y: 0, width: 203, height: 66 },
      { x: 535, y: 0, width: 201, height: 66 },
      // Contorno e objetos escuros/cinzentos do mapa.
      { x: 64, y: 82, width: 18, height: 506 },
      { x: 718, y: 82, width: 18, height: 506 },
      { x: 64, y: 584, width: 672, height: 16 },
      { x: 82, y: 66, width: 107, height: 14 },
      { x: 82, y: 84, width: 14, height: 30 },
      { x: 170, y: 66, width: 19, height: 82 },
      { x: 189, y: 84, width: 62, height: 14 },
      { x: 267, y: 17, width: 158, height: 18 },
      { x: 267, y: 17, width: 18, height: 72 },
      { x: 407, y: 17, width: 18, height: 52 },
      { x: 425, y: 59, width: 110, height: 16 },
      { x: 535, y: 70, width: 73, height: 16 },
      { x: 608, y: 66, width: 20, height: 82 },
      { x: 628, y: 66, width: 90, height: 14 },
      { x: 700, y: 84, width: 18, height: 30 },
      { x: 260, y: 126, width: 78, height: 20 },
      { x: 402, y: 126, width: 142, height: 20 },
      { x: 164, y: 202, width: 11, height: 172 },
      { x: 165, y: 251, width: 106, height: 68 },
      { x: 259, y: 202, width: 12, height: 159 },
      { x: 526, y: 202, width: 10, height: 172 },
      { x: 526, y: 251, width: 116, height: 68 },
      { x: 631, y: 202, width: 12, height: 172 },
      { x: 146, y: 481, width: 137, height: 12 },
      { x: 260, y: 430, width: 11, height: 88 },
      { x: 516, y: 430, width: 11, height: 88 },
      { x: 516, y: 481, width: 137, height: 12 },
      { x: 350, y: 484, width: 76, height: 25 },
      { x: 350, y: 517, width: 18, height: 43 },
      { x: 174, y: 66, width: 10, height: 72 },
      { x: 616, y: 66, width: 10, height: 72 }
    ]
  },
  overpass: {
    name: "Overpass",
    imageKey: "overpass",
    imagePath: "assets/maps/overpass.png",
    playerSpawn: { x: 400, y: 520 },
    enemySpawns: [
      { x: 140, y: 80 },
      { x: 660, y: 80 },
      { x: 120, y: 310 },
      { x: 700, y: 320 }
    ],
    waterZones: [
      { x: 0, y: 37, width: 391, height: 56 },
      { x: 33, y: 93, width: 241, height: 30 },
      { x: 516, y: 50, width: 240, height: 85 },
      { x: 204, y: 477, width: 37, height: 69 },
      { x: 241, y: 496, width: 173, height: 63 }
    ],
    normalZones: [],
    slowZones: [],
    obstacles: [
      // Hitboxes roxas do overlay do Overpass.
      { x: 0, y: 0, width: 388, height: 37 },
      { x: 500, y: 0, width: 300, height: 46 },
      { x: 0, y: 159, width: 159, height: 69 },
      { x: 0, y: 225, width: 64, height: 85 },
      { x: 0, y: 352, width: 80, height: 61 },
      { x: 0, y: 503, width: 103, height: 97 },
      { x: 102, y: 562, width: 166, height: 38 },
      { x: 268, y: 443, width: 156, height: 54 },
      { x: 622, y: 499, width: 178, height: 101 },
      { x: 744, y: 426, width: 56, height: 73 },
      { x: 672, y: 439, width: 73, height: 35 },
      { x: 487, y: 429, width: 68, height: 74 },
      { x: 555, y: 439, width: 189, height: 37 },
      { x: 622, y: 410, width: 51, height: 38 },
      { x: 650, y: 352, width: 75, height: 34 },
      { x: 622, y: 386, width: 51, height: 53 },
      { x: 640, y: 231, width: 68, height: 50 },
      { x: 622, y: 92, width: 178, height: 140 },
      { x: 482, y: 210, width: 85, height: 21 },
      { x: 548, y: 231, width: 19, height: 45 },
      { x: 394, y: 382, width: 148, height: 18 },
      { x: 421, y: 271, width: 43, height: 54 },
      { x: 358, y: 312, width: 28, height: 34 },
      { x: 358, y: 342, width: 12, height: 8 },
      { x: 265, y: 167, width: 40, height: 32 },
      { x: 295, y: 153, width: 31, height: 34 },
      { x: 319, y: 143, width: 44, height: 32 },
      { x: 341, y: 126, width: 122, height: 46 },
      { x: 209, y: 249, width: 67, height: 41 },
      { x: 122, y: 339, width: 110, height: 42 },
      { x: 160, y: 381, width: 72, height: 72 },
      { x: 204, y: 431, width: 78, height: 47 },
      { x: 232, y: 442, width: 52, height: 54 }
    ]
  }
};


// Estado global da sessao
const gameState = {
  language: "pt",
  selectedMap: "poolday",
  menuMusic: null,
  highScores: {
    poolday: 0,
    overpass: 0
  }
};

const translations = {};

// Traducao
function getText(key) {
  const languageTexts = translations[gameState.language] || translations.pt || {};

  return languageTexts[key] || key;
}

function toggleLanguage() {
  gameState.language = gameState.language === "pt" ? "en" : "pt";
}


// Cenas
class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    loadTranslationFiles(this);
    loadMenuAssets(this);
    loadAudioAssets(this);
  }

  create() {
    setupTranslations(this);
    setupMenu(this);
  }
}

class RulesScene extends Phaser.Scene {
  constructor() {
    super("RulesScene");
  }

  create() {
    setupTranslations(this);
    playMenuMusic(this);
    setupRules(this);
  }
}

class MapSelectScene extends Phaser.Scene {
  constructor() {
    super("MapSelectScene");
  }

  create() {
    setupTranslations(this);
    playMenuMusic(this);
    setupMapSelect(this);
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    preloadGameAssets(this);
  }

  create() {
    setupTranslations(this);
    stopMenuMusic(this);
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

// Configuracao Phaser
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


// Audio
function loadAudioAssets(scene) {
  scene.load.audio("backgroundMusic", "assets/audio/backgroundMusic.mp3");
  scene.load.audio("gunshot", "assets/audio/gunshot.mp3");
  scene.load.audio("reload", "assets/audio/reload.mp3");
}

function playMenuMusic(scene) {
  if (gameState.menuMusic && gameState.menuMusic.isPlaying) {
    return;
  }

  gameState.menuMusic = scene.sound.add("backgroundMusic", {
    loop: true,
    volume: 0.35
  });
  gameState.menuMusic.play();
}

function stopMenuMusic() {
  if (!gameState.menuMusic) {
    return;
  }

  gameState.menuMusic.stop();
  gameState.menuMusic.destroy();
  gameState.menuMusic = null;
}

function playGunshot(scene) {
  scene.sound.play("gunshot", {
    volume: 0.45
  });
}

function playReload(scene) {
  scene.reloadSound = scene.sound.add("reload", {
    volume: 0.55
  });
  scene.reloadSound.play();
}

function stopReloadSound(scene) {
  if (!scene.reloadSound) {
    return;
  }

  scene.reloadSound.stop();
  scene.reloadSound.destroy();
  scene.reloadSound = null;
}


// Carregamento das traducoes
function loadTranslationFiles(scene) {
  scene.load.json("lang_pt", "assets/lang/pt.json");
  scene.load.json("lang_en", "assets/lang/en.json");
}

function setupTranslations(scene) {
  translations.pt = scene.cache.json.get("lang_pt") || translations.pt;
  translations.en = scene.cache.json.get("lang_en") || translations.en;
}


// Menu principal, selecao de mapa e regras
function loadMenuAssets(scene) {
  if (!scene.textures.exists("backgroundMenu")) {
    scene.load.image("backgroundMenu", "assets/textures/backgroundMenu.png");
  }
}

function addMenuBackground(scene) {
  scene.add.image(scene.scale.width / 2, scene.scale.height / 2, "backgroundMenu")
    .setDisplaySize(scene.scale.width, scene.scale.height)
    .setDepth(-20);

  scene.add.rectangle(0, 0, scene.scale.width, scene.scale.height, 0x000000, 0.5)
    .setOrigin(0)
    .setDepth(-10);
}

function getMenuTitleStyle(size = "48px") {
  return {
    fontSize: size,
    color: "#ffffff",
    fontStyle: "bold",
    stroke: "#000000",
    strokeThickness: 6
  };
}

function getMenuOptionStyle(size = "28px") {
  return {
    fontSize: size,
    color: "#ffffff",
    stroke: "#000000",
    strokeThickness: 5
  };
}

function getMenuInfoStyle(size = "20px", color = "#f2cc60") {
  return {
    fontSize: size,
    color,
    stroke: "#000000",
    strokeThickness: 4
  };
}

function setupMenu(scene) {
  playMenuMusic(scene);
  addMenuBackground(scene);

  scene.selectedOption = 0;
  scene.menuTexts = [];

  scene.titleText = scene.add.text(scene.scale.width / 2, 120, getText("title"), getMenuTitleStyle("48px"))
    .setOrigin(0.5);

  createMenuOptions(scene);
  setupMenuInput(scene);
  updateMenuSelection(scene);
}

function createMenuOptions(scene) {
  const options = getMenuOptions();

  scene.menuTexts.forEach((text) => text.destroy());
  scene.menuTexts = [];

  options.forEach((option, index) => {
    const menuText = scene.add.text(scene.scale.width / 2, 240 + index * 58, option, getMenuOptionStyle("28px"))
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

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
    `${getText("language")}: ${getText("languageCode")}`
  ];
}

function updateMenuSelection(scene) {
  scene.menuTexts.forEach((text, index) => {
    const isSelected = index === scene.selectedOption;

    text.setText(`${isSelected ? "> " : "  "}${getMenuOptions()[index]}`);
    text.setColor(isSelected ? "#f2cc60" : "#ffffff");
    text.setScale(isSelected ? 1.08 : 1);
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
  addMenuBackground(scene);

  scene.selectedOption = 0;
  scene.mapOptions = ["poolday", "overpass"];
  scene.mapTexts = [];

  scene.add.text(scene.scale.width / 2, 100, getText("selectMap"), getMenuTitleStyle("42px"))
    .setOrigin(0.5);

  scene.mapOptions.forEach((mapKey, index) => {
    const mapText = scene.add.text(scene.scale.width / 2, 220 + index * 58, MAPS[mapKey].name, getMenuOptionStyle("30px"))
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

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

  scene.add.text(scene.scale.width / 2, 520, getText("back"), getMenuInfoStyle("20px", "#f2cc60"))
    .setOrigin(0.5);

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
    text.setScale(isSelected ? 1.08 : 1);
  });
}

function setupRules(scene) {
  addMenuBackground(scene);

  scene.add.text(scene.scale.width / 2, 90, getText("rulesTitle"), getMenuTitleStyle("42px"))
    .setOrigin(0.5);

  getText("rulesText").forEach((line, index) => {
    scene.add.text(120, 190 + index * 45, line, getMenuInfoStyle("22px", "#ffffff"));
  });

  scene.add.text(scene.scale.width / 2, 520, getText("back"), getMenuInfoStyle("20px", "#f2cc60"))
    .setOrigin(0.5);

  scene.input.keyboard.on("keydown-ESC", () => {
    scene.scene.start("MenuScene");
  });
}


// Texturas e assets do jogo
function preloadGameAssets(scene) {
  if (!scene.textures.exists("player")) {
    scene.load.image("player", "assets/textures/player.png");
  }

  if (!scene.textures.exists("enemy")) {
    scene.load.image("enemy", "assets/textures/enemy.png");
  }

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
  graphics.fillTriangle(24, 0, 48, 48, 0, 48);
  graphics.lineStyle(2, 0xffffff, 1);
  graphics.strokeTriangle(24, 0, 48, 48, 0, 48);
  graphics.generateTexture("player", PLAYER_SIZE, PLAYER_SIZE);
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
  graphics.fillCircle(24, 24, 24);
  graphics.lineStyle(2, 0xffffff, 1);
  graphics.strokeCircle(24, 24, 20);
  graphics.generateTexture("enemy", ENEMY_SIZE, ENEMY_SIZE);
  graphics.destroy();
}


// Mapa, obstaculos e navegacao
function setupMap(scene) {
  scene.currentMap = MAPS[gameState.selectedMap] || MAPS.poolday;
  scene.mapObstacles = scene.physics.add.staticGroup();

  if (scene.currentMap.imageKey) {
    scene.add.image(scene.scale.width / 2, scene.scale.height / 2, scene.currentMap.imageKey)
      .setDisplaySize(scene.scale.width, scene.scale.height)
      .setDepth(-10);
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

function getExpandedRect(rect, margin) {
  return new Phaser.Geom.Rectangle(
    rect.x - margin,
    rect.y - margin,
    rect.width + margin * 2,
    rect.height + margin * 2
  );
}

function isPointNearRect(x, y, rect, margin) {
  const expandedRect = getExpandedRect(rect, margin);

  return expandedRect.contains(x, y);
}

function isPointNearAnyRect(x, y, rects, margin) {
  return rects.some((rect) => isPointNearRect(x, y, rect, margin));
}

function lineIntersectsRect(line, rect) {
  const phaserRect = new Phaser.Geom.Rectangle(rect.x, rect.y, rect.width, rect.height);

  return Phaser.Geom.Intersects.LineToRectangle(line, phaserRect);
}

function lineIntersectsExpandedRect(line, rect, margin) {
  return Phaser.Geom.Intersects.LineToRectangle(line, getExpandedRect(rect, margin));
}

function isPathBlocked(scene, startX, startY, endX, endY, margin = 0) {
  if (!scene.currentMap || !scene.currentMap.obstacles.length) {
    return false;
  }

  const line = new Phaser.Geom.Line(startX, startY, endX, endY);

  return scene.currentMap.obstacles.some((rect) => (
    margin > 0
      ? lineIntersectsExpandedRect(line, rect, margin)
      : lineIntersectsRect(line, rect)
  ));
}

function getNavigationCell(x, y) {
  return {
    col: Math.floor(x / PATH_CELL_SIZE),
    row: Math.floor(y / PATH_CELL_SIZE)
  };
}

function getNavigationCellKey(cell) {
  return `${cell.col},${cell.row}`;
}

function getNavigationCellCenter(cell) {
  return {
    x: cell.col * PATH_CELL_SIZE + PATH_CELL_SIZE / 2,
    y: cell.row * PATH_CELL_SIZE + PATH_CELL_SIZE / 2
  };
}

function isNavigationCellInsideMap(scene, cell) {
  return (
    cell.col >= 0 &&
    cell.row >= 0 &&
    cell.col < Math.ceil(scene.scale.width / PATH_CELL_SIZE) &&
    cell.row < Math.ceil(scene.scale.height / PATH_CELL_SIZE)
  );
}

function isNavigationCellWalkable(scene, cell) {
  if (!isNavigationCellInsideMap(scene, cell)) {
    return false;
  }

  const center = getNavigationCellCenter(cell);

  return !isPointNearAnyRect(center.x, center.y, scene.currentMap.obstacles, CHARACTER_RADIUS + 2);
}

function getNearestWalkableCell(scene, cell, maxRadius) {
  if (isNavigationCellWalkable(scene, cell)) {
    return cell;
  }

  for (let radius = 1; radius <= maxRadius; radius += 1) {
    for (let rowOffset = -radius; rowOffset <= radius; rowOffset += 1) {
      for (let colOffset = -radius; colOffset <= radius; colOffset += 1) {
        const candidate = {
          col: cell.col + colOffset,
          row: cell.row + rowOffset
        };

        if (isNavigationCellWalkable(scene, candidate)) {
          return candidate;
        }
      }
    }
  }

  return null;
}

function getNavigationNeighbors(scene, cell) {
  const offsets = [
    { col: 1, row: 0 },
    { col: -1, row: 0 },
    { col: 0, row: 1 },
    { col: 0, row: -1 }
  ];

  return offsets
    .map((offset) => ({
      col: cell.col + offset.col,
      row: cell.row + offset.row
    }))
    .filter((candidate) => isNavigationCellWalkable(scene, candidate));
}

function getPathDirectionToPlayer(scene, enemy) {
  const startCell = getNearestWalkableCell(scene, getNavigationCell(enemy.x, enemy.y), 4);
  const targetCell = getNearestWalkableCell(scene, getNavigationCell(scene.player.x, scene.player.y), 6);

  if (!startCell || !targetCell) {
    return null;
  }

  const startKey = getNavigationCellKey(startCell);
  const targetKey = getNavigationCellKey(targetCell);

  if (startKey === targetKey) {
    return getDirectionToPlayer(scene, enemy);
  }

  const queue = [startCell];
  const visited = new Set([startKey]);
  const cameFrom = {};
  let foundTarget = false;

  while (queue.length > 0) {
    const current = queue.shift();
    const currentKey = getNavigationCellKey(current);

    if (currentKey === targetKey) {
      foundTarget = true;
      break;
    }

    getNavigationNeighbors(scene, current).forEach((neighbor) => {
      const neighborKey = getNavigationCellKey(neighbor);

      if (visited.has(neighborKey)) {
        return;
      }

      visited.add(neighborKey);
      cameFrom[neighborKey] = currentKey;
      queue.push(neighbor);
    });
  }

  if (!foundTarget) {
    return null;
  }

  let nextKey = targetKey;
  let previousKey = cameFrom[nextKey];

  while (previousKey && previousKey !== startKey) {
    nextKey = previousKey;
    previousKey = cameFrom[nextKey];
  }

  const [nextCol, nextRow] = nextKey.split(",").map(Number);
  const nextCenter = getNavigationCellCenter({ col: nextCol, row: nextRow });
  const direction = new Phaser.Math.Vector2(nextCenter.x - enemy.x, nextCenter.y - enemy.y);

  if (direction.lengthSq() < 1) {
    return getDirectionToPlayer(scene, enemy);
  }

  return direction.normalize();
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

function setCharacterPhysicsBody(sprite) {
  const radius = CHARACTER_RADIUS / sprite.scaleX;
  const offsetX = (sprite.width - radius * 2) / 2;
  const offsetY = (sprite.height - radius * 2) / 2;

  sprite.setCircle(radius, offsetX, offsetY);
}


// Jogador e movimento
function setupPlayer(scene) {
  const spawn = scene.currentMap.playerSpawn;
  scene.player = scene.physics.add.sprite(spawn.x, spawn.y, "player");
  scene.player.setDisplaySize(PLAYER_SIZE, PLAYER_SIZE);
  setCharacterPhysicsBody(scene.player);
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


// Disparos e reload
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
  playGunshot(scene);
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
  playReload(scene);
  updateHud(scene);

  scene.reloadTimer = scene.time.delayedCall(RELOAD_TIME, () => {
    if (scene.isGameOver) {
      return;
    }

    scene.ammo = MAX_AMMO;
    scene.isReloading = false;
    scene.reloadTimer = null;
    stopReloadSound(scene);
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

  enemy.setDisplaySize(ENEMY_SIZE, ENEMY_SIZE);
  setCharacterPhysicsBody(enemy);
  enemy.setCollideWorldBounds(false);
  enemy.setBounce(0);
  enemy.setDrag(0);
  enemy.setMaxVelocity(ENEMY_SPEED);
  enemy.lastX = enemy.x;
  enemy.lastY = enemy.y;
  enemy.stuckFrames = 0;
  enemy.avoidUntil = 0;
  enemy.avoidDirection = null;
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
    updateEnemyStuckState(scene, enemy);

    const direction = getEnemyMoveDirection(scene, enemy);

    enemy.setVelocity(
      direction.x * ENEMY_SPEED * getTerrainSpeedMultiplier(scene, enemy),
      direction.y * ENEMY_SPEED * getTerrainSpeedMultiplier(scene, enemy)
    );
    enemy.setRotation(direction.angle() + Math.PI / 2);
  });
}

function updateEnemyStuckState(scene, enemy) {
  const distanceMoved = Phaser.Math.Distance.Between(enemy.x, enemy.y, enemy.lastX, enemy.lastY);

  if (distanceMoved < ENEMY_STUCK_DISTANCE) {
    enemy.stuckFrames += 1;
  } else {
    enemy.stuckFrames = 0;
  }

  enemy.lastX = enemy.x;
  enemy.lastY = enemy.y;

  if (enemy.stuckFrames >= ENEMY_STUCK_FRAMES) {
    enemy.avoidDirection = getAlternativeEnemyDirection(scene, enemy, getDirectionToPlayer(scene, enemy), true);
    enemy.avoidUntil = scene.time.now + ENEMY_AVOID_TIME;
    enemy.stuckFrames = 0;
  }
}

function getDirectionToPlayer(scene, enemy) {
  const direction = new Phaser.Math.Vector2(
    scene.player.x - enemy.x,
    scene.player.y - enemy.y
  );

  if (direction.lengthSq() < 1) {
    direction.set(Phaser.Math.FloatBetween(-1, 1), Phaser.Math.FloatBetween(-1, 1));
  }

  return direction.normalize();
}

function getEnemyMoveDirection(scene, enemy) {
  if (enemy.avoidDirection && scene.time.now < enemy.avoidUntil) {
    return enemy.avoidDirection;
  }

  const direction = getDirectionToPlayer(scene, enemy);

  if (!isPathBlocked(scene, enemy.x, enemy.y, scene.player.x, scene.player.y, CHARACTER_RADIUS + 2)) {
    enemy.avoidDirection = null;
    enemy.avoidUntil = 0;
    return direction;
  }

  const pathDirection = getPathDirectionToPlayer(scene, enemy);

  if (pathDirection) {
    enemy.avoidDirection = null;
    enemy.avoidUntil = 0;
    return pathDirection;
  }

  enemy.avoidDirection = getAlternativeEnemyDirection(scene, enemy, direction, false);
  enemy.avoidUntil = scene.time.now + ENEMY_AVOID_TIME / 2;

  return enemy.avoidDirection;
}

function getAlternativeEnemyDirection(scene, enemy, direction, preferEscape) {
  const baseAngle = direction.angle();
  const angleOffsets = [
    0,
    Math.PI / 8,
    -Math.PI / 8,
    Math.PI / 4,
    -Math.PI / 4,
    (Math.PI * 3) / 8,
    (-Math.PI * 3) / 8,
    Math.PI / 2,
    -Math.PI / 2,
    (Math.PI * 5) / 8,
    (-Math.PI * 5) / 8,
    (Math.PI * 3) / 4,
    (-Math.PI * 3) / 4,
    (Math.PI * 7) / 8,
    (-Math.PI * 7) / 8,
    Math.PI
  ];
  let bestDirection = direction;
  let bestDistance = Number.MAX_VALUE;
  let foundFreeDirection = false;

  angleOffsets.forEach((offset) => {
    const candidate = new Phaser.Math.Vector2(
      Math.cos(baseAngle + offset),
      Math.sin(baseAngle + offset)
    );
    const nextX = enemy.x + candidate.x * ENEMY_ROUTE_LOOK_AHEAD;
    const nextY = enemy.y + candidate.y * ENEMY_ROUTE_LOOK_AHEAD;

    if (
      isPointNearAnyRect(nextX, nextY, scene.currentMap.obstacles, CHARACTER_RADIUS + 2) ||
      isPathBlocked(scene, enemy.x, enemy.y, nextX, nextY, CHARACTER_RADIUS + 2)
    ) {
      return;
    }

    const distanceToPlayer = Phaser.Math.Distance.Between(nextX, nextY, scene.player.x, scene.player.y);
    const score = preferEscape
      ? distanceToPlayer - Math.abs(offset) * 20
      : distanceToPlayer + Math.abs(offset) * 12;

    if (score < bestDistance) {
      bestDistance = score;
      bestDirection = candidate;
      foundFreeDirection = true;
    }
  });

  if (foundFreeDirection) {
    return bestDirection;
  }

  return new Phaser.Math.Vector2(-direction.y, direction.x).normalize();
}


// Pontuacao, vidas, municao e HUD
function setupGameState(scene) {
  scene.score = 0;
  scene.lives = STARTING_LIVES;
  scene.ammo = MAX_AMMO;
  scene.isReloading = false;
  scene.reloadTimer = null;
  scene.reloadSound = null;
  scene.isGameOver = false;
  scene.currentMapKey = gameState.selectedMap;
}

function setupHud(scene) {
  scene.scoreText = scene.add.text(24, 22, "", getHudTextStyle("18px", "#ffffff"))
    .setDepth(21);

  scene.livesText = scene.add.text(24, scene.scale.height - 68, "", getHudTextStyle("18px", "#ffffff"))
    .setDepth(21);

  scene.ammoText = scene.add.text(24, scene.scale.height - 30, "", getHudTextStyle("18px", "#ffffff"))
    .setDepth(21);

  scene.controlsText = scene.add.text(scene.scale.width - 24, scene.scale.height - 20, getText("controls"), getHudTextStyle("16px", "#f2cc60"))
    .setOrigin(1)
    .setAlign("right")
    .setDepth(21);

  updateHud(scene);
}

function getHudTextStyle(size, color) {
  return {
    fontSize: size,
    color,
    stroke: "#000000",
    strokeThickness: 6
  };
}

function updateHud(scene) {
  const ammoText = scene.isReloading
    ? `${getText("ammo")}: ${scene.ammo}/${MAX_AMMO} (${getText("reloading")})`
    : `${getText("ammo")}: ${scene.ammo}/${MAX_AMMO}`;
  const highScore = getHighScore(scene.currentMapKey);

  scene.scoreText.setText(`${getText("score")}: ${scene.score} | ${getText("highScore")}: ${highScore}`);
  scene.livesText.setText(`${getText("lives")}: ${scene.lives}`);
  scene.ammoText.setText(ammoText);
}

function getHighScore(mapKey) {
  return gameState.highScores[mapKey] || 0;
}

function updateHighScore(scene) {
  if (scene.score > getHighScore(scene.currentMapKey)) {
    gameState.highScores[scene.currentMapKey] = scene.score;
    return true;
  }

  return false;
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

// Game Over
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
  const isNewHighScore = updateHighScore(scene);
  const highScore = getHighScore(scene.currentMapKey);
  const centerX = scene.scale.width / 2;
  const centerY = scene.scale.height / 2;

  [
    scene.scoreText,
    scene.livesText,
    scene.ammoText,
    scene.controlsText
  ].forEach((gameObject) => {
    gameObject.setVisible(false);
  });

  scene.player.setVelocity(0, 0);
  destroyGroupObjects(scene.bullets);
  destroyGroupObjects(scene.enemies);
  scene.enemySpawnTimer.paused = true;

  if (scene.reloadTimer) {
    scene.reloadTimer.remove(false);
    scene.reloadTimer = null;
  }
  stopReloadSound(scene);

  scene.add.rectangle(0, 0, scene.scale.width, scene.scale.height, 0x000000, 0.62)
    .setOrigin(0)
    .setDepth(100);

  scene.add.rectangle(centerX, centerY, 520, 360, 0x111820, 0.94)
    .setStrokeStyle(3, 0xf2cc60, 0.95)
    .setDepth(101);

  scene.add.text(centerX, centerY - 130, getText("gameOver"), {
    fontSize: "56px",
    color: "#ffffff",
    fontStyle: "bold",
    stroke: "#000000",
    strokeThickness: 6
  }).setOrigin(0.5).setDepth(102);

  scene.add.text(centerX, centerY - 58, `${getText("sessionScore")}: ${scene.score}`, {
    fontSize: "26px",
    color: "#ffffff",
    stroke: "#000000",
    strokeThickness: 4
  }).setOrigin(0.5).setDepth(102);

  scene.add.text(centerX, centerY - 18, `${getText("highScore")}: ${highScore}`, {
    fontSize: "24px",
    color: "#c9d1d9",
    stroke: "#000000",
    strokeThickness: 4
  }).setOrigin(0.5).setDepth(102);

  if (isNewHighScore) {
    scene.add.text(centerX, centerY + 24, getText("newHighScore"), {
      fontSize: "28px",
      color: "#f2cc60",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 5
    }).setOrigin(0.5).setDepth(102);
  }

  scene.add.text(centerX, centerY + 92, getText("restart"), {
    fontSize: "22px",
    color: "#ffffff",
    stroke: "#000000",
    strokeThickness: 4
  }).setOrigin(0.5).setDepth(102);

  scene.add.text(centerX, centerY + 128, getText("gameOverMenu"), {
    fontSize: "22px",
    color: "#f2cc60",
    stroke: "#000000",
    strokeThickness: 4
  }).setOrigin(0.5).setDepth(102);
}

function destroyGroupObjects(group) {
  group.getChildren().forEach((gameObject) => {
    gameObject.destroy();
  });
}
