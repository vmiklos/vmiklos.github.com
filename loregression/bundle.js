!function(){var e,t={exports:{}};e=function(){var e,t=[],n=document,o=(n.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(n.readyState);return o||n.addEventListener("DOMContentLoaded",e=function(){for(n.removeEventListener("DOMContentLoaded",e),o=1;e=t.shift();)e()}),function(e){o?setTimeout(e,0):t.push(e)}},t.exports=e();function n(e){return"https://bugs.documentfoundation.org/buglist.cgi?keywords=regression%2C%20&keywords_type=allwords&longdesc=Adding%20Cc%3A%20to%20"+encodeURI(e)+"&longdesc_type=substring&query_format=advanced&resolution=---"}function o(){var e=document.getElementById("name").value;document.location.href=n(e)}function d(){var e=document.getElementById("name"),t=e.value;e.value=n(t)}(t=t.exports)((function(){var e=document.getElementsByTagName("body")[0],t=document.createElement("p");t.appendChild(document.createTextNode("Takes a LibreOffice contributor name from public git and attempts to look up matching bisected bugs.")),e.appendChild(t);var n=document.createElement("p"),a=document.createElement("input");a.id="name",a.type="text",a.placeholder="Name",a.style.width="50%",n.appendChild(a),n.appendChild(document.createElement("br"));var c=document.createElement("input");c.type="button",c.value="Link",c.onclick=d,n.appendChild(c),n.appendChild(document.createTextNode(" "));var r=document.createElement("input");r.type="button",r.value="Jump",r.onclick=o,n.appendChild(r),e.appendChild(n);var u=document.createElement("p");u.appendChild(document.createTextNode("NOTE: the purpose of this page is to allow contributors to find badness before others do, not to put blame on them.")),e.appendChild(u)}))}();