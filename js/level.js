class Level {
	constructor(enemies, coins, pointLights, finish, checkpoints, nextLevel = null) {
		this.canComplete = false;
		this.levelCompleted = false;
		this.enemies = enemies;
		this.originalEnemies = [...enemies];
		this.coins = coins;
		this.collectedCoins = new Array(coins.length).fill(false);
		this.numCoinsRemaining = coins.length;
		this.pointLights = pointLights;
		this.nextLevel = nextLevel;
		this.checkpoints = checkpoints;
		this.finish = finish;
	}

	render(gl, viewMatrix, projectionMatrix) {
		coinCounter.innerHTML = this.numCoinsRemaining;
		this.enemies.forEach((enemy, index) => {
			enemy.render(gl, this.pointLights, viewMatrix, projectionMatrix, null);
		});
		this.coins.forEach((coin, index) => {
			// Only render Coins that have not been collected
			if (!this.collectedCoins[index]) coin.render(gl, this.pointLights, viewMatrix, projectionMatrix, null);
		});
		this.finish.forEach((finish, index) => {
			finish.render(gl, this.pointLights, viewMatrix, projectionMatrix, null);
		});
	}

	collectCoin(index) {
		if (this.collectedCoins[index]) return;
		this.collectedCoins[index] = true;
		this.numCoinsRemaining--;
		if (this.collectedCoins.every(Boolean)) this.canComplete = true;
	}

	checkCollisions(player) {
		this.coins.forEach((coin, index) => {
			if (player.collide(coin)) {
				this.collectCoin(index);
			}
		});
		this.enemies.forEach((enemy) => {
			if (player.collide(enemy)) {
				player.die();
				this.reset(player);
			}
		});
		this.finish.forEach((finish) => {
			if (this.canComplete && player.collide(finish)) {
				this.reset(player);
				// change below to implement more levels
				if (curLevel < levels.length - 1) curLevel++;
			}
		});
	}

	reset(player) {
		this.collectedCoins.fill(false);
		this.numCoinsRemaining = this.coins.length;
		this.enemies = [...this.originalEnemies];
		player.setPosition([0, 0.01, 0]);
	}

	start(player) {
		player.setPosition([0, 0.01, 0]);
	}

	getLights() {
		return this.pointLights;
	}
}

// LEVEL 1
function getCoins() {
	let tempCoins = [];
	// individual level coins
	tempCoins.push(new Coin(-7, 0, -3, '#FFFF00', 1));
	tempCoins.push(new Coin(-7, 0, -7, '#FFFF00', 1));
	tempCoins.push(new Coin(-7, 0, -11, '#FFFF00', 1));
	return tempCoins;
}

function getEnemies() {
	let tempEnemies = [];

	// BORDER Walls
	for (let i = -2; i < 16; i++) {
		tempEnemies.push(new Wall(2, 0, -i, '#010114', 1));
		tempEnemies.push(new Wall(-16, 0, -i, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, 2, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, -16, '#010114', 1));
	}
	tempEnemies.push(new Wall(-16, 0, -16, '#010114', 1));

	// individual level walls
	for (let i = -2; i < 12; i++) tempEnemies.push(new Wall(-2, 0, -i, '#010114', 1));
	for (let i = 3; i < 16; i++) tempEnemies.push(new Wall(-12, 0, -i, '#010114', 1));

	// individual enemies
	// animate these 2
	tempEnemies.push(
		new MovingEnemy(
			[
				[-11, 0, -9],
				[-3, 0, -9],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-11, 0, -5],
				[-3, 0, -5],
			],
			'#0000FF',
			1
		)
	);

	tempEnemies.push(new Enemy(-0.5, 0, -8, '#0000FF', 1));
	tempEnemies.push(new Enemy(-0.5, 0, -2, '#0000FF', 1));
	tempEnemies.push(new Enemy(0.5, 0, -5, '#0000FF', 1));
	tempEnemies.push(new Enemy(0.5, 0, -11, '#0000FF', 1));

	tempEnemies.push(new Enemy(-14.5, 0, -3, '#0000FF', 1));
	tempEnemies.push(new Enemy(-14.5, 0, -9, '#0000FF', 1));
	tempEnemies.push(new Enemy(-13.5, 0, -12, '#0000FF', 1));
	tempEnemies.push(new Enemy(-13.5, 0, -6, '#0000FF', 1));

	// Checkerboard pt 1
	for (let i = -2; i < 17; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -16, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 0, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -15, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#00FFFF', 1));
	}

	// Checkerboard pt 2
	for (let i = -1; i < 16; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -15, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -16, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -0, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#00FFFF', 1));
	}
	return tempEnemies;
}

