/**
 * 
 * @音频处理
 * @date    2016-11-04 14:35:06
 * @version $Id$
 */

	function music(cas){
		this.audio = new (window.AudioContext || window.webkitAudioContext)();//音频解析对象	
		this.canvas = cas.getContext("2d");  //canvas对象

		this.status = 0;   //播放状态,0停止，1播放,2暂停
		this.index = 0;

		this.current = 0;
	}

	music.prototype = {
		constructor : music,
		ready:function(data,n){
			// if(this.status == 2){
			// 	this.stopPlay();
			// }

			var _this = this;
			var audioContext = this.audio;

			this.audio.decodeAudioData(data,function(buffer){
				if(n != count)return;
				//data是读取成功得到的结果;
				//decodeAudioData对data进行解码，解码成功则调用此函数，参数buffer为解码后得到的结果
			
			      	source = audioContext.createBufferSource(), //创建buffer，用于把音频文件的内容装进AudioContext
			      	analyser = audioContext.createAnalyser(); //创建获取频谱能量值的analyser节点

				      // console.log(source);
				//将source与分析器连接
				source.connect(analyser);

				//将分析器与destination连接，这样才能形成到达扬声器的通路
				analyser.connect(audioContext.destination); //destinationj就是扬声器

				//将上一步解码得到的buffer数据赋值给source
				source.buffer = buffer;
				// console.log(source.buffer);

				//音乐响起后，把analyser传递到另一个方法开始绘制频谱图了，因为绘图需要的信息要从analyser里面获取
				_this.drawSpectrum(analyser);


				// 创建一个gain node 用于音量控制
				var gainNode = audioContext.createGain();
				// 将实例与gain node相连
				source.connect(gainNode);
				// 将gain node与播放设备连接
				gainNode.connect(audioContext.destination);
				//一旦设定完成之后，你就可以通过改变值之后来控制音量了。
				//减少音量
				// gainNode.gain.value = 0.1;

				_this.source = source;
				_this.analyser = analyser;
				_this.voiceLev = gainNode;
				currentNum = _this.index;

				_this.startPlay();
				
			},function(error){//解码失败走这个函数
				console.log(error);
			});
			
		},

		startPlay:function(){
			// console.log(this.status)
			console.log(this.current)
			// console.log(this.source)
			//播放
			// this.source.start(1,3,10);//这里参数是时间，1秒的停顿后，从第3秒开播放10s。
			if(this.status == 1){  //正在播放时点击
				this.current = m.source.context.currentTime;
				this.source.stop();
				source = null;
				this.status = 2;
				console.log(m.source.context.currentTime)

			}else if(this.status == 2){//暂停状态时点击
				source = null;
				this.status = 0;
				loadSongs(lis[this.index].title);
				

			}else if(this.status == 0){  //新建播放
				console.log(123)
				console.log(this.current)
				this.source.start(0,parseFloat(this.current));
				this.status = 1;
				this.current = 0;
			}
		},
		stopPlay:function(){
			this.source.stop();
			source = null;
			current = 0;
			this.status = 0;
		},
		next:function(){
			this.index++;
			console.log(lis.length)
			if(this.index == lis.length){
				this.index = lis.length-1;
				return;
			}
			// console.log(234)
			loadSongs(lis[this.index].title);
		},
		prev:function(){
			this.index--;
			if(this.index == 0 ){
				this.index = 0;
				return false;
			}
			// console.log(345)
			loadSongs(lis[this.index].title);
		},
		drawSpectrum:function(){
			
		}
	}
