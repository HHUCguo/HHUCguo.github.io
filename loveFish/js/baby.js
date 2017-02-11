/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-01-07 09:43:39
 * @version $Id$
 * 小鱼
 */
var babyObj = function(){
	this.x;
	this.y;
	// this.babyEye = new Image();
	this.babyBody = new Image();
	// this.babyTail = new Image();

	this.babyTailTimer = 0;   //提醒执行下一个
	this.babyTailCount = 0;   //记录当前图片序号

	this.babyEyeTimer = 0;   //提醒执行下一个
	this.babyEyeCount = 0;   //记录当前图片序号
	this.babyEyeInterval = 1000; // 当前图片要持续多长时间，睁眼或眨眼要持续的时间
}

babyObj.prototype.init = function(){
	this.x = canWidth*0.5 - 50;
	this.y = canHeight*0.5 +50;

	this.angle = 0;

	// this.babyEye.src = './src/babyEye0.png';
	this.babyBody.src = './src/babyFade0.png';
	// this.babyTail.src = './src/babyTail0.png';
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

	//鱼尾巴摆动的控制
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50){ //执行下一帧
		this.babyTailCount = (this.babyTailCount+1)%8;  //一共有8张图片
		this.babyTailTimer %=50; 
	} 

	//小鱼眨眼睛的控制
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		thsi.babyEyeCount = (this.babyEyeCount+1)%2;
		this.babyEyeTimer %=  this.babyEyeInterval;

		if(this.babyEyeCount == 1){
			this.babyEyeInterval = Math.random()*1500 + 2000;//眨眼的时间的是随机的才自然
		}
	}

	ctx1.save();  //表示这部分代码是小鱼独有的
	ctx1.translate(this.x,this.y);//改变原点位置到this.x,this.y
	ctx1.rotate(this.angle);//小鱼随大鱼旋转角度
	
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5); //画的顺序是先画的在下面，后画的在上面
	ctx1.drawImage(this.babyBody,-this.babyBody.width*0.5,-this.babyBody.height*0.5);
	ctx1.drawImage(this.babyEye,-this.babyEye.width*0.5,-this.babyEye.height*0.5);
	
	ctx1.restore();
}