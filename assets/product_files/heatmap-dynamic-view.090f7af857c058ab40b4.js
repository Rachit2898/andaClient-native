!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=200)}({136:function(t,e,n){"use strict";function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var u,c=t[Symbol.iterator]();!(r=(u=c.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function i(){return Math.max(document.body.scrollWidth,document.documentElement.scrollWidth,document.body.offsetWidth,document.documentElement.offsetWidth,document.documentElement.clientWidth)}function u(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.documentElement.clientHeight)}function c(t,e){return e[t]||function(t){var e=r(t.split(":"),2),n=e[0],o=e[1];return/[.>]/.test(o)||o.indexOf("#")>0?"0"===n?document.querySelector(o):document.querySelectorAll(o)[n]:document.getElementById(o.replace("#",""))}(t)}function a(t){var e=t.getBoundingClientRect(),n=e.x,r=e.y;return{x:window.scrollX+n,y:window.scrollY+r}}function l(t,e){var n=t.x,r=t.y,o=e.offset_x,i=e.offset_y;return{x:Math.round(Math.max(0,n+o)),y:Math.round(Math.max(0,r+i))}}function s(t){var e=window.getComputedStyle(t);if("visible"!==e.visibility||"none"===e.display||e.opacity<.1)return!1;var n=t.getBoundingClientRect(),r=n.left+1,o=n.right-1,i=n.top+1,u=n.bottom-1,c=document.elementFromPoint(r,i),a=document.elementFromPoint(o,i),l=document.elementFromPoint(r,u),s=document.elementFromPoint(o,u);return c===t||a===t||l===t||s===t||!!(t.contains(c)||t.contains(a)||t.contains(l)||t.contains(s))}n.r(e),n.d(e,"getWidth",(function(){return i})),n.d(e,"getHeight",(function(){return u})),n.d(e,"getElement",(function(){return c})),n.d(e,"getXYForElement",(function(){return a})),n.d(e,"addOffsets",(function(){return l})),n.d(e,"isVisible",(function(){return s}))},151:function(t,e,n){"use strict";n.r(e),n.d(e,"DH_MESSAGES",(function(){return r})),n.d(e,"MUTATION_OBSERVER_DELAY",(function(){return o})),n.d(e,"DEBOUNCE_DRAW_DELAY",(function(){return i})),n.d(e,"THROTTLE_MUTATION_DELAY",(function(){return u}));var r={loaded:"dh_site_loaded",resize:"dh_resize",update:"dh_update",scroll:"dh_scroll",navigate:"dh_navigate",selectors:"dh_selectors",unload:"dh_unload",heatData:"dh_heat_data",clickRegion:"dh_click_region"},o=250,i=100,u=1200},200:function(t,e,n){function r(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?r(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var u,c=t[Symbol.iterator]();!(r=(u=c.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var a=n(151),l=a.DH_MESSAGES,s=a.DEBOUNCE_DRAW_DELAY,f=a.THROTTLE_MUTATION_DELAY,d=a.MUTATION_OBSERVER_DELAY,m=n(201).calculateDataMinMax,y=n(136),p=y.getWidth,h=y.getHeight,v=y.getElement,b=y.isVisible,g=y.addOffsets,O=y.getXYForElement,w=n(202).pipe,E=n(203),_=E.initClickRegions,j=E.updateClickRegions,S=n(204).throttle;!function(){var t;if(new RegExp(".*?".concat(hj.insightsHost)).test(document.referrer)){var e={};e["0:html>body"]=document.body;var n={};[].slice.call(document.querySelectorAll("body *")).forEach((function(t){var n=hj.selector(2).get(hj.hq(t)).replace(".ng-scope","").replace(".ng-binding","");e[n]=t}));var r=function(){var t=Object.keys(n).reduce((function(t,r){var o=v(r,e);return o?(b(o)?n[r].forEach((function(e){var n=u(e,2),i=n[0],c=n[1];t.visiblePoints.push({selector:r,element:o,offset_x:i,offset_y:c}),t.allPoints.push({selector:r,element:o,offset_x:i,offset_y:c})})):n[r].forEach((function(e){var n=u(e,2),i=n[0],c=n[1];t.allPoints.push({selector:r,element:o,offset_x:i,offset_y:c})})),t):t}),{visiblePoints:[],allPoints:[]}),r=t.visiblePoints,i=t.allPoints,c=function(t){return o({element:t.element},g(O(t.element),t))};return{visiblePoints:r.map(c),allPoints:i.map(c)}},i=function(t){window.parent.postMessage({type:l.heatData,payload:t},"*")},c=function(){if(t){var e=a(t);i(e),j()}},a=function(t){return n=o({},t.dataPoints),w(r,m)()},y=function(t){var e=null;return function(){e&&clearTimeout(e),e=setTimeout((function(){c(),e=null}),t)}};window.addEventListener("message",(function(n){var r;if((null==n||null===(r=n.data)||void 0===r?void 0:r.type)===l.selectors){var o,u;t=null==n||null===(o=n.data)||void 0===o?void 0:o.payload;var c=a(t);i(c),_(null==n||null===(u=n.data)||void 0===u?void 0:u.payload.dataPoints,e)}}),!1),window.addEventListener("scroll",y(s),!0),window.addEventListener("resize",y(s),!0),window.addEventListener("mousemove",y(s),!0);var E=new MutationObserver(S(c,f));setTimeout((function(){E.observe(document.documentElement||document.body,{attributes:!0,attributeOldValue:!0,childList:!0,subtree:!0,characterData:!0})}),d),window.addEventListener("beforeunload",(function(){window.parent.postMessage({type:l.unload},"*")})),window.parent.postMessage({type:l.loaded,payload:{url:window.location.href,dimensions:[p(),h()+20]}},"*")}}()},201:function(t,e,n){"use strict";function r(t){var e,n=t.visiblePoints,r=t.allPoints,o=function(t){var e=t.x,n=t.y;return"".concat(e,":").concat(n)},i=r.reduce((function(t,e){var n=t.seen,r=n[o(e)];return r?r.count++:n[o(e)]={count:1},t.data.push(e),t.max=Math.max(n[o(e)].count,t.max),t}),{seen:{},data:[],max:0}).max;return{data:(e=n,e.map((function(t){return{x:t.x,y:t.y}}))),min:0,max:i}}n.r(e),n.d(e,"calculateDataMinMax",(function(){return r}))},202:function(t,e,n){"use strict";n.r(e),n.d(e,"pipe",(function(){return r}));var r=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){return e.reduce((function(t,e){return e(t)}),t)}}},203:function(t,e,n){"use strict";n.r(e),n.d(e,"initClickRegions",(function(){return d})),n.d(e,"updateClickRegions",(function(){return m}));var r=n(151),o=n(136),i=0,u=[],c={};function a(t){window.parent.postMessage({type:r.DH_MESSAGES.clickRegion,payload:t},"*")}function l(){return[].slice.call(Object.keys(u)).reduce((function(t,e){var n=Object(o.getElement)(e,c);return c[e]&&n&&Object(o.isVisible)(n)&&(t+=u[e].length),t}),0)}function s(t){var e=hj.selector(2).get(hj.hq(t.target)).replace(".ng-scope","").replace(".ng-binding","");if(u[e]&&u[e].length){var n=t.target.getBoundingClientRect();a({isVisible:!0,top:n.top,left:n.left,width:n.width,height:n.height,elementClicks:u[e].length,totalClicks:i})}else a({isVisible:!1})}function f(t){i=t}function d(t,e){!function(t){u=t}(t),function(t){c=t}(e),f(l()),window.addEventListener("mouseover",s)}function m(){f(l())}},204:function(t,e,n){"use strict";n.r(e),n.d(e,"throttle",(function(){return r}));var r=function(t,e){var n;return function(){var r=arguments,o=this;n||(t.apply(o,r),n=!0,setTimeout((function(){return n=!1}),e))}}}});
