/**
 * This is an auto-generated code by Monaca JS/CSS Components.
 * Please do not edit by hand.
 */

/*** <GENERATED> ***//*** <Start:monaca-cordova-loader> ***/
/*** <Start:monaca-cordova-loader LoadJs:"components/monaca-cordova-loader/cordova-loader.js"> ***/
(function(){
  if ((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPhone|iPad|iPod/i))) {
    if (typeof location.href === "string") {
      var relativePath = location.href.split("/www")[1];
      var paths = relativePath.split("/");
      var cordovaJsUrl = ""; 
      for (var i = 0; i < paths.length - 2; i++) {
        cordovaJsUrl += "../";
      }
      document.write("<script src=\"" + cordovaJsUrl+ "cordova.js" + "\"></script>");
    }
  } else if ((navigator.userAgent.match(/MSIE\s10.0/)) && (navigator.userAgent.match(/Windows\sNT\s6.2/))) {
    var elm = document.createElement('script');
    elm.setAttribute("src", "cordova.js");
    document.getElementsByTagName("head")[0].appendChild(elm);
  };
})();
;
/*** <End:monaca-cordova-loader LoadJs:"components/monaca-cordova-loader/cordova-loader.js"> ***/
/*** <End:monaca-cordova-loader> ***/

/*** <Start:monaca-core-utils> ***/
/*** <Start:monaca-core-utils LoadJs:"components/monaca-core-utils/monaca-core-utils.js"> ***/
/**
 * Monaca Core Utility Library
 * This library requires cordova.js
 *
 * @version 2.0.7
 * @author  Asial Corporation
 */
window.monaca = window.monaca || {};

(function() {
    /*
     * monaca api queue.
     */
    monaca.apiQueue = monaca.apiQueue || {};
    monaca.apiQueue.paramsArray = [];
    monaca.apiQueue.exec = function(a,b,c,d,e){
        if (!monaca.isDeviceReady) {
            monaca.apiQueue.paramsArray.push([a,b,c,d,e]);
        } else {
            window.cordova.exec(a,b,c,d,e);
        }
    };
    monaca.apiQueue.next = function(){
        var params = monaca.apiQueue.paramsArray.shift();
        if (params) {
            window.cordova.exec(
                function(r) {
                  if (typeof params[0] === 'function') params[0](r);
                  monaca.apiQueue.next();
                },
                function(r) {
                  if (typeof params[1] === 'function') params[1](r);
                  monaca.apiQueue.next();
                },
                params[2],
                params[3],
                params[4]
            );
        }
    };

    monaca.isDeviceReady = monaca.isDeviceReady || false;
    document.addEventListener('deviceready', function(){
        window.monaca.isDeviceReady = true;
        monaca.apiQueue.next();
    }, false);

    /**
     * Check User-Agent
     */
    var isAndroid = !!(navigator.userAgent.match(/Android/i));
    var isIOS     = !!(navigator.userAgent.match(/iPhone|iPad|iPod/i));
    monaca.isAndroid = isAndroid;
    monaca.isIOS     = isIOS;

    /**
     * Obtain style property
     */
    monaca.retrieveUIStyle = function() {
        var argsArray = [].slice.apply(arguments);
        monaca.apiQueue.exec(arguments[arguments.length-1], null, "mobi.monaca.nativecomponent", "retrieve", argsArray);
    };

    /**
     * Update style property
     */
    monaca.updateUIStyle = function(id, name, value) {
        if (typeof id == "string") {
            var argsArray = [].slice.apply(arguments);
            monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", "update", argsArray);
        } else {
            for (var i = 0; i < id.length; i++) {
                monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", "update", [id[i], name, value]);
            }
        }
    };

    if (isAndroid) {
        monaca.retrieveUIStyle = function(id, name, success, failure) {
            monaca.apiQueue.exec(
                function(style) { success(style[name]); } || function() { },
                failure || function() { },
                "mobi.monaca.nativecomponent",
                "retrieve",
                [id]
            );
        };

        monaca.updateUIStyle = function(id, name, value, success, failure) {
            var style = {};
            style[name] = value;

            monaca.apiQueue.exec(
                success || function() { },
                failure || function() { },
                "mobi.monaca.nativecomponent",
                "update",
                [id, style]
            );
        };
    }

    /**
     * Spinner handling
     */
    monaca.showSpinner = function (options) {
        options = options || {};
        var src = options.src ? options.src : null;
        var frames = options.frames != null ? options.frames : null;
        var interval = options.interval != null ? options.interval : null;
        var backgroundColor = options.backgroundColor ? options.backgroundColor : null;
        var backgroundOpacity = options.backgroundOpacity != null ? options.backgroundOpacity : null;
        var title = options.title ? options.title : null;
        var titleColor = options.titleColor ? options.titleColor : null;
        var titleFontScale = options.titleFontScale != null ? options.titleFontScale : null;
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'showSpinner', [ src, frames, interval, backgroundColor, backgroundOpacity, title, titleColor, titleFontScale, null ]);
    };

    monaca.hideSpinner = function(){
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'hideSpinner', []);
    };

    monaca.updateSpinnerTitle = function(newTitle){
        if (!newTitle) newTitle = "";
        monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'updateSpinnerTitle', [ newTitle ]);
    };

    var transitionPluginName = "Transit";

    /**
     * Open new page.
     */
    monaca.pushPage = function(path, options, param) {
        options = options || {};
        var animation = null;
        switch (options.animation) {
        case "lift":
          animation = "modal"; break;
        case "slide":
        case "slideLeft":
          animation = "push"; break;
        case "slideRight":
          animation = "slideRight"; break;
        default:
          animation = "push";
        }
        monaca.apiQueue.exec(null, null, transitionPluginName, animation, [path, options, param]);
    };
    /**
     * Close current page.
     */
    monaca.popPage = function(options) {
        options = options || {};
        var name = options.animation == 'lift' ? 'dismiss' : 'pop';
        monaca.apiQueue.exec(null, null, transitionPluginName, name, [options]);
    };

    /**
     * Open in browser.
     */
    monaca.invokeBrowser = function(url) {
        monaca.apiQueue.exec(null, null, transitionPluginName, "browse", [url]);
    };

    /**
     * Load in current page.
     */
    monaca.load = function(path, options, param) {
        monaca.apiQueue.exec(null, null, transitionPluginName, "link", [path, options, param]);
    };

    /**
     * return to top page.
     */
    monaca.home = function(options) {
        options = options || {};
        monaca.apiQueue.exec(null, null, transitionPluginName, "home", [options]);
    };

    /**
     * Clear stack
     */
    monaca.clearPageStack = function(clearAll) {
        clearAll = clearAll || false;
        monaca.apiQueue.exec(null, null, transitionPluginName, "clearPageStack", [clearAll]);
    };


    /**
     * Console API from independent PhoneGap.
     */
    window.monaca.console = window.monaca.console || {};

    /**
     * base method for send log.
     */
    monaca.console.sendLog = function(level, url, line, char, arguments) {
        var message;
        for (var i=0; i<arguments.length; i++){
            if (typeof arguments[i] == "string") {
                message = arguments[i];
            } else {
                message = JSON.stringify(arguments[i]);
            }
            if (message === undefined) {
                message = "undefined";
            }

            if (isIOS) {
                // not checked yet  or  confirmed MonacaDebugger
                if (! monaca.isMonacaDebuggerChecked || monaca.isMonacaDebugger ) {
                  var head = message.substr(0, 5);
                  if (window.monaca.isDeviceReady !== true || (head != 'ERROR' && head != 'WARN:')) {
                      var xhr = new XMLHttpRequest();
                      var path = "https://monaca-debugger.local/log?level=" + encodeURIComponent(level) + "&message=" + encodeURIComponent(message) + "&at=" + (new Date()).getTime();
                      xhr.open("GET", path);
                      xhr.send();
                  }
                }
                window.orig_console[level](message);
            } else {
                window.console[level](message);
            }
        }
    }

    /**
     * monaca console methods
     */
    var methods = ["debug", "info", "log", "warn", "error"];
    for (var i=0; i<methods.length; i++) {
        var method = methods[i];
        monaca.console[method] = function(method) {
            return function() {
                monaca.console.sendLog(method, null, null, null, arguments);
            };
        }(method);
    }

    /** Replace window.console if iOS **/
    if (isIOS) {
      window.orig_console = window.console;
      window.console = window.monaca.console;
      window.addEventListener( "error" , function (desc, page, line, char) {
          monaca.console.sendLog("error", null, null, null, [ { "message" : desc.message , "page" : desc.filename , "line" : desc.lineno , "char" : desc.colno   } ]);
      } , false );
      // window.onerror = function (desc, page, line, char) {
      //    monaca.console.sendLog("error", page, line, char, [ { "message" : desc , "page" : page , "line" : line, "char" : char } ] );
      // };
    }
    /* Comment out for now
    window.onerror = function (desc, page, line, char) {
      monaca.console.sendLog("error", page, line, char, [desc]);
    };
    */

    window.monaca.splashScreen = window.monaca.splashScreen || {};
    var splashScreenPluginName = "MonacaSplashScreen";

    /**
     * hide SplashScreen.
     */
    monaca.splashScreen.hide = function() {
        if (isAndroid) {
            monaca.apiQueue.exec(null, null, splashScreenPluginName, "hide", []);
        } else {
            navigator.splashscreen.hide();
        }
    };

    // Set monaca.baseUrl
    if (typeof location.href !== "string") {
        console.warn("Cannot find base url");
        monaca.baseUrl = null;
    } else {
        monaca.baseUrl = location.href.split("/www/")[0] + "/www/";
    }

    /**
     * Get device ID
     */
    monaca.getDeviceId = function(callback) {
        monaca.apiQueue.exec(function(result) { callback(result.deviceId); }, null, "Monaca", "getRuntimeConfiguration", []);
    };

    monaca.getRuntimeConfiguration = function(success,failure) {
        monaca.apiQueue.exec( success , failure , "Monaca" , "getRuntimeConfiguration" , []);
    };

    monaca.isMonacaDebuggerChecked = false;
    monaca.isMonacaDebugger = null;

    monaca.getRuntimeConfiguration( function(result) {
        monaca.isMonacaDebuggerChecked = true;
        monaca.isMonacaDebugger = !! result.isMonacaDebugger;
    });


})();

/**
 * iOS Status Bar Plugin
 *
 * @author Asial Corporation
 * @date   2014/1/15
 */
window.StatusBar = window.StatusBar || {};

(function() {

  /*
    hideStatusBar
    support : iOS6,iOS7
  */
  StatusBar.hideStatusBar = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'hideStatusBar', []);
  }

  /*
    showStatusBar
    support : iOS6,iOS7
  */
  StatusBar.showStatusBar = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'showStatusBar', []);
  }

  /*
    statusBarStyleDefault
    support : iOS6,iOS7
  */
  StatusBar.statusBarStyleDefault = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleDefault', []);
  }

  /*
    statusBarStyleLightContent
    support : iOS7
  */
  StatusBar.statusBarStyleLightContent = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleLightContent', []);
  }

  /*
    statusBarStyleBlackOpaque
    support : iOS6
  */
  StatusBar.statusBarStyleBlackOpaque = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleBlackOpaque', []);
  }

  /*
    statusBarStyleBlackTranslucent
    support : iOS6
  */
  StatusBar.statusBarStyleBlackTranslucent = function() {
    monaca.apiQueue.exec(null, null, "mobi.monaca.nativecomponent", 'statusBarStyleBlackTranslucent', []);
  }

})();

/**
 * Monaca Cloud Functions
 *  Version 1.5.0
 *
 * @author Masahiro TANAKA <info@monaca.mobi>
 * @date   2013/03/17
 */
window.monaca = window.monaca || {};
window.monaca.cloud = window.monaca.cloud || {};

(function() {
    /**
     * Push Notification
     */
    monaca.cloud.Push = {};
    monaca.cloud.Push.callback = null;
    monaca.cloud.Push.callbackData = null;

    monaca.cloud.Push.send = function(data) {
        if (typeof monaca.cloud.Push.callback === "function") {
            monaca.cloud.Push.callback(data);
        } else {
            monaca.cloud.Push.callbackData = data;
        }
    };
    monaca.cloud.Push.setHandler = function(fn) {
        if (typeof fn !== "function") {
            console.warn("Push callback must be a function");
        } else {
            monaca.cloud.Push.callback = fn;
            if (monaca.cloud.Push.callbackData) {
                monaca.cloud.Push.callback(monaca.cloud.Push.callbackData);
                monaca.cloud.Push.callbackData = null;
            }
        }
    };

})();


/*
 * cloud
 */
(function(root) {
  var original$ = root.$;
  var originalZepto = root.Zepto;

  /* Zepto 1.1.3 - zepto event ajax deferred callbacks - zeptojs.com/license */
  var Zepto=function(){function k(t){return null==t?String(t):j[T.call(t)]||"object"}function $(t){return"function"==k(t)}function L(t){return null!=t&&t==t.window}function D(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function F(t){return"object"==k(t)}function Z(t){return F(t)&&!L(t)&&Object.getPrototypeOf(t)==Object.prototype}function M(t){return"number"==typeof t.length}function R(t){return s.call(t,function(t){return null!=t})}function _(t){return t.length>0?n.fn.concat.apply([],t):t}function q(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function W(t){return t in f?f[t]:f[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function z(t,e){return"number"!=typeof e||c[q(t)]?e:e+"px"}function H(t){var e,n;return u[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),u[t]=n),u[t]}function V(t){return"children"in t?o.call(t.children):n.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function I(n,i,r){for(e in i)r&&(Z(i[e])||A(i[e]))?(Z(i[e])&&!Z(n[e])&&(n[e]={}),A(i[e])&&!A(n[e])&&(n[e]=[]),I(n[e],i[e],r)):i[e]!==t&&(n[e]=i[e])}function B(t,e){return null==e?n(t):n(t).filter(e)}function J(t,e,n,i){return $(e)?e.call(t,n,i):e}function U(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function X(e,n){var i=e.className,r=i&&i.baseVal!==t;return n===t?r?i.baseVal:i:void(r?i.baseVal=n:e.className=n)}function Y(t){var e;try{return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(e=Number(t))?/^[\[\{]/.test(t)?n.parseJSON(t):t:e):t}catch(i){return t}}function G(t,e){e(t);for(var n in t.childNodes)G(t.childNodes[n],e)}var t,e,n,i,C,N,r=[],o=r.slice,s=r.filter,a=window.document,u={},f={},c={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},l=/^\s*<(\w+|!)[^>]*>/,h=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,p=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,d=/^(?:body|html)$/i,m=/([A-Z])/g,g=["val","css","html","text","data","width","height","offset"],v=["after","prepend","before","append"],y=a.createElement("table"),x=a.createElement("tr"),b={tr:a.createElement("tbody"),tbody:y,thead:y,tfoot:y,td:x,th:x,"*":a.createElement("div")},w=/complete|loaded|interactive/,E=/^[\w-]*$/,j={},T=j.toString,S={},O=a.createElement("div"),P={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};return S.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=O).appendChild(t),i=~S.qsa(r,e).indexOf(t),o&&O.removeChild(t),i},C=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},N=function(t){return s.call(t,function(e,n){return t.indexOf(e)==n})},S.fragment=function(e,i,r){var s,u,f;return h.test(e)&&(s=n(a.createElement(RegExp.$1))),s||(e.replace&&(e=e.replace(p,"<$1></$2>")),i===t&&(i=l.test(e)&&RegExp.$1),i in b||(i="*"),f=b[i],f.innerHTML=""+e,s=n.each(o.call(f.childNodes),function(){f.removeChild(this)})),Z(r)&&(u=n(s),n.each(r,function(t,e){g.indexOf(t)>-1?u[t](e):u.attr(t,e)})),s},S.Z=function(t,e){return t=t||[],t.__proto__=n.fn,t.selector=e||"",t},S.isZ=function(t){return t instanceof S.Z},S.init=function(e,i){var r;if(!e)return S.Z();if("string"==typeof e)if(e=e.trim(),"<"==e[0]&&l.test(e))r=S.fragment(e,RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}else{if($(e))return n(a).ready(e);if(S.isZ(e))return e;if(A(e))r=R(e);else if(F(e))r=[e],e=null;else if(l.test(e))r=S.fragment(e.trim(),RegExp.$1,i),e=null;else{if(i!==t)return n(i).find(e);r=S.qsa(a,e)}}return S.Z(r,e)},n=function(t,e){return S.init(t,e)},n.extend=function(t){var e,n=o.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){I(t,n,e)}),t},S.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,a=E.test(s);return D(t)&&a&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType?[]:o.call(a&&!i?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},n.contains=function(t,e){return t!==e&&t.contains(e)},n.type=k,n.isFunction=$,n.isWindow=L,n.isArray=A,n.isPlainObject=Z,n.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},n.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},n.camelCase=C,n.trim=function(t){return null==t?"":String.prototype.trim.call(t)},n.uuid=0,n.support={},n.expr={},n.map=function(t,e){var n,r,o,i=[];if(M(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(o in t)n=e(t[o],o),null!=n&&i.push(n);return _(i)},n.each=function(t,e){var n,i;if(M(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},n.grep=function(t,e){return s.call(t,e)},window.JSON&&(n.parseJSON=JSON.parse),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){j["[object "+e+"]"]=e.toLowerCase()}),n.fn={forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,indexOf:r.indexOf,concat:r.concat,map:function(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return n(o.apply(this,arguments))},ready:function(t){return w.test(a.readyState)&&a.body?t(n):a.addEventListener("DOMContentLoaded",function(){t(n)},!1),this},get:function(e){return e===t?o.call(this):this[e>=0?e:e+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return r.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return $(t)?this.not(this.not(t)):n(s.call(this,function(e){return S.matches(e,t)}))},add:function(t,e){return n(N(this.concat(n(t,e))))},is:function(t){return this.length>0&&S.matches(this[0],t)},not:function(e){var i=[];if($(e)&&e.call!==t)this.each(function(t){e.call(this,t)||i.push(this)});else{var r="string"==typeof e?this.filter(e):M(e)&&$(e.item)?o.call(e):n(e);this.forEach(function(t){r.indexOf(t)<0&&i.push(t)})}return n(i)},has:function(t){return this.filter(function(){return F(t)?n.contains(this,t):n(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!F(t)?t:n(t)},last:function(){var t=this[this.length-1];return t&&!F(t)?t:n(t)},find:function(t){var e,i=this;return e="object"==typeof t?n(t).filter(function(){var t=this;return r.some.call(i,function(e){return n.contains(e,t)})}):1==this.length?n(S.qsa(this[0],t)):this.map(function(){return S.qsa(this,t)})},closest:function(t,e){var i=this[0],r=!1;for("object"==typeof t&&(r=n(t));i&&!(r?r.indexOf(i)>=0:S.matches(i,t));)i=i!==e&&!D(i)&&i.parentNode;return n(i)},parents:function(t){for(var e=[],i=this;i.length>0;)i=n.map(i,function(t){return(t=t.parentNode)&&!D(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return B(e,t)},parent:function(t){return B(N(this.pluck("parentNode")),t)},children:function(t){return B(this.map(function(){return V(this)}),t)},contents:function(){return this.map(function(){return o.call(this.childNodes)})},siblings:function(t){return B(this.map(function(t,e){return s.call(V(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return n.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=H(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=$(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){n(this[0]).before(t=n(t));for(var e;(e=t.children()).length;)t=e.first();n(t).append(this)}return this},wrapInner:function(t){var e=$(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function(){return this.parent().each(function(){n(this).replaceWith(n(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var i=n(this);(e===t?"none"==i.css("display"):e)?i.show():i.hide()})},prev:function(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))})},text:function(e){return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=e===t?"":""+e})},attr:function(n,i){var r;return"string"==typeof n&&i===t?0==this.length||1!==this[0].nodeType?t:"value"==n&&"INPUT"==this[0].nodeName?this.val():!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:this.each(function(t){if(1===this.nodeType)if(F(n))for(e in n)U(this,e,n[e]);else U(this,n,J(this,i,t,this.getAttribute(n)))})},removeAttr:function(t){return this.each(function(){1===this.nodeType&&U(this,t)})},prop:function(e,n){return e=P[e]||e,n===t?this[0]&&this[0][e]:this.each(function(t){this[e]=J(this,n,t,this[e])})},data:function(e,n){var i=this.attr("data-"+e.replace(m,"-$1").toLowerCase(),n);return null!==i?Y(i):t},val:function(t){return 0===arguments.length?this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value):this.each(function(e){this.value=J(this,t,e,this.value)})},offset:function(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};"static"==i.css("position")&&(s.position="relative"),i.css(s)});if(0==this.length)return null;var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function(t,i){if(arguments.length<2){var r=this[0],o=getComputedStyle(r,"");if(!r)return;if("string"==typeof t)return r.style[C(t)]||o.getPropertyValue(t);if(A(t)){var s={};return n.each(A(t)?t:[t],function(t,e){s[e]=r.style[C(e)]||o.getPropertyValue(e)}),s}}var a="";if("string"==k(t))i||0===i?a=q(t)+":"+z(t,i):this.each(function(){this.style.removeProperty(q(t))});else for(e in t)t[e]||0===t[e]?a+=q(e)+":"+z(e,t[e])+";":this.each(function(){this.style.removeProperty(q(e))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?r.some.call(this,function(t){return this.test(X(t))},W(t)):!1},addClass:function(t){return t?this.each(function(e){i=[];var r=X(this),o=J(this,t,e,r);o.split(/\s+/g).forEach(function(t){n(this).hasClass(t)||i.push(t)},this),i.length&&X(this,r+(r?" ":"")+i.join(" "))}):this},removeClass:function(e){return this.each(function(n){return e===t?X(this,""):(i=X(this),J(this,e,n,i).split(/\s+/g).forEach(function(t){i=i.replace(W(t)," ")}),void X(this,i.trim()))})},toggleClass:function(e,i){return e?this.each(function(r){var o=n(this),s=J(this,e,r,X(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})}):this},scrollTop:function(e){if(this.length){var n="scrollTop"in this[0];return e===t?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})}},scrollLeft:function(e){if(this.length){var n="scrollLeft"in this[0];return e===t?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),i=this.offset(),r=d.test(e[0].nodeName)?{top:0,left:0}:e.offset();return i.top-=parseFloat(n(t).css("margin-top"))||0,i.left-=parseFloat(n(t).css("margin-left"))||0,r.top+=parseFloat(n(e[0]).css("border-top-width"))||0,r.left+=parseFloat(n(e[0]).css("border-left-width"))||0,{top:i.top-r.top,left:i.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!d.test(t.nodeName)&&"static"==n(t).css("position");)t=t.offsetParent;return t})}},n.fn.detach=n.fn.remove,["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];return r===t?L(s)?s["inner"+i]:D(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e]:this.each(function(t){s=n(this),s.css(e,J(this,r,t,s[e]()))})}}),v.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,o,r=n.map(arguments,function(e){return t=k(e),"object"==t||"array"==t||null==e?e:S.fragment(e)}),s=this.length>1;return r.length<1?this:this.each(function(t,a){o=i?a:a.parentNode,a=0==e?a.nextSibling:1==e?a.firstChild:2==e?a:null,r.forEach(function(t){if(s)t=t.cloneNode(!0);else if(!o)return n(t).remove();G(o.insertBefore(t,a),function(t){null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML)})})})},n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){return n(e)[t](this),this}}),S.Z.prototype=n.fn,S.uniq=N,S.deserializeValue=Y,n.zepto=S,n}();window.Zepto=Zepto,void 0===window.$&&(window.$=Zepto),function(t){function l(t){return t._zid||(t._zid=e++)}function h(t,e,n,i){if(e=p(e),e.ns)var r=d(e.ns);return(s[l(t)]||[]).filter(function(t){return!(!t||e.e&&t.e!=e.e||e.ns&&!r.test(t.ns)||n&&l(t.fn)!==l(n)||i&&t.sel!=i)})}function p(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function d(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function m(t,e){return t.del&&!u&&t.e in f||!!e}function g(t){return c[t]||u&&f[t]||t}function v(e,i,r,o,a,u,f){var h=l(e),d=s[h]||(s[h]=[]);i.split(/\s/).forEach(function(i){if("ready"==i)return t(document).ready(r);var s=p(i);s.fn=r,s.sel=a,s.e in c&&(r=function(e){var n=e.relatedTarget;return!n||n!==this&&!t.contains(this,n)?s.fn.apply(this,arguments):void 0}),s.del=u;var l=u||r;s.proxy=function(t){if(t=j(t),!t.isImmediatePropagationStopped()){t.data=o;var i=l.apply(e,t._args==n?[t]:[t].concat(t._args));return i===!1&&(t.preventDefault(),t.stopPropagation()),i}},s.i=d.length,d.push(s),"addEventListener"in e&&e.addEventListener(g(s.e),s.proxy,m(s,f))})}function y(t,e,n,i,r){var o=l(t);(e||"").split(/\s/).forEach(function(e){h(t,e,n,i).forEach(function(e){delete s[o][e.i],"removeEventListener"in t&&t.removeEventListener(g(e.e),e.proxy,m(e,r))})})}function j(e,i){return(i||!e.isDefaultPrevented)&&(i||(i=e),t.each(E,function(t,n){var r=i[t];e[t]=function(){return this[n]=x,r&&r.apply(i,arguments)},e[n]=b}),(i.defaultPrevented!==n?i.defaultPrevented:"returnValue"in i?i.returnValue===!1:i.getPreventDefault&&i.getPreventDefault())&&(e.isDefaultPrevented=x)),e}function T(t){var e,i={originalEvent:t};for(e in t)w.test(e)||t[e]===n||(i[e]=t[e]);return j(i,t)}var n,e=1,i=Array.prototype.slice,r=t.isFunction,o=function(t){return"string"==typeof t},s={},a={},u="onfocusin"in window,f={focus:"focusin",blur:"focusout"},c={mouseenter:"mouseover",mouseleave:"mouseout"};a.click=a.mousedown=a.mouseup=a.mousemove="MouseEvents",t.event={add:v,remove:y},t.proxy=function(e,n){if(r(e)){var i=function(){return e.apply(n,arguments)};return i._zid=l(e),i}if(o(n))return t.proxy(e[n],e);throw new TypeError("expected function")},t.fn.bind=function(t,e,n){return this.on(t,e,n)},t.fn.unbind=function(t,e){return this.off(t,e)},t.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var x=function(){return!0},b=function(){return!1},w=/^([A-Z]|returnValue$|layer[XY]$)/,E={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};t.fn.delegate=function(t,e,n){return this.on(e,t,n)},t.fn.undelegate=function(t,e,n){return this.off(e,t,n)},t.fn.live=function(e,n){return t(document.body).delegate(this.selector,e,n),this},t.fn.die=function(e,n){return t(document.body).undelegate(this.selector,e,n),this},t.fn.on=function(e,s,a,u,f){var c,l,h=this;return e&&!o(e)?(t.each(e,function(t,e){h.on(t,s,a,e,f)}),h):(o(s)||r(u)||u===!1||(u=a,a=s,s=n),(r(a)||a===!1)&&(u=a,a=n),u===!1&&(u=b),h.each(function(n,r){f&&(c=function(t){return y(r,t.type,u),u.apply(this,arguments)}),s&&(l=function(e){var n,o=t(e.target).closest(s,r).get(0);return o&&o!==r?(n=t.extend(T(e),{currentTarget:o,liveFired:r}),(c||u).apply(o,[n].concat(i.call(arguments,1)))):void 0}),v(r,e,u,a,s,l||c)}))},t.fn.off=function(e,i,s){var a=this;return e&&!o(e)?(t.each(e,function(t,e){a.off(t,i,e)}),a):(o(i)||r(s)||s===!1||(s=i,i=n),s===!1&&(s=b),a.each(function(){y(this,e,s,i)}))},t.fn.trigger=function(e,n){return e=o(e)||t.isPlainObject(e)?t.Event(e):j(e),e._args=n,this.each(function(){"dispatchEvent"in this?this.dispatchEvent(e):t(this).triggerHandler(e,n)})},t.fn.triggerHandler=function(e,n){var i,r;return this.each(function(s,a){i=T(o(e)?t.Event(e):e),i._args=n,i.target=a,t.each(h(a,e.type||e),function(t,e){return r=e.proxy(i),i.isImmediatePropagationStopped()?!1:void 0})}),r},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.trigger(e)}}),["focus","blur"].forEach(function(e){t.fn[e]=function(t){return t?this.bind(e,t):this.each(function(){try{this[e]()}catch(t){}}),this}}),t.Event=function(t,e){o(t)||(e=t,t=e.type);var n=document.createEvent(a[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),j(n)}}(Zepto),function(t){function l(e,n,i){var r=t.Event(n);return t(e).trigger(r,i),!r.isDefaultPrevented()}function h(t,e,i,r){return t.global?l(e||n,i,r):void 0}function p(e){e.global&&0===t.active++&&h(e,null,"ajaxStart")}function d(e){e.global&&!--t.active&&h(e,null,"ajaxStop")}function m(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||h(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void h(e,n,"ajaxSend",[t,e])}function g(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),h(n,r,"ajaxSuccess",[e,n,t]),y(o,e,n)}function v(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),h(i,o,"ajaxError",[n,i,t||e]),y(e,n,i)}function y(t,e,n){var i=n.context;n.complete.call(i,e,t),h(n,i,"ajaxComplete",[e,n]),d(n)}function x(){}function b(t){return t&&(t=t.split(";",2)[0]),t&&(t==f?"html":t==u?"json":s.test(t)?"script":a.test(t)&&"xml")||"text"}function w(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function E(e){e.processData&&e.data&&"string"!=t.type(e.data)&&(e.data=t.param(e.data,e.traditional)),!e.data||e.type&&"GET"!=e.type.toUpperCase()||(e.url=w(e.url,e.data),e.data=void 0)}function j(e,n,i,r){return t.isFunction(n)&&(r=i,i=n,n=void 0),t.isFunction(i)||(r=i,i=void 0),{url:e,data:n,success:i,dataType:r}}function S(e,n,i,r){var o,s=t.isArray(n),a=t.isPlainObject(n);t.each(n,function(n,u){o=t.type(u),r&&(n=i?r:r+"["+(a||"object"==o||"array"==o?n:"")+"]"),!r&&s?e.add(u.name,u.value):"array"==o||!i&&"object"==o?S(e,u,i,n):e.add(n,u)})}var i,r,e=0,n=window.document,o=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,s=/^(?:text|application)\/javascript/i,a=/^(?:text|application)\/xml/i,u="application/json",f="text/html",c=/^\s*$/;t.active=0,t.ajaxJSONP=function(i,r){if(!("type"in i))return t.ajax(i);var f,h,o=i.jsonpCallback,s=(t.isFunction(o)?o():o)||"jsonp"+ ++e,a=n.createElement("script"),u=window[s],c=function(e){t(a).triggerHandler("error",e||"abort")},l={abort:c};return r&&r.promise(l),t(a).on("load error",function(e,n){clearTimeout(h),t(a).off().remove(),"error"!=e.type&&f?g(f[0],l,i,r):v(null,n||"error",l,i,r),window[s]=u,f&&t.isFunction(u)&&u(f[0]),u=f=void 0}),m(l,i)===!1?(c("abort"),l):(window[s]=function(){f=arguments},a.src=i.url.replace(/\?(.+)=\?/,"?$1="+s),n.head.appendChild(a),i.timeout>0&&(h=setTimeout(function(){c("timeout")},i.timeout)),l)},t.ajaxSettings={type:"GET",beforeSend:x,success:x,error:x,complete:x,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:u,xml:"application/xml, text/xml",html:f,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},t.ajax=function(e){var n=t.extend({},e||{}),o=t.Deferred&&t.Deferred();for(i in t.ajaxSettings)void 0===n[i]&&(n[i]=t.ajaxSettings[i]);p(n),n.crossDomain||(n.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(n.url)&&RegExp.$2!=window.location.host),n.url||(n.url=window.location.toString()),E(n),n.cache===!1&&(n.url=w(n.url,"_="+Date.now()));var s=n.dataType,a=/\?.+=\?/.test(n.url);if("jsonp"==s||a)return a||(n.url=w(n.url,n.jsonp?n.jsonp+"=?":n.jsonp===!1?"":"callback=?")),t.ajaxJSONP(n,o);var j,u=n.accepts[s],f={},l=function(t,e){f[t.toLowerCase()]=[t,e]},h=/^([\w-]+:)\/\//.test(n.url)?RegExp.$1:window.location.protocol,d=n.xhr(),y=d.setRequestHeader;if(o&&o.promise(d),n.crossDomain||l("X-Requested-With","XMLHttpRequest"),l("Accept",u||"*/*"),(u=n.mimeType||u)&&(u.indexOf(",")>-1&&(u=u.split(",",2)[0]),d.overrideMimeType&&d.overrideMimeType(u)),(n.contentType||n.contentType!==!1&&n.data&&"GET"!=n.type.toUpperCase())&&l("Content-Type",n.contentType||"application/x-www-form-urlencoded"),n.headers)for(r in n.headers)l(r,n.headers[r]);if(d.setRequestHeader=l,d.onreadystatechange=function(){if(4==d.readyState){d.onreadystatechange=x,clearTimeout(j);var e,i=!1;if(d.status>=200&&d.status<300||304==d.status||0==d.status&&"file:"==h){s=s||b(n.mimeType||d.getResponseHeader("content-type")),e=d.responseText;try{"script"==s?(1,eval)(e):"xml"==s?e=d.responseXML:"json"==s&&(e=c.test(e)?null:t.parseJSON(e))}catch(r){i=r}i?v(i,"parsererror",d,n,o):g(e,d,n,o)}else v(d.statusText||null,d.status?"error":"abort",d,n,o)}},m(d,n)===!1)return d.abort(),v(null,"abort",d,n,o),d;if(n.xhrFields)for(r in n.xhrFields)d[r]=n.xhrFields[r];var T="async"in n?n.async:!0;d.open(n.type,n.url,T,n.username,n.password);for(r in f)y.apply(d,f[r]);return n.timeout>0&&(j=setTimeout(function(){d.onreadystatechange=x,d.abort(),v(null,"timeout",d,n,o)},n.timeout)),d.send(n.data?n.data:null),d},t.get=function(){return t.ajax(j.apply(null,arguments))},t.post=function(){var e=j.apply(null,arguments);return e.type="POST",t.ajax(e)},t.getJSON=function(){var e=j.apply(null,arguments);return e.dataType="json",t.ajax(e)},t.fn.load=function(e,n,i){if(!this.length)return this;var a,r=this,s=e.split(/\s/),u=j(e,n,i),f=u.success;return s.length>1&&(u.url=s[0],a=s[1]),u.success=function(e){r.html(a?t("<div>").html(e.replace(o,"")).find(a):e),f&&f.apply(r,arguments)},t.ajax(u),this};var T=encodeURIComponent;t.param=function(t,e){var n=[];return n.add=function(t,e){this.push(T(t)+"="+T(e))},S(n,t,e),n.join("&").replace(/%20/g,"+")}}(Zepto),function(t){function n(e){var i=[["resolve","done",t.Callbacks({once:1,memory:1}),"resolved"],["reject","fail",t.Callbacks({once:1,memory:1}),"rejected"],["notify","progress",t.Callbacks({memory:1})]],r="pending",o={state:function(){return r},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var e=arguments;return n(function(n){t.each(i,function(i,r){var a=t.isFunction(e[i])&&e[i];s[r[1]](function(){var e=a&&a.apply(this,arguments);if(e&&t.isFunction(e.promise))e.promise().done(n.resolve).fail(n.reject).progress(n.notify);else{var i=this===o?n.promise():this,s=a?[e]:arguments;n[r[0]+"With"](i,s)}})}),e=null}).promise()},promise:function(e){return null!=e?t.extend(e,o):o}},s={};return t.each(i,function(t,e){var n=e[2],a=e[3];o[e[1]]=n.add,a&&n.add(function(){r=a},i[1^t][2].disable,i[2][2].lock),s[e[0]]=function(){return s[e[0]+"With"](this===s?o:this,arguments),this},s[e[0]+"With"]=n.fireWith}),o.promise(s),e&&e.call(s,s),s}var e=Array.prototype.slice;t.when=function(i){var f,c,l,r=e.call(arguments),o=r.length,s=0,a=1!==o||i&&t.isFunction(i.promise)?o:0,u=1===a?i:n(),h=function(t,n,i){return function(r){n[t]=this,i[t]=arguments.length>1?e.call(arguments):r,i===f?u.notifyWith(n,i):--a||u.resolveWith(n,i)}};if(o>1)for(f=new Array(o),c=new Array(o),l=new Array(o);o>s;++s)r[s]&&t.isFunction(r[s].promise)?r[s].promise().done(h(s,l,r)).fail(u.reject).progress(h(s,c,f)):--a;return a||u.resolveWith(l,r),u.promise()},t.Deferred=n}(Zepto),function(t){t.Callbacks=function(e){e=t.extend({},e);var n,i,r,o,s,a,u=[],f=!e.once&&[],c=function(t){for(n=e.memory&&t,i=!0,a=o||0,o=0,s=u.length,r=!0;u&&s>a;++a)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){n=!1;break}r=!1,u&&(f?f.length&&c(f.shift()):n?u.length=0:l.disable())},l={add:function(){if(u){var i=u.length,a=function(n){t.each(n,function(t,n){"function"==typeof n?e.unique&&l.has(n)||u.push(n):n&&n.length&&"string"!=typeof n&&a(n)})};a(arguments),r?s=u.length:n&&(o=i,c(n))}return this},remove:function(){return u&&t.each(arguments,function(e,n){for(var i;(i=t.inArray(n,u,i))>-1;)u.splice(i,1),r&&(s>=i&&--s,a>=i&&--a)}),this},has:function(e){return!(!u||!(e?t.inArray(e,u)>-1:u.length))},empty:function(){return s=u.length=0,this},disable:function(){return u=f=n=void 0,this},disabled:function(){return!u},lock:function(){return f=void 0,n||l.disable(),this},locked:function(){return!f},fireWith:function(t,e){return!u||i&&!f||(e=e||[],e=[t,e.slice?e.slice():e],r?f.push(e):c(e)),this},fire:function(){return l.fireWith(this,arguments)},fired:function(){return!!i}};return l}}(Zepto);

  root.$ = original$;
  root.Zepto = originalZepto;
  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};

  monaca.cloud.timeout = 30000;
  monaca.cloud.url = '%%%CLOUD_HOST%%%';
  monaca.cloud.backendId = '%%%BACKEND_ID%%%';
  monaca.cloud.apiKey = '%%%BACKEND_API_KEY%%%';
  monaca.cloud.deviceId = null;
  monaca.cloud.postQueue = [];

  /**
   * @property {jQuery} .
   */
  monaca.cloud.$ = Zepto;

  var MonacaCloudError = (function() {
    function MonacaCloudError(code, message, data) {
      if (typeof data === "undefined") {
        data = {};
      }
      this.code = code;
      this.message = message;
      this.data = data;
    }
    return MonacaCloudError;
  })();

  /**
   * @class
   */
  monaca.cloud.Error = function(code, message, data) {
    return new MonacaCloudError(code, message, data);
  };

  /**
   * @param {Number} msec .
   */
  monaca.cloud.setTimeout = function(msec) {
    this.timeout = msec;
  };

  // Get device id
  document.addEventListener("deviceready", function() {

    cordova.exec(function(result) {
        monaca.cloud.deviceId = new String(result.deviceId);
        monaca.cloud.url = new String(result.url);
        monaca.cloud.backendId = new String(result.backendId);
        monaca.cloud.apiKey = new String(result.apiKey);

        // execute and clear postQueue
        for (var i = 0; i < monaca.cloud.postQueue.length; i++) {
          monaca.cloud._doPost.apply(monaca.cloud, monaca.cloud.postQueue[i]);
        }
        monaca.cloud.postQueue = [];
      }, function(error) {
        console.error(error);
      },

      "Monaca",
      "getRuntimeConfiguration", []
    );

  }, false);

  // Others
  monaca.cloud._post = function(method, params, dfd, ajaxOptions, beforeSuccess) {
    if (monaca.cloud.deviceId == null) {
      monaca.cloud.postQueue.push([method, params, dfd, ajaxOptions, beforeSuccess]);
    } else {
      monaca.cloud._doPost(method, params, dfd, ajaxOptions, beforeSuccess);
    }
  };

  monaca.cloud._doPost = function(method, params, dfd, ajaxOptions, beforeSuccess) {
    var $ = monaca.cloud.$;

    if (typeof(ajaxOptions) === 'undefined') ajaxOptions = {};
    if ((typeof(method) === 'undefined') && (typeof(params) === 'undefined')) {
      throw new Error('Invalid arguments');
    }

    params['__api_key'] = monaca.cloud.apiKey;
    params['__device'] = monaca.cloud.deviceId;
    var sid = monaca.cloud._getSessionId();
    if (sid.length > 0) {
      params['__session'] = sid;
    }
    var data = JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: '1'
    });

    var o = $.extend(true, {
      url: this.url + this.backendId,
      data: data,
      dataType: 'json',
      type: 'POST',
      timeout: this.timeout,
      success: function(jsonResponse, status, xhr) {
        var sessionHeader = xhr.getResponseHeader('X-Set-Monaca-Cloud-Session');
        if (sessionHeader) {
          monaca.cloud._setSessionId(sessionHeader);
        }

        if (typeof(jsonResponse.error) !== 'undefined') {
          // has error code
          dfd.reject(jsonResponse.error);
        } else {
          // success
          if (typeof(jsonResponse.result.loginToken) !== 'undefined') {
            localStorage.monacaCloudLoginToken = jsonResponse.result.loginToken;
          }
          if (typeof(beforeSuccess) !== 'undefined') {
            beforeSuccess(jsonResponse, status, xhr, dfd);
          }
          dfd.resolve(jsonResponse.result);
        }
      },
      error: function(xhr, status) {
        switch (status) {
          case 'timeout':
            var err = monaca.cloud.Error(-11, 'Connection timeout');
            break;
          case 'parsererror':
            var err = monaca.cloud.Error(-12, 'Invalid response');
            break;
          default:
            var err = monaca.cloud.Error(-13, 'Invalid status code');
        }
        dfd.reject(err);
      }
    }, ajaxOptions);

    $.ajax(o);
  };

  var _sessionId = '';

  monaca.cloud._getSessionId = function() {
    return _sessionId;
  };

  monaca.cloud._setSessionId = function(id) {
    if (typeof id != 'string') {
      id = '';
    }
    _sessionId = id;
  };

})(window);
/*
 * CollectionItem
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCollectionItem = (function() {

    function MonacaCloudCollectionItem(item, collection) {

      /**
       * @property {String} .
       */
      this._id = item._id;

      /**
       * @property {String} .
       */
      this._ownerUserOid = item._ownerUserOid;

      /**
       * @property {Date} .
       */
      this._createdAt = new Date(item._createdAt);

      /**
       * @property {Date} .
       */
      this._updatedAt = new Date(item._updatedAt);

      /**
       * @property {MonacaCloudCollection} .
       */
      this._collection = collection;


      for (var key in item) {
        if (key.substr(0, 1) != '_') {
          this[key] = item[key];
        }
      }
    }

    MonacaCloudCollectionItem.prototype = {

      /**
       * @return {$.Promise} .
       */
      update: function() {
        var dfd = new $.Deferred();
        var col = this._collection;
        var data = {};

        for (var key in this) {
          if (key.indexOf('_') !== 0) {
            data[key] = this[key];
          }
        }

        monaca.cloud._post('Collection.update', {
          collectionName: col.name,
          itemOid: this._id,
          data: data,
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      getPermission: function() {
        var dfd = new $.Deferred();
        var col = this._collection;

        monaca.cloud._post('Collection.getPermission', {
          collectionName: col.name,
          itemOid: this._id
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @param {Object} permission .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      updatePermission: function(permission, options) {
        var dfd = new $.Deferred();
        var col = this._collection;

        if (typeof(options) === 'undefined') {
          options = {};
        }

        monaca.cloud._post('Collection.updatePermission', {
          collectionName: col.name,
          criteria: '_id == ?',
          bindParams: [this._id],
          permission: permission,
          options: options
        }, dfd, {});

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      remove: function() {
        var dfd = new $.Deferred();
        var col = this._collection;

        monaca.cloud._post('Collection.delete', {
          collectionName: col.name,
          itemOid: this._id,
        }, dfd, {});

        return dfd.promise();
      },

      'delete': function() {
        return this.remove();
      }

    };


    return MonacaCloudCollectionItem;
  })();

  monaca.cloud.CollectionItem = function(item, collection) {
    return new MonacaCloudCollectionItem(item, collection);
  };

})(window);
/*
 * Collection
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCollection = (function() {

    function MonacaCloudCollection(name) {
      this.name = name;
    }

    MonacaCloudCollection.prototype = {

      /**
       * @param {Object|Array} items .
       * @return {Array} result .
       */
      _makeCollectionItem: function(items) {
        var result = [];

        if (items instanceof Array) {
          for (var i = 0; i < items.length; i++) {
            result[i] = monaca.cloud.CollectionItem(items[i], this);
          }
        } else {
          result = monaca.cloud.CollectionItem(items, this);
        }

        return result;
      },

      /**
       * @param {Criteria|Array} criteria .
       */
      _validateCriteria: function(criteria) {
        if ((typeof(criteria) === 'undefined') || (typeof(criteria) === 'null')) {
          criteria = monaca.cloud.Criteria('');
        } else if (typeof(criteria) === 'string') {
          criteria = monaca.cloud.Criteria(criteria);
        }

        return criteria;
      },

      /**
       * @param {Object|Array} orderBy .
       * @param {Object} options .
       */
      _validateOptions: function(orderBy, options) {
        //if orderBy is hash, consider it as "options"
        if ((typeof(orderBy) === 'object') && (typeof(orderBy.length) === 'undefined')) {
          options = orderBy;
          if (typeof(options.orderBy) !== 'undefined') {
            orderBy = orderBy.orderBy;
          } else {
            orderBy = null;
          }
        }

        if (orderBy === '') {
          orderBy = null;
        }

        return {
          orderBy: orderBy,
          options: options
        };
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      find: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            e.result.items = self._makeCollectionItem(e.result.items);
            dfd.resolve(e.result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findMine: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        var userOid = monaca.cloud.User._oid;

        if (criteria.query != '') {
          criteria.query = '(' + criteria.query + ') && ';
        }
        if (userOid != null) {
          criteria.query += '(_ownerUserOid == ?)';
          criteria.bindParams.push(userOid);
        } else {
          criteria.query += '(_ownerDeviceOid == ?)';
          criteria.bindParams.push(monaca.cloud.deviceId);
        }

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            e.result.items = self._makeCollectionItem(e.result.items);
            dfd.resolve(e.result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findOne: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var result = (e.result.totalItems > 0) ? self._makeCollectionItem(e.result.items[0]) : null;
            dfd.resolve(result);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {String|Array} [orderBy] .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      findOneMine: function(criteria, orderBy, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);
        var o = self._validateOptions(orderBy, options);

        var userOid = monaca.cloud.User._oid;

        if (criteria.query != '') {
          criteria.query = '(' + criteria.query + ') && ';
        }
        if (userOid != null) {
          criteria.query += '(_ownerUserOid == ?)';
          criteria.bindParams.push(userOid);
        } else {
          criteria.query += '(_ownerDeviceOid == ?)';
          criteria.bindParams.push(monaca.cloud.deviceId);
        }

        monaca.cloud._post('Collection.find', {
            collectionName: this.name,
            criteria: criteria.query,
            bindParams: criteria.bindParams,
            orderBy: o.orderBy,
            options: o.options
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var result = (e.result.totalItems > 0) ? self._makeCollectionItem(e.result.items[0]) : null;
            dfd.resolve(result);
          });

        return dfd.promise();
      },

      /**
       * @param {Object} item .
       * @param {Object} [permission] .
       * @return {$.Promise} .
       */
      insert: function(item, permission) {
        var self = this;
        var dfd = new $.Deferred();

        if (typeof(permission) === 'undefined') {
          permission = {};
        }

        monaca.cloud._post('Collection.insert', {
            collectionName: this.name,
            item: item,
            permission: permission
          }, dfd, {},
          function(e, status, xhr, dfd) {
            var item = self._makeCollectionItem(e.result.item);
            dfd.resolve(item);
          });

        return dfd.promise();
      },

      /**
       * @param {Criteria|String} criteria .
       * @param {Object} permission .
       * @param {Object} [options] .
       * @return {$.Promise} .
       */
      updatePermission: function(criteria, permission, options) {
        var self = this;
        var dfd = new $.Deferred();

        criteria = self._validateCriteria(criteria);

        monaca.cloud._post('Collection.updatePermission', {
          collectionName: this.name,
          criteria: criteria.query,
          bindParams: criteria.bindParams,
          permission: permission,
          options: options
        }, dfd, {});

        return dfd.promise();
      }
    };

    return MonacaCloudCollection;
  })();


  monaca.cloud.Collection = function(name) {
    return new MonacaCloudCollection(name);
  };

})(window);
/*
 * Criteria
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  MonacaCloudCriteria = (function() {

    function MonacaCloudCriteria(query, bindParams) {
      this.query = query;
      this.bindParams = (typeof(bindParams) !== 'undefined') ? bindParams : [];
    }

    return MonacaCloudCriteria;
  })();


  monaca.cloud.Criteria = function(query, bindParams) {
    return new MonacaCloudCriteria(query, bindParams);
  };

})(window);
/*
 * Device
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.Device = {

    /**
     * @param {String} name .
     * @return {$.Promise} .
     */
    getProperty: function(name) {
      var dfd = new $.Deferred();

      monaca.cloud._post('Device.getProperties', {
          names: [name]
        }, dfd, {},
        function(e, status, xhr, dfd) {
          dfd.resolve(e.result.properties[name]);
        }
      );

      return dfd.promise();
    },

    /**
     * @param {Array} names .
     * @return {$.Promise} .
     */
    getProperties: function(names) {
      var dfd = new $.Deferred();

      monaca.cloud._post('Device.getProperties', {
          names: names
        }, dfd, {},
        function(e, status, xhr, dfd) {
          dfd.resolve(e.result.properties);
        }
      );

      return dfd.promise();
    },

    /**
     * @param {String} name .
     * @param {String} value .
     * @return {$.Promise} .
     */
    saveProperty: function(name, value) {
      var dfd = new $.Deferred();
      var param = {};

      if ((typeof(name) !== 'undefined') && (typeof(value) !== 'undefined')) {
        param = {
          properties: {}
        };
        param.properties[name] = value;
      }

      monaca.cloud._post('Device.saveProperties', param, dfd);

      return dfd.promise();
    },

    /**
     * @param {Object} properties .
     * @return {$.Promise} .
     */
    saveProperties: function(properties) {
      var dfd = new $.Deferred();
      var param = {};

      if (typeof(properties) !== 'undefined') param.properties = properties;
      monaca.cloud._post('Device.saveProperties', param, dfd);

      return dfd.promise();
    }

  };

})(window);
/*
 * Mailer
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.Mailer = {

    /**
     * @param {String} userOid .
     * @param {String} templateName .
     * @param {Object} substituteParams .
     * @param {Object} [options] .
     * @return {$.Promise} .
     */
    sendMail: function(userOid, templateName, substituteParams, options) {
      var dfd = new $.Deferred();

      if (typeof(options) === 'undefined') {
        options = {};
      }

      monaca.cloud._post('Mailer.sendMail', {
        userOid: userOid,
        templateName: templateName,
        substituteParams: substituteParams,
        options: options
      }, dfd);

      return dfd.promise();
    }
  };

})(window);
/*
 * User
 */
(function(root) {

  var monaca = root.monaca = root.monaca || {};
  monaca.cloud = monaca.cloud || {};
  var $ = monaca.cloud.$;

  /**
   * @class
   */
  monaca.cloud.User = (function() {


    return {

      _oid: null,

      /**
       * @return {Boolean} .
       */
      isAuthenticated: function() {
        return (this._oid === null) ? false : true;
      },


      /**
       * @param {String} username .
       * @param {String} password .
       * @param {Object} [properties] .
       * @return {$.Promise} .
       */
      register: function(username, password, properties) {
        var dfd = new $.Deferred();
        var self = this;

        if (typeof(properties) === 'undefined') properties = {};

        monaca.cloud._post('User.register', {
            username: username,
            password: password,
            properties: properties
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );


        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {Object} properties .
       * @return {$.Promise} .
       */
      validate: function(username, properties) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.validate', {
          username: username,
          properties: properties
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} password .
       * @return {$.Promise} .
       */
      unregister: function(password) {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.unregister', {
            password: password
          }, dfd, {},
          function() {
            self._oid = null;
            monaca.cloud._setSessionId('');
            localStorage.removeItem('monacaCloudLoginToken');
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {String} password .
       * @return {$.Promise} .
       */
      login: function(username, password) {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.login', {
            username: username,
            password: password
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      autoLogin: function() {
        var dfd = new $.Deferred();
        var token = localStorage.monacaCloudLoginToken || '';
        var self = this;

        monaca.cloud._post('User.autoLogin', {
            loginToken: token
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @return {$.Promise} .
       */
      logout: function() {
        var self = this,
          dfd = new $.Deferred();

        monaca.cloud._post('User.logout', {}, dfd, {},
          function() {
            self._oid = null;
            monaca.cloud._setSessionId('');
            localStorage.removeItem('monacaCloudLoginToken');
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} oldPassword .
       * @param {String} newPassword .
       * @return {$.Promise} .
       */
      updatePassword: function(oldPassword, newPassword) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.updatePassword', {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {Object} options .
       * @return {$.Promise} .
       */
      sendPasswordResetToken: function(username, options) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.sendPasswordResetToken', {
          username: username,
          options: options
        }, dfd);

        return dfd.promise();
      },

      /**
       * @param {String} username .
       * @param {String} newPassword .
       * @param {String} token .
       * @return {$.Promise} .
       */
      resetPasswordAndLogin: function(username, newPassword, token) {
        var dfd = new $.Deferred();
        var self = this;

        monaca.cloud._post('User.resetPasswordAndLogin', {
            username: username,
            newPassword: newPassword,
            token: token
          }, dfd, {},
          function(jsonResponse) {
            self._oid = jsonResponse.result.user._id;
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} name .
       * @return {$.Promise} .
       */
      getProperty: function(name) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.getProperties', {
            names: [name]
          }, dfd, {},
          function(e, status, xhr, dfd) {
            dfd.resolve(e.result.properties[name]);
          }
        );

        return dfd.promise();
      },

      /**
       * @param {Array} names .
       * @return {$.Promise} .
       */
      getProperties: function(names) {
        var dfd = new $.Deferred();

        monaca.cloud._post('User.getProperties', {
            names: names
          }, dfd, {},
          function(e, status, xhr, dfd) {
            dfd.resolve(e.result.properties);
          }
        );

        return dfd.promise();
      },

      /**
       * @param {String} name .
       * @param {String} value .
       * @return {$.Promise} .
       */
      saveProperty: function(name, value) {
        var dfd = new $.Deferred();
        var param = {};

        if (typeof(name) !== 'undefined') {
          param = {
            properties: {}
          };
          param.properties[name] = value;
        }

        monaca.cloud._post('User.saveProperties', param, dfd);

        return dfd.promise();
      },

      /**
       * @param {Object} properties .
       * @return {$.Promise} .
       */
      saveProperties: function(properties) {
        var dfd = new $.Deferred();
        var param = {};

        if (typeof(properties) !== 'undefined') param.properties = properties;
        monaca.cloud._post('User.saveProperties', param, dfd);

        return dfd.promise();
      }

    };
  })();

})(window);

;
/*** <End:monaca-core-utils LoadJs:"components/monaca-core-utils/monaca-core-utils.js"> ***/
/*** <End:monaca-core-utils> ***/

/*** <Start:monaca-jquery> ***/
/*** <Start:monaca-jquery LoadJs:"components/monaca-jquery/jquery.js"> ***/
/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Support: IE9
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "2.0.3",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler and self cleanup method
	completed = function() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		// Support: Safari <= 5.1 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		// Support: Firefox <20
		// The try/catch suppresses exceptions thrown when attempting to access
		// the "constructor" property of certain host objects, ie. |window.location|
		// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
		try {
			if ( obj.constructor &&
					!core_hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: JSON.parse,

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data , "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
				indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	trim: function( text ) {
		return text == null ? "" : core_trim.call( text );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : core_indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: Date.now,

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.9.4-pre
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-06-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {
	var input = document.createElement("input"),
		fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		select = document.createElement("select"),
		opt = select.appendChild( document.createElement("option") );

	// Finish early in limited environments
	if ( !input.type ) {
		return support;
	}

	input.type = "checkbox";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Will be defined later
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;
	support.pixelPosition = false;

	// Make sure checked status is properly cloned
	// Support: IE9, IE10
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement("input");
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment.appendChild( input );

	// Support: Safari 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: Firefox, Chrome, Safari
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	support.focusinBubbles = "onfocusin" in window;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv,
			// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
			divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
			body = document.getElementsByTagName("body")[ 0 ];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		// Check box-sizing and margin behavior.
		body.appendChild( container ).appendChild( div );
		div.innerHTML = "";
		// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
		div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		body.removeChild( container );
	});

	return support;
})( {} );

/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var data_user, data_priv,
	rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;

Data.accepts = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType ?
		owner.nodeType === 1 || owner.nodeType === 9 : true;
};

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( core_rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};

// These may be used throughout the jQuery core codebase
data_user = new Data();
data_priv = new Data();


jQuery.extend({
	acceptData: Data.accepts,

	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			elem = this[ 0 ],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[ i ].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.slice(5) );
							dataAttr( elem, name, data[ name ] );
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return jQuery.access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? JSON.parse( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = function( elem, name, isXML ) {
		var fn = jQuery.expr.attrHandle[ name ],
			ret = isXML ?
				undefined :
				/* jshint eqeqeq: false */
				// Temporarily disable this handler to check existence
				(jQuery.expr.attrHandle[ name ] = undefined) !=
					getter( elem, name, isXML ) ?

					name.toLowerCase() :
					null;

		// Restore handler
		jQuery.expr.attrHandle[ name ] = fn;

		return ret;
	};
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = ( rneedsContext.test( selectors ) || typeof selectors !== "string" ) ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return core_indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return core_indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( core_indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because core_push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because core_push.apply(_, arraylike) throws
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !jQuery.support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			i = 0,
			l = elems.length,
			fragment = context.createDocumentFragment(),
			nodes = [];

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because core_push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, events, type, key, j,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( Data.accepts( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					events = Object.keys( data.events || {} );
					if ( events.length ) {
						for ( j = 0; (type = events[j]) !== undefined; j++ ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var l = elems.length,
		i = 0;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}


function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}
jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var curCSS, iframe,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
function getStyles( elem ) {
	return window.getComputedStyle( elem, null );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

curCSS = function( elem, name, _computed ) {
	var width, minWidth, maxWidth,
		computed = _computed || getStyles( elem ),

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
		style = elem.style;

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: Safari 5.1
		// A tribute to the "awesome hack by Dean Edwards"
		// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret;
};


function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	// Support: Android 2.3
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// Support: Android 2.3
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrSupported = jQuery.ajaxSettings.xhr(),
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	// Support: IE9
	// We need to keep track of outbound xhr and abort them manually
	// because IE is not smart enough to do it all by itself
	xhrId = 0,
	xhrCallbacks = {};

if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
		xhrCallbacks = undefined;
	});
}

jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
jQuery.support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;
	// Cross domain only allowed if supported through XMLHttpRequest
	if ( jQuery.support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i, id,
					xhr = options.xhr();
				xhr.open( options.type, options.url, options.async, options.username, options.password );
				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}
				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}
				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}
				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}
				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;
							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file protocol always yields status 0, assume 404
									xhr.status || 404,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// #11426: When requesting binary data, IE9 will throw an exception
									// on any attempt to access responseText
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};
				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");
				// Create the abort callback
				callback = xhrCallbacks[( id = xhrId++ )] = callback("abort");
				// Do send the request
				// This may raise an exception which is actually
				// handled in jQuery.ajax (so no try/catch here)
				xhr.send( options.hasContent && options.data || null );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		elem = this[ 0 ],
		box = { top: 0, left: 0 },
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top + win.pageYOffset - docElem.clientTop,
		left: box.left + win.pageXOffset - docElem.clientLeft
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) && ( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

// If there is a window object, that at least has a document property,
// define jQuery and $ identifiers
if ( typeof window === "object" && typeof window.document === "object" ) {
	window.jQuery = window.$ = jQuery;
}

})( window );

;
/*** <End:monaca-jquery LoadJs:"components/monaca-jquery/jquery.js"> ***/
/*** <End:monaca-jquery> ***/

/*** <Start:vue> ***/
/*** <Start:vue LoadJs:"components/vue/dist/vue.min.js"> ***/
/*!
 * Vue.js v2.5.8
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Vue=t()}(this,function(){"use strict";function e(e){return void 0===e||null===e}function t(e){return void 0!==e&&null!==e}function n(e){return!0===e}function r(e){return!1===e}function i(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e}function o(e){return null!==e&&"object"==typeof e}function a(e){return"[object Object]"===Si.call(e)}function s(e){return"[object RegExp]"===Si.call(e)}function c(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function u(e){return null==e?"":"object"==typeof e?JSON.stringify(e,null,2):String(e)}function l(e){var t=parseFloat(e);return isNaN(t)?e:t}function f(e,t){for(var n=Object.create(null),r=e.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}function d(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}function p(e,t){return ji.call(e,t)}function v(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}function h(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n}function m(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function y(e,t){for(var n in t)e[n]=t[n];return e}function g(e){for(var t={},n=0;n<e.length;n++)e[n]&&y(t,e[n]);return t}function _(e,t,n){}function b(e,t){if(e===t)return!0;var n=o(e),r=o(t);if(!n||!r)return!n&&!r&&String(e)===String(t);try{var i=Array.isArray(e),a=Array.isArray(t);if(i&&a)return e.length===t.length&&e.every(function(e,n){return b(e,t[n])});if(i||a)return!1;var s=Object.keys(e),c=Object.keys(t);return s.length===c.length&&s.every(function(n){return b(e[n],t[n])})}catch(e){return!1}}function $(e,t){for(var n=0;n<e.length;n++)if(b(e[n],t))return n;return-1}function C(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}function w(e){var t=(e+"").charCodeAt(0);return 36===t||95===t}function x(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}function k(e){if(!Vi.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}function A(e){return"function"==typeof e&&/native code/.test(e.toString())}function O(e){lo.target&&fo.push(lo.target),lo.target=e}function S(){lo.target=fo.pop()}function T(e){return new po(void 0,void 0,void 0,String(e))}function E(e,t){var n=e.componentOptions,r=new po(e.tag,e.data,e.children,e.text,e.elm,e.context,n,e.asyncFactory);return r.ns=e.ns,r.isStatic=e.isStatic,r.key=e.key,r.isComment=e.isComment,r.isCloned=!0,t&&(e.children&&(r.children=j(e.children,!0)),n&&n.children&&(n.children=j(n.children,!0))),r}function j(e,t){for(var n=e.length,r=new Array(n),i=0;i<n;i++)r[i]=E(e[i],t);return r}function N(e,t,n){e.__proto__=t}function L(e,t,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];x(e,o,t[o])}}function I(e,t){if(o(e)&&!(e instanceof po)){var n;return p(e,"__ob__")&&e.__ob__ instanceof bo?n=e.__ob__:_o.shouldConvert&&!oo()&&(Array.isArray(e)||a(e))&&Object.isExtensible(e)&&!e._isVue&&(n=new bo(e)),t&&n&&n.vmCount++,n}}function M(e,t,n,r,i){var o=new lo,a=Object.getOwnPropertyDescriptor(e,t);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set,u=!i&&I(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=s?s.call(e):n;return lo.target&&(o.depend(),u&&(u.dep.depend(),Array.isArray(t)&&F(t))),t},set:function(t){var r=s?s.call(e):n;t===r||t!==t&&r!==r||(c?c.call(e,t):n=t,u=!i&&I(t),o.notify())}})}}function D(e,t,n){if(Array.isArray(e)&&c(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(t in e&&!(t in Object.prototype))return e[t]=n,n;var r=e.__ob__;return e._isVue||r&&r.vmCount?n:r?(M(r.value,t,n),r.dep.notify(),n):(e[t]=n,n)}function P(e,t){if(Array.isArray(e)&&c(t))e.splice(t,1);else{var n=e.__ob__;e._isVue||n&&n.vmCount||p(e,t)&&(delete e[t],n&&n.dep.notify())}}function F(e){for(var t=void 0,n=0,r=e.length;n<r;n++)(t=e[n])&&t.__ob__&&t.__ob__.dep.depend(),Array.isArray(t)&&F(t)}function R(e,t){if(!t)return e;for(var n,r,i,o=Object.keys(t),s=0;s<o.length;s++)r=e[n=o[s]],i=t[n],p(e,n)?a(r)&&a(i)&&R(r,i):D(e,n,i);return e}function H(e,t,n){return n?function(){var r="function"==typeof t?t.call(n):t,i="function"==typeof e?e.call(n):e;return r?R(r,i):i}:t?e?function(){return R("function"==typeof t?t.call(this):t,"function"==typeof e?e.call(this):e)}:t:e}function B(e,t){return t?e?e.concat(t):Array.isArray(t)?t:[t]:e}function U(e,t,n,r){var i=Object.create(e||null);return t?y(i,t):i}function V(e,t){var n=e.props;if(n){var r,i,o={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(i=n[r])&&(o[Li(i)]={type:null});else if(a(n))for(var s in n)i=n[s],o[Li(s)]=a(i)?i:{type:i};e.props=o}}function z(e,t){var n=e.inject,r=e.inject={};if(Array.isArray(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(a(n))for(var o in n){var s=n[o];r[o]=a(s)?y({from:o},s):{from:s}}}function K(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}function J(e,t,n){function r(r){var i=$o[r]||xo;c[r]=i(e[r],t[r],n,r)}"function"==typeof t&&(t=t.options),V(t,n),z(t,n),K(t);var i=t.extends;if(i&&(e=J(e,i,n)),t.mixins)for(var o=0,a=t.mixins.length;o<a;o++)e=J(e,t.mixins[o],n);var s,c={};for(s in e)r(s);for(s in t)p(e,s)||r(s);return c}function q(e,t,n,r){if("string"==typeof n){var i=e[t];if(p(i,n))return i[n];var o=Li(n);if(p(i,o))return i[o];var a=Ii(o);if(p(i,a))return i[a];var s=i[n]||i[o]||i[a];return s}}function W(e,t,n,r){var i=t[e],o=!p(n,e),a=n[e];if(X(Boolean,i.type)&&(o&&!p(i,"default")?a=!1:X(String,i.type)||""!==a&&a!==Di(e)||(a=!0)),void 0===a){a=G(r,i,e);var s=_o.shouldConvert;_o.shouldConvert=!0,I(a),_o.shouldConvert=s}return a}function G(e,t,n){if(p(t,"default")){var r=t.default;return e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n]?e._props[n]:"function"==typeof r&&"Function"!==Z(t.type)?r.call(e):r}}function Z(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function X(e,t){if(!Array.isArray(t))return Z(t)===Z(e);for(var n=0,r=t.length;n<r;n++)if(Z(t[n])===Z(e))return!0;return!1}function Y(e,t,n){if(t)for(var r=t;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{if(!1===i[o].call(r,e,t,n))return}catch(e){Q(e,r,"errorCaptured hook")}}Q(e,t,n)}function Q(e,t,n){if(Ui.errorHandler)try{return Ui.errorHandler.call(null,e,t,n)}catch(e){ee(e,null,"config.errorHandler")}ee(e,t,n)}function ee(e,t,n){if(!Ki&&!Ji||"undefined"==typeof console)throw e;console.error(e)}function te(){Ao=!1;var e=ko.slice(0);ko.length=0;for(var t=0;t<e.length;t++)e[t]()}function ne(e){return e._withTask||(e._withTask=function(){Oo=!0;var t=e.apply(null,arguments);return Oo=!1,t})}function re(e,t){var n;if(ko.push(function(){if(e)try{e.call(t)}catch(e){Y(e,t,"nextTick")}else n&&n(t)}),Ao||(Ao=!0,Oo?wo():Co()),!e&&"undefined"!=typeof Promise)return new Promise(function(e){n=e})}function ie(e){oe(e,No),No.clear()}function oe(e,t){var n,r,i=Array.isArray(e);if((i||o(e))&&!Object.isFrozen(e)){if(e.__ob__){var a=e.__ob__.dep.id;if(t.has(a))return;t.add(a)}if(i)for(n=e.length;n--;)oe(e[n],t);else for(n=(r=Object.keys(e)).length;n--;)oe(e[r[n]],t)}}function ae(e){function t(){var e=arguments,n=t.fns;if(!Array.isArray(n))return n.apply(null,arguments);for(var r=n.slice(),i=0;i<r.length;i++)r[i].apply(null,e)}return t.fns=e,t}function se(t,n,r,i,o){var a,s,c,u;for(a in t)s=t[a],c=n[a],u=Lo(a),e(s)||(e(c)?(e(s.fns)&&(s=t[a]=ae(s)),r(u.name,s,u.once,u.capture,u.passive)):s!==c&&(c.fns=s,t[a]=c));for(a in n)e(t[a])&&i((u=Lo(a)).name,n[a],u.capture)}function ce(r,i,o){function a(){o.apply(this,arguments),d(s.fns,a)}r instanceof po&&(r=r.data.hook||(r.data.hook={}));var s,c=r[i];e(c)?s=ae([a]):t(c.fns)&&n(c.merged)?(s=c).fns.push(a):s=ae([c,a]),s.merged=!0,r[i]=s}function ue(n,r,i){var o=r.options.props;if(!e(o)){var a={},s=n.attrs,c=n.props;if(t(s)||t(c))for(var u in o){var l=Di(u);le(a,c,u,l,!0)||le(a,s,u,l,!1)}return a}}function le(e,n,r,i,o){if(t(n)){if(p(n,r))return e[r]=n[r],o||delete n[r],!0;if(p(n,i))return e[r]=n[i],o||delete n[i],!0}return!1}function fe(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}function de(e){return i(e)?[T(e)]:Array.isArray(e)?ve(e):void 0}function pe(e){return t(e)&&t(e.text)&&r(e.isComment)}function ve(r,o){var a,s,c,u,l=[];for(a=0;a<r.length;a++)e(s=r[a])||"boolean"==typeof s||(u=l[c=l.length-1],Array.isArray(s)?s.length>0&&(pe((s=ve(s,(o||"")+"_"+a))[0])&&pe(u)&&(l[c]=T(u.text+s[0].text),s.shift()),l.push.apply(l,s)):i(s)?pe(u)?l[c]=T(u.text+s):""!==s&&l.push(T(s)):pe(s)&&pe(u)?l[c]=T(u.text+s.text):(n(r._isVList)&&t(s.tag)&&e(s.key)&&t(o)&&(s.key="__vlist"+o+"_"+a+"__"),l.push(s)));return l}function he(e,t){return(e.__esModule||so&&"Module"===e[Symbol.toStringTag])&&(e=e.default),o(e)?t.extend(e):e}function me(e,t,n,r,i){var o=ho();return o.asyncFactory=e,o.asyncMeta={data:t,context:n,children:r,tag:i},o}function ye(r,i,a){if(n(r.error)&&t(r.errorComp))return r.errorComp;if(t(r.resolved))return r.resolved;if(n(r.loading)&&t(r.loadingComp))return r.loadingComp;if(!t(r.contexts)){var s=r.contexts=[a],c=!0,u=function(){for(var e=0,t=s.length;e<t;e++)s[e].$forceUpdate()},l=C(function(e){r.resolved=he(e,i),c||u()}),f=C(function(e){t(r.errorComp)&&(r.error=!0,u())}),d=r(l,f);return o(d)&&("function"==typeof d.then?e(r.resolved)&&d.then(l,f):t(d.component)&&"function"==typeof d.component.then&&(d.component.then(l,f),t(d.error)&&(r.errorComp=he(d.error,i)),t(d.loading)&&(r.loadingComp=he(d.loading,i),0===d.delay?r.loading=!0:setTimeout(function(){e(r.resolved)&&e(r.error)&&(r.loading=!0,u())},d.delay||200)),t(d.timeout)&&setTimeout(function(){e(r.resolved)&&f(null)},d.timeout))),c=!1,r.loading?r.loadingComp:r.resolved}r.contexts.push(a)}function ge(e){return e.isComment&&e.asyncFactory}function _e(e){if(Array.isArray(e))for(var n=0;n<e.length;n++){var r=e[n];if(t(r)&&(t(r.componentOptions)||ge(r)))return r}}function be(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&we(e,t)}function $e(e,t,n){n?jo.$once(e,t):jo.$on(e,t)}function Ce(e,t){jo.$off(e,t)}function we(e,t,n){jo=e,se(t,n||{},$e,Ce,e),jo=void 0}function xe(e,t){var n={};if(!e)return n;for(var r=0,i=e.length;r<i;r++){var o=e[r],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,o.context!==t&&o.functionalContext!==t||!a||null==a.slot)(n.default||(n.default=[])).push(o);else{var s=o.data.slot,c=n[s]||(n[s]=[]);"template"===o.tag?c.push.apply(c,o.children):c.push(o)}}for(var u in n)n[u].every(ke)&&delete n[u];return n}function ke(e){return e.isComment&&!e.asyncFactory||" "===e.text}function Ae(e,t){t=t||{};for(var n=0;n<e.length;n++)Array.isArray(e[n])?Ae(e[n],t):t[e[n].key]=e[n].fn;return t}function Oe(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}function Se(e,t,n){e.$el=t,e.$options.render||(e.$options.render=ho),Le(e,"beforeMount");var r;return r=function(){e._update(e._render(),n)},e._watcher=new Uo(e,r,_),n=!1,null==e.$vnode&&(e._isMounted=!0,Le(e,"mounted")),e}function Te(e,t,n,r,i){var o=!!(i||e.$options._renderChildren||r.data.scopedSlots||e.$scopedSlots!==Oi);if(e.$options._parentVnode=r,e.$vnode=r,e._vnode&&(e._vnode.parent=r),e.$options._renderChildren=i,e.$attrs=r.data&&r.data.attrs||Oi,e.$listeners=n||Oi,t&&e.$options.props){_o.shouldConvert=!1;for(var a=e._props,s=e.$options._propKeys||[],c=0;c<s.length;c++){var u=s[c];a[u]=W(u,e.$options.props,t,e)}_o.shouldConvert=!0,e.$options.propsData=t}if(n){var l=e.$options._parentListeners;e.$options._parentListeners=n,we(e,n,l)}o&&(e.$slots=xe(i,r.context),e.$forceUpdate())}function Ee(e){for(;e&&(e=e.$parent);)if(e._inactive)return!0;return!1}function je(e,t){if(t){if(e._directInactive=!1,Ee(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)je(e.$children[n]);Le(e,"activated")}}function Ne(e,t){if(!(t&&(e._directInactive=!0,Ee(e))||e._inactive)){e._inactive=!0;for(var n=0;n<e.$children.length;n++)Ne(e.$children[n]);Le(e,"deactivated")}}function Le(e,t){var n=e.$options[t];if(n)for(var r=0,i=n.length;r<i;r++)try{n[r].call(e)}catch(n){Y(n,e,t+" hook")}e._hasHookEvent&&e.$emit("hook:"+t)}function Ie(){Ho=Mo.length=Do.length=0,Po={},Fo=Ro=!1}function Me(){Ro=!0;var e,t;for(Mo.sort(function(e,t){return e.id-t.id}),Ho=0;Ho<Mo.length;Ho++)t=(e=Mo[Ho]).id,Po[t]=null,e.run();var n=Do.slice(),r=Mo.slice();Ie(),Fe(n),De(r),ao&&Ui.devtools&&ao.emit("flush")}function De(e){for(var t=e.length;t--;){var n=e[t],r=n.vm;r._watcher===n&&r._isMounted&&Le(r,"updated")}}function Pe(e){e._inactive=!1,Do.push(e)}function Fe(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,je(e[t],!0)}function Re(e){var t=e.id;if(null==Po[t]){if(Po[t]=!0,Ro){for(var n=Mo.length-1;n>Ho&&Mo[n].id>e.id;)n--;Mo.splice(n+1,0,e)}else Mo.push(e);Fo||(Fo=!0,re(Me))}}function He(e,t,n){Vo.get=function(){return this[t][n]},Vo.set=function(e){this[t][n]=e},Object.defineProperty(e,n,Vo)}function Be(e){e._watchers=[];var t=e.$options;t.props&&Ue(e,t.props),t.methods&&We(e,t.methods),t.data?Ve(e):I(e._data={},!0),t.computed&&Ke(e,t.computed),t.watch&&t.watch!==eo&&Ge(e,t.watch)}function Ue(e,t){var n=e.$options.propsData||{},r=e._props={},i=e.$options._propKeys=[],o=!e.$parent;_o.shouldConvert=o;for(var a in t)!function(o){i.push(o);var a=W(o,t,n,e);M(r,o,a),o in e||He(e,"_props",o)}(a);_o.shouldConvert=!0}function Ve(e){var t=e.$options.data;a(t=e._data="function"==typeof t?ze(t,e):t||{})||(t={});for(var n=Object.keys(t),r=e.$options.props,i=n.length;i--;){var o=n[i];r&&p(r,o)||w(o)||He(e,"_data",o)}I(t,!0)}function ze(e,t){try{return e.call(t,t)}catch(e){return Y(e,t,"data()"),{}}}function Ke(e,t){var n=e._computedWatchers=Object.create(null),r=oo();for(var i in t){var o=t[i],a="function"==typeof o?o:o.get;r||(n[i]=new Uo(e,a||_,_,zo)),i in e||Je(e,i,o)}}function Je(e,t,n){var r=!oo();"function"==typeof n?(Vo.get=r?qe(t):n,Vo.set=_):(Vo.get=n.get?r&&!1!==n.cache?qe(t):n.get:_,Vo.set=n.set?n.set:_),Object.defineProperty(e,t,Vo)}function qe(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),lo.target&&t.depend(),t.value}}function We(e,t){for(var n in t)e[n]=null==t[n]?_:h(t[n],e)}function Ge(e,t){for(var n in t){var r=t[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)Ze(e,n,r[i]);else Ze(e,n,r)}}function Ze(e,t,n,r){return a(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}function Xe(e){var t=e.$options.provide;t&&(e._provided="function"==typeof t?t.call(e):t)}function Ye(e){var t=Qe(e.$options.inject,e);t&&(_o.shouldConvert=!1,Object.keys(t).forEach(function(n){M(e,n,t[n])}),_o.shouldConvert=!0)}function Qe(e,t){if(e){for(var n=Object.create(null),r=so?Reflect.ownKeys(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}):Object.keys(e),i=0;i<r.length;i++){for(var o=r[i],a=e[o].from,s=t;s;){if(s._provided&&a in s._provided){n[o]=s._provided[a];break}s=s.$parent}if(!s&&"default"in e[o]){var c=e[o].default;n[o]="function"==typeof c?c.call(t):c}}return n}}function et(e,n){var r,i,a,s,c;if(Array.isArray(e)||"string"==typeof e)for(r=new Array(e.length),i=0,a=e.length;i<a;i++)r[i]=n(e[i],i);else if("number"==typeof e)for(r=new Array(e),i=0;i<e;i++)r[i]=n(i+1,i);else if(o(e))for(s=Object.keys(e),r=new Array(s.length),i=0,a=s.length;i<a;i++)c=s[i],r[i]=n(e[c],c,i);return t(r)&&(r._isVList=!0),r}function tt(e,t,n,r){var i,o=this.$scopedSlots[e];if(o)n=n||{},r&&(n=y(y({},r),n)),i=o(n)||t;else{var a=this.$slots[e];a&&(a._rendered=!0),i=a||t}var s=n&&n.slot;return s?this.$createElement("template",{slot:s},i):i}function nt(e){return q(this.$options,"filters",e,!0)||Fi}function rt(e,t,n,r){var i=Ui.keyCodes[t]||n;return i?Array.isArray(i)?-1===i.indexOf(e):i!==e:r?Di(r)!==t:void 0}function it(e,t,n,r,i){if(n)if(o(n)){Array.isArray(n)&&(n=g(n));var a;for(var s in n)!function(o){if("class"===o||"style"===o||Ei(o))a=e;else{var s=e.attrs&&e.attrs.type;a=r||Ui.mustUseProp(t,s,o)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}o in a||(a[o]=n[o],i&&((e.on||(e.on={}))["update:"+o]=function(e){n[o]=e}))}(s)}else;return e}function ot(e,t,n){var r=arguments.length<3,i=this.$options.staticRenderFns,o=r||n?this._staticTrees||(this._staticTrees=[]):i.cached||(i.cached=[]),a=o[e];return a&&!t?Array.isArray(a)?j(a):E(a):(a=o[e]=i[e].call(this._renderProxy,null,this),st(a,"__static__"+e,!1),a)}function at(e,t,n){return st(e,"__once__"+t+(n?"_"+n:""),!0),e}function st(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!=typeof e[r]&&ct(e[r],t+"_"+r,n);else ct(e,t,n)}function ct(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function ut(e,t){if(t)if(a(t)){var n=e.on=e.on?y({},e.on):{};for(var r in t){var i=n[r],o=t[r];n[r]=i?[].concat(i,o):o}}else;return e}function lt(e){e._o=at,e._n=l,e._s=u,e._l=et,e._t=tt,e._q=b,e._i=$,e._m=ot,e._f=nt,e._k=rt,e._b=it,e._v=T,e._e=ho,e._u=Ae,e._g=ut}function ft(e,t,r,i,o){var a=o.options;this.data=e,this.props=t,this.children=r,this.parent=i,this.listeners=e.on||Oi,this.injections=Qe(a.inject,i),this.slots=function(){return xe(r,i)};var s=Object.create(i),c=n(a._compiled),u=!c;c&&(this.$options=a,this.$slots=this.slots(),this.$scopedSlots=e.scopedSlots||Oi),a._scopeId?this._c=function(e,t,n,r){var o=_t(s,e,t,n,r,u);return o&&(o.functionalScopeId=a._scopeId,o.functionalContext=i),o}:this._c=function(e,t,n,r){return _t(s,e,t,n,r,u)}}function dt(e,n,r,i,o){var a=e.options,s={},c=a.props;if(t(c))for(var u in c)s[u]=W(u,c,n||Oi);else t(r.attrs)&&pt(s,r.attrs),t(r.props)&&pt(s,r.props);var l=new ft(r,s,o,i,e),f=a.render.call(null,l._c,l);return f instanceof po&&(f.functionalContext=i,f.functionalOptions=a,r.slot&&((f.data||(f.data={})).slot=r.slot)),f}function pt(e,t){for(var n in t)e[Li(n)]=t[n]}function vt(r,i,a,s,c){if(!e(r)){var u=a.$options._base;if(o(r)&&(r=u.extend(r)),"function"==typeof r){var l;if(e(r.cid)&&(l=r,void 0===(r=ye(l,u,a))))return me(l,i,a,s,c);i=i||{},xt(r),t(i.model)&&gt(r.options,i);var f=ue(i,r,c);if(n(r.options.functional))return dt(r,f,i,a,s);var d=i.on;if(i.on=i.nativeOn,n(r.options.abstract)){var p=i.slot;i={},p&&(i.slot=p)}mt(i);var v=r.options.name||c;return new po("vue-component-"+r.cid+(v?"-"+v:""),i,void 0,void 0,void 0,a,{Ctor:r,propsData:f,listeners:d,tag:c,children:s},l)}}}function ht(e,n,r,i){var o=e.componentOptions,a={_isComponent:!0,parent:n,propsData:o.propsData,_componentTag:o.tag,_parentVnode:e,_parentListeners:o.listeners,_renderChildren:o.children,_parentElm:r||null,_refElm:i||null},s=e.data.inlineTemplate;return t(s)&&(a.render=s.render,a.staticRenderFns=s.staticRenderFns),new o.Ctor(a)}function mt(e){e.hook||(e.hook={});for(var t=0;t<Jo.length;t++){var n=Jo[t],r=e.hook[n],i=Ko[n];e.hook[n]=r?yt(i,r):i}}function yt(e,t){return function(n,r,i,o){e(n,r,i,o),t(n,r,i,o)}}function gt(e,n){var r=e.model&&e.model.prop||"value",i=e.model&&e.model.event||"input";(n.props||(n.props={}))[r]=n.model.value;var o=n.on||(n.on={});t(o[i])?o[i]=[n.model.callback].concat(o[i]):o[i]=n.model.callback}function _t(e,t,r,o,a,s){return(Array.isArray(r)||i(r))&&(a=o,o=r,r=void 0),n(s)&&(a=Wo),bt(e,t,r,o,a)}function bt(e,n,r,i,o){if(t(r)&&t(r.__ob__))return ho();if(t(r)&&t(r.is)&&(n=r.is),!n)return ho();Array.isArray(i)&&"function"==typeof i[0]&&((r=r||{}).scopedSlots={default:i[0]},i.length=0),o===Wo?i=de(i):o===qo&&(i=fe(i));var a,s;if("string"==typeof n){var c;s=e.$vnode&&e.$vnode.ns||Ui.getTagNamespace(n),a=Ui.isReservedTag(n)?new po(Ui.parsePlatformTagName(n),r,i,void 0,void 0,e):t(c=q(e.$options,"components",n))?vt(c,r,e,i,n):new po(n,r,i,void 0,void 0,e)}else a=vt(n,r,e,i);return t(a)?(s&&$t(a,s),a):ho()}function $t(r,i,o){if(r.ns=i,"foreignObject"===r.tag&&(i=void 0,o=!0),t(r.children))for(var a=0,s=r.children.length;a<s;a++){var c=r.children[a];t(c.tag)&&(e(c.ns)||n(o))&&$t(c,i,o)}}function Ct(e){e._vnode=null,e._staticTrees=null;var t=e.$options,n=e.$vnode=t._parentVnode,r=n&&n.context;e.$slots=xe(t._renderChildren,r),e.$scopedSlots=Oi,e._c=function(t,n,r,i){return _t(e,t,n,r,i,!1)},e.$createElement=function(t,n,r,i){return _t(e,t,n,r,i,!0)};var i=n&&n.data;M(e,"$attrs",i&&i.attrs||Oi,null,!0),M(e,"$listeners",t._parentListeners||Oi,null,!0)}function wt(e,t){var n=e.$options=Object.create(e.constructor.options);n.parent=t.parent,n.propsData=t.propsData,n._parentVnode=t._parentVnode,n._parentListeners=t._parentListeners,n._renderChildren=t._renderChildren,n._componentTag=t._componentTag,n._parentElm=t._parentElm,n._refElm=t._refElm,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}function xt(e){var t=e.options;if(e.super){var n=xt(e.super);if(n!==e.superOptions){e.superOptions=n;var r=kt(e);r&&y(e.extendOptions,r),(t=e.options=J(n,e.extendOptions)).name&&(t.components[t.name]=e)}}return t}function kt(e){var t,n=e.options,r=e.extendOptions,i=e.sealedOptions;for(var o in n)n[o]!==i[o]&&(t||(t={}),t[o]=At(n[o],r[o],i[o]));return t}function At(e,t,n){if(Array.isArray(e)){var r=[];n=Array.isArray(n)?n:[n],t=Array.isArray(t)?t:[t];for(var i=0;i<e.length;i++)(t.indexOf(e[i])>=0||n.indexOf(e[i])<0)&&r.push(e[i]);return r}return e}function Ot(e){this._init(e)}function St(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var n=m(arguments,1);return n.unshift(this),"function"==typeof e.install?e.install.apply(e,n):"function"==typeof e&&e.apply(null,n),t.push(e),this}}function Tt(e){e.mixin=function(e){return this.options=J(this.options,e),this}}function Et(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=n.cid,i=e._Ctor||(e._Ctor={});if(i[r])return i[r];var o=e.name||n.options.name,a=function(e){this._init(e)};return a.prototype=Object.create(n.prototype),a.prototype.constructor=a,a.cid=t++,a.options=J(n.options,e),a.super=n,a.options.props&&jt(a),a.options.computed&&Nt(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,Hi.forEach(function(e){a[e]=n[e]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=e,a.sealedOptions=y({},a.options),i[r]=a,a}}function jt(e){var t=e.options.props;for(var n in t)He(e.prototype,"_props",n)}function Nt(e){var t=e.options.computed;for(var n in t)Je(e.prototype,n,t[n])}function Lt(e){Hi.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&a(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}function It(e){return e&&(e.Ctor.options.name||e.tag)}function Mt(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"==typeof e?e.split(",").indexOf(t)>-1:!!s(e)&&e.test(t)}function Dt(e,t){var n=e.cache,r=e.keys,i=e._vnode;for(var o in n){var a=n[o];if(a){var s=It(a.componentOptions);s&&!t(s)&&Pt(n,o,r,i)}}}function Pt(e,t,n,r){var i=e[t];i&&i!==r&&i.componentInstance.$destroy(),e[t]=null,d(n,t)}function Ft(e){for(var n=e.data,r=e,i=e;t(i.componentInstance);)(i=i.componentInstance._vnode).data&&(n=Rt(i.data,n));for(;t(r=r.parent);)r.data&&(n=Rt(n,r.data));return Ht(n.staticClass,n.class)}function Rt(e,n){return{staticClass:Bt(e.staticClass,n.staticClass),class:t(e.class)?[e.class,n.class]:n.class}}function Ht(e,n){return t(e)||t(n)?Bt(e,Ut(n)):""}function Bt(e,t){return e?t?e+" "+t:e:t||""}function Ut(e){return Array.isArray(e)?Vt(e):o(e)?zt(e):"string"==typeof e?e:""}function Vt(e){for(var n,r="",i=0,o=e.length;i<o;i++)t(n=Ut(e[i]))&&""!==n&&(r&&(r+=" "),r+=n);return r}function zt(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function Kt(e){return ya(e)?"svg":"math"===e?"math":void 0}function Jt(e){if("string"==typeof e){var t=document.querySelector(e);return t||document.createElement("div")}return e}function qt(e,t){var n=e.data.ref;if(n){var r=e.context,i=e.componentInstance||e.elm,o=r.$refs;t?Array.isArray(o[n])?d(o[n],i):o[n]===i&&(o[n]=void 0):e.data.refInFor?Array.isArray(o[n])?o[n].indexOf(i)<0&&o[n].push(i):o[n]=[i]:o[n]=i}}function Wt(r,i){return r.key===i.key&&(r.tag===i.tag&&r.isComment===i.isComment&&t(r.data)===t(i.data)&&Gt(r,i)||n(r.isAsyncPlaceholder)&&r.asyncFactory===i.asyncFactory&&e(i.asyncFactory.error))}function Gt(e,n){if("input"!==e.tag)return!0;var r,i=t(r=e.data)&&t(r=r.attrs)&&r.type,o=t(r=n.data)&&t(r=r.attrs)&&r.type;return i===o||ba(i)&&ba(o)}function Zt(e,n,r){var i,o,a={};for(i=n;i<=r;++i)t(o=e[i].key)&&(a[o]=i);return a}function Xt(e,t){(e.data.directives||t.data.directives)&&Yt(e,t)}function Yt(e,t){var n,r,i,o=e===wa,a=t===wa,s=Qt(e.data.directives,e.context),c=Qt(t.data.directives,t.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,tn(i,"update",t,e),i.def&&i.def.componentUpdated&&l.push(i)):(tn(i,"bind",t,e),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)tn(u[n],"inserted",t,e)};o?ce(t,"insert",f):f()}if(l.length&&ce(t,"postpatch",function(){for(var n=0;n<l.length;n++)tn(l[n],"componentUpdated",t,e)}),!o)for(n in s)c[n]||tn(s[n],"unbind",e,e,a)}function Qt(e,t){var n=Object.create(null);if(!e)return n;var r,i;for(r=0;r<e.length;r++)(i=e[r]).modifiers||(i.modifiers=Aa),n[en(i)]=i,i.def=q(t.$options,"directives",i.name,!0);return n}function en(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function tn(e,t,n,r,i){var o=e.def&&e.def[t];if(o)try{o(n.elm,e,n,r,i)}catch(r){Y(r,n.context,"directive "+e.name+" "+t+" hook")}}function nn(n,r){var i=r.componentOptions;if(!(t(i)&&!1===i.Ctor.options.inheritAttrs||e(n.data.attrs)&&e(r.data.attrs))){var o,a,s=r.elm,c=n.data.attrs||{},u=r.data.attrs||{};t(u.__ob__)&&(u=r.data.attrs=y({},u));for(o in u)a=u[o],c[o]!==a&&rn(s,o,a);(Zi||Xi)&&u.value!==c.value&&rn(s,"value",u.value);for(o in c)e(u[o])&&(da(o)?s.removeAttributeNS(fa,pa(o)):ua(o)||s.removeAttribute(o))}}function rn(e,t,n){la(t)?va(n)?e.removeAttribute(t):(n="allowfullscreen"===t&&"EMBED"===e.tagName?"true":t,e.setAttribute(t,n)):ua(t)?e.setAttribute(t,va(n)||"false"===n?"false":"true"):da(t)?va(n)?e.removeAttributeNS(fa,pa(t)):e.setAttributeNS(fa,t,n):va(n)?e.removeAttribute(t):e.setAttribute(t,n)}function on(n,r){var i=r.elm,o=r.data,a=n.data;if(!(e(o.staticClass)&&e(o.class)&&(e(a)||e(a.staticClass)&&e(a.class)))){var s=Ft(r),c=i._transitionClasses;t(c)&&(s=Bt(s,Ut(c))),s!==i._prevClass&&(i.setAttribute("class",s),i._prevClass=s)}}function an(e){function t(){(a||(a=[])).push(e.slice(v,i).trim()),v=i+1}var n,r,i,o,a,s=!1,c=!1,u=!1,l=!1,f=0,d=0,p=0,v=0;for(i=0;i<e.length;i++)if(r=n,n=e.charCodeAt(i),s)39===n&&92!==r&&(s=!1);else if(c)34===n&&92!==r&&(c=!1);else if(u)96===n&&92!==r&&(u=!1);else if(l)47===n&&92!==r&&(l=!1);else if(124!==n||124===e.charCodeAt(i+1)||124===e.charCodeAt(i-1)||f||d||p){switch(n){case 34:c=!0;break;case 39:s=!0;break;case 96:u=!0;break;case 40:p++;break;case 41:p--;break;case 91:d++;break;case 93:d--;break;case 123:f++;break;case 125:f--}if(47===n){for(var h=i-1,m=void 0;h>=0&&" "===(m=e.charAt(h));h--);m&&Ea.test(m)||(l=!0)}}else void 0===o?(v=i+1,o=e.slice(0,i).trim()):t();if(void 0===o?o=e.slice(0,i).trim():0!==v&&t(),a)for(i=0;i<a.length;i++)o=sn(o,a[i]);return o}function sn(e,t){var n=t.indexOf("(");return n<0?'_f("'+t+'")('+e+")":'_f("'+t.slice(0,n)+'")('+e+","+t.slice(n+1)}function cn(e){console.error("[Vue compiler]: "+e)}function un(e,t){return e?e.map(function(e){return e[t]}).filter(function(e){return e}):[]}function ln(e,t,n){(e.props||(e.props=[])).push({name:t,value:n})}function fn(e,t,n){(e.attrs||(e.attrs=[])).push({name:t,value:n})}function dn(e,t,n,r,i,o){(e.directives||(e.directives=[])).push({name:t,rawName:n,value:r,arg:i,modifiers:o})}function pn(e,t,n,r,i,o){(r=r||Oi).capture&&(delete r.capture,t="!"+t),r.once&&(delete r.once,t="~"+t),r.passive&&(delete r.passive,t="&"+t),"click"===t&&(r.right?(t="contextmenu",delete r.right):r.middle&&(t="mouseup"));var a;r.native?(delete r.native,a=e.nativeEvents||(e.nativeEvents={})):a=e.events||(e.events={});var s={value:n};r!==Oi&&(s.modifiers=r);var c=a[t];Array.isArray(c)?i?c.unshift(s):c.push(s):a[t]=c?i?[s,c]:[c,s]:s}function vn(e,t,n){var r=hn(e,":"+t)||hn(e,"v-bind:"+t);if(null!=r)return an(r);if(!1!==n){var i=hn(e,t);if(null!=i)return JSON.stringify(i)}}function hn(e,t,n){var r;if(null!=(r=e.attrsMap[t]))for(var i=e.attrsList,o=0,a=i.length;o<a;o++)if(i[o].name===t){i.splice(o,1);break}return n&&delete e.attrsMap[t],r}function mn(e,t,n){var r=n||{},i=r.number,o="$$v";r.trim&&(o="(typeof $$v === 'string'? $$v.trim(): $$v)"),i&&(o="_n("+o+")");var a=yn(t,o);e.model={value:"("+t+")",expression:'"'+t+'"',callback:"function ($$v) {"+a+"}"}}function yn(e,t){var n=gn(e);return null===n.key?e+"="+t:"$set("+n.exp+", "+n.key+", "+t+")"}function gn(e){if(Yo=e.length,e.indexOf("[")<0||e.lastIndexOf("]")<Yo-1)return(ta=e.lastIndexOf("."))>-1?{exp:e.slice(0,ta),key:'"'+e.slice(ta+1)+'"'}:{exp:e,key:null};for(Qo=e,ta=na=ra=0;!bn();)$n(ea=_n())?wn(ea):91===ea&&Cn(ea);return{exp:e.slice(0,na),key:e.slice(na+1,ra)}}function _n(){return Qo.charCodeAt(++ta)}function bn(){return ta>=Yo}function $n(e){return 34===e||39===e}function Cn(e){var t=1;for(na=ta;!bn();)if(e=_n(),$n(e))wn(e);else if(91===e&&t++,93===e&&t--,0===t){ra=ta;break}}function wn(e){for(var t=e;!bn()&&(e=_n())!==t;);}function xn(e,t,n){var r=n&&n.number,i=vn(e,"value")||"null",o=vn(e,"true-value")||"true",a=vn(e,"false-value")||"false";ln(e,"checked","Array.isArray("+t+")?_i("+t+","+i+")>-1"+("true"===o?":("+t+")":":_q("+t+","+o+")")),pn(e,"change","var $$a="+t+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&("+t+"=$$a.concat([$$v]))}else{$$i>-1&&("+t+"=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{"+yn(t,"$$c")+"}",null,!0)}function kn(e,t,n){var r=n&&n.number,i=vn(e,"value")||"null";ln(e,"checked","_q("+t+","+(i=r?"_n("+i+")":i)+")"),pn(e,"change",yn(t,i),null,!0)}function An(e,t,n){var r="var $$selectedVal = "+('Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"})")+";";pn(e,"change",r=r+" "+yn(t,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),null,!0)}function On(e,t,n){var r=e.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?ja:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=yn(t,l);c&&(f="if($event.target.composing)return;"+f),ln(e,"value","("+t+")"),pn(e,u,f,null,!0),(s||a)&&pn(e,"blur","$forceUpdate()")}function Sn(e){if(t(e[ja])){var n=Gi?"change":"input";e[n]=[].concat(e[ja],e[n]||[]),delete e[ja]}t(e[Na])&&(e.change=[].concat(e[Na],e.change||[]),delete e[Na])}function Tn(e,t,n){var r=ia;return function i(){null!==e.apply(null,arguments)&&jn(t,i,n,r)}}function En(e,t,n,r,i){t=ne(t),n&&(t=Tn(t,e,r)),ia.addEventListener(e,t,to?{capture:r,passive:i}:r)}function jn(e,t,n,r){(r||ia).removeEventListener(e,t._withTask||t,n)}function Nn(t,n){if(!e(t.data.on)||!e(n.data.on)){var r=n.data.on||{},i=t.data.on||{};ia=n.elm,Sn(r),se(r,i,En,jn,n.context),ia=void 0}}function Ln(n,r){if(!e(n.data.domProps)||!e(r.data.domProps)){var i,o,a=r.elm,s=n.data.domProps||{},c=r.data.domProps||{};t(c.__ob__)&&(c=r.data.domProps=y({},c));for(i in s)e(c[i])&&(a[i]="");for(i in c){if(o=c[i],"textContent"===i||"innerHTML"===i){if(r.children&&(r.children.length=0),o===s[i])continue;1===a.childNodes.length&&a.removeChild(a.childNodes[0])}if("value"===i){a._value=o;var u=e(o)?"":String(o);In(a,u)&&(a.value=u)}else a[i]=o}}}function In(e,t){return!e.composing&&("OPTION"===e.tagName||Mn(e,t)||Dn(e,t))}function Mn(e,t){var n=!0;try{n=document.activeElement!==e}catch(e){}return n&&e.value!==t}function Dn(e,n){var r=e.value,i=e._vModifiers;return t(i)&&i.number?l(r)!==l(n):t(i)&&i.trim?r.trim()!==n.trim():r!==n}function Pn(e){var t=Fn(e.style);return e.staticStyle?y(e.staticStyle,t):t}function Fn(e){return Array.isArray(e)?g(e):"string"==typeof e?Ma(e):e}function Rn(e,t){var n,r={};if(t)for(var i=e;i.componentInstance;)(i=i.componentInstance._vnode).data&&(n=Pn(i.data))&&y(r,n);(n=Pn(e.data))&&y(r,n);for(var o=e;o=o.parent;)o.data&&(n=Pn(o.data))&&y(r,n);return r}function Hn(n,r){var i=r.data,o=n.data;if(!(e(i.staticStyle)&&e(i.style)&&e(o.staticStyle)&&e(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,d=Fn(r.data.style)||{};r.data.normalizedStyle=t(d.__ob__)?y({},d):d;var p=Rn(r,!0);for(s in f)e(p[s])&&Fa(c,s,"");for(s in p)(a=p[s])!==f[s]&&Fa(c,s,null==a?"":a)}}function Bn(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+(e.getAttribute("class")||"")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function Un(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t),e.classList.length||e.removeAttribute("class");else{for(var n=" "+(e.getAttribute("class")||"")+" ",r=" "+t+" ";n.indexOf(r)>=0;)n=n.replace(r," ");(n=n.trim())?e.setAttribute("class",n):e.removeAttribute("class")}}function Vn(e){if(e){if("object"==typeof e){var t={};return!1!==e.css&&y(t,Ua(e.name||"v")),y(t,e),t}return"string"==typeof e?Ua(e):void 0}}function zn(e){Za(function(){Za(e)})}function Kn(e,t){var n=e._transitionClasses||(e._transitionClasses=[]);n.indexOf(t)<0&&(n.push(t),Bn(e,t))}function Jn(e,t){e._transitionClasses&&d(e._transitionClasses,t),Un(e,t)}function qn(e,t,n){var r=Wn(e,t),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===za?qa:Ga,c=0,u=function(){e.removeEventListener(s,l),n()},l=function(t){t.target===e&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),e.addEventListener(s,l)}function Wn(e,t){var n,r=window.getComputedStyle(e),i=r[Ja+"Delay"].split(", "),o=r[Ja+"Duration"].split(", "),a=Gn(i,o),s=r[Wa+"Delay"].split(", "),c=r[Wa+"Duration"].split(", "),u=Gn(s,c),l=0,f=0;return t===za?a>0&&(n=za,l=a,f=o.length):t===Ka?u>0&&(n=Ka,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?za:Ka:null)?n===za?o.length:c.length:0,{type:n,timeout:l,propCount:f,hasTransform:n===za&&Xa.test(r[Ja+"Property"])}}function Gn(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max.apply(null,t.map(function(t,n){return Zn(t)+Zn(e[n])}))}function Zn(e){return 1e3*Number(e.slice(0,-1))}function Xn(n,r){var i=n.elm;t(i._leaveCb)&&(i._leaveCb.cancelled=!0,i._leaveCb());var a=Vn(n.data.transition);if(!e(a)&&!t(i._enterCb)&&1===i.nodeType){for(var s=a.css,c=a.type,u=a.enterClass,f=a.enterToClass,d=a.enterActiveClass,p=a.appearClass,v=a.appearToClass,h=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,_=a.enterCancelled,b=a.beforeAppear,$=a.appear,w=a.afterAppear,x=a.appearCancelled,k=a.duration,A=Io,O=Io.$vnode;O&&O.parent;)A=(O=O.parent).context;var S=!A._isMounted||!n.isRootInsert;if(!S||$||""===$){var T=S&&p?p:u,E=S&&h?h:d,j=S&&v?v:f,N=S?b||m:m,L=S&&"function"==typeof $?$:y,I=S?w||g:g,M=S?x||_:_,D=l(o(k)?k.enter:k),P=!1!==s&&!Zi,F=er(L),R=i._enterCb=C(function(){P&&(Jn(i,j),Jn(i,E)),R.cancelled?(P&&Jn(i,T),M&&M(i)):I&&I(i),i._enterCb=null});n.data.show||ce(n,"insert",function(){var e=i.parentNode,t=e&&e._pending&&e._pending[n.key];t&&t.tag===n.tag&&t.elm._leaveCb&&t.elm._leaveCb(),L&&L(i,R)}),N&&N(i),P&&(Kn(i,T),Kn(i,E),zn(function(){Kn(i,j),Jn(i,T),R.cancelled||F||(Qn(D)?setTimeout(R,D):qn(i,c,R))})),n.data.show&&(r&&r(),L&&L(i,R)),P||F||R()}}}function Yn(n,r){function i(){x.cancelled||(n.data.show||((a.parentNode._pending||(a.parentNode._pending={}))[n.key]=n),v&&v(a),b&&(Kn(a,f),Kn(a,p),zn(function(){Kn(a,d),Jn(a,f),x.cancelled||$||(Qn(w)?setTimeout(x,w):qn(a,u,x))})),h&&h(a,x),b||$||x())}var a=n.elm;t(a._enterCb)&&(a._enterCb.cancelled=!0,a._enterCb());var s=Vn(n.data.transition);if(e(s)||1!==a.nodeType)return r();if(!t(a._leaveCb)){var c=s.css,u=s.type,f=s.leaveClass,d=s.leaveToClass,p=s.leaveActiveClass,v=s.beforeLeave,h=s.leave,m=s.afterLeave,y=s.leaveCancelled,g=s.delayLeave,_=s.duration,b=!1!==c&&!Zi,$=er(h),w=l(o(_)?_.leave:_),x=a._leaveCb=C(function(){a.parentNode&&a.parentNode._pending&&(a.parentNode._pending[n.key]=null),b&&(Jn(a,d),Jn(a,p)),x.cancelled?(b&&Jn(a,f),y&&y(a)):(r(),m&&m(a)),a._leaveCb=null});g?g(i):i()}}function Qn(e){return"number"==typeof e&&!isNaN(e)}function er(n){if(e(n))return!1;var r=n.fns;return t(r)?er(Array.isArray(r)?r[0]:r):(n._length||n.length)>1}function tr(e,t){!0!==t.data.show&&Xn(t)}function nr(e,t,n){rr(e,t,n),(Gi||Xi)&&setTimeout(function(){rr(e,t,n)},0)}function rr(e,t,n){var r=t.value,i=e.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=e.options.length;s<c;s++)if(a=e.options[s],i)o=$(r,or(a))>-1,a.selected!==o&&(a.selected=o);else if(b(or(a),r))return void(e.selectedIndex!==s&&(e.selectedIndex=s));i||(e.selectedIndex=-1)}}function ir(e,t){return t.every(function(t){return!b(t,e)})}function or(e){return"_value"in e?e._value:e.value}function ar(e){e.target.composing=!0}function sr(e){e.target.composing&&(e.target.composing=!1,cr(e.target,"input"))}function cr(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function ur(e){return!e.componentInstance||e.data&&e.data.transition?e:ur(e.componentInstance._vnode)}function lr(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?lr(_e(t.children)):e}function fr(e){var t={},n=e.$options;for(var r in n.propsData)t[r]=e[r];var i=n._parentListeners;for(var o in i)t[Li(o)]=i[o];return t}function dr(e,t){if(/\d-keep-alive$/.test(t.tag))return e("keep-alive",{props:t.componentOptions.propsData})}function pr(e){for(;e=e.parent;)if(e.data.transition)return!0}function vr(e,t){return t.key===e.key&&t.tag===e.tag}function hr(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function mr(e){e.data.newPos=e.elm.getBoundingClientRect()}function yr(e){var t=e.data.pos,n=e.data.newPos,r=t.left-n.left,i=t.top-n.top;if(r||i){e.data.moved=!0;var o=e.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}function gr(e,t){var n=t?cs(t):as;if(n.test(e)){for(var r,i,o=[],a=n.lastIndex=0;r=n.exec(e);){(i=r.index)>a&&o.push(JSON.stringify(e.slice(a,i)));var s=an(r[1].trim());o.push("_s("+s+")"),a=i+r[0].length}return a<e.length&&o.push(JSON.stringify(e.slice(a))),o.join("+")}}function _r(e,t){var n=t?Hs:Rs;return e.replace(n,function(e){return Fs[e]})}function br(e,t){function n(t){l+=t,e=e.substring(t)}function r(e,n,r){var i,s;if(null==n&&(n=l),null==r&&(r=l),e&&(s=e.toLowerCase()),e)for(i=a.length-1;i>=0&&a[i].lowerCasedTag!==s;i--);else i=0;if(i>=0){for(var c=a.length-1;c>=i;c--)t.end&&t.end(a[c].tag,n,r);a.length=i,o=i&&a[i-1].tag}else"br"===s?t.start&&t.start(e,[],!0,n,r):"p"===s&&(t.start&&t.start(e,[],!1,n,r),t.end&&t.end(e,n,r))}for(var i,o,a=[],s=t.expectHTML,c=t.isUnaryTag||Pi,u=t.canBeLeftOpenTag||Pi,l=0;e;){if(i=e,o&&Ds(o)){var f=0,d=o.toLowerCase(),p=Ps[d]||(Ps[d]=new RegExp("([\\s\\S]*?)(</"+d+"[^>]*>)","i")),v=e.replace(p,function(e,n,r){return f=r.length,Ds(d)||"noscript"===d||(n=n.replace(/<!--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),Us(d,n)&&(n=n.slice(1)),t.chars&&t.chars(n),""});l+=e.length-v.length,e=v,r(d,l-f,l)}else{var h=e.indexOf("<");if(0===h){if(Cs.test(e)){var m=e.indexOf("--\x3e");if(m>=0){t.shouldKeepComment&&t.comment(e.substring(4,m)),n(m+3);continue}}if(ws.test(e)){var y=e.indexOf("]>");if(y>=0){n(y+2);continue}}var g=e.match($s);if(g){n(g[0].length);continue}var _=e.match(bs);if(_){var b=l;n(_[0].length),r(_[1],b,l);continue}var $=function(){var t=e.match(gs);if(t){var r={tagName:t[1],attrs:[],start:l};n(t[0].length);for(var i,o;!(i=e.match(_s))&&(o=e.match(hs));)n(o[0].length),r.attrs.push(o);if(i)return r.unarySlash=i[1],n(i[0].length),r.end=l,r}}();if($){!function(e){var n=e.tagName,i=e.unarySlash;s&&("p"===o&&vs(n)&&r(o),u(n)&&o===n&&r(n));for(var l=c(n)||!!i,f=e.attrs.length,d=new Array(f),p=0;p<f;p++){var v=e.attrs[p];xs&&-1===v[0].indexOf('""')&&(""===v[3]&&delete v[3],""===v[4]&&delete v[4],""===v[5]&&delete v[5]);var h=v[3]||v[4]||v[5]||"",m="a"===n&&"href"===v[1]?t.shouldDecodeNewlinesForHref:t.shouldDecodeNewlines;d[p]={name:v[1],value:_r(h,m)}}l||(a.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:d}),o=n),t.start&&t.start(n,d,l,e.start,e.end)}($),Us(o,e)&&n(1);continue}}var C=void 0,w=void 0,x=void 0;if(h>=0){for(w=e.slice(h);!(bs.test(w)||gs.test(w)||Cs.test(w)||ws.test(w)||(x=w.indexOf("<",1))<0);)h+=x,w=e.slice(h);C=e.substring(0,h),n(h)}h<0&&(C=e,e=""),t.chars&&C&&t.chars(C)}if(e===i){t.chars&&t.chars(e);break}}r()}function $r(e,t,n){return{type:1,tag:e,attrsList:t,attrsMap:Rr(t),parent:n,children:[]}}function Cr(e,t){function n(e){e.pre&&(s=!1),Es(e.tag)&&(c=!1)}ks=t.warn||cn,Es=t.isPreTag||Pi,js=t.mustUseProp||Pi,Ns=t.getTagNamespace||Pi,Os=un(t.modules,"transformNode"),Ss=un(t.modules,"preTransformNode"),Ts=un(t.modules,"postTransformNode"),As=t.delimiters;var r,i,o=[],a=!1!==t.preserveWhitespace,s=!1,c=!1;return br(e,{warn:ks,expectHTML:t.expectHTML,isUnaryTag:t.isUnaryTag,canBeLeftOpenTag:t.canBeLeftOpenTag,shouldDecodeNewlines:t.shouldDecodeNewlines,shouldDecodeNewlinesForHref:t.shouldDecodeNewlinesForHref,shouldKeepComment:t.comments,start:function(e,a,u){var l=i&&i.ns||Ns(e);Gi&&"svg"===l&&(a=Ur(a));var f=$r(e,a,i);l&&(f.ns=l),Br(f)&&!oo()&&(f.forbidden=!0);for(var d=0;d<Ss.length;d++)f=Ss[d](f,t)||f;if(s||(wr(f),f.pre&&(s=!0)),Es(f.tag)&&(c=!0),s?xr(f):f.processed||(Sr(f),Tr(f),Lr(f),kr(f,t)),r?o.length||r.if&&(f.elseif||f.else)&&Nr(r,{exp:f.elseif,block:f}):r=f,i&&!f.forbidden)if(f.elseif||f.else)Er(f,i);else if(f.slotScope){i.plain=!1;var p=f.slotTarget||'"default"';(i.scopedSlots||(i.scopedSlots={}))[p]=f}else i.children.push(f),f.parent=i;u?n(f):(i=f,o.push(f));for(var v=0;v<Ts.length;v++)Ts[v](f,t)},end:function(){var e=o[o.length-1],t=e.children[e.children.length-1];t&&3===t.type&&" "===t.text&&!c&&e.children.pop(),o.length-=1,i=o[o.length-1],n(e)},chars:function(e){if(i&&(!Gi||"textarea"!==i.tag||i.attrsMap.placeholder!==e)){var t=i.children;if(e=c||e.trim()?Hr(i)?e:Zs(e):a&&t.length?" ":""){var n;!s&&" "!==e&&(n=gr(e,As))?t.push({type:2,expression:n,text:e}):" "===e&&t.length&&" "===t[t.length-1].text||t.push({type:3,text:e})}}},comment:function(e){i.children.push({type:3,text:e,isComment:!0})}}),r}function wr(e){null!=hn(e,"v-pre")&&(e.pre=!0)}function xr(e){var t=e.attrsList.length;if(t)for(var n=e.attrs=new Array(t),r=0;r<t;r++)n[r]={name:e.attrsList[r].name,value:JSON.stringify(e.attrsList[r].value)};else e.pre||(e.plain=!0)}function kr(e,t){Ar(e),e.plain=!e.key&&!e.attrsList.length,Or(e),Ir(e),Mr(e);for(var n=0;n<Os.length;n++)e=Os[n](e,t)||e;Dr(e)}function Ar(e){var t=vn(e,"key");t&&(e.key=t)}function Or(e){var t=vn(e,"ref");t&&(e.ref=t,e.refInFor=Pr(e))}function Sr(e){var t;if(t=hn(e,"v-for")){var n=t.match(Ks);if(!n)return;e.for=n[2].trim();var r=n[1].trim(),i=r.match(Js);i?(e.alias=i[1].trim(),e.iterator1=i[2].trim(),i[3]&&(e.iterator2=i[3].trim())):e.alias=r}}function Tr(e){var t=hn(e,"v-if");if(t)e.if=t,Nr(e,{exp:t,block:e});else{null!=hn(e,"v-else")&&(e.else=!0);var n=hn(e,"v-else-if");n&&(e.elseif=n)}}function Er(e,t){var n=jr(t.children);n&&n.if&&Nr(n,{exp:e.elseif,block:e})}function jr(e){for(var t=e.length;t--;){if(1===e[t].type)return e[t];e.pop()}}function Nr(e,t){e.ifConditions||(e.ifConditions=[]),e.ifConditions.push(t)}function Lr(e){null!=hn(e,"v-once")&&(e.once=!0)}function Ir(e){if("slot"===e.tag)e.slotName=vn(e,"name");else{var t;"template"===e.tag?(t=hn(e,"scope"),e.slotScope=t||hn(e,"slot-scope")):(t=hn(e,"slot-scope"))&&(e.slotScope=t);var n=vn(e,"slot");n&&(e.slotTarget='""'===n?'"default"':n,"template"===e.tag||e.slotScope||fn(e,"slot",n))}}function Mr(e){var t;(t=vn(e,"is"))&&(e.component=t),null!=hn(e,"inline-template")&&(e.inlineTemplate=!0)}function Dr(e){var t,n,r,i,o,a,s,c=e.attrsList;for(t=0,n=c.length;t<n;t++)if(r=i=c[t].name,o=c[t].value,zs.test(r))if(e.hasBindings=!0,(a=Fr(r))&&(r=r.replace(Gs,"")),Ws.test(r))r=r.replace(Ws,""),o=an(o),s=!1,a&&(a.prop&&(s=!0,"innerHtml"===(r=Li(r))&&(r="innerHTML")),a.camel&&(r=Li(r)),a.sync&&pn(e,"update:"+Li(r),yn(o,"$event"))),s||!e.component&&js(e.tag,e.attrsMap.type,r)?ln(e,r,o):fn(e,r,o);else if(Vs.test(r))pn(e,r=r.replace(Vs,""),o,a,!1,ks);else{var u=(r=r.replace(zs,"")).match(qs),l=u&&u[1];l&&(r=r.slice(0,-(l.length+1))),dn(e,r,i,o,l,a)}else fn(e,r,JSON.stringify(o)),!e.component&&"muted"===r&&js(e.tag,e.attrsMap.type,r)&&ln(e,r,"true")}function Pr(e){for(var t=e;t;){if(void 0!==t.for)return!0;t=t.parent}return!1}function Fr(e){var t=e.match(Gs);if(t){var n={};return t.forEach(function(e){n[e.slice(1)]=!0}),n}}function Rr(e){for(var t={},n=0,r=e.length;n<r;n++)t[e[n].name]=e[n].value;return t}function Hr(e){return"script"===e.tag||"style"===e.tag}function Br(e){return"style"===e.tag||"script"===e.tag&&(!e.attrsMap.type||"text/javascript"===e.attrsMap.type)}function Ur(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];Xs.test(r.name)||(r.name=r.name.replace(Ys,""),t.push(r))}return t}function Vr(e){return $r(e.tag,e.attrsList.slice(),e.parent)}function zr(e,t,n){e.attrsMap[t]=n,e.attrsList.push({name:t,value:n})}function Kr(e,t){e&&(Ls=tc(t.staticKeys||""),Is=t.isReservedTag||Pi,Jr(e),qr(e,!1))}function Jr(e){if(e.static=Wr(e),1===e.type){if(!Is(e.tag)&&"slot"!==e.tag&&null==e.attrsMap["inline-template"])return;for(var t=0,n=e.children.length;t<n;t++){var r=e.children[t];Jr(r),r.static||(e.static=!1)}if(e.ifConditions)for(var i=1,o=e.ifConditions.length;i<o;i++){var a=e.ifConditions[i].block;Jr(a),a.static||(e.static=!1)}}}function qr(e,t){if(1===e.type){if((e.static||e.once)&&(e.staticInFor=t),e.static&&e.children.length&&(1!==e.children.length||3!==e.children[0].type))return void(e.staticRoot=!0);if(e.staticRoot=!1,e.children)for(var n=0,r=e.children.length;n<r;n++)qr(e.children[n],t||!!e.for);if(e.ifConditions)for(var i=1,o=e.ifConditions.length;i<o;i++)qr(e.ifConditions[i].block,t)}}function Wr(e){return 2!==e.type&&(3===e.type||!(!e.pre&&(e.hasBindings||e.if||e.for||Ti(e.tag)||!Is(e.tag)||Gr(e)||!Object.keys(e).every(Ls))))}function Gr(e){for(;e.parent;){if("template"!==(e=e.parent).tag)return!1;if(e.for)return!0}return!1}function Zr(e,t,n){var r=t?"nativeOn:{":"on:{";for(var i in e)r+='"'+i+'":'+Xr(i,e[i])+",";return r.slice(0,-1)+"}"}function Xr(e,t){if(!t)return"function(){}";if(Array.isArray(t))return"["+t.map(function(t){return Xr(e,t)}).join(",")+"]";var n=rc.test(t.value),r=nc.test(t.value);if(t.modifiers){var i="",o="",a=[];for(var s in t.modifiers)if(ac[s])o+=ac[s],ic[s]&&a.push(s);else if("exact"===s){var c=t.modifiers;o+=oc(["ctrl","shift","alt","meta"].filter(function(e){return!c[e]}).map(function(e){return"$event."+e+"Key"}).join("||"))}else a.push(s);return a.length&&(i+=Yr(a)),o&&(i+=o),"function($event){"+i+(n?t.value+"($event)":r?"("+t.value+")($event)":t.value)+"}"}return n||r?t.value:"function($event){"+t.value+"}"}function Yr(e){return"if(!('button' in $event)&&"+e.map(Qr).join("&&")+")return null;"}function Qr(e){var t=parseInt(e,10);if(t)return"$event.keyCode!=="+t;var n=ic[e];return"_k($event.keyCode,"+JSON.stringify(e)+","+JSON.stringify(n)+",$event.key)"}function ei(e,t){var n=new cc(t);return{render:"with(this){return "+(e?ti(e,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function ti(e,t){if(e.staticRoot&&!e.staticProcessed)return ni(e,t);if(e.once&&!e.onceProcessed)return ri(e,t);if(e.for&&!e.forProcessed)return ai(e,t);if(e.if&&!e.ifProcessed)return ii(e,t);if("template"!==e.tag||e.slotTarget){if("slot"===e.tag)return _i(e,t);var n;if(e.component)n=bi(e.component,e,t);else{var r=e.plain?void 0:si(e,t),i=e.inlineTemplate?null:pi(e,t,!0);n="_c('"+e.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<t.transforms.length;o++)n=t.transforms[o](e,n);return n}return pi(e,t)||"void 0"}function ni(e,t,n){return e.staticProcessed=!0,t.staticRenderFns.push("with(this){return "+ti(e,t)+"}"),"_m("+(t.staticRenderFns.length-1)+","+(e.staticInFor?"true":"false")+","+(n?"true":"false")+")"}function ri(e,t){if(e.onceProcessed=!0,e.if&&!e.ifProcessed)return ii(e,t);if(e.staticInFor){for(var n="",r=e.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+ti(e,t)+","+t.onceId+++","+n+")":ti(e,t)}return ni(e,t,!0)}function ii(e,t,n,r){return e.ifProcessed=!0,oi(e.ifConditions.slice(),t,n,r)}function oi(e,t,n,r){function i(e){return n?n(e,t):e.once?ri(e,t):ti(e,t)}if(!e.length)return r||"_e()";var o=e.shift();return o.exp?"("+o.exp+")?"+i(o.block)+":"+oi(e,t,n,r):""+i(o.block)}function ai(e,t,n,r){var i=e.for,o=e.alias,a=e.iterator1?","+e.iterator1:"",s=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||ti)(e,t)+"})"}function si(e,t){var n="{",r=ci(e,t);r&&(n+=r+","),e.key&&(n+="key:"+e.key+","),e.ref&&(n+="ref:"+e.ref+","),e.refInFor&&(n+="refInFor:true,"),e.pre&&(n+="pre:true,"),e.component&&(n+='tag:"'+e.tag+'",');for(var i=0;i<t.dataGenFns.length;i++)n+=t.dataGenFns[i](e);if(e.attrs&&(n+="attrs:{"+$i(e.attrs)+"},"),e.props&&(n+="domProps:{"+$i(e.props)+"},"),e.events&&(n+=Zr(e.events,!1,t.warn)+","),e.nativeEvents&&(n+=Zr(e.nativeEvents,!0,t.warn)+","),e.slotTarget&&!e.slotScope&&(n+="slot:"+e.slotTarget+","),e.scopedSlots&&(n+=li(e.scopedSlots,t)+","),e.model&&(n+="model:{value:"+e.model.value+",callback:"+e.model.callback+",expression:"+e.model.expression+"},"),e.inlineTemplate){var o=ui(e,t);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",e.wrapData&&(n=e.wrapData(n)),e.wrapListeners&&(n=e.wrapListeners(n)),n}function ci(e,t){var n=e.directives;if(n){var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=t.directives[o.name];u&&(a=!!u(e,o,t.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?',arg:"'+o.arg+'"':"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}return c?s.slice(0,-1)+"]":void 0}}function ui(e,t){var n=e.children[0];if(1===n.type){var r=ei(n,t.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(e){return"function(){"+e+"}"}).join(",")+"]}"}}function li(e,t){return"scopedSlots:_u(["+Object.keys(e).map(function(n){return fi(n,e[n],t)}).join(",")+"])"}function fi(e,t,n){return t.for&&!t.forProcessed?di(e,t,n):"{key:"+e+",fn:"+("function("+String(t.slotScope)+"){return "+("template"===t.tag?t.if?t.if+"?"+(pi(t,n)||"undefined")+":undefined":pi(t,n)||"undefined":ti(t,n))+"}")+"}"}function di(e,t,n){var r=t.for,i=t.alias,o=t.iterator1?","+t.iterator1:"",a=t.iterator2?","+t.iterator2:"";return t.forProcessed=!0,"_l(("+r+"),function("+i+o+a+"){return "+fi(e,t,n)+"})"}function pi(e,t,n,r,i){var o=e.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag)return(r||ti)(a,t);var s=n?vi(o,t.maybeComponent):0,c=i||mi;return"["+o.map(function(e){return c(e,t)}).join(",")+"]"+(s?","+s:"")}}function vi(e,t){for(var n=0,r=0;r<e.length;r++){var i=e[r];if(1===i.type){if(hi(i)||i.ifConditions&&i.ifConditions.some(function(e){return hi(e.block)})){n=2;break}(t(i)||i.ifConditions&&i.ifConditions.some(function(e){return t(e.block)}))&&(n=1)}}return n}function hi(e){return void 0!==e.for||"template"===e.tag||"slot"===e.tag}function mi(e,t){return 1===e.type?ti(e,t):3===e.type&&e.isComment?gi(e):yi(e)}function yi(e){return"_v("+(2===e.type?e.expression:Ci(JSON.stringify(e.text)))+")"}function gi(e){return"_e("+JSON.stringify(e.text)+")"}function _i(e,t){var n=e.slotName||'"default"',r=pi(e,t),i="_t("+n+(r?","+r:""),o=e.attrs&&"{"+e.attrs.map(function(e){return Li(e.name)+":"+e.value}).join(",")+"}",a=e.attrsMap["v-bind"];return!o&&!a||r||(i+=",null"),o&&(i+=","+o),a&&(i+=(o?"":",null")+","+a),i+")"}function bi(e,t,n){var r=t.inlineTemplate?null:pi(t,n,!0);return"_c("+e+","+si(t,n)+(r?","+r:"")+")"}function $i(e){for(var t="",n=0;n<e.length;n++){var r=e[n];t+='"'+r.name+'":'+Ci(r.value)+","}return t.slice(0,-1)}function Ci(e){return e.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}function wi(e,t){try{return new Function(e)}catch(n){return t.push({err:n,code:e}),_}}function xi(e){var t=Object.create(null);return function(n,r,i){delete(r=y({},r)).warn;var o=r.delimiters?String(r.delimiters)+n:n;if(t[o])return t[o];var a=e(n,r),s={},c=[];return s.render=wi(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(e){return wi(e,c)}),t[o]=s}}function ki(e){return Ms=Ms||document.createElement("div"),Ms.innerHTML=e?'<a href="\n"/>':'<div a="\n"/>',Ms.innerHTML.indexOf("&#10;")>0}function Ai(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}var Oi=Object.freeze({}),Si=Object.prototype.toString,Ti=f("slot,component",!0),Ei=f("key,ref,slot,slot-scope,is"),ji=Object.prototype.hasOwnProperty,Ni=/-(\w)/g,Li=v(function(e){return e.replace(Ni,function(e,t){return t?t.toUpperCase():""})}),Ii=v(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),Mi=/\B([A-Z])/g,Di=v(function(e){return e.replace(Mi,"-$1").toLowerCase()}),Pi=function(e,t,n){return!1},Fi=function(e){return e},Ri="data-server-rendered",Hi=["component","directive","filter"],Bi=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured"],Ui={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:Pi,isReservedAttr:Pi,isUnknownElement:Pi,getTagNamespace:_,parsePlatformTagName:Fi,mustUseProp:Pi,_lifecycleHooks:Bi},Vi=/[^\w.$]/,zi="__proto__"in{},Ki="undefined"!=typeof window,Ji="undefined"!=typeof WXEnvironment&&!!WXEnvironment.platform,qi=Ji&&WXEnvironment.platform.toLowerCase(),Wi=Ki&&window.navigator.userAgent.toLowerCase(),Gi=Wi&&/msie|trident/.test(Wi),Zi=Wi&&Wi.indexOf("msie 9.0")>0,Xi=Wi&&Wi.indexOf("edge/")>0,Yi=Wi&&Wi.indexOf("android")>0||"android"===qi,Qi=Wi&&/iphone|ipad|ipod|ios/.test(Wi)||"ios"===qi,eo=(Wi&&/chrome\/\d+/.test(Wi),{}.watch),to=!1;if(Ki)try{var no={};Object.defineProperty(no,"passive",{get:function(){to=!0}}),window.addEventListener("test-passive",null,no)}catch(e){}var ro,io,oo=function(){return void 0===ro&&(ro=!Ki&&"undefined"!=typeof global&&"server"===global.process.env.VUE_ENV),ro},ao=Ki&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,so="undefined"!=typeof Symbol&&A(Symbol)&&"undefined"!=typeof Reflect&&A(Reflect.ownKeys);io="undefined"!=typeof Set&&A(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var co=_,uo=0,lo=function(){this.id=uo++,this.subs=[]};lo.prototype.addSub=function(e){this.subs.push(e)},lo.prototype.removeSub=function(e){d(this.subs,e)},lo.prototype.depend=function(){lo.target&&lo.target.addDep(this)},lo.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},lo.target=null;var fo=[],po=function(e,t,n,r,i,o,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.functionalContext=void 0,this.functionalOptions=void 0,this.functionalScopeId=void 0,this.key=t&&t.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},vo={child:{configurable:!0}};vo.child.get=function(){return this.componentInstance},Object.defineProperties(po.prototype,vo);var ho=function(e){void 0===e&&(e="");var t=new po;return t.text=e,t.isComment=!0,t},mo=Array.prototype,yo=Object.create(mo);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=mo[e];x(yo,e,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=t.apply(this,n),a=this.__ob__;switch(e){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var go=Object.getOwnPropertyNames(yo),_o={shouldConvert:!0},bo=function(e){this.value=e,this.dep=new lo,this.vmCount=0,x(e,"__ob__",this),Array.isArray(e)?((zi?N:L)(e,yo,go),this.observeArray(e)):this.walk(e)};bo.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)M(e,t[n],e[t[n]])},bo.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)I(e[t])};var $o=Ui.optionMergeStrategies;$o.data=function(e,t,n){return n?H(e,t,n):t&&"function"!=typeof t?e:H(e,t)},Bi.forEach(function(e){$o[e]=B}),Hi.forEach(function(e){$o[e+"s"]=U}),$o.watch=function(e,t,n,r){if(e===eo&&(e=void 0),t===eo&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var i={};y(i,e);for(var o in t){var a=i[o],s=t[o];a&&!Array.isArray(a)&&(a=[a]),i[o]=a?a.concat(s):Array.isArray(s)?s:[s]}return i},$o.props=$o.methods=$o.inject=$o.computed=function(e,t,n,r){if(!e)return t;var i=Object.create(null);return y(i,e),t&&y(i,t),i},$o.provide=H;var Co,wo,xo=function(e,t){return void 0===t?e:t},ko=[],Ao=!1,Oo=!1;if("undefined"!=typeof setImmediate&&A(setImmediate))wo=function(){setImmediate(te)};else if("undefined"==typeof MessageChannel||!A(MessageChannel)&&"[object MessageChannelConstructor]"!==MessageChannel.toString())wo=function(){setTimeout(te,0)};else{var So=new MessageChannel,To=So.port2;So.port1.onmessage=te,wo=function(){To.postMessage(1)}}if("undefined"!=typeof Promise&&A(Promise)){var Eo=Promise.resolve();Co=function(){Eo.then(te),Qi&&setTimeout(_)}}else Co=wo;var jo,No=new io,Lo=v(function(e){var t="&"===e.charAt(0),n="~"===(e=t?e.slice(1):e).charAt(0),r="!"===(e=n?e.slice(1):e).charAt(0);return e=r?e.slice(1):e,{name:e,once:n,capture:r,passive:t}}),Io=null,Mo=[],Do=[],Po={},Fo=!1,Ro=!1,Ho=0,Bo=0,Uo=function(e,t,n,r){this.vm=e,e._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++Bo,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new io,this.newDepIds=new io,this.expression="","function"==typeof t?this.getter=t:(this.getter=k(t),this.getter||(this.getter=function(){})),this.value=this.lazy?void 0:this.get()};Uo.prototype.get=function(){O(this);var e,t=this.vm;try{e=this.getter.call(t,t)}catch(e){if(!this.user)throw e;Y(e,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&ie(e),S(),this.cleanupDeps()}return e},Uo.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},Uo.prototype.cleanupDeps=function(){for(var e=this,t=this.deps.length;t--;){var n=e.deps[t];e.newDepIds.has(n.id)||n.removeSub(e)}var r=this.depIds;this.depIds=this.newDepIds,this.newDepIds=r,this.newDepIds.clear(),r=this.deps,this.deps=this.newDeps,this.newDeps=r,this.newDeps.length=0},Uo.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():Re(this)},Uo.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||o(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){Y(e,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},Uo.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Uo.prototype.depend=function(){for(var e=this,t=this.deps.length;t--;)e.deps[t].depend()},Uo.prototype.teardown=function(){var e=this;if(this.active){this.vm._isBeingDestroyed||d(this.vm._watchers,this);for(var t=this.deps.length;t--;)e.deps[t].removeSub(e);this.active=!1}};var Vo={enumerable:!0,configurable:!0,get:_,set:_},zo={lazy:!0};lt(ft.prototype);var Ko={init:function(e,t,n,r){if(!e.componentInstance||e.componentInstance._isDestroyed)(e.componentInstance=ht(e,Io,n,r)).$mount(t?e.elm:void 0,t);else if(e.data.keepAlive){var i=e;Ko.prepatch(i,i)}},prepatch:function(e,t){var n=t.componentOptions;Te(t.componentInstance=e.componentInstance,n.propsData,n.listeners,t,n.children)},insert:function(e){var t=e.context,n=e.componentInstance;n._isMounted||(n._isMounted=!0,Le(n,"mounted")),e.data.keepAlive&&(t._isMounted?Pe(n):je(n,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?Ne(t,!0):t.$destroy())}},Jo=Object.keys(Ko),qo=1,Wo=2,Go=0;!function(e){e.prototype._init=function(e){var t=this;t._uid=Go++,t._isVue=!0,e&&e._isComponent?wt(t,e):t.$options=J(xt(t.constructor),e||{},t),t._renderProxy=t,t._self=t,Oe(t),be(t),Ct(t),Le(t,"beforeCreate"),Ye(t),Be(t),Xe(t),Le(t,"created"),t.$options.el&&t.$mount(t.$options.el)}}(Ot),function(e){var t={};t.get=function(){return this._data};var n={};n.get=function(){return this._props},Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",n),e.prototype.$set=D,e.prototype.$delete=P,e.prototype.$watch=function(e,t,n){var r=this;if(a(t))return Ze(r,e,t,n);(n=n||{}).user=!0;var i=new Uo(r,e,t,n);return n.immediate&&t.call(r,i.value),function(){i.teardown()}}}(Ot),function(e){var t=/^hook:/;e.prototype.$on=function(e,n){var r=this,i=this;if(Array.isArray(e))for(var o=0,a=e.length;o<a;o++)r.$on(e[o],n);else(i._events[e]||(i._events[e]=[])).push(n),t.test(e)&&(i._hasHookEvent=!0);return i},e.prototype.$once=function(e,t){function n(){r.$off(e,n),t.apply(r,arguments)}var r=this;return n.fn=t,r.$on(e,n),r},e.prototype.$off=function(e,t){var n=this,r=this;if(!arguments.length)return r._events=Object.create(null),r;if(Array.isArray(e)){for(var i=0,o=e.length;i<o;i++)n.$off(e[i],t);return r}var a=r._events[e];if(!a)return r;if(!t)return r._events[e]=null,r;if(t)for(var s,c=a.length;c--;)if((s=a[c])===t||s.fn===t){a.splice(c,1);break}return r},e.prototype.$emit=function(e){var t=this,n=t._events[e];if(n){n=n.length>1?m(n):n;for(var r=m(arguments,1),i=0,o=n.length;i<o;i++)try{n[i].apply(t,r)}catch(n){Y(n,t,'event handler for "'+e+'"')}}return t}}(Ot),function(e){e.prototype._update=function(e,t){var n=this;n._isMounted&&Le(n,"beforeUpdate");var r=n.$el,i=n._vnode,o=Io;Io=n,n._vnode=e,i?n.$el=n.__patch__(i,e):(n.$el=n.__patch__(n.$el,e,t,!1,n.$options._parentElm,n.$options._refElm),n.$options._parentElm=n.$options._refElm=null),Io=o,r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Le(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||d(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Le(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}(Ot),function(e){lt(e.prototype),e.prototype.$nextTick=function(e){return re(e,this)},e.prototype._render=function(){var e=this,t=e.$options,n=t.render,r=t._parentVnode;if(e._isMounted)for(var i in e.$slots){var o=e.$slots[i];(o._rendered||o[0]&&o[0].elm)&&(e.$slots[i]=j(o,!0))}e.$scopedSlots=r&&r.data.scopedSlots||Oi,e.$vnode=r;var a;try{a=n.call(e._renderProxy,e.$createElement)}catch(t){Y(t,e,"render"),a=e._vnode}return a instanceof po||(a=ho()),a.parent=r,a}}(Ot);var Zo=[String,RegExp,Array],Xo={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:Zo,exclude:Zo,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){var e=this;for(var t in e.cache)Pt(e.cache,t,e.keys)},watch:{include:function(e){Dt(this,function(t){return Mt(e,t)})},exclude:function(e){Dt(this,function(t){return!Mt(e,t)})}},render:function(){var e=this.$slots.default,t=_e(e),n=t&&t.componentOptions;if(n){var r=It(n),i=this,o=i.include,a=i.exclude;if(o&&(!r||!Mt(o,r))||a&&r&&Mt(a,r))return t;var s=this,c=s.cache,u=s.keys,l=null==t.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):t.key;c[l]?(t.componentInstance=c[l].componentInstance,d(u,l),u.push(l)):(c[l]=t,u.push(l),this.max&&u.length>parseInt(this.max)&&Pt(c,u[0],u,this._vnode)),t.data.keepAlive=!0}return t||e&&e[0]}}};!function(e){var t={};t.get=function(){return Ui},Object.defineProperty(e,"config",t),e.util={warn:co,extend:y,mergeOptions:J,defineReactive:M},e.set=D,e.delete=P,e.nextTick=re,e.options=Object.create(null),Hi.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,y(e.options.components,Xo),St(e),Tt(e),Et(e),Lt(e)}(Ot),Object.defineProperty(Ot.prototype,"$isServer",{get:oo}),Object.defineProperty(Ot.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Ot.version="2.5.8";var Yo,Qo,ea,ta,na,ra,ia,oa,aa=f("style,class"),sa=f("input,textarea,option,select,progress"),ca=function(e,t,n){return"value"===n&&sa(e)&&"button"!==t||"selected"===n&&"option"===e||"checked"===n&&"input"===e||"muted"===n&&"video"===e},ua=f("contenteditable,draggable,spellcheck"),la=f("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),fa="http://www.w3.org/1999/xlink",da=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},pa=function(e){return da(e)?e.slice(6,e.length):""},va=function(e){return null==e||!1===e},ha={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},ma=f("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),ya=f("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),ga=function(e){return ma(e)||ya(e)},_a=Object.create(null),ba=f("text,number,password,search,email,tel,url"),$a=Object.freeze({createElement:function(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&void 0!==t.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(e,t){return document.createElementNS(ha[e],t)},createTextNode:function(e){return document.createTextNode(e)},createComment:function(e){return document.createComment(e)},insertBefore:function(e,t,n){e.insertBefore(t,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){e.appendChild(t)},parentNode:function(e){return e.parentNode},nextSibling:function(e){return e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},setAttribute:function(e,t,n){e.setAttribute(t,n)}}),Ca={create:function(e,t){qt(t)},update:function(e,t){e.data.ref!==t.data.ref&&(qt(e,!0),qt(t))},destroy:function(e){qt(e,!0)}},wa=new po("",{},[]),xa=["create","activate","update","remove","destroy"],ka={create:Xt,update:Xt,destroy:function(e){Xt(e,wa)}},Aa=Object.create(null),Oa=[Ca,ka],Sa={create:nn,update:nn},Ta={create:on,update:on},Ea=/[\w).+\-_$\]]/,ja="__r",Na="__c",La={create:Nn,update:Nn},Ia={create:Ln,update:Ln},Ma=v(function(e){var t={},n=/;(?![^(]*\))/g,r=/:(.+)/;return e.split(n).forEach(function(e){if(e){var n=e.split(r);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}),Da=/^--/,Pa=/\s*!important$/,Fa=function(e,t,n){if(Da.test(t))e.style.setProperty(t,n);else if(Pa.test(n))e.style.setProperty(t,n.replace(Pa,""),"important");else{var r=Ha(t);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)e.style[r]=n[i];else e.style[r]=n}},Ra=["Webkit","Moz","ms"],Ha=v(function(e){if(oa=oa||document.createElement("div").style,"filter"!==(e=Li(e))&&e in oa)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<Ra.length;n++){var r=Ra[n]+t;if(r in oa)return r}}),Ba={create:Hn,update:Hn},Ua=v(function(e){return{enterClass:e+"-enter",enterToClass:e+"-enter-to",enterActiveClass:e+"-enter-active",leaveClass:e+"-leave",leaveToClass:e+"-leave-to",leaveActiveClass:e+"-leave-active"}}),Va=Ki&&!Zi,za="transition",Ka="animation",Ja="transition",qa="transitionend",Wa="animation",Ga="animationend";Va&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(Ja="WebkitTransition",qa="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Wa="WebkitAnimation",Ga="webkitAnimationEnd"));var Za=Ki?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(e){return e()},Xa=/\b(transform|all)(,|$)/,Ya=function(r){function o(e){return new po(j.tagName(e).toLowerCase(),{},[],void 0,e)}function a(e,t){function n(){0==--n.listeners&&s(e)}return n.listeners=t,n}function s(e){var n=j.parentNode(e);t(n)&&j.removeChild(n,e)}function c(e,r,i,o,a){if(e.isRootInsert=!a,!u(e,r,i,o)){var s=e.data,c=e.children,l=e.tag;t(l)?(e.elm=e.ns?j.createElementNS(e.ns,l):j.createElement(l,e),y(e),v(e,c,r),t(s)&&m(e,r),p(i,e.elm,o)):n(e.isComment)?(e.elm=j.createComment(e.text),p(i,e.elm,o)):(e.elm=j.createTextNode(e.text),p(i,e.elm,o))}}function u(e,r,i,o){var a=e.data;if(t(a)){var s=t(e.componentInstance)&&a.keepAlive;if(t(a=a.hook)&&t(a=a.init)&&a(e,!1,i,o),t(e.componentInstance))return l(e,r),n(s)&&d(e,r,i,o),!0}}function l(e,n){t(e.data.pendingInsert)&&(n.push.apply(n,e.data.pendingInsert),e.data.pendingInsert=null),e.elm=e.componentInstance.$el,h(e)?(m(e,n),y(e)):(qt(e),n.push(e))}function d(e,n,r,i){for(var o,a=e;a.componentInstance;)if(a=a.componentInstance._vnode,t(o=a.data)&&t(o=o.transition)){for(o=0;o<T.activate.length;++o)T.activate[o](wa,a);n.push(a);break}p(r,e.elm,i)}function p(e,n,r){t(e)&&(t(r)?r.parentNode===e&&j.insertBefore(e,n,r):j.appendChild(e,n))}function v(e,t,n){if(Array.isArray(t))for(var r=0;r<t.length;++r)c(t[r],n,e.elm,null,!0);else i(e.text)&&j.appendChild(e.elm,j.createTextNode(e.text))}function h(e){for(;e.componentInstance;)e=e.componentInstance._vnode;return t(e.tag)}function m(e,n){for(var r=0;r<T.create.length;++r)T.create[r](wa,e);t(O=e.data.hook)&&(t(O.create)&&O.create(wa,e),t(O.insert)&&n.push(e))}function y(e){var n;if(t(n=e.functionalScopeId))j.setAttribute(e.elm,n,"");else for(var r=e;r;)t(n=r.context)&&t(n=n.$options._scopeId)&&j.setAttribute(e.elm,n,""),r=r.parent;t(n=Io)&&n!==e.context&&n!==e.functionalContext&&t(n=n.$options._scopeId)&&j.setAttribute(e.elm,n,"")}function g(e,t,n,r,i,o){for(;r<=i;++r)c(n[r],o,e,t)}function _(e){var n,r,i=e.data;if(t(i))for(t(n=i.hook)&&t(n=n.destroy)&&n(e),n=0;n<T.destroy.length;++n)T.destroy[n](e);if(t(n=e.children))for(r=0;r<e.children.length;++r)_(e.children[r])}function b(e,n,r,i){for(;r<=i;++r){var o=n[r];t(o)&&(t(o.tag)?($(o),_(o)):s(o.elm))}}function $(e,n){if(t(n)||t(e.data)){var r,i=T.remove.length+1;for(t(n)?n.listeners+=i:n=a(e.elm,i),t(r=e.componentInstance)&&t(r=r._vnode)&&t(r.data)&&$(r,n),r=0;r<T.remove.length;++r)T.remove[r](e,n);t(r=e.data.hook)&&t(r=r.remove)?r(e,n):n()}else s(e.elm)}function C(n,r,i,o,a){for(var s,u,l,f=0,d=0,p=r.length-1,v=r[0],h=r[p],m=i.length-1,y=i[0],_=i[m],$=!a;f<=p&&d<=m;)e(v)?v=r[++f]:e(h)?h=r[--p]:Wt(v,y)?(x(v,y,o),v=r[++f],y=i[++d]):Wt(h,_)?(x(h,_,o),h=r[--p],_=i[--m]):Wt(v,_)?(x(v,_,o),$&&j.insertBefore(n,v.elm,j.nextSibling(h.elm)),v=r[++f],_=i[--m]):Wt(h,y)?(x(h,y,o),$&&j.insertBefore(n,h.elm,v.elm),h=r[--p],y=i[++d]):(e(s)&&(s=Zt(r,f,p)),e(u=t(y.key)?s[y.key]:w(y,r,f,p))?c(y,o,n,v.elm):Wt(l=r[u],y)?(x(l,y,o),r[u]=void 0,$&&j.insertBefore(n,l.elm,v.elm)):c(y,o,n,v.elm),y=i[++d]);f>p?g(n,e(i[m+1])?null:i[m+1].elm,i,d,m,o):d>m&&b(n,r,f,p)}function w(e,n,r,i){for(var o=r;o<i;o++){var a=n[o];if(t(a)&&Wt(e,a))return o}}function x(r,i,o,a){if(r!==i){var s=i.elm=r.elm;if(n(r.isAsyncPlaceholder))t(i.asyncFactory.resolved)?A(r.elm,i,o):i.isAsyncPlaceholder=!0;else if(n(i.isStatic)&&n(r.isStatic)&&i.key===r.key&&(n(i.isCloned)||n(i.isOnce)))i.componentInstance=r.componentInstance;else{var c,u=i.data;t(u)&&t(c=u.hook)&&t(c=c.prepatch)&&c(r,i);var l=r.children,f=i.children;if(t(u)&&h(i)){for(c=0;c<T.update.length;++c)T.update[c](r,i);t(c=u.hook)&&t(c=c.update)&&c(r,i)}e(i.text)?t(l)&&t(f)?l!==f&&C(s,l,f,o,a):t(f)?(t(r.text)&&j.setTextContent(s,""),g(s,null,f,0,f.length-1,o)):t(l)?b(s,l,0,l.length-1):t(r.text)&&j.setTextContent(s,""):r.text!==i.text&&j.setTextContent(s,i.text),t(u)&&t(c=u.hook)&&t(c=c.postpatch)&&c(r,i)}}}function k(e,r,i){if(n(i)&&t(e.parent))e.parent.data.pendingInsert=r;else for(var o=0;o<r.length;++o)r[o].data.hook.insert(r[o])}function A(e,r,i,o){var a,s=r.tag,c=r.data,u=r.children;if(o=o||c&&c.pre,r.elm=e,n(r.isComment)&&t(r.asyncFactory))return r.isAsyncPlaceholder=!0,!0;if(t(c)&&(t(a=c.hook)&&t(a=a.init)&&a(r,!0),t(a=r.componentInstance)))return l(r,i),!0;if(t(s)){if(t(u))if(e.hasChildNodes())if(t(a=c)&&t(a=a.domProps)&&t(a=a.innerHTML)){if(a!==e.innerHTML)return!1}else{for(var f=!0,d=e.firstChild,p=0;p<u.length;p++){if(!d||!A(d,u[p],i,o)){f=!1;break}d=d.nextSibling}if(!f||d)return!1}else v(r,u,i);if(t(c)){var h=!1;for(var y in c)if(!N(y)){h=!0,m(r,i);break}!h&&c.class&&ie(c.class)}}else e.data!==r.text&&(e.data=r.text);return!0}var O,S,T={},E=r.modules,j=r.nodeOps;for(O=0;O<xa.length;++O)for(T[xa[O]]=[],S=0;S<E.length;++S)t(E[S][xa[O]])&&T[xa[O]].push(E[S][xa[O]]);var N=f("attrs,class,staticClass,staticStyle,key");return function(r,i,a,s,u,l){if(!e(i)){var f=!1,d=[];if(e(r))f=!0,c(i,d,u,l);else{var p=t(r.nodeType);if(!p&&Wt(r,i))x(r,i,d,s);else{if(p){if(1===r.nodeType&&r.hasAttribute(Ri)&&(r.removeAttribute(Ri),a=!0),n(a)&&A(r,i,d))return k(i,d,!0),r;r=o(r)}var v=r.elm,m=j.parentNode(v);if(c(i,d,v._leaveCb?null:m,j.nextSibling(v)),t(i.parent))for(var y=i.parent,g=h(i);y;){for(var $=0;$<T.destroy.length;++$)T.destroy[$](y);if(y.elm=i.elm,g){for(var C=0;C<T.create.length;++C)T.create[C](wa,y);var w=y.data.hook.insert;if(w.merged)for(var O=1;O<w.fns.length;O++)w.fns[O]()}else qt(y);y=y.parent}t(m)?b(m,[r],0,0):t(r.tag)&&_(r)}}return k(i,d,f),i.elm}t(r)&&_(r)}}({nodeOps:$a,modules:[Sa,Ta,La,Ia,Ba,Ki?{create:tr,activate:tr,remove:function(e,t){!0!==e.data.show?Yn(e,t):t()}}:{}].concat(Oa)});Zi&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&cr(e,"input")});var Qa={inserted:function(e,t,n,r){"select"===n.tag?(r.elm&&!r.elm._vOptions?ce(n,"postpatch",function(){Qa.componentUpdated(e,t,n)}):nr(e,t,n.context),e._vOptions=[].map.call(e.options,or)):("textarea"===n.tag||ba(e.type))&&(e._vModifiers=t.modifiers,t.modifiers.lazy||(e.addEventListener("change",sr),Yi||(e.addEventListener("compositionstart",ar),e.addEventListener("compositionend",sr)),Zi&&(e.vmodel=!0)))},componentUpdated:function(e,t,n){if("select"===n.tag){nr(e,t,n.context);var r=e._vOptions,i=e._vOptions=[].map.call(e.options,or);i.some(function(e,t){return!b(e,r[t])})&&(e.multiple?t.value.some(function(e){return ir(e,i)}):t.value!==t.oldValue&&ir(t.value,i))&&cr(e,"change")}}},es={model:Qa,show:{bind:function(e,t,n){var r=t.value,i=(n=ur(n)).data&&n.data.transition,o=e.__vOriginalDisplay="none"===e.style.display?"":e.style.display;r&&i?(n.data.show=!0,Xn(n,function(){e.style.display=o})):e.style.display=r?o:"none"},update:function(e,t,n){var r=t.value;r!==t.oldValue&&((n=ur(n)).data&&n.data.transition?(n.data.show=!0,r?Xn(n,function(){e.style.display=e.__vOriginalDisplay}):Yn(n,function(){e.style.display="none"})):e.style.display=r?e.__vOriginalDisplay:"none")},unbind:function(e,t,n,r,i){i||(e.style.display=e.__vOriginalDisplay)}}},ts={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]},ns={name:"transition",props:ts,abstract:!0,render:function(e){var t=this,n=this.$slots.default;if(n&&(n=n.filter(function(e){return e.tag||ge(e)})).length){var r=this.mode,o=n[0];if(pr(this.$vnode))return o;var a=lr(o);if(!a)return o;if(this._leaving)return dr(e,o);var s="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?s+"comment":s+a.tag:i(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=fr(this),u=this._vnode,l=lr(u);if(a.data.directives&&a.data.directives.some(function(e){return"show"===e.name})&&(a.data.show=!0),l&&l.data&&!vr(a,l)&&!ge(l)&&(!l.componentInstance||!l.componentInstance._vnode.isComment)){var f=l.data.transition=y({},c);if("out-in"===r)return this._leaving=!0,ce(f,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()}),dr(e,o);if("in-out"===r){if(ge(a))return u;var d,p=function(){d()};ce(c,"afterEnter",p),ce(c,"enterCancelled",p),ce(f,"delayLeave",function(e){d=e})}}return o}}},rs=y({tag:String,moveClass:String},ts);delete rs.mode;var is={Transition:ns,TransitionGroup:{props:rs,render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=fr(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var d=r[f];d.data.transition=a,d.data.pos=d.elm.getBoundingClientRect(),n[d.key]?u.push(d):l.push(d)}this.kept=e(t,null,u),this.removed=l}return e(t,null,o)},beforeUpdate:function(){this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept},updated:function(){var e=this.prevChildren,t=this.moveClass||(this.name||"v")+"-move";e.length&&this.hasMove(e[0].elm,t)&&(e.forEach(hr),e.forEach(mr),e.forEach(yr),this._reflow=document.body.offsetHeight,e.forEach(function(e){if(e.data.moved){var n=e.elm,r=n.style;Kn(n,t),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(qa,n._moveCb=function e(r){r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(qa,e),n._moveCb=null,Jn(n,t))})}}))},methods:{hasMove:function(e,t){if(!Va)return!1;if(this._hasMove)return this._hasMove;var n=e.cloneNode();e._transitionClasses&&e._transitionClasses.forEach(function(e){Un(n,e)}),Bn(n,t),n.style.display="none",this.$el.appendChild(n);var r=Wn(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}}};Ot.config.mustUseProp=ca,Ot.config.isReservedTag=ga,Ot.config.isReservedAttr=aa,Ot.config.getTagNamespace=Kt,Ot.config.isUnknownElement=function(e){if(!Ki)return!0;if(ga(e))return!1;if(e=e.toLowerCase(),null!=_a[e])return _a[e];var t=document.createElement(e);return e.indexOf("-")>-1?_a[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:_a[e]=/HTMLUnknownElement/.test(t.toString())},y(Ot.options.directives,es),y(Ot.options.components,is),Ot.prototype.__patch__=Ki?Ya:_,Ot.prototype.$mount=function(e,t){return e=e&&Ki?Jt(e):void 0,Se(this,e,t)},Ot.nextTick(function(){Ui.devtools&&ao&&ao.emit("init",Ot)},0);var os,as=/\{\{((?:.|\n)+?)\}\}/g,ss=/[-.*+?^${}()|[\]\/\\]/g,cs=v(function(e){var t=e[0].replace(ss,"\\$&"),n=e[1].replace(ss,"\\$&");return new RegExp(t+"((?:.|\\n)+?)"+n,"g")}),us={staticKeys:["staticClass"],transformNode:function(e,t){t.warn;var n=hn(e,"class");n&&(e.staticClass=JSON.stringify(n));var r=vn(e,"class",!1);r&&(e.classBinding=r)},genData:function(e){var t="";return e.staticClass&&(t+="staticClass:"+e.staticClass+","),e.classBinding&&(t+="class:"+e.classBinding+","),t}},ls={staticKeys:["staticStyle"],transformNode:function(e,t){var n=hn(e,"style");n&&(e.staticStyle=JSON.stringify(Ma(n)));var r=vn(e,"style",!1);r&&(e.styleBinding=r)},genData:function(e){var t="";return e.staticStyle&&(t+="staticStyle:"+e.staticStyle+","),e.styleBinding&&(t+="style:("+e.styleBinding+"),"),t}},fs={decode:function(e){return os=os||document.createElement("div"),os.innerHTML=e,os.textContent}},ds=f("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),ps=f("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),vs=f("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),hs=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,ms="[a-zA-Z_][\\w\\-\\.]*",ys="((?:"+ms+"\\:)?"+ms+")",gs=new RegExp("^<"+ys),_s=/^\s*(\/?)>/,bs=new RegExp("^<\\/"+ys+"[^>]*>"),$s=/^<!DOCTYPE [^>]+>/i,Cs=/^<!--/,ws=/^<!\[/,xs=!1;"x".replace(/x(.)?/g,function(e,t){xs=""===t});var ks,As,Os,Ss,Ts,Es,js,Ns,Ls,Is,Ms,Ds=f("script,style,textarea",!0),Ps={},Fs={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t"},Rs=/&(?:lt|gt|quot|amp);/g,Hs=/&(?:lt|gt|quot|amp|#10|#9);/g,Bs=f("pre,textarea",!0),Us=function(e,t){return e&&Bs(e)&&"\n"===t[0]},Vs=/^@|^v-on:/,zs=/^v-|^@|^:/,Ks=/(.*?)\s+(?:in|of)\s+(.*)/,Js=/\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/,qs=/:(.*)$/,Ws=/^:|^v-bind:/,Gs=/\.[^.]+/g,Zs=v(fs.decode),Xs=/^xmlns:NS\d+/,Ys=/^NS\d+:/,Qs=[us,ls,{preTransformNode:function(e,t){if("input"===e.tag){var n=e.attrsMap;if(n["v-model"]&&(n["v-bind:type"]||n[":type"])){var r=vn(e,"type"),i=hn(e,"v-if",!0),o=i?"&&("+i+")":"",a=null!=hn(e,"v-else",!0),s=hn(e,"v-else-if",!0),c=Vr(e);Sr(c),zr(c,"type","checkbox"),kr(c,t),c.processed=!0,c.if="("+r+")==='checkbox'"+o,Nr(c,{exp:c.if,block:c});var u=Vr(e);hn(u,"v-for",!0),zr(u,"type","radio"),kr(u,t),Nr(c,{exp:"("+r+")==='radio'"+o,block:u});var l=Vr(e);return hn(l,"v-for",!0),zr(l,":type",r),kr(l,t),Nr(c,{exp:i,block:l}),a?c.else=!0:s&&(c.elseif=s),c}}}}],ec={expectHTML:!0,modules:Qs,directives:{model:function(e,t,n){var r=t.value,i=t.modifiers,o=e.tag,a=e.attrsMap.type;if(e.component)return mn(e,r,i),!1;if("select"===o)An(e,r,i);else if("input"===o&&"checkbox"===a)xn(e,r,i);else if("input"===o&&"radio"===a)kn(e,r,i);else if("input"===o||"textarea"===o)On(e,r,i);else if(!Ui.isReservedTag(o))return mn(e,r,i),!1;return!0},text:function(e,t){t.value&&ln(e,"textContent","_s("+t.value+")")},html:function(e,t){t.value&&ln(e,"innerHTML","_s("+t.value+")")}},isPreTag:function(e){return"pre"===e},isUnaryTag:ds,mustUseProp:ca,canBeLeftOpenTag:ps,isReservedTag:ga,getTagNamespace:Kt,staticKeys:function(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}(Qs)},tc=v(function(e){return f("type,tag,attrsList,attrsMap,plain,parent,children,attrs"+(e?","+e:""))}),nc=/^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,rc=/^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,ic={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},oc=function(e){return"if("+e+")return null;"},ac={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:oc("$event.target !== $event.currentTarget"),ctrl:oc("!$event.ctrlKey"),shift:oc("!$event.shiftKey"),alt:oc("!$event.altKey"),meta:oc("!$event.metaKey"),left:oc("'button' in $event && $event.button !== 0"),middle:oc("'button' in $event && $event.button !== 1"),right:oc("'button' in $event && $event.button !== 2")},sc={on:function(e,t){e.wrapListeners=function(e){return"_g("+e+","+t.value+")"}},bind:function(e,t){e.wrapData=function(n){return"_b("+n+",'"+e.tag+"',"+t.value+","+(t.modifiers&&t.modifiers.prop?"true":"false")+(t.modifiers&&t.modifiers.sync?",true":"")+")"}},cloak:_},cc=function(e){this.options=e,this.warn=e.warn||cn,this.transforms=un(e.modules,"transformCode"),this.dataGenFns=un(e.modules,"genData"),this.directives=y(y({},sc),e.directives);var t=e.isReservedTag||Pi;this.maybeComponent=function(e){return!t(e.tag)},this.onceId=0,this.staticRenderFns=[]},uc=(new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b"),new RegExp("\\b"+"delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b")+"\\s*\\([^\\)]*\\)"),function(e){return function(t){function n(n,r){var i=Object.create(t),o=[],a=[];if(i.warn=function(e,t){(t?a:o).push(e)},r){r.modules&&(i.modules=(t.modules||[]).concat(r.modules)),r.directives&&(i.directives=y(Object.create(t.directives),r.directives));for(var s in r)"modules"!==s&&"directives"!==s&&(i[s]=r[s])}var c=e(n,i);return c.errors=o,c.tips=a,c}return{compile:n,compileToFunctions:xi(n)}}}(function(e,t){var n=Cr(e.trim(),t);Kr(n,t);var r=ei(n,t);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}})(ec).compileToFunctions),lc=!!Ki&&ki(!1),fc=!!Ki&&ki(!0),dc=v(function(e){var t=Jt(e);return t&&t.innerHTML}),pc=Ot.prototype.$mount;return Ot.prototype.$mount=function(e,t){if((e=e&&Jt(e))===document.body||e===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=dc(r));else{if(!r.nodeType)return this;r=r.innerHTML}else e&&(r=Ai(e));if(r){var i=uc(r,{shouldDecodeNewlines:lc,shouldDecodeNewlinesForHref:fc,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return pc.call(this,e,t)},Ot.compile=uc,Ot});
;
/*** <End:vue LoadJs:"components/vue/dist/vue.min.js"> ***/
/*** <End:vue> ***/

/*** <Start:libsodium.js> ***/
/*** <Start:libsodium.js LoadJs:"components/libsodium.js/dist/browsers/sodium.js"> ***/
!function(A){function e(A){"use strict";var e;void 0===(e=A)&&(e={});var I=e;"object"!=typeof I.sodium&&("object"==typeof global?I=global:"object"==typeof window&&(I=window)),"object"==typeof I.sodium&&"number"==typeof I.sodium.totalMemory&&(e.TOTAL_MEMORY=I.sodium.totalMemory);var g=e;return e.ready=new Promise(function(A,e){function I(A){K("NO_DYNAMIC_EXECUTION=1 was set, cannot eval")}function t(A,e){A||K("Assertion failed: "+e)}function r(A){var e=X["_"+A];return e||K("NO_DYNAMIC_EXECUTION=1 was set, cannot eval"),t(e,"Cannot call unknown function "+A+" (perhaps LLVM optimizations or closure removed it?)"),e}function n(A,e,I,g){switch("*"===(I=I||"i8").charAt(I.length-1)&&(I="i32"),I){case"i1":case"i8":iA[A>>0]=e;break;case"i16":cA[A>>1]=e;break;case"i32":oA[A>>2]=e;break;case"i64":tempI64=[e>>>0,(tempDouble=e,+NA(tempDouble)>=1?tempDouble>0?(0|PA(+UA(tempDouble/4294967296),4294967295))>>>0:~~+RA((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],oA[A>>2]=tempI64[0],oA[A+4>>2]=tempI64[1];break;case"float":EA[A>>2]=e;break;case"double":sA[A>>3]=e;break;default:K("invalid type for setValue: "+I)}}function a(A,e,I){switch("*"===(e=e||"i8").charAt(e.length-1)&&(e="i32"),e){case"i1":case"i8":return iA[A>>0];case"i16":return cA[A>>1];case"i32":case"i64":return oA[A>>2];case"float":return EA[A>>2];case"double":return sA[A>>3];default:K("invalid type for setValue: "+e)}return null}function i(A,e,I,g){var r,a;"number"==typeof A?(r=!0,a=A):(r=!1,a=A.length);var i,B="string"==typeof e?e:null;if(i=I==rA?g:["function"==typeof zA?zA:$.staticAlloc,$.stackAlloc,$.staticAlloc,$.dynamicAlloc][void 0===I?tA:I](Math.max(a,B?1:e.length)),r){var c,g=i;for(t(0==(3&i)),c=i+(-4&a);g<c;g+=4)oA[g>>2]=0;for(c=i+a;g<c;)iA[g++>>0]=0;return i}if("i8"===B)return A.subarray||A.slice?BA.set(A,i):BA.set(new Uint8Array(A),i),i;for(var C,o,Q,E=0;E<a;){var s=A[E];"function"==typeof s&&(s=$.getFunctionIndex(s)),0!==(C=B||e[E])?("i64"==C&&(C="i32"),n(i+E,s,C),Q!==C&&(o=$.getNativeTypeSize(C),Q=C),E+=o):E++}return i}function B(A,e){if(0===e||!A)return"";for(var I,g=0,t=0;;){if(I=BA[A+t>>0],g|=I,0==I&&!e)break;if(t++,e&&t==e)break}e||(e=t);var r="";if(g<128){for(var n;e>0;)n=String.fromCharCode.apply(String,BA.subarray(A,A+Math.min(e,1024))),r=r?r+n:n,A+=1024,e-=1024;return r}return X.UTF8ToString(A)}function c(A,e){for(var I=e;A[I];)++I;if(I-e>16&&A.subarray&&nA)return nA.decode(A.subarray(e,I));for(var g,t,r,n,a,i="";;){if(!(g=A[e++]))return i;if(128&g)if(t=63&A[e++],192!=(224&g))if(r=63&A[e++],224==(240&g)?g=(15&g)<<12|t<<6|r:(n=63&A[e++],240==(248&g)?g=(7&g)<<18|t<<12|r<<6|n:(a=63&A[e++],g=248==(252&g)?(3&g)<<24|t<<18|r<<12|n<<6|a:(1&g)<<30|t<<24|r<<18|n<<12|a<<6|63&A[e++])),g<65536)i+=String.fromCharCode(g);else{var B=g-65536;i+=String.fromCharCode(55296|B>>10,56320|1023&B)}else i+=String.fromCharCode((31&g)<<6|t);else i+=String.fromCharCode(g)}}function C(A,e,I,g){if(!(g>0))return 0;for(var t=I,r=I+g-1,n=0;n<A.length;++n){var a=A.charCodeAt(n);if(a>=55296&&a<=57343&&(a=65536+((1023&a)<<10)|1023&A.charCodeAt(++n)),a<=127){if(I>=r)break;e[I++]=a}else if(a<=2047){if(I+1>=r)break;e[I++]=192|a>>6,e[I++]=128|63&a}else if(a<=65535){if(I+2>=r)break;e[I++]=224|a>>12,e[I++]=128|a>>6&63,e[I++]=128|63&a}else if(a<=2097151){if(I+3>=r)break;e[I++]=240|a>>18,e[I++]=128|a>>12&63,e[I++]=128|a>>6&63,e[I++]=128|63&a}else if(a<=67108863){if(I+4>=r)break;e[I++]=248|a>>24,e[I++]=128|a>>18&63,e[I++]=128|a>>12&63,e[I++]=128|a>>6&63,e[I++]=128|63&a}else{if(I+5>=r)break;e[I++]=252|a>>30,e[I++]=128|a>>24&63,e[I++]=128|a>>18&63,e[I++]=128|a>>12&63,e[I++]=128|a>>6&63,e[I++]=128|63&a}}return e[I]=0,I-t}function o(A,e,I){return C(A,BA,e,I)}function Q(A){for(var e=0,I=0;I<A.length;++I){var g=A.charCodeAt(I);g>=55296&&g<=57343&&(g=65536+((1023&g)<<10)|1023&A.charCodeAt(++I)),g<=127?++e:e+=g<=2047?2:g<=65535?3:g<=2097151?4:g<=67108863?5:6}return e}function E(A){var e=X.___cxa_demangle||X.__cxa_demangle;if(e){try{var I=A.substr(1),g=Q(I)+1,t=zA(g);o(I,t,g);var r=zA(4),n=e(t,0,0,r);if(0===a(r,"i32")&&n)return B(n)}catch(A){}finally{t&&qA(t),r&&qA(r),n&&qA(n)}return A}return $.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"),A}function s(A){var e=/__Z[\w\d_]+/g;return A.replace(e,function(A){var e=E(A);return A===e?A:A+" ["+e+"]"})}function y(){var A=new Error;if(!A.stack){try{throw new Error(0)}catch(e){A=e}if(!A.stack)return"(no stack trace available)"}return A.stack.toString()}function h(){var A=y();return X.extraStackTrace&&(A+="\n"+X.extraStackTrace()),s(A)}function _(A,e){return A%e>0&&(A+=e-A%e),A}function p(A){X.buffer=aA=A}function w(){X.HEAP8=iA=new Int8Array(aA),X.HEAP16=cA=new Int16Array(aA),X.HEAP32=oA=new Int32Array(aA),X.HEAPU8=BA=new Uint8Array(aA),X.HEAPU16=CA=new Uint16Array(aA),X.HEAPU32=QA=new Uint32Array(aA),X.HEAPF32=EA=new Float32Array(aA),X.HEAPF64=sA=new Float64Array(aA)}function u(){K("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+kA+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function l(){u()}function d(A){for(;A.length>0;){var e=A.shift();if("function"!=typeof e){var I=e.func;"number"==typeof I?void 0===e.arg?X.dynCall_v(I):X.dynCall_vi(I,e.arg):I(void 0===e.arg?null:e.arg)}else e()}}function D(){if(X.preRun)for("function"==typeof X.preRun&&(X.preRun=[X.preRun]);X.preRun.length;)F(X.preRun.shift());d(bA)}function v(){MA||(MA=!0,d(GA))}function k(){d(FA)}function b(){d(mA),YA=!0}function G(){if(X.postRun)for("function"==typeof X.postRun&&(X.postRun=[X.postRun]);X.postRun.length;)m(X.postRun.shift());d(HA)}function F(A){bA.unshift(A)}function m(A){HA.unshift(A)}function H(A,e){iA.set(A,e)}function M(A,e,I){for(var g=0;g<A.length;++g)iA[e++>>0]=A.charCodeAt(g);I||(iA[e>>0]=0)}function Y(A){JA++,X.monitorRunDependencies&&X.monitorRunDependencies(JA)}function S(A){if(JA--,X.monitorRunDependencies&&X.monitorRunDependencies(JA),0==JA&&(null!==xA&&(clearInterval(xA),xA=null),LA)){var e=LA;LA=null,e()}}function N(A){return X.___errno_location&&(oA[X.___errno_location()>>2]=A),A}function R(A,e,I){var g=I>0?I:Q(A)+1,t=new Array(g),r=C(A,t,0,t.length);return e&&(t.length=r),t}function U(A){if("boolean"==typeof O&&O){var e;try{e=Buffer.from(A,"base64")}catch(I){e=new Buffer(A,"base64")}return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}try{for(var I=OA(A),g=new Uint8Array(I.length),t=0;t<I.length;++t)g[t]=I.charCodeAt(t);return g}catch(A){throw new Error("Converting base64 string to bytes failed.")}}function P(A){var e="data:application/octet-stream;base64,";if(String.prototype.startsWith?A.startsWith(e):0===A.indexOf(e))return U(A.slice(e.length))}function J(A){this.name="ExitStatus",this.message="Program terminated with exit("+A+")",this.status=A}function x(A){function e(){X.calledRun||(X.calledRun=!0,IA||(v(),k(),X.onRuntimeInitialized&&X.onRuntimeInitialized(),X._main&&ie&&X.callMain(A),G()))}A=A||X.arguments,null===re&&(re=Date.now()),JA>0||(D(),JA>0||X.calledRun||(X.setStatus?(X.setStatus("Running..."),setTimeout(function(){setTimeout(function(){X.setStatus("")},1),e()},1)):e()))}function L(A,e){e&&X.noExitRuntime||(X.noExitRuntime||(IA=!0,gA=A,_A=te,b(),X.onExit&&X.onExit(A)),O&&process.exit(A),X.quit(A,new J(A)))}function K(A){X.onAbort&&X.onAbort(A),void 0!==A?(X.print(A),X.printErr(A),A=JSON.stringify(A)):A="",IA=!0,gA=1;var e="abort("+A+") at "+h()+"\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";throw ae&&ae.forEach(function(I){e=I(e,A)}),e}(X=g).onAbort=e,X.onRuntimeInitialized=A;var X;X||(X=(void 0!==X?X:null)||{});var T={};for(var V in X)X.hasOwnProperty(V)&&(T[V]=X[V]);var j=!1,Z=!1,O=!1,W=!1;if(X.ENVIRONMENT)if("WEB"===X.ENVIRONMENT)j=!0;else if("WORKER"===X.ENVIRONMENT)Z=!0;else if("NODE"===X.ENVIRONMENT)O=!0;else{if("SHELL"!==X.ENVIRONMENT)throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.");W=!0}else j="object"==typeof window,Z="function"==typeof importScripts,O="object"==typeof process&&"function"==typeof require&&!j&&!Z,W=!j&&!O&&!Z;if(O){X.print||(X.print=console.log),X.printErr||(X.printErr=console.warn);var q,z;X.read=function(A,e){var I;return(I=P(A))||(q||(q=require("fs")),z||(z=require("path")),A=z.normalize(A),I=q.readFileSync(A)),e?I:I.toString()},X.readBinary=function(A){var e=X.read(A,!0);return e.buffer||(e=new Uint8Array(e)),t(e.buffer),e},X.load=function(A){I(read(A))},X.thisProgram||(process.argv.length>1?X.thisProgram=process.argv[1].replace(/\\/g,"/"):X.thisProgram="unknown-program"),X.arguments=process.argv.slice(2),"undefined"!=typeof module&&(module.exports=X),process.on("uncaughtException",function(A){if(!(A instanceof J))throw A}),X.inspect=function(){return"[Emscripten Module object]"}}else if(W)X.print||(X.print=print),"undefined"!=typeof printErr&&(X.printErr=printErr),"undefined"!=typeof read?X.read=function(A){var e=P(A);return e?jA(e):read(A)}:X.read=function(){throw"no read() available"},X.readBinary=function(A){var e;return(e=P(A))?e:"function"==typeof readbuffer?new Uint8Array(readbuffer(A)):(e=read(A,"binary"),t("object"==typeof e),e)},"undefined"!=typeof scriptArgs?X.arguments=scriptArgs:void 0!==arguments&&(X.arguments=arguments),"function"==typeof quit&&(X.quit=function(A,e){quit(A)});else{if(!j&&!Z)throw new Error("Unknown runtime environment. Where are we?");if(X.read=function(A){try{var e=new XMLHttpRequest;return e.open("GET",A,!1),e.send(null),e.responseText}catch(e){var I=P(A);if(I)return jA(I);throw e}},Z&&(X.readBinary=function(A){try{var e=new XMLHttpRequest;return e.open("GET",A,!1),e.responseType="arraybuffer",e.send(null),new Uint8Array(e.response)}catch(A){var I=P(f);if(I)return I;throw A}}),X.readAsync=function(A,e,I){var g=new XMLHttpRequest;g.open("GET",A,!0),g.responseType="arraybuffer",g.onload=function(){if(200==g.status||0==g.status&&g.response)e(g.response);else{var t=P(A);t?e(t.buffer):I()}},g.onerror=I,g.send(null)},void 0!==arguments&&(X.arguments=arguments),"undefined"!=typeof console)X.print||(X.print=function(A){}),X.printErr||(X.printErr=function(A){});else{X.print||(X.print=function(A){})}Z&&(X.load=importScripts),void 0===X.setWindowTitle&&(X.setWindowTitle=function(A){document.title=A})}!X.load&&X.read&&(X.load=function(A){I(X.read(A))}),X.print||(X.print=function(){}),X.printErr||(X.printErr=X.print),X.arguments||(X.arguments=[]),X.thisProgram||(X.thisProgram="./this.program"),X.quit||(X.quit=function(A,e){throw e}),X.print=X.print,X.printErr=X.printErr,X.preRun=[],X.postRun=[];for(var V in T)T.hasOwnProperty(V)&&(X[V]=T[V]);T=void 0;var $={setTempRet0:function(A){return tempRet0=A,A},getTempRet0:function(){return tempRet0},stackSave:function(){return _A},stackRestore:function(A){_A=A},getNativeTypeSize:function(A){switch(A){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:if("*"===A[A.length-1])return $.QUANTUM_SIZE;if("i"===A[0]){var e=parseInt(A.substr(1));return t(e%8==0),e/8}return 0}},getNativeFieldSize:function(A){return Math.max($.getNativeTypeSize(A),$.QUANTUM_SIZE)},STACK_ALIGN:16,prepVararg:function(A,e){return"double"===e||"i64"===e?7&A&&(t(4==(7&A)),A+=4):t(0==(3&A)),A},getAlignSize:function(A,e,I){return I||"i64"!=A&&"double"!=A?A?Math.min(e||(A?$.getNativeFieldSize(A):0),$.QUANTUM_SIZE):Math.min(e,8):8},dynCall:function(A,e,I){return I&&I.length?X["dynCall_"+A].apply(null,[e].concat(I)):X["dynCall_"+A].call(null,e)},functionPointers:[null,null,null,null,null,null,null,null],addFunction:function(A){for(var e=0;e<$.functionPointers.length;e++)if(!$.functionPointers[e])return $.functionPointers[e]=A,1*(1+e);throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."},removeFunction:function(A){$.functionPointers[(A-1)/1]=null},warnOnce:function(A){$.warnOnce.shown||($.warnOnce.shown={}),$.warnOnce.shown[A]||($.warnOnce.shown[A]=1,X.printErr(A))},funcWrappers:{},getFuncWrapper:function(A,e){if(A){t(e),$.funcWrappers[e]||($.funcWrappers[e]={});var I=$.funcWrappers[e];return I[A]||(1===e.length?I[A]=function(){return $.dynCall(e,A)}:2===e.length?I[A]=function(I){return $.dynCall(e,A,[I])}:I[A]=function(){return $.dynCall(e,A,Array.prototype.slice.call(arguments))}),I[A]}},getCompilerSetting:function(A){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"},stackAlloc:function(A){var e=_A;return _A=_A+A|0,_A=_A+15&-16,e},staticAlloc:function(A){var e=hA;return hA=hA+A|0,hA=hA+15&-16,e},dynamicAlloc:function(A){var e=oA[uA>>2],I=-16&(e+A+15|0);return oA[uA>>2]=I,I>=kA&&!l()?(oA[uA>>2]=e,0):e},alignMemory:function(A,e){return A=Math.ceil(A/(e||16))*(e||16)},makeBigInt:function(A,e,I){return I?+(A>>>0)+4294967296*+(e>>>0):+(A>>>0)+4294967296*+(0|e)},GLOBAL_BASE:1024,QUANTUM_SIZE:4,__dummy__:0};X.Runtime=$;var AA,eA,IA=0,gA=0;!function(){var A={stackSave:function(){$.stackSave()},stackRestore:function(){$.stackRestore()},arrayToC:function(A){var e=$.stackAlloc(A.length);return H(A,e),e},stringToC:function(A){var e=0;if(null!==A&&void 0!==A&&0!==A){var I=1+(A.length<<2);o(A,e=$.stackAlloc(I),I)}return e}},e={string:A.stringToC,array:A.arrayToC};eA=function(A,I,g,t,n){var a=r(A),i=[],c=0;if(t)for(var C=0;C<t.length;C++){var o=e[g[C]];o?(0===c&&(c=$.stackSave()),i[C]=o(t[C])):i[C]=t[C]}var Q=a.apply(null,i);if("string"===I&&(Q=B(Q)),0!==c){if(n&&n.async)return void EmterpreterAsync.asyncFinalizers.push(function(){$.stackRestore(c)});$.stackRestore(c)}return Q},AA=function(A,e,I){return function(){return eA(A,e,I,arguments)}}}(),X.ccall=eA,X.cwrap=AA,X.setValue=n,X.getValue=a;var tA=2,rA=4;X.ALLOC_NORMAL=0,X.ALLOC_STACK=1,X.ALLOC_STATIC=tA,X.ALLOC_DYNAMIC=3,X.ALLOC_NONE=rA,X.allocate=i,X.getMemory=function(A){return fA?MA?zA(A):$.dynamicAlloc(A):$.staticAlloc(A)},X.Pointer_stringify=B,X.AsciiToString=function(A){for(var e="";;){var I=iA[A++>>0];if(!I)return e;e+=String.fromCharCode(I)}},X.stringToAscii=function(A,e){return M(A,e,!1)};var nA="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;X.UTF8ArrayToString=c,X.UTF8ToString=function(A){return c(BA,A)},X.stringToUTF8Array=C,X.stringToUTF8=o,X.lengthBytesUTF8=Q;"undefined"!=typeof TextDecoder&&new TextDecoder("utf-16le");X.stackTrace=h;var aA,iA,BA,cA,CA,oA,QA,EA,sA,yA,hA,fA,_A,pA,wA,uA,lA=16384,dA=65536,DA=16777216;yA=hA=_A=pA=wA=uA=0,fA=!1;var vA=X.TOTAL_STACK||5242880,kA=X.TOTAL_MEMORY||16777216;if(kA<vA&&X.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+kA+"! (TOTAL_STACK="+vA+")"),X.buffer?aA=X.buffer:"object"==typeof WebAssembly&&"function"==typeof WebAssembly.Memory?(X.wasmMemory=new WebAssembly.Memory({initial:kA/dA,maximum:kA/dA}),aA=X.wasmMemory.buffer):aA=new ArrayBuffer(kA),w(),oA[0]=1668509029,cA[1]=25459,115!==BA[2]||99!==BA[3])throw"Runtime error: expected the system to be little-endian!";X.HEAP=void 0,X.buffer=aA,X.HEAP8=iA,X.HEAP16=cA,X.HEAP32=oA,X.HEAPU8=BA,X.HEAPU16=CA,X.HEAPU32=QA,X.HEAPF32=EA,X.HEAPF64=sA;var bA=[],GA=[],FA=[],mA=[],HA=[],MA=!1,YA=!1;if(X.addOnPreRun=F,X.addOnInit=function(A){GA.unshift(A)},X.addOnPreMain=function(A){FA.unshift(A)},X.addOnExit=function(A){mA.unshift(A)},X.addOnPostRun=m,X.writeStringToMemory=function(A,e,I){$.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var g,t;I&&(t=e+Q(A),g=iA[t]),o(A,e,1/0),I&&(iA[t]=g)},X.writeArrayToMemory=H,X.writeAsciiToMemory=M,Math.imul&&-5===Math.imul(4294967295,5)||(Math.imul=function(A,e){var I=65535&A,g=65535&e;return I*g+((A>>>16)*g+I*(e>>>16)<<16)|0}),Math.imul=Math.imul,!Math.fround){var SA=new Float32Array(1);Math.fround=function(A){return SA[0]=A,SA[0]}}Math.fround=Math.fround,Math.clz32||(Math.clz32=function(A){A>>>=0;for(var e=0;e<32;e++)if(A&1<<31-e)return e;return 32}),Math.clz32=Math.clz32,Math.trunc||(Math.trunc=function(A){return A<0?Math.ceil(A):Math.floor(A)}),Math.trunc=Math.trunc;var NA=Math.abs,RA=(Math.cos,Math.sin,Math.tan,Math.acos,Math.asin,Math.atan,Math.atan2,Math.exp,Math.log,Math.sqrt,Math.ceil),UA=Math.floor,PA=(Math.pow,Math.imul,Math.fround,Math.round,Math.min),JA=(Math.clz32,Math.trunc,0),xA=null,LA=null;X.addRunDependency=Y,X.removeRunDependency=S,X.preloadedImages={},X.preloadedAudios={};var KA=null;!function(){function A(A){var e=X.buffer;A.byteLength<e.byteLength&&X.printErr("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");var I=new Int8Array(e),g=new Int8Array(A);KA||I.set(g.subarray(X.STATIC_BASE,X.STATIC_BASE+X.STATIC_BUMP),X.STATIC_BASE),g.set(I),p(A),w()}function e(A){return A}function I(){try{if(X.wasmBinary)return new Uint8Array(X.wasmBinary);var A=P(a);if(A)return A;if(X.readBinary)return X.readBinary(a);throw"on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)"}catch(A){K(A)}}function g(){return X.wasmBinary||!j&&!Z||"function"!=typeof fetch?new Promise(function(A,e){A(I())}):fetch(a,{credentials:"same-origin"}).then(function(A){if(!A.ok)throw"failed to load wasm binary file at '"+a+"'";return A.arrayBuffer()}).catch(function(){return I()})}function t(e,I,t){function r(e){(c=e.exports).memory&&A(c.memory),X.asm=c,X.usingWasm=!0,S("wasm-instantiate")}function n(A){r(A.instance)}function i(A){g().then(function(A){return WebAssembly.instantiate(A,B)}).then(A).catch(function(A){X.printErr("failed to asynchronously prepare wasm: "+A),K(A)})}if("object"!=typeof WebAssembly)return X.printErr("no native wasm support detected"),!1;if(!(X.wasmMemory instanceof WebAssembly.Memory))return X.printErr("no native wasm Memory in use"),!1;if(I.memory=X.wasmMemory,B.global={NaN:NaN,Infinity:1/0},B["global.Math"]=e.Math,B.env=I,Y("wasm-instantiate"),X.instantiateWasm)try{return X.instantiateWasm(B,r)}catch(A){return X.printErr("Module.instantiateWasm callback failed with error: "+A),!1}return X.wasmBinary||"function"!=typeof WebAssembly.instantiateStreaming||0===a.indexOf("data:")?i(n):WebAssembly.instantiateStreaming(fetch(a,{credentials:"same-origin"}),B).then(n).catch(function(A){X.printErr("wasm streaming compile failed: "+A),X.printErr("falling back to ArrayBuffer instantiation"),i(n)}),{}}var r=X.wasmJSMethod||"native-wasm";X.wasmJSMethod=r;var n=X.wasmTextFile||"",a=X.wasmBinaryFile||"data:application/octet-stream;base64,AGFzbQEAAAABigMtYAABf2ABfwF/YAR/f39/AGAAAGABfwBgA39/fwF/YAJ/fwBgCn9/f39+f35/f38Bf2ACf34AYAl/f39+f35/f38Bf2AJf39/fn9/fn9/AX9gCX9/f39+f35/fwF/YAR/f35/AX9gA39/fgBgBH9/fn8AYAJ/fwF/YAZ/f39+f38Bf2AHf39/fn9/fwF/YAV/f35/fwF/YAZ/f35/f38Bf2ADf39/AGABfwF+YAN/f38BfmAEf39/fwF/YAN/f34Bf2ACfn8BfmAFf39/f38AYAZ/f39/fn8AYAV/f39/fwF/YAh/f39/fn9+fwF/YAh/f39/f35/fgF/YAV/f39+fwF/YAZ/f39+f38AYAV/f39+fwBgBH9+f38AYAV/f35/fwBgBn9/fn9/fwBgBn9/fn9+fwBgBH9/f34AYAd/f39/f39/AX9gCH9/f39/f39/AX9gDH9/f39/f39/f39/fwF/YAZ/f39/f38Bf2ALf39/f39/f39/f38Bf2AKf39/f39/f39/fwF/Ar8CEANlbnYORFlOQU1JQ1RPUF9QVFIDfwADZW52CFNUQUNLVE9QA38AA2VudglTVEFDS19NQVgDfwADZW52DWVubGFyZ2VNZW1vcnkAAANlbnYOZ2V0VG90YWxNZW1vcnkAAANlbnYXYWJvcnRPbkNhbm5vdEdyb3dNZW1vcnkAAANlbnYXX2Vtc2NyaXB0ZW5fYXNtX2NvbnN0X2kAAQNlbnYOX19fYXNzZXJ0X2ZhaWwAAgNlbnYGX2Fib3J0AAMDZW52C19fX3NldEVyck5vAAQDZW52Fl9lbXNjcmlwdGVuX21lbWNweV9iaWcABQNlbnYIX3N5c2NvbmYAAQNlbnYGbWVtb3J5AgGAAoACA2VudgV0YWJsZQFwAAADZW52Cm1lbW9yeUJhc2UDfwADZW52CXRhYmxlQmFzZQN/AAO4ArYCAQAEBgYEAAcICQcJCgsKCwAAAAAEAAcJCgsADAwGDQYGDgwFDwUQERITEBESEwwUEgAFBQQEFAYGFRYGARQGBhQUDwYBBgYGBgIGBgYGFBQUBgYGBBQPFBQGAgQXAQ8GFBQUAAAQFxgFBhUZBgQGBAQGBgINCBoFGxoQHBcFGAQNAgYVBgYUCA0SEgUPHBwGDQYODAYNDQYPBQUPEBIQEgUEBQQdBh4AAAAAAAAMBA4ZAAUPHx8fDAEYFwUCBRQGDw8BEgEMHwYgBCEfFCIjJCIiJSQGFCYUIyMPBQ8AAwEGFAgXJw8EHAEBKAEBHAADAwQGBQEEAxwXAAAFDxQUBiIlAQQAAQ8PAwUFBQEpKiocHCccKScrKysrKCgcKicqKycrFyopKysrKhQXJxwnFyonLCosKgYfBn8BIwALfwEjAQt/ASMCC38BQQALfwFBAAt/AUEACwfZKKkBHV9zb2RpdW1fbGlicmFyeV92ZXJzaW9uX21pbm9yABswX2NyeXB0b19zZWNyZXRzdHJlYW1feGNoYWNoYTIwcG9seTEzMDVfaW5pdF9wdXNoAKkBD19zb2RpdW1faGV4MmJpbgDtARlfY3J5cHRvX2t4X3B1YmxpY2tleWJ5dGVzABkNX3NvZGl1bV91bnBhZACBAjFfY3J5cHRvX3NlY3JldHN0cmVhbV94Y2hhY2hhMjBwb2x5MTMwNV9zdGF0ZWJ5dGVzALABFl9jcnlwdG9fYm94X25vbmNlYnl0ZXMAIytfY3J5cHRvX2FlYWRfY2hhY2hhMjBwb2x5MTMwNV9pZXRmX2tleWJ5dGVzABkzX2NyeXB0b19hZWFkX2NoYWNoYTIwcG9seTEzMDVfaWV0Zl9lbmNyeXB0X2RldGFjaGVkAJYCC19zb2RpdW1fcGFkAIACF19jcnlwdG9fc2NhbGFybXVsdF9iYXNlAKEBJF9jcnlwdG9fYWVhZF9jaGFjaGEyMHBvbHkxMzA1X2FieXRlcwAcIl9jcnlwdG9fY29yZV9oY2hhY2hhMjBfb3V0cHV0Ynl0ZXMAGRJfY3J5cHRvX2F1dGhfYnl0ZXMAGRdfY3J5cHRvX3NpZ25fc3RhdGVieXRlcwC6ARFfY3J5cHRvX3NpZ25fb3BlbgCXAgVfc2JyawCVAgdfbWVtY3B5AJICFV9jcnlwdG9fa2RmX2J5dGVzX21heABsFV9jcnlwdG9fa2RmX2J5dGVzX21pbgAcGF9jcnlwdG9fYm94X3NlZWRfa2V5cGFpcgAsCnN0YWNrQWxsb2MACR1fY3J5cHRvX2JveF9vcGVuX2Vhc3lfYWZ0ZXJubQCYAiVfY3J5cHRvX3NpZ25fZWQyNTUxOV9za190b19jdXJ2ZTI1NTE5AMoBG19lbXNjcmlwdGVuX2dldF9nbG9iYWxfbGliYwCNAi9fY3J5cHRvX3NlY3JldHN0cmVhbV94Y2hhY2hhMjBwb2x5MTMwNV9rZXlieXRlcwAZBV9mcmVlAIwCJl9jcnlwdG9fYWVhZF9jaGFjaGEyMHBvbHkxMzA1X2tleWJ5dGVzABkJc3RhY2tTYXZlAAoyX2NyeXB0b19zZWNyZXRzdHJlYW1feGNoYWNoYTIwcG9seTEzMDVfdGFnX21lc3NhZ2UAGxBfY3J5cHRvX2JveF9zZWFsAJkCKl9jcnlwdG9fYWVhZF94Y2hhY2hhMjBwb2x5MTMwNV9pZXRmX2tleWdlbgAdEl9jcnlwdG9fa3hfa2V5cGFpcgCVAQtydW5Qb3N0U2V0cwCRAh5fY3J5cHRvX2t4X2NsaWVudF9zZXNzaW9uX2tleXMAlgERX2NyeXB0b19zaG9ydGhhc2gAmgIVX2NyeXB0b19hdXRoX2tleWJ5dGVzABknX2NyeXB0b19hZWFkX2NoYWNoYTIwcG9seTEzMDVfbnB1YmJ5dGVzAB4wX2NyeXB0b19zZWNyZXRzdHJlYW1feGNoYWNoYTIwcG9seTEzMDVfdGFnX3Jla2V5ALQBKl9jcnlwdG9fYWVhZF94Y2hhY2hhMjBwb2x5MTMwNV9pZXRmX2FieXRlcwAcFl9jcnlwdG9fc2lnbl9zZWVkYnl0ZXMAGRxfY3J5cHRvX2JveF9kZXRhY2hlZF9hZnRlcm5tAJsCDF9jcnlwdG9fYXV0aACcAhNfcmFuZG9tYnl0ZXNfcmFuZG9tAOYBFF9jcnlwdG9fc2lnbl9rZXlwYWlyALwBCHNldFRocmV3AA0eX2NyeXB0b19nZW5lcmljaGFzaF9zdGF0ZWJ5dGVzAG0eX3JhbmRvbWJ5dGVzX2J1Zl9kZXRlcm1pbmlzdGljAOoBLl9jcnlwdG9fYWVhZF9jaGFjaGEyMHBvbHkxMzA1X2VuY3J5cHRfZGV0YWNoZWQAnQItX2NyeXB0b19zZWNyZXRzdHJlYW1feGNoYWNoYTIwcG9seTEzMDVfa2V5Z2VuAB0dX3NvZGl1bV9saWJyYXJ5X3ZlcnNpb25fbWFqb3IAgwIZX2NyeXB0b19zaWduX2ZpbmFsX3ZlcmlmeQDEARVfY3J5cHRvX2JveF9zZWFsYnl0ZXMAOhhfY3J5cHRvX3NlY3JldGJveF9rZXlnZW4AHQdfbWFsbG9jAIsCFl9zb2RpdW1fdmVyc2lvbl9zdHJpbmcAggIgX2NyeXB0b19nZW5lcmljaGFzaF9rZXlieXRlc19tYXgAbCVfY3J5cHRvX3NpZ25fZWQyNTUxOV9wa190b19jdXJ2ZTI1NTE5AMkBGV9jcnlwdG9fYm94X2JlZm9yZW5tYnl0ZXMAGRNfY3J5cHRvX2dlbmVyaWNoYXNoAJ4CC2dldFRlbXBSZXQwAA8sX2NyeXB0b19hZWFkX2NoYWNoYTIwcG9seTEzMDVfaWV0Zl9uc2VjYnl0ZXMAGxFfcmFuZG9tYnl0ZXNfc3RpcgDnASpfY3J5cHRvX2FlYWRfY2hhY2hhMjBwb2x5MTMwNV9pZXRmX2VuY3J5cHQAnwIvX2NyeXB0b19zZWNyZXRzdHJlYW1feGNoYWNoYTIwcG9seTEzMDVfdGFnX3B1c2gAswEWX2NyeXB0b19jb3JlX2hjaGFjaGEyMABlFF9jcnlwdG9fYm94X2JlZm9yZW5tAC4aX2NyeXB0b19zaG9ydGhhc2hfa2V5Ynl0ZXMAHCpfY3J5cHRvX2FlYWRfY2hhY2hhMjBwb2x5MTMwNV9pZXRmX2RlY3J5cHQAoAISX3JhbmRvbWJ5dGVzX2Nsb3NlABseX2NyeXB0b19reF9zZXJ2ZXJfc2Vzc2lvbl9rZXlzAJcBMF9jcnlwdG9fc2VjcmV0c3RyZWFtX3hjaGFjaGEyMHBvbHkxMzA1X3RhZ19maW5hbAC1ASFfY3J5cHRvX2NvcmVfaGNoYWNoYTIwX2NvbnN0Ynl0ZXMAHBdfY3J5cHRvX3Nob3J0aGFzaF9ieXRlcwAeFF9jcnlwdG9fa2RmX2tleWJ5dGVzABkTZXN0YWJsaXNoU3RhY2tTcGFjZQAMGV9jcnlwdG9fc2lnbl9maW5hbF9jcmVhdGUAwwElX2NyeXB0b19hZWFkX2NoYWNoYTIwcG9seTEzMDVfZW5jcnlwdAChAitfY3J5cHRvX2FlYWRfeGNoYWNoYTIwcG9seTEzMDVfaWV0Zl9lbmNyeXB0AKICGV9jcnlwdG9fa3hfc2VjcmV0a2V5Ynl0ZXMAGTdfY3J5cHRvX3NlY3JldHN0cmVhbV94Y2hhY2hhMjBwb2x5MTMwNV9tZXNzYWdlYnl0ZXNfbWF4ALIBLV9jcnlwdG9fc2VjcmV0c3RyZWFtX3hjaGFjaGEyMHBvbHkxMzA1X2FieXRlcwCxARRfY3J5cHRvX2JveF9kZXRhY2hlZACjAhBfcmFuZG9tYnl0ZXNfYnVmAOkBGV9jcnlwdG9fYm94X29wZW5fZGV0YWNoZWQApAIYX2NyeXB0b19zY2FsYXJtdWx0X2J5dGVzABkUX2NyeXB0b19reF9zZWVkYnl0ZXMAGRNfY3J5cHRvX2F1dGhfdmVyaWZ5AKUCFV9jcnlwdG9fc2lnbl9kZXRhY2hlZACmAhpfY3J5cHRvX3NlY3JldGJveF9kZXRhY2hlZACnAhZfY3J5cHRvX3NlY3JldGJveF9lYXN5AKgCMF9jcnlwdG9fc2VjcmV0c3RyZWFtX3hjaGFjaGEyMHBvbHkxMzA1X2luaXRfcHVsbACrATRfY3J5cHRvX2FlYWRfeGNoYWNoYTIwcG9seTEzMDVfaWV0Zl9kZWNyeXB0X2RldGFjaGVkAKkCB19tZW1zZXQAlAIaX2NyeXB0b19nZW5lcmljaGFzaF9rZXlnZW4AHSFfY3J5cHRvX2JveF9vcGVuX2RldGFjaGVkX2FmdGVybm0AqgIPX3NvZGl1bV9iaW4yaGV4AOwBK19jcnlwdG9fYWVhZF94Y2hhY2hhMjBwb2x5MTMwNV9pZXRmX2RlY3J5cHQAqwIpX2NyeXB0b19hZWFkX2NoYWNoYTIwcG9seTEzMDVfaWV0Zl9rZXlnZW4AHRVfY3J5cHRvX2JveF9zZWVkYnl0ZXMAGSFfY3J5cHRvX2NvcmVfaGNoYWNoYTIwX2lucHV0Ynl0ZXMAHBNfY3J5cHRvX2F1dGhfa2V5Z2VuAB0MX2NyeXB0b19oYXNoAKwCF19zb2RpdW1fbGlicmFyeV9taW5pbWFsALMBGF9jcnlwdG9fYm94X2Vhc3lfYWZ0ZXJubQCtAjRfY3J5cHRvX2FlYWRfeGNoYWNoYTIwcG9seTEzMDVfaWV0Zl9lbmNyeXB0X2RldGFjaGVkAK4CEl9zb2RpdW1fYmluMmJhc2U2NADwARRfY3J5cHRvX2JveF9tYWNieXRlcwAcFl9yYW5kb21ieXRlc19zZWVkYnl0ZXMAGRpfY3J5cHRvX2JveF9wdWJsaWNrZXlieXRlcwAZLl9jcnlwdG9fYWVhZF9jaGFjaGEyMHBvbHkxMzA1X2RlY3J5cHRfZGV0YWNoZWQArwIbX2NyeXB0b19zaWduX3NlY3JldGtleWJ5dGVzAGwaX2NyeXB0b19ib3hfc2VjcmV0a2V5Ynl0ZXMAGSxfY3J5cHRvX2FlYWRfeGNoYWNoYTIwcG9seTEzMDVfaWV0Zl9rZXlieXRlcwAZHl9jcnlwdG9fc2NhbGFybXVsdF9zY2FsYXJieXRlcwAZLF9jcnlwdG9fc2VjcmV0c3RyZWFtX3hjaGFjaGEyMHBvbHkxMzA1X3Jla2V5AKwBIF9jcnlwdG9fZ2VuZXJpY2hhc2hfa2V5Ynl0ZXNfbWluABwkX2NyeXB0b19hZWFkX2NoYWNoYTIwcG9seTEzMDVfa2V5Z2VuAB0aX2NyeXB0b19reF9zZXNzaW9ua2V5Ynl0ZXMAGTJfY3J5cHRvX3NlY3JldHN0cmVhbV94Y2hhY2hhMjBwb2x5MTMwNV9oZWFkZXJieXRlcwAjJV9jcnlwdG9fYWVhZF9jaGFjaGEyMHBvbHkxMzA1X2RlY3J5cHQAsAIIX21lbW1vdmUAkwIzX2NyeXB0b19hZWFkX2NoYWNoYTIwcG9seTEzMDVfaWV0Zl9kZWNyeXB0X2RldGFjaGVkALECDF9jcnlwdG9fc2lnbgCyAhxfY3J5cHRvX3NlY3JldGJveF9ub25jZWJ5dGVzACMTX2NyeXB0b19ib3hfa2V5cGFpcgAtHF9jcnlwdG9fZ2VuZXJpY2hhc2hfa2V5Ynl0ZXMAGRJfY3J5cHRvX2hhc2hfYnl0ZXMAbB1fY3J5cHRvX2dlbmVyaWNoYXNoX2J5dGVzX21pbgAcDF9zb2RpdW1faW5pdAD3ARpfY3J5cHRvX3NlY3JldGJveF9tYWNieXRlcwAcGl9jcnlwdG9fc2VjcmV0Ym94X2tleWJ5dGVzABktX2NyeXB0b19hZWFkX3hjaGFjaGEyMHBvbHkxMzA1X2lldGZfbnB1YmJ5dGVzACMMX3JhbmRvbWJ5dGVzALMCG19jcnlwdG9fc2lnbl9wdWJsaWNrZXlieXRlcwAZE19jcnlwdG9fc2lnbl91cGRhdGUAtAILc2V0VGVtcFJldDAADhlfY3J5cHRvX3NpZ25fc2VlZF9rZXlwYWlyALsBGV9jcnlwdG9fZ2VuZXJpY2hhc2hfYnl0ZXMAGR1fY3J5cHRvX2dlbmVyaWNoYXNoX2J5dGVzX21heABsH19jcnlwdG9fc2VjcmV0Ym94X29wZW5fZGV0YWNoZWQAtQIRX2NyeXB0b19zaWduX2luaXQAwQEfX2NyeXB0b19jb3JlX2hjaGFjaGEyMF9rZXlieXRlcwAZHF9jcnlwdG9fc2lnbl92ZXJpZnlfZGV0YWNoZWQAtgIXX2NyeXB0b19reF9zZWVkX2tleXBhaXIAlAEVX2NyeXB0b19ib3hfb3Blbl9lYXN5ALcCGF9jcnlwdG9fZ2VuZXJpY2hhc2hfaW5pdABvJ19jcnlwdG9fYWVhZF9jaGFjaGEyMHBvbHkxMzA1X25zZWNieXRlcwAbGF9jcnlwdG9fa2RmX2NvbnRleHRieXRlcwAeEl9jcnlwdG9fc2lnbl9ieXRlcwBsGl9jcnlwdG9fZ2VuZXJpY2hhc2hfdXBkYXRlALgCEl9jcnlwdG9fc2NhbGFybXVsdACiASlfY3J5cHRvX2FlYWRfY2hhY2hhMjBwb2x5MTMwNV9pZXRmX2FieXRlcwAcDHN0YWNrUmVzdG9yZQALEl9jcnlwdG9fa2RmX2tleWdlbgAdLV9jcnlwdG9fYWVhZF94Y2hhY2hhMjBwb2x5MTMwNV9pZXRmX25zZWNieXRlcwAbFV9jcnlwdG9fYm94X3NlYWxfb3BlbgC5AhBfY3J5cHRvX2JveF9lYXN5ALoCK19jcnlwdG9fc2VjcmV0c3RyZWFtX3hjaGFjaGEyMHBvbHkxMzA1X3B1bGwAuwISX3NvZGl1bV9iYXNlNjQyYmluAPMBGl9zb2RpdW1fYmFzZTY0X2VuY29kZWRfbGVuAO4BG19jcnlwdG9fc2VjcmV0Ym94X29wZW5fZWFzeQC8AhlfY3J5cHRvX2dlbmVyaWNoYXNoX2ZpbmFsAHEVX2NyeXB0b19zdHJlYW1fa2V5Z2VuAB0UX3JhbmRvbWJ5dGVzX3VuaWZvcm0A6AErX2NyeXB0b19zZWNyZXRzdHJlYW1feGNoYWNoYTIwcG9seTEzMDVfcHVzaAC9AhtfY3J5cHRvX2tkZl9kZXJpdmVfZnJvbV9rZXkAvgIYX2NyeXB0b19zaG9ydGhhc2hfa2V5Z2VuALcBLF9jcnlwdG9fYWVhZF9jaGFjaGEyMHBvbHkxMzA1X2lldGZfbnB1YmJ5dGVzABoJAQAKh/IDtgIbAQF/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AHM6AAAgAkEBaiICQSBHDQALIAAgA0KAARCJASAAQdABaiICEIgBIANBAWoiAELcuPHixYuXrtwANwAAIABC3Ljx4sWLl67cADcACCAAQty48eLFi5eu3AA3ABAgAELcuPHixYuXrtwANwAYIABC3Ljx4sWLl67cADcAICAAQty48eLFi5eu3AA3ACggAELcuPHixYuXrtwANwAwIABC3Ljx4sWLl67cADcAOCAAQty48eLFi5eu3AA3AEAgAELcuPHixYuXrtwANwBIIABC3Ljx4sWLl67cADcAUCAAQty48eLFi5eu3AA3AFggAELcuPHixYuXrtwANwBgIABC3Ljx4sWLl67cADcAaCAAQty48eLFi5eu3AA3AHAgAEHcuPHiBTYAeCAAQdy4ATsAfCAAQdwAOgB+IAMgASwAAEHcAHM6AABBASEAA0AgAyAAaiIFIAUsAAAgASAAaiwAAHM6AAAgAEEBaiIAQSBHDQALIAIgA0KAARCJASADQYABEPsBIAZBwAAQ+wEgBCQGCwsAIAAgASACEIkBCzwBAn8jBiECIwZBwABqJAYgACACIgMQjQEgAEHQAWoiACADQsAAEIkBIAAgARCNASADQcAAEPsBIAIkBgtEAQF/IwYhAiMGQcAAaiQGIAAgAiIAECggASAAKQAANwAAIAEgACkACDcACCABIAApABA3ABAgASAAKQAYNwAYIAIkBgssAQJ/IwYhBCMGQaADaiQGIAQiBSADECYgBSIDIAEgAhAnIAUgABApIAQkBgs8AQJ/IwYhBSMGQSBqJAYgBSIEIAEgAiADECpBfyAAIAQQ5QEgBCAARhsgBCAAQSAQ/AFyIQAgBSQGIAALCgAgACABIAIQOwsQACABQSAQ6QEgACABEKQBCwoAIAAgASACEDwLFAAgACABIAIgAyAEIAUQpQEaQQALPwECfyMGIQcjBkEgaiQGIAciCCAFIAYQLgR/QX8FIAAgASACIAMgBCAIEC8aIAhBIBD7AUEACyEAIAckBiAACykAIAJC7////w9WBEAQ+AEFIABBEGogACABIAIgAyAEEC8aQQAPC0EACygAIAJC7////w9WBEAQ+AEFIABBEGogACABIAIgAyAEIAUQMA8LQQALEQAgACABIAIgAyAEIAUQpwELPgECfyMGIQcjBkEgaiQGIAciCCAFIAYQLgRA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IAIQSiAEIAMQVSAFQcAHaiICIAQQUCADIAEgAhBKIAQgAxBVIAVB4AhqIAQQUCAAEF1B/AEhAQNAIAMgABBUIAFB7IoCaiwAACICQQBKBEAgBCADEFUgAyAEIAUgAkH/AXFBAXZBoAFsahBKBSACQQBIBEAgBCADEFUgAyAEIAUgAkF+bUEYdEEYdUGgAWxqEFcLCyAAIAMQVSABQX9qIQIgAUEASgRAIAIhAQwBCwsgBiQGC7IgAgF/OH4gASwAACABLAABIAFBAmoiBCwAABBDQv///wCDIQcgBBBCQgWIQv///wCDIQYgASwABSABLAAGIAFBB2oiBCwAABBDQgKIQv///wCDIQUgBBBCQgeIQv///wCDIREgAUEKahBCQgSIQv///wCDIQggASwADSABLAAOIAFBD2oiBCwAABBDQgGIQv///wCDIQ4gBBBCQgaIQv///wCDIQogASwAEiABLAATIAEsABQQQ0IDiEL///8AgyELIAEsABUgASwAFiABQRdqIgQsAAAQQ0L///8AgyESIAQQQkIFiEL///8AgyEMIAEsABogASwAGyABQRxqIgEsAAAQQ0ICiEL///8AgyEJIAEQQkIHiCEPIAIsAAAgAiwAASACQQJqIgEsAAAQQ0L///8AgyEZIAEQQkIFiEL///8AgyEaIAIsAAUgAiwABiACQQdqIgEsAAAQQ0ICiEL///8AgyEbIAEQQkIHiEL///8AgyEcIAJBCmoQQkIEiEL///8AgyETIAIsAA0gAiwADiACQQ9qIgEsAAAQQ0IBiEL///8AgyEWIAEQQkIGiEL///8AgyEXIAIsABIgAiwAEyACLAAUEENCA4hC////AIMhGCACLAAVIAIsABYgAkEXaiIBLAAAEENC////AIMhFCABEEJCBYhC////AIMhFSACLAAaIAIsABsgAkEcaiIBLAAAEENCAohC////AIMhECABEEJCB4ghDSADLAAAIAMsAAEgA0ECaiIBLAAAEENC////AIMhHyABEEJCBYhC////AIMhICADLAAFIAMsAAYgA0EHaiIBLAAAEENCAohC////AIMhKiABEEJCB4hC////AIMhKyADQQpqEEJCBIhC////AIMhLCADLAANIAMsAA4gA0EPaiIBLAAAEENCAYhC////AIMhLSABEEJCBohC////AIMhLiADLAAS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LK18IApBBWpB////H3EgAnEgBCALcXIgBUEadHKtIAAoAiitfCIRQiCIfCEPIANBDHYgDiAHakH///8fcSACcSAEIAhxciIDQQ50cq0gACgCMK18IA9CIIh8IRAgA0ESdiACIAxxIAQgCXFyQQh0cq0gACgCNK18IBBCIIh8pyECIAEgEacQaCABQQRqIA+nEGggAUEIaiAQpxBoIAFBDGogAhBoIABB2AAQ+wEL9gQCD38QfkEAQYCAgAggACwAUBshDCAAKAIEIQggACgCCCEJIAAoAgwhCiAAKAIQIQsgAEEUaiINKAIAIQQgAEEYaiIOKAIAIQMgAEEcaiIPKAIAIQUgAEEgaiIQKAIAIQYgAEEkaiIRKAIAIQcgAkIPVgRAIAAoAgCtIRMgC0EFbK0hFCAKQQVsrSEbIAlBBWytIR0gCEEFbK0hHyAIrSEVIAmtIRwgCq0hHiALrSEgIAMhACABIQMDQCADEGZB////H3EgBGohASADQQNqEGZBAnZB////H3EgAGqtIhYgFH4gAa0iFyATfnwgA0EGahBmQQR2Qf///x9xIAVqrSIYIBt+fCADQQlqEGZBBnYgBmqtIhkgHX58IANBDGoQZkEIdiAMciAHaq0iGiAffnwiEqchBCAWIBV+IBcgHH58IBggE358IBkgFH58IBogG358IBYgE34gFyAVfnwgGCAUfnwgGSAbfnwgGiAdfnwgEkIaiEL/////D4N8IiFCGohC/////w+DfCISp0H///8fcSEFIBYgHH4gFyAefnwgGCAVfnwgGSATfnwgGiAUfnwgEkIaiEL/////D4N8IhKnQf///x9xIQYgFiAefiAXICB+fCAYIBx+fCAZIBV+fCAaIBN+fCASQhqIQv////8Pg3wiEqdB////H3EhByASQhqIp0EFbCIAIARqQf///x9xIQEgACAEQf///x9xakEadiAhp0H///8fcWohACADQRBqIQMgAkJwfCICQg9WBEAgASEEDAELCwUgBCEBIAMhAAsgDSABNgIAIA4gADYCACAPIAU2AgAgECAGNgIAIBEgBzYCAAuWAgIBfwN+AkACQCAAQThqIgMpAwAiBEIAUQ0AIAJCECAEfSIFIAUgAlYbIgZCAFIEQEIAIQUDQCAAQcAAaiAEIAV8p2ogASAFp2osAAA6AAAgAykDACEEIAVCAXwiBSAGVA0ACwsgAyAEIAZ8IgQ3AwAgBEIQWgRAIAAgAEHAAGpCEBCeASADQgA3AwAgASAGp2ohASACIAZ9IQIMAQsMAQsgAkJwgyEEIAJCD1YEfiAAIAEgBBCeASABIASnaiEBIAIgBH0FIAILIgVCAFIEQEIAIQIgAykDACEEA0AgAEHAAGogBCACfKdqIAEgAqdqLAAAOgAAIAMpAwAhBCACQgF8IgIgBVQNAAsgAyAEIAV8NwMACwsLvgEBAX8gACABEGZB////H3E2AgAgACABQQNqEGZBAnZBg/7/H3E2AgQgACABQQZqEGZBBHZB/4H/H3E2AgggACABQQlqEGZBBnZB///AH3E2AgwgACABQQxqEGZBCHZB//8/cTYCECAAQRRqIgJCADcCACACQgA3AgggAkEANgIQIAAgAUEQahBmNgIoIAAgAUEUahBmNgIsIAAgAUEYahBmNgIwIAAgAUEcahBmNgI0IABCADcDOCAAQQA6AFALCQAgACABEKQBCwsAIAAgASACEKMBC3MBAn8jBiEEIwZBP2pBQHEkBiMGIQMjBkEQaiQGIANBADoAACAAIAEgAhCEAgR/QX8FQQAhAQNAIAMgAywAACAAIAFqLAAAcjoAACABQQFqIgFBIEcNAAtBACADLQAAQf8DakEIdkEBcWsLIQAgBCQGIAALCQAgACABEIUCC90CAgV/An4jBiEKIwZBP2pBQHEkBiMGIQcjBkHgAmokBiAHQaACaiEGIAdBgAJqIgkgBCAFEGkgACEFIAIhCAJAAkAgACACSwRAIAUgCGutIANUDQELIAIgAEsEQCAIIAVrrSADVA0BCwwBCyAAIAIgA6cQkwIaIAAhAgsgBkIANwAAIAZCADcACCAGQgA3ABAgBkIANwAYQiAgAyADQiBWIgUbIgtCAFEiCEUEQCAGQSBqIAJCfiADQn+FIgxCXyAMQl9WG32nQQFqEJICGgsgBiAGIAtCIHwgBEEQaiIEIAkQ4gEgByAGEJgBIAhFBEAgACAGQSBqQn4gA0J/hSIMQl8gDEJfVht9p0EBahCSAhoLIAZBwAAQ+wEgBQRAIAAgC6ciBWogAiAFaiADIAt9IAQgCRDhAQsgCUEgEPsBIAcgACADEJkBIAcgARCaASAHQYACEPsBIAokBkEACyoAIAJC7////w9WBEAQ+AEFIABBEGogACABIAIgAyAEEKUBGkEADwtBAAu+AgIEfwJ+IwYhCSMGQT9qQUBxJAYjBiEGIwZB4ABqJAYgBiIHIAQgBRBpIAZBIGoiCCIFQiAgBEEQaiIGIAciBBCJAiACIAEiBCADIgogCCIFEJwBBH8gB0EgEPsBQX8FIAAEfyABIQQgACECAkACQCABIABPBEAgBCACa60gA1QNAQsgACABTwRAIAIgBGutIANUDQELDAELIAAgASADpxCTAhogACEBC0IgIAMgA0IgViIFGyIKQgBRBEAgCCAIQiAgBiAHEOIBBSAIQSBqIgQgAUJ+IANCf4UiC0JfIAtCX1YbfadBAWoiAhCSAhogCCAIIApCIHwgBiAHEOIBIAAgBCACEJICGgsgBQRAIAAgCqciAGogASAAaiADIAp9IAYgBxDhAQsgB0EgEPsBQQAFQQALCyEAIAkkBiAACyIAIAJCEFQEf0F/BSAAIAFBEGogASACQnB8IAMgBBCnAQsLLAAgAUEYEOkBIAAgASACQQAQZRogABCqASAAIAEpABA3ACQgAEIANwAsQQALFwEBfyAAQSBqIgFBADYAACABQQE6AAALJQAgACABIAJBABBlGiAAEKoBIAAgASkAEDcAJCAAQgA3ACxBAAumAQEEfyMGIQIjBkE/akFAcSQGIwYhASMGQTBqJAYgASAAKQAANwAAIAEgACkACDcACCABIAApABA3ABAgASAAKQAYNwAYIAFBIGoiAyAAQSRqIgQpAAA3AAAgASABQiggAEEgakEAIAAQ3AEgACABKQAANwAAIAAgASkACDcACCAAIAEpABA3ABAgACABKQAYNwAYIAQgAykAADcAACAAEKoBIAIkBgudAwEGfyMGIQwjBkE/akFAcSQGIwYhCyMGQdACaiQGIAJBAEciDQRAIAJCADcDAAsgBEL/////D1YEQBD4AQsgC0GIAmoiCULAACAAQSBqIgogABDWASALIgggCRCYASAJQcAAEPsBIAggBSAGEJkBIAhByJwCQgAgBn1CD4MQmQEgCUEBaiIFQgA3AAAgBUIANwAIIAVCADcAECAFQgA3ABggBUIANwAgIAVCADcAKCAFQgA3ADAgBUEANgA4IAVBADsAPCAFQQA6AD4gCSAHOgAAIAkgCULAACAKQQEgABDYASAIIAlCwAAQmQEgASAJLAAAOgAAIAFB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IAUgBSADEEYgACAFEEQgDCQGQQALlgEBA38jBiEEIwZBP2pBQHEkBiMGIQMjBkHwAWokBiADQcgBaiICIAEpAAA3AAAgAiABKQAINwAIIAIgASkAEDcAECACIAEpABg3ABggAiACLAAAQXhxOgAAIAJBH2oiASABLAAAQT9xQcAAcjoAACADQShqIgEgAhBcIAMgAUEoaiABQdAAahCGAiAAIAMQRCAEJAZBAAtFAQN/IwYhBCMGQT9qQUBxJAYjBiEDIwZB0ABqJAYgA0EoaiIFIAIgARA/IAMgAiABEEkgAyADEEggACAFIAMQRiAEJAYL8wMBL38gASgCACIMIAAoAgAiDXNBACACayICcSEDIAFBBGoiDigCACIPIABBBGoiECgCACIRcyACcSEEIAFBCGoiEigCACITIABBCGoiFCgCACIVcyACcSEFIAFBDGoiFigCACIXIABBDGoiGCgCACIZcyACcSEGIAFBEGoiGigCACIbIABBEGoiHCgCACIdcyACcSEHIAFBFGoiHigCACIfIABBFGoiICgCACIhcyACcSEIIAFBGGoiIigCACIjIABBGGoiJCgCACIlcyACcSEJIAFBHGoiJigCACInIABBHGoiKCgCACIpcyACcSEKIAFBIGoiKigCACIrIABBIGoiLCgCACItcyACcSELIAFBJGoiLigCACIvIABBJGoiMCgCACIxcyACcSECIAAgAyANczYCACAQIAQgEXM2AgAgFCAFIBVzNgIAIBggBiAZczYCACAcIAcgHXM2AgAgICAIICFzNgIAICQgCSAlczYCACAoIAogKXM2AgAgLCALIC1zNgIAIDAgAiAxczYCACABIAMgDHM2AgAgDiAEIA9zNgIAIBIgBSATczYCACAWIAYgF3M2AgAgGiAHIBtzNgIAIB4gCCAfczYCACAiIAkgI3M2AgAgJiAKICdzNgIAICogCyArczYCACAuIAIgL3M2AgALjQMBFH4gASgCJKxCwrYHfiIHQoCAgAh8QhmHIghCE34gASgCAKxCwrYHfnwiCUKAgIAQfEIahyECIAEoAgSsQsK2B34iCkKAgIAIfEIZhyILIAEoAgisQsK2B358IgxCgICAEHxCGochAyABKAIMrELCtgd+Ig1CgICACHxCGYciDiABKAIQrELCtgd+fCIPQoCAgBB8QhqHIQQg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IANqIAM2AgALBgBByJsCC4UBAQN/AkAgACICQQNxBEAgACEBIAIhAANAIAEsAABFDQIgAUEBaiIBIgBBA3ENACABIQALCwNAIABBBGohASAAKAIAIgNBgIGChHhxQYCBgoR4cyADQf/9+3dqcUUEQCABIQAMAQsLIANB/wFxBEADQCAAQQFqIgAsAAANAAsLCyAAIAJrCxwBAX8gACABEJACIgJBACACLQAAIAFB/wFxRhsL/AEBA38CQCABQf8BcSICBEAgAEEDcQRAIAFB/wFxIQMDQCAALAAAIgRFIAQgA0EYdEEYdUZyDQMgAEEBaiIAQQNxDQALCyACQYGChAhsIQMCQCAAKAIAIgJBgIGChHhxQYCBgoR4cyACQf/9+3dqcUUEQANAIAIgA3MiAkGAgYKEeHFBgIGChHhzIAJB//37d2pxDQIgAEEEaiIAKAIAIgJBgIGChHhxQYCBgoR4cyACQf/9+3dqcUUNAAsLCyABQf8BcSECA0AgAEEBaiEBIAAsAAAiA0UgAyACQRh0QRh1RnJFBEAgASEADAELCwUgACAAEI4CaiEACwsgAAsDAAELxgMBA38gAkGAwABOBEAgACABIAIQBw8LIAAhBCAAIAJqIQMgAEEDcSABQQNxRgRAA0AgAEEDcQRAIAJFBEAgBA8LIAAgASwAADoAACAAQQFqIQAgAUEBaiEBIAJBAWshAgwBCwsgA0F8cSICQcAAayEFA0AgACAFTARAIAAgASgCADYCACAAIAEoAgQ2AgQgACABKAIINgIIIAAgASgCDDYCDCAAIAEoAhA2AhAgACABKAIUNgIUIAAgASgCGDYCGCAAIAEoAhw2AhwgACABKAIgNgIgIAAgASgCJDYCJCAAIAEoAig2AiggACABKAIsNgIsIAAgASgCMDYCMCAAIAEoAjQ2AjQgACABKAI4NgI4IAAgASgCPDYCPCAAQcAAaiEAIAFBwABqIQEMAQsLA0AgACACSARAIAAgASgCADYCACAAQQRqIQAgAUEEaiEBDAELCwUgA0EEayECA0AgACACSARAIAAgASwAADoAACAAIAEsAAE6AAEgACABLAACOgACIAAgASwAAzoAAyAAQQRqIQAgAUEEaiEBDAELCwsDQCAAIANIBEAgACABLAAAOgAAIABBAWohACABQQFqIQEMAQsLIAQLYAEBfyABIABIIAAgASACakhxBEAgACEDIAEgAmohASAAIAJqIQADQCACQQBKBEAgAkEBayECIABBAWsiACABQQFrIgEsAAA6AAAMAQsLIAMhAAUgACABIAIQkgIaCyAAC5oCAQR/IAAgAmohBCABQf8BcSEBIAJBwwBOBEADQCAAQQNxBEAgACABOgAAIABBAWohAAwBCwsgBEF8cSIFQcAAayEGIAEgAUEIdHIgAUEQdHIgAUEYdHIhAwNAIAAgBkwEQCAAIAM2AgAgACADNgIEIAAgAzYCCCAAIAM2AgwgACADNgIQIAAgAzYCFCAAIAM2AhggACADNgIcIAAgAzYCICAAIAM2AiQgACADNgIoIAAgAzYCLCAAIAM2AjAgACADNgI0IAAgAzYCOCAAIAM2AjwgAEHAAGohAAwBCwsDQCAAIAVIBEAgACADNgIAIABBBGohAAwBCwsLA0AgACAESARAIAAgAToAACAAQQFqIQAMAQsLIAQgAmsLWwECfyMFKAIAIgIgAEEPakFwcSIAaiEBIABBAEogASACSHEgAUEASHIEQBACGkEMEAZBfw8LIwUgATYCACABEAFKBEAQAEUEQCMFIAI2AgBBDBAGQX8PCwsgAgsoACAAIAEgAiADIAStIAWtQiCGhCAGIAetIAitQiCGhCAJIAogCxATCxcAIAAgASACIAOtIAStQiCGhCAFEL4BCxYAIAAgASACrSADrUIghoQgBCAFEDULFAAgACABIAKtIAOtQiCGhCAEEDcLFQAgACABIAKtIAOtQiCGhCAEELYBCxgAIAAgASACIAOtIAStQiCGhCAFIAYQLwsUACAAIAEgAq0gA61CIIaEIAQQJAsoACAAIAEgAiADIAStIAWtQiCGhCAGIAetIAitQiCGhCAJIAogCxAQCxgAIAAgASACIAOtIAStQiCGhCAFIAYQbgsmACAAIAEgAiADrSAErUIghoQgBSAGrSAHrUIghoQgCCAJIAoQFAsmACAAIAEgAiADIAStIAWtQiCGhCAGIAetIAitQiCGhCAJIAoQGAsmACAAIAEgAiADrSAErUIghoQgBSAGrSAHrUIghoQgCCAJIAoQEgsmACAAIAEgAiADrSAErUIghoQgBSAGrSAHrUIghoQgCCAJIAoQIAsaACAAIAEgAiADrSAErUIghoQgBSAGIAcQMAsaACAAIAEgAiADrSAErUIghoQgBSAGIAcQNAsUACAAIAEgAq0gA61CIIaEIAQQJQsXACAAIAEgAiADrSAErUIghoQgBRC/AQsZACAAIAEgAiADrSAErUIghoQgBSAGEKUBCxcAIAAgASACrSADrUIghoQgBCAFEKYBCyYAIAAgASACIAOtIAStQiCGhCAFIAYgB60gCK1CIIaEIAkgChAhCxgAIAAgASACIAOtIAStQiCGhCAFIAYQMwsmACAAIAEgAiADIAStIAWtQiCGhCAGIAetIAitQiCGhCAJIAoQIgsTACAAIAEgAq0gA61CIIaEEIcBCxYAIAAgASACrSADrUIghoQgBCAFEDELKAAgACABIAIgAyAErSAFrUIghoQgBiAHrSAIrUIghoQgCSAKIAsQHwsmACAAIAEgAiADrSAErUIghoQgBSAGIAetIAitQiCGhCAJIAoQFQsmACAAIAEgAiADIAStIAWtQiCGhCAGIAetIAitQiCGhCAJIAoQFgsmACAAIAEgAiADrSAErUIghoQgBSAGIAetIAitQiCGhCAJIAoQFwsXACAAIAEgAiADrSAErUIghoQgBRC9AQsRACAAIAGtIAKtQiCGhBDrAQsTACAAIAEgAq0gA61CIIaEEMIBCxkAIAAgASACIAOtIAStQiCGhCAFIAYQpwELFQAgACABIAKtIAOtQiCGhCAEEMABCxgAIAAgASACrSADrUIghoQgBCAFIAYQNgsSACAAIAEgAq0gA61CIIaEEHALFgAgACABIAKtIAOtQiCGhCAEIAUQOQsYACAAIAEgAq0gA61CIIaEIAQgBSAGEDILJQAgACABIAIgAyAEIAWtIAatQiCGhCAHIAitIAmtQiCGhBCvAQsXACAAIAEgAq0gA61CIIaEIAQgBRCoAQslACAAIAEgAiADIAStIAWtQiCGhCAGIAetIAitQiCGhCAJEK0BCxcAIAAgASACrSADrUIghoQgBCAFEJMBCwu5iwIIAEGgCAsBAQBBwAgLt4ACJuiVj8KyJ7BFw/SJ8u+Y8NXfrAXTxjM5sTgCiG1T/AXHF2pwPU3YT7o8C3YNEGcPKiBT+iw5zMZOx/13kqwDehPolY/CsiewRcP0ifLvmPDV36wF08YzObE4AohtU/yFtBdqcD1N2E+6PAt2DRBnDyogU/osOczGTsf9d5KsA/rs////////////////////////////////////////f+3///////////////////////////////////////9/7v///////////////////////////////////////3/Z/////////////////////////////////////////9r/////////////////////////////////////////2/////////////////////////////////////////8IybzzZ+YJajunyoSFrme7K/iU/nLzbjzxNh1fOvVPpdGC5q1/Ug5RH2w+K4xoBZtrvUH7q9mDH3khfhMZzeBbIq4o15gvikLNZe8jkUQ3cS87TezP+8C1vNuJgaXbtek4tUjzW8JWORnQBbbxEfFZm08Zr6SCP5IYgW3a1V4cq0ICA6OYqgfYvm9wRQFbgxKMsuROvoUxJOK0/9XDfQxVb4l78nRdvnKxlhY7/rHegDUSxyWnBtyblCZpz3Txm8HSSvGewWmb5OMlTziGR77vtdWMi8adwQ9lnKx3zKEMJHUCK1lvLOktg+SmbqqEdErU+0G93KmwXLVTEYPaiPl2q99m7lJRPpgQMrQtbcYxqD8h+5jIJwOw5A7vvsd/Wb/Cj6g98wvgxiWnCpNHkafVb4ID4FFjygZwbg4KZykpFPwv0kaFCrcnJskmXDghGy7tKsRa/G0sTd+zlZ0TDThT3mOvi1RzCmWosnc8uwpqduau7UcuycKBOzWCFIUscpJkA/FMoei/ogEwQrxLZhqokZf40HCLS8IwvlQGo1FsxxhS79YZ6JLREKllVSQGmdYqIHFXhTUO9LjRuzJwoGoQyNDSuBbBpBlTq0FRCGw3Hpnrjt9Md0gnqEib4bW8sDRjWsnFswwcOcuKQeNKqthOc+Njd0/KnFujuLLW828uaPyy713ugo90YC8XQ29jpXhyq/ChFHjIhOw5ZBoIAseMKB5jI/r/vpDpvYLe62xQpBV5xrL3o/m+K1Ny4/J4ccacYSbqzj4nygfCwCHHuIbRHuvgzdZ92up40W7uf0999bpvF3KqZ/AGppjIosV9YwquDfm+BJg/ERtHHBM1C3EbhH0EI/V32yiTJMdAe6vKMry+yRUKvp48TA0QnMRnHUO2Qj7LvtTFTCp+ZfycKX9Z7PrWOqtvy18XWEdKjBlEbLZ4Wf+FctMAvW4V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b2JqZWN0JyA9PT0gdHlwZW9mIHdpbmRvdyA/IHdpbmRvdyA6IHNlbGY7IHZhciBjcnlwdG9fID0gdHlwZW9mIHdpbmRvd18uY3J5cHRvICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvd18uY3J5cHRvIDogd2luZG93Xy5tc0NyeXB0bzsgdmFyIHJhbmRvbVZhbHVlc1N0YW5kYXJkID0gZnVuY3Rpb24oKSB7IHZhciBidWYgPSBuZXcgVWludDMyQXJyYXkoMSk7IGNyeXB0b18uZ2V0UmFuZG9tVmFsdWVzKGJ1Zik7IHJldHVybiBidWZbMF0gPj4+IDA7IH07IHJhbmRvbVZhbHVlc1N0YW5kYXJkKCk7IE1vZHVsZS5nZXRSYW5kb21WYWx1ZSA9IHJhbmRvbVZhbHVlc1N0YW5kYXJkOyB9IGNhdGNoIChlKSB7IHRyeSB7IHZhciBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTsgdmFyIHJhbmRvbVZhbHVlTm9kZUpTID0gZnVuY3Rpb24oKSB7IHZhciBidWYgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoNCk7IHJldHVybiAoYnVmWzBdIDw8IDI0IHwgYnVmWzFdIDw8IDE2IHwgYnVmWzJdIDw8IDggfCBidWZbM10pID4+PiAwOyB9OyByYW5kb21WYWx1ZU5vZGVKUygpOyBNb2R1bGUuZ2V0UmFuZG9tVmFsdWUgPSByYW5kb21WYWx1ZU5vZGVKUzsgfSBjYXRjaCAoZSkgeyB0aHJvdyAnTm8gc2VjdXJlIHJhbmRvbSBudW1iZXIgZ2VuZXJhdG9yIGZvdW5kJzsgfSB9IH0gfQBMaWJzb2RpdW1EUkdidWZfbGVuIDw9IFNJWkVfTUFYAHJhbmRvbWJ5dGVzL3JhbmRvbWJ5dGVzLmMAcmFuZG9tYnl0ZXMAYjY0X3BvcyA8PSBiNjRfbGVuAHNvZGl1bS9jb2RlY3MuYwBzb2RpdW1fYmluMmJhc2U2NAAxLjAuMTU=",i=X.asmjsCodeFile||"";"function"==typeof X.locateFile&&(n=X.locateFile(n),a=X.locateFile(a),i=X.locateFile(i));var B={global:null,env:null,asm2wasm:{"f64-rem":function(A,e){return A%e},"f64-to-int":function(A){return 0|A},"i32s-div":function(A,e){return(0|A)/(0|e)|0},"i32u-div":function(A,e){return(A>>>0)/(e>>>0)>>>0},"i32s-rem":function(A,e){return(0|A)%(0|e)|0},"i32u-rem":function(A,e){return(A>>>0)%(e>>>0)>>>0},debugger:function(){}},parent:X},c=null;X.asmPreload=X.asm;var C=X.reallocBuffer,o=function(A){A=_(A,X.usingWasm?dA:DA);var e=X.buffer,I=e.byteLength;if(!X.usingWasm)return c.__growWasmMemory((A-I)/65536),X.buffer!==e?X.buffer:null;try{return-1!==X.wasmMemory.grow((A-I)/65536)?X.buffer=X.wasmMemory.buffer:null}catch(A){return null}};X.reallocBuffer=function(A){return"asmjs"===Q?C(A):o(A)};var Q="";X.asm=function(A,I,g){if(A=e(A),!(I=e(I)).table){var r=X.wasmTableSize;void 0===r&&(r=1024);var n=X.wasmMaxTableSize;"object"==typeof WebAssembly&&"function"==typeof WebAssembly.Table?I.table=void 0!==n?new WebAssembly.Table({initial:r,maximum:n,element:"anyfunc"}):new WebAssembly.Table({initial:r,element:"anyfunc"}):I.table=new Array(r),X.wasmTable=I.table}I.memoryBase||(I.memoryBase=X.STATIC_BASE),I.tableBase||(I.tableBase=0);var a;return(a=t(A,I))||K("no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods"),a};X.asm}();var XA=[function(){return X.getRandomValue()},function(){if(void 0===X.getRandomValue)try{var A="object"==typeof window?window:self,e=void 0!==A.crypto?A.crypto:A.msCrypto,I=function(){var A=new Uint32Array(1);return e.getRandomValues(A),A[0]>>>0};I(),X.getRandomValue=I}catch(A){try{var g=require("crypto"),t=function(){var A=g.randomBytes(4);return(A[0]<<24|A[1]<<16|A[2]<<8|A[3])>>>0};t(),X.getRandomValue=t}catch(A){throw"No secure random number generator found"}}}];yA=$.GLOBAL_BASE,hA=yA+36464,GA.push(),KA=null;X.STATIC_BASE=yA,X.STATIC_BUMP=36464;var TA=hA;hA+=16;var VA={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};uA=i(1,"i32",tA),pA=(_A=$.alignMemory(hA))+vA,wA=$.alignMemory(pA),oA[uA>>2]=wA,fA=!0;var jA=function(A){for(var e=[],I=0;I<A.length;I++){var g=A[I];g>255&&(g&=255),e.push(String.fromCharCode(g))}return e.join("")};X.intArrayFromString=R,X.intArrayToString=jA;var ZA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",OA="function"==typeof atob?atob:function(A){var e,I,g,t,r,n,a="",i=0;A=A.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{e=ZA.indexOf(A.charAt(i++))<<2|(t=ZA.indexOf(A.charAt(i++)))>>4,I=(15&t)<<4|(r=ZA.indexOf(A.charAt(i++)))>>2,g=(3&r)<<6|(n=ZA.indexOf(A.charAt(i++))),a+=String.fromCharCode(e),64!==r&&(a+=String.fromCharCode(I)),64!==n&&(a+=String.fromCharCode(g))}while(i<A.length);return a};X.wasmTableSize=0,X.wasmMaxTableSize=0,X.asmGlobalArg={Math:Math,Int8Array:Int8Array,Int16Array:Int16Array,Int32Array:Int32Array,Uint8Array:Uint8Array,Uint16Array:Uint16Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array,NaN:NaN,Infinity:1/0},X.asmLibraryArg={abort:K,assert:t,enlargeMemory:l,getTotalMemory:function(){return kA},abortOnCannotGrowMemory:u,_emscripten_asm_const_i:function(A){return XA[A]()},___assert_fail:function(A,e,I,g){throw IA=!0,"Assertion failed: "+B(A)+", at: "+[e?B(e):"unknown filename",I,g?B(g):"unknown function"]+" at "+h()},_abort:function(){X.abort()},___setErrNo:N,_emscripten_memcpy_big:function(A,e,I){return BA.set(BA.subarray(e,e+I),A),A},_sysconf:function(A){switch(A){case 30:return lA;case 85:return BA.length/lA;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 79:return 0;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:return"object"==typeof navigator?navigator.hardwareConcurrency||1:1}return N(VA.EINVAL),-1},DYNAMICTOP_PTR:uA,tempDoublePtr:TA,ABORT:IA,STACKTOP:_A,STACK_MAX:pA};var WA=X.asm(X.asmGlobalArg,X.asmLibraryArg,aA);X.asm=WA;X._sodium_library_version_minor=function(){return X.asm._sodium_library_version_minor.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_init_push=function(){return X.asm._crypto_secretstream_xchacha20poly1305_init_push.apply(null,arguments)},X._crypto_kx_publickeybytes=function(){return X.asm._crypto_kx_publickeybytes.apply(null,arguments)},X._sodium_unpad=function(){return X.asm._sodium_unpad.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_statebytes=function(){return X.asm._crypto_secretstream_xchacha20poly1305_statebytes.apply(null,arguments)},X._crypto_box_noncebytes=function(){return X.asm._crypto_box_noncebytes.apply(null,arguments)},X._crypto_aead_chacha20poly1305_ietf_keybytes=function(){return X.asm._crypto_aead_chacha20poly1305_ietf_keybytes.apply(null,arguments)},X._crypto_aead_chacha20poly1305_ietf_encrypt_detached=function(){return X.asm._crypto_aead_chacha20poly1305_ietf_encrypt_detached.apply(null,arguments)},X._sodium_pad=function(){return X.asm._sodium_pad.apply(null,arguments)},X._crypto_scalarmult_base=function(){return X.asm._crypto_scalarmult_base.apply(null,arguments)},X._crypto_aead_chacha20poly1305_abytes=function(){return X.asm._crypto_aead_chacha20poly1305_abytes.apply(null,arguments)},X._crypto_core_hchacha20_outputbytes=function(){return X.asm._crypto_core_hchacha20_outputbytes.apply(null,arguments)},X._crypto_auth_bytes=function(){return X.asm._crypto_auth_bytes.apply(null,arguments)},X._crypto_sign_statebytes=function(){return X.asm._crypto_sign_statebytes.apply(null,arguments)},X._crypto_sign_open=function(){return X.asm._crypto_sign_open.apply(null,arguments)},X._crypto_aead_chacha20poly1305_decrypt_detached=function(){return X.asm._crypto_aead_chacha20poly1305_decrypt_detached.apply(null,arguments)},X._sbrk=function(){return X.asm._sbrk.apply(null,arguments)},X._memcpy=function(){return X.asm._memcpy.apply(null,arguments)},X._crypto_kdf_bytes_max=function(){return X.asm._crypto_kdf_bytes_max.apply(null,arguments)},X._crypto_kdf_bytes_min=function(){return X.asm._crypto_kdf_bytes_min.apply(null,arguments)},X._crypto_box_seed_keypair=function(){return X.asm._crypto_box_seed_keypair.apply(null,arguments)},X._crypto_box_beforenmbytes=function(){return X.asm._crypto_box_beforenmbytes.apply(null,arguments)},X._crypto_box_open_easy_afternm=function(){return X.asm._crypto_box_open_easy_afternm.apply(null,arguments)},X._crypto_sign_ed25519_sk_to_curve25519=function(){return X.asm._crypto_sign_ed25519_sk_to_curve25519.apply(null,arguments)},X._emscripten_get_global_libc=function(){return X.asm._emscripten_get_global_libc.apply(null,arguments)};var qA=X._free=function(){return X.asm._free.apply(null,arguments)},zA=(X.stackAlloc=function(){return X.asm.stackAlloc.apply(null,arguments)},X._crypto_aead_chacha20poly1305_keybytes=function(){return X.asm._crypto_aead_chacha20poly1305_keybytes.apply(null,arguments)},X.stackSave=function(){return X.asm.stackSave.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_tag_message=function(){return X.asm._crypto_secretstream_xchacha20poly1305_tag_message.apply(null,arguments)},X._crypto_box_seal=function(){return X.asm._crypto_box_seal.apply(null,arguments)},X._crypto_aead_xchacha20poly1305_ietf_keygen=function(){return X.asm._crypto_aead_xchacha20poly1305_ietf_keygen.apply(null,arguments)},X._crypto_kx_keypair=function(){return X.asm._crypto_kx_keypair.apply(null,arguments)},X.runPostSets=function(){return X.asm.runPostSets.apply(null,arguments)},X._crypto_kx_client_session_keys=function(){return X.asm._crypto_kx_client_session_keys.apply(null,arguments)},X._crypto_generichash_bytes_min=function(){return X.asm._crypto_generichash_bytes_min.apply(null,arguments)},X._crypto_shorthash=function(){return X.asm._crypto_shorthash.apply(null,arguments)},X._crypto_auth_keybytes=function(){return X.asm._crypto_auth_keybytes.apply(null,arguments)},X._crypto_aead_chacha20poly1305_npubbytes=function(){return X.asm._crypto_aead_chacha20poly1305_npubbytes.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_tag_rekey=function(){return X.asm._crypto_secretstream_xchacha20poly1305_tag_rekey.apply(null,arguments)},X._crypto_aead_xchacha20poly1305_ietf_abytes=function(){return X.asm._crypto_aead_xchacha20poly1305_ietf_abytes.apply(null,arguments)},X._crypto_sign_seedbytes=function(){return X.asm._crypto_sign_seedbytes.apply(null,arguments)},X._crypto_box_detached_afternm=function(){return X.asm._crypto_box_detached_afternm.apply(null,arguments)},X._crypto_auth=function(){return X.asm._crypto_auth.apply(null,arguments)},X._randombytes_random=function(){return X.asm._randombytes_random.apply(null,arguments)},X._crypto_sign_keypair=function(){return X.asm._crypto_sign_keypair.apply(null,arguments)},X._crypto_generichash_keybytes_min=function(){return X.asm._crypto_generichash_keybytes_min.apply(null,arguments)},X._crypto_generichash_statebytes=function(){return X.asm._crypto_generichash_statebytes.apply(null,arguments)},X._randombytes_buf_deterministic=function(){return X.asm._randombytes_buf_deterministic.apply(null,arguments)},X._crypto_aead_chacha20poly1305_encrypt_detached=function(){return X.asm._crypto_aead_chacha20poly1305_encrypt_detached.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_keygen=function(){return X.asm._crypto_secretstream_xchacha20poly1305_keygen.apply(null,arguments)},X._sodium_library_version_major=function(){return X.asm._sodium_library_version_major.apply(null,arguments)},X._crypto_sign_final_verify=function(){return X.asm._crypto_sign_final_verify.apply(null,arguments)},X._crypto_secretbox_keygen=function(){return X.asm._crypto_secretbox_keygen.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_headerbytes=function(){return X.asm._crypto_secretstream_xchacha20poly1305_headerbytes.apply(null,arguments)},X._sodium_version_string=function(){return X.asm._sodium_version_string.apply(null,arguments)},X._crypto_generichash_keybytes_max=function(){return X.asm._crypto_generichash_keybytes_max.apply(null,arguments)},X._crypto_sign_ed25519_pk_to_curve25519=function(){return X.asm._crypto_sign_ed25519_pk_to_curve25519.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_push=function(){return X.asm._crypto_secretstream_xchacha20poly1305_push.apply(null,arguments)},X._crypto_generichash=function(){return X.asm._crypto_generichash.apply(null,arguments)},X.getTempRet0=function(){return X.asm.getTempRet0.apply(null,arguments)},X._crypto_aead_chacha20poly1305_ietf_nsecbytes=function(){return X.asm._crypto_aead_chacha20poly1305_ietf_nsecbytes.apply(null,arguments)},X._randombytes_stir=function(){return X.asm._randombytes_stir.apply(null,arguments)},X._crypto_aead_chacha20poly1305_ietf_encrypt=function(){return X.asm._crypto_aead_chacha20poly1305_ietf_encrypt.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_tag_push=function(){return X.asm._crypto_secretstream_xchacha20poly1305_tag_push.apply(null,arguments)},X._crypto_core_hchacha20=function(){return X.asm._crypto_core_hchacha20.apply(null,arguments)},X._crypto_box_beforenm=function(){return X.asm._crypto_box_beforenm.apply(null,arguments)},X._crypto_aead_chacha20poly1305_ietf_decrypt=function(){return X.asm._crypto_aead_chacha20poly1305_ietf_decrypt.apply(null,arguments)},X._randombytes_close=function(){return X.asm._randombytes_close.apply(null,arguments)},X._crypto_kx_server_session_keys=function(){return X.asm._crypto_kx_server_session_keys.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_tag_final=function(){return X.asm._crypto_secretstream_xchacha20poly1305_tag_final.apply(null,arguments)},X._crypto_core_hchacha20_constbytes=function(){return X.asm._crypto_core_hchacha20_constbytes.apply(null,arguments)},X._crypto_shorthash_bytes=function(){return X.asm._crypto_shorthash_bytes.apply(null,arguments)},X._crypto_kdf_keybytes=function(){return X.asm._crypto_kdf_keybytes.apply(null,arguments)},X.setThrew=function(){return X.asm.setThrew.apply(null,arguments)},X.establishStackSpace=function(){return X.asm.establishStackSpace.apply(null,arguments)},X._crypto_sign_final_create=function(){return X.asm._crypto_sign_final_create.apply(null,arguments)},X._crypto_aead_chacha20poly1305_encrypt=function(){return X.asm._crypto_aead_chacha20poly1305_encrypt.apply(null,arguments)},X._crypto_aead_xchacha20poly1305_ietf_decrypt_detached=function(){return X.asm._crypto_aead_xchacha20poly1305_ietf_decrypt_detached.apply(null,arguments)},X._crypto_kx_secretkeybytes=function(){return X.asm._crypto_kx_secretkeybytes.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_messagebytes_max=function(){return X.asm._crypto_secretstream_xchacha20poly1305_messagebytes_max.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_abytes=function(){return X.asm._crypto_secretstream_xchacha20poly1305_abytes.apply(null,arguments)},X._crypto_box_detached=function(){return X.asm._crypto_box_detached.apply(null,arguments)},X._randombytes_buf=function(){return X.asm._randombytes_buf.apply(null,arguments)},X._crypto_generichash_init=function(){return X.asm._crypto_generichash_init.apply(null,arguments)},X._crypto_box_open_detached=function(){return X.asm._crypto_box_open_detached.apply(null,arguments)},X._crypto_scalarmult_bytes=function(){return X.asm._crypto_scalarmult_bytes.apply(null,arguments)},X._crypto_kx_seedbytes=function(){return X.asm._crypto_kx_seedbytes.apply(null,arguments)},X._crypto_auth_verify=function(){return X.asm._crypto_auth_verify.apply(null,arguments)},X._crypto_box_seal_open=function(){return X.asm._crypto_box_seal_open.apply(null,arguments)},X._crypto_secretbox_detached=function(){return X.asm._crypto_secretbox_detached.apply(null,arguments)},X._crypto_aead_xchacha20poly1305_ietf_nsecbytes=function(){return X.asm._crypto_aead_xchacha20poly1305_ietf_nsecbytes.apply(null,arguments)},X._crypto_secretbox_easy=function(){return X.asm._crypto_secretbox_easy.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_init_pull=function(){return X.asm._crypto_secretstream_xchacha20poly1305_init_pull.apply(null,arguments)},X._crypto_aead_xchacha20poly1305_ietf_encrypt=function(){return X.asm._crypto_aead_xchacha20poly1305_ietf_encrypt.apply(null,arguments)},X._memset=function(){return X.asm._memset.apply(null,arguments)},X._crypto_generichash_keygen=function(){return X.asm._crypto_generichash_keygen.apply(null,arguments)},X._crypto_box_open_detached_afternm=function(){return X.asm._crypto_box_open_detached_afternm.apply(null,arguments)},X._sodium_bin2hex=function(){return X.asm._sodium_bin2hex.apply(null,arguments)},X._crypto_aead_xchacha20poly1305_ietf_decrypt=function(){return X.asm._crypto_aead_xchacha20poly1305_ietf_decrypt.apply(null,arguments)},X._crypto_aead_chacha20poly1305_ietf_keygen=function(){return X.asm._crypto_aead_chacha20poly1305_ietf_keygen.apply(null,arguments)},X._crypto_box_seedbytes=function(){return X.asm._crypto_box_seedbytes.apply(null,arguments)},X._crypto_core_hchacha20_inputbytes=function(){return X.asm._crypto_core_hchacha20_inputbytes.apply(null,arguments)},X._crypto_auth_keygen=function(){return X.asm._crypto_auth_keygen.apply(null,arguments)},X._crypto_hash=function(){return X.asm._crypto_hash.apply(null,arguments)},X._sodium_library_minimal=function(){return X.asm._sodium_library_minimal.apply(null,arguments)},X._crypto_box_easy_afternm=function(){return X.asm._crypto_box_easy_afternm.apply(null,arguments)},X._crypto_aead_xchacha20poly1305_ietf_encrypt_detached=function(){return X.asm._crypto_aead_xchacha20poly1305_ietf_encrypt_detached.apply(null,arguments)},X._sodium_bin2base64=function(){return X.asm._sodium_bin2base64.apply(null,arguments)},X._crypto_box_macbytes=function(){return X.asm._crypto_box_macbytes.apply(null,arguments)},X._randombytes_seedbytes=function(){return X.asm._randombytes_seedbytes.apply(null,arguments)},X._crypto_box_publickeybytes=function(){return X.asm._crypto_box_publickeybytes.apply(null,arguments)},X._crypto_box_sealbytes=function(){return X.asm._crypto_box_sealbytes.apply(null,arguments)},X._crypto_sign_secretkeybytes=function(){return X.asm._crypto_sign_secretkeybytes.apply(null,arguments)},X._crypto_box_secretkeybytes=function(){return X.asm._crypto_box_secretkeybytes.apply(null,arguments)},X._crypto_aead_xchacha20poly1305_ietf_keybytes=function(){return X.asm._crypto_aead_xchacha20poly1305_ietf_keybytes.apply(null,arguments)},X._crypto_scalarmult_scalarbytes=function(){return X.asm._crypto_scalarmult_scalarbytes.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_rekey=function(){return X.asm._crypto_secretstream_xchacha20poly1305_rekey.apply(null,arguments)},X._crypto_shorthash_keybytes=function(){return X.asm._crypto_shorthash_keybytes.apply(null,arguments)},X._crypto_aead_chacha20poly1305_keygen=function(){return X.asm._crypto_aead_chacha20poly1305_keygen.apply(null,arguments)},X._crypto_kx_sessionkeybytes=function(){return X.asm._crypto_kx_sessionkeybytes.apply(null,arguments)},X._malloc=function(){return X.asm._malloc.apply(null,arguments)});X._crypto_aead_chacha20poly1305_decrypt=function(){return X.asm._crypto_aead_chacha20poly1305_decrypt.apply(null,arguments)},X._crypto_secretbox_open_easy=function(){return X.asm._crypto_secretbox_open_easy.apply(null,arguments)},X._crypto_aead_chacha20poly1305_ietf_decrypt_detached=function(){return X.asm._crypto_aead_chacha20poly1305_ietf_decrypt_detached.apply(null,arguments)},X._crypto_sign=function(){return X.asm._crypto_sign.apply(null,arguments)},X._crypto_secretbox_noncebytes=function(){return X.asm._crypto_secretbox_noncebytes.apply(null,arguments)},X._crypto_box_keypair=function(){return X.asm._crypto_box_keypair.apply(null,arguments)},X._crypto_generichash_keybytes=function(){return X.asm._crypto_generichash_keybytes.apply(null,arguments)},X._sodium_hex2bin=function(){return X.asm._sodium_hex2bin.apply(null,arguments)},X._sodium_init=function(){return X.asm._sodium_init.apply(null,arguments)},X._crypto_secretbox_macbytes=function(){return X.asm._crypto_secretbox_macbytes.apply(null,arguments)},X._crypto_secretbox_keybytes=function(){return X.asm._crypto_secretbox_keybytes.apply(null,arguments)},X._crypto_aead_xchacha20poly1305_ietf_npubbytes=function(){return X.asm._crypto_aead_xchacha20poly1305_ietf_npubbytes.apply(null,arguments)},X._randombytes=function(){return X.asm._randombytes.apply(null,arguments)},X._crypto_sign_publickeybytes=function(){return X.asm._crypto_sign_publickeybytes.apply(null,arguments)},X._crypto_sign_update=function(){return X.asm._crypto_sign_update.apply(null,arguments)},X.setTempRet0=function(){return X.asm.setTempRet0.apply(null,arguments)},X._crypto_generichash_bytes=function(){return X.asm._crypto_generichash_bytes.apply(null,arguments)},X._crypto_generichash_bytes_max=function(){return X.asm._crypto_generichash_bytes_max.apply(null,arguments)},X._crypto_secretbox_open_detached=function(){return X.asm._crypto_secretbox_open_detached.apply(null,arguments)},X._crypto_sign_init=function(){return X.asm._crypto_sign_init.apply(null,arguments)},X._crypto_core_hchacha20_keybytes=function(){return X.asm._crypto_core_hchacha20_keybytes.apply(null,arguments)},X._crypto_sign_verify_detached=function(){return X.asm._crypto_sign_verify_detached.apply(null,arguments)},X._crypto_kx_seed_keypair=function(){return X.asm._crypto_kx_seed_keypair.apply(null,arguments)},X._crypto_box_open_easy=function(){return X.asm._crypto_box_open_easy.apply(null,arguments)},X._crypto_hash_bytes=function(){return X.asm._crypto_hash_bytes.apply(null,arguments)},X._crypto_aead_chacha20poly1305_nsecbytes=function(){return X.asm._crypto_aead_chacha20poly1305_nsecbytes.apply(null,arguments)},X._crypto_kdf_contextbytes=function(){return X.asm._crypto_kdf_contextbytes.apply(null,arguments)},X._crypto_sign_bytes=function(){return X.asm._crypto_sign_bytes.apply(null,arguments)},X._crypto_generichash_update=function(){return X.asm._crypto_generichash_update.apply(null,arguments)},X._crypto_scalarmult=function(){return X.asm._crypto_scalarmult.apply(null,arguments)},X._crypto_aead_chacha20poly1305_ietf_abytes=function(){return X.asm._crypto_aead_chacha20poly1305_ietf_abytes.apply(null,arguments)},X.stackRestore=function(){return X.asm.stackRestore.apply(null,arguments)},X._crypto_kdf_keygen=function(){return X.asm._crypto_kdf_keygen.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_keybytes=function(){return X.asm._crypto_secretstream_xchacha20poly1305_keybytes.apply(null,arguments)},X._crypto_sign_detached=function(){return X.asm._crypto_sign_detached.apply(null,arguments)},X._crypto_box_easy=function(){return X.asm._crypto_box_easy.apply(null,arguments)},X._crypto_secretstream_xchacha20poly1305_pull=function(){return X.asm._crypto_secretstream_xchacha20poly1305_pull.apply(null,arguments)},X._sodium_base642bin=function(){return X.asm._sodium_base642bin.apply(null,arguments)},X._sodium_base64_encoded_len=function(){return X.asm._sodium_base64_encoded_len.apply(null,arguments)},X._memmove=function(){return X.asm._memmove.apply(null,arguments)},X._crypto_generichash_final=function(){return X.asm._crypto_generichash_final.apply(null,arguments)},X._crypto_stream_keygen=function(){return X.asm._crypto_stream_keygen.apply(null,arguments)},X._randombytes_uniform=function(){return X.asm._randombytes_uniform.apply(null,arguments)},X._crypto_sign_seed_keypair=function(){return X.asm._crypto_sign_seed_keypair.apply(null,arguments)},X._crypto_kdf_derive_from_key=function(){return X.asm._crypto_kdf_derive_from_key.apply(null,arguments)},X._crypto_shorthash_keygen=function(){return X.asm._crypto_shorthash_keygen.apply(null,arguments)},X._crypto_aead_chacha20poly1305_ietf_npubbytes=function(){return X.asm._crypto_aead_chacha20poly1305_ietf_npubbytes.apply(null,arguments)};if($.stackAlloc=X.stackAlloc,$.stackSave=X.stackSave,$.stackRestore=X.stackRestore,$.establishStackSpace=X.establishStackSpace,$.setTempRet0=X.setTempRet0,$.getTempRet0=X.getTempRet0,X.asm=WA,KA)if("function"==typeof X.locateFile?KA=X.locateFile(KA):X.memoryInitializerPrefixURL&&(KA=X.memoryInitializerPrefixURL+KA),O||W){var $A=X.readBinary(KA);BA.set($A,$.GLOBAL_BASE)}else{Y("memory initializer");var Ae=function(A){A.byteLength&&(A=new Uint8Array(A)),BA.set(A,$.GLOBAL_BASE),X.memoryInitializerRequest&&delete X.memoryInitializerRequest.response,S("memory initializer")};function ee(){X.readAsync(KA,Ae,function(){throw"could not load memory initializer "+KA})}var Ie=P(KA);if(Ie)Ae(Ie.buffer);else if(X.memoryInitializerRequest){function ge(){var A=X.memoryInitializerRequest,e=A.response;if(200!==A.status&&0!==A.status){var I=P(X.memoryInitializerRequestURL);if(!I)return void ee();e=I.buffer}Ae(e)}X.memoryInitializerRequest.response?setTimeout(ge,0):X.memoryInitializerRequest.addEventListener("load",ge)}else ee()}J.prototype=new Error,J.prototype.constructor=J;var te,re=null,ne=!1;LA=function A(){X.calledRun||x(),X.calledRun||(LA=A)},X.callMain=X.callMain=function(A){function e(){for(var A=0;A<3;A++)g.push(0)}A=A||[],v();var I=A.length+1,g=[i(R(X.thisProgram),"i8",0)];e();for(var t=0;t<I-1;t+=1)g.push(i(R(A[t]),"i8",0)),e();g.push(0),g=i(g,"i32",0);try{L(X._main(I,g,0),!0)}catch(A){if(A instanceof J)return;if("SimulateInfiniteLoop"==A)return void(X.noExitRuntime=!0);var r=A;A&&"object"==typeof A&&A.stack&&(r=[A,A.stack]),X.printErr("exception thrown: "+r),X.quit(1,A)}finally{ne=!0}},X.run=X.run=x,X.exit=X.exit=L;var ae=[];if(X.abort=X.abort=K,X.preInit)for("function"==typeof X.preInit&&(X.preInit=[X.preInit]);X.preInit.length>0;)X.preInit.pop()();var ie=!0;X.noInitialRun&&(ie=!1),x()}).catch(function(){function A(A){U("NO_DYNAMIC_EXECUTION=1 was set, cannot eval")}function e(A,e){A||U("Assertion failed: "+e)}function I(A){var I=P["_"+A];return I||U("NO_DYNAMIC_EXECUTION=1 was set, cannot eval"),e(I,"Cannot call unknown function "+A+" (perhaps LLVM optimizations or closure removed it?)"),I}function t(A,e,I,g){switch("*"===(I=I||"i8").charAt(I.length-1)&&(I="i32"),I){case"i1":case"i8":gA[A>>0]=e;break;case"i16":rA[A>>1]=e;break;case"i32":aA[A>>2]=e;break;case"i64":tempI64=[e>>>0,(tempDouble=e,+bA(tempDouble)>=1?tempDouble>0?(0|mA(+FA(tempDouble/4294967296),4294967295))>>>0:~~+GA((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],aA[A>>2]=tempI64[0],aA[A+4>>2]=tempI64[1];break;case"float":BA[A>>2]=e;break;case"double":cA[A>>3]=e;break;default:U("invalid type for setValue: "+I)}}function r(A,e,I){switch("*"===(e=e||"i8").charAt(e.length-1)&&(e="i32"),e){case"i1":case"i8":return gA[A>>0];case"i16":return rA[A>>1];case"i32":case"i64":return aA[A>>2];case"float":return BA[A>>2];case"double":return cA[A>>3];default:U("invalid type for setValue: "+e)}return null}function n(A,I,g,r){var n,a;"number"==typeof A?(n=!0,a=A):(n=!1,a=A.length);var i,B="string"==typeof I?I:null;if(i=g==AA?r:["function"==typeof XA?XA:Z.staticAlloc,Z.stackAlloc,Z.staticAlloc,Z.dynamicAlloc][void 0===g?$:g](Math.max(a,B?1:I.length)),n){var c,r=i;for(e(0==(3&i)),c=i+(-4&a);r<c;r+=4)aA[r>>2]=0;for(c=i+a;r<c;)gA[r++>>0]=0;return i}if("i8"===B)return A.subarray||A.slice?tA.set(A,i):tA.set(new Uint8Array(A),i),i;for(var C,o,Q,E=0;E<a;){var s=A[E];"function"==typeof s&&(s=Z.getFunctionIndex(s)),0!==(C=B||I[E])?("i64"==C&&(C="i32"),t(i+E,s,C),Q!==C&&(o=Z.getNativeTypeSize(C),Q=C),E+=o):E++}return i}function a(A,e){if(0===e||!A)return"";for(var I,g=0,t=0;;){if(I=tA[A+t>>0],g|=I,0==I&&!e)break;if(t++,e&&t==e)break}e||(e=t);var r="";if(g<128){for(var n;e>0;)n=String.fromCharCode.apply(String,tA.subarray(A,A+Math.min(e,1024))),r=r?r+n:n,A+=1024,e-=1024;return r}return P.UTF8ToString(A)}function i(A,e){for(var I=e;A[I];)++I;if(I-e>16&&A.subarray&&eA)return eA.decode(A.subarray(e,I));for(var g,t,r,n,a,i="";;){if(!(g=A[e++]))return i;if(128&g)if(t=63&A[e++],192!=(224&g))if(r=63&A[e++],224==(240&g)?g=(15&g)<<12|t<<6|r:(n=63&A[e++],240==(248&g)?g=(7&g)<<18|t<<12|r<<6|n:(a=63&A[e++],g=248==(252&g)?(3&g)<<24|t<<18|r<<12|n<<6|a:(1&g)<<30|t<<24|r<<18|n<<12|a<<6|63&A[e++])),g<65536)i+=String.fromCharCode(g);else{var B=g-65536;i+=String.fromCharCode(55296|B>>10,56320|1023&B)}else i+=String.fromCharCode((31&g)<<6|t);else i+=String.fromCharCode(g)}}function B(A,e,I,g){if(!(g>0))return 0;for(var t=I,r=I+g-1,n=0;n<A.length;++n){var a=A.charCodeAt(n);if(a>=55296&&a<=57343&&(a=65536+((1023&a)<<10)|1023&A.charCodeAt(++n)),a<=127){if(I>=r)break;e[I++]=a}else if(a<=2047){if(I+1>=r)break;e[I++]=192|a>>6,e[I++]=128|63&a}else if(a<=65535){if(I+2>=r)break;e[I++]=224|a>>12,e[I++]=128|a>>6&63,e[I++]=128|63&a}else if(a<=2097151){if(I+3>=r)break;e[I++]=240|a>>18,e[I++]=128|a>>12&63,e[I++]=128|a>>6&63,e[I++]=128|63&a}else if(a<=67108863){if(I+4>=r)break;e[I++]=248|a>>24,e[I++]=128|a>>18&63,e[I++]=128|a>>12&63,e[I++]=128|a>>6&63,e[I++]=128|63&a}else{if(I+5>=r)break;e[I++]=252|a>>30,e[I++]=128|a>>24&63,e[I++]=128|a>>18&63,e[I++]=128|a>>12&63,e[I++]=128|a>>6&63,e[I++]=128|63&a}}return e[I]=0,I-t}function c(A,e,I){return B(A,tA,e,I)}function C(A){for(var e=0,I=0;I<A.length;++I){var g=A.charCodeAt(I);g>=55296&&g<=57343&&(g=65536+((1023&g)<<10)|1023&A.charCodeAt(++I)),g<=127?++e:e+=g<=2047?2:g<=65535?3:g<=2097151?4:g<=67108863?5:6}return e}function o(A){var e=P.___cxa_demangle||P.__cxa_demangle;if(e){try{var I=A.substr(1),g=C(I)+1,t=XA(g);c(I,t,g);var n=XA(4),i=e(t,0,0,n);if(0===r(n,"i32")&&i)return a(i)}catch(A){}finally{t&&KA(t),n&&KA(n),i&&KA(i)}return A}return Z.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"),A}function Q(A){var e=/__Z[\w\d_]+/g;return A.replace(e,function(A){var e=o(A);return A===e?A:A+" ["+e+"]"})}function E(){var A=new Error;if(!A.stack){try{throw new Error(0)}catch(e){A=e}if(!A.stack)return"(no stack trace available)"}return A.stack.toString()}function s(){var A=E();return P.extraStackTrace&&(A+="\n"+P.extraStackTrace()),Q(A)}function y(){U("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+pA+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function h(){y()}function _(A){for(;A.length>0;){var e=A.shift();if("function"!=typeof e){var I=e.func;"number"==typeof I?void 0===e.arg?P.dynCall_v(I):P.dynCall_vi(I,e.arg):I(void 0===e.arg?null:e.arg)}else e()}}function p(){if(P.preRun)for("function"==typeof P.preRun&&(P.preRun=[P.preRun]);P.preRun.length;)D(P.preRun.shift());_(wA)}function w(){vA||(vA=!0,_(uA))}function u(){_(lA)}function l(){_(dA),kA=!0}function d(){if(P.postRun)for("function"==typeof P.postRun&&(P.postRun=[P.postRun]);P.postRun.length;)v(P.postRun.shift());_(DA)}function D(A){wA.unshift(A)}function v(A){DA.unshift(A)}function k(A,e){gA.set(A,e)}function b(A,e,I){for(var g=0;g<A.length;++g)gA[e++>>0]=A.charCodeAt(g);I||(gA[e>>0]=0)}function G(A){HA++,P.monitorRunDependencies&&P.monitorRunDependencies(HA)}function F(A){if(HA--,P.monitorRunDependencies&&P.monitorRunDependencies(HA),0==HA&&(null!==MA&&(clearInterval(MA),MA=null),YA)){var e=YA;YA=null,e()}}function m(A){return P.___errno_location&&(aA[P.___errno_location()>>2]=A),A}function H(A,e,I){var g=I>0?I:C(A)+1,t=new Array(g),r=B(A,t,0,t.length);return e&&(t.length=r),t}function M(A){if("boolean"==typeof X&&X){var e;try{e=Buffer.from(A,"base64")}catch(I){e=new Buffer(A,"base64")}return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}try{for(var I=xA(A),g=new Uint8Array(I.length),t=0;t<I.length;++t)g[t]=I.charCodeAt(t);return g}catch(A){throw new Error("Converting base64 string to bytes failed.")}}function Y(A){var e="data:application/octet-stream;base64,";if(String.prototype.startsWith?A.startsWith(e):0===A.indexOf(e))return M(A.slice(e.length))}function S(A){this.name="ExitStatus",this.message="Program terminated with exit("+A+")",this.status=A}function N(A){function e(){P.calledRun||(P.calledRun=!0,q||(w(),u(),P.onRuntimeInitialized&&P.onRuntimeInitialized(),P._main&&Ae&&P.callMain(A),d()))}A=A||P.arguments,null===qA&&(qA=Date.now()),HA>0||(p(),HA>0||P.calledRun||(P.setStatus?(P.setStatus("Running..."),setTimeout(function(){setTimeout(function(){P.setStatus("")},1),e()},1)):e()))}function R(A,e){e&&P.noExitRuntime||(P.noExitRuntime||(q=!0,z=A,EA=WA,l(),P.onExit&&P.onExit(A)),X&&process.exit(A),P.quit(A,new S(A)))}function U(A){P.onAbort&&P.onAbort(A),void 0!==A?(P.print(A),P.printErr(A),A=JSON.stringify(A)):A="",q=!0,z=1;var e="abort("+A+") at "+s()+"\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";throw $A&&$A.forEach(function(I){e=I(e,A)}),e}(P=g).onAbort=void 0,P.onRuntimeInitialized=void 0;var P;P||(P=(void 0!==P?P:null)||{});var J={};for(var x in P)P.hasOwnProperty(x)&&(J[x]=P[x]);var L=!1,K=!1,X=!1,T=!1;if(P.ENVIRONMENT)if("WEB"===P.ENVIRONMENT)L=!0;else if("WORKER"===P.ENVIRONMENT)K=!0;else if("NODE"===P.ENVIRONMENT)X=!0;else{if("SHELL"!==P.ENVIRONMENT)throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.");T=!0}else L="object"==typeof window,K="function"==typeof importScripts,X="object"==typeof process&&"function"==typeof require&&!L&&!K,T=!L&&!X&&!K;if(X){P.print||(P.print=console.log),P.printErr||(P.printErr=console.warn);var V,j;P.read=function(A,e){var I;return(I=Y(A))||(V||(V=require("fs")),j||(j=require("path")),A=j.normalize(A),I=V.readFileSync(A)),e?I:I.toString()},P.readBinary=function(A){var I=P.read(A,!0);return I.buffer||(I=new Uint8Array(I)),e(I.buffer),I},P.load=function(e){A(read(e))},P.thisProgram||(process.argv.length>1?P.thisProgram=process.argv[1].replace(/\\/g,"/"):P.thisProgram="unknown-program"),P.arguments=process.argv.slice(2),"undefined"!=typeof module&&(module.exports=P),process.on("uncaughtException",function(A){if(!(A instanceof S))throw A}),P.inspect=function(){return"[Emscripten Module object]"}}else if(T)P.print||(P.print=print),"undefined"!=typeof printErr&&(P.printErr=printErr),"undefined"!=typeof read?P.read=function(A){var e=Y(A);return e?PA(e):read(A)}:P.read=function(){throw"no read() available"},P.readBinary=function(A){var I;return(I=Y(A))?I:"function"==typeof readbuffer?new Uint8Array(readbuffer(A)):(I=read(A,"binary"),e("object"==typeof I),I)},"undefined"!=typeof scriptArgs?P.arguments=scriptArgs:void 0!==arguments&&(P.arguments=arguments),"function"==typeof quit&&(P.quit=function(A,e){quit(A)});else{if(!L&&!K)throw new Error("Unknown runtime environment. Where are we?");if(P.read=function(A){try{var e=new XMLHttpRequest;return e.open("GET",A,!1),e.send(null),e.responseText}catch(e){var I=Y(A);if(I)return PA(I);throw e}},K&&(P.readBinary=function(A){try{var e=new XMLHttpRequest;return e.open("GET",A,!1),e.responseType="arraybuffer",e.send(null),new Uint8Array(e.response)}catch(A){var I=Y(f);if(I)return I;throw A}}),P.readAsync=function(A,e,I){var g=new XMLHttpRequest;g.open("GET",A,!0),g.responseType="arraybuffer",g.onload=function(){if(200==g.status||0==g.status&&g.response)e(g.response);else{var t=Y(A);t?e(t.buffer):I()}},g.onerror=I,g.send(null)},void 0!==arguments&&(P.arguments=arguments),"undefined"!=typeof console)P.print||(P.print=function(A){}),P.printErr||(P.printErr=function(A){});else{P.print||(P.print=function(A){})}K&&(P.load=importScripts),void 0===P.setWindowTitle&&(P.setWindowTitle=function(A){document.title=A})}!P.load&&P.read&&(P.load=function(e){A(P.read(e))}),P.print||(P.print=function(){}),P.printErr||(P.printErr=P.print),P.arguments||(P.arguments=[]),P.thisProgram||(P.thisProgram="./this.program"),P.quit||(P.quit=function(A,e){throw e}),P.print=P.print,P.printErr=P.printErr,P.preRun=[],P.postRun=[];for(var x in J)J.hasOwnProperty(x)&&(P[x]=J[x]);J=void 0;var Z={setTempRet0:function(A){return tempRet0=A,A},getTempRet0:function(){return tempRet0},stackSave:function(){return EA},stackRestore:function(A){EA=A},getNativeTypeSize:function(A){switch(A){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:if("*"===A[A.length-1])return Z.QUANTUM_SIZE;if("i"===A[0]){var I=parseInt(A.substr(1));return e(I%8==0),I/8}return 0}},getNativeFieldSize:function(A){return Math.max(Z.getNativeTypeSize(A),Z.QUANTUM_SIZE)},STACK_ALIGN:16,prepVararg:function(A,I){return"double"===I||"i64"===I?7&A&&(e(4==(7&A)),A+=4):e(0==(3&A)),A},getAlignSize:function(A,e,I){return I||"i64"!=A&&"double"!=A?A?Math.min(e||(A?Z.getNativeFieldSize(A):0),Z.QUANTUM_SIZE):Math.min(e,8):8},dynCall:function(A,e,I){return I&&I.length?P["dynCall_"+A].apply(null,[e].concat(I)):P["dynCall_"+A].call(null,e)},functionPointers:[null,null,null,null,null,null,null,null],addFunction:function(A){for(var e=0;e<Z.functionPointers.length;e++)if(!Z.functionPointers[e])return Z.functionPointers[e]=A,1*(1+e);throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."},removeFunction:function(A){Z.functionPointers[(A-1)/1]=null},warnOnce:function(A){Z.warnOnce.shown||(Z.warnOnce.shown={}),Z.warnOnce.shown[A]||(Z.warnOnce.shown[A]=1,P.printErr(A))},funcWrappers:{},getFuncWrapper:function(A,I){if(A){e(I),Z.funcWrappers[I]||(Z.funcWrappers[I]={});var g=Z.funcWrappers[I];return g[A]||(1===I.length?g[A]=function(){return Z.dynCall(I,A)}:2===I.length?g[A]=function(e){return Z.dynCall(I,A,[e])}:g[A]=function(){return Z.dynCall(I,A,Array.prototype.slice.call(arguments))}),g[A]}},getCompilerSetting:function(A){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"},stackAlloc:function(A){var e=EA;return EA=EA+A|0,EA=EA+15&-16,e},staticAlloc:function(A){var e=oA;return oA=oA+A|0,oA=oA+15&-16,e},dynamicAlloc:function(A){var e=aA[hA>>2],I=-16&(e+A+15|0);return aA[hA>>2]=I,I>=pA&&!h()?(aA[hA>>2]=e,0):e},alignMemory:function(A,e){return A=Math.ceil(A/(e||16))*(e||16)},makeBigInt:function(A,e,I){return I?+(A>>>0)+4294967296*+(e>>>0):+(A>>>0)+4294967296*+(0|e)},GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};P.Runtime=Z;var O,W,q=0,z=0;!function(){var A={stackSave:function(){Z.stackSave()},stackRestore:function(){Z.stackRestore()},arrayToC:function(A){var e=Z.stackAlloc(A.length);return k(A,e),e},stringToC:function(A){var e=0;if(null!==A&&void 0!==A&&0!==A){var I=1+(A.length<<2);c(A,e=Z.stackAlloc(I),I)}return e}},e={string:A.stringToC,array:A.arrayToC};W=function(A,g,t,r,n){var i=I(A),B=[],c=0;if(r)for(var C=0;C<r.length;C++){var o=e[t[C]];o?(0===c&&(c=Z.stackSave()),B[C]=o(r[C])):B[C]=r[C]}var Q=i.apply(null,B);if("string"===g&&(Q=a(Q)),0!==c){if(n&&n.async)return void EmterpreterAsync.asyncFinalizers.push(function(){Z.stackRestore(c)});Z.stackRestore(c)}return Q},O=function(A,e,I){return function(){return W(A,e,I,arguments)}}}(),P.ccall=W,P.cwrap=O,P.setValue=t,P.getValue=r;var $=2,AA=4;P.ALLOC_NORMAL=0,P.ALLOC_STACK=1,P.ALLOC_STATIC=$,P.ALLOC_DYNAMIC=3,P.ALLOC_NONE=AA,P.allocate=n,P.getMemory=function(A){return QA?vA?XA(A):Z.dynamicAlloc(A):Z.staticAlloc(A)},P.Pointer_stringify=a,P.AsciiToString=function(A){for(var e="";;){var I=gA[A++>>0];if(!I)return e;e+=String.fromCharCode(I)}},P.stringToAscii=function(A,e){return b(A,e,!1)};var eA="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;P.UTF8ArrayToString=i,P.UTF8ToString=function(A){return i(tA,A)},P.stringToUTF8Array=B,P.stringToUTF8=c,P.lengthBytesUTF8=C;"undefined"!=typeof TextDecoder&&new TextDecoder("utf-16le");P.stackTrace=s;var IA,gA,tA,rA,nA,aA,iA,BA,cA,CA,oA,QA,EA,sA,yA,hA,fA=16384;CA=oA=EA=sA=yA=hA=0,QA=!1;var _A=P.TOTAL_STACK||5242880,pA=P.TOTAL_MEMORY||16777216;if(pA<_A&&P.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+pA+"! (TOTAL_STACK="+_A+")"),IA=P.buffer?P.buffer:new ArrayBuffer(pA),P.HEAP8=gA=new Int8Array(IA),P.HEAP16=rA=new Int16Array(IA),P.HEAP32=aA=new Int32Array(IA),P.HEAPU8=tA=new Uint8Array(IA),P.HEAPU16=nA=new Uint16Array(IA),P.HEAPU32=iA=new Uint32Array(IA),P.HEAPF32=BA=new Float32Array(IA),P.HEAPF64=cA=new Float64Array(IA),aA[0]=1668509029,rA[1]=25459,115!==tA[2]||99!==tA[3])throw"Runtime error: expected the system to be little-endian!";P.HEAP=void 0,P.buffer=IA,P.HEAP8=gA,P.HEAP16=rA,P.HEAP32=aA,P.HEAPU8=tA,P.HEAPU16=nA,P.HEAPU32=iA,P.HEAPF32=BA,P.HEAPF64=cA;var wA=[],uA=[],lA=[],dA=[],DA=[],vA=!1,kA=!1;P.addOnPreRun=D,P.addOnInit=function(A){uA.unshift(A)},P.addOnPreMain=function(A){lA.unshift(A)},P.addOnExit=function(A){dA.unshift(A)},P.addOnPostRun=v,P.writeStringToMemory=function(A,e,I){Z.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var g,t;I&&(t=e+C(A),g=gA[t]),c(A,e,1/0),I&&(gA[t]=g)},P.writeArrayToMemory=k,P.writeAsciiToMemory=b,Math.imul&&-5===Math.imul(4294967295,5)||(Math.imul=function(A,e){var I=65535&A,g=65535&e;return I*g+((A>>>16)*g+I*(e>>>16)<<16)|0}),Math.imul=Math.imul,Math.clz32||(Math.clz32=function(A){A>>>=0;for(var e=0;e<32;e++)if(A&1<<31-e)return e;return 32}),Math.clz32=Math.clz32,Math.trunc||(Math.trunc=function(A){return A<0?Math.ceil(A):Math.floor(A)}),Math.trunc=Math.trunc;var bA=Math.abs,GA=(Math.cos,Math.sin,Math.tan,Math.acos,Math.asin,Math.atan,Math.atan2,Math.exp,Math.log,Math.sqrt,Math.ceil),FA=Math.floor,mA=(Math.pow,Math.imul,Math.fround,Math.round,Math.min),HA=(Math.clz32,Math.trunc,0),MA=null,YA=null;P.addRunDependency=G,P.removeRunDependency=F,P.preloadedImages={},P.preloadedAudios={};var SA=null,NA=[function(){return P.getRandomValue()},function(){if(void 0===P.getRandomValue)try{var A="object"==typeof window?window:self,e=void 0!==A.crypto?A.crypto:A.msCrypto,I=function(){var A=new Uint32Array(1);return e.getRandomValues(A),A[0]>>>0};I(),P.getRandomValue=I}catch(A){try{var g=require("crypto"),t=function(){var A=g.randomBytes(4);return(A[0]<<24|A[1]<<16|A[2]<<8|A[3])>>>0};t(),P.getRandomValue=t}catch(A){throw"No secure random number generator found"}}}];CA=Z.GLOBAL_BASE,oA=CA+35456,uA.push(),SA="data:application/octet-stream;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJuiVj8KyJ7BFw/SJ8u+Y8NXfrAXTxjM5sTgCiG1T/AXHF2pwPU3YT7o8C3YNEGcPKiBT+iw5zMZOx/13kqwDehPolY/CsiewRcP0ifLvmPDV36wF08YzObE4AohtU/yFtBdqcD1N2E+6PAt2DRBnDyogU/osOczGTsf9d5KsA/rs////////////////////////////////////////f+3///////////////////////////////////////9/7v///////////////////////////////////////3/Z/////////////////////////////////////////9r/////////////////////////////////////////2/////////////////////////////////////////8IybzzZ+YJajunyoSFrme7K/iU/nLzbjzxNh1fOvVPpdGC5q1/Ug5RH2w+K4xoBZtrvUH7q9mDH3khfhMZzeBbIq4o15gvikLNZe8jkUQ3cS87TezP+8C1vNuJgaXbtek4tUjzW8JWORnQBbbxEfFZm08Zr6SCP5IYgW3a1V4cq0ICA6OYqgfYvm9wRQFbgxKMsuROvoUxJOK0/9XDfQxVb4l78nRdvnKxlhY7/rHegDUSxyWnBtyblCZpz3Txm8HSSvGewWmb5OMlTziGR77vtdWMi8adwQ9lnKx3zKEMJHUCK1lvLOktg+SmbqqEdErU+0G93KmwXLVTEYPaiPl2q99m7lJRPpgQMrQtbcYxqD8h+5jIJwOw5A7vvsd/Wb/Cj6g98wvgxiWnCpNHkafVb4ID4FFjygZwbg4KZykpFPwv0kaFCrcnJskmXDghGy7tKsRa/G0sTd+zlZ0TDThT3mOvi1RzCmWosnc8uwpqduau7UcuycKBOzWCFIUscpJkA/FMoei/ogEwQrxLZhqokZf40HCLS8IwvlQGo1FsxxhS79YZ6JLREKllVSQGmdYqIHFXhTUO9LjRuzJwoGoQyNDSuBbBpBlTq0FRCGw3Hpnrjt9Md0gnqEib4bW8sDRjWsnFswwcOcuKQeNKqthOc+Njd0/KnFujuLLW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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUy0+YnVmbGVuIDw9IEJMQUtFMkJfQkxPQ0tCWVRFUwBjcnlwdG9fZ2VuZXJpY2hhc2gvYmxha2UyYi9yZWYvYmxha2UyYi1yZWYuYwBjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9fZmluYWwAb3V0bGVuIDw9IFVJTlQ4X01BWABjcnlwdG9fZ2VuZXJpY2hhc2gvYmxha2UyYi9yZWYvZ2VuZXJpY2hhc2hfYmxha2UyYi5jAGNyeXB0b19nZW5lcmljaGFzaF9ibGFrZTJiAGtleWxlbiA8PSBVSU5UOF9NQVgAY3J5cHRvX2dlbmVyaWNoYXNoX2JsYWtlMmJfaW5pdABjcnlwdG9fZ2VuZXJpY2hhc2hfYmxha2UyYl9maW5hbACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO3T9VwaYxJY1pz3ot753hQAAAAAAAAAAAAAAAAAAAAQU2lnRWQyNTUxOSBubyBFZDI1NTE5IGNvbGxpc2lvbnMBAHsgcmV0dXJuIE1vZHVsZS5nZXRSYW5kb21WYWx1ZSgpOyB9AHsgaWYgKE1vZHVsZS5nZXRSYW5kb21WYWx1ZSA9PT0gdW5kZWZpbmVkKSB7IHRyeSB7IHZhciB3aW5kb3dfID0gJ29iamVjdCcgPT09IHR5cGVvZiB3aW5kb3cgPyB3aW5kb3cgOiBzZWxmOyB2YXIgY3J5cHRvXyA9IHR5cGVvZiB3aW5kb3dfLmNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3dfLmNyeXB0byA6IHdpbmRvd18ubXNDcnlwdG87IHZhciByYW5kb21WYWx1ZXNTdGFuZGFyZCA9IGZ1bmN0aW9uKCkgeyB2YXIgYnVmID0gbmV3IFVpbnQzMkFycmF5KDEpOyBjcnlwdG9fLmdldFJhbmRvbVZhbHVlcyhidWYpOyByZXR1cm4gYnVmWzBdID4+PiAwOyB9OyByYW5kb21WYWx1ZXNTdGFuZGFyZCgpOyBNb2R1bGUuZ2V0UmFuZG9tVmFsdWUgPSByYW5kb21WYWx1ZXNTdGFuZGFyZDsgfSBjYXRjaCAoZSkgeyB0cnkgeyB2YXIgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7IHZhciByYW5kb21WYWx1ZU5vZGVKUyA9IGZ1bmN0aW9uKCkgeyB2YXIgYnVmID0gY3J5cHRvLnJhbmRvbUJ5dGVzKDQpOyByZXR1cm4gKGJ1ZlswXSA8PCAyNCB8IGJ1ZlsxXSA8PCAxNiB8IGJ1ZlsyXSA8PCA4IHwgYnVmWzNdKSA+Pj4gMDsgfTsgcmFuZG9tVmFsdWVOb2RlSlMoKTsgTW9kdWxlLmdldFJhbmRvbVZhbHVlID0gcmFuZG9tVmFsdWVOb2RlSlM7IH0gY2F0Y2ggKGUpIHsgdGhyb3cgJ05vIHNlY3VyZSByYW5kb20gbnVtYmVyIGdlbmVyYXRvciBmb3VuZCc7IH0gfSB9IH0ATGlic29kaXVtRFJHYnVmX2xlbiA8PSBTSVpFX01BWAByYW5kb21ieXRlcy9yYW5kb21ieXRlcy5jAHJhbmRvbWJ5dGVzAGI2NF9wb3MgPD0gYjY0X2xlbgBzb2RpdW0vY29kZWNzLmMAc29kaXVtX2JpbjJiYXNlNjQAMS4wLjE1";var RA=oA;oA+=16;var UA={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};hA=n(1,"i32",$),sA=(EA=Z.alignMemory(oA))+_A,yA=Z.alignMemory(sA),aA[hA>>2]=yA,QA=!0;var PA=function(A){for(var e=[],I=0;I<A.length;I++){var g=A[I];g>255&&(g&=255),e.push(String.fromCharCode(g))}return e.join("")};P.intArrayFromString=H,P.intArrayToString=PA;var JA="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",xA="function"==typeof atob?atob:function(A){var e,I,g,t,r,n,a="",i=0;A=A.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{e=JA.indexOf(A.charAt(i++))<<2|(t=JA.indexOf(A.charAt(i++)))>>4,I=(15&t)<<4|(r=JA.indexOf(A.charAt(i++)))>>2,g=(3&r)<<6|(n=JA.indexOf(A.charAt(i++))),a+=String.fromCharCode(e),64!==r&&(a+=String.fromCharCode(I)),64!==n&&(a+=String.fromCharCode(g))}while(i<A.length);return a};P.asmGlobalArg={Math:Math,Int8Array:Int8Array,Int16Array:Int16Array,Int32Array:Int32Array,Uint8Array:Uint8Array,Uint16Array:Uint16Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array,NaN:NaN,Infinity:1/0},P.asmLibraryArg={abort:U,assert:e,enlargeMemory:h,getTotalMemory:function(){return pA},abortOnCannotGrowMemory:y,_emscripten_asm_const_i:function(A){return NA[A]()},_sysconf:function(A){switch(A){case 30:return fA;case 85:return tA.length/fA;case 132:case 133:case 12:case 137:case 138:case 15:case 235:case 16:case 17:case 18:case 19:case 20:case 149:case 13:case 10:case 236:case 153:case 9:case 21:case 22:case 159:case 154:case 14:case 77:case 78:case 139:case 80:case 81:case 82:case 68:case 67:case 164:case 11:case 29:case 47:case 48:case 95:case 52:case 51:case 46:return 200809;case 79:return 0;case 27:case 246:case 127:case 128:case 23:case 24:case 160:case 161:case 181:case 182:case 242:case 183:case 184:case 243:case 244:case 245:case 165:case 178:case 179:case 49:case 50:case 168:case 169:case 175:case 170:case 171:case 172:case 97:case 76:case 32:case 173:case 35:return-1;case 176:case 177:case 7:case 155:case 8:case 157:case 125:case 126:case 92:case 93:case 129:case 130:case 131:case 94:case 91:return 1;case 74:case 60:case 69:case 70:case 4:return 1024;case 31:case 42:case 72:return 32;case 87:case 26:case 33:return 2147483647;case 34:case 1:return 47839;case 38:case 36:return 99;case 43:case 37:return 2048;case 0:return 2097152;case 3:return 65536;case 28:return 32768;case 44:return 32767;case 75:return 16384;case 39:return 1e3;case 89:return 700;case 71:return 256;case 40:return 255;case 2:return 100;case 180:return 64;case 25:return 20;case 5:return 16;case 6:return 6;case 73:return 4;case 84:return"object"==typeof navigator?navigator.hardwareConcurrency||1:1}return m(UA.EINVAL),-1},_abort:function(){P.abort()},___setErrNo:m,_emscripten_memcpy_big:function(A,e,I){return tA.set(tA.subarray(e,e+I),A),A},___assert_fail:function(A,e,I,g){throw q=!0,"Assertion failed: "+a(A)+", at: "+[e?a(e):"unknown filename",I,g?a(g):"unknown function"]+" at "+s()},DYNAMICTOP_PTR:hA,tempDoublePtr:RA,ABORT:q,STACKTOP:EA,STACK_MAX:sA};var LA=function(A,e,I){"";function g(A,e){A|=0,e|=0;var I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0,Y=0,S=0,N=0,R=0,U=0,P=0,J=0,x=0,L=0,K=0,X=0,T=0,V=0,j=0,Z=0,O=0,W=0,q=0,z=0,$=0,AA=0,eA=0,IA=0,gA=0,tA=0,rA=0;t=Qg,r=Qg=Qg+63&-64,Qg=Qg+256|0,I=0;do{n=0|De(e+(I<<3)|0),cg[(g=r+128+(I<<3)|0)>>2]=n,cg[g+4>>2]=hg,I=I+1|0}while(16!=(0|I));e=A,g=(I=r)+64|0;do{cg[I>>2]=cg[e>>2],I=I+4|0,e=e+4|0}while((0|I)<(0|g));for(cg[r+88>>2]=1595750129,cg[r+88+4>>2]=-1521486534,$=-1377402159^cg[A+64>>2],s=1359893119^cg[A+64+4>>2],n=725511199^cg[A+72>>2],p=-1694144372^cg[A+72+4>>2],C=-79577749^cg[A+80>>2],y=528734635^cg[A+80+4>>2],M=327033209^cg[A+88>>2],z=1541459225^cg[A+88+4>>2],cg[r+120>>2]=M,cg[r+120+4>>2]=z,I=0|aI(0|(I=0|aI(0|(N=0|aI(0|(N=0|aI(0|(f=0|cg[r+32>>2]),0|(g=0|cg[r+32+4>>2]),0|cg[r>>2],0|cg[r+4>>2])),0|hg,0|cg[r+128>>2],0|cg[r+128+4>>2])),0|(I=hg),0|(g=0|be(f^(X=0|aI(0|(s=0|be($^N,s^I,32)),0|($=hg),-205731576,1779033703)),g^(R=hg),24)),0|(f=hg))),0|hg,0|cg[(N=r+128+8|0)>>2],0|cg[N+4>>2]),J=hg,cg[r>>2]=I,cg[r+4>>2]=J,$=0|be(s^I,$^J,16),s=hg,cg[r+96>>2]=$,cg[r+96+4>>2]=s,s=0|aI(0|X,0|R,0|$,0|s),$=hg,cg[r+64>>2]=s,cg[r+64+4>>2]=$,$=0|be(g^s,f^$,63),cg[r+32>>2]=$,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(s=0|aI(0|(s=0|aI(0|($=0|cg[r+40>>2]),0|(f=0|cg[r+40+4>>2]),0|cg[r+8>>2],0|cg[r+8+4>>2])),0|hg,0|cg[(g=r+128+16|0)>>2],0|cg[g+4>>2])),p^(R=hg),32))^(R=0|aI(0|(R=0|aI(0|s,0|R,0|(f=0|be($^(X=0|aI(0|p,0|(n=hg),-2067093701,-1150833019)),f^(v=hg),24)),0|($=hg))),0|hg,0|cg[(s=r+128+24|0)>>2],0|cg[s+4>>2])),n^(w=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,v=0|aI(0|X,0|v,0|n,0|p),X=hg,cg[r+72>>2]=v,cg[r+72+4>>2]=X,X=0|be(f^v,$^X,63),$=hg,C=0|be((y=0|be(C^(h=0|aI(0|(h=0|aI(0|(v=0|cg[r+48>>2]),0|(f=0|cg[r+48+4>>2]),0|cg[r+16>>2],0|cg[r+16+4>>2])),0|hg,0|cg[(V=r+128+32|0)>>2],0|cg[V+4>>2])),y^(a=hg),32))^(a=0|aI(0|(a=0|aI(0|h,0|a,0|(f=0|be(v^(D=0|aI(0|y,0|(C=hg),-23791573,1013904242)),f^(e=hg),24)),0|(v=hg))),0|hg,0|cg[(h=r+128+40|0)>>2],0|cg[h+4>>2])),C^(U=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,v=0|be(f^(e=0|aI(0|D,0|e,0|C,0|y)),v^(D=hg),63),f=hg,z=0|be(M^(_=0|aI(0|(_=0|aI(0|(c=0|cg[r+56>>2]),0|(o=0|cg[r+56+4>>2]),0|cg[r+24>>2],0|cg[r+24+4>>2])),0|hg,0|cg[(E=r+128+48|0)>>2],0|cg[E+4>>2])),z^(q=hg),32),M=hg,c=0|be((o=0|be(c^(d=0|aI(0|cg[r+88>>2],0|cg[r+88+4>>2],0|z,0|M)),o^(b=hg),24))^(b=0|aI(0|d,0|b,0|(M=0|be(z^(q=0|aI(0|(q=0|aI(0|_,0|q,0|o,0|(c=hg))),0|hg,0|cg[(_=r+128+56|0)>>2],0|cg[_+4>>2])),M^(u=hg),16)),0|(z=hg))),c^(d=hg),63),o=hg,M=0|be((z=0|be(M^(J=0|aI(0|(J=0|aI(0|X,0|$,0|I,0|J)),0|hg,0|cg[(I=r+128+64|0)>>2],0|cg[I+4>>2])),z^(x=hg),32))^(x=0|aI(0|(x=0|aI(0|J,0|x,0|($=0|be(X^(D=0|aI(0|e,0|D,0|z,0|(M=hg))),$^(e=hg),24)),0|(X=hg))),0|hg,0|cg[(J=r+128+72|0)>>2],0|cg[J+4>>2])),M^(W=hg),16),z=hg,cg[r+120>>2]=M,cg[r+120+4>>2]=z,z=0|aI(0|D,0|e,0|M,0|z),M=hg,cg[r+80>>2]=z,cg[r+80+4>>2]=M,M=0|be($^z,X^M,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,w=0|aI(0|v,0|f,0|R,0|w),z=0|cg[(R=r+128+80|0)>>2],$=0|cg[R+4>>2],w=0|aI(0|w,0|hg,0|z,0|$),e=hg,b=0|aI(0|(d=0|aI(0|b,0|d,0|(D=0|be(cg[r+96>>2]^w,cg[r+96+4>>2]^e,32)),0|(l=hg))),0|(b=hg),0|(l=0|be(D^(e=0|aI(0|(e=0|aI(0|w,0|e,0|(f=0|be(v^d,f^b,24)),0|(v=hg))),0|hg,0|cg[(w=r+128+88|0)>>2],0|cg[w+4>>2])),l^(S=hg),16)),0|(D=hg)),d=hg,cg[r+88>>2]=b,cg[r+88+4>>2]=d,d=0|be(f^b,v^d,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,p=0|be(n^(U=0|aI(0|(U=0|aI(0|c,0|o,0|a,0|U)),0|hg,0|cg[(a=r+128+96|0)>>2],0|cg[a+4>>2])),p^(b=hg),32),n=hg,b=0|aI(0|U,0|b,0|(o=0|be(c^(f=0|aI(0|cg[r+64>>2],0|cg[r+64+4>>2],0|p,0|n)),o^(Q=hg),24)),0|(c=hg)),AA=0|cg[(U=r+128+104|0)>>2],O=0|cg[U+4>>2],c=0|be(o^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^(b=0|aI(0|b,0|hg,0|AA,0|O)),n^(k=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,u=0|aI(0|(B=0|cg[r+32>>2]),0|(gA=0|cg[r+32+4>>2]),0|q,0|u),L=0|cg[(q=r+128+112|0)>>2],i=0|cg[q+4>>2],y=0|be(C^(u=0|aI(0|u,0|hg,0|L,0|i)),y^(rA=hg),32),C=hg,rA=0|aI(0|u,0|rA,0|(gA=0|be(B^(m=0|aI(0|cg[r+72>>2],0|cg[r+72+4>>2],0|y,0|C)),gA^(K=hg),24)),0|(B=hg)),F=0|cg[(u=r+128+120|0)>>2],IA=0|cg[u+4>>2],l=0|be((D=0|be(l^(i=0|aI(0|(W=0|aI(0|x,0|W,0|(B=0|be(gA^(K=0|aI(0|m,0|K,0|(C=0|be(y^(rA=0|aI(0|rA,0|hg,0|F,0|IA)),C^(P=hg),16)),0|(y=hg))),B^(m=hg),63)),0|(gA=hg))),0|hg,0|L,0|i)),D^(L=hg),32))^($=0|aI(0|(L=0|aI(0|i,0|L,0|(gA=0|be(B^(f=0|aI(0|Q,0|f,0|D,0|(l=hg))),gA^(Q=hg),24)),0|(B=hg))),0|hg,0|z,0|$)),l^(z=hg),16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,Q=0|aI(0|f,0|Q,0|l,0|D),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,B=0|be(gA^Q,B^f,63),cg[r+32>>2]=B,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(S=0|aI(0|(S=0|aI(0|M,0|X,0|e,0|S)),0|hg,0|cg[V>>2],0|cg[V+4>>2])),p^(e=hg),32))^(e=0|aI(0|(e=0|aI(0|S,0|e,0|(X=0|be(M^(m=0|aI(0|K,0|m,0|p,0|(n=hg))),X^(K=hg),24)),0|(M=hg))),0|hg,0|cg[I>>2],0|cg[I+4>>2])),n^(S=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,K=0|aI(0|m,0|K,0|n,0|p),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,M=0|be(X^K,M^m,63),X=hg,y=0|be(C^(k=0|aI(0|(k=0|aI(0|d,0|v,0|b,0|k)),0|hg,0|cg[J>>2],0|cg[J+4>>2])),y^(b=hg),32),C=hg,C=0|be(y^(IA=0|aI(0|(b=0|aI(0|k,0|b,0|(v=0|be(d^(B=0|aI(0|cg[r+80>>2],0|cg[r+80+4>>2],0|y,0|C)),v^(gA=hg),24)),0|(d=hg))),0|hg,0|F,0|IA)),C^(F=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,d=0|be(v^(gA=0|aI(0|B,0|gA,0|C,0|y)),d^(B=hg),63),v=hg,O=0|aI(0|(P=0|aI(0|c,0|o,0|rA,0|P)),0|hg,0|AA,0|O),AA=hg,P=0|be(cg[r+120>>2]^O,cg[r+120+4>>2]^AA,32),rA=hg,c=0|be((o=0|be(c^(b=0|aI(0|cg[r+88>>2],0|cg[r+88+4>>2],0|P,0|rA)),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(rA=0|be(P^(AA=0|aI(0|(AA=0|aI(0|O,0|AA,0|o,0|(c=hg))),0|hg,0|cg[E>>2],0|cg[E+4>>2])),rA^(O=hg),16)),0|(P=hg))),c^(b=hg),63),o=hg,$=0|aI(0|(z=0|aI(0|(z=0|aI(0|M,0|X,0|$,0|z)),0|hg,0|cg[N>>2],0|cg[N+4>>2])),0|($=hg),0|(X=0|be(M^(B=0|aI(0|gA,0|B,0|(P=0|be(rA^z,P^$,32)),0|(rA=hg))),X^(gA=hg),24)),0|(M=hg)),z=0|cg[a>>2],L=0|cg[a+4>>2],rA=0|be(P^($=0|aI(0|$,0|hg,0|z,0|L)),rA^(i=hg),16),P=hg,cg[r+120>>2]=rA,cg[r+120+4>>2]=P,P=0|aI(0|B,0|gA,0|rA,0|P),rA=hg,cg[r+80>>2]=P,cg[r+80+4>>2]=rA,M=0|be(X^P,M^rA,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,S=0|aI(0|d,0|v,0|e,0|S),e=0|cg[r+128>>2],gA=0|cg[r+128+4>>2],B=0|aI(0|(S=0|aI(0|S,0|hg,0|e,0|gA)),0|(B=hg),0|(v=0|be(d^(b=0|aI(0|k,0|b,0|(D=0|be(l^S,D^B,32)),0|(l=hg))),v^(k=hg),24)),0|(d=hg)),S=0|cg[g>>2],W=0|cg[g+4>>2],k=0|aI(0|b,0|k,0|(l=0|be(D^(B=0|aI(0|B,0|hg,0|S,0|W)),l^(x=hg),16)),0|(D=hg)),b=hg,cg[r+88>>2]=k,cg[r+88+4>>2]=b,d=0|be(v^k,d^b,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,F=0|aI(0|c,0|o,0|IA,0|F),IA=0|cg[w>>2],tA=0|cg[w+4>>2],c=0|be((o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^(F=0|aI(0|F,0|hg,0|IA,0|tA)),p^(Y=hg),32)),0|(n=hg))),o^(Q=hg),24))^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^(Y=0|aI(0|(Y=0|aI(0|F,0|Y,0|o,0|(c=hg))),0|hg,0|cg[_>>2],0|cg[_+4>>2])),n^(F=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,O=0|aI(0|(Z=0|cg[r+32>>2]),0|(T=0|cg[r+32+4>>2]),0|AA,0|O),AA=0|cg[h>>2],G=0|cg[h+4>>2],eA=0|aI(0|(O=0|aI(0|O,0|hg,0|AA,0|G)),0|(eA=hg),0|(T=0|be(Z^(m=0|aI(0|K,0|m,0|(y=0|be(C^O,y^eA,32)),0|(C=hg))),T^(K=hg),24)),0|(Z=hg)),O=0|cg[s>>2],H=0|cg[s+4>>2],l=0|be((D=0|be(l^(tA=0|aI(0|(i=0|aI(0|$,0|i,0|(Z=0|be(T^(K=0|aI(0|m,0|K,0|(C=0|be(y^(eA=0|aI(0|eA,0|hg,0|O,0|H)),C^(j=hg),16)),0|(y=hg))),Z^(m=hg),63)),0|(T=hg))),0|hg,0|IA,0|tA)),D^(IA=hg),32))^(IA=0|aI(0|(IA=0|aI(0|tA,0|IA,0|(T=0|be(Z^(f=0|aI(0|Q,0|f,0|D,0|(l=hg))),T^(Q=hg),24)),0|(Z=hg))),0|hg,0|cg[I>>2],0|cg[I+4>>2])),l^(tA=hg),16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,Q=0|aI(0|f,0|Q,0|l,0|D),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,Z=0|be(T^Q,Z^f,63),cg[r+32>>2]=Z,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(L=0|aI(0|(x=0|aI(0|M,0|X,0|B,0|x)),0|hg,0|z,0|L)),p^(z=hg),32))^(gA=0|aI(0|(z=0|aI(0|L,0|z,0|(X=0|be(M^(m=0|aI(0|K,0|m,0|p,0|(n=hg))),X^(K=hg),24)),0|(M=hg))),0|hg,0|e,0|gA)),n^(e=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,K=0|aI(0|m,0|K,0|n,0|p),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,M=0|be(X^K,M^m,63),X=hg,C=0|be((y=0|be(C^(G=0|aI(0|(F=0|aI(0|d,0|v,0|Y,0|F)),0|hg,0|AA,0|G)),y^(AA=hg),32))^(W=0|aI(0|(AA=0|aI(0|G,0|AA,0|(v=0|be(d^(rA=0|aI(0|P,0|rA,0|y,0|(C=hg))),v^(P=hg),24)),0|(d=hg))),0|hg,0|S,0|W)),C^(S=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,d=0|be(v^(P=0|aI(0|rA,0|P,0|C,0|y)),d^(rA=hg),63),v=hg,j=0|aI(0|(j=0|aI(0|c,0|o,0|eA,0|j)),0|hg,0|cg[u>>2],0|cg[u+4>>2]),eA=hg,c=0|be((o=0|be(c^(b=0|aI(0|k,0|b,0|(AA=0|be(cg[r+120>>2]^j,cg[r+120+4>>2]^eA,32)),0|(G=hg))),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(G=0|be(AA^(eA=0|aI(0|(eA=0|aI(0|j,0|eA,0|o,0|(c=hg))),0|hg,0|cg[U>>2],0|cg[U+4>>2])),G^(j=hg),16)),0|(AA=hg))),c^(b=hg),63),o=hg,G=0|be((AA=0|be(G^(tA=0|aI(0|(tA=0|aI(0|M,0|X,0|IA,0|tA)),0|hg,0|cg[R>>2],0|cg[R+4>>2])),AA^(IA=hg),32))^(IA=0|aI(0|(IA=0|aI(0|tA,0|IA,0|(X=0|be(M^(rA=0|aI(0|P,0|rA,0|AA,0|(G=hg))),X^(P=hg),24)),0|(M=hg))),0|hg,0|cg[q>>2],0|cg[q+4>>2])),G^(tA=hg),16),AA=hg,cg[r+120>>2]=G,cg[r+120+4>>2]=AA,AA=0|aI(0|rA,0|P,0|G,0|AA),G=hg,cg[r+80>>2]=AA,cg[r+80+4>>2]=G,M=0|be(X^AA,M^G,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,k=0|aI(0|(b=0|aI(0|k,0|b,0|(D=0|be(l^(H=0|aI(0|(e=0|aI(0|d,0|v,0|gA,0|e)),0|hg,0|O,0|H)),D^(O=hg),32)),0|(l=hg))),0|(k=hg),0|(l=0|be(D^(O=0|aI(0|(O=0|aI(0|H,0|O,0|(v=0|be(d^b,v^k,24)),0|(d=hg))),0|hg,0|cg[E>>2],0|cg[E+4>>2])),l^(H=hg),16)),0|(D=hg)),b=hg,cg[r+88>>2]=k,cg[r+88+4>>2]=b,d=0|be(v^k,d^b,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,S=0|aI(0|c,0|o,0|W,0|S),W=0|cg[_>>2],e=0|cg[_+4>>2],gA=0|aI(0|(S=0|aI(0|S,0|hg,0|W,0|e)),0|(gA=hg),0|(o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^S,p^gA,32)),0|(n=hg))),o^(Q=hg),24)),0|(c=hg)),S=0|cg[N>>2],P=0|cg[N+4>>2],c=0|be(o^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^(gA=0|aI(0|gA,0|hg,0|S,0|P)),n^(rA=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,j=0|aI(0|(F=0|cg[r+32>>2]),0|(Y=0|cg[r+32+4>>2]),0|eA,0|j),eA=0|cg[J>>2],z=0|cg[J+4>>2],l=0|be((D=0|be(l^(e=0|aI(0|(tA=0|aI(0|IA,0|tA,0|(F=0|be((Y=0|be(F^(m=0|aI(0|K,0|m,0|(y=0|be(C^(j=0|aI(0|j,0|hg,0|eA,0|z)),y^(L=hg),32)),0|(C=hg))),Y^(K=hg),24))^(K=0|aI(0|m,0|K,0|(C=0|be(y^(L=0|aI(0|(L=0|aI(0|j,0|L,0|Y,0|(F=hg))),0|hg,0|cg[V>>2],0|cg[V+4>>2])),C^(j=hg),16)),0|(y=hg))),F^(m=hg),63)),0|(Y=hg))),0|hg,0|W,0|e)),D^(W=hg),32))^(z=0|aI(0|(W=0|aI(0|e,0|W,0|(Y=0|be(F^(f=0|aI(0|Q,0|f,0|D,0|(l=hg))),Y^(Q=hg),24)),0|(F=hg))),0|hg,0|eA,0|z)),l^(eA=hg),16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,Q=0|aI(0|f,0|Q,0|l,0|D),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,F=0|be(Y^Q,F^f,63),cg[r+32>>2]=F,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(H=0|aI(0|(H=0|aI(0|M,0|X,0|O,0|H)),0|hg,0|cg[s>>2],0|cg[s+4>>2])),p^(O=hg),32))^(P=0|aI(0|(O=0|aI(0|H,0|O,0|(X=0|be(M^(m=0|aI(0|K,0|m,0|p,0|(n=hg))),X^(K=hg),24)),0|(M=hg))),0|hg,0|S,0|P)),n^(S=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,K=0|aI(0|m,0|K,0|n,0|p),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,M=0|be(X^K,M^m,63),X=hg,C=0|be((y=0|be(C^(rA=0|aI(0|(rA=0|aI(0|d,0|v,0|gA,0|rA)),0|hg,0|cg[U>>2],0|cg[U+4>>2])),y^(gA=hg),32))^(gA=0|aI(0|(gA=0|aI(0|rA,0|gA,0|(v=0|be(d^(G=0|aI(0|AA,0|G,0|y,0|(C=hg))),v^(AA=hg),24)),0|(d=hg))),0|hg,0|cg[a>>2],0|cg[a+4>>2])),C^(rA=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,d=0|be(v^(AA=0|aI(0|G,0|AA,0|C,0|y)),d^(G=hg),63),v=hg,j=0|aI(0|(j=0|aI(0|c,0|o,0|L,0|j)),0|hg,0|cg[w>>2],0|cg[w+4>>2]),L=hg,c=0|be((o=0|be(c^(b=0|aI(0|k,0|b,0|(O=0|be(cg[r+120>>2]^j,cg[r+120+4>>2]^L,32)),0|(H=hg))),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(H=0|be(O^(L=0|aI(0|(L=0|aI(0|j,0|L,0|o,0|(c=hg))),0|hg,0|cg[q>>2],0|cg[q+4>>2])),H^(j=hg),16)),0|(O=hg))),c^(b=hg),63),o=hg,H=0|be((O=0|be(H^(eA=0|aI(0|(eA=0|aI(0|M,0|X,0|z,0|eA)),0|hg,0|cg[g>>2],0|cg[g+4>>2])),O^(z=hg),32))^(z=0|aI(0|(z=0|aI(0|eA,0|z,0|(X=0|be(M^(G=0|aI(0|AA,0|G,0|O,0|(H=hg))),X^(AA=hg),24)),0|(M=hg))),0|hg,0|cg[E>>2],0|cg[E+4>>2])),H^(eA=hg),16),O=hg,cg[r+120>>2]=H,cg[r+120+4>>2]=O,O=0|aI(0|G,0|AA,0|H,0|O),H=hg,cg[r+80>>2]=O,cg[r+80+4>>2]=H,M=0|be(X^O,M^H,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,S=0|aI(0|d,0|v,0|P,0|S),P=0|cg[h>>2],AA=0|cg[h+4>>2],G=0|aI(0|(S=0|aI(0|S,0|hg,0|P,0|AA)),0|(G=hg),0|(v=0|be(d^(b=0|aI(0|k,0|b,0|(D=0|be(l^S,D^G,32)),0|(l=hg))),v^(k=hg),24)),0|(d=hg)),S=0|cg[R>>2],F=0|cg[R+4>>2],k=0|aI(0|b,0|k,0|(l=0|be(D^(G=0|aI(0|G,0|hg,0|S,0|F)),l^(Y=hg),16)),0|(D=hg)),b=hg,cg[r+88>>2]=k,cg[r+88+4>>2]=b,d=0|be(v^k,d^b,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,rA=0|aI(0|c,0|o,0|gA,0|rA),gA=0|cg[V>>2],W=0|cg[V+4>>2],e=0|aI(0|(rA=0|aI(0|rA,0|hg,0|gA,0|W)),0|(e=hg),0|(o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^rA,p^e,32)),0|(n=hg))),o^(Q=hg),24)),0|(c=hg)),rA=0|cg[r+128>>2],tA=0|cg[r+128+4>>2],c=0|be(o^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^(e=0|aI(0|e,0|hg,0|rA,0|tA)),n^(IA=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,j=0|aI(0|(x=0|cg[r+32>>2]),0|(B=0|cg[r+32+4>>2]),0|L,0|j),L=0|cg[u>>2],Z=0|cg[u+4>>2],l=0|be((D=0|be(l^(eA=0|aI(0|(eA=0|aI(0|z,0|eA,0|(x=0|be((B=0|be(x^(m=0|aI(0|K,0|m,0|(y=0|be(C^(j=0|aI(0|j,0|hg,0|L,0|Z)),y^(T=hg),32)),0|(C=hg))),B^(K=hg),24))^(K=0|aI(0|m,0|K,0|(C=0|be(y^(T=0|aI(0|(T=0|aI(0|j,0|T,0|B,0|(x=hg))),0|hg,0|cg[I>>2],0|cg[I+4>>2])),C^(j=hg),16)),0|(y=hg))),x^(m=hg),63)),0|(B=hg))),0|hg,0|cg[J>>2],0|cg[J+4>>2])),D^(z=hg),32))^(tA=0|aI(0|(z=0|aI(0|eA,0|z,0|(B=0|be(x^(f=0|aI(0|Q,0|f,0|D,0|(l=hg))),B^(Q=hg),24)),0|(x=hg))),0|hg,0|rA,0|tA)),l^(rA=hg),16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,Q=0|aI(0|f,0|Q,0|l,0|D),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,x=0|be(B^Q,x^f,63),cg[r+32>>2]=x,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(AA=0|aI(0|(Y=0|aI(0|M,0|X,0|G,0|Y)),0|hg,0|P,0|AA)),p^(P=hg),32))^(P=0|aI(0|(P=0|aI(0|AA,0|P,0|(X=0|be(M^(m=0|aI(0|K,0|m,0|p,0|(n=hg))),X^(K=hg),24)),0|(M=hg))),0|hg,0|cg[_>>2],0|cg[_+4>>2])),n^(AA=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,K=0|aI(0|m,0|K,0|n,0|p),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,M=0|be(X^K,M^m,63),X=hg,C=0|be((y=0|be(C^(IA=0|aI(0|(IA=0|aI(0|d,0|v,0|e,0|IA)),0|hg,0|cg[g>>2],0|cg[g+4>>2])),y^(e=hg),32))^(W=0|aI(0|(e=0|aI(0|IA,0|e,0|(v=0|be(d^(H=0|aI(0|O,0|H,0|y,0|(C=hg))),v^(O=hg),24)),0|(d=hg))),0|hg,0|gA,0|W)),C^(gA=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,d=0|be(v^(O=0|aI(0|H,0|O,0|C,0|y)),d^(H=hg),63),v=hg,F=0|aI(0|(j=0|aI(0|c,0|o,0|T,0|j)),0|hg,0|S,0|F),S=hg,c=0|be((o=0|be(c^(b=0|aI(0|k,0|b,0|(j=0|be(cg[r+120>>2]^F,cg[r+120+4>>2]^S,32)),0|(T=hg))),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(T=0|be(j^(Z=0|aI(0|(S=0|aI(0|F,0|S,0|o,0|(c=hg))),0|hg,0|L,0|Z)),T^(L=hg),16)),0|(j=hg))),c^(b=hg),63),o=hg,T=0|be((j=0|be(T^(rA=0|aI(0|(rA=0|aI(0|M,0|X,0|tA,0|rA)),0|hg,0|cg[q>>2],0|cg[q+4>>2])),j^(tA=hg),32))^(tA=0|aI(0|(tA=0|aI(0|rA,0|tA,0|(X=0|be(M^(H=0|aI(0|O,0|H,0|j,0|(T=hg))),X^(O=hg),24)),0|(M=hg))),0|hg,0|cg[N>>2],0|cg[N+4>>2])),T^(rA=hg),16),j=hg,cg[r+120>>2]=T,cg[r+120+4>>2]=j,j=0|aI(0|H,0|O,0|T,0|j),T=hg,cg[r+80>>2]=j,cg[r+80+4>>2]=T,M=0|be(X^j,M^T,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,AA=0|aI(0|d,0|v,0|P,0|AA),P=0|cg[w>>2],O=0|cg[w+4>>2],H=0|aI(0|(AA=0|aI(0|AA,0|hg,0|P,0|O)),0|(H=hg),0|(v=0|be(d^(b=0|aI(0|k,0|b,0|(D=0|be(l^AA,D^H,32)),0|(l=hg))),v^(k=hg),24)),0|(d=hg)),AA=0|cg[a>>2],S=0|cg[a+4>>2],k=0|aI(0|b,0|k,0|(l=0|be(D^(H=0|aI(0|H,0|hg,0|AA,0|S)),l^(F=hg),16)),0|(D=hg)),b=hg,cg[r+88>>2]=k,cg[r+88+4>>2]=b,d=0|be(v^k,d^b,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,gA=0|aI(0|c,0|o,0|W,0|gA),W=0|cg[E>>2],e=0|cg[E+4>>2],IA=0|aI(0|(gA=0|aI(0|gA,0|hg,0|W,0|e)),0|(IA=hg),0|(o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^gA,p^IA,32)),0|(n=hg))),o^(Q=hg),24)),0|(c=hg)),gA=0|cg[I>>2],Y=0|cg[I+4>>2],c=0|be(o^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^(IA=0|aI(0|IA,0|hg,0|gA,0|Y)),n^(G=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,L=0|aI(0|(x=0|cg[r+32>>2]),0|(B=0|cg[r+32+4>>2]),0|Z,0|L),Z=0|cg[s>>2],z=0|cg[s+4>>2],eA=0|aI(0|(L=0|aI(0|L,0|hg,0|Z,0|z)),0|(eA=hg),0|(B=0|be(x^(m=0|aI(0|K,0|m,0|(y=0|be(C^L,y^eA,32)),0|(C=hg))),B^(K=hg),24)),0|(x=hg)),L=0|cg[U>>2],i=0|cg[U+4>>2],l=0|be((D=0|be(l^(rA=0|aI(0|(rA=0|aI(0|tA,0|rA,0|(x=0|be(B^(K=0|aI(0|m,0|K,0|(C=0|be(y^(eA=0|aI(0|eA,0|hg,0|L,0|i)),C^($=hg),16)),0|(y=hg))),x^(m=hg),63)),0|(B=hg))),0|hg,0|cg[g>>2],0|cg[g+4>>2])),D^(tA=hg),32))^(S=0|aI(0|(tA=0|aI(0|rA,0|tA,0|(B=0|be(x^(f=0|aI(0|Q,0|f,0|D,0|(l=hg))),B^(Q=hg),24)),0|(x=hg))),0|hg,0|AA,0|S)),l^(AA=hg),16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,Q=0|aI(0|f,0|Q,0|l,0|D),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,x=0|be(B^Q,x^f,63),cg[r+32>>2]=x,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(e=0|aI(0|(F=0|aI(0|M,0|X,0|H,0|F)),0|hg,0|W,0|e)),p^(W=hg),32))^(W=0|aI(0|(W=0|aI(0|e,0|W,0|(X=0|be(M^(m=0|aI(0|K,0|m,0|p,0|(n=hg))),X^(K=hg),24)),0|(M=hg))),0|hg,0|cg[R>>2],0|cg[R+4>>2])),n^(e=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,K=0|aI(0|m,0|K,0|n,0|p),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,M=0|be(X^K,M^m,63),X=hg,C=0|be((y=0|be(C^(G=0|aI(0|(G=0|aI(0|d,0|v,0|IA,0|G)),0|hg,0|cg[r+128>>2],0|cg[r+128+4>>2])),y^(IA=hg),32))^(O=0|aI(0|(IA=0|aI(0|G,0|IA,0|(v=0|be(d^(T=0|aI(0|j,0|T,0|y,0|(C=hg))),v^(j=hg),24)),0|(d=hg))),0|hg,0|P,0|O)),C^(P=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,d=0|be(v^(j=0|aI(0|T,0|j,0|C,0|y)),d^(T=hg),63),v=hg,Y=0|aI(0|($=0|aI(0|c,0|o,0|eA,0|$)),0|hg,0|gA,0|Y),gA=hg,c=0|be((o=0|be(c^(b=0|aI(0|k,0|b,0|($=0|be(cg[r+120>>2]^Y,cg[r+120+4>>2]^gA,32)),0|(eA=hg))),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(eA=0|be($^(z=0|aI(0|(gA=0|aI(0|Y,0|gA,0|o,0|(c=hg))),0|hg,0|Z,0|z)),eA^(Z=hg),16)),0|($=hg))),c^(b=hg),63),o=hg,eA=0|be(($=0|be(eA^(AA=0|aI(0|(AA=0|aI(0|M,0|X,0|S,0|AA)),0|hg,0|cg[V>>2],0|cg[V+4>>2])),$^(S=hg),32))^(i=0|aI(0|(S=0|aI(0|AA,0|S,0|(X=0|be(M^(T=0|aI(0|j,0|T,0|$,0|(eA=hg))),X^(j=hg),24)),0|(M=hg))),0|hg,0|L,0|i)),eA^(L=hg),16),$=hg,cg[r+120>>2]=eA,cg[r+120+4>>2]=$,$=0|aI(0|T,0|j,0|eA,0|$),eA=hg,cg[r+80>>2]=$,cg[r+80+4>>2]=eA,M=0|be(X^$,M^eA,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,W=0|aI(0|(e=0|aI(0|(e=0|aI(0|d,0|v,0|W,0|e)),0|hg,0|cg[_>>2],0|cg[_+4>>2])),0|(W=hg),0|(v=0|be(d^(b=0|aI(0|k,0|b,0|(D=0|be(l^e,D^W,32)),0|(l=hg))),v^(k=hg),24)),0|(d=hg)),e=0|cg[h>>2],j=0|cg[h+4>>2],k=0|aI(0|b,0|k,0|(l=0|be(D^(W=0|aI(0|W,0|hg,0|e,0|j)),l^(T=hg),16)),0|(D=hg)),b=hg,cg[r+88>>2]=k,cg[r+88+4>>2]=b,d=0|be(v^k,d^b,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,P=0|aI(0|c,0|o,0|O,0|P),O=0|cg[u>>2],S=0|cg[u+4>>2],AA=0|aI(0|(P=0|aI(0|P,0|hg,0|O,0|S)),0|(AA=hg),0|(o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^P,p^AA,32)),0|(n=hg))),o^(Q=hg),24)),0|(c=hg)),P=0|cg[q>>2],gA=0|cg[q+4>>2],c=0|be(o^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^(AA=0|aI(0|AA,0|hg,0|P,0|gA)),n^(Y=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,Z=0|aI(0|(IA=0|cg[r+32>>2]),0|(G=0|cg[r+32+4>>2]),0|z,0|Z),z=0|cg[N>>2],F=0|cg[N+4>>2],l=0|be((D=0|be(l^(L=0|aI(0|(L=0|aI(0|i,0|L,0|(IA=0|be((G=0|be(IA^(m=0|aI(0|K,0|m,0|(y=0|be(C^(Z=0|aI(0|Z,0|hg,0|z,0|F)),y^(H=hg),32)),0|(C=hg))),G^(K=hg),24))^(K=0|aI(0|m,0|K,0|(C=0|be(y^(H=0|aI(0|(H=0|aI(0|Z,0|H,0|G,0|(IA=hg))),0|hg,0|cg[J>>2],0|cg[J+4>>2])),C^(Z=hg),16)),0|(y=hg))),IA^(m=hg),63)),0|(G=hg))),0|hg,0|cg[a>>2],0|cg[a+4>>2])),D^(i=hg),32))^(j=0|aI(0|(i=0|aI(0|L,0|i,0|(G=0|be(IA^(f=0|aI(0|Q,0|f,0|D,0|(l=hg))),G^(Q=hg),24)),0|(IA=hg))),0|hg,0|e,0|j)),l^(e=hg),16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,Q=0|aI(0|f,0|Q,0|l,0|D),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,IA=0|be(G^Q,IA^f,63),cg[r+32>>2]=IA,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(F=0|aI(0|(T=0|aI(0|M,0|X,0|W,0|T)),0|hg,0|z,0|F)),p^(z=hg),32))^(S=0|aI(0|(z=0|aI(0|F,0|z,0|(X=0|be(M^(m=0|aI(0|K,0|m,0|p,0|(n=hg))),X^(K=hg),24)),0|(M=hg))),0|hg,0|O,0|S)),n^(O=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,K=0|aI(0|m,0|K,0|n,0|p),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,M=0|be(X^K,M^m,63),X=hg,P=0|aI(0|(gA=0|aI(0|(Y=0|aI(0|d,0|v,0|AA,0|Y)),0|hg,0|P,0|gA)),0|(P=hg),0|(v=0|be(d^(eA=0|aI(0|$,0|eA,0|(y=0|be(C^gA,y^P,32)),0|(C=hg))),v^($=hg),24)),0|(d=hg)),gA=0|cg[U>>2],Y=0|cg[U+4>>2],C=0|be(y^(P=0|aI(0|P,0|hg,0|gA,0|Y)),C^(AA=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,d=0|be(v^($=0|aI(0|eA,0|$,0|C,0|y)),d^(eA=hg),63),v=hg,Z=0|aI(0|(Z=0|aI(0|c,0|o,0|H,0|Z)),0|hg,0|cg[V>>2],0|cg[V+4>>2]),H=hg,c=0|be((o=0|be(c^(b=0|aI(0|k,0|b,0|(z=0|be(cg[r+120>>2]^Z,cg[r+120+4>>2]^H,32)),0|(F=hg))),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(F=0|be(z^(H=0|aI(0|(H=0|aI(0|Z,0|H,0|o,0|(c=hg))),0|hg,0|cg[R>>2],0|cg[R+4>>2])),F^(Z=hg),16)),0|(z=hg))),c^(b=hg),63),o=hg,j=0|aI(0|(e=0|aI(0|(e=0|aI(0|M,0|X,0|j,0|e)),0|hg,0|cg[r+128>>2],0|cg[r+128+4>>2])),0|(j=hg),0|(X=0|be(M^(eA=0|aI(0|$,0|eA,0|(z=0|be(F^e,z^j,32)),0|(F=hg))),X^($=hg),24)),0|(M=hg)),e=0|cg[_>>2],T=0|cg[_+4>>2],F=0|be(z^(j=0|aI(0|j,0|hg,0|e,0|T)),F^(W=hg),16),z=hg,cg[r+120>>2]=F,cg[r+120+4>>2]=z,z=0|aI(0|eA,0|$,0|F,0|z),F=hg,cg[r+80>>2]=z,cg[r+80+4>>2]=F,M=0|be(X^z,M^F,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,S=0|aI(0|(O=0|aI(0|(O=0|aI(0|d,0|v,0|S,0|O)),0|hg,0|cg[E>>2],0|cg[E+4>>2])),0|(S=hg),0|(v=0|be(d^(b=0|aI(0|k,0|b,0|(D=0|be(l^O,D^S,32)),0|(l=hg))),v^(k=hg),24)),0|(d=hg)),O=0|cg[s>>2],$=0|cg[s+4>>2],k=0|aI(0|b,0|k,0|(l=0|be(D^(S=0|aI(0|S,0|hg,0|O,0|$)),l^(eA=hg),16)),0|(D=hg)),b=hg,cg[r+88>>2]=k,cg[r+88+4>>2]=b,d=0|be(v^k,d^b,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,AA=0|aI(0|c,0|o,0|P,0|AA),P=0|cg[J>>2],IA=0|cg[J+4>>2],c=0|be((o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^(AA=0|aI(0|AA,0|hg,0|P,0|IA)),p^(G=hg),32)),0|(n=hg))),o^(Q=hg),24))^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^(G=0|aI(0|(G=0|aI(0|AA,0|G,0|o,0|(c=hg))),0|hg,0|cg[g>>2],0|cg[g+4>>2])),n^(AA=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,H=0|aI(0|(Z=0|aI(0|(Z=0|aI(0|(i=0|cg[r+32>>2]),0|(L=0|cg[r+32+4>>2]),0|H,0|Z)),0|hg,0|cg[I>>2],0|cg[I+4>>2])),0|(H=hg),0|(L=0|be(i^(m=0|aI(0|K,0|m,0|(y=0|be(C^Z,y^H,32)),0|(C=hg))),L^(K=hg),24)),0|(i=hg)),Z=0|cg[w>>2],x=0|cg[w+4>>2],l=0|be((D=0|be(l^(Y=0|aI(0|(W=0|aI(0|j,0|W,0|(i=0|be(L^(K=0|aI(0|m,0|K,0|(C=0|be(y^(H=0|aI(0|H,0|hg,0|Z,0|x)),C^(B=hg),16)),0|(y=hg))),i^(m=hg),63)),0|(L=hg))),0|hg,0|gA,0|Y)),D^(gA=hg),32))^(x=0|aI(0|(gA=0|aI(0|Y,0|gA,0|(L=0|be(i^(f=0|aI(0|Q,0|f,0|D,0|(l=hg))),L^(Q=hg),24)),0|(i=hg))),0|hg,0|Z,0|x)),l^(Z=hg),16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,Q=0|aI(0|f,0|Q,0|l,0|D),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,i=0|be(L^Q,i^f,63),cg[r+32>>2]=i,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(T=0|aI(0|(eA=0|aI(0|M,0|X,0|S,0|eA)),0|hg,0|e,0|T)),p^(e=hg),32))^(e=0|aI(0|(e=0|aI(0|T,0|e,0|(X=0|be(M^(m=0|aI(0|K,0|m,0|p,0|(n=hg))),X^(K=hg),24)),0|(M=hg))),0|hg,0|cg[q>>2],0|cg[q+4>>2])),n^(T=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,K=0|aI(0|m,0|K,0|n,0|p),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,M=0|be(X^K,M^m,63),X=hg,C=0|be((y=0|be(C^(AA=0|aI(0|(AA=0|aI(0|d,0|v,0|G,0|AA)),0|hg,0|cg[a>>2],0|cg[a+4>>2])),y^(G=hg),32))^(G=0|aI(0|(G=0|aI(0|AA,0|G,0|(v=0|be(d^(F=0|aI(0|z,0|F,0|y,0|(C=hg))),v^(z=hg),24)),0|(d=hg))),0|hg,0|cg[N>>2],0|cg[N+4>>2])),C^(AA=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,d=0|be(v^(z=0|aI(0|F,0|z,0|C,0|y)),d^(F=hg),63),v=hg,$=0|aI(0|(B=0|aI(0|c,0|o,0|H,0|B)),0|hg,0|O,0|$),O=hg,c=0|be((o=0|be(c^(b=0|aI(0|k,0|b,0|(B=0|be(cg[r+120>>2]^$,cg[r+120+4>>2]^O,32)),0|(H=hg))),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(H=0|be(B^(IA=0|aI(0|(O=0|aI(0|$,0|O,0|o,0|(c=hg))),0|hg,0|P,0|IA)),H^(P=hg),16)),0|(B=hg))),c^(b=hg),63),o=hg,H=0|be((B=0|be(H^(Z=0|aI(0|(Z=0|aI(0|M,0|X,0|x,0|Z)),0|hg,0|cg[h>>2],0|cg[h+4>>2])),B^(x=hg),32))^(x=0|aI(0|(x=0|aI(0|Z,0|x,0|(X=0|be(M^(F=0|aI(0|z,0|F,0|B,0|(H=hg))),X^(z=hg),24)),0|(M=hg))),0|hg,0|cg[r+128>>2],0|cg[r+128+4>>2])),H^(Z=hg),16),B=hg,cg[r+120>>2]=H,cg[r+120+4>>2]=B,B=0|aI(0|F,0|z,0|H,0|B),H=hg,cg[r+80>>2]=B,cg[r+80+4>>2]=H,M=0|be(X^B,M^H,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,T=0|aI(0|d,0|v,0|e,0|T),e=0|cg[u>>2],z=0|cg[u+4>>2],k=0|aI(0|(b=0|aI(0|k,0|b,0|(D=0|be(l^(T=0|aI(0|T,0|hg,0|e,0|z)),D^(F=hg),32)),0|(l=hg))),0|(k=hg),0|(l=0|be(D^(F=0|aI(0|(F=0|aI(0|T,0|F,0|(v=0|be(d^b,v^k,24)),0|(d=hg))),0|hg,0|cg[V>>2],0|cg[V+4>>2])),l^(T=hg),16)),0|(D=hg)),b=hg,cg[r+88>>2]=k,cg[r+88+4>>2]=b,d=0|be(v^k,d^b,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,AA=0|aI(0|c,0|o,0|G,0|AA),G=0|cg[I>>2],O=0|cg[I+4>>2],$=0|aI(0|(AA=0|aI(0|AA,0|hg,0|G,0|O)),0|($=hg),0|(o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^AA,p^$,32)),0|(n=hg))),o^(Q=hg),24)),0|(c=hg)),AA=0|cg[E>>2],eA=0|cg[E+4>>2],c=0|be(o^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^($=0|aI(0|$,0|hg,0|AA,0|eA)),n^(S=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,P=0|aI(0|(i=0|cg[r+32>>2]),0|(L=0|cg[r+32+4>>2]),0|IA,0|P),IA=0|cg[g>>2],gA=0|cg[g+4>>2],l=0|be((D=0|be(l^(eA=0|aI(0|(Z=0|aI(0|x,0|Z,0|(i=0|be((L=0|be(i^(m=0|aI(0|K,0|m,0|(y=0|be(C^(P=0|aI(0|P,0|hg,0|IA,0|gA)),y^(Y=hg),32)),0|(C=hg))),L^(K=hg),24))^(K=0|aI(0|m,0|K,0|(C=0|be(y^(Y=0|aI(0|(Y=0|aI(0|P,0|Y,0|L,0|(i=hg))),0|hg,0|cg[R>>2],0|cg[R+4>>2])),C^(P=hg),16)),0|(y=hg))),i^(m=hg),63)),0|(L=hg))),0|hg,0|AA,0|eA)),D^(AA=hg),32))^(z=0|aI(0|(AA=0|aI(0|eA,0|AA,0|(L=0|be(i^(f=0|aI(0|Q,0|f,0|D,0|(l=hg))),L^(Q=hg),24)),0|(i=hg))),0|hg,0|e,0|z)),l^(e=hg),16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,Q=0|aI(0|f,0|Q,0|l,0|D),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,i=0|be(L^Q,i^f,63),cg[r+32>>2]=i,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(T=0|aI(0|(T=0|aI(0|M,0|X,0|F,0|T)),0|hg,0|cg[q>>2],0|cg[q+4>>2])),p^(F=hg),32))^(F=0|aI(0|(F=0|aI(0|T,0|F,0|(X=0|be(M^(m=0|aI(0|K,0|m,0|p,0|(n=hg))),X^(K=hg),24)),0|(M=hg))),0|hg,0|cg[J>>2],0|cg[J+4>>2])),n^(T=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,K=0|aI(0|m,0|K,0|n,0|p),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,M=0|be(X^K,M^m,63),X=hg,C=0|be((y=0|be(C^(S=0|aI(0|(S=0|aI(0|d,0|v,0|$,0|S)),0|hg,0|cg[w>>2],0|cg[w+4>>2])),y^($=hg),32))^($=0|aI(0|($=0|aI(0|S,0|$,0|(v=0|be(d^(H=0|aI(0|B,0|H,0|y,0|(C=hg))),v^(B=hg),24)),0|(d=hg))),0|hg,0|cg[s>>2],0|cg[s+4>>2])),C^(S=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,d=0|be(v^(B=0|aI(0|H,0|B,0|C,0|y)),d^(H=hg),63),v=hg,P=0|aI(0|(P=0|aI(0|c,0|o,0|Y,0|P)),0|hg,0|cg[r+128>>2],0|cg[r+128+4>>2]),Y=hg,c=0|be((o=0|be(c^(b=0|aI(0|k,0|b,0|(i=0|be(cg[r+120>>2]^P,cg[r+120+4>>2]^Y,32)),0|(L=hg))),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(L=0|be(i^(O=0|aI(0|(Y=0|aI(0|P,0|Y,0|o,0|(c=hg))),0|hg,0|G,0|O)),L^(G=hg),16)),0|(i=hg))),c^(b=hg),63),o=hg,L=0|be((i=0|be(L^(e=0|aI(0|(e=0|aI(0|M,0|X,0|z,0|e)),0|hg,0|cg[a>>2],0|cg[a+4>>2])),i^(z=hg),32))^(gA=0|aI(0|(z=0|aI(0|e,0|z,0|(X=0|be(M^(H=0|aI(0|B,0|H,0|i,0|(L=hg))),X^(B=hg),24)),0|(M=hg))),0|hg,0|IA,0|gA)),L^(IA=hg),16),i=hg,cg[r+120>>2]=L,cg[r+120+4>>2]=i,i=0|aI(0|H,0|B,0|L,0|i),L=hg,cg[r+80>>2]=i,cg[r+80+4>>2]=L,M=0|be(X^i,M^L,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,F=0|aI(0|(T=0|aI(0|(T=0|aI(0|d,0|v,0|F,0|T)),0|hg,0|cg[U>>2],0|cg[U+4>>2])),0|(F=hg),0|(v=0|be(d^(b=0|aI(0|k,0|b,0|(D=0|be(l^T,D^F,32)),0|(l=hg))),v^(k=hg),24)),0|(d=hg)),T=0|cg[_>>2],B=0|cg[_+4>>2],k=0|aI(0|b,0|k,0|(l=0|be(D^(F=0|aI(0|F,0|hg,0|T,0|B)),l^(H=hg),16)),0|(D=hg)),b=hg,cg[r+88>>2]=k,cg[r+88+4>>2]=b,d=0|be(v^k,d^b,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,S=0|aI(0|c,0|o,0|$,0|S),$=0|cg[N>>2],z=0|cg[N+4>>2],e=0|aI(0|(S=0|aI(0|S,0|hg,0|$,0|z)),0|(e=hg),0|(o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^S,p^e,32)),0|(n=hg))),o^(Q=hg),24)),0|(c=hg)),S=0|cg[V>>2],Y=0|cg[V+4>>2],c=0|be(o^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^(e=0|aI(0|e,0|hg,0|S,0|Y)),n^(P=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,G=0|aI(0|(AA=0|cg[r+32>>2]),0|(eA=0|cg[r+32+4>>2]),0|O,0|G),O=0|cg[R>>2],Z=0|cg[R+4>>2],x=0|aI(0|(G=0|aI(0|G,0|hg,0|O,0|Z)),0|(x=hg),0|(eA=0|be(AA^(m=0|aI(0|K,0|m,0|(y=0|be(C^G,y^x,32)),0|(C=hg))),eA^(K=hg),24)),0|(AA=hg)),G=0|cg[h>>2],W=0|cg[h+4>>2],l=0|be((D=0|be(l^(Z=0|aI(0|(IA=0|aI(0|gA,0|IA,0|(AA=0|be(eA^(K=0|aI(0|m,0|K,0|(C=0|be(y^(x=0|aI(0|x,0|hg,0|G,0|W)),C^(j=hg),16)),0|(y=hg))),AA^(m=hg),63)),0|(eA=hg))),0|hg,0|O,0|Z)),D^(O=hg),32))^(O=0|aI(0|(O=0|aI(0|Z,0|O,0|(eA=0|be(AA^(f=0|aI(0|Q,0|f,0|D,0|(l=hg))),eA^(Q=hg),24)),0|(AA=hg))),0|hg,0|cg[g>>2],0|cg[g+4>>2])),l^(Z=hg),16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,Q=0|aI(0|f,0|Q,0|l,0|D),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,AA=0|be(eA^Q,AA^f,63),cg[r+32>>2]=AA,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(H=0|aI(0|(H=0|aI(0|M,0|X,0|F,0|H)),0|hg,0|cg[I>>2],0|cg[I+4>>2])),p^(F=hg),32))^(Y=0|aI(0|(F=0|aI(0|H,0|F,0|(X=0|be(M^(m=0|aI(0|K,0|m,0|p,0|(n=hg))),X^(K=hg),24)),0|(M=hg))),0|hg,0|S,0|Y)),n^(S=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,K=0|aI(0|m,0|K,0|n,0|p),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,M=0|be(X^K,M^m,63),X=hg,C=0|be((y=0|be(C^(B=0|aI(0|(P=0|aI(0|d,0|v,0|e,0|P)),0|hg,0|T,0|B)),y^(T=hg),32))^(T=0|aI(0|(T=0|aI(0|B,0|T,0|(v=0|be(d^(L=0|aI(0|i,0|L,0|y,0|(C=hg))),v^(i=hg),24)),0|(d=hg))),0|hg,0|cg[E>>2],0|cg[E+4>>2])),C^(B=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,d=0|be(v^(i=0|aI(0|L,0|i,0|C,0|y)),d^(L=hg),63),v=hg,z=0|aI(0|(j=0|aI(0|c,0|o,0|x,0|j)),0|hg,0|$,0|z),$=hg,c=0|be((o=0|be(c^(b=0|aI(0|k,0|b,0|(j=0|be(cg[r+120>>2]^z,cg[r+120+4>>2]^$,32)),0|(x=hg))),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(x=0|be(j^(W=0|aI(0|($=0|aI(0|z,0|$,0|o,0|(c=hg))),0|hg,0|G,0|W)),x^(G=hg),16)),0|(j=hg))),c^(b=hg),63),o=hg,x=0|be((j=0|be(x^(Z=0|aI(0|(Z=0|aI(0|M,0|X,0|O,0|Z)),0|hg,0|cg[u>>2],0|cg[u+4>>2])),j^(O=hg),32))^(O=0|aI(0|(O=0|aI(0|Z,0|O,0|(X=0|be(M^(L=0|aI(0|i,0|L,0|j,0|(x=hg))),X^(i=hg),24)),0|(M=hg))),0|hg,0|cg[w>>2],0|cg[w+4>>2])),x^(Z=hg),16),j=hg,cg[r+120>>2]=x,cg[r+120+4>>2]=j,j=0|aI(0|L,0|i,0|x,0|j),x=hg,cg[r+80>>2]=j,cg[r+80+4>>2]=x,M=0|be(X^j,M^x,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,k=0|aI(0|(b=0|aI(0|k,0|b,0|(D=0|be(l^(S=0|aI(0|(S=0|aI(0|d,0|v,0|Y,0|S)),0|hg,0|cg[J>>2],0|cg[J+4>>2])),D^(Y=hg),32)),0|(l=hg))),0|(k=hg),0|(l=0|be(D^(Y=0|aI(0|(Y=0|aI(0|S,0|Y,0|(v=0|be(d^b,v^k,24)),0|(d=hg))),0|hg,0|cg[q>>2],0|cg[q+4>>2])),l^(S=hg),16)),0|(D=hg)),b=hg,cg[r+88>>2]=k,cg[r+88+4>>2]=b,d=0|be(v^k,d^b,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,B=0|aI(0|c,0|o,0|T,0|B),T=0|cg[s>>2],i=0|cg[s+4>>2],c=0|be((o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^(B=0|aI(0|B,0|hg,0|T,0|i)),p^(L=hg),32)),0|(n=hg))),o^(Q=hg),24))^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^(L=0|aI(0|(L=0|aI(0|B,0|L,0|o,0|(c=hg))),0|hg,0|cg[a>>2],0|cg[a+4>>2])),n^(B=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,W=0|aI(0|(G=0|aI(0|(G=0|aI(0|($=0|cg[r+32>>2]),0|(z=0|cg[r+32+4>>2]),0|W,0|G)),0|hg,0|cg[U>>2],0|cg[U+4>>2])),0|(W=hg),0|(z=0|be($^(m=0|aI(0|K,0|m,0|(y=0|be(C^G,y^W,32)),0|(C=hg))),z^(K=hg),24)),0|($=hg)),G=0|cg[r+128>>2],P=0|cg[r+128+4>>2],l=0|be((D=0|be(l^(P=0|aI(0|(Z=0|aI(0|O,0|Z,0|($=0|be(z^(K=0|aI(0|m,0|K,0|(C=0|be(y^(W=0|aI(0|W,0|hg,0|G,0|P)),C^(e=hg),16)),0|(y=hg))),$^(m=hg),63)),0|(z=hg))),0|hg,0|G,0|P)),D^(G=hg),32))^(G=0|aI(0|(G=0|aI(0|P,0|G,0|(z=0|be($^(f=0|aI(0|Q,0|f,0|D,0|(l=hg))),z^(Q=hg),24)),0|($=hg))),0|hg,0|cg[N>>2],0|cg[N+4>>2])),l^(P=hg),16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,Q=0|aI(0|f,0|Q,0|l,0|D),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,$=0|be(z^Q,$^f,63),cg[r+32>>2]=$,cg[r+32+4>>2]=hg,n=0|be((p=0|be(n^(S=0|aI(0|(S=0|aI(0|M,0|X,0|Y,0|S)),0|hg,0|cg[g>>2],0|cg[g+4>>2])),p^(Y=hg),32))^(i=0|aI(0|(Y=0|aI(0|S,0|Y,0|(X=0|be(M^(m=0|aI(0|K,0|m,0|p,0|(n=hg))),X^(K=hg),24)),0|(M=hg))),0|hg,0|T,0|i)),n^(T=hg),16),p=hg,cg[r+104>>2]=n,cg[r+104+4>>2]=p,K=0|aI(0|m,0|K,0|n,0|p),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,M=0|be(X^K,M^m,63),X=hg,C=0|be((y=0|be(C^(B=0|aI(0|(B=0|aI(0|d,0|v,0|L,0|B)),0|hg,0|cg[V>>2],0|cg[V+4>>2])),y^(L=hg),32))^(L=0|aI(0|(L=0|aI(0|B,0|L,0|(v=0|be(d^(x=0|aI(0|j,0|x,0|y,0|(C=hg))),v^(j=hg),24)),0|(d=hg))),0|hg,0|cg[h>>2],0|cg[h+4>>2])),C^(B=hg),16),y=hg,cg[r+112>>2]=C,cg[r+112+4>>2]=y,d=0|be(v^(j=0|aI(0|x,0|j,0|C,0|y)),d^(x=hg),63),v=hg,e=0|aI(0|(e=0|aI(0|c,0|o,0|W,0|e)),0|hg,0|cg[E>>2],0|cg[E+4>>2]),W=hg,c=0|be((o=0|be(c^(b=0|aI(0|k,0|b,0|(Y=0|be(cg[r+120>>2]^e,cg[r+120+4>>2]^W,32)),0|(S=hg))),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(S=0|be(Y^(W=0|aI(0|(W=0|aI(0|e,0|W,0|o,0|(c=hg))),0|hg,0|cg[_>>2],0|cg[_+4>>2])),S^(e=hg),16)),0|(Y=hg))),c^(b=hg),63),o=hg,P=0|aI(0|M,0|X,0|G,0|P),G=0|cg[I>>2],I=0|cg[I+4>>2],$=0|aI(0|(P=0|aI(0|P,0|hg,0|G,0|I)),0|($=hg),0|(X=0|be(M^(x=0|aI(0|j,0|x,0|(Y=0|be(S^P,Y^$,32)),0|(S=hg))),X^(j=hg),24)),0|(M=hg)),P=0|cg[J>>2],J=0|cg[J+4>>2],S=0|be(Y^($=0|aI(0|$,0|hg,0|P,0|J)),S^(z=hg),16),Y=hg,cg[r+120>>2]=S,cg[r+120+4>>2]=Y,Y=0|aI(0|x,0|j,0|S,0|Y),S=hg,cg[r+80>>2]=Y,cg[r+80+4>>2]=S,M=0|be(X^Y,M^S,63),X=hg,cg[r+40>>2]=M,cg[r+40+4>>2]=X,T=0|aI(0|d,0|v,0|i,0|T),i=0|cg[R>>2],R=0|cg[R+4>>2],k=0|aI(0|(b=0|aI(0|k,0|b,0|(D=0|be(l^(T=0|aI(0|T,0|hg,0|i,0|R)),D^(j=hg),32)),0|(l=hg))),0|(k=hg),0|(l=0|be(D^(j=0|aI(0|(j=0|aI(0|T,0|j,0|(v=0|be(d^b,v^k,24)),0|(d=hg))),0|hg,0|cg[w>>2],0|cg[w+4>>2])),l^(T=hg),16)),0|(D=hg)),b=hg,cg[r+88>>2]=k,cg[r+88+4>>2]=b,d=0|be(v^k,d^b,63),v=hg,cg[r+48>>2]=d,cg[r+48+4>>2]=v,L=0|aI(0|(B=0|aI(0|(B=0|aI(0|c,0|o,0|L,0|B)),0|hg,0|cg[a>>2],0|cg[a+4>>2])),0|(L=hg),0|(o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^B,p^L,32)),0|(n=hg))),o^(Q=hg),24)),0|(c=hg)),B=0|cg[U>>2],U=0|cg[U+4>>2],c=0|be(o^(Q=0|aI(0|f,0|Q,0|(n=0|be(p^(L=0|aI(0|L,0|hg,0|B,0|U)),n^(x=hg),16)),0|(p=hg))),c^(f=hg),63),o=hg,cg[r+56>>2]=c,cg[r+56+4>>2]=o,e=0|aI(0|(Z=0|cg[r+32>>2]),0|(O=0|cg[r+32+4>>2]),0|W,0|e),W=0|cg[q>>2],q=0|cg[q+4>>2],F=0|aI(0|(e=0|aI(0|e,0|hg,0|W,0|q)),0|(F=hg),0|(O=0|be(Z^(m=0|aI(0|K,0|m,0|(y=0|be(C^e,y^F,32)),0|(C=hg))),O^(K=hg),24)),0|(Z=hg)),e=0|cg[u>>2],u=0|cg[u+4>>2],Q=0|aI(0|(f=0|aI(0|Q,0|f,0|(D=0|be(l^(q=0|aI(0|(z=0|aI(0|$,0|z,0|(Z=0|be(O^(K=0|aI(0|m,0|K,0|(C=0|be(y^(F=0|aI(0|F,0|hg,0|e,0|u)),C^(H=hg),16)),0|(y=hg))),Z^(m=hg),63)),0|(O=hg))),0|hg,0|W,0|q)),D^(W=hg),32)),0|(l=hg))),0|(Q=hg),0|(l=0|be(D^(R=0|aI(0|(W=0|aI(0|q,0|W,0|(O=0|be(Z^f,O^Q,24)),0|(Z=hg))),0|hg,0|i,0|R)),l^(i=hg),16)),0|(D=hg)),f=hg,cg[r+64>>2]=Q,cg[r+64+4>>2]=f,Z=0|be(O^Q,Z^f,63),cg[r+32>>2]=Z,cg[r+32+4>>2]=hg,K=0|aI(0|(m=0|aI(0|K,0|m,0|(p=0|be(n^(V=0|aI(0|(T=0|aI(0|M,0|X,0|j,0|T)),0|hg,0|cg[V>>2],0|cg[V+4>>2])),p^(T=hg),32)),0|(n=hg))),0|(K=hg),0|(n=0|be(p^(I=0|aI(0|(T=0|aI(0|V,0|T,0|(X=0|be(M^m,X^K,24)),0|(M=hg))),0|hg,0|G,0|I)),n^(G=hg),16)),0|(p=hg)),m=hg,cg[r+72>>2]=K,cg[r+72+4>>2]=m,m=0|be(X^K,M^m,63),M=hg,d=0|be((v=0|be(d^(S=0|aI(0|Y,0|S,0|(y=0|be(C^(J=0|aI(0|(x=0|aI(0|d,0|v,0|L,0|x)),0|hg,0|P,0|J)),y^(P=hg),32)),0|(C=hg))),v^(Y=hg),24))^(Y=0|aI(0|S,0|Y,0|(C=0|be(y^(u=0|aI(0|(P=0|aI(0|J,0|P,0|v,0|(d=hg))),0|hg,0|e,0|u)),C^(e=hg),16)),0|(y=hg))),d^(S=hg),63),v=hg,U=0|aI(0|(H=0|aI(0|c,0|o,0|F,0|H)),0|hg,0|B,0|U),B=hg,c=0|be((o=0|be(c^(b=0|aI(0|k,0|b,0|(H=0|be(cg[r+120>>2]^U,cg[r+120+4>>2]^B,32)),0|(F=hg))),o^(k=hg),24))^(k=0|aI(0|b,0|k,0|(F=0|be(H^(E=0|aI(0|(B=0|aI(0|U,0|B,0|o,0|(c=hg))),0|hg,0|cg[E>>2],0|cg[E+4>>2])),F^(B=hg),16)),0|(H=hg))),c^(b=hg),63),o=hg,a=0|aI(0|(i=0|aI(0|(N=0|aI(0|(i=0|aI(0|m,0|M,0|R,0|i)),0|hg,0|cg[N>>2],0|cg[N+4>>2])),0|(i=hg),0|(M=0|be(m^(S=0|aI(0|Y,0|S,0|(H=0|be(F^N,H^i,32)),0|(F=hg))),M^(Y=hg),24)),0|(m=hg))),0|hg,0|cg[a>>2],0|cg[a+4>>2]),i=hg,cg[r>>2]=a,cg[r+4>>2]=i,F=0|be(H^a,F^i,16),H=hg,cg[r+120>>2]=F,cg[r+120+4>>2]=H,H=0|aI(0|S,0|Y,0|F,0|H),F=hg,cg[r+80>>2]=H,cg[r+80+4>>2]=F,F=0|be(M^H,m^F,63),cg[r+40>>2]=F,cg[r+40+4>>2]=hg,g=0|aI(0|(I=0|aI(0|(G=0|aI(0|(G=0|aI(0|d,0|v,0|I,0|G)),0|hg,0|cg[r+128>>2],0|cg[r+128+4>>2])),0|(I=hg),0|(v=0|be(d^(b=0|aI(0|k,0|b,0|(D=0|be(l^G,D^I,32)),0|(l=hg))),v^(k=hg),24)),0|(d=hg))),0|hg,0|cg[g>>2],0|cg[g+4>>2]),I=hg,cg[r+8>>2]=g,cg[r+8+4>>2]=I,l=0|be(D^g,l^I,16),D=hg,cg[r+96>>2]=l,cg[r+96+4>>2]=D,D=0|aI(0|b,0|k,0|l,0|D),l=hg,cg[r+88>>2]=D,cg[r+88+4>>2]=l,l=0|be(v^D,d^l,63),cg[r+48>>2]=l,cg[r+48+4>>2]=hg,_=0|aI(0|(e=0|aI(0|(w=0|aI(0|(e=0|aI(0|c,0|o,0|u,0|e)),0|hg,0|cg[w>>2],0|cg[w+4>>2])),0|(e=hg),0|(o=0|be(c^(f=0|aI(0|Q,0|f,0|(p=0|be(n^w,p^e,32)),0|(n=hg))),o^(Q=hg),24)),0|(c=hg))),0|hg,0|cg[_>>2],0|cg[_+4>>2]),e=hg,cg[r+16>>2]=_,cg[r+16+4>>2]=e,e=0|be(p^_,n^e,16),n=hg,cg[r+104>>2]=e,cg[r+104+4>>2]=n,n=0|aI(0|f,0|Q,0|e,0|n),e=hg,cg[r+64>>2]=n,cg[r+64+4>>2]=e,c=0|be(o^n,c^e,63),cg[r+56>>2]=c,cg[r+56+4>>2]=hg,y=0|be(C^(h=0|aI(0|(B=0|aI(0|(c=0|cg[r+32>>2]),0|(o=0|cg[r+32+4>>2]),0|E,0|B)),0|hg,0|cg[h>>2],0|cg[h+4>>2])),y^(B=hg),32),C=hg,s=0|aI(0|(B=0|aI(0|h,0|B,0|(o=0|be(c^(E=0|aI(0|cg[r+72>>2],0|cg[r+72+4>>2],0|y,0|C)),o^(Q=hg),24)),0|(c=hg))),0|hg,0|cg[s>>2],0|cg[s+4>>2]),B=hg,cg[r+24>>2]=s,cg[r+24+4>>2]=B,B=0|be(y^s,C^B,16),C=hg,cg[r+112>>2]=B,cg[r+112+4>>2]=C,C=0|aI(0|E,0|Q,0|B,0|C),B=hg,cg[r+72>>2]=C,cg[r+72+4>>2]=B,B=0|be(o^C,c^B,63),cg[r+32>>2]=B,cg[r+32+4>>2]=hg,e=i^cg[A+4>>2]^e,cg[A>>2]=a^cg[A>>2]^n,cg[A+4>>2]=e,e=1;;){if(rA=A+(e<<3)|0,tA=r+(e+8<<3)|0,I=I^cg[rA+4>>2]^cg[tA+4>>2],cg[rA>>2]=g^cg[rA>>2]^cg[tA>>2],cg[rA+4>>2]=I,8==(0|(I=e+1|0)))break;e=I,g=0|cg[r+(I<<3)>>2],I=0|cg[r+(I<<3)+4>>2]}Qg=t}function t(A,e,I,g){A|=0,I|=0,g|=0;var t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0,Y=0,S=0,N=0,R=0,U=0,P=0,J=0,x=0,L=0,K=0,X=0,T=0,V=0,j=0,Z=0,O=0,W=0,q=0,z=0,$=0,AA=0,eA=0,IA=0,gA=0,tA=0,rA=0,nA=0,aA=0,iA=0,BA=0,cA=0,CA=0,oA=0,QA=0,EA=0,sA=0,yA=0,hA=0,fA=0,_A=0,pA=0,wA=0,uA=0,lA=0,dA=0,DA=0,vA=0,kA=0,bA=0,GA=0,FA=0,mA=0,HA=0,MA=0,YA=0,SA=0,NA=0,RA=0,UA=0,PA=0,JA=0,xA=0,LA=0,KA=0,XA=0,TA=0,VA=0,jA=0,ZA=0,OA=0,WA=0,qA=0,$A=0,Ae=0,ee=0,Ie=0,ge=0,te=0,re=0,ne=0,ae=0,ie=0,Be=0,ce=0,Ce=0,oe=0,Qe=0,Ee=0,se=0,ye=0,he=0,fe=0,_e=0,pe=0,we=0,ue=0,le=0,de=0,De=0,ke=0,be=0,Ge=0,me=0,He=0,Ye=0,Se=0,Ne=0,Re=0,Ue=0,Pe=0,Je=0,xe=0,Le=0,Ke=0,Xe=0,Te=0,Ve=0,je=0,We=0,qe=0,ze=0,$e=0,AI=0,eI=0,II=0,gI=0,tI=0,nI=0,iI=0,BI=0,cI=0,CI=0,oI=0,QI=0,EI=0,sI=0,yI=0,hI=0,fI=0,_I=0,pI=0,wI=0,uI=0;OA=0|Me(0|Bg[(e|=0)>>0],0|Bg[e+1>>0],0|Bg[e+2>>0]),oe=0|Oe(0|(oe=0|zA(e+2|0)),0|hg,5),d=0|Oe(0|(d=0|Me(0|Bg[e+5>>0],0|Bg[e+6>>0],0|Bg[e+7>>0])),0|hg,2),Be=0|Oe(0|(Be=0|zA(e+7|0)),0|hg,7),c=0|Oe(0|(c=0|zA(e+10|0)),0|hg,4),M=0|Oe(0|(M=0|Me(0|Bg[e+13>>0],0|Bg[e+14>>0],0|Bg[e+15>>0])),0|hg,1),G=0|Oe(0|(G=0|zA(e+15|0)),0|hg,6),IA=0|Oe(0|(IA=0|Me(0|Bg[e+18>>0],0|Bg[e+19>>0],0|Bg[e+20>>0])),0|hg,3),ae=0|Me(0|Bg[e+21>>0],0|Bg[e+22>>0],0|Bg[e+23>>0]),H=0|Oe(0|(H=0|zA(e+23|0)),0|hg,5),uI=0|Oe(0|(uI=0|Me(0|Bg[e+26>>0],0|Bg[e+27>>0],0|Bg[e+28>>0])),0|hg,2),o=0|Oe(0|(o=0|zA(e+28|0)),0|hg,7),fA=hg,_e=0|Me(0|Bg[I>>0],0|Bg[I+1>>0],0|Bg[I+2>>0]),HA=0|Oe(0|(HA=0|zA(I+2|0)),0|hg,5),VA=0|Oe(0|(VA=0|Me(0|Bg[I+5>>0],0|Bg[I+6>>0],0|Bg[I+7>>0])),0|hg,2),AA=0|Oe(0|(AA=0|zA(I+7|0)),0|hg,7),P=0|Oe(0|(P=0|zA(I+10|0)),0|hg,4),hA=0|Oe(0|(hA=0|Me(0|Bg[I+13>>0],0|Bg[I+14>>0],0|Bg[I+15>>0])),0|hg,1),wA=0|Oe(0|(wA=0|zA(I+15|0)),0|hg,6),ye=0|Oe(0|(ye=0|Me(0|Bg[I+18>>0],0|Bg[I+19>>0],0|Bg[I+20>>0])),0|hg,3),CA=0|Me(0|Bg[I+21>>0],0|Bg[I+22>>0],0|Bg[I+23>>0]),U=0|Oe(0|(U=0|zA(I+23|0)),0|hg,5),MA=0|Oe(0|(MA=0|Me(0|Bg[I+26>>0],0|Bg[I+27>>0],0|Bg[I+28>>0])),0|hg,2),w=0|Oe(0|(w=0|zA(I+28|0)),0|hg,7),EA=hg,T=0|Me(0|Bg[g>>0],0|Bg[g+1>>0],0|Bg[g+2>>0]),oA=0|Oe(0|(oA=0|zA(g+2|0)),0|hg,5),yA=0|Oe(0|(yA=0|Me(0|Bg[g+5>>0],0|Bg[g+6>>0],0|Bg[g+7>>0])),0|hg,2),RA=0|Oe(0|(RA=0|zA(g+7|0)),0|hg,7),cA=0|Oe(0|(cA=0|zA(g+10|0)),0|hg,4),kA=0|Oe(0|(kA=0|Me(0|Bg[g+13>>0],0|Bg[g+14>>0],0|Bg[g+15>>0])),0|hg,1),te=0|Oe(0|(te=0|zA(g+15|0)),0|hg,6),r=0|Oe(0|(r=0|Me(0|Bg[g+18>>0],0|Bg[g+19>>0],0|Bg[g+20>>0])),0|hg,3),xA=0|Me(0|Bg[g+21>>0],0|Bg[g+22>>0],0|Bg[g+23>>0]),b=0|Oe(0|(b=0|zA(g+23|0)),0|hg,5),JA=0|Oe(0|(JA=0|Me(0|Bg[g+26>>0],0|Bg[g+27>>0],0|Bg[g+28>>0])),0|hg,2),e=0|Oe(0|(e=0|zA(g+28|0)),0|hg,7),n=hg,QA=0|aI(2097151&T|0,0,0|(QA=0|Fe(2097151&_e|0,0,2097151&OA|0,0)),0|hg),T=hg,wI=0|Fe(2097151&HA|0,0,2097151&OA|0,0),pI=hg,_I=0|Fe(2097151&_e|0,0,2097151&oe|0,0),f=hg,aA=0|Fe(2097151&VA|0,0,2097151&OA|0,0),sA=hg,yA=0|aI(0|(sA=0|aI(0|(L=0|aI(0|(iA=0|Fe(2097151&HA|0,0,2097151&oe|0,0)),0|(EI=hg),0|(L=0|Fe(2097151&_e|0,0,2097151&d|0,0)),0|hg)),0|hg,0|aA,0|sA)),0|hg,2097151&yA|0,0),sA=hg,aA=0|Fe(2097151&AA|0,0,2097151&OA|0,0),L=hg,EI=0|Fe(2097151&VA|0,0,2097151&oe|0,0),iA=hg,fI=0|Fe(2097151&HA|0,0,2097151&d|0,0),hI=hg,yI=0|Fe(2097151&_e|0,0,2097151&Be|0,0),sI=hg,vA=0|Fe(2097151&P|0,0,2097151&OA|0,0),BA=hg,gI=0|Fe(2097151&AA|0,0,2097151&oe|0,0),W=hg,nI=0|Fe(2097151&VA|0,0,2097151&d|0,0),DA=hg,cA=0|aI(0|(BA=0|aI(0|(W=0|aI(0|(DA=0|aI(0|(tI=0|aI(0|(iI=0|Fe(2097151&HA|0,0,2097151&Be|0,0)),0|(BI=hg),0|(tI=0|Fe(2097151&_e|0,0,2097151&c|0,0)),0|hg)),0|hg,0|nI,0|DA)),0|hg,0|gI,0|W)),0|hg,0|vA,0|BA)),0|hg,2097151&cA|0,0),BA=hg,vA=0|Fe(2097151&hA|0,0,2097151&OA|0,0),W=hg,gI=0|Fe(2097151&P|0,0,2097151&oe|0,0),DA=hg,nI=0|Fe(2097151&AA|0,0,2097151&d|0,0),tI=hg,BI=0|Fe(2097151&VA|0,0,2097151&Be|0,0),iI=hg,QI=0|Fe(2097151&HA|0,0,2097151&c|0,0),oI=hg,CI=0|Fe(2097151&_e|0,0,2097151&M|0,0),cI=hg,Z=0|Fe(2097151&wA|0,0,2097151&OA|0,0),qA=hg,Le=0|Fe(2097151&hA|0,0,2097151&oe|0,0),D=hg,Xe=0|Fe(2097151&P|0,0,2097151&d|0,0),j=hg,Ve=0|Fe(2097151&AA|0,0,2097151&Be|0,0),Ke=hg,We=0|Fe(2097151&VA|0,0,2097151&c|0,0),Te=hg,te=0|aI(0|(qA=0|aI(0|(D=0|aI(0|(j=0|aI(0|(Ke=0|aI(0|(Te=0|aI(0|(je=0|aI(0|(qe=0|Fe(2097151&HA|0,0,2097151&M|0,0)),0|(ze=hg),0|(je=0|Fe(2097151&_e|0,0,2097151&G|0,0)),0|hg)),0|hg,0|We,0|Te)),0|hg,0|Ve,0|Ke)),0|hg,0|Xe,0|j)),0|hg,0|Le,0|D)),0|hg,0|Z,0|qA)),0|hg,2097151&te|0,0),qA=hg,Z=0|Fe(2097151&ye|0,0,2097151&OA|0,0),D=hg,Le=0|Fe(2097151&wA|0,0,2097151&oe|0,0),j=hg,Xe=0|Fe(2097151&hA|0,0,2097151&d|0,0),Ke=hg,Ve=0|Fe(2097151&P|0,0,2097151&Be|0,0),Te=hg,We=0|Fe(2097151&AA|0,0,2097151&c|0,0),je=hg,ze=0|Fe(2097151&VA|0,0,2097151&M|0,0),qe=hg,II=0|Fe(2097151&HA|0,0,2097151&G|0,0),eI=hg,AI=0|Fe(2097151&_e|0,0,2097151&IA|0,0),$e=hg,de=0|Fe(2097151&CA|0,0,2097151&OA|0,0),g=hg,a=0|Fe(2097151&ye|0,0,2097151&oe|0,0),LA=hg,ue=0|Fe(2097151&wA|0,0,2097151&d|0,0),le=hg,ke=0|Fe(2097151&hA|0,0,2097151&Be|0,0),_A=hg,Ge=0|Fe(2097151&P|0,0,2097151&c|0,0),De=hg,He=0|Fe(2097151&AA|0,0,2097151&M|0,0),be=hg,Se=0|Fe(2097151&VA|0,0,2097151&G|0,0),me=hg,xA=0|aI(0|(LA=0|aI(0|(g=0|aI(0|(le=0|aI(0|(_A=0|aI(0|(De=0|aI(0|(be=0|aI(0|(me=0|aI(0|(Ye=0|aI(0|(Ne=0|Fe(2097151&HA|0,0,2097151&IA|0,0)),0|(Re=hg),0|(Ye=0|Fe(2097151&_e|0,0,2097151&ae|0,0)),0|hg)),0|hg,0|Se,0|me)),0|hg,0|He,0|be)),0|hg,0|Ge,0|De)),0|hg,0|ke,0|_A)),0|hg,0|ue,0|le)),0|hg,0|de,0|g)),0|hg,0|a,0|LA)),0|hg,2097151&xA|0,0),LA=hg,a=0|Fe(2097151&U|0,0,2097151&OA|0,0),g=hg,de=0|Fe(2097151&CA|0,0,2097151&oe|0,0),le=hg,ue=0|Fe(2097151&ye|0,0,2097151&d|0,0),_A=hg,ke=0|Fe(2097151&wA|0,0,2097151&Be|0,0),De=hg,Ge=0|Fe(2097151&hA|0,0,2097151&c|0,0),be=hg,He=0|Fe(2097151&P|0,0,2097151&M|0,0),me=hg,Se=0|Fe(2097151&AA|0,0,2097151&G|0,0),Ye=hg,Re=0|Fe(2097151&VA|0,0,2097151&IA|0,0),Ne=hg,xe=0|Fe(2097151&HA|0,0,2097151&ae|0,0),Je=hg,Pe=0|Fe(2097151&_e|0,0,2097151&H|0,0),Ue=hg,WA=0|Fe(2097151&MA|0,0,2097151&OA|0,0),PA=hg,$A=0|Fe(2097151&U|0,0,2097151&oe|0,0),re=hg,q=0|Fe(2097151&CA|0,0,2097151&d|0,0),z=hg,X=0|Fe(2097151&ye|0,0,2097151&Be|0,0),K=hg,Ce=0|Fe(2097151&wA|0,0,2097151&c|0,0),ce=hg,NA=0|Fe(2097151&hA|0,0,2097151&M|0,0),SA=hg,ge=0|Fe(2097151&P|0,0,2097151&G|0,0),Ie=hg,FA=0|Fe(2097151&AA|0,0,2097151&IA|0,0),GA=hg,XA=0|Fe(2097151&VA|0,0,2097151&ae|0,0),KA=hg,JA=0|aI(0|(PA=0|aI(0|(re=0|aI(0|(K=0|aI(0|(z=0|aI(0|(ce=0|aI(0|(SA=0|aI(0|(Ie=0|aI(0|(GA=0|aI(0|(KA=0|aI(0|(J=0|aI(0|(we=0|Fe(2097151&HA|0,0,2097151&H|0,0)),0|(S=hg),0|(J=0|Fe(2097151&_e|0,0,2097151&uI|0,0)),0|hg)),0|hg,0|XA,0|KA)),0|hg,0|FA,0|GA)),0|hg,0|ge,0|Ie)),0|hg,0|NA,0|SA)),0|hg,0|Ce,0|ce)),0|hg,0|q,0|z)),0|hg,0|X,0|K)),0|hg,0|$A,0|re)),0|hg,0|WA,0|PA)),0|hg,2097151&JA|0,0),PA=hg,OA=0|Fe(0|w,0|EA,2097151&OA|0,0),WA=hg,re=0|Fe(2097151&MA|0,0,2097151&oe|0,0),$A=hg,K=0|Fe(2097151&U|0,0,2097151&d|0,0),X=hg,z=0|Fe(2097151&CA|0,0,2097151&Be|0,0),q=hg,ce=0|Fe(2097151&ye|0,0,2097151&c|0,0),Ce=hg,SA=0|Fe(2097151&wA|0,0,2097151&M|0,0),NA=hg,Ie=0|Fe(2097151&hA|0,0,2097151&G|0,0),ge=hg,GA=0|Fe(2097151&P|0,0,2097151&IA|0,0),FA=hg,KA=0|Fe(2097151&AA|0,0,2097151&ae|0,0),XA=hg,J=0|Fe(2097151&VA|0,0,2097151&H|0,0),S=hg,we=0|Fe(2097151&HA|0,0,2097151&uI|0,0),pe=hg,_e=0|Fe(2097151&_e|0,0,0|o,0|fA),fe=hg,oe=0|Fe(0|w,0|EA,2097151&oe|0,0),Qe=hg,Ae=0|Fe(2097151&MA|0,0,2097151&d|0,0),p=hg,N=0|Fe(2097151&U|0,0,2097151&Be|0,0),ee=hg,Ee=0|Fe(2097151&CA|0,0,2097151&c|0,0),_=hg,E=0|Fe(2097151&ye|0,0,2097151&M|0,0),ne=hg,s=0|Fe(2097151&wA|0,0,2097151&G|0,0),se=hg,rA=0|Fe(2097151&hA|0,0,2097151&IA|0,0),l=hg,eA=0|Fe(2097151&P|0,0,2097151&ae|0,0),nA=hg,mA=0|Fe(2097151&AA|0,0,2097151&H|0,0),x=hg,Qe=0|aI(0|(p=0|aI(0|(ee=0|aI(0|(ne=0|aI(0|(_=0|aI(0|(se=0|aI(0|(l=0|aI(0|(nA=0|aI(0|(x=0|aI(0|(HA=0|aI(0|(ie=0|Fe(2097151&VA|0,0,2097151&uI|0,0)),0|(TA=hg),0|(HA=0|Fe(2097151&HA|0,0,0|o,0|fA)),0|hg)),0|hg,0|mA,0|x)),0|hg,0|eA,0|nA)),0|hg,0|rA,0|l)),0|hg,0|s,0|se)),0|hg,0|Ee,0|_)),0|hg,0|E,0|ne)),0|hg,0|N,0|ee)),0|hg,0|Ae,0|p)),0|hg,0|oe,0|Qe),oe=hg,d=0|Fe(0|w,0|EA,2097151&d|0,0),p=hg,Ae=0|Fe(2097151&MA|0,0,2097151&Be|0,0),ee=hg,N=0|Fe(2097151&U|0,0,2097151&c|0,0),ne=hg,E=0|Fe(2097151&CA|0,0,2097151&M|0,0),_=hg,Ee=0|Fe(2097151&ye|0,0,2097151&G|0,0),se=hg,s=0|Fe(2097151&wA|0,0,2097151&IA|0,0),l=hg,rA=0|Fe(2097151&hA|0,0,2097151&ae|0,0),nA=hg,eA=0|Fe(2097151&P|0,0,2097151&H|0,0),x=hg,mA=0|Fe(2097151&AA|0,0,2097151&uI|0,0),HA=hg,VA=0|Fe(2097151&VA|0,0,0|o,0|fA),TA=hg,Be=0|Fe(0|w,0|EA,2097151&Be|0,0),ie=hg,jA=0|Fe(2097151&MA|0,0,2097151&c|0,0),i=hg,C=0|Fe(2097151&U|0,0,2097151&M|0,0),ZA=hg,V=0|Fe(2097151&CA|0,0,2097151&G|0,0),F=hg,O=0|Fe(2097151&ye|0,0,2097151&IA|0,0),t=hg,lA=0|Fe(2097151&wA|0,0,2097151&ae|0,0),y=hg,pA=0|Fe(2097151&hA|0,0,2097151&H|0,0),B=hg,ie=0|aI(0|(i=0|aI(0|(ZA=0|aI(0|(t=0|aI(0|(F=0|aI(0|(y=0|aI(0|(B=0|aI(0|(AA=0|aI(0|(he=0|Fe(2097151&P|0,0,2097151&uI|0,0)),0|(Q=hg),0|(AA=0|Fe(2097151&AA|0,0,0|o,0|fA)),0|hg)),0|hg,0|pA,0|B)),0|hg,0|lA,0|y)),0|hg,0|V,0|F)),0|hg,0|O,0|t)),0|hg,0|C,0|ZA)),0|hg,0|jA,0|i)),0|hg,0|Be,0|ie),Be=hg,c=0|Fe(0|w,0|EA,2097151&c|0,0),i=hg,jA=0|Fe(2097151&MA|0,0,2097151&M|0,0),ZA=hg,C=0|Fe(2097151&U|0,0,2097151&G|0,0),t=hg,O=0|Fe(2097151&CA|0,0,2097151&IA|0,0),F=hg,V=0|Fe(2097151&ye|0,0,2097151&ae|0,0),y=hg,lA=0|Fe(2097151&wA|0,0,2097151&H|0,0),B=hg,pA=0|Fe(2097151&hA|0,0,2097151&uI|0,0),AA=hg,P=0|Fe(2097151&P|0,0,0|o,0|fA),Q=hg,M=0|Fe(0|w,0|EA,2097151&M|0,0),he=hg,gA=0|Fe(2097151&MA|0,0,2097151&G|0,0),YA=hg,bA=0|Fe(2097151&U|0,0,2097151&IA|0,0),v=hg,$=0|Fe(2097151&CA|0,0,2097151&ae|0,0),h=hg,k=0|Fe(2097151&ye|0,0,2097151&H|0,0),dA=hg,he=0|aI(0|(YA=0|aI(0|(v=0|aI(0|(dA=0|aI(0|(h=0|aI(0|(I=0|aI(0|(Y=0|Fe(2097151&wA|0,0,2097151&uI|0,0)),0|(uA=hg),0|(I=0|Fe(2097151&hA|0,0,0|o,0|fA)),0|hg)),0|hg,0|$,0|h)),0|hg,0|k,0|dA)),0|hg,0|bA,0|v)),0|hg,0|gA,0|YA)),0|hg,0|M,0|he),M=hg,G=0|Fe(0|w,0|EA,2097151&G|0,0),YA=hg,gA=0|Fe(2097151&MA|0,0,2097151&IA|0,0),v=hg,bA=0|Fe(2097151&U|0,0,2097151&ae|0,0),dA=hg,k=0|Fe(2097151&CA|0,0,2097151&H|0,0),h=hg,$=0|Fe(2097151&ye|0,0,2097151&uI|0,0),I=hg,wA=0|Fe(2097151&wA|0,0,0|o,0|fA),uA=hg,IA=0|Fe(0|w,0|EA,2097151&IA|0,0),Y=hg,hA=0|Fe(2097151&MA|0,0,2097151&ae|0,0),R=hg,UA=0|Fe(2097151&U|0,0,2097151&H|0,0),m=hg,u=0|Fe(2097151&CA|0,0,2097151&uI|0,0),tA=hg,Y=0|aI(0|(R=0|aI(0|(m=0|aI(0|(tA=0|aI(0|(ye=0|Fe(2097151&ye|0,0,0|o,0|fA)),0|hg,0|u,0|tA)),0|hg,0|UA,0|m)),0|hg,0|hA,0|R)),0|hg,0|IA,0|Y),IA=hg,ae=0|Fe(0|w,0|EA,2097151&ae|0,0),R=hg,hA=0|Fe(2097151&MA|0,0,2097151&H|0,0),m=hg,UA=0|Fe(2097151&U|0,0,2097151&uI|0,0),tA=hg,CA=0|Fe(2097151&CA|0,0,0|o,0|fA),u=hg,H=0|Fe(0|w,0|EA,2097151&H|0,0),ye=hg,ye=0|aI(0|(U=0|aI(0|(0|Fe(2097151&MA|0,0,2097151&uI|0,0)),0|hg,0|(U=0|Fe(2097151&U|0,0,0|o,0|fA)),0|hg)),0|hg,0|H,0|ye),H=hg,MA=0|aI(0|(uI=0|Fe(0|w,0|EA,2097151&uI|0,0)),0|(U=hg),0|(MA=0|Fe(2097151&MA|0,0,0|o,0|fA)),0|hg),U=hg,fA=0|Fe(0|w,0|EA,0|o,0|fA),o=hg,EA=0|Oe(0|(EA=0|aI(0|QA,0|T,1048576,0)),0|hg,21),w=hg,oA=0|aI(0|(oA=0|aI(0|(f=0|aI(0|wI,0|pI,0|_I,0|f)),0|hg,2097151&oA|0,0)),0|hg,0|EA,0|w),f=hg,w=0|rI(0|QA,0|T,0|(w=0|Ze(0|EA,0|w,21)),0|hg),T=hg,QA=0|Oe(0|(QA=0|aI(0|yA,0|sA,1048576,0)),0|hg,21),EA=hg,RA=0|aI(0|(RA=0|aI(0|(L=0|aI(0|(iA=0|aI(0|(sI=0|aI(0|fI,0|hI,0|yI,0|sI)),0|hg,0|EI,0|iA)),0|hg,0|aA,0|L)),0|hg,2097151&RA|0,0)),0|hg,0|QA,0|EA),L=hg,EA=0|Ze(0|QA,0|EA,21),QA=hg,aA=0|ve(0|(aA=0|aI(0|cA,0|BA,1048576,0)),0|hg,21),iA=hg,kA=0|aI(0|(kA=0|aI(0|(W=0|aI(0|(DA=0|aI(0|(tI=0|aI(0|(iI=0|aI(0|(cI=0|aI(0|QI,0|oI,0|CI,0|cI)),0|hg,0|BI,0|iI)),0|hg,0|nI,0|tI)),0|hg,0|gI,0|DA)),0|hg,0|vA,0|W)),0|hg,2097151&kA|0,0)),0|hg,0|aA,0|iA),W=hg,iA=0|Ze(0|aA,0|iA,21),aA=hg,vA=0|ve(0|(vA=0|aI(0|te,0|qA,1048576,0)),0|hg,21),DA=hg,r=0|aI(0|(r=0|aI(0|(D=0|aI(0|(j=0|aI(0|(Ke=0|aI(0|(Te=0|aI(0|(je=0|aI(0|(qe=0|aI(0|($e=0|aI(0|II,0|eI,0|AI,0|$e)),0|hg,0|ze,0|qe)),0|hg,0|We,0|je)),0|hg,0|Ve,0|Te)),0|hg,0|Xe,0|Ke)),0|hg,0|Le,0|j)),0|hg,0|Z,0|D)),0|hg,2097151&r|0,0)),0|hg,0|vA,0|DA),D=hg,DA=0|Ze(0|vA,0|DA,21),vA=hg,Z=0|ve(0|(Z=0|aI(0|xA,0|LA,1048576,0)),0|hg,21),j=hg,g=0|aI(0|(g=0|aI(0|(g=0|aI(0|(_A=0|aI(0|(le=0|aI(0|(De=0|aI(0|(be=0|aI(0|(me=0|aI(0|(Ye=0|aI(0|(Ne=0|aI(0|(Ue=0|aI(0|xe,0|Je,0|Pe,0|Ue)),0|hg,0|Re,0|Ne)),0|hg,0|Se,0|Ye)),0|hg,0|He,0|me)),0|hg,0|Ge,0|be)),0|hg,0|ke,0|De)),0|hg,0|de,0|le)),0|hg,0|ue,0|_A)),0|hg,0|a,0|g)),0|hg,2097151&b|0,0)),0|hg,0|Z,0|j),b=hg,j=0|Ze(0|Z,0|j,21),Z=hg,a=0|ve(0|(a=0|aI(0|JA,0|PA,1048576,0)),0|hg,21),_A=hg,n=0|aI(0|(n=0|aI(0|($A=0|aI(0|(WA=0|aI(0|(X=0|aI(0|(Ce=0|aI(0|(q=0|aI(0|(NA=0|aI(0|(ge=0|aI(0|(FA=0|aI(0|(XA=0|aI(0|(S=0|aI(0|(fe=0|aI(0|we,0|pe,0|_e,0|fe)),0|hg,0|J,0|S)),0|hg,0|KA,0|XA)),0|hg,0|GA,0|FA)),0|hg,0|Ie,0|ge)),0|hg,0|SA,0|NA)),0|hg,0|z,0|q)),0|hg,0|ce,0|Ce)),0|hg,0|K,0|X)),0|hg,0|OA,0|WA)),0|hg,0|re,0|$A)),0|hg,0|e,0|n)),0|hg,0|a,0|_A),e=hg,_A=0|Ze(0|a,0|_A,21),a=hg,$A=0|ve(0|($A=0|aI(0|Qe,0|oe,1048576,0)),0|hg,21),re=hg,p=0|aI(0|(p=0|aI(0|(ee=0|aI(0|(ne=0|aI(0|(se=0|aI(0|(_=0|aI(0|(l=0|aI(0|(nA=0|aI(0|(x=0|aI(0|(TA=0|aI(0|mA,0|HA,0|VA,0|TA)),0|hg,0|eA,0|x)),0|hg,0|rA,0|nA)),0|hg,0|s,0|l)),0|hg,0|E,0|_)),0|hg,0|Ee,0|se)),0|hg,0|N,0|ne)),0|hg,0|Ae,0|ee)),0|hg,0|d,0|p)),0|hg,0|$A,0|re),d=hg,re=0|Ze(0|$A,0|re,21),$A=hg,ee=0|ve(0|(ee=0|aI(0|ie,0|Be,1048576,0)),0|hg,21),Ae=hg,i=0|aI(0|(i=0|aI(0|(ZA=0|aI(0|(t=0|aI(0|(y=0|aI(0|(F=0|aI(0|(B=0|aI(0|(Q=0|aI(0|pA,0|AA,0|P,0|Q)),0|hg,0|lA,0|B)),0|hg,0|O,0|F)),0|hg,0|V,0|y)),0|hg,0|C,0|t)),0|hg,0|jA,0|ZA)),0|hg,0|c,0|i)),0|hg,0|ee,0|Ae),c=hg,Ae=0|Ze(0|ee,0|Ae,21),ee=hg,ZA=0|ve(0|(ZA=0|aI(0|he,0|M,1048576,0)),0|hg,21),jA=hg,YA=0|aI(0|(YA=0|aI(0|(v=0|aI(0|(dA=0|aI(0|(I=0|aI(0|(uA=0|aI(0|k,0|h,0|wA,0|uA)),0|hg,0|$,0|I)),0|hg,0|bA,0|dA)),0|hg,0|gA,0|v)),0|hg,0|G,0|YA)),0|hg,0|ZA,0|jA),G=hg,jA=0|Ze(0|ZA,0|jA,21),ZA=hg,v=0|ve(0|(v=0|aI(0|Y,0|IA,1048576,0)),0|hg,21),gA=hg,R=0|aI(0|(R=0|aI(0|(m=0|aI(0|(u=0|aI(0|UA,0|tA,0|CA,0|u)),0|hg,0|hA,0|m)),0|hg,0|ae,0|R)),0|hg,0|v,0|gA),ae=hg,gA=0|rI(0|Y,0|IA,0|(gA=0|Ze(0|v,0|gA,21)),0|hg),IA=hg,U=0|aI(0|MA,0|U,0|(Y=0|ve(0|(Y=0|aI(0|ye,0|H,1048576,0)),0|hg,21)),0|(v=hg)),MA=hg,v=0|rI(0|ye,0|H,0|(v=0|Ze(0|Y,0|v,21)),0|hg),H=hg,m=0|rI(0|fA,0|o,0|(m=0|Ze(0|(ye=0|ve(0|(ye=0|aI(0|fA,0|o,1048576,0)),0|hg,21)),0|(Y=hg),21)),0|hg),o=hg,u=0|rI(0|oA,0|f,0|(u=0|Ze(0|(fA=0|Oe(0|(fA=0|aI(0|oA,0|f,1048576,0)),0|hg,21)),0|(hA=hg),21)),0|hg),f=hg,tA=0|rI(0|RA,0|L,0|(tA=0|Ze(0|(oA=0|ve(0|(oA=0|aI(0|RA,0|L,1048576,0)),0|hg,21)),0|(CA=hg),21)),0|hg),L=hg,dA=0|rI(0|kA,0|W,0|(dA=0|Ze(0|(RA=0|ve(0|(RA=0|aI(0|kA,0|W,1048576,0)),0|hg,21)),0|(UA=hg),21)),0|hg),W=hg,I=0|Ze(0|(kA=0|ve(0|(kA=0|aI(0|r,0|D,1048576,0)),0|hg,21)),0|(bA=hg),21),$=hg,h=0|Ze(0|(uA=0|ve(0|(uA=0|aI(0|g,0|b,1048576,0)),0|hg,21)),0|(wA=hg),21),k=hg,y=0|Ze(0|(t=0|ve(0|(t=0|aI(0|n,0|e,1048576,0)),0|hg,21)),0|(C=hg),21),V=hg,B=0|Ze(0|(F=0|ve(0|(F=0|aI(0|p,0|d,1048576,0)),0|hg,21)),0|(O=hg),21),lA=hg,AA=0|Ze(0|(Q=0|ve(0|(Q=0|aI(0|i,0|c,1048576,0)),0|hg,21)),0|(P=hg),21),pA=hg,IA=0|aI(0|(ne=0|ve(0|(ne=0|aI(0|YA,0|G,1048576,0)),0|hg,21)),0|(N=hg),0|gA,0|IA),gA=hg,N=0|rI(0|YA,0|G,0|(N=0|Ze(0|ne,0|N,21)),0|hg),G=hg,H=0|aI(0|(YA=0|ve(0|(YA=0|aI(0|R,0|ae,1048576,0)),0|hg,21)),0|(ne=hg),0|v,0|H),v=hg,ne=0|rI(0|R,0|ae,0|(ne=0|Ze(0|YA,0|ne,21)),0|hg),ae=hg,o=0|aI(0|(R=0|ve(0|(R=0|aI(0|U,0|MA,1048576,0)),0|hg,21)),0|(YA=hg),0|m,0|o),m=hg,YA=0|rI(0|U,0|MA,0|(YA=0|Ze(0|R,0|YA,21)),0|hg),MA=hg,U=0|Fe(0|ye,0|Y,666643,0),R=hg,se=0|Fe(0|ye,0|Y,470296,0),Ee=hg,_=0|Fe(0|ye,0|Y,654183,0),E=hg,l=0|Fe(0|ye,0|Y,-997805,-1),s=hg,nA=0|Fe(0|ye,0|Y,136657,0),rA=hg,P=0|aI(0|(ZA=0|rI(0|(Y=0|aI(0|he,0|M,0|(Y=0|Fe(0|ye,0|Y,-683901,-1)),0|hg)),0|hg,0|jA,0|ZA)),0|hg,0|Q,0|P),Q=hg,ZA=0|Fe(0|o,0|m,666643,0),jA=hg,Y=0|Fe(0|o,0|m,470296,0),M=hg,he=0|Fe(0|o,0|m,654183,0),ye=hg,x=0|Fe(0|o,0|m,-997805,-1),eA=hg,TA=0|Fe(0|o,0|m,136657,0),VA=hg,m=0|Fe(0|o,0|m,-683901,-1),o=hg,HA=0|Fe(0|YA,0|MA,666643,0),mA=hg,WA=0|Fe(0|YA,0|MA,470296,0),OA=hg,X=0|Fe(0|YA,0|MA,654183,0),K=hg,Ce=0|Fe(0|YA,0|MA,-997805,-1),ce=hg,q=0|Fe(0|YA,0|MA,136657,0),z=hg,MA=0|Fe(0|YA,0|MA,-683901,-1),YA=hg,O=0|aI(0|(ee=0|rI(0|(YA=0|aI(0|(VA=0|aI(0|(s=0|aI(0|ie,0|Be,0|l,0|s)),0|hg,0|TA,0|VA)),0|hg,0|MA,0|YA)),0|hg,0|Ae,0|ee)),0|hg,0|F,0|O),F=hg,ee=0|Fe(0|H,0|v,666643,0),Ae=hg,YA=0|Fe(0|H,0|v,470296,0),MA=hg,VA=0|Fe(0|H,0|v,654183,0),TA=hg,s=0|Fe(0|H,0|v,-997805,-1),l=hg,Be=0|Fe(0|H,0|v,136657,0),ie=hg,v=0|Fe(0|H,0|v,-683901,-1),H=hg,NA=0|Fe(0|ne,0|ae,666643,0),SA=hg,ge=0|Fe(0|ne,0|ae,470296,0),Ie=hg,FA=0|Fe(0|ne,0|ae,654183,0),GA=hg,XA=0|Fe(0|ne,0|ae,-997805,-1),KA=hg,S=0|Fe(0|ne,0|ae,136657,0),J=hg,ae=0|Fe(0|ne,0|ae,-683901,-1),ne=hg,C=0|aI(0|($A=0|rI(0|(ne=0|aI(0|(ie=0|aI(0|(ce=0|aI(0|(oe=0|aI(0|(Ee=0|aI(0|he,0|ye,0|se,0|Ee)),0|hg,0|Qe,0|oe)),0|hg,0|Ce,0|ce)),0|hg,0|Be,0|ie)),0|hg,0|ae,0|ne)),0|hg,0|re,0|$A)),0|hg,0|t,0|C),t=hg,vA=0|rI(0|(UA=0|aI(0|($A=0|aI(0|te,0|qA,0|($A=0|Fe(0|IA,0|gA,666643,0)),0|hg)),0|hg,0|RA,0|UA)),0|hg,0|DA,0|vA),DA=hg,UA=0|Fe(0|IA,0|gA,470296,0),RA=hg,$A=0|Fe(0|IA,0|gA,654183,0),qA=hg,Z=0|rI(0|(bA=0|aI(0|(LA=0|aI(0|(qA=0|aI(0|(Ae=0|aI(0|ge,0|Ie,0|ee,0|Ae)),0|hg,0|$A,0|qA)),0|hg,0|xA,0|LA)),0|hg,0|kA,0|bA)),0|hg,0|j,0|Z),j=hg,bA=0|Fe(0|IA,0|gA,-997805,-1),kA=hg,LA=0|Fe(0|IA,0|gA,136657,0),xA=hg,a=0|rI(0|(wA=0|aI(0|(PA=0|aI(0|(xA=0|aI(0|(KA=0|aI(0|(TA=0|aI(0|(jA=0|aI(0|WA,0|OA,0|ZA,0|jA)),0|hg,0|VA,0|TA)),0|hg,0|XA,0|KA)),0|hg,0|LA,0|xA)),0|hg,0|JA,0|PA)),0|hg,0|uA,0|wA)),0|hg,0|_A,0|a),_A=hg,gA=0|Fe(0|IA,0|gA,-683901,-1),IA=hg,wA=0|ve(0|(wA=0|aI(0|vA,0|DA,1048576,0)),0|hg,21),uA=hg,$=0|aI(0|($=0|rI(0|(D=0|aI(0|(SA=0|aI(0|UA,0|RA,0|NA,0|SA)),0|hg,0|r,0|D)),0|hg,0|I,0|$)),0|hg,0|wA,0|uA),I=hg,uA=0|Ze(0|wA,0|uA,21),wA=hg,D=0|ve(0|(D=0|aI(0|Z,0|j,1048576,0)),0|hg,21),r=hg,k=0|aI(0|(k=0|rI(0|(b=0|aI(0|(kA=0|aI(0|(GA=0|aI(0|(mA=0|aI(0|YA,0|MA,0|HA,0|mA)),0|hg,0|FA,0|GA)),0|hg,0|bA,0|kA)),0|hg,0|g,0|b)),0|hg,0|h,0|k)),0|hg,0|D,0|r),h=hg,r=0|Ze(0|D,0|r,21),D=hg,b=0|ve(0|(b=0|aI(0|a,0|_A,1048576,0)),0|hg,21),g=hg,V=0|aI(0|(V=0|rI(0|(e=0|aI(0|(IA=0|aI(0|(J=0|aI(0|(l=0|aI(0|(K=0|aI(0|(R=0|aI(0|Y,0|M,0|U,0|R)),0|hg,0|X,0|K)),0|hg,0|s,0|l)),0|hg,0|S,0|J)),0|hg,0|gA,0|IA)),0|hg,0|n,0|e)),0|hg,0|y,0|V)),0|hg,0|b,0|g),y=hg,g=0|Ze(0|b,0|g,21),b=hg,e=0|ve(0|(e=0|aI(0|C,0|t,1048576,0)),0|hg,21),n=hg,lA=0|aI(0|(lA=0|rI(0|(d=0|aI(0|(H=0|aI(0|(z=0|aI(0|(E=0|aI(0|x,0|eA,0|_,0|E)),0|hg,0|q,0|z)),0|hg,0|v,0|H)),0|hg,0|p,0|d)),0|hg,0|B,0|lA)),0|hg,0|e,0|n),B=hg,n=0|rI(0|C,0|t,0|(n=0|Ze(0|e,0|n,21)),0|hg),t=hg,C=0|ve(0|(C=0|aI(0|O,0|F,1048576,0)),0|hg,21),e=hg,pA=0|aI(0|(pA=0|rI(0|(c=0|aI(0|(rA=0|aI(0|m,0|o,0|nA,0|rA)),0|hg,0|i,0|c)),0|hg,0|AA,0|pA)),0|hg,0|C,0|e),AA=hg,e=0|rI(0|O,0|F,0|(e=0|Ze(0|C,0|e,21)),0|hg),F=hg,G=0|aI(0|(O=0|ve(0|(O=0|aI(0|P,0|Q,1048576,0)),0|hg,21)),0|(C=hg),0|N,0|G),N=hg,C=0|rI(0|P,0|Q,0|(C=0|Ze(0|O,0|C,21)),0|hg),Q=hg,c=0|Ze(0|(P=0|ve(0|(P=0|aI(0|$,0|I,1048576,0)),0|hg,21)),0|(O=hg),21),i=hg,o=0|Ze(0|(rA=0|ve(0|(rA=0|aI(0|k,0|h,1048576,0)),0|hg,21)),0|(nA=hg),21),m=hg,t=0|aI(0|(d=0|ve(0|(d=0|aI(0|V,0|y,1048576,0)),0|hg,21)),0|(p=hg),0|n,0|t),n=hg,p=0|rI(0|V,0|y,0|(p=0|Ze(0|d,0|p,21)),0|hg),y=hg,F=0|aI(0|(V=0|ve(0|(V=0|aI(0|lA,0|B,1048576,0)),0|hg,21)),0|(d=hg),0|e,0|F),e=hg,d=0|rI(0|lA,0|B,0|(d=0|Ze(0|V,0|d,21)),0|hg),B=hg,Q=0|aI(0|(lA=0|ve(0|(lA=0|aI(0|pA,0|AA,1048576,0)),0|hg,21)),0|(V=hg),0|C,0|Q),C=hg,V=0|rI(0|pA,0|AA,0|(V=0|Ze(0|lA,0|V,21)),0|hg),AA=hg,pA=0|aI(0|dA,0|W,0|(pA=0|Fe(0|G,0|N,666643,0)),0|hg),W=hg,dA=0|Fe(0|G,0|N,470296,0),lA=hg,H=0|Fe(0|G,0|N,654183,0),v=hg,z=0|Fe(0|G,0|N,-997805,-1),q=hg,E=0|Fe(0|G,0|N,136657,0),_=hg,b=0|rI(0|(nA=0|aI(0|(N=0|aI(0|a,0|_A,0|(N=0|Fe(0|G,0|N,-683901,-1)),0|hg)),0|hg,0|rA,0|nA)),0|hg,0|g,0|b),g=hg,nA=0|Fe(0|Q,0|C,666643,0),rA=hg,N=0|aI(0|pA,0|W,0|(N=0|Fe(0|Q,0|C,470296,0)),0|hg),W=hg,pA=0|Fe(0|Q,0|C,654183,0),_A=hg,a=0|Fe(0|Q,0|C,-997805,-1),G=hg,eA=0|Fe(0|Q,0|C,136657,0),x=hg,C=0|Fe(0|Q,0|C,-683901,-1),Q=hg,IA=0|aI(0|tA,0|L,0|(IA=0|Fe(0|V,0|AA,666643,0)),0|hg),L=hg,tA=0|Fe(0|V,0|AA,470296,0),gA=hg,J=0|aI(0|N,0|W,0|(J=0|Fe(0|V,0|AA,654183,0)),0|hg),W=hg,N=0|Fe(0|V,0|AA,-997805,-1),S=hg,l=0|Fe(0|V,0|AA,136657,0),s=hg,AA=0|Fe(0|V,0|AA,-683901,-1),V=hg,D=0|rI(0|(V=0|aI(0|(x=0|aI(0|(O=0|aI(0|(q=0|aI(0|Z,0|j,0|z,0|q)),0|hg,0|P,0|O)),0|hg,0|eA,0|x)),0|hg,0|AA,0|V)),0|hg,0|r,0|D),r=hg,V=0|Fe(0|F,0|e,666643,0),AA=hg,x=0|aI(0|IA,0|L,0|(x=0|Fe(0|F,0|e,470296,0)),0|hg),L=hg,IA=0|Fe(0|F,0|e,654183,0),eA=hg,O=0|aI(0|J,0|W,0|(O=0|Fe(0|F,0|e,-997805,-1)),0|hg),W=hg,J=0|Fe(0|F,0|e,136657,0),P=hg,e=0|Fe(0|F,0|e,-683901,-1),F=hg,q=0|Fe(0|d,0|B,666643,0),z=hg,j=0|Fe(0|d,0|B,470296,0),Z=hg,K=0|Fe(0|d,0|B,654183,0),X=hg,R=0|Fe(0|d,0|B,-997805,-1),U=hg,M=0|Fe(0|d,0|B,136657,0),Y=hg,B=0|Fe(0|d,0|B,-683901,-1),d=hg,d=0|aI(0|(P=0|aI(0|(S=0|aI(0|(_A=0|aI(0|(wA=0|rI(0|(lA=0|aI(0|vA,0|DA,0|dA,0|lA)),0|hg,0|uA,0|wA)),0|hg,0|pA,0|_A)),0|hg,0|N,0|S)),0|hg,0|J,0|P)),0|hg,0|B,0|d),B=hg,T=0|aI(0|(P=0|Fe(0|t,0|n,666643,0)),0|hg,0|w,0|T),w=hg,P=0|Fe(0|t,0|n,470296,0),J=hg,S=0|Fe(0|t,0|n,654183,0),N=hg,Z=0|aI(0|(N=0|aI(0|(AA=0|aI(0|(QA=0|rI(0|(sA=0|aI(0|fA,0|hA,0|yA,0|sA)),0|hg,0|EA,0|QA)),0|hg,0|V,0|AA)),0|hg,0|S,0|N)),0|hg,0|j,0|Z),j=hg,N=0|Fe(0|t,0|n,-997805,-1),S=hg,AA=0|Fe(0|t,0|n,136657,0),V=hg,U=0|aI(0|(V=0|aI(0|(eA=0|aI(0|(gA=0|aI(0|(rA=0|aI(0|(aA=0|rI(0|(BA=0|aI(0|oA,0|CA,0|cA,0|BA)),0|hg,0|iA,0|aA)),0|hg,0|nA,0|rA)),0|hg,0|tA,0|gA)),0|hg,0|IA,0|eA)),0|hg,0|AA,0|V)),0|hg,0|R,0|U),R=hg,n=0|Fe(0|t,0|n,-683901,-1),t=hg,V=0|ve(0|(V=0|aI(0|T,0|w,1048576,0)),0|hg,21),AA=hg,z=0|aI(0|(z=0|aI(0|(J=0|aI(0|u,0|f,0|P,0|J)),0|hg,0|q,0|z)),0|hg,0|V,0|AA),q=hg,AA=0|rI(0|T,0|w,0|(AA=0|Ze(0|V,0|AA,21)),0|hg),w=hg,T=0|ve(0|(T=0|aI(0|Z,0|j,1048576,0)),0|hg,21),V=hg,X=0|aI(0|(X=0|aI(0|(S=0|aI(0|x,0|L,0|N,0|S)),0|hg,0|K,0|X)),0|hg,0|T,0|V),K=hg,V=0|Ze(0|T,0|V,21),T=hg,S=0|ve(0|(S=0|aI(0|U,0|R,1048576,0)),0|hg,21),N=hg,Y=0|aI(0|(Y=0|aI(0|(t=0|aI(0|O,0|W,0|n,0|t)),0|hg,0|M,0|Y)),0|hg,0|S,0|N),M=hg,N=0|Ze(0|S,0|N,21),S=hg,t=0|ve(0|(t=0|aI(0|d,0|B,1048576,0)),0|hg,21),n=hg,F=0|aI(0|(F=0|aI(0|(s=0|aI(0|(i=0|rI(0|(G=0|aI(0|(v=0|aI(0|$,0|I,0|H,0|v)),0|hg,0|a,0|G)),0|hg,0|c,0|i)),0|hg,0|l,0|s)),0|hg,0|e,0|F)),0|hg,0|t,0|n),e=hg,n=0|rI(0|d,0|B,0|(n=0|Ze(0|t,0|n,21)),0|hg),B=hg,d=0|ve(0|(d=0|aI(0|D,0|r,1048576,0)),0|hg,21),t=hg,m=0|aI(0|(m=0|rI(0|(h=0|aI(0|(_=0|aI(0|C,0|Q,0|E,0|_)),0|hg,0|k,0|h)),0|hg,0|o,0|m)),0|hg,0|d,0|t),o=hg,t=0|rI(0|D,0|r,0|(t=0|Ze(0|d,0|t,21)),0|hg),r=hg,y=0|aI(0|p,0|y,0|(D=0|ve(0|(D=0|aI(0|b,0|g,1048576,0)),0|hg,21)),0|(d=hg)),p=hg,d=0|Ze(0|D,0|d,21),D=hg,_=0|Ze(0|(h=0|ve(0|(h=0|aI(0|z,0|q,1048576,0)),0|hg,21)),0|(k=hg),21),E=hg,s=0|Ze(0|(Q=0|ve(0|(Q=0|aI(0|X,0|K,1048576,0)),0|hg,21)),0|(C=hg),21),l=hg,B=0|aI(0|n,0|B,0|(i=0|ve(0|(i=0|aI(0|Y,0|M,1048576,0)),0|hg,21)),0|(c=hg)),n=hg,c=0|Ze(0|i,0|c,21),i=hg,r=0|aI(0|t,0|r,0|(G=0|ve(0|(G=0|aI(0|F,0|e,1048576,0)),0|hg,21)),0|(a=hg)),t=hg,a=0|rI(0|F,0|e,0|(a=0|Ze(0|G,0|a,21)),0|hg),e=hg,v=0|rI(0|m,0|o,0|(v=0|Ze(0|(F=0|ve(0|(F=0|aI(0|m,0|o,1048576,0)),0|hg,21)),0|(G=hg),21)),0|hg),o=hg,I=0|rI(0|y,0|p,0|(I=0|Ze(0|(m=0|ve(0|(m=0|aI(0|y,0|p,1048576,0)),0|hg,21)),0|(H=hg),21)),0|hg),p=hg,y=0|aI(0|AA,0|w,0|(y=0|Fe(0|m,0|H,666643,0)),0|hg),w=hg,AA=0|Fe(0|m,0|H,470296,0),$=hg,W=0|Fe(0|m,0|H,654183,0),O=hg,L=0|Fe(0|m,0|H,-997805,-1),x=hg,J=0|Fe(0|m,0|H,136657,0),P=hg,H=0|Fe(0|m,0|H,-683901,-1),m=hg,f=0|ve(0|y,0|w,21),u=hg,E=0|aI(0|(E=0|rI(0|(q=0|aI(0|AA,0|$,0|z,0|q)),0|hg,0|_,0|E)),0|hg,0|f,0|u),_=hg,u=0|rI(0|y,0|w,0|(u=0|Ze(0|f,0|u,21)),0|hg),w=hg,y=0|ve(0|E,0|_,21),f=hg,k=0|aI(0|(k=0|aI(0|(T=0|rI(0|(j=0|aI(0|W,0|O,0|Z,0|j)),0|hg,0|V,0|T)),0|hg,0|h,0|k)),0|hg,0|y,0|f),h=hg,f=0|rI(0|E,0|_,0|(f=0|Ze(0|y,0|f,21)),0|hg),_=hg,E=0|ve(0|k,0|h,21),y=hg,l=0|aI(0|(l=0|rI(0|(x=0|aI(0|X,0|K,0|L,0|x)),0|hg,0|s,0|l)),0|hg,0|E,0|y),s=hg,y=0|rI(0|k,0|h,0|(y=0|Ze(0|E,0|y,21)),0|hg),h=hg,k=0|ve(0|l,0|s,21),E=hg,C=0|aI(0|(C=0|aI(0|(S=0|rI(0|(R=0|aI(0|J,0|P,0|U,0|R)),0|hg,0|N,0|S)),0|hg,0|Q,0|C)),0|hg,0|k,0|E),Q=hg,E=0|rI(0|l,0|s,0|(E=0|Ze(0|k,0|E,21)),0|hg),s=hg,l=0|ve(0|C,0|Q,21),k=hg,i=0|aI(0|(i=0|rI(0|(m=0|aI(0|Y,0|M,0|H,0|m)),0|hg,0|c,0|i)),0|hg,0|l,0|k),c=hg,k=0|rI(0|C,0|Q,0|(k=0|Ze(0|l,0|k,21)),0|hg),Q=hg,n=0|aI(0|B,0|n,0|(C=0|ve(0|i,0|c,21)),0|(l=hg)),B=hg,l=0|rI(0|i,0|c,0|(l=0|Ze(0|C,0|l,21)),0|hg),c=hg,e=0|aI(0|(i=0|ve(0|n,0|B,21)),0|(C=hg),0|a,0|e),a=hg,C=0|rI(0|n,0|B,0|(C=0|Ze(0|i,0|C,21)),0|hg),B=hg,t=0|aI(0|r,0|t,0|(n=0|ve(0|e,0|a,21)),0|(i=hg)),r=hg,i=0|rI(0|e,0|a,0|(i=0|Ze(0|n,0|i,21)),0|hg),a=hg,o=0|aI(0|(e=0|ve(0|t,0|r,21)),0|(n=hg),0|v,0|o),v=hg,n=0|rI(0|t,0|r,0|(n=0|Ze(0|e,0|n,21)),0|hg),r=hg,t=0|ve(0|o,0|v,21),e=hg,D=0|aI(0|(D=0|rI(0|(g=0|aI(0|F,0|G,0|b,0|g)),0|hg,0|d,0|D)),0|hg,0|t,0|e),d=hg,e=0|rI(0|o,0|v,0|(e=0|Ze(0|t,0|e,21)),0|hg),v=hg,p=0|aI(0|(o=0|ve(0|D,0|d,21)),0|(t=hg),0|I,0|p),I=hg,t=0|rI(0|D,0|d,0|(t=0|Ze(0|o,0|t,21)),0|hg),d=hg,g=0|rI(0|p,0|I,0|(g=0|Ze(0|(D=0|ve(0|p,0|I,21)),0|(o=hg),21)),0|hg),I=hg,w=0|aI(0|(p=0|Fe(0|D,0|o,666643,0)),0|hg,0|u,0|w),u=hg,p=0|aI(0|f,0|_,0|(p=0|Fe(0|D,0|o,470296,0)),0|hg),_=hg,f=0|aI(0|y,0|h,0|(f=0|Fe(0|D,0|o,654183,0)),0|hg),h=hg,y=0|aI(0|E,0|s,0|(y=0|Fe(0|D,0|o,-997805,-1)),0|hg),s=hg,E=0|aI(0|k,0|Q,0|(E=0|Fe(0|D,0|o,136657,0)),0|hg),Q=hg,o=0|aI(0|l,0|c,0|(o=0|Fe(0|D,0|o,-683901,-1)),0|hg),c=hg,_=0|aI(0|p,0|_,0|(l=0|ve(0|w,0|u,21)),0|(D=hg)),p=hg,D=0|rI(0|w,0|u,0|(D=0|Ze(0|l,0|D,21)),0|hg),u=hg,h=0|aI(0|f,0|h,0|(w=0|ve(0|_,0|p,21)),0|(l=hg)),f=hg,l=0|rI(0|_,0|p,0|(l=0|Ze(0|w,0|l,21)),0|hg),p=hg,s=0|aI(0|y,0|s,0|(_=0|ve(0|h,0|f,21)),0|(w=hg)),y=hg,w=0|rI(0|h,0|f,0|(w=0|Ze(0|_,0|w,21)),0|hg),f=hg,Q=0|aI(0|E,0|Q,0|(h=0|ve(0|s,0|y,21)),0|(_=hg)),E=hg,_=0|rI(0|s,0|y,0|(_=0|Ze(0|h,0|_,21)),0|hg),y=hg,c=0|aI(0|o,0|c,0|(s=0|ve(0|Q,0|E,21)),0|(h=hg)),o=hg,h=0|rI(0|Q,0|E,0|(h=0|Ze(0|s,0|h,21)),0|hg),E=hg,B=0|aI(0|(Q=0|ve(0|c,0|o,21)),0|(s=hg),0|C,0|B),C=hg,s=0|rI(0|c,0|o,0|(s=0|Ze(0|Q,0|s,21)),0|hg),o=hg,a=0|aI(0|(c=0|ve(0|B,0|C,21)),0|(Q=hg),0|i,0|a),i=hg,Q=0|rI(0|B,0|C,0|(Q=0|Ze(0|c,0|Q,21)),0|hg),C=hg,r=0|aI(0|(B=0|ve(0|a,0|i,21)),0|(c=hg),0|n,0|r),n=hg,c=0|rI(0|a,0|i,0|(c=0|Ze(0|B,0|c,21)),0|hg),i=hg,v=0|aI(0|(a=0|ve(0|r,0|n,21)),0|(B=hg),0|e,0|v),e=hg,B=0|rI(0|r,0|n,0|(B=0|Ze(0|a,0|B,21)),0|hg),n=hg,d=0|aI(0|(r=0|ve(0|v,0|e,21)),0|(a=hg),0|t,0|d),t=hg,a=0|rI(0|v,0|e,0|(a=0|Ze(0|r,0|a,21)),0|hg),e=hg,I=0|aI(0|(v=0|ve(0|d,0|t,21)),0|(r=hg),0|g,0|I),g=hg,r=0|rI(0|d,0|t,0|(r=0|Ze(0|v,0|r,21)),0|hg),t=hg,Bg[A>>0]=D,d=0|Oe(0|D,0|u,8),Bg[A+1>>0]=d,u=0|Oe(0|D,0|u,16),D=hg,d=0|Ze(0|l,0|p,5),Bg[A+2>>0]=d|u,u=0|Oe(0|l,0|p,3),Bg[A+3>>0]=u,u=0|Oe(0|l,0|p,11),Bg[A+4>>0]=u,p=0|Oe(0|l,0|p,19),l=hg,u=0|Ze(0|w,0|f,2),Bg[A+5>>0]=u|p,p=0|Oe(0|w,0|f,6),Bg[A+6>>0]=p,f=0|Oe(0|w,0|f,14),w=hg,p=0|Ze(0|_,0|y,7),Bg[A+7>>0]=p|f,f=0|Oe(0|_,0|y,1),Bg[A+8>>0]=f,f=0|Oe(0|_,0|y,9),Bg[A+9>>0]=f,y=0|Oe(0|_,0|y,17),_=hg,f=0|Ze(0|h,0|E,4),Bg[A+10>>0]=f|y,y=0|Oe(0|h,0|E,4),Bg[A+11>>0]=y,y=0|Oe(0|h,0|E,12),Bg[A+12>>0]=y,E=0|Oe(0|h,0|E,20),h=hg,y=0|Ze(0|s,0|o,1),Bg[A+13>>0]=y|E,E=0|Oe(0|s,0|o,7),Bg[A+14>>0]=E,o=0|Oe(0|s,0|o,15),s=hg,E=0|Ze(0|Q,0|C,6),Bg[A+15>>0]=E|o,o=0|Oe(0|Q,0|C,2),Bg[A+16>>0]=o,o=0|Oe(0|Q,0|C,10),Bg[A+17>>0]=o,C=0|Oe(0|Q,0|C,18),Q=hg,o=0|Ze(0|c,0|i,3),Bg[A+18>>0]=o|C,C=0|Oe(0|c,0|i,5),Bg[A+19>>0]=C,i=0|Oe(0|c,0|i,13),Bg[A+20>>0]=i,Bg[A+21>>0]=B,i=0|Oe(0|B,0|n,8),Bg[A+22>>0]=i,n=0|Oe(0|B,0|n,16),B=hg,i=0|Ze(0|a,0|e,5),Bg[A+23>>0]=i|n,n=0|Oe(0|a,0|e,3),Bg[A+24>>0]=n,n=0|Oe(0|a,0|e,11),Bg[A+25>>0]=n,e=0|Oe(0|a,0|e,19),a=hg,n=0|Ze(0|r,0|t,2),Bg[A+26>>0]=n|e,e=0|Oe(0|r,0|t,6),Bg[A+27>>0]=e,t=0|Oe(0|r,0|t,14),r=hg,e=0|Ze(0|I,0|g,7),Bg[A+28>>0]=t|e,e=0|Oe(0|I,0|g,1),Bg[A+29>>0]=e,e=0|Oe(0|I,0|g,9),Bg[A+30>>0]=e,g=0|Oe(0|I,0|g,17),Bg[A+31>>0]=g}function r(A,e,I,g){A|=0,g|=0;var t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0,Y=0,S=0,N=0,R=0,U=0;pe(I|=0,e|=0),t=A,r=(e=g)+64|0;do{cg[e>>2]=cg[t>>2],e=e+4|0,t=t+4|0}while((0|e)<(0|r));for(h=0,e=0|cg[I>>2],t=0|cg[I+4>>2];;){if(d=0|cg[g+32>>2],s=0|cg[g+32+4>>2],a=0|be(d,s,14),v=hg,l=0|be(d,s,18),v^=hg,k=0|be(d,s,41),y=0|cg[g+40>>2],c=0|cg[g+40+4>>2],B=0|cg[g+48>>2],N=0|cg[g+48+4>>2],Q=464+(h<<3)|0,C=0|cg[Q>>2],Q=0|cg[Q+4>>2],w=0|cg[g+56>>2],_=0|cg[g+56+4>>2],v=0|aI(0|e,0|t,l^a^k|0,v^hg|0),Q=0|aI(0|v,0|hg,0|C,0|Q),Q=0|aI(0|Q,0|hg,(B^y)&d^B|0,(N^c)&s^N|0),_=0|aI(0|Q,0|hg,0|w,0|_),w=hg,Q=0|aI(0|_,0|w,0|cg[g+24>>2],0|cg[g+24+4>>2]),C=hg,cg[g+24>>2]=Q,cg[g+24+4>>2]=C,v=0|cg[g>>2],k=0|cg[g+4>>2],a=0|be(v,k,28),l=hg,i=0|be(v,k,34),l^=hg,p=0|be(v,k,39),D=0|cg[g+8>>2],m=0|cg[g+8+4>>2],b=0|cg[g+16>>2],H=0|cg[g+16+4>>2],l=0|aI(0|_,0|w,i^a^p|0,l^hg|0),l=0|aI(0|l,0|hg,(b|D)&v|b&D|0,(H|m)&k|H&m|0),p=hg,cg[g+56>>2]=l,cg[g+56+4>>2]=p,a=0|be(Q,C,14),i=hg,w=0|be(Q,C,18),i^=hg,_=0|be(Q,C,41),n=1|h,u=0|cg[464+(n<<3)>>2],S=0|cg[464+(n<<3)+4>>2],i=0|aI(0|cg[I+(n<<3)>>2],0|cg[I+(n<<3)+4>>2],w^a^_|0,i^hg|0),S=0|aI(0|i,0|hg,0|u,0|S),S=0|aI(0|S,0|hg,(y^d)&Q^y|0,(c^s)&C^c|0),N=0|aI(0|S,0|hg,0|B,0|N),B=hg,H=0|aI(0|N,0|B,0|b,0|H),b=hg,cg[g+16>>2]=H,cg[g+16+4>>2]=b,S=0|be(l,p,28),u=hg,i=0|be(l,p,34),u^=hg,_=0|be(l,p,39),u=0|aI(0|N,0|B,i^S^_|0,u^hg|0),u=0|aI(0|u,0|hg,(D|v)&l|D&v|0,(m|k)&p|m&k|0),_=hg,cg[g+48>>2]=u,cg[g+48+4>>2]=_,S=0|be(H,b,14),i=hg,B=0|be(H,b,18),i^=hg,N=0|be(H,b,41),a=2|h,w=0|cg[464+(a<<3)>>2],o=0|cg[464+(a<<3)+4>>2],i=0|aI(0|cg[I+(a<<3)>>2],0|cg[I+(a<<3)+4>>2],B^S^N|0,i^hg|0),o=0|aI(0|i,0|hg,0|w,0|o),s=0|aI(0|o,0|hg,(d^Q)&H^d|0,(s^C)&b^s|0),c=0|aI(0|s,0|hg,0|y,0|c),y=hg,m=0|aI(0|c,0|y,0|D,0|m),D=hg,cg[g+8>>2]=m,cg[g+8+4>>2]=D,s=0|be(u,_,28),d=hg,o=0|be(u,_,34),d^=hg,w=0|be(u,_,39),d=0|aI(0|c,0|y,o^s^w|0,d^hg|0),d=0|aI(0|d,0|hg,(v|l)&u|v&l|0,(k|p)&_|k&p|0),w=hg,cg[g+40>>2]=d,cg[g+40+4>>2]=w,s=0|be(m,D,14),o=hg,y=0|be(m,D,18),o^=hg,c=0|be(m,D,41),i=3|h,N=0|cg[464+(i<<3)>>2],S=0|cg[464+(i<<3)+4>>2],B=0|cg[g+32>>2],E=0|cg[g+32+4>>2],o=0|aI(0|cg[I+(i<<3)>>2],0|cg[I+(i<<3)+4>>2],y^s^c|0,o^hg|0),S=0|aI(0|o,0|hg,0|N,0|S),C=0|aI(0|S,0|hg,(Q^H)&m^Q|0,(C^b)&D^C|0),E=0|aI(0|C,0|hg,0|B,0|E),B=hg,k=0|aI(0|E,0|B,0|v,0|k),v=hg,cg[g>>2]=k,cg[g+4>>2]=v,C=0|be(d,w,28),Q=hg,S=0|be(d,w,34),Q^=hg,N=0|be(d,w,39),Q=0|aI(0|E,0|B,S^C^N|0,Q^hg|0),p=0|aI(0|Q,0|hg,(l|u)&d|l&u|0,(p|_)&w|p&_|0),l=hg,cg[g+32>>2]=p,cg[g+32+4>>2]=l,Q=0|be(k,v,14),N=hg,C=0|be(k,v,18),N^=hg,S=0|be(k,v,41),B=4|h,E=0|cg[464+(B<<3)>>2],o=0|cg[464+(B<<3)+4>>2],c=0|cg[g+24>>2],s=0|cg[g+24+4>>2],N=0|aI(0|cg[I+(B<<3)>>2],0|cg[I+(B<<3)+4>>2],C^Q^S|0,N^hg|0),o=0|aI(0|N,0|hg,0|E,0|o),b=0|aI(0|o,0|hg,(H^m)&k^H|0,(b^D)&v^b|0),s=0|aI(0|b,0|hg,0|c,0|s),c=hg,b=0|aI(0|s,0|c,0|cg[g+56>>2],0|cg[g+56+4>>2]),H=hg,cg[g+56>>2]=b,cg[g+56+4>>2]=H,o=0|be(p,l,28),E=hg,N=0|be(p,l,34),E^=hg,S=0|be(p,l,39),E=0|aI(0|s,0|c,N^o^S|0,E^hg|0),_=0|aI(0|E,0|hg,(u|d)&p|u&d|0,(_|w)&l|_&w|0),u=hg,cg[g+24>>2]=_,cg[g+24+4>>2]=u,E=0|be(b,H,14),S=hg,o=0|be(b,H,18),S^=hg,N=0|be(b,H,41),c=5|h,s=0|cg[464+(c<<3)>>2],Q=0|cg[464+(c<<3)+4>>2],C=0|cg[g+16>>2],y=0|cg[g+16+4>>2],S=0|aI(0|cg[I+(c<<3)>>2],0|cg[I+(c<<3)+4>>2],o^E^N|0,S^hg|0),Q=0|aI(0|S,0|hg,0|s,0|Q),D=0|aI(0|Q,0|hg,(m^k)&b^m|0,(D^v)&H^D|0),y=0|aI(0|D,0|hg,0|C,0|y),C=hg,D=0|aI(0|y,0|C,0|cg[g+48>>2],0|cg[g+48+4>>2]),m=hg,cg[g+48>>2]=D,cg[g+48+4>>2]=m,Q=0|be(_,u,28),s=hg,S=0|be(_,u,34),s^=hg,N=0|be(_,u,39),s=0|aI(0|y,0|C,S^Q^N|0,s^hg|0),w=0|aI(0|s,0|hg,(d|p)&_|d&p|0,(w|l)&u|w&l|0),d=hg,cg[g+16>>2]=w,cg[g+16+4>>2]=d,s=0|be(D,m,14),N=hg,Q=0|be(D,m,18),N^=hg,S=0|be(D,m,41),C=6|h,y=0|cg[464+(C<<3)>>2],E=0|cg[464+(C<<3)+4>>2],o=0|cg[g+8>>2],e=0|cg[g+8+4>>2],N=0|aI(0|cg[I+(C<<3)>>2],0|cg[I+(C<<3)+4>>2],Q^s^S|0,N^hg|0),E=0|aI(0|N,0|hg,0|y,0|E),v=0|aI(0|E,0|hg,(k^b)&D^k|0,(v^H)&m^v|0),e=0|aI(0|v,0|hg,0|o,0|e),o=hg,v=0|aI(0|e,0|o,0|cg[g+40>>2],0|cg[g+40+4>>2]),k=hg,cg[g+40>>2]=v,cg[g+40+4>>2]=k,E=0|be(w,d,28),y=hg,N=0|be(w,d,34),y^=hg,S=0|be(w,d,39),y=0|aI(0|e,0|o,N^E^S|0,y^hg|0),l=0|aI(0|y,0|hg,(p|_)&w|p&_|0,(l|u)&d|l&u|0),p=hg,cg[g+8>>2]=l,cg[g+8+4>>2]=p,y=0|be(v,k,14),S=hg,E=0|be(v,k,18),S^=hg,N=0|be(v,k,41),o=7|h,e=0|cg[464+(o<<3)>>2],s=0|cg[464+(o<<3)+4>>2],Q=0|cg[g>>2],t=0|cg[g+4>>2],S=0|aI(0|cg[I+(o<<3)>>2],0|cg[I+(o<<3)+4>>2],E^y^N|0,S^hg|0),s=0|aI(0|S,0|hg,0|e,0|s),H=0|aI(0|s,0|hg,(b^D)&v^b|0,(H^m)&k^H|0),t=0|aI(0|H,0|hg,0|Q,0|t),Q=hg,H=0|aI(0|t,0|Q,0|cg[g+32>>2],0|cg[g+32+4>>2]),b=hg,cg[g+32>>2]=H,cg[g+32+4>>2]=b,s=0|be(l,p,28),e=hg,S=0|be(l,p,34),e^=hg,N=0|be(l,p,39),e=0|aI(0|t,0|Q,S^s^N|0,e^hg|0),u=0|aI(0|e,0|hg,(_|w)&l|_&w|0,(u|d)&p|u&d|0),_=hg,cg[g>>2]=u,cg[g+4>>2]=_,e=0|be(H,b,14),N=hg,s=0|be(H,b,18),N^=hg,S=0|be(H,b,41),Q=8|h,t=0|cg[464+(Q<<3)>>2],y=0|cg[464+(Q<<3)+4>>2],E=0|cg[g+56>>2],r=0|cg[g+56+4>>2],N=0|aI(0|cg[I+(Q<<3)>>2],0|cg[I+(Q<<3)+4>>2],s^e^S|0,N^hg|0),y=0|aI(0|N,0|hg,0|t,0|y),m=0|aI(0|y,0|hg,(D^v)&H^D|0,(m^k)&b^m|0),r=0|aI(0|m,0|hg,0|E,0|r),E=hg,m=0|aI(0|r,0|E,0|cg[g+24>>2],0|cg[g+24+4>>2]),D=hg,cg[g+24>>2]=m,cg[g+24+4>>2]=D,y=0|be(u,_,28),t=hg,N=0|be(u,_,34),t^=hg,S=0|be(u,_,39),t=0|aI(0|r,0|E,N^y^S|0,t^hg|0),d=0|aI(0|t,0|hg,(w|l)&u|w&l|0,(d|p)&_|d&p|0),w=hg,cg[g+56>>2]=d,cg[g+56+4>>2]=w,t=0|be(m,D,14),S=hg,y=0|be(m,D,18),S^=hg,N=0|be(m,D,41),E=9|h,r=0|cg[464+(E<<3)>>2],e=0|cg[464+(E<<3)+4>>2],s=0|cg[g+48>>2],f=0|cg[g+48+4>>2],S=0|aI(0|cg[I+(E<<3)>>2],0|cg[I+(E<<3)+4>>2],y^t^N|0,S^hg|0),e=0|aI(0|S,0|hg,0|r,0|e),k=0|aI(0|e,0|hg,(v^H)&m^v|0,(k^b)&D^k|0),f=0|aI(0|k,0|hg,0|s,0|f),s=hg,k=0|aI(0|f,0|s,0|cg[g+16>>2],0|cg[g+16+4>>2]),v=hg,cg[g+16>>2]=k,cg[g+16+4>>2]=v,e=0|be(d,w,28),r=hg,S=0|be(d,w,34),r^=hg,N=0|be(d,w,39),r=0|aI(0|f,0|s,S^e^N|0,r^hg|0),p=0|aI(0|r,0|hg,(l|u)&d|l&u|0,(p|_)&w|p&_|0),l=hg,cg[g+48>>2]=p,cg[g+48+4>>2]=l,r=0|be(k,v,14),N=hg,e=0|be(k,v,18),N^=hg,S=0|be(k,v,41),s=10|h,f=0|cg[464+(s<<3)>>2],t=0|cg[464+(s<<3)+4>>2],y=0|cg[g+40>>2],G=0|cg[g+40+4>>2],N=0|aI(0|cg[I+(s<<3)>>2],0|cg[I+(s<<3)+4>>2],e^r^S|0,N^hg|0),t=0|aI(0|N,0|hg,0|f,0|t),b=0|aI(0|t,0|hg,(H^m)&k^H|0,(b^D)&v^b|0),G=0|aI(0|b,0|hg,0|y,0|G),y=hg,b=0|aI(0|G,0|y,0|cg[g+8>>2],0|cg[g+8+4>>2]),H=hg,cg[g+8>>2]=b,cg[g+8+4>>2]=H,t=0|be(p,l,28),f=hg,N=0|be(p,l,34),f^=hg,S=0|be(p,l,39),f=0|aI(0|G,0|y,N^t^S|0,f^hg|0),_=0|aI(0|f,0|hg,(u|d)&p|u&d|0,(_|w)&l|_&w|0),u=hg,cg[g+40>>2]=_,cg[g+40+4>>2]=u,f=0|be(b,H,14),S=hg,t=0|be(b,H,18),S^=hg,N=0|be(b,H,41),y=11|h,G=0|cg[464+(y<<3)>>2],r=0|cg[464+(y<<3)+4>>2],e=0|cg[g+32>>2],U=0|cg[g+32+4>>2],S=0|aI(0|cg[I+(y<<3)>>2],0|cg[I+(y<<3)+4>>2],t^f^N|0,S^hg|0),r=0|aI(0|S,0|hg,0|G,0|r),D=0|aI(0|r,0|hg,(m^k)&b^m|0,(D^v)&H^D|0),U=0|aI(0|D,0|hg,0|e,0|U),e=hg,D=0|aI(0|U,0|e,0|cg[g>>2],0|cg[g+4>>2]),m=hg,cg[g>>2]=D,cg[g+4>>2]=m,r=0|be(_,u,28),G=hg,S=0|be(_,u,34),G^=hg,N=0|be(_,u,39),G=0|aI(0|U,0|e,S^r^N|0,G^hg|0),w=0|aI(0|G,0|hg,(d|p)&_|d&p|0,(w|l)&u|w&l|0),d=hg,cg[g+32>>2]=w,cg[g+32+4>>2]=d,G=0|be(D,m,14),N=hg,r=0|be(D,m,18),N^=hg,S=0|be(D,m,41),e=12|h,U=0|cg[464+(e<<3)>>2],f=0|cg[464+(e<<3)+4>>2],t=0|cg[g+24>>2],M=0|cg[g+24+4>>2],N=0|aI(0|cg[I+(e<<3)>>2],0|cg[I+(e<<3)+4>>2],r^G^S|0,N^hg|0),f=0|aI(0|N,0|hg,0|U,0|f),v=0|aI(0|f,0|hg,(k^b)&D^k|0,(v^H)&m^v|0),M=0|aI(0|v,0|hg,0|t,0|M),t=hg,v=0|aI(0|M,0|t,0|cg[g+56>>2],0|cg[g+56+4>>2]),k=hg,cg[g+56>>2]=v,cg[g+56+4>>2]=k,f=0|be(w,d,28),U=hg,N=0|be(w,d,34),U^=hg,S=0|be(w,d,39),U=0|aI(0|M,0|t,N^f^S|0,U^hg|0),l=0|aI(0|U,0|hg,(p|_)&w|p&_|0,(l|u)&d|l&u|0),p=hg,cg[g+24>>2]=l,cg[g+24+4>>2]=p,U=0|be(v,k,14),S=hg,f=0|be(v,k,18),S^=hg,N=0|be(v,k,41),t=13|h,M=0|cg[464+(t<<3)>>2],G=0|cg[464+(t<<3)+4>>2],r=0|cg[g+16>>2],R=0|cg[g+16+4>>2],S=0|aI(0|cg[I+(t<<3)>>2],0|cg[I+(t<<3)+4>>2],f^U^N|0,S^hg|0),G=0|aI(0|S,0|hg,0|M,0|G),H=0|aI(0|G,0|hg,(b^D)&v^b|0,(H^m)&k^H|0),R=0|aI(0|H,0|hg,0|r,0|R),r=hg,H=0|aI(0|R,0|r,0|cg[g+48>>2],0|cg[g+48+4>>2]),b=hg,cg[g+48>>2]=H,cg[g+48+4>>2]=b,G=0|be(l,p,28),M=hg,S=0|be(l,p,34),M^=hg,N=0|be(l,p,39),M=0|aI(0|R,0|r,S^G^N|0,M^hg|0),u=0|aI(0|M,0|hg,(_|w)&l|_&w|0,(u|d)&p|u&d|0),_=hg,cg[g+16>>2]=u,cg[g+16+4>>2]=_,M=0|be(H,b,14),N=hg,G=0|be(H,b,18),N^=hg,S=0|be(H,b,41),r=14|h,R=0|cg[464+(r<<3)>>2],U=0|cg[464+(r<<3)+4>>2],f=0|cg[g+8>>2],Y=0|cg[g+8+4>>2],N=0|aI(0|cg[I+(r<<3)>>2],0|cg[I+(r<<3)+4>>2],G^M^S|0,N^hg|0),U=0|aI(0|N,0|hg,0|R,0|U),m=0|aI(0|U,0|hg,(D^v)&H^D|0,(m^k)&b^m|0),Y=0|aI(0|m,0|hg,0|f,0|Y),f=hg,m=0|aI(0|Y,0|f,0|cg[g+40>>2],0|cg[g+40+4>>2]),D=hg,cg[g+40>>2]=m,cg[g+40+4>>2]=D,U=0|be(u,_,28),R=hg,N=0|be(u,_,34),R^=hg,S=0|be(u,_,39),R=0|aI(0|Y,0|f,N^U^S|0,R^hg|0),d=0|aI(0|R,0|hg,(w|l)&u|w&l|0,(d|p)&_|d&p|0),w=hg,cg[g+8>>2]=d,cg[g+8+4>>2]=w,R=0|be(m,D,14),S=hg,U=0|be(m,D,18),S^=hg,N=0|be(m,D,41),f=15|h,Y=0|cg[464+(f<<3)>>2],M=0|cg[464+(f<<3)+4>>2],G=0|cg[g>>2],F=0|cg[g+4>>2],S=0|aI(0|cg[I+(f<<3)>>2],0|cg[I+(f<<3)+4>>2],U^R^N|0,S^hg|0),M=0|aI(0|S,0|hg,0|Y,0|M),k=0|aI(0|M,0|hg,(v^H)&m^v|0,(k^b)&D^k|0),F=0|aI(0|k,0|hg,0|G,0|F),G=hg,k=0|aI(0|F,0|G,0|cg[g+32>>2],0|cg[g+32+4>>2]),cg[g+32>>2]=k,cg[g+32+4>>2]=hg,k=0|be(d,w,28),D=hg,b=0|be(d,w,34),D^=hg,v=0|be(d,w,39),D=0|aI(0|F,0|G,b^k^v|0,D^hg|0),_=0|aI(0|D,0|hg,(l|u)&d|l&u|0,(p|_)&w|p&_|0),cg[g>>2]=_,cg[g+4>>2]=hg,64==(0|h)){e=0;break}if(Y=0|cg[I+(r<<3)>>2],H=0|cg[I+(r<<3)+4>>2],R=0|be(Y,H,19),v=hg,m=0|be(Y,H,61),M=hg,H=0|Oe(0|Y,0|H,6),M=0|aI(H^R^m|0,hg^v^M|0,0|cg[I+(E<<3)>>2],0|cg[I+(E<<3)+4>>2]),v=hg,m=0|cg[I+(n<<3)>>2],R=0|cg[I+(n<<3)+4>>2],H=0|be(m,R,1),Y=hg,F=0|be(m,R,8),S=hg,b=0|Oe(0|m,0|R,7),S^=hg^Y,Y=I+(h<<3)|0,Y=0|aI(0|M,0|v,0|cg[Y>>2],0|cg[Y+4>>2]),S=0|aI(0|Y,0|hg,b^H^F|0,0|S),F=hg,h=h+16|0,H=I+(h<<3)|0,cg[H>>2]=S,cg[H+4>>2]=F,H=0|cg[I+(f<<3)>>2],b=0|cg[I+(f<<3)+4>>2],Y=0|be(H,b,19),v=hg,M=0|be(H,b,61),G=hg,b=0|Oe(0|H,0|b,6),G=0|aI(b^Y^M|0,hg^v^G|0,0|cg[I+(n+9<<3)>>2],0|cg[I+(n+9<<3)+4>>2]),v=hg,M=0|cg[I+(n+1<<3)>>2],Y=0|cg[I+(n+1<<3)+4>>2],b=0|be(M,Y,1),H=hg,U=0|be(M,Y,8),N=hg,k=0|Oe(0|M,0|Y,7),N^=hg^H,R=0|aI(0|G,0|v,0|m,0|R),N=0|aI(0|R,0|hg,k^b^U|0,0|N),U=hg,cg[I+(n+16<<3)>>2]=N,cg[I+(n+16<<3)+4>>2]=U,b=0|be(S,F,19),k=hg,R=0|be(S,F,61),m=hg,F=0|Oe(0|S,0|F,6),m=0|aI(F^b^R|0,hg^k^m|0,0|cg[I+(y<<3)>>2],0|cg[I+(y<<3)+4>>2]),k=hg,R=0|cg[I+(i<<3)>>2],b=0|cg[I+(i<<3)+4>>2],F=0|be(R,b,1),S=hg,v=0|be(R,b,8),G=hg,H=0|Oe(0|R,0|b,7),G^=hg^S,Y=0|aI(0|m,0|k,0|M,0|Y),G=0|aI(0|Y,0|hg,H^F^v|0,0|G),v=hg,cg[I+(a+16<<3)>>2]=G,cg[I+(a+16<<3)+4>>2]=v,F=0|be(N,U,19),H=hg,Y=0|be(N,U,61),M=hg,U=0|Oe(0|N,0|U,6),M=0|aI(U^F^Y|0,hg^H^M|0,0|cg[I+(i+9<<3)>>2],0|cg[I+(i+9<<3)+4>>2]),H=hg,Y=0|cg[I+(i+1<<3)>>2],F=0|cg[I+(i+1<<3)+4>>2],U=0|be(Y,F,1),N=hg,k=0|be(Y,F,8),m=hg,S=0|Oe(0|Y,0|F,7),m^=hg^N,b=0|aI(0|M,0|H,0|R,0|b),m=0|aI(0|b,0|hg,S^U^k|0,0|m),k=hg,cg[I+(i+16<<3)>>2]=m,cg[I+(i+16<<3)+4>>2]=k,U=0|be(G,v,19),S=hg,b=0|be(G,v,61),R=hg,v=0|Oe(0|G,0|v,6),R=0|aI(v^U^b|0,hg^S^R|0,0|cg[I+(t<<3)>>2],0|cg[I+(t<<3)+4>>2]),S=hg,b=0|cg[I+(c<<3)>>2],U=0|cg[I+(c<<3)+4>>2],v=0|be(b,U,1),G=hg,H=0|be(b,U,8),M=hg,N=0|Oe(0|b,0|U,7),M^=hg^G,F=0|aI(0|R,0|S,0|Y,0|F),M=0|aI(0|F,0|hg,N^v^H|0,0|M),H=hg,cg[I+(B+16<<3)>>2]=M,cg[I+(B+16<<3)+4>>2]=H,v=0|be(m,k,19),N=hg,F=0|be(m,k,61),Y=hg,k=0|Oe(0|m,0|k,6),Y=0|aI(k^v^F|0,hg^N^Y|0,0|cg[I+(c+9<<3)>>2],0|cg[I+(c+9<<3)+4>>2]),N=hg,F=0|cg[I+(c+1<<3)>>2],v=0|cg[I+(c+1<<3)+4>>2],k=0|be(F,v,1),m=hg,S=0|be(F,v,8),R=hg,G=0|Oe(0|F,0|v,7),R^=hg^m,U=0|aI(0|Y,0|N,0|b,0|U),R=0|aI(0|U,0|hg,G^k^S|0,0|R),S=hg,cg[I+(c+16<<3)>>2]=R,cg[I+(c+16<<3)+4>>2]=S,k=0|be(M,H,19),G=hg,U=0|be(M,H,61),b=hg,H=0|Oe(0|M,0|H,6),b=0|aI(H^k^U|0,hg^G^b|0,0|cg[I+(f<<3)>>2],0|cg[I+(f<<3)+4>>2]),G=hg,U=0|cg[I+(o<<3)>>2],k=0|cg[I+(o<<3)+4>>2],H=0|be(U,k,1),M=hg,N=0|be(U,k,8),Y=hg,m=0|Oe(0|U,0|k,7),Y^=hg^M,v=0|aI(0|b,0|G,0|F,0|v),Y=0|aI(0|v,0|hg,m^H^N|0,0|Y),N=hg,cg[I+(C+16<<3)>>2]=Y,cg[I+(C+16<<3)+4>>2]=N,H=0|be(R,S,19),m=hg,v=0|be(R,S,61),F=hg,S=0|Oe(0|R,0|S,6),F=0|aI(S^H^v|0,hg^m^F|0,0|cg[I+(o+9<<3)>>2],0|cg[I+(o+9<<3)+4>>2]),m=hg,v=0|cg[I+(o+1<<3)>>2],H=0|cg[I+(o+1<<3)+4>>2],S=0|be(v,H,1),R=hg,G=0|be(v,H,8),b=hg,M=0|Oe(0|v,0|H,7),b^=hg^R,k=0|aI(0|F,0|m,0|U,0|k),b=0|aI(0|k,0|hg,M^S^G|0,0|b),G=hg,cg[I+(o+16<<3)>>2]=b,cg[I+(o+16<<3)+4>>2]=G,S=0|be(Y,N,19),M=hg,k=0|be(Y,N,61),U=hg,N=0|Oe(0|Y,0|N,6),U=0|aI(N^S^k|0,hg^M^U|0,0|cg[I+(Q+9<<3)>>2],0|cg[I+(Q+9<<3)+4>>2]),M=hg,k=0|cg[I+(E<<3)>>2],S=0|cg[I+(E<<3)+4>>2],N=0|be(k,S,1),Y=hg,m=0|be(k,S,8),F=hg,R=0|Oe(0|k,0|S,7),F^=hg^Y,H=0|aI(0|U,0|M,0|v,0|H),F=0|aI(0|H,0|hg,R^N^m|0,0|F),m=hg,cg[I+(Q+16<<3)>>2]=F,cg[I+(Q+16<<3)+4>>2]=m,N=0|be(b,G,19),R=hg,H=0|be(b,G,61),v=hg,G=0|Oe(0|b,0|G,6),v=0|aI(G^N^H|0,hg^R^v|0,0|cg[I+(E+9<<3)>>2],0|cg[I+(E+9<<3)+4>>2]),R=hg,H=0|cg[I+(E+1<<3)>>2],N=0|cg[I+(E+1<<3)+4>>2],G=0|be(H,N,1),b=hg,M=0|be(H,N,8),U=hg,Y=0|Oe(0|H,0|N,7),U^=hg^b,S=0|aI(0|v,0|R,0|k,0|S),U=0|aI(0|S,0|hg,Y^G^M|0,0|U),M=hg,cg[I+(E+16<<3)>>2]=U,cg[I+(E+16<<3)+4>>2]=M,G=0|be(F,m,19),Y=hg,S=0|be(F,m,61),k=hg,m=0|Oe(0|F,0|m,6),k=0|aI(m^G^S|0,hg^Y^k|0,0|cg[I+(s+9<<3)>>2],0|cg[I+(s+9<<3)+4>>2]),Y=hg,S=0|cg[I+(y<<3)>>2],G=0|cg[I+(y<<3)+4>>2],m=0|be(S,G,1),F=hg,R=0|be(S,G,8),v=hg,b=0|Oe(0|S,0|G,7),v^=hg^F,N=0|aI(0|k,0|Y,0|H,0|N),v=0|aI(0|N,0|hg,b^m^R|0,0|v),R=hg,cg[I+(s+16<<3)>>2]=v,cg[I+(s+16<<3)+4>>2]=R,m=0|be(U,M,19),b=hg,N=0|be(U,M,61),H=hg,M=0|Oe(0|U,0|M,6),H=0|aI(M^m^N|0,hg^b^H|0,0|cg[I+(y+9<<3)>>2],0|cg[I+(y+9<<3)+4>>2]),b=hg,N=0|cg[I+(y+1<<3)>>2],m=0|cg[I+(y+1<<3)+4>>2],M=0|be(N,m,1),U=hg,Y=0|be(N,m,8),k=hg,F=0|Oe(0|N,0|m,7),k^=hg^U,G=0|aI(0|H,0|b,0|S,0|G),k=0|aI(0|G,0|hg,F^M^Y|0,0|k),Y=hg,cg[I+(y+16<<3)>>2]=k,cg[I+(y+16<<3)+4>>2]=Y,M=0|be(v,R,19),F=hg,G=0|be(v,R,61),S=hg,R=0|Oe(0|v,0|R,6),S=0|aI(R^M^G|0,hg^F^S|0,0|cg[I+(e+9<<3)>>2],0|cg[I+(e+9<<3)+4>>2]),F=hg,G=0|cg[I+(t<<3)>>2],M=0|cg[I+(t<<3)+4>>2],R=0|be(G,M,1),v=hg,b=0|be(G,M,8),H=hg,U=0|Oe(0|G,0|M,7),H^=hg^v,m=0|aI(0|S,0|F,0|N,0|m),H=0|aI(0|m,0|hg,U^R^b|0,0|H),b=hg,cg[I+(e+16<<3)>>2]=H,cg[I+(e+16<<3)+4>>2]=b,R=0|be(k,Y,19),e=hg,U=0|be(k,Y,61),m=hg,Y=0|Oe(0|k,0|Y,6),m=0|aI(Y^R^U|0,hg^e^m|0,0|cg[I+(t+9<<3)>>2],0|cg[I+(t+9<<3)+4>>2]),e=hg,U=0|cg[I+(t+1<<3)>>2],R=0|cg[I+(t+1<<3)+4>>2],Y=0|be(U,R,1),k=hg,N=0|be(U,R,8),F=hg,S=0|Oe(0|U,0|R,7),F^=hg^k,M=0|aI(0|m,0|e,0|G,0|M),F=0|aI(0|M,0|hg,S^Y^N|0,0|F),N=hg,cg[I+(t+16<<3)>>2]=F,cg[I+(t+16<<3)+4>>2]=N,Y=0|be(H,b,19),S=hg,M=0|be(H,b,61),G=hg,e=0|Oe(0|H,0|b,6),G=0|aI(e^Y^M|0,hg^S^G|0,0|cg[I+(r+9<<3)>>2],0|cg[I+(r+9<<3)+4>>2]),S=hg,M=0|cg[I+(f<<3)>>2],Y=0|cg[I+(f<<3)+4>>2],e=0|be(M,Y,1),b=hg,H=0|be(M,Y,8),t=hg,m=0|Oe(0|M,0|Y,7),t^=hg^b,R=0|aI(0|G,0|S,0|U,0|R),t=0|aI(0|R,0|hg,m^e^H|0,0|t),cg[I+(r+16<<3)>>2]=t,cg[I+(r+16<<3)+4>>2]=hg,t=0|be(F,N,19),H=hg,e=0|be(F,N,61),m=hg,N=0|Oe(0|F,0|N,6),m=0|aI(N^t^e|0,hg^H^m|0,0|cg[I+(f+9<<3)>>2],0|cg[I+(f+9<<3)+4>>2]),H=hg,e=0|cg[I+(f+1<<3)>>2],t=0|cg[I+(f+1<<3)+4>>2],N=0|be(e,t,1),F=hg,R=0|be(e,t,8),U=hg,S=0|Oe(0|e,0|t,7),U^=hg^F,Y=0|aI(0|m,0|H,0|M,0|Y),U=0|aI(0|Y,0|hg,S^N^R|0,0|U),cg[I+(f+16<<3)>>2]=U,cg[I+(f+16<<3)+4>>2]=hg,(0|h)>=80){e=0;break}}do{R=g+(e<<3)|0,R=0|aI(0|cg[(U=A+(e<<3)|0)>>2],0|cg[U+4>>2],0|cg[R>>2],0|cg[R+4>>2]),cg[U>>2]=R,cg[U+4>>2]=hg,e=e+1|0}while(8!=(0|e))}function n(A){var e=0,I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0,Y=0,S=0,N=0,R=0,U=0,P=0,J=0,x=0,L=0,K=0,X=0,T=0,V=0,j=0,Z=0,O=0,W=0,q=0,z=0,$=0,AA=0,eA=0,IA=0,gA=0,tA=0,rA=0,nA=0,aA=0,iA=0,BA=0,cA=0,CA=0,oA=0,QA=0,EA=0,sA=0;x=0|Me(0|Bg[(A|=0)>>0],0|Bg[A+1>>0],0|Bg[A+2>>0]),I=0|Oe(0|(I=0|zA(A+2|0)),0|hg,5),L=0|Oe(0|(L=0|Me(0|Bg[A+5>>0],0|Bg[A+6>>0],0|Bg[A+7>>0])),0|hg,2),T=0|Oe(0|(T=0|zA(A+7|0)),0|hg,7),w=0|Oe(0|(w=0|zA(A+10|0)),0|hg,4),j=0|Oe(0|(j=0|Me(0|Bg[A+13>>0],0|Bg[A+14>>0],0|Bg[A+15>>0])),0|hg,1),J=0|Oe(0|(J=0|zA(A+15|0)),0|hg,6),gA=0|Oe(0|(gA=0|Me(0|Bg[A+18>>0],0|Bg[A+19>>0],0|Bg[A+20>>0])),0|hg,3),cA=0|Me(0|Bg[A+21>>0],0|Bg[A+22>>0],0|Bg[A+23>>0]),AA=0|Oe(0|(AA=0|zA(A+23|0)),0|hg,5),BA=0|Oe(0|(BA=0|Me(0|Bg[A+26>>0],0|Bg[A+27>>0],0|Bg[A+28>>0])),0|hg,2),f=0|Oe(0|(f=0|zA(A+28|0)),0|hg,7),EA=0|Oe(0|(EA=0|zA(A+31|0)),0|hg,4),_=0|Oe(0|(_=0|Me(0|Bg[A+34>>0],0|Bg[A+35>>0],0|Bg[A+36>>0])),0|hg,1),d=0|Oe(0|(d=0|zA(A+36|0)),0|hg,6),Q=0|Oe(0|(Q=0|Me(0|Bg[A+39>>0],0|Bg[A+40>>0],0|Bg[A+41>>0])),0|hg,3),O=0|Me(0|Bg[A+42>>0],0|Bg[A+43>>0],0|Bg[A+44>>0]),U=0|Oe(0|(U=0|zA(A+44|0)),0|hg,5),q=0|Oe(0|(q=0|Me(0|Bg[A+47>>0],0|Bg[A+48>>0],0|Bg[A+49>>0])),0|hg,2),sA=0|Oe(0|(sA=0|zA(A+49|0)),0|hg,7),p=0|Oe(0|(p=0|zA(A+52|0)),0|hg,4),h=0|Oe(0|(h=0|Me(0|Bg[A+55>>0],0|Bg[A+56>>0],0|Bg[A+57>>0])),0|hg,1),r=0|Oe(0|(r=0|zA(A+57|0)),0|hg,6),n=0|Fe(0|(m=0|Oe(0|(m=0|zA(A+60|0)),0|hg,3)),0|(e=hg),666643,0),g=hg,rA=0|Fe(0|m,0|e,470296,0),B=hg,P=0|Fe(0|m,0|e,654183,0),c=hg,G=0|Fe(0|m,0|e,-997805,-1),Y=hg,Q=0|aI(0|(i=0|Fe(0|m,0|e,136657,0)),0|hg,2097151&Q|0,0),i=hg,O=0|aI(0|(e=0|Fe(0|m,0|e,-683901,-1)),0|hg,2097151&O|0,0),e=hg,m=0|Fe(2097151&r|0,0,666643,0),v=hg,y=0|Fe(2097151&r|0,0,470296,0),k=hg,t=0|Fe(2097151&r|0,0,654183,0),o=hg,D=0|Fe(2097151&r|0,0,-997805,-1),H=hg,Z=0|Fe(2097151&r|0,0,136657,0),F=hg,r=0|aI(0|Q,0|i,0|(r=0|Fe(2097151&r|0,0,-683901,-1)),0|hg),i=hg,Q=0|Fe(2097151&h|0,0,666643,0),C=hg,M=0|Fe(2097151&h|0,0,470296,0),u=hg,l=0|Fe(2097151&h|0,0,654183,0),X=hg,CA=0|Fe(2097151&h|0,0,-997805,-1),tA=hg,E=0|Fe(2097151&h|0,0,136657,0),W=hg,F=0|aI(0|(Y=0|aI(0|(d=0|aI(0|(h=0|Fe(2097151&h|0,0,-683901,-1)),0|hg,2097151&d|0,0)),0|hg,0|G,0|Y)),0|hg,0|Z,0|F),Z=hg,Y=0|Fe(2097151&p|0,0,666643,0),G=hg,d=0|Fe(2097151&p|0,0,470296,0),h=hg,nA=0|Fe(2097151&p|0,0,654183,0),a=hg,R=0|Fe(2097151&p|0,0,-997805,-1),s=hg,QA=0|Fe(2097151&p|0,0,136657,0),oA=hg,p=0|Fe(2097151&p|0,0,-683901,-1),V=hg,b=0|Fe(2097151&sA|0,0,666643,0),K=hg,eA=0|Fe(2097151&sA|0,0,470296,0),IA=hg,$=0|Fe(2097151&sA|0,0,654183,0),z=hg,iA=0|Fe(2097151&sA|0,0,-997805,-1),aA=hg,S=0|Fe(2097151&sA|0,0,136657,0),N=hg,o=0|aI(0|(B=0|aI(0|(tA=0|aI(0|(oA=0|aI(0|(EA=0|aI(0|(sA=0|Fe(2097151&sA|0,0,-683901,-1)),0|hg,2097151&EA|0,0)),0|hg,0|QA,0|oA)),0|hg,0|CA,0|tA)),0|hg,0|rA,0|B)),0|hg,0|t,0|o),t=hg,J=0|aI(0|(B=0|Fe(2097151&q|0,0,666643,0)),0|hg,2097151&J|0,0),B=hg,rA=0|Fe(2097151&q|0,0,470296,0),tA=hg,G=0|aI(0|(IA=0|aI(0|(cA=0|aI(0|(CA=0|Fe(2097151&q|0,0,654183,0)),0|hg,2097151&cA|0,0)),0|hg,0|eA,0|IA)),0|hg,0|Y,0|G),Y=hg,IA=0|Fe(2097151&q|0,0,-997805,-1),eA=hg,v=0|aI(0|(u=0|aI(0|(a=0|aI(0|(aA=0|aI(0|(BA=0|aI(0|(cA=0|Fe(2097151&q|0,0,136657,0)),0|hg,2097151&BA|0,0)),0|hg,0|iA,0|aA)),0|hg,0|nA,0|a)),0|hg,0|M,0|u)),0|hg,0|m,0|v),m=hg,q=0|Fe(2097151&q|0,0,-683901,-1),u=hg,M=0|Oe(0|(M=0|aI(0|J,0|B,1048576,0)),0|hg,21),a=hg,K=0|aI(0|(K=0|aI(0|(gA=0|aI(0|rA,0|tA,2097151&gA|0,0)),0|hg,0|b,0|K)),0|hg,0|M,0|a),b=hg,a=0|rI(0|J,0|B,0|(a=0|Ze(0|M,0|a,21)),0|hg),B=hg,J=0|Oe(0|(J=0|aI(0|G,0|Y,1048576,0)),0|hg,21),M=hg,C=0|aI(0|(C=0|aI(0|(h=0|aI(0|(z=0|aI(0|(AA=0|aI(0|IA,0|eA,2097151&AA|0,0)),0|hg,0|$,0|z)),0|hg,0|d,0|h)),0|hg,0|Q,0|C)),0|hg,0|J,0|M),Q=hg,M=0|Ze(0|J,0|M,21),J=hg,h=0|ve(0|(h=0|aI(0|v,0|m,1048576,0)),0|hg,21),d=hg,k=0|aI(0|(k=0|aI(0|(g=0|aI(0|(X=0|aI(0|(s=0|aI(0|(N=0|aI(0|(f=0|aI(0|q,0|u,2097151&f|0,0)),0|hg,0|S,0|N)),0|hg,0|R,0|s)),0|hg,0|l,0|X)),0|hg,0|n,0|g)),0|hg,0|y,0|k)),0|hg,0|h,0|d),y=hg,d=0|Ze(0|h,0|d,21),h=hg,g=0|ve(0|(g=0|aI(0|o,0|t,1048576,0)),0|hg,21),n=hg,H=0|aI(0|(H=0|aI(0|(c=0|aI(0|(W=0|aI(0|(_=0|aI(0|p,0|V,2097151&_|0,0)),0|hg,0|E,0|W)),0|hg,0|P,0|c)),0|hg,0|D,0|H)),0|hg,0|g,0|n),D=hg,n=0|rI(0|o,0|t,0|(n=0|Ze(0|g,0|n,21)),0|hg),t=hg,i=0|aI(0|r,0|i,0|(o=0|ve(0|(o=0|aI(0|F,0|Z,1048576,0)),0|hg,21)),0|(g=hg)),r=hg,g=0|rI(0|F,0|Z,0|(g=0|Ze(0|o,0|g,21)),0|hg),Z=hg,U=0|aI(0|(F=0|ve(0|(F=0|aI(0|O,0|e,1048576,0)),0|hg,21)),0|(o=hg),2097151&U|0,0),c=hg,o=0|rI(0|O,0|e,0|(o=0|Ze(0|F,0|o,21)),0|hg),e=hg,P=0|rI(0|K,0|b,0|(P=0|Ze(0|(O=0|Oe(0|(O=0|aI(0|K,0|b,1048576,0)),0|hg,21)),0|(F=hg),21)),0|hg),b=hg,E=0|Ze(0|(K=0|ve(0|(K=0|aI(0|C,0|Q,1048576,0)),0|hg,21)),0|(W=hg),21),_=hg,t=0|aI(0|(V=0|ve(0|(V=0|aI(0|k,0|y,1048576,0)),0|hg,21)),0|(p=hg),0|n,0|t),n=hg,p=0|rI(0|k,0|y,0|(p=0|Ze(0|V,0|p,21)),0|hg),y=hg,Z=0|aI(0|(k=0|ve(0|(k=0|aI(0|H,0|D,1048576,0)),0|hg,21)),0|(V=hg),0|g,0|Z),g=hg,V=0|rI(0|H,0|D,0|(V=0|Ze(0|k,0|V,21)),0|hg),D=hg,e=0|aI(0|(H=0|ve(0|(H=0|aI(0|i,0|r,1048576,0)),0|hg,21)),0|(k=hg),0|o,0|e),o=hg,k=0|rI(0|i,0|r,0|(k=0|Ze(0|H,0|k,21)),0|hg),r=hg,j=0|aI(0|(i=0|Fe(0|U,0|c,666643,0)),0|hg,2097151&j|0,0),i=hg,H=0|aI(0|a,0|B,0|(H=0|Fe(0|U,0|c,470296,0)),0|hg),B=hg,a=0|aI(0|P,0|b,0|(a=0|Fe(0|U,0|c,654183,0)),0|hg),b=hg,P=0|Fe(0|U,0|c,-997805,-1),X=hg,l=0|Fe(0|U,0|c,136657,0),s=hg,h=0|rI(0|(W=0|aI(0|(m=0|aI(0|(c=0|Fe(0|U,0|c,-683901,-1)),0|hg,0|v,0|m)),0|hg,0|K,0|W)),0|hg,0|d,0|h),d=hg,w=0|aI(0|(W=0|Fe(0|e,0|o,666643,0)),0|hg,2097151&w|0,0),W=hg,K=0|aI(0|j,0|i,0|(K=0|Fe(0|e,0|o,470296,0)),0|hg),i=hg,j=0|aI(0|H,0|B,0|(j=0|Fe(0|e,0|o,654183,0)),0|hg),B=hg,H=0|aI(0|a,0|b,0|(H=0|Fe(0|e,0|o,-997805,-1)),0|hg),b=hg,a=0|Fe(0|e,0|o,136657,0),m=hg,o=0|Fe(0|e,0|o,-683901,-1),e=hg,T=0|aI(0|(v=0|Fe(0|k,0|r,666643,0)),0|hg,2097151&T|0,0),v=hg,c=0|aI(0|w,0|W,0|(c=0|Fe(0|k,0|r,470296,0)),0|hg),W=hg,w=0|aI(0|K,0|i,0|(w=0|Fe(0|k,0|r,654183,0)),0|hg),i=hg,K=0|aI(0|j,0|B,0|(K=0|Fe(0|k,0|r,-997805,-1)),0|hg),B=hg,j=0|aI(0|H,0|b,0|(j=0|Fe(0|k,0|r,136657,0)),0|hg),b=hg,r=0|Fe(0|k,0|r,-683901,-1),k=hg,k=0|aI(0|(m=0|aI(0|(X=0|aI(0|(J=0|rI(0|(Y=0|aI(0|O,0|F,0|G,0|Y)),0|hg,0|M,0|J)),0|hg,0|P,0|X)),0|hg,0|a,0|m)),0|hg,0|r,0|k),r=hg,L=0|aI(0|(m=0|Fe(0|Z,0|g,666643,0)),0|hg,2097151&L|0,0),m=hg,a=0|aI(0|T,0|v,0|(a=0|Fe(0|Z,0|g,470296,0)),0|hg),v=hg,T=0|aI(0|c,0|W,0|(T=0|Fe(0|Z,0|g,654183,0)),0|hg),W=hg,c=0|aI(0|w,0|i,0|(c=0|Fe(0|Z,0|g,-997805,-1)),0|hg),i=hg,w=0|aI(0|K,0|B,0|(w=0|Fe(0|Z,0|g,136657,0)),0|hg),B=hg,g=0|aI(0|j,0|b,0|(g=0|Fe(0|Z,0|g,-683901,-1)),0|hg),b=hg,j=0|Fe(0|V,0|D,666643,0),Z=hg,K=0|Fe(0|V,0|D,470296,0),X=hg,P=0|Fe(0|V,0|D,654183,0),J=hg,M=0|Fe(0|V,0|D,-997805,-1),Y=hg,G=0|Fe(0|V,0|D,136657,0),F=hg,D=0|aI(0|w,0|B,0|(D=0|Fe(0|V,0|D,-683901,-1)),0|hg),B=hg,x=0|aI(0|(w=0|Fe(0|t,0|n,666643,0)),0|hg,2097151&x|0,0),w=hg,V=0|Fe(0|t,0|n,470296,0),O=hg,X=0|aI(0|(H=0|aI(0|L,0|m,0|(H=0|Fe(0|t,0|n,654183,0)),0|hg)),0|hg,0|K,0|X),K=hg,H=0|Fe(0|t,0|n,-997805,-1),m=hg,Y=0|aI(0|(L=0|aI(0|T,0|W,0|(L=0|Fe(0|t,0|n,136657,0)),0|hg)),0|hg,0|M,0|Y),M=hg,n=0|Fe(0|t,0|n,-683901,-1),t=hg,L=0|ve(0|(L=0|aI(0|x,0|w,1048576,0)),0|hg,21),W=hg,Z=0|aI(0|(Z=0|aI(0|(I=0|aI(0|V,0|O,2097151&I|0,0)),0|hg,0|j,0|Z)),0|hg,0|L,0|W),j=hg,W=0|rI(0|x,0|w,0|(W=0|Ze(0|L,0|W,21)),0|hg),w=hg,x=0|ve(0|(x=0|aI(0|X,0|K,1048576,0)),0|hg,21),L=hg,J=0|aI(0|(J=0|aI(0|(m=0|aI(0|a,0|v,0|H,0|m)),0|hg,0|P,0|J)),0|hg,0|x,0|L),P=hg,L=0|Ze(0|x,0|L,21),x=hg,m=0|ve(0|(m=0|aI(0|Y,0|M,1048576,0)),0|hg,21),H=hg,F=0|aI(0|(F=0|aI(0|(t=0|aI(0|c,0|i,0|n,0|t)),0|hg,0|G,0|F)),0|hg,0|m,0|H),G=hg,H=0|Ze(0|m,0|H,21),m=hg,b=0|aI(0|g,0|b,0|(t=0|ve(0|(t=0|aI(0|D,0|B,1048576,0)),0|hg,21)),0|(n=hg)),g=hg,n=0|rI(0|D,0|B,0|(n=0|Ze(0|t,0|n,21)),0|hg),B=hg,D=0|ve(0|(D=0|aI(0|k,0|r,1048576,0)),0|hg,21),t=hg,e=0|aI(0|(e=0|aI(0|(_=0|rI(0|(Q=0|aI(0|l,0|s,0|C,0|Q)),0|hg,0|E,0|_)),0|hg,0|o,0|e)),0|hg,0|D,0|t),o=hg,t=0|rI(0|k,0|r,0|(t=0|Ze(0|D,0|t,21)),0|hg),r=hg,y=0|aI(0|(k=0|ve(0|(k=0|aI(0|h,0|d,1048576,0)),0|hg,21)),0|(D=hg),0|p,0|y),p=hg,D=0|rI(0|h,0|d,0|(D=0|Ze(0|k,0|D,21)),0|hg),d=hg,_=0|Ze(0|(h=0|ve(0|(h=0|aI(0|Z,0|j,1048576,0)),0|hg,21)),0|(k=hg),21),E=hg,s=0|Ze(0|(Q=0|ve(0|(Q=0|aI(0|J,0|P,1048576,0)),0|hg,21)),0|(C=hg),21),l=hg,B=0|aI(0|n,0|B,0|(i=0|ve(0|(i=0|aI(0|F,0|G,1048576,0)),0|hg,21)),0|(c=hg)),n=hg,c=0|Ze(0|i,0|c,21),i=hg,r=0|aI(0|t,0|r,0|(v=0|ve(0|(v=0|aI(0|b,0|g,1048576,0)),0|hg,21)),0|(a=hg)),t=hg,a=0|rI(0|b,0|g,0|(a=0|Ze(0|v,0|a,21)),0|hg),g=hg,d=0|aI(0|D,0|d,0|(b=0|ve(0|(b=0|aI(0|e,0|o,1048576,0)),0|hg,21)),0|(v=hg)),D=hg,v=0|rI(0|e,0|o,0|(v=0|Ze(0|b,0|v,21)),0|hg),o=hg,I=0|rI(0|y,0|p,0|(I=0|Ze(0|(e=0|ve(0|(e=0|aI(0|y,0|p,1048576,0)),0|hg,21)),0|(b=hg),21)),0|hg),p=hg,y=0|aI(0|W,0|w,0|(y=0|Fe(0|e,0|b,666643,0)),0|hg),w=hg,W=0|Fe(0|e,0|b,470296,0),O=hg,V=0|Fe(0|e,0|b,654183,0),T=hg,U=0|Fe(0|e,0|b,-997805,-1),R=hg,N=0|Fe(0|e,0|b,136657,0),S=hg,b=0|Fe(0|e,0|b,-683901,-1),e=hg,f=0|ve(0|y,0|w,21),u=hg,E=0|aI(0|(E=0|rI(0|(j=0|aI(0|W,0|O,0|Z,0|j)),0|hg,0|_,0|E)),0|hg,0|f,0|u),_=hg,u=0|rI(0|y,0|w,0|(u=0|Ze(0|f,0|u,21)),0|hg),w=hg,y=0|ve(0|E,0|_,21),f=hg,k=0|aI(0|(k=0|aI(0|(x=0|rI(0|(K=0|aI(0|V,0|T,0|X,0|K)),0|hg,0|L,0|x)),0|hg,0|h,0|k)),0|hg,0|y,0|f),h=hg,f=0|rI(0|E,0|_,0|(f=0|Ze(0|y,0|f,21)),0|hg),_=hg,E=0|ve(0|k,0|h,21),y=hg,l=0|aI(0|(l=0|rI(0|(R=0|aI(0|J,0|P,0|U,0|R)),0|hg,0|s,0|l)),0|hg,0|E,0|y),s=hg,y=0|rI(0|k,0|h,0|(y=0|Ze(0|E,0|y,21)),0|hg),h=hg,k=0|ve(0|l,0|s,21),E=hg,C=0|aI(0|(C=0|aI(0|(m=0|rI(0|(M=0|aI(0|N,0|S,0|Y,0|M)),0|hg,0|H,0|m)),0|hg,0|Q,0|C)),0|hg,0|k,0|E),Q=hg,E=0|rI(0|l,0|s,0|(E=0|Ze(0|k,0|E,21)),0|hg),s=hg,l=0|ve(0|C,0|Q,21),k=hg,i=0|aI(0|(i=0|rI(0|(e=0|aI(0|F,0|G,0|b,0|e)),0|hg,0|c,0|i)),0|hg,0|l,0|k),c=hg,k=0|rI(0|C,0|Q,0|(k=0|Ze(0|l,0|k,21)),0|hg),Q=hg,n=0|aI(0|B,0|n,0|(C=0|ve(0|i,0|c,21)),0|(l=hg)),B=hg,l=0|rI(0|i,0|c,0|(l=0|Ze(0|C,0|l,21)),0|hg),c=hg,g=0|aI(0|(i=0|ve(0|n,0|B,21)),0|(C=hg),0|a,0|g),a=hg,C=0|rI(0|n,0|B,0|(C=0|Ze(0|i,0|C,21)),0|hg),B=hg,t=0|aI(0|r,0|t,0|(n=0|ve(0|g,0|a,21)),0|(i=hg)),r=hg,i=0|rI(0|g,0|a,0|(i=0|Ze(0|n,0|i,21)),0|hg),a=hg,o=0|aI(0|(g=0|ve(0|t,0|r,21)),0|(n=hg),0|v,0|o),v=hg,n=0|rI(0|t,0|r,0|(n=0|Ze(0|g,0|n,21)),0|hg),r=hg,D=0|aI(0|d,0|D,0|(t=0|ve(0|o,0|v,21)),0|(g=hg)),d=hg,g=0|rI(0|o,0|v,0|(g=0|Ze(0|t,0|g,21)),0|hg),v=hg,p=0|aI(0|(o=0|ve(0|D,0|d,21)),0|(t=hg),0|I,0|p),I=hg,t=0|rI(0|D,0|d,0|(t=0|Ze(0|o,0|t,21)),0|hg),d=hg,e=0|rI(0|p,0|I,0|(e=0|Ze(0|(D=0|ve(0|p,0|I,21)),0|(o=hg),21)),0|hg),I=hg,w=0|aI(0|(p=0|Fe(0|D,0|o,666643,0)),0|hg,0|u,0|w),u=hg,p=0|aI(0|f,0|_,0|(p=0|Fe(0|D,0|o,470296,0)),0|hg),_=hg,f=0|aI(0|y,0|h,0|(f=0|Fe(0|D,0|o,654183,0)),0|hg),h=hg,y=0|aI(0|E,0|s,0|(y=0|Fe(0|D,0|o,-997805,-1)),0|hg),s=hg,E=0|aI(0|k,0|Q,0|(E=0|Fe(0|D,0|o,136657,0)),0|hg),Q=hg,o=0|aI(0|l,0|c,0|(o=0|Fe(0|D,0|o,-683901,-1)),0|hg),c=hg,_=0|aI(0|p,0|_,0|(l=0|ve(0|w,0|u,21)),0|(D=hg)),p=hg,D=0|rI(0|w,0|u,0|(D=0|Ze(0|l,0|D,21)),0|hg),u=hg,h=0|aI(0|f,0|h,0|(w=0|ve(0|_,0|p,21)),0|(l=hg)),f=hg,l=0|rI(0|_,0|p,0|(l=0|Ze(0|w,0|l,21)),0|hg),p=hg,s=0|aI(0|y,0|s,0|(_=0|ve(0|h,0|f,21)),0|(w=hg)),y=hg,w=0|rI(0|h,0|f,0|(w=0|Ze(0|_,0|w,21)),0|hg),f=hg,Q=0|aI(0|E,0|Q,0|(h=0|ve(0|s,0|y,21)),0|(_=hg)),E=hg,_=0|rI(0|s,0|y,0|(_=0|Ze(0|h,0|_,21)),0|hg),y=hg,c=0|aI(0|o,0|c,0|(s=0|ve(0|Q,0|E,21)),0|(h=hg)),o=hg,h=0|rI(0|Q,0|E,0|(h=0|Ze(0|s,0|h,21)),0|hg),E=hg,B=0|aI(0|(Q=0|ve(0|c,0|o,21)),0|(s=hg),0|C,0|B),C=hg,s=0|rI(0|c,0|o,0|(s=0|Ze(0|Q,0|s,21)),0|hg),o=hg,a=0|aI(0|(c=0|ve(0|B,0|C,21)),0|(Q=hg),0|i,0|a),i=hg,Q=0|rI(0|B,0|C,0|(Q=0|Ze(0|c,0|Q,21)),0|hg),C=hg,r=0|aI(0|(B=0|ve(0|a,0|i,21)),0|(c=hg),0|n,0|r),n=hg,c=0|rI(0|a,0|i,0|(c=0|Ze(0|B,0|c,21)),0|hg),i=hg,v=0|aI(0|(a=0|ve(0|r,0|n,21)),0|(B=hg),0|g,0|v),g=hg,B=0|rI(0|r,0|n,0|(B=0|Ze(0|a,0|B,21)),0|hg),n=hg,d=0|aI(0|(r=0|ve(0|v,0|g,21)),0|(a=hg),0|t,0|d),t=hg,a=0|rI(0|v,0|g,0|(a=0|Ze(0|r,0|a,21)),0|hg),g=hg,I=0|aI(0|(v=0|ve(0|d,0|t,21)),0|(r=hg),0|e,0|I),e=hg,r=0|rI(0|d,0|t,0|(r=0|Ze(0|v,0|r,21)),0|hg),t=hg,Bg[A>>0]=D,d=0|Oe(0|D,0|u,8),Bg[A+1>>0]=d,u=0|Oe(0|D,0|u,16),D=hg,d=0|Ze(0|l,0|p,5),Bg[A+2>>0]=d|u,u=0|Oe(0|l,0|p,3),Bg[A+3>>0]=u,u=0|Oe(0|l,0|p,11),Bg[A+4>>0]=u,p=0|Oe(0|l,0|p,19),l=hg,u=0|Ze(0|w,0|f,2),Bg[A+5>>0]=u|p,p=0|Oe(0|w,0|f,6),Bg[A+6>>0]=p,f=0|Oe(0|w,0|f,14),w=hg,p=0|Ze(0|_,0|y,7),Bg[A+7>>0]=p|f,f=0|Oe(0|_,0|y,1),Bg[A+8>>0]=f,f=0|Oe(0|_,0|y,9),Bg[A+9>>0]=f,y=0|Oe(0|_,0|y,17),_=hg,f=0|Ze(0|h,0|E,4),Bg[A+10>>0]=f|y,y=0|Oe(0|h,0|E,4),Bg[A+11>>0]=y,y=0|Oe(0|h,0|E,12),Bg[A+12>>0]=y,E=0|Oe(0|h,0|E,20),h=hg,y=0|Ze(0|s,0|o,1),Bg[A+13>>0]=y|E,E=0|Oe(0|s,0|o,7),Bg[A+14>>0]=E,o=0|Oe(0|s,0|o,15),s=hg,E=0|Ze(0|Q,0|C,6),Bg[A+15>>0]=E|o,o=0|Oe(0|Q,0|C,2),Bg[A+16>>0]=o,o=0|Oe(0|Q,0|C,10),Bg[A+17>>0]=o,C=0|Oe(0|Q,0|C,18),Q=hg,o=0|Ze(0|c,0|i,3),Bg[A+18>>0]=o|C,C=0|Oe(0|c,0|i,5),Bg[A+19>>0]=C,i=0|Oe(0|c,0|i,13),Bg[A+20>>0]=i,Bg[A+21>>0]=B,i=0|Oe(0|B,0|n,8),Bg[A+22>>0]=i,n=0|Oe(0|B,0|n,16),B=hg,i=0|Ze(0|a,0|g,5),Bg[A+23>>0]=i|n,n=0|Oe(0|a,0|g,3),Bg[A+24>>0]=n,n=0|Oe(0|a,0|g,11),Bg[A+25>>0]=n,g=0|Oe(0|a,0|g,19),a=hg,n=0|Ze(0|r,0|t,2),Bg[A+26>>0]=n|g,g=0|Oe(0|r,0|t,6),Bg[A+27>>0]=g,t=0|Oe(0|r,0|t,14),r=hg,g=0|Ze(0|I,0|e,7),Bg[A+28>>0]=t|g,g=0|Oe(0|I,0|e,1),Bg[A+29>>0]=g,g=0|Oe(0|I,0|e,9),Bg[A+30>>0]=g,e=0|Oe(0|I,0|e,17),Bg[A+31>>0]=e}function a(A,e,I){A|=0,I|=0;var g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0,Y=0,S=0,N=0,R=0,U=0,P=0,J=0,x=0,L=0,K=0,X=0,T=0,V=0,j=0,Z=0,O=0,W=0,q=0,z=0,$=0,AA=0,eA=0,IA=0,gA=0,tA=0,rA=0,nA=0,aA=0,iA=0,BA=0,cA=0,CA=0,oA=0,QA=0,EA=0,sA=0,yA=0,hA=0,fA=0,_A=0,pA=0,wA=0,uA=0,lA=0,dA=0,DA=0,vA=0,kA=0,bA=0,GA=0,FA=0,mA=0,HA=0,MA=0,YA=0,SA=0,NA=0,RA=0,UA=0,PA=0,JA=0,xA=0,LA=0,KA=0,XA=0,TA=0,VA=0,jA=0,ZA=0,OA=0,WA=0,qA=0,zA=0,$A=0,Ae=0,ee=0,Ie=0,ge=0,te=0,re=0,ne=0,ae=0,ie=0,Be=0,ce=0,Ce=0,oe=0,Qe=0,Ee=0,se=0,ye=0,he=0,fe=0,_e=0,pe=0,we=0,ue=0,le=0,de=0,De=0,ke=0,be=0,Ge=0,me=0,He=0,Me=0,Ye=0,Se=0,Ne=0,Re=0,Ue=0,Pe=0,Je=0,xe=0,Le=0,Ke=0,Xe=0,Te=0,Ve=0,je=0,Oe=0,We=0,qe=0,ze=0,$e=0,AI=0,eI=0,II=0,gI=0,tI=0,nI=0,iI=0,BI=0,cI=0,CI=0,oI=0,QI=0,EI=0,sI=0,yI=0,hI=0,fI=0,_I=0,pI=0,wI=0,uI=0,lI=0,dI=0,DI=0,vI=0,kI=0,bI=0,GI=0,FI=0,mI=0,HI=0,MI=0,YI=0,SI=0,NI=0,RI=0,UI=0,PI=0,JI=0,xI=0,LI=0,KI=0,XI=0;Q=0|cg[(e|=0)>>2],o=0|cg[e+4>>2],B=0|cg[e+8>>2],gA=0|cg[e+12>>2],R=0|cg[e+16>>2],N=0|cg[e+20>>2],r=0|cg[e+24>>2],IA=0|cg[e+28>>2],S=0|cg[e+32>>2],s=0|cg[e+36>>2],H=0|cg[I>>2],KI=0|cg[I+4>>2],gI=0|cg[I+8>>2],ye=0|cg[I+12>>2],HA=0|cg[I+16>>2],oI=0|cg[I+20>>2],be=0|cg[I+24>>2],KA=0|cg[I+28>>2],tA=0|cg[I+32>>2],XI=0|cg[I+36>>2],xI=0|Fe(0|H,((0|H)<0)<<31>>31|0,0|Q,((0|Q)<0)<<31>>31|0),JI=hg,DI=0|Fe(0|KI,((0|KI)<0)<<31>>31|0,0|Q,((0|Q)<0)<<31>>31|0),dI=hg,fe=0|Fe(0|gI,((0|gI)<0)<<31>>31|0,0|Q,((0|Q)<0)<<31>>31|0),he=hg,YA=0|Fe(0|ye,((0|ye)<0)<<31>>31|0,0|Q,((0|Q)<0)<<31>>31|0),MA=hg,sI=0|Fe(0|HA,((0|HA)<0)<<31>>31|0,0|Q,((0|Q)<0)<<31>>31|0),EI=hg,He=0|Fe(0|oI,((0|oI)<0)<<31>>31|0,0|Q,((0|Q)<0)<<31>>31|0),me=hg,VA=0|Fe(0|be,((0|be)<0)<<31>>31|0,0|Q,((0|Q)<0)<<31>>31|0),TA=hg,aA=0|Fe(0|KA,((0|KA)<0)<<31>>31|0,0|Q,((0|Q)<0)<<31>>31|0),nA=hg,P=0|Fe(0|tA,((0|tA)<0)<<31>>31|0,0|Q,((0|Q)<0)<<31>>31|0),U=hg,Q=0|Fe(0|XI,((0|XI)<0)<<31>>31|0,0|Q,((0|Q)<0)<<31>>31|0),c=hg,tI=0|Fe(0|H,((0|H)<0)<<31>>31|0,0|o,((0|o)<0)<<31>>31|0),nI=hg,ue=0|Fe(0|KI,((0|KI)<0)<<31>>31|0,o<<1|0,((o<<1|0)<0)<<31>>31|0),we=hg,NA=0|Fe(0|gI,((0|gI)<0)<<31>>31|0,0|o,((0|o)<0)<<31>>31|0),SA=hg,hI=0|Fe(0|ye,((0|ye)<0)<<31>>31|0,o<<1|0,((o<<1|0)<0)<<31>>31|0),yI=hg,Ye=0|Fe(0|HA,((0|HA)<0)<<31>>31|0,0|o,((0|o)<0)<<31>>31|0),Me=hg,ZA=0|Fe(0|oI,((0|oI)<0)<<31>>31|0,o<<1|0,((o<<1|0)<0)<<31>>31|0),jA=hg,BA=0|Fe(0|be,((0|be)<0)<<31>>31|0,0|o,((0|o)<0)<<31>>31|0),iA=hg,x=0|Fe(0|KA,((0|KA)<0)<<31>>31|0,o<<1|0,((o<<1|0)<0)<<31>>31|0),J=hg,f=0|Fe(0|tA,((0|tA)<0)<<31>>31|0,0|o,((0|o)<0)<<31>>31|0),h=hg,o=0|Fe(19*XI|0,0|(I=((19*XI|0)<0)<<31>>31),o<<1|0,((o<<1|0)<0)<<31>>31|0),E=hg,pe=0|Fe(0|H,((0|H)<0)<<31>>31|0,0|B,((0|B)<0)<<31>>31|0),_e=hg,JA=0|Fe(0|KI,((0|KI)<0)<<31>>31|0,0|B,((0|B)<0)<<31>>31|0),PA=hg,_I=0|Fe(0|gI,((0|gI)<0)<<31>>31|0,0|B,((0|B)<0)<<31>>31|0),fI=hg,Ne=0|Fe(0|ye,((0|ye)<0)<<31>>31|0,0|B,((0|B)<0)<<31>>31|0),Se=hg,WA=0|Fe(0|HA,((0|HA)<0)<<31>>31|0,0|B,((0|B)<0)<<31>>31|0),OA=hg,CA=0|Fe(0|oI,((0|oI)<0)<<31>>31|0,0|B,((0|B)<0)<<31>>31|0),cA=hg,K=0|Fe(0|be,((0|be)<0)<<31>>31|0,0|B,((0|B)<0)<<31>>31|0),L=hg,p=0|Fe(0|KA,((0|KA)<0)<<31>>31|0,0|B,((0|B)<0)<<31>>31|0),_=hg,kI=0|Fe(19*tA|0,0|(rA=((19*tA|0)<0)<<31>>31),0|B,((0|B)<0)<<31>>31|0),vI=hg,B=0|Fe(19*XI|0,0|I,0|B,((0|B)<0)<<31>>31|0),i=hg,UA=0|Fe(0|H,((0|H)<0)<<31>>31|0,0|gA,((0|gA)<0)<<31>>31|0),RA=hg,lI=0|Fe(0|KI,((0|KI)<0)<<31>>31|0,gA<<1|0,((gA<<1|0)<0)<<31>>31|0),uI=hg,Ue=0|Fe(0|gI,((0|gI)<0)<<31>>31|0,0|gA,((0|gA)<0)<<31>>31|0),Re=hg,zA=0|Fe(0|ye,((0|ye)<0)<<31>>31|0,gA<<1|0,((gA<<1|0)<0)<<31>>31|0),qA=hg,QA=0|Fe(0|HA,((0|HA)<0)<<31>>31|0,0|gA,((0|gA)<0)<<31>>31|0),oA=hg,T=0|Fe(0|oI,((0|oI)<0)<<31>>31|0,gA<<1|0,((gA<<1|0)<0)<<31>>31|0),X=hg,u=0|Fe(0|be,((0|be)<0)<<31>>31|0,0|gA,((0|gA)<0)<<31>>31|0),w=hg,GI=0|Fe(19*KA|0,0|(XA=((19*KA|0)<0)<<31>>31),gA<<1|0,((gA<<1|0)<0)<<31>>31|0),bI=hg,Xe=0|Fe(19*tA|0,0|rA,0|gA,((0|gA)<0)<<31>>31|0),Ke=hg,gA=0|Fe(19*XI|0,0|I,gA<<1|0,((gA<<1|0)<0)<<31>>31|0),t=hg,wI=0|Fe(0|H,((0|H)<0)<<31>>31|0,0|R,((0|R)<0)<<31>>31|0),pI=hg,Le=0|Fe(0|KI,((0|KI)<0)<<31>>31|0,0|R,((0|R)<0)<<31>>31|0),xe=hg,Ae=0|Fe(0|gI,((0|gI)<0)<<31>>31|0,0|R,((0|R)<0)<<31>>31|0),$A=hg,sA=0|Fe(0|ye,((0|ye)<0)<<31>>31|0,0|R,((0|R)<0)<<31>>31|0),EA=hg,j=0|Fe(0|HA,((0|HA)<0)<<31>>31|0,0|R,((0|R)<0)<<31>>31|0),V=hg,d=0|Fe(0|oI,((0|oI)<0)<<31>>31|0,0|R,((0|R)<0)<<31>>31|0),l=hg,mI=0|Fe(19*be|0,0|(Ge=((19*be|0)<0)<<31>>31),0|R,((0|R)<0)<<31>>31|0),FI=hg,Ve=0|Fe(19*KA|0,0|XA,0|R,((0|R)<0)<<31>>31|0),Te=hg,ne=0|Fe(19*tA|0,0|rA,0|R,((0|R)<0)<<31>>31|0),re=hg,R=0|Fe(19*XI|0,0|I,0|R,((0|R)<0)<<31>>31|0),g=hg,Je=0|Fe(0|H,((0|H)<0)<<31>>31|0,0|N,((0|N)<0)<<31>>31|0),Pe=hg,te=0|Fe(0|KI,((0|KI)<0)<<31>>31|0,N<<1|0,((N<<1|0)<0)<<31>>31|0),ge=hg,hA=0|Fe(0|gI,((0|gI)<0)<<31>>31|0,0|N,((0|N)<0)<<31>>31|0),yA=hg,O=0|Fe(0|ye,((0|ye)<0)<<31>>31|0,N<<1|0,((N<<1|0)<0)<<31>>31|0),Z=hg,v=0|Fe(0|HA,((0|HA)<0)<<31>>31|0,0|N,((0|N)<0)<<31>>31|0),D=hg,MI=0|Fe(19*oI|0,0|(QI=((19*oI|0)<0)<<31>>31),N<<1|0,((N<<1|0)<0)<<31>>31|0),HI=hg,Oe=0|Fe(19*be|0,0|Ge,0|N,((0|N)<0)<<31>>31|0),je=hg,ie=0|Fe(19*KA|0,0|XA,N<<1|0,((N<<1|0)<0)<<31>>31|0),ae=hg,dA=0|Fe(19*tA|0,0|rA,0|N,((0|N)<0)<<31>>31|0),lA=hg,e=0|Fe(19*XI|0,0|I,N<<1|0,((N<<1|0)<0)<<31>>31|0),N=hg,Ie=0|Fe(0|H,((0|H)<0)<<31>>31|0,0|r,((0|r)<0)<<31>>31|0),ee=hg,wA=0|Fe(0|KI,((0|KI)<0)<<31>>31|0,0|r,((0|r)<0)<<31>>31|0),pA=hg,q=0|Fe(0|gI,((0|gI)<0)<<31>>31|0,0|r,((0|r)<0)<<31>>31|0),W=hg,b=0|Fe(0|ye,((0|ye)<0)<<31>>31|0,0|r,((0|r)<0)<<31>>31|0),k=hg,SI=0|Fe(19*HA|0,((19*HA|0)<0)<<31>>31|0,0|r,((0|r)<0)<<31>>31|0),YI=hg,qe=0|Fe(19*oI|0,0|QI,0|r,((0|r)<0)<<31>>31|0),We=hg,ce=0|Fe(19*be|0,0|Ge,0|r,((0|r)<0)<<31>>31|0),Be=hg,vA=0|Fe(19*KA|0,0|XA,0|r,((0|r)<0)<<31>>31|0),DA=hg,C=0|Fe(19*tA|0,0|rA,0|r,((0|r)<0)<<31>>31|0),y=hg,r=0|Fe(19*XI|0,0|I,0|r,((0|r)<0)<<31>>31|0),uA=hg,_A=0|Fe(0|H,((0|H)<0)<<31>>31|0,0|IA,((0|IA)<0)<<31>>31|0),fA=hg,eA=0|Fe(0|KI,((0|KI)<0)<<31>>31|0,IA<<1|0,((IA<<1|0)<0)<<31>>31|0),AA=hg,F=0|Fe(0|gI,((0|gI)<0)<<31>>31|0,0|IA,((0|IA)<0)<<31>>31|0),G=hg,RI=0|Fe(19*ye|0,((19*ye|0)<0)<<31>>31|0,IA<<1|0,((IA<<1|0)<0)<<31>>31|0),NI=hg,$e=0|Fe(19*HA|0,((19*HA|0)<0)<<31>>31|0,0|IA,((0|IA)<0)<<31>>31|0),ze=hg,oe=0|Fe(19*oI|0,0|QI,IA<<1|0,((IA<<1|0)<0)<<31>>31|0),Ce=hg,bA=0|Fe(19*be|0,0|Ge,0|IA,((0|IA)<0)<<31>>31|0),kA=hg,BI=0|Fe(19*KA|0,0|XA,IA<<1|0,((IA<<1|0)<0)<<31>>31|0),iI=hg,de=0|Fe(19*tA|0,0|rA,0|IA,((0|IA)<0)<<31>>31|0),le=hg,IA=0|Fe(19*XI|0,0|I,IA<<1|0,((IA<<1|0)<0)<<31>>31|0),a=hg,$=0|Fe(0|H,((0|H)<0)<<31>>31|0,0|S,((0|S)<0)<<31>>31|0),z=hg,Y=0|Fe(0|KI,((0|KI)<0)<<31>>31|0,0|S,((0|S)<0)<<31>>31|0),M=hg,PI=0|Fe(19*gI|0,((19*gI|0)<0)<<31>>31|0,0|S,((0|S)<0)<<31>>31|0),UI=hg,eI=0|Fe(19*ye|0,((19*ye|0)<0)<<31>>31|0,0|S,((0|S)<0)<<31>>31|0),AI=hg,Ee=0|Fe(19*HA|0,((19*HA|0)<0)<<31>>31|0,0|S,((0|S)<0)<<31>>31|0),Qe=hg,FA=0|Fe(19*oI|0,0|QI,0|S,((0|S)<0)<<31>>31|0),GA=hg,CI=0|Fe(19*be|0,0|Ge,0|S,((0|S)<0)<<31>>31|0),cI=hg,ke=0|Fe(19*KA|0,0|XA,0|S,((0|S)<0)<<31>>31|0),De=hg,LA=0|Fe(19*tA|0,0|rA,0|S,((0|S)<0)<<31>>31|0),xA=hg,S=0|Fe(19*XI|0,0|I,0|S,((0|S)<0)<<31>>31|0),n=hg,H=0|Fe(0|H,((0|H)<0)<<31>>31|0,0|s,((0|s)<0)<<31>>31|0),m=hg,KI=0|Fe(19*KI|0,((19*KI|0)<0)<<31>>31|0,s<<1|0,((s<<1|0)<0)<<31>>31|0),LI=hg,gI=0|Fe(19*gI|0,((19*gI|0)<0)<<31>>31|0,0|s,((0|s)<0)<<31>>31|0),II=hg,ye=0|Fe(19*ye|0,((19*ye|0)<0)<<31>>31|0,s<<1|0,((s<<1|0)<0)<<31>>31|0),se=hg,HA=0|Fe(19*HA|0,((19*HA|0)<0)<<31>>31|0,0|s,((0|s)<0)<<31>>31|0),mA=hg,QI=0|Fe(19*oI|0,0|QI,s<<1|0,((s<<1|0)<0)<<31>>31|0),oI=hg,Ge=0|Fe(19*be|0,0|Ge,0|s,((0|s)<0)<<31>>31|0),be=hg,XA=0|Fe(19*KA|0,0|XA,s<<1|0,((s<<1|0)<0)<<31>>31|0),KA=hg,rA=0|Fe(19*tA|0,0|rA,0|s,((0|s)<0)<<31>>31|0),tA=hg,s=0|Fe(19*XI|0,0|I,s<<1|0,((s<<1|0)<0)<<31>>31|0),I=hg,E=0|aI(0|(vI=0|aI(0|(bI=0|aI(0|(FI=0|aI(0|(HI=0|aI(0|(YI=0|aI(0|(NI=0|aI(0|(UI=0|aI(0|(JI=0|aI(0|KI,0|LI,0|xI,0|JI)),0|hg,0|PI,0|UI)),0|hg,0|RI,0|NI)),0|hg,0|SI,0|YI)),0|hg,0|MI,0|HI)),0|hg,0|mI,0|FI)),0|hg,0|GI,0|bI)),0|hg,0|kI,0|vI)),0|hg,0|o,0|E),o=hg,nI=0|aI(0|DI,0|dI,0|tI,0|nI),tI=hg,N=0|aI(0|(y=0|aI(0|(iI=0|aI(0|(cI=0|aI(0|(oI=0|aI(0|(EI=0|aI(0|(yI=0|aI(0|(fI=0|aI(0|(pI=0|aI(0|lI,0|uI,0|wI,0|pI)),0|hg,0|_I,0|fI)),0|hg,0|hI,0|yI)),0|hg,0|sI,0|EI)),0|hg,0|QI,0|oI)),0|hg,0|CI,0|cI)),0|hg,0|BI,0|iI)),0|hg,0|C,0|y)),0|hg,0|e,0|N),e=hg,y=0|ve(0|(y=0|aI(0|E,0|o,33554432,0)),0|hg,26),C=hg,i=0|aI(0|(i=0|aI(0|(Ke=0|aI(0|(Te=0|aI(0|(je=0|aI(0|(We=0|aI(0|(ze=0|aI(0|(AI=0|aI(0|(II=0|aI(0|nI,0|tI,0|gI,0|II)),0|hg,0|eI,0|AI)),0|hg,0|$e,0|ze)),0|hg,0|qe,0|We)),0|hg,0|Oe,0|je)),0|hg,0|Ve,0|Te)),0|hg,0|Xe,0|Ke)),0|hg,0|B,0|i)),0|hg,0|y,0|C),B=hg,C=0|rI(0|E,0|o,0|(C=0|Ze(0|y,0|C,26)),0|hg),o=hg,E=0|ve(0|(E=0|aI(0|N,0|e,33554432,0)),0|hg,26),y=hg,uA=0|aI(0|(uA=0|aI(0|(le=0|aI(0|(De=0|aI(0|(be=0|aI(0|(me=0|aI(0|(Me=0|aI(0|(Se=0|aI(0|(Re=0|aI(0|(Pe=0|aI(0|Le,0|xe,0|Je,0|Pe)),0|hg,0|Ue,0|Re)),0|hg,0|Ne,0|Se)),0|hg,0|Ye,0|Me)),0|hg,0|He,0|me)),0|hg,0|Ge,0|be)),0|hg,0|ke,0|De)),0|hg,0|de,0|le)),0|hg,0|r,0|uA)),0|hg,0|E,0|y),r=hg,y=0|rI(0|N,0|e,0|(y=0|Ze(0|E,0|y,26)),0|hg),e=hg,N=0|ve(0|(N=0|aI(0|i,0|B,16777216,0)),0|hg,25),E=hg,t=0|aI(0|(t=0|aI(0|(re=0|aI(0|(ae=0|aI(0|(Be=0|aI(0|(Ce=0|aI(0|(Qe=0|aI(0|(se=0|aI(0|(he=0|aI(0|(_e=0|aI(0|ue,0|we,0|pe,0|_e)),0|hg,0|fe,0|he)),0|hg,0|ye,0|se)),0|hg,0|Ee,0|Qe)),0|hg,0|oe,0|Ce)),0|hg,0|ce,0|Be)),0|hg,0|ie,0|ae)),0|hg,0|ne,0|re)),0|hg,0|gA,0|t)),0|hg,0|N,0|E),gA=hg,E=0|rI(0|i,0|B,0|(E=0|Ze(0|N,0|E,25)),0|hg),B=hg,i=0|ve(0|(i=0|aI(0|uA,0|r,16777216,0)),0|hg,25),N=hg,a=0|aI(0|(a=0|aI(0|(xA=0|aI(0|(KA=0|aI(0|(TA=0|aI(0|(jA=0|aI(0|(OA=0|aI(0|(qA=0|aI(0|($A=0|aI(0|(ee=0|aI(0|te,0|ge,0|Ie,0|ee)),0|hg,0|Ae,0|$A)),0|hg,0|zA,0|qA)),0|hg,0|WA,0|OA)),0|hg,0|ZA,0|jA)),0|hg,0|VA,0|TA)),0|hg,0|XA,0|KA)),0|hg,0|LA,0|xA)),0|hg,0|IA,0|a)),0|hg,0|i,0|N),IA=hg,N=0|rI(0|uA,0|r,0|(N=0|Ze(0|i,0|N,25)),0|hg),r=hg,uA=0|ve(0|(uA=0|aI(0|t,0|gA,33554432,0)),0|hg,26),i=hg,g=0|aI(0|(g=0|aI(0|(lA=0|aI(0|(DA=0|aI(0|(kA=0|aI(0|(GA=0|aI(0|(mA=0|aI(0|(MA=0|aI(0|(SA=0|aI(0|(RA=0|aI(0|JA,0|PA,0|UA,0|RA)),0|hg,0|NA,0|SA)),0|hg,0|YA,0|MA)),0|hg,0|HA,0|mA)),0|hg,0|FA,0|GA)),0|hg,0|bA,0|kA)),0|hg,0|vA,0|DA)),0|hg,0|dA,0|lA)),0|hg,0|R,0|g)),0|hg,0|uA,0|i),R=hg,i=0|rI(0|t,0|gA,0|(i=0|Ze(0|uA,0|i,26)),0|hg),gA=0|ve(0|(gA=0|aI(0|a,0|IA,33554432,0)),0|hg,26),t=hg,n=0|aI(0|(n=0|aI(0|(tA=0|aI(0|(nA=0|aI(0|(iA=0|aI(0|(cA=0|aI(0|(oA=0|aI(0|(EA=0|aI(0|(yA=0|aI(0|(fA=0|aI(0|wA,0|pA,0|_A,0|fA)),0|hg,0|hA,0|yA)),0|hg,0|sA,0|EA)),0|hg,0|QA,0|oA)),0|hg,0|CA,0|cA)),0|hg,0|BA,0|iA)),0|hg,0|aA,0|nA)),0|hg,0|rA,0|tA)),0|hg,0|S,0|n)),0|hg,0|gA,0|t),S=hg,t=0|rI(0|a,0|IA,0|(t=0|Ze(0|gA,0|t,26)),0|hg),e=0|aI(0|(IA=0|ve(0|(IA=0|aI(0|g,0|R,16777216,0)),0|hg,25)),0|(a=hg),0|y,0|e),y=hg,a=0|rI(0|g,0|R,0|(a=0|Ze(0|IA,0|a,25)),0|hg),R=0|ve(0|(R=0|aI(0|n,0|S,16777216,0)),0|hg,25),g=hg,I=0|aI(0|(I=0|aI(0|(U=0|aI(0|(J=0|aI(0|(L=0|aI(0|(X=0|aI(0|(V=0|aI(0|(Z=0|aI(0|(W=0|aI(0|(z=0|aI(0|eA,0|AA,0|$,0|z)),0|hg,0|q,0|W)),0|hg,0|O,0|Z)),0|hg,0|j,0|V)),0|hg,0|T,0|X)),0|hg,0|K,0|L)),0|hg,0|x,0|J)),0|hg,0|P,0|U)),0|hg,0|s,0|I)),0|hg,0|R,0|g),s=hg,g=0|rI(0|n,0|S,0|(g=0|Ze(0|R,0|g,25)),0|hg),r=0|aI(0|N,0|r,0|(S=0|ve(0|(S=0|aI(0|e,0|y,33554432,0)),0|hg,26)),0|(n=hg)),n=0|rI(0|e,0|y,0|(n=0|Ze(0|S,0|n,26)),0|hg),y=0|ve(0|(y=0|aI(0|I,0|s,33554432,0)),0|hg,26),e=hg,c=0|aI(0|(c=0|aI(0|(h=0|aI(0|(_=0|aI(0|(w=0|aI(0|(l=0|aI(0|(D=0|aI(0|(k=0|aI(0|(G=0|aI(0|(m=0|aI(0|Y,0|M,0|H,0|m)),0|hg,0|F,0|G)),0|hg,0|b,0|k)),0|hg,0|v,0|D)),0|hg,0|d,0|l)),0|hg,0|u,0|w)),0|hg,0|p,0|_)),0|hg,0|f,0|h)),0|hg,0|Q,0|c)),0|hg,0|y,0|e),Q=hg,e=0|rI(0|I,0|s,0|(e=0|Ze(0|y,0|e,26)),0|hg),o=0|aI(0|(y=0|Fe(0|(s=0|ve(0|(s=0|aI(0|c,0|Q,16777216,0)),0|hg,25)),0|(I=hg),19,0)),0|hg,0|C,0|o),C=hg,I=0|rI(0|c,0|Q,0|(I=0|Ze(0|s,0|I,25)),0|hg),B=0|aI(0|E,0|B,0|(Q=0|ve(0|(Q=0|aI(0|o,0|C,33554432,0)),0|hg,26)),0|(c=hg)),c=0|rI(0|o,0|C,0|(c=0|Ze(0|Q,0|c,26)),0|hg),cg[A>>2]=c,cg[A+4>>2]=B,cg[A+8>>2]=i,cg[A+12>>2]=a,cg[A+16>>2]=n,cg[A+20>>2]=r,cg[A+24>>2]=t,cg[A+28>>2]=g,cg[A+32>>2]=e,cg[A+36>>2]=I}function i(A,e){A|=0;var I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0,Y=0,S=0,N=0,R=0,U=0,P=0,J=0,x=0,L=0,K=0,X=0,T=0,V=0,j=0,Z=0,O=0,W=0,q=0,z=0,$=0,AA=0,eA=0,IA=0,gA=0,tA=0,rA=0,nA=0,aA=0,iA=0,BA=0,cA=0,CA=0,oA=0,QA=0,EA=0,sA=0,yA=0,hA=0,fA=0,_A=0,pA=0,wA=0,uA=0,lA=0,dA=0,DA=0,vA=0,kA=0,bA=0,GA=0,FA=0,mA=0,HA=0,MA=0,YA=0,SA=0,NA=0,RA=0,UA=0,PA=0,JA=0,xA=0,LA=0,KA=0,XA=0,TA=0,VA=0,jA=0,ZA=0,OA=0,WA=0,qA=0,zA=0,$A=0,Ae=0,ee=0,Ie=0;c=0|cg[(e|=0)>>2],o=0|cg[e+4>>2],B=0|cg[e+8>>2],t=0|cg[e+12>>2],_=0|cg[e+16>>2],f=0|cg[e+20>>2],r=0|cg[e+24>>2],p=0|cg[e+28>>2],h=0|cg[e+32>>2],s=0|cg[e+36>>2],Ae=0|Fe(0|c,((0|c)<0)<<31>>31|0,0|c,((0|c)<0)<<31>>31|0),$A=hg,XA=0|Fe(c<<1|0,0|(Q=((c<<1|0)<0)<<31>>31),0|o,((0|o)<0)<<31>>31|0),KA=hg,UA=0|Fe(0|B,((0|B)<0)<<31>>31|0,c<<1|0,0|Q),RA=hg,bA=0|Fe(0|t,((0|t)<0)<<31>>31|0,c<<1|0,0|Q),kA=hg,yA=0|Fe(0|_,((0|_)<0)<<31>>31|0,c<<1|0,0|Q),sA=hg,nA=0|Fe(0|f,((0|f)<0)<<31>>31|0,c<<1|0,0|Q),rA=hg,W=0|Fe(0|r,((0|r)<0)<<31>>31|0,c<<1|0,0|Q),O=hg,J=0|Fe(0|p,((0|p)<0)<<31>>31|0,c<<1|0,0|Q),P=hg,F=0|Fe(0|h,((0|h)<0)<<31>>31|0,c<<1|0,0|Q),G=hg,Q=0|Fe(0|s,((0|s)<0)<<31>>31|0,c<<1|0,0|Q),c=hg,NA=0|Fe(o<<1|0,0|(E=((o<<1|0)<0)<<31>>31),0|o,((0|o)<0)<<31>>31|0),SA=hg,vA=0|Fe(o<<1|0,0|E,0|B,((0|B)<0)<<31>>31|0),DA=hg,pA=0|Fe(t<<1|0,0|(w=((t<<1|0)<0)<<31>>31),o<<1|0,0|E),_A=hg,cA=0|Fe(0|_,((0|_)<0)<<31>>31|0,o<<1|0,0|E),BA=hg,z=0|Fe(f<<1|0,((f<<1|0)<0)<<31>>31|0,o<<1|0,0|E),q=hg,L=0|Fe(0|r,((0|r)<0)<<31>>31|0,o<<1|0,0|E),x=hg,H=0|Fe(p<<1|0,((p<<1|0)<0)<<31>>31|0,o<<1|0,0|E),m=hg,C=0|Fe(0|h,((0|h)<0)<<31>>31|0,o<<1|0,0|E),y=hg,E=0|Fe(38*s|0,0|(e=((38*s|0)<0)<<31>>31),o<<1|0,0|E),o=hg,fA=0|Fe(0|B,((0|B)<0)<<31>>31|0,0|B,((0|B)<0)<<31>>31|0),hA=hg,iA=0|Fe(B<<1|0,((B<<1|0)<0)<<31>>31|0,0|t,((0|t)<0)<<31>>31|0),aA=hg,AA=0|Fe(0|_,((0|_)<0)<<31>>31|0,B<<1|0,((B<<1|0)<0)<<31>>31|0),$=hg,V=0|Fe(0|f,((0|f)<0)<<31>>31|0,B<<1|0,((B<<1|0)<0)<<31>>31|0),T=hg,U=0|Fe(0|r,((0|r)<0)<<31>>31|0,B<<1|0,((B<<1|0)<0)<<31>>31|0),R=hg,d=0|Fe(0|p,((0|p)<0)<<31>>31|0,B<<1|0,((B<<1|0)<0)<<31>>31|0),l=hg,ZA=0|Fe(19*h|0,0|(Z=((19*h|0)<0)<<31>>31),B<<1|0,((B<<1|0)<0)<<31>>31|0),jA=hg,B=0|Fe(38*s|0,0|e,0|B,((0|B)<0)<<31>>31|0),i=hg,IA=0|Fe(t<<1|0,0|w,0|t,((0|t)<0)<<31>>31|0),eA=hg,X=0|Fe(t<<1|0,0|w,0|_,((0|_)<0)<<31>>31|0),K=hg,Y=0|Fe(f<<1|0,((f<<1|0)<0)<<31>>31|0,t<<1|0,0|w),M=hg,b=0|Fe(0|r,((0|r)<0)<<31>>31|0,t<<1|0,0|w),k=hg,WA=0|Fe(38*p|0,0|(EA=((38*p|0)<0)<<31>>31),t<<1|0,0|w),OA=hg,JA=0|Fe(19*h|0,0|Z,t<<1|0,0|w),PA=hg,w=0|Fe(38*s|0,0|e,t<<1|0,0|w),t=hg,N=0|Fe(0|_,((0|_)<0)<<31>>31|0,0|_,((0|_)<0)<<31>>31|0),S=hg,v=0|Fe(_<<1|0,((_<<1|0)<0)<<31>>31|0,0|f,((0|f)<0)<<31>>31|0),D=hg,zA=0|Fe(19*r|0,((19*r|0)<0)<<31>>31|0,_<<1|0,((_<<1|0)<0)<<31>>31|0),qA=hg,LA=0|Fe(38*p|0,0|EA,0|_,((0|_)<0)<<31>>31|0),xA=hg,FA=0|Fe(19*h|0,0|Z,_<<1|0,((_<<1|0)<0)<<31>>31|0),GA=hg,_=0|Fe(38*s|0,0|e,0|_,((0|_)<0)<<31>>31|0),g=hg,Ie=0|Fe(38*f|0,((38*f|0)<0)<<31>>31|0,0|f,((0|f)<0)<<31>>31|0),ee=hg,VA=0|Fe(19*r|0,((19*r|0)<0)<<31>>31|0,f<<1|0,((f<<1|0)<0)<<31>>31|0),TA=hg,HA=0|Fe(38*p|0,0|EA,f<<1|0,((f<<1|0)<0)<<31>>31|0),mA=hg,uA=0|Fe(19*h|0,0|Z,f<<1|0,((f<<1|0)<0)<<31>>31|0),wA=hg,f=0|Fe(38*s|0,0|e,f<<1|0,((f<<1|0)<0)<<31>>31|0),I=hg,YA=0|Fe(19*r|0,((19*r|0)<0)<<31>>31|0,0|r,((0|r)<0)<<31>>31|0),MA=hg,dA=0|Fe(38*p|0,0|EA,0|r,((0|r)<0)<<31>>31|0),lA=hg,oA=0|Fe(19*h|0,0|Z,r<<1|0,((r<<1|0)<0)<<31>>31|0),CA=hg,r=0|Fe(38*s|0,0|e,0|r,((0|r)<0)<<31>>31|0),u=hg,EA=0|Fe(38*p|0,0|EA,0|p,((0|p)<0)<<31>>31|0),QA=hg,tA=0|Fe(19*h|0,0|Z,p<<1|0,((p<<1|0)<0)<<31>>31|0),gA=hg,p=0|Fe(38*s|0,0|e,p<<1|0,((p<<1|0)<0)<<31>>31|0),a=hg,Z=0|Fe(19*h|0,0|Z,0|h,((0|h)<0)<<31>>31|0),j=hg,h=0|Fe(38*s|0,0|e,0|h,((0|h)<0)<<31>>31|0),n=hg,s=0|Fe(38*s|0,0|e,0|s,((0|s)<0)<<31>>31|0),e=hg,o=0|aI(0|(jA=0|aI(0|(OA=0|aI(0|(qA=0|aI(0|($A=0|aI(0|Ie,0|ee,0|Ae,0|$A)),0|hg,0|zA,0|qA)),0|hg,0|WA,0|OA)),0|hg,0|ZA,0|jA)),0|hg,0|E,0|o),E=hg,i=0|aI(0|(PA=0|aI(0|(xA=0|aI(0|(KA=0|aI(0|VA,0|TA,0|XA,0|KA)),0|hg,0|LA,0|xA)),0|hg,0|JA,0|PA)),0|hg,0|B,0|i),B=hg,t=0|aI(0|(GA=0|aI(0|(mA=0|aI(0|(MA=0|aI(0|(SA=0|aI(0|UA,0|RA,0|NA,0|SA)),0|hg,0|YA,0|MA)),0|hg,0|HA,0|mA)),0|hg,0|FA,0|GA)),0|hg,0|w,0|t),w=hg,g=0|aI(0|(wA=0|aI(0|(lA=0|aI(0|(DA=0|aI(0|bA,0|kA,0|vA,0|DA)),0|hg,0|dA,0|lA)),0|hg,0|uA,0|wA)),0|hg,0|_,0|g),_=hg,I=0|aI(0|(CA=0|aI(0|(QA=0|aI(0|(sA=0|aI(0|(hA=0|aI(0|pA,0|_A,0|fA,0|hA)),0|hg,0|yA,0|sA)),0|hg,0|EA,0|QA)),0|hg,0|oA,0|CA)),0|hg,0|f,0|I),f=hg,u=0|aI(0|(gA=0|aI(0|(rA=0|aI(0|(aA=0|aI(0|cA,0|BA,0|iA,0|aA)),0|hg,0|nA,0|rA)),0|hg,0|tA,0|gA)),0|hg,0|r,0|u),r=hg,a=0|aI(0|(j=0|aI(0|(O=0|aI(0|(q=0|aI(0|($=0|aI(0|IA,0|eA,0|AA,0|$)),0|hg,0|z,0|q)),0|hg,0|W,0|O)),0|hg,0|Z,0|j)),0|hg,0|p,0|a),p=hg,n=0|aI(0|(P=0|aI(0|(x=0|aI(0|(K=0|aI(0|V,0|T,0|X,0|K)),0|hg,0|L,0|x)),0|hg,0|J,0|P)),0|hg,0|h,0|n),h=hg,e=0|aI(0|(G=0|aI(0|(m=0|aI(0|(M=0|aI(0|(S=0|aI(0|U,0|R,0|N,0|S)),0|hg,0|Y,0|M)),0|hg,0|H,0|m)),0|hg,0|F,0|G)),0|hg,0|s,0|e),s=hg,c=0|aI(0|(y=0|aI(0|(l=0|aI(0|(D=0|aI(0|b,0|k,0|v,0|D)),0|hg,0|d,0|l)),0|hg,0|C,0|y)),0|hg,0|Q,0|c),Q=hg,E=0|Ze(0|o,0|E,1),o=hg,B=0|Ze(0|i,0|B,1),i=hg,w=0|Ze(0|t,0|w,1),t=hg,_=0|Ze(0|g,0|_,1),g=hg,f=0|Ze(0|I,0|f,1),I=hg,r=0|Ze(0|u,0|r,1),u=hg,p=0|Ze(0|a,0|p,1),a=hg,h=0|Ze(0|n,0|h,1),n=hg,s=0|Ze(0|e,0|s,1),e=hg,Q=0|Ze(0|c,0|Q,1),c=hg,i=0|aI(0|(y=0|ve(0|(y=0|aI(0|E,0|o,33554432,0)),0|hg,26)),0|(C=hg),0|B,0|i),B=hg,C=0|rI(0|E,0|o,0|(C=0|Ze(0|y,0|C,26)),0|hg),o=hg,u=0|aI(0|(E=0|ve(0|(E=0|aI(0|f,0|I,33554432,0)),0|hg,26)),0|(y=hg),0|r,0|u),r=hg,y=0|rI(0|f,0|I,0|(y=0|Ze(0|E,0|y,26)),0|hg),I=hg,t=0|aI(0|(f=0|ve(0|(f=0|aI(0|i,0|B,16777216,0)),0|hg,25)),0|(E=hg),0|w,0|t),w=hg,E=0|rI(0|i,0|B,0|(E=0|Ze(0|f,0|E,25)),0|hg),B=hg,a=0|aI(0|(i=0|ve(0|(i=0|aI(0|u,0|r,16777216,0)),0|hg,25)),0|(f=hg),0|p,0|a),p=hg,f=0|rI(0|u,0|r,0|(f=0|Ze(0|i,0|f,25)),0|hg),r=hg,g=0|aI(0|(u=0|ve(0|(u=0|aI(0|t,0|w,33554432,0)),0|hg,26)),0|(i=hg),0|_,0|g),_=hg,i=0|rI(0|t,0|w,0|(i=0|Ze(0|u,0|i,26)),0|hg),n=0|aI(0|(w=0|ve(0|(w=0|aI(0|a,0|p,33554432,0)),0|hg,26)),0|(t=hg),0|h,0|n),h=hg,t=0|rI(0|a,0|p,0|(t=0|Ze(0|w,0|t,26)),0|hg),I=0|aI(0|(p=0|ve(0|(p=0|aI(0|g,0|_,16777216,0)),0|hg,25)),0|(a=hg),0|y,0|I),y=hg,a=0|rI(0|g,0|_,0|(a=0|Ze(0|p,0|a,25)),0|hg),e=0|aI(0|(_=0|ve(0|(_=0|aI(0|n,0|h,16777216,0)),0|hg,25)),0|(g=hg),0|s,0|e),s=hg,g=0|rI(0|n,0|h,0|(g=0|Ze(0|_,0|g,25)),0|hg),r=0|aI(0|f,0|r,0|(h=0|ve(0|(h=0|aI(0|I,0|y,33554432,0)),0|hg,26)),0|(n=hg)),n=0|rI(0|I,0|y,0|(n=0|Ze(0|h,0|n,26)),0|hg),c=0|aI(0|(y=0|ve(0|(y=0|aI(0|e,0|s,33554432,0)),0|hg,26)),0|(I=hg),0|Q,0|c),Q=hg,I=0|rI(0|e,0|s,0|(I=0|Ze(0|y,0|I,26)),0|hg),o=0|aI(0|(y=0|Fe(0|(s=0|ve(0|(s=0|aI(0|c,0|Q,16777216,0)),0|hg,25)),0|(e=hg),19,0)),0|hg,0|C,0|o),C=hg,e=0|rI(0|c,0|Q,0|(e=0|Ze(0|s,0|e,25)),0|hg),B=0|aI(0|E,0|B,0|(Q=0|ve(0|(Q=0|aI(0|o,0|C,33554432,0)),0|hg,26)),0|(c=hg)),c=0|rI(0|o,0|C,0|(c=0|Ze(0|Q,0|c,26)),0|hg),cg[A>>2]=c,cg[A+4>>2]=B,cg[A+8>>2]=i,cg[A+12>>2]=a,cg[A+16>>2]=n,cg[A+20>>2]=r,cg[A+24>>2]=t,cg[A+28>>2]=g,cg[A+32>>2]=I,cg[A+36>>2]=e}function B(A,e){A|=0;var I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0,Y=0,S=0,N=0,R=0,U=0,P=0,J=0,x=0,L=0,K=0,X=0,T=0,V=0,j=0,Z=0,O=0,W=0,q=0,z=0,$=0,AA=0,eA=0,IA=0,gA=0,tA=0,rA=0,nA=0,aA=0,iA=0,BA=0,cA=0,CA=0,oA=0,QA=0,EA=0,sA=0,yA=0,hA=0,fA=0,_A=0,pA=0,wA=0,uA=0,lA=0,dA=0,DA=0,vA=0,kA=0,bA=0,GA=0,FA=0,mA=0,HA=0,MA=0,YA=0,SA=0,NA=0,RA=0,UA=0,PA=0,JA=0,xA=0,LA=0,KA=0,XA=0,TA=0,VA=0,jA=0,ZA=0,OA=0,WA=0,qA=0,zA=0,$A=0,Ae=0,ee=0,Ie=0;c=0|cg[(e|=0)>>2],E=0|cg[e+4>>2],B=0|cg[e+8>>2],t=0|cg[e+12>>2],k=0|cg[e+16>>2],I=0|cg[e+20>>2],r=0|cg[e+24>>2],U=0|cg[e+28>>2],D=0|cg[e+32>>2],s=0|cg[e+36>>2],Ae=0|Fe(0|c,((0|c)<0)<<31>>31|0,0|c,((0|c)<0)<<31>>31|0),$A=hg,HA=0|Fe(c<<1|0,0|(Q=((c<<1|0)<0)<<31>>31),0|E,((0|E)<0)<<31>>31|0),mA=hg,VA=0|Fe(0|B,((0|B)<0)<<31>>31|0,c<<1|0,0|Q),TA=hg,XA=0|Fe(0|t,((0|t)<0)<<31>>31|0,c<<1|0,0|Q),KA=hg,UA=0|Fe(0|k,((0|k)<0)<<31>>31|0,c<<1|0,0|Q),RA=hg,uA=0|Fe(0|I,((0|I)<0)<<31>>31|0,c<<1|0,0|Q),wA=hg,tA=0|Fe(0|r,((0|r)<0)<<31>>31|0,c<<1|0,0|Q),gA=hg,x=0|Fe(0|U,((0|U)<0)<<31>>31|0,c<<1|0,0|Q),J=hg,G=0|Fe(0|D,((0|D)<0)<<31>>31|0,c<<1|0,0|Q),b=hg,Q=0|Fe(0|s,((0|s)<0)<<31>>31|0,c<<1|0,0|Q),c=hg,hA=0|Fe(E<<1|0,0|(o=((E<<1|0)<0)<<31>>31),0|E,((0|E)<0)<<31>>31|0),fA=hg,$=0|Fe(E<<1|0,0|o,0|B,((0|B)<0)<<31>>31|0),AA=hg,LA=0|Fe(t<<1|0,0|(P=((t<<1|0)<0)<<31>>31),E<<1|0,0|o),xA=hg,vA=0|Fe(0|k,((0|k)<0)<<31>>31|0,E<<1|0,0|o),DA=hg,nA=0|Fe(I<<1|0,((I<<1|0)<0)<<31>>31|0,E<<1|0,0|o),rA=hg,K=0|Fe(0|r,((0|r)<0)<<31>>31|0,E<<1|0,0|o),L=hg,m=0|Fe(U<<1|0,((U<<1|0)<0)<<31>>31|0,E<<1|0,0|o),F=hg,f=0|Fe(0|D,((0|D)<0)<<31>>31|0,E<<1|0,0|o),h=hg,o=0|Fe(38*s|0,0|(e=((38*s|0)<0)<<31>>31),E<<1|0,0|o),E=hg,JA=0|Fe(0|B,((0|B)<0)<<31>>31|0,0|B,((0|B)<0)<<31>>31|0),PA=hg,dA=0|Fe(B<<1|0,((B<<1|0)<0)<<31>>31|0,0|t,((0|t)<0)<<31>>31|0),lA=hg,iA=0|Fe(0|k,((0|k)<0)<<31>>31|0,B<<1|0,((B<<1|0)<0)<<31>>31|0),aA=hg,j=0|Fe(0|I,((0|I)<0)<<31>>31|0,B<<1|0,((B<<1|0)<0)<<31>>31|0),V=hg,R=0|Fe(0|r,((0|r)<0)<<31>>31|0,B<<1|0,((B<<1|0)<0)<<31>>31|0),N=hg,p=0|Fe(0|U,((0|U)<0)<<31>>31|0,B<<1|0,((B<<1|0)<0)<<31>>31|0),_=hg,ZA=0|Fe(19*D|0,0|(IA=((19*D|0)<0)<<31>>31),B<<1|0,((B<<1|0)<0)<<31>>31|0),jA=hg,B=0|Fe(38*s|0,0|e,0|B,((0|B)<0)<<31>>31|0),i=hg,cA=0|Fe(t<<1|0,0|P,0|t,((0|t)<0)<<31>>31|0),BA=hg,T=0|Fe(t<<1|0,0|P,0|k,((0|k)<0)<<31>>31|0),X=hg,M=0|Fe(I<<1|0,((I<<1|0)<0)<<31>>31|0,t<<1|0,0|P),H=hg,d=0|Fe(0|r,((0|r)<0)<<31>>31|0,t<<1|0,0|P),l=hg,WA=0|Fe(38*U|0,0|(NA=((38*U|0)<0)<<31>>31),t<<1|0,0|P),OA=hg,bA=0|Fe(19*D|0,0|IA,t<<1|0,0|P),kA=hg,P=0|Fe(38*s|0,0|e,t<<1|0,0|P),t=hg,S=0|Fe(0|k,((0|k)<0)<<31>>31|0,0|k,((0|k)<0)<<31>>31|0),Y=hg,u=0|Fe(k<<1|0,((k<<1|0)<0)<<31>>31|0,0|I,((0|I)<0)<<31>>31|0),w=hg,zA=0|Fe(19*r|0,((19*r|0)<0)<<31>>31|0,k<<1|0,((k<<1|0)<0)<<31>>31|0),qA=hg,FA=0|Fe(38*U|0,0|NA,0|k,((0|k)<0)<<31>>31|0),GA=hg,oA=0|Fe(19*D|0,0|IA,k<<1|0,((k<<1|0)<0)<<31>>31|0),CA=hg,k=0|Fe(38*s|0,0|e,0|k,((0|k)<0)<<31>>31|0),g=hg,Ie=0|Fe(38*I|0,((38*I|0)<0)<<31>>31|0,0|I,((0|I)<0)<<31>>31|0),ee=hg,YA=0|Fe(19*r|0,((19*r|0)<0)<<31>>31|0,I<<1|0,((I<<1|0)<0)<<31>>31|0),MA=hg,EA=0|Fe(38*U|0,0|NA,I<<1|0,((I<<1|0)<0)<<31>>31|0),QA=hg,W=0|Fe(19*D|0,0|IA,I<<1|0,((I<<1|0)<0)<<31>>31|0),O=hg,I=0|Fe(38*s|0,0|e,I<<1|0,((I<<1|0)<0)<<31>>31|0),v=hg,yA=0|Fe(19*r|0,((19*r|0)<0)<<31>>31|0,0|r,((0|r)<0)<<31>>31|0),sA=hg,z=0|Fe(38*U|0,0|NA,0|r,((0|r)<0)<<31>>31|0),q=hg,C=0|Fe(19*D|0,0|IA,r<<1|0,((r<<1|0)<0)<<31>>31|0),y=hg,r=0|Fe(38*s|0,0|e,0|r,((0|r)<0)<<31>>31|0),Z=hg,NA=0|Fe(38*U|0,0|NA,0|U,((0|U)<0)<<31>>31|0),SA=hg,pA=0|Fe(19*D|0,0|IA,U<<1|0,((U<<1|0)<0)<<31>>31|0),_A=hg,U=0|Fe(38*s|0,0|e,U<<1|0,((U<<1|0)<0)<<31>>31|0),a=hg,IA=0|Fe(19*D|0,0|IA,0|D,((0|D)<0)<<31>>31|0),eA=hg,D=0|Fe(38*s|0,0|e,0|D,((0|D)<0)<<31>>31|0),n=hg,s=0|Fe(38*s|0,0|e,0|s,((0|s)<0)<<31>>31|0),e=hg,E=0|aI(0|(jA=0|aI(0|(OA=0|aI(0|(qA=0|aI(0|($A=0|aI(0|Ie,0|ee,0|Ae,0|$A)),0|hg,0|zA,0|qA)),0|hg,0|WA,0|OA)),0|hg,0|ZA,0|jA)),0|hg,0|o,0|E),o=hg,fA=0|aI(0|VA,0|TA,0|hA,0|fA),hA=hg,AA=0|aI(0|XA,0|KA,0|$,0|AA),$=hg,v=0|aI(0|(y=0|aI(0|(SA=0|aI(0|(RA=0|aI(0|(PA=0|aI(0|LA,0|xA,0|JA,0|PA)),0|hg,0|UA,0|RA)),0|hg,0|NA,0|SA)),0|hg,0|C,0|y)),0|hg,0|I,0|v),I=hg,y=0|ve(0|(y=0|aI(0|E,0|o,33554432,0)),0|hg,26),C=hg,i=0|aI(0|(i=0|aI(0|(kA=0|aI(0|(GA=0|aI(0|(mA=0|aI(0|YA,0|MA,0|HA,0|mA)),0|hg,0|FA,0|GA)),0|hg,0|bA,0|kA)),0|hg,0|B,0|i)),0|hg,0|y,0|C),B=hg,C=0|rI(0|E,0|o,0|(C=0|Ze(0|y,0|C,26)),0|hg),o=hg,E=0|ve(0|(E=0|aI(0|v,0|I,33554432,0)),0|hg,26),y=hg,Z=0|aI(0|(Z=0|aI(0|(_A=0|aI(0|(wA=0|aI(0|(lA=0|aI(0|vA,0|DA,0|dA,0|lA)),0|hg,0|uA,0|wA)),0|hg,0|pA,0|_A)),0|hg,0|r,0|Z)),0|hg,0|E,0|y),r=hg,y=0|rI(0|v,0|I,0|(y=0|Ze(0|E,0|y,26)),0|hg),I=hg,v=0|ve(0|(v=0|aI(0|i,0|B,16777216,0)),0|hg,25),E=hg,t=0|aI(0|(t=0|aI(0|(CA=0|aI(0|(QA=0|aI(0|(sA=0|aI(0|fA,0|hA,0|yA,0|sA)),0|hg,0|EA,0|QA)),0|hg,0|oA,0|CA)),0|hg,0|P,0|t)),0|hg,0|v,0|E),P=hg,E=0|rI(0|i,0|B,0|(E=0|Ze(0|v,0|E,25)),0|hg),B=hg,i=0|ve(0|(i=0|aI(0|Z,0|r,16777216,0)),0|hg,25),v=hg,a=0|aI(0|(a=0|aI(0|(eA=0|aI(0|(gA=0|aI(0|(rA=0|aI(0|(aA=0|aI(0|cA,0|BA,0|iA,0|aA)),0|hg,0|nA,0|rA)),0|hg,0|tA,0|gA)),0|hg,0|IA,0|eA)),0|hg,0|U,0|a)),0|hg,0|i,0|v),U=hg,v=0|rI(0|Z,0|r,0|(v=0|Ze(0|i,0|v,25)),0|hg),r=hg,Z=0|ve(0|(Z=0|aI(0|t,0|P,33554432,0)),0|hg,26),i=hg,g=0|aI(0|(g=0|aI(0|(O=0|aI(0|(q=0|aI(0|AA,0|$,0|z,0|q)),0|hg,0|W,0|O)),0|hg,0|k,0|g)),0|hg,0|Z,0|i),k=hg,i=0|rI(0|t,0|P,0|(i=0|Ze(0|Z,0|i,26)),0|hg),P=0|ve(0|(P=0|aI(0|a,0|U,33554432,0)),0|hg,26),t=hg,n=0|aI(0|(n=0|aI(0|(J=0|aI(0|(L=0|aI(0|(X=0|aI(0|j,0|V,0|T,0|X)),0|hg,0|K,0|L)),0|hg,0|x,0|J)),0|hg,0|D,0|n)),0|hg,0|P,0|t),D=hg,t=0|rI(0|a,0|U,0|(t=0|Ze(0|P,0|t,26)),0|hg),I=0|aI(0|(U=0|ve(0|(U=0|aI(0|g,0|k,16777216,0)),0|hg,25)),0|(a=hg),0|y,0|I),y=hg,a=0|rI(0|g,0|k,0|(a=0|Ze(0|U,0|a,25)),0|hg),k=0|ve(0|(k=0|aI(0|n,0|D,16777216,0)),0|hg,25),g=hg,e=0|aI(0|(e=0|aI(0|(b=0|aI(0|(F=0|aI(0|(H=0|aI(0|(Y=0|aI(0|R,0|N,0|S,0|Y)),0|hg,0|M,0|H)),0|hg,0|m,0|F)),0|hg,0|G,0|b)),0|hg,0|s,0|e)),0|hg,0|k,0|g),s=hg,g=0|rI(0|n,0|D,0|(g=0|Ze(0|k,0|g,25)),0|hg),r=0|aI(0|v,0|r,0|(D=0|ve(0|(D=0|aI(0|I,0|y,33554432,0)),0|hg,26)),0|(n=hg)),n=0|rI(0|I,0|y,0|(n=0|Ze(0|D,0|n,26)),0|hg),y=0|ve(0|(y=0|aI(0|e,0|s,33554432,0)),0|hg,26),I=hg,c=0|aI(0|(c=0|aI(0|(h=0|aI(0|(_=0|aI(0|(w=0|aI(0|d,0|l,0|u,0|w)),0|hg,0|p,0|_)),0|hg,0|f,0|h)),0|hg,0|Q,0|c)),0|hg,0|y,0|I),Q=hg,I=0|rI(0|e,0|s,0|(I=0|Ze(0|y,0|I,26)),0|hg),o=0|aI(0|(y=0|Fe(0|(s=0|ve(0|(s=0|aI(0|c,0|Q,16777216,0)),0|hg,25)),0|(e=hg),19,0)),0|hg,0|C,0|o),C=hg,e=0|rI(0|c,0|Q,0|(e=0|Ze(0|s,0|e,25)),0|hg),B=0|aI(0|E,0|B,0|(Q=0|ve(0|(Q=0|aI(0|o,0|C,33554432,0)),0|hg,26)),0|(c=hg)),c=0|rI(0|o,0|C,0|(c=0|Ze(0|Q,0|c,26)),0|hg),cg[A>>2]=c,cg[A+4>>2]=B,cg[A+8>>2]=i,cg[A+12>>2]=a,cg[A+16>>2]=n,cg[A+20>>2]=r,cg[A+24>>2]=t,cg[A+28>>2]=g,cg[A+32>>2]=I,cg[A+36>>2]=e}function c(A,e,I,g,t){A|=0,e|=0,I|=0,g|=0;var r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0;if(C=0|De(t|=0),Q=hg,r=0|De(t+8|0),n=hg,g=0|Ze(0|I,0|g,56),t=hg,(e+I+(0-(7&I))|0)==(0|e))s=2037671283^r,i=1952801890^n,o=1886610805^C,B=1936682341^Q,a=1852075885^r,y=1685025377^n,n=1852142177^C,r=1819895653^Q;else for(h=e,s=2037671283^r,i=1952801890^n,o=1886610805^C,c=1936682341^Q,B=1852075885^r,a=1685025377^n,n=1852142177^C,r=1819895653^Q;;){if(E=0|De(h),f=hg,p=E^s,i^=f,c=0|aI(0|o,0|c,0|B,0|a),y=hg,o=0|Ge(B,a,13),B=hg^y,y=0|Ge(c,y,32),s=hg,C=0|aI(0|p,0|i,0|n,0|r),Q=hg,i=0|Ge(p,i,16),a=hg^Q,s=0|aI(i^C|0,0|a,0|y,0|s),y=hg,a=0|Ge(i^C,a,21),i=y^hg,Q=0|aI(0|C,0|Q,o^c|0,0|B),C=hg,B=0|Ge(o^c,B,17),r=hg^C,C=0|Ge(Q,C,32),n=hg,y=0|aI(B^Q|0,0|r,0|s,0|y),c=hg,r=0|Ge(B^Q,r,13),Q=hg^c,c=0|Ge(y,c,32),B=hg,n=0|aI(0|C,0|n,s^a|0,0|i),C=hg,i=0|Ge(s^a,i,16),a=hg^C,B=0|aI(i^n|0,0|a,0|c,0|B),c=hg,a=0|Ge(i^n,a,21),i=c^hg,C=0|aI(r^y|0,0|Q,0|n,0|C),n=hg,Q=0|Ge(r^y,Q,17),y=hg^n,n=0|Ge(C,n,32),r=hg,(0|(h=h+8|0))==(e+I+(0-(7&I))|0)){e=e+I+(0-(7&I))|0,s=B^a,o=B^E,B=c^f,a=Q^C;break}s=B^a,o=B^E,c^=f,B=Q^C,a=y}switch(7&I){case 7:g=0|Ze(0|Cg[e+6>>0],0,48)|g,t|=hg,_=5;break;case 6:_=5;break;case 5:_=6;break;case 4:_=7;break;case 3:_=8;break;case 2:_=9;break;case 1:_=10}5==(0|_)&&(p=0|Ze(0|Cg[e+5>>0],0,40),t|=hg,g|=p,_=6),6==(0|_)&&(t=0|Cg[e+4>>0]|t,_=7),7==(0|_)&&(g|=p=0|Ze(0|Cg[e+3>>0],0,24),t|=hg,_=8),8==(0|_)&&(g|=p=0|Ze(0|Cg[e+2>>0],0,16),t|=hg,_=9),9==(0|_)&&(g|=p=0|Ze(0|Cg[e+1>>0],0,8),t|=hg,_=10),10==(0|_)&&(g=0|Cg[e>>0]|g),h=g^s,I=t^i,Q=0|aI(0|o,0|B,0|a,0|y),E=hg,s=0|Ge(a,y,13),e=hg^E,E=0|Ge(Q,E,32),_=hg,f=0|aI(0|h,0|I,0|n,0|r),p=hg,_=0|aI((y=0|Ge(h,I,16))^f|0,0|(I=hg^p),0|E,0|_),E=hg,I=0|Ge(y^f,I,21),y=E^hg,p=0|aI(0|f,0|p,s^Q|0,0|e),f=hg,e=0|Ge(s^Q,e,17),Q=hg^f,f=0|Ge(p,f,32),s=hg,E=0|aI(e^p|0,0|Q,0|_,0|E),h=hg,Q=0|Ge(e^p,Q,13),p=hg^h,h=0|Ge(E,h,32),e=hg,s=0|aI(0|f,0|s,_^I|0,0|y),f=hg,e=0|aI((y=0|Ge(_^I,y,16))^s|0,0|(I=hg^f),0|h,0|e),h=hg,I=0|Ge(y^s,I,21),y=h^hg,f=0|aI(Q^E|0,0|p,0|s,0|f),s=hg,p=0|Ge(Q^E,p,17),E=hg^s,s=0|Ge(f,s,32),Q=hg,h=0|aI(e^g|0,h^t|0,p^f|0,0|E),_=hg,E=0|Ge(p^f,E,13),f=hg^_,_=0|Ge(h,_,32),p=hg,Q=0|aI(255^s|0,0|Q,e^I|0,0|y),s=hg,p=0|aI((y=0|Ge(e^I,y,16))^Q|0,0|(I=hg^s),0|_,0|p),_=hg,I=0|Ge(y^Q,I,21),y=_^hg,s=0|aI(0|Q,0|s,E^h|0,0|f),Q=hg,f=0|Ge(E^h,f,17),h=hg^Q,Q=0|Ge(s,Q,32),E=hg,_=0|aI(f^s|0,0|h,0|p,0|_),e=hg,h=0|Ge(f^s,h,13),s=hg^e,e=0|Ge(_,e,32),f=hg,E=0|aI(0|Q,0|E,p^I|0,0|y),Q=hg,f=0|aI((y=0|Ge(p^I,y,16))^E|0,0|(I=hg^Q),0|e,0|f),e=hg,I=0|Ge(y^E,I,21),y=e^hg,Q=0|aI(h^_|0,0|s,0|E,0|Q),E=hg,s=0|Ge(h^_,s,17),_=hg^E,E=0|Ge(Q,E,32),h=hg,e=0|aI(s^Q|0,0|_,0|f,0|e),p=hg,_=0|Ge(s^Q,_,13),Q=hg^p,p=0|Ge(e,p,32),s=hg,h=0|aI(0|E,0|h,f^I|0,0|y),E=hg,s=0|aI((y=0|Ge(f^I,y,16))^h|0,0|(I=hg^E),0|p,0|s),p=hg,I=0|Ge(y^h,I,21),y=p^hg,E=0|aI(_^e|0,0|Q,0|h,0|E),h=hg,Q=0|Ge(_^e,Q,17),e=hg^h,h=0|Ge(E,h,32),_=hg,p=0|aI(Q^E|0,0|e,0|s,0|p),f=hg,e=0|Ge(Q^E,e,13),f^=hg,_=0|aI(0|h,0|_,s^I|0,0|y),h=hg,y=0|Ge((y=0|Ge(s^I,y,16))^_,hg^h,21),I=hg,h=0|aI(e^p|0,0|f,0|_,0|h),_=hg,f=0|Ge(e^p,f,17),p=hg,Qe(A,y^h^f^(e=0|Ge(h,_,32)),I^_^p^hg)}function C(A,e,I,g,t){A|=0,e|=0,I|=0;var r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0,Y=0,S=0,N=0,R=0,U=0,P=0,J=0,x=0,L=0,K=0,X=0,T=0,V=0,j=0,Z=0,O=0,W=0,q=0,z=0,$=0,AA=0,eA=0,IA=0,gA=0,tA=0,rA=0,nA=0,aA=0,iA=0,BA=0;if(x=Qg,J=Qg=Qg+63&-64,Qg=Qg+64|0,!(0==(0|(g|=0))&0==(0|(t|=0)))){for(t>>>0>0|0==(0|t)&g>>>0>4294967295&&ig(),v=0|cg[A>>2],k=0|cg[A+4>>2],b=0|cg[A+8>>2],G=0|cg[A+12>>2],F=0|cg[A+16>>2],m=0|cg[A+20>>2],H=0|cg[A+24>>2],M=0|cg[A+28>>2],Y=0|cg[A+32>>2],S=0|cg[A+36>>2],N=0|cg[A+40>>2],R=0|cg[A+44>>2],U=0|cg[A+56>>2],P=0|cg[A+60>>2],r=0,l=0|cg[A+52>>2],w=0|cg[A+48>>2],d=t,D=g;;){if(u=d>>>0<0|0==(0|d)&D>>>0<64){g=(t=J)+64|0;do{Bg[t>>0]=0,t=t+1|0}while((0|t)<(0|g));t=0;do{Bg[J+t>>0]=0|Bg[e+t>>0],t=t+1|0}while(0<d>>>0|0==(0|d)&t>>>0<D>>>0);r=I,e=J,I=J}t=v,g=k,n=b,a=G,i=F,B=m,c=H,C=M,o=Y,Q=S,E=N,s=P,y=U,h=l,f=w,_=R,p=20;do{V=0|OI((W=0|OI((iA=0|OI((O=(W=0|OI((aA=t+i|0)^f,16))+o|0)^i,12))+aA^W,8))+O^iA,7),BA=0|OI((X=0|OI((tA=0|OI((K=(X=0|OI((gA=g+B|0)^h,16))+Q|0)^B,12))+gA^X,8))+K^tA,7),rA=0|OI((T=0|OI(($=0|OI((q=(T=0|OI((z=n+c|0)^y,16))+E|0)^c,12))+z^T,8))+q^$,7),AA=0|OI((eA=0|OI((Z=0|OI((L=(eA=0|OI((j=a+C|0)^s,16))+_|0)^C,12))+j^eA,8))+L^Z,7),B=0|OI((E=(s=0|OI((t=(IA=0|OI((nA=0|OI(eA^BA+(iA+aA),16))+(T+q)^BA,12))+(BA+(iA+aA))|0)^nA,8))+(nA+(T+q))|0)^IA,7),c=0|OI((_=(f=0|OI((g=(q=0|OI((IA=0|OI(rA+(tA+gA)^W,16))+(eA+L)^rA,12))+(rA+(tA+gA))|0)^IA,8))+(IA+(eA+L))|0)^q,7),C=0|OI((o=(h=0|OI((n=(L=0|OI((q=0|OI(AA+($+z)^X,16))+(W+O)^AA,12))+(AA+($+z))|0)^q,8))+(q+(W+O))|0)^L,7),i=0|OI((Q=(y=0|OI((a=(L=0|OI((T=0|OI(Z+j+V^T,16))+(X+K)^V,12))+(Z+j+V)|0)^T,8))+(T+(X+K))|0)^L,7),p=p+-2|0}while(0!=(0|p));if(Z=(0|kI(e))^t+v,O=(0|kI(e+4|0))^g+k,W=(0|kI(e+8|0))^n+b,q=(0|kI(e+12|0))^a+G,z=(0|kI(e+16|0))^i+F,$=(0|kI(e+20|0))^B+m,AA=(0|kI(e+24|0))^c+H,eA=(0|kI(e+28|0))^C+M,IA=(0|kI(e+32|0))^o+Y,gA=(0|kI(e+36|0))^Q+S,tA=(0|kI(e+40|0))^E+N,rA=(0|kI(e+44|0))^_+R,nA=(0|kI(e+48|0))^f+w,aA=(0|kI(e+52|0))^h+l,iA=(0|kI(e+56|0))^y+U,BA=(0|kI(e+60|0))^s+P,g=w+1|0,t=(0==(0|g)&1)+l|0,oI(I,Z),oI(I+4|0,O),oI(I+8|0,W),oI(I+12|0,q),oI(I+16|0,z),oI(I+20|0,$),oI(I+24|0,AA),oI(I+28|0,eA),oI(I+32|0,IA),oI(I+36|0,gA),oI(I+40|0,tA),oI(I+44|0,rA),oI(I+48|0,nA),oI(I+52|0,aA),oI(I+56|0,iA),oI(I+60|0,BA),d>>>0<0|0==(0|d)&D>>>0<65)break;BA=0|aI(0|D,0|d,-64,-1),e=e+64|0,I=I+64|0,l=t,w=g,d=hg,D=BA}if(u?0|D:0){e=0;do{Bg[r+e>>0]=0|Bg[I+e>>0],e=e+1|0}while((0|e)!=(0|D))}cg[A+48>>2]=g,cg[A+52>>2]=t}Qg=x}function o(A,e,I,g){e|=0,I|=0,g|=0;var t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0;if(y=0|Bg[(A|=0)+80>>0]?0:16777216,h=0|cg[A+4>>2],o=0|cg[A+8>>2],Q=0|cg[A+12>>2],E=0|cg[A+16>>2],i=0|cg[A+20>>2],a=0|cg[A+24>>2],n=0|cg[A+28>>2],r=0|cg[A+32>>2],t=0|cg[A+36>>2],g>>>0>0|0==(0|g)&I>>>0>15)for(s=0|cg[A>>2],c=I;;){if(u=(67108863&(0|kI(e)))+i|0,l=((0|kI(e+3|0))>>>2&67108863)+a|0,w=((0|kI(e+6|0))>>>4&67108863)+n|0,p=((0|kI(e+9|0))>>>6)+r|0,i=((0|kI(e+12|0))>>>8|y)+t|0,t=0|Fe(0|u,0,0|s,0),I=hg,n=0|Fe(0|l,0,5*E|0,0),I=0|aI(0|n,0|hg,0|t,0|I),t=hg,n=0|Fe(0|w,0,5*Q|0,0),n=0|aI(0|I,0|t,0|n,0|hg),t=hg,I=0|Fe(0|p,0,5*o|0,0),I=0|aI(0|n,0|t,0|I,0|hg),t=hg,n=0|Fe(0|i,0,5*h|0,0),n=0|aI(0|I,0|t,0|n,0|hg),t=hg,I=0|Fe(0|u,0,0|h,0),B=hg,_=0|Fe(0|l,0,0|s,0),B=0|aI(0|_,0|hg,0|I,0|B),I=hg,_=0|Fe(0|w,0,5*E|0,0),_=0|aI(0|B,0|I,0|_,0|hg),I=hg,B=0|Fe(0|p,0,5*Q|0,0),B=0|aI(0|_,0|I,0|B,0|hg),I=hg,_=0|Fe(0|i,0,5*o|0,0),_=0|aI(0|B,0|I,0|_,0|hg),I=hg,B=0|Fe(0|u,0,0|o,0),C=hg,f=0|Fe(0|l,0,0|h,0),C=0|aI(0|f,0|hg,0|B,0|C),B=hg,f=0|Fe(0|w,0,0|s,0),f=0|aI(0|C,0|B,0|f,0|hg),B=hg,C=0|Fe(0|p,0,5*E|0,0),C=0|aI(0|f,0|B,0|C,0|hg),B=hg,f=0|Fe(0|i,0,5*Q|0,0),f=0|aI(0|C,0|B,0|f,0|hg),B=hg,C=0|Fe(0|u,0,0|Q,0),r=hg,a=0|Fe(0|l,0,0|o,0),r=0|aI(0|a,0|hg,0|C,0|r),C=hg,a=0|Fe(0|w,0,0|h,0),a=0|aI(0|r,0|C,0|a,0|hg),C=hg,r=0|Fe(0|p,0,0|s,0),r=0|aI(0|a,0|C,0|r,0|hg),C=hg,a=0|Fe(0|i,0,5*E|0,0),a=0|aI(0|r,0|C,0|a,0|hg),C=hg,r=0|Fe(0|u,0,0|E,0),u=hg,l=0|Fe(0|l,0,0|Q,0),u=0|aI(0|l,0|hg,0|r,0|u),r=hg,w=0|Fe(0|w,0,0|o,0),w=0|aI(0|u,0|r,0|w,0|hg),r=hg,p=0|Fe(0|p,0,0|h,0),p=0|aI(0|w,0|r,0|p,0|hg),r=hg,i=0|Fe(0|i,0,0|s,0),i=0|aI(0|p,0|r,0|i,0|hg),r=hg,t=0|Oe(0|n,0|t,26),t=0|aI(0|_,0|I,0|t,0),I=0|Oe(0|t,0|hg,26),I=0|aI(0|f,0|B,0|I,0),B=0|Oe(0|I,0|hg,26),B=0|aI(0|a,0|C,0|B,0),C=0|Oe(0|B,0|hg,26),C=0|aI(0|i,0|r,0|C,0),r=0|Oe(0|C,0|hg,26),c=0|aI(0|c,0|g,-16,-1),!((g=hg)>>>0>0|0==(0|g)&c>>>0>15)){i=(5*r|0)+n&67108863,a=(((5*r|0)+(67108863&n)|0)>>>26)+(67108863&t)|0,n=67108863&I,r=67108863&B,t=67108863&C;break}i=(5*r|0)+n&67108863,a=(((5*r|0)+(67108863&n)|0)>>>26)+(67108863&t)|0,n=67108863&I,r=67108863&B,t=67108863&C,e=e+16|0}cg[A+20>>2]=i,cg[A+24>>2]=a,cg[A+28>>2]=n,cg[A+32>>2]=r,cg[A+36>>2]=t}function Q(A,e){A|=0;var I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0;u=0|zA(e|=0),i=hg,w=0|Ze(0|(w=0|Me(0|Bg[e+4>>0],0|Bg[e+5>>0],0|Bg[e+6>>0])),0|hg,6),B=hg,p=0|Ze(0|(p=0|Me(0|Bg[e+7>>0],0|Bg[e+8>>0],0|Bg[e+9>>0])),0|hg,5),n=hg,h=0|Ze(0|(h=0|Me(0|Bg[e+10>>0],0|Bg[e+11>>0],0|Bg[e+12>>0])),0|hg,3),a=hg,y=0|Ze(0|(y=0|Me(0|Bg[e+13>>0],0|Bg[e+14>>0],0|Bg[e+15>>0])),0|hg,2),t=hg,g=0|zA(e+16|0),r=hg,Q=0|Ze(0|(Q=0|Me(0|Bg[e+20>>0],0|Bg[e+21>>0],0|Bg[e+22>>0])),0|hg,7),I=hg,_=0|Ze(0|(_=0|Me(0|Bg[e+23>>0],0|Bg[e+24>>0],0|Bg[e+25>>0])),0|hg,5),f=hg,C=0|Ze(0|(C=0|Me(0|Bg[e+26>>0],0|Bg[e+27>>0],0|Bg[e+28>>0])),0|hg,4),o=hg,i=0|aI(19&(l=0|rI(0,0,0|(e=0|Oe(0|(e=0|aI(33554428&(s=0|Ze(0|(s=0|Me(0|Bg[e+29>>0],0|Bg[e+30>>0],0|Bg[e+31>>0])),0|hg,2))|0,0,16777216,0)),0|hg,25)),0|(E=hg)))|0,0,0|u,0|i),u=hg,E=0|Ze(0|e,0|E,25),e=hg,n=0|aI(0|(l=0|ve(0|(l=0|aI(0|w,0|B,16777216,0)),0|hg,25)),0|(D=hg),0|p,0|n),p=hg,D=0|rI(0|w,0|B,0|(D=0|Ze(0|l,0|D,25)),0|hg),B=hg,t=0|aI(0|(w=0|ve(0|(w=0|aI(0|h,0|a,16777216,0)),0|hg,25)),0|(l=hg),0|y,0|t),y=hg,l=0|rI(0|h,0|a,0|(l=0|Ze(0|w,0|l,25)),0|hg),a=hg,I=0|aI(0|Q,0|I,0|(h=0|ve(0|(h=0|aI(0|g,0|r,16777216,0)),0|hg,25)),0|(w=hg)),Q=hg,w=0|rI(0|g,0|r,0|(w=0|Ze(0|h,0|w,25)),0|hg),r=hg,o=0|aI(0|(g=0|ve(0|(g=0|aI(0|_,0|f,16777216,0)),0|hg,25)),0|(h=hg),0|C,0|o),C=hg,h=0|Ze(0|g,0|h,25),g=hg,B=0|aI(0|D,0|B,0|(d=0|ve(0|(d=0|aI(0|i,0|u,33554432,0)),0|hg,26)),0|(c=hg)),c=0|rI(0|i,0|u,0|(c=0|Ze(0|d,0|c,26)),0|hg),a=0|aI(0|l,0|a,0|(u=0|ve(0|(u=0|aI(0|n,0|p,33554432,0)),0|hg,26)),0|(i=hg)),i=0|rI(0|n,0|p,0|(i=0|Ze(0|u,0|i,26)),0|hg),r=0|aI(0|w,0|r,0|(p=0|ve(0|(p=0|aI(0|t,0|y,33554432,0)),0|hg,26)),0|(n=hg)),n=0|rI(0|t,0|y,0|(n=0|Ze(0|p,0|n,26)),0|hg),g=0|rI(0|(f=0|aI(0|(y=0|ve(0|(y=0|aI(0|I,0|Q,33554432,0)),0|hg,26)),0|(t=hg),0|_,0|f)),0|hg,0|h,0|g),t=0|rI(0|I,0|Q,0|(t=0|Ze(0|y,0|t,26)),0|hg),e=0|rI(0|(s=0|aI(0|(Q=0|ve(0|(Q=0|aI(0|o,0|C,33554432,0)),0|hg,26)),0|(I=hg),33554428&s|0,0)),0|hg,0|E,0|e),I=0|rI(0|o,0|C,0|(I=0|Ze(0|Q,0|I,26)),0|hg),cg[A>>2]=c,cg[A+4>>2]=B,cg[A+8>>2]=i,cg[A+12>>2]=a,cg[A+16>>2]=n,cg[A+20>>2]=r,cg[A+24>>2]=t,cg[A+28>>2]=g,cg[A+32>>2]=I,cg[A+36>>2]=e}function E(A,e){A|=0;var I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0;_=0|cg[(e|=0)>>2],f=0|cg[e+4>>2],h=0|cg[e+8>>2],y=0|cg[e+12>>2],s=0|cg[e+16>>2],c=0|cg[e+20>>2],Q=0|cg[e+24>>2],w=0|cg[e+28>>2],C=0|cg[e+32>>2],p=0|cg[e+36>>2],_=0|Fe(0|_,((0|_)<0)<<31>>31|0,121666,0),i=hg,f=0|Fe(0|f,((0|f)<0)<<31>>31|0,121666,0),B=hg,h=0|Fe(0|h,((0|h)<0)<<31>>31|0,121666,0),n=hg,y=0|Fe(0|y,((0|y)<0)<<31>>31|0,121666,0),a=hg,s=0|Fe(0|s,((0|s)<0)<<31>>31|0,121666,0),t=hg,c=0|Fe(0|c,((0|c)<0)<<31>>31|0,121666,0),r=hg,Q=0|Fe(0|Q,((0|Q)<0)<<31>>31|0,121666,0),I=hg,w=0|Fe(0|w,((0|w)<0)<<31>>31|0,121666,0),g=hg,C=0|Fe(0|C,((0|C)<0)<<31>>31|0,121666,0),o=hg,i=0|aI(0|(0|Fe(0|(u=0|ve(0|(u=0|aI(0|(p=0|Fe(0|p,((0|p)<0)<<31>>31|0,121666,0)),0|(e=hg),16777216,0)),0|hg,25)),0|(E=hg),19,0)),0|hg,0|_,0|i),_=hg,E=0|rI(0|p,0|e,0|(E=0|Ze(0|u,0|E,25)),0|hg),e=hg,n=0|aI(0|(p=0|ve(0|(p=0|aI(0|f,0|B,16777216,0)),0|hg,25)),0|(u=hg),0|h,0|n),h=hg,u=0|rI(0|f,0|B,0|(u=0|Ze(0|p,0|u,25)),0|hg),B=hg,t=0|aI(0|(f=0|ve(0|(f=0|aI(0|y,0|a,16777216,0)),0|hg,25)),0|(p=hg),0|s,0|t),s=hg,p=0|rI(0|y,0|a,0|(p=0|Ze(0|f,0|p,25)),0|hg),a=hg,I=0|aI(0|(y=0|ve(0|(y=0|aI(0|c,0|r,16777216,0)),0|hg,25)),0|(f=hg),0|Q,0|I),Q=hg,f=0|rI(0|c,0|r,0|(f=0|Ze(0|y,0|f,25)),0|hg),r=hg,o=0|aI(0|(c=0|ve(0|(c=0|aI(0|w,0|g,16777216,0)),0|hg,25)),0|(y=hg),0|C,0|o),C=hg,y=0|rI(0|w,0|g,0|(y=0|Ze(0|c,0|y,25)),0|hg),g=hg,B=0|aI(0|u,0|B,0|(w=0|ve(0|(w=0|aI(0|i,0|_,33554432,0)),0|hg,26)),0|(c=hg)),c=0|rI(0|i,0|_,0|(c=0|Ze(0|w,0|c,26)),0|hg),a=0|aI(0|p,0|a,0|(_=0|ve(0|(_=0|aI(0|n,0|h,33554432,0)),0|hg,26)),0|(i=hg)),i=0|rI(0|n,0|h,0|(i=0|Ze(0|_,0|i,26)),0|hg),r=0|aI(0|f,0|r,0|(h=0|ve(0|(h=0|aI(0|t,0|s,33554432,0)),0|hg,26)),0|(n=hg)),n=0|rI(0|t,0|s,0|(n=0|Ze(0|h,0|n,26)),0|hg),g=0|aI(0|y,0|g,0|(s=0|ve(0|(s=0|aI(0|I,0|Q,33554432,0)),0|hg,26)),0|(t=hg)),t=0|rI(0|I,0|Q,0|(t=0|Ze(0|s,0|t,26)),0|hg),e=0|aI(0|E,0|e,0|(Q=0|ve(0|(Q=0|aI(0|o,0|C,33554432,0)),0|hg,26)),0|(I=hg)),I=0|rI(0|o,0|C,0|(I=0|Ze(0|Q,0|I,26)),0|hg),cg[A>>2]=c,cg[A+4>>2]=B,cg[A+8>>2]=i,cg[A+12>>2]=a,cg[A+16>>2]=n,cg[A+20>>2]=r,cg[A+24>>2]=t,cg[A+28>>2]=g,cg[A+32>>2]=I,cg[A+36>>2]=e}function s(A,e,I){A|=0,e|=0;var g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0,Y=0,S=0,N=0,R=0,U=0,P=0,J=0,x=0,L=0,K=0,X=0,T=0;v=0|kI(I|=0),k=0|kI(I+4|0),b=0|kI(I+8|0),G=0|kI(I+12|0),l=0|kI(I+16|0),d=0|kI(I+20|0),D=0|kI(I+24|0),_=0|kI(I+28|0),p=0|kI(e),w=0|kI(e+4|0),u=0|kI(e+8|0),f=0|kI(e+12|0),I=0,e=v,g=k,t=b,r=G,n=p,a=w,i=u,B=f,c=l,C=_,o=D,Q=d,E=1634760805,s=857760878,y=2036477234,h=1797285236;do{L=(0|OI((M=(0|OI((N=(0|OI((P=(0|OI(E+Q|0,7))^r)+E|0,9))^i)+P|0,13))^Q)+N|0,18))^E,U=(0|OI((T=(0|OI((H=(0|OI((S=(0|OI(e+s|0,7))^B)+s|0,9))^o)+S|0,13))^e)+H|0,18))^s,Y=(0|OI((x=(0|OI((X=(0|OI((m=(0|OI(n+y|0,7))^C)+y|0,9))^g)+m|0,13))^n)+X|0,18))^y,F=(0|OI((R=(0|OI((J=(0|OI((K=(0|OI(c+h|0,7))^t)+h|0,9))^a)+K|0,13))^c)+J|0,18))^h,E=(0|OI((t=(0|OI((g=(0|OI((e=(0|OI(K+L|0,7))^T)+L|0,9))^X)+e|0,13))^K)+g|0,18))^L,s=(0|OI((r=(0|OI((a=(0|OI((n=(0|OI(U+P|0,7))^x)+U|0,9))^J)+n|0,13))^P)+a|0,18))^U,y=(0|OI((B=(0|OI((i=(0|OI((c=(0|OI(Y+S|0,7))^R)+Y|0,9))^N)+c|0,13))^S)+i|0,18))^Y,h=(0|OI((C=(0|OI((o=(0|OI((Q=(0|OI(F+m|0,7))^M)+F|0,9))^H)+Q|0,13))^m)+o|0,18))^F,I=I+2|0}while((0|I)<20);oI(A,E+1634760805|0),oI(A+4|0,e+v|0),oI(A+8|0,g+k|0),oI(A+12|0,t+b|0),oI(A+16|0,r+G|0),oI(A+20|0,s+857760878|0),oI(A+24|0,n+p|0),oI(A+28|0,a+w|0),oI(A+32|0,i+u|0),oI(A+36|0,B+f|0),oI(A+40|0,y+2036477234|0),oI(A+44|0,c+l|0),oI(A+48|0,Q+d|0),oI(A+52|0,o+D|0),oI(A+56|0,C+_|0),oI(A+60|0,h+1797285236|0)}function y(A,e,I,g){A|=0,I|=0,g|=0;var t=0,r=0;for(t=Qg,r=Qg=Qg+63&-64,Qg=Qg+2272|0,x(r+2016|0,e|=0),x(r+1760|0,g),ee(r+480|0,I),Ve(r+320|0,I),ge(r,r+320|0),eA(r+320|0,r,r+480|0),ge(r+160|0,r+320|0),ee(r+480+160|0,r+160|0),eA(r+320|0,r,r+480+160|0),ge(r+160|0,r+320|0),ee(r+480+320|0,r+160|0),eA(r+320|0,r,r+480+320|0),ge(r+160|0,r+320|0),ee(r+480+480|0,r+160|0),eA(r+320|0,r,r+480+480|0),ge(r+160|0,r+320|0),ee(r+480+640|0,r+160|0),eA(r+320|0,r,r+480+640|0),ge(r+160|0,r+320|0),ee(r+480+800|0,r+160|0),eA(r+320|0,r,r+480+800|0),ge(r+160|0,r+320|0),ee(r+480+960|0,r+160|0),eA(r+320|0,r,r+480+960|0),ge(r+160|0,r+320|0),ee(r+480+1120|0,r+160|0),iI(A),e=255;;){if(0|Bg[r+2016+e>>0])break;if(0|Bg[r+1760+e>>0])break;if(I=e+-1|0,!((0|e)>0)){e=I;break}e=I}if((0|e)>-1)for(;;){if(hA(r+320|0,A),(I=0|Bg[r+2016+e>>0])<<24>>24<=0?I<<24>>24<0&&(ge(r+160|0,r+320|0),IA(r+320|0,r+160|0,r+480+(160*(((I<<24>>24)/-2|0)<<24>>24)|0)|0)):(ge(r+160|0,r+320|0),eA(r+320|0,r+160|0,r+480+(160*((255&I)>>>1&255)|0)|0)),(I=0|Bg[r+1760+e>>0])<<24>>24<=0?I<<24>>24<0&&(ge(r+160|0,r+320|0),rA(r+320|0,r+160|0,1224+(120*(((I<<24>>24)/-2|0)<<24>>24)|0)|0)):(ge(r+160|0,r+320|0),nA(r+320|0,r+160|0,1224+(120*((255&I)>>>1&255)|0)|0)),fe(A,r+320|0),!((0|e)>0))break;e=e+-1|0}Qg=t}function h(A,e,I,g){A|=0,e|=0,I|=0;var t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0,Y=0,S=0,N=0,R=0,U=0,P=0;(g|=0)?(n=0|kI(g),r=0|kI(g+4|0),t=0|kI(g+8|0),g=0|kI(g+12|0)):(g=1797285236,t=2036477234,r=857760878,n=1634760805),h=0|kI(I),y=0|kI(I+4|0),s=0|kI(I+8|0),E=0|kI(I+12|0),Q=0|kI(I+16|0),o=0|kI(I+20|0),C=0|kI(I+24|0),c=0|kI(I+28|0),B=0|kI(e),i=0|kI(e+4|0),a=0|kI(e+8|0),f=0,e=0|kI(e+12|0),I=n;do{u=0|OI((v=0|OI((U=0|OI((D=(v=0|OI(B^(R=h+I|0),16))+Q|0)^h,12))+R^v,8))+D^U,7),P=0|OI((p=0|OI((Y=0|OI((_=(p=0|OI(i^(M=y+r|0),16))+o|0)^y,12))+M^p,8))+_^Y,7),S=0|OI((w=0|OI((G=0|OI((k=(w=0|OI(a^(b=s+t|0),16))+C|0)^s,12))+b^w,8))+k^G,7),F=0|OI((m=0|OI((d=0|OI((n=(m=0|OI(e^(l=E+g|0),16))+c|0)^E,12))+l^m,8))+n^d,7),y=0|OI((C=(e=0|OI((I=(H=0|OI((N=0|OI(m^P+(U+R),16))+(w+k)^P,12))+(P+(U+R))|0)^N,8))+(N+(w+k))|0)^H,7),s=0|OI((c=(B=0|OI((r=(k=0|OI((H=0|OI(S+(Y+M)^v,16))+(m+n)^S,12))+(S+(Y+M))|0)^H,8))+(H+(m+n))|0)^k,7),E=0|OI((Q=(i=0|OI((t=(n=0|OI((k=0|OI(F+(G+b)^p,16))+(v+D)^F,12))+(F+(G+b))|0)^k,8))+(k+(v+D))|0)^n,7),h=0|OI((o=(a=0|OI((g=(n=0|OI((w=0|OI(d+l+u^w,16))+(p+_)^u,12))+(d+l+u)|0)^w,8))+(w+(p+_))|0)^n,7),f=f+1|0}while(10!=(0|f));return oI(A,I),oI(A+4|0,r),oI(A+8|0,t),oI(A+12|0,g),oI(A+16|0,B),oI(A+20|0,i),oI(A+24|0,a),oI(A+28|0,e),0}function f(A,e,I,g){A|=0,e|=0,I|=0,g|=0;var t=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0;C=Qg,c=Qg=Qg+63&-64,Qg=Qg+704|0;A:do{if(!(0==(0|I)&0==(0|g))){if(s=0|cg[A+72>>2],Q=0|cg[A+72+4>>2],B=0|Oe(0|s,0|Q,3),o=0|Ze(0|I,0|g,3),E=hg,a=0|Oe(0|I,0|g,61),i=hg,Q=0|aI(0|s,0|Q,0|o,0|E),s=hg,cg[A+72>>2]=Q,cg[A+72+4>>2]=s,t=0|cg[A+64>>2],n=0|cg[A+64+4>>2],s>>>0<E>>>0|(0|s)==(0|E)&Q>>>0<o>>>0&&(t=0|aI(0|t,0|n,1,0),n=hg,cg[A+64>>2]=t,cg[A+64+4>>2]=n),i=0|aI(0|t,0|n,0|a,0|i),cg[A+64>>2]=i,cg[A+64+4>>2]=hg,i=0|rI(128,0,127&B|0,0),(t=hg)>>>0>g>>>0|(0|t)==(0|g)&i>>>0>I>>>0)for(t=0,n=0;;)if(E=0|Bg[e+t>>0],s=0|aI(0|t,0|n,127&B|0,0),Bg[A+80+s>>0]=E,t=0|aI(0|t,0|n,1,0),!((n=hg)>>>0<g>>>0|(0|n)==(0|g)&t>>>0<I>>>0))break A;if(!(0==(0|i)&0==(0|t))){n=0,a=0;do{E=0|Bg[e+n>>0],s=0|aI(0|n,0|a,127&B|0,0),Bg[A+80+s>>0]=E,n=0|aI(0|n,0|a,1,0),a=hg}while(a>>>0<t>>>0|(0|a)==(0|t)&n>>>0<i>>>0)}if(r(A,A+80|0,c,c+640|0),t=0|rI(0|I,0|g,0|i,0|t),(n=hg)>>>0>0|0==(0|n)&t>>>0>127){a=e+i|0;do{r(A,a,c,c+640|0),a=a+128|0,t=0|aI(0|t,0|n,-128,-1),n=hg}while(n>>>0>0|0==(0|n)&t>>>0>127);i=a}else i=e+i|0;if(!(0==(0|(t&=127))&!0)){n=0,a=0;do{Bg[A+80+n>>0]=0|Bg[i+n>>0],n=0|aI(0|n,0|a,1,0),a=hg}while(a>>>0<0|0==(0|a)&n>>>0<t>>>0)}$A(c,704)}}while(0);Qg=C}function _(A,e){A|=0;var I=0,g=0;I=Qg,g=Qg=Qg+63&-64,Qg=Qg+160|0,B(g+120|0,e|=0),B(g+80|0,g+120|0),B(g+80|0,g+80|0),a(g+80|0,e,g+80|0),a(g+120|0,g+120|0,g+80|0),B(g+40|0,g+120|0),a(g+80|0,g+80|0,g+40|0),B(g+40|0,g+80|0),e=1;do{B(g+40|0,g+40|0),e=e+1|0}while(5!=(0|e));a(g+80|0,g+40|0,g+80|0),B(g+40|0,g+80|0),e=1;do{B(g+40|0,g+40|0),e=e+1|0}while(10!=(0|e));a(g+40|0,g+40|0,g+80|0),B(g,g+40|0),e=1;do{B(g,g),e=e+1|0}while(20!=(0|e));a(g+40|0,g,g+40|0),B(g+40|0,g+40|0),e=1;do{B(g+40|0,g+40|0),e=e+1|0}while(10!=(0|e));a(g+80|0,g+40|0,g+80|0),B(g+40|0,g+80|0),e=1;do{B(g+40|0,g+40|0),e=e+1|0}while(50!=(0|e));a(g+40|0,g+40|0,g+80|0),B(g,g+40|0),e=1;do{B(g,g),e=e+1|0}while(100!=(0|e));a(g+40|0,g,g+40|0),B(g+40|0,g+40|0),e=1;do{B(g+40|0,g+40|0),e=e+1|0}while(50!=(0|e));a(g+80|0,g+40|0,g+80|0),B(g+80|0,g+80|0),e=1;do{B(g+80|0,g+80|0),e=e+1|0}while(5!=(0|e));a(A,g+80|0,g+120|0),Qg=I}function p(A,e){A|=0;var I=0,g=0,t=0;g=Qg,t=Qg=Qg+63&-64,Qg=Qg+128|0,B(t+80|0,e|=0),B(t+40|0,t+80|0),B(t+40|0,t+40|0),a(t+40|0,e,t+40|0),a(t+80|0,t+80|0,t+40|0),B(t+80|0,t+80|0),a(t+80|0,t+40|0,t+80|0),B(t+40|0,t+80|0),I=1;do{B(t+40|0,t+40|0),I=I+1|0}while(5!=(0|I));a(t+80|0,t+40|0,t+80|0),B(t+40|0,t+80|0),I=1;do{B(t+40|0,t+40|0),I=I+1|0}while(10!=(0|I));a(t+40|0,t+40|0,t+80|0),B(t,t+40|0),I=1;do{B(t,t),I=I+1|0}while(20!=(0|I));a(t+40|0,t,t+40|0),B(t+40|0,t+40|0),I=1;do{B(t+40|0,t+40|0),I=I+1|0}while(10!=(0|I));a(t+80|0,t+40|0,t+80|0),B(t+40|0,t+80|0),I=1;do{B(t+40|0,t+40|0),I=I+1|0}while(50!=(0|I));a(t+40|0,t+40|0,t+80|0),B(t,t+40|0),I=1;do{B(t,t),I=I+1|0}while(100!=(0|I));a(t+40|0,t,t+40|0),B(t+40|0,t+40|0),I=1;do{B(t+40|0,t+40|0),I=I+1|0}while(50!=(0|I));a(t+80|0,t+40|0,t+80|0),B(t+80|0,t+80|0),B(t+80|0,t+80|0),a(A,t+80|0,e),Qg=g}function w(A,e){A|=0;var I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0;c=0|cg[(e|=0)>>2],r=0|cg[e+4>>2],n=0|cg[e+8>>2],a=0|cg[e+12>>2],Q=0|cg[e+16>>2],g=0|cg[e+20>>2],t=0|cg[e+24>>2],C=0|cg[e+28>>2],I=0|cg[e+32>>2],c=(19*((((((((((((16777216+(19*(e=0|cg[e+36>>2])|0)|0)>>>25)+c>>26)+r>>25)+n>>26)+a>>25)+Q>>26)+g>>25)+t>>26)+C>>25)+I>>26)+e>>25)|0)+c-((o=(19*((((((((((((16777216+(19*e|0)|0)>>>25)+c>>26)+r>>25)+n>>26)+a>>25)+Q>>26)+g>>25)+t>>26)+C>>25)+I>>26)+e>>25)|0)+c>>26)<<26)|0,B=o+r-(o+r>>25<<25)|0,i=(o+r>>25)+n-((o+r>>25)+n>>26<<26)|0,a=((o+r>>25)+n>>26)+a-((E=((o+r>>25)+n>>26)+a>>25)<<25)|0,n=E+Q-(E+Q>>26<<26)|0,r=(E+Q>>26)+g-((E+Q>>26)+g>>25<<25)|0,t=((E+Q>>26)+g>>25)+t-((o=((E+Q>>26)+g>>25)+t>>26)<<26)|0,g=o+C-(o+C>>25<<25)|0,e=((o+C>>25)+I>>26)+e|0,I=(o+C>>25)+I-((o+C>>25)+I>>26<<26)|0,Bg[A>>0]=c,Bg[A+1>>0]=c>>>8,Bg[A+2>>0]=c>>>16,Bg[A+3>>0]=B<<2|c>>>24,Bg[A+4>>0]=B>>>6,Bg[A+5>>0]=B>>>14,Bg[A+6>>0]=i<<3|B>>>22,Bg[A+7>>0]=i>>>5,Bg[A+8>>0]=i>>>13,Bg[A+9>>0]=a<<5|i>>>21,Bg[A+10>>0]=a>>>3,Bg[A+11>>0]=a>>>11,Bg[A+12>>0]=n<<6|a>>>19,Bg[A+13>>0]=n>>>2,Bg[A+14>>0]=n>>>10,Bg[A+15>>0]=n>>>18,Bg[A+16>>0]=r,Bg[A+17>>0]=r>>>8,Bg[A+18>>0]=r>>>16,Bg[A+19>>0]=t<<1|r>>>24,Bg[A+20>>0]=t>>>7,Bg[A+21>>0]=t>>>15,Bg[A+22>>0]=g<<3|t>>>23,Bg[A+23>>0]=g>>>5,Bg[A+24>>0]=g>>>13,Bg[A+25>>0]=I<<4|g>>>21,Bg[A+26>>0]=I>>>4,Bg[A+27>>0]=I>>>12,Bg[A+28>>0]=I>>>20|(33554431&e)<<6,Bg[A+29>>0]=e>>>2,Bg[A+30>>0]=e>>>10,Bg[A+31>>0]=(33554431&e)>>>18}function u(A,e,I){A|=0,e|=0;var g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0,l=0,d=0,D=0,v=0,k=0,b=0,G=0,F=0,m=0,H=0,M=0;for(i=0|kI(I|=0),a=0|kI(I+4|0),n=0|kI(I+8|0),r=0|kI(I+12|0),h=0|kI(I+16|0),y=0|kI(I+20|0),s=0|kI(I+24|0),E=0|kI(I+28|0),t=0|kI(e),g=0|kI(e+4|0),B=0|kI(e+8|0),I=0|kI(e+12|0),e=B,B=20,c=2036477234,C=857760878,o=1634760805,Q=1797285236;;){if(k=(0|OI(y+o|0,7))^r,d=(0|OI(k+o|0,9))^e,w=(0|OI(d+k|0,13))^y,F=(0|OI(w+d|0,18))^o,l=(0|OI(C+i|0,7))^I,p=(0|OI(l+C|0,9))^s,M=(0|OI(p+l|0,13))^i,v=(0|OI(M+p|0,18))^C,_=(0|OI(c+t|0,7))^E,H=(0|OI(_+c|0,9))^a,G=(0|OI(H+_|0,13))^t,u=(0|OI(G+H|0,18))^c,m=(0|OI(Q+h|0,7))^n,b=(0|OI(m+Q|0,9))^g,D=(0|OI(b+m|0,13))^h,f=(0|OI(D+b|0,18))^Q,i=(0|OI(m+F|0,7))^M,a=(0|OI(i+F|0,9))^H,n=(0|OI(a+i|0,13))^m,o=(0|OI(n+a|0,18))^F,t=(0|OI(v+k|0,7))^G,g=(0|OI(t+v|0,9))^b,r=(0|OI(g+t|0,13))^k,C=(0|OI(r+g|0,18))^v,h=(0|OI(u+l|0,7))^D,e=(0|OI(h+u|0,9))^d,I=(0|OI(e+h|0,13))^l,c=(0|OI(I+e|0,18))^u,y=(0|OI(f+_|0,7))^w,s=(0|OI(y+f|0,9))^p,E=(0|OI(s+y|0,13))^_,Q=(0|OI(E+s|0,18))^f,(0|B)<=2)break;B=B+-2|0}oI(A,o),oI(A+4|0,C),oI(A+8|0,c),oI(A+12|0,Q),oI(A+16|0,t),oI(A+20|0,g),oI(A+24|0,e),oI(A+28|0,I)}function l(A,e,I){A|=0,e|=0,I|=0;var g=0,t=0,r=0,n=0;r=Qg,n=Qg=Qg+63&-64,Qg=Qg+320|0,g=(t=n+280|0)+32|0;do{Bg[t>>0]=0|Bg[e>>0],t=t+1|0,e=e+1|0}while((0|t)<(0|g));for(Bg[n+280>>0]=-8&Bg[n+280>>0],Bg[n+280+31>>0]=63&Bg[n+280+31>>0]|64,Q(n+240|0,I),qe(n+200|0),QI(n+160|0),sA(n+120|0,n+240|0),qe(n+80|0),e=0,g=254;;){if(t=e,e=(0|Cg[n+280+(g>>>3)>>0])>>>(7&g)&1,t^=e,G(n+200|0,n+120|0,t),G(n+160|0,n+80|0,t),V(n+40|0,n+120|0,n+80|0),V(n,n+200|0,n+160|0),j(n+200|0,n+200|0,n+160|0),j(n+160|0,n+120|0,n+80|0),a(n+80|0,n+40|0,n+200|0),a(n+160|0,n+160|0,n),B(n+40|0,n),B(n,n+200|0),j(n+120|0,n+80|0,n+160|0),V(n+160|0,n+80|0,n+160|0),a(n+200|0,n,n+40|0),V(n,n,n+40|0),B(n+160|0,n+160|0),E(n+80|0,n),B(n+120|0,n+120|0),j(n+40|0,n+40|0,n+80|0),a(n+80|0,n+240|0,n+160|0),a(n+160|0,n,n+40|0),(0|g)<=0)break;g=g+-1|0}return G(n+200|0,n+120|0,e),G(n+160|0,n+80|0,e),_(n+160|0,n+160|0),a(n+200|0,n+200|0,n+160|0),w(A,n+200|0),Qg=r,0}function d(A,e){A|=0;var I=0,g=0,t=0;for(g=Qg,t=Qg=Qg+63&-64,Qg=Qg+1760|0,ee(t+480|0,e|=0),Ve(t+320|0,e),ge(t,t+320|0),eA(t+320|0,t,t+480|0),ge(t+160|0,t+320|0),ee(t+480+160|0,t+160|0),eA(t+320|0,t,t+480+160|0),ge(t+160|0,t+320|0),ee(t+480+320|0,t+160|0),eA(t+320|0,t,t+480+320|0),ge(t+160|0,t+320|0),ee(t+480+480|0,t+160|0),eA(t+320|0,t,t+480+480|0),ge(t+160|0,t+320|0),ee(t+480+640|0,t+160|0),eA(t+320|0,t,t+480+640|0),ge(t+160|0,t+320|0),ee(t+480+800|0,t+160|0),eA(t+320|0,t,t+480+800|0),ge(t+160|0,t+320|0),ee(t+480+960|0,t+160|0),eA(t+320|0,t,t+480+960|0),ge(t+160|0,t+320|0),ee(t+480+1120|0,t+160|0),Ke(A),e=252;;){if(Ve(t+320|0,A),(I=0|Bg[33148+e>>0])<<24>>24<=0?I<<24>>24<0&&(ge(t+160|0,t+320|0),IA(t+320|0,t+160|0,t+480+(160*(((I<<24>>24)/-2|0)<<24>>24)|0)|0)):(ge(t+160|0,t+320|0),eA(t+320|0,t+160|0,t+480+(160*((255&I)>>>1&255)|0)|0)),ge(A,t+320|0),!((0|e)>0))break;e=e+-1|0}Qg=g}function D(A,e,I,g){e|=0,I|=0,g|=0;var t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0;if(r=0|cg[(A|=0)+56>>2],t=0|cg[A+56+4>>2],0==(0|r)&0==(0|t))c=6;else{if(a=0|rI(16,0,0|r,0|t),B=hg,i=B>>>0>g>>>0|(0|B)==(0|g)&a>>>0>I>>>0?I:a,B=B>>>0>g>>>0|(0|B)==(0|g)&a>>>0>I>>>0?g:B,!(0==(0|i)&0==(0|B))){a=0,n=0;do{C=0|Bg[e+a>>0],r=0|aI(0|r,0|t,0|a,0|n),Bg[A+64+r>>0]=C,a=0|aI(0|a,0|n,1,0),n=hg,r=0|cg[A+56>>2],t=0|cg[A+56+4>>2]}while(n>>>0<B>>>0|(0|n)==(0|B)&a>>>0<i>>>0)}C=0|aI(0|r,0|t,0|i,0|B),a=hg,cg[A+56>>2]=C,cg[A+56+4>>2]=a,a>>>0<0|0==(0|a)&C>>>0<16||(I=0|rI(0|I,0|g,0|i,0|B),g=hg,o(A,A+64|0,16,0),cg[A+56>>2]=0,cg[A+56+4>>2]=0,e=e+i|0,c=6)}if(6==(0|c)&&(t=-16&I,g>>>0>0|0==(0|g)&I>>>0>15?(I=0|rI(0|I,0|g,0|t,0|g),C=hg,o(A,e,t,g),e=e+t|0,t=C):t=g,!(0==(0|I)&0==(0|t)))){g=0,r=0|cg[A+56>>2],n=0|cg[A+56+4>>2],a=0;do{c=0|Bg[e+g>>0],C=0|aI(0|r,0|n,0|g,0|a),Bg[A+64+C>>0]=c,g=0|aI(0|g,0|a,1,0),a=hg,r=0|cg[A+56>>2],n=0|cg[A+56+4>>2]}while(a>>>0<t>>>0|(0|a)==(0|t)&g>>>0<I>>>0);C=0|aI(0|r,0|n,0|I,0|t),cg[A+56>>2]=C,cg[A+56+4>>2]=hg}}function v(A,e,I,g,t,r,n,a){A|=0,e|=0,t|=0,r|=0,n|=0,a|=0;var i=0,B=0,c=0,C=0;if(c=Qg,C=Qg=Qg+63&-64,Qg=Qg+112|0,!(0==(0|(I|=0))&0==(0|(g|=0)))){i=(B=C+16|0)+32|0;do{Bg[B>>0]=0|Bg[a>>0],B=B+1|0,a=a+1|0}while((0|B)<(0|i));for(a=Cg[t+4>>0]|Cg[t+4+1>>0]<<8|Cg[t+4+2>>0]<<16|Cg[t+4+3>>0]<<24,cg[C>>2]=Cg[t>>0]|Cg[t+1>>0]<<8|Cg[t+2>>0]<<16|Cg[t+3>>0]<<24,cg[C+4>>2]=a,a=8;;){if(Bg[C+a>>0]=r,r=0|Oe(0|r,0|n,8),16==(0|(a=a+1|0)))break;n=hg}if(g>>>0>0|0==(0|g)&I>>>0>63)for(a=A,r=I;;){PI(C+48|0,C,C+16|0),A=0;do{Bg[a+A>>0]=Bg[C+48+A>>0]^Bg[e+A>>0],A=A+1|0}while(64!=(0|A));for(A=1,n=8;;){if(I=C+n|0,A=(0|Cg[I>>0])+A|0,Bg[I>>0]=A,16==(0|(n=n+1|0)))break;A>>>=8}if(n=0|aI(0|r,0|g,-64,-1),g=hg,A=a+64|0,e=e+64|0,!(g>>>0>0|0==(0|g)&n>>>0>63))break;a=A,r=n}else n=I;if(0==(0|n)&0==(0|g)?0:(PI(C+48|0,C,C+16|0),0|n)){g=0;do{Bg[A+g>>0]=Bg[C+48+g>>0]^Bg[e+g>>0],g=g+1|0}while((0|g)!=(0|n))}$A(C+48|0,64),$A(C+16|0,32)}Qg=c}function k(A,e,I,g,t,r,n){A|=0,e|=0,I|=0,g|=0,t|=0;var a=0,i=0,B=0,c=0;i=Qg,B=Qg=Qg+63&-64,Qg=Qg+352|0,u(B+256|0,r|=0,n|=0),(A>>>0>I>>>0?0<t>>>0|0==(0|t)&(A-I|0)>>>0<g>>>0:0)?a=5:(I>>>0>A>>>0?0<t>>>0|0==(0|t)&(I-A|0)>>>0<g>>>0:0)&&(a=5),5==(0|a)&&(jA(0|A,0|I,0|g),I=A),a=(n=B+288|0)+32|0;do{Bg[n>>0]=0,n=n+1|0}while((0|n)<(0|a));return n=t>>>0>0|0==(0|t)&g>>>0>32?32:g,a=t>>>0>0|0==(0|t)&g>>>0>32?0:t,0==(0|n)&0==(0|a)||M(B+288+32|0,0|I,(c=0|rI(-2,-1,0|(~t>>>0>4294967295|-1==(0|~t)&~g>>>0>4294967263?~g:-33),0|(~t>>>0>4294967295|-1==(0|~t)&~g>>>0>4294967263?~t:-1)))+1|0),c=0|aI(0|n,0|a,32,0),II(B+288|0,B+288|0,c,hg,r+16|0,B+256|0),MI(B,B+288|0),0==(0|n)&0==(0|a)||M(0|A,B+288+32|0,(c=0|rI(-2,-1,0|(~t>>>0>4294967295|-1==(0|~t)&~g>>>0>4294967263?~g:-33),0|(~t>>>0>4294967295|-1==(0|~t)&~g>>>0>4294967263?~t:-1)))+1|0),$A(B+288|0,64),t>>>0>0|0==(0|t)&g>>>0>32&&$e(A+n|0,I+n|0,c=0|rI(0|g,0|t,0|n,0|a),hg,r+16|0,B+256|0),$A(B+256|0,32),BI(B,A,g,t),HI(B,e),$A(B,256),Qg=i,0}function b(A,e){e|=0;var I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0;if(g=0|cg[(A|=0)+56>>2],I=0|cg[A+56+4>>2],!(0==(0|g)&0==(0|I))){for(t=1;;){if(Bg[A+64+g>>0]=t,g=0|aI(0|g,0|I,1,0),!((I=hg)>>>0<0|0==(0|I)&g>>>0<16))break;t=0}Bg[A+80>>0]=1,o(A,A+64|0,16,0)}g=0|cg[A+24>>2],i=(((B=(((r=(5*((n=((i=((t=(0|cg[A+28>>2])+(g>>>26)|0)>>>26)+(0|cg[A+32>>2])|0)>>>26)+(0|cg[A+36>>2])|0)>>>26)|0)+(0|cg[A+20>>2])|0)>>>26)+(67108863&g)+((5+(67108863&r)|0)>>>26)|0)>>>26)+(67108863&t)|0)>>>26)+i&67108863&((a=(-67108864|n)+((((B+(67108863&t)|0)>>>26)+(67108863&i)|0)>>>26)|0)>>>31)-1|a>>31&67108863&i,r=0|aI(r+5&67108863&(a>>>31)-1|a>>31&67108863&r|(g=(r>>>26)+(67108863&g)+((5+(67108863&r)|0)>>>26)&67108863&(a>>>31)-1|a>>31&(r>>>26)+(67108863&g))<<26|0,0,0|cg[A+40>>2],0),I=hg,I=0|aI(0|(g=0|aI(g>>>6|(B+t&67108863&(a>>>31)-1|a>>31&67108863&t)<<20|0,0,0|cg[A+44>>2],0)),0|hg,0|I,0),g=hg,g=0|aI(0|(t=0|aI((B+t&67108863&(a>>>31)-1|a>>31&67108863&t)>>>12|i<<14|0,0,0|cg[A+48>>2],0)),0|hg,0|g,0),t=hg,t=0|aI(0|(n=0|aI(i>>>18|((a>>>31)-1&a|a>>31&n)<<8|0,0,0|cg[A+52>>2],0)),0|hg,0|t,0),oI(e,r),oI(e+4|0,I),oI(e+8|0,g),oI(e+12|0,t),$A(A,88)}function G(A,e,I){e|=0,I|=0;var g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0,u=0;u=0|cg[(A|=0)>>2],p=0|cg[A+4>>2],f=0|cg[A+8>>2],y=0|cg[A+12>>2],E=0|cg[A+16>>2],o=0|cg[A+20>>2],c=0|cg[A+24>>2],i=0|cg[A+28>>2],n=0|cg[A+32>>2],t=0|cg[A+36>>2],w=0|cg[e>>2],_=0|cg[e+4>>2],h=0|cg[e+8>>2],s=0|cg[e+12>>2],Q=0|cg[e+16>>2],C=0|cg[e+20>>2],B=0|cg[e+24>>2],a=0|cg[e+28>>2],r=0|cg[e+32>>2],g=0|cg[e+36>>2],cg[A>>2]=(w^u)&0-I^u,cg[A+4>>2]=(_^p)&0-I^p,cg[A+8>>2]=(h^f)&0-I^f,cg[A+12>>2]=(s^y)&0-I^y,cg[A+16>>2]=(Q^E)&0-I^E,cg[A+20>>2]=(C^o)&0-I^o,cg[A+24>>2]=(B^c)&0-I^c,cg[A+28>>2]=(a^i)&0-I^i,cg[A+32>>2]=(r^n)&0-I^n,cg[A+36>>2]=(g^t)&0-I^t,cg[e>>2]=(w^u)&0-I^w,cg[e+4>>2]=(_^p)&0-I^_,cg[e+8>>2]=(h^f)&0-I^h,cg[e+12>>2]=(s^y)&0-I^s,cg[e+16>>2]=(Q^E)&0-I^Q,cg[e+20>>2]=(C^o)&0-I^C,cg[e+24>>2]=(B^c)&0-I^B,cg[e+28>>2]=(a^i)&0-I^a,cg[e+32>>2]=(r^n)&0-I^r,cg[e+36>>2]=(g^t)&0-I^g}function F(A,e,I,g,t,r,n){A|=0,e|=0,I|=0,g|=0,t|=0;var a=0,i=0,B=0;return B=Qg,i=Qg=Qg+63&-64,Qg=Qg+96|0,u(i,r|=0,n|=0),NI(i+32|0,r+16|0,i),0|eI(I,e,g,t,i+32|0)?($A(i,32),I=-1):A?((e>>>0>=A>>>0?0<t>>>0|0==(0|t)&(e-A|0)>>>0<g>>>0:0)?a=8:(A>>>0>=e>>>0?0<t>>>0|0==(0|t)&(A-e|0)>>>0<g>>>0:0)&&(a=8),8==(0|a)&&(jA(0|A,0|e,0|g),e=A),0==(0|(I=t>>>0>0|0==(0|t)&g>>>0>32?32:g))&0==(0|(n=t>>>0>0|0==(0|t)&g>>>0>32?0:t))?II(i+32|0,i+32|0,32,0,r+16|0,i):(M(i+32+32|0,0|e,(a=0|rI(-2,-1,0|(~t>>>0>4294967295|-1==(0|~t)&~g>>>0>4294967263?~g:-33),0|(~t>>>0>4294967295|-1==(0|~t)&~g>>>0>4294967263?~t:-1)))+1|0),II(i+32|0,i+32|0,0|aI(0|I,0|n,32,0),hg,r+16|0,i),M(0|A,i+32+32|0,a+1|0)),t>>>0>0|0==(0|t)&g>>>0>32&&$e(A+I|0,e+I|0,0|rI(0|g,0|t,0|I,0|n),hg,r+16|0,i),$A(i,32),I=0):I=0,Qg=B,0|I}function m(A,e){var I=0,g=0,t=0;return t=Qg,I=Qg=Qg+63&-64,Qg=Qg+208|0,Q((A|=0)+40|0,e|=0),qe(A+80|0),B(I+160|0,A+40|0),a(I+120|0,I+160|0,1104),V(I+160|0,I+160|0,A+80|0),j(I+120|0,I+120|0,A+80|0),B(I+80|0,I+120|0),a(I+80|0,I+80|0,I+120|0),B(A,I+80|0),a(A,A,I+120|0),a(A,A,I+160|0),p(A,A),a(A,A,I+80|0),a(A,A,I+160|0),B(I+40|0,A),a(I+40|0,I+40|0,I+120|0),V(I,I+40|0,I+160|0),0|le(I)?(j(I,I+40|0,I+160|0),0|le(I)?A=-1:(a(A,A,1144),g=4)):g=4,4==(0|g)&&((0|(g=0|Re(A)))==((0|Cg[e+31>>0])>>>7|0)&&CA(A,A),a(A+120|0,A,A+40|0),A=0),Qg=t,0|A}function H(A,e,I,g,t){A|=0,g|=0,t|=0;var r=0,n=0,a=0,i=0,B=0,c=0,C=0;if(c=Qg,C=Qg=Qg+63&-64,Qg=Qg+112|0,!(0==(0|(e|=0))&0==(0|(I|=0)))){r=(n=C+16|0)+32|0;do{Bg[n>>0]=0|Bg[t>>0],n=n+1|0,t=t+1|0}while((0|n)<(0|r));if(n=Cg[g+4>>0]|Cg[g+4+1>>0]<<8|Cg[g+4+2>>0]<<16|Cg[g+4+3>>0]<<24,cg[C>>2]=Cg[g>>0]|Cg[g+1>>0]<<8|Cg[g+2>>0]<<16|Cg[g+3>>0]<<24,cg[C+4>>2]=n,cg[C+8>>2]=0,cg[C+8+4>>2]=0,I>>>0>0|0==(0|I)&e>>>0>63){do{for(PI(A,C,C+16|0),t=1,r=8;;){if(n=C+r|0,t=(0|Cg[n>>0])+t|0,Bg[n>>0]=t,16==(0|(r=r+1|0)))break;t>>>=8}e=0|aI(0|e,0|I,-64,-1),I=hg,A=A+64|0}while(I>>>0>0|0==(0|I)&e>>>0>63);0==(0|e)&0==(0|I)||(i=A,B=e,a=7)}else i=A,B=e,a=7;if(7==(0|a)?(PI(C+48|0,C,C+16|0),0|B):0){t=0;do{Bg[i+t>>0]=0|Bg[C+48+t>>0],t=t+1|0}while((0|t)!=(0|B))}$A(C+48|0,64),$A(C+16|0,32)}Qg=c}function M(A,e,I){A|=0,e|=0;var g=0,t=0,r=0;if((0|(I|=0))>=8192)return 0|vg(0|A,0|e,0|I);if(r=0|A,t=A+I|0,(3&A)==(3&e)){for(;3&A;){if(!I)return 0|r;Bg[A>>0]=0|Bg[e>>0],A=A+1|0,e=e+1|0,I=I-1|0}for(g=(I=-4&t|0)-64|0;(0|A)<=(0|g);)cg[A>>2]=cg[e>>2],cg[A+4>>2]=cg[e+4>>2],cg[A+8>>2]=cg[e+8>>2],cg[A+12>>2]=cg[e+12>>2],cg[A+16>>2]=cg[e+16>>2],cg[A+20>>2]=cg[e+20>>2],cg[A+24>>2]=cg[e+24>>2],cg[A+28>>2]=cg[e+28>>2],cg[A+32>>2]=cg[e+32>>2],cg[A+36>>2]=cg[e+36>>2],cg[A+40>>2]=cg[e+40>>2],cg[A+44>>2]=cg[e+44>>2],cg[A+48>>2]=cg[e+48>>2],cg[A+52>>2]=cg[e+52>>2],cg[A+56>>2]=cg[e+56>>2],cg[A+60>>2]=cg[e+60>>2],A=A+64|0,e=e+64|0;for(;(0|A)<(0|I);)cg[A>>2]=cg[e>>2],A=A+4|0,e=e+4|0}else for(I=t-4|0;(0|A)<(0|I);)Bg[A>>0]=0|Bg[e>>0],Bg[A+1>>0]=0|Bg[e+1>>0],Bg[A+2>>0]=0|Bg[e+2>>0],Bg[A+3>>0]=0|Bg[e+3>>0],A=A+4|0,e=e+4|0;for(;(0|A)<(0|t);)Bg[A>>0]=0|Bg[e>>0],A=A+1|0,e=e+1|0;return 0|r}function Y(A){var e=0,I=0,g=0,t=0,r=0;I=Qg,g=Qg=Qg+63&-64,Qg=Qg+48|0,t=A|=0,r=(e=g)+32|0;do{Bg[e>>0]=0|Bg[t>>0],e=e+1|0,t=t+1|0}while((0|e)<(0|r));t=Cg[A+36>>0]|Cg[A+36+1>>0]<<8|Cg[A+36+2>>0]<<16|Cg[A+36+3>>0]<<24,e=Cg[A+36+4>>0]|Cg[A+36+4+1>>0]<<8|Cg[A+36+4+2>>0]<<16|Cg[A+36+4+3>>0]<<24,Bg[g+32>>0]=t,Bg[g+32+1>>0]=t>>8,Bg[g+32+2>>0]=t>>16,Bg[g+32+3>>0]=t>>24,Bg[g+32+4>>0]=e,Bg[g+32+4+1>>0]=e>>8,Bg[g+32+4+2>>0]=e>>16,Bg[g+32+4+3>>0]=e>>24,yI(g,g,A+32|0,A),t=g,r=(e=A)+32|0;do{Bg[e>>0]=0|Bg[t>>0],e=e+1|0,t=t+1|0}while((0|e)<(0|r));t=Cg[g+32>>0]|Cg[g+32+1>>0]<<8|Cg[g+32+2>>0]<<16|Cg[g+32+3>>0]<<24,r=Cg[g+32+4>>0]|Cg[g+32+4+1>>0]<<8|Cg[g+32+4+2>>0]<<16|Cg[g+32+4+3>>0]<<24,Bg[A+36>>0]=t,Bg[A+36+1>>0]=t>>8,Bg[A+36+2>>0]=t>>16,Bg[A+36+3>>0]=t>>24,Bg[A+36+4>>0]=r,Bg[A+36+4+1>>0]=r>>8,Bg[A+36+4+2>>0]=r>>16,Bg[A+36+4+3>>0]=r>>24,je(A),Qg=I}function S(A,e){A|=0,e|=0;var I=0,g=0,t=0,r=0,n=0;g=Qg,t=Qg=Qg+63&-64,Qg=Qg+464|0,I=0;do{n=0|Bg[e+I>>0],Bg[t+400+(r=I<<1)>>0]=15&n,Bg[t+400+(1|r)>>0]=(255&n)>>>4,I=I+1|0}while(32!=(0|I));I=0,e=0;do{I=134217728+((r=(0|Cg[(n=t+400+e|0)>>0])+I|0)<<24)>>28,Bg[n>>0]=r-(I<<4),e=e+1|0}while(63!=(0|e));Bg[t+400+63>>0]=(0|Cg[t+400+63>>0])+I,Ke(A),I=1;do{q(t,(0|I)/2|0,0|Bg[t+400+I>>0]),nA(t+240|0,A,t),ge(A,t+240|0),I=I+2|0}while((0|I)<64);Ve(t+240|0,A),fe(t+120|0,t+240|0),hA(t+240|0,t+120|0),fe(t+120|0,t+240|0),hA(t+240|0,t+120|0),fe(t+120|0,t+240|0),hA(t+240|0,t+120|0),ge(A,t+240|0),I=0;do{q(t,(0|I)/2|0,0|Bg[t+400+I>>0]),nA(t+240|0,A,t),ge(A,t+240|0),I=I+2|0}while((0|I)<64);Qg=g}function N(A,e,I,g,t){A|=0,I|=0,g|=0,t|=0;var r=0,n=0,a=0;n=Qg,a=Qg=Qg+63&-64,Qg=Qg+192|0,((e|=0)+-1&255)>63&&ig(),I||ig(),Bg[a+128>>0]=e,Bg[a+128+1>>0]=32,Bg[a+128+2>>0]=1,Bg[a+128+3>>0]=1,GI(a+128+4|0),me(a+128+8|0),r=(e=a+128+16|0)+16|0;do{Bg[e>>0]=0,e=e+1|0}while((0|e)<(0|r));if(g)Ue(a+128|0,g);else{r=(e=a+128+32|0)+16|0;do{Bg[e>>0]=0,e=e+1|0}while((0|e)<(0|r))}if(t)Se(a+128|0,t);else{r=(e=a+128+48|0)+16|0;do{Bg[e>>0]=0,e=e+1|0}while((0|e)<(0|r))}XA(A,a+128|0),r=(e=a+32|0)+96|0;do{Bg[e>>0]=0,e=e+1|0}while((0|e)<(0|r));r=(e=a)+32|0;do{Bg[e>>0]=0|Bg[I>>0],e=e+1|0,I=I+1|0}while((0|e)<(0|r));K(A,a,128,0),$A(a,128),Qg=n}function R(A,e,I,g,t,r,n,a,i,B,c){A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0;var C=0;C=Qg,Qg=Qg+352|0,sI(C+280|0,64,0,B|=0,c|=0),MI(C,C+280|0),$A(C+280|0,64),BI(C,n,a,i),BI(C,35352,15&(e=0|rI(0,0,0|a,0|i)),0),BI(C,I,g,t),BI(C,35352,15&(e=0|rI(0,0,0|g,0|t)),0),Qe(C+272|0,a,i),BI(C,C+272|0,8,0),Qe(C+272|0,g,t),BI(C,C+272|0,8,0),HI(C,C+256|0),$A(C,256),e=0|ZI(C+256|0,r),$A(C+256|0,16);do{if(A){if(e){AA(0|A,0,0|g),e=-1;break}Te(A,I,g,t,B,1,c),e=0;break}}while(0);return Qg=C,0|e}function U(A,e,I,g,t,r){e|=0,I|=0,g|=0,t|=0,r|=0;var a=0,i=0,B=0,c=0;if(c=Qg,B=Qg=Qg+63&-64,Qg=Qg+592|0,(0==(0|JA((A|=0)+32|0))?0==(0|KA(A)):0)?0==(0|m(B+328|0,t)):0){a=0,i=0;do{i=0|Cg[t+a>>0]|i,a=a+1|0}while(32!=(0|a));i?(cI(B,r),f(B,A,32,0),f(B,t,32,0),f(B,e,I,g),_e(B,B+520|0),n(B+520|0),y(B+208|0,B+520|0,B+328|0,A+32|0),bA(B+488|0,B+208|0),a=0|jI(B+488|0,A),a=0|((B+488|0)==(0|A)?-1:a)|vA(A,B+488|0,32)):a=-1}else a=-1;return Qg=c,0|a}function P(A,e,I){e|=0,I|=0;var g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0;w=0|cg[(A|=0)>>2],_=0|cg[A+4>>2],h=0|cg[A+8>>2],s=0|cg[A+12>>2],Q=0|cg[A+16>>2],C=0|cg[A+20>>2],B=0|cg[A+24>>2],a=0|cg[A+28>>2],r=0|cg[A+32>>2],g=0|cg[A+36>>2],p=(cg[e+4>>2]^_)&0-I,f=(cg[e+8>>2]^h)&0-I,y=(cg[e+12>>2]^s)&0-I,E=(cg[e+16>>2]^Q)&0-I,o=(cg[e+20>>2]^C)&0-I,c=(cg[e+24>>2]^B)&0-I,i=(cg[e+28>>2]^a)&0-I,n=(cg[e+32>>2]^r)&0-I,t=(cg[e+36>>2]^g)&0-I,cg[A>>2]=(cg[e>>2]^w)&0-I^w,cg[A+4>>2]=p^_,cg[A+8>>2]=f^h,cg[A+12>>2]=y^s,cg[A+16>>2]=E^Q,cg[A+20>>2]=o^C,cg[A+24>>2]=c^B,cg[A+28>>2]=i^a,cg[A+32>>2]=n^r,cg[A+36>>2]=t^g}function J(A,e,I,g,r,a,i){A|=0,e|=0,I|=0,g|=0,r|=0,a|=0;var B=0,c=0;B=Qg,c=Qg=Qg+63&-64,Qg=Qg+560|0,cI(c,i|=0),ie(c+496|0,a,32,0),f(c,c+496+32|0,32,0),f(c,I,g,r),_e(c,c+432|0),jA(A+32|0,a+32|0,32),n(c+432|0),S(c+208|0,c+432|0),bA(A,c+208|0),cI(c,i),f(c,A,64,0),f(c,I,g,r),_e(c,c+368|0),n(c+368|0),dI(c+496|0),t(A+32|0,c+368|0,c+496|0,c+432|0),$A(c+496|0,64),$A(c+432|0,64),0|e&&(cg[e>>2]=64,cg[e+4>>2]=0),Qg=B}function x(A,e){A|=0,e|=0;var I=0,g=0,t=0,r=0,n=0;I=0;do{Bg[A+I>>0]=(0|Cg[e+(I>>3)>>0])>>>(7&I)&1,I=I+1|0}while(256!=(0|I));r=0;do{n=A+r|0;A:do{if(0|Bg[n>>0]){t=1;do{if((0|(I=t+r|0))>=256)break A;e=0|Bg[A+I>>0];e:do{if(e<<24>>24){if(e=e<<24>>24<<t,((g=0|Bg[n>>0])+e|0)<16){Bg[n>>0]=g+e,Bg[A+I>>0]=0;break}if((g-e|0)<=-16)break A;for(Bg[n>>0]=g-e;;){if(e=A+I|0,!(0|Bg[e>>0]))break;if(Bg[e>>0]=0,(0|(I=I+1|0))>=256)break e}Bg[e>>0]=1}}while(0);t=t+1|0}while((0|t)<7)}}while(0);r=r+1|0}while(256!=(0|r))}function L(A,e,I,g,t,r,n,a,i,B,c,C){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0,c|=0,C|=0,B=Qg,Qg=Qg+336|0,sI(B+264|0,64,0,c,C),MI(B,B+264|0),$A(B+264|0,64),BI(B,n,a,i),n=0|rI(0,0,0|a,0|i),BI(B,35352,15&n,0),Te(A,g,t,r,c,1,C),BI(B,A,t,r),n=0|rI(0,0,0|t,0|r),BI(B,35352,15&n,0),Qe(B+256|0,a,i),BI(B,B+256|0,8,0),Qe(B+256|0,t,r),BI(B,B+256|0,8,0),HI(B,e),$A(B,256),0|I&&(cg[I>>2]=16,cg[I+4>>2]=0),Qg=B,0}function K(A,e,I,t){A|=0,e|=0,I|=0,t|=0;var r=0,n=0,a=0,i=0;A:do{if(!(0==(0|I)&0==(0|t))){for(r=0|cg[A+352>>2],i=t;;){if(a=256-r|0,t=A+96+r|0,!(i>>>0>0|0==(0|i)&I>>>0>a>>>0))break;M(0|t,0|e,0|a),cg[A+352>>2]=(0|cg[A+352>>2])+a,SA(A,128,0),g(A,A+96|0),r=A+224|0,n=(t=A+96|0)+128|0;do{Bg[t>>0]=0|Bg[r>>0],t=t+1|0,r=r+1|0}while((0|t)<(0|n));if(r=(0|cg[A+352>>2])-128|0,cg[A+352>>2]=r,I=0|rI(0|I,0|i,0|a,0),t=hg,0==(0|I)&0==(0|t))break A;e=e+a|0,i=t}M(0|t,0|e,0|I),i=0|aI(0|cg[A+352>>2],0,0|I,0|i),cg[A+352>>2]=i}}while(0)}function X(A,e,I,g,t,r,n,a,i,B,c){A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0;var C=0;C=Qg,Qg=Qg+352|0,RI(C+280|0,B|=0,c|=0),MI(C,C+280|0),$A(C+280|0,64),BI(C,n,a,i),Qe(C+272|0,a,i),BI(C,C+272|0,8,0),BI(C,I,g,t),Qe(C+272|0,g,t),BI(C,C+272|0,8,0),HI(C,C+256|0),$A(C,256),e=0|ZI(C+256|0,r),$A(C+256|0,16);do{if(A){if(e){AA(0|A,0,0|g),e=-1;break}gI(A,I,g,t,B,c),e=0;break}}while(0);return Qg=C,0|e}function T(A,e,I){A|=0,e|=0;var t=0,r=0,n=0;if((I|=0)<<24>>24?(255&I)<=64:0){if(0|TI(0|cg[A+80>>2],0|cg[A+80+4>>2]))t=-1;else{t=0|cg[A+352>>2];do{if(t>>>0>128){if(SA(A,128,0),g(A,A+96|0),t=(0|cg[A+352>>2])-128|0,cg[A+352>>2]=t,t>>>0<129){M(A+96|0,A+224|0,0|t),r=A+96|0,n=0|cg[A+352>>2];break}kg(33401,33433,370,33478)}else r=A+96|0,n=t}while(0);SA(A,n,0),CI(A),AA(A+96+(t=0|cg[A+352>>2])|0,0,256-t|0),g(A,r),M(0|e,0|A,255&I|0),$A(A,64),$A(r,256),t=0}return 0|t}return ig(),0}function V(A,e,I){A|=0,I|=0;var g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0;C=(0|cg[(e|=0)+4>>2])-(0|cg[I+4>>2])|0,c=(0|cg[e+8>>2])-(0|cg[I+8>>2])|0,B=(0|cg[e+12>>2])-(0|cg[I+12>>2])|0,i=(0|cg[e+16>>2])-(0|cg[I+16>>2])|0,a=(0|cg[e+20>>2])-(0|cg[I+20>>2])|0,n=(0|cg[e+24>>2])-(0|cg[I+24>>2])|0,r=(0|cg[e+28>>2])-(0|cg[I+28>>2])|0,t=(0|cg[e+32>>2])-(0|cg[I+32>>2])|0,g=(0|cg[e+36>>2])-(0|cg[I+36>>2])|0,cg[A>>2]=(0|cg[e>>2])-(0|cg[I>>2]),cg[A+4>>2]=C,cg[A+8>>2]=c,cg[A+12>>2]=B,cg[A+16>>2]=i,cg[A+20>>2]=a,cg[A+24>>2]=n,cg[A+28>>2]=r,cg[A+32>>2]=t,cg[A+36>>2]=g}function j(A,e,I){A|=0,e|=0;var g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0;C=(0|cg[(I|=0)+4>>2])+(0|cg[e+4>>2])|0,c=(0|cg[I+8>>2])+(0|cg[e+8>>2])|0,B=(0|cg[I+12>>2])+(0|cg[e+12>>2])|0,i=(0|cg[I+16>>2])+(0|cg[e+16>>2])|0,a=(0|cg[I+20>>2])+(0|cg[e+20>>2])|0,n=(0|cg[I+24>>2])+(0|cg[e+24>>2])|0,r=(0|cg[I+28>>2])+(0|cg[e+28>>2])|0,t=(0|cg[I+32>>2])+(0|cg[e+32>>2])|0,g=(0|cg[I+36>>2])+(0|cg[e+36>>2])|0,cg[A>>2]=(0|cg[I>>2])+(0|cg[e>>2]),cg[A+4>>2]=C,cg[A+8>>2]=c,cg[A+12>>2]=B,cg[A+16>>2]=i,cg[A+20>>2]=a,cg[A+24>>2]=n,cg[A+28>>2]=r,cg[A+32>>2]=t,cg[A+36>>2]=g}function Z(A,e){A|=0,e|=0;var I=0,g=0;A:do{if(255&e){if(3&A)do{if((g=0|Bg[A>>0])<<24>>24==0?1:g<<24>>24==(255&e)<<24>>24)break A;A=A+1|0}while(0!=(3&A|0));g=0|fg(255&e,16843009),I=0|cg[A>>2];e:do{if(!((-2139062144&I^-2139062144)&I+-16843009))do{if((-2139062144&(I^=g)^-2139062144)&I+-16843009|0)break e;I=0|cg[(A=A+4|0)>>2]}while(!((-2139062144&I^-2139062144)&I+-16843009|0))}while(0);for(;;){if((g=0|Bg[A>>0])<<24>>24==0?1:g<<24>>24==(255&e)<<24>>24)break;A=A+1|0}}else A=A+(0|fA(A))|0}while(0);return 0|A}function O(A,e){e|=0;var I=0,g=0,t=0;t=Qg,Qg=Qg+192|0,ae(A|=0),g=(I=t+64+1|0)+127|0;do{Bg[I>>0]=54,I=I+1|0}while((0|I)<(0|g));Bg[t+64>>0]=54^Bg[e>>0],I=1;do{Bg[(g=t+64+I|0)>>0]=Bg[g>>0]^Bg[e+I>>0],I=I+1|0}while(32!=(0|I));f(A,t+64|0,128,0),ae(A+208|0),g=(I=t+64+1|0)+127|0;do{Bg[I>>0]=92,I=I+1|0}while((0|I)<(0|g));Bg[t+64>>0]=92^Bg[e>>0],I=1;do{Bg[(g=t+64+I|0)>>0]=Bg[g>>0]^Bg[e+I>>0],I=I+1|0}while(32!=(0|I));f(A+208|0,t+64|0,128,0),$A(t+64|0,128),$A(t,64),Qg=t}function W(A,e,I,g,t,r){A|=0,e|=0,I|=0,g|=0,r|=0;var n=0,a=0,i=0;return a=Qg,n=Qg=Qg+63&-64,Qg=Qg+32|0,i=Cg[(t|=0)+4>>0]|Cg[t+4+1>>0]<<8|Cg[t+4+2>>0]<<16|Cg[t+4+3>>0]<<24,cg[n>>2]=Cg[t>>0]|Cg[t+1>>0]<<8|Cg[t+2>>0]<<16|Cg[t+3>>0]<<24,cg[n+4>>2]=i,cg[n+8>>2]=0,cg[n+8+4>>2]=0,Qe(n+16|0,I,g),t=n+16+8|0,Bg[t>>0]=0,Bg[t+1>>0]=0,Bg[t+2>>0]=0,Bg[t+3>>0]=0,t=n+16+8+4|0,Bg[t>>0]=0,Bg[t+1>>0]=0,Bg[t+2>>0]=0,Bg[t+3>>0]=0,(e+-16|0)>>>0>48?(cg[8242]=22,A=-1):A=0|ue(A,e,r,n+16|0,n),Qg=a,0|A}function q(A,e,I){A|=0,e|=0;var g=0,t=0,r=0;g=Qg,r=Qg=Qg+63&-64,Qg=Qg+128|0,I=((I|=0)<<24>>24)-((I<<24>>24&0-(255&(t=0|vI(I))))<<1)&255,nI(A),tI(A,2184+(960*e|0)|0,0|VI(I,1)),tI(A,2184+(960*e|0)+120|0,0|VI(I,2)),tI(A,2184+(960*e|0)+240|0,0|VI(I,3)),tI(A,2184+(960*e|0)+360|0,0|VI(I,4)),tI(A,2184+(960*e|0)+480|0,0|VI(I,5)),tI(A,2184+(960*e|0)+600|0,0|VI(I,6)),tI(A,2184+(960*e|0)+720|0,0|VI(I,7)),tI(A,2184+(960*e|0)+840|0,0|VI(I,8)),sA(r,A+40|0),sA(r+40|0,A),CA(r+80|0,A+80|0),tI(A,r,t),Qg=g}function z(A,e,I,g,t,r,n,a,i,B,c,C){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0,c|=0,C|=0,B=Qg,Qg=Qg+336|0,RI(B+264|0,c,C),MI(B,B+264|0),$A(B+264|0,64),BI(B,n,a,i),Qe(B+256|0,a,i),BI(B,B+256|0,8,0),gI(A,g,t,r,c,C),BI(B,A,t,r),Qe(B+256|0,t,r),BI(B,B+256|0,8,0),HI(B,e),$A(B,256),0|I&&(cg[I>>2]=16,cg[I+4>>2]=0),Qg=B,0}function $(A,e,I,g){A|=0,I|=0,g|=0;var t=0,r=0,n=0;if(r=Qg,n=Qg=Qg+63&-64,Qg=Qg+192|0,((e|=0)+-1&255)>63&&ig(),!((g+-1&255)>63|0==(0|I))){Bg[n+128>>0]=e,Bg[n+128+1>>0]=g,Bg[n+128+2>>0]=1,Bg[n+128+3>>0]=1,GI(n+128+4|0),me(n+128+8|0),t=(e=n+128+16|0)+48|0;do{Bg[e>>0]=0,e=e+1|0}while((0|e)<(0|t));return XA(A,n+128|0),AA(n+(255&g)|0,0,0|(g<<24>>24<0?0:128-(255&g)|0)),M(0|n,0|I,255&g|0),K(A,n,128,0),$A(n,128),void(Qg=r)}ig()}function AA(A,e,I){e|=0;var g=0,t=0;if(g=(A|=0)+(I|=0)|0,e&=255,(0|I)>=67){for(;3&A;)Bg[A>>0]=e,A=A+1|0;for(t=e|e<<8|e<<16|e<<24;(0|A)<=((-4&g)-64|0);)cg[A>>2]=t,cg[A+4>>2]=t,cg[A+8>>2]=t,cg[A+12>>2]=t,cg[A+16>>2]=t,cg[A+20>>2]=t,cg[A+24>>2]=t,cg[A+28>>2]=t,cg[A+32>>2]=t,cg[A+36>>2]=t,cg[A+40>>2]=t,cg[A+44>>2]=t,cg[A+48>>2]=t,cg[A+52>>2]=t,cg[A+56>>2]=t,cg[A+60>>2]=t,A=A+64|0;for(;(0|A)<(-4&g|0);)cg[A>>2]=t,A=A+4|0}for(;(0|A)<(0|g);)Bg[A>>0]=e,A=A+1|0;return g-I|0}function eA(A,e,I){I|=0;var g=0,t=0;g=Qg,t=Qg=Qg+63&-64,Qg=Qg+48|0,j(A|=0,(e|=0)+40|0,e),V(A+40|0,e+40|0,e),a(A+80|0,A,I),a(A+40|0,A+40|0,I+40|0),a(A+120|0,I+120|0,e+120|0),a(A,e+80|0,I+80|0),j(t,A,A),V(A,A+80|0,A+40|0),j(A+40|0,A+80|0,A+40|0),j(A+80|0,t,A+120|0),V(A+120|0,t,A+120|0),Qg=g}function IA(A,e,I){I|=0;var g=0,t=0;g=Qg,t=Qg=Qg+63&-64,Qg=Qg+48|0,j(A|=0,(e|=0)+40|0,e),V(A+40|0,e+40|0,e),a(A+80|0,A,I+40|0),a(A+40|0,A+40|0,I),a(A+120|0,I+120|0,e+120|0),a(A,e+80|0,I+80|0),j(t,A,A),V(A,A+80|0,A+40|0),j(A+40|0,A+80|0,A+40|0),V(A+80|0,t,A+120|0),j(A+120|0,t,A+120|0),Qg=g}function gA(A,e,I,g,t,r,n,a,i,B,c,C){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0,c|=0,C|=0,B=Qg,Qg=Qg+48|0,cg[B>>2]=0,h(B+16|0,c,C,0),C=Cg[c+16+4>>0]|Cg[c+16+4+1>>0]<<8|Cg[c+16+4+2>>0]<<16|Cg[c+16+4+3>>0]<<24,cg[B+4>>2]=Cg[c+16>>0]|Cg[c+16+1>>0]<<8|Cg[c+16+2>>0]<<16|Cg[c+16+3>>0]<<24,cg[B+4+4>>2]=C,L(A,e,I,g,t,r,n,a,i,0,B,B+16|0),$A(B+16|0,32),Qg=B,0}function tA(A,e,I,g,t){A|=0,e|=0,I|=0,g|=0,t|=0;var r=0,n=0;A:do{if(t){r=0|cg[I>>2];e:for(;;){if(r>>>0>=e>>>0){t=34;break}for(;;){if((n=0|Bg[A+r>>0])<<24>>24==61)break;if(!g){t=22;break e}if(!(0|DI(g,n<<24>>24))){t=22;break e}if(r=r+1|0,cg[I>>2]=r,r>>>0>=e>>>0){t=34;break e}}if(t=t+-1|0,r=r+1|0,cg[I>>2]=r,!t){t=0;break A}}cg[8242]=t,t=-1}else t=0}while(0);return 0|t}function rA(A,e,I){I|=0;var g=0,t=0;g=Qg,t=Qg=Qg+63&-64,Qg=Qg+48|0,j(A|=0,(e|=0)+40|0,e),V(A+40|0,e+40|0,e),a(A+80|0,A,I+40|0),a(A+40|0,A+40|0,I),a(A+120|0,I+80|0,e+120|0),j(t,e+80|0,e+80|0),V(A,A+80|0,A+40|0),j(A+40|0,A+80|0,A+40|0),V(A+80|0,t,A+120|0),j(A+120|0,t,A+120|0),Qg=g}function nA(A,e,I){I|=0;var g=0,t=0;g=Qg,t=Qg=Qg+63&-64,Qg=Qg+48|0,j(A|=0,(e|=0)+40|0,e),V(A+40|0,e+40|0,e),a(A+80|0,A,I),a(A+40|0,A+40|0,I+40|0),a(A+120|0,I+80|0,e+120|0),j(t,e+80|0,e+80|0),V(A,A+80|0,A+40|0),j(A+40|0,A+80|0,A+40|0),j(A+80|0,t,A+120|0),V(A+120|0,t,A+120|0),Qg=g}function aA(A,e,I,g,t,r,n,a,i,B,c){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0,c|=0,e=Qg,Qg=Qg+48|0,cg[e>>2]=0,h(e+16|0,B,c,0),c=Cg[B+16+4>>0]|Cg[B+16+4+1>>0]<<8|Cg[B+16+4+2>>0]<<16|Cg[B+16+4+3>>0]<<24,cg[e+4>>2]=Cg[B+16>>0]|Cg[B+16+1>>0]<<8|Cg[B+16+2>>0]<<16|Cg[B+16+3>>0]<<24,cg[e+4+4>>2]=c,B=0|R(A,0,I,g,t,r,n,a,i,e,e+16|0),$A(e+16|0,32),Qg=e,0|B}function iA(A,e){e|=0,cg[(A|=0)>>2]=67108863&(0|kI(e)),cg[A+4>>2]=(0|kI(e+3|0))>>>2&67108611,cg[A+8>>2]=(0|kI(e+6|0))>>>4&67092735,cg[A+12>>2]=(0|kI(e+9|0))>>>6&66076671,cg[A+16>>2]=(0|kI(e+12|0))>>>8&1048575,cg[A+20>>2]=0,cg[A+20+4>>2]=0,cg[A+20+8>>2]=0,cg[A+20+12>>2]=0,cg[A+20+16>>2]=0,cg[A+40>>2]=0|kI(e+16|0),cg[A+44>>2]=0|kI(e+20|0),cg[A+48>>2]=0|kI(e+24|0),cg[A+52>>2]=0|kI(e+28|0),cg[A+56>>2]=0,cg[A+56+4>>2]=0,Bg[A+80>>0]=0}function BA(A,e,I,g,t,r,n){A|=0,I|=0,g|=0,n|=0;var a=0,i=0;a=Qg,i=Qg=Qg+63&-64,Qg=Qg+384|0,0==(0|(e|=0))&(0!=(0|(t|=0))|0!=(0|(r|=0)))&&ig(),A||ig(),(g+-1&255)>63&&ig(),0!=(0|I)|n<<24>>24!=0^1||ig(),(255&n)>64&&ig(),n<<24>>24?$(i,g,I,n):uA(i,g),K(i,e,t,r),T(i,A,g),Qg=a}function cA(A,e,I,g,t,r){A|=0,e|=0,I|=0,g|=0,t|=0,r|=0;var n=0,a=0,i=0;do{if(t>>>0<0|0==(0|t)&g>>>0<64?!0:(n=0|aI(0|g,0|t,-64,-1),(a=hg)>>>0>0|0==(0|a)&n>>>0>4294967231))i=8;else{if(0|AI(I,I+64|0,n,a,r)){AA(0|A,0,0|n),i=8;break}0|e&&(cg[e>>2]=n,cg[e+4>>2]=a),jA(0|A,I+64|0,0|n),A=0}}while(0);return 8==(0|i)&&(e?(cg[e>>2]=0,cg[e+4>>2]=0,A=-1):A=-1),0|A}function CA(A,e){A|=0;var I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0;c=0-(0|cg[(e|=0)+4>>2])|0,B=0-(0|cg[e+8>>2])|0,i=0-(0|cg[e+12>>2])|0,a=0-(0|cg[e+16>>2])|0,n=0-(0|cg[e+20>>2])|0,r=0-(0|cg[e+24>>2])|0,t=0-(0|cg[e+28>>2])|0,g=0-(0|cg[e+32>>2])|0,I=0-(0|cg[e+36>>2])|0,cg[A>>2]=0-(0|cg[e>>2]),cg[A+4>>2]=c,cg[A+8>>2]=B,cg[A+12>>2]=i,cg[A+16>>2]=a,cg[A+20>>2]=n,cg[A+24>>2]=r,cg[A+28>>2]=t,cg[A+32>>2]=g,cg[A+36>>2]=I}function oA(A,e,I,g,t,r){e|=0,t|=0,r|=0;var n=0,a=0;return n=Qg,a=Qg=Qg+63&-64,Qg=Qg+16|0,jA((A|=0)+64|0,0|(I|=0),0|(g|=0)),ze(A,a,A+64|0,g,t,r),64==(0|cg[a>>2])&0==(0|cg[a+4>>2])?0|e?(A=0|aI(0|g,0|t,64,0),cg[e>>2]=A,cg[e+4>>2]=hg,A=0):A=0:(0|e&&(cg[e>>2]=0,cg[e+4>>2]=0),AA(0|A,0,0|(a=0|aI(0|g,0|t,64,0))),A=-1),Qg=n,0|A}function QA(A){return((0-((0-(95^(A|=0))|0)>>>8&63^63|(0-(45^A)|0)>>>8&62^62|((A+65439|0)>>>8^255)&A+185&((122-A|0)>>>8&255^255)|((A+-65|0)>>>8^255)&A+-65&((90-A|0)>>>8&255^255)|((A+65488|0)>>>8^255)&A+4&((57-A|0)>>>8&255^255))|0)>>>8&255^255)&(0-(65^A)|0)>>>8|(0-(95^A)|0)>>>8&63^63|(0-(45^A)|0)>>>8&62^62|((A+65439|0)>>>8^255)&A+185&((122-A|0)>>>8&255^255)|((A+-65|0)>>>8^255)&A+-65&((90-A|0)>>>8&255^255)|((A+65488|0)>>>8^255)&A+4&((57-A|0)>>>8&255^255)|0}function EA(A,e){e|=0;var I=0,g=0,t=0;if(!1|!0&(112&(I=0|Oe(0|cg[(A|=0)+72>>2],0|cg[A+72+4>>2],3)))>>>0<112)M(A+80+(127&I)|0,33697,112-(127&I)|0),I=A+80|0,g=e+640|0,t=A;else{M(A+80+(127&I)|0,33697,128-(127&I)|0),r(A,A+80|0,e,e+640|0),g=(I=A+80|0)+112|0;do{cg[I>>2]=0,I=I+4|0}while((0|I)<(0|g));I=A+80|0,g=e+640|0,t=A}Be(A+192|0,A+64|0,16),r(t,I,e,g)}function sA(A,e){A|=0;var I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0;c=0|cg[(e|=0)+4>>2],B=0|cg[e+8>>2],i=0|cg[e+12>>2],a=0|cg[e+16>>2],n=0|cg[e+20>>2],r=0|cg[e+24>>2],t=0|cg[e+28>>2],g=0|cg[e+32>>2],I=0|cg[e+36>>2],cg[A>>2]=cg[e>>2],cg[A+4>>2]=c,cg[A+8>>2]=B,cg[A+12>>2]=i,cg[A+16>>2]=a,cg[A+20>>2]=n,cg[A+24>>2]=r,cg[A+28>>2]=t,cg[A+32>>2]=g,cg[A+36>>2]=I}function yA(A){return((0-((0-(47^(A|=0))|0)>>>8&63^63|(0-(43^A)|0)>>>8&62^62|((A+65439|0)>>>8^255)&A+185&((122-A|0)>>>8&255^255)|((A+-65|0)>>>8^255)&A+-65&((90-A|0)>>>8&255^255)|((A+65488|0)>>>8^255)&A+4&((57-A|0)>>>8&255^255))|0)>>>8&255^255)&(0-(65^A)|0)>>>8|(0-(47^A)|0)>>>8&63^63|(0-(43^A)|0)>>>8&62^62|((A+65439|0)>>>8^255)&A+185&((122-A|0)>>>8&255^255)|((A+-65|0)>>>8^255)&A+-65&((90-A|0)>>>8&255^255)|((A+65488|0)>>>8^255)&A+4&((57-A|0)>>>8&255^255)|0}function hA(A,e){var I=0,g=0;I=Qg,g=Qg=Qg+63&-64,Qg=Qg+48|0,B(A|=0,e|=0),B(A+80|0,e+40|0),i(A+120|0,e+80|0),j(A+40|0,e,e+40|0),B(g,A+40|0),j(A+40|0,A+80|0,A),V(A+80|0,A+80|0,A),V(A,g,A+40|0),V(A+120|0,A+120|0,A+80|0),Qg=I}function fA(A){A|=0;var e=0,I=0,g=0;A:do{if(3&A)for(e=A,I=A;;){if(!(0|Bg[e>>0])){e=I;break A}if(e=e+1|0,!(3&(I=e))){g=4;break}}else e=A,g=4}while(0);if(4==(0|g)){for(;;){if((-2139062144&(I=0|cg[e>>2])^-2139062144)&I+-16843009)break;e=e+4|0}if((255&I)<<24>>24)do{e=e+1|0}while(0!=(0|Bg[e>>0]))}return e-A|0}function _A(A,e){A|=0,e|=0;var I=0,g=0,t=0,r=0;t=Qg,r=Qg=Qg+63&-64,Qg=Qg+240|0,I=(g=r+200|0)+32|0;do{Bg[g>>0]=0|Bg[e>>0],g=g+1|0,e=e+1|0}while((0|g)<(0|I));return Bg[r+200>>0]=-8&Bg[r+200>>0],Bg[r+200+31>>0]=63&Bg[r+200+31>>0]|64,S(r+40|0,r+200|0),LA(r,r+40+40|0,r+40+80|0),w(A,r),Qg=t,0}function pA(A){var e=0,I=0,g=0,t=0,r=0,n=0,a=0;return r=0|Cg[(A|=0)+7>>0],n=0|Ze(0|Cg[A+6>>0],0,8),a=hg,t=0|Ze(0|Cg[A+5>>0],0,16),a|=hg,g=0|Ze(0|Cg[A+4>>0],0,24),a=a|hg|0|Cg[A+3>>0],I=0|Ze(0|Cg[A+2>>0],0,40),a|=hg,e=0|Ze(0|Cg[A+1>>0],0,48),a|=hg,A=0|Ze(0|Cg[A>>0],0,56),hg|=a,n|r|t|g|I|e|A|0}function wA(A,e){e|=0,cg[(A|=0)>>2]=1634760805,cg[A+4>>2]=857760878,cg[A+8>>2]=2036477234,cg[A+12>>2]=1797285236,cg[A+16>>2]=0|kI(e),cg[A+20>>2]=0|kI(e+4|0),cg[A+24>>2]=0|kI(e+8|0),cg[A+28>>2]=0|kI(e+12|0),cg[A+32>>2]=0|kI(e+16|0),cg[A+36>>2]=0|kI(e+20|0),cg[A+40>>2]=0|kI(e+24|0),cg[A+44>>2]=0|kI(e+28|0)}function uA(A,e){A|=0;var I=0,g=0,t=0;if(g=Qg,t=Qg=Qg+63&-64,Qg=Qg+64|0,!(((e|=0)+-1&255)>63)){Bg[t>>0]=e,Bg[t+1>>0]=0,Bg[t+2>>0]=1,Bg[t+3>>0]=1,GI(t+4|0),me(t+8|0),I=(e=t+16|0)+48|0;do{Bg[e>>0]=0,e=e+1|0}while((0|e)<(0|I));return XA(A,t),void(Qg=g)}ig()}function lA(A,e,I,g,t){e|=0,I|=0,g|=0,t|=0;var r=0,n=0;if(r=Qg,n=Qg=Qg+63&-64,Qg=Qg+384|0,(A|=0)||ig(),(I+-1&255)>63&&ig(),e)return N(n,I,e,g,t),K(n,0,0,0),T(n,A,I),void(Qg=r);ig()}function dA(A,e,I,g){A|=0,e|=0,I|=0,g|=0;do{if(!(I>>>0>64|(g+-1|0)>>>0>63)){if(g>>>0>=256&&kg(33512,33532,53,33632),I>>>0>=256&&kg(33612,33532,54,33632),0==(0|e)|0==(0|I)){uA(A,255&g),A=0;break}$(A,255&g,e,255&I),A=0;break}A=-1}while(0);return 0|A}function DA(A,e,I){A|=0,e|=0,I|=0;var g=0,t=0;if(g=Qg,t=Qg=Qg+63&-64,Qg=Qg+16|0,cg[t+8>>2]=A,cg[t+4>>2]=e,cg[t>>2]=0,(0|I)>0){A=0;do{cg[t>>2]=255&(Bg[(0|cg[t+4>>2])+A>>0]^Bg[(0|cg[t+8>>2])+A>>0])|cg[t>>2],A=A+1|0}while((0|A)!=(0|I))}return Qg=g,((511+(0|cg[t>>2])|0)>>>8&1)-1|0}function vA(A,e,I){A|=0,e|=0,I|=0;var g=0,t=0;if(g=Qg,t=Qg=Qg+63&-64,Qg=Qg+16|0,cg[t+4>>2]=A,cg[t>>2]=e,Bg[t+8>>0]=0,0|I){A=0;do{Bg[t+8>>0]=Bg[t+8>>0]|Bg[(0|cg[t>>2])+A>>0]^Bg[(0|cg[t+4>>2])+A>>0],A=A+1|0}while((0|A)!=(0|I))}return Qg=g,((511+(0|Cg[t+8>>0])|0)>>>8&1)-1|0}function kA(A,e,I){e|=0,I|=0;var g=0;Bg[(A|=0)+7>>0]=e,g=0|Oe(0|e,0|I,8),Bg[A+6>>0]=g,g=0|Oe(0|e,0|I,16),Bg[A+5>>0]=g,g=0|Oe(0|e,0|I,24),Bg[A+4>>0]=g,Bg[A+3>>0]=I,g=0|Oe(0|e,0|I,40),Bg[A+2>>0]=g,g=0|Oe(0|e,0|I,48),Bg[A+1>>0]=g,I=0|Oe(0|e,0|I,56),Bg[A>>0]=I}function bA(A,e){A|=0;var I=0,g=0;I=Qg,g=Qg=Qg+63&-64,Qg=Qg+128|0,_(g+80|0,(e|=0)+80|0),a(g+40|0,e,g+80|0),a(g,e+40|0,g+80|0),w(A,g),e=(0|Re(g+40|0))<<7,Bg[A+31>>0]=(0|Cg[A+31>>0])^e,Qg=I}function GA(A,e,I,g,t,r,n,a){A|=0,e|=0,t|=0,r|=0,n|=0,a|=0;var i=0,B=0;i=Qg,B=Qg=Qg+63&-64,Qg=Qg+80|0,0==(0|(I|=0))&0==(0|(g|=0))||(oI(B+64|0,r),oI(B+64+4|0,n),wA(B,a),Ie(B,t,B+64|0),C(B,e,A,I,g),$A(B,64)),Qg=i}function FA(A,e,I,g,t,r,n){A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0;var a=0;do{if((e+-1|0)>>>0>63|n>>>0>64)a=-1;else{if(e>>>0>=256&&kg(33512,33532,19,33585),n>>>0<256){BA(A,I,r,255&e,g,t,255&n),a=0;break}kg(33612,33532,20,33585)}}while(0);return 0|a}function mA(A,e,I){A|=0,e|=0,I|=0;var g=0,t=0;if(t=Qg,g=Qg=Qg+63&-64,Qg=Qg+16|0,Bg[g>>0]=0,0|l(A,e,I))e=-1;else{e=0;do{Bg[g>>0]=Bg[g>>0]|Bg[A+e>>0],e=e+1|0}while(32!=(0|e));e=0-((511+(0|Cg[g>>0])|0)>>>8&1)|0}return Qg=t,0|e}function HA(A,e,I){A|=0;var g=0,t=0;g=Qg,t=Qg=Qg+63&-64,Qg=Qg+160|0,ie(e|=0,I|=0,32,0),Bg[e>>0]=-8&Bg[e>>0],Bg[e+31>>0]=63&Bg[e+31>>0]|64,S(t,e),bA(A,t),jA(0|e,0|I,32),jA(e+32|0,0|A,32),Qg=g}function MA(A,e,I){A|=0,e|=0;var g=0,t=0,r=0,n=0;r=Qg,n=Qg=Qg+63&-64,Qg=Qg+64|0,ie(n,I|=0,32,0),g=n,t=(I=e)+32|0;do{Bg[I>>0]=0|Bg[g>>0],I=I+1|0,g=g+1|0}while((0|I)<(0|t));return $A(n,64),n=0|mI(A,e),Qg=r,0|n}function YA(A,e,I,g,t,r,n){A|=0,e|=0,t|=0,r|=0,n|=0;var a=0,i=0;a=Qg,i=Qg=Qg+63&-64,Qg=Qg+80|0,0==(0|(I|=0))&0==(0|(g|=0))||(oI(i+64|0,r),wA(i,n),oe(i,t,i+64|0),C(i,e,A,I,g),$A(i,64)),Qg=a}function SA(A,e,I){e|=0,I|=0;var g=0,t=0;g=0|aI(0|cg[(A|=0)+64>>2],0|cg[A+64+4>>2],0|e,0|I),t=hg,cg[A+64>>2]=g,cg[A+64+4>>2]=t,I=0|aI(1&(t>>>0<I>>>0|(0|t)==(0|I)&g>>>0<e>>>0)|0,0,0|cg[A+72>>2],0|cg[A+72+4>>2]),cg[A+72>>2]=I,cg[A+72+4>>2]=hg}function NA(A,e,I,g,t){A|=0,g|=0,t|=0;var r=0,n=0;r=Qg,n=Qg=Qg+63&-64,Qg=Qg+64|0,0==(0|(e|=0))&0==(0|(I|=0))||(wA(n,t),oe(n,g,0),AA(0|A,0,0|e),C(n,A,A,e,I),$A(n,64)),Qg=r}function RA(A){var e=0,I=0;return I=(A|=0)+15&-16|0,e=0|cg[og>>2],A=e+I|0,(0|I)>0&(0|A)<(0|e)|(0|A)<0?(wg(),Dg(12),-1):(cg[og>>2]=A,((0|A)>(0|pg())?0==(0|_g()):0)?(cg[og>>2]=e,Dg(12),-1):0|e)}function UA(A,e,I,g,t){A|=0,g|=0,t|=0;var r=0,n=0;r=Qg,n=Qg=Qg+63&-64,Qg=Qg+64|0,0==(0|(e|=0))&0==(0|(I|=0))||(wA(n,t),Ie(n,g,0),AA(0|A,0,0|e),C(n,A,A,e,I),$A(n,64)),Qg=r}function PA(A,e,I,g,t,r,n,a){A|=0,e|=0,I|=0,g|=0,t|=0,r|=0;var i=0;return i=Qg,Qg=Qg+32|0,0|lI(i,n|=0,a|=0)?A=-1:(A=0|xe(A,e,I,g,t,r,i),$A(i,32)),Qg=i,0|A}function JA(A){A|=0;var e=0,I=0,g=0,t=0,r=0;for(I=32,e=1,g=0;;){if(I=I+-1|0,t=0|Bg[A+I>>0],r=0|Bg[33825+I>>0],e&=255,g=((255&t)-(255&r)|0)>>>8&e|255&g,!I)break;e&=(65535+(255&(r^t))|0)>>>8}return(0==(0|g))<<31>>31|0}function xA(A,e,I,g,t,r,n,a){A|=0,e|=0,I|=0,g|=0,t|=0,r|=0;var i=0;return i=Qg,Qg=Qg+32|0,0|lI(i,n|=0,a|=0)?A=-1:(Xe(A,e,I,g,t,r,i),$A(i,32),A=0),Qg=i,0|A}function LA(A,e,I){A|=0;var g=0,t=0;g=Qg,t=Qg=Qg+63&-64,Qg=Qg+80|0,j(t+40|0,I|=0,e|=0),V(t,I,e),_(t,t),a(A,t+40|0,t),Qg=g}function KA(A){A|=0;var e=0,I=0,g=0;for(I=0;;){e=0,g=0;do{g=255&(Bg[16+(I<<5)+e>>0]^Bg[A+e>>0])|g,e=e+1|0}while(32!=(0|e));if(I=I+1|0,!g){e=1;break}if(I>>>0>=12){e=0;break}}return 0|e}function XA(A,e){e|=0;var I=0,g=0,t=0,r=0;ke(A|=0),I=0;do{r=0|De(e+(I<<3)|0),t=cg[(g=A+(I<<3)|0)+4>>2]^hg,cg[g>>2]=cg[g>>2]^r,cg[g+4>>2]=t,I=I+1|0}while(8!=(0|I))}function TA(A,e,I){A|=0,e|=0,I|=0;var g=0,t=0;g=Qg,t=Qg=Qg+63&-64,Qg=Qg+384|0,pI(t,0,0,24),fI(t,e,32,0),fI(t,I,32,0),bI(t,A,24),Qg=g}function VA(A){A|=0;var e=0,I=0,g=0;I=Qg,g=Qg=Qg+63&-64,Qg=Qg+16|0,Bg[g>>0]=0,e=0;do{Bg[g>>0]=Bg[g>>0]|Bg[A+e>>0],e=e+1|0}while(4!=(0|e));return Qg=I,(511+(0|Cg[g>>0])|0)>>>8&1|0}function jA(A,e,I){var g=0;if((0|(e|=0))<(0|(A|=0))&(0|A)<(e+(I|=0)|0)){for(g=A,e=e+I|0,A=A+I|0;(0|I)>0;)e=e-1|0,I=I-1|0,Bg[(A=A-1|0)>>0]=0|Bg[e>>0];A=g}else M(A,e,I);return 0|A}function ZA(A,e){var I=0,g=0,t=0;return I=0|fg(65535&(e|=0),65535&(A|=0)),t=(I>>>16)+(0|fg(65535&e,A>>>16))|0,g=0|fg(e>>>16,65535&A),0|(hg=(t>>>16)+(0|fg(e>>>16,A>>>16))+(((65535&t)+g|0)>>>16)|0,t+g<<16|65535&I|0)}function OA(A,e,I,g,t){A|=0;var r=0;return r=Qg,Qg=Qg+32|0,ne(r,e|=0,I|=0,g|=0,t|=0),t=0|jI(A,r),t=0|((0|r)==(0|A)?-1:t)|vA(r,A,32),Qg=r,0|t}function WA(A,e,I){A|=0;var g=0,t=0;return t=Qg,g=Qg=Qg+63&-64,Qg=Qg+32|0,0|mA(g,I|=0,e|=0)?A=-1:(u(A,35368,g),A=0),Qg=t,0|A}function qA(A,e,I,g,t,r,n){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,0|(A=g>>>0<0|0==(0|g)&I>>>0<16?-1:0|PA(A,e+16|0,e,g=0|aI(0|I,0|g,-16,-1),hg,t,r,n))}function zA(A){var e=0,I=0,g=0,t=0;return I=0|Cg[(A|=0)>>0],g=0|Ze(0|Cg[A+1>>0],0,8),t=hg,e=0|Ze(0|Cg[A+2>>0],0,16),t|=hg,A=0|Ze(0|Cg[A+3>>0],0,24),hg|=t,g|I|e|A|0}function $A(A,e){A|=0,e|=0;var I=0,g=0;if(I=Qg,g=Qg=Qg+63&-64,Qg=Qg+16|0,cg[g>>2]=A,0|e){A=0;do{Bg[(0|cg[g>>2])+A>>0]=0,A=A+1|0}while((0|A)!=(0|e))}Qg=I}function Ae(A,e,I,g,t){A|=0;var r=0,n=0;return r=Qg,n=Qg=Qg+63&-64,Qg=Qg+16|0,re(n,e|=0,I|=0,g|=0,t|=0),t=0|ZI(A,n),Qg=r,0|t}function ee(A,e){j(A|=0,(e|=0)+40|0,e),V(A+40|0,e+40|0,e),sA(A+80|0,e+80|0),a(A+120|0,e+120|0,1184)}function Ie(A,e,I){A|=0,e|=0,(I|=0)?(cg[A+48>>2]=0|kI(I),I=0|kI(I+4|0)):(cg[A+48>>2]=0,I=0),cg[A+52>>2]=I,cg[A+56>>2]=0|kI(e),cg[A+60>>2]=0|kI(e+4|0)}function ge(A,e){a(A|=0,e|=0,e+120|0),a(A+40|0,e+40|0,e+80|0),a(A+80|0,e+80|0,e+120|0),a(A+120|0,e,e+40|0)}function te(A,e){e|=0;var I=0,g=0;g=Qg,Qg=Qg+64|0,ye(A|=0,g),A=g,I=e+32|0;do{Bg[e>>0]=0|Bg[A>>0],e=e+1|0,A=A+1|0}while((0|e)<(0|I));Qg=g}function re(A,e,I,g,t){A|=0,e|=0,I|=0,g|=0;var r=0,n=0;r=Qg,n=Qg=Qg+63&-64,Qg=Qg+96|0,iA(n,t|=0),D(n,e,I,g),b(n,A),Qg=r}function ne(A,e,I,g,t){A|=0,e|=0,I|=0,g|=0;var r=0;r=Qg,Qg=Qg+416|0,xI(r,t|=0),_I(r,e,I,g),te(r,A),Qg=r}function ae(A){var e=0,I=0;cg[(A|=0)+64>>2]=0,cg[A+64+4>>2]=0,cg[A+64+8>>2]=0,cg[A+64+12>>2]=0,e=400,I=A+64|0;do{cg[A>>2]=cg[e>>2],A=A+4|0,e=e+4|0}while((0|A)<(0|I))}function ie(A,e,I,g){A|=0,e|=0,I|=0,g|=0;var t=0,r=0;t=Qg,r=Qg=Qg+63&-64,Qg=Qg+208|0,ae(r),f(r,e,I,g),_e(r,A),Qg=t}function Be(A,e,I){A|=0,e|=0;var g=0,t=0;if((I|=0)>>>3|0){g=0;do{kA(A+(g<<3)|0,0|cg[(t=e+(g<<3)|0)>>2],0|cg[t+4>>2]),g=g+1|0}while((0|g)!=(I>>>3|0))}}function ce(A,e,I){e|=0,I|=0;var g=0,t=0;return g=Qg,t=Qg=Qg+63&-64,Qg=Qg+64|0,_e(A|=0,t),I=0|U(e,t,64,0,I,1),Qg=g,0|I}function Ce(A,e,I,g){e|=0,I|=0,g|=0;var t=0,r=0;t=Qg,r=Qg=Qg+63&-64,Qg=Qg+64|0,_e(A|=0,r),J(e,I,r,64,0,g,1),Qg=t}function oe(A,e,I){A|=0,e|=0,I=(I|=0)?0|kI(I):0,cg[A+48>>2]=I,cg[A+52>>2]=0|kI(e),cg[A+56>>2]=0|kI(e+4|0),cg[A+60>>2]=0|kI(e+8|0)}function Qe(A,e,I){e|=0,I|=0,Bg[(A|=0)>>0]=e,Bg[A+1>>0]=e>>8,Bg[A+2>>0]=e>>16,Bg[A+3>>0]=e>>24,Bg[A+4>>0]=I,Bg[A+4+1>>0]=I>>8,Bg[A+4+2>>0]=I>>16,Bg[A+4+3>>0]=I>>24}function Ee(A,e,I,g,t,r,n){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,g>>>0>0|0==(0|g)&I>>>0>4294967279?(ig(),0):0|xA(A+16|0,A,e,I,g,t,r,n)}function se(A){return(0-(62^(A|=0))|0)>>>8&45^45|(A+65510|0)>>>8&255&A+65|(0-(63^A)|0)>>>8&95^95|(A+65484|0)>>>8&A+71&((A+65510|0)>>>8&255^255)|(A+65474|0)>>>8&A+252&((A+65484|0)>>>8&255^255)|0}function ye(A,e){e|=0;var I=0;I=Qg,Qg=Qg+64|0,_e(A|=0,I),f(A+208|0,I,64,0),_e(A+208|0,e),$A(I,64),Qg=I}function he(A){return(0-(62^(A|=0))|0)>>>8&43^43|(A+65510|0)>>>8&255&A+65|(0-(63^A)|0)>>>8&47^47|(A+65484|0)>>>8&A+71&((A+65510|0)>>>8&255^255)|(A+65474|0)>>>8&A+252&((A+65484|0)>>>8&255^255)|0}function fe(A,e){a(A|=0,e|=0,e+120|0),a(A+40|0,e+40|0,e+80|0),a(A+80|0,e+80|0,e+120|0)}function _e(A,e){e|=0;var I=0,g=0;I=Qg,g=Qg=Qg+63&-64,Qg=Qg+704|0,EA(A|=0,g),Be(e,A,64),$A(g,704),$A(A,208),Qg=I}function pe(A,e){A|=0,e|=0;var I=0,g=0,t=0;I=0;do{t=0|pA(e+(I<<3)|0),cg[(g=A+(I<<3)|0)>>2]=t,cg[g+4>>2]=hg,I=I+1|0}while(16!=(0|I))}function we(A,e){A|=0,e|=0;var I=0,g=0;I=Qg,g=Qg=Qg+63&-64,Qg=Qg+32|0,Ye(g,32),HA(A,e,g),$A(g,32),Qg=I}function ue(A,e,I,g,t){return A|=0,e|=0,I|=0,g|=0,t|=0,(e+-1|0)>>>0>63?A=-1:(lA(A,I,255&e,g,t),A=0),0|A}function le(A){var e=0,I=0;return e=Qg,I=Qg=Qg+63&-64,Qg=Qg+32|0,w(I,A|=0),A=0|jI(I,35384),Qg=e,0|A}function de(A){A|=0;var e=0,I=0,g=0;for(I=0,e=1;;){if(g=A+I|0,e=(0|Cg[g>>0])+e|0,Bg[g>>0]=e,4==(0|(I=I+1|0)))break;e>>>=8}}function De(A){return A|=0,hg=Cg[A+4>>0]|Cg[A+4+1>>0]<<8|Cg[A+4+2>>0]<<16|Cg[A+4+3>>0]<<24,Cg[A>>0]|Cg[A+1>>0]<<8|Cg[A+2>>0]<<16|Cg[A+3>>0]<<24|0}function ve(A,e,I){return A|=0,e|=0,(0|(I|=0))<32?(hg=e>>I,A>>>I|(e&(1<<I)-1)<<32-I):(hg=(0|e)<0?-1:0,e>>I-32|0)}function ke(A){var e=0,I=0,g=0;I=400,g=(e=A|=0)+64|0;do{cg[e>>2]=cg[I>>2],e=e+4|0,I=I+4|0}while((0|e)<(0|g));AA(A+64|0,0,293)}function be(A,e,I){var g=0,t=0;return g=0|Oe(0|(A|=0),0|(e|=0),0|(I|=0)),t=hg,I=0|Ze(0|A,0|e,64-I|0),hg|=t,I|g|0}function Ge(A,e,I){var g=0,t=0;return g=0|Ze(0|(A|=0),0|(e|=0),0|(I|=0)),t=hg,I=0|Oe(0|A,0|e,64-I|0),hg|=t,I|g|0}function Fe(A,e,I,g){e|=0,g|=0;var t=0,r=0;return t=0|ZA(A|=0,I|=0),r=hg,0|(hg=(0|fg(e,I))+(0|fg(g,A))+r|0&r,0|t)}function me(A){Bg[(A|=0)>>0]=0,Bg[A+1>>0]=0,Bg[A+2>>0]=0,Bg[A+3>>0]=0,Bg[A+4>>0]=0,Bg[A+4+1>>0]=0,Bg[A+4+2>>0]=0,Bg[A+4+3>>0]=0}function He(A,e,I){return A|=0,e|=0,(I|=0)>>>0<256?0|T(A,e,255&I):(kg(33512,33532,103,33664),0)}function Me(A,e,I){A|=0,I|=0;var g=0;return e=0|Ze(255&(e|=0)|0,0,8),g=hg,I=0|Ze(255&I|0,0,16),hg|=g,e|255&A|I|0}function Ye(A,e){A|=0;var I=0;if(0|(e|=0)){I=0;do{Bg[A+I>>0]=0|Ag(),I=I+1|0}while((0|I)!=(0|e))}}function Se(A,e){e|=0;var I=0;A=(I=(A|=0)+48|0)+16|0;do{Bg[I>>0]=0|Bg[e>>0],I=I+1|0,e=e+1|0}while((0|I)<(0|A))}function Ne(A,e){sA(A|=0,e|=0),sA(A+40|0,e+40|0),sA(A+80|0,e+80|0)}function Re(A){var e=0,I=0;return I=Qg,e=Qg=Qg+63&-64,Qg=Qg+32|0,w(e,A|=0),Qg=I,1&Bg[e>>0]|0}function Ue(A,e){e|=0;var I=0;A=(I=(A|=0)+32|0)+16|0;do{Bg[I>>0]=0|Bg[e>>0],I=I+1|0,e=e+1|0}while((0|I)<(0|A))}function Pe(){var A=0;(0|(A=0|lg(30)))>0?cg[8697]=A:A=0|cg[8697],A>>>0<16?ig():Ye(35432,16)}function Je(A,e){A|=0,e|=0;var I=0,g=0;I=0;do{Bg[(g=A+I|0)>>0]=Bg[g>>0]^Bg[e+I>>0],I=I+1|0}while(8!=(0|I))}function xe(A,e,I,g,t,r,n){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,0|F(A,e,I,g,t,r,n)}function Le(){var A=0,e=0;A=Qg,e=Qg=Qg+63&-64,Qg=Qg+16|0,FI(e),0|cg[e>>2]&&FI(e),Qg=A}function Ke(A){QI(A|=0),qe(A+40|0),qe(A+80|0),QI(A+120|0)}function Xe(A,e,I,g,t,r,n){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,k(A,e,I,g,t,r,n),0}function Te(A,e,I,g,t,r,n){YA(A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0)}function Ve(A,e){A|=0;var I=0,g=0;I=Qg,g=Qg=Qg+63&-64,Qg=Qg+128|0,Ne(g,e|=0),hA(A,g),Qg=I}function je(A){Bg[(A|=0)+32>>0]=0,Bg[A+32+1>>0]=0,Bg[A+32+2>>0]=0,Bg[A+32+3>>0]=0,Bg[A+32>>0]=1}function Ze(A,e,I){return A|=0,e|=0,(0|(I|=0))<32?(hg=e<<I|(A&(1<<I)-1<<32-I)>>>32-I,A<<I):(hg=A<<I-32,0)}function Oe(A,e,I){return A|=0,e|=0,(0|(I|=0))<32?(hg=e>>>I,A>>>I|(e&(1<<I)-1)<<32-I):(hg=0,e>>>I-32|0)}function We(A,e,I,g,t,r,n){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,0|FA(A,e,I,g,t,r,n)}function qe(A){var e=0;cg[(A|=0)>>2]=1,e=(A=A+4|0)+36|0;do{cg[A>>2]=0,A=A+4|0}while((0|A)<(0|e))}function ze(A,e,I,g,t,r){J(A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,0)}function $e(A,e,I,g,t,r){v(A|=0,e|=0,I|=0,g|=0,t|=0,1,0,r|=0)}function AI(A,e,I,g,t){return A|=0,e|=0,I|=0,g|=0,t|=0,0|U(A,e,I,g,t,0)}function eI(A,e,I,g,t){return A|=0,e|=0,I|=0,g|=0,t|=0,0|Ae(A,e,I,g,t)}function II(A,e,I,g,t,r){v(A|=0,e|=0,I|=0,g|=0,t|=0,0,0,r|=0)}function gI(A,e,I,g,t,r){GA(A|=0,e|=0,I|=0,g|=0,t|=0,1,0,r|=0)}function tI(A,e,I){P(A|=0,e|=0,255&(I|=0)),P(A+40|0,e+40|0,255&I),P(A+80|0,e+80|0,255&I)}function rI(A,e,I,g){return A|=0,e|=0,I|=0,g|=0,g=e-g-(I>>>0>A>>>0|0)>>>0,0|(hg=g,A-I>>>0|0)}function nI(A){qe(A|=0),qe(A+40|0),QI(A+80|0)}function aI(A,e,I,g){return A|=0,e|=0,I|=0,g|=0,0|(hg=e+g+(A+I>>>0>>>0<A>>>0|0)>>>0,A+I>>>0|0)}function iI(A){QI(A|=0),qe(A+40|0),qe(A+80|0)}function BI(A,e,I,g){wI(A|=0,e|=0,I|=0,g|=0)}function cI(A,e){e|=0,ae(A|=0),0|e&&f(A,33857,34,0)}function CI(A){0|Bg[(A|=0)+356>>0]&&XI(A),cg[A+80>>2]=-1,cg[A+80+4>>2]=-1}function oI(A,e){e|=0,Bg[(A|=0)>>0]=e,Bg[A+1>>0]=e>>8,Bg[A+2>>0]=e>>16,Bg[A+3>>0]=e>>24}function QI(A){var e=0;e=(A|=0)+40|0;do{cg[A>>2]=0,A=A+4|0}while((0|A)<(0|e))}function EI(A,e,I,g){K(A|=0,e|=0,I|=0,g|=0)}function sI(A,e,I,g,t){NA(A|=0,e|=0,I|=0,g|=0,t|=0)}function yI(A,e,I,g){YA(A|=0,e|=0,40,0,I|=0,0,g|=0)}function hI(A,e){return A|=0,e|=0,Ye(e,32),0|mI(A,e)}function fI(A,e,I,g){return A|=0,e|=0,I|=0,g|=0,EI(A,e,I,g),0}function _I(A,e,I,g){uI(A|=0,e|=0,I|=0,g|=0)}function pI(A,e,I,g){return A|=0,e|=0,I|=0,g|=0,0|dA(A,e,I,g)}function wI(A,e,I,g){D(A|=0,e|=0,I|=0,g|=0)}function uI(A,e,I,g){f(A|=0,e|=0,I|=0,g|=0)}function lI(A,e,I){return A|=0,e|=0,I|=0,0|WA(A,e,I)}function dI(A){Bg[(A|=0)>>0]=-8&Bg[A>>0],Bg[A+31>>0]=63&Bg[A+31>>0]|64}function DI(A,e){return A|=0,e|=0,A=0|Z(A,e),0|((0|Bg[A>>0])==(255&e)<<24>>24?A:0)}function vI(A){return A|=0,255&(A=0|Oe(A<<24>>24|0,((A<<24>>24|0)<0)<<31>>31|0,63))|0}function kI(A){return A|=0,Cg[A>>0]|Cg[A+1>>0]<<8|Cg[A+2>>0]<<16|Cg[A+3>>0]<<24|0}function bI(A,e,I){return A|=0,e|=0,I|=0,0|He(A,e,I)}function GI(A){Bg[(A|=0)>>0]=0,Bg[A+1>>0]=0,Bg[A+2>>0]=0,Bg[A+3>>0]=0}function FI(A){cg[(A|=0)>>2]=0,cg[A+4>>2]=0,cg[A+8>>2]=0,cg[A+12>>2]=0}function mI(A,e){return A|=0,e|=0,0|_A(A,e)}function HI(A,e){LI(A|=0,e|=0)}function MI(A,e){KI(A|=0,e|=0)}function YI(A,e,I){return A|=0,e|=0,I|=0,0|mA(A,e,I)}function SI(A,e){return A|=0,e|=0,0|hI(A,e)}function NI(A,e,I){H(A|=0,32,0,e|=0,I|=0)}function RI(A,e,I){UA(A|=0,64,0,e|=0,I|=0)}function UI(A){1!=(-7&(A|=0)|0)&&ig()}function PI(A,e,I){s(A|=0,e|=0,I|=0)}function JI(A,e){return A|=0,e|=0,0|mI(A,e)}function xI(A,e){O(A|=0,e|=0)}function LI(A,e){b(A|=0,e|=0)}function KI(A,e){iA(A|=0,e|=0)}function XI(A){cg[(A|=0)+88>>2]=-1,cg[A+88+4>>2]=-1}function TI(A,e){return A|=0,e|=0,1&(0!=(0|A)|0!=(0|e))|0}function VI(A,e){return A|=0,((255&((e|=0)^A))-1|0)>>>31&255|0}function jI(A,e){return A|=0,e|=0,0|DA(A,e,32)}function ZI(A,e){return A|=0,e|=0,0|DA(A,e,16)}function OI(A,e){return A|=0,e|=0,A>>>(32-e|0)|A<<e|0}function WI(A){ae(A|=0)}function qI(){Le()}function zI(A){Ye(A|=0,32)}function $I(){ug(1)}function Ag(){return 0|ug(0)}function eg(){return 1}function Ig(){return 8}function gg(){return 24}function tg(){return 16}function rg(){return 64}function ng(){return 32}function ag(){return 0}function ig(){dg()}var Bg=new A.Int8Array(I),cg=(new A.Int16Array(I),new A.Int32Array(I)),Cg=new A.Uint8Array(I),og=(new A.Uint16Array(I),new A.Uint32Array(I),new A.Float32Array(I),new A.Float64Array(I),0|e.DYNAMICTOP_PTR),Qg=(e.tempDoublePtr,e.ABORT,0|e.STACKTOP),Eg=0|e.STACK_MAX,sg=0,yg=0,hg=(A.NaN,A.Infinity,0),fg=(A.Math.floor,A.Math.abs,A.Math.sqrt,A.Math.pow,A.Math.cos,A.Math.sin,A.Math.tan,A.Math.acos,A.Math.asin,A.Math.atan,A.Math.atan2,A.Math.exp,A.Math.log,A.Math.ceil,A.Math.imul),_g=(A.Math.min,A.Math.max,A.Math.clz32,e.abort,e.assert,e.enlargeMemory),pg=e.getTotalMemory,wg=e.abortOnCannotGrowMemory,ug=e._emscripten_asm_const_i,lg=e._sysconf,dg=e._abort,Dg=e.___setErrNo,vg=e._emscripten_memcpy_big,kg=e.___assert_fail;return{_sodium_library_version_minor:ag,_crypto_secretstream_xchacha20poly1305_init_push:function(A,e,I){A|=0,I|=0;var g=0;return Ye(e|=0,24),h(A,e,I,0),je(A),g=Cg[e+16>>0]|Cg[e+16+1>>0]<<8|Cg[e+16+2>>0]<<16|Cg[e+16+3>>0]<<24,I=Cg[e+16+4>>0]|Cg[e+16+4+1>>0]<<8|Cg[e+16+4+2>>0]<<16|Cg[e+16+4+3>>0]<<24,Bg[A+36>>0]=g,Bg[A+36+1>>0]=g>>8,Bg[A+36+2>>0]=g>>16,Bg[A+36+3>>0]=g>>24,Bg[A+36+4>>0]=I,Bg[A+36+4+1>>0]=I>>8,Bg[A+36+4+2>>0]=I>>16,Bg[A+36+4+3>>0]=I>>24,Bg[A+44>>0]=0,Bg[A+44+1>>0]=0,Bg[A+44+2>>0]=0,Bg[A+44+3>>0]=0,Bg[A+44+4>>0]=0,Bg[A+44+4+1>>0]=0,Bg[A+44+4+2>>0]=0,Bg[A+44+4+3>>0]=0,0},_sodium_hex2bin:function(A,e,I,g,t,r,n){A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0;var a=0,i=0,B=0,c=0,C=0,o=0,Q=0;A:do{if(g){i=0,c=0,B=0,o=0;e:for(;;){for(;a=0|Cg[I+B>>0],!(255&((C=(65526+(201+(223&a)&255)^65520+(201+(223&a)&255))>>>8)|(65526+(48^a)|0)>>>8)|0);){if(!(0!=(0|t)&i<<24>>24==0)){a=0;break e}if(!(0|DI(t,a))){i=c,a=0;break A}if(!((B=B+1|0)>>>0<g>>>0)){i=c,a=0;break A}i=0}if(c>>>0>=e>>>0){Q=9;break}if(a=201+(223&a)&255&C|(65526+(48^a)|0)>>>8&(48^a),i<<24>>24?(Bg[A+c>>0]=a|255&o,c=c+1|0,a=o):a=a<<4&255,i=~i,!((B=B+1|0)>>>0<g>>>0)){a=0;break}o=a}9==(0|Q)&&(cg[8242]=34,a=-1),i<<24>>24?(cg[8242]=22,i=c,B=B+-1|0,a=-1):i=c}else i=0,B=0,a=0}while(0);return i=0==(0|a)?i:0,n?cg[n>>2]=I+B:(0|B)!=(0|g)&&(cg[8242]=22,a=-1),0|r&&(cg[r>>2]=i),0|a},_bitshift64Lshr:Oe,_crypto_kx_publickeybytes:ng,_sodium_unpad:function(A,e,I,g){A|=0,e|=0,I|=0,g|=0;var t=0,r=0,n=0,a=0,i=0,B=0,c=0;if(B=Qg,i=Qg=Qg+63&-64,Qg=Qg+16|0,cg[i>>2]=0,(g+-1|0)>>>0<I>>>0){for(n=0,t=0,a=0;t&=255,r=0|Cg[e+(I+-1)+(0-n)>>0],c=(511+(0|cg[i>>2])&t+511&511+(128^r))>>>8,cg[i>>2]=1+(1^(-2|c))&n|cg[i>>2],n=n+1|0,a=1&c|255&a,(0|n)!=(0|g);)t|=r;cg[A>>2]=I+-1-(0|cg[i>>2]),t=a+-1|0}else t=-1;return Qg=B,0|t},_crypto_secretstream_xchacha20poly1305_statebytes:function(){return 52},_crypto_box_noncebytes:gg,_crypto_aead_chacha20poly1305_ietf_keybytes:ng,_crypto_aead_chacha20poly1305_ietf_encrypt_detached:L,_sodium_pad:function(A,e,I,g,t){A|=0,e|=0,I|=0,t|=0;var r=0,n=0,a=0,i=0;if(i=Qg,a=Qg=Qg+63&-64,Qg=Qg+16|0,g|=0)if(r=g+-1&g?(I>>>0)%(g>>>0)|0:g+-1&I,(n=g+-1-r|0)>>>0>=~I>>>0&&ig(),(n+I|0)>>>0<t>>>0){0|A&&(cg[A>>2]=n+I+1),Bg[a>>0]=0,r=0;do{t=(65535+(r^n)|0)>>>8,Bg[(A=e+(n+I)+(0-r)|0)>>0]=Bg[a>>0]&Bg[A>>0]&255|128&t,Bg[a>>0]=0|Cg[a>>0]|t,r=r+1|0}while((0|r)!=(0|g));r=0}else r=-1;else r=-1;return Qg=i,0|r},_crypto_scalarmult_base:JI,_crypto_aead_chacha20poly1305_abytes:tg,_crypto_core_hchacha20_outputbytes:ng,_crypto_auth_bytes:ng,_crypto_sign_statebytes:function(){return 208},_crypto_sign_open:function(A,e,I,g,t,r){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,0|cA(A,e,I,g,t,r)},_sbrk:RA,_memcpy:M,_crypto_kdf_bytes_max:rg,_crypto_kdf_bytes_min:tg,_crypto_box_seed_keypair:function(A,e,I){return A|=0,e|=0,I|=0,0|MA(A,e,I)},stackAlloc:function(A){var e=0;return e=Qg,Qg=Qg+(A|=0)|0,Qg=Qg+15&-16,0|e},_crypto_box_open_easy_afternm:function(A,e,I,g,t,r){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,0|(A=g>>>0<0|0==(0|g)&I>>>0<16?-1:0|xe(A,e+16|0,e,g=0|aI(0|I,0|g,-16,-1),hg,t,r))},_crypto_sign_ed25519_sk_to_curve25519:function(A,e){A|=0;var I=0,g=0,t=0;g=Qg,t=Qg=Qg+63&-64,Qg=Qg+64|0,ie(t,e|=0,32,0),Bg[t>>0]=-8&Bg[t>>0],Bg[t+31>>0]=63&Bg[t+31>>0]|64,e=t,I=A+32|0;do{Bg[A>>0]=0|Bg[e>>0],A=A+1|0,e=e+1|0}while((0|A)<(0|I));return $A(t,64),Qg=g,0},_emscripten_get_global_libc:function(){return 35288},_crypto_secretstream_xchacha20poly1305_keybytes:ng,_free:function(A){var e=0,I=0,g=0,t=0,r=0,n=0,a=0,i=0;if(A|=0){e=0|cg[8702],i=A+-8+(-8&(I=0|cg[A+-4>>2]))|0;do{if(1&I)a=A+-8|0,e=-8&I,n=A+-8|0;else{if(g=0|cg[A+-8>>2],!(3&I))return;if(n=A+-8+(0-g)|0,r=g+(-8&I)|0,n>>>0<e>>>0)return;if((0|n)==(0|cg[8703])){if(3!=(3&(A=0|cg[i+4>>2])|0)){a=n,e=r;break}return cg[8700]=r,cg[i+4>>2]=-2&A,cg[n+4>>2]=1|r,void(cg[n+r>>2]=r)}if(g>>>0<256){if(A=0|cg[n+8>>2],(0|(e=0|cg[n+12>>2]))==(0|A)){cg[8698]=cg[8698]&~(1<<(g>>>3)),a=n,e=r;break}cg[A+12>>2]=e,cg[e+8>>2]=A,a=n,e=r;break}t=0|cg[n+24>>2],A=0|cg[n+12>>2];do{if((0|A)==(0|n)){if(A=0|cg[n+16+4>>2])g=n+16+4|0;else{if(!(A=0|cg[n+16>>2])){A=0;break}g=n+16|0}for(;;)if(e=A+20|0,0|(I=0|cg[e>>2]))A=I,g=e;else{if(e=A+16|0,!(I=0|cg[e>>2]))break;A=I,g=e}cg[g>>2]=0}else a=0|cg[n+8>>2],cg[a+12>>2]=A,cg[A+8>>2]=a}while(0);if(t){if(e=0|cg[n+28>>2],(0|n)==(0|cg[35096+(e<<2)>>2])){if(cg[35096+(e<<2)>>2]=A,!A){cg[8699]=cg[8699]&~(1<<e),a=n,e=r;break}}else if(cg[t+16+(((0|cg[t+16>>2])!=(0|n)&1)<<2)>>2]=A,!A){a=n,e=r;break}cg[A+24>>2]=t,0|(e=0|cg[n+16>>2])&&(cg[A+16>>2]=e,cg[e+24>>2]=A),(e=0|cg[n+16+4>>2])?(cg[A+20>>2]=e,cg[e+24>>2]=A,a=n,e=r):(a=n,e=r)}else a=n,e=r}}while(0);if(!(n>>>0>=i>>>0)&&1&(I=0|cg[i+4>>2])){if(2&I)cg[i+4>>2]=-2&I,cg[a+4>>2]=1|e,cg[n+e>>2]=e,t=e;else{if(A=0|cg[8703],(0|i)==(0|cg[8704])){if(i=(0|cg[8701])+e|0,cg[8701]=i,cg[8704]=a,cg[a+4>>2]=1|i,(0|a)!=(0|A))return;return cg[8703]=0,void(cg[8700]=0)}if((0|i)==(0|A))return i=(0|cg[8700])+e|0,cg[8700]=i,cg[8703]=n,cg[a+4>>2]=1|i,void(cg[n+i>>2]=i);t=(-8&I)+e|0;do{if(I>>>0<256){if(e=0|cg[i+8>>2],(0|(A=0|cg[i+12>>2]))==(0|e)){cg[8698]=cg[8698]&~(1<<(I>>>3));break}cg[e+12>>2]=A,cg[A+8>>2]=e;break}r=0|cg[i+24>>2],A=0|cg[i+12>>2];do{if((0|A)==(0|i)){if(A=0|cg[i+16+4>>2])g=i+16+4|0;else{if(!(A=0|cg[i+16>>2])){e=0;break}g=i+16|0}for(;;)if(e=A+20|0,0|(I=0|cg[e>>2]))A=I,g=e;else{if(e=A+16|0,!(I=0|cg[e>>2]))break;A=I,g=e}cg[g>>2]=0,e=A}else e=0|cg[i+8>>2],cg[e+12>>2]=A,cg[A+8>>2]=e,e=A}while(0);if(0|r){if(A=0|cg[i+28>>2],(0|i)==(0|cg[35096+(A<<2)>>2])){if(cg[35096+(A<<2)>>2]=e,!e){cg[8699]=cg[8699]&~(1<<A);break}}else if(cg[r+16+(((0|cg[r+16>>2])!=(0|i)&1)<<2)>>2]=e,!e)break;cg[e+24>>2]=r,0|(A=0|cg[i+16>>2])&&(cg[e+16>>2]=A,cg[A+24>>2]=e),0|(A=0|cg[i+16+4>>2])&&(cg[e+20>>2]=A,cg[A+24>>2]=e)}}while(0);if(cg[a+4>>2]=1|t,cg[n+t>>2]=t,(0|a)==(0|cg[8703]))return void(cg[8700]=t)}if(I=t>>>3,t>>>0<256)return(A=0|cg[8698])&1<<I?(A=0|cg[34832+(I<<1<<2)+8>>2],e=34832+(I<<1<<2)+8|0):(cg[8698]=A|1<<I,A=34832+(I<<1<<2)|0,e=34832+(I<<1<<2)+8|0),cg[e>>2]=a,cg[A+12>>2]=a,cg[a+8>>2]=A,void(cg[a+12>>2]=34832+(I<<1<<2));g=35096+((A=(A=t>>>8)?t>>>0>16777215?31:t>>>(7+(A=14-((520192+(A<<((A+1048320|0)>>>16&8))|0)>>>16&4|(A+1048320|0)>>>16&8|(245760+(i=A<<((A+1048320|0)>>>16&8)<<((520192+(A<<((A+1048320|0)>>>16&8))|0)>>>16&4))|0)>>>16&2)+(i<<((i+245760|0)>>>16&2)>>>15)|0)|0)&1|A<<1:0)<<2)|0,cg[a+28>>2]=A,cg[a+20>>2]=0,cg[a+16>>2]=0,e=0|cg[8699],I=1<<A;do{if(e&I){for(e=t<<(31==(0|A)?0:25-(A>>>1)|0),I=0|cg[g>>2];;){if((-8&cg[I+4>>2]|0)==(0|t)){A=73;break}if(g=I+16+(e>>>31<<2)|0,!(A=0|cg[g>>2])){A=72;break}e<<=1,I=A}if(72==(0|A)){cg[g>>2]=a,cg[a+24>>2]=I,cg[a+12>>2]=a,cg[a+8>>2]=a;break}if(73==(0|A)){i=0|cg[(n=I+8|0)>>2],cg[i+12>>2]=a,cg[n>>2]=a,cg[a+8>>2]=i,cg[a+12>>2]=I,cg[a+24>>2]=0;break}}else cg[8699]=e|I,cg[g>>2]=a,cg[a+24>>2]=g,cg[a+12>>2]=a,cg[a+8>>2]=a}while(0);if(i=(0|cg[8706])-1|0,cg[8706]=i,!i){for(A=35248;A=0|cg[A>>2];)A=A+8|0;cg[8706]=-1}}}},_crypto_aead_chacha20poly1305_keybytes:ng,stackSave:function(){return 0|Qg},_crypto_secretstream_xchacha20poly1305_tag_message:ag,_crypto_box_seal:function(A,e,I,g,t){A|=0,e|=0,I|=0,g|=0,t|=0;var r=0,n=0,a=0,i=0;if(i=Qg,Qg=Qg+96|0,0|SI(i+32|0,i))A=-1;else{n=i+32|0,a=(r=A)+32|0;do{Bg[r>>0]=0|Bg[n>>0],r=r+1|0,n=n+1|0}while((0|r)<(0|a));TA(i+64|0,i+32|0,t),A=0|Ee(A+32|0,e,I,g,i+64|0,t,i),$A(i,32),$A(i+32|0,32),$A(i+64|0,24)}return Qg=i,0|A},_crypto_aead_xchacha20poly1305_ietf_keygen:zI,_crypto_kx_keypair:function(A,e){return A|=0,e|=0,Ye(e,32),0|JI(A,e)},runPostSets:function(){},_crypto_kx_client_session_keys:function(A,e,I,g,t){e|=0,I|=0,g|=0,t|=0;var r=0,n=0,a=0;if(a=Qg,n=Qg=Qg+63&-64,Qg=Qg+480|0,r=0==(0|(A|=0))?e:A,e=0==(0|e)?r:e,r||ig(),0|YI(n+448|0,g,t))A=-1;else{pI(n,0,0,64),fI(n,n+448|0,32,0),$A(n+448|0,32),fI(n,I,32,0),fI(n,t,32,0),bI(n,n+384|0,64),$A(n,384),A=0;do{Bg[r+A>>0]=0|Bg[n+384+A>>0],Bg[e+A>>0]=0|Bg[n+384+(A+32)>>0],A=A+1|0}while(32!=(0|A));$A(n+384|0,64),A=0}return Qg=a,0|A},_crypto_shorthash:function(A,e,I,g,t){return A|=0,e|=0,I|=0,g|=0,t|=0,c(A,e,I,g,t),0},_crypto_auth_keybytes:ng,_crypto_aead_chacha20poly1305_npubbytes:Ig,_crypto_secretstream_xchacha20poly1305_tag_rekey:function(){return 2},_crypto_aead_xchacha20poly1305_ietf_abytes:tg,_crypto_sign_seedbytes:ng,_crypto_box_detached_afternm:Xe,_crypto_auth:function(A,e,I,g,t){return A|=0,e|=0,I|=0,g|=0,t|=0,ne(A,e,I,g,t),0},_randombytes_random:Ag,_crypto_sign_keypair:function(A,e){return A|=0,e|=0,we(A,e),0},setThrew:function(A,e){A|=0,e|=0,sg||(sg=A,yg=e)},_crypto_generichash_statebytes:function(){return 384},_randombytes_buf_deterministic:function(A,e,I){sI(A|=0,e|=0,0,34646,I|=0)},_crypto_aead_chacha20poly1305_encrypt_detached:z,_crypto_secretstream_xchacha20poly1305_keygen:zI,_sodium_library_version_major:function(){return 10},_crypto_sign_final_verify:function(A,e,I){return A|=0,e|=0,I|=0,0|ce(A,e,I)},_crypto_box_sealbytes:function(){return 48},_crypto_secretbox_keygen:zI,_malloc:function(A){A|=0;var e=0,I=0,g=0,t=0,r=0,n=0,a=0,i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0,h=0,f=0,_=0,p=0,w=0;w=Qg,Q=Qg=Qg+63&-64,Qg=Qg+16|0;do{if(A>>>0<245){if(o=A>>>0<11?16:A+11&-8,(c=0|cg[8698])>>>(o>>>3)&3|0)return A=34832+((c>>>(o>>>3)&1^1)+(o>>>3)<<1<<2)|0,e=0|cg[A+8>>2],I=0|cg[e+8>>2],(0|A)==(0|I)?cg[8698]=c&~(1<<(c>>>(o>>>3)&1^1)+(o>>>3)):(cg[I+12>>2]=A,cg[A+8>>2]=I),p=(c>>>(o>>>3)&1^1)+(o>>>3)<<3,cg[e+4>>2]=3|p,cg[e+p+4>>2]=1|cg[e+p+4>>2],p=e+8|0,Qg=w,0|p;if(C=0|cg[8700],o>>>0>C>>>0){if(c>>>(o>>>3)|0)return A=c>>>(o>>>3)<<(o>>>3)&(2<<(o>>>3)|0-(2<<(o>>>3))),t=((A&0-A)-1|0)>>>(((A&0-A)-1|0)>>>12&16),g=t>>>(t>>>5&8)>>>(t>>>(t>>>5&8)>>>2&4),g=(t>>>5&8|((A&0-A)-1|0)>>>12&16|t>>>(t>>>5&8)>>>2&4|g>>>1&2|g>>>(g>>>1&2)>>>1&1)+(g>>>(g>>>1&2)>>>(g>>>(g>>>1&2)>>>1&1))|0,t=0|cg[34832+(g<<1<<2)+8>>2],A=0|cg[t+8>>2],(34832+(g<<1<<2)|0)==(0|A)?(cg[8698]=c&~(1<<g),A=c&~(1<<g)):(cg[A+12>>2]=34832+(g<<1<<2),cg[34832+(g<<1<<2)+8>>2]=A,A=c),cg[t+4>>2]=3|o,cg[t+o+4>>2]=(g<<3)-o|1,cg[t+o+((g<<3)-o)>>2]=(g<<3)-o,0|C&&(I=0|cg[8703],A&1<<(C>>>3)?(A=0|cg[34832+(C>>>3<<1<<2)+8>>2],e=34832+(C>>>3<<1<<2)+8|0):(cg[8698]=A|1<<(C>>>3),A=34832+(C>>>3<<1<<2)|0,e=34832+(C>>>3<<1<<2)+8|0),cg[e>>2]=I,cg[A+12>>2]=I,cg[I+8>>2]=A,cg[I+12>>2]=34832+(C>>>3<<1<<2)),cg[8700]=(g<<3)-o,cg[8703]=t+o,p=t+8|0,Qg=w,0|p;if(B=0|cg[8699]){if(e=((B&0-B)-1|0)>>>(((B&0-B)-1|0)>>>12&16),A=e>>>(e>>>5&8)>>>(e>>>(e>>>5&8)>>>2&4),A=0|cg[35096+((e>>>5&8|((B&0-B)-1|0)>>>12&16|e>>>(e>>>5&8)>>>2&4|A>>>1&2|A>>>(A>>>1&2)>>>1&1)+(A>>>(A>>>1&2)>>>(A>>>(A>>>1&2)>>>1&1))<<2)>>2],e=(-8&cg[A+4>>2])-o|0,I=0|cg[A+16+((0==(0|cg[A+16>>2])&1)<<2)>>2]){do{e=(i=(a=(-8&cg[I+4>>2])-o|0)>>>0<e>>>0)?a:e,A=i?I:A,I=0|cg[I+16+((0==(0|cg[I+16>>2])&1)<<2)>>2]}while(0!=(0|I));i=A,n=e}else i=A,n=e;if(a=i+o|0,i>>>0<a>>>0){t=0|cg[i+24>>2],A=0|cg[i+12>>2];do{if((0|A)==(0|i)){if(e=i+20|0,!((A=0|cg[e>>2])||(e=i+16|0,A=0|cg[e>>2]))){e=0;break}for(;;)if(I=A+20|0,0|(g=0|cg[I>>2]))A=g,e=I;else{if(I=A+16|0,!(g=0|cg[I>>2]))break;A=g,e=I}cg[e>>2]=0,e=A}else e=0|cg[i+8>>2],cg[e+12>>2]=A,cg[A+8>>2]=e,e=A}while(0);do{if(0|t){if(A=0|cg[i+28>>2],(0|i)==(0|cg[35096+(A<<2)>>2])){if(cg[35096+(A<<2)>>2]=e,!e){cg[8699]=B&~(1<<A);break}}else if(cg[t+16+(((0|cg[t+16>>2])!=(0|i)&1)<<2)>>2]=e,!e)break;cg[e+24>>2]=t,0|(A=0|cg[i+16>>2])&&(cg[e+16>>2]=A,cg[A+24>>2]=e),0|(A=0|cg[i+20>>2])&&(cg[e+20>>2]=A,cg[A+24>>2]=e)}}while(0);return n>>>0<16?(p=n+o|0,cg[i+4>>2]=3|p,cg[(p=i+p+4|0)>>2]=1|cg[p>>2]):(cg[i+4>>2]=3|o,cg[a+4>>2]=1|n,cg[a+n>>2]=n,0|C&&(I=0|cg[8703],c&1<<(C>>>3)?(A=0|cg[34832+(C>>>3<<1<<2)+8>>2],e=34832+(C>>>3<<1<<2)+8|0):(cg[8698]=c|1<<(C>>>3),A=34832+(C>>>3<<1<<2)|0,e=34832+(C>>>3<<1<<2)+8|0),cg[e>>2]=I,cg[A+12>>2]=I,cg[I+8>>2]=A,cg[I+12>>2]=34832+(C>>>3<<1<<2)),cg[8700]=n,cg[8703]=a),p=i+8|0,Qg=w,0|p}}}}else if(A>>>0<=4294967231){if(o=A+11&-8,i=0|cg[8699]){a=(A+11|0)>>>8?o>>>0>16777215?31:o>>>(7+(a=14-((520192+(a=(A+11|0)>>>8<<((1048320+((A+11|0)>>>8)|0)>>>16&8))|0)>>>16&4|(1048320+((A+11|0)>>>8)|0)>>>16&8|(245760+(a<<((a+520192|0)>>>16&4))|0)>>>16&2)+(a<<((a+520192|0)>>>16&4)<<((245760+(a<<((a+520192|0)>>>16&4))|0)>>>16&2)>>>15)|0)|0)&1|a<<1:0,e=0|cg[35096+(a<<2)>>2];A:do{if(e)for(A=0,I=0-o|0,n=o<<(31==(0|a)?0:25-(a>>>1)|0),t=0;;){if((g=(-8&cg[e+4>>2])-o|0)>>>0<I>>>0){if(!g){A=e,I=0,g=e,_=61;break A}A=e,I=g}if(g=0|cg[e+20>>2],e=0|cg[e+16+(n>>>31<<2)>>2],t=0==(0|g)|(0|g)==(0|e)?t:g,g=0==(0|e)){e=t,_=57;break}n<<=1&(1^g)}else e=0,A=0,I=0-o|0,_=57}while(0);if(57==(0|_)){if(0==(0|e)&0==(0|A)){if(A=2<<a,!(i&(A|0-A)))break;c=(i&(A|0-A)&0-(i&(A|0-A)))-1|0,A=0,e=0|cg[35096+((c>>>(c>>>12&16)>>>5&8|c>>>12&16|(C=c>>>(c>>>12&16)>>>(c>>>(c>>>12&16)>>>5&8))>>>2&4|C>>>(C>>>2&4)>>>1&2|(e=C>>>(C>>>2&4)>>>(C>>>(C>>>2&4)>>>1&2))>>>1&1)+(e>>>(e>>>1&1))<<2)>>2]}e?(g=e,_=61):(a=A,n=I)}if(61==(0|_))for(;;){if(_=0,e=(-8&cg[g+4>>2])-o|0,C=e>>>0<I>>>0,e=C?e:I,A=C?g:A,!(g=0|cg[g+16+((0==(0|cg[g+16>>2])&1)<<2)>>2])){a=A,n=e;break}I=e,_=61}if(0!=(0|a)?n>>>0<((0|cg[8700])-o|0)>>>0:0){if(r=a+o|0,a>>>0>=r>>>0)return p=0,Qg=w,0|p;t=0|cg[a+24>>2],A=0|cg[a+12>>2];do{if((0|A)==(0|a)){if(e=a+20|0,!((A=0|cg[e>>2])||(e=a+16|0,A=0|cg[e>>2]))){A=0;break}for(;;)if(I=A+20|0,0|(g=0|cg[I>>2]))A=g,e=I;else{if(I=A+16|0,!(g=0|cg[I>>2]))break;A=g,e=I}cg[e>>2]=0}else p=0|cg[a+8>>2],cg[p+12>>2]=A,cg[A+8>>2]=p}while(0);do{if(t){if(e=0|cg[a+28>>2],(0|a)==(0|cg[35096+(e<<2)>>2])){if(cg[35096+(e<<2)>>2]=A,!A){cg[8699]=i&~(1<<e),g=i&~(1<<e);break}}else if(cg[t+16+(((0|cg[t+16>>2])!=(0|a)&1)<<2)>>2]=A,!A){g=i;break}cg[A+24>>2]=t,0|(e=0|cg[a+16>>2])&&(cg[A+16>>2]=e,cg[e+24>>2]=A),(e=0|cg[a+20>>2])?(cg[A+20>>2]=e,cg[e+24>>2]=A,g=i):g=i}else g=i}while(0);do{if(n>>>0>=16){if(cg[a+4>>2]=3|o,cg[r+4>>2]=1|n,cg[r+n>>2]=n,I=n>>>3,n>>>0<256){(A=0|cg[8698])&1<<I?(A=0|cg[34832+(I<<1<<2)+8>>2],e=34832+(I<<1<<2)+8|0):(cg[8698]=A|1<<I,A=34832+(I<<1<<2)|0,e=34832+(I<<1<<2)+8|0),cg[e>>2]=r,cg[A+12>>2]=r,cg[r+8>>2]=A,cg[r+12>>2]=34832+(I<<1<<2);break}if(A=n>>>8,A=A?n>>>0>16777215?31:n>>>(7+(A=14-((520192+(A<<((A+1048320|0)>>>16&8))|0)>>>16&4|(A+1048320|0)>>>16&8|(245760+(p=A<<((A+1048320|0)>>>16&8)<<((520192+(A<<((A+1048320|0)>>>16&8))|0)>>>16&4))|0)>>>16&2)+(p<<((p+245760|0)>>>16&2)>>>15)|0)|0)&1|A<<1:0,I=35096+(A<<2)|0,cg[r+28>>2]=A,cg[r+16+4>>2]=0,cg[r+16>>2]=0,e=1<<A,!(g&e)){cg[8699]=g|e,cg[I>>2]=r,cg[r+24>>2]=I,cg[r+12>>2]=r,cg[r+8>>2]=r;break}for(e=n<<(31==(0|A)?0:25-(A>>>1)|0),I=0|cg[I>>2];;){if((-8&cg[I+4>>2]|0)==(0|n)){_=97;break}if(g=I+16+(e>>>31<<2)|0,!(A=0|cg[g>>2])){_=96;break}e<<=1,I=A}if(96==(0|_)){cg[g>>2]=r,cg[r+24>>2]=I,cg[r+12>>2]=r,cg[r+8>>2]=r;break}if(97==(0|_)){p=0|cg[(_=I+8|0)>>2],cg[p+12>>2]=r,cg[_>>2]=r,cg[r+8>>2]=p,cg[r+12>>2]=I,cg[r+24>>2]=0;break}}else p=n+o|0,cg[a+4>>2]=3|p,cg[(p=a+p+4|0)>>2]=1|cg[p>>2]}while(0);return p=a+8|0,Qg=w,0|p}}}else o=-1}while(0);if((I=0|cg[8700])>>>0>=o>>>0)return A=I-o|0,e=0|cg[8703],A>>>0>15?(p=e+o|0,cg[8703]=p,cg[8700]=A,cg[p+4>>2]=1|A,cg[p+A>>2]=A,cg[e+4>>2]=3|o):(cg[8700]=0,cg[8703]=0,cg[e+4>>2]=3|I,cg[e+I+4>>2]=1|cg[e+I+4>>2]),p=e+8|0,Qg=w,0|p;if((t=0|cg[8701])>>>0>o>>>0)return f=t-o|0,cg[8701]=f,p=0|cg[8704],_=p+o|0,cg[8704]=_,cg[_+4>>2]=1|f,cg[p+4>>2]=3|o,p=p+8|0,Qg=w,0|p;if(0|cg[8816]?A=0|cg[8818]:(cg[8818]=4096,cg[8817]=4096,cg[8819]=-1,cg[8820]=-1,cg[8821]=0,cg[8809]=0,cg[Q>>2]=-16&Q^1431655768,cg[8816]=-16&Q^1431655768,A=4096),n=o+48|0,a=o+47|0,B=A+a|0,i=0-A|0,(B&i)>>>0<=o>>>0)return p=0,Qg=w,0|p;if(0|(A=0|cg[8808])?((Q=0|cg[8806])+(B&i)|0)>>>0<=Q>>>0?1:(Q+(B&i)|0)>>>0>A>>>0:0)return p=0,Qg=w,0|p;A:do{if(4&cg[8809])A=0,_=133;else{I=0|cg[8704];e:do{if(I){for(e=35240;!((A=0|cg[e>>2])>>>0<=I>>>0?(E=e+4|0,(A+(0|cg[E>>2])|0)>>>0>I>>>0):0);){if(!(A=0|cg[e+8>>2])){_=118;break e}e=A}if((B-t&i)>>>0<2147483647)if((0|(A=0|RA(B-t&i|0)))==((0|cg[e>>2])+(0|cg[E>>2])|0)){if(-1!=(0|A)){n=B-t&i,r=A,_=135;break A}A=B-t&i}else g=A,I=B-t&i,_=126;else A=0}else _=118}while(0);do{if(118==(0|_))if(-1!=(0|(e=0|RA(0)))?(y=0|cg[8817],y=(0==(y+-1&e|0)?0:(y+-1+e&0-y)-e|0)+(B&i)|0,s=0|cg[8806],y>>>0>o>>>0&y>>>0<2147483647):0){if(0|(E=0|cg[8808])?(y+s|0)>>>0<=s>>>0|(y+s|0)>>>0>E>>>0:0){A=0;break}if((0|(A=0|RA(0|y)))==(0|e)){n=y,r=e,_=135;break A}g=A,I=y,_=126}else A=0}while(0);do{if(126==(0|_)){if(e=0-I|0,!(n>>>0>I>>>0&I>>>0<2147483647&-1!=(0|g))){if(-1==(0|g)){A=0;break}n=I,r=g,_=135;break A}if(A=0|cg[8818],(A=a-I+A&0-A)>>>0>=2147483647){n=I,r=g,_=135;break A}if(-1==(0|RA(0|A))){RA(0|e),A=0;break}n=A+I|0,r=g,_=135;break A}}while(0);cg[8809]=4|cg[8809],_=133}}while(0);if(!(133==(0|_)?(B&i)>>>0<2147483647:0)||(r=0|RA(B&i|0),h=0|RA(0),f=(h-r|0)>>>0>(o+40|0)>>>0,-1==(0|r)|1^f|r>>>0<h>>>0&-1!=(0|r)&-1!=(0|h)^1)||(n=f?h-r|0:A,_=135),135==(0|_)){A=(0|cg[8806])+n|0,cg[8806]=A,A>>>0>(0|cg[8807])>>>0&&(cg[8807]=A),i=0|cg[8704];do{if(i){for(A=35240;;){if(e=0|cg[A>>2],I=A+4|0,g=0|cg[I>>2],(0|r)==(e+g|0)){_=145;break}if(!(t=0|cg[A+8>>2]))break;A=t}if((145==(0|_)?0==(8&cg[A+12>>2]|0):0)?i>>>0<r>>>0&i>>>0>=e>>>0:0){cg[I>>2]=g+n,_=0==(i+8&7|0)?0:0-(i+8)&7,p=(0|cg[8701])+(n-_)|0,cg[8704]=i+_,cg[8701]=p,cg[i+_+4>>2]=1|p,cg[i+_+p+4>>2]=40,cg[8705]=cg[8820];break}for(r>>>0<(0|cg[8702])>>>0&&(cg[8702]=r),I=r+n|0,A=35240;;){if((0|cg[A>>2])==(0|I)){_=153;break}if(!(e=0|cg[A+8>>2]))break;A=e}if(153==(0|_)?0==(8&cg[A+12>>2]|0):0){cg[A>>2]=r,cg[(c=A+4|0)>>2]=(0|cg[c>>2])+n,B=(c=r+(0==(7&(c=r+8|0)|0)?0:0-c&7)|0)+o|0,a=(A=I+(0==(I+8&7|0)?0:0-(I+8)&7)|0)-c-o|0,cg[c+4>>2]=3|o;do{if((0|A)!=(0|i)){if((0|A)==(0|cg[8703])){p=(0|cg[8700])+a|0,cg[8700]=p,cg[8703]=B,cg[B+4>>2]=1|p,cg[B+p>>2]=p;break}if(1==(3&(n=0|cg[A+4>>2])|0)){A:do{if(n>>>0<256){if(e=0|cg[A+8>>2],(0|(I=0|cg[A+12>>2]))==(0|e)){cg[8698]=cg[8698]&~(1<<(n>>>3));break}cg[e+12>>2]=I,cg[I+8>>2]=e;break}r=0|cg[A+24>>2],e=0|cg[A+12>>2];do{if((0|e)==(0|A)){if(e=0|cg[A+16+4>>2])t=A+16+4|0;else{if(!(e=0|cg[A+16>>2])){e=0;break}t=A+16|0}for(;;)if(I=e+20|0,0|(g=0|cg[I>>2]))e=g,t=I;else{if(I=e+16|0,!(g=0|cg[I>>2]))break;e=g,t=I}cg[t>>2]=0}else p=0|cg[A+8>>2],cg[p+12>>2]=e,cg[e+8>>2]=p}while(0);if(!r)break;I=0|cg[A+28>>2];do{if((0|A)==(0|cg[35096+(I<<2)>>2])){if(cg[35096+(I<<2)>>2]=e,0|e)break;cg[8699]=cg[8699]&~(1<<I);break A}if(cg[r+16+(((0|cg[r+16>>2])!=(0|A)&1)<<2)>>2]=e,!e)break A}while(0);if(cg[e+24>>2]=r,0|(I=0|cg[A+16>>2])&&(cg[e+16>>2]=I,cg[I+24>>2]=e),!(I=0|cg[A+16+4>>2]))break;cg[e+20>>2]=I,cg[I+24>>2]=e}while(0);A=A+(-8&n)|0,t=(-8&n)+a|0}else t=a;if(I=A+4|0,cg[I>>2]=-2&cg[I>>2],cg[B+4>>2]=1|t,cg[B+t>>2]=t,I=t>>>3,t>>>0<256){(A=0|cg[8698])&1<<I?(A=0|cg[34832+(I<<1<<2)+8>>2],e=34832+(I<<1<<2)+8|0):(cg[8698]=A|1<<I,A=34832+(I<<1<<2)|0,e=34832+(I<<1<<2)+8|0),cg[e>>2]=B,cg[A+12>>2]=B,cg[B+8>>2]=A,cg[B+12>>2]=34832+(I<<1<<2);break}A=t>>>8;do{if(A){if(t>>>0>16777215){A=31;break}A=t>>>(7+(A=14-((520192+(A<<((A+1048320|0)>>>16&8))|0)>>>16&4|(A+1048320|0)>>>16&8|(245760+(p=A<<((A+1048320|0)>>>16&8)<<((520192+(A<<((A+1048320|0)>>>16&8))|0)>>>16&4))|0)>>>16&2)+(p<<((p+245760|0)>>>16&2)>>>15)|0)|0)&1|A<<1}else A=0}while(0);if(g=35096+(A<<2)|0,cg[B+28>>2]=A,cg[B+16+4>>2]=0,cg[B+16>>2]=0,e=0|cg[8699],I=1<<A,!(e&I)){cg[8699]=e|I,cg[g>>2]=B,cg[B+24>>2]=g,cg[B+12>>2]=B,cg[B+8>>2]=B;break}for(e=t<<(31==(0|A)?0:25-(A>>>1)|0),I=0|cg[g>>2];;){if((-8&cg[I+4>>2]|0)==(0|t)){_=194;break}if(g=I+16+(e>>>31<<2)|0,!(A=0|cg[g>>2])){_=193;break}e<<=1,I=A}if(193==(0|_)){cg[g>>2]=B,cg[B+24>>2]=I,cg[B+12>>2]=B,cg[B+8>>2]=B;break}if(194==(0|_)){p=0|cg[(_=I+8|0)>>2],cg[p+12>>2]=B,cg[_>>2]=B,cg[B+8>>2]=p,cg[B+12>>2]=I,cg[B+24>>2]=0;break}}else p=(0|cg[8701])+a|0,cg[8701]=p,cg[8704]=B,cg[B+4>>2]=1|p}while(0);return p=c+8|0,Qg=w,0|p}for(A=35240;!((e=0|cg[A>>2])>>>0<=i>>>0?(p=e+(0|cg[A+4>>2])|0)>>>0>i>>>0:0);)A=0|cg[A+8>>2];t=(t=p+-47+(0==(p+-47+8&7|0)?0:0-(p+-47+8)&7)|0)>>>0<(i+16|0)>>>0?i:t,_=r+(A=0==(7&(A=r+8|0)|0)?0:0-A&7)|0,A=n+-40-A|0,cg[8704]=_,cg[8701]=A,cg[_+4>>2]=1|A,cg[_+A+4>>2]=40,cg[8705]=cg[8820],cg[t+4>>2]=27,cg[t+8>>2]=cg[8810],cg[t+8+4>>2]=cg[8811],cg[t+8+8>>2]=cg[8812],cg[t+8+12>>2]=cg[8813],cg[8810]=r,cg[8811]=n,cg[8813]=0,cg[8812]=t+8,A=t+24|0;do{_=A,cg[(A=A+4|0)>>2]=7}while((_+8|0)>>>0<p>>>0);if((0|t)!=(0|i)){if(cg[t+4>>2]=-2&cg[t+4>>2],cg[i+4>>2]=t-i|1,cg[t>>2]=t-i,(t-i|0)>>>0<256){I=34832+((t-i|0)>>>3<<1<<2)|0,(A=0|cg[8698])&1<<((t-i|0)>>>3)?(A=0|cg[I+8>>2],e=I+8|0):(cg[8698]=A|1<<((t-i|0)>>>3),A=I,e=I+8|0),cg[e>>2]=i,cg[A+12>>2]=i,cg[i+8>>2]=A,cg[i+12>>2]=I;break}if(A=(t-i|0)>>>8?(t-i|0)>>>0>16777215?31:(t-i|0)>>>(7+(A=14-((520192+(A=(t-i|0)>>>8<<((1048320+((t-i|0)>>>8)|0)>>>16&8))|0)>>>16&4|(1048320+((t-i|0)>>>8)|0)>>>16&8|(245760+(A<<((A+520192|0)>>>16&4))|0)>>>16&2)+(A<<((A+520192|0)>>>16&4)<<((245760+(A<<((A+520192|0)>>>16&4))|0)>>>16&2)>>>15)|0)|0)&1|A<<1:0,g=35096+(A<<2)|0,cg[i+28>>2]=A,cg[i+20>>2]=0,cg[i+16>>2]=0,e=0|cg[8699],I=1<<A,!(e&I)){cg[8699]=e|I,cg[g>>2]=i,cg[i+24>>2]=g,cg[i+12>>2]=i,cg[i+8>>2]=i;break}for(e=t-i<<(31==(0|A)?0:25-(A>>>1)|0),I=0|cg[g>>2];;){if((-8&cg[I+4>>2]|0)==(t-i|0)){_=216;break}if(g=I+16+(e>>>31<<2)|0,!(A=0|cg[g>>2])){_=215;break}e<<=1,I=A}if(215==(0|_)){cg[g>>2]=i,cg[i+24>>2]=I,cg[i+12>>2]=i,cg[i+8>>2]=i;break}if(216==(0|_)){p=0|cg[(_=I+8|0)>>2],cg[p+12>>2]=i,cg[_>>2]=i,cg[i+8>>2]=p,cg[i+12>>2]=I,cg[i+24>>2]=0;break}}}else{0==(0|(p=0|cg[8702]))|r>>>0<p>>>0&&(cg[8702]=r),cg[8810]=r,cg[8811]=n,cg[8813]=0,cg[8707]=cg[8816],cg[8706]=-1,A=0;do{cg[12+(p=34832+(A<<1<<2)|0)>>2]=p,cg[p+8>>2]=p,A=A+1|0}while(32!=(0|A));_=r+(p=0==(7&(p=r+8|0)|0)?0:0-p&7)|0,p=n+-40-p|0,cg[8704]=_,cg[8701]=p,cg[_+4>>2]=1|p,cg[_+p+4>>2]=40,cg[8705]=cg[8820]}}while(0);if((A=0|cg[8701])>>>0>o>>>0)return f=A-o|0,cg[8701]=f,p=0|cg[8704],_=p+o|0,cg[8704]=_,cg[_+4>>2]=1|f,cg[p+4>>2]=3|o,p=p+8|0,Qg=w,0|p}return cg[8242]=12,p=0,Qg=w,0|p},_sodium_version_string:function(){return 34769},_crypto_generichash_keybytes_max:rg,_crypto_sign_ed25519_pk_to_curve25519:function(A,e){A|=0;var I=0,g=0;return g=Qg,I=Qg=Qg+63&-64,Qg=Qg+400|0,((0==(0|KA(e|=0))?0==(0|m(I+240|0,e)):0)?(d(I+80|0,I+240|0),0==(0|le(I+80|0))):0)?(qe(I),V(I,I,I+240+40|0),_(I,I),qe(I+40|0),j(I+40|0,I+40|0,I+240+40|0),a(I+40|0,I+40|0,I),w(A,I+40|0),A=0):A=-1,Qg=g,0|A},_i64Add:aI,_crypto_box_beforenmbytes:ng,_crypto_generichash:We,getTempRet0:function(){return 0|hg},_crypto_aead_chacha20poly1305_ietf_nsecbytes:ag,_randombytes_stir:$I,_crypto_aead_chacha20poly1305_ietf_encrypt:function(A,e,I,g,t,r,n,a,i,B,c){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0,c|=0,t>>>0>0|0==(0|t)&g>>>0>4294967279&&ig(),L(A,A+g|0,0,I,g,t,r,n,a,0,B,c),0|e&&(B=0|aI(0|g,0|t,16,0),cg[e>>2]=B,cg[e+4>>2]=hg),0},_crypto_secretstream_xchacha20poly1305_tag_push:eg,_crypto_core_hchacha20:h,_crypto_box_beforenm:lI,_crypto_shorthash_keybytes:tg,_crypto_aead_chacha20poly1305_ietf_decrypt:function(A,e,I,g,t,r,n,a,i,B,c){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0,c|=0,A=r>>>0>0|0==(0|r)&t>>>0>15?0|R(A,0,g,I=0|aI(0|t,0|r,-16,-1),hg,g+t+-16|0,n,a,i,B,c):-1,0|e&&(B=0==(0|A),r=0|aI(0|t,0|r,-16,-1),cg[e>>2]=B?r:0,cg[e+4>>2]=B?hg:0),0|A},_randombytes_close:ag,_crypto_kx_server_session_keys:function(A,e,I,g,t){e|=0,I|=0,g|=0,t|=0;var r=0,n=0,a=0;if(a=Qg,n=Qg=Qg+63&-64,Qg=Qg+480|0,r=0==(0|(A|=0))?e:A,e=0==(0|e)?r:e,r||ig(),0|YI(n+448|0,g,t))A=-1;else{pI(n,0,0,64),fI(n,n+448|0,32,0),$A(n+448|0,32),fI(n,t,32,0),fI(n,I,32,0),bI(n,n+384|0,64),$A(n,384),A=0;do{Bg[e+A>>0]=0|Bg[n+384+A>>0],Bg[r+A>>0]=0|Bg[n+384+(A+32)>>0],A=A+1|0}while(32!=(0|A));$A(n+384|0,64),A=0}return Qg=a,0|A},_crypto_secretstream_xchacha20poly1305_tag_final:function(){return 3},_crypto_core_hchacha20_constbytes:tg,_crypto_shorthash_bytes:Ig,_crypto_kdf_keybytes:ng,establishStackSpace:function(A,e){Qg=A|=0,Eg=e|=0},_crypto_sign_final_create:function(A,e,I,g){return A|=0,e|=0,I|=0,g|=0,Ce(A,e,I,g),0},_crypto_aead_chacha20poly1305_encrypt:function(A,e,I,g,t,r,n,a,i,B,c){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0,c|=0,t>>>0>0|0==(0|t)&g>>>0>4294967279&&ig(),z(A,A+g|0,0,I,g,t,r,n,a,0,B,c),0|e&&(B=0|aI(0|g,0|t,16,0),cg[e>>2]=B,cg[e+4>>2]=hg),0},_crypto_aead_xchacha20poly1305_ietf_encrypt:function(A,e,I,g,t,r,n,a,i,B,c){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0,c|=0,t>>>0>4294967295|-1==(0|t)&g>>>0>4294967279&&ig(),gA(A,A+g|0,0,I,g,t,r,n,a,0,B,c),0|e&&(B=0|aI(0|g,0|t,16,0),cg[e>>2]=B,cg[e+4>>2]=hg),0},_crypto_kx_secretkeybytes:ng,_crypto_secretstream_xchacha20poly1305_messagebytes_max:function(){return-1},_crypto_secretstream_xchacha20poly1305_abytes:function(){return 17},_crypto_box_detached:xA,_randombytes_buf:Ye,_bitshift64Ashr:ve,_crypto_box_open_detached:PA,_crypto_scalarmult_bytes:ng,_crypto_kx_seedbytes:ng,_crypto_auth_verify:function(A,e,I,g,t){return A|=0,e|=0,I|=0,g|=0,t|=0,0|OA(A,e,I,g,t)},_crypto_sign_detached:function(A,e,I,g,t,r){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,ze(A,e,I,g,t,r),0},_crypto_secretbox_detached:k,_crypto_secretbox_easy:function(A,e,I,g,t,r){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,g>>>0>0|0==(0|g)&I>>>0>4294967279?(ig(),0):(k(A+16|0,A,e,I,g,t,r),0)},_crypto_secretstream_xchacha20poly1305_init_pull:function(A,e,I){var g=0;return h(A|=0,e|=0,I|=0,0),je(A),g=Cg[e+16>>0]|Cg[e+16+1>>0]<<8|Cg[e+16+2>>0]<<16|Cg[e+16+3>>0]<<24,I=Cg[e+16+4>>0]|Cg[e+16+4+1>>0]<<8|Cg[e+16+4+2>>0]<<16|Cg[e+16+4+3>>0]<<24,Bg[A+36>>0]=g,Bg[A+36+1>>0]=g>>8,Bg[A+36+2>>0]=g>>16,Bg[A+36+3>>0]=g>>24,Bg[A+36+4>>0]=I,Bg[A+36+4+1>>0]=I>>8,Bg[A+36+4+2>>0]=I>>16,Bg[A+36+4+3>>0]=I>>24,Bg[A+44>>0]=0,Bg[A+44+1>>0]=0,Bg[A+44+2>>0]=0,Bg[A+44+3>>0]=0,Bg[A+44+4>>0]=0,Bg[A+44+4+1>>0]=0,Bg[A+44+4+2>>0]=0,Bg[A+44+4+3>>0]=0,0},_crypto_aead_xchacha20poly1305_ietf_decrypt_detached:aA,_memset:AA,_crypto_generichash_keygen:zI,_crypto_box_open_detached_afternm:xe,_sodium_bin2hex:function(A,e,I,g){A|=0,I|=0;var t=0,r=0;if((g|=0)>>>0<2147483647&g<<1>>>0<(e|=0)>>>0||ig(),g)for(t=0,e=0;;){if(r=0|Cg[I+t>>0],Bg[A+e>>0]=87+(r>>>4)+((65526+(r>>>4)|0)>>>8&217),Bg[A+(1|e)>>0]=(22272+((15&r)<<8)+(65526+(15&r)&55552)|0)>>>8,(0|(e=t+1|0))==(0|g)){e=g<<1;break}t=e,e<<=1}else e=0;return Bg[A+e>>0]=0,0|A},_crypto_aead_xchacha20poly1305_ietf_decrypt:function(A,e,I,g,t,r,n,a,i,B,c){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0,c|=0,A=r>>>0>0|0==(0|r)&t>>>0>15?0|aA(A,0,g,I=0|aI(0|t,0|r,-16,-1),hg,g+t+-16|0,n,a,i,B,c):-1,0|e&&(B=0==(0|A),r=0|aI(0|t,0|r,-16,-1),cg[e>>2]=B?r:0,cg[e+4>>2]=B?hg:0),0|A},_crypto_aead_chacha20poly1305_ietf_keygen:zI,_crypto_box_seedbytes:ng,_crypto_core_hchacha20_inputbytes:tg,_crypto_auth_keygen:zI,_crypto_hash:function(A,e,I,g){return A|=0,e|=0,I|=0,g|=0,ie(A,e,I,g),0},_sodium_library_minimal:eg,_crypto_box_easy_afternm:function(A,e,I,g,t,r){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,g>>>0>0|0==(0|g)&I>>>0>4294967279?(ig(),0):(Xe(A+16|0,A,e,I,g,t,r),0)},_crypto_aead_xchacha20poly1305_ietf_encrypt_detached:gA,_sodium_bin2base64:function(A,e,I,g,t){A|=0,e|=0,I|=0,g|=0;var r=0,n=0,a=0,i=0,B=0,c=0;UI(t|=0),n=(0|fg((g>>>0)/3|0,-3))+g|0,r=((g>>>0)/3|0)<<2;do{if(n){if(2&t){r=(2|r)+(n>>>1)|0;break}r=r+4|0;break}}while(0);if(r>>>0>=e>>>0&&ig(),4&t)if(0|g){a=0,B=0,n=0,t=0;do{for(t=0|Cg[I+B>>0]|t<<8,c=a+8|0,i=n;a=c+-6|0,n=i+1|0,Bg[A+i>>0]=0|se(t>>>a&63),a>>>0>5;)c=a,i=n;B=B+1|0}while((0|B)!=(0|g));a&&(Bg[A+n>>0]=0|se(t<<12-c&63),n=i+2|0)}else n=0;else if(0|g){i=0,t=0,n=0,a=0;do{for(t=0|Cg[I+i>>0]|t<<8,c=n,B=a+8|0;a=B+-6|0,n=c+1|0,Bg[A+c>>0]=0|he(t>>>a&63),a>>>0>5;)c=n,B=a;i=i+1|0}while((0|i)!=(0|g));a&&(Bg[A+n>>0]=0|he(t<<12-B&63),n=c+2|0)}else n=0;return r>>>0<n>>>0&&kg(34716,34735,230,34751),r>>>0>n>>>0?AA(A+n|0,61,r-n|0):r=n,g=r+1|0,AA(A+r|0,0,(g>>>0<e>>>0?e:g)-r|0),0|A},_crypto_box_macbytes:tg,_randombytes_seedbytes:ng,_crypto_box_publickeybytes:ng,_crypto_aead_chacha20poly1305_decrypt_detached:X,_crypto_sign_secretkeybytes:rg,_crypto_box_secretkeybytes:ng,_crypto_aead_xchacha20poly1305_ietf_keybytes:ng,_crypto_scalarmult_scalarbytes:ng,_crypto_secretstream_xchacha20poly1305_rekey:Y,_crypto_generichash_keybytes_min:tg,_crypto_aead_chacha20poly1305_keygen:zI,_crypto_kx_sessionkeybytes:ng,_crypto_secretstream_xchacha20poly1305_headerbytes:gg,_crypto_aead_chacha20poly1305_decrypt:function(A,e,I,g,t,r,n,a,i,B,c){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0,c|=0,A=r>>>0>0|0==(0|r)&t>>>0>15?0|X(A,0,g,I=0|aI(0|t,0|r,-16,-1),hg,g+t+-16|0,n,a,i,B,c):-1,0|e&&(B=0==(0|A),r=0|aI(0|t,0|r,-16,-1),cg[e>>2]=B?r:0,cg[e+4>>2]=B?hg:0),0|A},_memmove:jA,_crypto_aead_chacha20poly1305_ietf_decrypt_detached:R,_crypto_sign:function(A,e,I,g,t,r){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,0|oA(A,e,I,g,t,r)},_crypto_secretbox_noncebytes:gg,_crypto_box_keypair:SI,_i64Subtract:rI,_crypto_generichash_keybytes:ng,_crypto_hash_bytes:rg,_crypto_generichash_bytes_min:tg,_sodium_init:function(){var A=0;return 0|cg[8696]?A=1:(qI(),$I(),Pe(),cg[8696]=1,A=0),0|A},_crypto_secretbox_macbytes:tg,_crypto_secretbox_keybytes:ng,_crypto_aead_xchacha20poly1305_ietf_npubbytes:gg,_randombytes:function(A,e,I){A|=0,(I|=0)>>>0<1|1==(0|I)&(e|=0)>>>0<0?Ye(A,e):kg(34658,34678,204,34704)},_crypto_sign_publickeybytes:ng,_crypto_sign_update:function(A,e,I,g){return A|=0,e|=0,I|=0,g|=0,uI(A,e,I,g),0},setTempRet0:function(A){hg=A|=0},_crypto_sign_seed_keypair:function(A,e,I){return A|=0,e|=0,I|=0,HA(A,e,I),0},_crypto_generichash_bytes:ng,_crypto_generichash_bytes_max:rg,_crypto_secretbox_open_detached:F,_crypto_sign_init:function(A){return A|=0,WI(A),0},_crypto_core_hchacha20_keybytes:ng,___muldi3:Fe,_bitshift64Shl:Ze,_crypto_sign_verify_detached:function(A,e,I,g,t){return A|=0,e|=0,I|=0,g|=0,t|=0,0|AI(A,e,I,g,t)},_crypto_kx_seed_keypair:function(A,e,I){return A|=0,e|=0,I|=0,We(e,32,I,32,0,0,0),0|JI(A,e)},_crypto_box_open_easy:qA,_crypto_generichash_init:pI,_crypto_aead_chacha20poly1305_nsecbytes:ag,_crypto_kdf_contextbytes:Ig,_crypto_sign_bytes:rg,_crypto_generichash_update:fI,_crypto_scalarmult:YI,_crypto_aead_chacha20poly1305_ietf_abytes:tg,stackRestore:function(A){Qg=A|=0},_crypto_kdf_keygen:zI,_crypto_aead_xchacha20poly1305_ietf_nsecbytes:ag,_crypto_box_seal_open:function(A,e,I,g,t,r){A|=0,e|=0,t|=0,r|=0;var n=0,a=0;return a=Qg,n=Qg=Qg+63&-64,Qg=Qg+32|0,(g|=0)>>>0<0|0==(0|g)&(I|=0)>>>0<48?A=-1:(I=0|aI(0|I,0|g,-32,-1),g=hg,TA(n,e,t),A=0|qA(A,e+32|0,I,g,n,e,r)),Qg=a,0|A},_crypto_box_easy:Ee,_crypto_secretstream_xchacha20poly1305_pull:function(A,e,I,g,t,r,n,a,i,B){A|=0,e|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0;var c=0,C=0,o=0,Q=0,E=0;E=Qg,Q=Qg=Qg+63&-64,Qg=Qg+352|0,0|(I|=0)&&(cg[I>>2]=0,cg[I+4>>2]=0),0|g&&(Bg[g>>0]=-1);do{if(n>>>0<0|0==(0|n)&r>>>0<17)a=-1;else{C=0|aI(0|r,0|n,-17,-1),(o=hg)>>>0>0|0==(0|o)&C>>>0>4294967295&&ig(),sI(Q+280|0,64,0,A+32|0,A),MI(Q,Q+280|0),$A(Q+280|0,64),BI(Q,a,i,B),BI(Q,35416,15&(a=0|rI(0,0,0|i,0|B)),0),c=63+(a=Q+280+1|0)|0;do{Bg[a>>0]=0,a=a+1|0}while((0|a)<(0|c));if(Bg[Q+280>>0]=0|Bg[t>>0],Te(Q+280|0,Q+280|0,64,0,A+32|0,1,A),a=0|Bg[Q+280>>0],Bg[Q+280>>0]=0|Bg[t>>0],BI(Q,Q+280|0,64,0),BI(Q,t+1|0,C,o),c=0|aI(0|r,0|n,15,0),BI(Q,35416,15&c,0),Qe(Q+272|0,i,B),BI(Q,Q+272|0,8,0),B=0|aI(0|r,0|n,47,0),Qe(Q+272|0,B,hg),BI(Q,Q+272|0,8,0),HI(Q,Q+256|0),$A(Q,256),0|vA(Q+256|0,t+1+C|0,16)){$A(Q+256|0,16),a=-1;break}Te(e,t+1|0,C,o,A+32|0,2,A),Je(A+36|0,Q+256|0),de(A+32|0),(0==(2&a)?!(0|VA(A+32|0)):0)||Y(A),0|I&&(cg[I>>2]=C,cg[I+4>>2]=o),0|g?(Bg[g>>0]=a,a=0):a=0}}while(0);return Qg=E,0|a},_sodium_base642bin:function(A,e,I,g,t,r,n,a){A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,n|=0,a|=0;var i=0,B=0,c=0,C=0,o=0,Q=0,E=0,s=0,y=0;if(y=Qg,s=Qg=Qg+63&-64,Qg=Qg+16|0,cg[s>>2]=0,UI(a),g){B=0,C=0,c=0,i=0;A:for(;;){for(;Q=0|Bg[I+i>>0],255==(0|(o=4&a?0|QA(Q):0|yA(Q)));){if(!t){o=18;break A}if(!(0|DI(t,Q))){o=19;break A}if((i=i+1|0)>>>0>=g>>>0){o=17;break A}}if(C=o+(C<<6)|0,(o=B+6|0)>>>0>7){if(B=B+-2|0,c>>>0>=e>>>0){o=13;break}Bg[A+c>>0]=C>>>B,c=c+1|0}else B=o;if((i=i+1|0)>>>0>=g>>>0){o=16;break}}13==(0|o)?(cg[s>>2]=i,cg[8242]=34,i=-1):16==(0|o)?(cg[s>>2]=i,i=0):17==(0|o)?(cg[s>>2]=i,i=0):18==(0|o)?(cg[s>>2]=i,i=0):19==(0|o)&&(cg[s>>2]=i,i=0),B>>>0>4?(i=-1,c=0):o=21}else i=0,c=0,C=0,B=0,o=21;do{if(21==(0|o))if((1<<B)-1&C)i=-1,c=0;else if(i|2&a||(i=0|tA(I,g,s,t,B>>>1)),i)c=0;else if(0!=(0|t)?(E=0|cg[s>>2])>>>0<g>>>0:0){for(i=E;;){if(!(0|DI(t,0|Bg[I+i>>0]))){o=30;break}if((i=i+1|0)>>>0>=g>>>0){o=29;break}}if(29==(0|o)){cg[s>>2]=i,i=0;break}if(30==(0|o)){cg[s>>2]=i,i=0;break}}else i=0}while(0);return B=0|cg[s>>2],n?cg[n>>2]=I+B:(0|B)!=(0|g)&&(cg[8242]=22,i=-1),0|r&&(cg[r>>2]=c),Qg=y,0|i},_sodium_base64_encoded_len:function(A,e){A|=0;var I=0;return UI(e|=0),I=(0|fg((A>>>0)/3|0,-3))+A|0,(((A>>>0)/3|0)<<2|1)+(4-(3-I&0-(e>>>1&1))&0-(1&(I>>>1|I)))|0},_crypto_secretbox_open_easy:function(A,e,I,g,t,r){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,0|(A=g>>>0<0|0==(0|g)&I>>>0<16?-1:0|F(A,e+16|0,e,g=0|aI(0|I,0|g,-16,-1),hg,t,r))},_crypto_generichash_final:bI,_crypto_stream_keygen:zI,_randombytes_uniform:function(A){var e=0;if((A|=0)>>>0<2)A=0;else{do{e=0|Ag()}while(e>>>0<(((0-A|0)>>>0)%(A>>>0)|0)>>>0);A=(e>>>0)%(A>>>0)|0}return 0|A},_crypto_secretstream_xchacha20poly1305_push:function(A,e,I,g,t,r,n,a,i,B){A|=0,e|=0,g|=0,t|=0,r|=0,n|=0,a|=0,i|=0,B|=0;var c=0,C=0,o=0;C=Qg,o=Qg=Qg+63&-64,Qg=Qg+336|0,0|(I|=0)&&(cg[I>>2]=0,cg[I+4>>2]=0),r>>>0>0|0==(0|r)&t>>>0>4294967295&&ig(),sI(o+264|0,64,0,A+32|0,A),MI(o,o+264|0),$A(o+264|0,64),BI(o,n,a,i),BI(o,35416,15&(n=0|rI(0,0,0|a,0|i)),0),c=63+(n=o+264+1|0)|0;do{Bg[n>>0]=0,n=n+1|0}while((0|n)<(0|c));return Bg[o+264>>0]=B,Te(o+264|0,o+264|0,64,0,A+32|0,1,A),BI(o,o+264|0,64,0),Bg[e>>0]=0|Bg[o+264>>0],Te(e+1|0,g,t,r,A+32|0,2,A),BI(o,e+1|0,t,r),BI(o,35416,15&t,0),Qe(o+256|0,a,i),BI(o,o+256|0,8,0),i=0|aI(0|t,0|r,64,0),Qe(o+256|0,i,hg),BI(o,o+256|0,8,0),HI(o,e+1+t|0),$A(o,256),Je(A+36|0,e+1+t|0),de(A+32|0),(0==(2&B)?!(0|VA(A+32|0)):0)||Y(A),0|I&&(o=0|aI(0|t,0|r,17,0),cg[I>>2]=o,cg[I+4>>2]=hg),Qg=C,0},_crypto_kdf_derive_from_key:function(A,e,I,g,t,r){return A|=0,e|=0,I|=0,g|=0,t|=0,r|=0,0|W(A,e,I,g,t,r)},_crypto_shorthash_keygen:function(A){Ye(A|=0,16)},_crypto_aead_chacha20poly1305_ietf_npubbytes:function(){return 12}}}(P.asmGlobalArg,P.asmLibraryArg,IA),KA=(P._sodium_library_version_minor=LA._sodium_library_version_minor,P._crypto_secretstream_xchacha20poly1305_init_push=LA._crypto_secretstream_xchacha20poly1305_init_push,P._bitshift64Lshr=LA._bitshift64Lshr,P._crypto_kx_publickeybytes=LA._crypto_kx_publickeybytes,P._sodium_unpad=LA._sodium_unpad,P._crypto_secretstream_xchacha20poly1305_statebytes=LA._crypto_secretstream_xchacha20poly1305_statebytes,P._crypto_box_noncebytes=LA._crypto_box_noncebytes,P._crypto_aead_chacha20poly1305_ietf_keybytes=LA._crypto_aead_chacha20poly1305_ietf_keybytes,P._crypto_aead_chacha20poly1305_ietf_encrypt_detached=LA._crypto_aead_chacha20poly1305_ietf_encrypt_detached,P._sodium_pad=LA._sodium_pad,P._crypto_scalarmult_base=LA._crypto_scalarmult_base,P._crypto_aead_chacha20poly1305_abytes=LA._crypto_aead_chacha20poly1305_abytes,P._crypto_core_hchacha20_outputbytes=LA._crypto_core_hchacha20_outputbytes,P._crypto_auth_bytes=LA._crypto_auth_bytes,P._crypto_sign_statebytes=LA._crypto_sign_statebytes,P._crypto_sign_open=LA._crypto_sign_open,P._crypto_aead_chacha20poly1305_decrypt_detached=LA._crypto_aead_chacha20poly1305_decrypt_detached,P._sbrk=LA._sbrk,P._memcpy=LA._memcpy,P._crypto_kdf_bytes_max=LA._crypto_kdf_bytes_max,P._crypto_kdf_bytes_min=LA._crypto_kdf_bytes_min,P._crypto_box_seed_keypair=LA._crypto_box_seed_keypair,P._crypto_box_beforenmbytes=LA._crypto_box_beforenmbytes,P._crypto_box_open_easy_afternm=LA._crypto_box_open_easy_afternm,P._crypto_sign_ed25519_sk_to_curve25519=LA._crypto_sign_ed25519_sk_to_curve25519,P._emscripten_get_global_libc=LA._emscripten_get_global_libc,P._free=LA._free),XA=(P.stackAlloc=LA.stackAlloc,P._crypto_aead_chacha20poly1305_keybytes=LA._crypto_aead_chacha20poly1305_keybytes,P.stackSave=LA.stackSave,P._crypto_secretstream_xchacha20poly1305_tag_message=LA._crypto_secretstream_xchacha20poly1305_tag_message,P._crypto_box_seal=LA._crypto_box_seal,P._crypto_aead_xchacha20poly1305_ietf_keygen=LA._crypto_aead_xchacha20poly1305_ietf_keygen,P._crypto_kx_keypair=LA._crypto_kx_keypair,P.runPostSets=LA.runPostSets,P._crypto_kx_client_session_keys=LA._crypto_kx_client_session_keys,P._crypto_generichash_bytes_min=LA._crypto_generichash_bytes_min,P._crypto_shorthash=LA._crypto_shorthash,P._crypto_auth_keybytes=LA._crypto_auth_keybytes,P._crypto_aead_chacha20poly1305_npubbytes=LA._crypto_aead_chacha20poly1305_npubbytes,P._crypto_secretstream_xchacha20poly1305_tag_rekey=LA._crypto_secretstream_xchacha20poly1305_tag_rekey,P._crypto_aead_xchacha20poly1305_ietf_abytes=LA._crypto_aead_xchacha20poly1305_ietf_abytes,P._crypto_sign_seedbytes=LA._crypto_sign_seedbytes,P._crypto_box_detached_afternm=LA._crypto_box_detached_afternm,P._crypto_auth=LA._crypto_auth,P._randombytes_random=LA._randombytes_random,P._crypto_sign_keypair=LA._crypto_sign_keypair,P._crypto_generichash_keybytes_min=LA._crypto_generichash_keybytes_min,P._crypto_generichash_statebytes=LA._crypto_generichash_statebytes,P._randombytes_buf_deterministic=LA._randombytes_buf_deterministic,P._crypto_aead_chacha20poly1305_encrypt_detached=LA._crypto_aead_chacha20poly1305_encrypt_detached,P._crypto_secretstream_xchacha20poly1305_keygen=LA._crypto_secretstream_xchacha20poly1305_keygen,P._sodium_library_version_major=LA._sodium_library_version_major,P._crypto_sign_final_verify=LA._crypto_sign_final_verify,P._crypto_secretbox_keygen=LA._crypto_secretbox_keygen,P._crypto_secretstream_xchacha20poly1305_headerbytes=LA._crypto_secretstream_xchacha20poly1305_headerbytes,P._sodium_version_string=LA._sodium_version_string,P._crypto_generichash_keybytes_max=LA._crypto_generichash_keybytes_max,P._crypto_sign_ed25519_pk_to_curve25519=LA._crypto_sign_ed25519_pk_to_curve25519,P._crypto_aead_chacha20poly1305_nsecbytes=LA._crypto_aead_chacha20poly1305_nsecbytes,P._crypto_secretstream_xchacha20poly1305_push=LA._crypto_secretstream_xchacha20poly1305_push,P._crypto_generichash=LA._crypto_generichash,P.getTempRet0=LA.getTempRet0,P._crypto_aead_chacha20poly1305_ietf_nsecbytes=LA._crypto_aead_chacha20poly1305_ietf_nsecbytes,P._randombytes_stir=LA._randombytes_stir,P._crypto_aead_chacha20poly1305_ietf_encrypt=LA._crypto_aead_chacha20poly1305_ietf_encrypt,P._crypto_secretstream_xchacha20poly1305_tag_push=LA._crypto_secretstream_xchacha20poly1305_tag_push,P._crypto_core_hchacha20=LA._crypto_core_hchacha20,P._crypto_box_beforenm=LA._crypto_box_beforenm,P._crypto_aead_chacha20poly1305_ietf_decrypt=LA._crypto_aead_chacha20poly1305_ietf_decrypt,P._randombytes_close=LA._randombytes_close,P._crypto_kx_server_session_keys=LA._crypto_kx_server_session_keys,P._crypto_secretstream_xchacha20poly1305_tag_final=LA._crypto_secretstream_xchacha20poly1305_tag_final,P._crypto_core_hchacha20_constbytes=LA._crypto_core_hchacha20_constbytes,P._crypto_shorthash_bytes=LA._crypto_shorthash_bytes,P._crypto_kdf_keybytes=LA._crypto_kdf_keybytes,P.setThrew=LA.setThrew,P.establishStackSpace=LA.establishStackSpace,P._crypto_sign_final_create=LA._crypto_sign_final_create,P._crypto_aead_chacha20poly1305_encrypt=LA._crypto_aead_chacha20poly1305_encrypt,P._crypto_aead_xchacha20poly1305_ietf_decrypt_detached=LA._crypto_aead_xchacha20poly1305_ietf_decrypt_detached,P._crypto_kx_secretkeybytes=LA._crypto_kx_secretkeybytes,P._crypto_secretstream_xchacha20poly1305_messagebytes_max=LA._crypto_secretstream_xchacha20poly1305_messagebytes_max,P._crypto_secretstream_xchacha20poly1305_abytes=LA._crypto_secretstream_xchacha20poly1305_abytes,P._crypto_box_detached=LA._crypto_box_detached,P._randombytes_buf=LA._randombytes_buf,P._bitshift64Ashr=LA._bitshift64Ashr,P._crypto_generichash_init=LA._crypto_generichash_init,P._crypto_box_open_detached=LA._crypto_box_open_detached,P._crypto_scalarmult_bytes=LA._crypto_scalarmult_bytes,P._crypto_kx_seedbytes=LA._crypto_kx_seedbytes,P._crypto_auth_verify=LA._crypto_auth_verify,P._crypto_box_seal_open=LA._crypto_box_seal_open,P._crypto_secretbox_detached=LA._crypto_secretbox_detached,P._crypto_aead_xchacha20poly1305_ietf_nsecbytes=LA._crypto_aead_xchacha20poly1305_ietf_nsecbytes,P._crypto_secretbox_easy=LA._crypto_secretbox_easy,P._crypto_secretstream_xchacha20poly1305_init_pull=LA._crypto_secretstream_xchacha20poly1305_init_pull,P._crypto_aead_xchacha20poly1305_ietf_encrypt=LA._crypto_aead_xchacha20poly1305_ietf_encrypt,P._memset=LA._memset,P._crypto_generichash_keygen=LA._crypto_generichash_keygen,P._crypto_box_open_detached_afternm=LA._crypto_box_open_detached_afternm,P._sodium_bin2hex=LA._sodium_bin2hex,P._crypto_aead_xchacha20poly1305_ietf_decrypt=LA._crypto_aead_xchacha20poly1305_ietf_decrypt,P._crypto_aead_chacha20poly1305_ietf_keygen=LA._crypto_aead_chacha20poly1305_ietf_keygen,P._crypto_box_seedbytes=LA._crypto_box_seedbytes,P._crypto_core_hchacha20_inputbytes=LA._crypto_core_hchacha20_inputbytes,P._crypto_auth_keygen=LA._crypto_auth_keygen,P._crypto_hash=LA._crypto_hash,P._sodium_library_minimal=LA._sodium_library_minimal,P._crypto_box_easy_afternm=LA._crypto_box_easy_afternm,P._crypto_aead_xchacha20poly1305_ietf_encrypt_detached=LA._crypto_aead_xchacha20poly1305_ietf_encrypt_detached,P._sodium_bin2base64=LA._sodium_bin2base64,P._crypto_box_macbytes=LA._crypto_box_macbytes,P._randombytes_seedbytes=LA._randombytes_seedbytes,P._crypto_box_publickeybytes=LA._crypto_box_publickeybytes,P._crypto_box_sealbytes=LA._crypto_box_sealbytes,P._crypto_sign_secretkeybytes=LA._crypto_sign_secretkeybytes,P._crypto_box_secretkeybytes=LA._crypto_box_secretkeybytes,P._crypto_aead_xchacha20poly1305_ietf_keybytes=LA._crypto_aead_xchacha20poly1305_ietf_keybytes,P._crypto_scalarmult_scalarbytes=LA._crypto_scalarmult_scalarbytes,P._crypto_secretstream_xchacha20poly1305_rekey=LA._crypto_secretstream_xchacha20poly1305_rekey,P._crypto_shorthash_keybytes=LA._crypto_shorthash_keybytes,P._crypto_aead_chacha20poly1305_keygen=LA._crypto_aead_chacha20poly1305_keygen,P._crypto_kx_sessionkeybytes=LA._crypto_kx_sessionkeybytes,P._malloc=LA._malloc);P._crypto_aead_chacha20poly1305_decrypt=LA._crypto_aead_chacha20poly1305_decrypt,P._crypto_secretbox_open_easy=LA._crypto_secretbox_open_easy,P._crypto_aead_chacha20poly1305_ietf_decrypt_detached=LA._crypto_aead_chacha20poly1305_ietf_decrypt_detached,P._crypto_sign=LA._crypto_sign,P._crypto_secretbox_noncebytes=LA._crypto_secretbox_noncebytes,P._crypto_box_keypair=LA._crypto_box_keypair,P._i64Subtract=LA._i64Subtract,P._crypto_generichash_keybytes=LA._crypto_generichash_keybytes,P._sodium_hex2bin=LA._sodium_hex2bin,P._sodium_init=LA._sodium_init,P._crypto_secretbox_macbytes=LA._crypto_secretbox_macbytes,P._crypto_secretbox_keybytes=LA._crypto_secretbox_keybytes,P._crypto_aead_xchacha20poly1305_ietf_npubbytes=LA._crypto_aead_xchacha20poly1305_ietf_npubbytes,P._randombytes=LA._randombytes,P._crypto_sign_publickeybytes=LA._crypto_sign_publickeybytes,P._crypto_sign_update=LA._crypto_sign_update,P.setTempRet0=LA.setTempRet0,P._crypto_generichash_bytes=LA._crypto_generichash_bytes,P._crypto_generichash_bytes_max=LA._crypto_generichash_bytes_max,P._crypto_secretbox_open_detached=LA._crypto_secretbox_open_detached,P._crypto_sign_init=LA._crypto_sign_init,P._crypto_core_hchacha20_keybytes=LA._crypto_core_hchacha20_keybytes,P.___muldi3=LA.___muldi3,P._bitshift64Shl=LA._bitshift64Shl,P._crypto_sign_verify_detached=LA._crypto_sign_verify_detached,P._crypto_kx_seed_keypair=LA._crypto_kx_seed_keypair,P._crypto_box_open_easy=LA._crypto_box_open_easy,P._crypto_hash_bytes=LA._crypto_hash_bytes,P._i64Add=LA._i64Add,P._crypto_kdf_contextbytes=LA._crypto_kdf_contextbytes,P._crypto_sign_bytes=LA._crypto_sign_bytes,P._crypto_generichash_update=LA._crypto_generichash_update,P._crypto_scalarmult=LA._crypto_scalarmult,P._crypto_aead_chacha20poly1305_ietf_abytes=LA._crypto_aead_chacha20poly1305_ietf_abytes,P.stackRestore=LA.stackRestore,P._crypto_kdf_keygen=LA._crypto_kdf_keygen,P._crypto_secretstream_xchacha20poly1305_keybytes=LA._crypto_secretstream_xchacha20poly1305_keybytes,P._crypto_sign_detached=LA._crypto_sign_detached,P._crypto_box_easy=LA._crypto_box_easy,P._crypto_secretstream_xchacha20poly1305_pull=LA._crypto_secretstream_xchacha20poly1305_pull,P._sodium_base642bin=LA._sodium_base642bin,P._sodium_base64_encoded_len=LA._sodium_base64_encoded_len,P._memmove=LA._memmove,P._crypto_generichash_final=LA._crypto_generichash_final,P._crypto_stream_keygen=LA._crypto_stream_keygen,P._randombytes_uniform=LA._randombytes_uniform,P._crypto_sign_seed_keypair=LA._crypto_sign_seed_keypair,P._crypto_kdf_derive_from_key=LA._crypto_kdf_derive_from_key,P._crypto_shorthash_keygen=LA._crypto_shorthash_keygen,P._crypto_aead_chacha20poly1305_ietf_npubbytes=LA._crypto_aead_chacha20poly1305_ietf_npubbytes;if(Z.stackAlloc=P.stackAlloc,Z.stackSave=P.stackSave,Z.stackRestore=P.stackRestore,Z.establishStackSpace=P.establishStackSpace,Z.setTempRet0=P.setTempRet0,Z.getTempRet0=P.getTempRet0,P.asm=LA,SA)if("function"==typeof P.locateFile?SA=P.locateFile(SA):P.memoryInitializerPrefixURL&&(SA=P.memoryInitializerPrefixURL+SA),X||T){var TA=P.readBinary(SA);tA.set(TA,Z.GLOBAL_BASE)}else{G();var VA=function(A){A.byteLength&&(A=new Uint8Array(A)),tA.set(A,Z.GLOBAL_BASE),P.memoryInitializerRequest&&delete P.memoryInitializerRequest.response,F()};function jA(){P.readAsync(SA,VA,function(){throw"could not load memory initializer "+SA})}var ZA=Y(SA);if(ZA)VA(ZA.buffer);else if(P.memoryInitializerRequest){function OA(){var A=P.memoryInitializerRequest,e=A.response;if(200!==A.status&&0!==A.status){var I=Y(P.memoryInitializerRequestURL);if(!I)return void jA();e=I.buffer}VA(e)}P.memoryInitializerRequest.response?setTimeout(OA,0):P.memoryInitializerRequest.addEventListener("load",OA)}else jA()}S.prototype=new Error,S.prototype.constructor=S;var WA,qA=null,zA=!1;YA=function A(){P.calledRun||N(),P.calledRun||(YA=A)},P.callMain=P.callMain=function(A){function e(){for(var A=0;A<3;A++)g.push(0)}A=A||[],w();var I=A.length+1,g=[n(H(P.thisProgram),"i8",0)];e();for(var t=0;t<I-1;t+=1)g.push(n(H(A[t]),"i8",0)),e();g.push(0),g=n(g,"i32",0);try{R(P._main(I,g,0),!0)}catch(A){if(A instanceof S)return;if("SimulateInfiniteLoop"==A)return void(P.noExitRuntime=!0);var r=A;A&&"object"==typeof A&&A.stack&&(r=[A,A.stack]),P.printErr("exception thrown: "+r),P.quit(1,A)}finally{zA=!0}},P.run=P.run=N,P.exit=P.exit=R;var $A=[];if(P.abort=P.abort=U,P.preInit)for("function"==typeof P.preInit&&(P.preInit=[P.preInit]);P.preInit.length>0;)P.preInit.pop()();var Ae=!0;P.noInitialRun&&(Ae=!1),P.noExitRuntime=!0,N()}),"object"==typeof process&&process.removeAllListeners("uncaughtException"),e}"function"==typeof define&&define.amd?define(["exports"],e):"object"==typeof exports&&"string"!=typeof exports.nodeName?e(exports):A.libsodium=e(A.libsodium_mod||(A.commonJsStrict={}))}(this),function(A){function e(A,e){"use strict";function I(A){if("function"==typeof TextEncoder)return new TextEncoder("utf-8").encode(A);A=unescape(encodeURIComponent(A));for(var e=new Uint8Array(A.length),I=0;I<A.length;I++)e[I]=A.charCodeAt(I);return e}function g(A){if("function"==typeof TextDecoder)return new TextDecoder("utf-8",{fatal:!0}).decode(A);var e=Math.ceil(A.length/8192);if(e<=1)try{return decodeURIComponent(escape(String.fromCharCode.apply(null,A)))}catch(A){throw new TypeError("The encoded data was not valid.")}for(var I="",t=0,r=0;r<e;r++){var n=Array.prototype.slice.call(A,8192*r+t,8192*(r+1)+t);if(0!=n.length){var a,i=n.length,B=0;do{var c=n[--i];c>=240?(B=4,a=!0):c>=224?(B=3,a=!0):c>=192?(B=2,a=!0):c<128&&(B=1,a=!0)}while(!a);for(var C=B-(n.length-i),o=0;o<C;o++)t--,n.pop();I+=g(n)}}return I}function t(A){A=_(null,A,"input");for(var e,I,g,t="",r=0;r<A.length;r++)g=87+(I=15&A[r])+(I-10>>8&-39)<<8|87+(e=A[r]>>>4)+(e-10>>8&-39),t+=String.fromCharCode(255&g)+String.fromCharCode(g>>>8);return t}function r(A){if(void 0==A)return de.URLSAFE_NO_PADDING;if(A!==de.ORIGINAL&&A!==de.ORIGINAL_NO_PADDING&&A!==de.URLSAFE&&A!=de.URLSAFE_NO_PADDING)throw new Error("unsupported base64 variant");return A}function n(A,e){e=r(e),A=_(t,A,"input");var I,t=[],n=0|Math.floor(A.length/3),a=A.length-3*n,i=4*n+(0!==a?0==(2&e)?4:2+(a>>>1):0),B=new C(i+1),c=o(A);return t.push(c),t.push(B.address),0===we._sodium_bin2base64(B.address,B.length,c,A.length,e)&&y(t,"conversion failed"),B.length=i,I=g(B.to_Uint8Array()),s(t),I}function a(){return["uint8array","text","hex","base64"]}function i(A,e){var I=e||ue;if(!B(I))throw new Error(I+" output format is not available");if(A instanceof C){if("uint8array"===I)return A.to_Uint8Array();if("text"===I)return g(A.to_Uint8Array());if("hex"===I)return t(A.to_Uint8Array());if("base64"===I)return n(A.to_Uint8Array(),de.URLSAFE_NO_PADDING);throw new Error('What is output format "'+I+'"?')}if("object"==typeof A){for(var r=Object.keys(A),a={},c=0;c<r.length;c++)a[r[c]]=i(A[r[c]],I);return a}if("string"==typeof A)return A;throw new TypeError("Cannot format output")}function B(A){for(var e=a(),I=0;I<e.length;I++)if(e[I]===A)return!0;return!1}function c(A){if(A){if("string"!=typeof A)throw new TypeError("When defined, the output format must be a string");if(!B(A))throw new Error(A+" is not a supported output format")}}function C(A){this.length=A,this.address=Q(A)}function o(A){var e=Q(A.length);return we.HEAPU8.set(A,e),e}function Q(A){var e=we._malloc(A);if(0===e)throw{message:"_malloc() failed",length:A};return e}function E(A){we._free(A)}function s(A){if(A)for(var e=0;e<A.length;e++)E(A[e])}function y(A,e){throw s(A),new Error(e)}function h(A,e){throw s(A),new TypeError(e)}function f(A,e,I){void 0==e&&h(A,I+" cannot be null or undefined")}function _(A,e,g){return f(A,e,g),e instanceof Uint8Array?e:"string"==typeof e?I(e):void h(A,"unsupported input type for "+g)}function p(A,e,I,g,t,r){var n=[];c(r);var a=null;void 0!=A&&(a=o(A=_(n,A,"secret_nonce")),A.length,n.push(a));var B=o(e=_(n,e,"ciphertext")),Q=e.length;n.push(B);var E=null,f=0;void 0!=I&&(E=o(I=_(n,I,"additional_data")),f=I.length,n.push(E)),g=_(n,g,"public_nonce");var p,w=0|we._crypto_aead_chacha20poly1305_npubbytes();g.length!==w&&h(n,"invalid public_nonce length"),p=o(g),n.push(p),t=_(n,t,"key");var u,l=0|we._crypto_aead_chacha20poly1305_keybytes();t.length!==l&&h(n,"invalid key length"),u=o(t),n.push(u);var d=new C(Q-we._crypto_aead_chacha20poly1305_abytes()|0),D=d.address;if(n.push(D),0===we._crypto_aead_chacha20poly1305_decrypt(D,null,a,B,Q,0,E,f,0,p,u)){var v=i(d,r);return s(n),v}y(n,"incorrect usage")}function w(A,e,I,g,t,r,n){var a=[];c(n);var B=null;void 0!=A&&(B=o(A=_(a,A,"secret_nonce")),A.length,a.push(B));var Q=o(e=_(a,e,"ciphertext")),E=e.length;a.push(Q),I=_(a,I,"mac");var f,p=0|we._crypto_box_macbytes();I.length!==p&&h(a,"invalid mac length"),f=o(I),a.push(f);var w=null,u=0;void 0!=g&&(w=o(g=_(a,g,"additional_data")),u=g.length,a.push(w)),t=_(a,t,"public_nonce");var l,d=0|we._crypto_aead_chacha20poly1305_npubbytes();t.length!==d&&h(a,"invalid public_nonce length"),l=o(t),a.push(l),r=_(a,r,"key");var D,v=0|we._crypto_aead_chacha20poly1305_keybytes();r.length!==v&&h(a,"invalid key length"),D=o(r),a.push(D);var k=new C(0|E),b=k.address;if(a.push(b),0===we._crypto_aead_chacha20poly1305_decrypt_detached(b,B,Q,E,0,f,w,u,0,l,D)){var G=i(k,n);return s(a),G}y(a,"incorrect usage")}function u(A,e,I,g,t,r){var n=[];c(r);var a=o(A=_(n,A,"message")),B=A.length;n.push(a);var Q=null,E=0;void 0!=e&&(Q=o(e=_(n,e,"additional_data")),E=e.length,n.push(Q));var f=null;void 0!=I&&(f=o(I=_(n,I,"secret_nonce")),I.length,n.push(f)),g=_(n,g,"public_nonce");var p,w=0|we._crypto_aead_chacha20poly1305_npubbytes();g.length!==w&&h(n,"invalid public_nonce length"),p=o(g),n.push(p),t=_(n,t,"key");var u,l=0|we._crypto_aead_chacha20poly1305_keybytes();t.length!==l&&h(n,"invalid key length"),u=o(t),n.push(u);var d=new C(B+we._crypto_aead_chacha20poly1305_abytes()|0),D=d.address;if(n.push(D),0===we._crypto_aead_chacha20poly1305_encrypt(D,null,a,B,0,Q,E,0,f,p,u)){var v=i(d,r);return s(n),v}y(n,"incorrect usage")}function l(A,e,I,g,t,r){var n=[];c(r);var a=o(A=_(n,A,"message")),B=A.length;n.push(a);var Q=null,E=0;void 0!=e&&(Q=o(e=_(n,e,"additional_data")),E=e.length,n.push(Q));var f=null;void 0!=I&&(f=o(I=_(n,I,"secret_nonce")),I.length,n.push(f)),g=_(n,g,"public_nonce");var p,w=0|we._crypto_aead_chacha20poly1305_npubbytes();g.length!==w&&h(n,"invalid public_nonce length"),p=o(g),n.push(p),t=_(n,t,"key");var u,l=0|we._crypto_aead_chacha20poly1305_keybytes();t.length!==l&&h(n,"invalid key length"),u=o(t),n.push(u);var d=new C(0|B),D=d.address;n.push(D);var v=new C(0|we._crypto_aead_chacha20poly1305_abytes()),k=v.address;if(n.push(k),0===we._crypto_aead_chacha20poly1305_encrypt_detached(D,k,null,a,B,0,Q,E,0,f,p,u)){var b=i({ciphertext:d,mac:v},r);return s(n),b}y(n,"incorrect usage")}function d(A,e,I,g,t,r){var n=[];c(r);var a=null;void 0!=A&&(a=o(A=_(n,A,"secret_nonce")),A.length,n.push(a));var B=o(e=_(n,e,"ciphertext")),Q=e.length;n.push(B);var E=null,f=0;void 0!=I&&(E=o(I=_(n,I,"additional_data")),f=I.length,n.push(E)),g=_(n,g,"public_nonce");var p,w=0|we._crypto_aead_chacha20poly1305_ietf_npubbytes();g.length!==w&&h(n,"invalid public_nonce length"),p=o(g),n.push(p),t=_(n,t,"key");var u,l=0|we._crypto_aead_chacha20poly1305_ietf_keybytes();t.length!==l&&h(n,"invalid key length"),u=o(t),n.push(u);var d=new C(Q-we._crypto_aead_chacha20poly1305_ietf_abytes()|0),D=d.address;if(n.push(D),0===we._crypto_aead_chacha20poly1305_ietf_decrypt(D,null,a,B,Q,0,E,f,0,p,u)){var v=i(d,r);return s(n),v}y(n,"incorrect usage")}function D(A,e,I,g,t,r,n){var a=[];c(n);var B=null;void 0!=A&&(B=o(A=_(a,A,"secret_nonce")),A.length,a.push(B));var Q=o(e=_(a,e,"ciphertext")),E=e.length;a.push(Q),I=_(a,I,"mac");var f,p=0|we._crypto_box_macbytes();I.length!==p&&h(a,"invalid mac length"),f=o(I),a.push(f);var w=null,u=0;void 0!=g&&(w=o(g=_(a,g,"additional_data")),u=g.length,a.push(w)),t=_(a,t,"public_nonce");var l,d=0|we._crypto_aead_chacha20poly1305_ietf_npubbytes();t.length!==d&&h(a,"invalid public_nonce length"),l=o(t),a.push(l),r=_(a,r,"key");var D,v=0|we._crypto_aead_chacha20poly1305_ietf_keybytes();r.length!==v&&h(a,"invalid key length"),D=o(r),a.push(D);var k=new C(0|E),b=k.address;if(a.push(b),0===we._crypto_aead_chacha20poly1305_ietf_decrypt_detached(b,B,Q,E,0,f,w,u,0,l,D)){var G=i(k,n);return s(a),G}y(a,"incorrect usage")}function v(A,e,I,g,t,r){var n=[];c(r);var a=o(A=_(n,A,"message")),B=A.length;n.push(a);var Q=null,E=0;void 0!=e&&(Q=o(e=_(n,e,"additional_data")),E=e.length,n.push(Q));var f=null;void 0!=I&&(f=o(I=_(n,I,"secret_nonce")),I.length,n.push(f)),g=_(n,g,"public_nonce");var p,w=0|we._crypto_aead_chacha20poly1305_ietf_npubbytes();g.length!==w&&h(n,"invalid public_nonce length"),p=o(g),n.push(p),t=_(n,t,"key");var u,l=0|we._crypto_aead_chacha20poly1305_ietf_keybytes();t.length!==l&&h(n,"invalid key length"),u=o(t),n.push(u);var d=new C(B+we._crypto_aead_chacha20poly1305_ietf_abytes()|0),D=d.address;if(n.push(D),0===we._crypto_aead_chacha20poly1305_ietf_encrypt(D,null,a,B,0,Q,E,0,f,p,u)){var v=i(d,r);return s(n),v}y(n,"incorrect usage")}function k(A,e,I,g,t,r){var n=[];c(r);var a=o(A=_(n,A,"message")),B=A.length;n.push(a);var Q=null,E=0;void 0!=e&&(Q=o(e=_(n,e,"additional_data")),E=e.length,n.push(Q));var f=null;void 0!=I&&(f=o(I=_(n,I,"secret_nonce")),I.length,n.push(f)),g=_(n,g,"public_nonce");var p,w=0|we._crypto_aead_chacha20poly1305_ietf_npubbytes();g.length!==w&&h(n,"invalid public_nonce length"),p=o(g),n.push(p),t=_(n,t,"key");var u,l=0|we._crypto_aead_chacha20poly1305_ietf_keybytes();t.length!==l&&h(n,"invalid key length"),u=o(t),n.push(u);var d=new C(0|B),D=d.address;n.push(D);var v=new C(0|we._crypto_aead_chacha20poly1305_ietf_abytes()),k=v.address;if(n.push(k),0===we._crypto_aead_chacha20poly1305_ietf_encrypt_detached(D,k,null,a,B,0,Q,E,0,f,p,u)){var b=i({ciphertext:d,mac:v},r);return s(n),b}y(n,"incorrect usage")}function b(A){var e=[];c(A);var I=new C(0|we._crypto_aead_chacha20poly1305_ietf_keybytes()),g=I.address;e.push(g),we._crypto_aead_chacha20poly1305_ietf_keygen(g);var t=i(I,A);return s(e),t}function G(A){var e=[];c(A);var I=new C(0|we._crypto_aead_chacha20poly1305_keybytes()),g=I.address;e.push(g),we._crypto_aead_chacha20poly1305_keygen(g);var t=i(I,A);return s(e),t}function F(A,e,I,g,t,r){var n=[];c(r);var a=null;void 0!=A&&(a=o(A=_(n,A,"secret_nonce")),A.length,n.push(a));var B=o(e=_(n,e,"ciphertext")),Q=e.length;n.push(B);var E=null,f=0;void 0!=I&&(E=o(I=_(n,I,"additional_data")),f=I.length,n.push(E)),g=_(n,g,"public_nonce");var p,w=0|we._crypto_aead_xchacha20poly1305_ietf_npubbytes();g.length!==w&&h(n,"invalid public_nonce length"),p=o(g),n.push(p),t=_(n,t,"key");var u,l=0|we._crypto_aead_xchacha20poly1305_ietf_keybytes();t.length!==l&&h(n,"invalid key length"),u=o(t),n.push(u);var d=new C(Q-we._crypto_aead_xchacha20poly1305_ietf_abytes()|0),D=d.address;if(n.push(D),0===we._crypto_aead_xchacha20poly1305_ietf_decrypt(D,null,a,B,Q,0,E,f,0,p,u)){var v=i(d,r);return s(n),v}y(n,"incorrect usage")}function m(A,e,I,g,t,r,n){var a=[];c(n);var B=null;void 0!=A&&(B=o(A=_(a,A,"secret_nonce")),A.length,a.push(B));var Q=o(e=_(a,e,"ciphertext")),E=e.length;a.push(Q),I=_(a,I,"mac");var f,p=0|we._crypto_box_macbytes();I.length!==p&&h(a,"invalid mac length"),f=o(I),a.push(f);var w=null,u=0;void 0!=g&&(w=o(g=_(a,g,"additional_data")),u=g.length,a.push(w)),t=_(a,t,"public_nonce");var l,d=0|we._crypto_aead_xchacha20poly1305_ietf_npubbytes();t.length!==d&&h(a,"invalid public_nonce length"),l=o(t),a.push(l),r=_(a,r,"key");var D,v=0|we._crypto_aead_xchacha20poly1305_ietf_keybytes();r.length!==v&&h(a,"invalid key length"),D=o(r),a.push(D);var k=new C(0|E),b=k.address;if(a.push(b),0===we._crypto_aead_xchacha20poly1305_ietf_decrypt_detached(b,B,Q,E,0,f,w,u,0,l,D)){var G=i(k,n);return s(a),G}y(a,"incorrect usage")}function H(A,e,I,g,t,r){var n=[];c(r);var a=o(A=_(n,A,"message")),B=A.length;n.push(a);var Q=null,E=0;void 0!=e&&(Q=o(e=_(n,e,"additional_data")),E=e.length,n.push(Q));var f=null;void 0!=I&&(f=o(I=_(n,I,"secret_nonce")),I.length,n.push(f)),g=_(n,g,"public_nonce");var p,w=0|we._crypto_aead_xchacha20poly1305_ietf_npubbytes();g.length!==w&&h(n,"invalid public_nonce length"),p=o(g),n.push(p),t=_(n,t,"key");var u,l=0|we._crypto_aead_xchacha20poly1305_ietf_keybytes();t.length!==l&&h(n,"invalid key length"),u=o(t),n.push(u);var d=new C(B+we._crypto_aead_xchacha20poly1305_ietf_abytes()|0),D=d.address;if(n.push(D),0===we._crypto_aead_xchacha20poly1305_ietf_encrypt(D,null,a,B,0,Q,E,0,f,p,u)){var v=i(d,r);return s(n),v}y(n,"incorrect usage")}function M(A,e,I,g,t,r){var n=[];c(r);var a=o(A=_(n,A,"message")),B=A.length;n.push(a);var Q=null,E=0;void 0!=e&&(Q=o(e=_(n,e,"additional_data")),E=e.length,n.push(Q));var f=null;void 0!=I&&(f=o(I=_(n,I,"secret_nonce")),I.length,n.push(f)),g=_(n,g,"public_nonce");var p,w=0|we._crypto_aead_xchacha20poly1305_ietf_npubbytes();g.length!==w&&h(n,"invalid public_nonce length"),p=o(g),n.push(p),t=_(n,t,"key");var u,l=0|we._crypto_aead_xchacha20poly1305_ietf_keybytes();t.length!==l&&h(n,"invalid key length"),u=o(t),n.push(u);var d=new C(0|B),D=d.address;n.push(D);var v=new C(0|we._crypto_aead_xchacha20poly1305_ietf_abytes()),k=v.address;if(n.push(k),0===we._crypto_aead_xchacha20poly1305_ietf_encrypt_detached(D,k,null,a,B,0,Q,E,0,f,p,u)){var b=i({ciphertext:d,mac:v},r);return s(n),b}y(n,"incorrect usage")}function Y(A){var e=[];c(A);var I=new C(0|we._crypto_aead_xchacha20poly1305_ietf_keybytes()),g=I.address;e.push(g),we._crypto_aead_xchacha20poly1305_ietf_keygen(g);var t=i(I,A);return s(e),t}function S(A,e,I){var g=[];c(I);var t=o(A=_(g,A,"message")),r=A.length;g.push(t),e=_(g,e,"key");var n,a=0|we._crypto_auth_keybytes();e.length!==a&&h(g,"invalid key length"),n=o(e),g.push(n);var B=new C(0|we._crypto_auth_bytes()),Q=B.address;if(g.push(Q),0==(0|we._crypto_auth(Q,t,r,0,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function N(A,e,I){var g=[];c(I);var t=o(A=_(g,A,"message")),r=A.length;g.push(t),e=_(g,e,"key");var n,a=0|we._crypto_auth_hmacsha256_keybytes();e.length!==a&&h(g,"invalid key length"),n=o(e),g.push(n);var B=new C(0|we._crypto_auth_hmacsha256_bytes()),Q=B.address;if(g.push(Q),0==(0|we._crypto_auth_hmacsha256(Q,t,r,0,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function R(A){var e=[];c(A);var I=new C(0|we._crypto_auth_hmacsha256_keybytes()),g=I.address;e.push(g),we._crypto_auth_hmacsha256_keygen(g);var t=i(I,A);return s(e),t}function U(A,e,I){var g=[];A=_(g,A,"tag");var t,r=0|we._crypto_auth_hmacsha256_bytes();A.length!==r&&h(g,"invalid tag length"),t=o(A),g.push(t);var n=o(e=_(g,e,"message")),a=e.length;g.push(n),I=_(g,I,"key");var i,B=0|we._crypto_auth_hmacsha256_keybytes();I.length!==B&&h(g,"invalid key length"),i=o(I),g.push(i);var c=0===(0|we._crypto_auth_hmacsha256_verify(t,n,a,0,i));return s(g),c}function P(A,e,I){var g=[];c(I);var t=o(A=_(g,A,"message")),r=A.length;g.push(t),e=_(g,e,"key");var n,a=0|we._crypto_auth_hmacsha512_keybytes();e.length!==a&&h(g,"invalid key length"),n=o(e),g.push(n);var B=new C(0|we._crypto_auth_hmacsha512_bytes()),Q=B.address;if(g.push(Q),0==(0|we._crypto_auth_hmacsha512(Q,t,r,0,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function J(A){var e=[];c(A);var I=new C(0|we._crypto_auth_hmacsha512_keybytes()),g=I.address;e.push(g),we._crypto_auth_hmacsha512_keygen(g);var t=i(I,A);return s(e),t}function x(A,e,I){var g=[];A=_(g,A,"tag");var t,r=0|we._crypto_auth_hmacsha512_bytes();A.length!==r&&h(g,"invalid tag length"),t=o(A),g.push(t);var n=o(e=_(g,e,"message")),a=e.length;g.push(n),I=_(g,I,"key");var i,B=0|we._crypto_auth_hmacsha512_keybytes();I.length!==B&&h(g,"invalid key length"),i=o(I),g.push(i);var c=0===(0|we._crypto_auth_hmacsha512_verify(t,n,a,0,i));return s(g),c}function L(A){var e=[];c(A);var I=new C(0|we._crypto_auth_keybytes()),g=I.address;e.push(g),we._crypto_auth_keygen(g);var t=i(I,A);return s(e),t}function K(A,e,I){var g=[];A=_(g,A,"tag");var t,r=0|we._crypto_auth_bytes();A.length!==r&&h(g,"invalid tag length"),t=o(A),g.push(t);var n=o(e=_(g,e,"message")),a=e.length;g.push(n),I=_(g,I,"key");var i,B=0|we._crypto_auth_keybytes();I.length!==B&&h(g,"invalid key length"),i=o(I),g.push(i);var c=0===(0|we._crypto_auth_verify(t,n,a,0,i));return s(g),c}function X(A,e,I){var g=[];c(I),A=_(g,A,"publicKey");var t,r=0|we._crypto_box_publickeybytes();A.length!==r&&h(g,"invalid publicKey length"),t=o(A),g.push(t),e=_(g,e,"privateKey");var n,a=0|we._crypto_box_secretkeybytes();e.length!==a&&h(g,"invalid privateKey length"),n=o(e),g.push(n);var B=new C(0|we._crypto_box_beforenmbytes()),Q=B.address;if(g.push(Q),0==(0|we._crypto_box_beforenm(Q,t,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function T(A,e,I,g,t){var r=[];c(t);var n=o(A=_(r,A,"message")),a=A.length;r.push(n),e=_(r,e,"nonce");var B,Q=0|we._crypto_box_noncebytes();e.length!==Q&&h(r,"invalid nonce length"),B=o(e),r.push(B),I=_(r,I,"publicKey");var E,f=0|we._crypto_box_publickeybytes();I.length!==f&&h(r,"invalid publicKey length"),E=o(I),r.push(E),g=_(r,g,"privateKey");var p,w=0|we._crypto_box_secretkeybytes();g.length!==w&&h(r,"invalid privateKey length"),p=o(g),r.push(p);var u=new C(0|a),l=u.address;r.push(l);var d=new C(0|we._crypto_box_macbytes()),D=d.address;if(r.push(D),0==(0|we._crypto_box_detached(l,D,n,a,0,B,E,p))){var v=i({ciphertext:u,mac:d},t);return s(r),v}y(r,"incorrect usage")}function V(A,e,I,g,t){var r=[];c(t);var n=o(A=_(r,A,"message")),a=A.length;r.push(n),e=_(r,e,"nonce");var B,Q=0|we._crypto_box_noncebytes();e.length!==Q&&h(r,"invalid nonce length"),B=o(e),r.push(B),I=_(r,I,"publicKey");var E,f=0|we._crypto_box_publickeybytes();I.length!==f&&h(r,"invalid publicKey length"),E=o(I),r.push(E),g=_(r,g,"privateKey");var p,w=0|we._crypto_box_secretkeybytes();g.length!==w&&h(r,"invalid privateKey length"),p=o(g),r.push(p);var u=new C(a+we._crypto_box_macbytes()|0),l=u.address;if(r.push(l),0==(0|we._crypto_box_easy(l,n,a,0,B,E,p))){var d=i(u,t);return s(r),d}y(r,"incorrect usage")}function j(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"message")),n=A.length;t.push(r),e=_(t,e,"nonce");var a,B=0|we._crypto_box_noncebytes();e.length!==B&&h(t,"invalid nonce length"),a=o(e),t.push(a),I=_(t,I,"sharedKey");var Q,E=0|we._crypto_box_beforenmbytes();I.length!==E&&h(t,"invalid sharedKey length"),Q=o(I),t.push(Q);var f=new C(n+we._crypto_box_macbytes()|0),p=f.address;if(t.push(p),0==(0|we._crypto_box_easy_afternm(p,r,n,0,a,Q))){var w=i(f,g);return s(t),w}y(t,"incorrect usage")}function Z(A){var e=[];c(A);var I=new C(0|we._crypto_box_publickeybytes()),g=I.address;e.push(g);var t=new C(0|we._crypto_box_secretkeybytes()),r=t.address;if(e.push(r),0==(0|we._crypto_box_keypair(g,r))){var n={publicKey:i(I,A),privateKey:i(t,A),keyType:"x25519"};return s(e),n}y(e,"incorrect usage")}function O(A,e,I,g,t,r){var n=[];c(r);var a=o(A=_(n,A,"ciphertext")),B=A.length;n.push(a),e=_(n,e,"mac");var Q,E=0|we._crypto_box_macbytes();e.length!==E&&h(n,"invalid mac length"),Q=o(e),n.push(Q),I=_(n,I,"nonce");var f,p=0|we._crypto_box_noncebytes();I.length!==p&&h(n,"invalid nonce length"),f=o(I),n.push(f),g=_(n,g,"publicKey");var w,u=0|we._crypto_box_publickeybytes();g.length!==u&&h(n,"invalid publicKey length"),w=o(g),n.push(w),t=_(n,t,"privateKey");var l,d=0|we._crypto_box_secretkeybytes();t.length!==d&&h(n,"invalid privateKey length"),l=o(t),n.push(l);var D=new C(0|B),v=D.address;if(n.push(v),0==(0|we._crypto_box_open_detached(v,a,Q,B,0,f,w,l))){var k=i(D,r);return s(n),k}y(n,"incorrect usage")}function W(A,e,I,g,t){var r=[];c(t);var n=o(A=_(r,A,"ciphertext")),a=A.length;r.push(n),e=_(r,e,"nonce");var B,Q=0|we._crypto_box_noncebytes();e.length!==Q&&h(r,"invalid nonce length"),B=o(e),r.push(B),I=_(r,I,"publicKey");var E,f=0|we._crypto_box_publickeybytes();I.length!==f&&h(r,"invalid publicKey length"),E=o(I),r.push(E),g=_(r,g,"privateKey");var p,w=0|we._crypto_box_secretkeybytes();g.length!==w&&h(r,"invalid privateKey length"),p=o(g),r.push(p);var u=new C(a-we._crypto_box_macbytes()|0),l=u.address;if(r.push(l),0==(0|we._crypto_box_open_easy(l,n,a,0,B,E,p))){var d=i(u,t);return s(r),d}y(r,"incorrect usage")}function q(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"ciphertext")),n=A.length;t.push(r),e=_(t,e,"nonce");var a,B=0|we._crypto_box_noncebytes();e.length!==B&&h(t,"invalid nonce length"),a=o(e),t.push(a),I=_(t,I,"sharedKey");var Q,E=0|we._crypto_box_beforenmbytes();I.length!==E&&h(t,"invalid sharedKey length"),Q=o(I),t.push(Q);var f=new C(n-we._crypto_box_macbytes()|0),p=f.address;if(t.push(p),0==(0|we._crypto_box_open_easy_afternm(p,r,n,0,a,Q))){var w=i(f,g);return s(t),w}y(t,"incorrect usage")}function z(A,e,I){var g=[];c(I);var t=o(A=_(g,A,"message")),r=A.length;g.push(t),e=_(g,e,"publicKey");var n,a=0|we._crypto_box_publickeybytes();e.length!==a&&h(g,"invalid publicKey length"),n=o(e),g.push(n);var B=new C(r+we._crypto_box_sealbytes()|0),Q=B.address;if(g.push(Q),0==(0|we._crypto_box_seal(Q,t,r,0,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function $(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"ciphertext")),n=A.length;t.push(r),e=_(t,e,"publicKey");var a,B=0|we._crypto_box_publickeybytes();e.length!==B&&h(t,"invalid publicKey length"),a=o(e),t.push(a),I=_(t,I,"privateKey");var Q,E=0|we._crypto_box_secretkeybytes();I.length!==E&&h(t,"invalid privateKey length"),Q=o(I),t.push(Q);var f=new C(n-we._crypto_box_sealbytes()|0),p=f.address;if(t.push(p),0==(0|we._crypto_box_seal_open(p,r,n,0,a,Q))){var w=i(f,g);return s(t),w}y(t,"incorrect usage")}function AA(A,e){var I=[];c(e),A=_(I,A,"seed");var g,t=0|we._crypto_box_seedbytes();A.length!==t&&h(I,"invalid seed length"),g=o(A),I.push(g);var r=new C(0|we._crypto_box_publickeybytes()),n=r.address;I.push(n);var a=new C(0|we._crypto_box_secretkeybytes()),B=a.address;if(I.push(B),0==(0|we._crypto_box_seed_keypair(n,B,g))){var Q={publicKey:i(r,e),privateKey:i(a,e),keyType:"x25519"};return s(I),Q}y(I,"incorrect usage")}function eA(A,e,I,g){var t=[];c(g),f(t,A,"hash_length"),("number"!=typeof A||(0|A)!==A||A<0)&&h(t,"hash_length must be an unsigned integer");var r=o(e=_(t,e,"message")),n=e.length;t.push(r);var a=null,B=0;void 0!=I&&(a=o(I=_(t,I,"key")),B=I.length,t.push(a));var Q=new C(A=0|A),E=Q.address;if(t.push(E),0==(0|we._crypto_generichash(E,A,r,n,0,a,B))){var p=i(Q,g);return s(t),p}y(t,"incorrect usage")}function IA(A,e,I){var g=[];c(I),f(g,A,"state_address"),f(g,e,"hash_length"),("number"!=typeof e||(0|e)!==e||e<0)&&h(g,"hash_length must be an unsigned integer");var t=new C(e=0|e),r=t.address;if(g.push(r),0==(0|we._crypto_generichash_final(A,r,e))){var n=(we._free(A),i(t,I));return s(g),n}y(g,"incorrect usage")}function gA(A,e,I){var g=[];c(I);var t=null,r=0;void 0!=A&&(t=o(A=_(g,A,"key")),r=A.length,g.push(t)),f(g,e,"hash_length"),("number"!=typeof e||(0|e)!==e||e<0)&&h(g,"hash_length must be an unsigned integer");var n=new C(357).address;if(0==(0|we._crypto_generichash_init(n,t,r,e))){var a=n;return s(g),a}y(g,"incorrect usage")}function tA(A){var e=[];c(A);var I=new C(0|we._crypto_generichash_keybytes()),g=I.address;e.push(g),we._crypto_generichash_keygen(g);var t=i(I,A);return s(e),t}function rA(A,e,I){var g=[];c(I),f(g,A,"state_address");var t=o(e=_(g,e,"message_chunk")),r=e.length;g.push(t),0!=(0|we._crypto_generichash_update(A,t,r))?y(g,"incorrect usage"):s(g)}function nA(A,e){var I=[];c(e);var g=o(A=_(I,A,"message")),t=A.length;I.push(g);var r=new C(0|we._crypto_hash_bytes()),n=r.address;if(I.push(n),0==(0|we._crypto_hash(n,g,t,0))){var a=i(r,e);return s(I),a}y(I,"incorrect usage")}function aA(A,e){var I=[];c(e);var g=o(A=_(I,A,"message")),t=A.length;I.push(g);var r=new C(0|we._crypto_hash_sha256_bytes()),n=r.address;if(I.push(n),0==(0|we._crypto_hash_sha256(n,g,t,0))){var a=i(r,e);return s(I),a}y(I,"incorrect usage")}function iA(A,e){var I=[];c(e);var g=o(A=_(I,A,"message")),t=A.length;I.push(g);var r=new C(0|we._crypto_hash_sha512_bytes()),n=r.address;if(I.push(n),0==(0|we._crypto_hash_sha512(n,g,t,0))){var a=i(r,e);return s(I),a}y(I,"incorrect usage")}function BA(A,e,g,t,r){var n=[];c(r),f(n,A,"subkey_len"),("number"!=typeof A||(0|A)!==A||A<0)&&h(n,"subkey_len must be an unsigned integer"),f(n,e,"subkey_id"),("number"!=typeof e||(0|e)!==e||e<0)&&h(n,"subkey_id must be an unsigned integer");var a=o(g=I(g+"\0"));g.length;n.push(a),t=_(n,t,"key");var B,Q=0|we._crypto_kdf_keybytes();t.length!==Q&&h(n,"invalid key length"),B=o(t),n.push(B);var E=new C(0|A),y=E.address;n.push(y),we._crypto_kdf_derive_from_key(y,A,e,0,a,B);var p=i(E,r);return s(n),p}function cA(A){var e=[];c(A);var I=new C(0|we._crypto_kdf_keybytes()),g=I.address;e.push(g),we._crypto_kdf_keygen(g);var t=i(I,A);return s(e),t}function CA(A,e,I,g){var t=[];c(g),A=_(t,A,"clientPublicKey");var r,n=0|we._crypto_kx_publickeybytes();A.length!==n&&h(t,"invalid clientPublicKey length"),r=o(A),t.push(r),e=_(t,e,"clientSecretKey");var a,B=0|we._crypto_kx_secretkeybytes();e.length!==B&&h(t,"invalid clientSecretKey length"),a=o(e),t.push(a),I=_(t,I,"serverPublicKey");var Q,E=0|we._crypto_kx_publickeybytes();I.length!==E&&h(t,"invalid serverPublicKey length"),Q=o(I),t.push(Q);var f=new C(0|we._crypto_kx_sessionkeybytes()),p=f.address;t.push(p);var w=new C(0|we._crypto_kx_sessionkeybytes()),u=w.address;if(t.push(u),0==(0|we._crypto_kx_client_session_keys(p,u,r,a,Q))){var l=i({sharedRx:f,sharedTx:w},g);return s(t),l}y(t,"incorrect usage")}function oA(A){var e=[];c(A);var I=new C(0|we._crypto_kx_publickeybytes()),g=I.address;e.push(g);var t=new C(0|we._crypto_kx_secretkeybytes()),r=t.address;if(e.push(r),0==(0|we._crypto_kx_keypair(g,r))){var n={publicKey:i(I,A),privateKey:i(t,A),keyType:"x25519"};return s(e),n}y(e,"incorrect usage")}function QA(A,e){var I=[];c(e),A=_(I,A,"seed");var g,t=0|we._crypto_kx_seedbytes();A.length!==t&&h(I,"invalid seed length"),g=o(A),I.push(g);var r=new C(0|we._crypto_kx_publickeybytes()),n=r.address;I.push(n);var a=new C(0|we._crypto_kx_secretkeybytes()),B=a.address;if(I.push(B),0==(0|we._crypto_kx_seed_keypair(n,B,g))){var Q={publicKey:i(r,e),privateKey:i(a,e),keyType:"x25519"};return s(I),Q}y(I,"incorrect usage")}function EA(A,e,I,g){var t=[];c(g),A=_(t,A,"serverPublicKey");var r,n=0|we._crypto_kx_publickeybytes();A.length!==n&&h(t,"invalid serverPublicKey length"),r=o(A),t.push(r),e=_(t,e,"serverSecretKey");var a,B=0|we._crypto_kx_secretkeybytes();e.length!==B&&h(t,"invalid serverSecretKey length"),a=o(e),t.push(a),I=_(t,I,"clientPublicKey");var Q,E=0|we._crypto_kx_publickeybytes();I.length!==E&&h(t,"invalid clientPublicKey length"),Q=o(I),t.push(Q);var f=new C(0|we._crypto_kx_sessionkeybytes()),p=f.address;t.push(p);var w=new C(0|we._crypto_kx_sessionkeybytes()),u=w.address;if(t.push(u),0==(0|we._crypto_kx_server_session_keys(p,u,r,a,Q))){var l=i({sharedRx:f,sharedTx:w},g);return s(t),l}y(t,"incorrect usage")}function sA(A,e,I){var g=[];c(I);var t=o(A=_(g,A,"message")),r=A.length;g.push(t),e=_(g,e,"key");var n,a=0|we._crypto_onetimeauth_keybytes();e.length!==a&&h(g,"invalid key length"),n=o(e),g.push(n);var B=new C(0|we._crypto_onetimeauth_bytes()),Q=B.address;if(g.push(Q),0==(0|we._crypto_onetimeauth(Q,t,r,0,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function yA(A,e){var I=[];c(e),f(I,A,"state_address");var g=new C(0|we._crypto_onetimeauth_bytes()),t=g.address;if(I.push(t),0==(0|we._crypto_onetimeauth_final(A,t))){var r=(we._free(A),i(g,e));return s(I),r}y(I,"incorrect usage")}function hA(A,e){var I=[];c(e);var g=null;void 0!=A&&(g=o(A=_(I,A,"key")),A.length,I.push(g));var t=new C(144).address;if(0==(0|we._crypto_onetimeauth_init(t,g))){var r=t;return s(I),r}y(I,"incorrect usage")}function fA(A){var e=[];c(A);var I=new C(0|we._crypto_onetimeauth_keybytes()),g=I.address;e.push(g),we._crypto_onetimeauth_keygen(g);var t=i(I,A);return s(e),t}function _A(A,e,I){var g=[];c(I),f(g,A,"state_address");var t=o(e=_(g,e,"message_chunk")),r=e.length;g.push(t),0!=(0|we._crypto_onetimeauth_update(A,t,r))?y(g,"incorrect usage"):s(g)}function pA(A,e,I){var g=[];A=_(g,A,"hash");var t,r=0|we._crypto_onetimeauth_bytes();A.length!==r&&h(g,"invalid hash length"),t=o(A),g.push(t);var n=o(e=_(g,e,"message")),a=e.length;g.push(n),I=_(g,I,"key");var i,B=0|we._crypto_onetimeauth_keybytes();I.length!==B&&h(g,"invalid key length"),i=o(I),g.push(i);var c=0===(0|we._crypto_onetimeauth_verify(t,n,a,0,i));return s(g),c}function wA(A,e,I,g,t,r,n){var a=[];c(n),f(a,A,"keyLength"),("number"!=typeof A||(0|A)!==A||A<0)&&h(a,"keyLength must be an unsigned integer");var B=o(e=_(a,e,"password")),Q=e.length;a.push(B),I=_(a,I,"salt");var E,p=0|we._crypto_pwhash_saltbytes();I.length!==p&&h(a,"invalid salt length"),E=o(I),a.push(E),f(a,g,"opsLimit"),("number"!=typeof g||(0|g)!==g||g<0)&&h(a,"opsLimit must be an unsigned integer"),f(a,t,"memLimit"),("number"!=typeof t||(0|t)!==t||t<0)&&h(a,"memLimit must be an unsigned integer"),f(a,r,"algorithm"),("number"!=typeof r||(0|r)!==r||r<0)&&h(a,"algorithm must be an unsigned integer");var w=new C(0|A),u=w.address;if(a.push(u),0==(0|we._crypto_pwhash(u,A,0,B,Q,0,E,g,0,t,r))){var l=i(w,n);return s(a),l}y(a,"incorrect usage")}function uA(A,e,I,g,t,r){var n=[];c(r),f(n,A,"keyLength"),("number"!=typeof A||(0|A)!==A||A<0)&&h(n,"keyLength must be an unsigned integer");var a=o(e=_(n,e,"password")),B=e.length;n.push(a),I=_(n,I,"salt");var Q,E=0|we._crypto_pwhash_scryptsalsa208sha256_saltbytes();I.length!==E&&h(n,"invalid salt length"),Q=o(I),n.push(Q),f(n,g,"opsLimit"),("number"!=typeof g||(0|g)!==g||g<0)&&h(n,"opsLimit must be an unsigned integer"),f(n,t,"memLimit"),("number"!=typeof t||(0|t)!==t||t<0)&&h(n,"memLimit must be an unsigned integer");var p=new C(0|A),w=p.address;if(n.push(w),0==(0|we._crypto_pwhash_scryptsalsa208sha256(w,A,0,a,B,0,Q,g,0,t))){var u=i(p,r);return s(n),u}y(n,"incorrect usage")}function lA(A,e,I,g,t,r,n){var a=[];c(n);var B=o(A=_(a,A,"password")),Q=A.length;a.push(B);var E=o(e=_(a,e,"salt")),p=e.length;a.push(E),f(a,I,"opsLimit"),("number"!=typeof I||(0|I)!==I||I<0)&&h(a,"opsLimit must be an unsigned integer"),f(a,g,"r"),("number"!=typeof g||(0|g)!==g||g<0)&&h(a,"r must be an unsigned integer"),f(a,t,"p"),("number"!=typeof t||(0|t)!==t||t<0)&&h(a,"p must be an unsigned integer"),f(a,r,"keyLength"),("number"!=typeof r||(0|r)!==r||r<0)&&h(a,"keyLength must be an unsigned integer");var w=new C(0|r),u=w.address;if(a.push(u),0==(0|we._crypto_pwhash_scryptsalsa208sha256_ll(B,Q,E,p,I,0,g,t,u,r))){var l=i(w,n);return s(a),l}y(a,"incorrect usage")}function dA(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"password")),n=A.length;t.push(r),f(t,e,"opsLimit"),("number"!=typeof e||(0|e)!==e||e<0)&&h(t,"opsLimit must be an unsigned integer"),f(t,I,"memLimit"),("number"!=typeof I||(0|I)!==I||I<0)&&h(t,"memLimit must be an unsigned integer");var a=new C(0|we._crypto_pwhash_scryptsalsa208sha256_strbytes()).address;if(t.push(a),0==(0|we._crypto_pwhash_scryptsalsa208sha256_str(a,r,n,0,e,0,I))){var i=we.Pointer_stringify(a);return s(t),i}y(t,"incorrect usage")}function DA(A,e,g){var t=[];c(g);var r=o(A=I(A+"\0"));A.length;t.push(r);var n=o(e=_(t,e,"password")),a=e.length;t.push(n);var i=0===(0|we._crypto_pwhash_scryptsalsa208sha256_str_verify(r,n,a,0));return s(t),i}function vA(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"password")),n=A.length;t.push(r),f(t,e,"opsLimit"),("number"!=typeof e||(0|e)!==e||e<0)&&h(t,"opsLimit must be an unsigned integer"),f(t,I,"memLimit"),("number"!=typeof I||(0|I)!==I||I<0)&&h(t,"memLimit must be an unsigned integer");var a=new C(0|we._crypto_pwhash_strbytes()).address;if(t.push(a),0==(0|we._crypto_pwhash_str(a,r,n,0,e,0,I))){var i=we.Pointer_stringify(a);return s(t),i}y(t,"incorrect usage")}function kA(A,e,g){var t=[];c(g);var r=o(A=I(A+"\0"));A.length;t.push(r);var n=o(e=_(t,e,"password")),a=e.length;t.push(n);var i=0===(0|we._crypto_pwhash_str_verify(r,n,a,0));return s(t),i}function bA(A,e,I){var g=[];c(I),A=_(g,A,"privateKey");var t,r=0|we._crypto_scalarmult_scalarbytes();A.length!==r&&h(g,"invalid privateKey length"),t=o(A),g.push(t),e=_(g,e,"publicKey");var n,a=0|we._crypto_scalarmult_scalarbytes();e.length!==a&&h(g,"invalid publicKey length"),n=o(e),g.push(n);var B=new C(0|we._crypto_scalarmult_bytes()),Q=B.address;if(g.push(Q),0==(0|we._crypto_scalarmult(Q,t,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function GA(A,e){var I=[];c(e),A=_(I,A,"privateKey");var g,t=0|we._crypto_scalarmult_scalarbytes();A.length!==t&&h(I,"invalid privateKey length"),g=o(A),I.push(g);var r=new C(0|we._crypto_scalarmult_scalarbytes()),n=r.address;if(I.push(n),0==(0|we._crypto_scalarmult_base(n,g))){var a=i(r,e);return s(I),a}y(I,"incorrect usage")}function FA(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"message")),n=A.length;t.push(r),e=_(t,e,"nonce");var a,B=0|we._crypto_secretbox_noncebytes();e.length!==B&&h(t,"invalid nonce length"),a=o(e),t.push(a),I=_(t,I,"key");var Q,E=0|we._crypto_secretbox_keybytes();I.length!==E&&h(t,"invalid key length"),Q=o(I),t.push(Q);var f=new C(0|n),p=f.address;t.push(p);var w=new C(0|we._crypto_secretbox_macbytes()),u=w.address;if(t.push(u),0==(0|we._crypto_secretbox_detached(p,u,r,n,0,a,Q))){var l=i({mac:w,cipher:f},g);return s(t),l}y(t,"incorrect usage")}function mA(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"message")),n=A.length;t.push(r),e=_(t,e,"nonce");var a,B=0|we._crypto_secretbox_noncebytes();e.length!==B&&h(t,"invalid nonce length"),a=o(e),t.push(a),I=_(t,I,"key");var Q,E=0|we._crypto_secretbox_keybytes();I.length!==E&&h(t,"invalid key length"),Q=o(I),t.push(Q);var f=new C(n+we._crypto_secretbox_macbytes()|0),p=f.address;if(t.push(p),0==(0|we._crypto_secretbox_easy(p,r,n,0,a,Q))){var w=i(f,g);return s(t),w}y(t,"incorrect usage")}function HA(A){var e=[];c(A);var I=new C(0|we._crypto_secretbox_keybytes()),g=I.address;e.push(g),we._crypto_secretbox_keygen(g);var t=i(I,A);return s(e),t}function MA(A,e,I,g,t){var r=[];c(t);var n=o(A=_(r,A,"ciphertext")),a=A.length;r.push(n),e=_(r,e,"mac");var B,Q=0|we._crypto_secretbox_macbytes();e.length!==Q&&h(r,"invalid mac length"),B=o(e),r.push(B),I=_(r,I,"nonce");var E,f=0|we._crypto_secretbox_noncebytes();I.length!==f&&h(r,"invalid nonce length"),E=o(I),r.push(E),g=_(r,g,"key");var p,w=0|we._crypto_secretbox_keybytes();g.length!==w&&h(r,"invalid key length"),p=o(g),r.push(p);var u=new C(0|a),l=u.address;if(r.push(l),0==(0|we._crypto_secretbox_open_detached(l,n,B,a,0,E,p))){var d=i(u,t);return s(r),d}y(r,"incorrect usage")}function YA(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"ciphertext")),n=A.length;t.push(r),e=_(t,e,"nonce");var a,B=0|we._crypto_secretbox_noncebytes();e.length!==B&&h(t,"invalid nonce length"),a=o(e),t.push(a),I=_(t,I,"key");var Q,E=0|we._crypto_secretbox_keybytes();I.length!==E&&h(t,"invalid key length"),Q=o(I),t.push(Q);var f=new C(n-we._crypto_secretbox_macbytes()|0),p=f.address;if(t.push(p),0==(0|we._crypto_secretbox_open_easy(p,r,n,0,a,Q))){var w=i(f,g);return s(t),w}y(t,"incorrect usage")}function SA(A,e,I){var g=[];c(I),A=_(g,A,"header");var t,r=0|we._crypto_secretstream_xchacha20poly1305_headerbytes();A.length!==r&&h(g,"invalid header length"),t=o(A),g.push(t),e=_(g,e,"key");var n,a=0|we._crypto_secretstream_xchacha20poly1305_keybytes();e.length!==a&&h(g,"invalid key length"),n=o(e),g.push(n);var i=new C(52).address;if(0==(0|we._crypto_secretstream_xchacha20poly1305_init_pull(i,t,n))){var B=i;return s(g),B}y(g,"incorrect usage")}function NA(A,e){var I=[];c(e),A=_(I,A,"key");var g,t=0|we._crypto_secretstream_xchacha20poly1305_keybytes();A.length!==t&&h(I,"invalid key length"),g=o(A),I.push(g);var r=new C(52).address,n=new C(0|we._crypto_secretstream_xchacha20poly1305_headerbytes()),a=n.address;if(I.push(a),0==(0|we._crypto_secretstream_xchacha20poly1305_init_push(r,a,g))){var B={state:r,header:i(n,e)};return s(I),B}y(I,"incorrect usage")}function RA(A){var e=[];c(A);var I=new C(0|we._crypto_secretstream_xchacha20poly1305_keybytes()),g=I.address;e.push(g),we._crypto_secretstream_xchacha20poly1305_keygen(g);var t=i(I,A);return s(e),t}function UA(A,e,I,g){var t=[];c(g),f(t,A,"state_address");var r=o(e=_(t,e,"cipher")),n=e.length;t.push(r);var a=null,B=0;void 0!=I&&(I=_(t,I,"ad"),a=o(I),B=I.length,t.push(a));var E=new C(n-we._crypto_secretstream_xchacha20poly1305_abytes()|0),y=E.address;t.push(y);var h=(h=function(){var e=Q(1);return t.push(e),0===we._crypto_secretstream_xchacha20poly1305_pull(A,y,0,e,r,n,0,a,B)&&{tag:we.HEAPU8[e],message:E}}())&&{message:i(h.message,g),tag:h.tag};return s(t),h}function PA(A,e,I,g,t){var r=[];c(t),f(r,A,"state_address");var n=o(e=_(r,e,"message_chunk")),a=e.length;r.push(n);var B=null,Q=0;void 0!=I&&(B=o(I=_(r,I,"ad")),Q=I.length,r.push(B)),f(r,g,"tag"),("number"!=typeof g||(0|g)!==g||g<0)&&h(r,"tag must be an unsigned integer");var E=new C(a+we._crypto_secretstream_xchacha20poly1305_abytes()|0),p=E.address;if(r.push(p),0==(0|we._crypto_secretstream_xchacha20poly1305_push(A,p,0,n,a,0,B,Q,0,g))){var w=i(E,t);return s(r),w}y(r,"incorrect usage")}function JA(A,e){var I=[];c(e),f(I,A,"state_address"),we._crypto_secretstream_xchacha20poly1305_rekey(A);return s(I),!0}function xA(A,e,I){var g=[];c(I);var t=o(A=_(g,A,"message")),r=A.length;g.push(t),e=_(g,e,"key");var n,a=0|we._crypto_shorthash_keybytes();e.length!==a&&h(g,"invalid key length"),n=o(e),g.push(n);var B=new C(0|we._crypto_shorthash_bytes()),Q=B.address;if(g.push(Q),0==(0|we._crypto_shorthash(Q,t,r,0,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function LA(A){var e=[];c(A);var I=new C(0|we._crypto_shorthash_keybytes()),g=I.address;e.push(g),we._crypto_shorthash_keygen(g);var t=i(I,A);return s(e),t}function KA(A,e,I){var g=[];c(I);var t=o(A=_(g,A,"message")),r=A.length;g.push(t),e=_(g,e,"key");var n,a=0|we._crypto_shorthash_siphashx24_keybytes();e.length!==a&&h(g,"invalid key length"),n=o(e),g.push(n);var B=new C(0|we._crypto_shorthash_siphashx24_bytes()),Q=B.address;if(g.push(Q),0==(0|we._crypto_shorthash_siphashx24(Q,t,r,0,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function XA(A,e,I){var g=[];c(I);var t=o(A=_(g,A,"message")),r=A.length;g.push(t),e=_(g,e,"privateKey");var n,a=0|we._crypto_sign_secretkeybytes();e.length!==a&&h(g,"invalid privateKey length"),n=o(e),g.push(n);var B=new C(A.length+we._crypto_sign_bytes()|0),Q=B.address;if(g.push(Q),0==(0|we._crypto_sign(Q,null,t,r,0,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function TA(A,e,I){var g=[];c(I);var t=o(A=_(g,A,"message")),r=A.length;g.push(t),e=_(g,e,"privateKey");var n,a=0|we._crypto_sign_secretkeybytes();e.length!==a&&h(g,"invalid privateKey length"),n=o(e),g.push(n);var B=new C(0|we._crypto_sign_bytes()),Q=B.address;if(g.push(Q),0==(0|we._crypto_sign_detached(Q,null,t,r,0,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function VA(A,e){var I=[];c(e),A=_(I,A,"edPk");var g,t=0|we._crypto_sign_publickeybytes();A.length!==t&&h(I,"invalid edPk length"),g=o(A),I.push(g);var r=new C(0|we._crypto_scalarmult_scalarbytes()),n=r.address;if(I.push(n),0==(0|we._crypto_sign_ed25519_pk_to_curve25519(n,g))){var a=i(r,e);return s(I),a}y(I,"incorrect usage")}function jA(A,e){var I=[];c(e),A=_(I,A,"edSk");var g,t=0|we._crypto_sign_secretkeybytes();A.length!==t&&h(I,"invalid edSk length"),g=o(A),I.push(g);var r=new C(0|we._crypto_scalarmult_scalarbytes()),n=r.address;if(I.push(n),0==(0|we._crypto_sign_ed25519_sk_to_curve25519(n,g))){var a=i(r,e);return s(I),a}y(I,"incorrect usage")}function ZA(A,e){var I=[];c(e),A=_(I,A,"privateKey");var g,t=0|we._crypto_sign_secretkeybytes();A.length!==t&&h(I,"invalid privateKey length"),g=o(A),I.push(g);var r=new C(0|we._crypto_sign_publickeybytes()),n=r.address;if(I.push(n),0==(0|we._crypto_sign_ed25519_sk_to_pk(n,g))){var a=i(r,e);return s(I),a}y(I,"incorrect usage")}function OA(A,e){var I=[];c(e),A=_(I,A,"privateKey");var g,t=0|we._crypto_sign_secretkeybytes();A.length!==t&&h(I,"invalid privateKey length"),g=o(A),I.push(g);var r=new C(0|we._crypto_sign_seedbytes()),n=r.address;if(I.push(n),0==(0|we._crypto_sign_ed25519_sk_to_seed(n,g))){var a=i(r,e);return s(I),a}y(I,"incorrect usage")}function WA(A,e,I){var g=[];c(I),f(g,A,"state_address"),e=_(g,e,"privateKey");var t,r=0|we._crypto_sign_secretkeybytes();e.length!==r&&h(g,"invalid privateKey length"),t=o(e),g.push(t);var n=new C(0|we._crypto_sign_bytes()),a=n.address;if(g.push(a),0==(0|we._crypto_sign_final_create(A,a,null,t))){var B=(we._free(A),i(n,I));return s(g),B}y(g,"incorrect usage")}function qA(A,e,I,g){var t=[];c(g),f(t,A,"state_address"),e=_(t,e,"signature");var r,n=0|we._crypto_sign_bytes();e.length!==n&&h(t,"invalid signature length"),r=o(e),t.push(r),I=_(t,I,"publicKey");var a,i=0|we._crypto_sign_publickeybytes();I.length!==i&&h(t,"invalid publicKey length"),a=o(I),t.push(a);var B=0===(0|we._crypto_sign_final_verify(A,r,a));return s(t),B}function zA(A){var e=[];c(A);var I=new C(208).address;if(0==(0|we._crypto_sign_init(I))){var g=I;return s(e),g}y(e,"incorrect usage")}function $A(A){var e=[];c(A);var I=new C(0|we._crypto_sign_publickeybytes()),g=I.address;e.push(g);var t=new C(0|we._crypto_sign_secretkeybytes()),r=t.address;if(e.push(r),0==(0|we._crypto_sign_keypair(g,r))){var n={publicKey:i(I,A),privateKey:i(t,A),keyType:"ed25519"};return s(e),n}y(e,"incorrect usage")}function Ae(A,e,I){var g=[];c(I);var t=o(A=_(g,A,"signedMessage")),r=A.length;g.push(t),e=_(g,e,"publicKey");var n,a=0|we._crypto_sign_publickeybytes();e.length!==a&&h(g,"invalid publicKey length"),n=o(e),g.push(n);var B=new C(r-we._crypto_sign_bytes()|0),Q=B.address;if(g.push(Q),0==(0|we._crypto_sign_open(Q,null,t,r,0,n))){var E=i(B,I);return s(g),E}y(g,"incorrect usage")}function ee(A,e){var I=[];c(e),A=_(I,A,"seed");var g,t=0|we._crypto_sign_seedbytes();A.length!==t&&h(I,"invalid seed length"),g=o(A),I.push(g);var r=new C(0|we._crypto_sign_publickeybytes()),n=r.address;I.push(n);var a=new C(0|we._crypto_sign_secretkeybytes()),B=a.address;if(I.push(B),0==(0|we._crypto_sign_seed_keypair(n,B,g))){var Q={publicKey:i(r,e),privateKey:i(a,e),keyType:"ed25519"};return s(I),Q}y(I,"incorrect usage")}function Ie(A,e,I){var g=[];c(I),f(g,A,"state_address");var t=o(e=_(g,e,"message_chunk")),r=e.length;g.push(t),0!=(0|we._crypto_sign_update(A,t,r))?y(g,"incorrect usage"):s(g)}function ge(A,e,I){var g=[];A=_(g,A,"signature");var t,r=0|we._crypto_sign_bytes();A.length!==r&&h(g,"invalid signature length"),t=o(A),g.push(t);var n=o(e=_(g,e,"message")),a=e.length;g.push(n),I=_(g,I,"publicKey");var i,B=0|we._crypto_sign_publickeybytes();I.length!==B&&h(g,"invalid publicKey length"),i=o(I),g.push(i);var c=0===(0|we._crypto_sign_verify_detached(t,n,a,0,i));return s(g),c}function te(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"input_message")),n=A.length;t.push(r),e=_(t,e,"nonce");var a,B=0|we._crypto_stream_chacha20_ietf_noncebytes();e.length!==B&&h(t,"invalid nonce length"),a=o(e),t.push(a),I=_(t,I,"key");var Q,E=0|we._crypto_stream_chacha20_ietf_keybytes();I.length!==E&&h(t,"invalid key length"),Q=o(I),t.push(Q);var f=new C(0|n),p=f.address;if(t.push(p),0===we._crypto_stream_chacha20_ietf_xor(p,r,n,0,a,Q)){var w=i(f,g);return s(t),w}y(t,"incorrect usage")}function re(A,e,I,g,t){var r=[];c(t);var n=o(A=_(r,A,"input_message")),a=A.length;r.push(n),e=_(r,e,"nonce");var B,Q=0|we._crypto_stream_chacha20_ietf_noncebytes();e.length!==Q&&h(r,"invalid nonce length"),B=o(e),r.push(B),f(r,I,"nonce_increment"),("number"!=typeof I||(0|I)!==I||I<0)&&h(r,"nonce_increment must be an unsigned integer"),g=_(r,g,"key");var E,p=0|we._crypto_stream_chacha20_ietf_keybytes();g.length!==p&&h(r,"invalid key length"),E=o(g),r.push(E);var w=new C(0|a),u=w.address;if(r.push(u),0===we._crypto_stream_chacha20_ietf_xor_ic(u,n,a,0,B,I,0,E)){var l=i(w,t);return s(r),l}y(r,"incorrect usage")}function ne(A){var e=[];c(A);var I=new C(0|we._crypto_stream_chacha20_keybytes()),g=I.address;e.push(g),we._crypto_stream_chacha20_keygen(g);var t=i(I,A);return s(e),t}function ae(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"input_message")),n=A.length;t.push(r),e=_(t,e,"nonce");var a,B=0|we._crypto_stream_chacha20_noncebytes();e.length!==B&&h(t,"invalid nonce length"),a=o(e),t.push(a),I=_(t,I,"key");var Q,E=0|we._crypto_stream_chacha20_keybytes();I.length!==E&&h(t,"invalid key length"),Q=o(I),t.push(Q);var f=new C(0|n),p=f.address;if(t.push(p),0===we._crypto_stream_chacha20_xor(p,r,n,0,a,Q)){var w=i(f,g);return s(t),w}y(t,"incorrect usage")}function ie(A,e,I,g,t){var r=[];c(t);var n=o(A=_(r,A,"input_message")),a=A.length;r.push(n),e=_(r,e,"nonce");var B,Q=0|we._crypto_stream_chacha20_noncebytes();e.length!==Q&&h(r,"invalid nonce length"),B=o(e),r.push(B),f(r,I,"nonce_increment"),("number"!=typeof I||(0|I)!==I||I<0)&&h(r,"nonce_increment must be an unsigned integer"),g=_(r,g,"key");var E,p=0|we._crypto_stream_chacha20_keybytes();g.length!==p&&h(r,"invalid key length"),E=o(g),r.push(E);var w=new C(0|a),u=w.address;if(r.push(u),0===we._crypto_stream_chacha20_xor_ic(u,n,a,0,B,I,0,E)){var l=i(w,t);return s(r),l}y(r,"incorrect usage")}function Be(A){var e=[];c(A);var I=new C(0|we._crypto_stream_keybytes()),g=I.address;e.push(g),we._crypto_stream_keygen(g);var t=i(I,A);return s(e),t}function ce(A){var e=[];c(A);var I=new C(0|we._crypto_stream_xchacha20_keybytes()),g=I.address;e.push(g),we._crypto_stream_xchacha20_keygen(g);var t=i(I,A);return s(e),t}function Ce(A,e,I,g){var t=[];c(g);var r=o(A=_(t,A,"input_message")),n=A.length;t.push(r),e=_(t,e,"nonce");var a,B=0|we._crypto_stream_xchacha20_noncebytes();e.length!==B&&h(t,"invalid nonce length"),a=o(e),t.push(a),I=_(t,I,"key");var Q,E=0|we._crypto_stream_xchacha20_keybytes();I.length!==E&&h(t,"invalid key length"),Q=o(I),t.push(Q);var f=new C(0|n),p=f.address;if(t.push(p),0===we._crypto_stream_xchacha20_xor(p,r,n,0,a,Q)){var w=i(f,g);return s(t),w}y(t,"incorrect usage")}function oe(A,e,I,g,t){var r=[];c(t);var n=o(A=_(r,A,"input_message")),a=A.length;r.push(n),e=_(r,e,"nonce");var B,Q=0|we._crypto_stream_xchacha20_noncebytes();e.length!==Q&&h(r,"invalid nonce length"),B=o(e),r.push(B),f(r,I,"nonce_increment"),("number"!=typeof I||(0|I)!==I||I<0)&&h(r,"nonce_increment must be an unsigned integer"),g=_(r,g,"key");var E,p=0|we._crypto_stream_xchacha20_keybytes();g.length!==p&&h(r,"invalid key length"),E=o(g),r.push(E);var w=new C(0|a),u=w.address;if(r.push(u),0===we._crypto_stream_xchacha20_xor_ic(u,n,a,0,B,I,0,E)){var l=i(w,t);return s(r),l}y(r,"incorrect usage")}function Qe(A,e){var I=[];c(e),f(I,A,"length"),("number"!=typeof A||(0|A)!==A||A<0)&&h(I,"length must be an unsigned integer");var g=new C(0|A),t=g.address;I.push(t),we._randombytes_buf(t,A);var r=i(g,e);return s(I),r}function Ee(A,e,I){var g=[];c(I),f(g,A,"length"),("number"!=typeof A||(0|A)!==A||A<0)&&h(g,"length must be an unsigned integer"),e=_(g,e,"seed");var t,r=0|we._randombytes_seedbytes();e.length!==r&&h(g,"invalid seed length"),t=o(e),g.push(t);var n=new C(0|A),a=n.address;g.push(a),we._randombytes_buf_deterministic(a,A,0,e);var B=i(n,I);return s(g),B}function se(A){c(A),we._randombytes_close()}function ye(A){var e=[];c(A);var I=we._randombytes_random()>>>0;return s(e),I}function he(A,e){var I=[];c(e);for(var g=we._malloc(24),t=0;t<6;t++)we.setValue(g+4*t,we.Runtime.addFunction(A[["implementation_name","random","stir","uniform","buf","close"][t]]),"i32");0!=(0|we._randombytes_set_implementation(g))?y(I,"incorrect usage"):s(I)}function fe(A){c(A),we._randombytes_stir()}function _e(A,e){var I=[];c(e),f(I,A,"upper_bound"),("number"!=typeof A||(0|A)!==A||A<0)&&h(I,"upper_bound must be an unsigned integer");var g=we._randombytes_uniform(A)>>>0;return s(I),g}function pe(){var A=[],e=we._sodium_version_string(),I=we.Pointer_stringify(e);return s(A),I}var we,ue="uint8array",le=e.ready.then(function(){if(0!==(we=e)._sodium_init())throw new Error("libsodium was not correctly initialized.");for(var I=["crypto_aead_chacha20poly1305_decrypt","crypto_aead_chacha20poly1305_decrypt_detached","crypto_aead_chacha20poly1305_encrypt","crypto_aead_chacha20poly1305_encrypt_detached","crypto_aead_chacha20poly1305_ietf_decrypt","crypto_aead_chacha20poly1305_ietf_decrypt_detached","crypto_aead_chacha20poly1305_ietf_encrypt","crypto_aead_chacha20poly1305_ietf_encrypt_detached","crypto_aead_chacha20poly1305_ietf_keygen","crypto_aead_chacha20poly1305_keygen","crypto_aead_xchacha20poly1305_ietf_decrypt","crypto_aead_xchacha20poly1305_ietf_decrypt_detached","crypto_aead_xchacha20poly1305_ietf_encrypt","crypto_aead_xchacha20poly1305_ietf_encrypt_detached","crypto_aead_xchacha20poly1305_ietf_keygen","crypto_auth","crypto_auth_hmacsha256","crypto_auth_hmacsha256_keygen","crypto_auth_hmacsha256_verify","crypto_auth_hmacsha512","crypto_auth_hmacsha512_keygen","crypto_auth_hmacsha512_verify","crypto_auth_keygen","crypto_auth_verify","crypto_box_beforenm","crypto_box_detached","crypto_box_easy","crypto_box_easy_afternm","crypto_box_keypair","crypto_box_open_detached","crypto_box_open_easy","crypto_box_open_easy_afternm","crypto_box_seal","crypto_box_seal_open","crypto_box_seed_keypair","crypto_generichash","crypto_generichash_final","crypto_generichash_init","crypto_generichash_keygen","crypto_generichash_update","crypto_hash","crypto_hash_sha256","crypto_hash_sha512","crypto_kdf_derive_from_key","crypto_kdf_keygen","crypto_kx_client_session_keys","crypto_kx_keypair","crypto_kx_seed_keypair","crypto_kx_server_session_keys","crypto_onetimeauth","crypto_onetimeauth_final","crypto_onetimeauth_init","crypto_onetimeauth_keygen","crypto_onetimeauth_update","crypto_onetimeauth_verify","crypto_pwhash","crypto_pwhash_scryptsalsa208sha256","crypto_pwhash_scryptsalsa208sha256_ll","crypto_pwhash_scryptsalsa208sha256_str","crypto_pwhash_scryptsalsa208sha256_str_verify","crypto_pwhash_str","crypto_pwhash_str_verify","crypto_scalarmult","crypto_scalarmult_base","crypto_secretbox_detached","crypto_secretbox_easy","crypto_secretbox_keygen","crypto_secretbox_open_detached","crypto_secretbox_open_easy","crypto_secretstream_xchacha20poly1305_init_pull","crypto_secretstream_xchacha20poly1305_init_push","crypto_secretstream_xchacha20poly1305_keygen","crypto_secretstream_xchacha20poly1305_pull","crypto_secretstream_xchacha20poly1305_push","crypto_secretstream_xchacha20poly1305_rekey","crypto_shorthash","crypto_shorthash_keygen","crypto_shorthash_siphashx24","crypto_sign","crypto_sign_detached","crypto_sign_ed25519_pk_to_curve25519","crypto_sign_ed25519_sk_to_curve25519","crypto_sign_ed25519_sk_to_pk","crypto_sign_ed25519_sk_to_seed","crypto_sign_final_create","crypto_sign_final_verify","crypto_sign_init","crypto_sign_keypair","crypto_sign_open","crypto_sign_seed_keypair","crypto_sign_update","crypto_sign_verify_detached","crypto_stream_chacha20_ietf_xor","crypto_stream_chacha20_ietf_xor_ic","crypto_stream_chacha20_keygen","crypto_stream_chacha20_xor","crypto_stream_chacha20_xor_ic","crypto_stream_keygen","crypto_stream_xchacha20_keygen","crypto_stream_xchacha20_xor","crypto_stream_xchacha20_xor_ic","randombytes_buf","randombytes_buf_deterministic","randombytes_close","randombytes_random","randombytes_set_implementation","randombytes_stir","randombytes_uniform","sodium_version_string"],g=[p,w,u,l,d,D,v,k,b,G,F,m,H,M,Y,S,N,R,U,P,J,x,L,K,X,T,V,j,Z,O,W,q,z,$,AA,eA,IA,gA,tA,rA,nA,aA,iA,BA,cA,CA,oA,QA,EA,sA,yA,hA,fA,_A,pA,wA,uA,lA,dA,DA,vA,kA,bA,GA,FA,mA,HA,MA,YA,SA,NA,RA,UA,PA,JA,xA,LA,KA,XA,TA,VA,jA,ZA,OA,WA,qA,zA,$A,Ae,ee,Ie,ge,te,re,ne,ae,ie,Be,ce,Ce,oe,Qe,Ee,se,ye,he,fe,_e,pe],t=0;t<g.length;t++)"function"==typeof we["_"+I[t]]&&(A[I[t]]=g[t]);for(var r=["SODIUM_LIBRARY_VERSION_MAJOR","SODIUM_LIBRARY_VERSION_MINOR","crypto_aead_chacha20poly1305_ABYTES","crypto_aead_chacha20poly1305_KEYBYTES","crypto_aead_chacha20poly1305_NPUBBYTES","crypto_aead_chacha20poly1305_NSECBYTES","crypto_aead_chacha20poly1305_ietf_ABYTES","crypto_aead_chacha20poly1305_ietf_KEYBYTES","crypto_aead_chacha20poly1305_ietf_NPUBBYTES","crypto_aead_chacha20poly1305_ietf_NSECBYTES","crypto_aead_xchacha20poly1305_ietf_ABYTES","crypto_aead_xchacha20poly1305_ietf_KEYBYTES","crypto_aead_xchacha20poly1305_ietf_NPUBBYTES","crypto_aead_xchacha20poly1305_ietf_NSECBYTES","crypto_auth_BYTES","crypto_auth_KEYBYTES","crypto_auth_hmacsha256_BYTES","crypto_auth_hmacsha256_KEYBYTES","crypto_auth_hmacsha512_BYTES","crypto_auth_hmacsha512_KEYBYTES","crypto_box_BEFORENMBYTES","crypto_box_MACBYTES","crypto_box_NONCEBYTES","crypto_box_PUBLICKEYBYTES","crypto_box_SEALBYTES","crypto_box_SECRETKEYBYTES","crypto_box_SEEDBYTES","crypto_generichash_BYTES","crypto_generichash_BYTES_MAX","crypto_generichash_BYTES_MIN","crypto_generichash_KEYBYTES","crypto_generichash_KEYBYTES_MAX","crypto_generichash_KEYBYTES_MIN","crypto_hash_BYTES","crypto_kdf_BYTES_MAX","crypto_kdf_BYTES_MIN","crypto_kdf_CONTEXTBYTES","crypto_kdf_KEYBYTES","crypto_kx_PUBLICKEYBYTES","crypto_kx_SECRETKEYBYTES","crypto_kx_SEEDBYTES","crypto_kx_SESSSIONKEYBYTES","crypto_onetimeauth_BYTES","crypto_onetimeauth_KEYBYTES","crypto_pwhash_ALG_ARGON2I13","crypto_pwhash_ALG_DEFAULT","crypto_pwhash_BYTES_MAX","crypto_pwhash_BYTES_MIN","crypto_pwhash_MEMLIMIT_INTERACTIVE","crypto_pwhash_MEMLIMIT_MAX","crypto_pwhash_MEMLIMIT_MIN","crypto_pwhash_MEMLIMIT_MODERATE","crypto_pwhash_MEMLIMIT_SENSITIVE","crypto_pwhash_OPSLIMIT_INTERACTIVE","crypto_pwhash_OPSLIMIT_MAX","crypto_pwhash_OPSLIMIT_MIN","crypto_pwhash_OPSLIMIT_MODERATE","crypto_pwhash_OPSLIMIT_SENSITIVE","crypto_pwhash_PASSWD_MAX","crypto_pwhash_PASSWD_MIN","crypto_pwhash_SALTBYTES","crypto_pwhash_STRBYTES","crypto_pwhash_STR_VERIFY","crypto_pwhash_scryptsalsa208sha256_BYTES_MAX","crypto_pwhash_scryptsalsa208sha256_BYTES_MIN","crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_INTERACTIVE","crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MAX","crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_MIN","crypto_pwhash_scryptsalsa208sha256_MEMLIMIT_SENSITIVE","crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_INTERACTIVE","crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MAX","crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_MIN","crypto_pwhash_scryptsalsa208sha256_OPSLIMIT_SENSITIVE","crypto_pwhash_scryptsalsa208sha256_SALTBYTES","crypto_pwhash_scryptsalsa208sha256_STRBYTES","crypto_pwhash_scryptsalsa208sha256_STR_VERIFY","crypto_scalarmult_BYTES","crypto_scalarmult_SCALARBYTES","crypto_secretbox_KEYBYTES","crypto_secretbox_MACBYTES","crypto_secretbox_NONCEBYTES","crypto_secretstream_xchacha20poly1305_ABYTES","crypto_secretstream_xchacha20poly1305_HEADERBYTES","crypto_secretstream_xchacha20poly1305_KEYBYTES","crypto_secretstream_xchacha20poly1305_MESSAGEBYTES_MAX","crypto_secretstream_xchacha20poly1305_NPUBBYTES","crypto_secretstream_xchacha20poly1305_TAG_FINAL","crypto_secretstream_xchacha20poly1305_TAG_MESSAGE","crypto_secretstream_xchacha20poly1305_TAG_PUSH","crypto_secretstream_xchacha20poly1305_TAG_REKEY","crypto_shorthash_BYTES","crypto_shorthash_KEYBYTES","crypto_shorthash_siphashx24_BYTES","crypto_shorthash_siphashx24_KEYBYTES","crypto_sign_BYTES","crypto_sign_PUBLICKEYBYTES","crypto_sign_SECRETKEYBYTES","crypto_sign_SEEDBYTES","crypto_stream_chacha20_KEYBYTES","crypto_stream_chacha20_NONCEBYTES","crypto_stream_chacha20_ietf_KEYBYTES","crypto_stream_chacha20_ietf_NONCEBYTES","crypto_stream_xchacha20_ietf_KEYBYTES","crypto_stream_xchacha20_ietf_NONCEBYTES","randombytes_SEEDBYTES"],t=0;t<r.length;t++)"function"==typeof(a=we["_"+r[t].toLowerCase()])&&(A[r[t]]=0|a());for(var n=["SODIUM_VERSION_STRING","crypto_pwhash_STRPREFIX","crypto_pwhash_scryptsalsa208sha256_STRPREFIX"],t=0;t<n.length;t++){var a=we["_"+n[t].toLowerCase()];"function"==typeof a&&(A[n[t]]=we.Pointer_stringify(a()))}}),de={ORIGINAL:1,ORIGINAL_NO_PADDING:3,URLSAFE:5,URLSAFE_NO_PADDING:7};return C.prototype.to_Uint8Array=function(){var A=new Uint8Array(this.length);return A.set(we.HEAPU8.subarray(this.address,this.address+this.length)),A},A.add=function(A,e){if(!(A instanceof Uint8Array&&e instanceof Uint8Array))throw new TypeError("Only Uint8Array instances can added");var I=A.length,g=0,t=0;if(e.length!=A.length)throw new TypeError("Arguments must have the same length");for(t=0;t<I;t++)g>>=8,g+=A[t]+e[I],A[t]=255&g},A.base64_variants=de,A.compare=function(A,e){if(!(A instanceof Uint8Array&&e instanceof Uint8Array))throw new TypeError("Only Uint8Array instances can be compared");if(A.length!==e.length)throw new TypeError("Only instances of identical length can be compared");for(var I=0,g=1,t=A.length;t-- >0;)I|=e[t]-A[t]>>8&g,g&=(e[t]^A[t])-1>>8;return I+I+g-1},A.from_base64=function(A,e){e=r(e);var I,g=[],t=new C(3*(A=_(g,A,"input")).length/4),n=o(A),a=Q(4),i=Q(4);return g.push(n),g.push(t.address),g.push(t.result_bin_len_p),g.push(t.b64_end_p),0!==we._sodium_base642bin(t.address,t.length,n,A.length,0,a,i,e)&&y(g,"invalid input"),we.getValue(i,"i32")-n!==A.length&&y(g,"incomplete input"),t.length=we.getValue(a,"i32"),I=t.to_Uint8Array(),s(g),I},A.from_hex=function(A){var e,I=[],g=new C((A=_(I,A,"input")).length/2),t=o(A),r=Q(4);return I.push(t),I.push(g.address),I.push(g.hex_end_p),0!==we._sodium_hex2bin(g.address,g.length,t,A.length,0,0,r)&&y(I,"invalid input"),we.getValue(r,"i32")-t!==A.length&&y(I,"incomplete input"),e=g.to_Uint8Array(),s(I),e},A.from_string=I,A.increment=function(A){if(!(A instanceof Uint8Array))throw new TypeError("Only Uint8Array instances can be incremented");for(var e=256,I=0,g=A.length;I<g;I++)e>>=8,e+=A[I],A[I]=255&e},A.is_zero=function(A){if(!(A instanceof Uint8Array))throw new TypeError("Only Uint8Array instances can be checked");for(var e=0,I=0,g=A.length;I<g;I++)e|=A[I];return 0===e},A.libsodium=e,A.memcmp=function(A,e){if(!(A instanceof Uint8Array&&e instanceof Uint8Array))throw new TypeError("Only Uint8Array instances can be compared");if(A.length!==e.length)throw new TypeError("Only instances of identical length can be compared");for(var I=0,g=0,t=A.length;g<t;g++)I|=A[g]^e[g];return 0===I},A.memzero=function(A){if(!(A instanceof Uint8Array))throw new TypeError("Only Uint8Array instances can be wiped");for(var e=0,I=A.length;e<I;e++)A[e]=0},A.output_formats=a,A.pad=function(A,e){if(!(A instanceof Uint8Array))throw new TypeError("buffer must be a Uint8Array");if((e|=0)<=0)throw new Error("block size must be > 0");var I,g=[],t=Q(4),r=1,n=0,a=0|A.length,i=new C(a+e);g.push(t),g.push(i.address);for(var B=i.address,c=i.address+a+e;B<c;B++)we.HEAPU8[B]=A[n],n+=r=1&~((65535&((a-=r)>>>48|a>>>32|a>>>16|a))-1>>16);return 0!==we._sodium_pad(t,i.address,A.length,e,i.length)&&y(g,"internal error"),i.length=we.getValue(t,"i32"),I=i.to_Uint8Array(),s(g),I},A.unpad=function(A,e){if(!(A instanceof Uint8Array))throw new TypeError("buffer must be a Uint8Array");if((e|=0)<=0)throw new Error("block size must be > 0");var I=[],g=o(A),t=Q(4);return I.push(g),I.push(t),0!==we._sodium_unpad(t,g,A.length,e)&&y(I,"unsupported/invalid padding"),A=new Uint8Array(A),A=A.subarray(0,we.getValue(t,"i32")),s(I),A},A.ready=le,A.symbols=function(){return Object.keys(A).sort()},A.to_base64=n,A.to_hex=t,A.to_string=g,A}var I="object"==typeof A.sodium&&"function"==typeof A.sodium.onload?A.sodium.onload:null;"function"==typeof define&&define.amd?define(["exports","libsodium"],e):"object"==typeof exports&&"string"!=typeof exports.nodeName?e(exports,require("libsodium")):A.sodium=e(A.commonJsStrict={},A.libsodium),I&&A.sodium.ready.then(function(){I(A.sodium)})}(this);

;
/*** <End:libsodium.js LoadJs:"components/libsodium.js/dist/browsers/sodium.js"> ***/
/*** <End:libsodium.js> ***/