/**
 * Created by yanchunguang on 15/9/24.
 */

g.math = g.math || {};

//g.kmPIOver180 = 0.017453;       please use g.RAD

//g.kmPIUnder180 = 57.295779;     please use g.DEG

g.math.EPSILON = 1.0 / 64.0;         //g.kmEpsilon

/**
 * Returns the square of s (e.g. s*s)
 * @param {Number} s
 */
g.math.square = function(s){
    return s*s;
};

g.math.almostEqual = function(lhs,rhs){
    return (lhs + g.math.EPSILON > rhs && lhs - g.math.EPSILON < rhs);
};
