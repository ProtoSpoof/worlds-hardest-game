class Controller {
	constructor() {
		this.w = false;
		this.a = false;
		this.s = false;
		this.d = false;
		this.sensitivity = 0.05;
		canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
		document.addEventListener(
			'pointerlockchange',
			(e) => {
				this.lockChangeAlert(e);
			},
			false
		);
		document.addEventListener(
			'mozpointerlockchange',
			(e) => {
				this.lockChangeAlert(e);
			},
			false
		);
		document.addEventListener('keydown', (e) => {
			this.update(e.which, true);
		});
		document.addEventListener('keyup', (e) => {
			this.update(e.which, false);
		});
		canvas.onclick = () => {
			canvas.requestPointerLock();
		};
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

	lockChangeAlert() {
		if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
			document.addEventListener('mousemove', this.updateMouse, false);
		} else {
			document.removeEventListener('mousemove', this.updateMouse, false);
		}
	}

	updateMouse(e) {
		player.updateAngle(e.movementX, e.movementY);
	}
}
