(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(18)},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(4),i=n.n(r),l=(n(16),n(2)),c=n(5),s=n(6),d=n(8),u=n(7),m=n(9),h=n(1);n(17);function g(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){return""}}var f,O,v=function(){if("undefined"!==typeof navigator.languages)try{if(navigator.languages[0].substr(0,2)!==navigator.language.substr(0,2))return!0}catch(e){return!0}return!1},E=function(){return window.screen.width<window.screen.availWidth||window.screen.height<window.screen.availHeight},p=function(){var e,t=navigator.userAgent.toLowerCase(),n=navigator.oscpu,a=navigator.platform.toLowerCase();if(e=t.indexOf("windows phone")>=0?"Windows Phone":t.indexOf("win")>=0?"Windows":t.indexOf("android")>=0?"Android":t.indexOf("linux")>=0?"Linux":t.indexOf("iphone")>=0||t.indexOf("ipad")>=0?"iOS":t.indexOf("mac")>=0?"Mac":"Other",("ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0)&&"Windows Phone"!==e&&"Android"!==e&&"iOS"!==e&&"Other"!==e)return!0;if("undefined"!==typeof n){if((n=n.toLowerCase()).indexOf("win")>=0&&"Windows"!==e&&"Windows Phone"!==e)return!0;if(n.indexOf("linux")>=0&&"Linux"!==e&&"Android"!==e)return!0;if(n.indexOf("mac")>=0&&"Mac"!==e&&"iOS"!==e)return!0;if((-1===n.indexOf("win")&&-1===n.indexOf("linux")&&-1===n.indexOf("mac"))!==("Other"===e))return!0}return a.indexOf("win")>=0&&"Windows"!==e&&"Windows Phone"!==e||((a.indexOf("linux")>=0||a.indexOf("android")>=0||a.indexOf("pike")>=0)&&"Linux"!==e&&"Android"!==e||((a.indexOf("mac")>=0||a.indexOf("ipad")>=0||a.indexOf("ipod")>=0||a.indexOf("iphone")>=0)&&"Mac"!==e&&"iOS"!==e||((-1===a.indexOf("win")&&-1===a.indexOf("linux")&&-1===a.indexOf("mac"))!==("Other"===e)||"undefined"===typeof navigator.plugins&&"Windows"!==e&&"Windows Phone"!==e)))},w=function(){var e,t=navigator.userAgent.toLowerCase(),n=navigator.productSub;if(("Chrome"===(e=t.indexOf("firefox")>=0?"Firefox":t.indexOf("opera")>=0||t.indexOf("opr")>=0?"Opera":t.indexOf("chrome")>=0?"Chrome":t.indexOf("safari")>=0?"Safari":t.indexOf("trident")>=0?"Internet Explorer":"Other")||"Safari"===e||"Opera"===e)&&"20030107"!==n)return!0;var a,o=eval.toString().length;if(37===o&&"Safari"!==e&&"Firefox"!==e&&"Other"!==e)return!0;if(39===o&&"Internet Explorer"!==e&&"Other"!==e)return!0;if(33===o&&"Chrome"!==e&&"Opera"!==e&&"Other"!==e)return!0;try{throw"a"}catch(r){try{r.toSource(),a=!0}catch(i){a=!1}}return a&&"Firefox"!==e&&"Other"!==e},b={enableHighAccuracy:!0,timeout:1e4,maximumAge:0},x={position:"",error:""};function y(){return"geolocation"in navigator}function C(e){console.log("g1");var t=e.coords;x.position=e,console.log(e),O&&O({position:e}),console.log("Your current position is:"),console.log("Latitude : ".concat(t.latitude)),console.log("Longitude: ".concat(t.longitude)),console.log("More or less ".concat(t.accuracy," meters."))}function k(e){var t="unknown error";1===e.code?t="permission denied":2===e.code?t="position unavailable (error response from location provider)":3===e.code&&(t="timed out"),x.error="ERROR(".concat(e.code,"): reason: ").concat(t,", ").concat(e.message),f&&f({error:x.error}),O&&O({error:x.error}),console.warn(x.error)}function S(e){var t=e.coords;x.position=e,console.log(e),f&&f({position:e}),console.log("Watch: Your current position is:",new Date),console.log("Latitude : ".concat(t.latitude)),console.log("Longitude: ".concat(t.longitude)),console.log("More or less ".concat(t.accuracy," meters."))}function W(){var e=0;return e+=E()?0:100,0,e+=w()?0:100,0,e+=v()?0:100,0,e+=p()?0:100,0,e+=E()?0:100,0,parseInt(e/5,10)}function P(e){var t=e.title,n=e.passed?"ok":"not ok";return o.a.createElement("code",{className:n},t)}function N(e){var t=e.title,n=e.value;return o.a.createElement("code",null,t,": ",n)}var j=function(e,t,n){if(n.length){var a="data:text/csv;charset=utf-8,",o="latitude,longitude,accuracy,altitude,altitudeAccuracy,heading,speed".split(",");a+=o.join(",")+",timestamp\r\n",n.forEach(function(e){a+=function(e,t){var n=t.map(function(t){return null===e.coords[t]?"":e.coords[t].toString()});return n.push(e.timestamp),n.join(",")+"\r\n"}(e,o)});var r=encodeURI(a),i=document.createElement("a");i.setAttribute("href",r),i.setAttribute("download","customers.csv"),document.body.appendChild(i),i.click(),document.body.removeChild(i),i.click(),console.log("clicked")}},A=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(d.a)(this,Object(u.a)(t).call(this,e))).state={position:"",error:"",errorOne:"",prevWatchPositions:[],prevOnePositions:[]},n.handleWatchChanges=n.handleWatchChanges.bind(Object(h.a)(Object(h.a)(n))),n.handleWatchClick=n.handleWatchClick.bind(Object(h.a)(Object(h.a)(n))),n.handleOneClick=n.handleOneClick.bind(Object(h.a)(Object(h.a)(n))),n.handleOneChanges=n.handleOneChanges.bind(Object(h.a)(Object(h.a)(n))),n.downloadWatchCSV=n.downloadWatchCSV.bind(Object(h.a)(Object(h.a)(n))),n.downloadOneCSV=n.downloadOneCSV.bind(Object(h.a)(Object(h.a)(n))),n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"handleWatchChanges",value:function(e){var t=e.position,n=e.error;if(n)this.setState({error:n});else{var a={coords:{},timestamp:t.timestamp};for(var o in t.coords)console.log("key: ",o,t.coords[o]),a.coords[o]=t.coords[o];this.setState({prevWatchPositions:[].concat(Object(l.a)(this.state.prevWatchPositions),a)})}}},{key:"handleOneChanges",value:function(e){var t=e.position,n=e.error;if(n)this.setState({errorOne:n});else{var a={coords:{},timestamp:t.timestamp};for(var o in t.coords)console.log("key: ",o,t.coords[o]),a.coords[o]=t.coords[o];this.setState({prevOnePositions:[].concat(Object(l.a)(this.state.prevOnePositions),a)})}}},{key:"handleWatchClick",value:function(e){!function(e){var t;y()&&(f=e,t=navigator.geolocation.watchPosition(S,k,b))}(this.handleWatchChanges)}},{key:"handleOneClick",value:function(){var e;e=this.handleOneChanges,y()&&(O=e,navigator.geolocation.getCurrentPosition(C,k,b))}},{key:"componentDidMount",value:function(){window.addEventListener("orientationchange",this.doOnOrientationChange),this.doOnOrientationChange()}},{key:"doOnOrientationChange",value:function(){window.innerHeight>window.innerWidth?console.log("portrait"):console.log("landscape")}},{key:"downloadOneCSV",value:function(e){return e.stopPropagation(),j(0,0,this.state.prevOnePositions),!1}},{key:"downloadWatchCSV",value:function(e){return e.stopPropagation(),j(0,0,this.state.prevWatchPositions),!1}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App"},o.a.createElement("header",null,"Geolocation"),o.a.createElement("section",{className:"side-container"},o.a.createElement("div",{className:"head"+(W()<50?" sad":"")},o.a.createElement("div",{className:"face"},o.a.createElement("div",{className:"mouth"}),o.a.createElement("div",{className:"eye-group"},o.a.createElement("div",{className:"eye eye-left"}),o.a.createElement("div",{className:"eye eye-right"})))),o.a.createElement("div",null,"Confidence: ",W()),o.a.createElement("div",{className:"details"},o.a.createElement(N,{title:"HasLiedOs",value:JSON.stringify(p())}),o.a.createElement(N,{title:"HasLiedBrowser",value:JSON.stringify(w())}),o.a.createElement(N,{title:"HasLiedLanguages",value:JSON.stringify(v())}),o.a.createElement(N,{title:"HasLiedResolution",value:JSON.stringify(E())}),o.a.createElement("hr",null),o.a.createElement(N,{title:"Language",value:JSON.stringify(navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||"en")}),o.a.createElement(N,{title:"Timezone IANA",value:JSON.stringify(g())}),o.a.createElement(N,{title:"Timezone Offset",value:JSON.stringify((new Date).getTimezoneOffset()/60)+"hr(s)"}),o.a.createElement(P,{title:"Geolocation API Availability",passed:y()}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("h1",null," Watch Position"),o.a.createElement("button",{onClick:this.handleWatchClick},"Start Watching Geolocation"),o.a.createElement("code",null,this.state.error),o.a.createElement("ul",{className:"entries"},o.a.createElement("li",{key:"w0"},o.a.createElement("code",{className:"index-column"},"#"),o.a.createElement("code",null,"latitude"),o.a.createElement("code",null,"longitude"),o.a.createElement("code",null,"accuracy"),o.a.createElement("code",null,"altitude"),o.a.createElement("code",null,"altitudeAccuracy"),o.a.createElement("code",null,"heading"),o.a.createElement("code",null,"speed"),o.a.createElement("code",null,"timestamp")),this.state.prevWatchPositions.map(function(t,n){return o.a.createElement("li",{key:"w"+n},o.a.createElement("code",{className:"index-column"},n,"."),o.a.createElement("code",null,t.coords.latitude),o.a.createElement("code",null,t.coords.longitude),o.a.createElement("code",null,t.coords.accuracy,"m"),o.a.createElement("code",null,t.coords.altitude),o.a.createElement("code",null,t.coords.altitudeAccuracy),o.a.createElement("code",null,t.coords.heading),o.a.createElement("code",null,t.coords.speed),o.a.createElement("code",null,"+",t.timestamp-e.state.prevWatchPositions[0].timestamp," ",10===(t.timestamp+"").length?"sec":"ms"))})),o.a.createElement("a",{id:"downloadwatchCSV",onClick:this.downloadWatchCSV},"Download CSV"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("h1",null," One time Position"),o.a.createElement("button",{onClick:this.handleOneClick},"Get Quick Geolocation"),o.a.createElement("code",null,this.state.error),o.a.createElement("ul",{className:"entries"},o.a.createElement("li",{key:"0"},o.a.createElement("code",{className:"index-column"},"#"),o.a.createElement("code",null,"latitude"),o.a.createElement("code",null,"longitude"),o.a.createElement("code",null,"accuracy"),o.a.createElement("code",null,"altitude"),o.a.createElement("code",null,"altitudeAccuracy"),o.a.createElement("code",null,"heading"),o.a.createElement("code",null,"speed"),o.a.createElement("code",null,"timestamp")),this.state.prevOnePositions&&this.state.prevOnePositions.map(function(t,n){return o.a.createElement("li",{key:n},o.a.createElement("code",{className:"index-column"},n,"."),o.a.createElement("code",null,t.coords.latitude),o.a.createElement("code",null,t.coords.longitude),o.a.createElement("code",null,t.coords.accuracy,"m"),o.a.createElement("code",null,t.coords.altitude),o.a.createElement("code",null,t.coords.altitudeAccuracy),o.a.createElement("code",null,t.coords.heading),o.a.createElement("code",null,t.coords.speed),o.a.createElement("code",null,"+",t.timestamp-e.state.prevOnePositions[0].timestamp," ",10===(t.timestamp+"").length?"sec":"ms"))})),o.a.createElement("a",{id:"downloadoneCSV",onClick:this.downloadOneCSV},"Download CSV"))),o.a.createElement("footer",null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.55b69ef8.chunk.js.map