/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-25 15:17:44
 * @version $Id$
 */



var box = document.getElementsByClassName('article')[0];
var back = document.getElementsByTagName('a')[0];
var hash = window.location.hash;
var ha = hash.split('')[1];

var dataImg = newsData[ha].imgList.imgSrc;
var dataP = newsData[ha].imgList.imgPara;
// console.log(data)

var str = '';
var str1 = '<h1>'+ newsData[ha].title +'</h1>'
for(var i = 0;i<dataImg.length;i++){
	str += '<p>'+ dataP[i] +'</p>'+
		'<div>'+
			'<img src="'+ dataImg[i] +'" alt="">'+
		'</div>';
}


box.innerHTML = str1+str;

jump(back,'news.html');