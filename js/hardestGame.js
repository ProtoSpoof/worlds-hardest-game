// Create a new player with position at (0, 0, 0.5)
const player = new Player(characterShaders, 0, 0, 0, '#FFFFFF');
const camera = new Camera(-30, 0, player, canvas);
const light = new Light(100, 0, 0, 0, '#FFFFFF', 'point');
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

	const viewMatrix = getViewMatrix(player, camera);
	const projectionMatrix = getProjectionMatrix(player, camera);
	const invViewProjectionMatrix = getInvViewProjectionMatrix(viewMatrix, projectionMatrix);

	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.clearColor(...hex2rgb('#d3d3d3'), 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	player.render(gl, light, viewMatrix, projectionMatrix);
	skybox.render(gl, invViewProjectionMatrix);
	requestAnimationFrame(render);
}

requestAnimationFrame(render);
