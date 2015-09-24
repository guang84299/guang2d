/**
 * Created by yanchunguang on 15/9/24.
 */

g._currentProjectionMatrix = -1;
g._vertexAttribPosition = false;
g._vertexAttribColor = false;
g._vertexAttribTexCoords = false;

if (g.ENABLE_GL_STATE_CACHE) {
    g.MAX_ACTIVETEXTURE = 16;

    g._currentShaderProgram = -1;
    g._currentBoundTexture = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    g._blendingSource = -1;
    g._blendingDest = -1;
    g._GLServerState = 0;
    if(g.TEXTURE_ATLAS_USE_VAO)
        g._uVAO = 0;
}

g.glDeleteProgram = function (program) {
    if (g.ENABLE_GL_STATE_CACHE) {
        if (program === g._currentShaderProgram)
            g._currentShaderProgram = -1;
    }
    gl.deleteProgram(program);
};


g.glUseProgram = function (program) {
    if (program !== g._currentShaderProgram) {
        g._currentShaderProgram = program;
        g._renderContext.useProgram(program);
    }
};

g.glEnableVertexAttribs = function (flags) {
    /* Position */
    var ctx = g._renderContext;
    var enablePosition = ( flags & g.VERTEX_ATTRIB_FLAG_POSITION );
    if (enablePosition !== g._vertexAttribPosition) {
        if (enablePosition)
            ctx.enableVertexAttribArray(g.VERTEX_ATTRIB_POSITION);
        else
            ctx.disableVertexAttribArray(g.VERTEX_ATTRIB_POSITION);
        g._vertexAttribPosition = enablePosition;
    }

    /* Color */
    var enableColor = (flags & g.VERTEX_ATTRIB_FLAG_COLOR);
    if (enableColor !== g._vertexAttribColor) {
        if (enableColor)
            ctx.enableVertexAttribArray(g.VERTEX_ATTRIB_COLOR);
        else
            ctx.disableVertexAttribArray(g.VERTEX_ATTRIB_COLOR);
        g._vertexAttribColor = enableColor;
    }

    /* Tex Coords */
    var enableTexCoords = (flags & g.VERTEX_ATTRIB_FLAG_TEX_COORDS);
    if (enableTexCoords !== g._vertexAttribTexCoords) {
        if (enableTexCoords)
            ctx.enableVertexAttribArray(g.VERTEX_ATTRIB_TEX_COORDS);
        else
            ctx.disableVertexAttribArray(g.VERTEX_ATTRIB_TEX_COORDS);
        g._vertexAttribTexCoords = enableTexCoords;
    }
};