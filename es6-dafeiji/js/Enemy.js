


class Enemy extends Father{
	
	//属性
	//ele
	constructor(type){
		super();
		//this.ele = null;
		this.hp = 1;
		this.speed = 5;
		this.dieImgs = [];
		this.score = 0;
		this.type = type;
	}
	
	
	//方法
	//init
	init(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		
		//将敌机节点添加到页面上的同时，	将当前敌机对象添加到数组enemys中
		gameEngine.enemys.push(this);
		//console.log(gameEngine.enemys);
		
		switch(this.type){
			//大型敌机
			case this.ENEMY_TYPE_LARGE :
				this.ele.className = "enemy-large";
				this.hp = this.ENEMY_HP_LARGE;
				this.speed = this.ENEMY_SPEED_LARGE
				this.dieImgs = ["images2/plane3_die1.png", "images2/plane3_die2.png", "images2/plane3_die3.png", "images2/plane3_die4.png", "images2/plane3_die5.png", "images2/plane3_die6.png"];
				this.score = 30;
				break;
				
			//中型敌机
			case this.ENEMY_TYPE_MIDDLE :
				this.ele.className = "enemy-middle";
				this.hp = this.ENEMY_HP_MIDDLE;
				this.speed = this.ENEMY_SPEED_MIDDLE;
				this.dieImgs = ["images2/plane2_die1.png", "images2/plane2_die2.png", "images2/plane2_die3.png", "images2/plane2_die4.png"];
				this.score = 20;
				break;
				
			//小型敌机
			case this.ENEMY_TYPE_SMALL :
				this.ele.className = "enemy-small";
				this.hp = this.ENEMY_HP_SMALL;
				this.speed = this.ENEMY_SPEED_SMALL;
				this.dieImgs = ["images2/plane1_die1.png", "images2/plane1_die2.png", "images2/plane1_die3.png"];
				this.score = 10;
				break;
				
			default :
				console.log("没有这种飞机");
		}
		
		//敌机位置
		this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth - this.ele.offsetWidth)) + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		
		return this;
	}
	
	//移动
	move(){
		let that = this;
		//将定时器返回值声明成当前对象的一个属性，整个对象都可以使用
		this.timer = setInterval(()=>{
			if(that.ele.offsetTop >= gameEngine.ele.offsetHeight){
				clearInterval(that.timer);		//停止移动
				gameEngine.ele.removeChild(that.ele);	//移除节点
				
				//将敌机节点从页面上移除的同时，	将当前敌机对象从数组enemys中移除
				gameEngine.enemys.splice(gameEngine.enemys.indexOf(that), 1);
				return;
			}
			that.ele.style.top = that.ele.offsetTop + that.speed + "px";
		}, 30);
	}
	
	//受到一点伤害
	hurt(){
		this.hp--;
		if(this.hp==0){						//只能写等于0
			gameEngine.score += this.score;
			score.innerHTML = "分数：" + gameEngine.score;
			//console.log("当前分数： " + gameEngine.totalScore);
			this.boom();
		}
	}
	
	//爆炸
	boom(){
		//停止移动
		clearInterval(this.timer);
		
		//爆炸动画
		let that = this;
		let i=0;
		let dieTimer = setInterval(()=>{
			if(i>=that.dieImgs.length){
				clearInterval(dieTimer);	//关闭定时器
				gameEngine.ele.removeChild(that.ele);	//移除节点
				
				//当敌机节点从页面上移除的同时，	将当前敌机对象从数组enemys中移除
				gameEngine.enemys.splice(gameEngine.enemys.indexOf(that), 1);
				return;
			}
			that.ele.style.background = "url("+ that.dieImgs[i++] +") no-repeat";
			
		}, 100);
		
	}
}


//原型
//敌机类型
Enemy.prototype.ENEMY_TYPE_LARGE = 1;		//表示大型敌机
Enemy.prototype.ENEMY_TYPE_MIDDLE = 2;		//表示中型敌机
Enemy.prototype.ENEMY_TYPE_SMALL = 3;		//表示小型敌机

//敌机血量
Enemy.prototype.ENEMY_HP_LARGE = 8;			//大型敌机的血量
Enemy.prototype.ENEMY_HP_MIDDLE = 3;		//中型敌机的血量
Enemy.prototype.ENEMY_HP_SMALL = 1;			//小型敌机的血量

//敌机速度
Enemy.prototype.ENEMY_SPEED_LARGE = 3;		//大型敌机的速度
Enemy.prototype.ENEMY_SPEED_MIDDLE = 5;		//中型敌机的速度
Enemy.prototype.ENEMY_SPEED_SMALL = 7;		//小型敌机的速度