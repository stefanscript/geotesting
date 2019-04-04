(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(18)},16:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(4),c=a.n(l),r=(a(16),a(2)),i=a(5),s=a(6),d=a(8),u=a(7),m=a(9),h=a(1);a(17);function E(){return navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||"en"}function g(){return(new Date).getTimezoneOffset()/60}function v(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){return""}}var p,b,f={enableHighAccuracy:!0,timeout:1e4,maximumAge:0},O={position:"",error:""};function C(){return"geolocation"in navigator}function w(e){console.log("g1");var t=e.coords;O.position=e,console.log(e),b&&b({position:e}),console.log("Your current position is:"),console.log("Latitude : ".concat(t.latitude)),console.log("Longitude: ".concat(t.longitude)),console.log("More or less ".concat(t.accuracy," meters."))}function y(e){var t="unknown error";1===e.code?t="permission denied":2===e.code?t="position unavailable (error response from location provider)":3===e.code&&(t="timed out"),O.error="ERROR(".concat(e.code,"): reason: ").concat(t,", ").concat(e.message),p&&p({error:O.error}),b&&b({error:O.error}),console.warn(O.error)}function k(e){var t=e.coords;O.position=e,console.log(e),p&&p({position:e}),console.log("Watch: Your current position is:",new Date),console.log("Latitude : ".concat(t.latitude)),console.log("Longitude: ".concat(t.longitude)),console.log("More or less ".concat(t.accuracy," meters."))}function W(){var e,t=0;return t+=function(e){if("en-CA"===e||"fr-CA"===e||"en"===e)return 100;return 0}(E()),0,t+=(e=v(),"america/toronto"===String(e).toLowerCase()?100:0),0,t+=function(e){var t=parseInt(e,10);return t>=4&&t<=6?100:0}(g()),0,parseInt(t/3,10)}function N(e){var t=e.title,a=e.passed?"ok":"not ok";return o.a.createElement("code",{className:a},t)}function j(e){var t=e.title,a=e.value;return o.a.createElement("code",null,t,": ",a)}var S=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).state={position:"",error:"",prevWatchPositions:[],prevOnePositions:[]},a.handleWatchChanges=a.handleWatchChanges.bind(Object(h.a)(Object(h.a)(a))),a.handleWatchClick=a.handleWatchClick.bind(Object(h.a)(Object(h.a)(a))),a.handleOneClick=a.handleOneClick.bind(Object(h.a)(Object(h.a)(a))),a.handleOneChanges=a.handleOneChanges.bind(Object(h.a)(Object(h.a)(a))),a.downloadWatchCSV=a.downloadWatchCSV.bind(Object(h.a)(Object(h.a)(a))),a.downloadOneCSV=a.downloadOneCSV.bind(Object(h.a)(Object(h.a)(a))),a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"handleWatchChanges",value:function(e){var t=e.position;if(!e.error){var a={coords:{},timestamp:t.timestamp};for(var n in t.coords)console.log("key: ",n,t.coords[n]),a.coords[n]=t.coords[n];this.setState({prevWatchPositions:[].concat(Object(r.a)(this.state.prevWatchPositions),a)})}}},{key:"handleOneChanges",value:function(e){var t=e.position;if(!e.error){var a={coords:{},timestamp:t.timestamp};for(var n in t.coords)console.log("key: ",n,t.coords[n]),a.coords[n]=t.coords[n];this.setState({prevOnePositions:[].concat(Object(r.a)(this.state.prevOnePositions),a)})}}},{key:"handleWatchClick",value:function(){!function(e){var t;C()&&(p=e,t=navigator.geolocation.watchPosition(k,y,f))}(this.handleWatchChanges)}},{key:"handleOneClick",value:function(){var e;e=this.handleOneChanges,C()&&(b=e,navigator.geolocation.getCurrentPosition(w,y,f))}},{key:"componentDidMount",value:function(){window.addEventListener("orientationchange",this.doOnOrientationChange),this.doOnOrientationChange()}},{key:"doOnOrientationChange",value:function(){window.innerHeight>window.innerWidth?console.log("portrait"):console.log("landscape")}},{key:"downloadOneCSV",value:function(){}},{key:"downloadWatchCSV",value:function(){}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App"},o.a.createElement("header",null,"Geolocation"),o.a.createElement("section",{className:"side-container"},o.a.createElement("div",{className:"head"+(W()<50?" sad":"")},o.a.createElement("div",{className:"face"},o.a.createElement("div",{className:"mouth"}),o.a.createElement("div",{className:"eye-group"},o.a.createElement("div",{className:"eye eye-left"}),o.a.createElement("div",{className:"eye eye-right"})))),o.a.createElement("div",null,"Confidence: ",W()),o.a.createElement("div",{className:"details"},o.a.createElement(j,{title:"Language",value:JSON.stringify(E())}),o.a.createElement(j,{title:"Timezone IANA",value:JSON.stringify(v())}),o.a.createElement(j,{title:"Timezone Offset",value:JSON.stringify(g())+"hr(s)"}),o.a.createElement(N,{title:"Geolocation API Availability",passed:C()}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("h1",null," Watch Position"),o.a.createElement("button",{onClick:this.handleWatchClick},"Start Watching Geolocation"),o.a.createElement("code",null,this.state.error),o.a.createElement("ul",{className:"entries"},o.a.createElement("li",{key:"w0"},o.a.createElement("code",{className:"index-column"},"#"),o.a.createElement("code",null,"latitude"),o.a.createElement("code",null,"longitude"),o.a.createElement("code",null,"accuracy"),o.a.createElement("code",null,"altitude"),o.a.createElement("code",null,"altitudeAccuracy"),o.a.createElement("code",null,"heading"),o.a.createElement("code",null,"speed"),o.a.createElement("code",null,"timestamp")),this.state.prevWatchPositions.map(function(t,a){return o.a.createElement("li",{key:"w"+a},o.a.createElement("code",{className:"index-column"},a,"."),o.a.createElement("code",null,t.coords.latitude),o.a.createElement("code",null,t.coords.longitude),o.a.createElement("code",null,t.coords.accuracy,"m"),o.a.createElement("code",null,t.coords.altitude),o.a.createElement("code",null,t.coords.altitudeAccuracy),o.a.createElement("code",null,t.coords.heading),o.a.createElement("code",null,t.coords.speed),o.a.createElement("code",null,"+",t.timestamp-e.state.prevWatchPositions[0].timestamp," ",10===(t.timestamp+"").length?"sec":"ms"))})),o.a.createElement("a",{href:"",id:"downloadwatchCSV",onClick:this.downloadWatchCSV},"Download CSV"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("h1",null," One time Position"),o.a.createElement("button",{onClick:this.handleOneClick},"Get Quick Geolocation"),o.a.createElement("ul",{className:"entries"},o.a.createElement("li",{key:"0"},o.a.createElement("code",{className:"index-column"},"#"),o.a.createElement("code",null,"latitude"),o.a.createElement("code",null,"longitude"),o.a.createElement("code",null,"accuracy"),o.a.createElement("code",null,"altitude"),o.a.createElement("code",null,"altitudeAccuracy"),o.a.createElement("code",null,"heading"),o.a.createElement("code",null,"speed"),o.a.createElement("code",null,"timestamp")),this.state.prevOnePositions&&this.state.prevOnePositions.map(function(t,a){return o.a.createElement("li",{key:a},o.a.createElement("code",{className:"index-column"},a,"."),o.a.createElement("code",null,t.coords.latitude),o.a.createElement("code",null,t.coords.longitude),o.a.createElement("code",null,t.coords.accuracy,"m"),o.a.createElement("code",null,t.coords.altitude),o.a.createElement("code",null,t.coords.altitudeAccuracy),o.a.createElement("code",null,t.coords.heading),o.a.createElement("code",null,t.coords.speed),o.a.createElement("code",null,"+",t.timestamp-e.state.prevOnePositions[0].timestamp," ",10===(t.timestamp+"").length?"sec":"ms"))})),o.a.createElement("a",{href:"",id:"downloadoneCSV",onClick:this.downloadOneCSV},"Download CSV"))),o.a.createElement("footer",null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.177bf537.chunk.js.map