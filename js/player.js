class Player {
	constructor(shader, x = 0, y = 0, z = 0, color = '#ff0000') {
		this.programInfo = twgl.createProgramInfo(gl, shader);
		this.vertices = [
			1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, 1,
			-1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1,
			-1, 1, 1, -1, 1, -1, -1, -1, -1, -1,
		];
		this.normal = [
			1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
			0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
			0, 0, -1,
		];
		this.texcoord = [
			1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
			0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
		];
		this.indices = [
			0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20,
			21, 22, 20, 22, 23,
		];

		this.pos = [x, y, z];
		this.dia = Math.sqrt(3);

		// horizontal angle of cube
		this.angle = 0;

		this.materialProperties = {
			materialColor: hex2rgb('#FF0000'),
			ambientIntensity: 0.1,
		};

		this.shininess = 50;
		this.ks = 0.2;
		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
			position: this.vertices,
			normal: this.normal,
			texcoord: this.texcoord,
			indices: this.indices,
		});
	}

	render(gl, light, viewMatrix, projectionMatrix) {
		gl.useProgram(this.programInfo.program);
		const lookAt = m4.inverse(viewMatrix);
		const uniforms = {
			modelMatrix: m4.multiply(
				m4.multiply(m4.identity(), m4.translation(this.pos)),
				m4.rotationY(deg2rad(this.angle))
			),
			// modelMatrix: m4.identity(),
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

	update(xOff, yOff, angleOff) {
		this.pos[0] += xOff;
		this.pos[1] += yOff;
		this.angle -= angleOff / 5;
		this.angle %= 360;
	}
}
