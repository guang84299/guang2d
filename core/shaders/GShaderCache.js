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


};