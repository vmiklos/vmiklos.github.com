(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var domready=require("domready");function mailArchiveJump(){var e=document.getElementById("msgid").value;document.location.href="https://www.mail-archive.com/search?l=mid&q="+e}function debianJump(){var e=document.getElementById("msgid").value;document.location.href="https://lists.debian.org/msgid-search/"+e}function mailArchiveShow(){var e=document.getElementById("msgid"),t=e.value;e.value="https://www.mail-archive.com/search?l=mid&q="+t}function debianShow(){var e=document.getElementById("msgid"),t=e.value;e.value="https://lists.debian.org/msgid-search/"+t}domready(function(){var e=document.getElementsByTagName("body")[0],t=document.createElement("p");t.appendChild(document.createTextNode("Takes a Message-ID from a public mailing list and attempts to look up a public archive entry for it from multiple sources.")),e.appendChild(t);var a=document.createElement("p"),d=document.createElement("input");d.id="msgid",d.type="text",d.placeholder="Message-ID",d.style.width="50%",a.appendChild(d),a.appendChild(document.createElement("br"));var n=document.createElement("input");n.type="button",n.value="Mail Archive Link",n.onclick=mailArchiveShow,a.appendChild(n),a.appendChild(document.createTextNode(" "));var i=document.createElement("input");i.type="button",i.value="Debian Link",i.onclick=debianShow,a.appendChild(i),a.appendChild(document.createElement("br"));var c=document.createElement("input");c.type="button",c.value="Mail Archive Jump",c.onclick=mailArchiveJump,a.appendChild(c),a.appendChild(document.createTextNode(" "));var l=document.createElement("input");l.type="button",l.value="Debian Jump",l.onclick=debianJump,a.appendChild(l),e.appendChild(a);var m=document.createElement("p");m.appendChild(document.createTextNode("Example Mail Archive MessageID: cfb1d155-499d-3205-8283-ce84c39dbb14@redhat.com")),e.appendChild(m);var o=document.createElement("p");o.appendChild(document.createTextNode("Example Debian MessageID: 20171121214924.kwjklln5t6t7dedh@rene-engelhard.de")),e.appendChild(o)});

},{"domready":2}],2:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}]},{},[1]);
