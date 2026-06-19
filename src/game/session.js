import {
  MAX_AMMO,
  STARTING_LIVES
} from "../config/constants.js";
import { gameState } from "../core/gameState.js";

export function setupGameState(scene) {
  scene.score = 0;
  scene.lives = STARTING_LIVES;
  scene.ammo = MAX_AMMO;
  scene.isReloading = false;
  scene.reloadTimer = null;
  scene.reloadSound = null;
  scene.isGameOver = false;
  scene.currentMapKey = gameState.selectedMap;
}

export function getHighScore(mapKey) {
  return gameState.highScores[mapKey] || 0;
}

export function updateHighScore(scene) {
  if (scene.score > getHighScore(scene.currentMapKey)) {
    gameState.highScores[scene.currentMapKey] = scene.score;
    return true;
  }

  return false;
}
