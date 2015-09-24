/**
 * Created by yanchunguang on 15/9/24.
 */


(function(g){
    g.math.Vec2 = function (x, y) {
        if(y === undefined){
            this.x = x.x;
            this.y = x.y;
        }else{
            this.x = x || 0;
            this.y = y || 0;
        }
    };

    var proto = g.math.Vec2.prototype;
    proto.fill = function(x, y){   // = g.kmVec2Fill
        this.x = x;
        this.y = y;
    };

    proto.length = function(){   // = g.kmVec2Length
        return Math.sqrt(g.math.square(this.x) + g.math.square(this.y));
    };

    proto.lengthSq = function(){   // = g.kmVec2LengthSq
        return g.math.square(this.x) + g.math.square(this.y);
    };

    proto.normalize = function(){  // = g.kmVec2Normalize
        var l = 1.0 / this.length();
        this.x *= l;
        this.y *= l;
        return this;
    };

    g.math.Vec2.add = function (pOut, pV1, pV2) {     // = g.kmVec2Add
        pOut.x = pV1.x + pV2.x;
        pOut.y = pV1.y + pV2.y;
        return pOut
    };

    proto.add = function(vec){   // = g.kmVec2Add
        this.x += vec.x;
        this.y += vec.y;
        return this;
    };

    proto.dot = function (vec) {   //g.kmVec2Dot
        return this.x * vec.x + this.y * vec.y;
    };

    g.math.Vec2.subtract = function (pOut, pV1, pV2) {      // = g.kmVec2Subtract
        pOut.x = pV1.x - pV2.x;
        pOut.y = pV1.y - pV2.y;
        return pOut;
    };

    proto.subtract = function(vec){     // = g.kmVec2Subtract
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    };

    proto.transform = function (mat3) {     // = g.kmVec2Transform
        var x = this.x, y = this.y;
        this.x = x * mat3.mat[0] + y * mat3.mat[3] + mat3.mat[6];
        this.y = x * mat3.mat[1] + y * mat3.mat[4] + mat3.mat[7];
        return this;
    };

    g.math.Vec2.scale = function (pOut, pIn, s) {  // = g.kmVec2Scale
        pOut.x = pIn.x * s;
        pOut.y = pIn.y * s;
        return pOut;
    };

    proto.scale = function(s) {  // = g.kmVec2Scale
        this.x *= s;
        this.y *= s;
        return this;
    };

    proto.equals = function (vec) {    // = g.kmVec2AreEqual
        return (this.x < vec.x + g.math.EPSILON && this.x > vec.x - g.math.EPSILON) &&
            (this.y < vec.y + g.math.EPSILON && this.y > vec.y - g.math.EPSILON);
    };
})(g);
