//购物车固定初始值
var clothingTemp=2,foodTemp=6,bookTemp=14;
var goodData=[	// {
 //        shopName:shopData[clothingTemp].type,
 //        type:shopData[clothingTemp].type,
 //        commodityName:shopData[clothingTemp].title,
 //        color:shopData[clothingTemp].color[1],
 //        size:shopData[clothingTemp].size[0],
 //        originalPrice:parseFloat(shopData[clothingTemp].price)+50,
 //        unitPrice:shopData[clothingTemp].price,
 //        maxNum:5,
 //        goodImgUr:'img/'+shopData[clothingTemp].src[0],
 //        count:1,
 //        checked:false,
 //        editonoff:false

 //    },
 //     {
 //        shopName:shopData[foodTemp].type,
 //        type:shopData[foodTemp].type,
 //        commodityName:shopData[foodTemp].title,
 //        taste:shopData[foodTemp].parameter[6]['desc'],
 //        originalPrice:parseFloat(shopData[foodTemp].price)+30,
 //        unitPrice:shopData[foodTemp].price,
 //        maxNum:1,
 //        goodImgUrl:'img/'+shopData[foodTemp].src[0],
 //        count:1,
 //        checked:false,
 //        editonoff:false
 //    },
 //    {
 //        shopName:shopData[bookTemp].type,
 //        type:shopData[bookTemp].type,
 //        commodityName:shopData[bookTemp].title,
 //        originalPrice:parseFloat(shopData[bookTemp].price)+10,
 //        unitPrice:shopData[bookTemp].price,
 //        maxNum:3,
 //        place:shopData[bookTemp].parameter[3]['desc'],
 //        goodImgUrl:'img/'+shopData[bookTemp].src[0],
 //        count:1,
 //        checked:false,
 //        editonoff:false
 //    }
 ];
// dataHandel(clothingTemp,1);
// dataHandel(foodTemp,1);
// dataHandel(bookTemp,1);
localStorage.setItem("shop5",'{"id":"5","size":"L","color":"军绿色","count":1}');
localStorage.setItem("shop11",'{"id":"11","count":1}');
localStorage.setItem("shop16",'{"id":"16","count":1}');
//获取本地存储，加入购物车数据
for(var key in localStorage){
    var value=JSON.parse(localStorage.getItem(key)); 
    if(key.indexOf('p')==3){
        var idNum=key.slice(4,key.length)-1;
        dataHandel(idNum,value);
    }
}
//处理数据，判断商品类型
function dataHandel(idNum,value){
    var num=value.count||value;
    var obj=new CreateObj(idNum,num);
    switch(shopData[idNum].type){
    case 'clothes':
    obj.color=value.color||shopData[idNum].color[1];
    obj.size=value.size||shopData[idNum].size[0];
        break;
    case 'food':
    obj.taste=shopData[idNum].parameter[6]['desc'];
        break;
    case 'books':
    obj.place=shopData[idNum].parameter[3]['desc'];
        break;
    case 'beauty':
    obj.volume=value.size||shopData[idNum].size[0];
        break;
    case 'bags':
    obj.color=value.color||shopData[idNum].color[0];
        break;
    }
    goodData.push(obj) 
}
//购物车数据模板
function CreateObj(idNum,c){
     return {shopName:shopData[idNum].type,
        type:shopData[idNum].type,
        commodityName:shopData[idNum].title,
        originalPrice:parseFloat(shopData[idNum].price)+30,
        unitPrice:shopData[idNum].price,
        goodImgUrl:'img/'+shopData[idNum].src[0],
        count:c,
        checked:false,
        editonoff:false
    };
}
var editSpan=document.getElementsByClassName('edit');
var m=new Vue({
    el:'#demo',
    data:{
        data:goodData,
        inquiryMes:[],
        text:'',
        editAllText:'编辑',
        editKey:false,
        deleteIndex:0,
        checktemp:false
    },
    computed:{
        checkonoff:function(){
            var temp1=this.data.filter(function(aMes){ 
                  return aMes.checked == true;
                }).length;
            var temp2=this.data.length;
            var temp= ((temp1!=0)&&(temp1==temp2));
            this.checktemp=temp;
             return temp;

        },
        classObject:function(){
            return {
                  select: this.isActive && !this.error,
                  'select-check': this.error && !this.isActive,
                }
              
        },
        totalPrice:function(){
              var totalPrice = 0.00;
              this.data.filter(function(aMes){
                return aMes.checked;
              }).map(function(aMes){
                return aMes.count*aMes.unitPrice
              }).forEach(function(aMes){
                totalPrice += aMes;
              });
                return totalPrice;
        },
        sum:function(){
            var sum=0;
             this.data.filter(function(aMes){
                return aMes.checked;
              }).map(function(aMes){
                return parseInt(aMes.count)
              }).forEach(function(aMes){
                sum+=parseInt(aMes)
              });
              return sum;
        }
    },
    methods:{
        addNum:function(mes){
            if(mes.count<mes.maxNum){
                mes.count++;
            }else if(mes.count==mes.maxNum){
                this.maxError();
            }
        },
        deleteNum:function(mes){
            if(mes.count>0){
                mes.count--;
            }else if(mes.count==0){
                this.minError();
            }
        },
        maxError:function(){
            maxOverflow.style.display='block';
            minOverflow.style.display='none';
            setTimeout(function(){
                maxOverflow.style.display='none';
            },2000)
        },
        minError:function(){
            maxOverflow.style.display='none';
            minOverflow.style.display='block';
            setTimeout(function(){
                minOverflow.style.display='none';
            },2000)
        },
        deleteGood:function(index){
            this.deleteIndex=index;
            shade.style.display='block';
            judgeDelete.style.display='block';           
        },
        substituteMes:function(mes){
            this.text=mes;
            this.inquiryMes=[]
        },
        editAll:function(){
            if(this.editKey){
                for(var mes of this.data){
                    mes.editonoff=false;
                }
            }else{
                for(var mes of this.data){
                    mes.editonoff=true;
                }
            }
            this.editKey=!this.editKey;
        },
        cancel:function(){
            shade.style.display='none';
            judgeDelete.style.display='none';
        },
        confirm:function(){
            shade.style.display='none';
            judgeDelete.style.display='none';
            this.data.splice(this.deleteIndex,1);          
        },
        checkedAll:function(){
            if(!this.checktemp){
                this.data.forEach(function(aMes){
                  aMes.checked = !this.checktemp;
                });
                this.checktemp=!this.checktemp;
            }else{
                this.data.forEach(function(aMes){
                  aMes.checked = this.checktemp;
                });
                this.checktemp=!this.checktemp;
            }     
        }
        
    }
})

var goIndex = document.getElementById('goIndex');
jump(goIndex,'index.html')