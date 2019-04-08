export function getBrowserData() {
    navigator.sayswho= (function(){
        var ua= navigator.userAgent, tem,
            M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    })();
    
    return navigator.sayswho;
}

export function getVideoCardInfo() {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) {
        return {
            error: "no webgl",
        };
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return debugInfo ? {
        vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
        renderer:  gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
    } : {
        error: "no WEBGL_debug_renderer_info",
    };
}

export function getLanguage() {
    return (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
}
export function getLanguages() {
    return navigator.languages;
}

export function getTimezoneOffsetVsUTC() {
    return (new Date().getTimezoneOffset())/60 ;
}
export function getTimezone() {
    try{
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch(err){
        return "";
    }

}

export function isMobile() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        return window.matchMedia("only screen and (max-width: 760px)").matches;
    }
}

export function devToolsOpen() {
    // const minimalUserResponseInMiliseconds = 100;
    // const before = new Date().getTime();
    // debugger;
    // const after = new Date().getTime();
    // // user had to resume the script manually via opened dev tools
    // return (after - before > minimalUserResponseInMiliseconds) ? "on" : "off";
    
    // var devtools = /./;
    // devtools.toString = function() {
    //     this.opened = true;
    // }
    //
    // console.log('%c', devtools);
}