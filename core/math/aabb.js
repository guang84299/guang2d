/**
 * Created by yanchunguang on 15/9/24.
 */

/**
 * A structure that represents an axis-aligned bounding box.
 * g.kmAABB => g.math.AABB
 */
g.math.AABB = function (min, max) {
    /** The max corner of the box */
    this.min = min || new g.math.Vec3();
    /** The min corner of the box */
    this.max = max || new g.math.Vec3();
};

/**
 * Returns true if point is in the specified AABB, returns false otherwise.
 * @param {g.math.Vec3} point
 * @returns {boolean}
 */
g.math.AABB.prototype.containsPoint = function (point) {
    return (point.x >= this.min.x && point.x <= this.max.x &&
    point.y >= this.min.y && point.y <= this.max.y &&
    point.z >= this.min.z && point.z <= this.max.z);
};

/**
 * Returns true if point is in the specified AABB, returns
 * false otherwise.
 */
g.math.AABB.containsPoint = function (pPoint, pBox) {
    return (pPoint.x >= pBox.min.x && pPoint.x <= pBox.max.x &&
    pPoint.y >= pBox.min.y && pPoint.y <= pBox.max.y &&
    pPoint.z >= pBox.min.z && pPoint.z <= pBox.max.z);
};

/**
 * Assigns aabb to current AABB object
 * @param {g.math.AABB} aabb
 */
g.math.AABB.prototype.assignFrom = function(aabb){
    this.min.assignFrom(aabb.min);
    this.max.assignFrom(aabb.max);
};

/**
 * Assigns pIn to pOut, returns pOut.
 */
g.math.AABB.assign = function (pOut, pIn) {              //g.kmAABBAssign
    pOut.min.assignFrom(pIn.min);
    pOut.max.assignFrom(pIn.max);
    return pOut;
};
