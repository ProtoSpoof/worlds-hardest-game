class Coin extends GameObject {
	constructor(x = 0, y = 0, z = 0, color = '#ffff00', size = 1, ambientIntesity = 0.1, shininess = 50, ks = 0.2) {
		super(
			twgl.primitives.createCylinderBufferInfo(gl, size / 2, 0.1, 15, 1),
			x,
			y,
			z,
			Math.random() * 360,
			color,
			size,
			ambientIntesity,
			shininess,
			ks
		);
	}
	render(gl, light, viewMatrix, projectionMatrix) {
		this.rotate();
		super.render(
			gl,
			light,
			viewMatrix,
			projectionMatrix,
			m4.multiply(
				m4.multiply(m4.identity(), m4.translation(this.pos)),
				m4.multiply(m4.rotationY(deg2rad(this.angle)), m4.rotationZ(deg2rad(90)))
			)
		);
	}
	rotate() {
		this.angle += 1;
		this.angle %= 360;
	}
}
