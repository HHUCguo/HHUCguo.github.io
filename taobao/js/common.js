/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-25 15:05:02
 * @version $Id$
 */

 	var oHtml = document.documentElement;
	var hWidth = oHtml.getBoundingClientRect().width;
	oHtml.style.fontSize = hWidth/15 + "px";

	/* 点击跳转函数：obj：点击执行跳转的对象，url：链接地址 */
	function jump(obj,url){
		var x = 0,y = 0;
		obj.addEventListener('touchstart',function(event){
			var touch = event.changedTouches[0];
			y = touch.clientY;
		})
		obj.addEventListener('touchmove',function(event){

		})
		obj.addEventListener('touchend',function(event){
			var touch = event.changedTouches[0];
			// console.log(touch)
			var y1 = touch.clientY;
			console.log(y1,y)
			if(Math.abs(y1-y)>10){
				return false;
			}else{
				window.location.href = url;
			}
		})
		// console.log(1)
	}


	/* 上划加载 */

	/*
		当拖动滚动条的时候，开始加载图片，需要加载的图片要显示在可视区域内，如果图片在可视区域内，则data-img的值赋值给img标签的src属性
	*/
	function upLoad(obj){
		var cHeight = document.documentElement.clientHeight || document.body.clientHeight;//获取屏幕可视区域的高度

		document.addEventListener('touchstart',function(e){
			var initY = e.changedTouches[0].pageY;
			document.addEventListener("touchmove",function(e){
				var changeY = e.changedTouches[0].pageY;
				if(changeY > initY){
					//alert("向上滑");
					loadImg(cHeight,obj);
				}
			})
		});
	}
	/* 图片加载函数的封装 */
	function loadImg(h,obj){
		for(var i=4;i<obj.length;i++){
			var el = obj[i];//将每一个图片对象存储起来，方便后边的使用
			var top = el.getBoundingClientRect().top;//获取每一个图片对象属性
			if(top < h-150){
				el.src = el.getAttribute("data-img");
				el.className = "";
			}
		}
	}

	/* ios fixed 兼容 */
	function ios(obj){
		var u = navigator.userAgent,app = navigator.appVersion;
		var isIos = !!u.match(/\(i[^;]+;(u;)? CPU.+Mac OS X/);
		if(isIos){
			obj.onfocus = function(){
				setTimeout(scrollBottom,500)
			};
		}

		function scrollBottom(){
			window.scrollTo(0,document.body.style.height)
		}
		// http://www.qdfuns.com/notes/26716/5d2937a2eb390839d5e2caf06431a153.html
		// http://www.cnblogs.com/AliceLiu/p/5722935.html
	}
