/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-26 12:05:36
 * @version $Id$
 */

var hash = window.location.hash;
var ha = hash.split('#')[1];
console.log(ha)
 var sale = [];//排序
 var title = document.getElementsByClassName('title')[0];
 var ps = title.getElementsByTagName('p');

var box = document.getElementsByClassName('main-commodity')[0];
var listType = document.getElementById('form-toggle');
var flag = 0;

var item = box.getElementsByClassName('commodity');//列表项
var goodItems = box.getElementsByClassName('commodity-items');//盒子展示
//跳转回主页
var returnKey = document.getElementById('returnKey');
jump(returnKey,'index.html')

for(var i = 0;i<shopData.length;i++){
	if(ha == 0){  //渲染所有的数据
		sale.push(shopData[i]);
	}else{
		if(ha == shopData[i].type){
			sale.push(shopData[i]);
		}
	}
}
init(sale);

//排序
ps[1].addEventListener('touchend',function(){
	ps[0].className ='synthetic-sort';
	ps[1].className ='sale-sort sort';
	var sortArr = [];
	for(var i = 0;i<sale.length;i++){
		sortArr.push(sale[i]);
	}
	sortArr.sort(function(a,b){
		return a.sales-b.sales;
	})
	init(sortArr);
})
ps[0].addEventListener('touchend',function(){
	ps[0].className ='synthetic-sort sort';
	ps[1].className ='sale-sort';
	init(sale);
})

//切换布局
ps[2].addEventListener('touchend',function(){
	console.log(flag);
	if(!flag){

		listType.style.backgroundImage = 'url(img/icons/cascades.png)';
		flag = 1;
		init(shopData);
	}else{
		listType.style.backgroundImage = 'url(img/icons/list.png)';
		flag = 0;
		init(shopData);
	}

})

//渲染函数
function init(arr){

	var str = "";
	for(var i = 0;i<arr.length;i++){
		if(!flag){
			str +=	"<div class='commodity'>"+
						"<div class='pic'><img src='img/"+ arr[i].src[0] +"'/></div>"+
						"<div class='detail'>"+
							"<div>"+
							"<p class='commodity-name'><span class=''></span>"+ arr[i].title +"</p>"+
							"<p class='deliver-place'>"+ arr[i].address +"</p>"+
							"<p><span class='ad'>广告</span><span class='postage'>包邮</span></p>"+
							"<p class='current-price'>￥"+ arr[i].price +"</p>"+
							"<p class='num'>"+ arr[i].sales +"人购买</p>"+
							"</div>"+
						"</div>"+
					"</div>";
		}else{
			str +=  '<div class="commodity-items">' + 
						'<img src="img/' + arr[i].src[0] + '"/>' +
						'<div class="good-title">' + arr[i].title + '</div>' +
						'<div class="other"><span class="ad">广告</span><span class="postage">包邮</span></div>' +
						'<div class="price clear">' +
							'<span>￥<em>' + arr[i].price + '</em></span><b>' + arr[i].sales + '人付款</b>' +
						'</div>' +
					'</div>';
		}

		
	}

	 box.innerHTML = str;
	 console.log(goodItems);
	 if(!flag){
	 	for(var i = 0;i<arr.length;i++){
		 	jump(item[i],'detail.html#'+arr[i].id);
		}
	}else{
		for(var i = 0;i<arr.length;i++){
		 	jump(goodItems[i],'detail.html#'+arr[i].id);
		}
	}
	
}



