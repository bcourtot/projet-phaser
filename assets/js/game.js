import TitleScene from '/assets/js/game/scenes/titleScene.js';
import GameScene from '/assets/js/game/scenes/gameScene.js';
import GameOverScene from '/assets/js/game/scenes/gameOverScene.js';



const gameContainer = document.querySelector(".game-container-canvas");

var config = {
  type: Phaser.AUTO,
  parent: gameContainer,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
};
var game = new Phaser.Game(config);

console.log('Chargement canvas jeu ok')

game.scene.add('titleScene', TitleScene);
game.scene.add('gameScene', GameScene);
game.scene.add('gameOverScene', GameOverScene);

game.scene.start('titleScene');