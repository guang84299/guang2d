/**
 * Created by yanchunguang on 15/9/24.
 */


(function(g){
    g.math.Ray2 = function (start, dir) {   // = g.kmRay2
        this.start = start || new g.math.Vec2();
        this.dir = dir || new g.math.Vec2();
    };

    g.math.Ray2.prototype.fill = function (px, py, vx, vy) {   // = g.kmRay2Fill
        this.start.x = px;
        this.start.y = py;
        this.dir.x = vx;
        this.dir.y = vy;
    };

    g.math.Ray2.prototype.intersectLineSegment = function (p1, p2, intersection) {   // = g.kmRay2IntersectLineSegment
        var x1 = this.start.x, y1 = this.start.y;
        var x2 = this.start.x + this.dir.x, y2 = this.start.y + this.dir.y;
        var x3 = p1.x, y3 = p1.y;
        var x4 = p2.x, y4 = p2.y;

        var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        var ua, x, y;
        //If denom is zero, the lines are parallel
        if (denom > -g.math.EPSILON && denom < g.math.EPSILON)
            return false;

        ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
        //var ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

        x = x1 + ua * (x2 - x1);
        y = y1 + ua * (y2 - y1);

        if (x < Math.min(p1.x, p2.x) - g.math.EPSILON ||
            x > Math.max(p1.x, p2.x) + g.math.EPSILON ||
            y < Math.min(p1.y, p2.y) - g.math.EPSILON ||
            y > Math.max(p1.y, p2.y) + g.math.EPSILON) {
            //Outside of line
            //printf("Outside of line, %f %f (%f %f)(%f, %f)\n", x, y, p1.x, p1.y, p2.x, p2.y);
            return false;
        }

        if (x < Math.min(x1, x2) - g.math.EPSILON ||
            x > Math.max(x1, x2) + g.math.EPSILON ||
            y < Math.min(y1, y2) - g.math.EPSILON ||
            y > Math.max(y1, y2) + g.math.EPSILON) {
            //printf("Outside of ray, %f %f (%f %f)(%f, %f)\n", x, y, x1, y1, x2, y2);
            return false;
        }

        intersection.x = x;
        intersection.y = y;
        return true;
    };

    function calculate_line_normal(p1, p2, normalOut){
        var tmp = new g.math.Vec2(p2);
        tmp.subtract(p1);

        normalOut.x = -tmp.y;
        normalOut.y = tmp.x;
        normalOut.normalize();
        //TODO: should check that the normal is pointing out of the triangle
    }

    g.math.Ray2.prototype.intersectTriangle = function(p1, p2, p3, intersection, normal_out){
        var intersect = new g.math.Vec2(), final_intersect = new g.math.Vec2();
        var normal = new g.math.Vec2(), distance = 10000.0, intersected = false;
        var this_distance;

        if(this.intersectLineSegment(p1, p2, intersect)) {
            intersected = true;
            this_distance = intersect.subtract(this.start).length();
            if(this_distance < distance) {
                final_intersect.x = intersect.x;
                final_intersect.y = intersect.y;
                distance = this_distance;
                calculate_line_normal(p1, p2, normal);
            }
        }

        if(this.intersectLineSegment(p2, p3, intersect)) {
            intersected = true;
            this_distance = intersect.subtract(this.start).length();
            if(this_distance < distance) {
                final_intersect.x = intersect.x;
                final_intersect.y = intersect.y;
                distance = this_distance;
                calculate_line_normal(p2, p3, normal);
            }
        }

        if(this.intersectLineSegment(p3, p1, intersect)) {
            intersected = true;
            this_distance = intersect.subtract(this.start).length();
            if(this_distance < distance) {
                final_intersect.x = intersect.x;
                final_intersect.y = intersect.y;
                distance = this_distance;
                calculate_line_normal(p3, p1, normal);
            }
        }

        if(intersected) {
            intersection.x = final_intersect.x;
            intersection.y = final_intersect.y;
            if(normal_out) {
                normal_out.x = normal.x;
                normal_out.y = normal.y;
            }
        }
        return intersected;
    };
})(g);