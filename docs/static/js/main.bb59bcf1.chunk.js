(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(18)},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),l=n(4),c=n.n(l),r=(n(16),n(2)),i=n(5),s=n(6),d=n(8),u=n(7),m=n(9),h=n(1);n(17);function E(){return navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||"en"}function g(){return(new Date).getTimezoneOffset()/60}function v(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){return""}}var p,b,f={enableHighAccuracy:!0,timeout:1e4,maximumAge:0},O={position:"",error:""};function C(){return"geolocation"in navigator}function w(e){console.log("g1");var t=e.coords;O.position=e,console.log(e),b&&b({position:e}),console.log("Your current position is:"),console.log("Latitude : ".concat(t.latitude)),console.log("Longitude: ".concat(t.longitude)),console.log("More or less ".concat(t.accuracy," meters."))}function y(e){var t="unknown error";1===e.code?t="permission denied":2===e.code?t="position unavailable (error response from location provider)":3===e.code&&(t="timed out"),O.error="ERROR(".concat(e.code,"): reason: ").concat(t,", ").concat(e.message),p&&p({error:O.error}),b&&b({error:O.error}),console.warn(O.error)}function k(e){var t=e.coords;O.position=e,console.log(e),p&&p({position:e}),console.log("Watch: Your current position is:",new Date),console.log("Latitude : ".concat(t.latitude)),console.log("Longitude: ".concat(t.longitude)),console.log("More or less ".concat(t.accuracy," meters."))}function W(){var e,t=0;return t+=function(e){if("en-CA"===e||"fr-CA"===e||"en"===e)return 100;return 0}(E()),0,t+=(e=v(),"america/toronto"===String(e).toLowerCase()?100:0),0,t+=function(e){var t=parseInt(e,10)<=6;return t>=4&&t<=6?100:0}(g()),0,parseInt(t/3,10)}function N(e){var t=e.title,n=e.passed?"ok":"not ok";return o.a.createElement("code",{className:n},t)}function j(e){var t=e.title,n=e.value;return o.a.createElement("code",null,t,": ",n)}var S=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(d.a)(this,Object(u.a)(t).call(this,e))).state={position:"",error:"",prevWatchPositions:[],prevOnePositions:[]},n.handleWatchChanges=n.handleWatchChanges.bind(Object(h.a)(Object(h.a)(n))),n.handleWatchClick=n.handleWatchClick.bind(Object(h.a)(Object(h.a)(n))),n.handleOneClick=n.handleOneClick.bind(Object(h.a)(Object(h.a)(n))),n.handleOneChanges=n.handleOneChanges.bind(Object(h.a)(Object(h.a)(n))),n.downloadWatchCSV=n.downloadWatchCSV.bind(Object(h.a)(Object(h.a)(n))),n.downloadOneCSV=n.downloadOneCSV.bind(Object(h.a)(Object(h.a)(n))),n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"handleWatchChanges",value:function(e){var t=e.position;if(!e.error){var n={coords:{},timestamp:t.timestamp};for(var a in t.coords)console.log("key: ",a,t.coords[a]),n.coords[a]=t.coords[a];this.setState({prevWatchPositions:[].concat(Object(r.a)(this.state.prevWatchPositions),n)})}}},{key:"handleOneChanges",value:function(e){var t=e.position;if(!e.error){var n={coords:{},timestamp:t.timestamp};for(var a in t.coords)console.log("key: ",a,t.coords[a]),n.coords[a]=t.coords[a];this.setState({prevOnePositions:[].concat(Object(r.a)(this.state.prevOnePositions),n)})}}},{key:"handleWatchClick",value:function(){!function(e){var t;C()&&(p=e,t=navigator.geolocation.watchPosition(k,y,f))}(this.handleWatchChanges)}},{key:"handleOneClick",value:function(){var e;e=this.handleOneChanges,C()&&(b=e,navigator.geolocation.getCurrentPosition(w,y,f))}},{key:"componentDidMount",value:function(){window.addEventListener("orientationchange",this.doOnOrientationChange),this.doOnOrientationChange()}},{key:"doOnOrientationChange",value:function(){window.innerHeight>window.innerWidth?console.log("portrait"):console.log("landscape")}},{key:"downloadOneCSV",value:function(){}},{key:"downloadWatchCSV",value:function(){}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("header",null,"Geolocation"),o.a.createElement("section",{className:"side-container"},o.a.createElement("div",{className:"head"+(W()<50?" sad":"")},o.a.createElement("div",{className:"face"},o.a.createElement("div",{className:"mouth"}),o.a.createElement("div",{className:"eye-group"},o.a.createElement("div",{className:"eye eye-left"}),o.a.createElement("div",{className:"eye eye-right"})))),o.a.createElement("div",null,"Confidence: ",W()),o.a.createElement("div",{className:"details"},o.a.createElement(j,{title:"Language",value:JSON.stringify(E())}),o.a.createElement(j,{title:"Timezone IANA",value:JSON.stringify(v())}),o.a.createElement(j,{title:"Timezone Offset",value:JSON.stringify(g())+"hr(s)"}),o.a.createElement(N,{title:"Geolocation API Availability",passed:C()}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("h1",null," Watch Position"),o.a.createElement("button",{onClick:this.handleWatchClick},"Start Watching Geolocation"),o.a.createElement("code",null,this.state.error),o.a.createElement("ul",{className:"entries"},o.a.createElement("li",{key:"w0"},o.a.createElement("code",{className:"index-column"},"#"),o.a.createElement("code",null,"latitude"),o.a.createElement("code",null,"longitude"),o.a.createElement("code",null,"accuracy"),o.a.createElement("code",null,"altitude"),o.a.createElement("code",null,"altitudeAccuracy"),o.a.createElement("code",null,"heading"),o.a.createElement("code",null,"speed"),o.a.createElement("code",null,"timestamp")),this.state.prevWatchPositions.map(function(e,t){return o.a.createElement("li",{key:"w"+t},o.a.createElement("code",{className:"index-column"},t,"."),o.a.createElement("code",null,e.coords.latitude),o.a.createElement("code",null,e.coords.longitude),o.a.createElement("code",null,e.coords.accuracy,"m"),o.a.createElement("code",null,e.coords.altitude),o.a.createElement("code",null,e.coords.altitudeAccuracy),o.a.createElement("code",null,e.coords.heading),o.a.createElement("code",null,e.coords.speed),o.a.createElement("code",null,e.timestamp))})),o.a.createElement("a",{href:"",id:"downloadwatchCSV",onClick:this.downloadWatchCSV},"Download CSV"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("h1",null," One time Position"),o.a.createElement("button",{onClick:this.handleOneClick},"Get Quick Geolocation"),o.a.createElement("ul",{className:"entries"},o.a.createElement("li",{key:"0"},o.a.createElement("code",{className:"index-column"},"#"),o.a.createElement("code",null,"latitude"),o.a.createElement("code",null,"longitude"),o.a.createElement("code",null,"accuracy"),o.a.createElement("code",null,"altitude"),o.a.createElement("code",null,"altitudeAccuracy"),o.a.createElement("code",null,"heading"),o.a.createElement("code",null,"speed"),o.a.createElement("code",null,"timestamp")),this.state.prevOnePositions.map(function(e,t){return o.a.createElement("li",{key:t},o.a.createElement("code",{className:"index-column"},t,"."),o.a.createElement("code",null,e.coords.latitude),o.a.createElement("code",null,e.coords.longitude),o.a.createElement("code",null,e.coords.accuracy,"m"),o.a.createElement("code",null,e.coords.altitude),o.a.createElement("code",null,e.coords.altitudeAccuracy),o.a.createElement("code",null,e.coords.heading),o.a.createElement("code",null,e.coords.speed),o.a.createElement("code",null,e.timestamp))})),o.a.createElement("a",{href:"",id:"downloadoneCSV",onClick:this.downloadOneCSV},"Download CSV"))),o.a.createElement("footer",null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.bb59bcf1.chunk.js.map