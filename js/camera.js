class Camera {
	constructor(xAngle, yAngle, player, canvas) {
		this.xAngle = xAngle;
		this.yAngle = yAngle;
		this.fov = 75;
		this.near = 0.1;
		this.far = 1000000;
		this.dist = 5;
		this.aspect = canvas.clientWidth / canvas.clientHeight;
		this.lookAt = [player.pos[0], player.pos[1], player.pos[2]];
	}

	update(yOff, xOff, controller) {
		this.yAngle -= yOff * controller.sensitivity;
		this.yAngle %= 360;
		this.xAngle -= xOff * controller.sensitivity;
		if (this.xAngle <= -90) this.xAngle = -89.9;
		else if (this.xAngle >= 0) this.xAngle = 0;
	}

	updateAspect(aspect) {
		this.aspect = aspect;
	}

	move(player) {
		this.lookAt = [player.pos[0], player.pos[1], player.pos[2]];
	}
}
