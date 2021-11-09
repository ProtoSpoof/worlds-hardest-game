let gameObjects = [];
for (let i = 0; i < 10; i++) {
	gameObjects.push(new Enemy(Math.random() * 100 - 50, 0, Math.random() * 100 - 50, '#0000FF', 1));
	gameObjects.push(new Coin(Math.random() * 100 - 50, 0, Math.random() * 100 - 50, 0, '#FFFF00', 0.7));
}
// const level = Level(characterShaders, '#00ff00');
const light = new Light(100, 0, 0, 0, '#FFFFFF', 'point');
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

function render(time) {
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

	player.render(gl, light, viewMatrix, projectionMatrix);
	gameObjects.forEach((object) => {
		object.render(gl, light, viewMatrix, projectionMatrix);
	});
	skybox.render(gl, invViewProjectionMatrix);

	requestAnimationFrame(render);
}

requestAnimationFrame(render);
