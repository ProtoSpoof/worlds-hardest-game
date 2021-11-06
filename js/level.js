class Level {
	constructor(shader, color) {
		this.programInfo = twgl.createProgramInfo(gl, shader);
		this.bufferInfo = twgl.primitive.createPlaneBufferInfo(gl);
	}

	render() {}
}
