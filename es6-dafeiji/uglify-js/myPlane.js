"use strict";var Plane=function(){var e=null;return function(){return e||(e={ele:null,fireInterval:300,init:function(){return this.ele=document.createElement("div"),gameEngine.ele.appendChild(this.ele),this.ele.className="myplane",this.ele.style.left=(gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2+"px",this.ele.style.top=gameEngine.ele.offsetHeight-this.ele.offsetHeight+"px",this},fire:function(){this.fireTimer=setInterval(function(){(new Bullet).init().move()},this.fireInterval)},move:function(){this.ele.onmousedown=function(t){(t=t||event).preventDefault?t.preventDefault():t.returnValue=!1;var n=t.offsetX,i=t.offsetY;document.onmousemove=function(t){var f=(t=t||event).pageX-n-gameEngine.ele.offsetLeft,l=t.pageY-i-gameEngine.ele.offsetTop;f<0?f=0:f>gameEngine.ele.offsetWidth-e.ele.offsetWidth&&(f=gameEngine.ele.offsetWidth-e.ele.offsetWidth),l<0?l=0:l>gameEngine.ele.offsetHeight-e.ele.offsetHeight&&(l=gameEngine.ele.offsetHeight-e.ele.offsetHeight),e.ele.style.left=f+"px",e.ele.style.top=l+"px"},document.onmouseup=function(){document.onmousemove=document.onmouseup=null}}}}),e}}();