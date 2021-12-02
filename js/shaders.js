const objectShaders = [
	(vs = `#version 300 es
precision mediump float;
in vec3 position;
in vec3 normal;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
out vec3 fragNormal;
out vec3 fragPosition;
void main () {
  vec4 newPosition = modelMatrix*vec4(position,1);
  gl_Position = projectionMatrix*viewMatrix*modelMatrix*vec4(position,1);
  mat4 normalMatrix = transpose(inverse(modelMatrix));
  fragNormal = normalize((normalMatrix*vec4(normal,0)).xyz);
  fragPosition = newPosition.xyz;
}
`),
	(fs = `#version 300 es
    precision mediump float;

    struct PointLight {
        vec3 pos;
        vec3 color;
    };

    // struct DirectionalLight {

    // };

    out vec4 outColor;
    in vec3 fragNormal;
    in vec3 fragPosition;
    uniform vec3 materialColor;
    uniform int numLights;
    // uniform DirectionalLight dirLights[100];
    uniform PointLight pointLights[100];
    uniform vec3 eyePos;
    uniform float ks, shininess;
    uniform float ambientIntensity;

    vec3 calcPointLight (PointLight light, vec3 N, vec3 V) {
        vec3 L = normalize(light.pos.xyz);
        vec3 H = normalize(L + V);
        vec3 diffuseLighting = ((1. - ks) * materialColor * clamp(dot(L, N), 0., 1.));
        vec3 specularLighting = ks * (light.color.xyz * pow(clamp(dot(H, N), 0., 1.), shininess));
        vec3 ambientLighting = materialColor * ambientIntensity;
        return ambientLighting + diffuseLighting + specularLighting;
    }

    vec3 calcDirectionalLight (PointLight light, vec3 N, vec3 V) {
        vec3 L = normalize(light.pos.xyz);
        vec3 H = normalize(L + V);
        vec3 diffuseLighting = ((1. - ks) * materialColor * clamp(dot(L, N), 0., 1.));
        vec3 specularLighting = ks * (light.color.xyz * pow(clamp(dot(H, N), 0., 1.), shininess));
        vec3 ambientLighting = materialColor * ambientIntensity;
        return ambientLighting + diffuseLighting + specularLighting;
    }


    void main () {
        vec3 N = normalize(fragNormal);
        vec3 V = normalize(eyePos - fragPosition);
        vec3 color = vec3(0.0);
      
        for(int i = 0; i < numLights; i++)
            color += calcPointLight(pointLights[i], N, V);

        outColor = vec4(color, 1);
    }`),
];
const objectProgramInfo = twgl.createProgramInfo(gl, objectShaders);

const skyboxShaders = [
	(vs = `#version 300 es
        precision mediump float;
        in vec2 position;
        out vec2 fragPosition;
        void main() {
          fragPosition = position;
          gl_Position = vec4(position, 1, 1);
        }`),
	(fs = `#version 300 es
          precision mediump float;
          uniform samplerCube cubemap;
          in vec2 fragPosition;
          out vec4 outColor;
          uniform mat4 invViewProjectionMatrix;
      
          void main () {
            vec4 direction = invViewProjectionMatrix * vec4(fragPosition, 1, 1);
            outColor = texture(cubemap, normalize(direction.xyz/direction.w));
          }`),
];
