let curLevel = 0;
// LVL 1 finish
let finishes = [];
finishes.push(new Wall(-13, -0.5, -15, '#7FFF00', 1));
finishes.push(new Wall(-14, -0.5, -15, '#7FFF00', 1));
finishes.push(new Wall(-15, -0.5, -15, '#7FFF00', 1));
// LVL 2 finish
let finishes2 = [];
finishes2.push(new Wall(0, -0.5, -15, '#7FFF00', 1));
finishes2.push(new Wall(-1, -0.5, -15, '#7FFF00', 1));
finishes2.push(new Wall(-1, -0.5, -14, '#7FFF00', 1));
// LVL 3 finish
let finishes3 = [];
finishes3.push(new Wall(1, -0.5, -15, '#7FFF00', 1));
finishes3.push(new Wall(1, -0.5, -13, '#7FFF00', 1));
finishes3.push(new Wall(1, -0.5, -14, '#7FFF00', 1));
// LVL 4 finish
let finishes4 = [];
finishes4.push(new Wall(1, -0.5, -15, '#7FFF00', 1));
finishes4.push(new Wall(0, -0.5, -15, '#7FFF00', 1));
finishes4.push(new Wall(-1, -0.5, -15, '#7FFF00', 1));
// LVL 5 finish
let finishes5 = [];
finishes5.push(new Wall(1, -0.5, -15, '#7FFF00', 1));
finishes5.push(new Wall(0, -0.5, -15, '#7FFF00', 1));
finishes5.push(new Wall(-1, -0.5, -15, '#7FFF00', 1));
// LVL 6 finish
let finishes6 = [];
finishes6.push(new Wall(1, -0.5, -15, '#7FFF00', 1));
finishes6.push(new Wall(0, -0.5, -15, '#7FFF00', 1));
finishes6.push(new Wall(-1, -0.5, -15, '#7FFF00', 1));

// levels 1-3
let levels = [];
levels.push(
	new Level(
		getEnemies(),
		getCoins(),
		[new Light(100, 0, 0, 0, '#FF0000', 'point'), new Light(100, 50, 0, 0, '#FF0000', 'point')],
		finishes
	)
);
levels.push(
	new Level(
		getEnemies2(),
		getCoins2(),
		[new Light(100, 0, 0, 0, '#FF0000', 'point'), new Light(100, 50, 0, 0, '#FF0000', 'point')],
		finishes2
	)
);
levels.push(
	new Level(
		getEnemies3(),
		getCoins3(),
		[new Light(100, 0, 0, 0, '#FF0000', 'point'), new Light(100, 50, 0, 0, '#FF0000', 'point')],
		finishes3
	)
);
levels.push(
	new Level(
		getEnemies4(),
		getCoins4(),
		[new Light(100, 0, 0, 0, '#FF0000', 'point'), new Light(100, 50, 0, 0, '#FF0000', 'point')],
		finishes4
	)
);
levels.push(
	new Level(
		getEnemies5(),
		getCoins5(),
		[new Light(100, 0, 0, 0, '#FF0000', 'point'), new Light(100, 50, 0, 0, '#FF0000', 'point')],
		finishes5
	)
);
levels.push(
	new Level(
		getEnemies6(),
		getCoins6(),
		[new Light(100, 0, 0, 0, '#FF0000', 'point'), new Light(100, 50, 0, 0, '#FF0000', 'point')],
		finishes6
	)
);

// const level = Level(characterShaders, '#00ff00');
const player = new Player(new Controller(), new Camera(-30, 0, canvas), 0, 0.01, 0, '#FF0000', 1);
const skybox = new Skybox(
	skyboxShaders,
	'../assets/front.png',
	'../assets/back.png',
	'../assets/top.png',
	'../assets/bottom.png',
	'../assets/left.png',
	'../assets/right.png'
);

// Game Loop
function tick(time) {
	time *= 0.001;
	player.move();
	const viewMatrix = getViewMatrix(player, player.camera);
	const projectionMatrix = getProjectionMatrix(player, player.camera);
	const invViewProjectionMatrix = getInvViewProjectionMatrix(viewMatrix, projectionMatrix);

	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.clearColor(...hex2rgb('#d3d3d3'), 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	player.render(gl, levels[curLevel].getLights(), viewMatrix, projectionMatrix);
	levels[curLevel].checkCollisions(player);
	levels[curLevel].render(gl, viewMatrix, projectionMatrix, player);
	skybox.render(gl, invViewProjectionMatrix);

	requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
