import { loadAudioAssets, playMenuMusic } from "../core/audio.js";
import {
  getText,
  loadTranslationFiles,
  setupTranslations,
  toggleLanguage
} from "../core/i18n.js";
import { loadMenuAssets, addMenuBackground } from "../ui/menuBackground.js";
import {
  getMenuOptionStyle,
  getMenuTitleStyle
} from "../ui/styles.js";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    loadTranslationFiles(this);
    loadMenuAssets(this);
    loadAudioAssets(this);
  }

  create() {
    setupTranslations(this);
    setupMenu(this);
  }
}

function setupMenu(scene) {
  playMenuMusic(scene);
  addMenuBackground(scene);

  scene.selectedOption = 0;
  scene.menuTexts = [];

  scene.titleText = scene.add.text(scene.scale.width / 2, 120, getText("title"), getMenuTitleStyle("48px"))
    .setOrigin(0.5);

  createMenuOptions(scene);
  setupMenuInput(scene);
  updateMenuSelection(scene);
}

function createMenuOptions(scene) {
  const options = getMenuOptions();

  scene.menuTexts.forEach((text) => text.destroy());
  scene.menuTexts = [];

  options.forEach((option, index) => {
    const menuText = scene.add.text(scene.scale.width / 2, 240 + index * 58, option, getMenuOptionStyle("28px"))
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    menuText.on("pointerover", () => {
      scene.selectedOption = index;
      updateMenuSelection(scene);
    });

    menuText.on("pointerdown", () => {
      scene.selectedOption = index;
      selectMenuOption(scene);
    });

    scene.menuTexts.push(menuText);
  });
}

function setupMenuInput(scene) {
  scene.input.keyboard.on("keydown-UP", () => {
    scene.selectedOption = Phaser.Math.Wrap(scene.selectedOption - 1, 0, scene.menuTexts.length);
    updateMenuSelection(scene);
  });

  scene.input.keyboard.on("keydown-DOWN", () => {
    scene.selectedOption = Phaser.Math.Wrap(scene.selectedOption + 1, 0, scene.menuTexts.length);
    updateMenuSelection(scene);
  });

  scene.input.keyboard.on("keydown-ENTER", () => {
    selectMenuOption(scene);
  });
}

function getMenuOptions() {
  return [
    getText("play"),
    getText("rules"),
    `${getText("language")}: ${getText("languageCode")}`
  ];
}

function updateMenuSelection(scene) {
  scene.menuTexts.forEach((text, index) => {
    const isSelected = index === scene.selectedOption;

    text.setText(`${isSelected ? "> " : "  "}${getMenuOptions()[index]}`);
    text.setColor(isSelected ? "#f2cc60" : "#ffffff");
    text.setScale(isSelected ? 1.08 : 1);
  });
}

function selectMenuOption(scene) {
  if (scene.selectedOption === 0) {
    scene.scene.start("MapSelectScene");
    return;
  }

  if (scene.selectedOption === 1) {
    scene.scene.start("RulesScene");
    return;
  }

  toggleLanguage();
  updateMenuSelection(scene);
}
