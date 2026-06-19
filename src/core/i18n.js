import { gameState } from "./gameState.js";

const translations = {};

export function loadTranslationFiles(scene) {
  scene.load.json("lang_pt", "assets/lang/pt.json");
  scene.load.json("lang_en", "assets/lang/en.json");
}

export function setupTranslations(scene) {
  translations.pt = scene.cache.json.get("lang_pt") || translations.pt;
  translations.en = scene.cache.json.get("lang_en") || translations.en;
}

export function getText(key) {
  const languageTexts = translations[gameState.language] || translations.pt || {};

  return languageTexts[key] || key;
}

export function toggleLanguage() {
  gameState.language = gameState.language === "pt" ? "en" : "pt";
}
