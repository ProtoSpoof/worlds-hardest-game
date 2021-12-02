class Level {
	constructor(enemies, coins, lights, finish, checkpoints, nextLevel = null) {
		this.canComplete = false;
		this.levelCompleted = false;
		this.enemies = enemies;
		this.coins = coins;
		this.collectedCoins = new Array(coins.length).fill(false);
		this.numCoins = coins.length;
		this.lights = [new Light(0, 0, 0, 0, '#FFFFFF'), ...lights];
		this.nextLevel = nextLevel;
		this.checkpoints = checkpoints;
		this.finish = finish;
	}

	render(gl, viewMatrix, projectionMatrix) {
		this.enemies.forEach((enemy, index) => {
			enemy.render(gl, this.lights, viewMatrix, projectionMatrix);
		});
		this.coins.forEach((coin, index) => {
			// Only render Coins that have not been collected
			if (!this.collectedCoins[index]) coin.render(gl, this.lights, viewMatrix, projectionMatrix);
		});
	}

	collectCoin(index) {
		this.collectedCoins[index] = true;
		if (this.collectedCoins.every(true)) this.canComplete = true;
	}

	checkCollisions(player) {
		this.coins.forEach((coin, index) => {
			if (player.collide(coin)) this.collectedCoins[index] = true;
		});
		this.enemies.forEach((enemy) => {
			if (player.collide(enemy)) {
				player.die();
				this.reset(player);
			}
		});
	}

	reset(player) {
		this.collectedCoins.fill(false);
		player.setPosition([0, 0, 0]);
	}

	start(player) {
		player.setPosition([0, 0, 0]);
	}

	getLights() {
		return this.lights;
	}
}
