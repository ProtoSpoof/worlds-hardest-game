const m4 = twgl.m4;
const v3 = twgl.v3;
const canvas = document.getElementById('game-space');
const gl = canvas.getContext('webgl2');
canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

/* START mouse position tracking */
canvas.onclick = () => {
	canvas.requestPointerLock();
};

window.onresize = () => {
	camera.updateAspect(canvas.clientWidth / canvas.clientHeight);
};

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
	if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
		console.log('The pointer lock status is now locked');
		document.addEventListener('mousemove', updatePosition, false);
	} else {
		console.log('The pointer lock status is now unlocked');
		document.removeEventListener('mousemove', updatePosition, false);
	}
}

function updatePosition(e) {
	player.update(0, 0, e.movementX);
	camera.update(e.movementX, e.movementY);
	// console.log(camera.xAngle);
}
/* END mouse position tracking */

function deg2rad(deg) {
	return (Math.PI * deg) / 180;
}

function hex2rgb(hex) {
	return (hex = hex.replace('#', ''))
		.match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))
		.map((l) => parseInt(hex.length % 2 ? l + l : l, 16) / 255);
}

function getViewMatrix(player, camera) {
	const gazeDirection = m4.transformDirection(
		m4.multiply(m4.rotationY(deg2rad(camera.yAngle)), m4.rotationX(deg2rad(camera.xAngle))),
		[0, 0, 1]
	);
	const eye = v3.add(camera.lookAt, v3.mulScalar(gazeDirection, camera.dist * player.dia));
	return m4.inverse(m4.lookAt(eye, camera.lookAt, [0, 1, 0]));
}

function getProjectionMatrix(player, camera) {
	return m4.perspective(deg2rad(camera.fov), camera.aspect, camera.near * player.dia, camera.far * player.dia);
}

function getInvViewProjectionMatrix(viewMatrix, projectionMatrix) {
	const view = viewMatrix.slice();
	const viewD = m4.setTranslation(view, [0, 0, 0]);
	const viewDirectionProjection = m4.multiply(projectionMatrix, viewD);
	return m4.inverse(viewDirectionProjection);
}
