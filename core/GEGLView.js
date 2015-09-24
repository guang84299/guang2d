/**
 * Created by yanchunguang on 15/9/24.
 */

g.Touches = [];
g.TouchesIntergerDict = {};

g.DENSITYDPI_DEVICE = "device-dpi";
g.DENSITYDPI_HIGH = "high-dpi";
g.DENSITYDPI_MEDIUM = "medium-dpi";
g.DENSITYDPI_LOW = "low-dpi";

g.__BrowserGetter = {
    init: function(){
        this.html = document.getElementsByTagName("html")[0];
    },
    availWidth: function(frame){
        if(!frame || frame === this.html)
            return window.innerWidth;
        else
            return frame.clientWidth;
    },
    availHeight: function(frame){
        if(!frame || frame === this.html)
            return window.innerHeight;
        else
            return frame.clientHeight;
    },
    meta: {
        "width": "device-width",
        "user-scalable": "no"
    },
    adaptationType: g.sys.browserType
};

if(window.navigator.userAgent.indexOf("OS 8_1_") > -1) //this mistake like MIUI, so use of MIUI treatment method
    g.__BrowserGetter.adaptationType = g.sys.BROWSER_TYPE_MIUI;

if(g.sys.os === g.sys.OS_IOS) // All browsers are WebView
    g.__BrowserGetter.adaptationType = g.sys.BROWSER_TYPE_SAFARI;

switch(g.__BrowserGetter.adaptationType){
    case g.sys.BROWSER_TYPE_SAFARI:
        g.__BrowserGetter.meta["minimal-ui"] = "true";
        g.__BrowserGetter.availWidth = function(frame){
            return frame.clientWidth;
        };
        g.__BrowserGetter.availHeight = function(frame){
            return frame.clientHeight;
        };
        break;
    case g.sys.BROWSER_TYPE_CHROME:
        g.__BrowserGetter.__defineGetter__("target-densitydpi", function(){
            return g.view._targetDensityDPI;
        });
    case g.sys.BROWSER_TYPE_SOUGOU:
    case g.sys.BROWSER_TYPE_UC:
        g.__BrowserGetter.availWidth = function(frame){
            return frame.clientWidth;
        };
        g.__BrowserGetter.availHeight = function(frame){
            return frame.clientHeight;
        };
        break;
    case g.sys.BROWSER_TYPE_MIUI:
        g.__BrowserGetter.init = function(view){
            if(view.__resizeWithBrowserSize) return;
            var resize = function(){
                view.setDesignResolutionSize(
                    view._designResolutionSize.width,
                    view._designResolutionSize.height,
                    view._resolutionPolicy
                );
                window.removeEventListener("resize", resize, false);
            };
            window.addEventListener("resize", resize, false);
        };
        break;
}

g.EGLView = g.Class.extend(/** @lends g.view# */{
    _delegate: null,
    // Size of parent node that contains g.container and g._canvas
    _frameSize: null,
    // resolution size, it is the size appropriate for the app resources.
    _designResolutionSize: null,
    _originalDesignResolutionSize: null,
    // Viewport is the container's rect related to content's coordinates in pixel
    _viewPortRect: null,
    // The visible rect in content's coordinate in point
    _visibleRect: null,
    _retinaEnabled: false,
    _autoFullScreen: true,
    // The device's pixel ratio (for retina displays)
    _devicePixelRatio: 1,
    // the view name
    _viewName: "",
    // Custom callback for resize event
    _resizeCallback: null,
    _scaleX: 1,
    _originalScaleX: 1,
    _scaleY: 1,
    _originalScaleY: 1,
    _indexBitsUsed: 0,
    _maxTouches: 5,
    _resolutionPolicy: null,
    _rpExactFit: null,
    _rpShowAll: null,
    _rpNoBorder: null,
    _rpFixedHeight: null,
    _rpFixedWidth: null,
    _initialized: false,

    _captured: false,
    _wnd: null,
    _hDC: null,
    _hRC: null,
    _supportTouch: false,
    _contentTranslateLeftTop: null,

    // Parent node that contains g.container and g._canvas
    _frame: null,
    _frameZoomFactor: 1.0,
    __resizeWithBrowserSize: false,
    _isAdjustViewPort: true,
    _targetDensityDPI: null,

    /**
     * Constructor of g.EGLView
     */
    ctor: function () {
        var _t = this, d = document, _strategyer = g.ContainerStrategy, _strategy = g.ContentStrategy;

        g.__BrowserGetter.init(this);

        _t._frame = (g.container.parentNode === d.body) ? d.documentElement : g.container.parentNode;
        _t._frameSize = g.size(0, 0);
        _t._initFrameSize();

        var w = g._canvas.width, h = g._canvas.height;
        _t._designResolutionSize = g.size(w, h);
        _t._originalDesignResolutionSize = g.size(w, h);
        _t._viewPortRect = g.rect(0, 0, w, h);
        _t._visibleRect = g.rect(0, 0, w, h);
        _t._contentTranslateLeftTop = {left: 0, top: 0};
        _t._viewName = "Guang2dHTML5";

        var sys = g.sys;
        _t.enableRetina(sys.os === sys.OS_IOS || sys.os === sys.OS_OSX);
        g.visibleRect && g.visibleRect.init(_t._visibleRect);

        // Setup system default resolution policies
        _t._rpExactFit = new g.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.EXACT_FIT);
        _t._rpShowAll = new g.ResolutionPolicy(_strategyer.PROPORTION_TO_FRAME, _strategy.SHOW_ALL);
        _t._rpNoBorder = new g.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.NO_BORDER);
        _t._rpFixedHeight = new g.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_HEIGHT);
        _t._rpFixedWidth = new g.ResolutionPolicy(_strategyer.EQUAL_TO_FRAME, _strategy.FIXED_WIDTH);

        _t._hDC = g._canvas;
        _t._hRC = g._renderContext;
        _t._targetDensityDPI = g.DENSITYDPI_HIGH;
    },
});