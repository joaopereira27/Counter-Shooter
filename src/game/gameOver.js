import { stopReloadSound } from "../core/audio.js";
import { getText } from "../core/i18n.js";
import { getHighScore, updateHighScore } from "./session.js";

export function setupGameOverInput(scene) {
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

export function showGameOver(scene) {
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
