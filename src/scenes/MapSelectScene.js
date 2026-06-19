import { MAPS } from "../config/maps.js";
import { playMenuMusic } from "../core/audio.js";
import { gameState } from "../core/gameState.js";
import { getText, setupTranslations } from "../core/i18n.js";
import { addMenuBackground } from "../ui/menuBackground.js";
import {
  getMenuInfoStyle,
  getMenuOptionStyle,
  getMenuTitleStyle
} from "../ui/styles.js";

export class MapSelectScene extends Phaser.Scene {
  constructor() {
    super("MapSelectScene");
  }

  create() {
    setupTranslations(this);
    playMenuMusic(this);
    setupMapSelect(this);
  }
}

function setupMapSelect(scene) {
  addMenuBackground(scene);

  scene.selectedOption = 0;
  scene.mapOptions = ["poolday", "overpass"];
  scene.mapTexts = [];

  scene.add.text(scene.scale.width / 2, 100, getText("selectMap"), getMenuTitleStyle("42px"))
    .setOrigin(0.5);

  scene.mapOptions.forEach((mapKey, index) => {
    const mapText = scene.add.text(scene.scale.width / 2, 220 + index * 58, MAPS[mapKey].name, getMenuOptionStyle("30px"))
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    mapText.on("pointerover", () => {
      scene.selectedOption = index;
      updateMapSelection(scene);
    });

    mapText.on("pointerdown", () => {
      gameState.selectedMap = scene.mapOptions[index];
      scene.scene.start("GameScene");
    });

    scene.mapTexts.push(mapText);
  });

  scene.add.text(scene.scale.width / 2, 520, getText("back"), getMenuInfoStyle("20px", "#f2cc60"))
    .setOrigin(0.5);

  setupMapSelectInput(scene);
  updateMapSelection(scene);
}

function setupMapSelectInput(scene) {
  scene.input.keyboard.on("keydown-UP", () => {
    scene.selectedOption = Phaser.Math.Wrap(scene.selectedOption - 1, 0, scene.mapTexts.length);
    updateMapSelection(scene);
  });

  scene.input.keyboard.on("keydown-DOWN", () => {
    scene.selectedOption = Phaser.Math.Wrap(scene.selectedOption + 1, 0, scene.mapTexts.length);
    updateMapSelection(scene);
  });

  scene.input.keyboard.on("keydown-ENTER", () => {
    gameState.selectedMap = scene.mapOptions[scene.selectedOption];
    scene.scene.start("GameScene");
  });

  scene.input.keyboard.on("keydown-ESC", () => {
    scene.scene.start("MenuScene");
  });
}

function updateMapSelection(scene) {
  scene.mapTexts.forEach((text, index) => {
    const isSelected = index === scene.selectedOption;

    text.setText(`${isSelected ? "> " : "  "}${MAPS[scene.mapOptions[index]].name}`);
    text.setColor(isSelected ? "#f2cc60" : "#ffffff");
    text.setScale(isSelected ? 1.08 : 1);
  });
}
