/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-25 15:15:21
 * @version $Id$
 */

var list = document.querySelector('.list');
var direct = document.querySelector('.direct');
var oUl = list.getElementsByTagName('ul')[0];
var lis = oUl.getElementsByTagName('li');
var data = newsData;
var str = '';

var str1 = '<a href="javascript:;">'+
			'<h3>'+ data[0].title +'</h3>'+
			'<img src="'+ data[0].src +'" />'+
			'<p>'+ data[0].imgList.imgPara[0] +'</p>'+
		'</a>';

for(var i = 1;i<newsData.length;i++){
	str += '<li><a href="javascript:;">'+
			'<div class="detail">'+
				'<h3>'+ data[i].title +'</h3>'+
				'<div><p>'+ data[i].source+'</p>'+
				'<p><i class="visit icons"></i>'+ data[i].visit +'</p>'+
				'<p><i class="good icons"></i>'+ data[i].good +'</p></div>'+
			'</div>	'+						
			'<img src="'+ data[i].src +'" height="150" width="230">'+
		'</a></li>';

		
};

oUl.innerHTML = str;
direct.innerHTML = str1;

for(var i = 0;i<lis.length;i++){
	jump(lis[i],data[i+1].url);
}
jump(direct,data[0].url);