class Camera {
	constructor(xAngle, yAngle, canvas, lookat) {
		this.xAngle = xAngle;
		this.yAngle = yAngle;
		this.fov = 45;
		this.near = 0.1;
		this.far = 1000000;
		this.dist = 6.5;
		this.aspect = canvas.clientWidth / canvas.clientHeight;
		this.lookAt = lookat;
		window.onresize = () => {
			this.updateAspect(canvas.clientWidth / canvas.clientHeight);
		};
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

	move(x, y, z) {
		this.lookAt = [x, y, z];
	}
}
