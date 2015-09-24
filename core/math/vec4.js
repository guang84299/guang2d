/**
 * Created by yanchunguang on 15/9/24.
 */


(function(g) {
    g.math.Vec4 = function (x, y, z, w) {
        if (x && y === undefined) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = x.w;
        } else {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w || 0;
        }
    };
    g.kmVec4 = g.math.Vec4;
    var proto = g.math.Vec4.prototype;

    proto.fill = function (x, y, z, w) {     //=g.kmVec4Fill
        if (x && y === undefined) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            this.w = x.w;
        } else {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
    };

    proto.add = function(vec) {    //g.kmVec4Add
        if(!vec)
            return this;
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
        this.w += vec.w;
        return this;
    };

    proto.dot = function(vec){           //g.kmVec4Dot
        return ( this.x * vec.x + this.y * vec.y + this.z * vec.z + this.w * vec.w );
    };

    proto.length = function(){    //=g.kmVec4Length
        return Math.sqrt(g.math.square(this.x) + g.math.square(this.y) + g.math.square(this.z) + g.math.square(this.w));
    };

    proto.lengthSq = function(){     //=g.kmVec4LengthSq
        return g.math.square(this.x) + g.math.square(this.y) + g.math.square(this.z) + g.math.square(this.w);
    };

    proto.lerp = function(vec, t){    //= g.kmVec4Lerp
        //not implemented
        return this;
    };

    proto.normalize = function() {   // g.kmVec4Normalize
        var l = 1.0 / this.length();
        this.x *= l;
        this.y *= l;
        this.z *= l;
        this.w *= l;
        return this;
    };

    proto.scale = function(scale){  //= g.kmVec4Scale
        /// Scales a vector to the required length. This performs a Normalize before multiplying by S.
        this.normalize();
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        this.w *= scale;
        return this;
    };

    proto.subtract = function(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        this.z -= vec.z;
        this.w -= vec.w;
    };

    proto.transform = function(mat4) {
        var x = this.x, y = this.y, z = this.z, w = this.w, mat = mat4.mat;
        this.x = x * mat[0] + y * mat[4] + z * mat[8] + w * mat[12];
        this.y = x * mat[1] + y * mat[5] + z * mat[9] + w * mat[13];
        this.z = x * mat[2] + y * mat[6] + z * mat[10] + w * mat[14];
        this.w = x * mat[3] + y * mat[7] + z * mat[11] + w * mat[15];
        return this;
    };

    g.math.Vec4.transformArray = function(vecArray, mat4){
        var retArray = [];
        for (var i = 0; i < vecArray.length; i++) {
            var selVec = new g.math.Vec4(vecArray[i]);
            selVec.transform(mat4);
            retArray.push(selVec);
        }
        return retArray;
    };

    proto.equals = function(vec){              //=g.kmVec4AreEqual
        var EPSILON = g.math.EPSILON;
        return (this.x < vec.x + EPSILON && this.x > vec.x - EPSILON) &&
            (this.y < vec.y + EPSILON && this.y > vec.y - EPSILON) &&
            (this.z < vec.z + EPSILON && this.z > vec.z - EPSILON) &&
            (this.w < vec.w + EPSILON && this.w > vec.w - EPSILON);
    };

    proto.assignFrom = function(vec) {      //= g.kmVec4Assign
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;
        this.w = vec.w;
        return this;
    };

    proto.toTypeArray = function(){      //g.kmVec4ToTypeArray
        var tyArr = new Float32Array(4);
        tyArr[0] = this.x;
        tyArr[1] = this.y;
        tyArr[2] = this.z;
        tyArr[3] = this.w;
        return tyArr;
    };
})(g);
