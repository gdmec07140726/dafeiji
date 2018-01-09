


//单例模式
let Plane = (function(){
	let myPlane = null;
	
	//返回myPlane对象
	return function(){
		if(!myPlane){
			myPlane = {
				
				//属性
				ele: null,
				fireInterval: 300,		//子弹发射的间隔
				
				//方法
				//init
				init(){
					this.ele = document.createElement("div");
					gameEngine.ele.appendChild(this.ele);
					this.ele.className = "myplane";
					this.ele.style.left = (gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2 + "px";
					this.ele.style.top = gameEngine.ele.offsetHeight-this.ele.offsetHeight + "px";
					return this;
				},
				
				//开火,  发射子弹
				fire(){
					this.fireTimer = setInterval(()=>{
						//创建子弹并发射
						new Bullet().init().move();
					}, this.fireInterval);
				},
				
				//拖拽移动
				move(){
					this.ele.onmousedown = (e)=>{
						e = e || event;
						if(e.preventDefault){
							e.preventDefault();
						}else{
							e.returnValue = false;
						}
						let disx = e.offsetX;
						let disy = e.offsetY;
						
						document.onmousemove = (e)=>{
							e = e || event;
							
							let x = e.pageX - disx - gameEngine.ele.offsetLeft;
							let y = e.pageY - disy - gameEngine.ele.offsetTop;
							
							//console.log(this);	//[object HTMLDocument];
							if(x<0){
								x = 0;
							}else if(x>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
								x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
							}
							
							if(y<0){
								y = 0;
							}else if(y>gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight){
								y = gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight;
							}
							
							myPlane.ele.style.left = x + "px";
							myPlane.ele.style.top = y + "px";
						}
						
						document.onmouseup = ()=>{
							document.onmousemove = document.onmouseup = null;
						}
					}
					
				}
				
			}
		}
		
		return myPlane;
	}
})()












//我的飞机
//let myPlane = {
//	
//	//属性
//	ele: null,
//	fireInterval: 300,		//子弹发射的间隔
//	
//	//方法
//	//init
//	init: function(){
//		this.ele = document.createElement("div");
//		gameEngine.ele.appendChild(this.ele);
//		this.ele.className = "myplane";
//		this.ele.style.left = (gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2 + "px";
//		this.ele.style.top = gameEngine.ele.offsetHeight-this.ele.offsetHeight + "px";
//		return this;
//	},
//	
//	//开火,  发射子弹
//	fire: function(){
//		this.fireTimer = setInterval(function(){
//			//创建子弹并发射
//			new Bullet().init().move();
//		}, this.fireInterval);
//	},
//	
//	//拖拽移动
//	move: function(){
//		this.ele.onmousedown = function(e){
//			e = e || event;
//			if(e.preventDefault){
//				e.preventDefault();
//			}else{
//				e.returnValue = false;
//			}
//			let disx = e.offsetX;
//			let disy = e.offsetY;
//			
//			document.onmousemove = function(e){
//				e = e || event;
//				
//				let x = e.pageX - disx - gameEngine.ele.offsetLeft;
//				let y = e.pageY - disy - gameEngine.ele.offsetTop;
//				
//				//console.log(this);	//[object HTMLDocument];
//				if(x<0){
//					x = 0;
//				}else if(x>gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth){
//					x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
//				}
//				
//				if(y<0){
//					y = 0;
//				}else if(y>gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight){
//					y = gameEngine.ele.offsetHeight-myPlane.ele.offsetHeight;
//				}
//				
//				myPlane.ele.style.left = x + "px";
//				myPlane.ele.style.top = y + "px";
//			}
//			
//			document.onmouseup = function(){
//				document.onmousemove = document.onmouseup = null;
//			}
//		}
//		
//	}
//	
//}
