/* 页面hash值的获取 */
var hash = window.location.href.split('#')[1];//hash值的获取
console.log(hash)
/* 1、轮播图的操作 */
var carousel = document.getElementsByClassName('carousel')[0];//轮播图包裹层的
var carUl = carousel.getElementsByTagName('ul')[0];//轮播图ul的获取
var carStr = '';//字符串的渲染

/* 2、商品详细信息的渲染 */
var info = document.getElementsByClassName('info')[0]; 
var shopTitle = info.getElementsByTagName('h3')[0];//商品标题
var shopPrice = document.getElementById('price');//商品价格
var shopSales = document.getElementById('sales');//商品销量
var shopAddress = document.getElementById('address');//商品发货地址
var chooseBtn = document.getElementById('chooseBtn');//显示对话框按钮

/* 3、图文详情的渲染和操作 */
var imgDetail = document.getElementById('imgDetail');
var oH3 = imgDetail.getElementsByTagName('h3');//标题的获取
var pics = document.getElementById('pics');//图片展示部分
var parameter = document.getElementById('parameter');//产品参数
var picStr = '';//图片展示
var parameterStr = '';//参数展示

/* 4、弹出框操作 */
var msgDialog = document.getElementById('msg');//弹出框
var close = document.getElementById('close');//弹出框关闭按钮
var shopImg = msgDialog.getElementsByClassName('img-msg')[0].getElementsByTagName('img')[0];//商品图标
var descPrice = msgDialog.getElementsByClassName('desc-msg')[0].getElementsByTagName('i')[0];//商品价格
var choose = msgDialog.getElementsByClassName('choose')[0];//商品尺码、颜色详情
var lis = choose.getElementsByTagName('li');
var dialogStr = '';
var sizeStr = '';//尺寸
var colorStr = '';//颜色
var addBtn = document.getElementsByClassName('btn')[0];//添加商品按钮

/* 5、页面跳转 */
var back = document.getElementsByClassName('back')[0];//返回上一级
var cart = document.getElementsByClassName('cart')[0];//跳转到购物车页面
var data;//当前商品数据
/******************************* 页面的跳转 *************************************/
jump(back,'goodsList.html#0');
jump(cart,'shoppdingTrolley.html');
/******************************* 页面数据的渲染 *********************************/
for(var i = 0; i < shopData.length; i++){//通过hash值来获取数据渲染页面
	if(hash == shopData[i].id){//获取与hash相等的数据
		data = shopData[i];
		/* 1-1、轮播图的渲染*/
		for(var j = 0; j < data.src.length; j++){
			carStr += '<li><img src="img/' + data.src[j] + '"/></li>';
		}
		carUl.innerHTML = carStr;
		/* 2-1、商品信息的渲染 */
		shopTitle.innerHTML = data.title;
		shopPrice.innerHTML = data.price;
		shopSales.innerHTML = data.sales;
		shopAddress.innerHTML = data.address;
		/* 3-1、图片展示部分的渲染 */
		for(var j = 0; j < data.img.length; j++){
			picStr += '<li><img src="img/' + data.img[j] + '"/></li>';
		}
		pics.innerHTML = picStr;
		/* 3-2、产品参数部分的渲染 */
		for(var j = 0; j < data.parameter.length; j++){
			parameterStr += '<li><span class="title">' + data.parameter[j].title + '</span><span class="desc">' + data.parameter[j].desc + '</span></li>';
		}
		parameter.innerHTML = parameterStr;
		/* 4-1、弹出框信息渲染 */
		shopImg.src = 'img/' + data.src[0];
		descPrice.innerHTML = data.price;
		/* 4-2、渲染产品规格：需要判断某些属性是否存在 */
		if(data.size){
			for(var j = 0; j < data.size.length; j++){
				sizeStr += '<span>' + data.size[j] + '</span>'
			}
			dialogStr += '<ul></ul>'
		}else{
			sizeStr = '无';
		}
		if(data.color){
			for(var j = 0; j < data.color.length; j++){
				colorStr += '<span>' + data.color[j] + '</span>'
			}
		}else{
			colorStr = '无';
		}		
		dialogStr = '<ul><li><h5>尺码</h5><div>' + sizeStr + '</div></li>' +
					'<li><h5>颜色分类</h5><div>' + colorStr + '</div></li>' +
					'<li class="num"><h5>购买数量</h5><div><span>-</span><span>1</span><span>+</span></div></li>' +
					'</ul>';
		choose.innerHTML = dialogStr;
	}
}
/************************************ 页面操作 **************************************/
/* 1-2、轮播图的触屏滑动效果 */
var carLi = carUl.getElementsByTagName('li');
/* 3-3、图片展示与产品参数的切换效果 */
oH3[0].addEventListener('touchstart',function(e){//图文详情展示
	e.preventDefault();//阻止事件的默认行为
	switchTitle(e,oH3[0],oH3[1]);
	parameter.style.display = 'none';
	pics.style.display = 'block';
})
oH3[1].addEventListener('touchstart',function(e){//产品参数展示
	e.preventDefault();//阻止事件的默认行为
	switchTitle(e,oH3[1],oH3[0]);	
	parameter.style.display = 'block';
	pics.style.display = 'none';
})
function switchTitle(e,showObj,hideObj){
	var touch = e.changedTouches[0];
	var y = touch.clientY;
	showObj.addEventListener('touchmove',function(e){});
	showObj.addEventListener('touchend',function(e){
		/* 3-3-1、判断手指有没有滑动 */
		var touch = e.changedTouches[0];
		var y1 = touch.clientY;
		if(Math.abs(y - y1) > 10){
			return false;//如果移动距离大于10，则不执行切换操作
		}else{
			showObj.className = 'active';
			hideObj.className = '';
		}
	});
}

