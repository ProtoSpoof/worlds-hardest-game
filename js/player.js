class Player {
	constructor(shader, x = 0, y = 0, z = 0, color = '#ff0000', size = 1) {
		this.programInfo = twgl.createProgramInfo(gl, shader);

		this.pos = [x + size / 2, y, z];
		this.dia = Math.sqrt(3);

		// horizontal angle of cube
		this.angle = 0;

		this.materialProperties = {
			materialColor: hex2rgb(color),
			ambientIntensity: 0.1,
		};

		this.shininess = 50;
		this.ks = 0.2;
		this.bufferInfo = twgl.primitives.createCubeBufferInfo(gl, size);
		this.movementSpeed = 0.1;
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

	updateAngle(angleOff, controller) {
		// this.pos[0] += xOff;
		// this.pos[1] += yOff;
		this.angle -= angleOff * controller.sensitivity;
		this.angle %= 360;
	}

	move(controller) {
		let angle = deg2rad(this.angle);
		if (controller.w) {
			this.pos[0] -= this.movementSpeed * Math.sin(angle);
			this.pos[2] -= this.movementSpeed * Math.cos(angle);
		}
		if (controller.a) {
			this.pos[0] -= this.movementSpeed * Math.cos(angle);
			this.pos[2] += this.movementSpeed * Math.sin(angle);
		}
		if (controller.s) {
			this.pos[0] += this.movementSpeed * Math.sin(angle);
			this.pos[2] += this.movementSpeed * Math.cos(angle);
		}
		if (controller.d) {
			this.pos[0] += this.movementSpeed * Math.cos(angle);
			this.pos[2] -= this.movementSpeed * Math.sin(angle);
		}
	}
}
