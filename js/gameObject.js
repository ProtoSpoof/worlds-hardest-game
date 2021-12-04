class GameObject {
	constructor(
		bufferInfo,
		x = 0,
		y = 0,
		z = 0,
		angle = 0,
		color = '#ff0000',
		size = 1,
		ambientIntesity = 0.1,
		shininess = 0.1,
		ks = 0.9
	) {
		this.programInfo = objectProgramInfo;
		this.pos = [x + size / 2, y, z];
		this.angle = angle;
		this.bufferInfo = bufferInfo;
		this.materialProperties = {
			materialColor: hex2rgb(color),
			ambientIntensity: ambientIntesity,
		};
		this.shininess = shininess;
		this.ks = ks;
		this.size = size;
	}

	render(gl, lights, viewMatrix, projectionMatrix, modelMatrix = null) {
		gl.useProgram(this.programInfo.program);
		const lookAt = m4.inverse(viewMatrix);
		const pointLights = [
			...lights.map((light) => {
				return {
					pos: light.pos,
					color: light.color,
				};
			}),
			...Array(100 - lights.length, { pos: [0, 0, 0], color: [0, 0, 0] }),
		];
		const uniforms = {
			modelMatrix: modelMatrix
				? modelMatrix
				: m4.multiply(m4.multiply(m4.identity(), m4.translation(this.pos)), m4.rotationY(deg2rad(this.angle))),
			materialColor: this.materialProperties.materialColor,
			ambientIntensity: this.materialProperties.ambientIntensity,
			numLights: lights.length,
			pointLights,
			ks: this.ks,
			shininess: this.shininess,
			eyePos: [lookAt[12], lookAt[13], lookAt[14]],
			viewMatrix,
			projectionMatrix,
		};

		twgl.setUniforms(this.programInfo, uniforms);
		twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo);
		twgl.drawBufferInfo(gl, this.bufferInfo);
	}
	squaredDist(obj) {
		return (
			Math.pow(this.pos[0] - obj.pos[0], 2) +
			Math.pow(this.pos[1] - obj.pos[1], 2) +
			Math.pow(this.pos[2] - obj.pos[2], 2)
		);
	}
}
