/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-18 12:05:05
 * @version $Id$
 */

function create(Data,n){    //传n值时表示是通过add按钮新建数据	
	if(n){
		dataList.unshift(Data); 
	}

	var div1 = document.createElement('div');
	div1.className = 'folder-box';
	
	var div2 = document.createElement('div');
	div2.className = 'folder';
	div2.oid = Data.id;
	div2.name = Data.name;

	var span1 = document.createElement('span');
	span1.className = 'checkbox';

	div1.appendChild(div2);
	div2.appendChild(span1);

	var div3 = document.createElement('div');
	div3.className = 'folder-text';
	var a1 = document.createElement('a');
	a1.innerHTML = Data.name;

	div3.appendChild(a1);
	div1.appendChild(div3);

	var div4 = document.createElement('div');
	div4.className = 'rename-folder';
	
	var inp = document.createElement('input');
	inp.type = 'text';
	inp.value = Data.name;
	
	var span2 = document.createElement('span');
	var span3 = document.createElement('span');
	span2.className = 'sure';
	span3.className = 'cancel';

	div4.appendChild(inp);
	div4.appendChild(span2);
	div4.appendChild(span3);
	div1.appendChild(div4);

	div1.checked = false;  //区分文件夹是否处于选中状态

	if(n){  //判断当前处于新建状态还是渲染页面状态
		folders.insertBefore(div1,folders.children[0]);
		div3.style.display = 'none';
		div4.style.display = 'block';
		inp.select();
	}else{
		folders.appendChild(div1);
		div3.style.display = 'block';
		div4.style.display = 'none';
	}
	
	span1.onclick = function(e){
		e.cancelBubble = true;//阻止触发div2.onclick

		if(this.className == 'checkbox'){
			this.className += ' checked';
			div2.checked = true; 
		}else{
			this.className = 'checkbox';
			div2.checked = false; 
		}
		Num();
	}
	span1.onmousedown = function(e){
		e.cancelBubble = true;//阻止触发div2生成div
	}
	span1.onmouseup= function(e){
		e.cancelBubble = true;//阻止触发div2 up事件
	}

	span2.onclick = function(){  //确认重命名

		sureBtn(div4,div3,inp,a1,0);
	}
	span3.onclick = function(){  //取消命名

		if(toolBox.style.display == 'block'){  //判断是新建命名还是已有的重命名

			var parent = this.parentNode;

			parent.previousElementSibling.style.display = 'block';
			parent.style.display = 'none';
			div2.checked = false; 
		}else{
			dataList.shift(); 
		}
		Num();
		showData(); 

	}
	div2.onclick = function(e){
		e.cancelBubble = true;//阻止触发document.onclick
	}
	div2.onmousemove = function(e){
		// e.cancelBubble = true;
		if(this.checked || ifEdit()){  //如果处在选中状态的时候或者编辑状态不能加类
			return false;
		}
		this.className += ' active';
	}

	div2.onmouseout = function(e){
		e.cancelBubble = true;
		if(this.checked){
			return false;
		}
		this.checked = false;
		this.className = 'folder';
		span1.className = 'checkbox';
	}

	div2.ondblclick = function(){
		creataChild(this);
		docMenu.style.cssText = '';
		fileMenu.style.cssText = '';
	}

	// 右键菜单
	var fileMenu = document.getElementById('file-menu');
	var docMenu = document.getElementById('doc-menu');
	var fileMenuChild = fileMenu.getElementsByTagName('li');
	var docMenuChild = docMenu.getElementsByTagName('li');

	div2.oncontextmenu = function(e){
		e.cancelBubble = true;    //阻止document菜单弹出
		docMenu.style.cssText = '';

		fileMenu.style.display = 'block';
		fileMenu.style.left = e.clientX + 'px';
		fileMenu.style.top = e.clientY + 'px';

		for(var i = 0;i<folder.length;i++){
			folder[i].className = 'folder';
			folder[i].checked = false;
			folder[i].getElementsByClassName('checkbox')[0].className ='checkbox';
		}

		this.checked = true;
		this.className += ' active';
		this.getElementsByClassName('checkbox')[0].className +=' checked';

		Num();
		return false;   //阻止浏览器的默认行为
	}

	document.oncontextmenu = function(e){
		document.onmousemove = div2.onmousedown = null;  //阻止画方框

		if(ifEdit()){
			alert('编辑未完成');
			return false;
		}

		if(e.clientX < maxLeft || e.clientY < maxTop){
			return false;
		}

		docMenu.style.display = 'block';
		docMenu.style.left = e.clientX + 'px';
		docMenu.style.top = e.clientY + 'px';

		fileMenu.style.cssText = '';
		showData();  //重新渲染页面
		Num();

		return false;   //阻止浏览器的默认行为
	}
	document.onclick = function(){
		docMenu.style.cssText = '';
		fileMenu.style.cssText = '';
		Num();
	}
	// docMenu.onclick = function(e){
	// 	e.cancelBubble = true;  //阻止点击菜单内容时触发document的onclick事件，即阻止冒泡到document，让docMenu消失
	// } 
	//右键重命名
	fileMenuChild[0].onclick = function(){
		fileRename();
	}
	//右键删除
	fileMenuChild[1].onclick = function(){
		deleteItem();
	}
	//右键新建文件夹
	docMenuChild[0].onclick = function(e){

		create({name:'新建文件夹',id:maxId()+1,pId:nowId},1);
	}
	div2.onmousedown = function(e){
		if(div2.checked){
			e.cancelBubble = true;  //阻止docuent的mousedown事件
			// document.oncontextmenu = div2.oncontextmenu = null;
			div2.onmousemove = null;
			
			var fileSmall = document.createElement('div');
			fileSmall.className = 'file-small';
			document.body.appendChild(fileSmall);

			var span = document.createElement('span');
			span.innerHTML = arrMove.length;

			fileSmall.appendChild(span);
			document.onmousemove = function(e){
		
				fileSmall.style.display = 'block';
				fileSmall.style.top = e.clientY +'px';
				fileSmall.style.left = e.clientX +'px';

				for(var j = 0;j<folder.length;j++){
					folder[j].style.opacity = '1';
				}

				for(var i = 0;i<folder.length;i++){

					if(!folder[i].checked){
						if(duang(fileSmall,folder[i])){
							folder[i].style.opacity = '0.5';	
							target = folder[i]; 
						}
					}
				}
				// console.log(target)
				return false;   //阻止浏览器的默认行为
			}
			document.onmouseup = function(e){
				// console.log(arrMove)
				if(target && duang(fileSmall,target )){
					for(var i = 0;i<arrMove.length;i++){
						for(var j = 0;j<dataList.length;j++){
							if(dataList[j].id == arrMove[i].oid){
								dataList[j].pId = target.oid;
							}
						}
					}
					showData();
					Num();
					target = null;
				}
				document.body.removeChild(fileSmall);
			}
		}
		return false;   //阻止浏览器的默认行为
	}
}

