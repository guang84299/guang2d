/**
 * Created by yanchunguang on 15/9/24.
 */


/**
 * g.Point is the class for point object, please do not use its constructor to create points, use g.p() alias function instead.
 * @class g.Point
 * @param {Number} x
 * @param {Number} y
 * @see g.p
 */
g.Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

/**
 * Helper function that creates a g.Point.
 * @function
 * @param {Number|g.Point} x a Number or a size object
 * @param {Number} y
 * @return {g.Point}
 * @example
 * var point1 = g.p();
 * var point2 = g.p(100, 100);
 * var point3 = g.p(point2);
 * var point4 = g.p({x: 100, y: 100});
 */
g.p = function (x, y) {
    // This can actually make use of "hidden classes" in JITs and thus decrease
    // memory usage and overall performance drastically
    // return g.p(x, y);
    // but this one will instead flood the heap with newly allocated hash maps
    // giving little room for optimization by the JIT,
    // note: we have tested this item on Chrome and firefox, it is faster than g.p(x, y)
    if (x === undefined)
        return {x: 0, y: 0};
    if (y === undefined)
        return {x: x.x, y: x.y};
    return {x: x, y: y};
};

/**
 * Check whether a point's value equals to another
 * @function
 * @param {g.Point} point1
 * @param {g.Point} point2
 * @return {Boolean}
 */
g.pointEqualToPoint = function (point1, point2) {
    return point1 && point2 && (point1.x === point2.x) && (point1.y === point2.y);
};


/**
 * g.Size is the class for size object, please do not use its constructor to create sizes, use g.size() alias function instead.
 * @class g.Size
 * @param {Number} width
 * @param {Number} height
 * @see g.size
 */
g.Size = function (width, height) {
    this.width = width || 0;
    this.height = height || 0;
};

/**
 * Helper function that creates a g.Size.
 * @function
 * @param {Number|g.Size} w width or a size object
 * @param {Number} h height
 * @return {g.Size}
 * @example
 * var size1 = g.size();
 * var size2 = g.size(100,100);
 * var size3 = g.size(size2);
 * var size4 = g.size({width: 100, height: 100});
 */
g.size = function (w, h) {
    // This can actually make use of "hidden classes" in JITs and thus decrease
    // memory usage and overall performance drastically
    //return g.size(w, h);
    // but this one will instead flood the heap with newly allocated hash maps
    // giving little room for optimization by the JIT
    // note: we have tested this item on Chrome and firefox, it is faster than g.size(w, h)
    if (w === undefined)
        return {width: 0, height: 0};
    if (h === undefined)
        return {width: w.width, height: w.height};
    return {width: w, height: h};
};

/**
 * Check whether a point's value equals to another
 * @function
 * @param {g.Size} size1
 * @param {g.Size} size2
 * @return {Boolean}
 */
g.sizeEqualToSize = function (size1, size2) {
    return (size1 && size2 && (size1.width === size2.width) && (size1.height === size2.height));
};


/**
 * g.Rect is the class for rect object, please do not use its constructor to create rects, use g.rect() alias function instead.
 * @class g.Rect
 * @param {Number} width
 * @param {Number} height
 * @see g.rect
 */
g.Rect = function (x, y, width, height) {
    this.x = x||0;
    this.y = y||0;
    this.width = width||0;
    this.height = height||0;
};

/**
 * Helper function that creates a g.Rect.
 * @function
 * @param {Number|g.Rect} x a number or a rect object
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 * @returns {g.Rect}
 * @example
 * var rect1 = g.rect();
 * var rect2 = g.rect(100,100,100,100);
 * var rect3 = g.rect(rect2);
 * var rect4 = g.rect({x: 100, y: 100, width: 100, height: 100});
 */
g.rect = function (x, y, w, h) {
    if (x === undefined)
        return {x: 0, y: 0, width: 0, height: 0};
    if (y === undefined)
        return {x: x.x, y: x.y, width: x.width, height: x.height};
    return {x: x, y: y, width: w, height: h };
};

/**
 * Check whether a rect's value equals to another
 * @function
 * @param {g.Rect} rect1
 * @param {g.Rect} rect2
 * @return {Boolean}
 */
g.rectEqualToRect = function (rect1, rect2) {
    return rect1 && rect2 && (rect1.x === rect2.x) && (rect1.y === rect2.y) && (rect1.width === rect2.width) && (rect1.height === rect2.height);
};

g._rectEqualToZero = function(rect){
    return rect && (rect.x === 0) && (rect.y === 0) && (rect.width === 0) && (rect.height === 0);
};

