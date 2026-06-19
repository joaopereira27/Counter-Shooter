import { MAPS } from "../config/maps.js";

export function preloadGameAssets(scene) {
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

export function createGeneratedTextures(scene) {
  createBulletTexture(scene);
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
