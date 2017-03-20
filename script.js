/*
function: 		//getByClass
description: 	//通过传递className，就可以获取同类的所有元素
input: 			//传入的参数有className、parent
return: 		//返回一个数组，该数组是同类元素的集合
*/
function getByClass(cls,parent){
	var parent=parent?parent:document;
	var elements=parent.getElementsByTagName("*");
	var reg=new RegExp(" "+cls+" ","i");
	var result=[];
	for(var i=0;i<elements.length;i++){
		if(reg.test(" "+elements[i].className+" ")){
			result.push(elements[i]);
		}
	}
	return result;
}
function hasClass(obj,cls){
	return obj.className.match(new RegExp("(\\s|^)"+cls+"($|\\s)"));
}
function addClass(obj,cls){
	if(!hasClass(obj,cls)){
		obj.className+=" "+cls;
	}
}
function removeClass(obj,cls){
	if(hasClass(obj,cls)){
		var regExp=new RegExp("(\\s|^)"+cls+"($|\\s)");
	    obj.className=obj.className.replace(regExp,"");
	}
}
/*
function: 		//addEvent
description: 	//为元素添加事件
input: 			//element(要添加事件的元素)
				  type(要添加的事件的类型)
				  handler(事件处理器，函数，即添加这个事件后需要元素做什么)
*/
function addEvent(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,handler);
	}else{
		element["on"+type]==handler;
	}
}
//获取event对象
function getEvent(event){
	return event?event:window.event;
}
//获取当前event的target
function getTarget(event){
	return event.target||event.srcElement;
}
/*
function: 		//showChange
description:    //当下拉菜单显示时，改变当前目标（鼠标滑过的li）的css样式
				  同时改变当前目标的下拉菜单的CSS样式
called by:  	//showDropdown
input: 			//curTarget 当前目标
*/
function showChange(curTarget){
	var triangle=curTarget.getElementsByTagName("b")[0];
	curTarget.getElementsByTagName("div")[0].style.cssText="display:block;";
	curTarget.style.cssText="background:#fff;border-color:#eee;";
	triangle.style.cssText="transform:rotate(180deg);";
	addEvent(curTarget,"mouseleave",function(event){
		curTarget.getElementsByTagName("div")[0].style.cssText="display:none;";
		curTarget.style.cssText="background:#F2F2F2;border-color:#F2F2F2";
		triangle.style.cssText="transform:rotate(0deg);";
	});
}
/*
function: 		//showDropdown
description: 	//该函数主要用于显示dropdown，当鼠标滑过导航条时，
				  判断鼠标是否滑过具有下拉菜单的li,如果鼠标滑过，就
				  显示下拉菜单
calls: 			//showChange
*/
function showDropdown(){
	var navItems=getByClass("tn-item")[0];
	addEvent(navItems,"mouseover",function(event){
		var curTarget=getTarget(event);
		var curClass=curTarget.className;
		switch(curClass){
			case "tn-mine":
				showChange(curTarget);
				break;
			case "tn-collect":
				showChange(curTarget);
				break;
			case "tn-seller":
				showChange(curTarget);
				break;
			case "tn-menu":
				showChange(curTarget);
				break;
		}
	});
}
/*
function: 		//showSubMenu
description: 	//该函数主要用于显示submenu，当鼠标滑过侧边导航
				  sidemenu时，显示相应的二级菜单
input: 			//传入的参数是event，即鼠标进行操作的事件对象
*/
function showSubMenu(event){
		event=getEvent(event);
		if(event.target.nodeName=="A"){
			var eventId=event.target.id;
			var currentSub=document.getElementById("sub-"+eventId);
			currentSub.style.display="block";
		}
}
/*
function: 		//hideSubMenu
description: 	//该函数主要用于显示submenu，当鼠标离开侧边导航
				  sidemenu时，将二级菜单隐藏
*/
function hideSubMenu(event){
		event=getEvent(event);
		if(event.target.nodeName=="A"){
			var eventId=event.target.id;
			var currentSub=document.getElementById("sub-"+eventId);
			currentSub.style.display="none";
		}
}

function pictureCarousel(){
	var index=1;
	var timer=null;
	clearInterval(timer);
	timer=setInterval(function(){
		var lid="img-list0"+index;
		var lIndex=index;
		index++;
		if(index>6){
			index=1;
		}
		startCarousel(lid,lIndex,index);
	},3000);
}
function startCarousel(lid,lIndex,index){
	var cid="img-list0"+index;
	var _show=document.getElementById(cid);
	var _hide=document.getElementById(lid);
	var buttonList=getByClass("button-list")[0].getElementsByTagName("span");
	fade(_hide,1);
	_hide.style.display="none";
	removeClass(buttonList[lIndex-1],"selected");
	_show.style.display="block";
	addClass(buttonList[index-1],"selected");
	fade(_show,0);
}
function fade(ele,opacity){
	if(opacity==1){
		for(var i=0;i<=20;i++){
			(function(){
				var level=(100-i*10)/100;
				setTimeout(function(){
					ele.style.opacity=level;
				},i*25);
			})(i);
		}
	}else{
		for(var i=0;i<=20;i++){
			(function(){
				var level=(i*10)/100;
				setTimeout(function(){
					ele.style.opacity=level;
				},i*25);
			})(i);
		}
	}
}
window.onload=function(){
	showDropdown();
	var sideMenu=document.getElementById("side-menu");
	addEvent(sideMenu,"mouseover",function(event){
		showSubMenu(event);
	});
	addEvent(sideMenu,"mouseout",function(event){
		hideSubMenu(event);
	});
    var subMenu=getByClass("sub-menu-content");
    for(var i=0;i<subMenu.length;i++){
    	addEvent(subMenu[i],"mouseenter",function(event){
    		event=getEvent(event);
    		var cid=event.target.id;
    		document.getElementById(cid).style.display="block";
    	});
    }
     for(var i=0;i<subMenu.length;i++){
    	addEvent(subMenu[i],"mouseleave",function(event){
    		event=getEvent(event);
    		var cid=event.target.id;
    		document.getElementById(cid).style.display="none";
    	});
    }
    pictureCarousel();
}