class Camera {
	constructor(xAngle, yAngle, player, canvas) {
		this.xAngle = xAngle;
		this.yAngle = yAngle;
		this.fov = 45;
		this.near = 0.1;
		this.far = 100;
		this.dist = 10;
		this.aspect = canvas.clientWidth / canvas.clientHeight;
		this.lookAt = [player.pos[0], player.pos[1], player.pos[2]];
	}

	update(yOff, xOff) {
		this.yAngle -= yOff / 5;
		this.yAngle %= 360;
		this.xAngle -= xOff / 5;
		if (this.xAngle <= -90) this.xAngle = -89.9;
		else if (this.xAngle >= 0) this.xAngle = 0;
	}

	updateAspect(aspect) {
		this.aspect = aspect;
	}
}
