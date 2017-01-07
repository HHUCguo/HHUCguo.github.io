/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-01-07 09:43:39
 * @version $Id$
 */
var babyObj = function(){
	this.x;
	this.y;
	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();
}

babyObj.prototype.init = function(){
	this.x = canWidth*0.5 - 50;
	this.y = canHeight*0.5 +50;

	this.angle = 0;

	this.babyEye.src = './src/babyEye0.png';
	this.babyBody.src = './src/babyFade0.png';
	this.babyTail.src = './src/babyTail0.png';
}

babyObj.prototype.draw = function(){

	//让小鱼随大鱼移动
	
	this.x = lerpDistance(mom.x,this.x,0.98);//按照比例趋向于目标值
	this.y = lerpDistance(mom.y,this.y,0.98);

	//改变角度
	//Matn.atan2(y,x)
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI; //-PI,PI

	this.angle = lerpAngle(beta,this.angle,0.6);//按照比例趋向于目标值,用于大鱼旋转

	ctx1.save();  //表示这部分代码是小鱼独有的
	ctx1.translate(this.x,this.y);//改变原点位置到this.x,this.y
	ctx1.rotate(this.angle);//小鱼随大鱼旋转角度
	
	ctx1.drawImage(this.babyTail,-this.babyTail.width*0.5+23,-this.babyTail.height*0.5); //画的顺序是先画的在下面，后画的在上面
	ctx1.drawImage(this.babyBody,-this.babyBody.width*0.5,-this.babyBody.height*0.5);
	ctx1.drawImage(this.babyEye,-this.babyEye.width*0.5,-this.babyEye.height*0.5);
	
	ctx1.restore();
}