/* 2-2、对话框的显示 */
chooseBtn.addEventListener('touchstart',function(e){
	e.preventDefault();
	var touch = e.changedTouches[0];
	var y = touch.clientY;
	chooseBtn.addEventListener('touchmove',function(e){});
	chooseBtn.addEventListener('touchend',function(e){
		var touch = e.changedTouches[0];
		var y1 = touch.clientY;
		if(Math.abs(y - y1) > 10){
			return false;//如果移动距离大于10，则不执行切换操作
		}else{
			msgDialog.className = 'active';
		}
	});
});
/* 4-3、对话框的隐藏 */
close.addEventListener('touchstart',function(e){
	e.preventDefault();
	var touch = e.changedTouches[0];
	var y = touch.clientY;
	close.addEventListener('touchmove',function(e){});
	close.addEventListener('touchend',function(e){
		var touch = e.changedTouches[0];
		var y1 = touch.clientY;
		if(Math.abs(y - y1) > 10){
			return false;//如果移动距离大于10，则不执行切换操作
		}else{
			msgDialog.className = '';
		}
	});
});
/* 4-4、数据的获取、存储（使用本地存储） */
var sizes = lis[0].getElementsByTagName('span');//商品可选尺寸
var colors = lis[1].getElementsByTagName('span');//商品可选颜色
var count = lis[2].getElementsByTagName('span');//购买的数量
getParameter(sizes);
getParameter(colors);
/* 4-4-1、尺寸和颜色的设置 */
function getParameter(obj){//获取选择的产品参数
	for(var i = 0;i < obj.length;i++){
		(function(i){
			obj[i].addEventListener('touchstart',function(e){
				e.preventDefault();
				obj[i].addEventListener('touchmove',function(e){

				});
				obj[i].addEventListener('touchend',function(e){
					console.log(this);
					for(var i = 0;i < obj.length;i++){
						obj[i].className = '';
					}
					this.className = 'active';
				})
			})
		})(i);
	}
}
/* 4-4-2、数量的设置 */
var val = parseInt(count[1].innerHTML);
count[0].addEventListener('touchstart',function(e){
	e.preventDefault();
	count[0].addEventListener('touchmove',function(e){});
	count[0].addEventListener('touchend',function(e){
		if(val == 1){
			this.style.background = "#f8f8f8";	
		}else{
			val--;
			count[1].innerHTML = val;
		}
	});
});
count[2].addEventListener('touchstart',function(e){
	e.preventDefault();
	count[2].addEventListener('touchmove',function(e){});
	count[2].addEventListener('touchend',function(e){
		if(val == 10){
			this.style.background = "#f8f8f8";	
			alert("您的购物数量已达上限");
		}else{
			val++;
			count[1].innerHTML = val;
		}
	});
});
/* 4-4-3、添加购物车按钮，将商品添加到购物车 */
addBtn.addEventListener('touchstart',function(e){
	addBtn.addEventListener('touchmove',function(e){

	});
	addBtn.addEventListener('touchend',function(e){
		getData();
		msg.className = '';
	})
})
/* 4-4-4、获取选择的数据信息 */
function getData(){
	for(var i = 0;i < sizes.length;i++){
		if(sizes[i].className == 'active'){
			var s = sizes[i].innerHTML;
		}
	}
	for(var i = 0;i < colors.length;i++){
		if(colors[i].className == 'active'){
			var c = colors[i].innerHTML;
		}
	}
	var nums = parseInt(count[1].innerHTML);
	var obj = {id:hash,size:s,color:c,count:nums};
	var obj1 = JSON.stringify(obj);
	localStorage.setItem("shop"+hash,obj1);
}
localStorage.getItem("shop"+hash);

/* 1-2、轮播图的触屏滑动效果 */
(function(){
	var dots = document.getElementsByClassName('dot')[0].getElementsByTagName('span');
	var carLi = carUl.getElementsByTagName('li');//获取li标签
	var w = carLi[0].getBoundingClientRect().width;
	var index = 0;
	var start = 0;
	var instance = 0;
	var end = 0;
	
	carUl.addEventListener('touchstart',function(e){
		e.preventDefault();
		var touch = e.changedTouches[0];
		start = touch.pageX;
		// console.log('down')
		document.addEventListener('touchmove', moveFn);
		document.addEventListener('touchend',endFn);
	});

	var moveFn = function moveFn(e){

		var touch = e.changedTouches;
		carUl.style.transition = 'none';
		instance = touch[0].pageX - start;
		// console.log(index)
		carUl.style.left = -w * index + instance + 'px';
	}

	var endFn = function endFn(e){
		var touch = e.changedTouches;
		
			end = touch[0].pageX;
			if(end - start > 0){//向右滑
				
				if(Math.abs(end - start) > w/2){
					index--;
					if(index < 0){
						index = 0;
					}
					clearStyle(index);
					carUl.style.transition = '.5s';
					carUl.style.left = -w * index + 'px';
				}else{
					clearStyle(index);
					carUl.style.left = -w * index + 'px';
				}
			}
			if(end - start < 0){//向左滑
				if(Math.abs(end - start) > w/2){
					index++;
					if(index >= carLi.length){
						index = carLi.length - 1;
					}
					clearStyle(index);
					carUl.style.transition = '.5s';
					carUl.style.left = -w * index + 'px';
				}else{
					clearStyle(index);
					carUl.style.left = -w * index + 'px';
				}
			}
		
		start = end = 0;
		document.removeEventListener('touchmove', moveFn);
		document.removeEventListener('touchend',endFn);
		console.log('over')
	}

	

	/* 样式清除 */
	function clearStyle(index){
		for(var i = 0;i < dots.length;i++){
			dots[i].className = '';
		}
		dots[index].className = "active";
	}
})();