/**
 * Created by yanchunguang on 15/9/24.
 */


(function(g) {
    var _useSIMD = false;

    var mat4Proto = g.math.Matrix4.prototype;
    var mat4Inverse = mat4Proto.inverse;
    var mat4IsIdentity = mat4Proto.isIdentity;
    var mat4Transpose = mat4Proto.transpose;
    var mat4Multiply = mat4Proto.multiply;
    var mat4GetMat4MultiplyValue = mat4Proto.getMat4MultiplyValue;
    var mat4AssignFrom = mat4Proto.assignFrom;
    var mat4Equals = mat4Proto.equals;
    var mat4LookAt = mat4Proto.lookAt;

    var vec3Proto = g.math.Vec3.prototype;
    var vec3TransformCoord = vec3Proto.transformCoord;

    function _isEnabledSIMD () {
        return _useSIMD;
    }

    function _enableSIMD (enable) {
        if(typeof(SIMD) === 'undefined')
            return;

        if (enable) {
            mat4Proto.inverse = mat4Proto.inverseSIMD;
            mat4Proto.isIdentity = mat4Proto.isIdentitySIMD;
            mat4Proto.transpose = mat4Proto.transposeSIMD;
            mat4Proto.multiply = mat4Proto.multiplySIMD;
            mat4Proto.getMat4MultiplyValue = mat4Proto.getMat4MultiplyValueSIMD;
            mat4Proto.assignFrom = mat4Proto.assignFromSIMD;
            mat4Proto.equals = mat4Proto.equalsSIMD;
            mat4Proto.lookAt = mat4Proto.lookAtSIMD;
            vec3Proto.transformCoord = vec3Proto.transformCoordSIMD;
        } else {
            mat4Proto.inverse = mat4Inverse;
            mat4Proto.isIdentity = mat4IsIdentity;
            mat4Proto.transpose = mat4Transpose;
            mat4Proto.multiply = mat4Multiply;
            mat4Proto.getMat4MultiplyValue = mat4GetMat4MultiplyValue;
            mat4Proto.assignFrom = mat4AssignFrom;
            mat4Proto.equals = mat4Equals;
            mat4Proto.lookAt = mat4LookAt;
            vec3Proto.transformCoord = vec3TransformCoord;
        }
        _useSIMD = enable;
    }

    g.defineGetterSetter(g.sys, "useSIMD", _isEnabledSIMD, _enableSIMD);
})(g);