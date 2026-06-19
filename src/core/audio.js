import { gameState } from "./gameState.js";

export function loadAudioAssets(scene) {
  scene.load.audio("backgroundMusic", "assets/audio/backgroundMusic.mp3");
  scene.load.audio("gunshot", "assets/audio/gunshot.mp3");
  scene.load.audio("reload", "assets/audio/reload.mp3");
}

export function playMenuMusic(scene) {
  if (gameState.menuMusic && gameState.menuMusic.isPlaying) {
    return;
  }

  gameState.menuMusic = scene.sound.add("backgroundMusic", {
    loop: true,
    volume: 0.35
  });
  gameState.menuMusic.play();
}

export function stopMenuMusic() {
  if (!gameState.menuMusic) {
    return;
  }

  gameState.menuMusic.stop();
  gameState.menuMusic.destroy();
  gameState.menuMusic = null;
}

export function playGunshot(scene) {
  scene.sound.play("gunshot", {
    volume: 0.45
  });
}

export function playReload(scene) {
  scene.reloadSound = scene.sound.add("reload", {
    volume: 0.55
  });
  scene.reloadSound.play();
}

export function stopReloadSound(scene) {
  if (!scene.reloadSound) {
    return;
  }

  scene.reloadSound.stop();
  scene.reloadSound.destroy();
  scene.reloadSound = null;
}
