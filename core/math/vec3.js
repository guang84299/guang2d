/**
 * Created by yanchunguang on 15/9/24.
 */


(function(g) {
    g.kmVec3 = g.math.Vec3 = function (x, y, z) {
        if(x && y === undefined){
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
        }
    };

    g.math.vec3 = function(x, y, z){
        return new g.math.Vec3(x, y, z);
    };

    var proto = g.math.Vec3.prototype;

    proto.fill = function (x, y, z) {    // =g.kmVec3Fill
        if (x && y === undefined) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        return this;
    };

    proto.length = function () {     //=g.kmVec3Length
        return Math.sqrt(g.math.square(this.x) + g.math.square(this.y) + g.math.square(this.z));
    };

    proto.lengthSq = function () {   //=g.kmVec3LengthSq
        return g.math.square(this.x) + g.math.square(this.y) + g.math.square(this.z)
    };

    proto.normalize = function () {  //= g.kmVec3Normalize
        var l = 1.0 / this.length();
        this.x *= l;
        this.y *= l;
        this.z *= l;
        return this;
    };

    proto.cross = function (vec3) {   //= g.kmVec3Cross
        var x = this.x, y = this.y, z = this.z;
        this.x = (y * vec3.z) - (z * vec3.y);
        this.y = (z * vec3.x) - (x * vec3.z);
        this.z = (x * vec3.y) - (y * vec3.x);
        return this;
    };

    proto.dot = function (vec) {     //= g.kmVec3Dot
        return (  this.x * vec.x + this.y * vec.y + this.z * vec.z );
    };

    proto.add = function(vec){      //= g.kmVec3Add
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        return this;
    };

    proto.subtract = function (vec) {  // = g.kmVec3Subtract
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        return this;
    };

    proto.transform = function (mat4) {             // = g.kmVec3Transform
        var x = this.x, y = this.y, z = this.z, mat = mat4.mat;
        this.x = x * mat[0] + y * mat[4] + z * mat[8] + mat[12];
        this.y = x * mat[1] + y * mat[5] + z * mat[9] + mat[13];
        this.z = x * mat[2] + y * mat[6] + z * mat[10] + mat[14];
        return this;
    };

    proto.transformNormal = function(mat4){
        /*
         a = (Vx, Vy, Vz, 0)
         b = (a×M)T
         Out = (bx, by, bz)
         */
        //Omits the translation, only scaling + rotating
        var x = this.x, y = this.y, z = this.z, mat = mat4.mat;
        this.x = x * mat[0] + y * mat[4] + z * mat[8];
        this.y = x * mat[1] + y * mat[5] + z * mat[9];
        this.z = x * mat[2] + y * mat[6] + z * mat[10];
        return this;
    };

    proto.transformCoord = function(mat4){        // = g.kmVec3TransformCoord
        /*
         a = (Vx, Vy, Vz, 1)
         b = (a×M)T
         Out = 1⁄bw(bx, by, bz)
         */
        var v = new g.math.Vec4(this.x, this.y, this.z, 1.0);
        v.transform(mat4);
        this.x = v.x / v.w;
        this.y = v.y / v.w;
        this.z = v.z / v.w;
        return this;
    };

    proto.scale = function(scale){             // = g.kmVec3Scale
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        return this;
    };

    proto.equals = function(vec){    // = g.kmVec3AreEqual
        var EPSILON = g.math.EPSILON;
        return (this.x < (vec.x + EPSILON) && this.x > (vec.x - EPSILON)) &&
            (this.y < (vec.y + EPSILON) && this.y > (vec.y - EPSILON)) &&
            (this.z < (vec.z + EPSILON) && this.z > (vec.z - EPSILON));
    };

    proto.inverseTransform = function(mat4){   //= g.kmVec3InverseTransform
        var mat = mat4.mat;
        var v1 = new g.math.Vec3(this.x - mat[12], this.y - mat[13], this.z - mat[14]);
        this.x = v1.x * mat[0] + v1.y * mat[1] + v1.z * mat[2];
        this.y = v1.x * mat[4] + v1.y * mat[5] + v1.z * mat[6];
        this.z = v1.x * mat[8] + v1.y * mat[9] + v1.z * mat[10];
        return this;
    };

    proto.inverseTransformNormal = function(mat4){   // = g.kmVec3InverseTransformNormal
        var x = this.x, y = this.y, z = this.z, mat = mat4.mat;
        this.x = x * mat[0] + y * mat[1] + z * mat[2];
        this.y = x * mat[4] + y * mat[5] + z * mat[6];
        this.z = x * mat[8] + y * mat[9] + z * mat[10];
        return this;
    };

    proto.assignFrom = function(vec){
        if(!vec)
            return this;
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;
        return this;
    };

    g.math.Vec3.zero = function(vec){   // = g.kmVec3Zero
        vec.x = vec.y = vec.z = 0.0;
        return vec;
    };

    proto.toTypeArray = function(){           //g.kmVec3ToTypeArray
        var tyArr = new Float32Array(3);
        tyArr[0] = this.x;
        tyArr[1] = this.y;
        tyArr[2] = this.z;
        return tyArr;
    };
})(g);