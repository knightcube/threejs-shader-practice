const vertexShader = `
    /**
    * Example Vertex Shader
    * Sets the position of the vertex by setting gl_Position
    */

    // Set the precision for data types used in this shader
    precision highp float;
    precision highp int;

    // Default THREE.js uniforms available to both fragment and vertex shader
    // uniform mat4 modelMatrix;
    // uniform mat4 modelViewMatrix;
    // uniform mat4 projectionMatrix;
    // uniform mat4 viewMatrix;
    // uniform mat3 normalMatrix;

    // Default uniforms provided by ShaderFrog.
    // uniform vec3 cameraPosition;
    uniform float time;

    // Default attributes provided by THREE.js. Attributes are only available in the
    // vertex shader. You can pass them to the fragment shader using varyings
    // attribute vec3 position;
    // attribute vec3 normal;
    // attribute vec2 uv;
    attribute vec2 uv2;

    varying vec2 vUv;

    void main() {

        vUv = uv;

        // This sets the position of the vertex in 3d space. The correct math is
        // provided below to take into account camera and object data.
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
`

export default vertexShader