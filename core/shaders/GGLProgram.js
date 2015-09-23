/**
 * Created by yanchunguang on 15/9/23.
 */

g.GLProgram = g.Class.extend({
    _glContext: null,
    _programObj: null,
    _vertShader: null,
    _fragShader: null,
    _uniforms: null,
    _hashForUniforms: null,
    _usesTime: false,

    /**
     * Create a g.GLProgram object
     * @param {String} vShaderFileName
     * @param {String} fShaderFileName
     * @returns {g.GLProgram}
     */
    ctor: function (vShaderFileName, fShaderFileName, glContext) {
        this._uniforms = [];
        this._hashForUniforms = [];
        this._glContext = glContext || g._renderContext;

        vShaderFileName && fShaderFileName && this.init(vShaderFileName, fShaderFileName);
    },

    init: function (vShaderFilename, fShaderFileName) {
        return this.initWithVertexShaderFilename(vShaderFilename, fShaderFileName);
    },

    initWithVertexShaderFilename: function (vShaderFilename, fShaderFileName) {
        var vertexSource = g.loader.getRes(vShaderFilename);
        if(!vertexSource) throw new Error("Please load the resource firset : " + vShaderFilename);
        var fragmentSource = g.loader.getRes(fShaderFileName);
        if(!fragmentSource) throw new Error("Please load the resource firset : " + fShaderFileName);
        return this.initWithVertexShaderByteArray(vertexSource, fragmentSource);
    },

    initWithVertexShaderByteArray: function (vertShaderStr, fragShaderStr) {
        var locGL = this._glContext;
        this._programObj = locGL.createProgram();

        this._vertShader = null;
        this._fragShader = null;

        if (vertShaderStr) {
            this._vertShader = locGL.createShader(locGL.VERTEX_SHADER);
            if (!this._compileShader(this._vertShader, locGL.VERTEX_SHADER, vertShaderStr)) {
                g.log("guang2d: ERROR: Failed to compile vertex shader");
            }
        }

        // Create and compile fragment shader
        if (fragShaderStr) {
            this._fragShader = locGL.createShader(locGL.FRAGMENT_SHADER);
            if (!this._compileShader(this._fragShader, locGL.FRAGMENT_SHADER, fragShaderStr)) {
                g.log("guang2d: ERROR: Failed to compile fragment shader");
            }
        }

        if (this._vertShader)
            locGL.attachShader(this._programObj, this._vertShader);
        g.checkGLErrorDebug();

        if (this._fragShader)
            locGL.attachShader(this._programObj, this._fragShader);
        this._hashForUniforms.length = 0;

        g.checkGLErrorDebug();
        return true;
    },

    _compileShader: function (shader, type, source) {
        if (!source || !shader)
            return false;

        var preStr = g.GLProgram._isHighpSupported() ? "precision highp float;\n" : "precision mediump float;\n";
        source = preStr
        + "uniform mat4 G_PMatrix;         \n"
        + "uniform mat4 G_MVMatrix;        \n"
        + "uniform mat4 G_MVPMatrix;       \n"
        + "uniform vec4 G_Time;            \n"
        + "uniform vec4 G_SinTime;         \n"
        + "uniform vec4 G_CosTime;         \n"
        + "uniform vec4 G_Random01;        \n"
        + "uniform sampler2D G_Texture0;   \n"
        + "//CC INCLUDES END                \n" + source;

        this._glContext.shaderSource(shader, source);
        this._glContext.compileShader(shader);
        var status = this._glContext.getShaderParameter(shader, this._glContext.COMPILE_STATUS);

        if (!status) {
            g.log("cocos2d: ERROR: Failed to compile shader:\n" + this._glContext.getShaderSource(shader));
            if (type === this._glContext.VERTEX_SHADER)
                g.log("guang2d: \n" + this.vertexShaderLog());
            else
                g.log("guang2d: \n" + this.fragmentShaderLog());
        }
        return ( status === true );
    },

});

g.GLProgram._isHighpSupported = function(){
    if(g.GLProgram._highpSupported == null){
        var ctx = g._renderContext;
        var highp = ctx.getShaderPrecisionFormat(ctx.FRAGMENT_SHADER, ctx.HIGH_FLOAT);
        g.GLProgram._highpSupported = highp.precision !== 0;
    }
    return g.GLProgram._highpSupported;
};