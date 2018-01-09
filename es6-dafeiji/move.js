

//获取某节点的css属性值
function getStyleAttr(obj, attr){
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[attr];
	}
	return obj.currentStyle[attr];
}


//animate(box, {left:300, top:300, width:300});
function animate(obj, json, fn){
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		
		var bStop = true; //表示可以停止定时器，假设三个属性都已经到达目标值了
		
		//遍历三个属性， 同时改变三个属性的值
		for (var attr in json) {
			var itarget = json[attr];
			
			//1, 获取当前值
			var current;
			if (attr == "opacity") {
				current = Math.round(getStyleAttr(obj, attr)*100);	
			}
			else {
				current = parseInt(getStyleAttr(obj, attr));
			}
			
			//2， 速度
			var speed = (itarget-current)/8;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			
			//3, 判断临界值
			if (current != itarget) {
				bStop = false; //表示至少有一个属性没有到达目标值
			}
			
			//4，运动
			if (attr == "opacity") {
				obj.style[attr] = (current + speed)/100;
				obj.style.filter = "alpha(opacity="+ (current+speed) +");";
			}
			else {
				obj.style[attr] = current + speed + "px";
			}
		}
		
		if (bStop) {
			clearInterval(obj.timer); //停止运动
			
			if (fn) {
				fn(); //当运动停止时， 进行回调
			}
		}
		
	}, 30);
	
}



