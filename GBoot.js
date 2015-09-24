/**
 * Created by yanchunguang on 15/9/16.
 */

var g = g || {};

g.CONFIG = {
    "debugMode" : 1,
    "showFPS" : true,
    "frameRate" : 60,
    "id" : "gameCanvas",
    "renderMode" : 0
};

g.newElement = function(ele)
{
   return document.createElement(ele);
};
g._addEventListener = function (element, type, listener, useCapture) {
    element.addEventListener(type, listener, useCapture);
};
g.log = g.warn = g.error = g.assert = function () {
};
//遍历对象或数组
g.each = function (obj, iterator, context) {
    if (!obj)
        return;
    if (obj instanceof Array) {
        for (var i = 0, li = obj.length; i < li; i++) {
            if (iterator.call(context, obj[i], i) === false)
                return;
        }
    } else {
        for (var key in obj) {
            if (iterator.call(context, obj[key], key) === false)
                return;
        }
    }
};

/**
 * create a webgl context
 * @param {HTMLCanvasElement} canvas
 * @param {Object} opt_attribs
 * @return {WebGLRenderingContext}
 */
g.create3DContext = function (canvas, opt_attribs) {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
        try {
            context = canvas.getContext(names[ii], opt_attribs);
        } catch (e) {
        }
        if (context) {
            break;
        }
    }
    return context;
};

