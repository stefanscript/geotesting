(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(18)},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(4),l=n.n(c),r=(n(16),n(2)),i=n(5),s=n(6),d=n(8),u=n(7),m=n(9),h=n(1);n(17);function g(){return navigator.languages&&navigator.languages.length?navigator.languages[0]:navigator.userLanguage||navigator.language||navigator.browserLanguage||"en"}function E(){return(new Date).getTimezoneOffset()/60}function v(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){return""}}var p,f,b={enableHighAccuracy:!0,timeout:1e4,maximumAge:0},O={position:"",error:""};function C(){return"geolocation"in navigator}function y(e){console.log("g1");var t=e.coords;O.position=e,console.log(e),f&&f({position:e}),console.log("Your current position is:"),console.log("Latitude : ".concat(t.latitude)),console.log("Longitude: ".concat(t.longitude)),console.log("More or less ".concat(t.accuracy," meters."))}function w(e){var t="unknown error";1===e.code?t="permission denied":2===e.code?t="position unavailable (error response from location provider)":3===e.code&&(t="timed out"),O.error="ERROR(".concat(e.code,"): reason: ").concat(t,", ").concat(e.message),p&&p({error:O.error}),f&&f({error:O.error}),console.warn(O.error)}function k(e){var t=e.coords;O.position=e,console.log(e),p&&p({position:e}),console.log("Watch: Your current position is:",new Date),console.log("Latitude : ".concat(t.latitude)),console.log("Longitude: ".concat(t.longitude)),console.log("More or less ".concat(t.accuracy," meters."))}function W(){var e,t=0;return t+=function(e){if("en-CA"===e||"fr-CA"===e||"en"===e)return 100;return 0}(g()),0,t+=(e=v(),"america/toronto"===String(e).toLowerCase()?100:0),0,t+=function(e){var t=parseInt(e,10);return t>=4&&t<=6?100:0}(E()),0,parseInt(t/3,10)}function S(e){var t=e.title,n=e.passed?"ok":"not ok";return o.a.createElement("code",{className:n},t)}function j(e){var t=e.title,n=e.value;return o.a.createElement("code",null,t,": ",n)}var N=function(e,t,n){if(n.length){var a="data:text/csv;charset=utf-8,",o="latitude,longitude,accuracy,altitude,altitudeAccuracy,heading,speed".split(",");a+=o.join(",")+",timestamp\r\n",n.forEach(function(e){a+=function(e,t){var n=t.map(function(t){return null===e.coords[t]?"":e.coords[t].toString()});return n.push(e.timestamp),n.join(",")+"\r\n"}(e,o)});var c=encodeURI(a),l=document.createElement("a");l.setAttribute("href",c),l.setAttribute("download","customers.csv"),document.body.appendChild(l),l.click(),document.body.removeChild(l),l.click(),console.log("clicked")}},P=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(d.a)(this,Object(u.a)(t).call(this,e))).state={position:"",error:"",errorOne:"",prevWatchPositions:[],prevOnePositions:[]},n.handleWatchChanges=n.handleWatchChanges.bind(Object(h.a)(Object(h.a)(n))),n.handleWatchClick=n.handleWatchClick.bind(Object(h.a)(Object(h.a)(n))),n.handleOneClick=n.handleOneClick.bind(Object(h.a)(Object(h.a)(n))),n.handleOneChanges=n.handleOneChanges.bind(Object(h.a)(Object(h.a)(n))),n.downloadWatchCSV=n.downloadWatchCSV.bind(Object(h.a)(Object(h.a)(n))),n.downloadOneCSV=n.downloadOneCSV.bind(Object(h.a)(Object(h.a)(n))),n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"handleWatchChanges",value:function(e){var t=e.position,n=e.error;if(n)this.setState({error:n});else{var a={coords:{},timestamp:t.timestamp};for(var o in t.coords)console.log("key: ",o,t.coords[o]),a.coords[o]=t.coords[o];this.setState({prevWatchPositions:[].concat(Object(r.a)(this.state.prevWatchPositions),a)})}}},{key:"handleOneChanges",value:function(e){var t=e.position,n=e.error;if(n)this.setState({errorOne:n});else{var a={coords:{},timestamp:t.timestamp};for(var o in t.coords)console.log("key: ",o,t.coords[o]),a.coords[o]=t.coords[o];this.setState({prevOnePositions:[].concat(Object(r.a)(this.state.prevOnePositions),a)})}}},{key:"handleWatchClick",value:function(e){!function(e){var t;C()&&(p=e,t=navigator.geolocation.watchPosition(k,w,b))}(this.handleWatchChanges)}},{key:"handleOneClick",value:function(){var e;e=this.handleOneChanges,C()&&(f=e,navigator.geolocation.getCurrentPosition(y,w,b))}},{key:"componentDidMount",value:function(){window.addEventListener("orientationchange",this.doOnOrientationChange),this.doOnOrientationChange()}},{key:"doOnOrientationChange",value:function(){window.innerHeight>window.innerWidth?console.log("portrait"):console.log("landscape")}},{key:"downloadOneCSV",value:function(e){return e.stopPropagation(),N(0,0,this.state.prevOnePositions),!1}},{key:"downloadWatchCSV",value:function(e){return e.stopPropagation(),N(0,0,this.state.prevWatchPositions),!1}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App"},o.a.createElement("header",null,"Geolocation"),o.a.createElement("section",{className:"side-container"},o.a.createElement("div",{className:"head"+(W()<50?" sad":"")},o.a.createElement("div",{className:"face"},o.a.createElement("div",{className:"mouth"}),o.a.createElement("div",{className:"eye-group"},o.a.createElement("div",{className:"eye eye-left"}),o.a.createElement("div",{className:"eye eye-right"})))),o.a.createElement("div",null,"Confidence: ",W()),o.a.createElement("div",{className:"details"},o.a.createElement(j,{title:"Language",value:JSON.stringify(g())}),o.a.createElement(j,{title:"Timezone IANA",value:JSON.stringify(v())}),o.a.createElement(j,{title:"Timezone Offset",value:JSON.stringify(E())+"hr(s)"}),o.a.createElement(S,{title:"Geolocation API Availability",passed:C()}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("h1",null," Watch Position"),o.a.createElement("button",{onClick:this.handleWatchClick},"Start Watching Geolocation"),o.a.createElement("code",null,this.state.error),o.a.createElement("ul",{className:"entries"},o.a.createElement("li",{key:"w0"},o.a.createElement("code",{className:"index-column"},"#"),o.a.createElement("code",null,"latitude"),o.a.createElement("code",null,"longitude"),o.a.createElement("code",null,"accuracy"),o.a.createElement("code",null,"altitude"),o.a.createElement("code",null,"altitudeAccuracy"),o.a.createElement("code",null,"heading"),o.a.createElement("code",null,"speed"),o.a.createElement("code",null,"timestamp")),this.state.prevWatchPositions.map(function(t,n){return o.a.createElement("li",{key:"w"+n},o.a.createElement("code",{className:"index-column"},n,"."),o.a.createElement("code",null,t.coords.latitude),o.a.createElement("code",null,t.coords.longitude),o.a.createElement("code",null,t.coords.accuracy,"m"),o.a.createElement("code",null,t.coords.altitude),o.a.createElement("code",null,t.coords.altitudeAccuracy),o.a.createElement("code",null,t.coords.heading),o.a.createElement("code",null,t.coords.speed),o.a.createElement("code",null,"+",t.timestamp-e.state.prevWatchPositions[0].timestamp," ",10===(t.timestamp+"").length?"sec":"ms"))})),o.a.createElement("a",{id:"downloadwatchCSV",onClick:this.downloadWatchCSV},"Download CSV"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("h1",null," One time Position"),o.a.createElement("button",{onClick:this.handleOneClick},"Get Quick Geolocation"),o.a.createElement("code",null,this.state.error),o.a.createElement("ul",{className:"entries"},o.a.createElement("li",{key:"0"},o.a.createElement("code",{className:"index-column"},"#"),o.a.createElement("code",null,"latitude"),o.a.createElement("code",null,"longitude"),o.a.createElement("code",null,"accuracy"),o.a.createElement("code",null,"altitude"),o.a.createElement("code",null,"altitudeAccuracy"),o.a.createElement("code",null,"heading"),o.a.createElement("code",null,"speed"),o.a.createElement("code",null,"timestamp")),this.state.prevOnePositions&&this.state.prevOnePositions.map(function(t,n){return o.a.createElement("li",{key:n},o.a.createElement("code",{className:"index-column"},n,"."),o.a.createElement("code",null,t.coords.latitude),o.a.createElement("code",null,t.coords.longitude),o.a.createElement("code",null,t.coords.accuracy,"m"),o.a.createElement("code",null,t.coords.altitude),o.a.createElement("code",null,t.coords.altitudeAccuracy),o.a.createElement("code",null,t.coords.heading),o.a.createElement("code",null,t.coords.speed),o.a.createElement("code",null,"+",t.timestamp-e.state.prevOnePositions[0].timestamp," ",10===(t.timestamp+"").length?"sec":"ms"))})),o.a.createElement("a",{href:"",id:"downloadoneCSV",onClick:this.downloadOneCSV},"Download CSV"))),o.a.createElement("footer",null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.83a7b1be.chunk.js.map