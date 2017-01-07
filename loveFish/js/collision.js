/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-01-07 09:28:47
 * @version $Id$
 */
//计算大鱼和果实之间的距离
function collision(){
	for(var i = 0;i<fruit.num;i++){
		if(fruit.alive[i]){
			//calLength2();//计算距离平方的函数
			var l = calLength2(fruit.x[i] , fruit.y[i] , mom.x , mom.y);
			if(l<900){
				fruit.dead(i);
			}
		}
	}
}
