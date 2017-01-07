/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-01-04 11:24:16
 * @version $Id$
 */

var fruitObj = function(){

	this.alive = [];//果实是否存活，布尔值
	this.orange = new Image();
	this.blue = new Image();

	this.x = []; //位置信息
	this.y = [];

	this.l = [];//控制果实大小
	this.speed = [];//控制果实生长和漂浮速度

	this.fruitType = [];//区分黄色果实和蓝色果实
}

fruitObj.prototype.num = 30;//果实数量

fruitObj.prototype.init = function(){
	for(var i = 0;i<this.num;i++){
		this.alive[i] = false;  //果实初始时候的状态
		this.x[i] = 0;
		this.y[i] = 0;
		this.speed[i] = Math.random() * 0.017 + 0.003;
		this.fruitType[i] = "";  //区分黄色果实和蓝色果实

	}
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
}
fruitObj.prototype.draw = function(){
	
	for(var i = 0;i<this.num;i++){
		if(this.alive[i]){
			//画果实
			// console.log(this.fruitType[i] )
			if(this.fruitType[i] == "blue"){  //判断要生成的果实类型
				var pic = this.blue;
			}else{
				var pic = this.orange;
			}

			// console.log(pic)

			if(this.l[i] <= 14){
				this.l[i] += this.speed[i] * deltaTime; //使过程平滑
			}else{
				this.y[i] -= this.speed[i] * 6 * deltaTime;
			}
			if(this.y[i] < 10){
				this.alive[i] = false;
			}
			ctx2.drawImage(pic,this.x[i] - this.l[i]*0.5,this.y[i] - this.l[i]*0.5,this.l[i],this.l[i]);
		}
	}
}
fruitObj.prototype.born = function(i){

	//需要获取海葵位置
	var aneId =Math.floor(Math.random() * ane.num);  //随机值会出现重复海葵
	this.x[i] = ane.x[aneId];
	this.y[i] = canHeight - ane.len[aneId];
	this.l[i] = 0;
	this.alive[i] =true;
	var ran = Math.random();
	if(ran<0.2){
		this.fruitType[i] = "blue";
	}else{
		this.fruitType[i] = "orange";
	}
	// console.log(ran)
	
}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

function fruitMonitor(){  //监控有多少果实处于活跃状态
	var num = 0;
	for(var i = 0;i<fruit.num;i++){
		if(fruit.alive[i]) num++;
	}
	if(num<15){
		sendFruit();//如果数量不够就产生种子
		return;
	}
}

function sendFruit(){  //如果数量不够就产生种子
	for(var i = 0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}