import {
  CHARACTER_RADIUS,
  ENEMY_AVOID_TIME,
  ENEMY_ROUTE_LOOK_AHEAD,
  ENEMY_SPAWN_RATE,
  ENEMY_SPEED,
  ENEMY_STUCK_DISTANCE,
  ENEMY_STUCK_FRAMES,
  MAX_ENEMIES
} from "../config/constants.js";
import { applyEnemyDisplaySize } from "./characters.js";
import {
  getPathDirectionToPlayer,
  getTerrainSpeedMultiplier,
  isPathBlocked
} from "./map.js";

export function setupEnemies(scene) {
  scene.enemies = scene.physics.add.group();

  scene.enemySpawnTimer = scene.time.addEvent({
    delay: ENEMY_SPAWN_RATE,
    callback: () => spawnEnemy(scene),
    loop: true
  });
}

function spawnEnemy(scene) {
  if (scene.isGameOver || scene.enemies.countActive(true) >= MAX_ENEMIES) {
    return;
  }

  const spawnPoint = getEnemySpawnPoint(scene);
  const enemy = scene.enemies.create(spawnPoint.x, spawnPoint.y, "enemy");

  applyEnemyDisplaySize(enemy);
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

export function moveEnemiesTowardsPlayer(scene) {
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

  const pathDirection = getPathDirectionToPlayer(scene, enemy, getDirectionToPlayer);

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

    if (isPathBlocked(scene, enemy.x, enemy.y, nextX, nextY, CHARACTER_RADIUS + 2)) {
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