g._initSys = function()
{
    //Canvas of render type
    g._RENDER_TYPE_CANVAS = 0;
    g._RENDER_TYPE_WEBGL = 1;

    //System variables
    g.sys = {};
    var sys = g.sys;

    //language
    sys.LANGUAGE_ENGLISH = "en";
    sys.LANGUAGE_CHINESE = "zh";

    //os type
    sys.OS_IOS = "iOS";
    sys.OS_ANDROID = "Android";
    sys.OS_WINDOWS = "Windows";
    sys.OS_LINUX = "Linux";
    sys.OS_BLACKBERRY = "Blackberry";
    sys.OS_OSX = "OS X";
    sys.OS_WP8 = "WP8";
    sys.OS_WINRT = "WINRT";
    sys.OS_UNKNOWN = "Unknown";

    //platform type
    sys.UNKNOWN = -1;
    sys.WIN32 = 0;
    sys.LINUX = 1;
    sys.MACOS = 2;
    sys.ANDROID = 3;
    sys.IPHONE = 4;
    sys.IPAD = 5;
    sys.BLACKBERRY = 6;
    sys.WINRT = 7;
    sys.WP8 = 8;

    //BROWSER type
    sys.MOBILE_BROWSER = 100;
    sys.DESKTOP_BROWSER = 101;

    sys.BROWSER_TYPE_WECHAT = "wechat";
    sys.BROWSER_TYPE_ANDROID = "androidbrowser";
    sys.BROWSER_TYPE_IE = "ie";
    sys.BROWSER_TYPE_QQ = "qqbrowser";
    sys.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
    sys.BROWSER_TYPE_UC = "ucbrowser";
    sys.BROWSER_TYPE_360 = "360browser";
    sys.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
    sys.BROWSER_TYPE_BAIDU = "baidubrowser";
    sys.BROWSER_TYPE_MAXTHON = "maxthon";
    sys.BROWSER_TYPE_OPERA = "opera";
    sys.BROWSER_TYPE_OUPENG = "oupeng";
    sys.BROWSER_TYPE_MIUI = "miuibrowser";
    sys.BROWSER_TYPE_FIREFOX = "firefox";
    sys.BROWSER_TYPE_SAFARI = "safari";
    sys.BROWSER_TYPE_CHROME = "chrome";
    sys.BROWSER_TYPE_LIEBAO = "liebao";
    sys.BROWSER_TYPE_QZONE = "qzone";
    sys.BROWSER_TYPE_SOUGOU = "sogou";
    sys.BROWSER_TYPE_UNKNOWN = "unknown";

    sys.isNative = false;

    var win = window, nav = win.navigator, doc = document, docEle = doc.documentElement;
    var ua = nav.userAgent.toLowerCase();

    //Indicate whether system is mobile system
    sys.isMobile = ua.indexOf('mobile') !== -1 || ua.indexOf('android') !== -1;

    //Indicate the running platform
    sys.platform = sys.isMobile ? sys.MOBILE_BROWSER : sys.DESKTOP_BROWSER;

    var currLanguage = nav.language;
    currLanguage = currLanguage ? currLanguage : nav.browserLanguage;
    currLanguage = currLanguage ? currLanguage.split("-")[0] : sys.LANGUAGE_ENGLISH;

    sys.language = currLanguage;

    var iOS = ( ua.match(/(iPad|iPhone|iPod)/i) ? true : false );
    var isAndroid = ua.match(/android/i) || nav.platform.match(/android/i) ? true : false;
    var osName = sys.OS_UNKNOWN;
    if (nav.appVersion.indexOf("Win") !== -1) osName = sys.OS_WINDOWS;
    else if (iOS) osName = sys.OS_IOS;
    else if (nav.appVersion.indexOf("Mac") !== -1) osName = sys.OS_OSX;
    else if (nav.appVersion.indexOf("X11") !== -1 && nav.appVersion.indexOf("Linux") === -1) osName = sys.OS_UNIX;
    else if (isAndroid) osName = sys.OS_ANDROID;
    else if (nav.appVersion.indexOf("Linux") !== -1) osName = sys.OS_LINUX;

    // Indicate the running os name
    sys.os = osName;

    /* Determine the browser type */
    var browserType = sys.BROWSER_TYPE_UNKNOWN;
    var browserTypes = ua.match(/sogou|qzone|liebao|micromessenger|qqbrowser|ucbrowser|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|trident|oupeng|opera|miuibrowser|firefox/i)
        || ua.match(/chrome|safari/i);
    if (browserTypes && browserTypes.length > 0) {
        browserType = browserTypes[0];
        if (browserType === 'micromessenger') {
            browserType = sys.BROWSER_TYPE_WECHAT;
        } else if (browserType === "safari" && (ua.match(/android.*applewebkit/)))
            browserType = sys.BROWSER_TYPE_ANDROID;
        else if (browserType === "trident") browserType = sys.BROWSER_TYPE_IE;
        else if (browserType === "360 aphone") browserType = sys.BROWSER_TYPE_360;
    }else if(ua.indexOf("iphone") && ua.indexOf("mobile")){
        browserType = sys.BROWSER_TYPE_SAFARI;
    }

    /* Determine the browser version number */
    var browserVersion, tmp = null;
    switch(browserType){
        case sys.BROWSER_TYPE_IE:
            tmp = ua.match(/(msie |rv:)([\d.]+)/);
            break;
        case sys.BROWSER_TYPE_FIREFOX:
            tmp = ua.match(/(firefox\/|rv:)([\d.]+)/);
            break;
        case sys.BROWSER_TYPE_CHROME:
            tmp = ua.match(/chrome\/([\d.]+)/);
            break;
        case sys.BROWSER_TYPE_BAIDU:
            tmp = ua.match(/baidubrowser\/([\d.]+)/);
            break;
        case sys.BROWSER_TYPE_UC:
            tmp = ua.match(/ucbrowser\/([\d.]+)/);
            break;
        case sys.BROWSER_TYPE_QQ:
            tmp = ua.match(/qqbrowser\/([\d.]+)/);
            break;
        case sys.BROWSER_TYPE_OUPENG:
            tmp = ua.match(/oupeng\/([\d.]+)/);
            break;
        case sys.BROWSER_TYPE_WECHAT:
            tmp = ua.match(/micromessenger\/([\d.]+)/);
            break;
        case sys.BROWSER_TYPE_SAFARI:
            tmp = ua.match(/safari\/([\d.]+)/);
            break;
        case sys.BROWSER_TYPE_MIUI:
            tmp = ua.match(/miuibrowser\/([\d.]+)/);
            break;
    }
    browserVersion = tmp ? tmp[1] : "";

    //Indicate the running browser type
    sys.browserType = browserType;

    sys.browserVersion = browserVersion;

    var w = window.innerWidth || document.documentElement.clientWidth;
    var h = window.innerHeight || document.documentElement.clientHeight;
    var ratio = window.devicePixelRatio || 1;

    //Indicate the real pixel resolution of the whole game window
    sys.windowPixelResolution = {
        width: ratio * w,
        height: ratio * h
    };

    //判断是否支持webgl  g._renderType g._supportRender
    (function(){
        var userRenderMode = g.CONFIG.renderMode - 0;
        if(isNaN(userRenderMode) || userRenderMode > 2 || userRenderMode < 0)
            userRenderMode = 0;
        var tmpCanvas = g.newElement("canvas");
        g._renderType = g._RENDER_TYPE_CANVAS;
        g._supportRender = false;

        var supportWebGL = win.WebGLRenderingContext;

        if(userRenderMode === 2 || (userRenderMode === 0 && supportWebGL))
            try{
                var context = g.create3DContext(tmpCanvas, {'stencil': true, 'preserveDrawingBuffer': true });
                if(context){
                    g._renderType = g._RENDER_TYPE_WEBGL;
                    g._supportRender = true;
                }
            }catch(e){}

        if(userRenderMode === 1 || (userRenderMode === 0 && g._supportRender === false))
            try {
                tmpCanvas.getContext("2d");
                g._renderType = g._RENDER_TYPE_CANVAS;
                g._supportRender = true;
            } catch (e) {}
    })();

    sys._canUseCanvasNewBlendModes = function(){
        var canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        var context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0,0,1,1);
        context.globalCompositeOperation = 'multiply';

        var canvas2 = document.createElement('canvas');
        canvas2.width = 1;
        canvas2.height = 1;
        var context2 = canvas2.getContext('2d');
        context2.fillStyle = '#fff';
        context2.fillRect(0,0,1,1);

        context.drawImage(canvas2, 0, 0, 1, 1);

        return context.getImageData(0,0,1,1).data[0] === 0;
    };

    //Whether or not the Canvas BlendModes are supported.
    sys._supportCanvasNewBlendModes = sys._canUseCanvasNewBlendModes();

    //本地存储
    try {
        var localStorage = sys.localStorage = win.localStorage;
        localStorage.setItem("storage", "");
        localStorage.removeItem("storage");
        localStorage = null;
    } catch (e) {
        var warn = function () {
            g.warn("Warning: localStorage isn't enabled. Please confirm browser cookie or privacy option");
        };
        sys.localStorage = {
            getItem : warn,
            setItem : warn,
            removeItem : warn,
            clear : warn
        };
    }

    var capabilities = sys.capabilities = {"canvas": true};
    if (g._renderType === g._RENDER_TYPE_WEBGL)
        capabilities["opengl"] = true;
    if (docEle['ontouchstart'] !== undefined || doc['ontouchstart'] !== undefined || nav.msPointerEnabled)
        capabilities["touches"] = true;
    if (docEle['onmouseup'] !== undefined)
        capabilities["mouse"] = true;
    if (docEle['onkeyup'] !== undefined)
        capabilities["keyboard"] = true;
    if (win.DeviceMotionEvent || win.DeviceOrientationEvent)
        capabilities["accelerometer"] = true;

    //Dump system informations
    sys.dump = function () {
        var self = this;
        var str = "";
        str += "isMobile : " + self.isMobile + "\r\n";
        str += "language : " + self.language + "\r\n";
        str += "browserType : " + self.browserType + "\r\n";
        str += "capabilities : " + JSON.stringify(self.capabilities) + "\r\n";
        str += "os : " + self.os + "\r\n";
        str += "platform : " + self.platform + "\r\n";
        g.log(str);
    };

    //Open a url in browser
    sys.openURL = function(url){
        window.open(url);
    };

};

