


//游戏引擎
let gameEngine = {
	
	//属性
	//游戏区域（背景图区域）
	ele: null,
	bullets: [],			//当前页面上显示的所有子弹
	enemys: [],				//当前页面上显示的所有敌机
	
	//总分数
	score: 0,
	
	//方法
	//init
	init(){
		this.ele = document.getElementById("main");
		return this;
	},
	
	//开始游戏
	start(){
		console.log("开始游戏");
		
		let myPlane = (new Plane());
		
		//加载游戏
		this.loading(()=>{
			console.log("游戏加载完成");
			
			//创建我的飞机
			myPlane.init().move();			//创建我的飞机，且让它可以拖拽
			myPlane.fire();					//让我的飞机发射子弹
			
			//创建敌机
			gameEngine.createEnemy();
			
			//碰撞检测
			gameEngine.collision();
			
			//显示右上角分数
			score.style.display = "block";
			
			//监听键盘
			gameEngine.listenKeybord();
			
			//移动背景图
			gameEngine.moveBackground();
		});
		
	},
	
	//加载游戏
	loading(cb){
		//logo
		let logo = document.createElement("div");
		this.ele.appendChild(logo);
		logo.className = "logo";
		
		//load
		let load = document.createElement("div");
		this.ele.appendChild(load);
		load.className = "load";
		
		//动画
		let imgs = ["images2/loading1.png", "images2/loading2.png", "images2/loading3.png"];
		let i=0;
		let timer = setInterval(()=>{
			if(i>=5){
				clearInterval(timer);
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//回调
				//if(cb) cb();
				cb && cb();
				return;
			}
			load.style.background = "url("+ imgs[++i%3] +") no-repeat";
		}, 500);
	},
	
	//创建敌机
	createEnemy(){
		//随机创建敌机
		
		//创建大型敌机
		this.timer_large = setInterval(()=>{
			if(Math.random()>0.7){
				new Enemy(Enemy.prototype.ENEMY_TYPE_LARGE).init().move();
			}
		}, 6000);
		
		//创建中型敌机
		this.timer_middle = setInterval(()=>{
			if(Math.random()>0.5){
				new Enemy(Enemy.prototype.ENEMY_TYPE_MIDDLE).init().move();
			}
		}, 3000);
		
		//创建小型敌机
		this.timer_small = setInterval(()=>{
			new Enemy(Enemy.prototype.ENEMY_TYPE_SMALL).init().move();
		}, 1000);
	},
	
	//监听键盘
	listenKeybord(){
		let xspeed = 0;			//保存每一次水平方向键盘按下或松开的速度
		let yspeed = 0;			//保存每一次垂直方向键盘按下或松开的速度
		document.onkeydown = (e)=>{
			e = e||event;
			if(e.keyCode==37 || e.keyCode==65){			//左  或者 a
				xspeed = -10;
			}
			if(e.keyCode==38 || e.keyCode==87){			//上  或者 w
				yspeed = -10;
			}
			if(e.keyCode==39 || e.keyCode==68){			//右  或者 d
				xspeed = 10;
			}
			if(e.keyCode==40 || e.keyCode==83){			//下  或者 s
				yspeed = 10;
			}
		}
		document.onkeyup = (e)=>{
			e = e||event;
			if(e.keyCode==37 || e.keyCode==65 || e.keyCode==39 || e.keyCode==68){
				xspeed = 0;
			}
			if(e.keyCode==38 || e.keyCode==87 || e.keyCode==40 || e.keyCode==83){
				yspeed = 0;
			}
		}
		
		let myPlane = (new Plane());
		this.keyTimer = setInterval(()=>{
			let x = 0, y = 0;
			x = myPlane.ele.offsetLeft + xspeed;
			y = myPlane.ele.offsetTop + yspeed;
			if(x<=0){
				x = 0;
			}else if(x>=gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
			}
			
			if(y<=0){
				y=0;
			}else if(y>=gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight){
				y = gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight;
			}
			
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = y + "px";
		}, 30);
	},
	
	//碰撞检测
	collision(){
		let myPlane = (new Plane());
		let that = this;
		let timer = setInterval(()=>{
			//遍历所有敌机
			for(let i=0; i<that.enemys.length; i++){
				
				//遍历所有子弹
				for(let j=0; j<that.bullets.length; j++){
					
					//判断每个敌机节点 和 每个子弹节点是否有碰撞
					if(isCrash(that.enemys[i].ele, that.bullets[j].ele)){
						//console.log("碰撞了");
						
						//让子弹爆炸并消失
						that.bullets[j].boom();
						that.bullets.splice(j--, 1);
						
						//让敌机受到一点伤害
						that.enemys[i].hurt();
					}
				}
				
				//判断敌机 和 我的飞机是否有碰撞
				if(isCrash(that.enemys[i].ele, myPlane.ele)){
					clearInterval(timer);
					gameEngine.gameOver();		//游戏结束
					return;		//飞机移除了，不需要在循环了，退出循环break也可以
				}
			}
		}, 30);
	},
	
	//游戏结束
	gameOver(){
		let myPlane = (new Plane());
		let dieImgs = ["images2/me_die1.png", "images2/me_die2.png", "images2/me_die3.png", "images2/me_die4.png"];
		let i=0;
		let dieTimer = setInterval(()=>{
			if(i>=dieImgs.length){
				clearInterval(dieTimer);	//关闭定时器，不需要在检测了
				
				gameEngine.ele.removeChild(myPlane.ele);	//移除飞机节点
				clearInterval(myPlane.fireTimer);			//关闭创建子弹的定时器
				clearInterval(gameEngine.timer_large);		//关闭创建大型飞机的定时器
				clearInterval(gameEngine.timer_middle);		//关闭创建中型飞机的定时器
				clearInterval(gameEngine.timer_small);		//关闭创建小型飞机的定时器
				clearInterval(gameEngine.bgTimer);			//停止背景移动
				clearInterval(gameEngine.keyTimer);			//关闭键盘事件移动的定时器
				
				//停止页面上所有敌机移动
				for(let k=0; k<gameEngine.enemys.length; k++){
					clearInterval(gameEngine.enemys[k].timer);
				}
				mask.style.display = "block";		//显示提交面板
				//let p = mask.getElementsByTagName("p")[0];
				p.innerHTML = "本次总分：" + gameEngine.score;		//设置提交面板上的分数
				return;
			}
			myPlane.ele.style.background = "url("+ dieImgs[i++] +") no-repeat";
		}, 100);
	},
	
	moveBackground(){
		let y=0;
		this.bgTimer = setInterval(()=>{
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		}, 30);
	}
	
}

class Father{
	constructor() {
	    this.ele = null;
	}
	init(){
		
	}
	move(){
		
	}
	boom(){
		
	}
}









