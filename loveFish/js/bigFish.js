/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-01-05 14:50:54
 * @version $Id$
 */

var momObj = function(){
	this.x ;
	this.y ;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();
}
momObj.prototype.init = function(){

	this.x = canWidth*0.5;
	this.y = canHeight*0.5;

	this.angle = 0;

	this.bigEye.src = './src/bigEye0.png';
	this.bigBody.src = './src/bigSwim0.png';
	this.bigTail.src = './src/bigTail0.png';
}
momObj.prototype.draw = function(){

	//让大鱼随鼠标移动
	
	this.x = lerpDistance(mx,this.x,0.95);//按照比例趋向于目标值
	this.y = lerpDistance(my,this.y,0.95);

	//改变角度
	//Matn.atan2(y,x)  反正切，[-PI,PI]
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI; //-PI,PI

	this.angle = lerpAngle(beta,this.angle,0.6);//按照比例趋向于目标值,用于大鱼旋转

	ctx1.save();  //表示这部分代码是大鱼独有的
	ctx1.translate(this.x,this.y);//改变原点位置到this.x,this.y
	ctx1.rotate(this.angle);//大鱼随鼠标旋转角度

	//画的顺序是先画的在下面，后画的在上面
	ctx1.drawImage(this.bigTail,-this.bigTail.width*0.5+30,-this.bigTail.height*0.5);
	ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
	ctx1.drawImage(this.bigEye,-this.bigEye.width*0.5,-this.bigEye.height*0.5);
	
	ctx1.restore();
}