g.path = {
    join : function()
    {
        var l = arguments.length;
        var result = "";
        for (var i = 0; i < l; i++) {
            result = (result + (result === "" ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
        }
        return result;
    }
};

/**
 * 异步加载辅助
 * @param {Object|Array} srcObj
 * @param {Number} limit the limit of parallel number
 * @param {function} iterator
 * @param {function} onEnd
 * @param {object} target
 * @constructor
 */
g.AsyncPool = function(srcObj, limit, iterator, onEnd, target)
{
    var self = this;
    self._srcObj = srcObj;
    self._limit = limit;
    self._pool = [];
    self._iterator = iterator;
    self._iteratorTarget = target;
    self._onEnd = onEnd;
    self._onEndTarget = target;
    self._results = srcObj instanceof Array ? [] : {};

    g.each(srcObj,function(value,index){
        self._pool.push({index : index, value : value});
    });

    self._size = self._pool.length;
    self._finishedsize = 0;
    self._workingsize = 0;

    self._limit = self._limit || self._size;

    self._handleItem = function()
    {
        var self = this;
        if(self._pool.length === 0 || self._workingsize >= self._limit)
            return;

        var item = self._pool.shift();
        var value = item.value,index = item.index;

        self._workingsize++;

        self._iterator.call(self._iteratorTarget,value, index,function(err){
            self._finishedsize++;
            self._workingsize--;

            var arr = Array.prototype.slice.call(arguments, 1);
            self._results[this.index] = arr[0];
            if (self._finishedsize === self._size) {
                if (self._onEnd)
                    self._onEnd.call(self._onEndTarget, null, self._results);
                return;
            }
            self._handleItem();
        }.bind(item),self);
    };

    self.flow = function(){
        var self = this;
        if(self._pool.length === 0) {
            if(self._onEnd)
                self._onEnd.call(self._onEndTarget, null, []);
            return;
        }
        for(var i = 0; i < self._limit; i++)
            self._handleItem();
    }
};

g.async =
{
    map : function(tasks, iterator, callback, target){
        var locIterator = iterator;
        if(typeof(iterator) === "object"){
            callback = iterator.cb;
            target = iterator.iteratorTarget;
            locIterator = iterator.iterator;
        }
        var asyncPool = new g.AsyncPool(tasks, 0, locIterator, callback, target);
        asyncPool.flow();
        return asyncPool;
    }
};

g.load = {
    _jsCache : {},//js 缓存
    imgCache : {},//图片缓存


    loadJs : function(baseDir,jsList,cb)
    {
        var self = this, localJsCache = self._jsCache;
        g.async.map(jsList,function(item, index, cb1){
            var jsPath = g.path.join(baseDir, item);
            if (localJsCache[jsPath]) return cb1(null);
            self._createScript(jsPath, false, cb1);
        },cb);
    },

    loadText : function(url,cb)
    {
        var xhr = this.getXMLHttpRequest(),
            errInfo = "load " + url + " failed!";
        xhr.open("GET", url, true);
        if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
            // IE-specific logic here
            xhr.setRequestHeader("Accept-Charset", "utf-8");
            xhr.onreadystatechange = function () {
                if(xhr.readyState === 4)
                    xhr.status === 200 ? cb(null, xhr.responseText) : cb(errInfo);
            };
        } else {
            if (xhr.overrideMimeType) xhr.overrideMimeType("text\/plain; charset=utf-8");
            xhr.onload = function () {
                if(xhr.readyState === 4)
                    xhr.status === 200 ? cb(null, xhr.responseText) : cb(errInfo);
            };
        }
        xhr.send(null);
    },

    loadImg : function(url,cb)
    {
        var self = this;
        var img = self.imgCache[url];
        if(img)
        {
            if(cb) cb("load image success",url);
            return img;
        }

        img = new Image();
        var loadCallback = function () {
            this.removeEventListener('load', loadCallback, false);
            this.removeEventListener('error', errorCallback, false);

            if(cb) cb("load image success",url);
        };

        var errorCallback = function () {
            this.removeEventListener('error', errorCallback, false);
            typeof cb === "function" && cb("load image failed",url);
        };

        g._addEventListener(img, "load", loadCallback);
        g._addEventListener(img, "error", errorCallback);
        img.src = url;
        return img;
    },

    _createScript : function(jsPath,isAsync,cb)
    {
        var s = g.newElement("script");
        s.async = isAsync;
        this._jsCache[jsPath] = true;
        s.src = jsPath;

        g._addEventListener(s,"load",function(){
            s.parentNode.removeChild(s);
            this.removeEventListener('load', arguments.callee, false);
            cb();
        },false);
        g._addEventListener(s,"error",function(){
            s.parentNode.removeChild(s);
            cb("Load " + jsPath + " failed!");
        },false);

        document.body.appendChild(s);
    },

    getXMLHttpRequest: function () {
        return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
    },

    getRes : function(url)
    {
        return this._jsCache[url];
    }
};

g.game = {
    //debug 模式
    DEBUG_MODE_NONE: 0,
    DEBUG_MODE_INFO: 1,
    DEBUG_MODE_WARN: 2,
    DEBUG_MODE_ERROR: 3,
    DEBUG_MODE_INFO_FOR_WEB_PAGE: 4,
    DEBUG_MODE_WARN_FOR_WEB_PAGE: 5,
    DEBUG_MODE_ERROR_FOR_WEB_PAGE: 6,

    EVENT_HIDE: "game_on_hide",
    EVENT_SHOW: "game_on_show",
    EVENT_RESIZE: "game_on_resize",
    _eventHide: null,
    _eventShow: null,
    _intervalId: null,//interval target of main

    _paused : true, //游戏是否暂停
    _prepared : false, //是否加载完成

    _lastTime: null,
    _frameTime: null,

    setFrameRate: function (frameRate) {
        var self = this;
        if (self._intervalId)
            window.cancelAnimationFrame(self._intervalId);
        self._paused = true;
        self._setAnimFrame();
        self._runMainLoop();
    },
    _setAnimFrame: function () {
        this._lastTime = new Date();
        this._frameTime = 1000 / g.CONFIG.frameRate;
        if((g.sys.os === g.sys.OS_IOS && g.sys.browserType === g.sys.BROWSER_TYPE_WECHAT) || g.CONFIG.frameRate !== 60) {
            window.requestAnimFrame = this._stTime;
            window.cancelAnimationFrame = this._ctTime;
        }
        else {
            window.requestAnimFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            this._stTime;
            window.cancelAnimationFrame = window.cancelAnimationFrame ||
            window.cancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.msCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.oCancelAnimationFrame ||
            this._ctTime;
        }
    },
    _stTime: function(callback){
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, g.game._frameTime - (currTime - g.game._lastTime));
        var id = window.setTimeout(function() { callback(); },
            timeToCall);
        g.game._lastTime = currTime + timeToCall;
        return id;
    },
    _ctTime: function(id){
        window.clearTimeout(id);
    },

    _runMainLoop : function()
    {
        var self = this;
      //  g.director.setDisplayStats(g.CONFIG.showFPS);
        var i = 0;
        var callback = function () {
            if (!self._paused) {
                //g.director.mainLoop();
                console.log(++i);

                g._renderContext.clearColor(0.0, 0.0, 0.0, 1.0);
                g._renderContext.clear(g._renderContext.COLOR_BUFFER_BIT);

                if(self._intervalId)
                    window.cancelAnimationFrame(self._intervalId);
                self._intervalId = window.requestAnimFrame(callback);
            }
        };

        window.requestAnimFrame(callback);
        self._paused = false;
    },
    /*
    * 开始游戏
    * */
    run : function()
    {
        var self = this;
        var _run = function()
        {
            if (g._supportRender) {
                self._checkPrepare = setInterval(function () {
                    if (self._prepared) {
                        g._setup();
                        self._runMainLoop();
                       /* self._eventHide = self._eventHide || new cc.EventCustom(self.EVENT_HIDE);
                        self._eventHide.setUserData(self);
                        self._eventShow = self._eventShow || new cc.EventCustom(self.EVENT_SHOW);
                        self._eventShow.setUserData(self);
                        self.onStart();*/
                        clearInterval(self._checkPrepare);
                    }
                }, 10);
            }
        };
        document.body ?
            _run() :
            g._addEventListener(window, 'load', function () {
                this.removeEventListener('load', arguments.callee, false);
                _run();
            }, false);
    },

    _initConfig : function()
    {
        g._initSys();
    }
};
g.game._initConfig();

