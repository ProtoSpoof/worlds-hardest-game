class Enemy extends GameObject {
	constructor(x = 0, y = 0, z = 0, color = '#ff0000', size = 1, angle = 0) {
		super(twgl.primitives.createSphereBufferInfo(gl, size / 2, 20, 20), x, y, z, angle, color, size, 0.1, 50, 0.2);
	}
}
