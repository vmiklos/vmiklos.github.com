!function(){var t={};(function(e){var n=function(t){return t&&t.Math==Math&&t};t=n("object"==typeof globalThis&&globalThis)||n("object"==typeof window&&window)||n("object"==typeof self&&self)||n("object"==typeof e&&e)||function(){return this}()||Function("return this")()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});var e=function(t){try{return!!t()}catch(e){return!0}},n=!e((function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})),r={},o={}.propertyIsEnumerable,a=Object.getOwnPropertyDescriptor,i=(a&&o.call({1:2},1),function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}),c={}.toString,u=function(t){return c.call(t).slice(8,-1)},l="".split,f=e((function(){return!Object("z").propertyIsEnumerable(0)}))?function(t){return"String"==u(t)?l.call(t,""):Object(t)}:Object,s=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t},g=function(t){return f(s(t))},p=function(t){return"object"==typeof t?null!==t:"function"==typeof t},y=function(t,e){if(!p(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!p(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!p(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!p(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")},h={}.hasOwnProperty,v=function(t,e){return h.call(t,e)},d=t.document,m=p(d)&&p(d.createElement),b=!n&&!e((function(){return 7!=Object.defineProperty((t="div",m?d.createElement(t):{}),"a",{get:function(){return 7}}).a;var t})),k={},z=Object.getOwnPropertyDescriptor;k.f=n?z:function(t,e){if(t=g(t),e=y(e,!0),b)try{return z(t,e)}catch(n){}if(v(t,e))return i(!r.f.call(t,e),t[e])};var S=function(t){if(!p(t))throw TypeError(String(t)+" is not an object");return t},j={},w=Object.defineProperty;j.f=n?w:function(t,e,n){if(S(t),e=y(e,!0),S(n),b)try{return w(t,e,n)}catch(r){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t};var A=n?function(t,e,n){return j.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t},O=function(e,n){try{A(t,e,n)}catch(r){t[e]=n}return n},P=t["__core-js_shared__"]||O("__core-js_shared__",{}),E={},M=Function.toString;"function"!=typeof P.inspectSource&&(P.inspectSource=function(t){return M.call(t)}),E=P.inspectSource;var T,_=t.WeakMap,x="function"==typeof _&&/native code/.test(E(_));(T=function(t,e){return P[t]||(P[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.7.0",mode:"global",copyright:"\xa9 2020 Denis Pushkarev (zloirock.ru)"});var L,C,N,D,F=0,I=Math.random(),R=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++F+I).toString(36)},G=T("keys"),W={},B=t.WeakMap;if(x){var K=P.state||(P.state=new B),V=K.get,Y=K.has,q=K.set;L=function(t,e){return e.facade=t,q.call(K,t,e),e},C=function(t){return V.call(K,t)||{}},N=function(t){return Y.call(K,t)}}else{var H=G[D="state"]||(G[D]=R(D));W[H]=!0,L=function(t,e){return e.facade=t,A(t,H,e),e},C=function(t){return v(t,H)?t[H]:{}},N=function(t){return v(t,H)}}var J,Q={get:C,enforce:function(t){return N(t)?C(t):L(t,{})}},U=Q.get,X=Q.enforce,Z=String(String).split("String");(J=function(e,n,r,o){var a,i=!!o&&!!o.unsafe,c=!!o&&!!o.enumerable,u=!!o&&!!o.noTargetGet;"function"==typeof r&&("string"!=typeof n||v(r,"name")||A(r,"name",n),(a=X(r)).source||(a.source=Z.join("string"==typeof n?n:""))),e!==t?(i?!u&&e[n]&&(c=!0):delete e[n],c?e[n]=r:A(e,n,r)):c?e[n]=r:O(n,r)})(Function.prototype,"toString",(function(){return"function"==typeof this&&U(this).source||E(this)}));var $,tt=t,et=function(t){return"function"==typeof t?t:void 0},nt=Math.ceil,rt=Math.floor,ot=function(t){return isNaN(t=+t)?0:(t>0?rt:nt)(t)},at=Math.min,it=Math.max,ct=Math.min,ut={indexOf:($=!1,function(t,e,n){var r,o,a=g(t),i=(o=a.length)>0?at(ot(o),9007199254740991):0,c=function(t,e){var n=ot(t);return n<0?it(n+e,0):ct(n,e)}(n,i);if($&&e!=e){for(;i>c;)if((r=a[c++])!=r)return!0}else for(;i>c;c++)if(($||c in a)&&a[c]===e)return $||c||0;return!$&&-1})}.indexOf,lt={},ft=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"].concat("length","prototype");lt.f=Object.getOwnPropertyNames||function(t){return function(t,e){var n,r=g(t),o=0,a=[];for(n in r)!v(W,n)&&v(r,n)&&a.push(n);for(;e.length>o;)v(r,n=e[o++])&&(~ut(a,n)||a.push(n));return a}(t,ft)};var st={};st.f=Object.getOwnPropertySymbols;var gt=function(e,n){return arguments.length<2?et(tt[e])||et(t[e]):tt[e]&&tt[e][n]||t[e]&&t[e][n]}("Reflect","ownKeys")||function(t){var e=lt.f(S(t)),n=st.f;return n?e.concat(n(t)):e},pt=function(t,e){for(var n=gt(e),r=j.f,o=k.f,a=0;a<n.length;a++){var i=n[a];v(t,i)||r(t,i,o(e,i))}},yt=/#|\.prototype\./,ht=function(t,n){var r=dt[vt(t)];return r==bt||r!=mt&&("function"==typeof n?e(n):!!n)},vt=ht.normalize=function(t){return String(t).replace(yt,".").toLowerCase()},dt=ht.data={},mt=ht.NATIVE="N",bt=ht.POLYFILL="P",kt=ht,zt=k.f,St=!!Object.getOwnPropertySymbols&&!e((function(){return!String(Symbol())})),jt=St&&!Symbol.sham&&"symbol"==typeof Symbol.iterator,wt=T("wks"),At=t.Symbol,Ot=jt?At:At&&At.withoutSetter||R,Pt=function(t){return v(wt,t)||(St&&v(At,t)?wt[t]=At[t]:wt[t]=Ot("Symbol."+t)),wt[t]},Et=Pt("match"),Mt=function(){var t=S(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e},Tt=Pt("replace"),_t=RegExp.prototype;!function(e,n){var r,o,a,i,c,u=e.target,l=e.global,f=e.stat;if(r=l?t:f?t[u]||O(u,{}):(t[u]||{}).prototype)for(o in n){if(i=n[o],a=e.noTargetGet?(c=zt(r,o))&&c.value:r[o],!kt(l?o:u+(f?".":"#")+o,e.forced)&&void 0!==a){if(typeof i==typeof a)continue;pt(i,a)}(e.sham||a&&a.sham)&&A(i,"sham",!0),J(r,o,i,e)}}({target:"String",proto:!0},{replaceAll:function t(e,n){var r,o,a,i,c,l,f,g,y,h=s(this);if(null!=e){if(p(g=e)&&(void 0!==(y=g[Et])?!!y:"RegExp"==u(g))&&!~String(s("flags"in _t?e.flags:Mt.call(e))).indexOf("g"))throw TypeError("`.replaceAll` does not allow non-global regexes");if(void 0!==(r=e[Tt]))return r.call(e,h,n);0}if(o=String(h),""===(a=String(e)))return t.call(o,/(?:)/g,n);if(i=o.split(a),"function"!=typeof n)return i.join(String(n));for(l=(c=i[0]).length,f=1;f<i.length;f++)c+=String(n(a,l,o)),l+=a.length+i[f].length,c+=i[f];return c}});var xt,Lt,Ct,Nt=function(t,e,n){if(function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function")}(t),void 0===e)return t;switch(n){case 0:return function(){return t.call(e)};case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}},Dt=Function.call,Ft=(xt="replaceAll",Nt(Dt,t["String"].prototype[xt],Lt),{exports:{}});Ct=function(){var t,e=[],n=document,r=(n.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return r||n.addEventListener("DOMContentLoaded",t=function(){for(n.removeEventListener("DOMContentLoaded",t),r=1;t=e.shift();)t()}),function(t){r?setTimeout(t,0):e.push(t)}},Ft.exports=Ct(),Ft=Ft.exports;function It(t){for(var e,n=t.length-1;n>0;n--){var r=Math.floor(Math.random()*(n+1));e=[t[r],t[n]],t[n]=e[0],t[r]=e[1]}}Object.defineProperty({},"__esModule",{value:!0}),Ft((function(){var t="";t+="{Actor04} bort \xe9s kal\xe1csot visz a beteg {Actor11}. \xdatk\xf6zben \xf6sszetal\xe1lkozik ",t+="{Actor22}, \xe9s az r\xe1besz\xe9li, hogy vir\xe1got is vigyen. M\xedg {Actor00} vir\xe1got szed, ",t+="{Actor20} elnyargal {Actor13}, megeszi \xe9s mag\xe1ra \xf6ltve h\xe1l\xf3k\xf6nt\xf6s\xe9t \xe9s ",t+="h\xe1l\xf3sapk\xe1j\xe1t, befekszik az \xe1gy\xe1ba. Nemsok\xe1ra meg\xe9rkezik {Actor00}, \xe9s ",t+="megk\xe9rdezi, hogy mi\xe9rt olyan nagy a f\xfcle, szeme, sz\xe1ja. {Actor24} v\xe1laszai: a) ",t+="az\xe9rt, hogy jobban halljalak, b) az\xe9rt, hogy jobban l\xe1ssalak, c) az\xe9rt, hogy ",t+="k\xf6nnyebben bekaphassalak/vagy felsz\xf3l\xedtja, hogy fek\xfcdj\xf6n mell\xe9. {Actor04} ",t+="nekik\xe9sz\xfcl\u0151dik, de irt\xf3zik \xe9s k\xe9rd\xe9seket tesz fel: mi\xe9rt olyan nagy/vagy sz\u0151r\xf6s ",t+="a l\xe1ba, a keze, a sz\xe1ja stb., {Actor20} bekapja. Az arraj\xe1r\xf3 {Actor35} ",t+="meghallja {Actor20} er\u0151s horkol\xe1s\xe1t, bemegy, felv\xe1gja a has\xe1t, \xe9s {Actor00} \xe9s ",t+="{Actor10} elevenen kis\xe9t\xe1l bel\u0151le. A hasat megt\xf6ltik kaviccsal. {Actor24} ",t+="elpusztul.";for(var e=[["Piroska","Pirosk\xe1nak","Pirosk\xe1val","Pirosk\xe1hoz","Piroska","Piroska"],["a nagymama","nagymam\xe1nak","a nagymam\xe1val","a nagymam\xe1hoz","A nagymama","nagymama"],["a farkas","farkasnak","a farkassal","a farkashoz","A farkas","farkas"],["a vad\xe1sz","vad\xe1sznak","a vad\xe1sszal","a vad\xe1szhoz","A vad\xe1sz","vad\xe1sz"]],n=[],r=0;r<e.length;r+=1)n.push(r);for(;;){for(It(n),r=0;r<e.length;r+=1)n[r];break}for(var o=0;o<e.length;o+=1)for(var a=0;a<e[0].length;a+=1){var i="{Actor"+o.toString()+a.toString()+"}",c=e[n[o]][a];t=t.replaceAll(i,c)}var u=document.getElementsByTagName("body")[0],l=document.createElement("p");l.appendChild(document.createTextNode(t)),u.appendChild(l)}))}();