g._canvas = null;
g.container = null;
g._renderContext = null;
g.webglContext = null;
g._drawingUtil = null;

g._setup = function()
{
    g.game._setAnimFrame();

    var canvas = document.getElementById(g.CONFIG.id);
    var localCanvas = g._canvas = canvas;
    if (g._renderType === g._RENDER_TYPE_WEBGL)
        g._renderContext = g.webglContext = g.create3DContext(localCanvas, {
            'stencil': true,
            'preserveDrawingBuffer': true,
            'antialias': !g.sys.isMobile,
            'alpha': true
        });
    if (g._renderContext) {
        window.gl = g._renderContext;
        g._renderContext.viewport(0, 0, canvas.width, canvas.height);
        //g._renderContext.fillRect(0,0,150,75);
         g._drawingUtil = new g.DrawingPrimitiveWebGL(g._renderContext);
        g._rendererInitialized = true;
       // g.textureCache._initializingRenderer();
        g.shaderCache._init();
    } else {
       // g._renderContext = new g.CanvasContextWrapper(localCanvas.getContext("2d"));
       // g._drawingUtil = g.DrawingPrimitiveCanvas ? new g.DrawingPrimitiveCanvas(g._renderContext) : null;
    }

    if (g.sys.isMobile) {
        var fontStyle = g.newElement("style");
        fontStyle.type = "text/css";
        document.body.appendChild(fontStyle);

        fontStyle.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;"
        + "-webkit-tap-highlight-color:rgba(0,0,0,0);}";
    }
};

g.game.run();
var list = [
    "guang2d/GDebugger.js",
    "guang2d/core/DrawingPrimitiveWebGL.js",
    "guang2d/core/GClass.js",
    "guang2d/core/GConfig.js",
    "guang2d/core/GMacro.js",
    "guang2d/core/shaders/GGLProgram.js",
    "guang2d/core/shaders/GGLStateCache.js",
    "guang2d/core/shaders/GShader.js",
    "guang2d/core/shaders/GShaderCache.js",
    "guang2d/core/utils/sprintf.js",
    ];
g.load.loadJs("src",list,function(){
    g.game._prepared = true;
    console.log(g.game._prepared);
});

