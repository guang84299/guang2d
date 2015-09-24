/**
 * Created by yanchunguang on 15/9/23.
 *
 * 一些最常用的宏，常量
 */
//some gl constant variable
/**
 * @constant
 * @type Number
 */
g.ONE = 1;

/**
 * @constant
 * @type Number
 */
g.ZERO = 0;

/**
 * @constant
 * @type Number
 */
g.SRC_ALPHA = 0x0302;

/**
 * @constant
 * @type Number
 */
g.SRC_ALPHA_SATURATE = 0x308;

/**
 * @constant
 * @type Number
 */
g.SRC_COLOR = 0x300;

/**
 * @constant
 * @type Number
 */
g.DST_ALPHA = 0x304;

/**
 * @constant
 * @type Number
 */
g.DST_COLOR = 0x306;

/**
 * @constant
 * @type Number
 */
g.ONE_MINUS_SRC_ALPHA = 0x0303;

/**
 * @constant
 * @type Number
 */
g.ONE_MINUS_SRC_COLOR = 0x301;

/**
 * @constant
 * @type Number
 */
g.ONE_MINUS_DST_ALPHA = 0x305;

/**
 * @constant
 * @type Number
 */
g.ONE_MINUS_DST_COLOR = 0x0307;

/**
 * @constant
 * @type Number
 */
g.ONE_MINUS_CONSTANT_ALPHA	= 0x8004;

/**
 * @constant
 * @type Number
 */
g.ONE_MINUS_CONSTANT_COLOR	= 0x8002;

/**
 * the constant variable equals gl.LINEAR for texture
 * @constant
 * @type Number
 */
g.LINEAR	= 0x2601;

/**
 * the constant variable equals gl.REPEAT for texture
 * @constant
 * @type Number
 */
g.REPEAT	= 0x2901;

/**
 * the constant variable equals gl.CLAMP_TO_EDGE for texture
 * @constant
 * @type Number
 */
g.CLAMP_TO_EDGE	= 0x812f;

/**
 * the constant variable equals gl.MIRRORED_REPEAT for texture
 * @constant
 * @type Number
 */
g.MIRRORED_REPEAT   = 0x8370;

/**
 * default gl blend src function. Compatible with premultiplied alpha images.
 * @constant
 * @type Number
 */
g.BLEND_SRC = (g._renderType === g._RENDER_TYPE_WEBGL && g.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA) ? g.ONE : g.SRC_ALPHA;

/**
 * default gl blend dst function. Compatible with premultiplied alpha images.
 * @constant
 * @type Number
 */
g.BLEND_DST = 0x0303;


//Possible device orientations
/**
 * Device oriented vertically, home button on the bottom (UIDeviceOrientationPortrait)
 * @constant
 * @type Number
 */
g.DEVICE_ORIENTATION_PORTRAIT = 0;

/**
 * Device oriented horizontally, home button on the right (UIDeviceOrientationLandscapeLeft)
 * @constant
 * @type Number
 */
g.DEVICE_ORIENTATION_LANDSCAPE_LEFT = 1;

/**
 * Device oriented vertically, home button on the top (UIDeviceOrientationPortraitUpsideDown)
 * @constant
 * @type Number
 */
g.DEVICE_ORIENTATION_PORTRAIT_UPSIDE_DOWN = 2;

/**
 * Device oriented horizontally, home button on the left (UIDeviceOrientationLandscapeRight)
 * @constant
 * @type Number
 */
g.DEVICE_ORIENTATION_LANDSCAPE_RIGHT = 3;

/**
 * In browsers, we only support 2 orientations by change window size.
 * @constant
 * @type Number
 */
g.DEVICE_MAX_ORIENTATIONS = 2;


// ------------------- vertex attrib flags -----------------------------
/**
 * @constant
 * @type {Number}
 */
g.VERTEX_ATTRIB_FLAG_NONE = 0;
/**
 * @constant
 * @type {Number}
 */
g.VERTEX_ATTRIB_FLAG_POSITION = 1 << 0;
/**
 * @constant
 * @type {Number}
 */
g.VERTEX_ATTRIB_FLAG_COLOR = 1 << 1;
/**
 * @constant
 * @type {Number}
 */
g.VERTEX_ATTRIB_FLAG_TEX_COORDS = 1 << 2;
/**
 * @constant
 * @type {Number}
 */
g.VERTEX_ATTRIB_FLAG_POS_COLOR_TEX = ( g.VERTEX_ATTRIB_FLAG_POSITION | g.VERTEX_ATTRIB_FLAG_COLOR | g.VERTEX_ATTRIB_FLAG_TEX_COORDS );

/**
 * GL server side states
 * @constant
 * @type {Number}
 */
g.GL_ALL = 0;

//-------------Vertex Attributes-----------
/**
 * @constant
 * @type {Number}
 */
g.VERTEX_ATTRIB_POSITION = 0;
/**
 * @constant
 * @type {Number}
 */
