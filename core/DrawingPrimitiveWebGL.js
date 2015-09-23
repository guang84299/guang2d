/**
 * Created by yanchunguang on 15/9/23.
 */

g.DrawingPrimitiveWebGL = g.Class.extend({
    _renderContext:null,
    _initialized:false,
    _shader: null,
    _colorLocation:-1,
    _colorArray: null,
    _pointSizeLocation:-1,
    _pointSize:-1,

    ctor : function(ctx)
    {
        if(!ctx)
            ctx = g._renderContext;
        if(!ctx instanceof WebGLRenderingContext)
            throw new Error("Can't initialise DrawingPrimitiveWebGL. context need is WebGLRenderingContext");

        this._renderContext = ctx;
        this._colorArray = new Float32Array([1.0, 1.0, 1.0, 1.0]);
    }
});