class Light {
	constructor(distance, x, y, z, color = '#FFFFFF', type = 'point') {
		this.angle = { x: x, y: y, z: z };
		this.type = type;
		this.direction = m4.transformDirection(
			m4.multiply(
				m4.multiply(m4.rotationX(deg2rad(this.angle.x)), m4.rotationY(deg2rad(this.angle.y))),
				m4.rotationZ(deg2rad(this.angle.z))
			),
			[0, 1, 0]
		);
		this.color = hex2rgb(color);
		this.pos = v3.add([0, 0, 0], v3.mulScalar(this.direction, (distance * Math.sqrt(3)) / 2));
	}
}