// LEVEL 2
function getCoins2() {
	let tempCoins = [];
	// individual level coins
	tempCoins.push(new Coin(0, 0, -12, '#FFFF00', 1));

	return tempCoins;
}

function getEnemies2() {
	let tempEnemies = [];

	// BORDER Walls
	for (let i = -2; i < 16; i++) {
		tempEnemies.push(new Wall(2, 0, -i, '#010114', 1));
		tempEnemies.push(new Wall(-16, 0, -i, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, 2, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, -16, '#010114', 1));
	}
	tempEnemies.push(new Wall(-16, 0, -16, '#010114', 1));

	// individual level walls
	for (let i = -2; i < 14; i++) tempEnemies.push(new Wall(-i, 0, i - 14, '#010114', 1));

	// individual enemies
	// animate these

	tempEnemies.push(
		new MovingEnemy(
			[
				[1, 0, -2],
				[-11, 0, -2],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[1, 0, -8],
				[-5, 0, -8],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-6, 0, -15],
				[-6, 0, -10],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-12, 0, -15],
				[-12, 0, -3],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-8, 0, -5],
				[1, 0, -5],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-9, 0, -6],
				[-9, 0, -15],
			],
			'#0000FF',
			1
		)
	);

	// Checkerboard pt 1
	for (let i = -2; i < 17; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -16, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 0, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -15, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#00FFFF', 1));
	}

	// Checkerboard pt 2
	for (let i = -1; i < 16; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -15, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -16, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -0, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#00FFFF', 1));
	}
	return tempEnemies;
}
// LEVEL 3
function getCoins3() {
	let tempCoins = [];
	// individual level coins
	tempCoins.push(new Coin(0, 0, -10, '#FFFF00', 1));
	tempCoins.push(new Coin(0, 0, -4, '#FFFF00', 1));

	return tempCoins;
}

