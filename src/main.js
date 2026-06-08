const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222222",
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  console.log("A carregar assets...");
}

function create() {
  this.add.text(250, 280, "Phaser está a funcionar!", {
    fontSize: "24px",
    color: "#ffffff"
  });
}

function update() {
}