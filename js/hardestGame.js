let tempEnemies = [];
let tempCoins = [];
//for (let i = 0; i < 10; i++) {
//	tempEnemies.push(new Enemy(Math.random() * 100 - 50, 0, Math.random() * 100 - 50, '#0000FF', 1));
//	tempCoins.push(new Coin(Math.random() * 100 - 50, 0, Math.random() * 100 - 50, 0, '#FFFF00', 0.7));
//}
for(let i = -2; i < 10; i++)
{
	tempEnemies.push(new Enemy(2,0,-i,'#0000FF', 1));
	tempEnemies.push(new Enemy(-10,0,-i,'#0000FF', 1));
	tempEnemies.push(new Enemy(-i,0,2,'#0000FF', 1));
	tempEnemies.push(new Enemy(-i,0,-10,'#0000FF', 1));
}
tempEnemies.push(new Enemy(-10,0,-10,'#0000FF', 1));

let curLevel = 0;
let levels = [];
levels.push(
	new Level(tempEnemies, tempCoins, [
		new Light(100, 0, 0, 0, '#FFFFFF', 'point'),
		new Light(100, 50, 50, 50, '#FFFFFF', 'directional'),
	])
);

// const level = Level(characterShaders, '#00ff00');
const player = new Player(new Controller(), new Camera(-30, 0, canvas), 0, 0, 0, '#FF0000', 1);
const skybox = new Skybox(
	skyboxShaders,
	document.getElementById('skyboxFront'),
	document.getElementById('skyboxBack'),
	document.getElementById('skyboxTop'),
	document.getElementById('skyboxBottom'),
	document.getElementById('skyboxLeft'),
	document.getElementById('skyboxRight')
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
