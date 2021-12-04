class Enemy extends GameObject {
	constructor(x = 0, y = 0, z = 0, color = '#ff0000', size = 1, angle = 0) {
		super(twgl.primitives.createSphereBufferInfo(gl, size / 2, 20, 20), x, y, z, angle, color, size, 0.1, 50, 0.2);
	}
}

class MovingEnemy extends Enemy {
	constructor(path, color = '#ff0000', size = 1, angle = 0) {
		super(path[0][0], path[0][1], path[0][2], color, size, angle);
		this.path = path;
		this.curTarget = 1;
		this.speed = 0.1;
	}

	render(gl, lights, viewMatrix, projectionMatrix, modelMatrix = null) {
		this.moveToTarget();
		super.render(gl, lights, viewMatrix, projectionMatrix, modelMatrix);
	}

	moveToTarget() {
		let vec = v3.subtract(this.path[this.curTarget], this.pos);
		if (v3.lengthSq(vec) <= 0.01) {
			this.curTarget = (this.curTarget + 1) % this.path.length;
			return;
		}
		let unitVec = v3.normalize(vec);
		this.pos = v3.add(this.pos, v3.mulScalar(unitVec, this.speed));
	}
}
