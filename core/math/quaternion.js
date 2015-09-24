/**
 * Created by yanchunguang on 15/9/24.
 */


(function(g) {
    /**
     * The Quaternion class
     * @param {Number|g.math.Quaternion} [x=0]
     * @param {Number} [y=0]
     * @param {Number} [z=0]
     * @param {Number} [w=0]
     * @constructor
     */
    g.math.Quaternion = function (x, y, z, w) {
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
    g.kmQuaternion = g.math.Quaternion;
    var proto = g.math.Quaternion.prototype;

    /**
     * Sets the conjugate of quaternion to self
     * @param {g.math.Quaternion} quaternion
     */
    proto.conjugate = function (quaternion) {   //= g.kmQuaternionConjugate
        this.x = -quaternion.x;
        this.y = -quaternion.y;
        this.z = -quaternion.z;
        this.w = quaternion.w;
        return this;
    };

    /**
     * Returns the dot product of the current quaternion and parameter quaternion
     * @param quaternion
     * @returns {number}
     */
    proto.dot = function(quaternion) {    // = g.kmQuaternionDot
        // A dot B = B dot A = AtBt + AxBx + AyBy + AzBz
        return (this.w * quaternion.w + this.x * quaternion.x + this.y * quaternion.y + this.z * quaternion.z);
    };

    /**
     * Returns the exponential of the quaternion, this function doesn't implemented.
     * @returns {g.math.Quaternion}
     */
    proto.exponential = function(){   //=g.kmQuaternionExp
        return this;
    };

    /**
     * Makes the current quaternion an identity quaternion
     */
    proto.identity = function(){   //=g.kmQuaternionIdentity
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.w = 1.0;
        return this;
    };

    /**
     * Inverses the value of current Quaternion
     */
    proto.inverse = function(){           //=g.kmQuaternionInverse
        var len = this.length();
        if (Math.abs(len) > g.math.EPSILON) {
            this.x = 0.0;
            this.y = 0.0;
            this.z = 0.0;
            this.w = 0.0;
            return this;
        }

        ///Get the conjugute and divide by the length
        this.conjugate(this).scale(1.0 / len);
        return this;
    };

    /**
     * Returns true if the quaternion is an identity quaternion
     * @returns {boolean}
     */
    proto.isIdentity = function(){     //=g.kmQuaternionIsIdentity
        return (this.x === 0.0 && this.y === 0.0 && this.z === 0.0 && this.w === 1.0);
    };

    /**
     * Returns the length of the quaternion
     * @returns {number}
     */
    proto.length = function() {       //=g.kmQuaternionLength
        return Math.sqrt(this.lengthSq());
    };

    /**
     * Returns the length of the quaternion squared (prevents a sqrt)
     * @returns {number}
     */
    proto.lengthSq = function() {   //=g.kmQuaternionLengthSq
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    };

    /**
     * Uses current quaternion multiplies other quaternion.
     * @param {g.math.Quaternion} quaternion
     * @returns {g.math.Quaternion}
     */
    proto.multiply = function(quaternion) {     //g.kmQuaternionMultiply
        var x = this.x, y = this.y, z = this.z, w = this.w;
        this.w = w * quaternion.w - x * quaternion.x - y * quaternion.y - z * quaternion.z;
        this.x = w * quaternion.x + x * quaternion.w + y * quaternion.z - z * quaternion.y;
        this.y = w * quaternion.y + y * quaternion.w + z * quaternion.x - x * quaternion.z;
        this.z = w * quaternion.z + z * quaternion.w + x * quaternion.y - y * quaternion.x;
        return this;
    };

    /**
     * Normalizes a quaternion
     * @returns {g.math.Quaternion}
     */
    proto.normalize = function(){     //=g.kmQuaternionNormalize
        var length = this.length();
        if (Math.abs(length) <= g.math.EPSILON)
            throw new Error("current quaternion is an invalid value");
        this.scale(1.0 / length);
        return this;
    };

    /**
     * Rotates a quaternion around an axis and an angle
     * @param {g.math.Vec3} axis
     * @param {Number} angle
     */
    proto.rotationAxis = function(axis, angle){        //g.kmQuaternionRotationAxis
        var rad = angle * 0.5, scale = Math.sin(rad);
        this.w = Math.cos(rad);
        this.x = axis.x * scale;
        this.y = axis.y * scale;
        this.z = axis.z * scale;
        return this;
    };

    /**
     *  Creates a quaternion from a rotation matrix
     * @param mat3
     * @returns {*}
     */
    g.math.Quaternion.rotationMatrix = function (mat3) {        //g.kmQuaternionRotationMatrix
        if (!mat3)
            return null;

        var x, y, z, w;
        var m4x4 = [], mat = mat3.mat, scale = 0.0;

        /*    0 3 6
         1 4 7
         2 5 8

         0 1 2 3
         4 5 6 7
         8 9 10 11
         12 13 14 15*/
        m4x4[0] = mat[0];
        m4x4[1] = mat[3];
        m4x4[2] = mat[6];
        m4x4[4] = mat[1];
        m4x4[5] = mat[4];
        m4x4[6] = mat[7];
        m4x4[8] = mat[2];
        m4x4[9] = mat[5];
        m4x4[10] = mat[8];
        m4x4[15] = 1;
        var pMatrix = m4x4[0];

        var diagonal = pMatrix[0] + pMatrix[5] + pMatrix[10] + 1;
        if (diagonal > g.math.EPSILON) {
            // Calculate the scale of the diagonal
            scale = Math.sqrt(diagonal) * 2;

            // Calculate the x, y, x and w of the quaternion through the respective equation
            x = ( pMatrix[9] - pMatrix[6] ) / scale;
            y = ( pMatrix[2] - pMatrix[8] ) / scale;
            z = ( pMatrix[4] - pMatrix[1] ) / scale;
            w = 0.25 * scale;
        } else {
            // If the first element of the diagonal is the greatest value
            if (pMatrix[0] > pMatrix[5] && pMatrix[0] > pMatrix[10]) {
                // Find the scale according to the first element, and double that value
                scale = Math.sqrt(1.0 + pMatrix[0] - pMatrix[5] - pMatrix[10]) * 2.0;

                // Calculate the x, y, x and w of the quaternion through the respective equation
                x = 0.25 * scale;
                y = (pMatrix[4] + pMatrix[1] ) / scale;
                z = (pMatrix[2] + pMatrix[8] ) / scale;
                w = (pMatrix[9] - pMatrix[6] ) / scale;
            }
            // Else if the second element of the diagonal is the greatest value
            else if (pMatrix[5] > pMatrix[10]) {
                // Find the scale according to the second element, and double that value
                scale = Math.sqrt(1.0 + pMatrix[5] - pMatrix[0] - pMatrix[10]) * 2.0;

                // Calculate the x, y, x and w of the quaternion through the respective equation
                x = (pMatrix[4] + pMatrix[1] ) / scale;
                y = 0.25 * scale;
                z = (pMatrix[9] + pMatrix[6] ) / scale;
                w = (pMatrix[2] - pMatrix[8] ) / scale;
            } else {
                // Else the third element of the diagonal is the greatest value

                // Find the scale according to the third element, and double that value
                scale = Math.sqrt(1.0 + pMatrix[10] - pMatrix[0] - pMatrix[5]) * 2.0;

                // Calculate the x, y, x and w of the quaternion through the respective equation
                x = (pMatrix[2] + pMatrix[8] ) / scale;
                y = (pMatrix[9] + pMatrix[6] ) / scale;
                z = 0.25 * scale;
                w = (pMatrix[4] - pMatrix[1] ) / scale;
            }
        }
        return new g.math.Quaternion(x, y, z, w);
    };

    /**
     * Create a quaternion from yaw, pitch and roll
     * @param yaw
     * @param pitch
     * @param roll
     * @returns {g.math.Quaternion}
     */
    g.math.Quaternion.rotationYawPitchRoll = function (yaw, pitch, roll) {     //g.kmQuaternionRotationYawPitchRoll
        var ex, ey, ez;        // temp half euler angles
        var cr, cp, cy, sr, sp, sy, cpcy, spsy;        // temp vars in roll,pitch yaw

        ex = g.degreesToRadians(pitch) / 2.0;    // convert to rads and half them
        ey = g.degreesToRadians(yaw) / 2.0;
        ez = g.degreesToRadians(roll) / 2.0;

        cr = Math.cos(ex);
        cp = Math.cos(ey);
        cy = Math.cos(ez);

        sr = Math.sin(ex);
        sp = Math.sin(ey);
        sy = Math.sin(ez);

        cpcy = cp * cy;
        spsy = sp * sy;

        var ret = new g.math.Quaternion();
        ret.w = cr * cpcy + sr * spsy;
        ret.x = sr * cpcy - cr * spsy;
        ret.y = cr * sp * cy + sr * cp * sy;
        ret.z = cr * cp * sy - sr * sp * cy;
        ret.normalize();
        return ret;
    };

    /**
     * Interpolate with other quaternions
     * @param {g.math.Quaternion} quaternion
     * @param {Number} t
     * @returns {g.math.Quaternion}
     */
    proto.slerp = function(quaternion, t) {            //=g.kmQuaternionSlerp
        if (this.x === quaternion.x && this.y === quaternion.y && this.z === quaternion.z && this.w === quaternion.w) {
            return this;
        }
        var ct = this.dot(quaternion), theta = Math.acos(ct), st = Math.sqrt(1.0 - g.math.square(ct));
        var stt = Math.sin(t * theta) / st, somt = Math.sin((1.0 - t) * theta) / st;
        var temp2 = new g.math.Quaternion(quaternion);
        this.scale(somt);
        temp2.scale(stt);
        this.add(temp2);
        return this;
    };

    /**
     * Get the axis and angle of rotation from a quaternion
     * @returns {{axis: g.math.Vec3, angle: number}}
     */
    proto.toAxisAndAngle = function(){    //=g.kmQuaternionToAxisAngle
        var tempAngle;        // temp angle
        var scale;            // temp vars
        var retAngle, retAxis = new g.math.Vec3();

        tempAngle = Math.acos(this.w);
        scale = Math.sqrt(g.math.square(this.x) + g.math.square(this.y) + g.math.square(this.z));

        if (((scale > -g.math.EPSILON) && scale < g.math.EPSILON)
            || (scale < 2 * Math.PI + g.math.EPSILON && scale > 2 * Math.PI - g.math.EPSILON)) {       // angle is 0 or 360 so just simply set axis to 0,0,1 with angle 0
            retAngle = 0.0;
            retAxis.x = 0.0;
            retAxis.y = 0.0;
            retAxis.z = 1.0;
        } else {
            retAngle = tempAngle * 2.0;        // angle in radians
            retAxis.x = this.x / scale;
            retAxis.y = this.y / scale;
            retAxis.z = this.z / scale;
            retAxis.normalize();
        }
        return {axis: retAxis, angle: retAngle};
    };

    /**
     * Scale a quaternion
     * @param {Number} scale
     */
    proto.scale = function(scale) {   //g.kmQuaternionScale
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        this.w *= scale;
        return this;
    };

    /**
     * Assign current quaternion value from a quaternion.
     * @param {g.math.Quaternion} quaternion
     * @returns {g.math.Quaternion}  current quaternion
     */
    proto.assignFrom = function(quaternion){     //=g.kmQuaternionAssign
        this.x = quaternion.x;
        this.y = quaternion.y;
        this.z = quaternion.z;
        this.w = quaternion.w;
        return this;
    };

    /**
     * Adds other quaternion
     * @param {g.math.Quaternion} quaternion
     * @returns {g.math.Quaternion}
     */
    proto.add = function(quaternion) {              //g.kmQuaternionAdd
        this.x += quaternion.x;
        this.y += quaternion.y;
        this.z += quaternion.z;
        this.w += quaternion.w;
        return this;
    };

    /**
     * <p>
     *     Adapted from the OGRE engine!                                                            <br/>
     *     Gets the shortest arc quaternion to rotate this vector to the destination vector.        <br/>
     *     @remarks                                                                                <br/>
     *     If you call this with a destination vector that is close to the inverse                  <br/>
     *     of this vector, we will rotate 180 degrees around the 'fallbackAxis'                     <br/>
     *     (if specified, or a generated axis if not) since in this case ANY axis of rotation is valid.
     * </p>
     * @param {g.math.Vec3} vec1
     * @param {g.math.Vec3} vec2
     * @param {g.math.Vec3} fallback
     * @returns {g.math.Quaternion}
     */
    g.math.Quaternion.rotationBetweenVec3 = function(vec1, vec2, fallback) {            //g.kmQuaternionRotationBetweenVec3
        var v1 = new g.math.Vec3(vec1), v2 = new g.math.Vec3(vec2);
        v1.normalize();
        v2.normalize();
        var a = v1.dot(v2), quaternion = new g.math.Quaternion();

        if (a >= 1.0) {
            quaternion.identity();
            return quaternion;
        }

        if (a < (1e-6 - 1.0)) {
            if (Math.abs(fallback.lengthSq()) < g.math.EPSILON) {
                quaternion.rotationAxis(fallback, Math.PI);
            } else {
                var axis = new g.math.Vec3(1.0, 0.0, 0.0);
                axis.cross(vec1);

                //If axis is zero
                if (Math.abs(axis.lengthSq()) < g.math.EPSILON) {
                    axis.fill(0.0, 1.0, 0.0);
                    axis.cross(vec1);
                }
                axis.normalize();
                quaternion.rotationAxis(axis, Math.PI);
            }
        } else {
            var s = Math.sqrt((1 + a) * 2), invs = 1 / s;
            v1.cross(v2);
            quaternion.x = v1.x * invs;
            quaternion.y = v1.y * invs;
            quaternion.z = v1.z * invs;
            quaternion.w = s * 0.5;
            quaternion.normalize();
        }
        return quaternion;
    };

    /**
     * Current quaternion multiplies a vec3
     * @param {g.math.Vec3} vec
     * @returns {g.math.Vec3}
     */
    proto.multiplyVec3 = function(vec){        //=g.kmQuaternionMultiplyVec3
        var x = this.x, y = this.y, z = this.z, retVec = new g.math.Vec3(vec);
        var uv = new g.math.Vec3(x, y, z), uuv = new g.math.Vec3(x, y, z);
        uv.cross(vec);
        uuv.cross(uv);
        uv.scale((2.0 * q.w));
        uuv.scale(2.0);

        retVec.add(uv);
        retVec.add(uuv);
        return retVec;
    };
})(g);
