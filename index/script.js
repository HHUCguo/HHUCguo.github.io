
/*  data  */
var data = [
{
	title:['作品效果：','实现技术：','实现难点：'],
	detail:['1、双击分散状态下的单张图片，所有图片拼接成当前点击的图片；</br>2、双击拼接状态的图片，图片分散排列；</br>3、可以选择图片分散排列和整齐排列两种方式；</br>4、鼠标移动到图片上，图片摆正，并有过渡效果；</br>5、图片弹起撞击效果；</br>6、拼接状态的图片可以切换上下张，有三种随机出现的切换效果。',
		'原生javascript+css3',
		'1、效果切换时调试</br>2、图片按序排列和分散的处理'
	]
},
{
	title:['作品效果：','实现技术：','实现难点：'],
	detail:['1、淘宝移动端静态页面，包括首页、商品列表页、商品详情页、搜索页、购物车、淘宝头条页面等；</br>2、页面交互效果，包括图片轮播、头条滚动、页面跳转(hash)等；</br>3、购物车页面使用vue.js实现；</br>4、添加到购物车的数据采用localStorage存储',
		'rem布局，localSrorage，SASS，LESS，原生javascript',
		'1、数据结构定义</br>2、vuejs实现购物车页面数据交互</br>3、图片无缝滚动等交互效果实现'
	]
},
{
	title:['作品效果：','实现技术：','实现难点：'],
	detail:['1、对文件夹的基本操作，包括新建、删除、重命名</br>2、双击进入文件夹，鼠标移入可进行文件夹选定</br>3、右键单击空白区新建文件夹，右键单击文件夹可删除。重命名；</br>4、文件夹导航，可进入任意一层文件夹；</br>5、可框选文件夹；</br>6、可拖拽文件夹并将其剪切到其他文件夹。',
		'原生javascript',
		'1、数据结构定义，新数据的添加以及数据之间的层层嵌套</br>2、事件之间冲突</br>3、执行操作之后的页面布局问题'
	]
},
// {
// 	title:['作品效果：','实现技术：','实现难点：'],
// 	detail:['1、歌曲播放操作，上一曲、下一曲、暂停/继续、停止播放；',
// 		'原生javascript，ajax，面向对象，css3',
// 		'1、音频文件处理</br>2、面向对象的写法</br>3、频谱图的绘制'
// 	]
// },
{
	title:['作品效果：','实现技术：','实现难点：'],
	detail:['1、大鱼随鼠标在页面上移动，小鱼跟随大鱼移动；</br>2、大鱼获取食物后喂给小鱼，超时小鱼会死亡，游戏结束；</br>3、海葵摆动，并生成果实，果实成熟后向上漂浮',
		'canvas，css3，面向对象',
		'1、小鱼随大鱼游动</br>2、运动细节处理</br>'
	]
}
]
console.log(data);
var box = document.getElementById('box');

var list = document.getElementById('list');
var items = list.getElementsByTagName('a');

var intro = document.getElementById('intro');
var aH = intro.getElementsByTagName('h2');
var aP = intro.getElementsByTagName('p');

// console.log(box);
// console.log(list);
// console.log(aH);
// console.log(aP);

for(var i = 1; i<items.length;i++){
	items[i].index = i-1;
	items[i].onmouseover = function(){

		intro.style.display = 'block';
		for(var i = 0;i<data[this.index].title.length;i++){
			console.log(data[this.index].title[i])
			aH[i].innerHTML = data[this.index].title[i];
			aP[i].innerHTML = data[this.index].detail[i];
		}
	};
	items[i].onmouseout = function(){

		intro.style.display = '';
		
	}
}
