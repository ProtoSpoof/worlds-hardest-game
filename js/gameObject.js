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
		shininess = 50,
		ks = 0.2
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
	}

	render(gl, light, viewMatrix, projectionMatrix, modelMatrix = null) {
		gl.useProgram(this.programInfo.program);
		const lookAt = m4.inverse(viewMatrix);
		const uniforms = {
			modelMatrix: modelMatrix
				? modelMatrix
				: m4.multiply(m4.multiply(m4.identity(), m4.translation(this.pos)), m4.rotationY(deg2rad(this.angle))),
			materialColor: this.materialProperties.materialColor,
			ambientIntensity: this.materialProperties.ambientIntensity,
			specularColor: light.color,
			lightInfo: [...light.pos, light.type],
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
}
