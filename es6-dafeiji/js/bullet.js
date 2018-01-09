


//子弹
class Bullet extends Father{
	
	constructor(){
		super();
		//属性ele
		//this.ele = null;
	}
	
	//方法
	//init
	init(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		
		//将子弹节点添加到页面的同时， 将当前子弹对象添加到数组bullets中保存
		gameEngine.bullets.push(this);
		//console.log(gameEngine.bullets);
		
		this.ele.className = "bullet";
		this.ele.style.left = (new Plane()).ele.offsetLeft + (new Plane()).ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px";
		this.ele.style.top = (new Plane()).ele.offsetTop - this.ele.offsetHeight + "px";
		return this;
	}
	
	//移动
	move(){
		let that = this;
		//将定时器返回值声明成当前对象的一个属性，整个对象都可以使用
		this.timer = setInterval(()=>{
			if(that.ele.offsetTop <= -18){
				clearInterval(that.timer);		//停止运动
				gameEngine.ele.removeChild(that.ele);	//移除子弹节点
				
				//当子弹节点从页面上移除的同时， 将当前的子弹对象从bullets中移除
				gameEngine.bullets.splice(gameEngine.bullets.indexOf(that), 1);
				return;
			}
			that.ele.style.top = that.ele.offsetTop - 10 + "px";
		}, 30);
	}
	
	//爆炸
	boom(){
		clearInterval(this.timer);		//停止移动
		this.ele.className = "bullet-die";
		
		//爆炸动画
		let that = this;
		const dieImgs = ["images2/die1.png", "images2/die2.png"];
		let i=0;
		let timer = setInterval(()=>{
			if(i>=1){
				clearInterval(timer);
				gameEngine.ele.removeChild(that.ele);	//移除子弹节点
				return;
			}
			that.ele.style.background = "url("+ dieImgs[++i] +") no-repeat";
		}, 50);
	}
}
