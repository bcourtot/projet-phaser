class GameScene extends Phaser.Scene {

	constructor() {
		super({
			key: 'gameScene'
		});
		console.log('Chargement Scene Jeu terminé')		
	}



	preload() {
		this.load.image('background_game', 'assets/img/game/bg.jpg');
		this.load.image('tuna1', 'assets/img/game/tuna1.png');
		this.load.image('tuna2', 'assets/img/game/tuna2.png');
		this.load.image('sardine', 'assets/img/game/sardine.png');
		this.load.image('swordfish', 'assets/img/game/swordfish.png');
		this.load.image('shark', 'assets/img/game/shark.png');
		this.load.image('fisherman', 'assets/img/game/fisherman.png');
		this.load.image('hook', 'assets/img/game/hook.png');
        this.load.json('rules', 'assets/js/game/rules.json');

	}

	create() {
		this.score = 0;
		this.scoreText = null;
		this.rules = this.cache.json.entries.entries.rules;
		console.log('Rules du fichier json', this.rules)
		console.log('Init score, texte et limit dans create', this.score, this.scoreText, this.rules.scoreLimit)
		
		var bg = this.add.image(400, 300, 'background_game');

		this.cursor = this.input.keyboard.createCursorKeys();
		this.scoreText = this.add.text(16, 16, 'score: 0', {
			fontSize: '32px',
			fill: '#fff'
		});


		// Groupe bateau
		this.boat = this.physics.add.group();

		// Pêcheur
		this.fisherman = this.physics.add.image(600, 130, 'fisherman');
		this.fisherman.setScale(0.25);

		// Hameçon
		this.hook = this.physics.add.image(485, 150, 'hook');
		this.hook.setScale(0.02);
		
		this.boat.add(this.hook);
		this.boat.add(this.fisherman);


		this.shark = this.physics.add.image(-1000, 680, 'shark');
		this.shark.setScale(0.3);
		this.shark.body.setSize(100, 100);
		this.shark.body.setOffset(700, 140);

		this.sardine = this.physics.add.image(-30, 400, 'sardine');
		this.sardine.setScale(-0.2, 0.2);
		this.sardine.body.setSize(100, 100);
		this.sardine.body.setOffset(20, 80);

		this.tuna1 = this.physics.add.image(-300, 500, 'tuna1');
		this.tuna1.setScale(-0.3, 0.3);
		this.tuna1.body.setSize(100, 100);
		this.tuna1.body.setOffset(20, 80);

		this.tuna2 = this.physics.add.image(-700, 550, 'tuna2');
		this.tuna2.setScale(-0.3, 0.3);
		this.tuna2.body.setSize(100, 100);
		this.tuna2.body.setOffset(40, 150);

		this.swordfish = this.physics.add.image(-650, 355, 'swordfish');
		this.swordfish.setScale(-0.3, 0.3);
		this.swordfish.body.setSize(100, 100);
		this.swordfish.body.setOffset(200, 180);

		this.fishs = [this.sardine, this.tuna1, this.tuna2, this.swordfish];
		console.log('Poissons', this.fishs)


		this.physics.add.overlap(this.hook, this.shark, this.endGame, this.collision, this);
		this.physics.add.overlap(this.hook, this.fishs, this.scoreFish, this.collision, this);

		// Condition de contrôle de scoreLimit pour éviter le gameover au lancement du jeu
		if (this.rules.scoreLimit == 0) {
			console.error('Erreur dans rules.json car this.rules.scoreLimit =', this.rules.scoreLimit)
			console.error('Le score limite est passé à 20')
			this.rules.scoreLimit += 20;
		}

	}

	collision(cell, obs) {
		obs.destroy();
	}

	scoreFish() {;
		this.score += 20;
		this.scoreText.setText('score: ' + this.score);
	}


	moveFish(fish, speed) {
		fish.x += speed;
		// console.log('fish pos x', fish.x)
		// console.log('fish pos y', fish.y)
		if (fish.x >= 1000) {
			this.resetFishPos(fish);
		}
	}

	resetFishPos(fish) {
		fish.x = 0;
		fish.y = 200;
		var randomX = Phaser.Math.Between(-1000, -300);
		var randomY = Phaser.Math.Between(250, 500);
		fish.x = randomX;
		fish.y = randomY;
	}

	endGame() {
		this.scene.start('gameOverScene');
		console.log('Switch Scene GameOver');
	}

	update() {

		// Mouvement bateau
		if (this.cursor.left.isDown) {
			this.boat.setVelocity(-600, 0);
			// console.log('clavier gauche')
		} else if (this.cursor.right.isDown) {
			this.boat.setVelocity(600, 0);
			// console.log('clavier droit')
		} else {
			this.boat.setVelocityX(0);
			// console.log('clavier rien')
		}

		// Mouvement hameçon
		if (this.cursor.down.isDown) {
			this.hook.setVelocityY(150);
		} else if (this.cursor.up.isDown) {
			this.hook.setVelocityY(-150);
		} else {

			this.hook.setVelocityY(0);
		}

		// Mouvement requin
		this.moveFish(this.shark, this.rules.sharkSpeed);

		// Mouvement poissons
		this.moveFish(this.tuna1, this.rules.tunaSpeed);
		this.moveFish(this.tuna2, this.rules.tunaSpeed);
		this.moveFish(this.sardine, this.rules.sardineSpeed);
		this.moveFish(this.swordfish, this.rules.swordSpeed);


		// Condition fin de jeu normale
		if (this.score >= this.rules.scoreLimit) {
			console.log('Score: ', this.score, ' >= ', this.rules.scoreLimit, 'fin du jeu')
			this.endGame();
		}


	}


}


export default GameScene;