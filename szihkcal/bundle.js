!function u(t,e,r){function n(o,a){if(!e[o]){if(!t[o]){var s="function"==typeof require&&require
if(!a&&s)return s(o,!0)
if(i)return i(o,!0)
var c=new Error("Cannot find module '"+o+"'")
throw c.code="MODULE_NOT_FOUND",c}var l=e[o]={exports:{}}
t[o][0].call(l.exports,function(u){var e=t[o][1][u]
return n(e?e:u)},l,l.exports,u,t,e,r)}return e[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)n(r[o])
return n}({1:[function(u,t,e){},{}],2:[function(u,t,e){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(u){return"function"==typeof u}function i(u){return"number"==typeof u}function o(u){return"object"==typeof u&&null!==u}function a(u){return void 0===u}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(u){if(!i(u)||u<0||isNaN(u))throw TypeError("n must be a positive number")
return this._maxListeners=u,this},r.prototype.emit=function(u){var t,e,r,i,s,c
if(this._events||(this._events={}),"error"===u&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t
var l=new Error('Uncaught, unspecified "error" event. ('+t+")")
throw l.context=t,l}if(e=this._events[u],a(e))return!1
if(n(e))switch(arguments.length){case 1:e.call(this)
break
case 2:e.call(this,arguments[1])
break
case 3:e.call(this,arguments[1],arguments[2])
break
default:i=Array.prototype.slice.call(arguments,1),e.apply(this,i)}else if(o(e))for(i=Array.prototype.slice.call(arguments,1),c=e.slice(),r=c.length,s=0;s<r;s++)c[s].apply(this,i)
return!0},r.prototype.addListener=function(u,t){var e
if(!n(t))throw TypeError("listener must be a function")
return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",u,n(t.listener)?t.listener:t),this._events[u]?o(this._events[u])?this._events[u].push(t):this._events[u]=[this._events[u],t]:this._events[u]=t,o(this._events[u])&&!this._events[u].warned&&(e=a(this._maxListeners)?r.defaultMaxListeners:this._maxListeners,e&&e>0&&this._events[u].length>e&&(this._events[u].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[u].length),"function"==typeof console.trace&&console.trace())),this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(u,t){function e(){this.removeListener(u,e),r||(r=!0,t.apply(this,arguments))}if(!n(t))throw TypeError("listener must be a function")
var r=!1
return e.listener=t,this.on(u,e),this},r.prototype.removeListener=function(u,t){var e,r,i,a
if(!n(t))throw TypeError("listener must be a function")
if(!this._events||!this._events[u])return this
if(e=this._events[u],i=e.length,r=-1,e===t||n(e.listener)&&e.listener===t)delete this._events[u],this._events.removeListener&&this.emit("removeListener",u,t)
else if(o(e)){for(a=i;a-- >0;)if(e[a]===t||e[a].listener&&e[a].listener===t){r=a
break}if(r<0)return this
1===e.length?(e.length=0,delete this._events[u]):e.splice(r,1),this._events.removeListener&&this.emit("removeListener",u,t)}return this},r.prototype.removeAllListeners=function(u){var t,e
if(!this._events)return this
if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[u]&&delete this._events[u],this
if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t)
return this.removeAllListeners("removeListener"),this._events={},this}if(e=this._events[u],n(e))this.removeListener(u,e)
else if(e)for(;e.length;)this.removeListener(u,e[e.length-1])
return delete this._events[u],this},r.prototype.listeners=function(u){var t
return t=this._events&&this._events[u]?n(this._events[u])?[this._events[u]]:this._events[u].slice():[]},r.prototype.listenerCount=function(u){if(this._events){var t=this._events[u]
if(n(t))return 1
if(t)return t.length}return 0},r.listenerCount=function(u,t){return u.listenerCount(t)}},{}],3:[function(u,t,e){(function(u){function t(u,t){for(var e=0,r=u.length-1;r>=0;r--){var n=u[r]
"."===n?u.splice(r,1):".."===n?(u.splice(r,1),e++):e&&(u.splice(r,1),e--)}if(t)for(;e--;e)u.unshift("..")
return u}function r(u,t){if(u.filter)return u.filter(t)
for(var e=[],r=0;r<u.length;r++)t(u[r],r,u)&&e.push(u[r])
return e}var n=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,i=function(u){return n.exec(u).slice(1)}
e.resolve=function(){for(var e="",n=!1,i=arguments.length-1;i>=-1&&!n;i--){var o=i>=0?arguments[i]:u.cwd()
if("string"!=typeof o)throw new TypeError("Arguments to path.resolve must be strings")
o&&(e=o+"/"+e,n="/"===o.charAt(0))}return e=t(r(e.split("/"),function(u){return!!u}),!n).join("/"),(n?"/":"")+e||"."},e.normalize=function(u){var n=e.isAbsolute(u),i="/"===o(u,-1)
return u=t(r(u.split("/"),function(u){return!!u}),!n).join("/"),u||n||(u="."),u&&i&&(u+="/"),(n?"/":"")+u},e.isAbsolute=function(u){return"/"===u.charAt(0)},e.join=function(){var u=Array.prototype.slice.call(arguments,0)
return e.normalize(r(u,function(u,t){if("string"!=typeof u)throw new TypeError("Arguments to path.join must be strings")
return u}).join("/"))},e.relative=function(u,t){function r(u){for(var t=0;t<u.length&&""===u[t];t++);for(var e=u.length-1;e>=0&&""===u[e];e--);return t>e?[]:u.slice(t,e-t+1)}u=e.resolve(u).substr(1),t=e.resolve(t).substr(1)
for(var n=r(u.split("/")),i=r(t.split("/")),o=Math.min(n.length,i.length),a=o,s=0;s<o;s++)if(n[s]!==i[s]){a=s
break}for(var c=[],s=a;s<n.length;s++)c.push("..")
return c=c.concat(i.slice(a)),c.join("/")},e.sep="/",e.delimiter=":",e.dirname=function(u){var t=i(u),e=t[0],r=t[1]
return e||r?(r&&(r=r.substr(0,r.length-1)),e+r):"."},e.basename=function(u,t){var e=i(u)[2]
return t&&e.substr(-1*t.length)===t&&(e=e.substr(0,e.length-t.length)),e},e.extname=function(u){return i(u)[3]}
var o="b"==="ab".substr(-1)?function(u,t,e){return u.substr(t,e)}:function(u,t,e){return t<0&&(t=u.length+t),u.substr(t,e)}}).call(this,u("_process"))},{_process:4}],4:[function(u,t,e){function r(){throw new Error("setTimeout has not been defined")}function n(){throw new Error("clearTimeout has not been defined")}function i(u){if(p===setTimeout)return setTimeout(u,0)
if((p===r||!p)&&setTimeout)return p=setTimeout,setTimeout(u,0)
try{return p(u,0)}catch(t){try{return p.call(null,u,0)}catch(t){return p.call(this,u,0)}}}function o(u){if(A===clearTimeout)return clearTimeout(u)
if((A===n||!A)&&clearTimeout)return A=clearTimeout,clearTimeout(u)
try{return A(u)}catch(t){try{return A.call(null,u)}catch(t){return A.call(this,u)}}}function a(){F&&h&&(F=!1,h.length?E=h.concat(E):C=-1,E.length&&s())}function s(){if(!F){var u=i(a)
F=!0
for(var t=E.length;t;){for(h=E,E=[];++C<t;)h&&h[C].run()
C=-1,t=E.length}h=null,F=!1,o(u)}}function c(u,t){this.fun=u,this.array=t}function l(){}var p,A,f=t.exports={}
!function(){try{p="function"==typeof setTimeout?setTimeout:r}catch(u){p=r}try{A="function"==typeof clearTimeout?clearTimeout:n}catch(u){A=n}}()
var h,E=[],F=!1,C=-1
f.nextTick=function(u){var t=new Array(arguments.length-1)
if(arguments.length>1)for(var e=1;e<arguments.length;e++)t[e-1]=arguments[e]
E.push(new c(u,t)),1!==E.length||F||i(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=l,f.addListener=l,f.once=l,f.off=l,f.removeListener=l,f.removeAllListeners=l,f.emit=l,f.binding=function(u){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(u){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},{}],5:[function(u,t,e){function r(u){u=u.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]")
var t=new RegExp("[\\?&]"+u+"=([^&#]*)"),e=t.exec(location.search)
return null===e?"":e[1].replace(/\+/g," ")}function n(){var u=document.createElement("table")
u.className="month",document.getElementsByTagName("body")[0].appendChild(u)
var t=u.insertRow(u.rows.length),e=document.createElement("th")
e.className="month",t.appendChild(e),e.colSpan=7
var r=new Date,n=r.getFullYear(),o=r.getMonth()+1
e.appendChild(document.createTextNode(n+" "+i.month_name[o])),t=u.insertRow(u.rows.length),i.day_name.forEach(function(u){var e=document.createElement("th")
t.appendChild(e),e.appendChild(document.createTextNode(u))})
var a=new i.Calendar,c=a.monthdayscalendar(n,o)
c.forEach(function(t){var e=u.insertRow(u.rows.length)
t.forEach(function(u){var t=document.createElement("td")
if(t.className="day",e.appendChild(t),0==u)t.appendChild(document.createTextNode(" "))
else{t.appendChild(document.createTextNode(u)),t.appendChild(document.createElement("br"))
var r=s[Math.floor(Math.random()*s.length)]
t.appendChild(document.createTextNode(r))}})})}var i=u("node-calendar"),o=u("domready"),a=u("seed-random")
i.month_name=["","január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"],i.day_name=["hétfő","kedd","szerda","csütörtök","péntek","szombat","vasárnap"]
var s=["Segítségnyújtés gyermekeinknek az érzéseik elfogadásában (35. o.)","Együttműködésre bírni gyermekeinket (79. o.)","Büntetés helyett (118. o.)","Az önállóság támogatása (151. o.)","Dicséret és önértékelés (182. o.)","Hogy ne kelljen gyermekeinknek szerepet játszaniuk (211. o.)"]
o(function(){var u=r("seed")
u&&a(u,{global:!0}),n()})},{domready:50,"node-calendar":51,"seed-random":52}],6:[function(u,t,e){(function(e){function r(u,t,e){for(var r,n=!1,i=u.ranges.length-1;i>=0;i-=1){var o,a=u.ranges[i]
"number"===a.type?o=["binary","===",t,["num",a.value]]:(n=!0,o=["binary","&&",["binary",">=",t,["num",a.min.value]],["binary","<=",t,["num",a.max.value]]]),r=r?["binary","||",o,r]:o}return n&&!e&&(r=["binary","&&",["binary","===",t,["call",["dot",["name","Math"],"floor"],[t]]],r]),r}function n(u){switch(u.type){case"number":return["num",u.value]
case"n":case"i":case"v":case"w":case"f":case"t":return["name",u.type]
case"is":return["binary","==="].concat(u.operands.map(n))
case"isnot":return["binary","!=="].concat(u.operands.map(n))
case"mod":return["binary","%"].concat(u.operands.map(n))
case"and":return["binary","&&"].concat(u.operands.map(n))
case"or":return["binary","||"].concat(u.operands.map(n))
case"not":return["unary-prefix","!",n(u.operands)]
case"isnot":return["binary","!=="].concat(u.operands.map(n))
case"within":return r(u.operands[1],n(u.operands[0]),!0)
case"notwithin":return["unary-prefix","!",r(u.operands[1],n(u.operands[0]),!0)]
case"in":return r(u.operands[1],n(u.operands[0]),!1)
case"notin":return["unary-prefix","!",r(u.operands[1],n(u.operands[0]),!1)]
default:throw new Error("nodeToJavaScriptAst: Unknown node type: "+u.type)}}function i(u,t){t(u),u.operands&&u.operands.forEach(function(u){i(u,t)})}function o(u){this.topLevelNode=l.parse(u.replace(/^\s+|\s+$/g,"").replace(/\s{2,}/g," "))}var a=u("fs"),s=u("path"),c=u("pegjs"),l=c.buildParser(a.readFileSync(s.resolve(e,"cldrPluralRule.pegjs"),"utf-8"))
o.prototype={toJavaScriptAst:function(){return n(this.topLevelNode)},eachNode:function(u){i(this.topLevelNode,u)},updateIsUsedByTerm:function(u){return this.eachNode(function(t){["i","v","w","f","t","n"].indexOf(t.type)!==-1&&(u[t.type]=!0)}),u}},t.exports=o}).call(this,"/node_modules/cldr/lib")},{fs:1,path:3,pegjs:30}],7:[function(u,t,e){function r(){this.cldrPluralRuleByCount={}}var n=u("./CldrPluralRule"),i=u("./cldrPluralRuleTermFunctionByName"),o=u("uglify-js")
r.prototype={addRule:function(u,t){if("string"==typeof u){if(u=u.replace(/\s*@(?:decimal|integer).*$/,""),0===u.length)return
u=new n(u)}this.cldrPluralRuleByCount[t]=u},toJavaScriptFunctionBodyAst:function(){var u=[],t={}
Object.keys(this.cldrPluralRuleByCount).forEach(function(e){var r=this.cldrPluralRuleByCount[e]
r.updateIsUsedByTerm(t),u.push(["if",r.toJavaScriptAst(),["return",["string",e]]])},this),u.push(["return",["string","other"]])
var e=[]
return["i","v","w","f","t"].forEach(function(u){t[u]&&e.push([u,o.parser.parse(i[u].toString())[1][0][3][0][1]])}),0!==Object.keys(t).length&&u.unshift(["if",["binary","===",["unary-prefix","typeof",["name","n"]],["string","string"]],["stat",["assign",!0,["name","n"],["call",["name","parseInt"],[["name","n"],["num",10]]]]],void 0]),e.length>0&&u.unshift(["var",e]),u}},t.exports=r},{"./CldrPluralRule":6,"./cldrPluralRuleTermFunctionByName":10,"uglify-js":43}],8:[function(u,t,e){function r(u){n.extend(this,u),this.ruleByValue={}}var n=u("underscore")
r.getSafeRendererName=function(u){return("render-"+u).replace(/[^\w-]/g,"-").replace(/[-_]+([0-9a-z])/gi,function(u,t){return t.toUpperCase()}).replace("GREEKNUMERALMAJUSCULES","GreekNumeralMajuscules")},r.prototype={toFunctionAst:function(){function u(t){function i(){for(var u=1;10*u<=parseInt(t.value,10);)u*=10
return u}var o=[],a=t.rbnf
a=a.replace(/^'/,"")
t.radix||10
a.replace(/(?:([\<\>\=])(?:(%%?[\w\-]+)|([#,0.]+))?\1)|(?:\[([^\]]+)\])|([\x7f-\uffff:'\.\s\w\d\-]+)/gi,function(a,s,c,l,p,A){if(s){var f
if("<"===s)if(/^\d+$/.test(t.value))f=["call",["dot",["name","Math"],"floor"],[["binary","/",["name","n"],["num",i()]]]]
else{if("-x"===t.value)throw new Error("<< not allowed in negative number rule")
f=["call",["dot",["name","Math"],"floor"],[["name","n"]]]}else">"===s?f=/\./.test(t.value)?["call",["name","parseInt"],[["call",["dot",["call",["name","String"],[["name","n"]]],"replace"],[["regexp","\\d*\\.",""],["string",""]]],["num",10]]]:"-x"===t.value?["unary-prefix","-",["name","n"]]:["binary","%",["name","n"],["num",i()]]:"="===s&&(f=["name","n"])
if(c){var h=r.getSafeRendererName(c)
n[h]=!0,o.push(["call",["dot",["name","this"],h],[f]])}else if(l)o.push(["call",["dot",["name","this"],"renderNumber"],[f,["string",l]]])
else if(">"===s)o.push(["call",["dot",["name","this"],e.type],[f]])
else{if("<"!==s)throw new Error("== not supported!")
o.push(["call",["dot",["name","this"],e.type],[f]])}}else if(p){var E=u({radix:t.radix,rbnf:p,value:t.value})
o.push(["conditional",["binary","===",["name","n"],["num",parseInt(t.value,10)]],["string",""],E])}else{if(!A)throw new Error("Unknown token in "+t.rbnf)
o.push(["string",A])}}),0===o.length&&(o=[["string",""]])
for(var s=o.shift();o.length>0;)s=["binary","+",s,o.shift()]
return s}function t(t,e){return["if",t,["return",u(e)],null]}var e=this,n={},i=[]
return(this.ruleByValue["x.0"]||this.ruleByValue["x.x"])&&i.push(["var",[["isFractional",["binary","!==",["name","n"],["call",["dot",["name","Math"],"floor"],[["name","n"]]]]]]]),this.ruleByValue["x.0"]&&i.push(t(["name","isFractional"],this.ruleByValue["x.0"])),this.ruleByValue["-x"]&&i.push(t(["binary","<",["name","n"],["num",0]],this.ruleByValue["-x"])),this.ruleByValue["x.x"]&&i.push(t(["binary","&&",["name","isFractional"],["binary",">",["name","n"],["num",1]]],this.ruleByValue["x.x"])),this.ruleByValue["0.x"]&&i.push(t(["binary","&&",["binary",">",["name","n"],["num",0]],["binary","<",["name","n"],["num",1]]],this.ruleByValue["0.x"])),Object.keys(this.ruleByValue).filter(function(u){return/^\d+$/.test(u)}).map(function(u){return parseInt(u,10)}).sort(function(u,t){return t-u}).forEach(function(u){i.push(t(["binary",">=",["name","n"],["num",u]],this.ruleByValue[u]))},this),{functionAst:["function",null,["n"],i],dependencies:Object.keys(n)}}},t.exports=r},{underscore:44}],9:[function(u,t,e){(function(e,r){function n(u){for(var t=u.split("/"),e=0;e<t.length;e+=1)e>0&&".."===t[e]&&".."!==t[e-1]&&(t.splice(e-1,2),e-=2)
return t.join("/")}function i(u){return this instanceof i?(this.cldrPath=u,this.documentByFileName={},void(this.memoizerByFileName={})):new i(u)}var o=u("path"),a=u("fs"),s=u("underscore"),c=u("passerror"),l=u("memoizeasync"),p=u("xmldom").DOMParser,A=u("xpath"),f=u("seq"),h=u("./normalizeLocaleId"),E=u("./normalizeProperty"),F=u("./convertObjectsWithIntegerKeysToArrays"),C=u("./CldrPluralRuleSet"),d=u("./CldrRbnfRuleSet"),D=u("uglify-js"),v=u("unicoderegexp")
i.prototype={get fileNamesByTypeAndNormalizedLocaleId(){return this._fileNamesByTypeAndNormalizedLocaleId||(this._fileNamesByTypeAndNormalizedLocaleId={},["main","rbnf"].forEach(function(u){this._fileNamesByTypeAndNormalizedLocaleId[u]={}
var t
try{t=a.readdirSync(o.resolve(this.cldrPath,"common",u))}catch(u){if("ENOENT"===u.code)return}t.forEach(function(t){var e=t.match(/^(.*)\.xml$/)
e&&(this._fileNamesByTypeAndNormalizedLocaleId[u][h(e[1])]=o.resolve(this.cldrPath,"common",u,t))},this)},this)),this._fileNamesByTypeAndNormalizedLocaleId},get localeIds(){return this._localeIds||(this._localeIds=Object.keys(this.fileNamesByTypeAndNormalizedLocaleId.main)),this._localeIds},get calendarIds(){return this._calendarIds||(this._calendarIds=[],A.select('/ldmlBCP47/keyword/key[@name="ca"]/type',this.getDocument(o.resolve(this.cldrPath,"common","bcp47","calendar.xml"))).forEach(function(u){var t=u.getAttribute("name")
"gregory"===t&&(t="gregorian"),this._calendarIds.push(t)},this)),this._calendarIds},get numberSystemIds(){return this._numberSystemIds||(this._numberSystemIds=[],A.select('/ldmlBCP47/keyword/key[@name="nu"]/type',this.getDocument(o.resolve(this.cldrPath,"common","bcp47","number.xml"))).forEach(function(u){this._numberSystemIds.push(u.getAttribute("name"))},this)),this._numberSystemIds},get localesByParentLocale(){return this._localesByParentLocale||(this._localesByParentLocale={},A.select("/supplementalData/parentLocales/parentLocale",this.getDocument(o.resolve(this.cldrPath,"common","supplemental","supplementalData.xml"))).forEach(function(u){this._localesByParentLocale[h(u.getAttribute("parent"))]=u.getAttribute("locales").split(" ").map(function(u){return h(u)})},this)),this._localesByParentLocale},getDocument:function(u,t){var r=this
if(r.documentByFileName[u]){if(!t)return r.documentByFileName[u]
e.nextTick(function(){t(null,r.documentByFileName[u])})}else{if(!t)return r.documentByFileName[u]=(new p).parseFromString(a.readFileSync(u,"utf-8"))
r.memoizerByFileName[u]=r.memoizerByFileName[u]||l(function(t){a.readFile(u,"utf-8",c(t,function(e){var n=(new p).parseFromString(e)
r.documentByFileName[u]=n,t(null,n)}))}),r.memoizerByFileName[u](t)}},resolveParentLocaleId:function(u){if(u=h(u)){var t
return Object.keys(this.localesByParentLocale).forEach(function(e){this.localesByParentLocale[e].indexOf(u)>-1&&(t=e)},this),!t&&/_[^_]+$/.test(u)&&(t=u.replace(/_[^_]+$/,"")),t}},expandLocaleIdToPrioritizedList:function(u){if(u=h(u),!u)return[]
for(var t=[u],e=this.resolveParentLocaleId(u);e;)t.push(e),e=this.resolveParentLocaleId(e)
return t},getPrioritizedDocumentsForLocale:function(u,t){var e=this
return e.expandLocaleIdToPrioritizedList(u).concat("root").map(function(u){return e.fileNamesByTypeAndNormalizedLocaleId[t][h(u)]}).filter(function(u){return!!u}).map(function(u){return e.getDocument(u)})},preload:function(u,t){var e=this
"function"==typeof u&&(t=u,u=e.localeIds),u=(Array.isArray(u)?u:[u]).map(h)
var r={root:!0}
u.forEach(function(u){e.expandLocaleIdToPrioritizedList(u).forEach(function(u){r[u]=!0})})
var n=[o.resolve(e.cldrPath,"common","supplemental","plurals.xml"),o.resolve(e.cldrPath,"common","supplemental","numberingSystems.xml")]
Object.keys(r).forEach(function(u){["main","rbnf"].forEach(function(t){var r=e.fileNamesByTypeAndNormalizedLocaleId[t][u]
r&&n.push(r)})}),f(n).parEach(20,function(u){e.getDocument(u,this)}).seq(function(){t()}).catch(t)},createFinder:function(u){return function t(e){var r=[]
return u.forEach(function(i,o){var a=A.select(e,i)
if(0===a.length&&o===u.length-1)for(var s=e.split("/"),c=[];s.length>1;){var l=A.select(s.join("/")+"/alias",i)
if(l.length>0){var p=n(s.join("/")+"/"+l[0].getAttribute("path")+"/"+c.join("/"))
Array.prototype.push.apply(r,t(p))
break}c.unshift(s.pop())}else Array.prototype.push.apply(r,a)}),r}},extractLocaleDisplayPattern:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/localeDisplayNames/localeDisplayPattern/*").forEach(function(u){e[u.nodeName]=u.textContent}),e},extractLanguageDisplayNames:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/localeDisplayNames/languages/language").forEach(function(u){var t=h(u.getAttribute("type"))
e[t]=e[t]||u.textContent}),e},extractTimeZoneDisplayNames:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/dates/timeZoneNames/zone").forEach(function(u){var t,r=u.getAttribute("type"),n=A.select("exemplarCity",u)
if(n.length>0)t=n[0].textContent
else{var i=A.select("long/generic",u)
if(i.length>0)t=i[0].textContent
else{var o=A.select("long/standard",u)
o.length>0&&(t=o[0].textContent)}}t&&(e[r]=e[r]||t)}),e},extractTimeZoneFormats:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return["hourFormat","gmtFormat","gmtZeroFormat","regionFormat","fallbackFormat","fallbackRegionFormat"].forEach(function(u){t("/ldml/dates/timeZoneNames/"+u).forEach(function(u){var t=u.nodeName.replace(/Format$/,""),r=u.textContent
"hour"===t&&(r=r.split(";")),e[t]=e[t]||r})}),t("/ldml/dates/timeZoneNames/regionFormat[@type]").forEach(function(u){var t=u.getAttribute("type")
e.regions=e.regions||{},e.regions[t]=e.regions[t]||u.textContent}),e},extractTerritoryDisplayNames:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/localeDisplayNames/territories/territory").forEach(function(u){var t=u.getAttribute("type")
e[t]=e[t]||u.textContent}),e},extractCurrencyInfoById:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={},r={},n={}
t("/ldml/numbers/currencies/currency/displayName").forEach(function(u){var t=u.parentNode.getAttribute("type"),n=u.getAttribute("count")
n?(r[t]=r[t]||{},r[t][n]=u.textContent):e[t]=e[t]||u.textContent}),t("/ldml/numbers/currencies/currency/symbol").forEach(function(u){var t=u.parentNode.getAttribute("type")
n[t]=n[t]||u.textContent})
var i={}
return Object.keys(e).forEach(function(u){i[u]=s.extend({displayName:e[u],symbol:n[u]},r[u])}),i},extractScriptDisplayNames:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/localeDisplayNames/scripts/script").forEach(function(u){var t=u.getAttribute("type")
e[t]=e[t]||u.textContent}),e},extractKeyTypes:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/localeDisplayNames/keys/key").forEach(function(u){var t=u.getAttribute("type")
e[t]={displayName:u.textContent}}),t("/ldml/localeDisplayNames/types/type").forEach(function(u){var t=u.getAttribute("key"),r=E(u.getAttribute("type"))
e[t]=e[t]||{},e[t].types=e[t].types||{},e[t].types[r]=u.textContent}),e},extractTransformNames:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/localeDisplayNames/transformNames/transformName").forEach(function(u){var t=u.getAttribute("type")
e[t]=e[t]||u.textContent}),e},extractMeasurementSystemNames:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/localeDisplayNames/measurementSystemNames/measurementSystemName").forEach(function(u){var t=u.getAttribute("type")
e[t]=e[t]||u.textContent}),e},extractCodePatterns:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/localeDisplayNames/codePatterns/codePattern").forEach(function(u){var t=u.getAttribute("type")
e[t]=e[t]||u.textContent}),e},extractEraNames:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return["eraNames","eraAbbr"].forEach(function(u){var n={eraNames:"wide",eraAbbr:"abbreviated"}[u]
r("/ldml/dates/calendars/calendar[@type='"+t+"']/eras/"+u+"/era").forEach(function(u){var t=parseInt(u.getAttribute("type"),10)
e=e||{},e[n]=e[n]||{},e[n][t]=e[n][t]||u.textContent})}),F(e)},extractQuarterNames:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return["format","stand-alone"].forEach(function(u){var n=E(u);["abbreviated","narrow","wide"].forEach(function(i){r("/ldml/dates/calendars/calendar[@type='"+t+"']/quarters/quarterContext[@type='"+u+"']/quarterWidth[@type='"+i+"']/quarter").forEach(function(u){var t=parseInt(u.getAttribute("type"),10)-1
e=e||{},e[n]=e[n]||{},e[n][i]=e[n][i]||{},e[n][i][t]=e[n][i][t]||u.textContent})})}),F(e)},extractDayPeriods:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return["format","stand-alone"].forEach(function(u){var n=E(u);["abbreviated","narrow","wide","short"].forEach(function(i){r("/ldml/dates/calendars/calendar[@type='"+t+"']/dayPeriods/dayPeriodContext[@type='"+u+"']/dayPeriodWidth[@type='"+i+"']/dayPeriod").forEach(function(u){var t=u.getAttribute("type")
e=e||{},e[n]=e[n]||{},e[n][i]=e[n][i]||{},e[n][i][t]=e[n][i][t]||u.textContent})})}),e},extractCyclicNames:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return["dayParts","days","months","years","zodiacs"].forEach(function(u){["format"].forEach(function(n){["abbreviated","narrow","wide"].forEach(function(i){r("/ldml/dates/calendars/calendar[@type='"+t+"']/cyclicNameSets/cyclicNameSet[@type='"+u+"']/cyclicNameContext[@type='"+n+"']/cyclicNameWidth[@type='"+i+"']/cyclicName").forEach(function(t){var r=t.getAttribute("type")
e=e||{},e[u]=e[u]||{},e[u][n]=e[u][n]||{},e[u][n][i]=e[u][n][i]||{},e[u][n][i][r]=e[u][n][i][r]||t.textContent})})})}),F(e)},extractMonthNames:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return["format","stand-alone"].forEach(function(u){var n=E(u);["abbreviated","narrow","wide"].forEach(function(i){r("/ldml/dates/calendars/calendar[@type='"+t+"']/months/monthContext[@type='"+u+"']/monthWidth[@type='"+i+"']/month").forEach(function(u){var t=parseInt(u.getAttribute("type"),10)-1
e=e||{},e[n]=e[n]||{},e[n][i]=e[n][i]||{},e[n][i][t]=e[n][i][t]||u.textContent})})}),F(e)},extractMonthPatterns:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return["format","numeric","stand-alone"].forEach(function(u){var n=E(u);["abbreviated","narrow","wide","all"].forEach(function(i){r("/ldml/dates/calendars/calendar[@type='"+t+"']/monthPatterns/monthPatternContext[@type='"+u+"']/monthPatternWidth[@type='"+i+"']/monthPattern").forEach(function(u){var t=u.getAttribute("type")
e=e||{},e[n]=e[n]||{},e[n][i]=e[n][i]||{},e[n][i][t]=e[n][i][t]||u.textContent})})}),e},extractDayNames:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),n={sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6}
return["format","numeric","stand-alone"].forEach(function(u){var i=E(u);["abbreviated","narrow","wide","short"].forEach(function(o){r("/ldml/dates/calendars/calendar[@type='"+t+"']/days/dayContext[@type='"+u+"']/dayWidth[@type='"+o+"']/day").forEach(function(u){var t=n[u.getAttribute("type")]
e=e||{},e[i]=e[i]||{},e[i][o]=e[i][o]||{},e[i][o][t]=e[i][o][t]||u.textContent})})}),F(e)},extractFields:function(u){var t,e=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return e("/ldml/dates/fields/field/displayName").forEach(function(u){var e=u.parentNode.getAttribute("type")
t=t||{},t[e]=t[e]||{},t[e].displayName=t[e].displayName||u.textContent}),e("/ldml/dates/fields/field/relative").forEach(function(u){var e=u.parentNode.getAttribute("type"),r=u.getAttribute("type")
t=t||{},t[e]=t[e]||{},t[e].relative=t[e].relative||{},t[e].relative[r]=t[e].relative[r]||u.textContent}),e("/ldml/dates/fields/field/relativeTime/relativeTimePattern").forEach(function(u){var e=u.parentNode,r=e.parentNode.getAttribute("type"),n=e.getAttribute("type"),i=u.getAttribute("count")
t=t||{},t[r]=t[r]||{},t[r].relativeTime=t[r].relativeTime||{},t[r].relativeTime[n]=t[r].relativeTime[n]||{},t[r].relativeTime[n][i]=t[r].relativeTime[n][i]||u.textContent}),t},extractDateTimePatterns:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return r("/ldml/dates/calendars/calendar[@type='"+t+"']/dateTimeFormats/dateTimeFormatLength/dateTimeFormat").forEach(function(u){var t=u.parentNode.getAttribute("type"),r=A.select("pattern",u)
if(1!==r.length)throw new Error("Expected exactly one pattern in dateTimeFormatNode")
e=e||{},e[t]=e[t]||r[0].textContent}),e},extractDateOrTimeFormats:function(u,t,e){t=t||"gregorian"
var r,n=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return n("/ldml/dates/calendars/calendar[@type='"+t+"']/"+e+"Formats/"+e+"FormatLength/"+e+"Format/*").forEach(function(u){var t=u.parentNode.parentNode.getAttribute("type")
r=r||{},r[t]=r[t]||u.textContent}),r},extractDateFormats:function(u,t){return this.extractDateOrTimeFormats(u,t,"date")},extractTimeFormats:function(u,t){return this.extractDateOrTimeFormats(u,t,"time")},extractDateFormatItems:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return r("/ldml/dates/calendars/calendar[@type='"+t+"']/dateTimeFormats/availableFormats/dateFormatItem").forEach(function(u){var t=u.getAttribute("id")
e=e||{},e[t]=e[t]||u.textContent}),e},extractDateIntervalFormats:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return r("/ldml/dates/calendars/calendar[@type='"+t+"']/dateTimeFormats/intervalFormats/intervalFormatItem").forEach(function(u){for(var t={},r=0;r<u.childNodes.length;r+=1){var n=u.childNodes[r]
if(1===n.nodeType){var i=n.getAttribute("id"),o=i
t[o]=t[o]||n.textContent}}var a=u.getAttribute("id")
e=e||{},e[a]=e[a]||t}),e},extractDateIntervalFallbackFormat:function(u,t){t=t||"gregorian"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return r("/ldml/dates/calendars/calendar[@type='"+t+"']/dateTimeFormats/intervalFormats/intervalFormatFallback").forEach(function(u){e=e||u.textContent}),e},extractNumberSymbols:function(u,t){t=t||"latn"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return r("/ldml/numbers/symbols[@numberSystem = '"+t+"']/*[name() != 'alias']").concat(r("/ldml/numbers/symbols/*[name() != 'alias']")).forEach(function(u){var t=u.nodeName
e=e||{},e[t]=e[t]||u.textContent}),e},extractNumberFormats:function(u,t){t=t||"latn"
var e,r=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return["scientific","decimal","currency","percent"].forEach(function(u){["full","long","medium","short"].forEach(function(n){r("/ldml/numbers/"+u+"Formats[@numberSystem = '"+t+"']/"+u+"FormatLength[@type='"+n+"']/"+u+"Format/pattern").forEach(function(t){var r=t.getAttribute("type"),i=t.getAttribute("count")
e=e||{},e[u]=e[u]||{},e[u][n]=e[u][n]||{},e[u][n][r]=e[u][n][r]||{},e[u][n][r][i]=e[u][n][r][i]||t.textContent})}),r("/ldml/numbers/"+u+"Formats[@numberSystem = '"+t+"']/"+u+"FormatLength[not(@type)]/"+u+"Format/pattern").forEach(function(t){e=e||{},e[u]=e[u]||{},e[u].default=e[u].default||t.textContent}),r("/ldml/numbers/"+u+"Formats[@numberSystem = '"+t+"']/unitPattern").forEach(function(t){var r=t.getAttribute("count")
e=e||{},e[u]=e[u]||{},e[u][r]=e[u][r]||t.textContent})}),r("/ldml/numbers/currencyFormats[@numberSystem = '"+t+"']/currencySpacing").forEach(function(u){e=e||{},e.currency=e.currency||{},e.currency.currencySpacing=e.currency.currencySpacing||{},["before","after"].forEach(function(t){var r=e.currency.currencySpacing[t+"Currency"]=e.currency.currencySpacing[t+"Currency"]||{};["currencyMatch","surroundingMatch","insertBetween"].forEach(function(r){var n=A.select(t+"Currency/"+r,u)
n.length>0&&(e.currency.currencySpacing[t+"Currency"][r]=n[0].textContent)}),["currencyMatch","surroundingMatch"].forEach(function(u){r[u]&&(r[u]=v.expandCldrUnicodeSetIdToCharacterClass(r[u]))})})}),e},extractDefaultNumberSystemId:function(u){var t,e=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main"))
return e("/ldml/numbers/defaultNumberingSystem").forEach(function(u){t=t||u.textContent}),t},extractUnitPatterns:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/units/unitLength/unit/unitPattern").forEach(function(u){var t=u.parentNode,r=t.parentNode.getAttribute("type"),n=E(t.getAttribute("type"))
e[r]=e[r]||{},e[r].unit=e[r].unit||{},e[r].unit[n]=e[r].unit[n]||{}
var i=u.getAttribute("count")
e[r].unit[n][i]=e[r].unit[n][i]||u.textContent}),t("/ldml/units/unitLength/compoundUnit/compoundUnitPattern").forEach(function(u){var t=u.parentNode,r=t.parentNode.getAttribute("type"),n=t.getAttribute("type")
e[r].compoundUnit=e[r].compoundUnit||{},e[r].compoundUnit[n]=u.textContent}),e},extractDelimiters:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/delimiters/*").forEach(function(u){var t=u.nodeName
e[t]=e[t]||u.textContent}),e},extractListPatterns:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/listPatterns/listPattern/listPatternPart").forEach(function(u){var t=u.parentNode.getAttribute("type"),r=t?E(t):"default",n=u.getAttribute("type")
e[r]=e[r]||{},e[r][n]=e[r][n]||u.textContent}),e},extractCharacters:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={exemplar:{},ellipsis:{}}
return t("/ldml/characters/exemplarCharacters").forEach(function(u){var t=u.getAttribute("type"),r=t||"default"
e.exemplar[r]=e.exemplar[r]||u.textContent.replace(/^\[|\]$/g,"").split(" ")}),t("/ldml/characters/ellipsis").forEach(function(u){var t=u.getAttribute("type")
e.ellipsis[t]=e.ellipsis[t]||u.textContent}),t("/ldml/characters/moreInformation").forEach(function(u){e.moreInformation=e.moreInformation||u.textContent}),e},extractPluralRuleFunction:function(u){for(var t=this,e=t.getDocument(o.resolve(t.cldrPath,"common","supplemental","plurals.xml")),r=t.expandLocaleIdToPrioritizedList(u),n=[],i=0;i<r.length;i+=1){var a=r[i],s="@locales = '"+a+"' or starts-with(@locales, '"+a+"') or contains(@locales, ' "+a+" ') or substring(@locales, string-length(@locales) - string-length(' "+a+"') + 1) = ' "+a+"'",c=A.select("/supplementalData/plurals/pluralRules["+s+"]",e),l=new C
if(c.length>0){A.select("pluralRule",c[0]).forEach(function(u){l.addRule(u.textContent,u.getAttribute("count"))}),n=l.toJavaScriptFunctionBodyAst()
break}}return new Function("n",D.uglify.gen_code(["toplevel",n]))},extractRbnfFunctionByType:function(u,t){var e=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"rbnf")),r={}
e("/ldml/rbnf/rulesetGrouping/ruleset/rbnfrule").forEach(function(u){var t=d.getSafeRendererName(u.parentNode.getAttribute("type")),e=u.getAttribute("value")
if(r[t]=r[t]||new d({type:t}),!r[t].ruleByValue[e]){var n=u.getAttribute("radix")
r[t].ruleByValue[e]={value:e,rbnf:u.textContent.replace(/;$/,"").replace(/←/g,"<").replace(/→/g,">"),radix:n}}})
for(var n={},i=t?[].concat(t):Object.keys(r),o={renderNumber:String};i.length>0;){var a=i.shift()
if(!(a in n)){n[a]=!0
var s=r[a]
if(s){var c=s.toFunctionAst()
o[a]=new Function("n",D.uglify.gen_code(["toplevel",c.functionAst[3]])),Array.prototype.push.apply(i,c.dependencies)}}}return o},extractDigitsByNumberSystemId:function(){var u=this.getDocument(o.resolve(this.cldrPath,"common","supplemental","numberingSystems.xml")),t={}
return A.select("/supplementalData/numberingSystems/numberingSystem",u).forEach(function(u){var e=u.getAttribute("id")
if("numeric"===u.getAttribute("type"))t[e]=u.getAttribute("digits").split(/(?:)/)
else{var r=u.getAttribute("rules").split("/"),n=(3===r.length?h(r[0]):"root",d.getSafeRendererName(r[r.length-1]))
t[e]=n}},this),t},extractLayout:function(u){var t=this.createFinder(this.getPrioritizedDocumentsForLocale(u,"main")),e={}
return t("/ldml/layout/*/*").forEach(function(u){var t=u.nodeName,r=u.parentNode.nodeName
e[r]=e[r]||{},e[r][t]=e[r][t]||u.textContent}),e},extractTerritories:function(){var u=this.createFinder([this.getDocument(o.resolve(this.cldrPath,"common","supplemental","supplementalData.xml"))]),t={}
return u("/supplementalData/codeMappings/territoryCodes").forEach(function(u){var e=u.getAttribute("type"),r=u.getAttribute("numeric"),n=u.getAttribute("alpha3"),i={alpha2Code:e}
n&&(i.alpha3Code=n),r&&(i.numericCode=r),t[e]=i}),t},extractTerritoryContainmentGroups:function(){var u=this.createFinder([this.getDocument(o.resolve(this.cldrPath,"common","supplemental","supplementalData.xml"))]),t={},e={},r={}
return u("/supplementalData/territoryContainment/group").forEach(function(u){var n=u.getAttribute("type"),i=u.getAttribute("contains").split(" ")
e[n]||(e[n]=!0,t[n]={type:n,contains:i},i.forEach(function(u){r[u]=n}))}),Object.keys(t).forEach(function(u){u in r?t[u].parent=r[u]:"001"!==u&&delete t[u]}),t}},t.exports=new i(o.resolve(r,"../3rdparty/cldr/")),t.exports.load=function(u){return new i(u)}}).call(this,u("_process"),"/node_modules/cldr/lib")},{"./CldrPluralRuleSet":7,"./CldrRbnfRuleSet":8,"./convertObjectsWithIntegerKeysToArrays":11,"./normalizeLocaleId":12,"./normalizeProperty":13,_process:4,fs:1,memoizeasync:14,passerror:16,path:3,seq:34,"uglify-js":43,underscore:44,unicoderegexp:45,xmldom:46,xpath:49}],10:[function(u,t,e){e.i=function(u){return Math.floor(Math.abs(u))},e.v=function(u){return u.toString().replace(/^[^.]*\.?/,"").length},e.w=function(u){return u.toString().replace(/^[^.]*\.?|0+$/g,"").length},e.f=function(u){return parseInt(u.toString().replace(/^[^.]*\.?/,""),10)||0},e.t=function(u){return parseInt(u.toString().replace(/^[^.]*\.?|0+$/g,""),10)||0}},{}],11:[function(u,t,e){t.exports=function u(t){if(Array.isArray(t))return t.map(u)
if("object"==typeof t&&null!==t){var e=Object.keys(t)
if(0 in t||1 in t){for(var r=(0 in t?0:1),n=r+1;n in t;)n+=1
if(e.length>0&&n===e.length+r){var i,o=[]
for(i=0;i<r;i+=1)o.push(void 0)
for(i=r;i<e.length;i+=1)o.push(u(t[i]))
return o}}var a={}
return e.forEach(function(e){"undefined"!=typeof t[e]&&(a[e]=u(t[e]))}),a}return t}},{}],12:[function(u,t,e){t.exports=function(u){return u&&u.replace(/-/g,"_").toLowerCase()}},{}],13:[function(u,t,e){t.exports=function(u){return u.replace(/-([a-z])/g,function(u,t){return t.toUpperCase()})}},{}],14:[function(u,t,e){(function(r){!function(r,n){"object"==typeof e?t.exports=n(u("lru-cache")):"function"==typeof define&&define.amd?define(["LRUCache"],n):r.memoizeAsync=n(r.LRUCache)}(this,function(u){var t
t="function"==typeof setImmediate?setImmediate:"object"==typeof r&&r&&r.nextTick?r.nextTick:function(u){setTimeout(u,0)}
var e=1
return function(r,n){function i(){var u=this,e=Array.prototype.slice.call(arguments),l=e.pop(),p=String(s(e)),A=a.get(o+p),h=!1
"undefined"!=typeof A?(i.refreshAge&&f.apply(null,e)>i.refreshAge&&!c[p]&&(h=!0),t(function(){l.apply(u,A)})):c[p]?c[p].push(l):(c[p]=[l],h=!0),h&&r.apply(n.context||u,e.concat(function(){var e=Array.prototype.slice.call(arguments),r=c[p]
e[0]&&!n.errors||a.set(o+p,e),r&&(delete c[p],t(function(){r.forEach(function(t){t.apply(u,e)})}))}))}n=n||{}
var o,a,s=n.argumentsStringifier||function(u){return u.map(String).join("")},c={}
if("cacheKeyPrefix"in n?o=String(n.cacheKeyPrefix):(o=e+"",e+=1),n.cache)a=n.cache
else{var l={}
for(var p in n)if(Object.prototype.hasOwnProperty.call(n,p)){var A=n[p]
"length"===p?l.length=function(u){return n.length.apply(this,u)}:"argumentsStringifier"!==p&&"cacheKeyPrefix"!==p&&(l[p]=A)}a=new u(l)}i.refreshAge=n.refreshAge||null,i.cache=a,i.cacheKeyPrefix=o,i.argumentsStringifier=s,i.peek=function(){return a.peek(o+s(Array.prototype.slice.call(arguments)))},i.getTtl=function(){var u=a._cache[o+s(Array.prototype.slice.call(arguments))]
if(!u)return-1
if(0!==u.now)return Math.max(-1,u.now-Date.now()+a._maxAge)}
var f=i.getAge=function(){var u=a._cache[o+s(Array.prototype.slice.call(arguments))]
if(!u)return-1
if(0!==u.now)return Date.now()-u.now}
return i.purge=function(){a.del(o+s(Array.prototype.slice.call(arguments)))},i.purgeAll=function(){for(var u=a.keys(),t=0;t<u.length;t+=1){var e=u[t]
0===e.indexOf(o)&&a.del(e)}},i}})}).call(this,u("_process"))},{_process:4,"lru-cache":15}],15:[function(u,t,e){!function(){function u(u,t){return Object.prototype.hasOwnProperty.call(u,t)}function e(){return 1}function r(u){return this instanceof r?("number"==typeof u&&(u={max:u}),u||(u={}),this._max=u.max,(!this._max||"number"!=typeof this._max||this._max<=0)&&(this._max=1/0),this._lengthCalculator=u.length||e,"function"!=typeof this._lengthCalculator&&(this._lengthCalculator=e),this._allowStale=u.stale||!1,this._maxAge=u.maxAge||null,this._dispose=u.dispose,void this.reset()):new r(u)}function n(u,t,e){var r=u._cache[t]
return r&&(u._maxAge&&Date.now()-r.now>u._maxAge?(s(u,r),u._allowStale||(r=void 0)):e&&i(u,r),r&&(r=r.value)),r}function i(u,t){a(u,t),t.lu=u._mru++,u._lruList[t.lu]=t}function o(u){for(;u._lru<u._mru&&u._length>u._max;)s(u,u._lruList[u._lru])}function a(u,t){for(delete u._lruList[t.lu];u._lru<u._mru&&!u._lruList[u._lru];)u._lru++}function s(u,t){t&&(u._dispose&&u._dispose(t.key,t.value),u._length-=t.length,u._itemCount--,delete u._cache[t.key],a(u,t))}function c(u,t,e,r,n){this.key=u,this.value=t,this.lu=e,this.length=r,this.now=n}"object"==typeof t&&t.exports?t.exports=r:this.LRUCache=r,Object.defineProperty(r.prototype,"max",{set:function(u){(!u||"number"!=typeof u||u<=0)&&(u=1/0),this._max=u,this._length>this._max&&o(this)},get:function(){return this._max},enumerable:!0}),Object.defineProperty(r.prototype,"lengthCalculator",{set:function(u){if("function"!=typeof u){this._lengthCalculator=e,this._length=this._itemCount
for(var t in this._cache)this._cache[t].length=1}else{this._lengthCalculator=u,this._length=0
for(var t in this._cache)this._cache[t].length=this._lengthCalculator(this._cache[t].value),this._length+=this._cache[t].length}this._length>this._max&&o(this)},get:function(){return this._lengthCalculator},enumerable:!0}),Object.defineProperty(r.prototype,"length",{get:function(){return this._length},enumerable:!0}),Object.defineProperty(r.prototype,"itemCount",{get:function(){return this._itemCount},enumerable:!0}),r.prototype.forEach=function(u,t){t=t||this
for(var e=0,r=this._mru-1;r>=0&&e<this._itemCount;r--)if(this._lruList[r]){e++
var n=this._lruList[r]
this._maxAge&&Date.now()-n.now>this._maxAge&&(s(this,n),this._allowStale||(n=void 0)),n&&u.call(t,n.value,n.key,this)}},r.prototype.keys=function(){for(var u=new Array(this._itemCount),t=0,e=this._mru-1;e>=0&&t<this._itemCount;e--)if(this._lruList[e]){var r=this._lruList[e]
u[t++]=r.key}return u},r.prototype.values=function(){for(var u=new Array(this._itemCount),t=0,e=this._mru-1;e>=0&&t<this._itemCount;e--)if(this._lruList[e]){var r=this._lruList[e]
u[t++]=r.value}return u},r.prototype.reset=function(){if(this._dispose&&this._cache)for(var u in this._cache)this._dispose(u,this._cache[u].value)
this._cache=Object.create(null),this._lruList=Object.create(null),this._mru=0,this._lru=0,this._length=0,this._itemCount=0},r.prototype.dump=function(){return this._cache},r.prototype.dumpLru=function(){return this._lruList},r.prototype.set=function(t,e){if(u(this._cache,t))return this._dispose&&this._dispose(t,this._cache[t].value),this._maxAge&&(this._cache[t].now=Date.now()),this._cache[t].value=e,this.get(t),!0
var r=this._lengthCalculator(e),n=this._maxAge?Date.now():0,i=new c(t,e,this._mru++,r,n)
return i.length>this._max?(this._dispose&&this._dispose(t,e),!1):(this._length+=i.length,this._lruList[i.lu]=this._cache[t]=i,this._itemCount++,this._length>this._max&&o(this),!0)},r.prototype.has=function(t){if(!u(this._cache,t))return!1
var e=this._cache[t]
return!(this._maxAge&&Date.now()-e.now>this._maxAge)},r.prototype.get=function(u){return n(this,u,!0)},r.prototype.peek=function(u){return n(this,u,!1)},r.prototype.pop=function(){var u=this._lruList[this._lru]
return s(this,u),u||null},r.prototype.del=function(u){s(this,this._cache[u])}}()},{}],16:[function(u,t,e){t.exports=function(u,t){return function(e){e?u(e):t&&t.apply(this,[].slice.call(arguments,1))}}},{}],17:[function(require,module,exports){"use strict"
var arrays=require("./utils/arrays"),objects=require("./utils/objects"),compiler={passes:{check:{reportMissingRules:require("./compiler/passes/report-missing-rules"),reportLeftRecursion:require("./compiler/passes/report-left-recursion"),reportInfiniteLoops:require("./compiler/passes/report-infinite-loops")},transform:{removeProxyRules:require("./compiler/passes/remove-proxy-rules")},generate:{generateBytecode:require("./compiler/passes/generate-bytecode"),generateJavascript:require("./compiler/passes/generate-javascript")}},compile:function(ast,passes){var options=arguments.length>2?objects.clone(arguments[2]):{},stage
objects.defaults(options,{allowedStartRules:[ast.rules[0].name],cache:!1,trace:!1,optimize:"speed",output:"parser"})
for(stage in passes)passes.hasOwnProperty(stage)&&arrays.each(passes[stage],function(u){u(ast,options)})
switch(options.output){case"parser":return eval(ast.code)
case"source":return ast.code}}}
module.exports=compiler},{"./compiler/passes/generate-bytecode":21,"./compiler/passes/generate-javascript":22,"./compiler/passes/remove-proxy-rules":23,"./compiler/passes/report-infinite-loops":24,"./compiler/passes/report-left-recursion":25,"./compiler/passes/report-missing-rules":26,"./utils/arrays":31,"./utils/objects":33}],18:[function(u,t,e){"use strict"
var r=u("../utils/arrays"),n=u("./visitor"),i={findRule:function(u,t){return r.find(u.rules,function(u){return u.name===t})},indexOfRule:function(u,t){return r.indexOf(u.rules,function(u){return u.name===t})},alwaysAdvancesOnSuccess:function(u,t){function e(){return!0}function o(){return!1}function a(u){return s(u.expression)}var s=n.build({rule:a,named:a,choice:function(u){return r.every(u.alternatives,s)},action:a,sequence:function(u){return r.some(u.elements,s)},labeled:a,text:a,simple_and:o,simple_not:o,optional:o,zero_or_more:o,one_or_more:a,semantic_and:o,semantic_not:o,rule_ref:function(t){return s(i.findRule(u,t.name))},literal:function(u){return""!==u.value},class:e,any:e})
return s(t)}}
t.exports=i},{"../utils/arrays":31,"./visitor":27}],19:[function(u,t,e){"use strict"
function r(u){return u.charCodeAt(0).toString(16).toUpperCase()}var n={stringEscape:function(u){return u.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(u){return"\\x0"+r(u)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(u){return"\\x"+r(u)}).replace(/[\u0100-\u0FFF]/g,function(u){return"\\u0"+r(u)}).replace(/[\u1000-\uFFFF]/g,function(u){return"\\u"+r(u)})},regexpClassEscape:function(u){return u.replace(/\\/g,"\\\\").replace(/\//g,"\\/").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\v/g,"\\x0B").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x08\x0E\x0F]/g,function(u){return"\\x0"+r(u)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(u){return"\\x"+r(u)}).replace(/[\u0100-\u0FFF]/g,function(u){return"\\u0"+r(u)}).replace(/[\u1000-\uFFFF]/g,function(u){return"\\u"+r(u)})}}
t.exports=n},{}],20:[function(u,t,e){"use strict"
var r={PUSH:0,PUSH_UNDEFINED:1,PUSH_NULL:2,PUSH_FAILED:3,PUSH_EMPTY_ARRAY:4,PUSH_CURR_POS:5,POP:6,POP_CURR_POS:7,POP_N:8,NIP:9,APPEND:10,WRAP:11,TEXT:12,IF:13,IF_ERROR:14,IF_NOT_ERROR:15,WHILE_NOT_ERROR:16,MATCH_ANY:17,MATCH_STRING:18,MATCH_STRING_IC:19,MATCH_REGEXP:20,ACCEPT_N:21,ACCEPT_STRING:22,FAIL:23,LOAD_SAVED_POS:24,UPDATE_SAVED_POS:25,CALL:26,RULE:27,SILENT_FAILS_ON:28,SILENT_FAILS_OFF:29}
t.exports=r},{}],21:[function(u,t,e){"use strict"
function r(u){function t(u){var t=n.indexOf(F,u)
return t===-1?F.push(u)-1:t}function e(u,e){return t("function("+u.join(", ")+") {"+e+"}")}function r(){return Array.prototype.concat.apply([],arguments)}function l(u,t,e){return u.concat([t.length,e.length],t,e)}function p(u,t){return u.concat([t.length],t)}function A(u,t,e,r){var o=n.map(i.values(e),function(u){return r-u})
return[s.CALL,u,t,o.length].concat(o)}function f(u,t,e){return r([s.PUSH_CURR_POS],[s.SILENT_FAILS_ON],C(u,{sp:e.sp+1,env:i.clone(e.env),action:null}),[s.SILENT_FAILS_OFF],l([t?s.IF_ERROR:s.IF_NOT_ERROR],r([s.POP],[t?s.POP:s.POP_CURR_POS],[s.PUSH_UNDEFINED]),r([s.POP],[t?s.POP_CURR_POS:s.POP],[s.PUSH_FAILED])))}function h(u,t,n){var o=e(i.keys(n.env),u)
return r([s.UPDATE_SAVED_POS],A(o,0,n.env,n.sp),l([s.IF],r([s.POP],t?[s.PUSH_FAILED]:[s.PUSH_UNDEFINED]),r([s.POP],t?[s.PUSH_UNDEFINED]:[s.PUSH_FAILED])))}function E(u){return p([s.WHILE_NOT_ERROR],r([s.APPEND],u))}var F=[],C=a.build({grammar:function(u){n.each(u.rules,C),u.consts=F},rule:function(u){u.bytecode=C(u.expression,{sp:-1,env:{},action:null})},named:function(u,e){var n=t('{ type: "other", description: "'+c.stringEscape(u.name)+'" }')
return r([s.SILENT_FAILS_ON],C(u.expression,e),[s.SILENT_FAILS_OFF],l([s.IF_ERROR],[s.FAIL,n],[]))},choice:function(u,t){function e(u,t){return r(C(u[0],{sp:t.sp,env:i.clone(t.env),action:null}),u.length>1?l([s.IF_ERROR],r([s.POP],e(u.slice(1),t)),[]):[])}return e(u.alternatives,t)},action:function(u,t){var n=i.clone(t.env),o="sequence"!==u.expression.type||0===u.expression.elements.length,a=C(u.expression,{sp:t.sp+(o?1:0),env:n,action:u}),c=e(i.keys(n),u.code)
return o?r([s.PUSH_CURR_POS],a,l([s.IF_NOT_ERROR],r([s.LOAD_SAVED_POS,1],A(c,1,n,t.sp+2)),[]),[s.NIP]):a},sequence:function(u,t){function n(t,o){var a,c
return t.length>0?(a=u.elements.length-t.slice(1).length,r(C(t[0],{sp:o.sp,env:o.env,action:null}),l([s.IF_NOT_ERROR],n(t.slice(1),{sp:o.sp+1,env:o.env,action:o.action}),r(a>1?[s.POP_N,a]:[s.POP],[s.POP_CURR_POS],[s.PUSH_FAILED])))):o.action?(c=e(i.keys(o.env),o.action.code),r([s.LOAD_SAVED_POS,u.elements.length],A(c,u.elements.length,o.env,o.sp),[s.NIP])):r([s.WRAP,u.elements.length],[s.NIP])}return r([s.PUSH_CURR_POS],n(u.elements,{sp:t.sp+1,env:t.env,action:t.action}))},labeled:function(u,t){var e=i.clone(t.env)
return t.env[u.label]=t.sp+1,C(u.expression,{sp:t.sp,env:e,action:null})},text:function(u,t){return r([s.PUSH_CURR_POS],C(u.expression,{sp:t.sp+1,env:i.clone(t.env),action:null}),l([s.IF_NOT_ERROR],r([s.POP],[s.TEXT]),[s.NIP]))},simple_and:function(u,t){return f(u.expression,!1,t)},simple_not:function(u,t){return f(u.expression,!0,t)},optional:function(u,t){return r(C(u.expression,{sp:t.sp,env:i.clone(t.env),action:null}),l([s.IF_ERROR],r([s.POP],[s.PUSH_NULL]),[]))},zero_or_more:function(u,t){var e=C(u.expression,{sp:t.sp+1,env:i.clone(t.env),action:null})
return r([s.PUSH_EMPTY_ARRAY],e,E(e),[s.POP])},one_or_more:function(u,t){var e=C(u.expression,{sp:t.sp+1,env:i.clone(t.env),action:null})
return r([s.PUSH_EMPTY_ARRAY],e,l([s.IF_NOT_ERROR],r(E(e),[s.POP]),r([s.POP],[s.POP],[s.PUSH_FAILED])))},semantic_and:function(u,t){return h(u.code,!1,t)},semantic_not:function(u,t){return h(u.code,!0,t)},rule_ref:function(t){return[s.RULE,o.indexOfRule(u,t.name)]},literal:function(u){var e,r
return u.value.length>0?(e=t('"'+c.stringEscape(u.ignoreCase?u.value.toLowerCase():u.value)+'"'),r=t(["{",'type: "literal",','value: "'+c.stringEscape(u.value)+'",','description: "'+c.stringEscape('"'+c.stringEscape(u.value)+'"')+'"',"}"].join(" ")),l(u.ignoreCase?[s.MATCH_STRING_IC,e]:[s.MATCH_STRING,e],u.ignoreCase?[s.ACCEPT_N,u.value.length]:[s.ACCEPT_STRING,e],[s.FAIL,r])):(e=t('""'),[s.PUSH,e])},class:function(u){var e,r,i
return e=u.parts.length>0?"/^["+(u.inverted?"^":"")+n.map(u.parts,function(u){return u instanceof Array?c.regexpClassEscape(u[0])+"-"+c.regexpClassEscape(u[1]):c.regexpClassEscape(u)}).join("")+"]/"+(u.ignoreCase?"i":""):u.inverted?"/^[\\S\\s]/":"/^(?!)/",r=t(e),i=t(["{",'type: "class",','value: "'+c.stringEscape(u.rawText)+'",','description: "'+c.stringEscape(u.rawText)+'"',"}"].join(" ")),l([s.MATCH_REGEXP,r],[s.ACCEPT_N,1],[s.FAIL,i])},any:function(){var u=t('{ type: "any", description: "any character" }')
return l([s.MATCH_ANY],[s.ACCEPT_N,1],[s.FAIL,u])}})
C(u)}var n=u("../../utils/arrays"),i=u("../../utils/objects"),o=u("../asts"),a=u("../visitor"),s=u("../opcodes"),c=u("../javascript")
t.exports=r},{"../../utils/arrays":31,"../../utils/objects":33,"../asts":18,"../javascript":19,"../opcodes":20,"../visitor":27}],22:[function(require,module,exports){"use strict"
function generateJavascript(ast,options){function indent2(u){return u.replace(/^(.+)$/gm,"  $1")}function indent4(u){return u.replace(/^(.+)$/gm,"    $1")}function indent8(u){return u.replace(/^(.+)$/gm,"        $1")}function indent10(u){return u.replace(/^(.+)$/gm,"          $1")}function generateTables(){return"size"===options.optimize?["peg$consts = [",indent2(ast.consts.join(",\n")),"],","","peg$bytecode = [",indent2(arrays.map(ast.rules,function(u){return'peg$decode("'+js.stringEscape(arrays.map(u.bytecode,function(u){return String.fromCharCode(u+32)}).join(""))+'")'}).join(",\n")),"],"].join("\n"):arrays.map(ast.consts,function(u,t){return"peg$c"+t+" = "+u+","}).join("\n")}function generateRuleHeader(u,t){var e=[]
return e.push(""),options.trace&&e.push(["peg$tracer.trace({",'  type:     "rule.enter",',"  rule:     "+u+",","  location: peg$computeLocation(startPos, startPos)","});",""].join("\n")),options.cache&&(e.push(["var key    = peg$currPos * "+ast.rules.length+" + "+t+",","    cached = peg$resultsCache[key];","","if (cached) {","  peg$currPos = cached.nextPos;",""].join("\n")),options.trace&&e.push(["if (cached.result !== peg$FAILED) {","  peg$tracer.trace({",'    type:   "rule.match",',"    rule:   "+u+",","    result: cached.result,","    location: peg$computeLocation(startPos, peg$currPos)","  });","} else {","  peg$tracer.trace({",'    type: "rule.fail",',"    rule: "+u+",","    location: peg$computeLocation(startPos, startPos)","  });","}",""].join("\n")),e.push(["  return cached.result;","}",""].join("\n"))),e.join("\n")}function generateRuleFooter(u,t){var e=[]
return options.cache&&e.push(["","peg$resultsCache[key] = { nextPos: peg$currPos, result: "+t+" };"].join("\n")),options.trace&&e.push(["","if ("+t+" !== peg$FAILED) {","  peg$tracer.trace({",'    type:   "rule.match",',"    rule:   "+u+",","    result: "+t+",","    location: peg$computeLocation(startPos, peg$currPos)","  });","} else {","  peg$tracer.trace({",'    type: "rule.fail",',"    rule: "+u+",","    location: peg$computeLocation(startPos, startPos)","  });","}"].join("\n")),e.push(["","return "+t+";"].join("\n")),e.join("\n")}function generateInterpreter(){function u(u,t){var e=t+3,r="bc[ip + "+(e-2)+"]",n="bc[ip + "+(e-1)+"]"
return["ends.push(end);","ips.push(ip + "+e+" + "+r+" + "+n+");","","if ("+u+") {","  end = ip + "+e+" + "+r+";","  ip += "+e+";","} else {","  end = ip + "+e+" + "+r+" + "+n+";","  ip += "+e+" + "+r+";","}","","break;"].join("\n")}function t(u){var t=2,e="bc[ip + "+(t-1)+"]"
return["if ("+u+") {","  ends.push(end);","  ips.push(ip);","","  end = ip + "+t+" + "+e+";","  ip += "+t+";","} else {","  ip += "+t+" + "+e+";","}","","break;"].join("\n")}function e(){var u=4,t="bc[ip + "+(u-1)+"]"
return["params = bc.slice(ip + "+u+", ip + "+u+" + "+t+");","for (i = 0; i < "+t+"; i++) {","  params[i] = stack[stack.length - 1 - params[i]];","}","","stack.splice(","  stack.length - bc[ip + 2],","  bc[ip + 2],","  peg$consts[bc[ip + 1]].apply(null, params)",");","","ip += "+u+" + "+t+";","break;"].join("\n")}var r=[]
return r.push(["function peg$decode(s) {","  var bc = new Array(s.length), i;","","  for (i = 0; i < s.length; i++) {","    bc[i] = s.charCodeAt(i) - 32;","  }","","  return bc;","}","","function peg$parseRule(index) {"].join("\n")),options.trace?r.push(["  var bc       = peg$bytecode[index],","      ip       = 0,","      ips      = [],","      end      = bc.length,","      ends     = [],","      stack    = [],","      startPos = peg$currPos,","      params, i;"].join("\n")):r.push(["  var bc    = peg$bytecode[index],","      ip    = 0,","      ips   = [],","      end   = bc.length,","      ends  = [],","      stack = [],","      params, i;"].join("\n")),r.push(indent2(generateRuleHeader("peg$ruleNames[index]","index"))),r.push(["  while (true) {","    while (ip < end) {","      switch (bc[ip]) {","        case "+op.PUSH+":","          stack.push(peg$consts[bc[ip + 1]]);","          ip += 2;","          break;","","        case "+op.PUSH_UNDEFINED+":","          stack.push(void 0);","          ip++;","          break;","","        case "+op.PUSH_NULL+":","          stack.push(null);","          ip++;","          break;","","        case "+op.PUSH_FAILED+":","          stack.push(peg$FAILED);","          ip++;","          break;","","        case "+op.PUSH_EMPTY_ARRAY+":","          stack.push([]);","          ip++;","          break;","","        case "+op.PUSH_CURR_POS+":","          stack.push(peg$currPos);","          ip++;","          break;","","        case "+op.POP+":","          stack.pop();","          ip++;","          break;","","        case "+op.POP_CURR_POS+":","          peg$currPos = stack.pop();","          ip++;","          break;","","        case "+op.POP_N+":","          stack.length -= bc[ip + 1];","          ip += 2;","          break;","","        case "+op.NIP+":","          stack.splice(-2, 1);","          ip++;","          break;","","        case "+op.APPEND+":","          stack[stack.length - 2].push(stack.pop());","          ip++;","          break;","","        case "+op.WRAP+":","          stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));","          ip += 2;","          break;","","        case "+op.TEXT+":","          stack.push(input.substring(stack.pop(), peg$currPos));","          ip++;","          break;","","        case "+op.IF+":",indent10(u("stack[stack.length - 1]",0)),"","        case "+op.IF_ERROR+":",indent10(u("stack[stack.length - 1] === peg$FAILED",0)),"","        case "+op.IF_NOT_ERROR+":",indent10(u("stack[stack.length - 1] !== peg$FAILED",0)),"","        case "+op.WHILE_NOT_ERROR+":",indent10(t("stack[stack.length - 1] !== peg$FAILED")),"","        case "+op.MATCH_ANY+":",indent10(u("input.length > peg$currPos",0)),"","        case "+op.MATCH_STRING+":",indent10(u("input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]",1)),"","        case "+op.MATCH_STRING_IC+":",indent10(u("input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]",1)),"","        case "+op.MATCH_REGEXP+":",indent10(u("peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))",1)),"","        case "+op.ACCEPT_N+":","          stack.push(input.substr(peg$currPos, bc[ip + 1]));","          peg$currPos += bc[ip + 1];","          ip += 2;","          break;","","        case "+op.ACCEPT_STRING+":","          stack.push(peg$consts[bc[ip + 1]]);","          peg$currPos += peg$consts[bc[ip + 1]].length;","          ip += 2;","          break;","","        case "+op.FAIL+":","          stack.push(peg$FAILED);","          if (peg$silentFails === 0) {","            peg$fail(peg$consts[bc[ip + 1]]);","          }","          ip += 2;","          break;","","        case "+op.LOAD_SAVED_POS+":","          peg$savedPos = stack[stack.length - 1 - bc[ip + 1]];","          ip += 2;","          break;","","        case "+op.UPDATE_SAVED_POS+":","          peg$savedPos = peg$currPos;","          ip++;","          break;","","        case "+op.CALL+":",indent10(e()),"","        case "+op.RULE+":","          stack.push(peg$parseRule(bc[ip + 1]));","          ip += 2;","          break;","","        case "+op.SILENT_FAILS_ON+":","          peg$silentFails++;","          ip++;","          break;","","        case "+op.SILENT_FAILS_OFF+":","          peg$silentFails--;","          ip++;","          break;","","        default:",'          throw new Error("Invalid opcode: " + bc[ip] + ".");',"      }","    }","","    if (ends.length > 0) {","      end = ends.pop();","      ip = ips.pop();","    } else {","      break;","    }","  }"].join("\n")),r.push(indent2(generateRuleFooter("peg$ruleNames[index]","stack[0]"))),r.push("}"),r.join("\n")}function generateRuleFunction(rule){function c(u){return"peg$c"+u}function s(u){return"s"+u}function compile(bc){function compileCondition(u,t){var e,r,n,i,o=t+3,a=bc[ip+o-2],s=bc[ip+o-1],c=stack.sp
if(ip+=o,e=compile(bc.slice(ip,ip+a)),n=stack.sp,ip+=a,s>0&&(stack.sp=c,r=compile(bc.slice(ip,ip+s)),i=stack.sp,ip+=s,n!==i))throw new Error("Branches of a condition must move the stack pointer in the same way.")
parts.push("if ("+u+") {"),parts.push(indent2(e)),s>0&&(parts.push("} else {"),parts.push(indent2(r))),parts.push("}")}function compileLoop(u){var t,e,r=2,n=bc[ip+r-1],i=stack.sp
if(ip+=r,t=compile(bc.slice(ip,ip+n)),e=stack.sp,ip+=n,e!==i)throw new Error("Body of a loop can't move the stack pointer.")
parts.push("while ("+u+") {"),parts.push(indent2(t)),parts.push("}")}function compileCall(){var u=4,t=bc[ip+u-1],e=c(bc[ip+1])+"("+arrays.map(bc.slice(ip+u,ip+u+t),function(u){return stack.index(u)}).join(", ")+")"
stack.pop(bc[ip+2]),parts.push(stack.push(e)),ip+=u+t}for(var ip=0,end=bc.length,parts=[],value;ip<end;)switch(bc[ip]){case op.PUSH:parts.push(stack.push(c(bc[ip+1]))),ip+=2
break
case op.PUSH_CURR_POS:parts.push(stack.push("peg$currPos")),ip++
break
case op.PUSH_UNDEFINED:parts.push(stack.push("void 0")),ip++
break
case op.PUSH_NULL:parts.push(stack.push("null")),ip++
break
case op.PUSH_FAILED:parts.push(stack.push("peg$FAILED")),ip++
break
case op.PUSH_EMPTY_ARRAY:parts.push(stack.push("[]")),ip++
break
case op.POP:stack.pop(),ip++
break
case op.POP_CURR_POS:parts.push("peg$currPos = "+stack.pop()+";"),ip++
break
case op.POP_N:stack.pop(bc[ip+1]),ip+=2
break
case op.NIP:value=stack.pop(),stack.pop(),parts.push(stack.push(value)),ip++
break
case op.APPEND:value=stack.pop(),parts.push(stack.top()+".push("+value+");"),ip++
break
case op.WRAP:parts.push(stack.push("["+stack.pop(bc[ip+1]).join(", ")+"]")),ip+=2
break
case op.TEXT:parts.push(stack.push("input.substring("+stack.pop()+", peg$currPos)")),ip++
break
case op.IF:compileCondition(stack.top(),0)
break
case op.IF_ERROR:compileCondition(stack.top()+" === peg$FAILED",0)
break
case op.IF_NOT_ERROR:compileCondition(stack.top()+" !== peg$FAILED",0)
break
case op.WHILE_NOT_ERROR:compileLoop(stack.top()+" !== peg$FAILED",0)
break
case op.MATCH_ANY:compileCondition("input.length > peg$currPos",0)
break
case op.MATCH_STRING:compileCondition(eval(ast.consts[bc[ip+1]]).length>1?"input.substr(peg$currPos, "+eval(ast.consts[bc[ip+1]]).length+") === "+c(bc[ip+1]):"input.charCodeAt(peg$currPos) === "+eval(ast.consts[bc[ip+1]]).charCodeAt(0),1)
break
case op.MATCH_STRING_IC:compileCondition("input.substr(peg$currPos, "+eval(ast.consts[bc[ip+1]]).length+").toLowerCase() === "+c(bc[ip+1]),1)
break
case op.MATCH_REGEXP:compileCondition(c(bc[ip+1])+".test(input.charAt(peg$currPos))",1)
break
case op.ACCEPT_N:parts.push(stack.push(bc[ip+1]>1?"input.substr(peg$currPos, "+bc[ip+1]+")":"input.charAt(peg$currPos)")),parts.push(bc[ip+1]>1?"peg$currPos += "+bc[ip+1]+";":"peg$currPos++;"),ip+=2
break
case op.ACCEPT_STRING:parts.push(stack.push(c(bc[ip+1]))),parts.push(eval(ast.consts[bc[ip+1]]).length>1?"peg$currPos += "+eval(ast.consts[bc[ip+1]]).length+";":"peg$currPos++;"),ip+=2
break
case op.FAIL:parts.push(stack.push("peg$FAILED")),parts.push("if (peg$silentFails === 0) { peg$fail("+c(bc[ip+1])+"); }"),ip+=2
break
case op.LOAD_SAVED_POS:parts.push("peg$savedPos = "+stack.index(bc[ip+1])+";"),ip+=2
break
case op.UPDATE_SAVED_POS:parts.push("peg$savedPos = peg$currPos;"),ip++
break
case op.CALL:compileCall()
break
case op.RULE:parts.push(stack.push("peg$parse"+ast.rules[bc[ip+1]].name+"()")),ip+=2
break
case op.SILENT_FAILS_ON:parts.push("peg$silentFails++;"),ip++
break
case op.SILENT_FAILS_OFF:parts.push("peg$silentFails--;"),ip++
break
default:throw new Error("Invalid opcode: "+bc[ip]+".")}return parts.join("\n")}var parts=[],code,stack={sp:-1,maxSp:-1,push:function(u){var t=s(++this.sp)+" = "+u+";"
return this.sp>this.maxSp&&(this.maxSp=this.sp),t},pop:function(){var u,t
return 0===arguments.length?s(this.sp--):(u=arguments[0],t=arrays.map(arrays.range(this.sp-u+1,this.sp+1),s),this.sp-=u,t)},top:function(){return s(this.sp)},index:function(u){return s(this.sp-u)}}
return code=compile(rule.bytecode),parts.push("function peg$parse"+rule.name+"() {"),options.trace?parts.push(["  var "+arrays.map(arrays.range(0,stack.maxSp+1),s).join(", ")+",","      startPos = peg$currPos;"].join("\n")):parts.push("  var "+arrays.map(arrays.range(0,stack.maxSp+1),s).join(", ")+";"),parts.push(indent2(generateRuleHeader('"'+js.stringEscape(rule.name)+'"',asts.indexOfRule(ast,rule.name)))),parts.push(indent2(code)),parts.push(indent2(generateRuleFooter('"'+js.stringEscape(rule.name)+'"',s(0)))),parts.push("}"),parts.join("\n")}var parts=[],startRuleIndices,startRuleIndex,startRuleFunctions,startRuleFunction,ruleNames
parts.push(["(function() {",'  "use strict";',"","  /*","   * Generated by PEG.js 0.9.0.","   *","   * http://pegjs.org/","   */","","  function peg$subclass(child, parent) {","    function ctor() { this.constructor = child; }","    ctor.prototype = parent.prototype;","    child.prototype = new ctor();","  }","","  function peg$SyntaxError(message, expected, found, location) {","    this.message  = message;","    this.expected = expected;","    this.found    = found;","    this.location = location;",'    this.name     = "SyntaxError";',"",'    if (typeof Error.captureStackTrace === "function") {',"      Error.captureStackTrace(this, peg$SyntaxError);","    }","  }","","  peg$subclass(peg$SyntaxError, Error);",""].join("\n")),options.trace&&parts.push(["  function peg$DefaultTracer() {","    this.indentLevel = 0;","  }","","  peg$DefaultTracer.prototype.trace = function(event) {","    var that = this;","","    function log(event) {","      function repeat(string, n) {",'         var result = "", i;',"","         for (i = 0; i < n; i++) {","           result += string;","         }","","         return result;","      }","","      function pad(string, length) {",'        return string + repeat(" ", length - string.length);',"      }","",'      if (typeof console === "object") {',"        console.log(",'          event.location.start.line + ":" + event.location.start.column + "-"','            + event.location.end.line + ":" + event.location.end.column + " "','            + pad(event.type, 10) + " "','            + repeat("  ", that.indentLevel) + event.rule',"        );","      }","    }","","    switch (event.type) {",'      case "rule.enter":',"        log(event);","        this.indentLevel++;","        break;","",'      case "rule.match":',"        this.indentLevel--;","        log(event);","        break;","",'      case "rule.fail":',"        this.indentLevel--;","        log(event);","        break;","","      default:",'        throw new Error("Invalid event type: " + event.type + ".");',"    }","  };",""].join("\n")),parts.push(["  function peg$parse(input) {","    var options = arguments.length > 1 ? arguments[1] : {},","        parser  = this,","","        peg$FAILED = {},",""].join("\n")),"size"===options.optimize?(startRuleIndices="{ "+arrays.map(options.allowedStartRules,function(u){return u+": "+asts.indexOfRule(ast,u)}).join(", ")+" }",startRuleIndex=asts.indexOfRule(ast,options.allowedStartRules[0]),parts.push(["        peg$startRuleIndices = "+startRuleIndices+",","        peg$startRuleIndex   = "+startRuleIndex+","].join("\n"))):(startRuleFunctions="{ "+arrays.map(options.allowedStartRules,function(u){return u+": peg$parse"+u}).join(", ")+" }",startRuleFunction="peg$parse"+options.allowedStartRules[0],parts.push(["        peg$startRuleFunctions = "+startRuleFunctions+",","        peg$startRuleFunction  = "+startRuleFunction+","].join("\n"))),parts.push(""),parts.push(indent8(generateTables())),parts.push(["","        peg$currPos          = 0,","        peg$savedPos         = 0,","        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],","        peg$maxFailPos       = 0,","        peg$maxFailExpected  = [],","        peg$silentFails      = 0,",""].join("\n")),options.cache&&parts.push(["        peg$resultsCache = {},",""].join("\n")),options.trace&&("size"===options.optimize&&(ruleNames="["+arrays.map(ast.rules,function(u){return'"'+js.stringEscape(u.name)+'"'}).join(", ")+"]",parts.push(["        peg$ruleNames = "+ruleNames+",",""].join("\n"))),parts.push(['        peg$tracer = "tracer" in options ? options.tracer : new peg$DefaultTracer(),',""].join("\n"))),parts.push(["        peg$result;",""].join("\n")),"size"===options.optimize?parts.push(['    if ("startRule" in options) {',"      if (!(options.startRule in peg$startRuleIndices)) {",'        throw new Error("Can\'t start parsing from rule \\"" + options.startRule + "\\".");',"      }","","      peg$startRuleIndex = peg$startRuleIndices[options.startRule];","    }"].join("\n")):parts.push(['    if ("startRule" in options) {',"      if (!(options.startRule in peg$startRuleFunctions)) {",'        throw new Error("Can\'t start parsing from rule \\"" + options.startRule + "\\".");',"      }","","      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];","    }"].join("\n")),parts.push(["","    function text() {","      return input.substring(peg$savedPos, peg$currPos);","    }","","    function location() {","      return peg$computeLocation(peg$savedPos, peg$currPos);","    }","","    function expected(description) {","      throw peg$buildException(","        null,",'        [{ type: "other", description: description }],',"        input.substring(peg$savedPos, peg$currPos),","        peg$computeLocation(peg$savedPos, peg$currPos)","      );","    }","","    function error(message) {","      throw peg$buildException(","        message,","        null,","        input.substring(peg$savedPos, peg$currPos),","        peg$computeLocation(peg$savedPos, peg$currPos)","      );","    }","","    function peg$computePosDetails(pos) {","      var details = peg$posDetailsCache[pos],","          p, ch;","","      if (details) {","        return details;","      } else {","        p = pos - 1;","        while (!peg$posDetailsCache[p]) {","          p--;","        }","","        details = peg$posDetailsCache[p];","        details = {","          line:   details.line,","          column: details.column,","          seenCR: details.seenCR","        };","","        while (p < pos) {","          ch = input.charAt(p);",'          if (ch === "\\n") {',"            if (!details.seenCR) { details.line++; }","            details.column = 1;","            details.seenCR = false;",'          } else if (ch === "\\r" || ch === "\\u2028" || ch === "\\u2029") {',"            details.line++;","            details.column = 1;","            details.seenCR = true;","          } else {","            details.column++;","            details.seenCR = false;","          }","","          p++;","        }","","        peg$posDetailsCache[pos] = details;","        return details;","      }","    }","","    function peg$computeLocation(startPos, endPos) {","      var startPosDetails = peg$computePosDetails(startPos),","          endPosDetails   = peg$computePosDetails(endPos);","","      return {","        start: {","          offset: startPos,","          line:   startPosDetails.line,","          column: startPosDetails.column","        },","        end: {","          offset: endPos,","          line:   endPosDetails.line,","          column: endPosDetails.column","        }","      };","    }","","    function peg$fail(expected) {","      if (peg$currPos < peg$maxFailPos) { return; }","","      if (peg$currPos > peg$maxFailPos) {","        peg$maxFailPos = peg$currPos;","        peg$maxFailExpected = [];","      }","","      peg$maxFailExpected.push(expected);","    }","","    function peg$buildException(message, expected, found, location) {","      function cleanupExpected(expected) {","        var i = 1;","","        expected.sort(function(a, b) {","          if (a.description < b.description) {","            return -1;","          } else if (a.description > b.description) {","            return 1;","          } else {","            return 0;","          }","        });","","        while (i < expected.length) {","          if (expected[i - 1] === expected[i]) {","            expected.splice(i, 1);","          } else {","            i++;","          }","        }","      }","","      function buildMessage(expected, found) {","        function stringEscape(s) {","          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }","","          return s","            .replace(/\\\\/g,   '\\\\\\\\')","            .replace(/\"/g,    '\\\\\"')","            .replace(/\\x08/g, '\\\\b')","            .replace(/\\t/g,   '\\\\t')","            .replace(/\\n/g,   '\\\\n')","            .replace(/\\f/g,   '\\\\f')","            .replace(/\\r/g,   '\\\\r')","            .replace(/[\\x00-\\x07\\x0B\\x0E\\x0F]/g, function(ch) { return '\\\\x0' + hex(ch); })","            .replace(/[\\x10-\\x1F\\x80-\\xFF]/g,    function(ch) { return '\\\\x'  + hex(ch); })","            .replace(/[\\u0100-\\u0FFF]/g,         function(ch) { return '\\\\u0' + hex(ch); })","            .replace(/[\\u1000-\\uFFFF]/g,         function(ch) { return '\\\\u'  + hex(ch); });","        }","","        var expectedDescs = new Array(expected.length),","            expectedDesc, foundDesc, i;","","        for (i = 0; i < expected.length; i++) {","          expectedDescs[i] = expected[i].description;","        }","","        expectedDesc = expected.length > 1",'          ? expectedDescs.slice(0, -1).join(", ")','              + " or "',"              + expectedDescs[expected.length - 1]","          : expectedDescs[0];","",'        foundDesc = found ? "\\"" + stringEscape(found) + "\\"" : "end of input";',"",'        return "Expected " + expectedDesc + " but " + foundDesc + " found.";',"      }","","      if (expected !== null) {","        cleanupExpected(expected);","      }","","      return new peg$SyntaxError(","        message !== null ? message : buildMessage(expected, found),","        expected,","        found,","        location","      );","    }",""].join("\n")),"size"===options.optimize?(parts.push(indent4(generateInterpreter())),parts.push("")):arrays.each(ast.rules,function(u){parts.push(indent4(generateRuleFunction(u))),parts.push("")}),ast.initializer&&(parts.push(indent4(ast.initializer.code)),parts.push("")),"size"===options.optimize?parts.push("    peg$result = peg$parseRule(peg$startRuleIndex);"):parts.push("    peg$result = peg$startRuleFunction();"),parts.push(["","    if (peg$result !== peg$FAILED && peg$currPos === input.length) {","      return peg$result;","    } else {","      if (peg$result !== peg$FAILED && peg$currPos < input.length) {",'        peg$fail({ type: "end", description: "end of input" });',"      }","","      throw peg$buildException(","        null,","        peg$maxFailExpected,","        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,","        peg$maxFailPos < input.length","          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)","          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)","      );","    }","  }","","  return {"].join("\n")),options.trace?parts.push(["    SyntaxError:   peg$SyntaxError,","    DefaultTracer: peg$DefaultTracer,","    parse:         peg$parse"].join("\n")):parts.push(["    SyntaxError: peg$SyntaxError,","    parse:       peg$parse"].join("\n")),parts.push(["  };","})()"].join("\n")),ast.code=parts.join("\n")}var arrays=require("../../utils/arrays"),asts=require("../asts"),op=require("../opcodes"),js=require("../javascript")
module.exports=generateJavascript},{"../../utils/arrays":31,"../asts":18,"../javascript":19,"../opcodes":20}],23:[function(u,t,e){"use strict"
function r(u,t){function e(u){return"rule"===u.type&&"rule_ref"===u.expression.type}function r(u,t,e){var r=i.build({rule_ref:function(u){u.name===t&&(u.name=e)}})
r(u)}var o=[]
n.each(u.rules,function(i,a){e(i)&&(r(u,i.name,i.expression.name),n.contains(t.allowedStartRules,i.name)||o.push(a))}),o.reverse(),n.each(o,function(t){u.rules.splice(t,1)})}var n=u("../../utils/arrays"),i=u("../visitor")
t.exports=r},{"../../utils/arrays":31,"../visitor":27}],24:[function(u,t,e){"use strict"
function r(u){var t=o.build({zero_or_more:function(t){if(!i.alwaysAdvancesOnSuccess(u,t.expression))throw new n("Infinite loop detected.",t.location)},one_or_more:function(t){if(!i.alwaysAdvancesOnSuccess(u,t.expression))throw new n("Infinite loop detected.",t.location)}})
t(u)}var n=u("../../grammar-error"),i=u("../asts"),o=u("../visitor")
t.exports=r},{"../../grammar-error":28,"../asts":18,"../visitor":27}],25:[function(u,t,e){"use strict"
function r(u){var t=[],e=a.build({rule:function(u){t.push(u.name),e(u.expression),t.pop(u.name)},sequence:function(t){n.every(t.elements,function(t){return e(t),!o.alwaysAdvancesOnSuccess(u,t)})},rule_ref:function(r){if(n.contains(t,r.name))throw new i('Left recursion detected for rule "'+r.name+'".',r.location)
e(o.findRule(u,r.name))}})
e(u)}var n=u("../../utils/arrays"),i=u("../../grammar-error"),o=u("../asts"),a=u("../visitor")
t.exports=r},{"../../grammar-error":28,"../../utils/arrays":31,"../asts":18,"../visitor":27}],26:[function(u,t,e){"use strict"
function r(u){var t=o.build({rule_ref:function(t){if(!i.findRule(u,t.name))throw new n('Referenced rule "'+t.name+'" does not exist.',t.location)}})
t(u)}var n=u("../../grammar-error"),i=u("../asts"),o=u("../visitor")
t.exports=r},{"../../grammar-error":28,"../asts":18,"../visitor":27}],27:[function(u,t,e){"use strict"
var r=u("../utils/objects"),n=u("../utils/arrays"),i={build:function(u){function t(t){return u[t.type].apply(null,arguments)}function e(){}function i(u){var e=Array.prototype.slice.call(arguments,1)
t.apply(null,[u.expression].concat(e))}function o(u){return function(e){var r=Array.prototype.slice.call(arguments,1)
n.each(e[u],function(u){t.apply(null,[u].concat(r))})}}var a={grammar:function(u){var e=Array.prototype.slice.call(arguments,1)
u.initializer&&t.apply(null,[u.initializer].concat(e)),n.each(u.rules,function(u){t.apply(null,[u].concat(e))})},initializer:e,rule:i,named:i,choice:o("alternatives"),action:i,sequence:o("elements"),labeled:i,text:i,simple_and:i,simple_not:i,optional:i,zero_or_more:i,one_or_more:i,semantic_and:e,semantic_not:e,rule_ref:e,literal:e,class:e,any:e}
return r.defaults(u,a),t}}
t.exports=i},{"../utils/arrays":31,"../utils/objects":33}],28:[function(u,t,e){"use strict"
function r(u,t){this.name="GrammarError",this.message=u,this.location=t,"function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,r)}var n=u("./utils/classes")
n.subclass(r,Error),t.exports=r},{"./utils/classes":32}],29:[function(u,t,e){t.exports=function(){"use strict"
function u(u,t){function e(){this.constructor=u}e.prototype=t.prototype,u.prototype=new e}function t(u,e,r,n){this.message=u,this.expected=e,this.found=r,this.location=n,this.name="SyntaxError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,t)}function e(u){function e(){return u.substring($i,ji)}function r(){return o($i,ji)}function n(t){throw s(t,null,u.substring($i,ji),o($i,ji))}function i(t){var e,r,n=Mi[t]
if(n)return n
for(e=t-1;!Mi[e];)e--
for(n=Mi[e],n={line:n.line,column:n.column,seenCR:n.seenCR};e<t;)r=u.charAt(e),"\n"===r?(n.seenCR||n.line++,n.column=1,n.seenCR=!1):"\r"===r||"\u2028"===r||"\u2029"===r?(n.line++,n.column=1,n.seenCR=!0):(n.column++,n.seenCR=!1),e++
return Mi[t]=n,n}function o(u,t){var e=i(u),r=i(t)
return{start:{offset:u,line:e.line,column:e.column},end:{offset:t,line:r.line,column:r.column}}}function a(u){ji<Vi||(ji>Vi&&(Vi=ji,qi=[]),qi.push(u))}function s(u,e,r,n){function i(u){var t=1
for(u.sort(function(u,t){return u.description<t.description?-1:u.description>t.description?1:0});t<u.length;)u[t-1]===u[t]?u.splice(t,1):t++}function o(u,t){function e(u){function t(u){return u.charCodeAt(0).toString(16).toUpperCase()}return u.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(u){return"\\x0"+t(u)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(u){return"\\x"+t(u)}).replace(/[\u0100-\u0FFF]/g,function(u){return"\\u0"+t(u)}).replace(/[\u1000-\uFFFF]/g,function(u){return"\\u"+t(u)})}var r,n,i,o=new Array(u.length)
for(i=0;i<u.length;i++)o[i]=u[i].description
return r=u.length>1?o.slice(0,-1).join(", ")+" or "+o[u.length-1]:o[0],n=t?'"'+e(t)+'"':"end of input","Expected "+r+" but "+n+" found."}return null!==e&&i(e),new t(null!==u?u:o(e,r),e,r,n)}function c(){var u,t,e,r,n,i,o
if(u=ji,t=tt(),t!==pt)if(e=ji,r=l(),r!==pt?(n=tt(),n!==pt?(r=[r,n],e=r):(ji=e,e=pt)):(ji=e,e=pt),e===pt&&(e=null),e!==pt){if(r=[],n=ji,i=p(),i!==pt?(o=tt(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt),n!==pt)for(;n!==pt;)r.push(n),n=ji,i=p(),i!==pt?(o=tt(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt)
else r=pt
r!==pt?($i=u,t=ht(e,r),u=t):(ji=u,u=pt)}else ji=u,u=pt
else ji=u,u=pt
return u}function l(){var u,t,e
return u=ji,t=ou(),t!==pt?(e=rt(),e!==pt?($i=u,t=Et(t),u=t):(ji=u,u=pt)):(ji=u,u=pt),u}function p(){var t,e,r,n,i,o,s,c
return t=ji,e=k(),e!==pt?(r=tt(),r!==pt?(n=ji,i=q(),i!==pt?(o=tt(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt),n===pt&&(n=null),n!==pt?(61===u.charCodeAt(ji)?(i=Ft,ji++):(i=pt,0===Hi&&a(Ct)),i!==pt?(o=tt(),o!==pt?(s=A(),s!==pt?(c=rt(),c!==pt?($i=t,e=dt(e,n,s),t=e):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt),t}function A(){var t,e,r,n,i,o,s,c
if(t=ji,e=f(),e!==pt){for(r=[],n=ji,i=tt(),i!==pt?(47===u.charCodeAt(ji)?(o=Dt,ji++):(o=pt,0===Hi&&a(vt)),o!==pt?(s=tt(),s!==pt?(c=f(),c!==pt?(i=[i,o,s,c],n=i):(ji=n,n=pt)):(ji=n,n=pt)):(ji=n,n=pt)):(ji=n,n=pt);n!==pt;)r.push(n),n=ji,i=tt(),i!==pt?(47===u.charCodeAt(ji)?(o=Dt,ji++):(o=pt,0===Hi&&a(vt)),o!==pt?(s=tt(),s!==pt?(c=f(),c!==pt?(i=[i,o,s,c],n=i):(ji=n,n=pt)):(ji=n,n=pt)):(ji=n,n=pt)):(ji=n,n=pt)
r!==pt?($i=t,e=Bt(e,r),t=e):(ji=t,t=pt)}else ji=t,t=pt
return t}function f(){var u,t,e,r,n
return u=ji,t=h(),t!==pt?(e=ji,r=tt(),r!==pt?(n=ou(),n!==pt?(r=[r,n],e=r):(ji=e,e=pt)):(ji=e,e=pt),e===pt&&(e=null),e!==pt?($i=u,t=mt(t,e),u=t):(ji=u,u=pt)):(ji=u,u=pt),u}function h(){var u,t,e,r,n,i
if(u=ji,t=E(),t!==pt){for(e=[],r=ji,n=tt(),n!==pt?(i=E(),i!==pt?(n=[n,i],r=n):(ji=r,r=pt)):(ji=r,r=pt);r!==pt;)e.push(r),r=ji,n=tt(),n!==pt?(i=E(),i!==pt?(n=[n,i],r=n):(ji=r,r=pt)):(ji=r,r=pt)
e!==pt?($i=u,t=gt(t,e),u=t):(ji=u,u=pt)}else ji=u,u=pt
return u}function E(){var t,e,r,n,i,o
return t=ji,e=R(),e!==pt?(r=tt(),r!==pt?(58===u.charCodeAt(ji)?(n=yt,ji++):(n=pt,0===Hi&&a(bt)),n!==pt?(i=tt(),i!==pt?(o=F(),o!==pt?($i=t,e=_t(e,o),t=e):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt),t===pt&&(t=F()),t}function F(){var u,t,e,r
return u=ji,t=C(),t!==pt?(e=tt(),e!==pt?(r=d(),r!==pt?($i=u,t=Nt(t,r),u=t):(ji=u,u=pt)):(ji=u,u=pt)):(ji=u,u=pt),u===pt&&(u=d()),u}function C(){var t
return 36===u.charCodeAt(ji)?(t=wt,ji++):(t=pt,0===Hi&&a(xt)),t===pt&&(38===u.charCodeAt(ji)?(t=St,ji++):(t=pt,0===Hi&&a(Tt)),t===pt&&(33===u.charCodeAt(ji)?(t=Rt,ji++):(t=pt,0===Hi&&a(kt)))),t}function d(){var u,t,e,r
return u=ji,t=v(),t!==pt?(e=tt(),e!==pt?(r=D(),r!==pt?($i=u,t=Pt(t,r),u=t):(ji=u,u=pt)):(ji=u,u=pt)):(ji=u,u=pt),u===pt&&(u=v()),u}function D(){var t
return 63===u.charCodeAt(ji)?(t=Ot,ji++):(t=pt,0===Hi&&a(It)),t===pt&&(42===u.charCodeAt(ji)?(t=Lt,ji++):(t=pt,0===Hi&&a(Ut)),t===pt&&(43===u.charCodeAt(ji)?(t=jt,ji++):(t=pt,0===Hi&&a($t)))),t}function v(){var t,e,r,n,i,o
return t=V(),t===pt&&(t=W(),t===pt&&(t=iu(),t===pt&&(t=B(),t===pt&&(t=m(),t===pt&&(t=ji,40===u.charCodeAt(ji)?(e=Mt,ji++):(e=pt,0===Hi&&a(Vt)),e!==pt?(r=tt(),r!==pt?(n=A(),n!==pt?(i=tt(),i!==pt?(41===u.charCodeAt(ji)?(o=qt,ji++):(o=pt,0===Hi&&a(Ht)),o!==pt?($i=t,e=zt(n),t=e):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt)))))),t}function B(){var t,e,r,n,i,o,s,c
return t=ji,e=k(),e!==pt?(r=ji,Hi++,n=ji,i=tt(),i!==pt?(o=ji,s=q(),s!==pt?(c=tt(),c!==pt?(s=[s,c],o=s):(ji=o,o=pt)):(ji=o,o=pt),o===pt&&(o=null),o!==pt?(61===u.charCodeAt(ji)?(s=Ft,ji++):(s=pt,0===Hi&&a(Ct)),s!==pt?(i=[i,o,s],n=i):(ji=n,n=pt)):(ji=n,n=pt)):(ji=n,n=pt),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?($i=t,e=Wt(e),t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function m(){var u,t,e,r
return u=ji,t=g(),t!==pt?(e=tt(),e!==pt?(r=ou(),r!==pt?($i=u,t=Gt(t,r),u=t):(ji=u,u=pt)):(ji=u,u=pt)):(ji=u,u=pt),u}function g(){var t
return 38===u.charCodeAt(ji)?(t=St,ji++):(t=pt,0===Hi&&a(Tt)),t===pt&&(33===u.charCodeAt(ji)?(t=Rt,ji++):(t=pt,0===Hi&&a(kt))),t}function y(){var t
return u.length>ji?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(Yt)),t}function b(){var t,e
return Hi++,9===u.charCodeAt(ji)?(t=Xt,ji++):(t=pt,0===Hi&&a(Qt)),t===pt&&(11===u.charCodeAt(ji)?(t=Kt,ji++):(t=pt,0===Hi&&a(Zt)),t===pt&&(12===u.charCodeAt(ji)?(t=ue,ji++):(t=pt,0===Hi&&a(te)),t===pt&&(32===u.charCodeAt(ji)?(t=ee,ji++):(t=pt,0===Hi&&a(re)),t===pt&&(160===u.charCodeAt(ji)?(t=ne,ji++):(t=pt,0===Hi&&a(ie)),t===pt&&(65279===u.charCodeAt(ji)?(t=oe,ji++):(t=pt,0===Hi&&a(ae)),t===pt&&(t=du())))))),Hi--,t===pt&&(e=pt,0===Hi&&a(Jt)),t}function _(){var t
return se.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(ce)),t}function N(){var t,e
return Hi++,10===u.charCodeAt(ji)?(t=pe,ji++):(t=pt,0===Hi&&a(Ae)),t===pt&&(u.substr(ji,2)===fe?(t=fe,ji+=2):(t=pt,0===Hi&&a(he)),t===pt&&(13===u.charCodeAt(ji)?(t=Ee,ji++):(t=pt,0===Hi&&a(Fe)),t===pt&&(8232===u.charCodeAt(ji)?(t=Ce,ji++):(t=pt,0===Hi&&a(de)),t===pt&&(8233===u.charCodeAt(ji)?(t=De,ji++):(t=pt,0===Hi&&a(ve)))))),Hi--,t===pt&&(e=pt,0===Hi&&a(le)),t}function w(){var u,t
return Hi++,u=x(),u===pt&&(u=T()),Hi--,u===pt&&(t=pt,0===Hi&&a(Be)),u}function x(){var t,e,r,n,i,o
if(t=ji,u.substr(ji,2)===me?(e=me,ji+=2):(e=pt,0===Hi&&a(ge)),e!==pt){for(r=[],n=ji,i=ji,Hi++,u.substr(ji,2)===ye?(o=ye,ji+=2):(o=pt,0===Hi&&a(be)),Hi--,o===pt?i=void 0:(ji=i,i=pt),i!==pt?(o=y(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt);n!==pt;)r.push(n),n=ji,i=ji,Hi++,u.substr(ji,2)===ye?(o=ye,ji+=2):(o=pt,0===Hi&&a(be)),Hi--,o===pt?i=void 0:(ji=i,i=pt),i!==pt?(o=y(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt)
r!==pt?(u.substr(ji,2)===ye?(n=ye,ji+=2):(n=pt,0===Hi&&a(be)),n!==pt?(e=[e,r,n],t=e):(ji=t,t=pt)):(ji=t,t=pt)}else ji=t,t=pt
return t}function S(){var t,e,r,n,i,o
if(t=ji,u.substr(ji,2)===me?(e=me,ji+=2):(e=pt,0===Hi&&a(ge)),e!==pt){for(r=[],n=ji,i=ji,Hi++,u.substr(ji,2)===ye?(o=ye,ji+=2):(o=pt,0===Hi&&a(be)),o===pt&&(o=_()),Hi--,o===pt?i=void 0:(ji=i,i=pt),i!==pt?(o=y(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt);n!==pt;)r.push(n),n=ji,i=ji,Hi++,u.substr(ji,2)===ye?(o=ye,ji+=2):(o=pt,0===Hi&&a(be)),o===pt&&(o=_()),Hi--,o===pt?i=void 0:(ji=i,i=pt),i!==pt?(o=y(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt)
r!==pt?(u.substr(ji,2)===ye?(n=ye,ji+=2):(n=pt,0===Hi&&a(be)),n!==pt?(e=[e,r,n],t=e):(ji=t,t=pt)):(ji=t,t=pt)}else ji=t,t=pt
return t}function T(){var t,e,r,n,i,o
if(t=ji,u.substr(ji,2)===_e?(e=_e,ji+=2):(e=pt,0===Hi&&a(Ne)),e!==pt){for(r=[],n=ji,i=ji,Hi++,o=_(),Hi--,o===pt?i=void 0:(ji=i,i=pt),i!==pt?(o=y(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt);n!==pt;)r.push(n),n=ji,i=ji,Hi++,o=_(),Hi--,o===pt?i=void 0:(ji=i,i=pt),i!==pt?(o=y(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt)
r!==pt?(e=[e,r],t=e):(ji=t,t=pt)}else ji=t,t=pt
return t}function R(){var u,t,e
return u=ji,t=ji,Hi++,e=U(),Hi--,e===pt?t=void 0:(ji=t,t=pt),t!==pt?(e=k(),e!==pt?($i=u,t=we(e),u=t):(ji=u,u=pt)):(ji=u,u=pt),u}function k(){var u,t,e,r
if(Hi++,u=ji,t=P(),t!==pt){for(e=[],r=O();r!==pt;)e.push(r),r=O()
e!==pt?($i=u,t=Se(t,e),u=t):(ji=u,u=pt)}else ji=u,u=pt
return Hi--,u===pt&&(t=pt,0===Hi&&a(xe)),u}function P(){var t,e,r
return t=I(),t===pt&&(36===u.charCodeAt(ji)?(t=wt,ji++):(t=pt,0===Hi&&a(xt)),t===pt&&(95===u.charCodeAt(ji)?(t=Te,ji++):(t=pt,0===Hi&&a(Re)),t===pt&&(t=ji,92===u.charCodeAt(ji)?(e=ke,ji++):(e=pt,0===Hi&&a(Pe)),e!==pt?(r=eu(),r!==pt?($i=t,e=Oe(r),t=e):(ji=t,t=pt)):(ji=t,t=pt)))),t}function O(){var t
return t=P(),t===pt&&(t=L(),t===pt&&(t=Eu(),t===pt&&(t=Cu(),t===pt&&(8204===u.charCodeAt(ji)?(t=Ie,ji++):(t=pt,0===Hi&&a(Le)),t===pt&&(8205===u.charCodeAt(ji)?(t=Ue,ji++):(t=pt,0===Hi&&a(je))))))),t}function I(){var u
return u=Au(),u===pt&&(u=su(),u===pt&&(u=pu(),u===pt&&(u=cu(),u===pt&&(u=lu(),u===pt&&(u=Fu()))))),u}function L(){var u
return u=hu(),u===pt&&(u=fu()),u}function U(){var u
return u=j(),u===pt&&(u=$(),u===pt&&(u=Vu(),u===pt&&(u=M()))),u}function j(){var u
return u=Du(),u===pt&&(u=vu(),u===pt&&(u=Bu(),u===pt&&(u=yu(),u===pt&&(u=bu(),u===pt&&(u=_u(),u===pt&&(u=Nu(),u===pt&&(u=wu(),u===pt&&(u=xu(),u===pt&&(u=Pu(),u===pt&&(u=Ou(),u===pt&&(u=Iu(),u===pt&&(u=Lu(),u===pt&&(u=ju(),u===pt&&(u=$u(),u===pt&&(u=Mu(),u===pt&&(u=qu(),u===pt&&(u=zu(),u===pt&&(u=Wu(),u===pt&&(u=Gu(),u===pt&&(u=Ju(),u===pt&&(u=Xu(),u===pt&&(u=Qu(),u===pt&&(u=Ku(),u===pt&&(u=Zu(),u===pt&&(u=ut()))))))))))))))))))))))))),u}function $(){var u
return u=mu(),u===pt&&(u=gu(),u===pt&&(u=Su(),u===pt&&(u=Tu(),u===pt&&(u=Ru(),u===pt&&(u=Uu(),u===pt&&(u=Hu())))))),u}function M(){var u
return u=Yu(),u===pt&&(u=ku()),u}function V(){var t,e,r
return Hi++,t=ji,e=q(),e!==pt?(105===u.charCodeAt(ji)?(r=Me,ji++):(r=pt,0===Hi&&a(Ve)),r===pt&&(r=null),r!==pt?($i=t,e=qe(e,r),t=e):(ji=t,t=pt)):(ji=t,t=pt),Hi--,t===pt&&(e=pt,0===Hi&&a($e)),t}function q(){var t,e,r,n
if(Hi++,t=ji,34===u.charCodeAt(ji)?(e=ze,ji++):(e=pt,0===Hi&&a(We)),e!==pt){for(r=[],n=H();n!==pt;)r.push(n),n=H()
r!==pt?(34===u.charCodeAt(ji)?(n=ze,ji++):(n=pt,0===Hi&&a(We)),n!==pt?($i=t,e=Ge(r),t=e):(ji=t,t=pt)):(ji=t,t=pt)}else ji=t,t=pt
if(t===pt)if(t=ji,39===u.charCodeAt(ji)?(e=Ye,ji++):(e=pt,0===Hi&&a(Je)),e!==pt){for(r=[],n=z();n!==pt;)r.push(n),n=z()
r!==pt?(39===u.charCodeAt(ji)?(n=Ye,ji++):(n=pt,0===Hi&&a(Je)),n!==pt?($i=t,e=Ge(r),t=e):(ji=t,t=pt)):(ji=t,t=pt)}else ji=t,t=pt
return Hi--,t===pt&&(e=pt,0===Hi&&a(He)),t}function H(){var t,e,r
return t=ji,e=ji,Hi++,34===u.charCodeAt(ji)?(r=ze,ji++):(r=pt,0===Hi&&a(We)),r===pt&&(92===u.charCodeAt(ji)?(r=ke,ji++):(r=pt,0===Hi&&a(Pe)),r===pt&&(r=_())),Hi--,r===pt?e=void 0:(ji=e,e=pt),e!==pt?(r=y(),r!==pt?($i=t,e=Xe(),t=e):(ji=t,t=pt)):(ji=t,t=pt),t===pt&&(t=ji,92===u.charCodeAt(ji)?(e=ke,ji++):(e=pt,0===Hi&&a(Pe)),e!==pt?(r=X(),r!==pt?($i=t,e=Oe(r),t=e):(ji=t,t=pt)):(ji=t,t=pt),t===pt&&(t=J())),t}function z(){var t,e,r
return t=ji,e=ji,Hi++,39===u.charCodeAt(ji)?(r=Ye,ji++):(r=pt,0===Hi&&a(Je)),r===pt&&(92===u.charCodeAt(ji)?(r=ke,ji++):(r=pt,0===Hi&&a(Pe)),r===pt&&(r=_())),Hi--,r===pt?e=void 0:(ji=e,e=pt),e!==pt?(r=y(),r!==pt?($i=t,e=Xe(),t=e):(ji=t,t=pt)):(ji=t,t=pt),t===pt&&(t=ji,92===u.charCodeAt(ji)?(e=ke,ji++):(e=pt,0===Hi&&a(Pe)),e!==pt?(r=X(),r!==pt?($i=t,e=Oe(r),t=e):(ji=t,t=pt)):(ji=t,t=pt),t===pt&&(t=J())),t}function W(){var t,e,r,n,i,o
if(Hi++,t=ji,91===u.charCodeAt(ji)?(e=Ke,ji++):(e=pt,0===Hi&&a(Ze)),e!==pt)if(94===u.charCodeAt(ji)?(r=ur,ji++):(r=pt,0===Hi&&a(tr)),r===pt&&(r=null),r!==pt){for(n=[],i=G(),i===pt&&(i=Y());i!==pt;)n.push(i),i=G(),i===pt&&(i=Y())
n!==pt?(93===u.charCodeAt(ji)?(i=er,ji++):(i=pt,0===Hi&&a(rr)),i!==pt?(105===u.charCodeAt(ji)?(o=Me,ji++):(o=pt,0===Hi&&a(Ve)),o===pt&&(o=null),o!==pt?($i=t,e=nr(r,n,o),t=e):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt)}else ji=t,t=pt
else ji=t,t=pt
return Hi--,t===pt&&(e=pt,0===Hi&&a(Qe)),t}function G(){var t,e,r,n
return t=ji,e=Y(),e!==pt?(45===u.charCodeAt(ji)?(r=ir,ji++):(r=pt,0===Hi&&a(or)),r!==pt?(n=Y(),n!==pt?($i=t,e=ar(e,n),t=e):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt),t}function Y(){var t,e,r
return t=ji,e=ji,Hi++,93===u.charCodeAt(ji)?(r=er,ji++):(r=pt,0===Hi&&a(rr)),r===pt&&(92===u.charCodeAt(ji)?(r=ke,ji++):(r=pt,0===Hi&&a(Pe)),r===pt&&(r=_())),Hi--,r===pt?e=void 0:(ji=e,e=pt),e!==pt?(r=y(),r!==pt?($i=t,e=Xe(),t=e):(ji=t,t=pt)):(ji=t,t=pt),t===pt&&(t=ji,92===u.charCodeAt(ji)?(e=ke,ji++):(e=pt,0===Hi&&a(Pe)),e!==pt?(r=X(),r!==pt?($i=t,e=Oe(r),t=e):(ji=t,t=pt)):(ji=t,t=pt),t===pt&&(t=J())),t}function J(){var t,e,r
return t=ji,92===u.charCodeAt(ji)?(e=ke,ji++):(e=pt,0===Hi&&a(Pe)),e!==pt?(r=N(),r!==pt?($i=t,e=sr(),t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function X(){var t,e,r,n
return t=Q(),t===pt&&(t=ji,48===u.charCodeAt(ji)?(e=cr,ji++):(e=pt,0===Hi&&a(lr)),e!==pt?(r=ji,Hi++,n=ru(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?($i=t,e=pr(),t=e):(ji=t,t=pt)):(ji=t,t=pt),t===pt&&(t=tu(),t===pt&&(t=eu()))),t}function Q(){var u
return u=K(),u===pt&&(u=Z()),u}function K(){var t,e
return 39===u.charCodeAt(ji)?(t=Ye,ji++):(t=pt,0===Hi&&a(Je)),t===pt&&(34===u.charCodeAt(ji)?(t=ze,ji++):(t=pt,0===Hi&&a(We)),t===pt&&(92===u.charCodeAt(ji)?(t=ke,ji++):(t=pt,0===Hi&&a(Pe)),t===pt&&(t=ji,98===u.charCodeAt(ji)?(e=Ar,ji++):(e=pt,0===Hi&&a(fr)),e!==pt&&($i=t,e=hr()),t=e,t===pt&&(t=ji,102===u.charCodeAt(ji)?(e=Er,ji++):(e=pt,0===Hi&&a(Fr)),e!==pt&&($i=t,e=Cr()),t=e,t===pt&&(t=ji,110===u.charCodeAt(ji)?(e=dr,ji++):(e=pt,0===Hi&&a(Dr)),e!==pt&&($i=t,e=vr()),t=e,t===pt&&(t=ji,114===u.charCodeAt(ji)?(e=Br,ji++):(e=pt,0===Hi&&a(mr)),e!==pt&&($i=t,e=gr()),t=e,t===pt&&(t=ji,116===u.charCodeAt(ji)?(e=yr,ji++):(e=pt,0===Hi&&a(br)),e!==pt&&($i=t,e=_r()),t=e,t===pt&&(t=ji,118===u.charCodeAt(ji)?(e=Nr,ji++):(e=pt,0===Hi&&a(wr)),e!==pt&&($i=t,e=xr()),t=e)))))))),t}function Z(){var u,t,e
return u=ji,t=ji,Hi++,e=uu(),e===pt&&(e=_()),Hi--,e===pt?t=void 0:(ji=t,t=pt),t!==pt?(e=y(),e!==pt?($i=u,t=Xe(),u=t):(ji=u,u=pt)):(ji=u,u=pt),u}function uu(){var t
return t=K(),t===pt&&(t=ru(),t===pt&&(120===u.charCodeAt(ji)?(t=Sr,ji++):(t=pt,0===Hi&&a(Tr)),t===pt&&(117===u.charCodeAt(ji)?(t=Rr,ji++):(t=pt,0===Hi&&a(kr))))),t}function tu(){var t,e,r,n,i,o
return t=ji,120===u.charCodeAt(ji)?(e=Sr,ji++):(e=pt,0===Hi&&a(Tr)),e!==pt?(r=ji,n=ji,i=nu(),i!==pt?(o=nu(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt),r=n!==pt?u.substring(r,ji):n,r!==pt?($i=t,e=Pr(r),t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function eu(){var t,e,r,n,i,o,s,c
return t=ji,117===u.charCodeAt(ji)?(e=Rr,ji++):(e=pt,0===Hi&&a(kr)),e!==pt?(r=ji,n=ji,i=nu(),i!==pt?(o=nu(),o!==pt?(s=nu(),s!==pt?(c=nu(),c!==pt?(i=[i,o,s,c],n=i):(ji=n,n=pt)):(ji=n,n=pt)):(ji=n,n=pt)):(ji=n,n=pt),r=n!==pt?u.substring(r,ji):n,r!==pt?($i=t,e=Pr(r),t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function ru(){var t
return Or.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(Ir)),t}function nu(){var t
return Lr.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(Ur)),t}function iu(){var t,e
return t=ji,46===u.charCodeAt(ji)?(e=jr,ji++):(e=pt,0===Hi&&a($r)),e!==pt&&($i=t,e=Mr()),t=e}function ou(){var t,e,r,n
return Hi++,t=ji,123===u.charCodeAt(ji)?(e=qr,ji++):(e=pt,0===Hi&&a(Hr)),e!==pt?(r=au(),r!==pt?(125===u.charCodeAt(ji)?(n=zr,ji++):(n=pt,0===Hi&&a(Wr)),n!==pt?($i=t,e=Gr(r),t=e):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt),Hi--,t===pt&&(e=pt,0===Hi&&a(Vr)),t}function au(){var t,e,r,n,i,o
if(t=ji,e=[],r=[],n=ji,i=ji,Hi++,Yr.test(u.charAt(ji))?(o=u.charAt(ji),ji++):(o=pt,0===Hi&&a(Jr)),Hi--,o===pt?i=void 0:(ji=i,i=pt),i!==pt?(o=y(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt),n!==pt)for(;n!==pt;)r.push(n),n=ji,i=ji,Hi++,Yr.test(u.charAt(ji))?(o=u.charAt(ji),ji++):(o=pt,0===Hi&&a(Jr)),Hi--,o===pt?i=void 0:(ji=i,i=pt),i!==pt?(o=y(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt)
else r=pt
for(r===pt&&(r=ji,123===u.charCodeAt(ji)?(n=qr,ji++):(n=pt,0===Hi&&a(Hr)),n!==pt?(i=au(),i!==pt?(125===u.charCodeAt(ji)?(o=zr,ji++):(o=pt,0===Hi&&a(Wr)),o!==pt?(n=[n,i,o],r=n):(ji=r,r=pt)):(ji=r,r=pt)):(ji=r,r=pt));r!==pt;){if(e.push(r),r=[],n=ji,i=ji,Hi++,Yr.test(u.charAt(ji))?(o=u.charAt(ji),ji++):(o=pt,0===Hi&&a(Jr)),Hi--,o===pt?i=void 0:(ji=i,i=pt),i!==pt?(o=y(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt),n!==pt)for(;n!==pt;)r.push(n),n=ji,i=ji,Hi++,Yr.test(u.charAt(ji))?(o=u.charAt(ji),ji++):(o=pt,0===Hi&&a(Jr)),Hi--,o===pt?i=void 0:(ji=i,i=pt),i!==pt?(o=y(),o!==pt?(i=[i,o],n=i):(ji=n,n=pt)):(ji=n,n=pt)
else r=pt
r===pt&&(r=ji,123===u.charCodeAt(ji)?(n=qr,ji++):(n=pt,0===Hi&&a(Hr)),n!==pt?(i=au(),i!==pt?(125===u.charCodeAt(ji)?(o=zr,ji++):(o=pt,0===Hi&&a(Wr)),o!==pt?(n=[n,i,o],r=n):(ji=r,r=pt)):(ji=r,r=pt)):(ji=r,r=pt))}return t=e!==pt?u.substring(t,ji):e}function su(){var t
return Xr.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(Qr)),t}function cu(){var t
return Kr.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(Zr)),t}function lu(){var t
return un.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(tn)),t}function pu(){var t
return en.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(rn)),t}function Au(){var t
return nn.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(on)),t}function fu(){var t
return an.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(sn)),t}function hu(){var t
return cn.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(ln)),t}function Eu(){var t
return pn.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(An)),t}function Fu(){var t
return fn.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(hn)),t}function Cu(){var t
return En.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(Fn)),t}function du(){var t
return Cn.test(u.charAt(ji))?(t=u.charAt(ji),ji++):(t=pt,0===Hi&&a(dn)),t}function Du(){var t,e,r,n
return t=ji,u.substr(ji,5)===Dn?(e=Dn,ji+=5):(e=pt,0===Hi&&a(vn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function vu(){var t,e,r,n
return t=ji,u.substr(ji,4)===Bn?(e=Bn,ji+=4):(e=pt,0===Hi&&a(mn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Bu(){var t,e,r,n
return t=ji,u.substr(ji,5)===gn?(e=gn,ji+=5):(e=pt,0===Hi&&a(yn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function mu(){var t,e,r,n
return t=ji,u.substr(ji,5)===bn?(e=bn,ji+=5):(e=pt,0===Hi&&a(_n)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function gu(){var t,e,r,n
return t=ji,u.substr(ji,5)===Nn?(e=Nn,ji+=5):(e=pt,0===Hi&&a(wn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function yu(){var t,e,r,n
return t=ji,u.substr(ji,8)===xn?(e=xn,ji+=8):(e=pt,0===Hi&&a(Sn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function bu(){var t,e,r,n
return t=ji,u.substr(ji,8)===Tn?(e=Tn,ji+=8):(e=pt,0===Hi&&a(Rn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function _u(){var t,e,r,n
return t=ji,u.substr(ji,7)===kn?(e=kn,ji+=7):(e=pt,0===Hi&&a(Pn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Nu(){var t,e,r,n
return t=ji,u.substr(ji,6)===On?(e=On,ji+=6):(e=pt,0===Hi&&a(In)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function wu(){var t,e,r,n
return t=ji,u.substr(ji,2)===Ln?(e=Ln,ji+=2):(e=pt,0===Hi&&a(Un)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function xu(){var t,e,r,n
return t=ji,u.substr(ji,4)===jn?(e=jn,ji+=4):(e=pt,0===Hi&&a($n)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Su(){var t,e,r,n
return t=ji,u.substr(ji,4)===Mn?(e=Mn,ji+=4):(e=pt,0===Hi&&a(Vn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Tu(){var t,e,r,n
return t=ji,u.substr(ji,6)===qn?(e=qn,ji+=6):(e=pt,0===Hi&&a(Hn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Ru(){var t,e,r,n
return t=ji,u.substr(ji,7)===zn?(e=zn,ji+=7):(e=pt,0===Hi&&a(Wn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function ku(){var t,e,r,n
return t=ji,u.substr(ji,5)===Gn?(e=Gn,ji+=5):(e=pt,0===Hi&&a(Yn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Pu(){var t,e,r,n
return t=ji,u.substr(ji,7)===Jn?(e=Jn,ji+=7):(e=pt,0===Hi&&a(Xn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Ou(){var t,e,r,n
return t=ji,u.substr(ji,3)===Qn?(e=Qn,ji+=3):(e=pt,0===Hi&&a(Kn)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Iu(){var t,e,r,n
return t=ji,u.substr(ji,8)===Zn?(e=Zn,ji+=8):(e=pt,0===Hi&&a(ui)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Lu(){var t,e,r,n
return t=ji,u.substr(ji,2)===ti?(e=ti,ji+=2):(e=pt,0===Hi&&a(ei)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Uu(){var t,e,r,n
return t=ji,u.substr(ji,6)===ri?(e=ri,ji+=6):(e=pt,0===Hi&&a(ni)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function ju(){var t,e,r,n
return t=ji,u.substr(ji,10)===ii?(e=ii,ji+=10):(e=pt,0===Hi&&a(oi)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function $u(){var t,e,r,n
return t=ji,u.substr(ji,2)===ai?(e=ai,ji+=2):(e=pt,0===Hi&&a(si)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Mu(){var t,e,r,n
return t=ji,u.substr(ji,3)===ci?(e=ci,ji+=3):(e=pt,0===Hi&&a(li)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Vu(){var t,e,r,n
return t=ji,u.substr(ji,4)===pi?(e=pi,ji+=4):(e=pt,0===Hi&&a(Ai)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function qu(){var t,e,r,n
return t=ji,u.substr(ji,6)===fi?(e=fi,ji+=6):(e=pt,0===Hi&&a(hi)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Hu(){var t,e,r,n
return t=ji,u.substr(ji,5)===Ei?(e=Ei,ji+=5):(e=pt,0===Hi&&a(Fi)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function zu(){var t,e,r,n
return t=ji,u.substr(ji,6)===Ci?(e=Ci,ji+=6):(e=pt,0===Hi&&a(di)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Wu(){var t,e,r,n
return t=ji,u.substr(ji,4)===Di?(e=Di,ji+=4):(e=pt,0===Hi&&a(vi)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Gu(){var t,e,r,n
return t=ji,u.substr(ji,5)===Bi?(e=Bi,ji+=5):(e=pt,0===Hi&&a(mi)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Yu(){var t,e,r,n
return t=ji,u.substr(ji,4)===gi?(e=gi,ji+=4):(e=pt,0===Hi&&a(yi)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Ju(){var t,e,r,n
return t=ji,u.substr(ji,3)===bi?(e=bi,ji+=3):(e=pt,0===Hi&&a(_i)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Xu(){var t,e,r,n
return t=ji,u.substr(ji,6)===Ni?(e=Ni,ji+=6):(e=pt,0===Hi&&a(wi)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Qu(){var t,e,r,n
return t=ji,u.substr(ji,3)===xi?(e=xi,ji+=3):(e=pt,0===Hi&&a(Si)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Ku(){var t,e,r,n
return t=ji,u.substr(ji,4)===Ti?(e=Ti,ji+=4):(e=pt,0===Hi&&a(Ri)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function Zu(){var t,e,r,n
return t=ji,u.substr(ji,5)===ki?(e=ki,ji+=5):(e=pt,0===Hi&&a(Pi)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function ut(){var t,e,r,n
return t=ji,u.substr(ji,4)===Oi?(e=Oi,ji+=4):(e=pt,0===Hi&&a(Ii)),e!==pt?(r=ji,Hi++,n=O(),Hi--,n===pt?r=void 0:(ji=r,r=pt),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t}function tt(){var u,t
for(u=[],t=b(),t===pt&&(t=N(),t===pt&&(t=w()));t!==pt;)u.push(t),t=b(),t===pt&&(t=N(),t===pt&&(t=w()))
return u}function et(){var u,t
for(u=[],t=b(),t===pt&&(t=S());t!==pt;)u.push(t),t=b(),t===pt&&(t=S())
return u}function rt(){var t,e,r,n
return t=ji,e=tt(),e!==pt?(59===u.charCodeAt(ji)?(r=Li,ji++):(r=pt,0===Hi&&a(Ui)),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt),t===pt&&(t=ji,e=et(),e!==pt?(r=T(),r===pt&&(r=null),r!==pt?(n=N(),n!==pt?(e=[e,r,n],t=e):(ji=t,t=pt)):(ji=t,t=pt)):(ji=t,t=pt),t===pt&&(t=ji,e=tt(),e!==pt?(r=nt(),r!==pt?(e=[e,r],t=e):(ji=t,t=pt)):(ji=t,t=pt))),t}function nt(){var t,e
return t=ji,Hi++,u.length>ji?(e=u.charAt(ji),ji++):(e=pt,0===Hi&&a(Yt)),Hi--,e===pt?t=void 0:(ji=t,t=pt),t}function it(u){var t,e=[]
for(t=0;t<u.length;t++)""!==u[t]&&e.push(u[t])
return e}function ot(u,t){return u?u[t]:null}function at(u,t){var e,r=new Array(u.length)
for(e=0;e<u.length;e++)r[e]=u[e][t]
return r}function st(u,t,e){return[u].concat(at(t,e))}var ct,lt=arguments.length>1?arguments[1]:{},pt={},At={Grammar:c},ft=c,ht=function(u,t){return{type:"grammar",initializer:ot(u,0),rules:at(t,0),location:r()}},Et=function(u){return{type:"initializer",code:u,location:r()}},Ft="=",Ct={type:"literal",value:"=",description:'"="'},dt=function(u,t,e){return{type:"rule",name:u,expression:null!==t?{type:"named",name:t[0],expression:e,location:r()}:e,location:r()}},Dt="/",vt={type:"literal",value:"/",description:'"/"'},Bt=function(u,t){return t.length>0?{type:"choice",alternatives:st(u,t,3),location:r()}:u},mt=function(u,t){return null!==t?{type:"action",expression:u,code:t[1],location:r()}:u},gt=function(u,t){return t.length>0?{type:"sequence",elements:st(u,t,1),location:r()}:u},yt=":",bt={type:"literal",value:":",description:'":"'},_t=function(u,t){return{type:"labeled",label:u,expression:t,location:r()}},Nt=function(u,t){return{type:zi[u],expression:t,location:r()}},wt="$",xt={type:"literal",value:"$",description:'"$"'},St="&",Tt={type:"literal",value:"&",description:'"&"'},Rt="!",kt={type:"literal",value:"!",description:'"!"'},Pt=function(u,t){return{type:Wi[t],expression:u,location:r()}},Ot="?",It={type:"literal",value:"?",description:'"?"'},Lt="*",Ut={type:"literal",value:"*",description:'"*"'},jt="+",$t={type:"literal",value:"+",description:'"+"'},Mt="(",Vt={type:"literal",value:"(",description:'"("'},qt=")",Ht={type:"literal",value:")",description:'")"'},zt=function(u){return u},Wt=function(u){return{type:"rule_ref",name:u,location:r()}},Gt=function(u,t){return{type:Gi[u],code:t,location:r()}},Yt={type:"any",description:"any character"},Jt={type:"other",description:"whitespace"},Xt="\t",Qt={type:"literal",value:"\t",description:'"\\t"'},Kt="\v",Zt={type:"literal",value:"\v",description:'"\\x0B"'},ue="\f",te={type:"literal",value:"\f",description:'"\\f"'},ee=" ",re={type:"literal",value:" ",description:'" "'},ne=" ",ie={type:"literal",value:" ",description:'"\\xA0"'},oe="\ufeff",ae={type:"literal",value:"\ufeff",description:'"\\uFEFF"'},se=/^[\n\r\u2028\u2029]/,ce={type:"class",value:"[\\n\\r\\u2028\\u2029]",description:"[\\n\\r\\u2028\\u2029]"},le={type:"other",description:"end of line"},pe="\n",Ae={type:"literal",value:"\n",description:'"\\n"'},fe="\r\n",he={type:"literal",value:"\r\n",description:'"\\r\\n"'},Ee="\r",Fe={type:"literal",value:"\r",description:'"\\r"'},Ce="\u2028",de={type:"literal",value:"\u2028",description:'"\\u2028"'},De="\u2029",ve={type:"literal",value:"\u2029",description:'"\\u2029"'},Be={type:"other",description:"comment"},me="/*",ge={type:"literal",value:"/*",description:'"/*"'},ye="*/",be={type:"literal",value:"*/",description:'"*/"'},_e="//",Ne={type:"literal",value:"//",description:'"//"'},we=function(u){return u},xe={type:"other",description:"identifier"},Se=function(u,t){return u+t.join("")},Te="_",Re={type:"literal",value:"_",description:'"_"'},ke="\\",Pe={type:"literal",value:"\\",description:'"\\\\"'},Oe=function(u){return u},Ie="‌",Le={type:"literal",value:"‌",description:'"\\u200C"'},Ue="‍",je={type:"literal",value:"‍",description:'"\\u200D"'},$e={type:"other",description:"literal"},Me="i",Ve={type:"literal",value:"i",description:'"i"'},qe=function(u,t){return{type:"literal",value:u,ignoreCase:null!==t,location:r()}},He={type:"other",description:"string"},ze='"',We={type:"literal",value:'"',description:'"\\""'},Ge=function(u){return u.join("")},Ye="'",Je={type:"literal",value:"'",description:'"\'"'},Xe=function(){return e()},Qe={type:"other",description:"character class"},Ke="[",Ze={type:"literal",value:"[",description:'"["'},ur="^",tr={type:"literal",value:"^",description:'"^"'},er="]",rr={type:"literal",value:"]",description:'"]"'},nr=function(u,t,n){return{type:"class",parts:it(t),inverted:null!==u,ignoreCase:null!==n,rawText:e(),location:r()}},ir="-",or={type:"literal",value:"-",description:'"-"'},ar=function(u,t){return u.charCodeAt(0)>t.charCodeAt(0)&&n("Invalid character range: "+e()+"."),[u,t]},sr=function(){return""},cr="0",lr={type:"literal",value:"0",description:'"0"'},pr=function(){return"\0"},Ar="b",fr={type:"literal",value:"b",description:'"b"'},hr=function(){return"\b"},Er="f",Fr={type:"literal",value:"f",description:'"f"'},Cr=function(){return"\f"},dr="n",Dr={type:"literal",value:"n",description:'"n"'},vr=function(){return"\n"},Br="r",mr={type:"literal",value:"r",description:'"r"'},gr=function(){return"\r"},yr="t",br={type:"literal",value:"t",description:'"t"'},_r=function(){return"\t"},Nr="v",wr={type:"literal",value:"v",description:'"v"'},xr=function(){return"\v"},Sr="x",Tr={type:"literal",value:"x",description:'"x"'},Rr="u",kr={type:"literal",value:"u",description:'"u"'},Pr=function(u){return String.fromCharCode(parseInt(u,16))},Or=/^[0-9]/,Ir={type:"class",value:"[0-9]",description:"[0-9]"},Lr=/^[0-9a-f]/i,Ur={type:"class",value:"[0-9a-f]i",description:"[0-9a-f]i"},jr=".",$r={type:"literal",value:".",description:'"."'},Mr=function(){return{type:"any",location:r()}},Vr={type:"other",description:"code block"},qr="{",Hr={type:"literal",value:"{",description:'"{"'},zr="}",Wr={type:"literal",value:"}",description:'"}"'},Gr=function(u){return u},Yr=/^[{}]/,Jr={type:"class",value:"[{}]",description:"[{}]"},Xr=/^[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137-\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148-\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C-\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA-\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9-\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC-\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF-\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F-\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0-\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB-\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE-\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6-\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FC7\u1FD0-\u1FD3\u1FD6-\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6-\u1FF7\u210A\u210E-\u210F\u2113\u212F\u2134\u2139\u213C-\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65-\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73-\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3-\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]/,Qr={type:"class",value:"[\\u0061-\\u007A\\u00B5\\u00DF-\\u00F6\\u00F8-\\u00FF\\u0101\\u0103\\u0105\\u0107\\u0109\\u010B\\u010D\\u010F\\u0111\\u0113\\u0115\\u0117\\u0119\\u011B\\u011D\\u011F\\u0121\\u0123\\u0125\\u0127\\u0129\\u012B\\u012D\\u012F\\u0131\\u0133\\u0135\\u0137-\\u0138\\u013A\\u013C\\u013E\\u0140\\u0142\\u0144\\u0146\\u0148-\\u0149\\u014B\\u014D\\u014F\\u0151\\u0153\\u0155\\u0157\\u0159\\u015B\\u015D\\u015F\\u0161\\u0163\\u0165\\u0167\\u0169\\u016B\\u016D\\u016F\\u0171\\u0173\\u0175\\u0177\\u017A\\u017C\\u017E-\\u0180\\u0183\\u0185\\u0188\\u018C-\\u018D\\u0192\\u0195\\u0199-\\u019B\\u019E\\u01A1\\u01A3\\u01A5\\u01A8\\u01AA-\\u01AB\\u01AD\\u01B0\\u01B4\\u01B6\\u01B9-\\u01BA\\u01BD-\\u01BF\\u01C6\\u01C9\\u01CC\\u01CE\\u01D0\\u01D2\\u01D4\\u01D6\\u01D8\\u01DA\\u01DC-\\u01DD\\u01DF\\u01E1\\u01E3\\u01E5\\u01E7\\u01E9\\u01EB\\u01ED\\u01EF-\\u01F0\\u01F3\\u01F5\\u01F9\\u01FB\\u01FD\\u01FF\\u0201\\u0203\\u0205\\u0207\\u0209\\u020B\\u020D\\u020F\\u0211\\u0213\\u0215\\u0217\\u0219\\u021B\\u021D\\u021F\\u0221\\u0223\\u0225\\u0227\\u0229\\u022B\\u022D\\u022F\\u0231\\u0233-\\u0239\\u023C\\u023F-\\u0240\\u0242\\u0247\\u0249\\u024B\\u024D\\u024F-\\u0293\\u0295-\\u02AF\\u0371\\u0373\\u0377\\u037B-\\u037D\\u0390\\u03AC-\\u03CE\\u03D0-\\u03D1\\u03D5-\\u03D7\\u03D9\\u03DB\\u03DD\\u03DF\\u03E1\\u03E3\\u03E5\\u03E7\\u03E9\\u03EB\\u03ED\\u03EF-\\u03F3\\u03F5\\u03F8\\u03FB-\\u03FC\\u0430-\\u045F\\u0461\\u0463\\u0465\\u0467\\u0469\\u046B\\u046D\\u046F\\u0471\\u0473\\u0475\\u0477\\u0479\\u047B\\u047D\\u047F\\u0481\\u048B\\u048D\\u048F\\u0491\\u0493\\u0495\\u0497\\u0499\\u049B\\u049D\\u049F\\u04A1\\u04A3\\u04A5\\u04A7\\u04A9\\u04AB\\u04AD\\u04AF\\u04B1\\u04B3\\u04B5\\u04B7\\u04B9\\u04BB\\u04BD\\u04BF\\u04C2\\u04C4\\u04C6\\u04C8\\u04CA\\u04CC\\u04CE-\\u04CF\\u04D1\\u04D3\\u04D5\\u04D7\\u04D9\\u04DB\\u04DD\\u04DF\\u04E1\\u04E3\\u04E5\\u04E7\\u04E9\\u04EB\\u04ED\\u04EF\\u04F1\\u04F3\\u04F5\\u04F7\\u04F9\\u04FB\\u04FD\\u04FF\\u0501\\u0503\\u0505\\u0507\\u0509\\u050B\\u050D\\u050F\\u0511\\u0513\\u0515\\u0517\\u0519\\u051B\\u051D\\u051F\\u0521\\u0523\\u0525\\u0527\\u0529\\u052B\\u052D\\u052F\\u0561-\\u0587\\u13F8-\\u13FD\\u1D00-\\u1D2B\\u1D6B-\\u1D77\\u1D79-\\u1D9A\\u1E01\\u1E03\\u1E05\\u1E07\\u1E09\\u1E0B\\u1E0D\\u1E0F\\u1E11\\u1E13\\u1E15\\u1E17\\u1E19\\u1E1B\\u1E1D\\u1E1F\\u1E21\\u1E23\\u1E25\\u1E27\\u1E29\\u1E2B\\u1E2D\\u1E2F\\u1E31\\u1E33\\u1E35\\u1E37\\u1E39\\u1E3B\\u1E3D\\u1E3F\\u1E41\\u1E43\\u1E45\\u1E47\\u1E49\\u1E4B\\u1E4D\\u1E4F\\u1E51\\u1E53\\u1E55\\u1E57\\u1E59\\u1E5B\\u1E5D\\u1E5F\\u1E61\\u1E63\\u1E65\\u1E67\\u1E69\\u1E6B\\u1E6D\\u1E6F\\u1E71\\u1E73\\u1E75\\u1E77\\u1E79\\u1E7B\\u1E7D\\u1E7F\\u1E81\\u1E83\\u1E85\\u1E87\\u1E89\\u1E8B\\u1E8D\\u1E8F\\u1E91\\u1E93\\u1E95-\\u1E9D\\u1E9F\\u1EA1\\u1EA3\\u1EA5\\u1EA7\\u1EA9\\u1EAB\\u1EAD\\u1EAF\\u1EB1\\u1EB3\\u1EB5\\u1EB7\\u1EB9\\u1EBB\\u1EBD\\u1EBF\\u1EC1\\u1EC3\\u1EC5\\u1EC7\\u1EC9\\u1ECB\\u1ECD\\u1ECF\\u1ED1\\u1ED3\\u1ED5\\u1ED7\\u1ED9\\u1EDB\\u1EDD\\u1EDF\\u1EE1\\u1EE3\\u1EE5\\u1EE7\\u1EE9\\u1EEB\\u1EED\\u1EEF\\u1EF1\\u1EF3\\u1EF5\\u1EF7\\u1EF9\\u1EFB\\u1EFD\\u1EFF-\\u1F07\\u1F10-\\u1F15\\u1F20-\\u1F27\\u1F30-\\u1F37\\u1F40-\\u1F45\\u1F50-\\u1F57\\u1F60-\\u1F67\\u1F70-\\u1F7D\\u1F80-\\u1F87\\u1F90-\\u1F97\\u1FA0-\\u1FA7\\u1FB0-\\u1FB4\\u1FB6-\\u1FB7\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FC7\\u1FD0-\\u1FD3\\u1FD6-\\u1FD7\\u1FE0-\\u1FE7\\u1FF2-\\u1FF4\\u1FF6-\\u1FF7\\u210A\\u210E-\\u210F\\u2113\\u212F\\u2134\\u2139\\u213C-\\u213D\\u2146-\\u2149\\u214E\\u2184\\u2C30-\\u2C5E\\u2C61\\u2C65-\\u2C66\\u2C68\\u2C6A\\u2C6C\\u2C71\\u2C73-\\u2C74\\u2C76-\\u2C7B\\u2C81\\u2C83\\u2C85\\u2C87\\u2C89\\u2C8B\\u2C8D\\u2C8F\\u2C91\\u2C93\\u2C95\\u2C97\\u2C99\\u2C9B\\u2C9D\\u2C9F\\u2CA1\\u2CA3\\u2CA5\\u2CA7\\u2CA9\\u2CAB\\u2CAD\\u2CAF\\u2CB1\\u2CB3\\u2CB5\\u2CB7\\u2CB9\\u2CBB\\u2CBD\\u2CBF\\u2CC1\\u2CC3\\u2CC5\\u2CC7\\u2CC9\\u2CCB\\u2CCD\\u2CCF\\u2CD1\\u2CD3\\u2CD5\\u2CD7\\u2CD9\\u2CDB\\u2CDD\\u2CDF\\u2CE1\\u2CE3-\\u2CE4\\u2CEC\\u2CEE\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\uA641\\uA643\\uA645\\uA647\\uA649\\uA64B\\uA64D\\uA64F\\uA651\\uA653\\uA655\\uA657\\uA659\\uA65B\\uA65D\\uA65F\\uA661\\uA663\\uA665\\uA667\\uA669\\uA66B\\uA66D\\uA681\\uA683\\uA685\\uA687\\uA689\\uA68B\\uA68D\\uA68F\\uA691\\uA693\\uA695\\uA697\\uA699\\uA69B\\uA723\\uA725\\uA727\\uA729\\uA72B\\uA72D\\uA72F-\\uA731\\uA733\\uA735\\uA737\\uA739\\uA73B\\uA73D\\uA73F\\uA741\\uA743\\uA745\\uA747\\uA749\\uA74B\\uA74D\\uA74F\\uA751\\uA753\\uA755\\uA757\\uA759\\uA75B\\uA75D\\uA75F\\uA761\\uA763\\uA765\\uA767\\uA769\\uA76B\\uA76D\\uA76F\\uA771-\\uA778\\uA77A\\uA77C\\uA77F\\uA781\\uA783\\uA785\\uA787\\uA78C\\uA78E\\uA791\\uA793-\\uA795\\uA797\\uA799\\uA79B\\uA79D\\uA79F\\uA7A1\\uA7A3\\uA7A5\\uA7A7\\uA7A9\\uA7B5\\uA7B7\\uA7FA\\uAB30-\\uAB5A\\uAB60-\\uAB65\\uAB70-\\uABBF\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFF41-\\uFF5A]",description:"[\\u0061-\\u007A\\u00B5\\u00DF-\\u00F6\\u00F8-\\u00FF\\u0101\\u0103\\u0105\\u0107\\u0109\\u010B\\u010D\\u010F\\u0111\\u0113\\u0115\\u0117\\u0119\\u011B\\u011D\\u011F\\u0121\\u0123\\u0125\\u0127\\u0129\\u012B\\u012D\\u012F\\u0131\\u0133\\u0135\\u0137-\\u0138\\u013A\\u013C\\u013E\\u0140\\u0142\\u0144\\u0146\\u0148-\\u0149\\u014B\\u014D\\u014F\\u0151\\u0153\\u0155\\u0157\\u0159\\u015B\\u015D\\u015F\\u0161\\u0163\\u0165\\u0167\\u0169\\u016B\\u016D\\u016F\\u0171\\u0173\\u0175\\u0177\\u017A\\u017C\\u017E-\\u0180\\u0183\\u0185\\u0188\\u018C-\\u018D\\u0192\\u0195\\u0199-\\u019B\\u019E\\u01A1\\u01A3\\u01A5\\u01A8\\u01AA-\\u01AB\\u01AD\\u01B0\\u01B4\\u01B6\\u01B9-\\u01BA\\u01BD-\\u01BF\\u01C6\\u01C9\\u01CC\\u01CE\\u01D0\\u01D2\\u01D4\\u01D6\\u01D8\\u01DA\\u01DC-\\u01DD\\u01DF\\u01E1\\u01E3\\u01E5\\u01E7\\u01E9\\u01EB\\u01ED\\u01EF-\\u01F0\\u01F3\\u01F5\\u01F9\\u01FB\\u01FD\\u01FF\\u0201\\u0203\\u0205\\u0207\\u0209\\u020B\\u020D\\u020F\\u0211\\u0213\\u0215\\u0217\\u0219\\u021B\\u021D\\u021F\\u0221\\u0223\\u0225\\u0227\\u0229\\u022B\\u022D\\u022F\\u0231\\u0233-\\u0239\\u023C\\u023F-\\u0240\\u0242\\u0247\\u0249\\u024B\\u024D\\u024F-\\u0293\\u0295-\\u02AF\\u0371\\u0373\\u0377\\u037B-\\u037D\\u0390\\u03AC-\\u03CE\\u03D0-\\u03D1\\u03D5-\\u03D7\\u03D9\\u03DB\\u03DD\\u03DF\\u03E1\\u03E3\\u03E5\\u03E7\\u03E9\\u03EB\\u03ED\\u03EF-\\u03F3\\u03F5\\u03F8\\u03FB-\\u03FC\\u0430-\\u045F\\u0461\\u0463\\u0465\\u0467\\u0469\\u046B\\u046D\\u046F\\u0471\\u0473\\u0475\\u0477\\u0479\\u047B\\u047D\\u047F\\u0481\\u048B\\u048D\\u048F\\u0491\\u0493\\u0495\\u0497\\u0499\\u049B\\u049D\\u049F\\u04A1\\u04A3\\u04A5\\u04A7\\u04A9\\u04AB\\u04AD\\u04AF\\u04B1\\u04B3\\u04B5\\u04B7\\u04B9\\u04BB\\u04BD\\u04BF\\u04C2\\u04C4\\u04C6\\u04C8\\u04CA\\u04CC\\u04CE-\\u04CF\\u04D1\\u04D3\\u04D5\\u04D7\\u04D9\\u04DB\\u04DD\\u04DF\\u04E1\\u04E3\\u04E5\\u04E7\\u04E9\\u04EB\\u04ED\\u04EF\\u04F1\\u04F3\\u04F5\\u04F7\\u04F9\\u04FB\\u04FD\\u04FF\\u0501\\u0503\\u0505\\u0507\\u0509\\u050B\\u050D\\u050F\\u0511\\u0513\\u0515\\u0517\\u0519\\u051B\\u051D\\u051F\\u0521\\u0523\\u0525\\u0527\\u0529\\u052B\\u052D\\u052F\\u0561-\\u0587\\u13F8-\\u13FD\\u1D00-\\u1D2B\\u1D6B-\\u1D77\\u1D79-\\u1D9A\\u1E01\\u1E03\\u1E05\\u1E07\\u1E09\\u1E0B\\u1E0D\\u1E0F\\u1E11\\u1E13\\u1E15\\u1E17\\u1E19\\u1E1B\\u1E1D\\u1E1F\\u1E21\\u1E23\\u1E25\\u1E27\\u1E29\\u1E2B\\u1E2D\\u1E2F\\u1E31\\u1E33\\u1E35\\u1E37\\u1E39\\u1E3B\\u1E3D\\u1E3F\\u1E41\\u1E43\\u1E45\\u1E47\\u1E49\\u1E4B\\u1E4D\\u1E4F\\u1E51\\u1E53\\u1E55\\u1E57\\u1E59\\u1E5B\\u1E5D\\u1E5F\\u1E61\\u1E63\\u1E65\\u1E67\\u1E69\\u1E6B\\u1E6D\\u1E6F\\u1E71\\u1E73\\u1E75\\u1E77\\u1E79\\u1E7B\\u1E7D\\u1E7F\\u1E81\\u1E83\\u1E85\\u1E87\\u1E89\\u1E8B\\u1E8D\\u1E8F\\u1E91\\u1E93\\u1E95-\\u1E9D\\u1E9F\\u1EA1\\u1EA3\\u1EA5\\u1EA7\\u1EA9\\u1EAB\\u1EAD\\u1EAF\\u1EB1\\u1EB3\\u1EB5\\u1EB7\\u1EB9\\u1EBB\\u1EBD\\u1EBF\\u1EC1\\u1EC3\\u1EC5\\u1EC7\\u1EC9\\u1ECB\\u1ECD\\u1ECF\\u1ED1\\u1ED3\\u1ED5\\u1ED7\\u1ED9\\u1EDB\\u1EDD\\u1EDF\\u1EE1\\u1EE3\\u1EE5\\u1EE7\\u1EE9\\u1EEB\\u1EED\\u1EEF\\u1EF1\\u1EF3\\u1EF5\\u1EF7\\u1EF9\\u1EFB\\u1EFD\\u1EFF-\\u1F07\\u1F10-\\u1F15\\u1F20-\\u1F27\\u1F30-\\u1F37\\u1F40-\\u1F45\\u1F50-\\u1F57\\u1F60-\\u1F67\\u1F70-\\u1F7D\\u1F80-\\u1F87\\u1F90-\\u1F97\\u1FA0-\\u1FA7\\u1FB0-\\u1FB4\\u1FB6-\\u1FB7\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FC7\\u1FD0-\\u1FD3\\u1FD6-\\u1FD7\\u1FE0-\\u1FE7\\u1FF2-\\u1FF4\\u1FF6-\\u1FF7\\u210A\\u210E-\\u210F\\u2113\\u212F\\u2134\\u2139\\u213C-\\u213D\\u2146-\\u2149\\u214E\\u2184\\u2C30-\\u2C5E\\u2C61\\u2C65-\\u2C66\\u2C68\\u2C6A\\u2C6C\\u2C71\\u2C73-\\u2C74\\u2C76-\\u2C7B\\u2C81\\u2C83\\u2C85\\u2C87\\u2C89\\u2C8B\\u2C8D\\u2C8F\\u2C91\\u2C93\\u2C95\\u2C97\\u2C99\\u2C9B\\u2C9D\\u2C9F\\u2CA1\\u2CA3\\u2CA5\\u2CA7\\u2CA9\\u2CAB\\u2CAD\\u2CAF\\u2CB1\\u2CB3\\u2CB5\\u2CB7\\u2CB9\\u2CBB\\u2CBD\\u2CBF\\u2CC1\\u2CC3\\u2CC5\\u2CC7\\u2CC9\\u2CCB\\u2CCD\\u2CCF\\u2CD1\\u2CD3\\u2CD5\\u2CD7\\u2CD9\\u2CDB\\u2CDD\\u2CDF\\u2CE1\\u2CE3-\\u2CE4\\u2CEC\\u2CEE\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\uA641\\uA643\\uA645\\uA647\\uA649\\uA64B\\uA64D\\uA64F\\uA651\\uA653\\uA655\\uA657\\uA659\\uA65B\\uA65D\\uA65F\\uA661\\uA663\\uA665\\uA667\\uA669\\uA66B\\uA66D\\uA681\\uA683\\uA685\\uA687\\uA689\\uA68B\\uA68D\\uA68F\\uA691\\uA693\\uA695\\uA697\\uA699\\uA69B\\uA723\\uA725\\uA727\\uA729\\uA72B\\uA72D\\uA72F-\\uA731\\uA733\\uA735\\uA737\\uA739\\uA73B\\uA73D\\uA73F\\uA741\\uA743\\uA745\\uA747\\uA749\\uA74B\\uA74D\\uA74F\\uA751\\uA753\\uA755\\uA757\\uA759\\uA75B\\uA75D\\uA75F\\uA761\\uA763\\uA765\\uA767\\uA769\\uA76B\\uA76D\\uA76F\\uA771-\\uA778\\uA77A\\uA77C\\uA77F\\uA781\\uA783\\uA785\\uA787\\uA78C\\uA78E\\uA791\\uA793-\\uA795\\uA797\\uA799\\uA79B\\uA79D\\uA79F\\uA7A1\\uA7A3\\uA7A5\\uA7A7\\uA7A9\\uA7B5\\uA7B7\\uA7FA\\uAB30-\\uAB5A\\uAB60-\\uAB65\\uAB70-\\uABBF\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFF41-\\uFF5A]"},Kr=/^[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5-\u06E6\u07F4-\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C-\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D-\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C-\uA69D\uA717-\uA71F\uA770\uA788\uA7F8-\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3-\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E-\uFF9F]/,Zr={type:"class",value:"[\\u02B0-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0374\\u037A\\u0559\\u0640\\u06E5-\\u06E6\\u07F4-\\u07F5\\u07FA\\u081A\\u0824\\u0828\\u0971\\u0E46\\u0EC6\\u10FC\\u17D7\\u1843\\u1AA7\\u1C78-\\u1C7D\\u1D2C-\\u1D6A\\u1D78\\u1D9B-\\u1DBF\\u2071\\u207F\\u2090-\\u209C\\u2C7C-\\u2C7D\\u2D6F\\u2E2F\\u3005\\u3031-\\u3035\\u303B\\u309D-\\u309E\\u30FC-\\u30FE\\uA015\\uA4F8-\\uA4FD\\uA60C\\uA67F\\uA69C-\\uA69D\\uA717-\\uA71F\\uA770\\uA788\\uA7F8-\\uA7F9\\uA9CF\\uA9E6\\uAA70\\uAADD\\uAAF3-\\uAAF4\\uAB5C-\\uAB5F\\uFF70\\uFF9E-\\uFF9F]",description:"[\\u02B0-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0374\\u037A\\u0559\\u0640\\u06E5-\\u06E6\\u07F4-\\u07F5\\u07FA\\u081A\\u0824\\u0828\\u0971\\u0E46\\u0EC6\\u10FC\\u17D7\\u1843\\u1AA7\\u1C78-\\u1C7D\\u1D2C-\\u1D6A\\u1D78\\u1D9B-\\u1DBF\\u2071\\u207F\\u2090-\\u209C\\u2C7C-\\u2C7D\\u2D6F\\u2E2F\\u3005\\u3031-\\u3035\\u303B\\u309D-\\u309E\\u30FC-\\u30FE\\uA015\\uA4F8-\\uA4FD\\uA60C\\uA67F\\uA69C-\\uA69D\\uA717-\\uA71F\\uA770\\uA788\\uA7F8-\\uA7F9\\uA9CF\\uA9E6\\uAA70\\uAADD\\uAAF3-\\uAAF4\\uAB5C-\\uAB5F\\uFF70\\uFF9E-\\uFF9F]"},un=/^[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E45\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A-\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,tn={type:"class",value:"[\\u00AA\\u00BA\\u01BB\\u01C0-\\u01C3\\u0294\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u063F\\u0641-\\u064A\\u066E-\\u066F\\u0671-\\u06D3\\u06D5\\u06EE-\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u0800-\\u0815\\u0840-\\u0858\\u08A0-\\u08B4\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0972-\\u0980\\u0985-\\u098C\\u098F-\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC-\\u09DD\\u09DF-\\u09E1\\u09F0-\\u09F1\\u0A05-\\u0A0A\\u0A0F-\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32-\\u0A33\\u0A35-\\u0A36\\u0A38-\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2-\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0-\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F-\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32-\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C-\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99-\\u0B9A\\u0B9C\\u0B9E-\\u0B9F\\u0BA3-\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60-\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0-\\u0CE1\\u0CF1-\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32-\\u0E33\\u0E40-\\u0E45\\u0E81-\\u0E82\\u0E84\\u0E87-\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA-\\u0EAB\\u0EAD-\\u0EB0\\u0EB2-\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065-\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10D0-\\u10FA\\u10FD-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16F1-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17DC\\u1820-\\u1842\\u1844-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE-\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C77\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5-\\u1CF6\\u2135-\\u2138\\u2D30-\\u2D67\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u3006\\u303C\\u3041-\\u3096\\u309F\\u30A1-\\u30FA\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA014\\uA016-\\uA48C\\uA4D0-\\uA4F7\\uA500-\\uA60B\\uA610-\\uA61F\\uA62A-\\uA62B\\uA66E\\uA6A0-\\uA6E5\\uA78F\\uA7F7\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9E0-\\uA9E4\\uA9E7-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA6F\\uAA71-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5-\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADC\\uAAE0-\\uAAEA\\uAAF2\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40-\\uFB41\\uFB43-\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF66-\\uFF6F\\uFF71-\\uFF9D\\uFFA0-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]",description:"[\\u00AA\\u00BA\\u01BB\\u01C0-\\u01C3\\u0294\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u063F\\u0641-\\u064A\\u066E-\\u066F\\u0671-\\u06D3\\u06D5\\u06EE-\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u0800-\\u0815\\u0840-\\u0858\\u08A0-\\u08B4\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0972-\\u0980\\u0985-\\u098C\\u098F-\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC-\\u09DD\\u09DF-\\u09E1\\u09F0-\\u09F1\\u0A05-\\u0A0A\\u0A0F-\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32-\\u0A33\\u0A35-\\u0A36\\u0A38-\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2-\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0-\\u0AE1\\u0AF9\\u0B05-\\u0B0C\\u0B0F-\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32-\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C-\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99-\\u0B9A\\u0B9C\\u0B9E-\\u0B9F\\u0BA3-\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C39\\u0C3D\\u0C58-\\u0C5A\\u0C60-\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0-\\u0CE1\\u0CF1-\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D5F-\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32-\\u0E33\\u0E40-\\u0E45\\u0E81-\\u0E82\\u0E84\\u0E87-\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA-\\u0EAB\\u0EAD-\\u0EB0\\u0EB2-\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065-\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10D0-\\u10FA\\u10FD-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16F1-\\u16F8\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17DC\\u1820-\\u1842\\u1844-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191E\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19B0-\\u19C9\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE-\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C77\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5-\\u1CF6\\u2135-\\u2138\\u2D30-\\u2D67\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u3006\\u303C\\u3041-\\u3096\\u309F\\u30A1-\\u30FA\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FD5\\uA000-\\uA014\\uA016-\\uA48C\\uA4D0-\\uA4F7\\uA500-\\uA60B\\uA610-\\uA61F\\uA62A-\\uA62B\\uA66E\\uA6A0-\\uA6E5\\uA78F\\uA7F7\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA8FD\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9E0-\\uA9E4\\uA9E7-\\uA9EF\\uA9FA-\\uA9FE\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA6F\\uAA71-\\uAA76\\uAA7A\\uAA7E-\\uAAAF\\uAAB1\\uAAB5-\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADC\\uAAE0-\\uAAEA\\uAAF2\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40-\\uFB41\\uFB43-\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF66-\\uFF6F\\uFF71-\\uFF9D\\uFFA0-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"},en=/^[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]/,rn={type:"class",value:"[\\u01C5\\u01C8\\u01CB\\u01F2\\u1F88-\\u1F8F\\u1F98-\\u1F9F\\u1FA8-\\u1FAF\\u1FBC\\u1FCC\\u1FFC]",description:"[\\u01C5\\u01C8\\u01CB\\u01F2\\u1F88-\\u1F8F\\u1F98-\\u1F9F\\u1FA8-\\u1FAF\\u1FBC\\u1FCC\\u1FFC]"},nn=/^[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178-\u0179\u017B\u017D\u0181-\u0182\u0184\u0186-\u0187\u0189-\u018B\u018E-\u0191\u0193-\u0194\u0196-\u0198\u019C-\u019D\u019F-\u01A0\u01A2\u01A4\u01A6-\u01A7\u01A9\u01AC\u01AE-\u01AF\u01B1-\u01B3\u01B5\u01B7-\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A-\u023B\u023D-\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E-\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9-\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0-\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E-\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D-\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A]/,on={
type:"class",value:"[\\u0041-\\u005A\\u00C0-\\u00D6\\u00D8-\\u00DE\\u0100\\u0102\\u0104\\u0106\\u0108\\u010A\\u010C\\u010E\\u0110\\u0112\\u0114\\u0116\\u0118\\u011A\\u011C\\u011E\\u0120\\u0122\\u0124\\u0126\\u0128\\u012A\\u012C\\u012E\\u0130\\u0132\\u0134\\u0136\\u0139\\u013B\\u013D\\u013F\\u0141\\u0143\\u0145\\u0147\\u014A\\u014C\\u014E\\u0150\\u0152\\u0154\\u0156\\u0158\\u015A\\u015C\\u015E\\u0160\\u0162\\u0164\\u0166\\u0168\\u016A\\u016C\\u016E\\u0170\\u0172\\u0174\\u0176\\u0178-\\u0179\\u017B\\u017D\\u0181-\\u0182\\u0184\\u0186-\\u0187\\u0189-\\u018B\\u018E-\\u0191\\u0193-\\u0194\\u0196-\\u0198\\u019C-\\u019D\\u019F-\\u01A0\\u01A2\\u01A4\\u01A6-\\u01A7\\u01A9\\u01AC\\u01AE-\\u01AF\\u01B1-\\u01B3\\u01B5\\u01B7-\\u01B8\\u01BC\\u01C4\\u01C7\\u01CA\\u01CD\\u01CF\\u01D1\\u01D3\\u01D5\\u01D7\\u01D9\\u01DB\\u01DE\\u01E0\\u01E2\\u01E4\\u01E6\\u01E8\\u01EA\\u01EC\\u01EE\\u01F1\\u01F4\\u01F6-\\u01F8\\u01FA\\u01FC\\u01FE\\u0200\\u0202\\u0204\\u0206\\u0208\\u020A\\u020C\\u020E\\u0210\\u0212\\u0214\\u0216\\u0218\\u021A\\u021C\\u021E\\u0220\\u0222\\u0224\\u0226\\u0228\\u022A\\u022C\\u022E\\u0230\\u0232\\u023A-\\u023B\\u023D-\\u023E\\u0241\\u0243-\\u0246\\u0248\\u024A\\u024C\\u024E\\u0370\\u0372\\u0376\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u038F\\u0391-\\u03A1\\u03A3-\\u03AB\\u03CF\\u03D2-\\u03D4\\u03D8\\u03DA\\u03DC\\u03DE\\u03E0\\u03E2\\u03E4\\u03E6\\u03E8\\u03EA\\u03EC\\u03EE\\u03F4\\u03F7\\u03F9-\\u03FA\\u03FD-\\u042F\\u0460\\u0462\\u0464\\u0466\\u0468\\u046A\\u046C\\u046E\\u0470\\u0472\\u0474\\u0476\\u0478\\u047A\\u047C\\u047E\\u0480\\u048A\\u048C\\u048E\\u0490\\u0492\\u0494\\u0496\\u0498\\u049A\\u049C\\u049E\\u04A0\\u04A2\\u04A4\\u04A6\\u04A8\\u04AA\\u04AC\\u04AE\\u04B0\\u04B2\\u04B4\\u04B6\\u04B8\\u04BA\\u04BC\\u04BE\\u04C0-\\u04C1\\u04C3\\u04C5\\u04C7\\u04C9\\u04CB\\u04CD\\u04D0\\u04D2\\u04D4\\u04D6\\u04D8\\u04DA\\u04DC\\u04DE\\u04E0\\u04E2\\u04E4\\u04E6\\u04E8\\u04EA\\u04EC\\u04EE\\u04F0\\u04F2\\u04F4\\u04F6\\u04F8\\u04FA\\u04FC\\u04FE\\u0500\\u0502\\u0504\\u0506\\u0508\\u050A\\u050C\\u050E\\u0510\\u0512\\u0514\\u0516\\u0518\\u051A\\u051C\\u051E\\u0520\\u0522\\u0524\\u0526\\u0528\\u052A\\u052C\\u052E\\u0531-\\u0556\\u10A0-\\u10C5\\u10C7\\u10CD\\u13A0-\\u13F5\\u1E00\\u1E02\\u1E04\\u1E06\\u1E08\\u1E0A\\u1E0C\\u1E0E\\u1E10\\u1E12\\u1E14\\u1E16\\u1E18\\u1E1A\\u1E1C\\u1E1E\\u1E20\\u1E22\\u1E24\\u1E26\\u1E28\\u1E2A\\u1E2C\\u1E2E\\u1E30\\u1E32\\u1E34\\u1E36\\u1E38\\u1E3A\\u1E3C\\u1E3E\\u1E40\\u1E42\\u1E44\\u1E46\\u1E48\\u1E4A\\u1E4C\\u1E4E\\u1E50\\u1E52\\u1E54\\u1E56\\u1E58\\u1E5A\\u1E5C\\u1E5E\\u1E60\\u1E62\\u1E64\\u1E66\\u1E68\\u1E6A\\u1E6C\\u1E6E\\u1E70\\u1E72\\u1E74\\u1E76\\u1E78\\u1E7A\\u1E7C\\u1E7E\\u1E80\\u1E82\\u1E84\\u1E86\\u1E88\\u1E8A\\u1E8C\\u1E8E\\u1E90\\u1E92\\u1E94\\u1E9E\\u1EA0\\u1EA2\\u1EA4\\u1EA6\\u1EA8\\u1EAA\\u1EAC\\u1EAE\\u1EB0\\u1EB2\\u1EB4\\u1EB6\\u1EB8\\u1EBA\\u1EBC\\u1EBE\\u1EC0\\u1EC2\\u1EC4\\u1EC6\\u1EC8\\u1ECA\\u1ECC\\u1ECE\\u1ED0\\u1ED2\\u1ED4\\u1ED6\\u1ED8\\u1EDA\\u1EDC\\u1EDE\\u1EE0\\u1EE2\\u1EE4\\u1EE6\\u1EE8\\u1EEA\\u1EEC\\u1EEE\\u1EF0\\u1EF2\\u1EF4\\u1EF6\\u1EF8\\u1EFA\\u1EFC\\u1EFE\\u1F08-\\u1F0F\\u1F18-\\u1F1D\\u1F28-\\u1F2F\\u1F38-\\u1F3F\\u1F48-\\u1F4D\\u1F59\\u1F5B\\u1F5D\\u1F5F\\u1F68-\\u1F6F\\u1FB8-\\u1FBB\\u1FC8-\\u1FCB\\u1FD8-\\u1FDB\\u1FE8-\\u1FEC\\u1FF8-\\u1FFB\\u2102\\u2107\\u210B-\\u210D\\u2110-\\u2112\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u2130-\\u2133\\u213E-\\u213F\\u2145\\u2183\\u2C00-\\u2C2E\\u2C60\\u2C62-\\u2C64\\u2C67\\u2C69\\u2C6B\\u2C6D-\\u2C70\\u2C72\\u2C75\\u2C7E-\\u2C80\\u2C82\\u2C84\\u2C86\\u2C88\\u2C8A\\u2C8C\\u2C8E\\u2C90\\u2C92\\u2C94\\u2C96\\u2C98\\u2C9A\\u2C9C\\u2C9E\\u2CA0\\u2CA2\\u2CA4\\u2CA6\\u2CA8\\u2CAA\\u2CAC\\u2CAE\\u2CB0\\u2CB2\\u2CB4\\u2CB6\\u2CB8\\u2CBA\\u2CBC\\u2CBE\\u2CC0\\u2CC2\\u2CC4\\u2CC6\\u2CC8\\u2CCA\\u2CCC\\u2CCE\\u2CD0\\u2CD2\\u2CD4\\u2CD6\\u2CD8\\u2CDA\\u2CDC\\u2CDE\\u2CE0\\u2CE2\\u2CEB\\u2CED\\u2CF2\\uA640\\uA642\\uA644\\uA646\\uA648\\uA64A\\uA64C\\uA64E\\uA650\\uA652\\uA654\\uA656\\uA658\\uA65A\\uA65C\\uA65E\\uA660\\uA662\\uA664\\uA666\\uA668\\uA66A\\uA66C\\uA680\\uA682\\uA684\\uA686\\uA688\\uA68A\\uA68C\\uA68E\\uA690\\uA692\\uA694\\uA696\\uA698\\uA69A\\uA722\\uA724\\uA726\\uA728\\uA72A\\uA72C\\uA72E\\uA732\\uA734\\uA736\\uA738\\uA73A\\uA73C\\uA73E\\uA740\\uA742\\uA744\\uA746\\uA748\\uA74A\\uA74C\\uA74E\\uA750\\uA752\\uA754\\uA756\\uA758\\uA75A\\uA75C\\uA75E\\uA760\\uA762\\uA764\\uA766\\uA768\\uA76A\\uA76C\\uA76E\\uA779\\uA77B\\uA77D-\\uA77E\\uA780\\uA782\\uA784\\uA786\\uA78B\\uA78D\\uA790\\uA792\\uA796\\uA798\\uA79A\\uA79C\\uA79E\\uA7A0\\uA7A2\\uA7A4\\uA7A6\\uA7A8\\uA7AA-\\uA7AD\\uA7B0-\\uA7B4\\uA7B6\\uFF21-\\uFF3A]",description:"[\\u0041-\\u005A\\u00C0-\\u00D6\\u00D8-\\u00DE\\u0100\\u0102\\u0104\\u0106\\u0108\\u010A\\u010C\\u010E\\u0110\\u0112\\u0114\\u0116\\u0118\\u011A\\u011C\\u011E\\u0120\\u0122\\u0124\\u0126\\u0128\\u012A\\u012C\\u012E\\u0130\\u0132\\u0134\\u0136\\u0139\\u013B\\u013D\\u013F\\u0141\\u0143\\u0145\\u0147\\u014A\\u014C\\u014E\\u0150\\u0152\\u0154\\u0156\\u0158\\u015A\\u015C\\u015E\\u0160\\u0162\\u0164\\u0166\\u0168\\u016A\\u016C\\u016E\\u0170\\u0172\\u0174\\u0176\\u0178-\\u0179\\u017B\\u017D\\u0181-\\u0182\\u0184\\u0186-\\u0187\\u0189-\\u018B\\u018E-\\u0191\\u0193-\\u0194\\u0196-\\u0198\\u019C-\\u019D\\u019F-\\u01A0\\u01A2\\u01A4\\u01A6-\\u01A7\\u01A9\\u01AC\\u01AE-\\u01AF\\u01B1-\\u01B3\\u01B5\\u01B7-\\u01B8\\u01BC\\u01C4\\u01C7\\u01CA\\u01CD\\u01CF\\u01D1\\u01D3\\u01D5\\u01D7\\u01D9\\u01DB\\u01DE\\u01E0\\u01E2\\u01E4\\u01E6\\u01E8\\u01EA\\u01EC\\u01EE\\u01F1\\u01F4\\u01F6-\\u01F8\\u01FA\\u01FC\\u01FE\\u0200\\u0202\\u0204\\u0206\\u0208\\u020A\\u020C\\u020E\\u0210\\u0212\\u0214\\u0216\\u0218\\u021A\\u021C\\u021E\\u0220\\u0222\\u0224\\u0226\\u0228\\u022A\\u022C\\u022E\\u0230\\u0232\\u023A-\\u023B\\u023D-\\u023E\\u0241\\u0243-\\u0246\\u0248\\u024A\\u024C\\u024E\\u0370\\u0372\\u0376\\u037F\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u038F\\u0391-\\u03A1\\u03A3-\\u03AB\\u03CF\\u03D2-\\u03D4\\u03D8\\u03DA\\u03DC\\u03DE\\u03E0\\u03E2\\u03E4\\u03E6\\u03E8\\u03EA\\u03EC\\u03EE\\u03F4\\u03F7\\u03F9-\\u03FA\\u03FD-\\u042F\\u0460\\u0462\\u0464\\u0466\\u0468\\u046A\\u046C\\u046E\\u0470\\u0472\\u0474\\u0476\\u0478\\u047A\\u047C\\u047E\\u0480\\u048A\\u048C\\u048E\\u0490\\u0492\\u0494\\u0496\\u0498\\u049A\\u049C\\u049E\\u04A0\\u04A2\\u04A4\\u04A6\\u04A8\\u04AA\\u04AC\\u04AE\\u04B0\\u04B2\\u04B4\\u04B6\\u04B8\\u04BA\\u04BC\\u04BE\\u04C0-\\u04C1\\u04C3\\u04C5\\u04C7\\u04C9\\u04CB\\u04CD\\u04D0\\u04D2\\u04D4\\u04D6\\u04D8\\u04DA\\u04DC\\u04DE\\u04E0\\u04E2\\u04E4\\u04E6\\u04E8\\u04EA\\u04EC\\u04EE\\u04F0\\u04F2\\u04F4\\u04F6\\u04F8\\u04FA\\u04FC\\u04FE\\u0500\\u0502\\u0504\\u0506\\u0508\\u050A\\u050C\\u050E\\u0510\\u0512\\u0514\\u0516\\u0518\\u051A\\u051C\\u051E\\u0520\\u0522\\u0524\\u0526\\u0528\\u052A\\u052C\\u052E\\u0531-\\u0556\\u10A0-\\u10C5\\u10C7\\u10CD\\u13A0-\\u13F5\\u1E00\\u1E02\\u1E04\\u1E06\\u1E08\\u1E0A\\u1E0C\\u1E0E\\u1E10\\u1E12\\u1E14\\u1E16\\u1E18\\u1E1A\\u1E1C\\u1E1E\\u1E20\\u1E22\\u1E24\\u1E26\\u1E28\\u1E2A\\u1E2C\\u1E2E\\u1E30\\u1E32\\u1E34\\u1E36\\u1E38\\u1E3A\\u1E3C\\u1E3E\\u1E40\\u1E42\\u1E44\\u1E46\\u1E48\\u1E4A\\u1E4C\\u1E4E\\u1E50\\u1E52\\u1E54\\u1E56\\u1E58\\u1E5A\\u1E5C\\u1E5E\\u1E60\\u1E62\\u1E64\\u1E66\\u1E68\\u1E6A\\u1E6C\\u1E6E\\u1E70\\u1E72\\u1E74\\u1E76\\u1E78\\u1E7A\\u1E7C\\u1E7E\\u1E80\\u1E82\\u1E84\\u1E86\\u1E88\\u1E8A\\u1E8C\\u1E8E\\u1E90\\u1E92\\u1E94\\u1E9E\\u1EA0\\u1EA2\\u1EA4\\u1EA6\\u1EA8\\u1EAA\\u1EAC\\u1EAE\\u1EB0\\u1EB2\\u1EB4\\u1EB6\\u1EB8\\u1EBA\\u1EBC\\u1EBE\\u1EC0\\u1EC2\\u1EC4\\u1EC6\\u1EC8\\u1ECA\\u1ECC\\u1ECE\\u1ED0\\u1ED2\\u1ED4\\u1ED6\\u1ED8\\u1EDA\\u1EDC\\u1EDE\\u1EE0\\u1EE2\\u1EE4\\u1EE6\\u1EE8\\u1EEA\\u1EEC\\u1EEE\\u1EF0\\u1EF2\\u1EF4\\u1EF6\\u1EF8\\u1EFA\\u1EFC\\u1EFE\\u1F08-\\u1F0F\\u1F18-\\u1F1D\\u1F28-\\u1F2F\\u1F38-\\u1F3F\\u1F48-\\u1F4D\\u1F59\\u1F5B\\u1F5D\\u1F5F\\u1F68-\\u1F6F\\u1FB8-\\u1FBB\\u1FC8-\\u1FCB\\u1FD8-\\u1FDB\\u1FE8-\\u1FEC\\u1FF8-\\u1FFB\\u2102\\u2107\\u210B-\\u210D\\u2110-\\u2112\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u2130-\\u2133\\u213E-\\u213F\\u2145\\u2183\\u2C00-\\u2C2E\\u2C60\\u2C62-\\u2C64\\u2C67\\u2C69\\u2C6B\\u2C6D-\\u2C70\\u2C72\\u2C75\\u2C7E-\\u2C80\\u2C82\\u2C84\\u2C86\\u2C88\\u2C8A\\u2C8C\\u2C8E\\u2C90\\u2C92\\u2C94\\u2C96\\u2C98\\u2C9A\\u2C9C\\u2C9E\\u2CA0\\u2CA2\\u2CA4\\u2CA6\\u2CA8\\u2CAA\\u2CAC\\u2CAE\\u2CB0\\u2CB2\\u2CB4\\u2CB6\\u2CB8\\u2CBA\\u2CBC\\u2CBE\\u2CC0\\u2CC2\\u2CC4\\u2CC6\\u2CC8\\u2CCA\\u2CCC\\u2CCE\\u2CD0\\u2CD2\\u2CD4\\u2CD6\\u2CD8\\u2CDA\\u2CDC\\u2CDE\\u2CE0\\u2CE2\\u2CEB\\u2CED\\u2CF2\\uA640\\uA642\\uA644\\uA646\\uA648\\uA64A\\uA64C\\uA64E\\uA650\\uA652\\uA654\\uA656\\uA658\\uA65A\\uA65C\\uA65E\\uA660\\uA662\\uA664\\uA666\\uA668\\uA66A\\uA66C\\uA680\\uA682\\uA684\\uA686\\uA688\\uA68A\\uA68C\\uA68E\\uA690\\uA692\\uA694\\uA696\\uA698\\uA69A\\uA722\\uA724\\uA726\\uA728\\uA72A\\uA72C\\uA72E\\uA732\\uA734\\uA736\\uA738\\uA73A\\uA73C\\uA73E\\uA740\\uA742\\uA744\\uA746\\uA748\\uA74A\\uA74C\\uA74E\\uA750\\uA752\\uA754\\uA756\\uA758\\uA75A\\uA75C\\uA75E\\uA760\\uA762\\uA764\\uA766\\uA768\\uA76A\\uA76C\\uA76E\\uA779\\uA77B\\uA77D-\\uA77E\\uA780\\uA782\\uA784\\uA786\\uA78B\\uA78D\\uA790\\uA792\\uA796\\uA798\\uA79A\\uA79C\\uA79E\\uA7A0\\uA7A2\\uA7A4\\uA7A6\\uA7A8\\uA7AA-\\uA7AD\\uA7B0-\\uA7B4\\uA7B6\\uFF21-\\uFF3A]"},an=/^[\u0903\u093B\u093E-\u0940\u0949-\u094C\u094E-\u094F\u0982-\u0983\u09BE-\u09C0\u09C7-\u09C8\u09CB-\u09CC\u09D7\u0A03\u0A3E-\u0A40\u0A83\u0ABE-\u0AC0\u0AC9\u0ACB-\u0ACC\u0B02-\u0B03\u0B3E\u0B40\u0B47-\u0B48\u0B4B-\u0B4C\u0B57\u0BBE-\u0BBF\u0BC1-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD7\u0C01-\u0C03\u0C41-\u0C44\u0C82-\u0C83\u0CBE\u0CC0-\u0CC4\u0CC7-\u0CC8\u0CCA-\u0CCB\u0CD5-\u0CD6\u0D02-\u0D03\u0D3E-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D57\u0D82-\u0D83\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DF2-\u0DF3\u0F3E-\u0F3F\u0F7F\u102B-\u102C\u1031\u1038\u103B-\u103C\u1056-\u1057\u1062-\u1064\u1067-\u106D\u1083-\u1084\u1087-\u108C\u108F\u109A-\u109C\u17B6\u17BE-\u17C5\u17C7-\u17C8\u1923-\u1926\u1929-\u192B\u1930-\u1931\u1933-\u1938\u1A19-\u1A1A\u1A55\u1A57\u1A61\u1A63-\u1A64\u1A6D-\u1A72\u1B04\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B44\u1B82\u1BA1\u1BA6-\u1BA7\u1BAA\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2-\u1BF3\u1C24-\u1C2B\u1C34-\u1C35\u1CE1\u1CF2-\u1CF3\u302E-\u302F\uA823-\uA824\uA827\uA880-\uA881\uA8B4-\uA8C3\uA952-\uA953\uA983\uA9B4-\uA9B5\uA9BA-\uA9BB\uA9BD-\uA9C0\uAA2F-\uAA30\uAA33-\uAA34\uAA4D\uAA7B\uAA7D\uAAEB\uAAEE-\uAAEF\uAAF5\uABE3-\uABE4\uABE6-\uABE7\uABE9-\uABEA\uABEC]/,sn={type:"class",value:"[\\u0903\\u093B\\u093E-\\u0940\\u0949-\\u094C\\u094E-\\u094F\\u0982-\\u0983\\u09BE-\\u09C0\\u09C7-\\u09C8\\u09CB-\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB-\\u0ACC\\u0B02-\\u0B03\\u0B3E\\u0B40\\u0B47-\\u0B48\\u0B4B-\\u0B4C\\u0B57\\u0BBE-\\u0BBF\\u0BC1-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82-\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7-\\u0CC8\\u0CCA-\\u0CCB\\u0CD5-\\u0CD6\\u0D02-\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82-\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2-\\u0DF3\\u0F3E-\\u0F3F\\u0F7F\\u102B-\\u102C\\u1031\\u1038\\u103B-\\u103C\\u1056-\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083-\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7-\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930-\\u1931\\u1933-\\u1938\\u1A19-\\u1A1A\\u1A55\\u1A57\\u1A61\\u1A63-\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43-\\u1B44\\u1B82\\u1BA1\\u1BA6-\\u1BA7\\u1BAA\\u1BE7\\u1BEA-\\u1BEC\\u1BEE\\u1BF2-\\u1BF3\\u1C24-\\u1C2B\\u1C34-\\u1C35\\u1CE1\\u1CF2-\\u1CF3\\u302E-\\u302F\\uA823-\\uA824\\uA827\\uA880-\\uA881\\uA8B4-\\uA8C3\\uA952-\\uA953\\uA983\\uA9B4-\\uA9B5\\uA9BA-\\uA9BB\\uA9BD-\\uA9C0\\uAA2F-\\uAA30\\uAA33-\\uAA34\\uAA4D\\uAA7B\\uAA7D\\uAAEB\\uAAEE-\\uAAEF\\uAAF5\\uABE3-\\uABE4\\uABE6-\\uABE7\\uABE9-\\uABEA\\uABEC]",description:"[\\u0903\\u093B\\u093E-\\u0940\\u0949-\\u094C\\u094E-\\u094F\\u0982-\\u0983\\u09BE-\\u09C0\\u09C7-\\u09C8\\u09CB-\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB-\\u0ACC\\u0B02-\\u0B03\\u0B3E\\u0B40\\u0B47-\\u0B48\\u0B4B-\\u0B4C\\u0B57\\u0BBE-\\u0BBF\\u0BC1-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82-\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7-\\u0CC8\\u0CCA-\\u0CCB\\u0CD5-\\u0CD6\\u0D02-\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82-\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2-\\u0DF3\\u0F3E-\\u0F3F\\u0F7F\\u102B-\\u102C\\u1031\\u1038\\u103B-\\u103C\\u1056-\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083-\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7-\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930-\\u1931\\u1933-\\u1938\\u1A19-\\u1A1A\\u1A55\\u1A57\\u1A61\\u1A63-\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43-\\u1B44\\u1B82\\u1BA1\\u1BA6-\\u1BA7\\u1BAA\\u1BE7\\u1BEA-\\u1BEC\\u1BEE\\u1BF2-\\u1BF3\\u1C24-\\u1C2B\\u1C34-\\u1C35\\u1CE1\\u1CF2-\\u1CF3\\u302E-\\u302F\\uA823-\\uA824\\uA827\\uA880-\\uA881\\uA8B4-\\uA8C3\\uA952-\\uA953\\uA983\\uA9B4-\\uA9B5\\uA9BA-\\uA9BB\\uA9BD-\\uA9C0\\uAA2F-\\uAA30\\uAA33-\\uAA34\\uAA4D\\uAA7B\\uAA7D\\uAAEB\\uAAEE-\\uAAEF\\uAAF5\\uABE3-\\uABE4\\uABE6-\\uABE7\\uABE9-\\uABEA\\uABEC]"},cn=/^[\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962-\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2-\u09E3\u0A01-\u0A02\u0A3C\u0A41-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A51\u0A70-\u0A71\u0A75\u0A81-\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7-\u0AC8\u0ACD\u0AE2-\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62-\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56\u0C62-\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC-\u0CCD\u0CE2-\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62-\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB-\u0EBC\u0EC8-\u0ECD\u0F18-\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039-\u103A\u103D-\u103E\u1058-\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17B4-\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193B\u1A17-\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80-\u1B81\u1BA2-\u1BA5\u1BA8-\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8-\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8-\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099-\u309A\uA66F\uA674-\uA67D\uA69E-\uA69F\uA6F0-\uA6F1\uA802\uA806\uA80B\uA825-\uA826\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31-\uAA32\uAA35-\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7-\uAAB8\uAABE-\uAABF\uAAC1\uAAEC-\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/,ln={type:"class",value:"[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1-\\u05C2\\u05C4-\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7-\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u08E3-\\u0902\\u093A\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0957\\u0962-\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2-\\u09E3\\u0A01-\\u0A02\\u0A3C\\u0A41-\\u0A42\\u0A47-\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70-\\u0A71\\u0A75\\u0A81-\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7-\\u0AC8\\u0ACD\\u0AE2-\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62-\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C00\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55-\\u0C56\\u0C62-\\u0C63\\u0C81\\u0CBC\\u0CBF\\u0CC6\\u0CCC-\\u0CCD\\u0CE2-\\u0CE3\\u0D01\\u0D41-\\u0D44\\u0D4D\\u0D62-\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB-\\u0EBC\\u0EC8-\\u0ECD\\u0F18-\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86-\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039-\\u103A\\u103D-\\u103E\\u1058-\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085-\\u1086\\u108D\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752-\\u1753\\u1772-\\u1773\\u17B4-\\u17B5\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927-\\u1928\\u1932\\u1939-\\u193B\\u1A17-\\u1A18\\u1A1B\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1AB0-\\u1ABD\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80-\\u1B81\\u1BA2-\\u1BA5\\u1BA8-\\u1BA9\\u1BAB-\\u1BAD\\u1BE6\\u1BE8-\\u1BE9\\u1BED\\u1BEF-\\u1BF1\\u1C2C-\\u1C33\\u1C36-\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1CF4\\u1CF8-\\u1CF9\\u1DC0-\\u1DF5\\u1DFC-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302D\\u3099-\\u309A\\uA66F\\uA674-\\uA67D\\uA69E-\\uA69F\\uA6F0-\\uA6F1\\uA802\\uA806\\uA80B\\uA825-\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uA9E5\\uAA29-\\uAA2E\\uAA31-\\uAA32\\uAA35-\\uAA36\\uAA43\\uAA4C\\uAA7C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7-\\uAAB8\\uAABE-\\uAABF\\uAAC1\\uAAEC-\\uAAED\\uAAF6\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE2F]",description:"[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1-\\u05C2\\u05C4-\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7-\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u08E3-\\u0902\\u093A\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0957\\u0962-\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2-\\u09E3\\u0A01-\\u0A02\\u0A3C\\u0A41-\\u0A42\\u0A47-\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70-\\u0A71\\u0A75\\u0A81-\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7-\\u0AC8\\u0ACD\\u0AE2-\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62-\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C00\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55-\\u0C56\\u0C62-\\u0C63\\u0C81\\u0CBC\\u0CBF\\u0CC6\\u0CCC-\\u0CCD\\u0CE2-\\u0CE3\\u0D01\\u0D41-\\u0D44\\u0D4D\\u0D62-\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB-\\u0EBC\\u0EC8-\\u0ECD\\u0F18-\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86-\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039-\\u103A\\u103D-\\u103E\\u1058-\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085-\\u1086\\u108D\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752-\\u1753\\u1772-\\u1773\\u17B4-\\u17B5\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927-\\u1928\\u1932\\u1939-\\u193B\\u1A17-\\u1A18\\u1A1B\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1AB0-\\u1ABD\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80-\\u1B81\\u1BA2-\\u1BA5\\u1BA8-\\u1BA9\\u1BAB-\\u1BAD\\u1BE6\\u1BE8-\\u1BE9\\u1BED\\u1BEF-\\u1BF1\\u1C2C-\\u1C33\\u1C36-\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1CF4\\u1CF8-\\u1CF9\\u1DC0-\\u1DF5\\u1DFC-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302D\\u3099-\\u309A\\uA66F\\uA674-\\uA67D\\uA69E-\\uA69F\\uA6F0-\\uA6F1\\uA802\\uA806\\uA80B\\uA825-\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uA9E5\\uAA29-\\uAA2E\\uAA31-\\uAA32\\uAA35-\\uAA36\\uAA43\\uAA4C\\uAA7C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7-\\uAAB8\\uAABE-\\uAABF\\uAAC1\\uAAEC-\\uAAED\\uAAF6\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE2F]"},pn=/^[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]/,An={type:"class",value:"[\\u0030-\\u0039\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0DE6-\\u0DEF\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uA9F0-\\uA9F9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19]",description:"[\\u0030-\\u0039\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0DE6-\\u0DEF\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uA9F0-\\uA9F9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19]"},fn=/^[\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF]/,hn={type:"class",value:"[\\u16EE-\\u16F0\\u2160-\\u2182\\u2185-\\u2188\\u3007\\u3021-\\u3029\\u3038-\\u303A\\uA6E6-\\uA6EF]",description:"[\\u16EE-\\u16F0\\u2160-\\u2182\\u2185-\\u2188\\u3007\\u3021-\\u3029\\u3038-\\u303A\\uA6E6-\\uA6EF]"},En=/^[_\u203F-\u2040\u2054\uFE33-\uFE34\uFE4D-\uFE4F\uFF3F]/,Fn={type:"class",value:"[\\u005F\\u203F-\\u2040\\u2054\\uFE33-\\uFE34\\uFE4D-\\uFE4F\\uFF3F]",description:"[\\u005F\\u203F-\\u2040\\u2054\\uFE33-\\uFE34\\uFE4D-\\uFE4F\\uFF3F]"},Cn=/^[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,dn={type:"class",value:"[\\u0020\\u00A0\\u1680\\u2000-\\u200A\\u202F\\u205F\\u3000]",description:"[\\u0020\\u00A0\\u1680\\u2000-\\u200A\\u202F\\u205F\\u3000]"},Dn="break",vn={type:"literal",value:"break",description:'"break"'},Bn="case",mn={type:"literal",value:"case",description:'"case"'},gn="catch",yn={type:"literal",value:"catch",description:'"catch"'},bn="class",_n={type:"literal",value:"class",description:'"class"'},Nn="const",wn={type:"literal",value:"const",description:'"const"'},xn="continue",Sn={type:"literal",value:"continue",description:'"continue"'},Tn="debugger",Rn={type:"literal",value:"debugger",description:'"debugger"'},kn="default",Pn={type:"literal",value:"default",description:'"default"'},On="delete",In={type:"literal",value:"delete",description:'"delete"'},Ln="do",Un={type:"literal",value:"do",description:'"do"'},jn="else",$n={type:"literal",value:"else",description:'"else"'},Mn="enum",Vn={type:"literal",value:"enum",description:'"enum"'},qn="export",Hn={type:"literal",value:"export",description:'"export"'},zn="extends",Wn={type:"literal",value:"extends",description:'"extends"'},Gn="false",Yn={type:"literal",value:"false",description:'"false"'},Jn="finally",Xn={type:"literal",value:"finally",description:'"finally"'},Qn="for",Kn={type:"literal",value:"for",description:'"for"'},Zn="function",ui={type:"literal",value:"function",description:'"function"'},ti="if",ei={type:"literal",value:"if",description:'"if"'},ri="import",ni={type:"literal",value:"import",description:'"import"'},ii="instanceof",oi={type:"literal",value:"instanceof",description:'"instanceof"'},ai="in",si={type:"literal",value:"in",description:'"in"'},ci="new",li={type:"literal",value:"new",description:'"new"'},pi="null",Ai={type:"literal",value:"null",description:'"null"'},fi="return",hi={type:"literal",value:"return",description:'"return"'},Ei="super",Fi={type:"literal",value:"super",description:'"super"'},Ci="switch",di={type:"literal",value:"switch",description:'"switch"'},Di="this",vi={type:"literal",value:"this",description:'"this"'},Bi="throw",mi={type:"literal",value:"throw",description:'"throw"'},gi="true",yi={type:"literal",value:"true",description:'"true"'},bi="try",_i={type:"literal",value:"try",description:'"try"'},Ni="typeof",wi={type:"literal",value:"typeof",description:'"typeof"'},xi="var",Si={type:"literal",value:"var",description:'"var"'},Ti="void",Ri={type:"literal",value:"void",description:'"void"'},ki="while",Pi={type:"literal",value:"while",description:'"while"'},Oi="with",Ii={type:"literal",value:"with",description:'"with"'},Li=";",Ui={type:"literal",value:";",description:'";"'},ji=0,$i=0,Mi=[{line:1,column:1,seenCR:!1}],Vi=0,qi=[],Hi=0
if("startRule"in lt){if(!(lt.startRule in At))throw new Error("Can't start parsing from rule \""+lt.startRule+'".')
ft=At[lt.startRule]}var zi={$:"text","&":"simple_and","!":"simple_not"},Wi={"?":"optional","*":"zero_or_more","+":"one_or_more"},Gi={"&":"semantic_and","!":"semantic_not"}
if(ct=ft(),ct!==pt&&ji===u.length)return ct
throw ct!==pt&&ji<u.length&&a({type:"end",description:"end of input"}),s(null,qi,Vi<u.length?u.charAt(Vi):null,Vi<u.length?o(Vi,Vi+1):o(Vi,Vi))}return u(t,Error),{SyntaxError:t,parse:e}}()},{}],30:[function(u,t,e){"use strict"
var r=u("./utils/arrays"),n=u("./utils/objects"),i={VERSION:"0.9.0",GrammarError:u("./grammar-error"),parser:u("./parser"),compiler:u("./compiler"),buildParser:function(u){function t(u){var t,e={}
for(t in u)u.hasOwnProperty(t)&&(e[t]=n.values(u[t]))
return e}var e=arguments.length>1?n.clone(arguments[1]):{},i="plugins"in e?e.plugins:[],o={parser:this.parser,passes:t(this.compiler.passes)}
return r.each(i,function(u){u.use(o,e)}),this.compiler.compile(o.parser.parse(u),o.passes,e)}}
t.exports=i},{"./compiler":17,"./grammar-error":28,"./parser":29,"./utils/arrays":31,"./utils/objects":33}],31:[function(u,t,e){"use strict"
var r={range:function(u,t){var e,r,n=t-u,i=new Array(n)
for(e=0,r=u;e<n;e++,r++)i[e]=r
return i},find:function(u,t){var e,r=u.length
if("function"==typeof t){for(e=0;e<r;e++)if(t(u[e]))return u[e]}else for(e=0;e<r;e++)if(u[e]===t)return u[e]},indexOf:function(u,t){var e,r=u.length
if("function"==typeof t){for(e=0;e<r;e++)if(t(u[e]))return e}else for(e=0;e<r;e++)if(u[e]===t)return e
return-1},contains:function(u,t){return r.indexOf(u,t)!==-1},each:function(u,t){var e,r=u.length
for(e=0;e<r;e++)t(u[e],e)},map:function(u,t){var e,r=u.length,n=new Array(r)
for(e=0;e<r;e++)n[e]=t(u[e],e)
return n},pluck:function(u,t){return r.map(u,function(u){return u[t]})},every:function(u,t){var e,r=u.length
for(e=0;e<r;e++)if(!t(u[e]))return!1
return!0},some:function(u,t){var e,r=u.length
for(e=0;e<r;e++)if(t(u[e]))return!0
return!1}}
t.exports=r},{}],32:[function(u,t,e){"use strict"
var r={subclass:function(u,t){function e(){this.constructor=u}e.prototype=t.prototype,u.prototype=new e}}
t.exports=r},{}],33:[function(u,t,e){"use strict"
var r={keys:function(u){var t,e=[]
for(t in u)u.hasOwnProperty(t)&&e.push(t)
return e},values:function(u){var t,e=[]
for(t in u)u.hasOwnProperty(t)&&e.push(u[t])
return e},clone:function(u){var t,e={}
for(t in u)u.hasOwnProperty(t)&&(e[t]=u[t])
return e},defaults:function(u,t){var e
for(e in t)t.hasOwnProperty(e)&&(e in u||(u[e]=t[e]))}}
t.exports=r},{}],34:[function(u,t,e){(function(e){function r(u){if(u&&!Array.isArray(u)||arguments.length>1)throw new Error("Optional argument to Seq() is exactly one Array")
var t=o(function(t){n.call(this,t,u||[])})
return e.nextTick(function(){t.catch(function(u){console.error(u.stack?u.stack:u)})}),t}function n(u,t){function n(t,e,r,n){var a=function(t){var r=[].slice.call(arguments,1)
t?(o.error={message:t,key:e},u.jump(c),u.down("catch"),n()):("number"==typeof e?(o.stack_[e]=r[0],o.args[e]=r):(o.stack_.push.apply(o.stack_,r),void 0!==e&&(o.vars[e]=r[0],o.args[e]=r)),n&&n(r,e))}
i(o).forEach(function(u,t){a[t]=u}),a.into=function(u){return e=u,a},a.next=function(u,t){o.stack_.push.apply(o.stack_,t),a.apply(a,[u].concat(o.stack))},a.pass=function(u){a.apply(a,[u].concat(o.stack))},a.ok=a.bind(a,null),r.apply(a,o.stack)}var o={vars:{},args:{},stack:t,error:null}
o.stack_=o.stack
var a=0,s=0
this.seq=function(t,e){var i=[].slice.call(arguments,2)
"function"==typeof t&&(arguments.length>1&&i.unshift(e),e=t,t=void 0),o.error?u.next():0===a&&n(u.step,t,function(){o.stack_=[]
var u=[].slice.call(arguments)
u.unshift.apply(u,i.map(function(u){return u===r?this:u},this)),e.apply(this,u)},function(){o.stack=o.stack_,u.next()})}
var c=null
this.par=function(t,i){c=u.step,0==a&&(o.stack_=[])
var l=[].slice.call(arguments,2)
"function"==typeof t&&(arguments.length>1&&l.unshift(i),i=t,t=o.stack_.length,o.stack_.push(null))
var p=function(){var u=[].slice.call(arguments)
u.unshift.apply(u,l.map(function(u){return u===r?this:u},this)),i.apply(this,u)}
a++
var A=u.step
e.nextTick(function(){n(A,t,p,function(t){t||s++,a--,0==a&&(o.stack=o.stack_.slice(),u.step=c,s>0&&u.down("catch"),s=0,u.next())})}),u.next()},["seq","par"].forEach(function(u){this[u+"_"]=function(t){var e=[].slice.call(arguments),r="function"==typeof t?e[0]:e[1],n=function(){var u=[].slice.call(arguments)
u.unshift(this),r.apply(this,u)}
"function"==typeof t?e[0]=n:e[1]=n,this[u].apply(this,e)}},this),this.catch=function(t){o.error&&(t.call(o,o.error.message,o.error.key),o.error=null),u.next()},this.forEach=function(t){this.seq(function(){o.stack_=o.stack.slice()
var e=o.stack.length
0===e?this(null):o.stack.forEach(function(r,i){n(u.step,i,function(){t.call(this,r,i),i==e-1&&u.next()})})})},this.seqEach=function(t){this.seq(function(){o.stack_=o.stack.slice()
var e=o.stack.slice()
0===e.length?this(null):function r(i){n(u.step,i,function(){t.call(this,e[i],i)},function(t){t&&i!==e.length-1?r(i+1):u.next()})}.bind(this)(0)})},this.parEach=function(t,e){var r=o.stack.slice()
void 0===e&&(e=t,t=r.length),o.stack_=[]
var i=0,a=0,s=[]
0===r.length?u.next():r.forEach(function o(c,l){i>=t?s.push(o.bind(this,c,l)):(i++,n(u.step,l,function(){e.call(this,c,l)},function(){i--,a++,s.length>0?s.shift()():a===r.length&&u.next()}))})},this.parMap=function(t,e){var n=[],i=o.stack.length
void 0===e&&(e=t,t=i)
var n=[]
r().extend(o.stack).parEach(t,function(u,t){var r=this,i=function(){n[t]=arguments[1],r.apply(r,arguments)}
i.stack=r.stack,i.stack_=r.stack_,i.vars=r.vars,i.args=r.args,i.error=r.error,i.into=function(u){return function(){n[u]=arguments[1],r.apply(r,arguments)}},i.ok=function(){var u=[].slice.call(arguments)
return u.unshift(null),i.apply(i,u)},e.apply(i,arguments)}).seq(function(){o.stack=n,u.next()})},this.seqMap=function(u){var t=[],e=o.stack.length-1
this.seqEach(function(r,n){var i=this,a=function(){t[n]=arguments[1],n===e&&(o.stack=t),i.apply(i,arguments)}
a.stack=i.stack,a.stack_=i.stack_,a.vars=i.vars,a.args=i.args,a.error=i.error,a.into=function(u){return function(){t[u]=arguments[1],n===e&&(o.stack=t),i.apply(i,arguments)}},a.ok=function(){var u=[].slice.call(arguments)
return u.unshift(null),a.apply(a,u)},u.apply(a,arguments)})},this.parFilter=function(t,e){var n=[],i=o.stack.length
void 0===e&&(e=t,t=i)
var n=[]
r().extend(o.stack).parEach(t,function(u,t){var r=this,i=function(e,i){!e&&i&&n.push([t,u]),arguments[0]=null,r.apply(r,arguments)}
i.stack=r.stack,i.stack_=r.stack_,i.vars=r.vars,i.args=r.args,i.error=r.error,i.into=function(t){return function(e,i){!e&&i&&n.push([t,u]),arguments[0]=null,r.apply(r,arguments)}},i.ok=function(){var u=[].slice.call(arguments)
return u.unshift(null),i.apply(i,u)},e.apply(i,arguments)}).seq(function(){o.stack=n.sort().map(function(u){return u[1]}),u.next()})},this.seqFilter=function(u){var t=[],e=o.stack.length-1
this.seqEach(function(r,n){var i=this,a=function(u,a){!u&&a&&t.push([n,r]),n===e&&(o.stack=t.sort().map(function(u){return u[1]})),arguments[0]=null,i.apply(i,arguments)}
a.stack=i.stack,a.stack_=i.stack_,a.vars=i.vars,a.args=i.args,a.error=i.error,a.into=function(u){return function(a,s){!a&&s&&t.push([u,r]),n===e&&(o.stack=t.sort().map(function(u){return u[1]})),arguments[0]=null,i.apply(i,arguments)}},a.ok=function(){var u=[].slice.call(arguments)
return u.unshift(null),a.apply(a,u)},u.apply(a,arguments)})},["forEach","seqEach","parEach","seqMap","parMap","seqFilter","parFilter"].forEach(function(u){this[u+"_"]=function(t){this[u].call(this,function(){var u=[].slice.call(arguments)
u.unshift(this),t.apply(this,u)})}},this),["push","pop","shift","unshift","splice","reverse"].forEach(function(t){this[t]=function(){return o.stack[t].apply(o.stack,[].slice.call(arguments)),u.next(),this}},this),["map","filter","reduce"].forEach(function(t){this[t]=function(){var e=o.stack[t].apply(o.stack,[].slice.call(arguments))
return o.stack=Array.isArray(e)?e:[e],u.next(),this}},this),this.extend=function(t){if(!Array.isArray(t))throw new Error("argument to .extend() is not an Array")
o.stack.push.apply(o.stack,t),u.next()},this.flatten=function(t){var e=[]
void 0===t&&(t=!0),o.stack.forEach(function u(r){Array.isArray(r)&&t?r.forEach(u):Array.isArray(r)?e=e.concat(r):e.push(r)}),o.stack=e,u.next()},this.unflatten=function(){o.stack=[o.stack],u.next()},this.empty=function(){o.stack=[],u.next()},this.set=function(t){o.stack=t,u.next()},this.do=function(t){u.nest(t,o)}}var i=(u("events").EventEmitter,u("hashish")),o=u("chainsaw")
t.exports=r,r.ap=r}).call(this,u("_process"))},{_process:4,chainsaw:35,events:2,hashish:37}],35:[function(u,t,e){(function(e){function r(u){var t=r.saw(u,{}),e=u.call(t.handlers,t)
return void 0!==e&&(t.handlers=e),t.chain()}var n=u("traverse"),i=u("events").EventEmitter
t.exports=r,r.saw=function(u,t){var o=new i
return o.handlers=t,o.actions=[],o.step=0,o.chain=function(){var u=n(o.handlers).map(function(t){if(this.isRoot)return t
var e=this.path
"function"==typeof t&&this.update(function(){return o.actions.push({path:e,args:[].slice.call(arguments)}),u})})
return e.nextTick(function(){o.emit("begin"),o.next()}),u},o.next=function(){var u=o.actions[o.step]
if(o.step++,u){if(!u.trap){var t=o.handlers
u.path.forEach(function(u){t=t[u]}),t.apply(o.handlers,u.args)}}else o.emit("end")},o.nest=function(t){var e=[].slice.call(arguments,1),n=!0
if("boolean"==typeof t){var n=t
t=e.shift()}var i=r.saw(u,{}),a=u.call(i.handlers,i)
void 0!==a&&(i.handlers=a),t.apply(i.chain(),e),n!==!1&&i.on("end",o.next)},o.trap=function(u,t){var e=Array.isArray(u)?u:[u]
o.actions.push({path:e,step:o.step,cb:t,trap:!0})},o.down=function(u){var t=(Array.isArray(u)?u:[u]).join("/"),e=o.actions.slice(o.step).map(function(u){return!(u.trap&&u.step<=o.step)&&u.path.join("/")==t}).indexOf(!0)
e>=0?o.step+=e:o.step=o.actions.length
var r=o.actions[o.step-1]
r&&r.trap?(o.step=r.step,r.cb()):o.next()},o.jump=function(u){o.step=u,o.next()},o}}).call(this,u("_process"))},{_process:4,events:2,traverse:36}],36:[function(u,t,e){function r(u){return this instanceof r?void(this.value=u):new r(u)}function n(u,t,e){var r=[],n=[],o=!0
return function u(a){var s=e?i(a):a,c={},l={node:s,node_:a,path:[].concat(r),parent:n.slice(-1)[0],key:r.slice(-1)[0],isRoot:0===r.length,level:r.length,circular:null,update:function(u){l.isRoot||(l.parent.node[l.key]=u),l.node=u},delete:function(){delete l.parent.node[l.key]},remove:function(){Array.isArray(l.parent.node)?l.parent.node.splice(l.key,1):delete l.parent.node[l.key]},before:function(u){c.before=u},after:function(u){c.after=u},pre:function(u){c.pre=u},post:function(u){c.post=u},stop:function(){o=!1}}
if(!o)return l
if("object"==typeof s&&null!==s){l.isLeaf=0==Object.keys(s).length
for(var p=0;p<n.length;p++)if(n[p].node_===a){l.circular=n[p]
break}}else l.isLeaf=!0
l.notLeaf=!l.isLeaf,l.notRoot=!l.isRoot
var A=t.call(l,l.node)
if(void 0!==A&&l.update&&l.update(A),c.before&&c.before.call(l,l.node),"object"==typeof l.node&&null!==l.node&&!l.circular){n.push(l)
var f=Object.keys(l.node)
f.forEach(function(t,n){r.push(t),c.pre&&c.pre.call(l,l.node[t],t)
var i=u(l.node[t])
e&&Object.hasOwnProperty.call(l.node,t)&&(l.node[t]=i.node),i.isLast=n==f.length-1,i.isFirst=0==n,c.post&&c.post.call(l,i),r.pop()}),n.pop()}return c.after&&c.after.call(l,l.node),l}(u).node}function i(u){if("object"==typeof u&&null!==u){var t
return t=Array.isArray(u)?[]:u instanceof Date?new Date(u):u instanceof Boolean?new Boolean(u):u instanceof Number?new Number(u):u instanceof String?new String(u):Object.create(Object.getPrototypeOf(u)),Object.keys(u).forEach(function(e){t[e]=u[e]}),t}return u}t.exports=r,r.prototype.get=function(u){for(var t=this.value,e=0;e<u.length;e++){var r=u[e]
if(!Object.hasOwnProperty.call(t,r)){t=void 0
break}t=t[r]}return t},r.prototype.set=function(u,t){for(var e=this.value,r=0;r<u.length-1;r++){var n=u[r]
Object.hasOwnProperty.call(e,n)||(e[n]={}),e=e[n]}return e[u[r]]=t,t},r.prototype.map=function(u){return n(this.value,u,!0)},r.prototype.forEach=function(u){return this.value=n(this.value,u,!1),this.value},r.prototype.reduce=function(u,t){var e=1===arguments.length,r=e?this.value:t
return this.forEach(function(t){this.isRoot&&e||(r=u.call(this,r,t))}),r},r.prototype.deepEqual=function(u){if(1!==arguments.length)throw new Error("deepEqual requires exactly one object to compare against")
var t=!0,e=u
return this.forEach(function(n){var i=function(){t=!1}.bind(this)
if(!this.isRoot){if("object"!=typeof e)return i()
e=e[this.key]}var o=e
this.post(function(){e=o})
var a=function(u){return Object.prototype.toString.call(u)}
if(this.circular)r(u).get(this.circular.path)!==o&&i()
else if(typeof o!=typeof n)i()
else if(null===o||null===n||void 0===o||void 0===n)o!==n&&i()
else if(o.__proto__!==n.__proto__)i()
else if(o===n);else if("function"==typeof o)o instanceof RegExp?o.toString()!=n.toString()&&i():o!==n&&i()
else if("object"==typeof o)if("[object Arguments]"===a(n)||"[object Arguments]"===a(o))a(o)!==a(n)&&i()
else if(o instanceof Date||n instanceof Date)o instanceof Date&&n instanceof Date&&o.getTime()===n.getTime()||i()
else{var s=Object.keys(o),c=Object.keys(n)
if(s.length!==c.length)return i()
for(var l=0;l<s.length;l++){var p=s[l]
Object.hasOwnProperty.call(n,p)||i()}}}),t},r.prototype.paths=function(){var u=[]
return this.forEach(function(t){u.push(this.path)}),u},r.prototype.nodes=function(){var u=[]
return this.forEach(function(t){u.push(this.node)}),u},r.prototype.clone=function(){var u=[],t=[]
return function e(r){for(var n=0;n<u.length;n++)if(u[n]===r)return t[n]
if("object"==typeof r&&null!==r){var o=i(r)
return u.push(r),t.push(o),Object.keys(r).forEach(function(u){o[u]=e(r[u])}),u.pop(),t.pop(),o}return r}(this.value)},Object.keys(r.prototype).forEach(function(u){r[u]=function(t){var e=[].slice.call(arguments,1),n=r(t)
return n[u].apply(n,e)}})},{}],37:[function(u,t,e){function r(u,t){if(Array.isArray(u)&&Array.isArray(t)){for(var e=Math.min(u.length,t.length),n={},i=0;i<e;i++)n[u[i]]=t[i]
return r(n)}if(void 0===u)return r({})
var o={map:function(t){var e={__proto__:u.__proto__}
return Object.keys(u).forEach(function(r){e[r]=t.call(o,u[r],r)}),r(e)},forEach:function(t){return Object.keys(u).forEach(function(e){t.call(o,u[e],e)}),o},filter:function(t){var e={__proto__:u.__proto__}
return Object.keys(u).forEach(function(r){t.call(o,u[r],r)&&(e[r]=u[r])}),r(e)},detect:function(t){for(var e in u)if(t.call(o,u[e],e))return u[e]},reduce:function(t,e){var r=Object.keys(u)
return void 0===e&&(e=r.shift()),r.forEach(function(r){e=t.call(o,e,u[r],r)}),e},some:function(t){for(var e in u)if(t.call(o,u[e],e))return!0
return!1},update:function(t){return arguments.length>1?o.updateAll([].slice.call(arguments)):Object.keys(t).forEach(function(e){u[e]=t[e]}),o},updateAll:function(u){return u.filter(Boolean).forEach(function(u){o.update(u)}),o},merge:function(u){return arguments.length>1?o.copy.updateAll([].slice.call(arguments)):o.copy.update(u)},mergeAll:function(u){return o.copy.updateAll(u)},has:function(u){return Array.isArray(u)?u.every(function(u){return o.has(u)}):o.keys.indexOf(u.toString())>=0},valuesAt:function(t){return Array.isArray(t)?t.map(function(t){return u[t]}):u[t]},tap:function(t){return t.call(o,u),o},extract:function(t){var e={}
return t.forEach(function(t){e[t]=u[t]}),r(e)},exclude:function(u){return o.filter(function(t,e){return u.indexOf(e)<0})},end:u,items:u},a={keys:function(){return Object.keys(u)},values:function(){return Object.keys(u).map(function(t){return u[t]})},compact:function(){return o.filter(function(u){return void 0!==u})},clone:function(){return r(r.clone(u))},copy:function(){return r(r.copy(u))},length:function(){return Object.keys(u).length},size:function(){return o.length}}
if(Object.defineProperty)try{for(var s in a)Object.defineProperty(o,s,{get:a[s]})}catch(u){for(var s in a)"clone"!==s&&"copy"!==s&&"compact"!==s&&(o[s]=a[s]())}else if(o.__defineGetter__)for(var s in a)o.__defineGetter__(s,a[s])
else for(var s in a)o[s]=a[s]()
return o}t.exports=r
var n=u("traverse")
r.clone=function(u){return n.clone(u)},r.copy=function(u){var t={__proto__:u.__proto__}
return Object.keys(u).forEach(function(e){t[e]=u[e]}),t},r.map=function(u,t){return r(u).map(t).items},r.forEach=function(u,t){r(u).forEach(t)},r.filter=function(u,t){return r(u).filter(t).items},r.detect=function(u,t){return r(u).detect(t)},r.reduce=function(u,t,e){return r(u).reduce(t,e)},r.some=function(u,t){return r(u).some(t)},r.update=function(u){var t=Array.prototype.slice.call(arguments,1),e=r(u)
return e.update.apply(e,t).items},r.merge=function(u){var t=Array.prototype.slice.call(arguments,1),e=r(u)
return e.merge.apply(e,t).items},r.has=function(u,t){return r(u).has(t)},r.valuesAt=function(u,t){return r(u).valuesAt(t)},r.tap=function(u,t){return r(u).tap(t).items},r.extract=function(u,t){return r(u).extract(t).items},r.exclude=function(u,t){return r(u).exclude(t).items},r.concat=function(u){var t=r({})
return u.forEach(function(u){t.update(u)}),t.items},r.zip=function(u,t){return r(u,t).items},r.size=function(u){return r(u).size},r.compact=function(u){return r(u).compact.items}},{traverse:38}],38:[function(u,t,e){function r(u){this.value=u}function n(u,t,e){var r=[],n=[],o=!0
return function u(a){function s(){if("object"==typeof A.node&&null!==A.node){A.keys&&A.node_===A.node||(A.keys=h(A.node)),A.isLeaf=0==A.keys.length
for(var u=0;u<n.length;u++)if(n[u].node_===a){A.circular=n[u]
break}}else A.isLeaf=!0,A.keys=null
A.notLeaf=!A.isLeaf,A.notRoot=!A.isRoot}var c=e?i(a):a,l={},p=!0,A={node:c,node_:a,path:[].concat(r),parent:n[n.length-1],parents:n,key:r.slice(-1)[0],isRoot:0===r.length,level:r.length,circular:null,update:function(u,t){A.isRoot||(A.parent.node[A.key]=u),A.node=u,t&&(p=!1)},delete:function(u){delete A.parent.node[A.key],u&&(p=!1)},remove:function(u){E(A.parent.node)?A.parent.node.splice(A.key,1):delete A.parent.node[A.key],u&&(p=!1)},keys:null,before:function(u){l.before=u},after:function(u){l.after=u},pre:function(u){l.pre=u},post:function(u){l.post=u},stop:function(){o=!1},block:function(){p=!1}}
if(!o)return A
s()
var f=t.call(A,A.node)
return void 0!==f&&A.update&&A.update(f),l.before&&l.before.call(A,A.node),p?("object"!=typeof A.node||null===A.node||A.circular||(n.push(A),s(),F(A.keys,function(t,n){r.push(t),l.pre&&l.pre.call(A,A.node[t],t)
var i=u(A.node[t])
e&&C.call(A.node,t)&&(A.node[t]=i.node),i.isLast=n==A.keys.length-1,i.isFirst=0==n,l.post&&l.post.call(A,i),r.pop()}),n.pop()),l.after&&l.after.call(A,A.node),A):A}(u).node}function i(u){if("object"==typeof u&&null!==u){var t
if(E(u))t=[]
else if(a(u))t=new Date(u.getTime?u.getTime():u)
else if(s(u))t=new RegExp(u)
else if(c(u))t={message:u.message}
else if(l(u))t=new Boolean(u)
else if(p(u))t=new Number(u)
else if(A(u))t=new String(u)
else if(Object.create&&Object.getPrototypeOf)t=Object.create(Object.getPrototypeOf(u))
else if(u.constructor===Object)t={}
else{var e=u.constructor&&u.constructor.prototype||u.__proto__||{},r=function(){}
r.prototype=e,t=new r}return F(h(u),function(e){t[e]=u[e]}),t}return u}function o(u){return Object.prototype.toString.call(u)}function a(u){return"[object Date]"===o(u)}function s(u){return"[object RegExp]"===o(u)}function c(u){return"[object Error]"===o(u)}function l(u){return"[object Boolean]"===o(u)}function p(u){return"[object Number]"===o(u)}function A(u){return"[object String]"===o(u)}var f=t.exports=function(u){return new r(u)}
r.prototype.get=function(u){for(var t=this.value,e=0;e<u.length;e++){var r=u[e]
if(!t||!C.call(t,r)){t=void 0
break}t=t[r]}return t},r.prototype.has=function(u){for(var t=this.value,e=0;e<u.length;e++){var r=u[e]
if(!t||!C.call(t,r))return!1
t=t[r]}return!0},r.prototype.set=function(u,t){for(var e=this.value,r=0;r<u.length-1;r++){var n=u[r]
C.call(e,n)||(e[n]={}),e=e[n]}return e[u[r]]=t,t},r.prototype.map=function(u){return n(this.value,u,!0)},r.prototype.forEach=function(u){return this.value=n(this.value,u,!1),this.value},r.prototype.reduce=function(u,t){var e=1===arguments.length,r=e?this.value:t
return this.forEach(function(t){this.isRoot&&e||(r=u.call(this,r,t))}),r},r.prototype.paths=function(){var u=[]
return this.forEach(function(t){u.push(this.path)}),u},r.prototype.nodes=function(){var u=[]
return this.forEach(function(t){u.push(this.node)}),u},r.prototype.clone=function(){var u=[],t=[]
return function e(r){for(var n=0;n<u.length;n++)if(u[n]===r)return t[n]
if("object"==typeof r&&null!==r){var o=i(r)
return u.push(r),t.push(o),F(h(r),function(u){o[u]=e(r[u])}),u.pop(),t.pop(),o}return r}(this.value)}
var h=Object.keys||function(u){var t=[]
for(var e in u)t.push(e)
return t},E=Array.isArray||function(u){return"[object Array]"===Object.prototype.toString.call(u)},F=function(u,t){if(u.forEach)return u.forEach(t)
for(var e=0;e<u.length;e++)t(u[e],e,u)}
F(h(r.prototype),function(u){f[u]=function(t){var e=[].slice.call(arguments,1),n=new r(t)
return n[u].apply(n,e)}})
var C=Object.hasOwnProperty||function(u,t){return t in u}},{}],39:[function(u,t,e){e.ast_consolidate=function(t){"use strict"
var e=function(){this.nCategory=c.N_OTHER,this.aCount=[],this.aCount[a.N_IDENTIFIER_NAMES]={},this.aCount[a.N_STRING_LITERALS]={},this.aCount[a.N_NULL_AND_BOOLEAN_LITERALS]={},this.aIdentifiers=[],this.aPrimitiveValues=[]},r=function(){this.nSaving=0,this.sName=""},n=function(){this.oPrimitiveValues={},this.nSavings=0},i=u("./process"),o={N_PROPERTY_ACCESSOR:1,N_VARIABLE_DECLARATION:2,N_VARIABLE_STATEMENT_AFFIXATION:4,N_CLOSURE:17},a={N_IDENTIFIER_NAMES:0,N_STRING_LITERALS:1,N_NULL_AND_BOOLEAN_LITERALS:2},s={S_STRING:"#S",S_SYMBOLIC:"#O"},c={N_WITH:0,N_EVAL:1,N_EXCLUDABLE:2,N_OTHER:3},l=["null","false","true"]
return function u(t){var p,A,f,h,E,F,C="toplevel"===t[0],d=!C,D={oSurveySourceElement:{defun:function(u,t,e){g(),y(u),t.forEach(y)},dot:function(u,t){return _(a.N_IDENTIFIER_NAMES,s.S_STRING+t),["dot",h.walk(u),t]},function:function(u,t,e){"string"==typeof u&&y(u),t.forEach(y)},name:function(u){-1!==l.indexOf(u)?_(a.N_NULL_AND_BOOLEAN_LITERALS,s.S_SYMBOLIC+u):("eval"===u&&(A.nCategory=c.N_EVAL),y(u))},return:function(u){g()},string:function(u){u.length>0&&_(a.N_STRING_LITERALS,s.S_STRING+u)},try:function(u,t,e){Array.isArray(t)&&y(t[0])},var:function(u){g(),u.forEach(b)},with:function(u,t){return A.nCategory=c.N_WITH,[]}},oExamineFunctions:{defun:function(){return u(this),[]},function:function(){return u(this),[]}}},v=[],B=0,m=function(u,t){var e=function(){return u.walk(t)}
return e},g=function(){A.nCategory===c.N_OTHER&&(A.nCategory=c.N_EXCLUDABLE)},y=function(u){-1===A.aIdentifiers.indexOf(u)&&A.aIdentifiers.push(u)},b=function(u){y(u[0])},_=function(u,t){A.aCount[u].hasOwnProperty(t)||(A.aCount[u][t]=0,-1===A.aPrimitiveValues.indexOf(t)&&A.aPrimitiveValues.push(t)),A.aCount[u][t]+=1},N=function(t,c,l){var A,E=f.cname,F={dot:function(u,t){var e=s.S_STRING+t
return C.oPrimitiveValues.hasOwnProperty(e)&&C.oPrimitiveValues[e].nSaving>0?["sub",h.walk(u),["name",C.oPrimitiveValues[e].sName]]:["dot",h.walk(u),t]},name:function(u){var t=s.S_SYMBOLIC+u
return["name",C.oPrimitiveValues.hasOwnProperty(t)&&C.oPrimitiveValues[t].nSaving>0?C.oPrimitiveValues[t].sName:u]},string:function(u){var t=s.S_STRING+u
return C.oPrimitiveValues.hasOwnProperty(t)&&C.oPrimitiveValues[t].nSaving>0?["name",C.oPrimitiveValues[t].sName]:["string",u]}},C=new n,d=new n,D=new e,B=[],g=function(u){var t=function(t){-1===u.indexOf(t)&&u.push(t)}
return t},y=function(u,t){var e=function(e){D.aCount[t].hasOwnProperty(e)||(D.aCount[t][e]=0),D.aCount[t][e]+=v[u].aCount[t][e]}
return e},b=function(u){var t=function(t){Object.keys(v[u].aCount[t]).forEach(y(u,t))}
return t},_=function(u){Object.keys(v[u].aCount).forEach(b(u))},N=function(u){C.oPrimitiveValues[u].nSaving>0&&B.push([C.oPrimitiveValues[u].sName,[0===u.indexOf(s.S_SYMBOLIC)?"name":"string",u.substring(s.S_SYMBOLIC.length)]])},w=function(u,t){var e=d.oPrimitiveValues[u].nSaving-d.oPrimitiveValues[t].nSaving
return e>0?-1:e<0?1:0},x=function(u){var t,e,n=u.substring(s.S_SYMBOLIC.length),c=n.length,l=i.make_string(n).length
d.oPrimitiveValues[u]=new r
do t=f.cname,d.oPrimitiveValues[u].sName=f.next_mangled()
while(-1!==D.aIdentifiers.indexOf(d.oPrimitiveValues[u].sName))
e=d.oPrimitiveValues[u].sName.length,0===u.indexOf(s.S_SYMBOLIC)?(d.oPrimitiveValues[u].nSaving-=e+c+o.N_VARIABLE_DECLARATION,d.oPrimitiveValues[u].nSaving+=D.aCount[a.N_NULL_AND_BOOLEAN_LITERALS][u]*(c-e)):(d.oPrimitiveValues[u].nSaving-=e+l+o.N_VARIABLE_DECLARATION,D.aCount[a.N_IDENTIFIER_NAMES].hasOwnProperty(u)&&(d.oPrimitiveValues[u].nSaving+=D.aCount[a.N_IDENTIFIER_NAMES][u]*(c-e-o.N_PROPERTY_ACCESSOR)),D.aCount[a.N_STRING_LITERALS].hasOwnProperty(u)&&(d.oPrimitiveValues[u].nSaving+=D.aCount[a.N_STRING_LITERALS][u]*(l-e))),d.oPrimitiveValues[u].nSaving>0?d.nSavings+=d.oPrimitiveValues[u].nSaving:f.cname=t},S=function(u){p[t][1].unshift(u)}
if(!(t>c)){if(t===c&&"stat"===p[t][0]&&"call"===p[t][1][0]&&"function"===p[t][1][1][0])return void u(p[t][1][1])
for(A=t;A<=c;A+=1)v[A].aPrimitiveValues.forEach(g(D.aPrimitiveValues))
if(0!==D.aPrimitiveValues.length){for(A=t;A<=c;A+=1)_(A),v[A].aIdentifiers.forEach(g(D.aIdentifiers))
do C=d,Object.keys(d.oPrimitiveValues).length>0&&D.aPrimitiveValues.sort(w),d=new n,D.aPrimitiveValues.forEach(x),f.cname=E
while(d.nSavings>C.nSavings)
if("var"!==p[t][0]&&(C.nSavings-=o.N_VARIABLE_STATEMENT_AFFIXATION),l&&(C.nSavings-=o.N_CLOSURE),C.nSavings>0){for(Object.keys(C.oPrimitiveValues).forEach(N),A=t;A<=c;A+=1)h=i.ast_walker(),p[A]=h.with_walkers(F,m(h,p[A]))
if("var"===p[t][0]?B.reverse().forEach(S):(Array.prototype.splice.call(p,t,0,["var",B]),c+=1),l){for(Array.prototype.splice.call(p,t,0,["stat",["call",["function",null,[],[]],[]]]),A=c+1;A>t;A-=1)Array.prototype.unshift.call(p[t][1][1][3],p[A])
Array.prototype.splice.call(p,t+1,c-t+1)}}l&&(f.cname=E)}}}
if(p=t[C?1:3],0!==p.length){for(f=C?t.scope:p.scope;B<p.length&&"directive"===p[B][0];)B+=1,v.push(null)
if(p.length!==B){for(E=B;E<p.length;E+=1)A=new e,h=i.ast_walker(),h.with_walkers(D.oSurveySourceElement,m(h,p[E])),d=d&&c.N_WITH!==A.nCategory&&c.N_EVAL!==A.nCategory,v.push(A)
if(d)N(B,p.length-1,!1)
else for(E=p.length-1;E>=B;E-=1)A=v[E],c.N_OTHER===A.nCategory?("undefined"==typeof F&&(F=E),E===B&&N(E,F,!0)):("undefined"!=typeof F&&(N(E+1,F,!0),F=void 0),h=i.ast_walker(),h.with_walkers(D.oExamineFunctions,m(h,p[E])))}}}(t=i.ast_add_scope(t)),t}},{"./process":41}],40:[function(u,t,e){function r(u){return L.letter.test(u)}function n(u){return u=u.charCodeAt(0),u>=48&&u<=57}function i(u){return L.digit.test(u)}function o(u){return n(u)||r(u)}function a(u){return L.combining_mark.test(u)}function s(u){return L.connector_punctuation.test(u)}function c(u){return"$"==u||"_"==u||r(u)}function l(u){return c(u)||a(u)||i(u)||s(u)||"‌"==u||"‍"==u}function p(u){return S.test(u)?parseInt(u.substr(2),16):T.test(u)?parseInt(u.substr(1),8):R.test(u)?parseFloat(u):void 0}function A(u,t,e,r){this.message=u,this.line=t+1,this.col=e+1,this.pos=r+1,this.stack=(new Error).stack}function f(u,t,e,r){throw new A(u,t,e,r)}function h(u,t,e){return u.type==t&&(null==e||u.value==e)}function E(u){function t(){return j.text.charAt(j.pos)}function e(u,t){var e=j.text.charAt(j.pos++)
if(u&&!e)throw U
return"\n"==e?(j.newline_before=j.newline_before||!t,++j.line,j.col=0):++j.col,e}function r(u,t){var e=j.text.indexOf(u,j.pos)
if(t&&e==-1)throw U
return e}function i(){j.tokline=j.line,j.tokcol=j.col,j.tokpos=j.pos}function a(u,t,e){j.regex_allowed="operator"==u&&!y($,t)||"keyword"==u&&y(N,t)||"punc"==u&&y(O,t)
var r={type:u,value:t,line:j.tokline,col:j.tokcol,pos:j.tokpos,endpos:j.pos,nlb:j.newline_before}
if(!e){r.comments_before=j.comments_before,j.comments_before=[]
for(var n=0,i=r.comments_before.length;n<i;n++)r.nlb=r.nlb||r.comments_before[n].nlb}return j.newline_before=!1,r}function s(){for(;y(P,t());)e()}function A(u){for(var r="",n=t(),i=0;n&&u(n,i++);)r+=e(),n=t()
return r}function h(u){f(u,j.tokline,j.tokcol,j.tokpos)}function E(u){var t=!1,e=!1,r=!1,n="."==u,i=A(function(i,a){return"x"==i||"X"==i?!r&&(r=!0):r||"E"!=i&&"e"!=i?"-"==i?!(!e&&(0!=a||u)):"+"==i?e:(e=!1,"."==i?!(n||r||t)&&(n=!0):o(i)):!t&&(t=e=!0)})
u&&(i=u+i)
var s=p(i)
return isNaN(s)?void h("Invalid syntax: "+i):a("num",s)}function F(u){var t=e(!0,u)
switch(t){case"n":return"\n"
case"r":return"\r"
case"t":return"\t"
case"b":return"\b"
case"v":return"\v"
case"f":return"\f"
case"0":return"\0"
case"x":return String.fromCharCode(C(2))
case"u":return String.fromCharCode(C(4))
case"\n":return""
default:return t}}function C(u){for(var t=0;u>0;--u){var r=parseInt(e(!0),16)
isNaN(r)&&h("Invalid hex-character pattern in string"),t=t<<4|r}return t}function d(){return R("Unterminated string constant",function(){for(var u=e(),t="";;){var r=e(!0)
if("\\"==r){var n=0,i=null
r=A(function(u){if(u>="0"&&u<="7"){if(!i)return i=u,++n
if(i<="3"&&n<=2)return++n
if(i>="4"&&n<=1)return++n}return!1}),r=n>0?String.fromCharCode(parseInt(r,8)):F(!0)}else if(r==u)break
t+=r}return a("string",t)})}function D(){e()
var u,t=r("\n")
return t==-1?(u=j.text.substr(j.pos),j.pos=j.text.length):(u=j.text.substring(j.pos,t),j.pos=t),a("comment1",u,!0)}function v(){return e(),R("Unterminated multiline comment",function(){var u=r("*/",!0),t=j.text.substring(j.pos,u)
return j.pos=u+2,j.line+=t.split("\n").length-1,j.newline_before=j.newline_before||t.indexOf("\n")>=0,/^@cc_on/i.test(t)&&(z("WARNING: at line "+j.line),z('*** Found "conditional comment": '+t),z("*** UglifyJS DISCARDS ALL COMMENTS.  This means your code might no longer work properly in Internet Explorer.")),a("comment2",t,!0)})}function B(){for(var u,r,n=!1,i="",o=!1;null!=(u=t());)if(n)"u"!=u&&h("Expecting UnicodeEscapeSequence -- uXXXX"),u=F(),l(u)||h("Unicode char: "+u.charCodeAt(0)+" is not valid in identifier"),i+=u,n=!1
else if("\\"==u)o=n=!0,e()
else{if(!l(u))break
i+=e()}return y(b,i)&&o&&(r=i.charCodeAt(0).toString(16).toUpperCase(),i="\\u"+"0000".substr(r.length)+r+i.slice(1)),i}function m(u){return R("Unterminated regular expression",function(){for(var t,r=!1,n=!1;t=e(!0);)if(r)u+="\\"+t,r=!1
else if("["==t)n=!0,u+=t
else if("]"==t&&n)n=!1,u+=t
else{if("/"==t&&!n)break
"\\"==t?r=!0:u+=t}var i=B()
return a("regexp",[u,i])})}function g(u){function r(u){if(!t())return u
var n=u+t()
return y(k,n)?(e(),r(n)):u}return a("operator",r(u||e()))}function _(){e()
var u=j.regex_allowed
switch(t()){case"/":return j.comments_before.push(D()),j.regex_allowed=u,L()
case"*":return j.comments_before.push(v()),j.regex_allowed=u,L()}return j.regex_allowed?m(""):g("/")}function S(){return e(),n(t())?E("."):a("punc",".")}function T(){var u=B()
return y(b,u)?y(k,u)?a("operator",u):y(w,u)?a("atom",u):a("keyword",u):a("name",u)}function R(u,t){try{return t()}catch(t){if(t!==U)throw t
h(u)}}function L(u){if(null!=u)return m(u)
s(),i()
var r=t()
return r?n(r)?E():'"'==r||"'"==r?d():y(I,r)?a("punc",e()):"."==r?S():"/"==r?_():y(x,r)?g():"\\"==r||c(r)?T():void h("Unexpected character '"+r+"'"):a("eof")}var j={text:u.replace(/\r\n?|[\n\u2028\u2029]/g,"\n").replace(/^\uFEFF/,""),pos:0,tokpos:0,line:0,tokline:0,col:0,tokcol:0,newline_before:!1,regex_allowed:!1,comments_before:[]}
return L.context=function(u){return u&&(j=u),j},L}function F(u,t,e){this.name=u,this.start=t,this.end=e}function C(u,t,e){function r(u,t){return h(ou.token,u,t)}function n(){return ou.peeked||(ou.peeked=ou.input())}function i(){return ou.prev=ou.token,ou.peeked?(ou.token=ou.peeked,ou.peeked=null):ou.token=ou.input(),ou.in_directives=ou.in_directives&&("string"==ou.token.type||r("punc",";")),ou.token}function o(){return ou.prev}function a(u,t,e,r){var n=ou.input.context()
f(u,null!=t?t:n.tokline,null!=e?e:n.tokcol,null!=r?r:n.tokpos)}function s(u,t){a(t,u.line,u.col)}function c(u){null==u&&(u=ou.token),s(u,"Unexpected token: "+u.type+" ("+u.value+")")}function l(u,t){return r(u,t)?i():void s(ou.token,"Unexpected token "+ou.token.type+", expected "+u)}function p(u){return l("punc",u)}function A(){return!t&&(ou.token.nlb||r("eof")||r("punc","}"))}function C(){r("punc",";")?i():A()||c()}function v(){return B(arguments)}function m(){p("(")
var u=pu()
return p(")"),u}function b(u,t,e){return u instanceof F?u:new F(u,t,e)}function _(u){return e?function(){var t=ou.token,e=u.apply(this,arguments)
return e[0]=b(e[0],t,o()),e}:u}function N(u){ou.labels.push(u)
var e=ou.token,r=au()
return t&&!y(q,r[0])&&c(e),ou.labels.pop(),v("label",u,r)}function w(){return v("stat",D(pu,C))}function x(u){var t
return A()||(t=r("name")?ou.token.value:null),null!=t?(i(),g(t,ou.labels)||a("Label "+t+" without matching loop or statement")):0==ou.in_loop&&a(u+" not inside a loop or switch"),C(),v(u,t)}function S(){p("(")
var u=null
return!r("punc",";")&&(u=r("keyword","var")?(i(),L(!0)):pu(!0,!0),r("operator","in"))?("var"==u[0]&&u[1].length>1&&a("Only one variable declaration allowed in for..in loop"),R(u)):T(u)}function T(u){p(";")
var t=r("punc",";")?null:pu()
p(";")
var e=r("punc",")")?null:pu()
return p(")"),v("for",u,t,e,iu(au))}function R(u){var t="var"==u[0]?v("name",u[1][0]):u
i()
var e=pu()
return p(")"),v("for-in",u,t,e,iu(au))}function k(){var u,t=m(),e=au()
return r("keyword","else")&&(i(),u=au()),v("if",t,e,u)}function P(){p("{")
for(var u=[];!r("punc","}");)r("eof")&&c(),u.push(au())
return i(),u}function O(){var u,t,e=P()
if(r("keyword","catch")){i(),p("("),r("name")||a("Name expected")
var n=ou.token.value
i(),p(")"),u=[n,P()]}return r("keyword","finally")&&(i(),t=P()),u||t||a("Missing catch/finally blocks"),v("try",e,u,t)}function I(u){for(var t=[];;){r("name")||c()
var e=ou.token.value
if(i(),r("operator","=")?(i(),t.push([e,pu(!1,u)])):t.push([e]),!r("punc",","))break
i()}return t}function L(u){return v("var",I(u))}function U(){return v("const",I())}function z(){var u,t=lu(!1)
return r("punc","(")?(i(),u=W(")")):u=[],Q(v("new",t,u),!0)}function W(u,t,e){for(var n=!0,o=[];!r("punc",u)&&(n?n=!1:p(","),!t||!r("punc",u));)r("punc",",")&&e?o.push(["atom","undefined"]):o.push(pu(!1))
return i(),o}function G(){return v("array",W("]",!t,!0))}function Y(){for(var u=!0,e=[];!r("punc","}")&&(u?u=!1:p(","),t||!r("punc","}"));){var n=ou.token.type,o=J()
"name"!=n||"get"!=o&&"set"!=o||r("punc",":")?(p(":"),e.push([o,pu(!1)])):e.push([X(),su(!1),o])}return i(),v("object",e)}function J(){switch(ou.token.type){case"num":case"string":return D(ou.token.value,i)}return X()}function X(){switch(ou.token.type){case"name":case"operator":case"keyword":case"atom":return D(ou.token.value,i)
default:c()}}function Q(u,t){return r("punc",".")?(i(),Q(v("dot",u,X()),t)):r("punc","[")?(i(),Q(v("sub",u,D(pu,d(p,"]"))),t)):t&&r("punc","(")?(i(),Q(v("call",u,W(")")),!0)):u}function K(u){if(r("operator")&&y(j,ou.token.value))return Z("unary-prefix",D(ou.token.value,i),K(u))
for(var t=lu(u);r("operator")&&y($,ou.token.value)&&!ou.token.nlb;)t=Z("unary-postfix",ou.token.value,t),i()
return t}function Z(u,t,e){return"++"!=t&&"--"!=t||ru(e)||a("Invalid use of "+t+" operator"),v(u,t,e)}function uu(u,t,e){var n=r("operator")?ou.token.value:null
n&&"in"==n&&e&&(n=null)
var o=null!=n?V[n]:null
if(null!=o&&o>t){i()
var a=uu(K(!0),o,e)
return uu(v("binary",n,u,a),t,e)}return u}function tu(u){return uu(K(!0),0,u)}function eu(u){var t=tu(u)
if(r("operator","?")){i()
var e=pu(!1)
return p(":"),v("conditional",t,e,pu(!1,u))}return t}function ru(u){if(!t)return!0
switch(u[0]+""){case"dot":case"sub":case"new":case"call":return!0
case"name":return"this"!=u[1]}}function nu(u){var t=eu(u),e=ou.token.value
if(r("operator")&&y(M,e)){if(ru(t))return i(),v("assign",M[e],t,nu(u))
a("Invalid assignment")}return t}function iu(u){try{return++ou.in_loop,u()}finally{--ou.in_loop}}var ou={input:"string"==typeof u?E(u,!0):u,token:null,prev:null,peeked:null,in_function:0,in_directives:!0,in_loop:0,labels:[]}
ou.token=i()
var au=_(function(){switch((r("operator","/")||r("operator","/="))&&(ou.peeked=null,ou.token=ou.input(ou.token.value.substr(1))),ou.token.type){case"string":var u=ou.in_directives,t=w()
return u&&"string"==t[1][0]&&!r("punc",",")?v("directive",t[1][1]):t
case"num":case"regexp":case"operator":case"atom":return w()
case"name":return h(n(),"punc",":")?N(D(ou.token.value,i,i)):w()
case"punc":switch(ou.token.value){case"{":return v("block",P())
case"[":case"(":return w()
case";":return i(),v("block")
default:c()}case"keyword":switch(D(ou.token.value,i)){case"break":return x("break")
case"continue":return x("continue")
case"debugger":return C(),v("debugger")
case"do":return function(u){return l("keyword","while"),v("do",D(m,C),u)}(iu(au))
case"for":return S()
case"function":return su(!0)
case"if":return k()
case"return":return 0==ou.in_function&&a("'return' outside of function"),v("return",r("punc",";")?(i(),null):A()?null:D(pu,C))
case"switch":return v("switch",m(),cu())
case"throw":return ou.token.nlb&&a("Illegal newline after 'throw'"),v("throw",D(pu,C))
case"try":return O()
case"var":return D(L,C)
case"const":return D(U,C)
case"while":return v("while",m(),iu(au))
case"with":return v("with",m(),au())
default:c()}}}),su=function(u){var t=r("name")?D(ou.token.value,i):null
return u&&!t&&c(),p("("),v(u?"defun":"function",t,function(u,t){for(;!r("punc",")");)u?u=!1:p(","),r("name")||c(),t.push(ou.token.value),i()
return i(),t}(!0,[]),function(){++ou.in_function
var u=ou.in_loop
ou.in_directives=!0,ou.in_loop=0
var t=P()
return--ou.in_function,ou.in_loop=u,t}())},cu=d(iu,function(){p("{")
for(var u=[],t=null;!r("punc","}");)r("eof")&&c(),r("keyword","case")?(i(),t=[],u.push([pu(),t]),p(":")):r("keyword","default")?(i(),p(":"),t=[],u.push([null,t])):(t||c(),t.push(au()))
return i(),u}),lu=_(function(u){if(r("operator","new"))return i(),z()
if(r("punc")){switch(ou.token.value){case"(":return i(),Q(D(pu,d(p,")")),u)
case"[":return i(),Q(G(),u)
case"{":return i(),Q(Y(),u)}c()}if(r("keyword","function"))return i(),Q(su(!1),u)
if(y(H,ou.token.type)){var t="regexp"==ou.token.type?v("regexp",ou.token.value[0],ou.token.value[1]):v(ou.token.type,ou.token.value)
return Q(D(t,i),u)}c()}),pu=_(function(u,t){0==arguments.length&&(u=!0)
var e=nu(t)
return u&&r("punc",",")?(i(),v("seq",e,pu(!0,t))):e})
return v("toplevel",function(u){for(;!r("eof");)u.push(au())
return u}([]))}function d(u){var t=B(arguments,1)
return function(){return u.apply(this,t.concat(B(arguments)))}}function D(u){u instanceof Function&&(u=u())
for(var t=1,e=arguments.length;--e>0;++t)arguments[t]()
return u}function v(u){for(var t={},e=0;e<u.length;++e)t[u[e]]=!0
return t}function B(u,t){return Array.prototype.slice.call(u,t||0)}function m(u){return u.split("")}function g(u,t){for(var e=t.length;--e>=0;)if(t[e]==u)return!0
return!1}function y(u,t){return Object.prototype.hasOwnProperty.call(u,t)}var b=v(["break","case","catch","const","continue","debugger","default","delete","do","else","finally","for","function","if","in","instanceof","new","return","switch","throw","try","typeof","var","void","while","with"]),_=v(["abstract","boolean","byte","char","class","double","enum","export","extends","final","float","goto","implements","import","int","interface","long","native","package","private","protected","public","short","static","super","synchronized","throws","transient","volatile"]),N=v(["return","new","delete","throw","else","case"]),w=v(["false","null","true","undefined"]),x=v(m("+-*&%=<>!?|~^")),S=/^0x[0-9a-f]+$/i,T=/^0[0-7]+$/,R=/^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i,k=v(["in","instanceof","typeof","new","void","delete","++","--","+","-","!","~","&","|","^","*","/","%",">>","<<",">>>","<",">","<=",">=","==","===","!=","!==","?","=","+=","-=","/=","*=","%=",">>=","<<=",">>>=","|=","^=","&=","&&","||"]),P=v(m("  \n\r\t\f\v​᠎             　")),O=v(m("[{(,.;:")),I=v(m("[]{}(),;:")),L=(v(m("gmsiy")),{letter:new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0\\u08A2-\\u08AC\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F0\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA697\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA793\\uA7A0-\\uA7AA\\uA7F8-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA80-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),combining_mark:new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u08E4-\\u08FE\\u0900-\\u0903\\u093A-\\u093C\\u093E-\\u094F\\u0951-\\u0957\\u0962\\u0963\\u0981-\\u0983\\u09BC\\u09BE-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CD\\u09D7\\u09E2\\u09E3\\u0A01-\\u0A03\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81-\\u0A83\\u0ABC\\u0ABE-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AE2\\u0AE3\\u0B01-\\u0B03\\u0B3C\\u0B3E-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B62\\u0B63\\u0B82\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD7\\u0C01-\\u0C03\\u0C3E-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0C82\\u0C83\\u0CBC\\u0CBE-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CE2\\u0CE3\\u0D02\\u0D03\\u0D3E-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4D\\u0D57\\u0D62\\u0D63\\u0D82\\u0D83\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F3E\\u0F3F\\u0F71-\\u0F84\\u0F86\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102B-\\u103E\\u1056-\\u1059\\u105E-\\u1060\\u1062-\\u1064\\u1067-\\u106D\\u1071-\\u1074\\u1082-\\u108D\\u108F\\u109A-\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B4-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u192B\\u1930-\\u193B\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A17-\\u1A1B\\u1A55-\\u1A5E\\u1A60-\\u1A7C\\u1A7F\\u1B00-\\u1B04\\u1B34-\\u1B44\\u1B6B-\\u1B73\\u1B80-\\u1B82\\u1BA1-\\u1BAD\\u1BE6-\\u1BF3\\u1C24-\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE8\\u1CED\\u1CF2-\\u1CF4\\u1DC0-\\u1DE6\\u1DFC-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA674-\\uA67D\\uA69F\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA823-\\uA827\\uA880\\uA881\\uA8B4-\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA953\\uA980-\\uA983\\uA9B3-\\uA9C0\\uAA29-\\uAA36\\uAA43\\uAA4C\\uAA4D\\uAA7B\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uAAEB-\\uAAEF\\uAAF5\\uAAF6\\uABE3-\\uABEA\\uABEC\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),connector_punctuation:new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]"),digit:new RegExp("[\\u0030-\\u0039\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19]")})
A.prototype.toString=function(){return this.message+" (line: "+this.line+", col: "+this.col+", pos: "+this.pos+")\n\n"+this.stack}
var U={},j=v(["typeof","void","delete","--","++","!","~","-","+"]),$=v(["--","++"]),M=function(u,t,e){for(;e<u.length;)t[u[e]]=u[e].substr(0,u[e].length-1),e++
return t}(["+=","-=","/=","*=","%=",">>=","<<=",">>>=","|=","^=","&="],{"=":!0},0),V=function(u,t){for(var e=0,r=1;e<u.length;++e,++r)for(var n=u[e],i=0;i<n.length;++i)t[n[i]]=r
return t}([["||"],["&&"],["|"],["^"],["&"],["==","===","!=","!=="],["<",">","<=",">=","in","instanceof"],[">>","<<",">>>"],["+","-"],["*","/","%"]],{}),q=v(["for","do","while","switch"]),H=v(["atom","num","string","regexp","name"])
F.prototype.toString=function(){return this.name}
var z=function(){}
e.tokenizer=E,e.parse=C,e.slice=B,e.curry=d,e.member=g,e.array_to_hash=v,e.PRECEDENCE=V,e.KEYWORDS_ATOM=w,e.RESERVED_WORDS=_,e.KEYWORDS=b,e.ATOMIC_START_TOKEN=H,e.OPERATORS=k,e.is_alphanumeric_char=o,e.is_identifier_start=c,e.is_identifier_char=l,e.set_logger=function(u){z=u}},{}],41:[function(u,t,e){function r(){function u(u){return[this[0],L(u,function(u){var t=[u[0]]
return u.length>1&&(t[1]=e(u[1])),t})]}function t(u){var t=[this[0]]
return null!=u&&t.push(L(u,e)),t}function e(u){if(null==u)return null
try{a.push(u)
var t=u[0],e=o[t]
if(e){var r=e.apply(u,u.slice(1))
if(null!=r)return r}return e=i[t],e.apply(u,u.slice(1))}finally{a.pop()}}function r(u){if(null==u)return null
try{return a.push(u),i[u[0]].apply(u,u.slice(1))}finally{a.pop()}}function n(u,t){var e,r={}
for(e in u)w(u,e)&&(r[e]=o[e],o[e]=u[e])
var n=t()
for(e in r)w(r,e)&&(r[e]?o[e]=r[e]:delete o[e])
return n}var i={string:function(u){return[this[0],u]},num:function(u){return[this[0],u]},name:function(u){return[this[0],u]},toplevel:function(u){return[this[0],L(u,e)]},block:t,splice:t,var:u,const:u,try:function(u,t,r){return[this[0],L(u,e),null!=t?[t[0],L(t[1],e)]:null,null!=r?L(r,e):null]},throw:function(u){return[this[0],e(u)]},new:function(u,t){return[this[0],e(u),L(t,e)]},switch:function(u,t){return[this[0],e(u),L(t,function(u){return[u[0]?e(u[0]):null,L(u[1],e)]})]},break:function(u){return[this[0],u]},continue:function(u){return[this[0],u]},conditional:function(u,t,r){return[this[0],e(u),e(t),e(r)]},assign:function(u,t,r){return[this[0],u,e(t),e(r)]},dot:function(u){return[this[0],e(u)].concat(T(arguments,1))},call:function(u,t){return[this[0],e(u),L(t,e)]},function:function(u,t,r){return[this[0],u,t.slice(),L(r,e)]},debugger:function(){return[this[0]]},defun:function(u,t,r){return[this[0],u,t.slice(),L(r,e)]},if:function(u,t,r){return[this[0],e(u),e(t),e(r)]},for:function(u,t,r,n){return[this[0],e(u),e(t),e(r),e(n)]},"for-in":function(u,t,r,n){return[this[0],e(u),e(t),e(r),e(n)]},while:function(u,t){return[this[0],e(u),e(t)]},do:function(u,t){return[this[0],e(u),e(t)]},return:function(u){return[this[0],e(u)]},binary:function(u,t,r){return[this[0],u,e(t),e(r)]},"unary-prefix":function(u,t){return[this[0],u,e(t)]},"unary-postfix":function(u,t){return[this[0],u,e(t)]},sub:function(u,t){return[this[0],e(u),e(t)]},object:function(u){return[this[0],L(u,function(u){return 2==u.length?[u[0],e(u[1])]:[u[0],e(u[1]),u[2]]})]},regexp:function(u,t){return[this[0],u,t]},array:function(u){return[this[0],L(u,e)]},stat:function(u){return[this[0],e(u)]},seq:function(){return[this[0]].concat(L(T(arguments),e))},label:function(u,t){return[this[0],u,e(t)]},with:function(u,t){return[this[0],e(u),e(t)]},atom:function(u){return[this[0],u]},directive:function(u){return[this[0],u]}},o={},a=[]
return{walk:e,dive:r,with_walkers:n,parent:function(){return a[a.length-2]},stack:function(){return a}}}function n(u){this.names={},this.mangled={},this.rev_mangled={},this.cname=-1,this.refs={},this.uses_with=!1,this.uses_eval=!1,this.directives=[],this.parent=u,this.children=[],u?(this.level=u.level+1,u.children.push(this)):this.level=0}function i(){return"undefined"!=typeof DIGITS_OVERRIDE_FOR_TESTING?DIGITS_OVERRIDE_FOR_TESTING:"etnrisouaflchpdvmgybwESxTNCkLAOM_DPHBjFIqRUzWXV$JKQGYZ0516372984"}function o(u){function t(u){c=new n(c),c.labels=new n
var t=c.body=u()
return t.scope=c,c=c.parent,t}function e(u,t){return c.define(u,t)}function i(u){c.refs[u]=!0}function o(u,r,n){var i="defun"==this[0]
return[this[0],i?e(u,"defun"):u,r,t(function(){return i||e(u,"lambda"),L(r,function(u){e(u,"arg")}),L(n,p)})]}function a(u){return function(t){L(t,function(t){e(t[0],u),t[1]&&i(t[0])})}}function s(u){u&&(c.labels.refs[u]=!0)}var c=null,l=r(),p=l.walk,A=[]
return t(function(){function t(u,e){for(e=u.children.length;--e>=0;)t(u.children[e])
for(e in u.refs)if(w(u.refs,e))for(var r=u.has(e),n=u;n&&(n.refs[e]=r,n!==r);n=n.parent);}var r=l.with_walkers({function:o,defun:o,label:function(u,t){c.labels.define(u)},break:s,continue:s,with:function(u,t){for(var e=c;e;e=e.parent)e.uses_with=!0},var:a("var"),const:a("const"),try:function(u,t,r){if(null!=t)return[this[0],L(u,p),[e(t[0],"catch"),L(t[1],p)],null!=r?L(r,p):null]},name:function(u){"eval"==u&&A.push(c),i(u)}},function(){return p(u)})
return L(A,function(u){if(!u.has("eval"))for(;u;)u.uses_eval=!0,u=u.parent}),t(c),r})}function a(u,t){function e(u,e){return t.mangle&&(t.toplevel||l.parent)?t.except&&R(u,t.except)?u:t.no_functions&&w(l.names,u)&&("defun"==l.names[u]||"lambda"==l.names[u])?u:l.get_mangled(u,e):u}function n(u){if(t.defines)return!l.has(u)&&w(t.defines,u)?t.defines[u]:null}function i(u,r,n){if(!t.no_functions&&t.mangle){var i,o="defun"==this[0]
u&&(o?u=e(u):n.scope.references(u)?(i={},l.uses_eval||l.uses_with?i[u]=u:u=i[u]=l.next_mangled()):u=null)}return n=a(n.scope,function(){return r=L(r,function(u){return e(u)}),L(n,A)},i),[this[0],u,r,n]}function a(u,t,r){var n=l
if(l=u,r)for(var i in r)w(r,i)&&u.set_mangle(i,r[i])
for(var i in u.names)w(u.names,i)&&e(i,!0)
var o=t()
return o.scope=u,l=n,o}function s(u){return[this[0],L(u,function(u){return[e(u[0]),A(u[1])]})]}function c(u){if(u)return[this[0],l.labels.get_mangled(u)]}var l,p=r(),A=p.walk
return t=_(t,{mangle:!0,toplevel:!1,defines:null,except:null,no_functions:!1}),p.with_walkers({function:i,defun:function(){var u=i.apply(this,arguments)
switch(p.parent()[0]){case"toplevel":case"function":case"defun":return L.at_top(u)}return u},label:function(u,t){return l.labels.refs[u]?[this[0],l.labels.get_mangled(u,!0),A(t)]:A(t)},break:c,continue:c,var:s,const:s,name:function(u){return n(u)||[this[0],e(u)]},try:function(u,t,r){return[this[0],L(u,A),null!=t?[e(t[0]),L(t[1],A)]:null,null!=r?L(r,A):null]},toplevel:function(u){var t=this
return a(t.scope,function(){return[t[0],L(u,A)]})},directive:function(){return L.at_top(this)}},function(){return A(o(u))})}function s(u,t){return g(u).length>g("stat"==t[0]?t[1]:t).length?t:u}function c(u){return"block"==u[0]&&u[1]&&u[1].length>0?u[1][u[1].length-1]:u}function l(u){if(u)switch(c(u)[0]){case"return":case"break":case"continue":case"throw":return!0}}function p(u){return"unary-prefix"==u[0]&&R(u[1],["!","delete"])||"binary"==u[0]&&R(u[1],["in","instanceof","==","!=","===","!==","<","<=",">=",">"])||"binary"==u[0]&&R(u[1],["&&","||"])&&p(u[2])&&p(u[3])||"conditional"==u[0]&&p(u[2])&&p(u[3])||"assign"==u[0]&&u[1]===!0&&p(u[3])||"seq"==u[0]&&p(u[u.length-1])}function A(u){return!u||"block"==u[0]&&(!u[1]||0==u[1].length)}function f(u){return"string"==u[0]||"unary-prefix"==u[0]&&"typeof"==u[1]||"binary"==u[0]&&"+"==u[1]&&(f(u[2])||f(u[3]))}function h(u){A(u)||U("Dropping unreachable code: "+g(u,!0))}function E(u){function t(u){u=L(u,o)
for(var e=0;e<u.length;++e){var r=u[e]
if("if"==r[0]&&!r[3]){var n=r[2]
if(l(n)){var i=o(r[1]),a=t(u.slice(e+1)),s=1==a.length?a[0]:["block",a]
return u.slice(0,e).concat([[r[0],i,n,s]])}}}return u}function e(u,e,r){return r=t(r),[this[0],u,e,r]}function n(u){return[this[0],null!=u?t(u):null]}var i=r(),o=i.walk
return i.with_walkers({defun:e,function:e,block:n,splice:n,toplevel:function(u){return[this[0],t(u)]},try:function(u,e,r){return[this[0],t(u),null!=e?[e[0],t(e[1])]:null,null!=r?t(r):null]}},function(){return o(u)})}function F(u,t){function e(){throw l}function n(){throw p}function i(){return t.call(this,this,s,e,n)}function o(u){if("++"==u||"--"==u)return i.apply(this,arguments)}function a(u){if("&&"==u||"||"==u)return i.apply(this,arguments)}var s=r(),c=s.walk,l={},p={}
return s.with_walkers({try:i,throw:i,return:i,new:i,switch:i,break:i,continue:i,assign:i,call:i,if:i,for:i,"for-in":i,while:i,do:i,return:i,"unary-prefix":o,"unary-postfix":o,conditional:i,binary:a,defun:i},function(){for(;;)try{c(u)
break}catch(u){if(u===l)break
if(u===p)continue
throw u}})}function C(u){function t(u,t){var e=i
i=t,u=L(u,s)
var r={},n=L(t.names,function(u,e){return"var"!=u?L.skip:t.references(e)?(r[e]=!0,[e]):L.skip})
return n.length>0&&(F(["block",u],function(u,t,e,i){if("assign"==u[0]&&u[1]===!0&&"name"==u[2][0]&&w(r,u[2][1])){for(var o=n.length;--o>=0;)if(n[o][0]==u[2][1]){n[o][1]&&e(),n[o][1]=u[3],n.push(n.splice(o,1)[0])
break}var a=t.parent()
if("seq"==a[0]){var s=a[2]
s.unshift(0,a.length),a.splice.apply(a,s)}else"stat"==a[0]?a.splice(0,a.length,"block"):e()
i()}e()}),u.unshift(["var",n])),i=e,u}function e(u){for(var t=null,e=u.length;--e>=0;){var r=u[e]
r[1]&&(r=["assign",!0,["name",r[0]],r[1]],t=null==t?r:["seq",r,t])}return null==t&&"for"!=a.parent()[0]?"for-in"==a.parent()[0]?["name",u[0][0]]:L.skip:["stat",t]}function n(u){return[this[0],t(u,this.scope)]}var i,a=r(),s=a.walk
return a.with_walkers({function:function(u,e,r){for(var n=e.length;--n>=0&&!r.scope.references(e[n]);)e.pop()
return r.scope.references(u)||(u=null),[this[0],u,e,t(r,r.scope)]},defun:function(u,e,r){if(!i.references(u))return L.skip
for(var n=e.length;--n>=0&&!r.scope.references(e[n]);)e.pop()
return[this[0],u,e,t(r,r.scope)]},var:e,toplevel:n},function(){return s(o(u))})}function d(u,t){return u=D(u,t),u=v(u,t)}function D(u,t){function e(u){var r=["unary-prefix","!",u]
switch(u[0]){case"unary-prefix":return"!"==u[1]&&p(u[2])?u[2]:r
case"seq":return u=T(u),u[u.length-1]=e(u[u.length-1]),u
case"conditional":return s(r,["conditional",u[1],e(u[2]),e(u[3])])
case"binary":var n=u[1],i=u[2],o=u[3]
if(!t.keep_comps)switch(n){case"<=":return["binary",">",i,o]
case"<":return["binary",">=",i,o]
case">=":return["binary","<",i,o]
case">":return["binary","<=",i,o]}switch(n){case"==":return["binary","!=",i,o]
case"!=":return["binary","==",i,o]
case"===":return["binary","!==",i,o]
case"!==":return["binary","===",i,o]
case"&&":return s(r,["binary","||",e(i),e(o)])
case"||":return s(r,["binary","&&",e(i),e(o)])}}return r}function n(u,t,r){var n=function(){return"unary-prefix"==u[0]&&"!"==u[1]?r?["conditional",u[2],r,t]:["binary","||",u[2],t]:r?s(["conditional",u,t,r],["conditional",e(u),r,t]):["binary","&&",u,t]}
return j(u,function(u,e){return h(e?r:t),e?t:r},n)}function i(u){return null!=u&&"block"==u[0]&&u[1]&&(1==u[1].length?u=u[1][0]:0==u[1].length&&(u=["block"])),u}function o(u,t,e){return[this[0],u,t,a(e,"lambda")]}function a(u,e){return u=L(u,D),u=u.reduce(function(u,t){return"block"==t[0]?t[1]&&u.push.apply(u,t[1]):u.push(t),u},[]),u=function(t,e){return u.forEach(function(u){e&&("var"==u[0]&&"var"==e[0]||"const"==u[0]&&"const"==e[0])?e[1]=e[1].concat(u[1]):(t.push(u),e=u)}),t}([]),t.dead_code&&(u=function(e,r){return u.forEach(function(u){r?"function"==u[0]||"defun"==u[0]?e.push(u):"var"==u[0]||"const"==u[0]?(t.no_warnings||U("Variables declared in unreachable code"),u[1]=L(u[1],function(u){return u[1]&&!t.no_warnings&&h(["assign",!0,["name",u[0]],u[1]]),[u[0]]}),e.push(u)):t.no_warnings||h(u):(e.push(u),R(u[0],["return","throw","break","continue"])&&(r=!0))}),e}([])),t.make_seqs&&(u=function(t,e){return u.forEach(function(u){e&&"stat"==e[0]&&"stat"==u[0]?e[1]=["seq",e[1],u[1]]:(t.push(u),e=u)}),t.length>=2&&"stat"==t[t.length-2][0]&&("return"==t[t.length-1][0]||"throw"==t[t.length-1][0])&&t[t.length-1][1]&&t.splice(t.length-2,2,[t[t.length-1][0],["seq",t[t.length-2][1],t[t.length-1][1]]]),t}([])),u}function c(u,t,e){return j(u,function(u,r){return r?(t=D(t),h(e),t||["block"]):(e=D(e),h(t),e||["block"])},function(){return F(u,t,e)})}function f(u,t,r){var n=[["if",e(u),r]]
return"block"==t[0]?t[1]&&(n=n.concat(t[1])):n.push(t),D(["block",n])}function F(u,t,r){if(u=D(u),t=D(t),r=D(r),A(r)&&A(t))return["stat",u]
A(t)?(u=e(u),t=r,r=null):A(r)?r=null:!function(){var n=g(u),i=e(u),o=g(i)
if(o.length<n.length){var a=t
t=r,r=a,u=i}}()
var i=["if",u,t,r]
return"if"==t[0]&&A(t[3])&&A(r)?i=s(i,D(["if",["binary","&&",u,t[1]],t[2]])):"stat"==t[0]?r?"stat"==r[0]?i=s(i,["stat",n(u,t[1],r[1])]):l(r)&&(i=f(u,t,r)):i=s(i,["stat",n(u,t[1])]):r&&t[0]==r[0]&&("return"==t[0]||"throw"==t[0])&&t[1]&&r[1]?i=s(i,[t[0],n(u,t[1],r[1])]):r&&l(t)?(i=[["if",u,t]],"block"==r[0]?r[1]&&(i=i.concat(r[1])):i.push(r),i=D(["block",i])):t&&l(r)&&(i=f(u,t,r)),i}function C(u,t){return j(u,function(u,e){return e?["for",null,null,null,D(t)]:(h(t),["block"])})}t=_(t,{make_seqs:!0,dead_code:!0,no_warnings:!1,keep_comps:!0,unsafe:!1})
var d=r(),D=d.walk
return d.with_walkers({sub:function(u,t){if("string"==t[0]){var e=t[1]
if(N(e))return["dot",D(u),e]
if(/^[1-9][0-9]*$/.test(e)||"0"===e)return["sub",D(u),["num",parseInt(e,10)]]}},if:c,toplevel:function(u){return["toplevel",a(u)]},switch:function(u,t){var e=t.length-1
return["switch",D(u),L(t,function(u,t){var r=a(u[1])
if(t==e&&r.length>0){var n=r[r.length-1]
"break"!=n[0]||n[1]||r.pop()}return[u[0]?D(u[0]):null,r]})]},function:o,defun:o,block:function(u){if(u)return i(["block",a(u)])},binary:function(u,t,e){return j(["binary",u,D(t),D(e)],function(u){return s(D(u),this)},function(){return function(){if("=="==u||"!="==u){var r=D(t),n=D(e)
return r&&"unary-prefix"==r[0]&&"!"==r[1]&&"num"==r[2][0]?t=["num",+!r[2][1]]:n&&"unary-prefix"==n[0]&&"!"==n[1]&&"num"==n[2][0]&&(e=["num",+!n[2][1]]),["binary",u,t,e]}}()||this})},conditional:function(u,t,e){return n(D(u),D(t),D(e))},try:function(u,t,e){return["try",a(u),null!=t?[t[0],a(t[1])]:null,null!=e?a(e):null]},"unary-prefix":function(u,t){t=D(t)
var r=["unary-prefix",u,t]
return"!"==u&&(r=s(r,e(t))),j(r,function(u,t){return D(u)},function(){return r})},name:function(u){switch(u){case"true":return["unary-prefix","!",["num",0]]
case"false":return["unary-prefix","!",["num",1]]}},while:C,assign:function(u,t,e){t=D(t),e=D(e)
var r=["+","-","/","*","%",">>","<<",">>>","|","^","&"]
return u===!0&&"name"===t[0]&&"binary"===e[0]&&~r.indexOf(e[1])&&"name"===e[2][0]&&e[2][1]===t[1]?[this[0],e[1],t,e[3]]:[this[0],u,t,e]},call:function(u,e){return u=D(u),t.unsafe&&"dot"==u[0]&&"string"==u[1][0]&&"toString"==u[2]?u[1]:[this[0],u,L(e,D)]},num:function(u){return isFinite(u)?[this[0],u]:["binary","/",u===1/0?["num",1]:u===-1/0?["unary-prefix","-",["num",1]]:["num",0],["num",0]]}},function(){return D(E(D(E(u))))})}function v(u,t){function e(u,t){var e,r=i
return i=u,e=t(),i=r,e}function n(u,t,r){return[this[0],u,t,e(r.scope,S(L,r,s))]}var i,a=r(),s=a.walk
return a.with_walkers({directive:function(u){return i.active_directive(u)?["block"]:void i.directives.push(u)},toplevel:function(u){return[this[0],e(this.scope,S(L,u,s))]},function:n,defun:n},function(){return s(o(u))})}function B(u,t){var e=0,r=0
return u=u.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g,function(u){switch(u){case"\\":return"\\\\"
case"\b":return"\\b"
case"\f":return"\\f"
case"\n":return"\\n"
case"\r":return"\\r"
case"\u2028":return"\\u2028"
case"\u2029":return"\\u2029"
case'"':return++e,'"'
case"'":return++r,"'"
case"\0":return"\\0"}return u}),t&&(u=m(u)),e>r?"'"+u.replace(/\x27/g,"\\'")+"'":'"'+u.replace(/\x22/g,'\\"')+'"'}function m(u){return u.replace(/[\u0080-\uffff]/g,function(u){for(var t=u.charCodeAt(0).toString(16);t.length<4;)t="0"+t
return"\\u"+t})}function g(u,t){function e(u){var e=B(u,t.ascii_only)
return t.inline_script&&(e=e.replace(/<\x2fscript([>\/\t\n\f\r ])/gi,"<\\/script$1")),e}function n(u){return u=u.toString(),t.ascii_only&&(u=m(u)),u}function i(u){return null==u&&(u=""),S&&(u=b(" ",t.indent_start+I*t.indent_level)+u),u}function o(u,t){null==t&&(t=1),I+=t
try{return u.apply(null,T(arguments,1))}finally{I-=t}}function a(u){return u=u.toString(),u.charAt(u.length-1)}function s(u){return u.toString().charAt(0)}function c(u){if(S)return u.join(" ")
for(var t=[],e=0;e<u.length;++e){var r=u[e+1]
t.push(u[e]),r&&(k(a(u[e]))&&(k(s(r))||"\\"==s(r))||/[\+\-]$/.test(u[e].toString())&&/^[\+\-]/.test(r.toString()))&&t.push(" ")}return t.join("")}function l(u){return u.join(","+j)}function p(u){for(var t=q(u),e=1;e<arguments.length;++e){var r=arguments[e]
if(r instanceof Function&&r(u)||u[0]==r)return"("+t+")"}return t}function f(u){if(1==u.length)return u[0]
if(2==u.length){var t=u[1]
return u=u[0],u.length<=t.length?u:t}return f([u[0],f(u.slice(1))])}function h(u){if("function"==u[0]||"object"==u[0])for(var t=T(V.stack()),e=t.pop(),r=t.pop();r;){if("stat"==r[0])return!0
if(("seq"!=r[0]&&"call"!=r[0]&&"dot"!=r[0]&&"sub"!=r[0]&&"conditional"!=r[0]||r[1]!==e)&&("binary"!=r[0]&&"assign"!=r[0]&&"unary-postfix"!=r[0]||r[2]!==e))return!1
e=r,r=t.pop()}return!w($,u[0])}function E(u){var t,e=u.toString(10),r=[e.replace(/^0\./,".").replace("e+","e")]
return Math.floor(u)===u?(u>=0?r.push("0x"+u.toString(16).toLowerCase(),"0"+u.toString(8)):r.push("-0x"+(-u).toString(16).toLowerCase(),"-0"+(-u).toString(8)),(t=/^(.*?)(0+)$/.exec(u))&&r.push(t[1]+"e"+t[2].length)):(t=/^0?\.(0+)(.*)$/.exec(u))&&r.push(t[2]+"e-"+(t[1].length+t[2].length),e.substr(e.indexOf("."))),f(r)}function F(u){if(null==u)return";"
if("do"==u[0])return g([u])
for(var t=u;;){var e=t[0]
if("if"==e){if(!t[3])return q(["block",[u]])
t=t[3]}else if("while"==e||"do"==e)t=t[2]
else{if("for"!=e&&"for-in"!=e)break
t=t[4]}}return q(u)}function C(u,t,e,r,i){var o=r||"function"
return u&&(o+=" "+n(u)),o+="("+l(L(t,n))+")",o=c([o,g(e)]),!i&&h(this)?"("+o+")":o}function d(u){switch(u[0]){case"with":case"while":return A(u[2])||d(u[2])
case"for":case"for-in":return A(u[4])||d(u[4])
case"if":return!(!A(u[2])||u[3])||(u[3]?!!A(u[3])||d(u[3]):d(u[2]))
case"directive":return!0}}function D(u,t){for(var e=[],r=u.length-1,n=0;n<=r;++n){var o=u[n],a=q(o)
";"!=a&&(S||n!=r||d(o)||(a=a.replace(/;+\s*$/,"")),e.push(a))}return t?e:L(e,i)}function v(u){var t=u.length
return 0==t?"{}":"{"+U+L(u,function(u,e){var r=u[1].length>0,n=o(function(){return i(u[0]?c(["case",q(u[0])+":"]):"default:")},.5)+(r?U+o(function(){return D(u[1]).join(U)}):"")
return!S&&r&&e<t-1&&(n+=";"),n}).join(U)+U+i("}")}function g(u){return u?0==u.length?"{}":"{"+U+o(function(){return D(u).join(U)})+U+i("}"):";"}function y(u){var t=u[0],e=u[1]
return null!=e&&(t=c([n(t),"=",p(e,"seq")])),t}t=_(t,{indent_start:0,indent_level:4,quote_keys:!1,space_colon:!1,beautify:!1,ascii_only:!1,inline_script:!1})
var S=!!t.beautify,I=0,U=S?"\n":"",j=S?" ":"",V=r(),q=V.walk
return V.with_walkers({string:e,num:E,name:n,debugger:function(){return"debugger;"},toplevel:function(u){return D(u).join(U+U)},splice:function(u){var t=V.parent()
return w(M,t)?g.apply(this,arguments):L(D(u,!0),function(u,t){return t>0?i(u):u}).join(U)},block:g,var:function(u){return"var "+l(L(u,y))+";"},const:function(u){return"const "+l(L(u,y))+";"},try:function(u,t,e){var r=["try",g(u)]
return t&&r.push("catch","("+t[0]+")",g(t[1])),e&&r.push("finally",g(e)),c(r)},throw:function(u){return c(["throw",q(u)])+";"},new:function(u,t){return t=t.length>0?"("+l(L(t,function(u){return p(u,"seq")}))+")":"",c(["new",p(u,"seq","binary","conditional","assign",function(u){var t=r(),e={}
try{t.with_walkers({call:function(){throw e},function:function(){return this}},function(){t.walk(u)})}catch(u){if(u===e)return!0
throw u}})+t])},switch:function(u,t){return c(["switch","("+q(u)+")",v(t)])},break:function(u){var t="break"
return null!=u&&(t+=" "+n(u)),t+";"},continue:function(u){var t="continue"
return null!=u&&(t+=" "+n(u)),t+";"},conditional:function(u,t,e){return c([p(u,"assign","seq","conditional"),"?",p(t,"seq"),":",p(e,"seq")])},assign:function(u,t,e){return u&&u!==!0?u+="=":u="=",c([q(t),u,p(e,"seq")])},dot:function(u){var t=q(u),e=1
for("num"==u[0]?/[a-f.]/i.test(t)||(t+="."):"function"!=u[0]&&h(u)&&(t="("+t+")");e<arguments.length;)t+="."+n(arguments[e++])
return t},call:function(u,t){var e=q(u)
return"("!=e.charAt(0)&&h(u)&&(e="("+e+")"),e+"("+l(L(t,function(u){return p(u,"seq")}))+")"},function:C,defun:C,if:function(u,t,e){var r=["if","("+q(u)+")",e?F(t):q(t)]
return e&&r.push("else",q(e)),c(r)},for:function(u,t,e,r){var n=["for"]
u=(null!=u?q(u):"").replace(/;*\s*$/,";"+j),t=(null!=t?q(t):"").replace(/;*\s*$/,";"+j),e=(null!=e?q(e):"").replace(/;*\s*$/,"")
var i=u+t+e
return"; ; "==i&&(i=";;"),n.push("("+i+")",q(r)),c(n)},"for-in":function(u,t,e,r){return c(["for","("+(u?q(u).replace(/;+$/,""):q(t)),"in",q(e)+")",q(r)])},while:function(u,t){return c(["while","("+q(u)+")",q(t)])},do:function(u,t){return c(["do",q(t),"while","("+q(u)+")"])+";"},return:function(u){var t=["return"]
return null!=u&&t.push(q(u)),c(t)+";"},binary:function(u,e,r){var n=q(e),i=q(r)
return(R(e[0],["assign","conditional","seq"])||"binary"==e[0]&&P[u]>P[e[1]]||"function"==e[0]&&h(this))&&(n="("+n+")"),R(r[0],["assign","conditional","seq"])||"binary"==r[0]&&P[u]>=P[r[1]]&&(r[1]!=u||!R(u,["&&","||","*"]))?i="("+i+")":S||!t.inline_script||"<"!=u&&"<<"!=u||"regexp"!=r[0]||!/^script/i.test(r[1])||(i=" "+i),c([n,u,i])},"unary-prefix":function(u,t){var e=q(t)
return"num"!=t[0]&&("unary-prefix"!=t[0]||w(O,u+t[1]))&&h(t)&&(e="("+e+")"),u+(x.is_alphanumeric_char(u.charAt(0))?" ":"")+e},"unary-postfix":function(u,t){var e=q(t)
return"num"!=t[0]&&("unary-postfix"!=t[0]||w(O,u+t[1]))&&h(t)&&(e="("+e+")"),e+u},sub:function(u,t){var e=q(u)
return h(u)&&(e="("+e+")"),e+"["+q(t)+"]"},object:function(u){var r=h(this)
if(0==u.length)return r?"({})":"{}"
var n="{"+U+o(function(){return L(u,function(u){if(3==u.length)return i(C(u[0],u[1][2],u[1][3],u[2],!0))
var r=u[0],n=p(u[1],"seq")
return t.quote_keys?r=e(r):("number"==typeof r||!S&&+r+""==r)&&parseFloat(r)>=0?r=E(+r):N(r)||(r=e(r)),i(c(S&&t.space_colon?[r,":",n]:[r+":",n]))}).join(","+U)})+U+i("}")
return r?"("+n+")":n},regexp:function(u,e){return t.ascii_only&&(u=m(u)),"/"+u+"/"+e},array:function(u){return 0==u.length?"[]":c(["[",l(L(u,function(t,e){return S||"atom"!=t[0]||"undefined"!=t[1]?p(t,"seq"):e===u.length-1?",":""})),"]"])},stat:function(u){return null!=u?q(u).replace(/;*\s*$/,";"):";"},seq:function(){return l(L(T(arguments),q))},label:function(u,t){return c([n(u),":",q(t)])},with:function(u,t){return c(["with","("+q(u)+")",q(t)])},atom:function(u){return n(u)},directive:function(u){return B(u)+";"}},function(){return q(u)})}function y(u,t){var e=[0]
return x.parse(function(){function r(u){return u.pos-s}function n(u){s=u.pos,e.push(s)}function i(){var u=a.apply(this,arguments)
u:if((!o||"keyword"!=o.type)&&r(u)>t)switch(u.type){case"keyword":case"atom":case"name":case"punc":n(u)
break u}return o=u,u}var o,a=x.tokenizer(u),s=0
return i.context=function(){return a.context.apply(this,arguments)},i}()),e.map(function(t,r){return u.substring(t,e[r+1]||u.length)}).join("\n")}function b(u,t){if(t<=0)return""
if(1==t)return u
var e=b(u,t>>1)
return e+=e,1&t&&(e+=u),e}function _(u,t){var e={}
u===!0&&(u={})
for(var r in t)w(t,r)&&(e[r]=u&&w(u,r)?u[r]:t[r])
return e}function N(u){return/^[a-z_$][a-z0-9_$]*$/i.test(u)&&"this"!=u&&!w(x.KEYWORDS_ATOM,u)&&!w(x.RESERVED_WORDS,u)&&!w(x.KEYWORDS,u)}function w(u,t){return Object.prototype.hasOwnProperty.call(u,t)}var x=u("./parse-js"),S=x.curry,T=x.slice,R=x.member,k=x.is_identifier_char,P=x.PRECEDENCE,O=x.OPERATORS,I=function(){var u=i()
return function(t){var e="",r=54
do e+=u.charAt(t%r),t=Math.floor(t/r),r=64
while(t>0)
return e}}()
n.prototype={has:function(u){for(var t=this;t;t=t.parent)if(w(t.names,u))return t},has_mangled:function(u){for(var t=this;t;t=t.parent)if(w(t.rev_mangled,u))return t},toJSON:function(){return{names:this.names,uses_eval:this.uses_eval,uses_with:this.uses_with}},next_mangled:function(){for(;;){var u,t=I(++this.cname)
if(u=this.has_mangled(t),(!u||this.refs[u.rev_mangled[t]]!==u)&&(u=this.has(t),(!u||u===this||this.refs[t]!==u||u.has_mangled(t))&&(!w(this.refs,t)||null!=this.refs[t])&&N(t)))return t}},set_mangle:function(u,t){return this.rev_mangled[t]=u,this.mangled[u]=t},get_mangled:function(u,t){if(this.uses_eval||this.uses_with)return u
var e=this.has(u)
return e?w(e.mangled,u)?e.mangled[u]:t?e.set_mangle(u,e.next_mangled()):u:u},references:function(u){return u&&!this.parent||this.uses_with||this.uses_eval||this.refs[u]},define:function(u,t){if(null!=u)return"var"!=t&&w(this.names,u)||(this.names[u]=t||"var"),u},active_directive:function(u){return R(u,this.directives)||this.parent&&this.parent.active_directive(u)}}
var L,U=function(){},j=function(){function u(e){switch(e[0]){case"string":case"num":return e[1]
case"name":case"atom":switch(e[1]){case"true":return!0
case"false":return!1
case"null":return null}break
case"unary-prefix":switch(e[1]){case"!":return!u(e[2])
case"typeof":return typeof u(e[2])
case"~":return~u(e[2])
case"-":return-u(e[2])
case"+":return+u(e[2])}break
case"binary":var r=e[2],n=e[3]
switch(e[1]){case"&&":return u(r)&&u(n)
case"||":return u(r)||u(n)
case"|":return u(r)|u(n)
case"&":return u(r)&u(n)
case"^":return u(r)^u(n)
case"+":return u(r)+u(n)
case"*":return u(r)*u(n)
case"/":return u(r)/u(n)
case"%":return u(r)%u(n)
case"-":return u(r)-u(n)
case"<<":return u(r)<<u(n)
case">>":return u(r)>>u(n)
case">>>":return u(r)>>>u(n)
case"==":return u(r)==u(n)
case"===":return u(r)===u(n)
case"!=":return u(r)!=u(n)
case"!==":return u(r)!==u(n)
case"<":return u(r)<u(n)
case"<=":return u(r)<=u(n)
case">":return u(r)>u(n)
case">=":return u(r)>=u(n)
case"in":return u(r)in u(n)
case"instanceof":return u(r)instanceof u(n)}}throw t}var t={}
return function(e,r,n){try{var i,o=u(e)
switch(typeof o){case"string":i=["string",o]
break
case"number":i=["num",o]
break
case"boolean":i=["name",String(o)]
break
default:if(null===o){i=["atom","null"]
break}throw new Error("Can't handle constant of type: "+typeof o)}return r.call(e,i,o)}catch(r){if(r===t){if("binary"!=e[0]||"==="!=e[1]&&"!=="!=e[1]||!(f(e[2])&&f(e[3])||p(e[2])&&p(e[3]))){if(n&&"binary"==e[0]&&("||"==e[1]||"&&"==e[1]))try{var a=u(e[2])
e="&&"==e[1]&&(a?e[3]:a)||"||"==e[1]&&(a?a:e[3])||e}catch(u){}}else e[1]=e[1].substr(0,2)
return n?n.call(e,e):null}throw r}}}(),$=x.array_to_hash(["name","array","object","string","dot","sub","call","regexp","defun"]),M=x.array_to_hash(["if","while","do","for","for-in","with"])
!function(){function u(u){this.v=u}function t(u){this.v=u}L=function(r,n,i){function o(){var o=n.call(i,r[a],a)
o instanceof u?(o=o.v,o instanceof t?c.push.apply(c,o.v):c.push(o)):o!=e&&(o instanceof t?s.push.apply(s,o.v):s.push(o))}var a,s=[],c=[]
if(r instanceof Array)for(a=0;a<r.length;++a)o()
else for(a in r)w(r,a)&&o()
return c.concat(s)},L.at_top=function(t){return new u(t)},L.splice=function(u){return new t(u)}
var e=L.skip={}}(),e.ast_walker=r,e.ast_mangle=a,e.ast_squeeze=d,e.ast_lift_variables=C,e.gen_code=g,e.ast_add_scope=o,e.set_logger=function(u){U=u},e.make_string=B,e.split_lines=y,e.MAP=L,e.ast_squeeze_more=u("./squeeze-more").ast_squeeze_more},{"./parse-js":40,"./squeeze-more":42}],42:[function(u,t,e){function r(u){function t(u,t){var e,n=r
return r=u,e=t(),r=n,e}function e(u,e,r){return[this[0],u,e,t(r.scope,o(a,r,s))]}var r,n=i.ast_walker(),s=n.walk
return n.with_walkers({toplevel:function(u){return[this[0],t(this.scope,o(a,u,s))]},function:e,defun:e,new:function(u,t){if("name"==u[0]){if("Array"==u[1]&&!r.has("Array"))return 1!=t.length?["array",t]:s(["call",["name","Array"],t])
if("Object"==u[1]&&!r.has("Object"))return t.length?s(["call",["name","Object"],t]):["object",[]]
if(("RegExp"==u[1]||"Function"==u[1]||"Error"==u[1])&&!r.has(u[1]))return s(["call",["name",u[1]],t])}},call:function(u,t){if("dot"==u[0]&&"string"==u[1][0]&&1==t.length&&(t[0][1]>0&&"substring"==u[2]||"substr"==u[2]))return["call",["dot",u[1],"slice"],t]
if("dot"==u[0]&&"toString"==u[2]&&0==t.length)return"string"==u[1][0]?u[1]:["binary","+",u[1],["string",""]]
if("name"==u[0]){if("Array"==u[1]&&1!=t.length&&!r.has("Array"))return["array",t]
if("Object"==u[1]&&!t.length&&!r.has("Object"))return["object",[]]
if("String"==u[1]&&!r.has("String"))return["binary","+",t[0],["string",""]]}}},function(){return s(i.ast_add_scope(u))})}var n=u("./parse-js"),i=u("./process"),o=(n.slice,n.member,n.curry),a=i.MAP
n.PRECEDENCE,n.OPERATORS
e.ast_squeeze_more=r},{"./parse-js":40,"./process":41}],43:[function(u,t,e){function r(u,t){t||(t={})
var e=r.parser,n=r.uglify,i=e.parse(u,t.strict_semicolons)
i=n.ast_mangle(i,t.mangle_options),i=n.ast_squeeze(i,t.squeeze_options)
var o=n.gen_code(i,t.gen_options)
return o}r.parser=u("./lib/parse-js"),r.uglify=u("./lib/process"),r.consolidator=u("./lib/consolidator"),t.exports=r},{"./lib/consolidator":39,"./lib/parse-js":40,"./lib/process":41}],44:[function(u,t,e){(function(){function u(t,e,r){if(t===e)return 0!==t||1/t==1/e
if(null==t||null==e)return t===e
if(t._chain&&(t=t._wrapped),e._chain&&(e=e._wrapped),t.isEqual&&b.isFunction(t.isEqual))return t.isEqual(e)
if(e.isEqual&&b.isFunction(e.isEqual))return e.isEqual(t)
var n=p.call(t)
if(n!=p.call(e))return!1
switch(n){case"[object String]":return t==String(e)
case"[object Number]":return t!=+t?e!=+e:0==t?1/t==1/e:t==+e
case"[object Date]":case"[object Boolean]":return+t==+e
case"[object RegExp]":return t.source==e.source&&t.global==e.global&&t.multiline==e.multiline&&t.ignoreCase==e.ignoreCase}if("object"!=typeof t||"object"!=typeof e)return!1
for(var i=r.length;i--;)if(r[i]==t)return!0
r.push(t)
var o=0,a=!0
if("[object Array]"==n){if(o=t.length,a=o==e.length)for(;o--&&(a=o in t==o in e&&u(t[o],e[o],r)););}else{if("constructor"in t!="constructor"in e||t.constructor!=e.constructor)return!1
for(var s in t)if(b.has(t,s)&&(o++,!(a=b.has(e,s)&&u(t[s],e[s],r))))break
if(a){for(s in e)if(b.has(e,s)&&!o--)break
a=!o}}return r.pop(),a}var r=this,n=r._,i={},o=Array.prototype,a=Object.prototype,s=Function.prototype,c=o.slice,l=o.unshift,p=a.toString,A=a.hasOwnProperty,f=o.forEach,h=o.map,E=o.reduce,F=o.reduceRight,C=o.filter,d=o.every,D=o.some,v=o.indexOf,B=o.lastIndexOf,m=Array.isArray,g=Object.keys,y=s.bind,b=function(u){return new I(u)}
"undefined"!=typeof e?("undefined"!=typeof t&&t.exports&&(e=t.exports=b),e._=b):r._=b,b.VERSION="1.3.3"
var _=b.each=b.forEach=function(u,t,e){if(null!=u)if(f&&u.forEach===f)u.forEach(t,e)
else if(u.length===+u.length){for(var r=0,n=u.length;r<n;r++)if(r in u&&t.call(e,u[r],r,u)===i)return}else for(var o in u)if(b.has(u,o)&&t.call(e,u[o],o,u)===i)return}
b.map=b.collect=function(u,t,e){var r=[]
return null==u?r:h&&u.map===h?u.map(t,e):(_(u,function(u,n,i){r[r.length]=t.call(e,u,n,i)}),u.length===+u.length&&(r.length=u.length),r)},b.reduce=b.foldl=b.inject=function(u,t,e,r){var n=arguments.length>2
if(null==u&&(u=[]),E&&u.reduce===E)return r&&(t=b.bind(t,r)),n?u.reduce(t,e):u.reduce(t)
if(_(u,function(u,i,o){n?e=t.call(r,e,u,i,o):(e=u,n=!0)}),!n)throw new TypeError("Reduce of empty array with no initial value")
return e},b.reduceRight=b.foldr=function(u,t,e,r){var n=arguments.length>2
if(null==u&&(u=[]),F&&u.reduceRight===F)return r&&(t=b.bind(t,r)),n?u.reduceRight(t,e):u.reduceRight(t)
var i=b.toArray(u).reverse()
return r&&!n&&(t=b.bind(t,r)),n?b.reduce(i,t,e,r):b.reduce(i,t)},b.find=b.detect=function(u,t,e){var r
return N(u,function(u,n,i){if(t.call(e,u,n,i))return r=u,!0}),r},b.filter=b.select=function(u,t,e){var r=[]
return null==u?r:C&&u.filter===C?u.filter(t,e):(_(u,function(u,n,i){t.call(e,u,n,i)&&(r[r.length]=u)}),r)},b.reject=function(u,t,e){var r=[]
return null==u?r:(_(u,function(u,n,i){t.call(e,u,n,i)||(r[r.length]=u)}),r)},b.every=b.all=function(u,t,e){var r=!0
return null==u?r:d&&u.every===d?u.every(t,e):(_(u,function(u,n,o){if(!(r=r&&t.call(e,u,n,o)))return i}),!!r)}
var N=b.some=b.any=function(u,t,e){t||(t=b.identity)
var r=!1
return null==u?r:D&&u.some===D?u.some(t,e):(_(u,function(u,n,o){if(r||(r=t.call(e,u,n,o)))return i}),!!r)}
b.include=b.contains=function(u,t){var e=!1
return null==u?e:v&&u.indexOf===v?u.indexOf(t)!=-1:e=N(u,function(u){return u===t})},b.invoke=function(u,t){var e=c.call(arguments,2)
return b.map(u,function(u){return(b.isFunction(t)?t||u:u[t]).apply(u,e)})},b.pluck=function(u,t){return b.map(u,function(u){return u[t]})},b.max=function(u,t,e){if(!t&&b.isArray(u)&&u[0]===+u[0])return Math.max.apply(Math,u)
if(!t&&b.isEmpty(u))return-(1/0)
var r={computed:-(1/0)}
return _(u,function(u,n,i){var o=t?t.call(e,u,n,i):u
o>=r.computed&&(r={value:u,computed:o})}),r.value},b.min=function(u,t,e){if(!t&&b.isArray(u)&&u[0]===+u[0])return Math.min.apply(Math,u)
if(!t&&b.isEmpty(u))return 1/0
var r={computed:1/0}
return _(u,function(u,n,i){var o=t?t.call(e,u,n,i):u
o<r.computed&&(r={value:u,computed:o})}),r.value},b.shuffle=function(u){var t,e=[]
return _(u,function(u,r,n){t=Math.floor(Math.random()*(r+1)),e[r]=e[t],e[t]=u}),e},b.sortBy=function(u,t,e){var r=b.isFunction(t)?t:function(u){return u[t]}
return b.pluck(b.map(u,function(u,t,n){return{value:u,criteria:r.call(e,u,t,n)}}).sort(function(u,t){var e=u.criteria,r=t.criteria
return void 0===e?1:void 0===r?-1:e<r?-1:e>r?1:0}),"value")},b.groupBy=function(u,t){var e={},r=b.isFunction(t)?t:function(u){return u[t]}
return _(u,function(u,t){var n=r(u,t);(e[n]||(e[n]=[])).push(u)}),e},b.sortedIndex=function(u,t,e){e||(e=b.identity)
for(var r=0,n=u.length;r<n;){var i=r+n>>1
e(u[i])<e(t)?r=i+1:n=i}return r},b.toArray=function(u){return u?b.isArray(u)?c.call(u):b.isArguments(u)?c.call(u):u.toArray&&b.isFunction(u.toArray)?u.toArray():b.values(u):[]},b.size=function(u){return b.isArray(u)?u.length:b.keys(u).length},b.first=b.head=b.take=function(u,t,e){return null==t||e?u[0]:c.call(u,0,t)},b.initial=function(u,t,e){return c.call(u,0,u.length-(null==t||e?1:t))},b.last=function(u,t,e){return null==t||e?u[u.length-1]:c.call(u,Math.max(u.length-t,0))},b.rest=b.tail=function(u,t,e){return c.call(u,null==t||e?1:t)},b.compact=function(u){return b.filter(u,function(u){return!!u})},b.flatten=function(u,t){return b.reduce(u,function(u,e){return b.isArray(e)?u.concat(t?e:b.flatten(e)):(u[u.length]=e,u)},[])},b.without=function(u){return b.difference(u,c.call(arguments,1))},b.uniq=b.unique=function(u,t,e){var r=e?b.map(u,e):u,n=[]
return u.length<3&&(t=!0),b.reduce(r,function(e,r,i){return(t?b.last(e)===r&&e.length:b.include(e,r))||(e.push(r),n.push(u[i])),e},[]),n},b.union=function(){return b.uniq(b.flatten(arguments,!0))},b.intersection=b.intersect=function(u){var t=c.call(arguments,1)
return b.filter(b.uniq(u),function(u){return b.every(t,function(t){return b.indexOf(t,u)>=0})})},b.difference=function(u){var t=b.flatten(c.call(arguments,1),!0)
return b.filter(u,function(u){return!b.include(t,u)})},b.zip=function(){for(var u=c.call(arguments),t=b.max(b.pluck(u,"length")),e=new Array(t),r=0;r<t;r++)e[r]=b.pluck(u,""+r)
return e},b.indexOf=function(u,t,e){if(null==u)return-1
var r,n
if(e)return r=b.sortedIndex(u,t),u[r]===t?r:-1
if(v&&u.indexOf===v)return u.indexOf(t)
for(r=0,n=u.length;r<n;r++)if(r in u&&u[r]===t)return r
return-1},b.lastIndexOf=function(u,t){if(null==u)return-1
if(B&&u.lastIndexOf===B)return u.lastIndexOf(t)
for(var e=u.length;e--;)if(e in u&&u[e]===t)return e
return-1},b.range=function(u,t,e){arguments.length<=1&&(t=u||0,u=0),e=arguments[2]||1
for(var r=Math.max(Math.ceil((t-u)/e),0),n=0,i=new Array(r);n<r;)i[n++]=u,u+=e
return i}
var w=function(){}
b.bind=function(u,t){var e,r
if(u.bind===y&&y)return y.apply(u,c.call(arguments,1))
if(!b.isFunction(u))throw new TypeError
return r=c.call(arguments,2),e=function(){if(!(this instanceof e))return u.apply(t,r.concat(c.call(arguments)))
w.prototype=u.prototype
var n=new w,i=u.apply(n,r.concat(c.call(arguments)))
return Object(i)===i?i:n}},b.bindAll=function(u){var t=c.call(arguments,1)
return 0==t.length&&(t=b.functions(u)),_(t,function(t){u[t]=b.bind(u[t],u)}),u},b.memoize=function(u,t){var e={}
return t||(t=b.identity),function(){var r=t.apply(this,arguments)
return b.has(e,r)?e[r]:e[r]=u.apply(this,arguments)}},b.delay=function(u,t){var e=c.call(arguments,2)
return setTimeout(function(){return u.apply(null,e)},t)},b.defer=function(u){return b.delay.apply(b,[u,1].concat(c.call(arguments,1)))},b.throttle=function(u,t){var e,r,n,i,o,a,s=b.debounce(function(){o=i=!1},t)
return function(){e=this,r=arguments
var c=function(){n=null,o&&u.apply(e,r),s()}
return n||(n=setTimeout(c,t)),i?o=!0:a=u.apply(e,r),s(),i=!0,a}},b.debounce=function(u,t,e){var r
return function(){var n=this,i=arguments,o=function(){r=null,e||u.apply(n,i)}
e&&!r&&u.apply(n,i),clearTimeout(r),r=setTimeout(o,t)}},b.once=function(u){var t,e=!1
return function(){return e?t:(e=!0,t=u.apply(this,arguments))}},b.wrap=function(u,t){return function(){var e=[u].concat(c.call(arguments,0))
return t.apply(this,e)}},b.compose=function(){var u=arguments
return function(){for(var t=arguments,e=u.length-1;e>=0;e--)t=[u[e].apply(this,t)]
return t[0]}},b.after=function(u,t){return u<=0?t():function(){if(--u<1)return t.apply(this,arguments)}},b.keys=g||function(u){if(u!==Object(u))throw new TypeError("Invalid object")
var t=[]
for(var e in u)b.has(u,e)&&(t[t.length]=e)
return t},b.values=function(u){return b.map(u,b.identity)},b.functions=b.methods=function(u){var t=[]
for(var e in u)b.isFunction(u[e])&&t.push(e)
return t.sort()},b.extend=function(u){return _(c.call(arguments,1),function(t){for(var e in t)u[e]=t[e]}),u},b.pick=function(u){var t={}
return _(b.flatten(c.call(arguments,1)),function(e){e in u&&(t[e]=u[e])}),t},b.defaults=function(u){return _(c.call(arguments,1),function(t){for(var e in t)null==u[e]&&(u[e]=t[e])}),u},b.clone=function(u){return b.isObject(u)?b.isArray(u)?u.slice():b.extend({},u):u},b.tap=function(u,t){return t(u),u},b.isEqual=function(t,e){return u(t,e,[])},b.isEmpty=function(u){if(null==u)return!0
if(b.isArray(u)||b.isString(u))return 0===u.length
for(var t in u)if(b.has(u,t))return!1
return!0},b.isElement=function(u){return!(!u||1!=u.nodeType)},b.isArray=m||function(u){return"[object Array]"==p.call(u)},b.isObject=function(u){return u===Object(u)},b.isArguments=function(u){return"[object Arguments]"==p.call(u)},b.isArguments(arguments)||(b.isArguments=function(u){return!(!u||!b.has(u,"callee"))}),b.isFunction=function(u){return"[object Function]"==p.call(u)},b.isString=function(u){return"[object String]"==p.call(u)},b.isNumber=function(u){return"[object Number]"==p.call(u)},b.isFinite=function(u){return b.isNumber(u)&&isFinite(u)},b.isNaN=function(u){return u!==u},b.isBoolean=function(u){return u===!0||u===!1||"[object Boolean]"==p.call(u)},b.isDate=function(u){return"[object Date]"==p.call(u)},b.isRegExp=function(u){return"[object RegExp]"==p.call(u)},b.isNull=function(u){return null===u},b.isUndefined=function(u){return void 0===u},b.has=function(u,t){return A.call(u,t)},b.noConflict=function(){return r._=n,this},b.identity=function(u){return u},b.times=function(u,t,e){for(var r=0;r<u;r++)t.call(e,r)},b.escape=function(u){return(""+u).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")},b.result=function(u,t){if(null==u)return null
var e=u[t]
return b.isFunction(e)?e.call(u):e},b.mixin=function(u){_(b.functions(u),function(t){U(t,b[t]=u[t])})}
var x=0
b.uniqueId=function(u){var t=x++
return u?u+t:t},b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g}
var S=/.^/,T={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"}
for(var R in T)T[T[R]]=R
var k=/\\|'|\r|\n|\t|\u2028|\u2029/g,P=/\\(\\|'|r|n|t|u2028|u2029)/g,O=function(u){return u.replace(P,function(u,t){return T[t]})}
b.template=function(u,t,e){e=b.defaults(e||{},b.templateSettings)
var r="__p+='"+u.replace(k,function(u){return"\\"+T[u]}).replace(e.escape||S,function(u,t){return"'+\n_.escape("+O(t)+")+\n'"}).replace(e.interpolate||S,function(u,t){return"'+\n("+O(t)+")+\n'"}).replace(e.evaluate||S,function(u,t){return"';\n"+O(t)+"\n;__p+='"})+"';\n"
e.variable||(r="with(obj||{}){\n"+r+"}\n"),r="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+r+"return __p;\n"
var n=new Function(e.variable||"obj","_",r)
if(t)return n(t,b)
var i=function(u){return n.call(this,u,b)}
return i.source="function("+(e.variable||"obj")+"){\n"+r+"}",i},b.chain=function(u){return b(u).chain()}
var I=function(u){this._wrapped=u}
b.prototype=I.prototype
var L=function(u,t){return t?b(u).chain():u},U=function(u,t){I.prototype[u]=function(){var u=c.call(arguments)
return l.call(u,this._wrapped),L(t.apply(b,u),this._chain)}}
b.mixin(b),_(["pop","push","reverse","shift","sort","splice","unshift"],function(u){var t=o[u]
I.prototype[u]=function(){var e=this._wrapped
t.apply(e,arguments)
var r=e.length
return"shift"!=u&&"splice"!=u||0!==r||delete e[0],L(e,this._chain)}}),_(["concat","join","slice"],function(u){var t=o[u]
I.prototype[u]=function(){return L(t.apply(this._wrapped,arguments),this._chain)}}),I.prototype.chain=function(){return this._chain=!0,this},I.prototype.value=function(){return this._wrapped}}).call(this)},{}],45:[function(u,t,e){!function(u,r){"object"==typeof e?t.exports=r():"function"==typeof define&&define.amd?define(r):u.unicodeRegExp=r()}(this,function(u){function t(u,t,e){return u||t?parseInt(u||t,16):e.charCodeAt(0)}function e(u){if(u>=32&&u<127)return String.fromCharCode(u)
var t=u.toString(16)
return"\\u"+"0000".slice(t.length)+t}var r={}
r.letter=/[A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]/,r.mark=/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u08FE\u0900-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1DC0-\u1DE6\u1DFC-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE26]/,r.number=/[0-9²³¹¼-¾٠-٩۰-۹߀-߉०-९০-৯৴-৹੦-੯૦-૯୦-୯୲-୷௦-௲౦-౯౸-౾೦-೯൦-൵๐-๙໐-໙༠-༳၀-၉႐-႙፩-፼ᛮ-ᛰ០-៩៰-៹᠐-᠙᥆-᥏᧐-᧚᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙⁰⁴-⁹₀-₉⅐-ↂↅ-↉①-⒛⓪-⓿❶-➓⳽〇〡-〩〸-〺㆒-㆕㈠-㈩㉈-㉏㉑-㉟㊀-㊉㊱-㊿꘠-꘩ꛦ-ꛯ꠰-꠵꣐-꣙꤀-꤉꧐-꧙꩐-꩙꯰-꯹０-９]/,r.punctuation=/[\u0021-\u0023\u0025-\u002A\u002C-\u002F\u003A\u003B\u003F\u0040\u005B-\u005D\u005F\u007B\u007D\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E3B\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,r.symbol=/[\u0024+<->\u005E`\u007C~¢-¦¨©¬®-±´¸×÷˂-˅˒-˟˥-˫˭˯-˿͵΄΅϶҂֏؆-؈؋؎؏۞۩۽۾߶৲৳৺৻૱୰௳-௺౿൹฿༁-༃༓༕-༗༚-༟༴༶༸྾-࿅࿇-࿌࿎࿏࿕-࿘႞႟᎐-᎙៛᥀᧞-᧿᭡-᭪᭴-᭼᾽᾿-῁῍-῏῝-῟῭-`´῾⁄⁒⁺-⁼₊-₌₠-₹℀℁℃-℆℈℉℔№-℘℞-℣℥℧℩℮℺℻⅀-⅄⅊-⅍⅏←-⌨⌫-⏳␀-␦⑀-⑊⒜-ⓩ─-⛿✁-❧➔-⟄⟇-⟥⟰-⦂⦙-⧗⧜-⧻⧾-⭌⭐-⭙⳥-⳪⺀-⺙⺛-⻳⼀-⿕⿰-⿻〄〒〓〠〶〷〾〿゛゜㆐㆑㆖-㆟㇀-㇣㈀-㈞㈪-㉇㉐㉠-㉿㊊-㊰㋀-㋾㌀-㏿䷀-䷿꒐-꓆꜀-꜖꜠꜡꞉꞊꠨-꠫꠶-꠹꩷-꩹﬩﮲-﯁﷼﷽﹢﹤-﹦﹩＄＋＜-＞＾｀｜～￠-￦￨-￮￼�]/,r.separator=/[\u0020\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,r.other=/[\u0000-\u001F\u007F-\u009F\u00AD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BA-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/
var n={L:r.letter,M:r.mark,N:r.number,P:r.punctuation,S:r.symbol,Z:r.separator,C:r.other,letter:r.letter,mark:r.mark,number:r.number,digit:r.number,punctuation:r.punctuation,symbol:r.symbol,separator:r.separator,other:r.other}
r.unicodePackageNameRegExp=new RegExp("^\\[\\:(\\^)?("+Object.keys(n).join("|")+")\\:\\]$"),r.expandCldrUnicodeSetIdToCharacterClass=function(u){return new RegExp(u.replace(r.unicodePackageNameRegExp,function(u,t,e){var r=n[e].source.replace(/^\[|\]$/g,"")
return"["+(t?"^"+r:r)+"]"}))},r.spliceCharacterClassRegExps=function(){var u=Array.prototype.slice.call(arguments)
return new RegExp("["+u.map(function(u){return u.source.replace(/^\[|\]$/g,"")}).join("")+"]")},r.visible=r.spliceCharacterClassRegExps(r.letter,r.mark,r.number,r.punctuation,r.symbol),r.printable=r.spliceCharacterClassRegExps(r.visible,r.separator)
var i=/(?:\\u([0-9a-f]{4})|\\x([0-9a-f]{2})|([^\-]))(?:-(?:\\u([0-9a-f]{4})|\\x([0-9a-f]{2})|([^\-])))?/gi
return r.removeCharacterFromCharacterClassRegExp=function(u,r){var n=r.charCodeAt(0)
return new RegExp("["+u.source.replace(/^\[|\]$/g,"").replace(i,function(u,r,i,o,a,s,c){var l=t(r,i,o)
if(a||s||c){var p=t(a,s,c)
return n===l?n+1<p?e(n+1)+"-"+e(p):e(p):n===p?l<n-1?e(l)+"-"+e(n-1):e(l):n>l&&n<p?e(l)+(n>l+1?"-"+e(n-1):"")+(n+1<p?e(n+1)+"-":"")+e(p):u}return n===l?"":e(l)})+"]")},r})},{}],46:[function(u,t,e){function r(u){this.options=u||{locator:{}}}function n(u,t,e){function r(t){var r=u[t]
if(!r)if(o)r=2==u.length?function(e){u(t,e)}:u
else for(var i=arguments.length;--i&&!(r=u[arguments[i]]););n[t]=r&&function(u){r(u+a(e))}||function(){}}if(!u){if(t instanceof i)return t
u=t}var n={},o=u instanceof Function
return e=e||{},r("warning","warn"),r("error","warn","warning"),r("fatalError","warn","warning","error"),n}function i(){this.cdata=!1}function o(u,t){t.lineNumber=u.lineNumber,t.columnNumber=u.columnNumber}function a(u){if(u)return"\n@"+(u.systemId||"")+"#[line:"+u.lineNumber+",col:"+u.columnNumber+"]"}function s(u,t,e){return"string"==typeof u?u.substr(t,e):u.length>=t+e||t?new java.lang.String(u,t,e)+"":u}function c(u,t){u.currentElement?u.currentElement.appendChild(t):u.document.appendChild(t)}if(r.prototype.parseFromString=function(u,t){var e=this.options,r=new l,o=e.domBuilder||new i,a=e.errorHandler,s=e.locator,c=e.xmlns||{},p={lt:"<",gt:">",amp:"&",quot:'"',apos:"'"}
return s&&o.setDocumentLocator(s),r.errorHandler=n(a,o,s),r.domBuilder=e.domBuilder||o,/\/x?html?$/.test(t)&&(p.nbsp=" ",p.copy="©",c[""]="http://www.w3.org/1999/xhtml"),u?r.parse(u,c,p):r.errorHandler.error("invalid document source"),o.document},i.prototype={startDocument:function(){this.document=(new p).createDocument(null,null,null),this.locator&&(this.document.documentURI=this.locator.systemId)},startElement:function(u,t,e,r){var n=this.document,i=n.createElementNS(u,e||t),a=r.length
c(this,i),this.currentElement=i,this.locator&&o(this.locator,i)
for(var s=0;s<a;s++){var u=r.getURI(s),l=r.getValue(s),e=r.getQName(s),p=n.createAttributeNS(u,e)
p.getOffset&&o(p.getOffset(1),p),p.value=p.nodeValue=l,i.setAttributeNode(p)}},endElement:function(u,t,e){var r=this.currentElement
r.tagName
this.currentElement=r.parentNode},startPrefixMapping:function(u,t){},endPrefixMapping:function(u){},processingInstruction:function(u,t){var e=this.document.createProcessingInstruction(u,t)
this.locator&&o(this.locator,e),c(this,e)},ignorableWhitespace:function(u,t,e){},characters:function(u,t,e){if(u=s.apply(this,arguments),this.currentElement&&u){if(this.cdata){var r=this.document.createCDATASection(u)
this.currentElement.appendChild(r)}else{var r=this.document.createTextNode(u)
this.currentElement.appendChild(r)}this.locator&&o(this.locator,r)}},skippedEntity:function(u){},endDocument:function(){this.document.normalize()},setDocumentLocator:function(u){(this.locator=u)&&(u.lineNumber=0)},comment:function(u,t,e){u=s.apply(this,arguments)
var r=this.document.createComment(u)
this.locator&&o(this.locator,r),c(this,r)},startCDATA:function(){this.cdata=!0},endCDATA:function(){this.cdata=!1},startDTD:function(u,t,e){var r=this.document.implementation
if(r&&r.createDocumentType){var n=r.createDocumentType(u,t,e)
this.locator&&o(this.locator,n),c(this,n)}},warning:function(u){console.warn(u,a(this.locator))},error:function(u){console.error(u,a(this.locator))},fatalError:function(u){throw console.error(u,a(this.locator)),u}},"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(u){i.prototype[u]=function(){return null}}),"function"==typeof u){var l=u("./sax").XMLReader,p=e.DOMImplementation=u("./dom").DOMImplementation
e.XMLSerializer=u("./dom").XMLSerializer,e.DOMParser=r}},{"./dom":47,"./sax":48}],47:[function(u,t,e){function r(u,t){for(var e in u)t[e]=u[e]}function n(u,t){function e(){}var n=u.prototype
if(Object.create){var i=Object.create(t.prototype)
n.__proto__=i}n instanceof t||(e.prototype=t.prototype,e=new e,r(n,e),u.prototype=n=e),n.constructor!=u&&("function"!=typeof u&&console.error("unknow Class:"+u),n.constructor=u)}function i(u,t){if(t instanceof Error)var e=t
else e=this,Error.call(this,ru[u]),this.message=ru[u],Error.captureStackTrace&&Error.captureStackTrace(this,i)
return e.code=u,t&&(this.message=this.message+": "+t),e}function o(){}function a(u,t){this._node=u,this._refresh=t,s(this)}function s(u){var t=u._node._inc||u._node.ownerDocument._inc
if(u._inc!=t){var e=u._refresh(u._node)
$(u,"length",e.length),r(e,u),u._inc=t}}function c(){}function l(u,t){for(var e=u.length;e--;)if(u[e]===t)return e}function p(u,t,e,r){if(r?t[l(t,r)]=e:t[t.length++]=e,u){e.ownerElement=u
var n=u.ownerDocument
n&&(r&&D(n,u,r),d(n,u,e))}}function A(u,t,e){var r=l(t,e)
if(!(r>=0))throw i(nu,new Error)
for(var n=t.length-1;r<n;)t[r]=t[++r]
if(t.length=n,u){var o=u.ownerDocument
o&&(D(o,u,e),e.ownerElement=null)}}function f(u){if(this._features={},u)for(var t in u)this._features=u[t]}function h(){}function E(u){return"<"==u&&"&lt;"||">"==u&&"&gt;"||"&"==u&&"&amp;"||'"'==u&&"&quot;"||"&#"+u.charCodeAt()+";"}function F(u,t){if(t(u))return!0
if(u=u.firstChild)do if(F(u,t))return!0
while(u=u.nextSibling)}function C(){}function d(u,t,e){u&&u._inc++
var r=e.namespaceURI
"http://www.w3.org/2000/xmlns/"==r&&(t._nsMap[e.prefix?e.localName:""]=e.value)}function D(u,t,e,r){u&&u._inc++
var n=e.namespaceURI
"http://www.w3.org/2000/xmlns/"==n&&delete t._nsMap[e.prefix?e.localName:""]}function v(u,t,e){if(u&&u._inc){u._inc++
var r=t.childNodes
if(e)r[r.length++]=e
else{for(var n=t.firstChild,i=0;n;)r[i++]=n,n=n.nextSibling
r.length=i}}}function B(u,t){var e=t.previousSibling,r=t.nextSibling
return e?e.nextSibling=r:u.firstChild=r,r?r.previousSibling=e:u.lastChild=e,v(u.ownerDocument,u),t}function m(u,t,e){var r=t.parentNode
if(r&&r.removeChild(t),t.nodeType===uu){var n=t.firstChild
if(null==n)return t
var i=t.lastChild}else n=i=t
var o=e?e.previousSibling:u.lastChild
n.previousSibling=o,i.nextSibling=e,o?o.nextSibling=n:u.firstChild=n,null==e?u.lastChild=i:e.previousSibling=i
do n.parentNode=u
while(n!==i&&(n=n.nextSibling))
return v(u.ownerDocument||u,u),t.nodeType==uu&&(t.firstChild=t.lastChild=null),t}function g(u,t){var e=t.parentNode
if(e){var r=u.lastChild
e.removeChild(t)
var r=u.lastChild}var r=u.lastChild
return t.parentNode=u,t.previousSibling=r,t.nextSibling=null,r?r.nextSibling=t:u.firstChild=t,u.lastChild=t,v(u.ownerDocument,u,t),t}function y(){this._nsMap={}}function b(){}function _(){}function N(){}function w(){}function x(){}function S(){}function T(){}function R(){}function k(){}function P(){}function O(){}function I(){}function L(u,t){switch(u.nodeType){case H:var e=u.attributes,r=e.length,n=u.firstChild,i=u.tagName,o=V===u.namespaceURI
t.push("<",i)
for(var a=0;a<r;a++)L(e.item(a),t,o)
if(n||o&&!/^(?:meta|link|img|br|hr|input)$/i.test(i)){if(t.push(">"),o&&/^script$/i.test(i))n&&t.push(n.data)
else for(;n;)L(n,t),n=n.nextSibling
t.push("</",i,">")}else t.push("/>")
return
case K:case uu:for(var n=u.firstChild;n;)L(n,t),n=n.nextSibling
return
case z:return t.push(" ",u.name,'="',u.value.replace(/[<&"]/g,E),'"')
case W:return t.push(u.data.replace(/[<&]/g,E))
case G:return t.push("<![CDATA[",u.data,"]]>")
case Q:return t.push("<!--",u.data,"-->")
case Z:var s=u.publicId,c=u.systemId
if(t.push("<!DOCTYPE ",u.name),s)t.push(' PUBLIC "',s),c&&"."!=c&&t.push('" "',c),t.push('">')
else if(c&&"."!=c)t.push(' SYSTEM "',c,'">')
else{var l=u.internalSubset
l&&t.push(" [",l,"]"),t.push(">")}return
case X:return t.push("<?",u.target," ",u.data,"?>")
case Y:return t.push("&",u.nodeName,";")
default:t.push("??",u.nodeName)}}function U(u,t,e){var r
switch(t.nodeType){case H:r=t.cloneNode(!1),r.ownerDocument=u
case uu:break
case z:e=!0}if(r||(r=t.cloneNode(!1)),r.ownerDocument=u,r.parentNode=null,e)for(var n=t.firstChild;n;)r.appendChild(U(u,n,e)),n=n.nextSibling
return r}function j(u,t,e){var r=new t.constructor
for(var n in t){var i=t[n]
"object"!=typeof i&&i!=r[n]&&(r[n]=i)}switch(t.childNodes&&(r.childNodes=new o),r.ownerDocument=u,r.nodeType){case H:var a=t.attributes,s=r.attributes=new c,l=a.length
s._ownerElement=r
for(var p=0;p<l;p++)r.setAttributeNode(j(u,a.item(p),!0))
break
case z:e=!0}if(e)for(var A=t.firstChild;A;)r.appendChild(j(u,A,e)),A=A.nextSibling
return r}function $(u,t,e){u[t]=e}function M(u){switch(u.nodeType){case 1:case 11:var t=[]
for(u=u.firstChild;u;)7!==u.nodeType&&8!==u.nodeType&&t.push(M(u)),u=u.nextSibling
return t.join("")
default:return u.nodeValue}}var V="http://www.w3.org/1999/xhtml",q={},H=q.ELEMENT_NODE=1,z=q.ATTRIBUTE_NODE=2,W=q.TEXT_NODE=3,G=q.CDATA_SECTION_NODE=4,Y=q.ENTITY_REFERENCE_NODE=5,J=q.ENTITY_NODE=6,X=q.PROCESSING_INSTRUCTION_NODE=7,Q=q.COMMENT_NODE=8,K=q.DOCUMENT_NODE=9,Z=q.DOCUMENT_TYPE_NODE=10,uu=q.DOCUMENT_FRAGMENT_NODE=11,tu=q.NOTATION_NODE=12,eu={},ru={},nu=(eu.INDEX_SIZE_ERR=(ru[1]="Index size error",1),eu.DOMSTRING_SIZE_ERR=(ru[2]="DOMString size error",2),eu.HIERARCHY_REQUEST_ERR=(ru[3]="Hierarchy request error",3),eu.WRONG_DOCUMENT_ERR=(ru[4]="Wrong document",4),eu.INVALID_CHARACTER_ERR=(ru[5]="Invalid character",5),eu.NO_DATA_ALLOWED_ERR=(ru[6]="No data allowed",6),eu.NO_MODIFICATION_ALLOWED_ERR=(ru[7]="No modification allowed",7),eu.NOT_FOUND_ERR=(ru[8]="Not found",8)),iu=(eu.NOT_SUPPORTED_ERR=(ru[9]="Not supported",9),eu.INUSE_ATTRIBUTE_ERR=(ru[10]="Attribute in use",10))
eu.INVALID_STATE_ERR=(ru[11]="Invalid state",11),eu.SYNTAX_ERR=(ru[12]="Syntax error",12),eu.INVALID_MODIFICATION_ERR=(ru[13]="Invalid modification",13),eu.NAMESPACE_ERR=(ru[14]="Invalid namespace",14),eu.INVALID_ACCESS_ERR=(ru[15]="Invalid access",15)
i.prototype=Error.prototype,r(eu,i),o.prototype={length:0,item:function(u){return this[u]||null}},a.prototype.item=function(u){return s(this),this[u]},n(a,o),c.prototype={length:0,item:o.prototype.item,getNamedItem:function(u){for(var t=this.length;t--;){var e=this[t]
if(e.nodeName==u)return e}},setNamedItem:function(u){var t=u.ownerElement
if(t&&t!=this._ownerElement)throw new i(iu)
var e=this.getNamedItem(u.nodeName)
return p(this._ownerElement,this,u,e),e},setNamedItemNS:function(u){var t,e=u.ownerElement
if(e&&e!=this._ownerElement)throw new i(iu)
return t=this.getNamedItemNS(u.namespaceURI,u.localName),p(this._ownerElement,this,u,t),t},removeNamedItem:function(u){var t=this.getNamedItem(u)
return A(this._ownerElement,this,t),t},removeNamedItemNS:function(u,t){var e=this.getNamedItemNS(u,t)
return A(this._ownerElement,this,e),e},getNamedItemNS:function(u,t){for(var e=this.length;e--;){var r=this[e]
if(r.localName==t&&r.namespaceURI==u)return r}return null}},f.prototype={hasFeature:function(u,t){var e=this._features[u.toLowerCase()]
return!(!e||t&&!(t in e))},createDocument:function(u,t,e){var r=new C
if(r.doctype=e,e&&r.appendChild(e),r.implementation=this,r.childNodes=new o,t){var n=r.createElementNS(u,t)
r.appendChild(n)}return r},createDocumentType:function(u,t,e){var r=new S
return r.name=u,r.nodeName=u,r.publicId=t,r.systemId=e,r}},h.prototype={firstChild:null,lastChild:null,previousSibling:null,nextSibling:null,attributes:null,parentNode:null,childNodes:null,ownerDocument:null,nodeValue:null,namespaceURI:null,prefix:null,localName:null,insertBefore:function(u,t){return m(this,u,t)},replaceChild:function(u,t){this.insertBefore(u,t),t&&this.removeChild(t)},removeChild:function(u){return B(this,u)},appendChild:function(u){return this.insertBefore(u,null)},hasChildNodes:function(){return null!=this.firstChild},cloneNode:function(u){return j(this.ownerDocument||this,this,u)},normalize:function(){for(var u=this.firstChild;u;){var t=u.nextSibling
t&&t.nodeType==W&&u.nodeType==W?(this.removeChild(t),u.appendData(t.data)):(u.normalize(),u=t)}},isSupported:function(u,t){return this.ownerDocument.implementation.hasFeature(u,t)},hasAttributes:function(){return this.attributes.length>0},lookupPrefix:function(u){for(var t=this;t;){var e=t._nsMap
if(e)for(var r in e)if(e[r]==u)return r
t=2==t.nodeType?t.ownerDocument:t.parentNode}return null},lookupNamespaceURI:function(u){for(var t=this;t;){var e=t._nsMap
if(e&&u in e)return e[u]
t=2==t.nodeType?t.ownerDocument:t.parentNode}return null},isDefaultNamespace:function(u){var t=this.lookupPrefix(u)
return null==t}},r(q,h),r(q,h.prototype),C.prototype={nodeName:"#document",nodeType:K,doctype:null,documentElement:null,_inc:1,insertBefore:function(u,t){if(u.nodeType==uu){for(var e=u.firstChild;e;){var r=e.nextSibling
this.insertBefore(e,t),e=r}return u}return null==this.documentElement&&1==u.nodeType&&(this.documentElement=u),m(this,u,t),u.ownerDocument=this,u},removeChild:function(u){return this.documentElement==u&&(this.documentElement=null),B(this,u)},importNode:function(u,t){return U(this,u,t)},getElementById:function(u){var t=null
return F(this.documentElement,function(e){if(1==e.nodeType&&e.getAttribute("id")==u)return t=e,!0}),t},createElement:function(u){var t=new y
t.ownerDocument=this,t.nodeName=u,t.tagName=u,t.childNodes=new o
var e=t.attributes=new c
return e._ownerElement=t,t},createDocumentFragment:function(){var u=new P
return u.ownerDocument=this,u.childNodes=new o,u},createTextNode:function(u){var t=new N
return t.ownerDocument=this,t.appendData(u),t},createComment:function(u){var t=new w
return t.ownerDocument=this,t.appendData(u),t},createCDATASection:function(u){var t=new x
return t.ownerDocument=this,t.appendData(u),t},createProcessingInstruction:function(u,t){var e=new O
return e.ownerDocument=this,e.tagName=e.target=u,e.nodeValue=e.data=t,e},createAttribute:function(u){var t=new b
return t.ownerDocument=this,t.name=u,t.nodeName=u,t.localName=u,t.specified=!0,t},createEntityReference:function(u){var t=new k
return t.ownerDocument=this,t.nodeName=u,t},createElementNS:function(u,t){var e=new y,r=t.split(":"),n=e.attributes=new c
return e.childNodes=new o,e.ownerDocument=this,e.nodeName=t,e.tagName=t,e.namespaceURI=u,2==r.length?(e.prefix=r[0],e.localName=r[1]):e.localName=t,n._ownerElement=e,e},createAttributeNS:function(u,t){var e=new b,r=t.split(":")
return e.ownerDocument=this,e.nodeName=t,e.name=t,e.namespaceURI=u,e.specified=!0,2==r.length?(e.prefix=r[0],e.localName=r[1]):e.localName=t,e}},n(C,h),y.prototype={nodeType:H,hasAttribute:function(u){return null!=this.getAttributeNode(u)},getAttribute:function(u){var t=this.getAttributeNode(u)
return t&&t.value||""},getAttributeNode:function(u){return this.attributes.getNamedItem(u)},setAttribute:function(u,t){var e=this.ownerDocument.createAttribute(u)
e.value=e.nodeValue=""+t,this.setAttributeNode(e)},removeAttribute:function(u){var t=this.getAttributeNode(u)
t&&this.removeAttributeNode(t)},appendChild:function(u){return u.nodeType===uu?this.insertBefore(u,null):g(this,u)},setAttributeNode:function(u){return this.attributes.setNamedItem(u)},setAttributeNodeNS:function(u){return this.attributes.setNamedItemNS(u)},removeAttributeNode:function(u){return this.attributes.removeNamedItem(u.nodeName)},removeAttributeNS:function(u,t){var e=this.getAttributeNodeNS(u,t)
e&&this.removeAttributeNode(e)},hasAttributeNS:function(u,t){return null!=this.getAttributeNodeNS(u,t)},getAttributeNS:function(u,t){var e=this.getAttributeNodeNS(u,t)
return e&&e.value||""},setAttributeNS:function(u,t,e){var r=this.ownerDocument.createAttributeNS(u,t)
r.value=r.nodeValue=e,this.setAttributeNode(r)},getAttributeNodeNS:function(u,t){return this.attributes.getNamedItemNS(u,t)},getElementsByTagName:function(u){return new a(this,function(t){var e=[]
return F(t,function(r){r===t||r.nodeType!=H||"*"!==u&&r.tagName!=u||e.push(r)}),e})},getElementsByTagNameNS:function(u,t){return new a(this,function(e){var r=[]
return F(e,function(n){n===e||n.nodeType!==H||n.namespaceURI!==u||"*"!==t&&n.localName!=t||r.push(n)}),r})}},C.prototype.getElementsByTagName=y.prototype.getElementsByTagName,C.prototype.getElementsByTagNameNS=y.prototype.getElementsByTagNameNS,n(y,h),b.prototype.nodeType=z,n(b,h),_.prototype={data:"",substringData:function(u,t){return this.data.substring(u,u+t)},appendData:function(u){u=this.data+u,this.nodeValue=this.data=u,this.length=u.length},insertData:function(u,t){this.replaceData(u,0,t)},appendChild:function(u){throw new Error(ru[3])},deleteData:function(u,t){this.replaceData(u,t,"")},replaceData:function(u,t,e){var r=this.data.substring(0,u),n=this.data.substring(u+t)
e=r+e+n,this.nodeValue=this.data=e,this.length=e.length}},n(_,h),N.prototype={nodeName:"#text",nodeType:W,splitText:function(u){var t=this.data,e=t.substring(u)
t=t.substring(0,u),this.data=this.nodeValue=t,this.length=t.length
var r=this.ownerDocument.createTextNode(e)
return this.parentNode&&this.parentNode.insertBefore(r,this.nextSibling),r}},n(N,_),w.prototype={nodeName:"#comment",nodeType:Q},n(w,_),x.prototype={nodeName:"#cdata-section",nodeType:G},n(x,_),S.prototype.nodeType=Z,n(S,h),T.prototype.nodeType=tu,n(T,h),R.prototype.nodeType=J,n(R,h),k.prototype.nodeType=Y,n(k,h),P.prototype.nodeName="#document-fragment",P.prototype.nodeType=uu,n(P,h),O.prototype.nodeType=X,n(O,h),I.prototype.serializeToString=function(u){var t=[]
return L(u,t),t.join("")},h.prototype.toString=function(){return I.prototype.serializeToString(this)}
try{Object.defineProperty&&(Object.defineProperty(a.prototype,"length",{get:function(){return s(this),this.$$length}}),Object.defineProperty(h.prototype,"textContent",{get:function(){return M(this)},set:function(u){switch(this.nodeType){case 1:case 11:for(;this.firstChild;)this.removeChild(this.firstChild);(u||String(u))&&this.appendChild(this.ownerDocument.createTextNode(u))
break
default:this.data=u,this.value=value,this.nodeValue=u}}}),$=function(u,t,e){u["$$"+t]=e})}catch(u){}"function"==typeof u&&(e.DOMImplementation=f,e.XMLSerializer=I)},{}],48:[function(u,t,e){function r(){}function n(u,t,e,r,n){function l(u){if(u>65535){u-=65536
var t=55296+(u>>10),e=56320+(1023&u)
return String.fromCharCode(t,e)}return String.fromCharCode(u)}function h(u){var t=u.slice(1,-1)
return t in e?e[t]:"#"===t.charAt(0)?l(parseInt(t.substr(1).replace("x","0x"))):(n.error("entity not found:"+u),u)}function E(t){var e=u.substring(g,t).replace(/&#?\w+;/g,h)
v&&F(g),r.characters(e,0,t-g),g=t}function F(t,e){for(;t>=d&&(e=D.exec(u));)C=e.index,d=C+e[0].length,v.lineNumber++
v.columnNumber=t-C+1}for(var C=0,d=0,D=/.+(?:\r\n?|\n)|.*$/g,v=r.locator,B=[{currentNSMap:t}],m={},g=0;;){var y=u.indexOf("<",g)
if(y<0){if(!u.substr(g).match(/^\s*$/)){var b=r.document,_=b.createTextNode(u.substr(g))
b.appendChild(_),r.currentElement=_}return}switch(y>g&&E(y),u.charAt(y+1)){case"/":var N=u.indexOf(">",y+3),w=u.substring(y+2,N),x=B.pop(),S=x.localNSMap
if(x.tagName!=w&&n.fatalError("end tag name: "+w+" is not match the current start tagName:"+x.tagName),r.endElement(x.uri,x.localName,w),S)for(var T in S)r.endPrefixMapping(T)
N++
break
case"?":v&&F(y),N=A(u,y,r)
break
case"!":v&&F(y),N=p(u,y,r,n)
break
default:try{v&&F(y)
var R=new f,N=o(u,y,R,h,n),k=R.length
if(k&&v){for(var P=i(v,{}),y=0;y<k;y++){var O=R[y]
F(O.offset),O.offset=i(v,{})}i(P,v)}!R.closed&&c(u,N,R.tagName,m)&&(R.closed=!0,e.nbsp||n.warning("unclosed xml attribute")),a(R,r,B),"http://www.w3.org/1999/xhtml"!==R.uri||R.closed?N++:N=s(u,N,R.tagName,h,r)}catch(u){n.error("element parse error: "+u),N=-1}}N<0?E(y+1):g=N}}function i(u,t){return t.lineNumber=u.lineNumber,t.columnNumber=u.columnNumber,t}function o(u,t,e,r,n){for(var i,o,a=++t,s=D;;){var c=u.charAt(a)
switch(c){case"=":if(s===v)i=u.slice(t,a),s=m
else{if(s!==B)throw new Error("attribute equal must after attrName")
s=m}break
case"'":case'"':if(s===m){if(t=a+1,a=u.indexOf(c,t),!(a>0))throw new Error("attribute value no end '"+c+"' match")
o=u.slice(t,a).replace(/&#?\w+;/g,r),e.add(i,o,t-1),s=y}else{if(s!=g)throw new Error('attribute value must after "="')
o=u.slice(t,a).replace(/&#?\w+;/g,r),e.add(i,o,t),n.warning('attribute "'+i+'" missed start quot('+c+")!!"),t=a+1,s=y}break
case"/":switch(s){case D:e.setTagName(u.slice(t,a))
case y:case b:case _:s=_,e.closed=!0
case g:case v:case B:break
default:throw new Error("attribute invalid close char('/')")}break
case"":n.error("unexpected end of input")
case">":switch(s){case D:e.setTagName(u.slice(t,a))
case y:case b:case _:break
case g:case v:o=u.slice(t,a),"/"===o.slice(-1)&&(e.closed=!0,o=o.slice(0,-1))
case B:s===B&&(o=i),s==g?(n.warning('attribute "'+o+'" missed quot(")!!'),e.add(i,o.replace(/&#?\w+;/g,r),t)):(n.warning('attribute "'+o+'" missed value!! "'+o+'" instead!!'),e.add(o,o,t))
break
case m:throw new Error("attribute value missed!!")}return a
case"":c=" "
default:if(c<=" ")switch(s){case D:e.setTagName(u.slice(t,a)),s=b
break
case v:i=u.slice(t,a),s=B
break
case g:var o=u.slice(t,a).replace(/&#?\w+;/g,r)
n.warning('attribute "'+o+'" missed quot(")!!'),e.add(i,o,t)
case y:s=b}else switch(s){case B:n.warning('attribute "'+i+'" missed value!! "'+i+'" instead!!'),e.add(i,i,t),t=a,s=v
break
case y:n.warning('attribute space is required"'+i+'"!!')
case b:s=v,t=a
break
case m:s=g,t=a
break
case _:throw new Error("elements closed character '/' and '>' must be connected to")}}a++}}function a(u,t,e){for(var r=u.tagName,n=null,i=e[e.length-1].currentNSMap,o=u.length;o--;){var a=u[o],s=a.qName,c=a.value,p=s.indexOf(":")
if(p>0)var A=a.prefix=s.slice(0,p),f=s.slice(p+1),h="xmlns"===A&&f
else f=s,A=null,h="xmlns"===s&&""
a.localName=f,h!==!1&&(null==n&&(n={},l(i,i={})),i[h]=n[h]=c,a.uri="http://www.w3.org/2000/xmlns/",t.startPrefixMapping(h,c))}for(var o=u.length;o--;){a=u[o]
var A=a.prefix
A&&("xml"===A&&(a.uri="http://www.w3.org/XML/1998/namespace"),"xmlns"!==A&&(a.uri=i[A]))}var p=r.indexOf(":")
p>0?(A=u.prefix=r.slice(0,p),f=u.localName=r.slice(p+1)):(A=null,f=u.localName=r)
var E=u.uri=i[A||""]
if(t.startElement(E,f,r,u),u.closed){if(t.endElement(E,f,r),n)for(A in n)t.endPrefixMapping(A)}else u.currentNSMap=i,u.localNSMap=n,e.push(u)}function s(u,t,e,r,n){if(/^(?:script|textarea)$/i.test(e)){var i=u.indexOf("</"+e+">",t),o=u.substring(t+1,i)
if(/[&<]/.test(o))return/^script$/i.test(e)?(n.characters(o,0,o.length),i):(o=o.replace(/&#?\w+;/g,r),n.characters(o,0,o.length),i)}return t+1}function c(u,t,e,r){var n=r[e]
return null==n&&(n=r[e]=u.lastIndexOf("</"+e+">")),n<t}function l(u,t){for(var e in u)t[e]=u[e]}function p(u,t,e,r){var n=u.charAt(t+2)
switch(n){case"-":if("-"===u.charAt(t+3)){var i=u.indexOf("-->",t+4)
return i>t?(e.comment(u,t+4,i-t-4),i+3):(r.error("Unclosed comment"),-1)}return-1
default:if("CDATA["==u.substr(t+3,6)){var i=u.indexOf("]]>",t+9)
return e.startCDATA(),e.characters(u,t+9,i-t-9),e.endCDATA(),i+3}var o=E(u,t),a=o.length
if(a>1&&/!doctype/i.test(o[0][0])){var s=o[1][0],c=a>3&&/^public$/i.test(o[2][0])&&o[3][0],l=a>4&&o[4][0],p=o[a-1]
return e.startDTD(s,c&&c.replace(/^(['"])(.*?)\1$/,"$2"),l&&l.replace(/^(['"])(.*?)\1$/,"$2")),e.endDTD(),p.index+p[0].length}}return-1}function A(u,t,e){var r=u.indexOf("?>",t)
if(r){var n=u.substring(t,r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/)
if(n){n[0].length
return e.processingInstruction(n[1],n[2]),r+2}return-1}return-1}function f(u){}function h(u,t){return u.__proto__=t,u}function E(u,t){var e,r=[],n=/'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g
for(n.lastIndex=t,n.exec(u);e=n.exec(u);)if(r.push(e),e[1])return r}var F=/[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,C=new RegExp("[\\-\\.0-9"+F.source.slice(1,-1)+"·̀-ͯ\\ux203F-⁀]"),d=new RegExp("^"+F.source+C.source+"*(?::"+F.source+C.source+"*)?$"),D=0,v=1,B=2,m=3,g=4,y=5,b=6,_=7
r.prototype={parse:function(u,t,e){var r=this.domBuilder
r.startDocument(),l(t,t={}),n(u,t,e,r,this.errorHandler),r.endDocument()}},f.prototype={setTagName:function(u){if(!d.test(u))throw new Error("invalid tagName:"+u)
this.tagName=u},add:function(u,t,e){if(!d.test(u))throw new Error("invalid attribute:"+u)
this[this.length++]={qName:u,value:t,offset:e}},length:0,getLocalName:function(u){return this[u].localName},getOffset:function(u){return this[u].offset},getQName:function(u){return this[u].qName},getURI:function(u){return this[u].uri},getValue:function(u){return this[u].value}},h({},h.prototype)instanceof h||(h=function(u,t){function e(){}e.prototype=t,e=new e
for(t in u)e[t]=u[t]
return e}),"function"==typeof u&&(e.XMLReader=r)},{}],49:[function(u,t,e){"undefined"==typeof e&&(xpath={}),function(u){function t(){this.init()}function e(u){this.expression=u}function r(){}function n(u){arguments.length>0&&this.init(u)}function i(u){arguments.length>0&&this.init(u)}function o(u,t){arguments.length>0&&this.init(u,t)}function a(u,t){arguments.length>0&&this.init(u,t)}function s(u,t){arguments.length>0&&this.init(u,t)}function c(u,t){arguments.length>0&&this.init(u,t)}function l(u,t){arguments.length>0&&this.init(u,t)}function p(u,t){arguments.length>0&&this.init(u,t)}function A(u,t){arguments.length>0&&this.init(u,t)}function f(u,t){arguments.length>0&&this.init(u,t)}function h(u,t){arguments.length>0&&this.init(u,t)}function E(u,t){arguments.length>0&&this.init(u,t)}function F(u,t){arguments.length>0&&this.init(u,t)}function C(u,t){arguments.length>0&&this.init(u,t)}function d(u,t){arguments.length>0&&this.init(u,t)}function D(u,t){arguments.length>0&&this.init(u,t)}function v(u,t){arguments.length>0&&this.init(u,t)}function B(u,t,e){arguments.length>0&&this.init(u,t,e)}function m(u,t){arguments.length>0&&this.init(u,t)}function g(u,t,e){arguments.length>0&&this.init(u,t,e)}function y(u,t){arguments.length>0&&this.init(u,t)}function b(u){arguments.length>0&&this.init(u)}function _(u,t){arguments.length>0&&this.init(u,t)}function N(u){arguments.length>0&&this.init(u)}function w(u){arguments.length>0&&this.init(u)}function x(u){arguments.length>0&&this.init(u)}function S(u){this.init(u)}function T(){this.init()}function R(u,t,e){this.isXPathNamespace=!0,this.ownerDocument=e.ownerDocument,this.nodeName="#namespace",this.prefix=u,this.localName=u,this.namespaceURI=t,this.nodeValue=t,this.ownerElement=e,this.nodeType=R.XPATH_NAMESPACE_NODE}function k(u,t,e){this.variableResolver=null!=u?u:new P,this.namespaceResolver=null!=t?t:new I,this.functionResolver=null!=e?e:new O}function P(){}function O(u){this.thisArg=null!=u?u:Functions,this.functions=new Object,this.addStandardFunctions()}function I(){}function L(u,t){this.code=u,this.exception=t}function U(u,t,e){this.xpath=e.parse(u),this.context=new k,this.context.namespaceResolver=new j(t)}function j(u){this.xpathNSResolver=u}function $(u){this.node=u,this.namespaceResolver=new I}function M(u,t){switch(t==M.ANY_TYPE&&(u.constructor===N?t=M.STRING_TYPE:u.constructor===w?t=M.NUMBER_TYPE:u.constructor===x?t=M.BOOLEAN_TYPE:u.constructor===T&&(t=M.UNORDERED_NODE_ITERATOR_TYPE)),this.resultType=t,t){case M.NUMBER_TYPE:return void(this.numberValue=u.numberValue())
case M.STRING_TYPE:return void(this.stringValue=u.stringValue())
case M.BOOLEAN_TYPE:return void(this.booleanValue=u.booleanValue())
case M.ANY_UNORDERED_NODE_TYPE:case M.FIRST_ORDERED_NODE_TYPE:if(u.constructor===T)return void(this.singleNodeValue=u.first())
break
case M.UNORDERED_NODE_ITERATOR_TYPE:case M.ORDERED_NODE_ITERATOR_TYPE:if(u.constructor===T)return this.invalidIteratorState=!1,this.nodes=u.toArray(),void(this.iteratorIndex=0)
break
case M.UNORDERED_NODE_SNAPSHOT_TYPE:case M.ORDERED_NODE_SNAPSHOT_TYPE:if(u.constructor===T)return this.nodes=u.toArray(),void(this.snapshotLength=this.nodes.length)}throw new L(L.TYPE_ERR)}function V(u,t){u.createExpression=function(u,e){try{return new U(u,e,t)}catch(u){throw new L(L.INVALID_EXPRESSION_ERR,u)}},u.createNSResolver=function(u){return new $(u)},u.evaluate=function(e,r,n,i,o){if(i<0||i>9)throw{code:0,toString:function(){return"Request type not supported"}}
return u.createExpression(e,n,t).evaluate(r,i,o)}}t.prototype=new Object,t.prototype.constructor=t,t.superclass=Object.prototype,t.prototype.init=function(){this.reduceActions=[],this.reduceActions[3]=function(u){return new a(u[0],u[2])},this.reduceActions[5]=function(u){return new s(u[0],u[2])},this.reduceActions[7]=function(u){return new c(u[0],u[2])},this.reduceActions[8]=function(u){return new l(u[0],u[2])},this.reduceActions[10]=function(u){return new p(u[0],u[2])},this.reduceActions[11]=function(u){return new A(u[0],u[2])},this.reduceActions[12]=function(u){return new f(u[0],u[2])},this.reduceActions[13]=function(u){return new h(u[0],u[2])},this.reduceActions[15]=function(u){return new E(u[0],u[2])},this.reduceActions[16]=function(u){return new F(u[0],u[2])},this.reduceActions[18]=function(u){return new C(u[0],u[2])},this.reduceActions[19]=function(u){return new d(u[0],u[2])},this.reduceActions[20]=function(u){return new D(u[0],u[2])},this.reduceActions[22]=function(u){return new i(u[1])},this.reduceActions[24]=function(u){return new v(u[0],u[2])},this.reduceActions[25]=function(u){return new B(void 0,void 0,u[0])},this.reduceActions[27]=function(u){return u[0].locationPath=u[2],u[0]},this.reduceActions[28]=function(u){return u[0].locationPath=u[2],u[0].locationPath.steps.unshift(new g(g.DESCENDANTORSELF,new y(y.NODE,void 0),[])),u[0]},this.reduceActions[29]=function(u){return new B(u[0],[],void 0)},this.reduceActions[30]=function(u){return Utilities.instance_of(u[0],B)?(void 0==u[0].filterPredicates&&(u[0].filterPredicates=[]),u[0].filterPredicates.push(u[1]),u[0]):new B(u[0],[u[1]],void 0)},this.reduceActions[32]=function(u){return u[1]},this.reduceActions[33]=function(u){return new N(u[0])},this.reduceActions[34]=function(u){return new w(u[0])},this.reduceActions[36]=function(u){return new _(u[0],[])},this.reduceActions[37]=function(u){return new _(u[0],u[2])},this.reduceActions[38]=function(u){return[u[0]]},this.reduceActions[39]=function(u){return u[2].unshift(u[0]),u[2]},this.reduceActions[43]=function(u){return new m(!0,[])},this.reduceActions[44]=function(u){return u[1].absolute=!0,u[1]},this.reduceActions[46]=function(u){return new m(!1,[u[0]])},this.reduceActions[47]=function(u){return u[0].steps.push(u[2]),u[0]},this.reduceActions[49]=function(u){return new g(u[0],u[1],[])},this.reduceActions[50]=function(u){return new g(g.CHILD,u[0],[])},this.reduceActions[51]=function(u){return new g(u[0],u[1],u[2])},this.reduceActions[52]=function(u){return new g(g.CHILD,u[0],u[1])},this.reduceActions[54]=function(u){return[u[0]]},this.reduceActions[55]=function(u){return u[1].unshift(u[0]),u[1]},this.reduceActions[56]=function(u){return"ancestor"==u[0]?g.ANCESTOR:"ancestor-or-self"==u[0]?g.ANCESTORORSELF:"attribute"==u[0]?g.ATTRIBUTE:"child"==u[0]?g.CHILD:"descendant"==u[0]?g.DESCENDANT:"descendant-or-self"==u[0]?g.DESCENDANTORSELF:"following"==u[0]?g.FOLLOWING:"following-sibling"==u[0]?g.FOLLOWINGSIBLING:"namespace"==u[0]?g.NAMESPACE:"parent"==u[0]?g.PARENT:"preceding"==u[0]?g.PRECEDING:"preceding-sibling"==u[0]?g.PRECEDINGSIBLING:"self"==u[0]?g.SELF:-1},this.reduceActions[57]=function(u){return g.ATTRIBUTE},this.reduceActions[59]=function(u){return"comment"==u[0]?new y(y.COMMENT,void 0):"text"==u[0]?new y(y.TEXT,void 0):"processing-instruction"==u[0]?new y(y.PI,void 0):"node"==u[0]?new y(y.NODE,void 0):new y(-1,void 0)},this.reduceActions[60]=function(u){return new y(y.PI,u[2])},this.reduceActions[61]=function(u){return u[1]},this.reduceActions[63]=function(u){return u[1].absolute=!0,u[1].steps.unshift(new g(g.DESCENDANTORSELF,new y(y.NODE,void 0),[])),u[1]},this.reduceActions[64]=function(u){return u[0].steps.push(new g(g.DESCENDANTORSELF,new y(y.NODE,void 0),[])),u[0].steps.push(u[2]),u[0]},this.reduceActions[65]=function(u){return new g(g.SELF,new y(y.NODE,void 0),[])},this.reduceActions[66]=function(u){return new g(g.PARENT,new y(y.NODE,void 0),[])},this.reduceActions[67]=function(u){return new b(u[1])},this.reduceActions[68]=function(u){return new y(y.NAMETESTANY,void 0)},this.reduceActions[69]=function(u){var t=u[0].substring(0,u[0].indexOf(":"))
return new y(y.NAMETESTPREFIXANY,t)},this.reduceActions[70]=function(u){return new y(y.NAMETESTQNAME,u[0])}},t.actionTable=[" s s        sssssssss    s ss  s  ss","                 s                  ","r  rrrrrrrrr         rrrrrrr rr  r  ","                rrrrr               "," s s        sssssssss    s ss  s  ss","rs  rrrrrrrr s  sssssrrrrrr  rrs rs "," s s        sssssssss    s ss  s  ss","                            s       ","                            s       ","r  rrrrrrrrr         rrrrrrr rr rr  ","r  rrrrrrrrr         rrrrrrr rr rr  ","r  rrrrrrrrr         rrrrrrr rr rr  ","r  rrrrrrrrr         rrrrrrr rr rr  ","r  rrrrrrrrr         rrrrrrr rr rr  ","  s                                 ","                            s       "," s           s  sssss          s  s ","r  rrrrrrrrr         rrrrrrr rr  r  ","a                                   ","r       s                    rr  r  ","r      sr                    rr  r  ","r   s  rr            s       rr  r  ","r   rssrr            rss     rr  r  ","r   rrrrr            rrrss   rr  r  ","r   rrrrrsss         rrrrr   rr  r  ","r   rrrrrrrr         rrrrr   rr  r  ","r   rrrrrrrr         rrrrrs  rr  r  ","r   rrrrrrrr         rrrrrr  rr  r  ","r   rrrrrrrr         rrrrrr  rr  r  ","r  srrrrrrrr         rrrrrrs rr sr  ","r  srrrrrrrr         rrrrrrs rr  r  ","r  rrrrrrrrr         rrrrrrr rr rr  ","r  rrrrrrrrr         rrrrrrr rr rr  ","r  rrrrrrrrr         rrrrrrr rr rr  ","r   rrrrrrrr         rrrrrr  rr  r  ","r   rrrrrrrr         rrrrrr  rr  r  ","r  rrrrrrrrr         rrrrrrr rr  r  ","r  rrrrrrrrr         rrrrrrr rr  r  ","                sssss               ","r  rrrrrrrrr         rrrrrrr rr sr  ","r  rrrrrrrrr         rrrrrrr rr  r  ","r  rrrrrrrrr         rrrrrrr rr rr  ","r  rrrrrrrrr         rrrrrrr rr rr  ","                             s      ","r  srrrrrrrr         rrrrrrs rr  r  ","r   rrrrrrrr         rrrrr   rr  r  ","              s                     ","                             s      ","                rrrrr               "," s s        sssssssss    s sss s  ss","r  srrrrrrrr         rrrrrrs rr  r  "," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss    s ss  s  ss"," s s        sssssssss      ss  s  ss"," s s        sssssssss    s ss  s  ss"," s           s  sssss          s  s "," s           s  sssss          s  s ","r  rrrrrrrrr         rrrrrrr rr rr  "," s           s  sssss          s  s "," s           s  sssss          s  s ","r  rrrrrrrrr         rrrrrrr rr sr  ","r  rrrrrrrrr         rrrrrrr rr sr  ","r  rrrrrrrrr         rrrrrrr rr  r  ","r  rrrrrrrrr         rrrrrrr rr rr  ","                             s      ","r  rrrrrrrrr         rrrrrrr rr rr  ","r  rrrrrrrrr         rrrrrrr rr rr  ","                             rr     ","                             s      ","                             rs     ","r      sr                    rr  r  ","r   s  rr            s       rr  r  ","r   rssrr            rss     rr  r  ","r   rssrr            rss     rr  r  ","r   rrrrr            rrrss   rr  r  ","r   rrrrr            rrrss   rr  r  ","r   rrrrr            rrrss   rr  r  ","r   rrrrr            rrrss   rr  r  ","r   rrrrrsss         rrrrr   rr  r  ","r   rrrrrsss         rrrrr   rr  r  ","r   rrrrrrrr         rrrrr   rr  r  ","r   rrrrrrrr         rrrrr   rr  r  ","r   rrrrrrrr         rrrrr   rr  r  ","r   rrrrrrrr         rrrrrr  rr  r  ","                                 r  ","                                 s  ","r  srrrrrrrr         rrrrrrs rr  r  ","r  srrrrrrrr         rrrrrrs rr  r  ","r  rrrrrrrrr         rrrrrrr rr  r  ","r  rrrrrrrrr         rrrrrrr rr  r  ","r  rrrrrrrrr         rrrrrrr rr  r  ","r  rrrrrrrrr         rrrrrrr rr  r  ","r  rrrrrrrrr         rrrrrrr rr rr  ","r  rrrrrrrrr         rrrrrrr rr rr  "," s s        sssssssss    s ss  s  ss","r  rrrrrrrrr         rrrrrrr rr rr  ","                             r      "],t.actionTableNumber=[" 1 0        /.-,+*)('    & %$  #  \"!","                 J                  ","a  aaaaaaaaa         aaaaaaa aa  a  ","                YYYYY               "," 1 0        /.-,+*)('    & %$  #  \"!","K1  KKKKKKKK .  +*)('KKKKKK  KK# K\" "," 1 0        /.-,+*)('    & %$  #  \"!","                            N       ","                            O       ","e  eeeeeeeee         eeeeeee ee ee  ","f  fffffffff         fffffff ff ff  ","d  ddddddddd         ddddddd dd dd  ","B  BBBBBBBBB         BBBBBBB BB BB  ","A  AAAAAAAAA         AAAAAAA AA AA  ","  P                                 ","                            Q       "," 1           .  +*)('          #  \" ","b  bbbbbbbbb         bbbbbbb bb  b  ","                                    ","!       S                    !!  !  ",'"      T"                    ""  "  ',"$   V  $$            U       $$  $  ","&   &ZY&&            &XW     &&  &  ",")   )))))            )))\\[   ))  )  ",".   ....._^]         .....   ..  .  ","1   11111111         11111   11  1  ","5   55555555         55555`  55  5  ","7   77777777         777777  77  7  ","9   99999999         999999  99  9  ",":  c::::::::         ::::::b :: a:  ","I  fIIIIIIII         IIIIIIe II  I  ","=  =========         ======= == ==  ","?  ?????????         ??????? ?? ??  ","C  CCCCCCCCC         CCCCCCC CC CC  ","J   JJJJJJJJ         JJJJJJ  JJ  J  ","M   MMMMMMMM         MMMMMM  MM  M  ","N  NNNNNNNNN         NNNNNNN NN  N  ","P  PPPPPPPPP         PPPPPPP PP  P  ","                +*)('               ","R  RRRRRRRRR         RRRRRRR RR aR  ","U  UUUUUUUUU         UUUUUUU UU  U  ","Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ","c  ccccccccc         ccccccc cc cc  ","                             j      ","L  fLLLLLLLL         LLLLLLe LL  L  ","6   66666666         66666   66  6  ","              k                     ","                             l      ","                XXXXX               "," 1 0        /.-,+*)('    & %$m #  \"!","_  f________         ______e __  _  "," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1 0        /.-,+*)('      %$  #  \"!"," 1 0        /.-,+*)('    & %$  #  \"!"," 1           .  +*)('          #  \" "," 1           .  +*)('          #  \" ",">  >>>>>>>>>         >>>>>>> >> >>  "," 1           .  +*)('          #  \" "," 1           .  +*)('          #  \" ","Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ","V  VVVVVVVVV         VVVVVVV VV aV  ","T  TTTTTTTTT         TTTTTTT TT  T  ","@  @@@@@@@@@         @@@@@@@ @@ @@  ","                                   ","[  [[[[[[[[[         [[[[[[[ [[ [[  ","D  DDDDDDDDD         DDDDDDD DD DD  ","                             HH     ","                                   ","                             F     ","#      T#                    ##  #  ","%   V  %%            U       %%  %  ","'   'ZY''            'XW     ''  '  ","(   (ZY((            (XW     ((  (  ","+   +++++            +++\\[   ++  +  ","*   *****            ***\\[   **  *  ","-   -----            ---\\[   --  -  ",",   ,,,,,            ,,,\\[   ,,  ,  ","0   00000_^]         00000   00  0  ","/   /////_^]         /////   //  /  ","2   22222222         22222   22  2  ","3   33333333         33333   33  3  ","4   44444444         44444   44  4  ","8   88888888         888888  88  8  ","                                 ^  ","                                   ",";  f;;;;;;;;         ;;;;;;e ;;  ;  ","<  f<<<<<<<<         <<<<<<e <<  <  ","O  OOOOOOOOO         OOOOOOO OO  O  ","`  `````````         ``````` ``  `  ","S  SSSSSSSSS         SSSSSSS SS  S  ","W  WWWWWWWWW         WWWWWWW WW  W  ","\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ","E  EEEEEEEEE         EEEEEEE EE EE  "," 1 0        /.-,+*)('    & %$  #  \"!","]  ]]]]]]]]]         ]]]]]]] ]] ]]  ","                             G      "],t.gotoTable=["3456789:;<=>?@ AB  CDEFGH IJ ","                             ","                             ","                             ","L456789:;<=>?@ AB  CDEFGH IJ ","            M        EFGH IJ ","       N;<=>?@ AB  CDEFGH IJ ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","            S        EFGH IJ ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","              e              ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                        h  J ","              i          j   ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","o456789:;<=>?@ ABpqCDEFGH IJ ","                             ","  r6789:;<=>?@ AB  CDEFGH IJ ","   s789:;<=>?@ AB  CDEFGH IJ ","    t89:;<=>?@ AB  CDEFGH IJ ","    u89:;<=>?@ AB  CDEFGH IJ ","     v9:;<=>?@ AB  CDEFGH IJ ","     w9:;<=>?@ AB  CDEFGH IJ ","     x9:;<=>?@ AB  CDEFGH IJ ","     y9:;<=>?@ AB  CDEFGH IJ ","      z:;<=>?@ AB  CDEFGH IJ ","      {:;<=>?@ AB  CDEFGH IJ ","       |;<=>?@ AB  CDEFGH IJ ","       };<=>?@ AB  CDEFGH IJ ","       ~;<=>?@ AB  CDEFGH IJ ","         =>?@ AB  CDEFGH IJ ","456789:;<=>?@ AB  CDEFGH IJ","                    EFGH IJ ","                    EFGH IJ ","                             ","                      GH IJ ","                      GH IJ ","              i             ","              i             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","                             ","o456789:;<=>?@ ABqCDEFGH IJ ","                             ","                             "],t.productions=[[1,1,2],[2,1,3],[3,1,4],[3,3,3,-9,4],[4,1,5],[4,3,4,-8,5],[5,1,6],[5,3,5,-22,6],[5,3,5,-5,6],[6,1,7],[6,3,6,-23,7],[6,3,6,-24,7],[6,3,6,-6,7],[6,3,6,-7,7],[7,1,8],[7,3,7,-25,8],[7,3,7,-26,8],[8,1,9],[8,3,8,-12,9],[8,3,8,-11,9],[8,3,8,-10,9],[9,1,10],[9,2,-26,9],[10,1,11],[10,3,10,-27,11],[11,1,12],[11,1,13],[11,3,13,-28,14],[11,3,13,-4,14],[13,1,15],[13,2,13,16],[15,1,17],[15,3,-29,2,-30],[15,1,-15],[15,1,-16],[15,1,18],[18,3,-13,-29,-30],[18,4,-13,-29,19,-30],[19,1,20],[19,3,20,-31,19],[20,1,2],[12,1,14],[12,1,21],[21,1,-28],[21,2,-28,14],[21,1,22],[14,1,23],[14,3,14,-28,23],[14,1,24],[23,2,25,26],[23,1,26],[23,3,25,26,27],[23,2,26,27],[23,1,28],[27,1,16],[27,2,16,27],[25,2,-14,-3],[25,1,-32],[26,1,29],[26,3,-20,-29,-30],[26,4,-21,-29,-15,-30],[16,3,-33,30,-34],[30,1,2],[22,2,-4,14],[24,3,14,-4,23],[28,1,-35],[28,1,-2],[17,2,-36,-18],[29,1,-17],[29,1,-19],[29,1,-18]],t.DOUBLEDOT=2,t.DOUBLECOLON=3,t.DOUBLESLASH=4,t.NOTEQUAL=5,t.LESSTHANOREQUAL=6,t.GREATERTHANOREQUAL=7,t.AND=8,t.OR=9,t.MOD=10,t.DIV=11,t.MULTIPLYOPERATOR=12,t.FUNCTIONNAME=13,t.AXISNAME=14,t.LITERAL=15,t.NUMBER=16,t.ASTERISKNAMETEST=17,t.QNAME=18,t.NCNAMECOLONASTERISK=19,t.NODETYPE=20,t.PROCESSINGINSTRUCTIONWITHLITERAL=21,t.EQUALS=22,t.LESSTHAN=23,t.GREATERTHAN=24,t.PLUS=25,t.MINUS=26,t.BAR=27,t.SLASH=28,t.LEFTPARENTHESIS=29,t.RIGHTPARENTHESIS=30,t.COMMA=31,t.AT=32,t.LEFTBRACKET=33,t.RIGHTBRACKET=34,t.DOT=35,t.DOLLAR=36,t.prototype.tokenize=function(u){for(var e=[],r=[],n=u+"\0",i=0,o=n.charAt(i++);;){for(;" "==o||"\t"==o||"\r"==o||"\n"==o;)o=n.charAt(i++)
if("\0"==o||i>=n.length)break
if("("!=o)if(")"!=o)if("["!=o)if("]"!=o)if("@"!=o)if(","!=o)if("|"!=o)if("+"!=o)if("-"!=o)if("="!=o)if("$"!=o)if("."!=o)if("'"!=o&&'"'!=o)if(o>="0"&&o<="9"){var a=o
for(o=n.charAt(i++);o>="0"&&o<="9";)a+=o,o=n.charAt(i++)
if("."==o&&n.charAt(i)>="0"&&n.charAt(i)<="9")for(a+=o,a+=n.charAt(i++),o=n.charAt(i++);o>="0"&&o<="9";)a+=o,o=n.charAt(i++)
e.push(t.NUMBER),r.push(a)}else if("*"!=o)if(":"!=o||":"!=n.charAt(i))if("/"!=o)if("!"!=o||"="!=n.charAt(i))if("<"!=o)if(">"!=o){if("_"!=o&&!Utilities.isLetter(o.charCodeAt(0)))throw new Error("Unexpected character "+o)
var s=o
for(o=n.charAt(i++);Utilities.isNCNameChar(o.charCodeAt(0));)s+=o,o=n.charAt(i++)
if(e.length>0){var c=e[e.length-1]
if(c!=t.AT&&c!=t.DOUBLECOLON&&c!=t.LEFTPARENTHESIS&&c!=t.LEFTBRACKET&&c!=t.AND&&c!=t.OR&&c!=t.MOD&&c!=t.DIV&&c!=t.MULTIPLYOPERATOR&&c!=t.SLASH&&c!=t.DOUBLESLASH&&c!=t.BAR&&c!=t.PLUS&&c!=t.MINUS&&c!=t.EQUALS&&c!=t.NOTEQUAL&&c!=t.LESSTHAN&&c!=t.LESSTHANOREQUAL&&c!=t.GREATERTHAN&&c!=t.GREATERTHANOREQUAL){if("and"==s){e.push(t.AND),r.push(s)
continue}if("or"==s){e.push(t.OR),r.push(s)
continue}if("mod"==s){e.push(t.MOD),r.push(s)
continue}if("div"==s){e.push(t.DIV),r.push(s)
continue}}}if(":"==o){if("*"==n.charAt(i)){e.push(t.NCNAMECOLONASTERISK),r.push(s+":*"),i++,o=n.charAt(i++)
continue}if("_"==n.charAt(i)||Utilities.isLetter(n.charCodeAt(i))){for(s+=":",o=n.charAt(i++);Utilities.isNCNameChar(o.charCodeAt(0));)s+=o,o=n.charAt(i++)
if("("==o){e.push(t.FUNCTIONNAME),r.push(s)
continue}e.push(t.QNAME),r.push(s)
continue}if(":"==n.charAt(i)){e.push(t.AXISNAME),r.push(s)
continue}}if("("==o){if("comment"==s||"text"==s||"node"==s){e.push(t.NODETYPE),r.push(s)
continue}if("processing-instruction"==s){")"==n.charAt(i)?e.push(t.NODETYPE):e.push(t.PROCESSINGINSTRUCTIONWITHLITERAL),r.push(s)
continue}e.push(t.FUNCTIONNAME),r.push(s)
continue}e.push(t.QNAME),r.push(s)}else{if("="==n.charAt(i)){e.push(t.GREATERTHANOREQUAL),r.push(">="),i++,o=n.charAt(i++)
continue}e.push(t.GREATERTHAN),r.push(">"),o=n.charAt(i++)}else{if("="==n.charAt(i)){e.push(t.LESSTHANOREQUAL),r.push("<="),i++,o=n.charAt(i++)
continue}e.push(t.LESSTHAN),r.push("<"),o=n.charAt(i++)}else e.push(t.NOTEQUAL),r.push("!="),i++,o=n.charAt(i++)
else{if(o=n.charAt(i++),"/"==o){e.push(t.DOUBLESLASH),r.push("//"),o=n.charAt(i++)
continue}e.push(t.SLASH),r.push("/")}else e.push(t.DOUBLECOLON),r.push("::"),i++,o=n.charAt(i++)
else{if(e.length>0){var c=e[e.length-1]
if(c!=t.AT&&c!=t.DOUBLECOLON&&c!=t.LEFTPARENTHESIS&&c!=t.LEFTBRACKET&&c!=t.AND&&c!=t.OR&&c!=t.MOD&&c!=t.DIV&&c!=t.MULTIPLYOPERATOR&&c!=t.SLASH&&c!=t.DOUBLESLASH&&c!=t.BAR&&c!=t.PLUS&&c!=t.MINUS&&c!=t.EQUALS&&c!=t.NOTEQUAL&&c!=t.LESSTHAN&&c!=t.LESSTHANOREQUAL&&c!=t.GREATERTHAN&&c!=t.GREATERTHANOREQUAL){e.push(t.MULTIPLYOPERATOR),r.push(o),o=n.charAt(i++)
continue}}e.push(t.ASTERISKNAMETEST),r.push(o),o=n.charAt(i++)}else{for(var l=o,p="";(o=n.charAt(i++))!=l;)p+=o
e.push(t.LITERAL),r.push(p),o=n.charAt(i++)}else{if(o=n.charAt(i++),"."==o){e.push(t.DOUBLEDOT),r.push(".."),o=n.charAt(i++)
continue}if(o>="0"&&o<="9"){var a="."+o
for(o=n.charAt(i++);o>="0"&&o<="9";)a+=o,o=n.charAt(i++)
e.push(t.NUMBER),r.push(a)
continue}e.push(t.DOT),r.push(".")}else e.push(t.DOLLAR),r.push(o),o=n.charAt(i++)
else e.push(t.EQUALS),r.push(o),o=n.charAt(i++)
else e.push(t.MINUS),r.push(o),o=n.charAt(i++)
else e.push(t.PLUS),r.push(o),o=n.charAt(i++)
else e.push(t.BAR),r.push(o),o=n.charAt(i++)
else e.push(t.COMMA),r.push(o),o=n.charAt(i++)
else e.push(t.AT),r.push(o),o=n.charAt(i++)
else e.push(t.RIGHTBRACKET),r.push(o),o=n.charAt(i++)
else e.push(t.LEFTBRACKET),r.push(o),o=n.charAt(i++)
else e.push(t.RIGHTPARENTHESIS),r.push(o),o=n.charAt(i++)
else e.push(t.LEFTPARENTHESIS),r.push(o),o=n.charAt(i++)}return e.push(1),r.push("[EOF]"),[e,r]},t.SHIFT="s",t.REDUCE="r",t.ACCEPT="a",t.prototype.parse=function(u){var r,n,i=this.tokenize(u)
if(void 0!=i){r=i[0],n=i[1]
var u,o,a,s=0,c=[],l=[],p=[]
for(c.push(0),l.push(1),p.push("_S"),o=r[s],a=n[s++];;)switch(u=c[c.length-1],t.actionTable[u].charAt(o-1)){case t.SHIFT:l.push(-o),p.push(a),c.push(t.actionTableNumber[u].charCodeAt(o-1)-32),o=r[s],a=n[s++]
break
case t.REDUCE:for(var A=t.productions[t.actionTableNumber[u].charCodeAt(o-1)-32][1],f=[],h=0;h<A;h++)l.pop(),f.unshift(p.pop()),c.pop()
var E=c[c.length-1]
l.push(t.productions[t.actionTableNumber[u].charCodeAt(o-1)-32][0]),void 0==this.reduceActions[t.actionTableNumber[u].charCodeAt(o-1)-32]?p.push(f[0]):p.push(this.reduceActions[t.actionTableNumber[u].charCodeAt(o-1)-32](f)),c.push(t.gotoTable[E].charCodeAt(t.productions[t.actionTableNumber[u].charCodeAt(o-1)-32][0]-2)-33)
break
case t.ACCEPT:return new e(p.pop())
default:throw new Error("XPath parse error")}}},e.prototype=new Object,e.prototype.constructor=e,e.superclass=Object.prototype,e.prototype.toString=function(){return this.expression.toString()},e.prototype.evaluate=function(u){if(u.contextNode=u.expressionContextNode,u.contextSize=1,u.contextPosition=1,u.caseInsensitive=!1,null!=u.contextNode){var t=u.contextNode
9!=t.nodeType&&(t=t.ownerDocument)
try{u.caseInsensitive=t.implementation.hasFeature("HTML","2.0")}catch(t){u.caseInsensitive=!0}}return this.expression.evaluate(u)},e.XML_NAMESPACE_URI="http://www.w3.org/XML/1998/namespace",e.XMLNS_NAMESPACE_URI="http://www.w3.org/2000/xmlns/",r.prototype=new Object,r.prototype.constructor=r,r.superclass=Object.prototype,r.prototype.init=function(){},r.prototype.toString=function(){return"<Expression>"},r.prototype.evaluate=function(u){throw new Error("Could not evaluate expression.")},n.prototype=new r,n.prototype.constructor=n,n.superclass=r.prototype,n.prototype.init=function(u){this.rhs=u},i.prototype=new n,i.prototype.constructor=i,i.superclass=n.prototype,i.prototype.init=function(u){i.superclass.init.call(this,u)},i.prototype.evaluate=function(u){return this.rhs.evaluate(u).number().negate()},i.prototype.toString=function(){return"-"+this.rhs.toString()},o.prototype=new r,o.prototype.constructor=o,o.superclass=r.prototype,o.prototype.init=function(u,t){this.lhs=u,this.rhs=t},a.prototype=new o,a.prototype.constructor=a,a.superclass=o.prototype,a.prototype.init=function(u,t){a.superclass.init.call(this,u,t)},a.prototype.toString=function(){return"("+this.lhs.toString()+" or "+this.rhs.toString()+")"},a.prototype.evaluate=function(u){var t=this.lhs.evaluate(u).bool()
return t.booleanValue()?t:this.rhs.evaluate(u).bool()},s.prototype=new o,s.prototype.constructor=s,s.superclass=o.prototype,s.prototype.init=function(u,t){s.superclass.init.call(this,u,t)},s.prototype.toString=function(){return"("+this.lhs.toString()+" and "+this.rhs.toString()+")"},s.prototype.evaluate=function(u){var t=this.lhs.evaluate(u).bool()
return t.booleanValue()?this.rhs.evaluate(u).bool():t},c.prototype=new o,c.prototype.constructor=c,c.superclass=o.prototype,c.prototype.init=function(u,t){c.superclass.init.call(this,u,t)},c.prototype.toString=function(){return"("+this.lhs.toString()+" = "+this.rhs.toString()+")"},c.prototype.evaluate=function(u){return this.lhs.evaluate(u).equals(this.rhs.evaluate(u))},l.prototype=new o,l.prototype.constructor=l,l.superclass=o.prototype,l.prototype.init=function(u,t){l.superclass.init.call(this,u,t)},l.prototype.toString=function(){return"("+this.lhs.toString()+" != "+this.rhs.toString()+")"},l.prototype.evaluate=function(u){return this.lhs.evaluate(u).notequal(this.rhs.evaluate(u))},p.prototype=new o,p.prototype.constructor=p,p.superclass=o.prototype,p.prototype.init=function(u,t){p.superclass.init.call(this,u,t)},p.prototype.evaluate=function(u){return this.lhs.evaluate(u).lessthan(this.rhs.evaluate(u))},p.prototype.toString=function(){return"("+this.lhs.toString()+" < "+this.rhs.toString()+")"},A.prototype=new o,A.prototype.constructor=A,A.superclass=o.prototype,A.prototype.init=function(u,t){A.superclass.init.call(this,u,t)},A.prototype.evaluate=function(u){return this.lhs.evaluate(u).greaterthan(this.rhs.evaluate(u))},A.prototype.toString=function(){return"("+this.lhs.toString()+" > "+this.rhs.toString()+")"},f.prototype=new o,f.prototype.constructor=f,f.superclass=o.prototype,f.prototype.init=function(u,t){f.superclass.init.call(this,u,t)},f.prototype.evaluate=function(u){return this.lhs.evaluate(u).lessthanorequal(this.rhs.evaluate(u))},f.prototype.toString=function(){return"("+this.lhs.toString()+" <= "+this.rhs.toString()+")"},h.prototype=new o,h.prototype.constructor=h,h.superclass=o.prototype,h.prototype.init=function(u,t){h.superclass.init.call(this,u,t)},h.prototype.evaluate=function(u){return this.lhs.evaluate(u).greaterthanorequal(this.rhs.evaluate(u))},h.prototype.toString=function(){return"("+this.lhs.toString()+" >= "+this.rhs.toString()+")"},E.prototype=new o,E.prototype.constructor=E,E.superclass=o.prototype,E.prototype.init=function(u,t){E.superclass.init.call(this,u,t)},E.prototype.evaluate=function(u){return this.lhs.evaluate(u).number().plus(this.rhs.evaluate(u).number())},E.prototype.toString=function(){return"("+this.lhs.toString()+" + "+this.rhs.toString()+")"},F.prototype=new o,F.prototype.constructor=F,F.superclass=o.prototype,F.prototype.init=function(u,t){F.superclass.init.call(this,u,t)},F.prototype.evaluate=function(u){return this.lhs.evaluate(u).number().minus(this.rhs.evaluate(u).number())},F.prototype.toString=function(){return"("+this.lhs.toString()+" - "+this.rhs.toString()+")"},C.prototype=new o,C.prototype.constructor=C,C.superclass=o.prototype,C.prototype.init=function(u,t){C.superclass.init.call(this,u,t)},C.prototype.evaluate=function(u){return this.lhs.evaluate(u).number().multiply(this.rhs.evaluate(u).number())},C.prototype.toString=function(){return"("+this.lhs.toString()+" * "+this.rhs.toString()+")"},d.prototype=new o,d.prototype.constructor=d,d.superclass=o.prototype,d.prototype.init=function(u,t){d.superclass.init.call(this,u,t)},d.prototype.evaluate=function(u){return this.lhs.evaluate(u).number().div(this.rhs.evaluate(u).number())},d.prototype.toString=function(){return"("+this.lhs.toString()+" div "+this.rhs.toString()+")"},D.prototype=new o,D.prototype.constructor=D,D.superclass=o.prototype,D.prototype.init=function(u,t){D.superclass.init.call(this,u,t)},D.prototype.evaluate=function(u){return this.lhs.evaluate(u).number().mod(this.rhs.evaluate(u).number())},D.prototype.toString=function(){return"("+this.lhs.toString()+" mod "+this.rhs.toString()+")"},v.prototype=new o,v.prototype.constructor=v,v.superclass=o.prototype,v.prototype.init=function(u,t){v.superclass.init.call(this,u,t)},v.prototype.evaluate=function(u){return this.lhs.evaluate(u).nodeset().union(this.rhs.evaluate(u).nodeset())},v.prototype.toString=function(){return this.lhs.toString()+" | "+this.rhs.toString()},B.prototype=new r,B.prototype.constructor=B,B.superclass=r.prototype,B.prototype.init=function(u,t,e){B.superclass.init.call(this),this.filter=u,this.filterPredicates=t,this.locationPath=e},B.prototype.evaluate=function(u){var t,r=new k
if(r.variableResolver=u.variableResolver,r.functionResolver=u.functionResolver,r.namespaceResolver=u.namespaceResolver,r.expressionContextNode=u.expressionContextNode,r.virtualRoot=u.virtualRoot,r.caseInsensitive=u.caseInsensitive,null==this.filter)t=[u.contextNode]
else{var n=this.filter.evaluate(u)
if(!Utilities.instance_of(n,T)){if(null!=this.filterPredicates&&this.filterPredicates.length>0||null!=this.locationPath)throw new Error("Path expression filter must evaluate to a nodset if predicates or location path are used")
return n}if(t=n.toArray(),null!=this.filterPredicates)for(var i=0;i<this.filterPredicates.length;i++){var o=this.filterPredicates[i],a=[]
for(r.contextSize=t.length,r.contextPosition=1;r.contextPosition<=r.contextSize;r.contextPosition++)r.contextNode=t[r.contextPosition-1],this.predicateMatches(o,r)&&a.push(r.contextNode)
t=a}}if(null!=this.locationPath){if(this.locationPath.absolute)if(9!=t[0].nodeType)if(null!=r.virtualRoot)t=[r.virtualRoot]
else if(null==t[0].ownerDocument){for(var s=t[0];null!=s.parentNode;)s=s.parentNode
t=[s]}else t=[t[0].ownerDocument]
else t=[t[0]]
for(var c=0;c<this.locationPath.steps.length;c++){for(var l=this.locationPath.steps[c],a=[],i=0;i<t.length;i++)switch(r.contextNode=t[i],l.axis){case g.ANCESTOR:if(r.contextNode===r.virtualRoot)break
var p
for(p=2==r.contextNode.nodeType?this.getOwnerElement(r.contextNode):r.contextNode.parentNode;null!=p&&(l.nodeTest.matches(p,r)&&a.push(p),p!==r.virtualRoot);)p=p.parentNode
break
case g.ANCESTORORSELF:for(var p=r.contextNode;null!=p&&(l.nodeTest.matches(p,r)&&a.push(p),p!==r.virtualRoot);p=2==p.nodeType?this.getOwnerElement(p):p.parentNode);break
case g.ATTRIBUTE:var A=r.contextNode.attributes
if(null!=A)for(var f=0;f<A.length;f++){var p=A.item(f)
l.nodeTest.matches(p,r)&&a.push(p)}break
case g.CHILD:for(var p=r.contextNode.firstChild;null!=p;p=p.nextSibling)l.nodeTest.matches(p,r)&&a.push(p)
break
case g.DESCENDANT:for(var h=[r.contextNode.firstChild];h.length>0;)for(var p=h.pop();null!=p;)l.nodeTest.matches(p,r)&&a.push(p),null!=p.firstChild?(h.push(p.nextSibling),p=p.firstChild):p=p.nextSibling
break
case g.DESCENDANTORSELF:l.nodeTest.matches(r.contextNode,r)&&a.push(r.contextNode)
for(var h=[r.contextNode.firstChild];h.length>0;)for(var p=h.pop();null!=p;)l.nodeTest.matches(p,r)&&a.push(p),null!=p.firstChild?(h.push(p.nextSibling),p=p.firstChild):p=p.nextSibling
break
case g.FOLLOWING:if(r.contextNode===r.virtualRoot)break
var h=[]
null!=r.contextNode.firstChild?h.unshift(r.contextNode.firstChild):h.unshift(r.contextNode.nextSibling)
for(var p=r.contextNode.parentNode;null!=p&&9!=p.nodeType&&p!==r.virtualRoot;p=p.parentNode)h.unshift(p.nextSibling)
do for(var p=h.pop();null!=p;)l.nodeTest.matches(p,r)&&a.push(p),null!=p.firstChild?(h.push(p.nextSibling),p=p.firstChild):p=p.nextSibling
while(h.length>0)
break
case g.FOLLOWINGSIBLING:if(r.contextNode===r.virtualRoot)break
for(var p=r.contextNode.nextSibling;null!=p;p=p.nextSibling)l.nodeTest.matches(p,r)&&a.push(p)
break
case g.NAMESPACE:var s={}
if(1==r.contextNode.nodeType){s.xml=e.XML_NAMESPACE_URI,s.xmlns=e.XMLNS_NAMESPACE_URI
for(var p=r.contextNode;null!=p&&1==p.nodeType;p=p.parentNode)for(var f=0;f<p.attributes.length;f++){var E=p.attributes.item(f),F=String(E.name)
if("xmlns"==F)void 0==s[""]&&(s[""]=E.value)
else if(F.length>6&&"xmlns:"==F.substring(0,6)){var C=F.substring(6,F.length)
void 0==s[C]&&(s[C]=E.value)}}for(var C in s){var d=new NamespaceNode(C,s[C],r.contextNode)
l.nodeTest.matches(d,r)&&a.push(d)}}break
case g.PARENT:p=null,r.contextNode!==r.virtualRoot&&(p=2==r.contextNode.nodeType?this.getOwnerElement(r.contextNode):r.contextNode.parentNode),null!=p&&l.nodeTest.matches(p,r)&&a.push(p)
break
case g.PRECEDING:var h
h=null!=r.virtualRoot?[r.virtualRoot]:9==r.contextNode.nodeType?[r.contextNode]:[r.contextNode.ownerDocument]
u:for(;h.length>0;)for(var p=h.pop();null!=p;){if(p==r.contextNode)break u
l.nodeTest.matches(p,r)&&a.unshift(p),null!=p.firstChild?(h.push(p.nextSibling),p=p.firstChild):p=p.nextSibling}break
case g.PRECEDINGSIBLING:if(r.contextNode===r.virtualRoot)break
for(var p=r.contextNode.previousSibling;null!=p;p=p.previousSibling)l.nodeTest.matches(p,r)&&a.push(p)
break
case g.SELF:l.nodeTest.matches(r.contextNode,r)&&a.push(r.contextNode)}t=a
for(var i=0;i<l.predicates.length;i++){var o=l.predicates[i],a=[]
for(r.contextSize=t.length,r.contextPosition=1;r.contextPosition<=r.contextSize;r.contextPosition++)r.contextNode=t[r.contextPosition-1],this.predicateMatches(o,r)&&a.push(r.contextNode)
t=a}}}var n=new T
return n.addArray(t),n},B.prototype.predicateMatches=function(u,t){var e=u.evaluate(t)
return Utilities.instance_of(e,w)?t.contextPosition==e.numberValue():e.booleanValue()},B.prototype.toString=function(){if(void 0!=this.filter){var u=this.filter.toString()
if(Utilities.instance_of(this.filter,N)&&(u="'"+u+"'"),void 0!=this.filterPredicates)for(var t=0;t<this.filterPredicates.length;t++)u=u+"["+this.filterPredicates[t].toString()+"]"
return void 0!=this.locationPath&&(this.locationPath.absolute||(u+="/"),u+=this.locationPath.toString()),u}return this.locationPath.toString()},B.prototype.getOwnerElement=function(u){if(u.ownerElement)return u.ownerElement
try{if(u.selectSingleNode)return u.selectSingleNode("..")}catch(u){}for(var t=9==u.nodeType?u:u.ownerDocument,e=t.getElementsByTagName("*"),r=0;r<e.length;r++)for(var n=e.item(r),i=n.attributes,o=0;o<i.length;o++){var a=i.item(o)
if(a===u)return n}return null},m.prototype=new Object,m.prototype.constructor=m,m.superclass=Object.prototype,m.prototype.init=function(u,t){this.absolute=u,this.steps=t},m.prototype.toString=function(){var u
u=this.absolute?"/":""
for(var t=0;t<this.steps.length;t++)0!=t&&(u+="/"),u+=this.steps[t].toString()
return u},g.prototype=new Object,g.prototype.constructor=g,g.superclass=Object.prototype,g.prototype.init=function(u,t,e){this.axis=u,this.nodeTest=t,this.predicates=e},g.prototype.toString=function(){var u
switch(this.axis){case g.ANCESTOR:u="ancestor"
break
case g.ANCESTORORSELF:u="ancestor-or-self"
break
case g.ATTRIBUTE:u="attribute"
break
case g.CHILD:u="child"
break
case g.DESCENDANT:u="descendant"
break
case g.DESCENDANTORSELF:u="descendant-or-self"
break
case g.FOLLOWING:u="following"
break
case g.FOLLOWINGSIBLING:u="following-sibling"
break
case g.NAMESPACE:u="namespace"
break
case g.PARENT:u="parent"
break
case g.PRECEDING:u="preceding"
break
case g.PRECEDINGSIBLING:u="preceding-sibling"
break
case g.SELF:u="self"}u+="::",u+=this.nodeTest.toString()
for(var t=0;t<this.predicates.length;t++)u+="["+this.predicates[t].toString()+"]"
return u},g.ANCESTOR=0,g.ANCESTORORSELF=1,g.ATTRIBUTE=2,g.CHILD=3,g.DESCENDANT=4,g.DESCENDANTORSELF=5,g.FOLLOWING=6,g.FOLLOWINGSIBLING=7,g.NAMESPACE=8,g.PARENT=9,g.PRECEDING=10,g.PRECEDINGSIBLING=11,g.SELF=12,y.prototype=new Object,y.prototype.constructor=y,y.superclass=Object.prototype,y.prototype.init=function(u,t){this.type=u,this.value=t},y.prototype.toString=function(){switch(this.type){case y.NAMETESTANY:return"*"
case y.NAMETESTPREFIXANY:return this.value+":*"
case y.NAMETESTRESOLVEDANY:return"{"+this.value+"}*"
case y.NAMETESTQNAME:return this.value
case y.NAMETESTRESOLVEDNAME:return"{"+this.namespaceURI+"}"+this.value
case y.COMMENT:return"comment()"
case y.TEXT:return"text()"
case y.PI:return void 0!=this.value?'processing-instruction("'+this.value+'")':"processing-instruction()"
case y.NODE:return"node()"}return"<unknown nodetest type>"},y.prototype.matches=function(u,t){switch(this.type){case y.NAMETESTANY:return 2==u.nodeType||1==u.nodeType||u.nodeType==R.XPATH_NAMESPACE_NODE
case y.NAMETESTPREFIXANY:if(2==u.nodeType||1==u.nodeType){var e=t.namespaceResolver.getNamespace(this.value,t.expressionContextNode)
if(null==e)throw new Error("Cannot resolve QName "+this.value)
return e==(u.namespaceURI||"")}return!1
case y.NAMETESTQNAME:if(2==u.nodeType||1==u.nodeType||u.nodeType==R.XPATH_NAMESPACE_NODE){var r=Utilities.resolveQName(this.value,t.namespaceResolver,t.expressionContextNode,!1)
if(null==r[0])throw new Error("Cannot resolve QName "+this.value)
r[0]=String(r[0]),r[1]=String(r[1]),""==r[0]&&(r[0]=null)
var n=[u.namespaceURI||"",u.localName]
return n[0]=String(n[0]),n[1]=String(n[1]),""==n[0]&&(n[0]=null),t.caseInsensitive?r[0]==n[0]&&String(r[1]).toLowerCase()==String(n[1]).toLowerCase():r[0]==n[0]&&r[1]==n[1]}return!1
case y.COMMENT:return 8==u.nodeType
case y.TEXT:return 3==u.nodeType||4==u.nodeType
case y.PI:return 7==u.nodeType&&(null==this.value||u.nodeName==this.value)
case y.NODE:return 9==u.nodeType||1==u.nodeType||2==u.nodeType||3==u.nodeType||4==u.nodeType||8==u.nodeType||7==u.nodeType}return!1},y.NAMETESTANY=0,y.NAMETESTPREFIXANY=1,y.NAMETESTQNAME=2,y.COMMENT=3
y.TEXT=4
y.PI=5,y.NODE=6,b.prototype=new r,b.prototype.constructor=b,b.superclass=r.prototype,b.prototype.init=function(u){this.variable=u},b.prototype.toString=function(){return"$"+this.variable},b.prototype.evaluate=function(u){return u.variableResolver.getVariable(this.variable,u)},_.prototype=new r,_.prototype.constructor=_,_.superclass=r.prototype,_.prototype.init=function(u,t){this.functionName=u,this.arguments=t},_.prototype.toString=function(){for(var u=this.functionName+"(",t=0;t<this.arguments.length;t++)t>0&&(u+=", "),u+=this.arguments[t].toString()
return u+")"},_.prototype.evaluate=function(u){var t=u.functionResolver.getFunction(this.functionName,u)
if(void 0==t)throw new Error("Unknown function "+this.functionName)
var e=[u].concat(this.arguments)
return t.apply(u.functionResolver.thisArg,e)},N.prototype=new r,N.prototype.constructor=N,N.superclass=r.prototype,N.prototype.init=function(u){this.str=u},N.prototype.toString=function(){return this.str},N.prototype.evaluate=function(u){return this},N.prototype.string=function(){return this},N.prototype.number=function(){return new w(this.str)},N.prototype.bool=function(){return new x(this.str)},N.prototype.nodeset=function(){throw new Error("Cannot convert string to nodeset")},N.prototype.stringValue=function(){return this.str},N.prototype.numberValue=function(){return this.number().numberValue()},N.prototype.booleanValue=function(){return this.bool().booleanValue()},N.prototype.equals=function(u){return Utilities.instance_of(u,x)?this.bool().equals(u):Utilities.instance_of(u,w)?this.number().equals(u):Utilities.instance_of(u,T)?u.compareWithString(this,q.equals):new x(this.str==u.str)},N.prototype.notequal=function(u){return Utilities.instance_of(u,x)?this.bool().notequal(u):Utilities.instance_of(u,w)?this.number().notequal(u):Utilities.instance_of(u,T)?u.compareWithString(this,q.notequal):new x(this.str!=u.str)},N.prototype.lessthan=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this.number(),q.greaterthanorequal):this.number().lessthan(u.number())},N.prototype.greaterthan=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this.number(),q.lessthanorequal):this.number().greaterthan(u.number())},N.prototype.lessthanorequal=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this.number(),q.greaterthan):this.number().lessthanorequal(u.number())},N.prototype.greaterthanorequal=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this.number(),q.lessthan):this.number().greaterthanorequal(u.number())},w.prototype=new r,w.prototype.constructor=w,w.superclass=r.prototype,w.prototype.init=function(u){this.num=Number(u)},w.prototype.toString=function(){return this.num},w.prototype.evaluate=function(u){return this},w.prototype.string=function(){return new N(this.num)},w.prototype.number=function(){return this},w.prototype.bool=function(){return new x(this.num)},w.prototype.nodeset=function(){throw new Error("Cannot convert number to nodeset")},w.prototype.stringValue=function(){return this.string().stringValue()},w.prototype.numberValue=function(){return this.num},w.prototype.booleanValue=function(){return this.bool().booleanValue()},w.prototype.negate=function(){return new w(-this.num)},w.prototype.equals=function(u){return Utilities.instance_of(u,x)?this.bool().equals(u):Utilities.instance_of(u,N)?this.equals(u.number()):Utilities.instance_of(u,T)?u.compareWithNumber(this,q.equals):new x(this.num==u.num)},w.prototype.notequal=function(u){return Utilities.instance_of(u,x)?this.bool().notequal(u):Utilities.instance_of(u,N)?this.notequal(u.number()):Utilities.instance_of(u,T)?u.compareWithNumber(this,q.notequal):new x(this.num!=u.num)},w.prototype.lessthan=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this,q.greaterthanorequal):Utilities.instance_of(u,x)||Utilities.instance_of(u,N)?this.lessthan(u.number()):new x(this.num<u.num)},w.prototype.greaterthan=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this,q.lessthanorequal):Utilities.instance_of(u,x)||Utilities.instance_of(u,N)?this.greaterthan(u.number()):new x(this.num>u.num)},w.prototype.lessthanorequal=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this,q.greaterthan):Utilities.instance_of(u,x)||Utilities.instance_of(u,N)?this.lessthanorequal(u.number()):new x(this.num<=u.num)},w.prototype.greaterthanorequal=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this,q.lessthan):Utilities.instance_of(u,x)||Utilities.instance_of(u,N)?this.greaterthanorequal(u.number()):new x(this.num>=u.num)},w.prototype.plus=function(u){return new w(this.num+u.num)},w.prototype.minus=function(u){return new w(this.num-u.num)},w.prototype.multiply=function(u){return new w(this.num*u.num)},w.prototype.div=function(u){return new w(this.num/u.num)},w.prototype.mod=function(u){return new w(this.num%u.num)},x.prototype=new r,x.prototype.constructor=x,x.superclass=r.prototype,x.prototype.init=function(u){this.b=Boolean(u)},x.prototype.toString=function(){return this.b.toString()},x.prototype.evaluate=function(u){return this},x.prototype.string=function(){return new N(this.b)},x.prototype.number=function(){return new w(this.b)},x.prototype.bool=function(){return this},x.prototype.nodeset=function(){throw new Error("Cannot convert boolean to nodeset")},x.prototype.stringValue=function(){return this.string().stringValue()},x.prototype.numberValue=function(){return this.num().numberValue()},x.prototype.booleanValue=function(){return this.b},x.prototype.not=function(){return new x(!this.b)},x.prototype.equals=function(u){return Utilities.instance_of(u,N)||Utilities.instance_of(u,w)?this.equals(u.bool()):Utilities.instance_of(u,T)?u.compareWithBoolean(this,q.equals):new x(this.b==u.b)},x.prototype.notequal=function(u){return Utilities.instance_of(u,N)||Utilities.instance_of(u,w)?this.notequal(u.bool()):Utilities.instance_of(u,T)?u.compareWithBoolean(this,q.notequal):new x(this.b!=u.b)},x.prototype.lessthan=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this.number(),q.greaterthanorequal):this.number().lessthan(u.number())},x.prototype.greaterthan=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this.number(),q.lessthanorequal):this.number().greaterthan(u.number())},x.prototype.lessthanorequal=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this.number(),q.greaterthan):this.number().lessthanorequal(u.number())},x.prototype.greaterthanorequal=function(u){return Utilities.instance_of(u,T)?u.compareWithNumber(this.number(),q.lessthan):this.number().greaterthanorequal(u.number())},S.prototype=new Object,S.prototype.constructor=S,S.superclass=Object.prototype,S.prototype.init=function(u){this.left=null,this.right=null,this.node=u,this.depth=1},S.prototype.balance=function(){var u=null==this.left?0:this.left.depth,t=null==this.right?0:this.right.depth
if(u>t+1){var e=null==this.left.left?0:this.left.left.depth,r=null==this.left.right?0:this.left.right.depth
e<r&&this.left.rotateRR(),this.rotateLL()}else if(u+1<t){var n=null==this.right.right?0:this.right.right.depth,i=null==this.right.left?0:this.right.left.depth
i>n&&this.right.rotateLL(),this.rotateRR()}},S.prototype.rotateLL=function(){var u=this.node,t=this.right
this.node=this.left.node,this.right=this.left,this.left=this.left.left,this.right.left=this.right.right,this.right.right=t,this.right.node=u,this.right.updateInNewLocation(),this.updateInNewLocation()},S.prototype.rotateRR=function(){var u=this.node,t=this.left
this.node=this.right.node,this.left=this.right,this.right=this.right.right,this.left.right=this.left.left,this.left.left=t,this.left.node=u,this.left.updateInNewLocation(),this.updateInNewLocation()},S.prototype.updateInNewLocation=function(){this.getDepthFromChildren()},S.prototype.getDepthFromChildren=function(){this.depth=null==this.node?0:1,null!=this.left&&(this.depth=this.left.depth+1),null!=this.right&&this.depth<=this.right.depth&&(this.depth=this.right.depth+1)},S.prototype.order=function(u,t){if(u===t)return 0
for(var e=0,r=0,n=u;null!=n;n=n.parentNode)e++
for(var i=t;null!=i;i=i.parentNode)r++
if(e>r){for(;e>r;)u=u.parentNode,e--
if(u==t)return 1}else if(r>e){for(;r>e;)t=t.parentNode,r--
if(u==t)return-1}for(;u.parentNode!=t.parentNode;)u=u.parentNode,t=t.parentNode
for(;null!=u.previousSibling&&null!=t.previousSibling;)u=u.previousSibling,t=t.previousSibling
return null==u.previousSibling?-1:1},S.prototype.add=function(u){if(u===this.node)return!1
var t=this.order(u,this.node),e=!1
return t==-1?null==this.left?(this.left=new S(u),e=!0):(e=this.left.add(u),e&&this.balance()):1==t&&(null==this.right?(this.right=new S(u),e=!0):(e=this.right.add(u),e&&this.balance())),e&&this.getDepthFromChildren(),e},T.prototype=new r,T.prototype.constructor=T,T.superclass=r.prototype,T.prototype.init=function(){this.tree=null,this.size=0},T.prototype.toString=function(){var u=this.first()
return null==u?"":this.stringForNode(u)},T.prototype.evaluate=function(u){return this},T.prototype.string=function(){return new N(this.toString())},T.prototype.stringValue=function(){return this.toString()},T.prototype.number=function(){return new w(this.string())},T.prototype.numberValue=function(){return Number(this.string())},T.prototype.bool=function(){return new x(null!=this.tree)},T.prototype.booleanValue=function(){return null!=this.tree},T.prototype.nodeset=function(){return this},T.prototype.stringForNode=function(u){return 9==u.nodeType&&(u=u.documentElement),1==u.nodeType?this.stringForNodeRec(u):u.isNamespaceNode?u.namespace:u.nodeValue},T.prototype.stringForNodeRec=function(u){for(var t="",e=u.firstChild;null!=e;e=e.nextSibling)3==e.nodeType?t+=e.nodeValue:1==e.nodeType&&(t+=this.stringForNodeRec(e))
return t},T.prototype.first=function(){var u=this.tree
if(null==u)return null
for(;null!=u.left;)u=u.left
return u.node},T.prototype.add=function(u){var t
null==this.tree?(this.tree=new S(u),t=!0):t=this.tree.add(u),t&&this.size++},T.prototype.addArray=function(u){for(var t=0;t<u.length;t++)this.add(u[t])},T.prototype.toArray=function(){var u=[]
return this.toArrayRec(this.tree,u),u},T.prototype.toArrayRec=function(u,t){null!=u&&(this.toArrayRec(u.left,t),t.push(u.node),this.toArrayRec(u.right,t))},T.prototype.compareWithString=function(u,t){for(var e=this.toArray(),r=0;r<e.length;r++){var n=e[r],i=new N(this.stringForNode(n)),o=t(i,u)
if(o.booleanValue())return o}return new x(!1)},T.prototype.compareWithNumber=function(u,t){for(var e=this.toArray(),r=0;r<e.length;r++){var n=e[r],i=new w(this.stringForNode(n)),o=t(i,u)
if(o.booleanValue())return o}return new x(!1)},T.prototype.compareWithBoolean=function(u,t){return t(this.bool(),u)},T.prototype.compareWithNodeSet=function(u,t){for(var e=this.toArray(),r=0;r<e.length;r++)for(var n=e[r],i=new N(this.stringForNode(n)),o=u.toArray(),a=0;a<o.length;a++){var s=o[a],u=new N(this.stringForNode(s)),c=t(i,u)
if(c.booleanValue())return c}return new x(!1)},T.prototype.equals=function(u){return Utilities.instance_of(u,N)?this.compareWithString(u,q.equals):Utilities.instance_of(u,w)?this.compareWithNumber(u,q.equals):Utilities.instance_of(u,x)?this.compareWithBoolean(u,q.equals):this.compareWithNodeSet(u,q.equals)},T.prototype.notequal=function(u){return Utilities.instance_of(u,N)?this.compareWithString(u,q.notequal):Utilities.instance_of(u,w)?this.compareWithNumber(u,q.notequal):Utilities.instance_of(u,x)?this.compareWithBoolean(u,q.notequal):this.compareWithNodeSet(u,q.notequal)},T.prototype.lessthan=function(u){return Utilities.instance_of(u,N)?this.compareWithNumber(u.number(),q.lessthan):Utilities.instance_of(u,w)?this.compareWithNumber(u,q.lessthan):Utilities.instance_of(u,x)?this.compareWithBoolean(u,q.lessthan):this.compareWithNodeSet(u,q.lessthan)},T.prototype.greaterthan=function(u){return Utilities.instance_of(u,N)?this.compareWithNumber(u.number(),q.greaterthan):Utilities.instance_of(u,w)?this.compareWithNumber(u,q.greaterthan):Utilities.instance_of(u,x)?this.compareWithBoolean(u,q.greaterthan):this.compareWithNodeSet(u,q.greaterthan)},T.prototype.lessthanorequal=function(u){return Utilities.instance_of(u,N)?this.compareWithNumber(u.number(),q.lessthanorequal):Utilities.instance_of(u,w)?this.compareWithNumber(u,q.lessthanorequal):Utilities.instance_of(u,x)?this.compareWithBoolean(u,q.lessthanorequal):this.compareWithNodeSet(u,q.lessthanorequal)},T.prototype.greaterthanorequal=function(u){return Utilities.instance_of(u,N)?this.compareWithNumber(u.number(),q.greaterthanorequal):Utilities.instance_of(u,w)?this.compareWithNumber(u,q.greaterthanorequal):Utilities.instance_of(u,x)?this.compareWithBoolean(u,q.greaterthanorequal):this.compareWithNodeSet(u,q.greaterthanorequal)},T.prototype.union=function(u){var t=new T
return t.tree=this.tree,t.size=this.size,t.addArray(u.toArray()),t},R.prototype=new Object,R.prototype.constructor=R,R.superclass=Object.prototype,R.prototype.toString=function(){return'{ "'+this.prefix+'", "'+this.namespaceURI+'" }'}
var q=new Object
q.equals=function(u,t){return u.equals(t)},q.notequal=function(u,t){return u.notequal(t)},q.lessthan=function(u,t){return u.lessthan(t)},q.greaterthan=function(u,t){return u.greaterthan(t)},q.lessthanorequal=function(u,t){return u.lessthanorequal(t)},q.greaterthanorequal=function(u,t){return u.greaterthanorequal(t)},k.prototype=new Object,k.prototype.constructor=k,k.superclass=Object.prototype,P.prototype=new Object,P.prototype.constructor=P,P.superclass=Object.prototype,P.prototype.getVariable=function(u,t){var e=Utilities.splitQName(u)
if(null!=e[0]&&(e[0]=t.namespaceResolver.getNamespace(e[0],t.expressionContextNode),null==e[0]))throw new Error("Cannot resolve QName "+fn)
return this.getVariableWithName(e[0],e[1],t.expressionContextNode)},P.prototype.getVariableWithName=function(u,t,e){return null},O.prototype=new Object,O.prototype.constructor=O,O.superclass=Object.prototype,O.prototype.addStandardFunctions=function(){this.functions["{}last"]=Functions.last,this.functions["{}position"]=Functions.position,this.functions["{}count"]=Functions.count,this.functions["{}id"]=Functions.id,this.functions["{}local-name"]=Functions.localName,this.functions["{}namespace-uri"]=Functions.namespaceURI,this.functions["{}name"]=Functions.name,this.functions["{}string"]=Functions.string,this.functions["{}concat"]=Functions.concat,this.functions["{}starts-with"]=Functions.startsWith,this.functions["{}contains"]=Functions.contains,this.functions["{}substring-before"]=Functions.substringBefore,this.functions["{}substring-after"]=Functions.substringAfter,this.functions["{}substring"]=Functions.substring,this.functions["{}string-length"]=Functions.stringLength,this.functions["{}normalize-space"]=Functions.normalizeSpace,this.functions["{}translate"]=Functions.translate,this.functions["{}boolean"]=Functions.boolean_,this.functions["{}not"]=Functions.not,this.functions["{}true"]=Functions.true_,this.functions["{}false"]=Functions.false_,this.functions["{}lang"]=Functions.lang,this.functions["{}number"]=Functions.number,this.functions["{}sum"]=Functions.sum,this.functions["{}floor"]=Functions.floor,this.functions["{}ceiling"]=Functions.ceiling,this.functions["{}round"]=Functions.round},O.prototype.addFunction=function(u,t,e){this.functions["{"+u+"}"+t]=e},O.prototype.getFunction=function(u,t){var e=Utilities.resolveQName(u,t.namespaceResolver,t.contextNode,!1)
if(null==e[0])throw new Error("Cannot resolve QName "+u)
return this.getFunctionWithName(e[0],e[1],t.contextNode)},O.prototype.getFunctionWithName=function(u,t,e){return this.functions["{"+u+"}"+t]},I.prototype=new Object,I.prototype.constructor=I,I.superclass=Object.prototype,I.prototype.getNamespace=function(u,t){if("xml"==u)return e.XML_NAMESPACE_URI
if("xmlns"==u)return e.XMLNS_NAMESPACE_URI
for(9==t.nodeType?t=t.documentElement:2==t.nodeType?t=B.prototype.getOwnerElement(t):1!=t.nodeType&&(t=t.parentNode);null!=t&&1==t.nodeType;){for(var r=t.attributes,n=0;n<r.length;n++){var i=r.item(n),o=i.nodeName
if("xmlns"==o&&""==u||o=="xmlns:"+u)return String(i.nodeValue)}t=t.parentNode}return null},Functions=new Object,Functions.last=function(){var u=arguments[0]
if(1!=arguments.length)throw new Error("Function last expects ()")
return new w(u.contextSize)},Functions.position=function(){var u=arguments[0]
if(1!=arguments.length)throw new Error("Function position expects ()")
return new w(u.contextPosition)},Functions.count=function(){var u,t=arguments[0]
if(2!=arguments.length||!Utilities.instance_of(u=arguments[1].evaluate(t),T))throw new Error("Function count expects (node-set)")
return new w(u.size)},Functions.id=function(){var u,t=arguments[0]
if(2!=arguments.length)throw new Error("Function id expects (object)")
u=arguments[1].evaluate(t),u=Utilities.instance_of(u,T)?u.toArray().join(" "):u.stringValue()
for(var e=u.split(/[\x0d\x0a\x09\x20]+/),r=0,n=new T,i=9==t.contextNode.nodeType?t.contextNode:t.contextNode.ownerDocument,o=0;o<e.length;o++){var a
a=i.getElementById?i.getElementById(e[o]):Utilities.getElementById(i,e[o]),null!=a&&(n.add(a),r++)}return n},Functions.localName=function(){var u,t=arguments[0]
if(1==arguments.length)u=t.contextNode
else{if(2!=arguments.length)throw new Error("Function local-name expects (node-set?)")
u=arguments[1].evaluate(t).first()}return new N(null==u?"":u.localName?u.localName:u.baseName)},Functions.namespaceURI=function(){var u,t=arguments[0]
if(1==arguments.length)u=t.contextNode
else{if(2!=arguments.length)throw new Error("Function namespace-uri expects (node-set?)")
u=arguments[1].evaluate(t).first()}return new N(null==u?"":u.namespaceURI)},Functions.name=function(){var u,t=arguments[0]
if(1==arguments.length)u=t.contextNode
else{if(2!=arguments.length)throw new Error("Function name expects (node-set?)")
u=arguments[1].evaluate(t).first()}return new N(null==u?"":1==u.nodeType||2==u.nodeType?u.nodeName:null==u.localName?"":u.localName)},Functions.string=function(){var u=arguments[0]
if(1==arguments.length)return T.prototype.stringForNode(u.contextNode)
if(2==arguments.length)return arguments[1].evaluate(u).string()
throw new Error("Function string expects (object?)")},Functions.concat=function(){var u=arguments[0]
if(arguments.length<3)throw new Error("Function concat expects (string, string, string*)")
for(var t="",e=1;e<arguments.length;e++)t+=arguments[e].evaluate(u).stringValue()
return new N(t)},Functions.startsWith=function(){var u=arguments[0]
if(3!=arguments.length)throw new Error("Function startsWith expects (string, string)")
var t=arguments[1].evaluate(u).stringValue(),e=arguments[2].evaluate(u).stringValue()
return new x(t.substring(0,e.length)==e)},Functions.contains=function(){var u=arguments[0]
if(3!=arguments.length)throw new Error("Function contains expects (string, string)")
var t=arguments[1].evaluate(u).stringValue(),e=arguments[2].evaluate(u).stringValue()
return new x(t.indexOf(e)!=-1)},Functions.substringBefore=function(){var u=arguments[0]
if(3!=arguments.length)throw new Error("Function substring-before expects (string, string)")
var t=arguments[1].evaluate(u).stringValue(),e=arguments[2].evaluate(u).stringValue()
return new N(t.substring(0,t.indexOf(e)))},Functions.substringAfter=function(){var u=arguments[0]
if(3!=arguments.length)throw new Error("Function substring-after expects (string, string)")
var t=arguments[1].evaluate(u).stringValue(),e=arguments[2].evaluate(u).stringValue()
if(0==e.length)return new N(t)
var r=t.indexOf(e)
return new N(r==-1?"":t.substring(t.indexOf(e)+1))},Functions.substring=function(){var u=arguments[0]
if(3!=arguments.length&&4!=arguments.length)throw new Error("Function substring expects (string, number, number?)")
var t=arguments[1].evaluate(u).stringValue(),e=Math.round(arguments[2].evaluate(u).numberValue())-1,r=4==arguments.length?e+Math.round(arguments[3].evaluate(u).numberValue()):void 0
return new N(t.substring(e,r))},Functions.stringLength=function(){var u,t=arguments[0]
if(1==arguments.length)u=T.prototype.stringForNode(t.contextNode)
else{if(2!=arguments.length)throw new Error("Function string-length expects (string?)")
u=arguments[1].evaluate(t).stringValue()}return new w(u.length)},Functions.normalizeSpace=function(){var u,t=arguments[0]
if(1==arguments.length)u=T.prototype.stringForNode(t.contextNode)
else{if(2!=arguments.length)throw new Error("Function normalize-space expects (string?)")
u=arguments[1].evaluate(t).stringValue()}for(var e=0,r=u.length-1;Utilities.isSpace(u.charCodeAt(r));)r--
for(var n="";e<=r&&Utilities.isSpace(u.charCodeAt(e));)e++
for(;e<=r;)if(Utilities.isSpace(u.charCodeAt(e)))for(n+=" ";e<=r&&Utilities.isSpace(u.charCodeAt(e));)e++
else n+=u.charAt(e),e++
return new N(n)},Functions.translate=function(){var u=arguments[0]
if(4!=arguments.length)throw new Error("Function translate expects (string, string, string)")
for(var t=arguments[1].evaluate(u).stringValue(),e=arguments[2].evaluate(u).stringValue(),r=arguments[3].evaluate(u).stringValue(),n=[],i=0;i<e.length;i++){var o=e.charCodeAt(i)
if(void 0==n[o]){var a=i>r.length?"":r.charAt(i)
n[o]=a}}for(var s="",i=0;i<t.length;i++){var u=t.charCodeAt(i),c=n[u]
s+=void 0==c?t.charAt(i):c}return new N(s)},Functions.boolean_=function(){var u=arguments[0]
if(2!=arguments.length)throw new Error("Function boolean expects (object)")
return arguments[1].evaluate(u).bool()},Functions.not=function(){var u=arguments[0]
if(2!=arguments.length)throw new Error("Function not expects (object)")
return arguments[1].evaluate(u).bool().not()},Functions.true_=function(){if(1!=arguments.length)throw new Error("Function true expects ()")
return new x(!0)},Functions.false_=function(){if(1!=arguments.length)throw new Error("Function false expects ()")
return new x(!1)},Functions.lang=function(){var u=arguments[0]
if(2!=arguments.length)throw new Error("Function lang expects (string)")
for(var t,r=u.contextNode;null!=r&&9!=r.nodeType;r=r.parentNode){var n=r.getAttributeNS(e.XML_NAMESPACE_URI,"lang")
if(null!=n){t=String(n)
break}}if(null==t)return new x(!1)
var i=arguments[1].evaluate(u).stringValue()
return new x(t.substring(0,i.length)==i&&(t.length==i.length||"-"==t.charAt(i.length)))},Functions.number=function(){var u=arguments[0]
if(1!=arguments.length&&2!=arguments.length)throw new Error("Function number expects (object?)")
return 1==arguments.length?new w(T.prototype.stringForNode(u.contextNode)):arguments[1].evaluate(u).number()},Functions.sum=function(){var u,t=arguments[0]
if(2!=arguments.length||!Utilities.instance_of(u=arguments[1].evaluate(t),T))throw new Error("Function sum expects (node-set)")
u=u.toArray()
for(var e=0,r=0;r<u.length;r++)e+=new w(T.prototype.stringForNode(u[r])).numberValue()
return new w(e)},Functions.floor=function(){var u=arguments[0]
if(2!=arguments.length)throw new Error("Function floor expects (number)")
return new w(Math.floor(arguments[1].evaluate(u).numberValue()))},Functions.ceiling=function(){var u=arguments[0]
if(2!=arguments.length)throw new Error("Function ceiling expects (number)")
return new w(Math.ceil(arguments[1].evaluate(u).numberValue()))},Functions.round=function(){var u=arguments[0]
if(2!=arguments.length)throw new Error("Function round expects (number)")
return new w(Math.round(arguments[1].evaluate(u).numberValue()))},Utilities=new Object,Utilities.splitQName=function(u){var t=u.indexOf(":")
return t==-1?[null,u]:[u.substring(0,t),u.substring(t+1)]},Utilities.resolveQName=function(u,t,e,r){var n=Utilities.splitQName(u)
return null!=n[0]?n[0]=t.getNamespace(n[0],e):r?(n[0]=t.getNamespace("",e),null==n[0]&&(n[0]="")):n[0]="",n},Utilities.isSpace=function(u){return 9==u||13==u||10==u||32==u},Utilities.isLetter=function(u){return u>=65&&u<=90||u>=97&&u<=122||u>=192&&u<=214||u>=216&&u<=246||u>=248&&u<=255||u>=256&&u<=305||u>=308&&u<=318||u>=321&&u<=328||u>=330&&u<=382||u>=384&&u<=451||u>=461&&u<=496||u>=500&&u<=501||u>=506&&u<=535||u>=592&&u<=680||u>=699&&u<=705||902==u||u>=904&&u<=906||908==u||u>=910&&u<=929||u>=931&&u<=974||u>=976&&u<=982||986==u||988==u||990==u||992==u||u>=994&&u<=1011||u>=1025&&u<=1036||u>=1038&&u<=1103||u>=1105&&u<=1116||u>=1118&&u<=1153||u>=1168&&u<=1220||u>=1223&&u<=1224||u>=1227&&u<=1228||u>=1232&&u<=1259||u>=1262&&u<=1269||u>=1272&&u<=1273||u>=1329&&u<=1366||1369==u||u>=1377&&u<=1414||u>=1488&&u<=1514||u>=1520&&u<=1522||u>=1569&&u<=1594||u>=1601&&u<=1610||u>=1649&&u<=1719||u>=1722&&u<=1726||u>=1728&&u<=1742||u>=1744&&u<=1747||1749==u||u>=1765&&u<=1766||u>=2309&&u<=2361||2365==u||u>=2392&&u<=2401||u>=2437&&u<=2444||u>=2447&&u<=2448||u>=2451&&u<=2472||u>=2474&&u<=2480||2482==u||u>=2486&&u<=2489||u>=2524&&u<=2525||u>=2527&&u<=2529||u>=2544&&u<=2545||u>=2565&&u<=2570||u>=2575&&u<=2576||u>=2579&&u<=2600||u>=2602&&u<=2608||u>=2610&&u<=2611||u>=2613&&u<=2614||u>=2616&&u<=2617||u>=2649&&u<=2652||2654==u||u>=2674&&u<=2676||u>=2693&&u<=2699||2701==u||u>=2703&&u<=2705||u>=2707&&u<=2728||u>=2730&&u<=2736||u>=2738&&u<=2739||u>=2741&&u<=2745||2749==u||2784==u||u>=2821&&u<=2828||u>=2831&&u<=2832||u>=2835&&u<=2856||u>=2858&&u<=2864||u>=2866&&u<=2867||u>=2870&&u<=2873||2877==u||u>=2908&&u<=2909||u>=2911&&u<=2913||u>=2949&&u<=2954||u>=2958&&u<=2960||u>=2962&&u<=2965||u>=2969&&u<=2970||2972==u||u>=2974&&u<=2975||u>=2979&&u<=2980||u>=2984&&u<=2986||u>=2990&&u<=2997||u>=2999&&u<=3001||u>=3077&&u<=3084||u>=3086&&u<=3088||u>=3090&&u<=3112||u>=3114&&u<=3123||u>=3125&&u<=3129||u>=3168&&u<=3169||u>=3205&&u<=3212||u>=3214&&u<=3216||u>=3218&&u<=3240||u>=3242&&u<=3251||u>=3253&&u<=3257||3294==u||u>=3296&&u<=3297||u>=3333&&u<=3340||u>=3342&&u<=3344||u>=3346&&u<=3368||u>=3370&&u<=3385||u>=3424&&u<=3425||u>=3585&&u<=3630||3632==u||u>=3634&&u<=3635||u>=3648&&u<=3653||u>=3713&&u<=3714||3716==u||u>=3719&&u<=3720||3722==u||3725==u||u>=3732&&u<=3735||u>=3737&&u<=3743||u>=3745&&u<=3747||3749==u||3751==u||u>=3754&&u<=3755||u>=3757&&u<=3758||3760==u||u>=3762&&u<=3763||3773==u||u>=3776&&u<=3780||u>=3904&&u<=3911||u>=3913&&u<=3945||u>=4256&&u<=4293||u>=4304&&u<=4342||4352==u||u>=4354&&u<=4355||u>=4357&&u<=4359||4361==u||u>=4363&&u<=4364||u>=4366&&u<=4370||4412==u||4414==u||4416==u||4428==u||4430==u||4432==u||u>=4436&&u<=4437||4441==u||u>=4447&&u<=4449||4451==u||4453==u||4455==u||4457==u||u>=4461&&u<=4462||u>=4466&&u<=4467||4469==u||4510==u||4520==u||4523==u||u>=4526&&u<=4527||u>=4535&&u<=4536||4538==u||u>=4540&&u<=4546||4587==u||4592==u||4601==u||u>=7680&&u<=7835||u>=7840&&u<=7929||u>=7936&&u<=7957||u>=7960&&u<=7965||u>=7968&&u<=8005||u>=8008&&u<=8013||u>=8016&&u<=8023||8025==u||8027==u||8029==u||u>=8031&&u<=8061||u>=8064&&u<=8116||u>=8118&&u<=8124||8126==u||u>=8130&&u<=8132||u>=8134&&u<=8140||u>=8144&&u<=8147||u>=8150&&u<=8155||u>=8160&&u<=8172||u>=8178&&u<=8180||u>=8182&&u<=8188||8486==u||u>=8490&&u<=8491||8494==u||u>=8576&&u<=8578||u>=12353&&u<=12436||u>=12449&&u<=12538||u>=12549&&u<=12588||u>=44032&&u<=55203||u>=19968&&u<=40869||12295==u||u>=12321&&u<=12329},Utilities.isNCNameChar=function(u){return u>=48&&u<=57||u>=1632&&u<=1641||u>=1776&&u<=1785||u>=2406&&u<=2415||u>=2534&&u<=2543||u>=2662&&u<=2671||u>=2790&&u<=2799||u>=2918&&u<=2927||u>=3047&&u<=3055||u>=3174&&u<=3183||u>=3302&&u<=3311||u>=3430&&u<=3439||u>=3664&&u<=3673||u>=3792&&u<=3801||u>=3872&&u<=3881||46==u||45==u||95==u||Utilities.isLetter(u)||u>=768&&u<=837||u>=864&&u<=865||u>=1155&&u<=1158||u>=1425&&u<=1441||u>=1443&&u<=1465||u>=1467&&u<=1469||1471==u||u>=1473&&u<=1474||1476==u||u>=1611&&u<=1618||1648==u||u>=1750&&u<=1756||u>=1757&&u<=1759||u>=1760&&u<=1764||u>=1767&&u<=1768||u>=1770&&u<=1773||u>=2305&&u<=2307||2364==u||u>=2366&&u<=2380||2381==u||u>=2385&&u<=2388||u>=2402&&u<=2403||u>=2433&&u<=2435||2492==u||2494==u||2495==u||u>=2496&&u<=2500||u>=2503&&u<=2504||u>=2507&&u<=2509||2519==u||u>=2530&&u<=2531||2562==u||2620==u||2622==u||2623==u||u>=2624&&u<=2626||u>=2631&&u<=2632||u>=2635&&u<=2637||u>=2672&&u<=2673||u>=2689&&u<=2691||2748==u||u>=2750&&u<=2757||u>=2759&&u<=2761||u>=2763&&u<=2765||u>=2817&&u<=2819||2876==u||u>=2878&&u<=2883||u>=2887&&u<=2888||u>=2891&&u<=2893||u>=2902&&u<=2903||u>=2946&&u<=2947||u>=3006&&u<=3010||u>=3014&&u<=3016||u>=3018&&u<=3021||3031==u||u>=3073&&u<=3075||u>=3134&&u<=3140||u>=3142&&u<=3144||u>=3146&&u<=3149||u>=3157&&u<=3158||u>=3202&&u<=3203||u>=3262&&u<=3268||u>=3270&&u<=3272||u>=3274&&u<=3277||u>=3285&&u<=3286||u>=3330&&u<=3331||u>=3390&&u<=3395||u>=3398&&u<=3400||u>=3402&&u<=3405||3415==u||3633==u||u>=3636&&u<=3642||u>=3655&&u<=3662||3761==u||u>=3764&&u<=3769||u>=3771&&u<=3772||u>=3784&&u<=3789||u>=3864&&u<=3865||3893==u||3895==u||3897==u||3902==u||3903==u||u>=3953&&u<=3972||u>=3974&&u<=3979||u>=3984&&u<=3989||3991==u||u>=3993&&u<=4013||u>=4017&&u<=4023||4025==u||u>=8400&&u<=8412||8417==u||u>=12330&&u<=12335||12441==u||12442==u||183==u||720==u||721==u||903==u||1600==u||3654==u||3782==u||12293==u||u>=12337&&u<=12341||u>=12445&&u<=12446||u>=12540&&u<=12542},Utilities.coalesceText=function(u){for(var t=u.firstChild;null!=t;t=t.nextSibling)if(3==t.nodeType||4==t.nodeType){var e=t.nodeValue,r=t
for(t=t.nextSibling;null!=t&&(3==t.nodeType||4==t.nodeType);){e+=t.nodeValue
var n=t
t=t.nextSibling,n.parentNode.removeChild(n)}if(4==r.nodeType){var i=r.parentNode
if(null==r.nextSibling)i.removeChild(r),i.appendChild(i.ownerDocument.createTextNode(e))
else{var o=r.nextSibling
i.removeChild(r),i.insertBefore(i.ownerDocument.createTextNode(e),o)}}else r.nodeValue=e
if(null==t)break}else 1==t.nodeType&&Utilities.coalesceText(t)},Utilities.instance_of=function(u,t){for(;null!=u;){if(u.constructor===t)return!0
if(u===Object)return!1
u=u.constructor.superclass}return!1},Utilities.getElementById=function(u,t){if(1==u.nodeType&&(u.getAttribute("id")==t||u.getAttributeNS(null,"id")==t))return u
for(var e=u.firstChild;null!=e;e=e.nextSibling){var r=Utilities.getElementById(e,t)
if(null!=r)return r}return null},L.prototype={},L.prototype.constructor=L,L.superclass=Object.prototype,L.prototype.toString=function(){var u=this.exception?": "+this.exception.toString():""
switch(this.code){case L.INVALID_EXPRESSION_ERR:return"Invalid expression"+u
case L.TYPE_ERR:return"Type error"+u}},L.INVALID_EXPRESSION_ERR=51,L.TYPE_ERR=52,U.prototype={},U.prototype.constructor=U,U.superclass=Object.prototype,U.prototype.evaluate=function(u,t,e){this.context.expressionContextNode=u
var r=this.xpath.evaluate(this.context)
return new M(r,t)},j.prototype={},j.prototype.constructor=j,j.superclass=Object.prototype,j.prototype.getNamespace=function(u,t){return null==this.xpathNSResolver?null:this.xpathNSResolver.lookupNamespaceURI(u)},$.prototype={},$.prototype.constructor=$,$.superclass=Object.prototype,$.prototype.lookupNamespaceURI=function(u){return this.namespaceResolver.getNamespace(u,this.node)},M.prototype={},M.prototype.constructor=M,M.superclass=Object.prototype,M.prototype.iterateNext=function(){if(this.resultType!=M.UNORDERED_NODE_ITERATOR_TYPE&&this.resultType!=M.ORDERED_NODE_ITERATOR_TYPE)throw new L(L.TYPE_ERR)
return this.nodes[this.iteratorIndex++]},M.prototype.snapshotItem=function(u){if(this.resultType!=M.UNORDERED_NODE_SNAPSHOT_TYPE&&this.resultType!=M.ORDERED_NODE_SNAPSHOT_TYPE)throw new L(L.TYPE_ERR)
return this.nodes[u]},M.ANY_TYPE=0,M.NUMBER_TYPE=1,M.STRING_TYPE=2,M.BOOLEAN_TYPE=3,M.UNORDERED_NODE_ITERATOR_TYPE=4,M.ORDERED_NODE_ITERATOR_TYPE=5,M.UNORDERED_NODE_SNAPSHOT_TYPE=6,M.ORDERED_NODE_SNAPSHOT_TYPE=7,M.ANY_UNORDERED_NODE_TYPE=8,M.FIRST_ORDERED_NODE_TYPE=9
try{var H=!0
try{document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("XPath",null)&&(H=!1)}catch(u){}H&&V(document,new t)}catch(u){}V(u,new t),u.XPathResult=M,u.select=function(t,e,r){return u.selectWithResolver(t,e,null,r)},u.useNamespaces=function(t){var e={mappings:t||{},lookupNamespaceURI:function(u){return this.mappings[u]}}
return function(t,r,n){return u.selectWithResolver(t,r,e,n)}},u.selectWithResolver=function(u,e,r,n){var i=new U(u,r,new t),o=M.ANY_TYPE,a=i.evaluate(e,o,null)
return a.resultType==M.STRING_TYPE?a=a.stringValue:a.resultType==M.NUMBER_TYPE?a=a.numberValue:a.resultType==M.BOOLEAN_TYPE?a=a.booleanValue:(a=a.nodes,n&&(a=a[0])),a},u.select1=function(t,e){return u.select(t,e,!0)}}("undefined"!=typeof e?e:xpath)},{}],50:[function(u,t,e){!function(u,e){"undefined"!=typeof t?t.exports=e():"function"==typeof define&&"object"==typeof define.amd?define(e):this[u]=e()}("domready",function(){var u,t=[],e=document,r=e.documentElement.doScroll,n="DOMContentLoaded",i=(r?/^loaded|^c/:/^loaded|^i|^c/).test(e.readyState)
return i||e.addEventListener(n,u=function(){for(e.removeEventListener(n,u),i=1;u=t.shift();)u()}),function(u){i?setTimeout(u,0):t.push(u)}})},{}],51:[function(u,t,e){(function(){function e(u){return u>0?u-1:6}function r(u,t){return short="undefined"!=typeof u&&u,u?v?v.extractDayNames(t).format.abbreviated:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]:v?v.extractDayNames(t).format.wide:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]}function n(u,t){short="undefined"!=typeof u&&u
var e=[]
return e=u?v?v.extractMonthNames(t).format.abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]:v?v.extractMonthNames(t).format.wide:["January","February","March","April","May","June","July","August","September","October","November","December"],e.unshift(""),e}function i(u,t,e){var r=365*(u-1)+Math.floor((u-1)/4)-Math.floor((u-1)/100)+Math.floor((u-1)/400),n=D[t]+(t>2&&o(u)?1:0)
return r+n+e}function o(u){return u%4===0&&(u%100!==0||u%400===0)}function a(u,t){return u--,t--,Math.floor(t/4)-Math.floor(u/4)-(Math.floor(t/100)-Math.floor(u/100))+(Math.floor(t/400)-Math.floor(u/400))}function s(u,t){if(t<1||t>12)throw new E
var e=p(u,t,1),r=d[t]+(2===t&&o(u))
return[e,r]}function c(u){if(u="undefined"==typeof u?"en_US":u,v&&v.localeIds.indexOf(u.replace(/-/g,"_").toLowerCase())===-1||!v&&"en_us"!==u.replace(/-/g,"_").toLowerCase())throw new f
this.day_name=r(!1,u),this.day_abbr=r(!0,u),this.month_name=n(!1,u),this.month_abbr=n(!0,u)}function l(u){var t=u[0],e=u[1],r=u[2],n=u[3],a=u[4],s=u[5]
if(e<1||e>12)throw new E
if(r<1||r>d[e]+(2===e&&o(t)))throw new h
if(n<0||n>23||a<0||a>59||s<0||s>59)throw new F
var c=i(t,e,1)-719163+r-1,l=24*c+n,p=60*l+a,A=60*p+s
return A}function p(u,t,r){if(t<1||t>12)throw new E
if(r<1||r>d[t]+(2===t&&o(u)))throw new h
var n=new Date(u,t-1,r)
return e(n.getDay())}function A(u){if(this._firstweekday="undefined"==typeof u?0:u,u<0||u>6)throw new C
this._oneday=864e5,this._onehour=36e5}function f(u){this.name="IllegalLocaleError",this.message="undefined"==typeof u?"Invalid locale specified.":u}function h(u){this.name="IllegalDayError",this.message="undefined"==typeof u?"Invalid day specified.":u}function E(u){this.name="IllegalMonthError",this.message="undefined"==typeof u?"Invalid month specified.":u}function F(u){this.name="IllegalTimeError",this.message="undefined"==typeof u?"Invalid time element specified.":u}function C(u){this.name="IllegalWeekdayError",this.message="undefined"==typeof u?"Invalid weekday specified.":u}var d=[0,31,28,31,30,31,30,31,31,30,31,30,31],D=[-1,0,31,59,90,120,151,181,212,243,273,304,334]
try{var v=u("cldr")}catch(u){v=!1}A.prototype.getfirstweekday=function(){return this._firstweekday},A.prototype.setfirstweekday=function(u){if(u<0||u>6)throw new C
this._firstweekday=u},A.prototype.iterweekdays=function(){for(var u=[],t=this._firstweekday;t<this._firstweekday+7;t++)u.push(t%7)
return u},A.prototype.itermonthdates=function(u,t){if(t<1||t>12)throw new E
var r=new Date(u,t-1,1),n=e(r.getDay()),i=n-this._firstweekday>=0?(n-this._firstweekday)%7:7+(n-this._firstweekday)
r.setTime(r.getTime()-i*this._oneday)
for(var o=[];;){o.push(new Date(r.getTime()))
var a=r.getDate()
for(r.setTime(r.getTime()+this._oneday);r.getDate()===a;)r.setTime(r.getTime()+this._onehour)
if(r.getMonth()!==t-1&&e(r.getDay())===this._firstweekday)break}return o},A.prototype.itermonthdays=function(u,t){return this.itermonthdates(u,t).map(function(u){return u.getMonth()===t-1?u.getDate():0})},A.prototype.itermonthdays2=function(u,t){return this.itermonthdates(u,t).map(function(u){return u.getMonth()===t-1?[u.getDate(),e(u.getDay())]:[0,e(u.getDay())]},this)},A.prototype.monthdatescalendar=function(u,t){var e=[]
dates=this.itermonthdates(u,t)
for(var r=0;r<dates.length;r+=7)e.push(dates.slice(r,r+7))
return e},A.prototype.monthdayscalendar=function(u,t){var e=[]
dates=this.itermonthdays(u,t)
for(var r=0;r<dates.length;r+=7)e.push(dates.slice(r,r+7))
return e},A.prototype.monthdays2calendar=function(u,t){var e=[]
dates=this.itermonthdays2(u,t)
for(var r=0;r<dates.length;r+=7)e.push(dates.slice(r,r+7))
return e},A.prototype.yeardatescalendar=function(u,t){t="undefined"==typeof t?3:t
for(var e=[],r=1;r<=12;r++)e.push(this.monthdatescalendar(u,r))
for(var n=[],i=0;i<e.length;i+=t)n.push(e.slice(i,i+t))
return n},A.prototype.yeardayscalendar=function(u,t){t="undefined"==typeof t?3:t
for(var e=[],r=1;r<=12;r++)e.push(this.monthdayscalendar(u,r))
for(var n=[],i=0;i<e.length;i+=t)n.push(e.slice(i,i+t))
return n},A.prototype.yeardays2calendar=function(u,t){t="undefined"==typeof t?3:t
for(var e=[],r=1;r<=12;r++)e.push(this.monthdays2calendar(u,r))
for(var n=[],i=0;i<e.length;i+=t)n.push(e.slice(i,i+t))
return n},f.prototype=new Error,f.prototype.constructor=f,h.prototype=new Error,h.prototype.constructor=h,E.prototype=new Error,E.prototype.constructor=E,F.prototype=new Error,F.prototype.constructor=F,C.prototype=new Error,C.prototype.constructor=C
var B=function(){}
B.isleap=o,B.leapdays=a,B.monthrange=s,B.weekday=p,B.setlocale=c,B.timegm=l,B.Calendar=A,B.IllegalLocaleError=f,B.IllegalDayError=h,B.IllegalMonthError=E,B.IllegalTimeError=F,B.IllegalWeekdayError=C,B.MONDAY=0,B.TUESDAY=1,B.WEDNESDAY=2,B.THURSDAY=3,B.FRIDAY=4,B.SATURDAY=5,B.SUNDAY=6,B.JANUARY=1,B.FEBRUARY=2,B.MARCH=3,B.APRIL=4,B.MAY=5,B.JUNE=6,B.JULY=7,B.AUGUST=8,B.SEPTEMBER=9,B.OCTOBER=10,B.NOVEMBER=11,B.DECEMBER=12,B.setlocale()
var m=this
if("undefined"!=typeof t&&t.exports)t.exports=B
else{var g=m.calendar
B.noconflict=function(){return m.calendar=g,B},m.calendar=B}}).call(this)},{cldr:9}],52:[function(u,t,e){(function(u){"use strict"
function e(u){var t,e=u.length,r=this,n=0,i=r.i=r.j=0,o=r.S=[]
for(e||(u=[e++]);n<a;)o[n]=n++
for(n=0;n<a;n++)o[n]=o[i=E&i+u[n%e]+(t=o[n])],o[i]=t;(r.g=function(u){for(var t,e=0,n=r.i,i=r.j,o=r.S;u--;)t=o[n=E&n+1],e=e*a+o[E&(o[n]=o[i=E&i+t])+(o[i]=t)]
return r.i=n,r.j=i,e})(a)}function r(u,t){var e,n=[],i=(typeof u)[0]
if(t&&"o"==i)for(e in u)try{n.push(r(u[e],t-1))}catch(u){}return n.length?n:"s"==i?u:u+"\0"}function n(u,t){for(var e,r=u+"",n=0;n<r.length;)t[E&n]=E&(e^=19*t[E&n])+r.charCodeAt(n++)
return o(t)}function i(u){try{return p.crypto.getRandomValues(u=new Uint8Array(a)),o(u)}catch(u){return[+new Date,p,p.navigator&&p.navigator.plugins,p.screen,o(l)]}}function o(u){return String.fromCharCode.apply(0,u)}var a=256,s=6,c=52,l=[],p="undefined"==typeof u?window:u,A=Math.pow(a,s),f=Math.pow(2,c),h=2*f,E=a-1,F=Math.random
t.exports=function(u,c){if(c&&c.global===!0)return c.global=!1,Math.random=t.exports(u,c),c.global=!0,Math.random
var p=c&&c.entropy||!1,E=[],F=(n(r(p?[u,o(l)]:0 in arguments?u:i(),3),E),new e(E))
return n(o(F.S),l),function(){for(var u=F.g(s),t=A,e=0;u<f;)u=(u+e)*a,t*=a,e=F.g(1)
for(;u>=h;)u/=2,t/=2,e>>>=1
return(u+e)/t}},t.exports.resetGlobal=function(){Math.random=F},n(Math.random(),l)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[5])
