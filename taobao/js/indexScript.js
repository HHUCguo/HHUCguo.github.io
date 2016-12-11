window.onload = function(){

	 /* 1-1、首页轮播图的渲染 */
	 var carousel = document.getElementById('carousel');
	 var cUl = carousel.getElementsByTagName('ul')[0];
	 var strCar = '';
	 for(var i = 0;i < imgData.length;i++){
	 	strCar += '<li><img src="' + imgData[i].src + '" alt=""></li>';
	 }
	 cUl.innerHTML = strCar;
	 var sections = document.getElementsByTagName('section');

	 /* 1-2、淘宝头条数据的渲染 */
	 var topLine = document.getElementById('topLine');
	 var oUl = topLine.getElementsByTagName('ul')[0];
	 var strTop = '';
	 for(var i = 0;i < topLineData.length;i++){
	 	strTop += '<ul>'+
				'<li><em>' + topLineData[i].type + '</em><span>' + topLineData[i].title + '</span></li>'+
				'<li><em>' + topLineData[i].type1 + '</em><span>' + topLineData[i].title1 + '</span></li>'+
			     '</ul>';
	 }
	 topLine.innerHTML = strTop;

	 /* 1-3、商品列表数据的渲染 */
	 var strShop = '';//设置一个空的字符串拼接数据
	 for(var i = 0;i < 4;i++){
	 	strShop += '<div class="commodity-items" id="'+shopData[i].id+'">'+
					'<img src="img/' + shopData[i].src[0] + '" alt="">'+
					'<div class="title">' + shopData[i].title + '</div>'+
					'<div class="price clear">'+
						'<span>￥<em>' + shopData[i].price + '</em></span><b>' + shopData[i].sales + '人付款</b>'+
					'</div>'+
				'</div>';
	 }
	 for(var i = 4;i < shopData.length;i++){
	 	strShop += '<div class="commodity-items" id="'+shopData[i].id+'">'+
					'<img src="" data-img="img/' + shopData[i].src[0] + '" alt="">'+
					'<div class="title">' + shopData[i].title + '</div>'+
					'<div class="price clear">'+
						'<span>￥<em>' + shopData[i].price + '</em></span><b>' + shopData[i].sales + '人付款</b>'+
					'</div>'+
				'</div>';
	 }
	 sections[sections.length-1].innerHTML = strShop;

	/* 1-4 跳转到商品详细信息页面 */
	var commodityItems = document.getElementsByClassName("commodity-items");
	for(var i = 0;i < commodityItems.length; i++){
		jump(commodityItems[i],'detail.html#'+commodityItems[i].id);
	}
	
	/* 1-5  商品分类数据跳转 */
	 var type = document.getElementById('type');
	 var typeList = type.getElementsByTagName('li');

	 for(var i = 0;i<typeList.length;i++){
	 	jump(typeList[i],'goodsList.html#'+typeDate[i])
	 }

	/* 1-6  跳转到搜索 */
	var goSearch = document.getElementById('goSearch');
	jump(goSearch,'search.html');
	
	/*图片懒加载*/
	var imgs = sections[sections.length-1].getElementsByTagName("img");//获取所有的图片
	upLoad(imgs);  

	/*跳转到头条页面*/
	var head = document.querySelector('.head');
	var click = document.getElementById('topLineJump');
	jump(click,'news.html');

	/*底部页面跳转*/
	var foot = document.getElementsByTagName('footer')[0];
	var divs = foot.getElementsByTagName('div');
	jump(divs[0],'index.html');
	jump(divs[1],'shoppdingTrolley.html');
	
	/* 首页头条滚动效果 */
	(function(){
		var box = document.getElementById('topLine');
		var uls = box.getElementsByTagName('ul');
		function moveFn() {
			var height = box.offsetHeight;
			box.style.transition = 1+'s';
			box.style.webkitTransform = 'translateY(-'+height+'px)';
			setTimeout(function(){
				box.style.transition = 0+'s';
				box.appendChild(uls[0]);
				box.style.webkitTransform = 'translateY(0px)';
			},1200)
		}
		setInterval(moveFn,2000);
	})();

	/* 首页图片轮播效果 */
	//核心：图片运动完成后把第一的节点放到最后的位置/把最后的节点放到第一的位置
	(function(){
		var box = document.getElementById('carousel');
		var itemBox = box.getElementsByClassName('items')[0];
		var items = itemBox.getElementsByTagName('div');

		var oUl = box.getElementsByTagName('ul')[0];
		var lis = oUl.getElementsByTagName('li');
		var imgs = oUl.getElementsByTagName('img');

		var indexCurrent = 0;

		var time = null;

		var start = 0;  //滑动的起点
		var end = 0;  //滑动的起点
		var moveTime = 0;  //滑动的时间

		var isMove = false;

		var width = imgs[indexCurrent].offsetWidth;

		function moveLeft() {  //向左划到下一张
			isMove = true;
			indexCurrent++;
			if(indexCurrent == imgs.length){
				indexCurrent = 0;
			}
			fn();
			oUl.style.transition = .5+'s';
			oUl.style.webkitTransform = 'translateX(-'+2*width+'px)';
			setTimeout(function(){
				left();
			},550)
		}

		function left(){  
			
			oUl.style.transition ='none';
			oUl.appendChild(lis[0]);
			oUl.style.webkitTransform = 'translateX(-'+width+'px)';
			setTimeout(function(){
				isMove = false;
			},50)		
		}

		function moveRight() { //向右划到下一张
			isMove = true;
			indexCurrent--;
			if(indexCurrent == -1){
				indexCurrent = imgs.length-1;
			}
			fn();
			oUl.style.transition = .5+'s';
			oUl.style.webkitTransform = 'translateX(0px)';
			setTimeout(function(){
				right();
			},550)

		}

		function right(){
			oUl.style.transition ='none';
			oUl.insertBefore(lis[lis.length-1],lis[0]);
			oUl.style.webkitTransform = 'translateX(-'+width+'px)';
			setTimeout(function(){
				isMove = false;
			},50)
		}

		var move = function move(e){
			var touch = e.changedTouches;
			if(touch.length == 1){
				var instance = touch[0].pageX-start;
				oUl.style.transition ='none';
				if(instance>0){ //向右划
					oUl.style.webkitTransform = 'translateX(-'+(width-instance)+'px)';
				}else{  //向左划
					oUl.style.webkitTransform = 'translateX(-'+(width+Math.abs(instance))+'px)';
				}
				
			}
		}


		var up = function up(e){
			var touch = e.changedTouches;
			// console.log(touch)
			if(touch.length == 1){
				
				end = touch[0].pageX;
				if(end>start){  //向右划
					if(Math.abs(end-start) > width/2){
						moveRight();
					}else{
						oUl.style.transition = .5+'s';
						oUl.style.webkitTransform = 'translateX(-'+width+'px)';
					}
				}else{  //向左划
					if(Math.abs(end-start) > width/2){
						moveLeft();
					}else{
						oUl.style.transition = .5+'s';
						oUl.style.webkitTransform = 'translateX(-'+width+'px)';
					}
				}
				start = end =0;
				time = setInterval(moveLeft,2000);
				document.removeEventListener('touchmove',move);
				document.removeEventListener('touchend',up);
				
			}
		}

		function fn(){
			
			for(var i = 0;i<items.length;i++){
				items[i].className = '';
			}
			items[indexCurrent].className = 'active';
		}

		function init() {
			oUl.insertBefore(lis[lis.length-1],lis[0]);
			oUl.style.webkitTransform = 'translateX(-'+width+'px)';
			oUl.addEventListener('touchstart',function(e) {
				if(!isMove){
					e.preventDefault();
					clearInterval(time);
					var touch = e.changedTouches;
					if(touch.length == 1){
						start = touch[0].pageX;
					}

					document.addEventListener('touchmove',move);
					document.addEventListener('touchend',up);
				}else{
					return;
				}
			});
			time = setInterval(moveLeft,2000);
		}
		init();
	})();
}


	