import { stopMenuMusic } from "../core/audio.js";
import { setupTranslations } from "../core/i18n.js";
import {
  createGeneratedTextures,
  preloadGameAssets
} from "../game/assets.js";
import { setupCollisions } from "../game/collisions.js";
import {
  moveEnemiesTowardsPlayer,
  setupEnemies
} from "../game/enemies.js";
import { setupGameOverInput } from "../game/gameOver.js";
import { setupHud } from "../game/hud.js";
import { setupMap } from "../game/map.js";
import {
  handlePlayerMovement,
  setupPlayer
} from "../game/player.js";
import {
  handleShooting,
  removeOffscreenBullets,
  setupShooting
} from "../game/shooting.js";
import { setupGameState } from "../game/session.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {
    preloadGameAssets(this);
  }

  create() {
    setupTranslations(this);
    stopMenuMusic(this);
    createGeneratedTextures(this);
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
