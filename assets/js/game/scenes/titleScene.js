class TitleScene extends Phaser.Scene {

	constructor() {
		super({
			key: 'titleScene'
		});
		console.log('Chargement Scene Titre terminé')
	}

	

	startGame() {
		this.scene.start('gameScene');
		console.log('Switch Scene Jeu');
	}

	preload() {
		this.load.image('background', '/assets/img/game/bg_title.jpg');
		this.load.image('logo', '/assets/img/logo.png');
	}


	create() {
		var bg = this.add.image(0, 0, 'background');
		bg.setOrigin(0, 0).setScale(1);

		var logo = this.add.image(400, 200, 'logo');
		logo.setScale(0.35);

		var text = this.add.text(340, 350, 'Jouer !', {
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



export default TitleScene;