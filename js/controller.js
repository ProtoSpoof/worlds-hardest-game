class Controller {
	constructor() {
		this.w = false;
		this.a = false;
		this.s = false;
		this.d = false;
		this.sensitivity = 0.05;
	}

	update(key, down) {
		switch (key) {
			// W
			case 87:
				this.w = down;
				break;

			// A
			case 65:
				this.a = down;
				break;

			// S
			case 83:
				this.s = down;
				break;

			// D
			case 68:
				this.d = down;
				break;
		}
	}
}

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

function keydown(e) {
	controller.update(e.which, true);
}
function keyup(e) {
	controller.update(e.which, false);
}

function keydown(e) {
	controller.update(e.which, true);
}

/* START mouse position tracking */
canvas.onclick = () => {
	canvas.requestPointerLock();
};

window.onresize = () => {
	camera.updateAspect(canvas.clientWidth / canvas.clientHeight);
};

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
	player.updateAngle(e.movementX, controller);
	camera.update(e.movementX, e.movementY, controller);
	// console.log(camera.xAngle);
}
/* END mouse position tracking */
