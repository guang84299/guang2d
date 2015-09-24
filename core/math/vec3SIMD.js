/**
 * Created by yanchunguang on 15/9/24.
 */


(function(g) {
    var proto = g.math.Vec3.prototype;

    proto.transformCoordSIMD = function(mat4){
        var vec = SIMD.float32x4(this.x, this.y, this.z, 0.0);
        var mat0 = SIMD.float32x4.load(mat4.mat, 0);
        var mat1 = SIMD.float32x4.load(mat4.mat, 4);
        var mat2 = SIMD.float32x4.load(mat4.mat, 8);
        var mat3 = SIMD.float32x4.load(mat4.mat, 12);

        //g.kmVec4Transform(v, inV,pM);
        var out = SIMD.float32x4.add(
            SIMD.float32x4.add(SIMD.float32x4.mul(mat0, SIMD.float32x4.swizzle(vec, 0, 0, 0, 0)),
                SIMD.float32x4.mul(mat1, SIMD.float32x4.swizzle(vec, 1, 1, 1, 1))),
            SIMD.float32x4.add(SIMD.float32x4.mul(mat2, SIMD.float32x4.swizzle(vec, 2, 2, 2, 2)),
                mat3));

        out = SIMD.float32x4.div(out, SIMD.float32x4.swizzle(out, 3, 3, 3, 3));
        this.fill(out);

        return this;
    };
})(g);
