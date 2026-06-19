import { ENEMY_SCORE } from "../config/constants.js";
import { updateHud } from "./hud.js";
import { showGameOver } from "./gameOver.js";

export function setupCollisions(scene) {
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