function getEnemies3() {
	let tempEnemies = [];

	// BORDER Walls
	for (let i = -2; i < 16; i++) {
		tempEnemies.push(new Wall(2, 0, -i, '#010114', 1));
		tempEnemies.push(new Wall(-16, 0, -i, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, 2, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, -16, '#010114', 1));
	}
	tempEnemies.push(new Wall(-16, 0, -16, '#010114', 1));

	// individual level walls
	for (let i = -2; i < 14; i++) {
		tempEnemies.push(new Wall(-i, 0, -2, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, -12, '#010114', 1));
	}
	for (let i = -16; i < -1; i++) {
		tempEnemies.push(new Wall(i, 0, -6, '#010114', 1));
		tempEnemies.push(new Wall(i, 0, -8, '#010114', 1));
	}
	for (let i = -16; i < -3; i++) {
		tempEnemies.push(new Wall(i, 0, -7, '#010114', 1));
	}
	// individual enemies
	// animate these
	tempEnemies.push(
		new MovingEnemy(
			[
				[1, 0, -7],
				[-3, 0, -7],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-3, 0, -1],
				[-13, 0, -1],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-13, 0, 1],
				[-3, 0, 1],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-3, 0, -3],
				[-13, 0, -3],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-13, 0, -5],
				[-3, 0, -5],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-13, 0, -9],
				[-3, 0, -9],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-3, 0, -11],
				[-13, 0, -11],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-3, 0, -13],
				[-13, 0, -13],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-13, 0, -15],
				[-3, 0, -15],
			],
			'#0000FF',
			1
		)
	);

	// Checkerboard pt 1
	for (let i = -2; i < 17; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -16, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 0, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -15, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#00FFFF', 1));
	}

	// Checkerboard pt 2
	for (let i = -1; i < 16; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -15, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -16, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -0, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#00FFFF', 1));
	}
	return tempEnemies;
}
// LVL 4
function getCoins4() {
	let tempCoins = [];
	// individual level coins
	tempCoins.push(new Coin(0, 0, -7, '#FFFF00', 1));

	return tempCoins;
}
function getEnemies4() {
	let tempEnemies = [];

	// BORDER Walls
	for (let i = -2; i < 16; i++) {
		tempEnemies.push(new Wall(2, 0, -i, '#010114', 1));
		tempEnemies.push(new Wall(-2, 0, -i, '#010114', 1));
	}
	for (let i = -2; i < 3; i++) {
		tempEnemies.push(new Wall(-i, 0, 2, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, -16, '#010114', 1));
	}

	// individual level walls

	// individual enemies
	// animate these
	tempEnemies.push(
		new MovingEnemy(
			[
				[1, 0, -13],
				[1, 0, -4],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-1, 0, -7],
				[-1, 0, -13],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-1, 0, -1],
				[-1, 0, -7],
			],
			'#0000FF',
			1
		)
	);
	
	// Checkerboard pt 1
	for (let i = -2; i < 4; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -16, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 0, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -15, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#00FFFF', 1));
	}

	// Checkerboard pt 2
	for (let i = -1; i < 2; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -15, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -16, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -0, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#00FFFF', 1));
	}
	return tempEnemies;
}
// LVL 5
function getCoins5() {
	let tempCoins = [];
	// individual level coins
	tempCoins.push(new Coin(10, 0, -1, '#FFFF00', 1));

	return tempCoins;
}
function getEnemies5() {
	let tempEnemies = [];

	// BORDER Walls
	for (let i = -2; i < 16; i++) {
		tempEnemies.push(new Wall(-2, 0, -i, '#010114', 1));
	}
	for (let i = -2; i < 3; i++) {
		tempEnemies.push(new Wall(-i, 0, -16, '#010114', 1));
	}
	for (let i = 2; i < 11; i++) {
		tempEnemies.push(new Wall(i, 0, -4, '#010114', 1));
	}
	for(let i = 5; i < 16; i++) {
		tempEnemies.push(new Wall(2, 0, -i, '#010114', 1));
	}
	for(let i = -2; i < 11; i++) {
		tempEnemies.push(new Wall(i, 0, 2, '#010114', 1));
	}
	for(let i = -2; i < 5; i++) {
		tempEnemies.push(new Wall(11, 0, -i, '#010114', 1));
	}
	// individual level walls

	// individual enemies
	// animate these
	tempEnemies.push(
		new MovingEnemy(
			[
				[1, 0, -13],
				[-1, 0, -4],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[8, 0, -3],
				[8, 0, 1],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[7, 0, -3],
				[7, 0, 1],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[6, 0, 1],
				[6, 0, -3],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[5, 0, 1],
				[5, 0, -3],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[4, 0, -3],
				[4, 0, 1],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[3, 0, -3],
				[3, 0, 1],
			],
			'#0000FF',
			1
		)
	);
	// Checkerboard pt 1
	for (let i = -2; i < 4; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -16, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 0, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -15, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#00FFFF', 1));
	}

	// Checkerboard pt 2
	for (let i = -1; i < 2; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -15, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -16, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -0, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#00FFFF', 1));
	}
	for (let i = 3; i < 13; i += 2) {
		tempEnemies.push(new Wall(i, -1, -3, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, -1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, 1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, -4, '#00FFFF', 1));
		tempEnemies.push(new Wall(i, -1, -2, '#00FFFF', 1));
		tempEnemies.push(new Wall(i, -1, -0, '#00FFFF', 1));
		tempEnemies.push(new Wall(i, -1, 2, '#00FFFF', 1));
	}
	for (let i = 4; i < 12; i += 2) {
		tempEnemies.push(new Wall(i, -1, -4, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, -2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, 0, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, 2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, -3, '#00FFFF', 1));
		tempEnemies.push(new Wall(i, -1, -1, '#00FFFF', 1));
		tempEnemies.push(new Wall(i, -1, 1, '#00FFFF', 1));
	}
	return tempEnemies;
}
// LVL 6
function getCoins6() {
	let tempCoins = [];
	// individual level coins
	tempCoins.push(new Coin(10, 0, -1, '#FFFF00', 1));
	tempCoins.push(new Coin(0, 0, 14, '#FFFF00', 1));
	tempCoins.push(new Coin(-10, 0, -1, '#FFFF00', 1));
	return tempCoins;
}
function getEnemies6() {
	let tempEnemies = [];

	// BORDER Walls

	for (let i = -2; i < 3; i++) {
		tempEnemies.push(new Wall(-i, 0, -16, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, 16, '#010114', 1));
	}
	for (let i = 2; i < 11; i++) {
		tempEnemies.push(new Wall(i, 0, -4, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, -4, '#010114', 1));
		tempEnemies.push(new Wall(i, 0, 2, '#010114', 1));
		tempEnemies.push(new Wall(-i, 0, 2, '#010114', 1));
	}
	for(let i = 5; i < 16; i++) {
		tempEnemies.push(new Wall(2, 0, -i, '#010114', 1));
		tempEnemies.push(new Wall(-2, 0, -i, '#010114', 1));
	}
	for(let i = 3; i < 16; i++) {
		tempEnemies.push(new Wall(2, 0, i, '#010114', 1));
		tempEnemies.push(new Wall(-2, 0, i, '#010114', 1));
	}
	for(let i = -2; i < 5; i++) {
		tempEnemies.push(new Wall(11, 0, -i, '#010114', 1));
		tempEnemies.push(new Wall(-11, 0, -i, '#010114', 1));
	}
	// individual level walls

	// individual enemies
	// animate these
	tempEnemies.push(
		new MovingEnemy(
			[
				[1, 0, -13],
				[-1, 0, -8],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[1, 0, -8],
				[-1, 0, -4],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[8, 0, 1],
				[8, 0, -3],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[7, 0, 1],
				[7, 0, -3],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[6, 0, 1],
				[6, 0, -3],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[5, 0, 1],
				[5, 0, -3],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[4, 0, 1],
				[4, 0, -3],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[-5, 0, 1],
				[-7, 0, -3],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(
		new MovingEnemy(
			[
				[0, 0, 3],
				[0, 0, 15],
			],
			'#0000FF',
			1
		)
	);
	tempEnemies.push(new Enemy(-4, 0, -2, '#0000FF', 1));
	tempEnemies.push(new Enemy(-8, 0, 0, '#0000FF', 1));
	// Checkerboard pt 1
	for (let i = -2; i < 4; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -16, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 0, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 4, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 6, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 8, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 10, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 12, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 14, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 16, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -15, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 3, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 5, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 7, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 9, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 11, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 13, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 15, '#00FFFF', 1));
	}

	// Checkerboard pt 2
	for (let i = -1; i < 2; i += 2) {
		tempEnemies.push(new Wall(-i, -1, -15, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -13, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -11, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -9, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -7, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -5, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 3, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 5, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 7, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 9, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 11, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 13, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 15, '#FFFFFF', 1));

		// BLUES
		tempEnemies.push(new Wall(-i, -1, -16, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -14, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -12, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -10, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -8, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -6, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -0, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 4, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 6, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 8, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 10, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 12, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 14, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 16, '#00FFFF', 1));
	}
	for (let i = 3; i < 13; i += 2) {
		tempEnemies.push(new Wall(i, -1, -3, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, -1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, 1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, -4, '#00FFFF', 1));
		tempEnemies.push(new Wall(i, -1, -2, '#00FFFF', 1));
		tempEnemies.push(new Wall(i, -1, -0, '#00FFFF', 1));
		tempEnemies.push(new Wall(i, -1, 2, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -0, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#00FFFF', 1));
	}
	for (let i = 4; i < 12; i += 2) {
		tempEnemies.push(new Wall(i, -1, -4, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, -2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, 0, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, 2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(i, -1, -3, '#00FFFF', 1));
		tempEnemies.push(new Wall(i, -1, -1, '#00FFFF', 1));
		tempEnemies.push(new Wall(i, -1, 1, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -4, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 0, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 2, '#FFFFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -3, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, -1, '#00FFFF', 1));
		tempEnemies.push(new Wall(-i, -1, 1, '#00FFFF', 1));
	}
	return tempEnemies;
}