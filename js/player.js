class Player extends GameObject {
	constructor(controller, camera, x = 0, y = 0, z = 0, color = '#ff0000', size = 1, angle = 0) {
		super(twgl.primitives.createCubeBufferInfo(gl, size), x, y, z, angle, color, size, 0.05, 95, 0.5);
		this.controller = controller;
		this.camera = camera;
		this.dia = Math.sqrt(3) * size;
		this.movementSpeed = 0.1;
		this.deaths = 0;
	}

	updateAngle(xOff, yOff) {
		this.angle -= xOff * this.controller.sensitivity;
		this.angle %= 360;
		this.camera.yAngle -= xOff * this.controller.sensitivity;
		this.camera.yAngle %= 360;
		this.camera.xAngle -= yOff * this.controller.sensitivity;
		if (this.camera.xAngle <= -90) this.camera.xAngle = -89.9;
		else if (this.camera.xAngle >= 0) this.camera.xAngle = 0;
	}

	setPosition(pos) {
		this.pos[0] = pos[0];
		this.pos[1] = pos[1];
		this.pos[2] = pos[2];
	}

	move() {
		let angle = deg2rad(this.angle);
		if (this.controller.w) {
			this.pos[0] -= this.movementSpeed * Math.sin(angle);
			this.pos[2] -= this.movementSpeed * Math.cos(angle);
		}
		if (this.controller.a) {
			this.pos[0] -= this.movementSpeed * Math.cos(angle);
			this.pos[2] += this.movementSpeed * Math.sin(angle);
		}
		if (this.controller.s) {
			this.pos[0] += this.movementSpeed * Math.sin(angle);
			this.pos[2] += this.movementSpeed * Math.cos(angle);
		}
		if (this.controller.d) {
			this.pos[0] += this.movementSpeed * Math.cos(angle);
			this.pos[2] -= this.movementSpeed * Math.sin(angle);
		}
		this.camera.move(this.pos[0], this.pos[1], this.pos[2]);
	}

	collide(obj) {
		// The simple collision cases
		if (this.squaredDist(obj) > (this.dia / 2 + obj.size / 2) * (this.dia / 2 + obj.size / 2)) return false;

		if (this.squaredDist(obj) <= (this.size / 2 + obj.size / 2) * (this.size / 2 + obj.size / 2)) return true;

		// Further Analysis Needed
		return false;
	}

	die() {
		deathCounter.innerHTML = this.deaths;
		this.deaths++;
		this.camera.yAngle = 0;
		this.camera.xAngle = -30;
		this.angle = 0;
	}
}
