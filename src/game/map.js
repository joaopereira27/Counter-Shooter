import { MAPS } from "../config/maps.js";
import { gameState } from "../core/gameState.js";
import {
  CHARACTER_RADIUS,
  PATH_CELL_SIZE,
  POOL_SPEED_MULTIPLIER,
  SLOW_ZONE_MULTIPLIER
} from "../config/constants.js";

export function setupMap(scene) {
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

export function getTerrainSpeedMultiplier(scene, gameObject) {
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
  return getExpandedRect(rect, margin).contains(x, y);
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

export function isPathBlocked(scene, startX, startY, endX, endY, margin = 0) {
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

export function getPathDirectionToPlayer(scene, enemy, getDirectionToPlayer) {
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
