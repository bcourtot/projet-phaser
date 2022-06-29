class GameOverScene extends Phaser.Scene {

	constructor() {
		super({
			key: 'gameOverScene'
		});
		console.log('Chargement Scene Game Over terminé')
	}



	startGame() {
		this.scene.start('gameScene');
		console.log('Switch Scene Jeu');
	}

	preload() {
		this.load.image('gameover', 'assets/img/game/gameover.jpg');
		this.load.audio('gameover_sound', 'assets/sound/game/gameover.wav');
		this.load.json("rules", "assets/js/game/rules.json");
	}


	create() {
		var gameOver = this.add.image(400, 300, 'gameover');

		var gameOverSound = this.sound.add('gameover_sound');

		gameOverSound.play();

		var text = this.add.text(300, 350, 'Rejouer !', {
			fontSize: '35px',
			fontWeight: '800',
			fill: '#000'
		});
		text.setInteractive({
			useHandCursor: true
		});
		text.on('pointerdown', this.startGame, this);

	}



}



export default GameOverScene;