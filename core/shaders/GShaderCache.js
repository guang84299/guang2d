/**
 * Created by yanchunguang on 15/9/23.
 */

g.shaderCache = {

    /**
     * @public
     * @constant
     * @type {Number}
     */
    TYPE_POSITION_TEXTURECOLOR: 0,
    /**
     * @public
     * @constant
     * @type {Number}
     */
    TYPE_POSITION_TEXTURECOLOR_ALPHATEST: 1,
    /**
     * @public
     * @constant
     * @type {Number}
     */
    TYPE_POSITION_COLOR: 2,
    /**
     * @public
     * @constant
     * @type {Number}
     */
    TYPE_POSITION_TEXTURE: 3,
    /**
     * @public
     * @constant
     * @type {Number}
     */
    TYPE_POSITION_TEXTURE_UCOLOR: 4,
    /**
     * @public
     * @constant
     * @type {Number}
     */
    TYPE_POSITION_TEXTURE_A8COLOR: 5,
    /**
     * @public
     * @constant
     * @type {Number}
     */
    TYPE_POSITION_UCOLOR: 6,
    /**
     * @public
     * @constant
     * @type {Number}
     */
    TYPE_POSITION_LENGTH_TEXTURECOLOR: 7,
    /**
     * @public
     * @constant
     * @type {Number}
     */
    TYPE_MAX: 8,

    _programs: {},

    _init: function () {
        this.loadDefaultShaders();
        return true;
    },

    _loadDefaultShader: function (program, type) {
        switch (type) {
            case this.TYPE_POSITION_TEXTURECOLOR:
                program.initWithVertexShaderByteArray(g.SHADER_POSITION_TEXTURE_COLOR_VERT, g.SHADER_POSITION_TEXTURE_COLOR_FRAG);

                program.addAttribute(g.ATTRIBUTE_NAME_POSITION, g.VERTEX_ATTRIB_POSITION);
                program.addAttribute(g.ATTRIBUTE_NAME_COLOR, g.VERTEX_ATTRIB_COLOR);
                program.addAttribute(g.ATTRIBUTE_NAME_TEX_COORD, g.VERTEX_ATTRIB_TEX_COORDS);
                break;
            case this.TYPE_POSITION_TEXTURECOLOR_ALPHATEST:
                program.initWithVertexShaderByteArray(g.SHADER_POSITION_TEXTURE_COLOR_VERT, g.SHADER_POSITION_TEXTURE_COLOR_ALPHATEST_FRAG);

                program.addAttribute(g.ATTRIBUTE_NAME_POSITION, g.VERTEX_ATTRIB_POSITION);
                program.addAttribute(g.ATTRIBUTE_NAME_COLOR, g.VERTEX_ATTRIB_COLOR);
                program.addAttribute(g.ATTRIBUTE_NAME_TEX_COORD, g.VERTEX_ATTRIB_TEX_COORDS);
                break;
            case this.TYPE_POSITION_COLOR:
                program.initWithVertexShaderByteArray(g.SHADER_POSITION_COLOR_VERT, g.SHADER_POSITION_COLOR_FRAG);

                program.addAttribute(g.ATTRIBUTE_NAME_POSITION, g.VERTEX_ATTRIB_POSITION);
                program.addAttribute(g.ATTRIBUTE_NAME_COLOR, g.VERTEX_ATTRIB_COLOR);
                break;
            case this.TYPE_POSITION_TEXTURE:
                program.initWithVertexShaderByteArray(g.SHADER_POSITION_TEXTURE_VERT, g.SHADER_POSITION_TEXTURE_FRAG);

                program.addAttribute(g.ATTRIBUTE_NAME_POSITION, g.VERTEX_ATTRIB_POSITION);
                program.addAttribute(g.ATTRIBUTE_NAME_TEX_COORD, g.VERTEX_ATTRIB_TEX_COORDS);
                break;
            case this.TYPE_POSITION_TEXTURE_UCOLOR:
                program.initWithVertexShaderByteArray(g.SHADER_POSITION_TEXTURE_UCOLOR_VERT, g.SHADER_POSITION_TEXTURE_UCOLOR_FRAG);

                program.addAttribute(g.ATTRIBUTE_NAME_POSITION, g.VERTEX_ATTRIB_POSITION);
                program.addAttribute(g.ATTRIBUTE_NAME_TEX_COORD, g.VERTEX_ATTRIB_TEX_COORDS);
                break;
            case this.TYPE_POSITION_TEXTURE_A8COLOR:
                program.initWithVertexShaderByteArray(g.SHADER_POSITION_TEXTURE_A8COLOR_VERT, g.SHADER_POSITION_TEXTURE_A8COLOR_FRAG);

                program.addAttribute(g.ATTRIBUTE_NAME_POSITION, g.VERTEX_ATTRIB_POSITION);
                program.addAttribute(g.ATTRIBUTE_NAME_COLOR, g.VERTEX_ATTRIB_COLOR);
                program.addAttribute(g.ATTRIBUTE_NAME_TEX_COORD, g.VERTEX_ATTRIB_TEX_COORDS);
                break;
            case this.TYPE_POSITION_UCOLOR:
                program.initWithVertexShaderByteArray(g.SHADER_POSITION_UCOLOR_VERT, g.SHADER_POSITION_UCOLOR_FRAG);
                program.addAttribute("aVertex", g.VERTEX_ATTRIB_POSITION);
                break;
            case this.TYPE_POSITION_LENGTH_TEXTURECOLOR:
                program.initWithVertexShaderByteArray(g.SHADER_POSITION_COLOR_LENGTH_TEXTURE_VERT, g.SHADER_POSITION_COLOR_LENGTH_TEXTURE_FRAG);

                program.addAttribute(g.ATTRIBUTE_NAME_POSITION, g.VERTEX_ATTRIB_POSITION);
                program.addAttribute(g.ATTRIBUTE_NAME_TEX_COORD, g.VERTEX_ATTRIB_TEX_COORDS);
                program.addAttribute(g.ATTRIBUTE_NAME_COLOR, g.VERTEX_ATTRIB_COLOR);
                break;
            default:
                g.log("guang2d: g.shaderCache._loadDefaultShader, error shader type");
                return;
        }

        program.link();
        program.updateUniforms();

        //g.checkGLErrorDebug();
    },

    /**
     * loads the default shaders
     */
    loadDefaultShaders: function () {
        // Position Texture Color shader
        var program = new g.GLProgram();
        this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURECOLOR);
        this._programs[g.SHADER_POSITION_TEXTURECOLOR] = program;
        this._programs["ShaderPositionTextureColor"] = program;

        // Position Texture Color alpha test
        program = new g.GLProgram();
        this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURECOLOR_ALPHATEST);
        this._programs[g.SHADER_POSITION_TEXTURECOLORALPHATEST] = program;
        this._programs["ShaderPositionTextureColorAlphaTest"] = program;

        //
        // Position, Color shader
        //
        program = new g.GLProgram();
        this._loadDefaultShader(program, this.TYPE_POSITION_COLOR);
        this._programs[g.SHADER_POSITION_COLOR] = program;
        this._programs["ShaderPositionColor"] = program;

        //
        // Position Texture shader
        //
        program = new g.GLProgram();
        this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE);
        this._programs[g.SHADER_POSITION_TEXTURE] = program;
        this._programs["ShaderPositionTexture"] = program;

        //
        // Position, Texture attribs, 1 Color as uniform shader
        //
        program = new g.GLProgram();
        this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE_UCOLOR);
        this._programs[g.SHADER_POSITION_TEXTURE_UCOLOR] = program;
        this._programs["ShaderPositionTextureUColor"] = program;

        //
        // Position Texture A8 Color shader
        //
        program = new g.GLProgram();
        this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE_A8COLOR);
        this._programs[g.SHADER_POSITION_TEXTUREA8COLOR] = program;
        this._programs["ShaderPositionTextureA8Color"] = program;

        //
        // Position and 1 color passed as a uniform (to similate glColor4ub )
        //
        program = new g.GLProgram();
        this._loadDefaultShader(program, this.TYPE_POSITION_UCOLOR);
        this._programs[g.SHADER_POSITION_UCOLOR] = program;
        this._programs["ShaderPositionUColor"] = program;

        //
        // Position, Legth(TexCoords, Color (used by Draw Node basically )
        //
        program = new g.GLProgram();
        this._loadDefaultShader(program, this.TYPE_POSITION_LENGTH_TEXTURECOLOR);
        this._programs[g.SHADER_POSITION_LENGTHTEXTURECOLOR] = program;
        this._programs["ShaderPositionLengthTextureColor"] = program;
    },

    /**
     * reload the default shaders
     */
    reloadDefaultShaders: function () {
        // reset all programs and reload them

        // Position Texture Color shader
        var program = this.programForKey(cc.SHADER_POSITION_TEXTURECOLOR);
        program.reset();
        this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURECOLOR);

        // Position Texture Color alpha test
        program = this.programForKey(cc.SHADER_POSITION_TEXTURECOLORALPHATEST);
        program.reset();
        this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURECOLOR_ALPHATEST);

        //
        // Position, Color shader
        //
        program = this.programForKey(cc.SHADER_POSITION_COLOR);
        program.reset();
        this._loadDefaultShader(program, this.TYPE_POSITION_COLOR);

        //
        // Position Texture shader
        //
        program = this.programForKey(cc.SHADER_POSITION_TEXTURE);
        program.reset();
        this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE);

        //
        // Position, Texture attribs, 1 Color as uniform shader
        //
        program = this.programForKey(cc.SHADER_POSITION_TEXTURE_UCOLOR);
        program.reset();
        this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE_UCOLOR);

        //
        // Position Texture A8 Color shader
        //
        program = this.programForKey(cc.SHADER_POSITION_TEXTUREA8COLOR);
        program.reset();
        this._loadDefaultShader(program, this.TYPE_POSITION_TEXTURE_A8COLOR);

        //
        // Position and 1 color passed as a uniform (to similate glColor4ub )
        //
        program = this.programForKey(cc.SHADER_POSITION_UCOLOR);
        program.reset();
        this._loadDefaultShader(program, this.TYPE_POSITION_UCOLOR);
    },

    programForKey: function (key) {
        return this._programs[key];
    },

    getProgram: function (shaderName) {
        return this._programs[shaderName];
    },

    addProgram: function (program, key) {
        this._programs[key] = program;
    }
};