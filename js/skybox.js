class Skybox {
	constructor(shader, front, back, top, bottom, left, right) {
		this.programInfo = twgl.createProgramInfo(gl, shader);
		this.cubemapImages = [right, left, top, bottom, front, back];
		this.cubemap = twgl.createTexture(gl, {
			target: gl.TEXTURE_CUBE_MAP,
			src: this.cubemapImages,
		});
		this.bufferInfo = twgl.createBufferInfoFromArrays(gl, {
			position: {
				numComponents: 2,
				data: [-1, -1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1],
			},
		});
	}

	render(gl, invViewProjectionMatrix) {
		gl.depthFunc(gl.LEQUAL);
		const uniforms = {
			cubemap: this.cubemap,
			invViewProjectionMatrix,
		};

		gl.useProgram(this.programInfo.program);
		twgl.setUniforms(this.programInfo, uniforms);
		twgl.setBuffersAndAttributes(gl, this.programInfo, this.bufferInfo);
		twgl.drawBufferInfo(gl, this.bufferInfo);
		gl.depthFunc(gl.LESS);
	}
}
