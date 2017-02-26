/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-12-29 15:08:36
 * @version $Id$
 */

/*

分两层背景

 */
var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;//上一帧执行的时间
var deltaTime; //两帧之间的间隔

var bgPic = new Image();  //定义背景图片

var canWidth;
var canHeight; //获取画布宽高

var ane; //海葵
var fruit; //果实
var mom;//大鱼
var baby;//小鱼

var mx;
var my;//定义鼠标位置，大鱼随着鼠标移动

document.body.onload = game;  //body加载完毕将game作为入口执行
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}
function init(){

	//定义画布画笔
	can1 = document.getElementById('canvas1');
	console.log(can1)
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2');
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove',onMousemove,false);

	//加载背景图
	bgPic.src = './src/background.jpg';

	//获取画布宽高
	canHeight = can1.height;
	canWidth = can1.width;

	//初始化海葵
	ane = new aneObj();
	ane.init();

	//初始化果实
	fruit = new fruitObj();
	fruit.init();

	//初始化大鱼
	mom = new momObj();
	mom.init();

	//鼠标位置
	mx = canWidth*0.5;
	my = canHeight*0.5;

	//初始化小鱼
	baby = new babyObj();
	baby.init();
}

function gameloop(){
	window.requestAnimFrame(gameloop); //循环执行函数，智能计算，和定时器的固定时间不同

	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;   

	if(deltaTime>40){
		deltaTime = 40;  //当浏览器tab切换的时候，会停止在当前帧，二在切换回来的时候会导致两帧之间的间隔过大，绘制出来的果实就会非常大
	}
	
	// console.log(deltaTime)//获取帧之间的时间间隔，时间间隔不同，非匀速运动
	
	//绘制背景
	drawBg();

	//绘制海葵
	ane.draw();

	//绘制果实
	fruit.draw();

	//监控果实数量
	fruitMonitor();

	//画大鱼
	ctx1.clearRect(0,0,canWidth,canHeight);//先清空画布
	mom.draw();

	//碰撞检测
	collision();

	//画小鱼
	baby.draw();
}

function onMousemove(e){

	if(e.offSetX || e.layerX){
		mx = e.offSetX == undefined ?  e.layerX : e.offSetX ;
		my = e.offSetY == undefined ?  e.layerY : e.offSetY ;
	}
	// console.log(mx)
}