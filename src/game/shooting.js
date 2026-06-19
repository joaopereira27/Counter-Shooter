import {
  BULLET_SPEED,
  FIRE_RATE,
  MAX_AMMO,
  RELOAD_TIME
} from "../config/constants.js";
import { playGunshot, playReload, stopReloadSound } from "../core/audio.js";
import { updateHud } from "./hud.js";

export function setupShooting(scene) {
  scene.bullets = scene.physics.add.group();
  scene.nextShotTime = 0;
  scene.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  scene.input.on("pointerdown", (pointer) => {
    shootBullet(scene, pointer.worldX, pointer.worldY);
  });
}

export function handleShooting(scene) {
  if (scene.isGameOver || !scene.spaceKey.isDown) {
    return;
  }

  const angle = scene.player.rotation - Math.PI / 2;
  const targetX = scene.player.x + Math.cos(angle) * 100;
  const targetY = scene.player.y + Math.sin(angle) * 100;

  shootBullet(scene, targetX, targetY);
}

function shootBullet(scene, targetX, targetY) {
  if (scene.isGameOver || scene.time.now < scene.nextShotTime || scene.isReloading || scene.ammo <= 0) {
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

export function removeOffscreenBullets(scene) {
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