//获取当前要显示的数据
function getData(){
	var arr = [];
	for(var i = 0;i<dataList.length;i++){
		if(nowId == dataList[i].pId){
			arr.push(dataList[i]);
		}
	}
	return arr;
}

//根据pid找到第一级子数据
function getChild(id){
	var arr = [];
	for(var i=0;i<dataList.length;i++){
		if(dataList[i].pId == id){
			arr.push(dataList[i]);
		}
	}
	return arr;
}

//根据id找数据
function getById(id){
	for(var i=0;i<dataList.length;i++){
		if(dataList[i].id == id){
			return dataList[i];
		}
	}
}

//在页面上渲染数据
function showData(){
	var data = getData();
	folders.innerHTML = '';
	for(var i=0;i<data.length;i++){
		create(data[i]);
	}
}

//统计有多少文件夹被选中
function Num(){  

	var n = 0;
	var arr = [];
	arrMove = [];
	for(var i = 0;i<folder.length;i++){
		if(folder[i].checked){
			n++;
			arr.push(i);
			arrMove.push(folder[i]);
		}
	}

	if(n == 0){
		toolBox.style.display = 'none';
	}
	if(n >0){
		toolBox.style.display = 'block';
	}
	if(n>1){
		oRename.className += ' disable';
	}else{
		oRename.className = 'buttons';
	}

	if(n == aChecked.length && n!=0){
		allChecked.checked = true;
	}else{
		allChecked.checked = false;
	}

	folderNum.innerText = n;
	return arr;  //返回的是当前页面中folderBox的索引值，可以通过其oid寻找到dataList中的相应数据
}

//有处在编辑状态的返回true
function ifEdit(){  
	var n = 0;
	var aRenameBox = document.getElementsByClassName('rename-folder');
	for(var i=0;i<aRenameBox.length;i++){
		if(aRenameBox[i].style.display == 'block'){
			n++;
		}
	}
	return n;
}

//找最大id
function maxId(){
	var max ;
	if(dataList[0]){
		max = dataList[0].id;
		for(var i=0;i<dataList.length;i++){
			if(dataList[i].id > max){
				max = dataList[i].id;
			}
		}
	}else{
		max = 0;
	}
	return max;
}

