"use strict";var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var Enemy=function(e){function t(e){_classCallCheck(this,t);var n=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.hp=1,n.speed=5,n.dieImgs=[],n.score=0,n.type=e,n}return _inherits(t,Father),_createClass(t,[{key:"init",value:function(){switch(this.ele=document.createElement("div"),gameEngine.ele.appendChild(this.ele),gameEngine.enemys.push(this),this.type){case this.ENEMY_TYPE_LARGE:this.ele.className="enemy-large",this.hp=this.ENEMY_HP_LARGE,this.speed=this.ENEMY_SPEED_LARGE,this.dieImgs=["images2/plane3_die1.png","images2/plane3_die2.png","images2/plane3_die3.png","images2/plane3_die4.png","images2/plane3_die5.png","images2/plane3_die6.png"],this.score=30;break;case this.ENEMY_TYPE_MIDDLE:this.ele.className="enemy-middle",this.hp=this.ENEMY_HP_MIDDLE,this.speed=this.ENEMY_SPEED_MIDDLE,this.dieImgs=["images2/plane2_die1.png","images2/plane2_die2.png","images2/plane2_die3.png","images2/plane2_die4.png"],this.score=20;break;case this.ENEMY_TYPE_SMALL:this.ele.className="enemy-small",this.hp=this.ENEMY_HP_SMALL,this.speed=this.ENEMY_SPEED_SMALL,this.dieImgs=["images2/plane1_die1.png","images2/plane1_die2.png","images2/plane1_die3.png"],this.score=10;break;default:console.log("没有这种飞机")}return this.ele.style.left=parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth))+"px",this.ele.style.top=-this.ele.offsetHeight+"px",this}},{key:"move",value:function(){var e=this;this.timer=setInterval(function(){if(e.ele.offsetTop>=gameEngine.ele.offsetHeight)return clearInterval(e.timer),gameEngine.ele.removeChild(e.ele),void gameEngine.enemys.splice(gameEngine.enemys.indexOf(e),1);e.ele.style.top=e.ele.offsetTop+e.speed+"px"},30)}},{key:"hurt",value:function(){this.hp--,0==this.hp&&(gameEngine.score+=this.score,score.innerHTML="分数："+gameEngine.score,this.boom())}},{key:"boom",value:function(){clearInterval(this.timer);var e=this,t=0,n=setInterval(function(){if(t>=e.dieImgs.length)return clearInterval(n),gameEngine.ele.removeChild(e.ele),void gameEngine.enemys.splice(gameEngine.enemys.indexOf(e),1);e.ele.style.background="url("+e.dieImgs[t++]+") no-repeat"},100)}}]),t}();Enemy.prototype.ENEMY_TYPE_LARGE=1,Enemy.prototype.ENEMY_TYPE_MIDDLE=2,Enemy.prototype.ENEMY_TYPE_SMALL=3,Enemy.prototype.ENEMY_HP_LARGE=8,Enemy.prototype.ENEMY_HP_MIDDLE=3,Enemy.prototype.ENEMY_HP_SMALL=1,Enemy.prototype.ENEMY_SPEED_LARGE=3,Enemy.prototype.ENEMY_SPEED_MIDDLE=5,Enemy.prototype.ENEMY_SPEED_SMALL=7;