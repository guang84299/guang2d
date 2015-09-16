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
g.log = g.warn = g.error = g.assert = function () {
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

    g.log(g._renderType + "   " + capabilities);

};

g._setup = function()
{
    g._initSys();

    var canvas = document.getElementById("gameCanvas");
    var cxt = canvas.getContext("2d");
    cxt.fillStyle="#FF0000";
    cxt.fillRect(0,0,150,75);

};

g._setup();