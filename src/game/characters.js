import {
  CHARACTER_RADIUS,
  ENEMY_SIZE,
  PLAYER_SIZE
} from "../config/constants.js";

export function setCharacterPhysicsBody(sprite) {
  const radius = CHARACTER_RADIUS / sprite.scaleX;
  const offsetX = (sprite.width - radius * 2) / 2;
  const offsetY = (sprite.height - radius * 2) / 2;

  sprite.setCircle(radius, offsetX, offsetY);
}

export function applyPlayerDisplaySize(player) {
  player.setDisplaySize(PLAYER_SIZE, PLAYER_SIZE);
  setCharacterPhysicsBody(player);
}

export function applyEnemyDisplaySize(enemy) {
  enemy.setDisplaySize(ENEMY_SIZE, ENEMY_SIZE);
  setCharacterPhysicsBody(enemy);
}
