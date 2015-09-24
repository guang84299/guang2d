/**
 * Created by yanchunguang on 15/9/24.
 */

/**
 * @ignore
 */
(function(g){
    g.math.Plane = function (a, b, c, d) {
        if (a && b === undefined) {
            this.a = a.a;
            this.b = a.b;
            this.c = a.c;
            this.d = a.d;
        } else {
            this.a = a || 0;
            this.b = b || 0;
            this.c = c || 0;
            this.d = d || 0;
        }
    };
    g.kmPlane = g.math.Plane;
    var proto = g.math.Plane.prototype;

    g.math.Plane.LEFT = 0;

    g.math.Plane.RIGHT = 1;

    g.math.Plane.BOTTOM = 2;

    g.math.Plane.TOP = 3;

    g.math.Plane.NEAR = 4;

    g.math.Plane.FAR = 5;

    g.math.Plane.POINT_INFRONT_OF_PLANE = 0;

    g.math.Plane.POINT_BEHIND_PLANE = 1;

    g.math.Plane.POINT_ON_PLANE = 2;

    proto.dot = function(vec4){       //g.kmPlaneDot
        return (this.a * vec4.x + this.b * vec4.y + this.c * vec4.z + this.d * vec4.w);
    };

    proto.dotCoord = function(vec3) {   //=g.kmPlaneDotCoord
        return (this.a * vec3.x + this.b * vec3.y + this.c * vec3.z + this.d);
    };

    proto.dotNormal = function(vec3) {    //=g.kmPlaneDotNormal
        return (this.a * vec3.x + this.b * vec3.y + this.c * vec3.z);
    };

    g.math.Plane.fromPointNormal = function(vec3, normal) {   //g.kmPlaneFromPointNormal
        /*
         Planea = Nx
         Planeb = Ny
         Planec = Nz
         Planed = −N⋅P
         */
        return new g.math.Plane(normal.x, normal.y, normal.z, -normal.dot(vec3));
    };

    g.math.Plane.fromPoints = function(vec1, vec2, vec3) {     //g.kmPlaneFromPoints
        /*
         v = (B − A) × (C − A)
         n = 1⁄|v| v
         Outa = nx
         Outb = ny
         Outc = nz
         Outd = −n⋅A
         */
        var  v1 = new g.math.Vec3(vec2), v2 = new g.math.Vec3(vec3), plane = new g.math.Plane();
        v1.subtract(vec1);  //Create the vectors for the 2 sides of the triangle
        v2.subtract(vec1);
        v1.cross(v2); //  Use the cross product to get the normal
        v1.normalize(); //Normalize it and assign to pOut.m_N

        plane.a = v1.x;
        plane.b = v1.y;
        plane.c = v1.z;
        plane.d = v1.scale(-1.0).dot(vec1);
        return plane;
    };

    proto.normalize = function(){     //g.kmPlaneNormalize
        var n = new g.math.Vec3(this.a, this.b, this.c), l = 1.0 / n.length(); //Get 1/length
        n.normalize();  //Normalize the vector and assign to pOut
        this.a = n.x;
        this.b = n.y;
        this.c = n.z;
        this.d = this.d * l; //Scale the D value and assign to pOut
        return this;
    };

    proto.classifyPoint = function(vec3) {
        // This function will determine if a point is on, in front of, or behind
        // the plane.  First we store the dot product of the plane and the point.
        var distance = this.a * vec3.x + this.b * vec3.y + this.c * vec3.z + this.d;

        // Simply put if the dot product is greater than 0 then it is infront of it.
        // If it is less than 0 then it is behind it.  And if it is 0 then it is on it.
        if(distance > 0.001)
            return g.math.Plane.POINT_INFRONT_OF_PLANE;
        if(distance < -0.001)
            return g.math.Plane.POINT_BEHIND_PLANE;
        return g.math.Plane.POINT_ON_PLANE;
    };
})(g);