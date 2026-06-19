import { GameScene } from "./scenes/GameScene.js";
import { MapSelectScene } from "./scenes/MapSelectScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { RulesScene } from "./scenes/RulesScene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222222",
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  scene: [MenuScene, RulesScene, MapSelectScene, GameScene]
};

new Phaser.Game(config);
