export function loadMenuAssets(scene) {
  if (!scene.textures.exists("backgroundMenu")) {
    scene.load.image("backgroundMenu", "assets/textures/backgroundMenu.png");
  }
}

export function addMenuBackground(scene) {
  scene.add.image(scene.scale.width / 2, scene.scale.height / 2, "backgroundMenu")
    .setDisplaySize(scene.scale.width, scene.scale.height)
    .setDepth(-20);

  scene.add.rectangle(0, 0, scene.scale.width, scene.scale.height, 0x000000, 0.5)
    .setOrigin(0)
    .setDepth(-10);
}
