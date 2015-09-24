/**
    Created by yanchunguang on 15/9/24.
 */

(function(g) {
    g.KM_GL_MODELVIEW = 0x1700;
    g.KM_GL_PROJECTION = 0x1701;
    g.KM_GL_TEXTURE = 0x1702;

    g.modelview_matrix_stack = new g.math.Matrix4Stack();
    g.projection_matrix_stack = new g.math.Matrix4Stack();
    g.texture_matrix_stack = new g.math.Matrix4Stack();

    g.current_stack = null;
    var initialized = false;

    g.lazyInitialize = function () {
        if (!initialized) {
            var identity = new g.math.Matrix4(); //Temporary identity matrix

            //Initialize all 3 stacks
            g.modelview_matrix_stack.initialize();
            g.projection_matrix_stack.initialize();
            g.texture_matrix_stack.initialize();

            g.current_stack = g.modelview_matrix_stack;
            g.initialized = true;
            identity.identity();

            //Make sure that each stack has the identity matrix
            g.modelview_matrix_stack.push(identity);
            g.projection_matrix_stack.push(identity);
            g.texture_matrix_stack.push(identity);
        }
    };

    g.lazyInitialize();

    g.kmGLFreeAll = function () {
        //Clear the matrix stacks
        g.modelview_matrix_stack.release();
        g.modelview_matrix_stack = null;
        g.projection_matrix_stack.release();
        g.projection_matrix_stack = null;
        g.texture_matrix_stack.release();
        g.texture_matrix_stack = null;

        //Delete the matrices
        g.initialized = false; //Set to uninitialized
        g.current_stack = null; //Set the current stack to point nowhere
    };

    g.kmGLPushMatrix = function () {
        g.current_stack.push(g.current_stack.top);
    };

    g.kmGLPushMatrixWitMat4 = function (saveMat) {
        g.current_stack.stack.push(g.current_stack.top);
        saveMat.assignFrom(g.current_stack.top);
        g.current_stack.top = saveMat;
    };

    g.kmGLPopMatrix = function () {
        //No need to lazy initialize, you shouldnt be popping first anyway!
        //g.km_mat4_stack_pop(g.current_stack, null);
        g.current_stack.top = g.current_stack.stack.pop();
    };

    g.kmGLMatrixMode = function (mode) {
        //g.lazyInitialize();
        switch (mode) {
            case g.KM_GL_MODELVIEW:
                g.current_stack = g.modelview_matrix_stack;
                break;
            case g.KM_GL_PROJECTION:
                g.current_stack = g.projection_matrix_stack;
                break;
            case g.KM_GL_TEXTURE:
                g.current_stack = g.texture_matrix_stack;
                break;
            default:
                throw new Error("Invalid matrix mode specified");   //TODO: Proper error handling
                break;
        }
    };

    g.kmGLLoadIdentity = function () {
        //g.lazyInitialize();
        g.current_stack.top.identity(); //Replace the top matrix with the identity matrix
    };

    g.kmGLLoadMatrix = function (pIn) {
        //g.lazyInitialize();
        g.current_stack.top.assignFrom(pIn);
    };

    g.kmGLMultMatrix = function (pIn) {
        //g.lazyInitialize();
        g.current_stack.top.multiply(pIn);
    };

    var tempMatrix = new g.math.Matrix4();    //an internal matrix
    g.kmGLTranslatef = function (x, y, z) {
        //Create a rotation matrix using translation
        var translation = g.math.Matrix4.createByTranslation(x, y, z, tempMatrix);

        //Multiply the rotation matrix by the current matrix
        g.current_stack.top.multiply(translation);
    };

    var tempVector3 = new g.math.Vec3();
    g.kmGLRotatef = function (angle, x, y, z) {
        tempVector3.fill(x, y, z);
        //Create a rotation matrix using the axis and the angle
        var rotation = g.math.Matrix4.createByAxisAndAngle(tempVector3, g.degreesToRadians(angle), tempMatrix);

        //Multiply the rotation matrix by the current matrix
        g.current_stack.top.multiply(rotation);
    };

    g.kmGLScalef = function (x, y, z) {
        var scaling = g.math.Matrix4.createByScale(x, y, z, tempMatrix);
        g.current_stack.top.multiply(scaling);
    };

    g.kmGLGetMatrix = function (mode, pOut) {
        //g.lazyInitialize();
        switch (mode) {
            case g.KM_GL_MODELVIEW:
                pOut.assignFrom(g.modelview_matrix_stack.top);
                break;
            case g.KM_GL_PROJECTION:
                pOut.assignFrom(g.projection_matrix_stack.top);
                break;
            case g.KM_GL_TEXTURE:
                pOut.assignFrom(g.texture_matrix_stack.top);
                break;
            default:
                throw new Error("Invalid matrix mode specified"); //TODO: Proper error handling
                break;
        }
    };
})(g);