g.VERTEX_ATTRIB_COLOR = 1;
/**
 * @constant
 * @type {Number}
 */
g.VERTEX_ATTRIB_TEX_COORDS = 2;
/**
 * @constant
 * @type {Number}
 */
g.VERTEX_ATTRIB_MAX = 3;

//------------Uniforms------------------
/**
 * @constant
 * @type {Number}
 */
g.UNIFORM_PMATRIX = 0;
/**
 * @constant
 * @type {Number}
 */
g.UNIFORM_MVMATRIX = 1;
/**
 * @constant
 * @type {Number}
 */
g.UNIFORM_MVPMATRIX = 2;
/**
 * @constant
 * @type {Number}
 */
g.UNIFORM_TIME = 3;
/**
 * @constant
 * @type {Number}
 */
g.UNIFORM_SINTIME = 4;
/**
 * @constant
 * @type {Number}
 */
g.UNIFORM_COSTIME = 5;
/**
 * @constant
 * @type {Number}
 */
g.UNIFORM_RANDOM01 = 6;
/**
 * @constant
 * @type {Number}
 */
g.UNIFORM_SAMPLER = 7;
/**
 * @constant
 * @type {Number}
 */
g.UNIFORM_MAX = 8;

//------------Shader Name---------------
/**
 * @constant
 * @type {String}
 */
g.SHADER_POSITION_TEXTURECOLOR = "ShaderPositionTextureColor";
/**
 * @constant
 * @type {String}
 */
g.SHADER_POSITION_TEXTURECOLORALPHATEST = "ShaderPositionTextureColorAlphaTest";
/**
 * @constant
 * @type {String}
 */
g.SHADER_POSITION_COLOR = "ShaderPositionColor";
/**
 * @constant
 * @type {String}
 */
g.SHADER_POSITION_TEXTURE = "ShaderPositionTexture";
/**
 * @constant
 * @type {String}
 */
g.SHADER_POSITION_TEXTURE_UCOLOR = "ShaderPositionTexture_uColor";
/**
 * @constant
 * @type {String}
 */
g.SHADER_POSITION_TEXTUREA8COLOR = "ShaderPositionTextureA8Color";
/**
 * @constant
 * @type {String}
 */
g.SHADER_POSITION_UCOLOR = "ShaderPosition_uColor";
/**
 * @constant
 * @type {String}
 */
g.SHADER_POSITION_LENGTHTEXTURECOLOR = "ShaderPositionLengthTextureColor";

//------------uniform names----------------
/**
 * @constant
 * @type {String}
 */
g.UNIFORM_PMATRIX_S = "G_PMatrix";
/**
 * @constant
 * @type {String}
 */
g.UNIFORM_MVMATRIX_S = "G_MVMatrix";
/**
 * @constant
 * @type {String}
 */
g.UNIFORM_MVPMATRIX_S = "G_MVPMatrix";
/**
 * @constant
 * @type {String}
 */
g.UNIFORM_TIME_S = "G_Time";
/**
 * @constant
 * @type {String}
 */
g.UNIFORM_SINTIME_S = "G_SinTime";
/**
 * @constant
 * @type {String}
 */
g.UNIFORM_COSTIME_S = "G_CosTime";
/**
 * @constant
 * @type {String}
 */
g.UNIFORM_RANDOM01_S = "G_Random01";
/**
 * @constant
 * @type {String}
 */
g.UNIFORM_SAMPLER_S = "G_Texture0";
/**
 * @constant
 * @type {String}
 */
g.UNIFORM_ALPHA_TEST_VALUE_S = "G_alpha_value";

//------------Attribute names--------------
/**
 * @constant
 * @type {String}
 */
g.ATTRIBUTE_NAME_COLOR = "a_color";
/**
 * @constant
 * @type {String}
 */
g.ATTRIBUTE_NAME_POSITION = "a_position";
/**
 * @constant
 * @type {String}
 */
g.ATTRIBUTE_NAME_TEX_COORD = "a_texCoord";


/**
 * default size for font size
 * @constant
 * @type Number
 */
g.ITEM_SIZE = 32;

/**
 * default tag for current item
 * @constant
 * @type Number
 */
g.CURRENT_ITEM = 0xc0c05001;
/**
 * default tag for zoom action tag
 * @constant
 * @type Number
 */
g.ZOOM_ACTION_TAG = 0xc0c05002;
/**
 * default tag for normal
 * @constant
 * @type Number
 */
g.NORMAL_TAG = 8801;

/**
 * default selected tag
 * @constant
 * @type Number
 */
g.SELECTED_TAG = 8802;

/**
 * default disabled tag
 * @constant
 * @type Number
 */
g.DISABLE_TAG = 8803;

g.checkGLErrorDebug = function () {
    if (g._renderType === g._RENDER_TYPE_WEBGL) {
        var _error = g._renderContext.getError();
        if (_error) {
            g.log(_error);
        }
    }
};

g.incrementGLDraws = function (addNumber) {
    g.g_NumberOfDraws += addNumber;
};
