import { MAX_AMMO } from "../config/constants.js";
import { getText } from "../core/i18n.js";
import { getHudTextStyle } from "../ui/styles.js";
import { getHighScore } from "./session.js";

export function setupHud(scene) {
  scene.scoreText = scene.add.text(24, 22, "", getHudTextStyle("18px", "#ffffff"))
    .setDepth(21);

  scene.livesText = scene.add.text(24, scene.scale.height - 68, "", getHudTextStyle("18px", "#ffffff"))
    .setDepth(21);

  scene.ammoText = scene.add.text(24, scene.scale.height - 30, "", getHudTextStyle("18px", "#ffffff"))
    .setDepth(21);

  scene.controlsText = scene.add.text(
    scene.scale.width - 24,
    scene.scale.height - 20,
    getText("controls"),
    getHudTextStyle("16px", "#f2cc60")
  )
    .setOrigin(1)
    .setAlign("right")
    .setDepth(21);

  updateHud(scene);
}

export function updateHud(scene) {
  const ammoText = scene.isReloading
    ? `${getText("ammo")}: ${scene.ammo}/${MAX_AMMO} (${getText("reloading")})`
    : `${getText("ammo")}: ${scene.ammo}/${MAX_AMMO}`;
  const highScore = getHighScore(scene.currentMapKey);

  scene.scoreText.setText(`${getText("score")}: ${scene.score} | ${getText("highScore")}: ${highScore}`);
  scene.livesText.setText(`${getText("lives")}: ${scene.lives}`);
  scene.ammoText.setText(ammoText);
}
