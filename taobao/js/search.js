
var vue=new Vue({
	el:'#main',
	data:{
        searchFindonoff:true,
        historyonoff:true,
		inquiryMes:[],
        text:''
	},
	methods:{
		inquiry:function(){
            var script = document.createElement('script');
            text=this.text;
            setTimeout(function(){
                script.src = 'https://suggest.taobao.com/sug?code=utf-8&q='+text+'&_ksTS=1477971900186_443&callback=fn&k=1&area=c2c&bucketid=14';
            document.body.appendChild(script);
            },500)
        },
         substituteMes:function(mes){
            this.text=mes;
            this.inquiryMes=[];
        }
	}
})
function fn(data){
    var tempArr=[];
    for(var i=0;i<data.result.length;i++){
        tempArr.push(data.result[i][0]);
    }
    vue['inquiryMes']=tempArr;
}
