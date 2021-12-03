class Wall extends GameObject {
	constructor(x = 0, y = 0, z = 0, color = '#ff0000', size = 1, angle = 0) {
		super(twgl.primitives.createCubeBufferInfo(gl, 1), x, y, z, angle, color, size, 0.1, 50, 0.2);
	}
}
