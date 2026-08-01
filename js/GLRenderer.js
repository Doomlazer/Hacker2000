class GLRenderer {
    constructor(canvas) {
        this.canvas = canvas;

        this.gl =
            canvas.getContext("webgl2") ||
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");

        if (!this.gl) {
            throw new Error("WebGL unavailable");
        }

        this.isWebGL2 =
            this.gl.getParameter(this.gl.VERSION)
            .includes("WebGL 2");

        this.vertices = [];

        this.program = this.createProgram();
        this.buffer = this.gl.createBuffer();
    }

    createProgram() {
        const gl = this.gl;

        const vs = `
        precision mediump float;

        attribute vec2 aPos;
        attribute vec4 aColor;

        uniform mat3 uCamera;

        varying vec4 vColor;

        void main() {

            vec3 p = uCamera * vec3(aPos,1.0);

            gl_Position = vec4(
                p.xy,
                0.0,
                1.0
            );

            vColor = aColor;
        }
        `;


        const fs = `
        precision mediump float;

        varying vec4 vColor;

        void main() {
            gl_FragColor = vColor;
        }
        `;


        function compile(type,src){
            let s=gl.createShader(type);
            gl.shaderSource(s,src);
            gl.compileShader(s);

            if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){
                console.error(gl.getShaderInfoLog(s));
            }

            return s;
        }


        let p=gl.createProgram();

        gl.attachShader(
            p,
            compile(gl.VERTEX_SHADER,vs)
        );

        gl.attachShader(
            p,
            compile(gl.FRAGMENT_SHADER,fs)
        );

        gl.linkProgram(p);

        return p;
    }


    beginFrame() {
        this.vertices.length = 0;

        this.gl.clearColor(
            0,
            0,
            0,
            1
        );

        this.gl.clear(
            this.gl.COLOR_BUFFER_BIT
        );
    }


    /*
        Add rectangle to batch

        x,y,w,h are screen coordinates

        color:
        [r,g,b,a] 0-1
    */
    rect({
        x,
        y,
        w,
        h,
        color=[1,1,1,1]
    }) {

        let x2=x+w;
        let y2=y+h;


        // two triangles
        this.vertex(x,y,color);
        this.vertex(x2,y,color);
        this.vertex(x2,y2,color);


        this.vertex(x,y,color);
        this.vertex(x2,y2,color);
        this.vertex(x,y2,color);
    }


    vertex(x,y,c){

        this.vertices.push(
            x,
            y,
            c[0],
            c[1],
            c[2],
            c[3]
        );

    }


    flush(camera){

        if(this.vertices.length===0)
            return;


        const gl=this.gl;


        gl.useProgram(this.program);


        gl.bindBuffer(
            gl.ARRAY_BUFFER,
            this.buffer
        );


        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.vertices),
            gl.DYNAMIC_DRAW
        );


        let stride =
            6 * Float32Array.BYTES_PER_ELEMENT;


        const posLoc = gl.getAttribLocation(
    this.program,
    "aPos"
);

const colorLoc = gl.getAttribLocation(
    this.program,
    "aColor"
);


        gl.enableVertexAttribArray(posLoc);

        gl.vertexAttribPointer(
            posLoc,
            2,
            gl.FLOAT,
            false,
            stride,
            0
        );


        gl.enableVertexAttribArray(colorLoc);

        gl.vertexAttribPointer(
            colorLoc,
            4,
            gl.FLOAT,
            false,
            stride,
            2 * 4
        );


        let loc =
            gl.getUniformLocation(
                this.program,
                "uCamera"
            );


        gl.uniformMatrix3fv(
            loc,
            false,
            camera
        );


        gl.drawArrays(
            gl.TRIANGLES,
            0,
            this.vertices.length/6
        );


        this.vertices.length=0;
    }
}