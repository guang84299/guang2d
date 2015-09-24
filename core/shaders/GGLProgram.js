/**
 * Created by yanchunguang on 15/9/23.
 */

g.HashUniformEntry = function (value, location, hh) {
    this.value = value;
    this.location = location;
    this.hh = hh || {};
};

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

    vertexShaderLog: function () {
        return this._glContext.getShaderInfoLog(this._vertShader);
    },

    fragmentShaderLog: function () {
        return this._glContext.getShaderInfoLog(this._fragShader);
    },

    /**
     * It will add a new attribute to the shader
     * @param {String} attributeName
     * @param {Number} index
     */
    addAttribute: function (attributeName, index) {
        this._glContext.bindAttribLocation(this._programObj, index, attributeName);
    },

    /**
     * links the glProgram
     * @return {Boolean}
     */
    link: function () {
        if(!this._programObj) {
            g.log("g.GLProgram.link(): Cannot link invalid program");
            return false;
        }

        this._glContext.linkProgram(this._programObj);

        if (this._vertShader)
            this._glContext.deleteShader(this._vertShader);
        if (this._fragShader)
            this._glContext.deleteShader(this._fragShader);

        this._vertShader = null;
        this._fragShader = null;

        if (g.CONFIG.debugMode) {
            var status = this._glContext.getProgramParameter(this._programObj, this._glContext.LINK_STATUS);
            if (!status) {
                g.log("guang2d: ERROR: Failed to link program: " + this._glContext.getProgramInfoLog(this._programObj));
                g.glDeleteProgram(this._programObj);
                this._programObj = null;
                return false;
            }
        }

        return true;
    },

    /**
     * it will call glUseProgram()
     */
    use: function () {
        g.glUseProgram(this._programObj);
    },

    /**
     * It will create 4 uniforms:
     *  g.UNIFORM_PMATRIX
     *  g.UNIFORM_MVMATRIX
     *  g.UNIFORM_MVPMATRIX
     *  g.UNIFORM_SAMPLER
     */
    updateUniforms: function () {
        this._uniforms[g.UNIFORM_PMATRIX] = this._glContext.getUniformLocation(this._programObj, g.UNIFORM_PMATRIX_S);
        this._uniforms[g.UNIFORM_MVMATRIX] = this._glContext.getUniformLocation(this._programObj, g.UNIFORM_MVMATRIX_S);
        this._uniforms[g.UNIFORM_MVPMATRIX] = this._glContext.getUniformLocation(this._programObj, g.UNIFORM_MVPMATRIX_S);
        this._uniforms[g.UNIFORM_TIME] = this._glContext.getUniformLocation(this._programObj, g.UNIFORM_TIME_S);
        this._uniforms[g.UNIFORM_SINTIME] = this._glContext.getUniformLocation(this._programObj, g.UNIFORM_SINTIME_S);
        this._uniforms[g.UNIFORM_COSTIME] = this._glContext.getUniformLocation(this._programObj, g.UNIFORM_COSTIME_S);

        this._usesTime = (this._uniforms[g.UNIFORM_TIME] != null || this._uniforms[g.UNIFORM_SINTIME] != null || this._uniforms[g.UNIFORM_COSTIME] != null);

        this._uniforms[g.UNIFORM_RANDOM01] = this._glContext.getUniformLocation(this._programObj, g.UNIFORM_RANDOM01_S);
        this._uniforms[g.UNIFORM_SAMPLER] = this._glContext.getUniformLocation(this._programObj, g.UNIFORM_SAMPLER_S);

        this.use();
        // Since sample most probably won't change, set it to 0 now.
        this.setUniformLocationWith1i(this._uniforms[g.UNIFORM_SAMPLER], 0);
    },

    // Uniform cache
    _updateUniformLocation: function (location, data, bytes) {
        if (location == null)
            return false;

        var updated = true;
        var element = null;
        for (var i = 0; i < this._hashForUniforms.length; i++)
            if (this._hashForUniforms[i].location == location)
                element = this._hashForUniforms[i];

        if (!element) {
            element = new g.HashUniformEntry();
            // key
            element.location = location;
            // value
            element.value = data;
            this._hashForUniforms.push(element);
        } else {
            if (element.value == data)
                updated = false;
            else
                element.value = data;
        }

        return updated;
    },

    getUniformLocationForName:function(name){
        if(!name)
            throw new Error("g.GLProgram.getUniformLocationForName(): uniform name should be non-null");
        if(!this._programObj)
            throw new Error("g.GLProgram.getUniformLocationForName(): Invalid operation. Cannot get uniform location when program is not initialized");

        return this._glContext.getUniformLocation(this._programObj, name);
    },

    getUniformMVPMatrix: function () {
        return this._uniforms[g.UNIFORM_MVPMATRIX];
    },

    getUniformSampler: function () {
        return this._uniforms[g.UNIFORM_SAMPLER];
    },

    setUniformLocationWith1i: function (location, i1) {
        var updated = this._updateUniformLocation(location, i1);
        if (updated)
            this._glContext.uniform1i(location, i1);
    },

    setUniformLocationWith2i:function(location, i1,i2){
        var intArray= [i1,i2];
        var updated =  this._updateUniformLocation(location, intArray);

        if( updated )
            this._glContext.uniform2i(location, i1, i2);
    },

    setUniformLocationWith3i:function(location, i1, i2, i3){
        var intArray = [i1,i2,i3];
        var updated =  this._updateUniformLocation(location, intArray);

        if( updated )
            this._glContext.uniform3i(location, i1, i2, i3);
    },

    setUniformLocationWith4i:function(location, i1, i2, i3, i4){
        var intArray = [i1,i2,i3,i4];
        var updated =  this._updateUniformLocation(location, intArray);

        if( updated )
            this._glContext.uniform4i(location, i1, i2, i3, i4);
    },

    setUniformLocationWith2iv:function(location, intArray, numberOfArrays){
        var updated =  this._updateUniformLocation(location, intArray);

        if( updated )
            this._glContext.uniform2iv(location, intArray);
    },

    setUniformLocationWith3iv:function(location, intArray, numberOfArrays){
        var updated =  this._updateUniformLocation(location, intArray);

        if( updated )
            this._glContext.uniform3iv(location, intArray);
    },

    setUniformLocationWith4iv:function(location, intArray, numberOfArrays){
        var updated =  this._updateUniformLocation(location, intArray);

        if( updated )
            this._glContext.uniform4iv(location, intArray);
    },

    setUniformLocationI32: function (location, i1) {
        this.setUniformLocationWith1i(arguments[0], arguments[1]);
    },

    setUniformLocationWith1f: function (location, f1) {
        var updated = this._updateUniformLocation(location, f1);
        if (updated)
            this._glContext.uniform1f(location, f1);
    },

    setUniformLocationWith2f: function (location, f1, f2) {
        var floats = [f1, f2];
        var updated = this._updateUniformLocation(location, floats);
        if (updated)
            this._glContext.uniform2f(location, f1, f2);
    },

    setUniformLocationWith3f: function (location, f1, f2, f3) {
        var floats = [f1, f2, f3];
        var updated = this._updateUniformLocation(location, floats);
        if (updated)
            this._glContext.uniform3f(location, f1, f2, f3);
    },

    setUniformLocationWith4f: function (location, f1, f2, f3, f4) {
        var floats = [f1, f2, f3, f4];
        var updated = this._updateUniformLocation(location, floats);
        if (updated)
            this._glContext.uniform4f(location, f1, f2, f3, f4);
    },

    setUniformLocationWith2fv: function (location, floatArray, numberOfArrays) {
        var updated = this._updateUniformLocation(location, floatArray);
        if (updated)
            this._glContext.uniform2fv(location, floatArray);
    },

    setUniformLocationWith3fv: function (location, floatArray, numberOfArrays) {
        var updated = this._updateUniformLocation(location, floatArray);
        if (updated)
            this._glContext.uniform3fv(location, floatArray);
    },

    setUniformLocationWith4fv: function (location, floatArray, numberOfArrays) {
        var updated = this._updateUniformLocation(location, floatArray);
        if (updated)
            this._glContext.uniform4fv(location, floatArray);
    },

    setUniformLocationWithMatrix4fv: function (location, matrixArray, numberOfMatrices) {
        var updated = this._updateUniformLocation(location, matrixArray);
        if (updated)
            this._glContext.uniformMatrix4fv(location, false, matrixArray);
    },

    setUniformLocationF32: function () {
        if (arguments.length < 2)
            return;

        switch (arguments.length) {
            case 2:
                this.setUniformLocationWith1f(arguments[0], arguments[1]);
                break;
            case 3:
                this.setUniformLocationWith2f(arguments[0], arguments[1], arguments[2]);
                break;
            case 4:
                this.setUniformLocationWith3f(arguments[0], arguments[1], arguments[2], arguments[3]);
                break;
            case 5:
                this.setUniformLocationWith4f(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                break;
        }
    },

    setUniformForModelViewAndProjectionMatrixWithMat4: function () {
        this._glContext.uniformMatrix4fv(this._uniforms[cc.UNIFORM_MVMATRIX], false, cc.modelview_matrix_stack.top.mat);
        this._glContext.uniformMatrix4fv(this._uniforms[cc.UNIFORM_PMATRIX], false, cc.projection_matrix_stack.top.mat);
    },

    reset: function () {
        this._vertShader = null;
        this._fragShader = null;
        this._uniforms.length = 0;

        // it is already deallocated by android
        //ccGLDeleteProgram(m_uProgram);
        this._glContext.deleteProgram(this._programObj);
        this._programObj = null;

        // Purge uniform hash
        for (var i = 0; i < this._hashForUniforms.length; i++) {
            this._hashForUniforms[i].value = null;
            this._hashForUniforms[i] = null;
        }

        this._hashForUniforms.length = 0;
    },

    getProgram: function () {
        return this._programObj;
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