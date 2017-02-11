/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-12-29 19:09:42
 * @version $Id$
 * 海葵相关
 */

var aneObj = function(){
	this.x = [];
	this.y = [];
	this.len = [];  //海葵高度
}

aneObj.prototype.num = 50;//海葵数量

aneObj.prototype.init = function(){
	//随机初始化海葵位置
	for(var i = 0;i<this.num;i++){
		//间隙
		this.x[i] = i * 16 + Math.random()*20;  //返回[0,1)
		this.len[i] = 200+Math.random()*50;
	}
	// console.log(1)
}

aneObj.prototype.draw = function(){
	ctx2.save();  //？？？
	ctx2.globalAlpha = 0.7;	//透明度设置
	ctx2.lineWidth = 20;
	ctx2.lineCap = 'round';
	ctx2.strokeStyle = "#3b154e";  //减少不必要的循环
	for(var i = 0;i<this.num;i++){
		ctx2.beginPath();
		ctx2.moveTo(this.x[i] , canHeight);
		ctx2.lineTo(this.x[i] , canHeight - this.len[i]);
		ctx2.stroke();//绘制之前要先说明绘制颜色
	}
	ctx2.restore();
}