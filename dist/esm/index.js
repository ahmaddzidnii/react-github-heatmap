import{jsx as n,jsxs as t}from"react/jsx-runtime";import e from"classnames";import{Tooltip as r}from"react-tooltip";import{useMemo as a,useCallback as o}from"react";var i=function(){return i=Object.assign||function(n){for(var t,e=1,r=arguments.length;e<r;e++)for(var a in t=arguments[e])Object.prototype.hasOwnProperty.call(t,a)&&(n[a]=t[a]);return n},i.apply(this,arguments)};"function"==typeof SuppressedError&&SuppressedError;var l=function(n){var t=new Date(n),e=t.getDate(),r=new Intl.DateTimeFormat("en-US",{month:"long"}).format(t),a=e%10==1&&11!==e?"st":e%10==2&&12!==e?"nd":e%10==3&&13!==e?"rd":"th";return"".concat(r," ").concat(e).concat(a)},c=[{level:0,name:"No contributions."},{level:1,name:"Low contributions."},{level:2,name:"Medium-low contributions."},{level:3,name:"Medium-high contributions."},{level:4,name:"High contributions."}],d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];!function(n,t){void 0===t&&(t={});var e=t.insertAt;if("undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===e&&r.firstChild?r.insertBefore(a,r.firstChild):r.appendChild(a),a.styleSheet?a.styleSheet.cssText=n:a.appendChild(document.createTextNode(n))}}('[data-level="0"] {\n  background-color: #ebedf0;\n}\n\n[data-level="1"] {\n  background-color: #9be9a8;\n}\n\n[data-level="2"] {\n  background-color: #40c463;\n}\n\n[data-level="3"] {\n  background-color: #30a14e;\n}\n\n[data-level="4"] {\n  background-color: #216e39;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border-width: 0;\n}\n\n.contribution-graph {\n  border: 1px solid #e1e4e8;\n  border-radius: 6px;\n  padding: 16px;\n  width: max-content;\n}\n\n.contribution-graph__container {\n  display: flex;\n  flex-direction: column;\n}\n\n.contribution-graph__table-wrapper {\n  overflow-x: auto;\n  overflow-y: hidden;\n  max-width: calc(100vw - 32px);\n}\n\n.contribution-graph__table {\n  width: max-content;\n  overflow: hidden;\n  position: relative;\n  border-collapse: separate;\n  padding: 0 16px 0 16px;\n}\n\n.contribution-graph__months-row {\n  height: 13px;\n}\n\n.contribution-graph__day-label {\n  width: 12px;\n}\n\n.contribution-graph__month {\n  font-size: 12px;\n  padding: 0.125rem 0.5rem 0.125rem 0;\n}\n\n.contribution-graph__week-row {\n  height: 10px;\n}\n\n.contribution-graph__day-label-wrapper {\n  position: relative;\n  width: 28px;\n  text-align: right;\n}\n\n.contribution-graph__day-label {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  left: 0px;\n  font-size: 12px;\n  padding: 0.125rem 0.5rem 0.125rem 0;\n  -webkit-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  -o-transform: translateY(-50%);\n}\n\n.contribution-graph__cell {\n  width: 10px;\n  height: 10px;\n  border-radius: 3px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  -ms-border-radius: 3px;\n  -o-border-radius: 3px;\n  outline: 1px solid rgba(27, 31, 35, 0.06);\n  outline-offset: -1px;\n}\n\n.contribution-graph__legend {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-left: 48px;\n  padding-right: 16px;\n  margin-top: 0.25rem;\n}\n\n.contribution-graph__legend-text {\n  font-size: 12px;\n}\n\n.contribution-graph__legend-scale {\n  display: flex;\n  align-items: center;\n}\n\n.contribution-graph__legend-box {\n  width: 10px;\n  height: 10px;\n  border-radius: 3px;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  -ms-border-radius: 3px;\n  -o-border-radius: 3px;\n  outline: 1px solid rgba(27, 31, 35, 0.06);\n  outline-offset: -1px;\n  margin-right: 0.25rem;\n}\n\n.contribution-graph__legend-label {\n  font-size: 12px;\n}\n\n.mr-1 {\n  margin-right: 0.25rem;\n}\n');var s=function(s){var p=s.tooltipContent,u=void 0===p?function(n){return n.contributions?"".concat(n.contributions," contributions on ").concat(l(n.date)):"No contributions on ".concat(l(n.date))}:p,h=function(n,t){var e={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&t.indexOf(r)<0&&(e[r]=n[r]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(n);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(n,r[a])&&(e[r[a]]=n[r[a]])}return e}(s,["tooltipContent"]),g=function(n){var t=n.endDate,e=new Date(t);for(e.setDate(t.getDate()-364);0!==e.getDay();)e.setDate(e.getDate()-1);return{startDate:e,endDate:t}}({endDate:new Date}),m=g.startDate,b=g.endDate,f=h.startDate?new Date(h.startDate):m,_=h.endDate?new Date(h.endDate):b,v=h.data||[],x=function(n){if(!n)return"";var t="".concat(n.getFullYear(),"-").concat(String(n.getMonth()+1).padStart(2,"0"),"-").concat(String(n.getDate()).padStart(2,"0")),e=v.find((function(n){return n.date===t}))||{date:t,contributions:null};return u(e)},y=a((function(){var n=v.filter((function(n){return n.contributions>0})).map((function(n){return n.contributions}));if(0===n.length)return{level1:1,level2:2,level3:3};var t=Math.max.apply(Math,n);return{level1:Math.ceil(.25*t),level2:Math.ceil(.5*t),level3:Math.ceil(.75*t)}}),[v]),w=o((function(n){if(!n)return 0;var t=n.toISOString().split("T")[0],e=v.find((function(n){return n.date===t}));return e&&0!==e.contributions?e.contributions<=y.level1?1:e.contributions<=y.level2?2:e.contributions<=y.level3?3:4:0}),[v,y]),D=function(n,t){for(var e=Array.from({length:7},(function(){return Array(53).fill(null)})),r=new Date(n),a=0,o=r.getDay();r<=t&&a<53;)e[o][a]=new Date(r),r.setDate(r.getDate()+1),0===r.getDay()&&a++,o=6===o?0:o+1;return e}(f,_),N=function(n,t){var e=[],r=new Date(n);r.setFullYear(r.getFullYear()+1),t>r&&(t=r);var a=[],o=new Date(n);for(o.setDate(1);o<=t;)a.push({name:new Intl.DateTimeFormat("en-US",{month:"long"}).format(o),year:o.getFullYear(),days:new Date(o.getFullYear(),o.getMonth()+1,0).getDate()}),o=new Date(o.getFullYear(),o.getMonth()+1,1);for(var i=a.reduce((function(n,t){return n+t.days}),0),l=53,c=0;c<a.length;c++){var d=a[c];if(c===a.length-1)e.push({name:d.name,year:d.year,colSpan:l});else{var s=Math.round(d.days/i*53);s=Math.max(1,s),s=Math.min(s,l-(a.length-c-1)),e.push({name:d.name,year:d.year,colSpan:s}),l-=s}}return e}(f,_);return n("div",{className:"contribution-graph",children:t("div",{className:"contribution-graph__container",children:[t("div",{className:"contribution-graph__table-wrapper",children:[t("table",{className:"contribution-graph__table",children:[n("caption",{className:"sr-only",children:"Contribution Graph"}),n("thead",{children:t("tr",{className:"contribution-graph__months-row",children:[n("td",{className:" contribution-graph__day-label",children:n("span",{className:"sr-only",children:"Day of Week"})}),N.map((function(e,r){return t("td",{colSpan:e.colSpan,className:"contribution-graph__month",children:[n("span",{className:"sr-only",children:e.name}),n("span",{children:e.name.slice(0,3)})]},"".concat(e.name,"-").concat(e.year,"-").concat(r))}))]})}),n("tbody",{children:D.map((function(r,a){return t("tr",{className:"contribution-graph__week-row",children:[n("td",{className:"contribution-graph__day-label-wrapper",children:n("span",{className:e("contribution-graph__day-label",{"sr-only":a%2!=1}),children:d[a]})}),r.map((function(t,e){return n("td",t?{tabIndex:0,"data-level":w(t),"data-date":"".concat(t.getFullYear(),"-").concat(String(t.getMonth()+1).padStart(2,"0"),"-").concat(String(t.getDate()).padStart(2,"0")),"data-tooltip-id":"tooltip","data-tooltip-content":x(t),className:"contribution-graph__cell"}:{},e)}))]},a)}))})]}),n(r,i({id:"tooltip"},h.tooltipOptions))]}),t("div",{className:"contribution-graph__legend",children:[n("span",{className:"contribution-graph__legend-text",children:"Learn how we count contributions"}),t("div",{className:"contribution-graph__legend-scale",children:[n("span",{className:"contribution-graph__legend-label mr-1",children:"Less"}),c.map((function(t){return n("div",{"data-level":t.level,className:"contribution-graph__legend-box",children:n("span",{className:"sr-only",children:t.name})},t.level)})),n("span",{className:"contribution-graph__legend-label",children:"More"})]})]})]})})};export{s as ReactGithubHeatmap};
//# sourceMappingURL=index.js.map