/**
 * Check whether the rect1 contains rect2
 * @function
 * @param {g.Rect} rect1
 * @param {g.Rect} rect2
 * @return {Boolean}
 */
g.rectContainsRect = function (rect1, rect2) {
    if (!rect1 || !rect2)
        return false;
    return !((rect1.x >= rect2.x) || (rect1.y >= rect2.y) ||
    ( rect1.x + rect1.width <= rect2.x + rect2.width) ||
    ( rect1.y + rect1.height <= rect2.y + rect2.height));
};

/**
 * Returns the rightmost x-value of a rect
 * @function
 * @param {g.Rect} rect
 * @return {Number} The rightmost x value
 */
g.rectGetMaxX = function (rect) {
    return (rect.x + rect.width);
};

/**
 * Return the midpoint x-value of a rect
 * @function
 * @param {g.Rect} rect
 * @return {Number} The midpoint x value
 */
g.rectGetMidX = function (rect) {
    return (rect.x + rect.width / 2.0);
};
/**
 * Returns the leftmost x-value of a rect
 * @function
 * @param {g.Rect} rect
 * @return {Number} The leftmost x value
 */
g.rectGetMinX = function (rect) {
    return rect.x;
};

/**
 * Return the topmost y-value of a rect
 * @function
 * @param {g.Rect} rect
 * @return {Number} The topmost y value
 */
g.rectGetMaxY = function (rect) {
    return(rect.y + rect.height);
};

/**
 * Return the midpoint y-value of `rect'
 * @function
 * @param {g.Rect} rect
 * @return {Number} The midpoint y value
 */
g.rectGetMidY = function (rect) {
    return rect.y + rect.height / 2.0;
};

/**
 * Return the bottommost y-value of a rect
 * @function
 * @param {g.Rect} rect
 * @return {Number} The bottommost y value
 */
g.rectGetMinY = function (rect) {
    return rect.y;
};

/**
 * Check whether a rect contains a point
 * @function
 * @param {g.Rect} rect
 * @param {g.Point} point
 * @return {Boolean}
 */
g.rectContainsPoint = function (rect, point) {
    return (point.x >= g.rectGetMinX(rect) && point.x <= g.rectGetMaxX(rect) &&
    point.y >= g.rectGetMinY(rect) && point.y <= g.rectGetMaxY(rect)) ;
};

/**
 * Check whether a rect intersect with another
 * @function
 * @param {g.Rect} rectA
 * @param {g.Rect} rectB
 * @return {Boolean}
 */
g.rectIntersectsRect = function (ra, rb) {
    var maxax = ra.x + ra.width,
        maxay = ra.y + ra.height,
        maxbx = rb.x + rb.width,
        maxby = rb.y + rb.height;
    return !(maxax < rb.x || maxbx < ra.x || maxay < rb.y || maxby < ra.y);
};

/**
 * Check whether a rect overlaps another
 * @function
 * @param {g.Rect} rectA
 * @param {g.Rect} rectB
 * @return {Boolean}
 */
g.rectOverlapsRect = function (rectA, rectB) {
    return !((rectA.x + rectA.width < rectB.x) ||
    (rectB.x + rectB.width < rectA.x) ||
    (rectA.y + rectA.height < rectB.y) ||
    (rectB.y + rectB.height < rectA.y));
};

/**
 * Returns the smallest rectangle that contains the two source rectangles.
 * @function
 * @param {g.Rect} rectA
 * @param {g.Rect} rectB
 * @return {g.Rect}
 */
g.rectUnion = function (rectA, rectB) {
    var rect = g.rect(0, 0, 0, 0);
    rect.x = Math.min(rectA.x, rectB.x);
    rect.y = Math.min(rectA.y, rectB.y);
    rect.width = Math.max(rectA.x + rectA.width, rectB.x + rectB.width) - rect.x;
    rect.height = Math.max(rectA.y + rectA.height, rectB.y + rectB.height) - rect.y;
    return rect;
};

/**
 * Returns the overlapping portion of 2 rectangles
 * @function
 * @param {g.Rect} rectA
 * @param {g.Rect} rectB
 * @return {g.Rect}
 */
g.rectIntersection = function (rectA, rectB) {
    var intersection = g.rect(
        Math.max(g.rectGetMinX(rectA), g.rectGetMinX(rectB)),
        Math.max(g.rectGetMinY(rectA), g.rectGetMinY(rectB)),
        0, 0);

    intersection.width = Math.min(g.rectGetMaxX(rectA), g.rectGetMaxX(rectB)) - g.rectGetMinX(intersection);
    intersection.height = Math.min(g.rectGetMaxY(rectA), g.rectGetMaxY(rectB)) - g.rectGetMinY(intersection);
    return intersection;
};