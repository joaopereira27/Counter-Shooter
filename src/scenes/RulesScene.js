import { playMenuMusic } from "../core/audio.js";
import { getText, setupTranslations } from "../core/i18n.js";
import { addMenuBackground } from "../ui/menuBackground.js";
import {
  getMenuInfoStyle,
  getMenuTitleStyle
} from "../ui/styles.js";

export class RulesScene extends Phaser.Scene {
  constructor() {
    super("RulesScene");
  }

  create() {
    setupTranslations(this);
    playMenuMusic(this);
    setupRules(this);
  }
}

function setupRules(scene) {
  addMenuBackground(scene);

  scene.add.text(scene.scale.width / 2, 90, getText("rulesTitle"), getMenuTitleStyle("42px"))
    .setOrigin(0.5);

  getText("rulesText").forEach((line, index) => {
    scene.add.text(120, 190 + index * 45, line, getMenuInfoStyle("22px", "#ffffff"));
  });

  scene.add.text(scene.scale.width / 2, 520, getText("back"), getMenuInfoStyle("20px", "#f2cc60"))
    .setOrigin(0.5);

  scene.input.keyboard.on("keydown-ESC", () => {
    scene.scene.start("MenuScene");
  });
}