//确定按钮
function sureBtn(a,b,c,d,ind){  //确定按钮
	if(confirm('确认命名？')){
		var val = c.value;
		for(var i=0;i<folder.length;i++){
			if(i == ind){
				continue;    //判断到自己的时候跳过
			}
			var title = folderBox[i].children[1].children[0];
			if(!folder[i].checked && title.innerHTML == val){
				alert('命名重复了');
				return;
			}
		}
		if(toolBox.style.display == 'block'){           //已有的重命名
			folder[ind].className = 'folder';
			folder[ind].checked = false;
			folder[ind].getElementsByClassName('checkbox')[0].className ='checkbox';
			
			for(var i = 0;i<dataList.length;i++){
				if(dataList[i].pId == nowId && dataList[i].id == folder[ind].oid){
					dataList[i].name = val;
				}
			}
		}else{  //新建命名
			for(var i = 0;i<dataList.length;i++){
				if(dataList[i].pId == nowId && dataList[i].id == maxId()){
					dataList[i].name = val;
				}
			}
		}
		a.style.display = 'none';
		b.style.display = 'block';
		d.innerHTML = val;
		showData();  
		Num();
	}else{
		return;
	}
	console.log(dataList)
}

function showNav(){  //导航栏
	navBox.innerHTML = '';
	for(var i = 0;i<path.length;i++){  
		if(i == path.length-1){
			navBox.appendChild(path[i]);
			break;
		}
		if(i == 0){
			navBox.appendChild(path[i]);
			var aymbol1 =  document.createTextNode('|');
			navBox.appendChild(aymbol1);
			continue;
		}
		navBox.appendChild(path[i]);
		var aymbol1 =  document.createTextNode('>');
		navBox.appendChild(aymbol1);
	};
}

//检测碰撞
function duang(obj1,obj2){
	var pos1 = obj1.getBoundingClientRect();
	var pos2 = obj2.getBoundingClientRect();
	if(pos1.right < pos2.left || pos1.bottom < pos2.top || pos1.left > pos2.right || pos1.top > pos2.bottom){
		return false;
	}else{
		return true;
	}
}

//根据id找到下边的所有子数据
function getAllChild(id){
	var arr = [];
	arr.push(getById(id));
	xkdzmm(id);
	function xkdzmm(id){  //重复寻找后代数据
		var arr2 = getChild(id);//第一级子数据
		if(arr2.length == 0){
			return;
		}
		arr = arr.concat(arr2);
		for(var i=0;i<arr2.length;i++){
			var c = getChild(arr2[i].id);
			if(c.length!=0){
				xkdzmm(arr2[i].id);
			}
		}
	}
	return arr;
}

//删除函数
function deleteItem(){  //删除
	var result=[];
	var obj = null;
	for(var i = 0;i<folder.length;i++){
		if(folder[i].checked){
			result = getAllChild(folder[i].oid);
			for(var k = 0;k<result.length;k++){
				for(var j = 0;j<dataList.length;j++){
					if(result[k].id == dataList[j].id){
						dataList.splice(j,1);
					}
				}
			}
		}
	}
	showData();
	Num();
	console.log(dataList)
}

//重命名函数
function fileRename(){

	var index = Num();
	if(index.length>1){
		return false;
	}
	var text = folderBox[index].getElementsByClassName('folder-text')[0];
	var edit = folderBox[index].getElementsByClassName('rename-folder')[0];
	var sure = edit.getElementsByClassName('sure')[0];
	var title = text.getElementsByTagName('a')[0];
	var cancel = edit.getElementsByClassName('cancel')[0];
	var inp = edit.getElementsByTagName('input')[0];

	edit.style.display = 'block';
	text.style.display = 'none';
	inp.value = text.innerText;
	inp.select();

	sure.onclick = function(){
		sureBtn(edit,text,inp,title,index);
	}
	console.log(dataList)
}

function creataChild(obj){   //进入子菜单

	var navPart = document.createElement('a');  //创建导航里的a标签
	navPart.oid = obj.oid;
	navPart.innerHTML = obj.name;
	navPart.href = 'javascript:;';
	path.push(navPart);
	nowId = obj.oid;
	window.location.hash += obj.name +'/';

	navPart.onclick = function(){
		nowId = obj.oid;
		for(var i=0;i<path.length;i++){
			if(path[i].oid == obj.oid){
				path.splice(i+1);
			}
		}
		var str = '';
		for(var i=2;i<path.length;i++){
			str += path[i].innerHTML + '/';
		}
		window.location.hash = 'path=/' +　str;
	}
}

function addClass(obj,name){  //添加类、删除类
	var classList = obj.className;
	var arr = classList.split(' ');
	var  n = 0;
	console.log(arr);
	if(arr[0] == '' && arr.length == 1){
		classList = name;
	}else{
		for(var i=0;i<arr.length;i++){
			if(arr[i] == name){
				arr.splice(i,1);
				classList = arr.join(' ');
				obj.className = classList;
				return;
			}
		}
		classList += ' '+name;
	}

	obj.className = classList;
}